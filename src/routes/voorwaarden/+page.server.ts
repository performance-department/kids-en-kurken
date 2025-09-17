import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return loadStaticPage('d85479fa-e557-40c4-8650-86bebfdd2f81');
};
