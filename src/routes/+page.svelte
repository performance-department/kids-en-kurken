<script lang="ts">
	import type { PageData } from './$types';
	import { urlFor } from '$lib/sanity';

	let { data }: { data: PageData } = $props();
	const { posts } = data;
</script>

<div class="page-container">
	<h1>Latest Posts</h1>

	<ul class="post-list">
		{#each posts as post}
			<li class="post-card">
				<a href="/{post.slug.current}" class="post-link">
					{#if post.featuredMedia?.asset}
						<img
							class="featured-image"
							src={urlFor(post.featuredMedia)
								.width(400)
								.height(250)
								.auto('format')
								.fit('crop')
								.url()}
							alt={post.featuredMedia.alt || 'Featured image for {post.title}'}
							style="background-image: url({post.featuredMedia.asset.metadata.lqip});"
							loading="lazy"
						/>
					{/if}
					<div class="post-content">
						<h2>{post.title}</h2>
						<p class="post-date">{new Date(post.date).toLocaleDateString()}</p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
