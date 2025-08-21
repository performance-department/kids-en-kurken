import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

// Define the shape of the data for a post in the list.
// We don't need the full 'content' here, which makes the query faster.
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

export const load: PageServerLoad = async () => {
	// GROQ query to get the 10 newest posts
	const groqQuery = `*[_type == "post"] | order(date desc)[0...10]{
    _id,
    title,
    date,
    slug,
    "featuredMedia": {
      "asset": featuredMedia.asset->{
        url,
        metadata {
          lqip
        }
      },
      "alt": featuredMedia.alt
    }
  }`;

	const posts: PostListItem[] = await client.fetch(groqQuery);

	return {
		posts
	};
};
