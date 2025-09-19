<script lang="ts">
	import { urlFor } from '$lib/sanity';
	import { formatPermalink } from '$lib/utils/date';
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
			<div class="mb-8">
				<div class="flex items-center gap-3">
					<StarIcon size={32} class="text-warm-600" />
					<a href={viewAllLink} class="transition-colors hover:text-warm-700">
						<h2 class="text-3xl font-bold text-neutral-900">{title}</h2>
					</a>
				</div>
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
