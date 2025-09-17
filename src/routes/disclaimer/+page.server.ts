import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return loadStaticPage('c762c5e5-b390-4a57-8b22-cd8494761a7c');
};
