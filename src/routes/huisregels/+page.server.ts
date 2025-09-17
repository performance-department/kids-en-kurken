import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return loadStaticPage('e3bbd05a-cb79-4405-b27f-5079a34f2e93');
};
