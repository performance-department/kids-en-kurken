<script lang="ts">
	interface Props {
		items: Array<{ label: string; href?: string }>;
	}

	let { items }: Props = $props();
</script>

<nav class="mb-8">
	<ol
		class="flex flex-wrap items-center space-x-2 gap-y-1 text-[0.875rem] leading-[1.5] text-neutral-500"
	>
		{#each items as item, index}
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
