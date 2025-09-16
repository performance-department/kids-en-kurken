import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const groqQuery = `
		*[_type == "page" && _id == "0a7182b4-f031-4515-a3c5-efca112f35bc"][0]{
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
