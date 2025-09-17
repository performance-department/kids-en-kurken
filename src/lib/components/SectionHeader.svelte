<script lang="ts">
	import { StarIcon } from '$lib';
	import type { SectionHeaderProps } from '$lib/types/components';

	interface Props extends SectionHeaderProps {
		class?: string;
	}

	let {
		title,
		icon,
		iconClass = 'text-warm-600',
		viewAllLink,
		viewAllText = 'Bekijk alles',
		class: className = ''
	}: Props = $props();

	const IconComponent = icon || StarIcon;
</script>

<div class="mb-8 flex items-center justify-between {className}">
	<div class="flex items-center gap-3">
		<IconComponent size={32} class={iconClass} />
		<h2 class="text-3xl font-bold text-neutral-900">{title}</h2>
	</div>
	{#if viewAllLink}
		{#if viewAllText?.includes('→')}
			<a
				href={viewAllLink}
				class="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
			>
				{viewAllText}
			</a>
		{:else}
			<a
				href={viewAllLink}
				class="group flex items-center gap-2 rounded-full bg-warm-200 px-6 py-3 font-medium text-warm-800 transition-all hover:bg-warm-300"
			>
				{viewAllText}
				<svg
					class="h-4 w-4 transition-transform group-hover:translate-x-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6"
					></path>
				</svg>
			</a>
		{/if}
	{/if}
</div>
