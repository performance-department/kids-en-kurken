import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return loadStaticPage('79455bb6-47cc-4355-bbd6-890ed3171858');
};
