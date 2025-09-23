import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Cache for 1 week in browser, 1 month on Cloudflare CDN
	// Static content pages change very infrequently
	setHeaders({
		'cache-control': 'public, max-age=604800, s-maxage=2592000',
		vary: 'Accept-Encoding'
	});

	return loadStaticPage('79455bb6-47cc-4355-bbd6-890ed3171858');
};
