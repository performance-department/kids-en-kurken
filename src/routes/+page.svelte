<script lang="ts">
	import type { PageData } from './$types';
	import HeroSection from '$lib/components/homepage/HeroSection.svelte';
	import BlogsSection from '$lib/components/homepage/BlogsSection.svelte';
	import VerhalenSection from '$lib/components/homepage/VerhalenSection.svelte';
	import ToffeOudersSection from '$lib/components/homepage/ToffeOudersSection.svelte';
	import ArtikelenSection from '$lib/components/homepage/ArtikelenSection.svelte';
	import TVSection from '$lib/components/homepage/TVSection.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Kids en Kurken - Blog- en vlogmagazine voor èchte ouders</title>
	<meta
		name="description"
		content="Het online magazine voor moderne ouders. Lees blogs, verhalen, artikelen en bekijk video's over opvoeding, gezin en het ouderschap."
	/>
</svelte:head>

<!-- Hero Section with Latest Posts -->
<HeroSection posts={data.nieuw} />

<!-- Ad Placeholder -->
<div class="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
	<div
		class="flex h-32 w-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-100"
	>
		<span class="font-medium text-neutral-400">Advertisement</span>
	</div>
</div>

<!-- Blogs Section -->
<BlogsSection posts={data.blogs} title="Blogs" viewAllLink="/blogs" />

<!-- Verhalen Section -->
<VerhalenSection posts={data.verhalen} title="Verhalen" viewAllLink="/ouderverhalen" />

<!-- Ad Placeholder -->
<div class="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
	<div
		class="flex h-24 w-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-100"
	>
		<span class="font-medium text-neutral-400">Advertisement</span>
	</div>
</div>

<!-- Toffe Ouders Section -->
<ToffeOudersSection posts={data.toffeOuders} title="Toffe Ouders" viewAllLink="/toffe-ouders" />

<!-- Artikelen Section -->
<ArtikelenSection posts={data.artikelen} title="Artikelen" viewAllLink="/artikelen" />

<!-- TV Section -->
<TVSection posts={data.tv} title="TV" viewAllLink="/tv" />

<!-- Final Ad Placeholder -->
<div class="mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8">
	<div
		class="flex h-40 w-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-100"
	>
		<span class="font-medium text-neutral-400">Advertisement</span>
	</div>
</div>
