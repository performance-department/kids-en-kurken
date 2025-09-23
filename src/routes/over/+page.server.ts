import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Cache for 1 week in browser, 1 month on Cloudflare CDN
	// Static content pages change very infrequently
	setHeaders({
		'cache-control': 'public, max-age=604800, s-maxage=2592000',
		vary: 'Accept-Encoding'
	});

	return loadStaticPage('03554207-c652-425c-9f28-b82a9dd53d78');
};
