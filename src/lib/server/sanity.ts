// src/lib/server/sanity.ts

import { SANITY_VIEWER_TOKEN, SANITY_WRITE_TOKEN } from '$env/static/private';
import { client } from '$lib/sanity';

export const serverClient = client.withConfig({
	token: SANITY_VIEWER_TOKEN
});

export const writeClient = client.withConfig({
	token: SANITY_WRITE_TOKEN,
	useCdn: false // Important: don't use CDN for write operations
});
