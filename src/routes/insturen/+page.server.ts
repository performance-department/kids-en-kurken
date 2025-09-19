import { createFormAction, submissionSchema } from '$lib/utils/formHandler';
import type { Actions } from './$types';

export const actions: Actions = {
	default: createFormAction({
		schema: submissionSchema,
		documentType: 'submission',
		honeypotField: 'honeypot',
		errorMessage: 'Er is een fout opgetreden bij het verzenden van je verhaal.'
	})
};
