<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';

	export let data: PageData;
	const { page } = data;

	const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: page.title }];
</script>

<svelte:head>
	<title>{page.title}</title>
	<meta name="description" content="Disclaimer - Kids en Kurken" />
</svelte:head>

<article class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbItems} />

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
