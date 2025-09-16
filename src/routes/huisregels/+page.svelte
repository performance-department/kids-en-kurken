<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { page } = data;
</script>

<svelte:head>
	<title>{page.title}</title>
	<meta name="description" content="Huisregels - Kids en Kurken" />
</svelte:head>

<article class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	<nav class="mb-8">
		<ol
			class="flex flex-wrap items-center space-x-2 gap-y-1 text-[0.875rem] leading-[1.5] text-neutral-500"
		>
			<li><a href="/" class="transition-colors hover:text-warm-500">Home</a></li>
			<li>/</li>
			<li class="text-neutral-700">{page.title}</li>
		</ol>
	</nav>

	<div class="mb-8">
		<h1
			class="mb-6 text-[2.25rem] leading-[1.15] font-bold tracking-[-0.015em] break-words hyphens-auto text-neutral-900 max-sm:text-[1.625rem] max-sm:leading-[1.25] sm:text-[1.875rem] sm:leading-[1.2]"
		>
			{page.title}
		</h1>
	</div>

	<div class="prose max-w-4xl prose-neutral">
		{#if page.content}
			<PortableText value={page.content} />
		{/if}
	</div>
</article>
