import { createClient } from '@sanity/client';
import {
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_STUDIO_URL
} from '$env/static/public';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	apiVersion: '2025-08-21', // use a UTC date in YYYY-MM-DD format
	useCdn: true,
	stega: {
		enabled: true,
		studioUrl: PUBLIC_SANITY_STUDIO_URL
	}
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
