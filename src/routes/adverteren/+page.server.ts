import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Cache for 1 week in browser, 1 month on Cloudflare CDN
	// Static content pages change very infrequently
	setHeaders({
		'cache-control': 'public, max-age=60, s-maxage=60',
		vary: 'Accept-Encoding'
	});

	return loadStaticPage('ad51ee6d-07ef-469a-ade2-cbc2b9d39650');
};
