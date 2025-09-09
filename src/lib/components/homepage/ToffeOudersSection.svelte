<script lang="ts">
	import { urlFor } from '$lib/sanity';
	import { formatPermalink, timeAgo } from '$lib/utils/date';

	interface PostListItem {
		_id: string;
		title: string;
		date: string;
		slug: { current: string };
		categories: { name: string; slug: { current: string } }[];
		featuredMedia?: {
			asset: { url: string; metadata: { lqip: string } };
			alt?: string;
		};
		estimatedReadingTime: number;
	}

	interface Props {
		posts: PostListItem[];
		title: string;
		viewAllLink: string;
	}

	let { posts, title, viewAllLink }: Props = $props();
</script>

{#if posts.length > 0}
	<section class="mb-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Section Header -->
			<div class="mb-8 flex items-center justify-between">
				<div>
					<h2 class="text-3xl font-bold text-neutral-900">{title}</h2>
					<p class="text-neutral-600">Ontdek inspirerende ouders in onze community</p>
				</div>
				<a
					href={viewAllLink}
					class="hidden sm:flex items-center gap-2 rounded-full border-2 border-mocha-200 px-6 py-3 font-medium text-mocha-700 transition-all hover:bg-mocha-50"
				>
					Bekijk alles
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>

			<!-- Posts Horizontal Scroll -->
			<div class="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
				{#each posts as post}
					<article class="group cursor-pointer flex-shrink-0 w-80">
						<a href={formatPermalink(post.date, post.slug.current)}>
							<div class="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
								<div class="relative">
									<div class="h-48 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
										<img
											src={post.featuredMedia?.asset
												? urlFor(post.featuredMedia)
														.width(320)
														.height(200)
														.auto('format')
														.fit('crop')
														.url()
												: 'https://placehold.co/320x200?text=Kids en Kurken'}
											alt={post.title}
											class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											style={`view-transition-name:${post._id}`}
										/>
									</div>
									<div class="absolute -bottom-6 left-6">
										<div class="h-12 w-12 rounded-full bg-gradient-to-br from-mocha-400 to-mocha-600 flex items-center justify-center shadow-lg">
											<span class="text-lg font-bold text-white">👨‍👩‍👧‍👦</span>
										</div>
									</div>
								</div>
								<div class="pt-8 pb-6 px-6">
									<div class="mb-2 flex flex-wrap gap-2">
										{#each post.categories as category}
											<span class="inline-block rounded-full bg-mocha-100 px-3 py-1 text-xs font-medium text-mocha-700">
												{category.name}
											</span>
										{/each}
									</div>
									<h3 class="mb-3 line-clamp-2 text-lg font-bold text-neutral-900 transition-colors group-hover:text-mocha-600">
										{post.title}
									</h3>
									<div class="flex items-center justify-between text-sm text-neutral-500">
										<span>{timeAgo(post.date)}</span>
										<span>{post.estimatedReadingTime} min lezen</span>
									</div>
								</div>
							</div>
						</a>
					</article>
				{/each}
			</div>

			<!-- Mobile View All Button -->
			<div class="mt-6 text-center sm:hidden">
				<a
					href={viewAllLink}
					class="inline-flex items-center gap-2 rounded-full bg-mocha-100 px-6 py-3 font-medium text-mocha-700"
				>
					Bekijk alles
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</div>
	</section>
{/if}

<style>
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
