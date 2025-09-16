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

			<!-- Posts Grid -->
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each posts as post, index}
					<article
						class="group h-full cursor-pointer {index < 2 ? 'md:col-span-1 lg:col-span-2' : ''}"
					>
						<a href={formatPermalink(post.date, post.slug.current)} class="block h-full">
							<div
								class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
								<div class="flex flex-grow flex-col p-6">
									<h3
										class="mb-3 line-clamp-3 flex-grow {index < 2
											? 'text-lg'
											: 'text-base'} font-bold text-neutral-900 transition-colors group-hover:text-warm-600"
									>
										{post.title}
									</h3>
									<div class="mt-auto flex items-center justify-between text-xs text-neutral-500">
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
