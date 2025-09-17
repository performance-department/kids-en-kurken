<script lang="ts">
	import { page } from '$app/stores';
	import { SvelteURLSearchParams } from 'svelte/reactivity';

	interface Props {
		currentPage: number;
		totalPages: number;
	}

	let { currentPage, totalPages }: Props = $props();

	// Helper function to create URL with preserved search params
	function createPageUrl(pageNumber: number): string {
		const searchParams = new SvelteURLSearchParams($page.url.searchParams);
		searchParams.set('page', pageNumber.toString());
		return `?${searchParams.toString()}`;
	}

	let paginationLinks = $derived.by(() => {
		const pageRange = 2;
		const links: (number | string)[] = [];

		if (totalPages <= 5 + pageRange) {
			for (let i = 1; i <= totalPages; i++) {
				links.push(i);
			}
			return links;
		}

		links.push(1);
		if (currentPage > pageRange + 2) {
			links.push('...');
		}

		for (
			let i = Math.max(2, currentPage - pageRange);
			i <= Math.min(totalPages - 1, currentPage + pageRange);
			i++
		) {
			links.push(i);
		}

		if (currentPage < totalPages - (pageRange + 1)) {
			links.push('...');
		}

		links.push(totalPages);

		return links;
	});
</script>

{#if totalPages > 1}
	<nav aria-label="Paginatie navigatie" class="flex items-center justify-center space-x-2">
		{#if currentPage > 1}
			<a
				href={createPageUrl(currentPage - 1)}
				class="rounded-lg bg-neutral-100 px-4 py-2 text-neutral-500 transition-colors hover:bg-neutral-200"
				aria-label="Vorige pagina"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
			</a>
		{:else}
			<button
				disabled
				class="cursor-not-allowed rounded-lg bg-neutral-100 px-4 py-2 text-neutral-500 opacity-50"
				aria-label="Vorige pagina (uitgeschakeld)"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
					></path>
				</svg>
			</button>
		{/if}

		{#each paginationLinks as link (link)}
			{#if typeof link === 'number'}
				<a
					href={createPageUrl(link)}
					class="flex h-10 w-10 items-center justify-center rounded-lg font-medium transition-colors {currentPage ===
					link
						? 'bg-warm-600 text-white'
						: 'bg-neutral-100 text-neutral-700 hover:bg-warm-100 hover:text-warm-700'}"
					aria-label="Ga naar pagina {link}"
					aria-current={currentPage === link ? 'page' : undefined}
				>
					{link}
				</a>
			{:else}
				<span class="px-2 text-neutral-500">...</span>
			{/if}
		{/each}

		{#if currentPage < totalPages}
			<a
				href={createPageUrl(currentPage + 1)}
				class="rounded-lg bg-neutral-100 px-4 py-2 text-neutral-500 transition-colors hover:bg-neutral-200"
				aria-label="Volgende pagina"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
					></path>
				</svg>
			</a>
		{:else}
			<button
				disabled
				class="cursor-not-allowed rounded-lg bg-neutral-100 px-4 py-2 text-neutral-500 opacity-50"
				aria-label="Volgende pagina (uitgeschakeld)"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
					></path>
				</svg>
			</button>
		{/if}
	</nav>
{/if}
