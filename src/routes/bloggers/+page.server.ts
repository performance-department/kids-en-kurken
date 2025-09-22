import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export interface AuthorListItem {
	_id: string;
	firstName: string;
	lastName: string;
	slug: {
		current: string;
	};
	postCount: number;
}

export const load: PageServerLoad = async ({ setHeaders }) => {
	const groqQuery = `
    *[_type == "author"] | order(firstName asc){
      _id,
      firstName,
      lastName,
      slug,
      "postCount": count(*[_type == "post" && language == "nl" && references(^._id)])
    }
  `;

	const authors = await client.fetch<AuthorListItem[]>(groqQuery);

	// Set browser cache headers
	// setHeaders({
	// 	'cache-control': 'public, max-age=600, s-maxage=3600',
	// 	vary: 'Accept-Encoding'
	// });

	return {
		authors
	};
};
