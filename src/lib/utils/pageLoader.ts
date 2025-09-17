import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export interface StaticPage {
	_id: string;
	title: string;
	content: unknown;
}

export async function loadStaticPage(pageId: string) {
	const groqQuery = `
		*[_type == "page" && _id == "${pageId}"][0]{
			_id,
			title,
			content
		}
	`;

	const page: StaticPage | null = await client.fetch(groqQuery);

	if (!page) {
		throw error(404, 'Page not found');
	}

	return {
		page
	};
}
