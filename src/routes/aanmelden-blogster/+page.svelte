<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	export let form: ActionData;

	let loading = false;
</script>

<svelte:head>
	<title>Aanmelden Blogster - Kids en Kurken</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12">
	<div class="mb-8">
		<h1 class="mb-4 text-4xl font-bold text-neutral-900">Aanmelden Blogster</h1>
		<p class="text-lg text-neutral-600">
			Kan jij een flink potje schrijven of filmen over ouderschap of heb je verhalen op een bepaald
			vakgebied (zoals verloskunde, kraamzorg en dergelijke)? Dan hebben we jou graag als vaste
			blogger of vlogger op Kids en Kurken! Vul hieronder jouw gegevens in.
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
					Bedankt voor je aanmelding! We nemen zo spoedig mogelijk contact met je op.
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
					<label for="lastName" class="mb-2 block text-sm font-medium text-neutral-700">
						Achternaam *
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						value={form?.data?.lastName || ''}
						class="w-full rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-warm-300 focus:ring-2 focus:ring-warm-200"
						class:border-red-300={form?.error && form?.data?.lastName === ''}
						class:focus:border-red-300={form?.error && form?.data?.lastName === ''}
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
					<label for="website" class="mb-2 block text-sm font-medium text-neutral-700">
						Website
					</label>
					<input
						type="url"
						id="website"
						name="website"
						placeholder="https://jouwwebsite.nl"
						value={form?.data?.website || ''}
						class="w-full rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-warm-300 focus:ring-2 focus:ring-warm-200"
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
					<label for="subjects" class="mb-2 block text-sm font-medium text-neutral-700">
						Over deze onderwerpen deel ik content *
					</label>
					<textarea
						id="subjects"
						name="subjects"
						rows="6"
						required
						placeholder="Vertel ons over de onderwerpen waar je content over maakt..."
						value={form?.data?.subjects || ''}
						class="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-warm-300 focus:ring-2 focus:ring-warm-200"
						class:border-red-300={form?.error && form?.data?.subjects === ''}
						class:focus:border-red-300={form?.error && form?.data?.subjects === ''}
					></textarea>
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
							Aanmelding verzenden
						{/if}
					</button>
				</div>
			</div>
		</form>
	</div>
</div>
