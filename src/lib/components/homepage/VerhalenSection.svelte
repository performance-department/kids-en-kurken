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
	<section class="mb-16 bg-gradient-to-br from-rose-50 to-orange-50 py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Section Header -->
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-4xl font-bold text-neutral-900">{title}</h2>
				<p class="text-lg text-neutral-600">Ontroerende verhalen van echte ouders</p>
			</div>

			<!-- Posts Carousel-style Grid -->
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each posts as post, index}
					<article class="group cursor-pointer">
						<a href={formatPermalink(post.date, post.slug.current)}>
							<div
								class="overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
							>
								<div class="relative h-56 overflow-hidden">
									<img
										src={post.featuredMedia?.asset
											? urlFor(post.featuredMedia)
													.width(400)
													.height(300)
													.auto('format')
													.fit('crop')
													.url()
											: 'https://placehold.co/400x300?text=Kids en Kurken'}
										alt={post.title}
										class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
										style={`view-transition-name:${post._id}`}
									/>
									<div
										class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
									></div>
									<div class="absolute bottom-4 left-4">
										{#each post.categories as category}
											<span
												class="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-800 backdrop-blur-sm"
											>
												{category.name}
											</span>
										{/each}
									</div>
								</div>
								<div class="p-6">
									<h3
										class="mb-3 line-clamp-2 text-xl font-bold text-neutral-900 transition-colors group-hover:text-rose-600"
									>
										{post.title}
									</h3>
									<div class="flex items-center justify-between text-xs text-neutral-500">
										<span>{timeAgo(post.date)}</span>
										<span>{post.estimatedReadingTime} min lezen</span>
									</div>
								</div>
							</div>
						</a>
					</article>
				{/each}
			</div>

			<!-- View All Button -->
			<div class="mt-12 text-center">
				<a
					href={viewAllLink}
					class="inline-flex items-center gap-2 rounded-full bg-rose-600 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-rose-700"
				>
					Alle verhalen lezen
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
