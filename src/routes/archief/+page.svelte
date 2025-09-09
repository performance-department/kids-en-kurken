<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	let { data }: { data: PageData } = $props();

	let posts = $derived(data.posts);
	let currentPage = $derived(data.currentPage);
	let totalPages = $derived(data.totalPages);

	const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: 'Archief' }];
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbItems} />

	<!-- Category Header -->
	<div class="mb-12">
		<h1
			class="mb-8 text-[2.5rem] leading-[1.1] font-bold tracking-[-0.02em] text-neutral-900 sm:text-[3rem] sm:leading-[1.05]"
		>
			Archief
		</h1>
	</div>

	<!-- Ad Placeholder - Top Banner -->
	<div class="mb-12">
		<div
			class="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>

	<PostList {posts} />

	<Pagination {currentPage} {totalPages} />
</div>
