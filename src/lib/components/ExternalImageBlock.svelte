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
		<img src={value.url} alt={value.alt || 'External image'} />
	{/if}
</figure>
