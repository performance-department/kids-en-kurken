<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	// Define the shape of the 'externalImage' block from your schema
	interface ExternalImageValue {
		_type: 'externalImage';
		url: string;
		alt?: string;
	}

	interface Props {
		portableText: CustomBlockComponentProps<ExternalImageValue>;
	}

	let { portableText }: Props = $props();
	const { value } = portableText;
</script>

<figure>
	{#if value.url}
		<img
			class="my-8 h-auto w-full rounded-xl object-cover shadow-md"
			src={value.url}
			alt={value.alt || 'External image'}
		/>
	{/if}
</figure>
