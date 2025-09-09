<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Ad from '$lib/components/Ad.svelte';

	let { data }: { data: PageData } = $props();

	let posts = $derived(data.posts);
	let currentPage = $derived(data.currentPage);
	let totalPages = $derived(data.totalPages);
	let query = $derived(data.query);
	let totalResults = $derived(data.totalResults);

	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Zoeken' }
	];
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbItems} />

	<!-- Search Header -->
	<div class="mb-12">
		<h1
			class="mb-4 text-[2.5rem] leading-[1.1] font-bold tracking-[-0.02em] text-neutral-900 sm:text-[3rem] sm:leading-[1.05]"
		>
			Zoekresultaten
		</h1>

		{#if query}
			<p class="text-lg text-neutral-600">
				{#if totalResults > 0}
					{totalResults} {totalResults === 1 ? 'resultaat' : 'resultaten'} voor "{query}"
				{:else}
					Geen resultaten gevonden voor "{query}"
				{/if}
			</p>
		{:else}
			<p class="text-lg text-neutral-600">Voer een zoekterm in om te beginnen</p>
		{/if}
	</div>

	<Ad size="small" class="mb-12" />

	{#if posts.length > 0}
		<PostList {posts} />
		<Pagination {currentPage} {totalPages} />
	{:else if query}
		<div class="text-center py-12">
			<svg class="mx-auto h-12 w-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
			</svg>
			<h3 class="mt-4 text-lg font-medium text-neutral-900">Geen resultaten gevonden</h3>
			<p class="mt-2 text-neutral-600">Probeer een andere zoekterm of controleer je spelling.</p>
		</div>
	{/if}
</div>
