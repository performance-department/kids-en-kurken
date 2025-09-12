<script lang="ts">
	import { urlFor } from '$lib/sanity';
	import { formatPermalink, timeAgo } from '$lib/utils/date';
	import { StarIcon } from '$lib';

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
					<div class="flex items-center gap-3">
						<StarIcon size={32} class="text-warm-600" />
						<h2 class="text-3xl font-bold text-neutral-900">{title}</h2>
					</div>
					<p class="text-neutral-600">Ontdek inspirerende ouders in onze community</p>
				</div>
				<a
					href={viewAllLink}
					class="hidden items-center gap-2 rounded-full border-2 border-warm-200 px-6 py-3 font-medium text-warm-700 transition-all hover:bg-warm-100 sm:flex"
				>
					Bekijk alles
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</a>
			</div>

			<!-- Posts Horizontal Scroll -->
			<div class="scrollbar-hide flex gap-6 overflow-x-auto pb-4">
				{#each posts as post}
					<article class="group h-full w-80 flex-shrink-0 cursor-pointer">
						<a href={formatPermalink(post.date, post.slug.current)} class="block h-full">
							<div
								class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
							>
								<div class="relative">
									<div
										class="h-48 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200"
									>
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
								</div>
								<div class="flex flex-grow flex-col px-6 pt-6 pb-6">
									<h3
										class="mb-3 line-clamp-3 flex-grow text-lg font-bold text-neutral-900 transition-colors group-hover:text-warm-600"
									>
										{post.title}
									</h3>
									<div class="mt-auto flex items-center justify-between text-sm text-neutral-500">
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
					class="inline-flex items-center gap-2 rounded-full bg-warm-200 px-6 py-3 font-medium text-warm-800"
				>
					Bekijk alles
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
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
