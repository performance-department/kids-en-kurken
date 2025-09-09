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
				<div class="flex items-center gap-3">
					<StarIcon size={32} class="text-mocha-600" />
					<h2 class="text-3xl font-bold text-neutral-900">{title}</h2>
				</div>
				<a
					href={viewAllLink}
					class="group flex items-center gap-2 rounded-full bg-mocha-100 px-6 py-3 font-medium text-mocha-700 transition-all hover:bg-mocha-200"
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

			<!-- Posts Grid -->
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each posts as post, index}
					<article class="group cursor-pointer {index < 2 ? 'md:col-span-1 lg:col-span-2' : ''}">
						<a href={formatPermalink(post.date, post.slug.current)}>
							<div
								class="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
							>
								<div
									class="relative {index < 2
										? 'h-64'
										: 'h-48'} overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200"
								>
									<img
										src={post.featuredMedia?.asset
											? urlFor(post.featuredMedia)
													.width(index < 2 ? 600 : 300)
													.height(index < 2 ? 300 : 200)
													.auto('format')
													.fit('crop')
													.url()
											: 'https://placehold.co/400x250?text=Kids en Kurken'}
										alt={post.title}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
										style={`view-transition-name:${post._id}`}
									/>
									{#if index < 2}
										<div
											class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
										></div>
									{/if}
								</div>
								<div class="p-6">
									<div class="mb-3 flex flex-wrap gap-2">
										{#each post.categories as category}
											<span
												class="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700"
											>
												{category.name}
											</span>
										{/each}
									</div>
									<h3
										class="mb-3 line-clamp-2 {index < 2
											? 'text-lg'
											: 'text-base'} font-bold text-neutral-900 transition-colors group-hover:text-mocha-600"
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
		</div>
	</section>
{/if}
