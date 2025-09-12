<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { goto } from '$app/navigation';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
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
				<p class="text-[1rem] font-medium text-white">Blog- en vlogmagazine voor èchte ouders</p>
			</div>

			<!-- Social Links -->
			<div class="flex items-center space-x-4">
				<span class="hidden text-[0.875rem] font-medium text-warm-200 sm:block">Volg ons:</span>

				<!-- Instagram -->
				<a
					href="https://www.instagram.com/kidsenkurkenmagazine/"
					aria-label="Volg ons op Instagram"
					class="rounded-lg p-2 text-warm-200 transition-colors hover:bg-warm-500 hover:text-white"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
						/>
					</svg>
				</a>

				<!-- Facebook -->
				<a
					href="https://www.facebook.com/kidsenkurken/"
					aria-label="Volg ons op Facebook"
					class="rounded-lg p-2 text-warm-200 transition-colors hover:bg-warm-500 hover:text-white"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
						/>
					</svg>
				</a>

				<!-- YouTube -->
				<a
					href="https://www.youtube.com/channel/UChzdujpm-327KAI4XqErKUg"
					aria-label="Volg ons op YouTube"
					class="rounded-lg p-2 text-warm-200 transition-colors hover:bg-warm-500 hover:text-white"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
						/>
					</svg>
				</a>
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
		onkeydown={handleKeydown}
		role="dialog"
		aria-labelledby="search-title"
		tabindex="-1"
	>
		<div
			class="mx-4 w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && closeSearchModal()}
			role="document"
		>
			<div class="mb-4 flex items-center justify-between">
				<h2 id="search-title" class="text-lg font-semibold text-neutral-900">Zoeken</h2>
				<button
					onclick={closeSearchModal}
					aria-label="Sluit zoekvenster"
					class="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
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
						class="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-2 text-neutral-500 hover:text-warm-500"
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
