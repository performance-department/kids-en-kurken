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
	<section class="mb-16 bg-gradient-to-br from-warm-50 to-warm-100 py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Section Header -->
			<div class="mb-8 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<StarIcon size={32} class="text-warm-600" />
					<h2 class="text-3xl font-bold text-neutral-900">{title}</h2>
				</div>
				<a
					href={viewAllLink}
					class="group flex items-center gap-2 rounded-full bg-warm-200 px-6 py-3 font-medium text-warm-800 transition-all hover:bg-warm-300"
				>
					Bekijk alles
					<svg
						class="h-4 w-4 transition-transform group-hover:translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</a>
			</div>

			<!-- Video Grid -->
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each posts as post, index}
					<article class="group h-full cursor-pointer">
						<a href={formatPermalink(post.date, post.slug.current)} class="block h-full">
							<div
								class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
							>
								<div class="relative">
									<div
										class="relative h-48 overflow-hidden bg-gradient-to-br from-neutral-700 to-neutral-900"
									>
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
									</div>
								</div>
								<div class="flex flex-grow flex-col p-6">
									<h3
										class="mb-3 line-clamp-3 flex-grow text-lg font-bold text-neutral-900 transition-colors group-hover:text-warm-600"
									>
										{post.title}
									</h3>
								</div>
							</div>
						</a>
					</article>
				{/each}
			</div>
		</div>
	</section>
{/if}
