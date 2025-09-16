import { writeClient } from '$lib/sanity.server';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const influencerSchema = z.object({
	name: z.string().min(1, 'Naam is verplicht').max(100, 'Naam te lang'),
	lastName: z.string().min(1, 'Achternaam is verplicht').max(100, 'Achternaam te lang'),
	instagram: z.string().min(1, 'Instagramnaam is verplicht').max(100, 'Instagramnaam te lang'),
	website: z.string().url('Ongeldige website URL').optional().or(z.literal('')),
	email: z.string().email('Geldig e-mailadres is verplicht'),
	subjects: z.string().min(1, 'Beschrijving van onderwerpen is verplicht').max(5000, 'Beschrijving te lang'),
	honeypot: z.string().optional() // Honeypot field
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = {
			name: formData.get('name') as string,
			lastName: formData.get('lastName') as string,
			instagram: formData.get('instagram') as string,
			website: (formData.get('website') as string) || '',
			email: formData.get('email') as string,
			subjects: formData.get('subjects') as string,
			honeypot: (formData.get('honeypot') as string) || ''
		};

		try {
			const parsed = influencerSchema.parse(data);

			// Honeypot check - if honeypot field is filled, it's likely a bot
			if (parsed.honeypot && parsed.honeypot.trim() !== '') {
				throw new Error('Spam detected');
			}

			// Create the influencer request in Sanity
			await writeClient.create({
				_type: 'bloggerRequest',
				name: parsed.name,
				lastName: parsed.lastName,
				instagram: parsed.instagram,
				website: parsed.website || undefined,
				email: parsed.email,
				subjects: parsed.subjects,
				submittedAt: new Date().toISOString(),
				read: false
			});

			return { success: true };
		} catch (error) {
			if (error instanceof z.ZodError) {
				return fail(400, {
					error: error.errors[0].message,
					data
				});
			}

			console.error('Influencer form error:', error);
			return fail(500, {
				error: 'Er is een fout opgetreden bij het verzenden van je aanmelding.',
				data
			});
		}
	}
};
