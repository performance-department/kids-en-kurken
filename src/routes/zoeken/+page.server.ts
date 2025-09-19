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
	posts: PostListItem[];
	totalPosts: number;
} | null;

// Define how many posts to show per page
const pageSize = 10;

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	// Get the search query from URL params
	const query = url.searchParams.get('q') || '';

	// If no query provided, return empty results
	if (!query.trim()) {
		return {
			posts: [],
			currentPage: 1,
			totalPages: 0,
			query: '',
			totalResults: 0
		};
	}

	// Get the current page number from the URL, default to 1
	const page = Number(url.searchParams.get('page')) || 1;

	// Calculate the start and end indices for the GROQ query
	const start = (page - 1) * pageSize;
	const end = page * pageSize;

	const groqQuery = `
	{
		// Search posts by title and content
		"posts": *[_type == "post" && language == "nl" && (
			title match $searchQuery + "*" ||
			pt::text(content) match $searchQuery + "*"
		)] | order(date desc)[$start...$end]{
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

		"totalPosts": count(*[_type == "post" && language == "nl" && (
			title match $searchQuery + "*" ||
			pt::text(content) match $searchQuery + "*"
		)])
	}
	`;

	const data = await client.fetch<QueryResult>(groqQuery, {
		start: start,
		end: end,
		searchQuery: query
	});

	if (!data) {
		throw error(404, `Search results not found`);
	}

	const totalPages = Math.ceil(data.totalPosts / pageSize);

	// If a user tries to access a page that doesn't exist, show a 404
	if (page > totalPages && data.totalPosts > 0) {
		throw error(404, 'Page not found');
	}

	// Set browser cache headers with query parameter variation
	// 1min browser, 5min CDN
	// setHeaders({
	// 	'cache-control': 'public, max-age=60, s-maxage=300',
	// 	vary: 'Accept-Encoding'
	// });

	return {
		posts: data.posts,
		currentPage: page,
		totalPages: totalPages,
		query: query,
		totalResults: data.totalPosts
	};
};
