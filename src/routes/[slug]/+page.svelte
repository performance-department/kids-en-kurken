<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import ImageBlock from '$lib/components/ImageBlock.svelte';
	import ExternalImageBlock from '$lib/components/ExternalImageBlock.svelte';
	import type { PortableTextComponents } from '@portabletext/svelte';

	let { data }: { data: PageData } = $props();
	const { post } = data;

	const components: PortableTextComponents = {
		types: {
			image: ImageBlock,
			externalImage: ExternalImageBlock
		}
	};
</script>

<article class="mx-auto prose max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	<h1>{post.title}</h1>
	<p class="date">Published on: {new Date(post.date).toLocaleDateString()}</p>

	<p>Reading time: {post.estimatedReadingTime} min</p>

	<!-- Render Categories -->
	{#if post.categories?.length}
		<div class="tag-list">
			<strong>Categories:</strong>
			<ul>
				{#each post.categories as category}
					<li>
						<a href="/category/{category.slug.current}">{category.name}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Render Tags -->
	{#if post.tags?.length}
		<div>
			<strong>Tags:</strong>
			<ul>
				{#each post.tags as tag}
					<li>
						<a href="/tag/{tag.slug.current}">{tag.name}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div class="mb-8">
		<div
			class="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>

	<div>
		<PortableText value={post.content} {components} />
	</div>

	<div class="mt-8 mb-8">
		<div
			class="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>
</article>
