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
	<section class="mb-16 bg-gradient-to-br from-purple-900 to-indigo-900 py-16 text-white">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Section Header -->
			<div class="mb-12 text-center">
				<div class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
					<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M8 5v14l11-7z"/>
					</svg>
					<span class="font-bold">KIDS EN KURKEN TV</span>
				</div>
				<h2 class="mb-4 text-4xl font-bold">{title}</h2>
				<p class="text-lg text-white/80">Video's, vlogs en series voor de hele familie</p>
			</div>

			<!-- Video Grid -->
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each posts as post, index}
					<article class="group cursor-pointer">
						<a href={formatPermalink(post.date, post.slug.current)}>
							<div class="overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
								<div class="relative">
									<div class="relative h-48 overflow-hidden bg-gradient-to-br from-neutral-700 to-neutral-900">
										<img
											src={post.featuredMedia?.asset
												? urlFor(post.featuredMedia)
														.width(400)
														.height(225)
														.auto('format')
														.fit('crop')
														.url()
												: 'https://placehold.co/400x225/333/fff?text=Video'}
											alt={post.title}
											class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
											style={`view-transition-name:${post._id}`}
										/>
										<div class="absolute inset-0 bg-black/20"></div>
										<!-- Play Button Overlay -->
										<div class="absolute inset-0 flex items-center justify-center">
											<div class="rounded-full bg-white/20 p-6 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
												<svg class="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
													<path d="M8 5v14l11-7z"/>
												</svg>
											</div>
										</div>
										<!-- Duration Badge -->
										<div class="absolute bottom-3 right-3">
											<span class="rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
												{post.estimatedReadingTime} min
											</span>
										</div>
									</div>
								</div>
								<div class="p-6">
									<div class="mb-3 flex flex-wrap gap-2">
										{#each post.categories as category}
											<span class="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
												{category.name}
											</span>
										{/each}
									</div>
									<h3 class="mb-3 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-purple-200">
										{post.title}
									</h3>
									<div class="flex items-center gap-4 text-sm text-white/70">
										<span>{timeAgo(post.date)}</span>
										<div class="flex items-center gap-1">
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
											<span>{Math.floor(Math.random() * 1000) + 100}</span>
										</div>
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
					class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-purple-900 transition-all hover:bg-white/90"
				>
					Alle video's bekijken
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</div>
	</section>
{/if}
