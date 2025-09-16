import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const groqQuery = `
		*[_type == "page" && _id == "79455bb6-47cc-4355-bbd6-890ed3171858"][0]{
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
