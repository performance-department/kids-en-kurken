<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanity';
	import type { SanityImageObject } from '@sanity/image-url/lib/types/types';

	interface Props {
		portableText: CustomBlockComponentProps<SanityImageObject & { alt?: string }>;
	}

	let { portableText }: Props = $props();

	// The value property of the portableText prop contains the image data
	const { value } = portableText;
</script>

<figure>
	<img src={urlFor(value).width(800).auto('format').url()} alt={value.alt || 'Missing alt text'} />
	<!-- You can also add a caption if your schema supports it -->
</figure>
