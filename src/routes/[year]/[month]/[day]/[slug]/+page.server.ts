import { client } from '$lib/sanity';
import type { PageServerLoad, Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { addComment, addReply } from '$lib/commentService.js';

// Define a reusable type for linked categories and tags
interface ReferenceItem {
	name: string;
	slug: {
		current: string;
	};
}

// Comment interface with nested replies
export interface Comment {
	wpId: number;
	parentWpId?: number;
	authorName?: string;
	authorEmail?: string;
	content?: string;
	status: 'approved' | 'hold' | 'spam' | 'trash';
	date?: string;
	replies: Comment[];
}

// Update the Post interface
export interface Post {
	_id: string;
	title: string;
	date: string;
	content: any[]; // Portable Text array
	featuredMedia?: any;
	sticky?: boolean;
	categories?: ReferenceItem[];
	tags?: ReferenceItem[];
	estimatedReadingTime: number;
}

function buildCommentTree(comments: Comment[]): Comment[] {
	// Create map of all comments
	const commentMap = new Map<number, Comment>();

	// Initialize all comments with empty replies array
	comments.forEach((comment) => {
		commentMap.set(comment.wpId, { ...comment, replies: [] });
	});

	const topLevelComments: Comment[] = [];

	// Build the tree structure
	comments.forEach((comment) => {
		const commentWithReplies = commentMap.get(comment.wpId)!;

		if (comment.parentWpId && commentMap.has(comment.parentWpId)) {
			// This is a reply - add to parent's replies
			commentMap.get(comment.parentWpId)!.replies.push(commentWithReplies);
		} else {
			// This is a top-level comment
			topLevelComments.push(commentWithReplies);
		}
	});

	// Sort top-level comments: newest first
	topLevelComments.sort((a, b) => {
		if (!a.date || !b.date) return 0;
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	// Recursively sort replies: oldest first
	function sortReplies(comment: Comment) {
		comment.replies.sort((a, b) => {
			if (!a.date || !b.date) return 0;
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		});

		// Recursively sort nested replies
		comment.replies.forEach(sortReplies);
	}

	topLevelComments.forEach(sortReplies);

	return topLevelComments;
}

export const load: PageServerLoad = async ({ params, setHeaders }) => {
	const { slug } = params;

	// Combined query to fetch post and comments in single request
	const combinedQuery = `*[_type == "post" && language == "nl" && slug.current == $slug][0]{
    ...,
    content[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    categories[]->{
      name,
      slug
    },
    tags[]->{
      name,
      slug
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
    "commentBuckets": *[_type == "commentBucket" && post._ref == ^._id]{
      bucketIndex,
      comments[status == "approved"],
      commentCount
    } | order(bucketIndex asc)
  }`;

	const result = await client.fetch(combinedQuery, { slug });

	if (!result) {
		error(404, 'Post not found');
	}

	// Set browser cache headers
	setHeaders({
		'cache-control': 'public, max-age=300, s-maxage=3600', // 5min browser, 1hr CDN
		vary: 'Accept-Encoding'
	});

	const { commentBuckets, ...post } = result;

	// Flatten all comments from all buckets
	const allComments: Comment[] = (commentBuckets || [])
		.flatMap((bucket: any) => bucket.comments || [])
		.map((comment) => ({ ...comment, replies: [] }));

	// Build the comment tree with proper sorting
	const topLevelComments = buildCommentTree(allComments);

	return {
		post,
		comments: topLevelComments,
		commentCount: allComments.length
	};
};

export const actions: Actions = {
	addComment: async ({ request }) => {
		try {
			const formData = await request.formData();
			const result = await addComment(formData);
			return { success: true, ...result };
		} catch (error: any) {
			console.error('Failed to add comment:', error);
			if (error.issues) {
				// Zod validation errors
				const fieldErrors: Record<string, string> = {};
				error.issues.forEach((issue: any) => {
					const field = issue.path[0];
					fieldErrors[field] = issue.message;
				});
				return fail(400, { fieldErrors });
			}
			return fail(500, { error: 'Failed to add comment' });
		}
	},

	addReply: async ({ request }) => {
		try {
			const formData = await request.formData();
			const result = await addReply(formData);
			return { success: true, ...result };
		} catch (error: any) {
			console.error('Failed to add reply:', error);
			if (error.issues) {
				// Zod validation errors
				const fieldErrors: Record<string, string> = {};
				error.issues.forEach((issue: any) => {
					const field = issue.path[0];
					fieldErrors[field] = issue.message;
				});
				return fail(400, { fieldErrors });
			}
			return fail(500, { error: 'Failed to add reply' });
		}
	}
};
