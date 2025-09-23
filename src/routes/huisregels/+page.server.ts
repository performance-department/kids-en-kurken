import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Cache for 1 week in browser, 1 month on Cloudflare CDN
	// Static content pages change very infrequently
	setHeaders({
		'cache-control': 'public, max-age=604800, s-maxage=2592000',
		vary: 'Accept-Encoding'
	});

	return loadStaticPage('e3bbd05a-cb79-4405-b27f-5079a34f2e93');
};
