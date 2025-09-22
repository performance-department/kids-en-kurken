import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export interface PostListItem {
	_id: string;
	title: string;
	date: string;
	slug: {
		current: string;
	};
	categories: { name: string; slug: { current: string } }[];
	featuredMedia?: {
		asset: {
			url: string;
			metadata: {
				lqip: string;
			};
		};
		alt?: string;
	};
	estimatedReadingTime: number;
}

export interface AuthorData {
	_id: string;
	firstName: string;
	lastName: string;
	slug: {
		current: string;
	};
}

type QueryResult = {
	author: AuthorData;
	posts: PostListItem[];
	totalPosts: number;
} | null;

// Define how many posts to show per page
const pageSize = 10;

export const load: PageServerLoad = async ({ params, url, setHeaders }) => {
	const authorSlug = params.slug;

	// Get the current page number from the URL, default to 1
	const page = Number(url.searchParams.get('page')) || 1;

	// Calculate the start and end indices for the GROQ query
	const start = (page - 1) * pageSize;
	const end = start + pageSize - 1;

	// First, let's get the author and see what we get
	const authorQuery = `*[_type == "author" && slug.current == $slug][0]`;
	const author = await client.fetch(authorQuery, { slug: authorSlug });

	if (!author) {
		throw error(404, `Author "${authorSlug}" not found`);
	}

	// Now let's get posts that reference this author
	const postsQuery = `
    *[_type == "post" && language == "nl" && references($authorId)] | order(date desc)[$start...$end]{
      _id,
      title,
      date,
      slug,
      categories[]->{
        name,
        slug
      },
      "featuredMedia": {
        "asset": featuredMedia.asset->{
          url,
          metadata { lqip }
        },
        "alt": featuredMedia.alt
      },
      "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 )
    }
  `;

	const totalPostsQuery = `count(*[_type == "post" && language == "nl" && references($authorId)])`;

	const [posts, totalPosts] = await Promise.all([
		client.fetch<PostListItem[]>(postsQuery, {
			authorId: author._id,
			start: start,
			end: end
		}),
		client.fetch<number>(totalPostsQuery, { authorId: author._id })
	]);

	const totalPages = Math.ceil(totalPosts / pageSize);

	// If a user tries to access a page that doesn't exist, show a 404
	if (page > totalPages && totalPosts > 0) {
		throw error(404, 'Page not found');
	}

	// Set browser cache headers
	// setHeaders({
	// 	'cache-control': 'public, max-age=600, s-maxage=3600',
	// 	vary: 'Accept-Encoding'
	// });

	return {
		author: author,
		posts: posts,
		currentPage: page,
		totalPages: totalPages,
		totalPosts: totalPosts
	};
};
