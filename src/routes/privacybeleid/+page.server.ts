import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return loadStaticPage('0a7182b4-f031-4515-a3c5-efca112f35bc');
};
