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

<article class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-8">
		{#if post.categories?.length}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each post.categories as category (category.name)}
					<span
						class="inline-block rounded-full bg-rose-100 px-4 py-2 text-[0.875rem] leading-[1.5] font-medium text-rose-700"
					>
						{category.name}
					</span>
				{/each}
			</div>
		{/if}
		<h1
			class="mb-6 text-[2.25rem] leading-[1.15] font-bold tracking-[-0.015em] break-words hyphens-auto text-neutral-900 max-sm:text-[1.625rem] max-sm:leading-[1.25] sm:text-[1.875rem] sm:leading-[1.2]"
		>
			{post.title}
		</h1>
		<div
			class="flex flex-wrap items-center space-x-6 gap-y-2 text-[0.875rem] leading-[1.5] text-neutral-500"
		>
			<div class="flex items-center space-x-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-rose-200">
					<span class="text-xs font-medium text-rose-700">R</span>
				</div>
				<span>Door Redactie</span>
			</div>
			<span class="hidden sm:inline">•</span>
			<span
				>{new Date(post.date).toLocaleDateString('nl-NL', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				})}</span
			>
			<span class="hidden sm:inline">•</span>
			<span>{post.estimatedReadingTime} min lezen</span>
			<span class="hidden sm:inline">•</span>
			<span>19 reacties</span>
		</div>
	</div>

	<div class="mb-8">
		<div
			class="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>

	<div class="prose max-w-4xl prose-neutral">
		<PortableText value={post.content} {components} />
	</div>

	{#if post.tags?.length}
		<div class="mt-8 border-t border-neutral-100 pt-6">
			<div class="flex flex-wrap items-center gap-3">
				<span class="text-[0.875rem] font-medium text-neutral-500">Tags:</span>
				<div class="flex flex-wrap gap-2">
					{#each post.tags as tag (tag.name)}
						<a
							href="/tag/{tag.slug.current}"
							class="inline-flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 text-[0.75rem] font-medium text-neutral-600 transition-colors hover:border-mocha-200 hover:bg-mocha-50 hover:text-mocha-700"
						>
							#{tag.name.toLowerCase()}
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<div class="mt-8 mb-8">
		<div
			class="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>
</article>
