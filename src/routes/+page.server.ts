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

export const load: PageServerLoad = async () => {
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

		// Blogs section
		"blogs": *[_type == "post" && language == "nl" && "blogs" in categories[]->slug.current] | order(date desc)[0...6]{
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

		// Verhalen (ouderverhalen) section
		"verhalen": *[_type == "post" && language == "nl" && "ouderverhalen" in categories[]->slug.current] | order(date desc)[0...6]{
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

		// Toffe ouders section
		"toffeOuders": *[_type == "post" && language == "nl" && "toffe-ouders" in categories[]->slug.current] | order(date desc)[0...6]{
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

		// Artikelen section
		"artikelen": *[_type == "post" && language == "nl" && "artikelen" in categories[]->slug.current] | order(date desc)[0...8]{
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

		// TV section
		"tv": *[_type == "post" && language == "nl" && "tv" in categories[]->slug.current] | order(date desc)[0...6]{
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

	return {
		nieuw: data.nieuw || [],
		blogs: data.blogs || [],
		verhalen: data.verhalen || [],
		toffeOuders: data.toffeOuders || [],
		artikelen: data.artikelen || [],
		tv: data.tv || []
	};
};
