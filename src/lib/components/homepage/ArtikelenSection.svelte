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

	const featuredPost = posts[0];
	const listPosts = posts.slice(1, 6);
</script>

{#if posts.length > 0}
	<section class="mb-16 bg-neutral-50 py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Section Header -->
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-4xl font-bold text-neutral-900">{title}</h2>
				<p class="text-lg text-neutral-600">Praktische tips en adviezen voor het ouderschap</p>
			</div>

			<div class="grid gap-8 lg:grid-cols-2">
				<!-- Featured Article -->
				{#if featuredPost}
					<article class="group cursor-pointer">
						<a href={formatPermalink(featuredPost.date, featuredPost.slug.current)}>
							<div class="overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
								<div class="relative h-72 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
									<img
										src={featuredPost.featuredMedia?.asset
											? urlFor(featuredPost.featuredMedia)
													.width(600)
													.height(400)
													.auto('format')
													.fit('crop')
													.url()
											: 'https://placehold.co/600x400?text=Kids en Kurken'}
										alt={featuredPost.title}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
										style={`view-transition-name:${featuredPost._id}`}
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
									<div class="absolute top-6 left-6">
										<span class="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">
											Featured
										</span>
									</div>
								</div>
								<div class="p-8">
									<div class="mb-4 flex flex-wrap gap-2">
										{#each featuredPost.categories as category}
											<span class="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
												{category.name}
											</span>
										{/each}
									</div>
									<h3 class="mb-4 text-2xl font-bold text-neutral-900 transition-colors group-hover:text-blue-600">
										{featuredPost.title}
									</h3>
									<div class="flex items-center justify-between text-sm text-neutral-500">
										<span>{timeAgo(featuredPost.date)}</span>
										<span>{featuredPost.estimatedReadingTime} min lezen</span>
									</div>
								</div>
							</div>
						</a>
					</article>
				{/if}

				<!-- Articles List -->
				<div class="space-y-4">
					{#each listPosts as post, index}
						<article class="group cursor-pointer">
							<a href={formatPermalink(post.date, post.slug.current)}>
								<div class="flex gap-4 rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
									<div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
										<img
											src={post.featuredMedia?.asset
												? urlFor(post.featuredMedia)
														.width(128)
														.height(128)
														.auto('format')
														.fit('crop')
														.url()
												: 'https://placehold.co/128x128?text=Kids en Kurken'}
											alt={post.title}
											class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
											style={`view-transition-name:${post._id}`}
										/>
									</div>
									<div class="flex-1 min-w-0">
										<div class="mb-2 flex items-center gap-2">
											<span class="text-lg font-bold text-blue-600">{index + 2}</span>
											<div class="flex flex-wrap gap-1">
												{#each post.categories.slice(0, 1) as category}
													<span class="rounded-full bg-neutral-100 px-2 py-1 text-xs text-neutral-600">
														{category.name}
													</span>
												{/each}
											</div>
										</div>
										<h4 class="mb-2 line-clamp-2 text-base font-bold text-neutral-900 transition-colors group-hover:text-blue-600">
											{post.title}
										</h4>
										<div class="flex items-center gap-4 text-xs text-neutral-500">
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

			<!-- View All Button -->
			<div class="mt-12 text-center">
				<a
					href={viewAllLink}
					class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-bold text-white transition-all hover:bg-blue-700"
				>
					Alle artikelen bekijken
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</div>
	</section>
{/if}
