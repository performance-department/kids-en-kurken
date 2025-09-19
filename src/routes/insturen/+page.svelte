<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let form: ActionData;

	let loading = false;
</script>

<svelte:head>
	<title>Mijn Verhaal - Kids en Kurken</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12">
	<div class="mb-8">
		<h1 class="mb-4 text-4xl font-bold text-neutral-900">Mijn Verhaal</h1>
		<p class="text-lg text-neutral-600">
			We zijn àltijd op zoek naar emotionele, herkenbare of grappige, in ieder geval èchte verhalen.
			Wil jij ook een verhaal delen?! Dat kan! Vul hieronder jouw gegevens in en de redactie neemt
			contact met je op. We zullen er samen met jou een mooi verhaal van maken voor in ons magazine.
			Wil je liever anoniem blijven?! Dat mag altijd.
		</p>
	</div>

	{#if form?.success}
		<div class="mb-8 rounded-xl border border-green-200 bg-green-50 p-6">
			<div class="flex items-center">
				<svg
					class="mr-3 h-6 w-6 text-green-600"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 13l4 4L19 7"
					/>
				</svg>
				<p class="font-medium text-green-800">
					Bedankt voor het delen van je verhaal! We nemen je bericht in overweging.
				</p>
			</div>
		</div>
	{/if}

	<div class="rounded-2xl bg-neutral-50 p-8">
		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
		>
			<div class="space-y-6">
				<div>
					<label for="name" class="mb-2 block text-sm font-medium text-neutral-700"> Naam * </label>
					<input
						type="text"
						id="name"
						name="name"
						required
						value={form?.data?.name || ''}
						class="w-full rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-warm-300 focus:ring-2 focus:ring-warm-200"
						class:border-red-300={form?.error && form?.data?.name === ''}
						class:focus:border-red-300={form?.error && form?.data?.name === ''}
					/>
				</div>

				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-neutral-700">
						E-mail *
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						value={form?.data?.email || ''}
						class="w-full rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-warm-300 focus:ring-2 focus:ring-warm-200"
						class:border-red-300={form?.error && form?.data?.email === ''}
						class:focus:border-red-300={form?.error && form?.data?.email === ''}
					/>
				</div>

				<div>
					<label for="instagram" class="mb-2 block text-sm font-medium text-neutral-700">
						Instagramnaam *
					</label>
					<input
						type="text"
						id="instagram"
						name="instagram"
						required
						placeholder="@jouwinstagram"
						value={form?.data?.instagram || ''}
						class="w-full rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-warm-300 focus:ring-2 focus:ring-warm-200"
						class:border-red-300={form?.error && form?.data?.instagram === ''}
						class:focus:border-red-300={form?.error && form?.data?.instagram === ''}
					/>
				</div>

				<div>
					<label for="message" class="mb-2 block text-sm font-medium text-neutral-700">
						Boodschap *
					</label>
					<textarea
						id="message"
						name="message"
						rows="6"
						required
						placeholder="Deel hier je verhaal..."
						value={form?.data?.message || ''}
						class="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-warm-300 focus:ring-2 focus:ring-warm-200"
						class:border-red-300={form?.error && form?.data?.message === ''}
						class:focus:border-red-300={form?.error && form?.data?.message === ''}
					></textarea>
				</div>

				<div class="flex items-center">
					<input
						type="checkbox"
						id="withName"
						name="withName"
						value="true"
						checked={form?.data?.withName === 'true'}
						class="mr-3 h-4 w-4 rounded border-neutral-300 text-warm-500 focus:ring-warm-200"
					/>
					<label for="withName" class="text-sm text-neutral-700">
						Ik wil dat mijn verhaal met naam wordt gedeeld
					</label>
				</div>

				<div class="flex items-start">
					<input
						type="checkbox"
						id="terms"
						name="terms"
						value="true"
						required
						checked={form?.data?.terms === 'true'}
						class="mt-1 mr-3 h-4 w-4 rounded border-neutral-300 text-warm-500 focus:ring-warm-200"
						class:border-red-300={form?.error && form?.data?.terms !== 'true'}
					/>
					<label for="terms" class="text-sm text-neutral-700">
						Ik ga akkoord met de voorwaarden op de site *
					</label>
				</div>

				<!-- Honeypot field - hidden from users -->
				<div style="position: absolute; left: -9999px; opacity: 0; pointer-events: none;">
					<label for="honeypot">Website (laat dit veld leeg):</label>
					<input type="text" name="honeypot" id="honeypot" tabindex="-1" autocomplete="off" />
				</div>

				{#if form?.error}
					<div class="rounded-xl border border-red-200 bg-red-50 p-4">
						<p class="text-sm text-red-700">{form.error}</p>
					</div>
				{/if}

				<div>
					<button
						type="submit"
						disabled={loading}
						class="w-full cursor-pointer rounded-xl bg-warm-500 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-warm-600 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if loading}
							<span class="flex items-center justify-center gap-2">
								<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
									<circle
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
										fill="none"
										opacity="0.25"
									/>
									<path
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
								Verzenden...
							</span>
						{:else}
							Verhaal verzenden
						{/if}
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
