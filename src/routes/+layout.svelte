<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { socialLinks, siteTagline } from '$lib/config/social';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	let showSearchModal = $state(false);
	let searchQuery = $state('');

	function openSearchModal() {
		showSearchModal = true;
		setTimeout(() => {
			document.getElementById('search-input')?.focus();
		}, 100);
	}

	function closeSearchModal() {
		showSearchModal = false;
		searchQuery = '';
	}

	function handleSearchSubmit(event: Event) {
		event.preventDefault();

		// Try to get the value from the form as well as a fallback
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const formQuery = formData.get('q') as string;

		console.log('Search query (state):', searchQuery);
		console.log('Search query (form):', formQuery);

		const queryToUse = searchQuery?.trim() || formQuery?.trim() || '';

		if (queryToUse) {
			console.log('Navigating to:', `/zoeken?q=${encodeURIComponent(queryToUse)}`);
			closeSearchModal();
			goto(`/zoeken?q=${encodeURIComponent(queryToUse)}`);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeSearchModal();
		}
	}

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navigation {openSearchModal} />

<section class="bg-warm-600 py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<!-- Tagline -->
			<div class="flex-1">
				<p class="text-[1rem] font-medium text-white">{siteTagline}</p>
			</div>

			<!-- Social Links -->
			<div class="flex items-center space-x-4">
				<span class="hidden text-[0.875rem] font-medium text-white sm:block">Volg ons:</span>

				{#each socialLinks as social (social.name)}
					<a
						href={social.url}
						aria-label={social.ariaLabel}
						class="rounded-lg p-2 text-white transition-colors hover:bg-warm-500"
						target="_blank"
					>
						{@html social.icon}
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<main class="flex-grow">
	{@render children?.()}
</main>

<Footer />

<!-- Search Modal -->
{#if showSearchModal}
	<div
		class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-16"
		onclick={closeSearchModal}
		role="presentation"
	>
		<div
			class="mx-4 w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
			role="dialog"
			aria-labelledby="search-title"
			aria-modal="true"
			tabindex="-1"
			onkeydown={handleKeydown}
			onclick={(e) => e.stopPropagation()}
		>
			<div class="mb-4 flex items-center justify-between">
				<h2 id="search-title" class="text-lg font-semibold text-neutral-900">Zoeken</h2>
				<button
					onclick={closeSearchModal}
					aria-label="Sluit zoekvenster"
					class="cursor-pointer rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</button>
			</div>

			<form onsubmit={handleSearchSubmit}>
				<div class="relative">
					<input
						id="search-input"
						name="q"
						type="text"
						bind:value={searchQuery}
						placeholder="Zoek naar artikelen..."
						class="w-full rounded-lg border border-neutral-300 px-4 py-3 pr-12 text-neutral-900 placeholder-neutral-500 focus:border-warm-500 focus:ring-2 focus:ring-warm-500/20 focus:outline-none"
					/>
					<button
						type="submit"
						aria-label="Zoeken"
						class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-lg p-2 text-neutral-500 hover:text-warm-500"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</button>
				</div>
				<p class="mt-2 text-sm text-neutral-600">Druk op Enter om te zoeken</p>
			</form>
		</div>
	</div>
{/if}
