import { client } from '$lib/sanity';
import { writeClient } from '$lib/server/sanity';
import { z } from 'zod';

// Validation schemas
const commentSchema = z.object({
	postId: z.string().min(1, 'Post ID is required'),
	authorName: z.string().min(1, 'Name is required').max(100, 'Name too long'),
	authorEmail: z.string().email('Valid email is required'),
	content: z.string().min(1, 'Content is required').max(5000, 'Content too long'),
	website: z.string().optional() // Honeypot field
});

const replySchema = commentSchema.extend({
	parentWpId: z.string().transform((val) => {
		const num = parseInt(val);
		if (isNaN(num) || num <= 0) throw new Error('Invalid parent comment ID');
		return num;
	})
});

export interface Comment {
	wpId: number;
	parentWpId?: number;
	authorName: string;
	authorEmail: string;
	content: string;
	status: 'approved' | 'hold' | 'spam' | 'trash';
	date: string;
	replies: Comment[];
}

// Get the next available wpId across all buckets for a post
async function getNextWpId(postId: string): Promise<number> {
	const result = await client.fetch(
		`
    *[_type == "commentBucket" && post._ref == $postId] {
      "wpIds": comments[].wpId
    }
  `,
		{ postId }
	);

	const allWpIds = result
		.flatMap((bucket: any) => bucket.wpIds || [])
		.filter((id: any) => typeof id === 'number');

	return allWpIds.length > 0 ? Math.max(...allWpIds) + 1 : 1;
}

// Find or create a bucket with available space
async function findOrCreateBucket(
	postId: string
): Promise<{ bucketId: string; bucketIndex: number }> {
	// Find existing buckets for this post
	const buckets = await client.fetch(
		`
    *[_type == "commentBucket" && post._ref == $postId] | order(bucketIndex asc) {
      _id,
      bucketIndex,
      commentCount
    }
  `,
		{ postId }
	);

	// Find a bucket with space (< 100 comments)
	const availableBucket = buckets.find((bucket: any) => (bucket.commentCount || 0) < 100);

	if (availableBucket) {
		return {
			bucketId: availableBucket._id,
			bucketIndex: availableBucket.bucketIndex
		};
	}

	// Create new bucket
	const newBucketIndex = buckets.length;
	const newBucket = await writeClient.create({
		_type: 'commentBucket',
		post: { _type: 'reference', _ref: postId },
		bucketIndex: newBucketIndex,
		comments: [],
		commentCount: 0
	});

	return {
		bucketId: newBucket._id,
		bucketIndex: newBucketIndex
	};
}

// Build comment tree from flat array
function buildCommentTree(comments: any[]): Comment[] {
	const commentMap = new Map<number, Comment>();

	comments.forEach((comment) => {
		commentMap.set(comment.wpId, { ...comment, replies: [] });
	});

	const topLevelComments: Comment[] = [];

	comments.forEach((comment) => {
		const commentWithReplies = commentMap.get(comment.wpId)!;

		if (comment.parentWpId && commentMap.has(comment.parentWpId)) {
			commentMap.get(comment.parentWpId)!.replies.push(commentWithReplies);
		} else {
			topLevelComments.push(commentWithReplies);
		}
	});

	// Sort top-level comments: newest first
	topLevelComments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	// Recursively sort replies: oldest first
	function sortReplies(comment: Comment) {
		comment.replies.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
		comment.replies.forEach(sortReplies);
	}

	topLevelComments.forEach(sortReplies);

	return topLevelComments;
}

export async function addComment(formData: FormData) {
	const data = {
		postId: formData.get('postId') as string,
		authorName: formData.get('authorName') as string,
		authorEmail: formData.get('authorEmail') as string,
		content: formData.get('content') as string,
		website: (formData.get('website') as string) || ''
	};

	const parsed = commentSchema.parse(data);

	// Honeypot check - if website field is filled, it's likely a bot
	if (parsed.website && parsed.website.trim() !== '') {
		throw new Error('Spam detected');
	}

	const { postId, authorName, authorEmail, content } = parsed;

	const wpId = await getNextWpId(postId);
	const { bucketId } = await findOrCreateBucket(postId);

	const newComment = {
		_key: `comment-${wpId}-${Date.now()}`,
		wpId,
		authorName,
		authorEmail,
		content,
		status: 'hold' as const,
		date: new Date().toISOString()
	};

	// Add comment to bucket and update count
	await writeClient
		.patch(bucketId)
		.setIfMissing({ comments: [] })
		.append('comments', [newComment])
		.inc({ commentCount: 1 })
		.commit();

	return await getComments(postId);
}

export async function addReply(formData: FormData) {
	const data = {
		postId: formData.get('postId') as string,
		parentWpId: formData.get('parentWpId') as string,
		authorName: formData.get('authorName') as string,
		authorEmail: formData.get('authorEmail') as string,
		content: formData.get('content') as string,
		website: (formData.get('website') as string) || ''
	};

	const parsed = replySchema.parse(data);

	// Honeypot check - if website field is filled, it's likely a bot
	if (parsed.website && parsed.website.trim() !== '') {
		throw new Error('Spam detected');
	}

	const { postId, parentWpId, authorName, authorEmail, content } = parsed;

	const wpId = await getNextWpId(postId);
	const { bucketId } = await findOrCreateBucket(postId);

	const newReply = {
		_key: `reply-${wpId}-${Date.now()}`,
		wpId,
		parentWpId,
		authorName,
		authorEmail,
		content,
		status: 'hold' as const,
		date: new Date().toISOString()
	};

	// Add reply to bucket and update count
	await writeClient
		.patch(bucketId)
		.setIfMissing({ comments: [] })
		.append('comments', [newReply])
		.inc({ commentCount: 1 })
		.commit();

	return await getComments(postId);
}

export async function getComments(postId: string) {
	const result = await client.fetch(
		`
    *[_type == "commentBucket" && post._ref == $postId] | order(bucketIndex asc) {
      comments[status == "approved"] | order(wpId asc),
      commentCount
    }
  `,
		{ postId }
	);

	// Flatten all comments from all buckets
	const allComments = result
		.flatMap((bucket: any) => bucket.comments || [])
		.map((comment: any) => ({ ...comment, replies: [] }));

	const commentTree = buildCommentTree(allComments);
	const totalCount = result.reduce(
		(sum: number, bucket: any) => sum + (bucket.commentCount || 0),
		0
	);

	return {
		comments: commentTree,
		totalCount
	};
}
