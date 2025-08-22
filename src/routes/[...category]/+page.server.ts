import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

// Define the shape of the data for a post in the list.
export interface PostListItem {
	_id: string;
	title: string;
	date: string;
	slug: {
		current: string;
	};
	featuredMedia?: {
		asset: {
			url: string;
			metadata: {
				lqip: string; // Low Quality Image Placeholder
			};
		};
		alt?: string;
	};
}

type QueryResult = {
	name: string;
	posts: PostListItem[];
} | null;

export const load: PageServerLoad = async ({ params }) => {
	const category = decodeURIComponent(params.category).split('/').filter(Boolean).at(-1);

	// Fetch the category by slug, plus its latest 10 posts
	const groqQuery = `
    *[_type == "category" && slug.current == $slug][0]{
      name,
      "posts": *[_type == "post" && references(^._id)] | order(date desc)[0...10]{
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

	const data = await client.fetch<QueryResult>(groqQuery, { slug: category });

	if (!data) {
		throw error(404, `Category "${category}" not found`);
	}

	return {
		categoryName: data.name,
		posts: data.posts
	};
};
