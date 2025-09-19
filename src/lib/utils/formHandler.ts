import { writeClient } from '$lib/server/sanity';
import { z, type ZodSchema } from 'zod';
import { fail } from '@sveltejs/kit';
import type { RequestEvent, Action } from '@sveltejs/kit';

export interface FormConfig<T> {
	schema: ZodSchema<T>;
	documentType: string;
	honeypotField?: string;
	successMessage?: string;
	errorMessage?: string;
	additionalFields?: Record<string, unknown>;
}

export function createFormAction<T extends Record<string, unknown>>(config: FormConfig<T>): Action {
	return async ({ request }: RequestEvent) => {
		const formData = await request.formData();

		// Extract all form data
		const data: Record<string, unknown> = {};
		for (const [key, value] of formData.entries()) {
			data[key] = value as string;
		}

		try {
			const parsed = config.schema.parse(data);

			// Honeypot check - if honeypot field is filled, it's likely a bot
			const honeypotField = config.honeypotField || 'honeypot';
			if (parsed[honeypotField] && String(parsed[honeypotField]).trim() !== '') {
				throw new Error('Spam detected');
			}

			// Remove honeypot field from data before saving
			const cleanedData = { ...parsed };
			delete cleanedData[honeypotField];

			// Create the document in Sanity
			await writeClient.create({
				_type: config.documentType,
				...cleanedData,
				...config.additionalFields,
				submittedAt: new Date().toISOString(),
				read: false
			});

			return { success: true };
		} catch (error) {
			if (error instanceof z.ZodError) {
				return fail(400, {
					error: error.issues[0].message,
					data
				});
			}

			console.error(`${config.documentType} form error:`, error);
			return fail(500, {
				error: config.errorMessage || 'Er is een fout opgetreden bij het verzenden.',
				data
			});
		}
	};
}

// Common schemas that can be reused
export const bloggerInfluencerSchema = z.object({
	name: z.string().min(1, 'Naam is verplicht').max(100, 'Naam te lang'),
	lastName: z.string().min(1, 'Achternaam is verplicht').max(100, 'Achternaam te lang'),
	instagram: z.string().min(1, 'Instagramnaam is verplicht').max(100, 'Instagramnaam te lang'),
	website: z.string().url('Ongeldige website URL').optional().or(z.literal('')),
	email: z.string().email('Geldig e-mailadres is verplicht'),
	subjects: z
		.string()
		.min(1, 'Beschrijving van onderwerpen is verplicht')
		.max(5000, 'Beschrijving te lang'),
	honeypot: z.string().optional()
});

export const contactSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
	email: z.string().email('Valid email is required'),
	message: z.string().min(1, 'Message is required').max(5000, 'Message too long'),
	website: z.string().optional()
});

export const submissionSchema = z.object({
	name: z.string().min(1, 'Naam is verplicht').max(100, 'Naam te lang'),
	email: z.string().email('Geldig e-mailadres is verplicht'),
	instagram: z.string().min(1, 'Instagramnaam is verplicht').max(100, 'Instagramnaam te lang'),
	message: z.string().min(1, 'Boodschap is verplicht').max(5000, 'Boodschap te lang'),
	withName: z
		.string()
		.optional()
		.transform((val) => val === 'true'),
	terms: z
		.string()
		.optional()
		.refine((val) => val === 'true', 'Je moet akkoord gaan met de voorwaarden'),
	honeypot: z.string().optional()
});
