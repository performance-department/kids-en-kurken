import { createFormAction, bloggerInfluencerSchema } from '$lib/utils/formHandler';
import type { Actions } from './$types';

export const actions: Actions = {
	default: createFormAction({
		schema: bloggerInfluencerSchema,
		documentType: 'bloggerRequest',
		honeypotField: 'honeypot',
		errorMessage: 'Er is een fout opgetreden bij het verzenden van je aanmelding.'
	})
};
