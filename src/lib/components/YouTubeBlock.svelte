<script lang="ts">
	import type { CustomBlockComponentProps } from '@portabletext/svelte';

	interface YouTubeValue {
		_type: 'youtube';
		videoId: string;
		title?: string;
	}

	interface Props {
		portableText: CustomBlockComponentProps<YouTubeValue>;
	}

	let { portableText }: Props = $props();
	const { value } = portableText;
</script>

<figure class="my-8">
	{#if value.videoId}
		<div class="relative aspect-video w-full overflow-hidden rounded-xl shadow-md">
			<iframe
				src="https://www.youtube.com/embed/{value.videoId}"
				title={value.title || 'YouTube video'}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="absolute inset-0 h-full w-full"
			></iframe>
		</div>
		{#if value.title}
			<figcaption class="mt-2 text-center text-sm text-neutral-600">
				{value.title}
			</figcaption>
		{/if}
	{/if}
</figure>
