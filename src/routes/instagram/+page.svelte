<script lang="ts">
	import type { PageData } from './$types';
	import { urlFor } from '$lib/sanity';
	import { formatPermalink } from '$lib/utils/date';
	import { StarIcon } from '$lib';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Ad from '$lib/components/Ad.svelte';

	let { data }: { data: PageData } = $props();

	let posts = $derived(data.posts);
	let currentPage = $derived(data.currentPage);
	let totalPages = $derived(data.totalPages);

	let breadcrumbItems = $derived([{ label: 'Home', href: '/' }, { label: 'Instagram' }]);

	// Split posts into sections like HeroSection does
	const featuredPost = $derived(posts[0]);
	const sidePosts = $derived(posts.slice(1, 4));
	const additionalPosts = $derived(posts.slice(4, 12));
</script>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbItems} />

	<!-- Instagram Header -->
	<div class="mb-12">
		<div class="mb-6 flex items-center space-x-3">
			<span
				class="inline-block rounded-full bg-accent-100 px-4 py-2 text-[0.875rem] leading-[1.5] font-medium text-accent-700"
			>
				Social Media
			</span>
		</div>
		<h1
			class="mb-8 text-[2.5rem] leading-[1.1] font-bold tracking-[-0.02em] text-neutral-900 sm:text-[3rem] sm:leading-[1.05]"
		>
			Instagram
		</h1>
	</div>

	{#if featuredPost}
		<section class="mb-16">
			<div class="grid gap-8 lg:grid-cols-3">
				<!-- Main Featured Post -->
				<article class="group cursor-pointer lg:col-span-2">
					<a href={formatPermalink(featuredPost.date, featuredPost.slug.current)}>
						<div
							class="hover:shadow-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-100 to-neutral-200 shadow-2xl transition-all duration-500 hover:-translate-y-2"
						>
							<div class="relative h-80 overflow-hidden lg:h-96">
								<img
									src={featuredPost.featuredMedia?.asset
										? urlFor(featuredPost.featuredMedia)
												.width(800)
												.height(400)
												.auto('format')
												.fit('crop')
												.url()
										: 'https://placehold.co/800x400?text=Kids en Kurken'}
									alt={featuredPost.title}
									class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
								></div>
								<div class="absolute right-6 bottom-6 left-6">
									<h1
										class="mb-4 line-clamp-4 text-3xl leading-tight font-bold text-white lg:text-4xl"
									>
										{featuredPost.title}
									</h1>
									<div class="flex items-center text-white/90">
										<span class="text-sm">{featuredPost.estimatedReadingTime} min lezen</span>
									</div>
								</div>
							</div>
						</div>
					</a>
				</article>

				<!-- Side Posts -->
				<div class="space-y-6">
					{#each sidePosts as post (post._id)}
						<article class="group cursor-pointer">
							<a href={formatPermalink(post.date, post.slug.current)}>
								<div
									class="flex gap-4 rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
								>
									<div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
										<img
											src={post.featuredMedia?.asset
												? urlFor(post.featuredMedia)
														.width(160)
														.height(160)
														.auto('format')
														.fit('crop')
														.url()
												: 'https://placehold.co/160x160?text=Kids en Kurken'}
											alt={post.title}
											class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
										/>
									</div>
									<div class="min-w-0 flex-1">
										<h3
											class="mb-2 line-clamp-3 text-sm leading-tight font-bold text-neutral-900 group-hover:text-warm-600"
										>
											{post.title}
										</h3>
										<p class="text-xs text-neutral-500">{post.estimatedReadingTime} min</p>
									</div>
								</div>
							</a>
						</article>
					{/each}
				</div>
			</div>

			<!-- Additional 8 Posts Below -->
			{#if additionalPosts.length > 0}
				<div class="mt-6 lg:mt-12">
					<!-- Mobile/Tablet: Vertical list like side posts -->
					<div class="space-y-6 lg:hidden">
						{#each additionalPosts as post (post._id)}
							<article class="group cursor-pointer">
								<a href={formatPermalink(post.date, post.slug.current)}>
									<div
										class="flex gap-4 rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
									>
										<div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
											<img
												src={post.featuredMedia?.asset
													? urlFor(post.featuredMedia)
															.width(160)
															.height(160)
															.auto('format')
															.fit('crop')
															.url()
													: 'https://placehold.co/160x160?text=Kids en Kurken'}
												alt={post.title}
												class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
											/>
										</div>
										<div class="min-w-0 flex-1">
											<h3
												class="mb-2 line-clamp-3 text-sm leading-tight font-bold text-neutral-900 group-hover:text-warm-600"
											>
												{post.title}
											</h3>
											<p class="text-xs text-neutral-500">{post.estimatedReadingTime} min</p>
										</div>
									</div>
								</a>
							</article>
						{/each}
					</div>

					<!-- Desktop: 4-column grid -->
					<div class="hidden gap-6 lg:grid lg:grid-cols-4">
						{#each additionalPosts as post (post._id)}
							<article class="group cursor-pointer">
								<a href={formatPermalink(post.date, post.slug.current)}>
									<div
										class="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
									>
										<div class="aspect-video w-full overflow-hidden rounded-xl">
											<img
												src={post.featuredMedia?.asset
													? urlFor(post.featuredMedia)
															.width(300)
															.height(200)
															.auto('format')
															.fit('crop')
															.url()
													: 'https://placehold.co/300x200?text=Kids en Kurken'}
												alt={post.title}
												class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
											/>
										</div>
										<div>
											<h3
												class="mb-2 line-clamp-3 h-12 text-sm leading-tight font-bold text-neutral-900 group-hover:text-warm-600"
											>
												{post.title}
											</h3>
											<p class="text-xs text-neutral-500">{post.estimatedReadingTime} min</p>
										</div>
									</div>
								</a>
							</article>
						{/each}
					</div>
				</div>
			{/if}
		</section>
	{/if}

	<Pagination {currentPage} {totalPages} />
</div>
