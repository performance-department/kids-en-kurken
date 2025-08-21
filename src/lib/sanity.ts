import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
	projectId: 'xgffjas2',
	dataset: 'production',
	apiVersion: '2025-08-21', // use a UTC date in YYYY-MM-DD format
	useCdn: true
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
