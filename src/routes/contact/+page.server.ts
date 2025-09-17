import { createFormAction, contactSchema } from '$lib/utils/formHandler';
import type { Actions } from './$types';

export const actions: Actions = {
	default: createFormAction({
		schema: contactSchema,
		documentType: 'contactForm',
		honeypotField: 'website',
		errorMessage: 'Er is een fout opgetreden bij het verzenden van uw bericht.'
	})
};
