<script lang="ts">
	interface Props {
		currentPage: number;
		totalPages: number;
	}

	let { currentPage, totalPages }: Props = $props();

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
	<div class="flex items-center justify-center space-x-2">
		<a
			href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
			class="rounded-lg bg-neutral-100 px-4 py-2 text-neutral-500 transition-colors hover:bg-neutral-200 {currentPage ===
			1
				? 'cursor-not-allowed opacity-50'
				: ''}"
			aria-disabled={currentPage === 1}
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
				></path>
			</svg>
		</a>

		{#each paginationLinks as link}
			{#if typeof link === 'number'}
				<a
					href={`?page=${link}`}
					class="flex h-10 w-10 items-center justify-center rounded-lg font-medium transition-colors {currentPage ===
					link
						? 'bg-mocha-500 text-white'
						: 'bg-neutral-100 text-neutral-700 hover:bg-mocha-100 hover:text-mocha-700'}"
				>
					{link}
				</a>
			{:else}
				<span class="px-2 text-neutral-500">...</span>
			{/if}
		{/each}

		<a
			href={currentPage < totalPages ? `?page=${currentPage + 1}` : '#'}
			class="rounded-lg bg-mocha-100 px-4 py-2 text-mocha-500 transition-colors hover:bg-mocha-200 {currentPage ===
			totalPages
				? 'cursor-not-allowed opacity-50'
				: ''}"
			aria-disabled={currentPage === totalPages}
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
				></path>
			</svg>
		</a>
	</div>
{/if}
