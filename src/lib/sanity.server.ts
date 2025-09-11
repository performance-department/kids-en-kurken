import { createClient } from '@sanity/client';
import {
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_PROJECT_ID
} from '$env/static/public';
import { SANITY_WRITE_TOKEN } from '$env/static/private';

// Write client for server-side operations (comments, etc.)
export const writeClient = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	apiVersion: '2025-08-21',
	useCdn: false, // Important: don't use CDN for write operations
	token: SANITY_WRITE_TOKEN
});
