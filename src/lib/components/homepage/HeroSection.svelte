<script lang="ts">
	import { urlFor } from '$lib/sanity';
	import { formatPermalink } from '$lib/utils/date';
	import { StarIcon } from '$lib';
	import type { PostListItem } from '$lib/types/components';

	interface Props {
		posts: PostListItem[];
	}

	let { posts }: Props = $props();

	const featuredPost = posts[0];
	const sidePosts = posts.slice(1, 4);
	const additionalPosts = posts.slice(4, 8);
</script>

{#if featuredPost}
	<section class="mb-16 pt-8">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-8 flex items-center gap-3">
				<StarIcon size={32} class="text-neutral-700" />
				<a href="/archief" class="transition-colors hover:text-warm-600">
					<h2 class="text-3xl font-bold text-neutral-900">Nieuw</h2>
				</a>
			</div>
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

			<!-- Additional 4 Posts Below -->
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
		</div>
	</section>
{/if}
