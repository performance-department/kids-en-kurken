import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Cache for 1 week in browser, 1 month on Cloudflare CDN
	// Static content pages change very infrequently
	setHeaders({
		'cache-control': 'public, max-age=60, s-maxage=60',
		vary: 'Accept-Encoding'
	});

	return loadStaticPage('d85479fa-e557-40c4-8650-86bebfdd2f81');
};
