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

type QueryResult = {
	name: string;
	posts: PostListItem[];
	totalPosts: number;
} | null;

// Define how many posts to show per page
const pageSize = 10;

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	// Get the current page number from the URL, default to 1
	const page = Number(url.searchParams.get('page')) || 1;

	// Calculate the start and end indices for the GROQ query
	const start = (page - 1) * pageSize;
	const end = start + pageSize - 1;

	const groqQuery = `
	{
  // Page of posts
  "posts": *[_type == "post" && language == "nl"] | order(date desc)[$start...$end]{
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
  },

  "totalPosts": count(*[_type == "post" && language == "nl"])
}

  `;

	const data = await client.fetch<QueryResult>(groqQuery, {
		start: start,
		end: end
	});

	if (!data) {
		throw error(404, `Page  not found`);
	}

	const totalPages = Math.ceil(data.totalPosts / pageSize);

	// If a user tries to access a page that doesn't exist, show a 404
	if (page > totalPages && data.totalPosts > 0) {
		throw error(404, 'Page not found');
	}

	// Set browser cache headers
	// 10min browser, 1hr CDN
	// setHeaders({
	// 	'cache-control': 'public, max-age=600, s-maxage=3600',
	// 	vary: 'Accept-Encoding'
	// });

	return {
		posts: data.posts,
		currentPage: page,
		totalPages: totalPages
	};
};
