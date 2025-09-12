import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

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

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Using direct category reference IDs for better performance
	const groqQuery = `
	{
		// Latest 10 posts for "Nieuw" section
		"nieuw": *[_type == "post" && language == "nl"] | order(date desc)[0...10]{
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

		// Blogs section - using direct category reference
		"blogs": *[_type == "post" && language == "nl" && references("category-2473")] | order(date desc)[0...6]{
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

		// Verhalen (ouderverhalen) section - using direct category reference
		"verhalen": *[_type == "post" && language == "nl" && references("category-1251")] | order(date desc)[0...6]{
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

		// Toffe ouders section - using direct category reference
		"toffeOuders": *[_type == "post" && language == "nl" && references("category-1252")] | order(date desc)[0...6]{
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

		// Artikelen section - using direct category reference
		"artikelen": *[_type == "post" && language == "nl" && references("category-2455")] | order(date desc)[0...6]{
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

		// TV section - using direct category reference
		"tv": *[_type == "post" && language == "nl" && references("category-2476")] | order(date desc)[0...6]{
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
	}
	`;

	const data = await client.fetch<{
		nieuw: PostListItem[];
		blogs: PostListItem[];
		verhalen: PostListItem[];
		toffeOuders: PostListItem[];
		artikelen: PostListItem[];
		tv: PostListItem[];
	}>(groqQuery);

	// Set browser cache headers
	setHeaders({
		'cache-control': 'public, max-age=300, s-maxage=1800', // 5min browser, 30min CDN
		vary: 'Accept-Encoding'
	});

	return {
		nieuw: data.nieuw || [],
		blogs: data.blogs || [],
		verhalen: data.verhalen || [],
		toffeOuders: data.toffeOuders || [],
		artikelen: data.artikelen || [],
		tv: data.tv || []
	};
};
