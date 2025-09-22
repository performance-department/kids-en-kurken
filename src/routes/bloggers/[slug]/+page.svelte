<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PostList from '$lib/components/PostList.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { urlFor } from '$lib/sanity';
	import Ad from '$lib/components/Ad.svelte';

	let { data }: { data: PageData } = $props();

	let author = $derived(data.author);
	let posts = $derived(data.posts);
	let currentPage = $derived(data.currentPage);
	let totalPages = $derived(data.totalPages);
	let totalPosts = $derived(data.totalPosts);

	let breadcrumbItems = $derived([
		{ label: 'Home', href: '/' },
		{ label: 'Bloggers', href: '/bloggers' },
		{ label: `${author.firstName} ${author.lastName}` }
	]);

	// Function to clean text of invisible Unicode characters
	function cleanText(text: string): string {
		return text
			.replace(/[\u200B-\u200F\u2028-\u202F\u205F-\u206F\uFEFF]/g, '') // Remove zero-width and formatting characters
			.replace(/[^\w\s]/g, '') // Keep only word characters and spaces
			.replace(/\s+/g, '') // Remove all spaces
			.trim();
	}
</script>

<svelte:head>
	<title>{author.firstName} {author.lastName} - Bloggers - Kids en Kurken</title>
	<meta
		name="description"
		content="Lees alle artikelen van {author.firstName} {author.lastName} op Kids en Kurken."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbItems} />

	<!-- Author Header -->
	<div class="mb-12">
		<div class="mb-6 flex items-center space-x-3">
			<span
				class="inline-block rounded-full bg-accent-100 px-4 py-2 text-[0.875rem] leading-[1.5] font-medium text-accent-700"
			>
				Blogger
			</span>
		</div>

		<div class="mb-8 flex flex-col gap-6 md:flex-row md:items-start">
			<!-- Author Image -->
			<div class="flex-shrink-0">
				<div
					class="h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 md:h-32 md:w-32"
				>
					<img
						src={`https://placehold.co/128x128?text=${cleanText(author.firstName)}+${cleanText(author.lastName)}`}
						alt={`${author.firstName} ${author.lastName}`}
						class="h-full w-full object-cover"
					/>
				</div>
			</div>

			<!-- Author Info -->
			<div class="flex-grow">
				<h1
					class="mb-4 text-[2.5rem] leading-[1.1] font-bold tracking-[-0.02em] text-neutral-900 sm:text-[3rem] sm:leading-[1.05]"
				>
					{author.firstName}
					{author.lastName}
				</h1>
				<p class="text-[0.875rem] text-neutral-500">
					{totalPosts} artikel{totalPosts !== 1 ? 'en' : ''} gepubliceerd
				</p>
			</div>
		</div>
	</div>

	<Ad size="small" class="mb-12" />

	<!-- Posts Section -->
	{#if posts.length > 0}
		<div class="mb-8">
			<h2 class="mb-8 text-[1.75rem] leading-[1.2] font-bold text-neutral-900">
				Artikelen van {author.firstName}
				{author.lastName}
			</h2>
		</div>

		<PostList {posts} />

		<Pagination {currentPage} {totalPages} />
	{:else}
		<div class="text-center">
			<h2 class="mb-4 text-[1.75rem] leading-[1.2] font-bold text-neutral-900">
				Geen artikelen gevonden
			</h2>
			<p class="text-neutral-600">
				{author.firstName}
				{author.lastName} heeft nog geen artikelen gepubliceerd.
			</p>
		</div>
	{/if}
</div>
