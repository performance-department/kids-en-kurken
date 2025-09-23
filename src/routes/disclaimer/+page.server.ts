import { loadStaticPage } from '$lib/utils/pageLoader';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Cache for 1 week in browser, 1 month on Cloudflare CDN
	// Static content pages change very infrequently
	setHeaders({
		'cache-control': 'public, max-age=604800, s-maxage=2592000',
		vary: 'Accept-Encoding'
	});

	return loadStaticPage('c762c5e5-b390-4a57-8b22-cd8494761a7c');
};
