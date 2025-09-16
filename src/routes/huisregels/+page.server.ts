import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const groqQuery = `
		*[_type == "page" && _id == "e3bbd05a-cb79-4405-b27f-5079a34f2e93"][0]{
			_id,
			title,
			content
		}
	`;

	const page = await client.fetch(groqQuery);

	if (!page) {
		throw new Error('Page not found');
	}

	return {
		page
	};
};
