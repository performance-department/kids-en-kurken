<script lang="ts">
	interface Props {
		items: Array<{ label: string; href?: string }>;
	}

	let { items }: Props = $props();

	// Generate structured data for breadcrumbs
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.label,
			...(item.href && { item: item.href })
		}))
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<nav class="mb-8">
	<ol
		class="flex flex-wrap items-center space-x-2 gap-y-1 text-[0.875rem] leading-[1.5] text-neutral-500"
	>
		{#each items as item, index (item.label)}
			<li>
				{#if item.href}
					<a href={item.href} class="transition-colors hover:text-warm-500">{item.label}</a>
				{:else}
					<span class="text-neutral-700">{item.label}</span>
				{/if}
			</li>
			{#if index < items.length - 1}
				<li>/</li>
			{/if}
		{/each}
	</ol>
</nav>
