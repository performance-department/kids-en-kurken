<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Ad from '$lib/components/Ad.svelte';

	let { data }: { data: PageData } = $props();

	let categoryName = $derived(data.categoryName);
	let posts = $derived(data.posts);
	let currentPage = $derived(data.currentPage);
	let totalPages = $derived(data.totalPages);

	let breadcrumbItems = $derived([{ label: 'Home', href: '/' }, { label: categoryName }]);
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbItems} />

	<!-- Category Header -->
	<div class="mb-12">
		<div class="mb-6 flex items-center space-x-3">
			<span
				class="inline-block rounded-full bg-accent-100 px-4 py-2 text-[0.875rem] leading-[1.5] font-medium text-accent-700"
			>
				Categorie
			</span>
		</div>
		<h1
			class="mb-8 text-[2.5rem] leading-[1.1] font-bold tracking-[-0.02em] text-neutral-900 sm:text-[3rem] sm:leading-[1.05]"
		>
			{categoryName}
		</h1>
	</div>

	<Ad size="small" class="mb-12" />

	<PostList {posts} />

	<Pagination {currentPage} {totalPages} />
</div>
