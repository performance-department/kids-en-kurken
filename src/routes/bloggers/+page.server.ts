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

	// Cache for 6 hours in browser, 12 hours on Cloudflare CDN
	// Author list is relatively static, changes infrequently
	setHeaders({
		'cache-control': 'public, max-age=60, s-maxage=60',
		vary: 'Accept-Encoding'
	});

	return {
		authors
	};
};
