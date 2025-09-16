import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const groqQuery = `
		*[_type == "page" && _id == "c762c5e5-b390-4a57-8b22-cd8494761a7c"][0]{
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
