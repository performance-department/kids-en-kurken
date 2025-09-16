import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const groqQuery = `
		*[_type == "page" && _id == "d85479fa-e557-40c4-8650-86bebfdd2f81"][0]{
			_id,
			title,
			content
		}
	`;

	const page = await client.fetch(groqQuery);

	if (!page) {
		throw new Error('Voorwaarden page not found');
	}

	return {
		page
	};
};
