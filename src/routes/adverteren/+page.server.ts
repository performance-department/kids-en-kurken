import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return loadStaticPage('ad51ee6d-07ef-469a-ade2-cbc2b9d39650');
};
