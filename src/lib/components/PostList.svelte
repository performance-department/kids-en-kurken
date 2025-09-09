<script lang="ts">
	import { urlFor } from '$lib/sanity';
	import { formatPermalink, timeAgo } from '$lib/utils/date';

	interface PostListItem {
		_id: string;
		title: string;
		date: string;
		slug: {
			current: string;
		};
		categories: { name: string; slug: { current: string } }[];
		featuredMedia?: {
			asset: {
				url: string;
				metadata: {
					lqip: string;
				};
			};
			alt?: string;
		};
		estimatedReadingTime: number;
	}

	interface Props {
		posts: PostListItem[];
	}

	let { posts }: Props = $props();
</script>

{#if posts.length > 0}
	<!-- Posts Grid -->
	<div class="mb-12 grid gap-8 lg:grid-cols-3">
		<!-- Featured Post (spans 2 columns) -->
		<article class="group cursor-pointer lg:col-span-2">
			<a href={formatPermalink(posts[0].date, posts[0].slug.current)}>
				<div
					class="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<div
						class="h-64 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 lg:h-80"
					>
						<img
							src={urlFor(posts[0].featuredMedia)
								.width(400)
								.height(250)
								.auto('format')
								.fit('crop')
								.url()}
							alt="Featured artikel"
							class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							style={`view-transition-name:${posts[0]._id}`}
						/>
					</div>
					<div class="p-6 lg:p-8">
						<div class="mb-4 flex flex-wrap gap-2">
							{#each posts[0].categories as category (category.name)}
								<span
									class="inline-block rounded-full bg-rose-100 px-3 py-1 text-[0.75rem] leading-[1.4] font-medium text-rose-700"
								>
									{category.name}
								</span>
							{/each}
						</div>
						<h2
							class="mb-6 text-[1.5rem] leading-[1.3] font-bold text-neutral-900 transition-colors group-hover:text-rose-600 lg:text-[1.875rem] lg:leading-[1.2]"
						>
							{posts[0].title}
						</h2>
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<div class="flex h-8 w-8 items-center justify-center rounded-full bg-rose-200">
									<span class="text-xs font-medium text-rose-700">R</span>
								</div>
								<div class="text-[0.875rem] text-neutral-500">
									<span class="font-medium text-neutral-700">Redactie</span>
									<span class="mx-2">•</span>
									<span
										>{new Date(posts[0].date).toLocaleDateString('nl-NL', {
											day: 'numeric',
											month: 'long',
											year: 'numeric'
										})}</span
									>
								</div>
							</div>
							<span class="text-[0.875rem] text-neutral-500"
								>{posts[0].estimatedReadingTime} min lezen</span
							>
						</div>
					</div>
				</div>
			</a>
		</article>

		<div
			class="flex h-full w-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>

	<!-- Regular Posts Grid -->
	<div class="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each posts.slice(1) as post (post.title)}
			<article class="group cursor-pointer">
				<a href={formatPermalink(post.date, post.slug.current)}>
					<div
						class="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
					>
						<div class="h-48 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
							<img
								src={post.featuredMedia?.asset
									? urlFor(post.featuredMedia)
											.width(400)
											.height(250)
											.auto('format')
											.fit('crop')
											.url()
									: 'https://placehold.co/400x250?text=Kids en Kurken'}
								alt="Artikel"
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								style={`view-transition-name:${post._id}`}
							/>
						</div>
						<div class="p-6">
							<div class="mb-3 flex flex-wrap gap-2">
								{#each post.categories as category (category.name)}
									<span
										class="inline-block rounded-full bg-neutral-100 px-3 py-1 text-[0.75rem] leading-[1.4] font-medium text-neutral-700"
									>
										{category.name}
									</span>
								{/each}
							</div>
							<h3
								class="mb-4 line-clamp-3 text-[1.25rem] leading-[1.3] font-bold text-neutral-900 transition-colors group-hover:text-rose-600"
							>
								{post.title}
							</h3>
							<div class="flex items-center justify-between text-[0.75rem] text-neutral-500">
								<div class="flex items-center space-x-2">
									<div class="flex h-6 w-6 items-center justify-center rounded-full bg-rose-200">
										<span class="text-[0.625rem] font-medium text-rose-700">R</span>
									</div>
									<span>Redactie</span>
								</div>
								<span>{timeAgo(post.date)}</span>
							</div>
						</div>
					</div>
				</a>
			</article>
		{/each}
	</div>
{/if}
