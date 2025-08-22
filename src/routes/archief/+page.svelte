<script lang="ts">
	import type { PageData } from './$types';
	import { urlFor } from '$lib/sanity';

	let { data }: { data: PageData } = $props();

	// Use $derived to make these reactive
	let posts = $derived(data.posts);
	let currentPage = $derived(data.currentPage);
	let totalPages = $derived(data.totalPages);

	// This derived value will create our smart pagination array
	let paginationLinks = $derived.by(() => {
		const pageRange = 2; // How many pages to show on each side of the current page
		const links: (number | string)[] = [];

		// Not enough pages to need ellipses
		if (totalPages <= 5 + pageRange) {
			for (let i = 1; i <= totalPages; i++) {
				links.push(i);
			}
			return links;
		}

		// Always show the first page
		links.push(1);
		if (currentPage > pageRange + 2) {
			links.push('...');
		}

		// Pages around the current page
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

		// Always show the last page
		links.push(totalPages);

		return links;
	});

	function formatPermalink(dateString, slug) {
		const date = new Date(dateString);
		const year = date.getUTCFullYear();
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const day = String(date.getUTCDate()).padStart(2, '0');
		return `/${year}/${month}/${day}/${slug}`;
	}

	function timeAgo(dateString) {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now - date;
		const seconds = Math.floor(diffMs / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const years = Math.floor(days / 365);
		if (years > 0) return years === 1 ? '1 jaar geleden' : `${years} jaar geleden`;
		if (days > 0) return days === 1 ? '1 dag geleden' : `${days} dagen geleden`;
		if (hours > 0) return hours === 1 ? '1 uur geleden' : `${hours} uur geleden`;
		if (minutes > 0) return minutes === 1 ? '1 minuut geleden' : `${minutes} minuten geleden`;
		return 'zojuist';
	}
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<!-- Breadcrumb -->
	<nav class="mb-8">
		<ol
			class="flex flex-wrap items-center space-x-2 gap-y-1 text-[0.875rem] leading-[1.5] text-neutral-500"
		>
			<li><a href="/" class="transition-colors hover:text-mocha-500">Home</a></li>
			<li>/</li>
			<li class="text-neutral-700">Archief</li>
		</ol>
	</nav>

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

	<!-- Posts Grid -->
	<div class="mb-12 grid gap-8 lg:grid-cols-3">
		<!-- Featured Post (spans 2 columns) -->
		<article class="group cursor-pointer lg:col-span-2">
			<a href={formatPermalink(posts[0].date, posts[0].slug.current)}>
				<div
					class="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<div
						class="h-64 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 lg:h-80"
					>
						<img
							src={urlFor(posts[0].featuredMedia)
								.width(400)
								.height(250)
								.auto('format')
								.fit('crop')
								.url()}
							alt="Spaarpot artikel"
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							style={`view-transition-name:${posts[0]._id}`}
						/>
					</div>
					<div class="p-6 lg:p-8">
						<div class="mb-4 flex flex-wrap gap-2">
							{#each posts[0].categories as category (category.name)}
								<span
									class="inline-block rounded-full bg-rose-100 px-3 py-1 text-[0.75rem] leading-[1.4] font-medium text-rose-700"
								>
									{category.name}
								</span>
							{/each}
						</div>
						<h2
							class="mb-6 text-[1.5rem] leading-[1.3] font-bold text-neutral-900 transition-colors group-hover:text-rose-600 lg:text-[1.875rem] lg:leading-[1.2]"
						>
							{posts[0].title}
						</h2>
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<div class="flex h-8 w-8 items-center justify-center rounded-full bg-rose-200">
									<span class="text-xs font-medium text-rose-700">R</span>
								</div>
								<div class="text-[0.875rem] text-neutral-500">
									<span class="font-medium text-neutral-700">Redactie</span>
									<span class="mx-2">•</span>
									<span
										>{new Date(posts[0].date).toLocaleDateString('nl-NL', {
											day: 'numeric',
											month: 'long',
											year: 'numeric'
										})}</span
									>
								</div>
							</div>
							<span class="text-[0.875rem] text-neutral-500"
								>{posts[0].estimatedReadingTime} min lezen</span
							>
						</div>
					</div>
				</div>
			</a>
		</article>

		<div
			class="flex h-full w-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>

	<!-- Regular Posts Grid -->
	<div class="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		<!-- Post 1 -->
		{#each posts.slice(1) as post (post.title)}
			<!-- <pre>{JSON.stringify(post, null, 2)}</pre> -->
			<article class="group cursor-pointer">
				<a href={formatPermalink(post.date, post.slug.current)}>
					<div
						class="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<div class="h-48 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
							<img
								src={post.featuredMedia.asset
									? urlFor(post.featuredMedia)
											.width(400)
											.height(250)
											.auto('format')
											.fit('crop')
											.url()
									: 'https://placehold.co/400x250?text=Kids en Kurken'}
								alt="Gezonde maaltijd"
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								style={`view-transition-name:${post._id}`}
							/>
						</div>
						<div class="p-6">
							<div class="mb-3 flex flex-wrap gap-2">
								{#each post.categories as category (category.name)}
									<span
										class="inline-block rounded-full bg-neutral-100 px-3 py-1 text-[0.75rem] leading-[1.4] font-medium text-neutral-700"
									>
										{category.name}
									</span>
								{/each}
							</div>
							<h3
								class="mb-4 line-clamp-3 text-[1.25rem] leading-[1.3] font-bold text-neutral-900 transition-colors group-hover:text-rose-600"
							>
								{post.title}
							</h3>
							<div class="flex items-center justify-between text-[0.75rem] text-neutral-500">
								<div class="flex items-center space-x-2">
									<div class="flex h-6 w-6 items-center justify-center rounded-full bg-rose-200">
										<span class="text-[0.625rem] font-medium text-rose-700">R</span>
									</div>
									<span>Redactie</span>
								</div>
								<span>{timeAgo(post.date)}</span>
							</div>
						</div>
					</div>
				</a>
			</article>
		{/each}
	</div>

	<!-- Pagination -->
	{#if totalPages > 1}
		<div class="flex items-center justify-center space-x-2">
			<!-- Previous Button -->
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

			<!-- Page Numbers -->
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

			<!-- Next Button -->
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
</div>
