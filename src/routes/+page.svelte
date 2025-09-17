<script lang="ts">
	import type { PageData } from './$types';
	import HeroSection from '$lib/components/homepage/HeroSection.svelte';
	import BlogsSection from '$lib/components/homepage/BlogsSection.svelte';
	import VerhalenSection from '$lib/components/homepage/VerhalenSection.svelte';
	import ToffeOudersSection from '$lib/components/homepage/ToffeOudersSection.svelte';
	import ArtikelenSection from '$lib/components/homepage/ArtikelenSection.svelte';
	import TVSection from '$lib/components/homepage/TVSection.svelte';
	import Ad from '$lib/components/Ad.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Kids en Kurken - Blog- en vlogmagazine voor èchte ouders</title>
	<meta
		name="description"
		content="Het online magazine voor moderne ouders. Lees blogs, verhalen, artikelen en bekijk video's over opvoeding, gezin en het ouderschap."
	/>
</svelte:head>

<!-- Hidden H1 for accessibility -->
<h1 class="sr-only">Kids en Kurken</h1>

<!-- Hero Section with Latest Posts -->
<HeroSection posts={data.nieuw} />

<Ad />

<!-- Blogs Section -->
<BlogsSection posts={data.blogs} title="Blogs" viewAllLink="/blogs" />

<!-- Verhalen Section -->
<VerhalenSection posts={data.verhalen} title="Verhalen" viewAllLink="/ouderverhalen" />

<Ad size="small" />

<!-- Toffe Ouders Section -->
<ToffeOudersSection posts={data.toffeOuders} title="Toffe Ouders" viewAllLink="/toffe-ouders" />

<!-- Artikelen Section -->
<ArtikelenSection posts={data.artikelen} title="Artikelen" viewAllLink="/artikelen" />

<!-- TV Section -->
<TVSection posts={data.tv} title="TV" viewAllLink="/tv" />

<Ad size="large" />
