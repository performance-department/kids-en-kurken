import { writeClient } from '$lib/sanity.server';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const contactSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
	email: z.string().email('Valid email is required'),
	message: z.string().min(1, 'Message is required').max(5000, 'Message too long'),
	website: z.string().optional() // Honeypot field
});

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const data = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			message: formData.get('message') as string,
			website: (formData.get('website') as string) || ''
		};

		try {
			const parsed = contactSchema.parse(data);

			// Honeypot check - if website field is filled, it's likely a bot
			if (parsed.website && parsed.website.trim() !== '') {
				throw new Error('Spam detected');
			}

			// Create the contact form submission in Sanity
			await writeClient.create({
				_type: 'contactForm',
				name: parsed.name,
				email: parsed.email,
				message: parsed.message,
				submittedAt: new Date().toISOString()
			});

			return { success: true };
		} catch (error) {
			if (error instanceof z.ZodError) {
				return fail(400, {
					error: error.errors[0].message,
					data
				});
			}

			console.error('Contact form error:', error);
			return fail(500, {
				error: 'Er is een fout opgetreden bij het verzenden van uw bericht.',
				data
			});
		}
	}
};
