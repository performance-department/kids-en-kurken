<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import { urlFor } from '$lib/sanity';
	import Ad from '$lib/components/Ad.svelte';

	let { data }: { data: PageData } = $props();

	let authors = $derived(data.authors);

	let breadcrumbItems = $derived([{ label: 'Home', href: '/' }, { label: 'Bloggers' }]);

	// Function to clean text of invisible Unicode characters
	function cleanText(text: string): string {
		return text
			.replace(/[\u200B-\u200F\u2028-\u202F\u205F-\u206F\uFEFF]/g, '') // Remove zero-width and formatting characters
			.replace(/[^\w\s]/g, '') // Keep only word characters and spaces
			.replace(/\s+/g, '') // Remove all spaces
			.trim();
	}
</script>

<svelte:head>
	<title>Bloggers - Kids en Kurken</title>
	<meta
		name="description"
		content="Ontdek alle bloggers van Kids en Kurken en lees hun artikelen."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<Breadcrumb items={breadcrumbItems} />

	<!-- Header -->
	<div class="mb-12">
		<div class="mb-6 flex items-center space-x-3">
			<span
				class="inline-block rounded-full bg-accent-100 px-4 py-2 text-[0.875rem] leading-[1.5] font-medium text-accent-700"
			>
				Bloggers
			</span>
		</div>
		<h1
			class="mb-8 text-[2.5rem] leading-[1.1] font-bold tracking-[-0.02em] text-neutral-900 sm:text-[3rem] sm:leading-[1.05]"
		>
			Onze Bloggers
		</h1>
		<p class="text-[1.125rem] leading-[1.6] text-neutral-600">
			Ontdek alle schrijvers van Kids en Kurken en lees hun artikelen.
		</p>
	</div>

	<Ad size="small" class="mb-12" />

	<!-- Authors Grid -->
	{#if authors.length > 0}
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each authors as author (author._id)}
				<article class="group cursor-pointer">
					<a href="/bloggers/{author.slug.current}" class="block h-full">
						<div
							class="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div class="h-48 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
								<img
									src={`https://placehold.co/400x300?text=${cleanText(author.firstName)}+${cleanText(author.lastName)}`}
									alt={`${author.firstName} ${author.lastName}`}
									class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							</div>
							<div class="flex flex-grow flex-col p-6">
								<h2
									class="mb-3 text-[1.375rem] leading-[1.2] font-bold text-neutral-900 transition-colors group-hover:text-accent-600"
								>
									{author.firstName}
									{author.lastName}
								</h2>
								<div class="mt-auto text-[0.75rem] text-neutral-500">
									{author.postCount} artikel{author.postCount !== 1 ? 'en' : ''}
								</div>
							</div>
						</div>
					</a>
				</article>
			{/each}
		</div>
	{:else}
		<div class="text-center">
			<p class="text-neutral-600">Geen bloggers gevonden.</p>
		</div>
	{/if}
</div>
