<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import ImageBlock from '$lib/components/ImageBlock.svelte';
	import ExternalImageBlock from '$lib/components/ExternalImageBlock.svelte';
	import type { PortableTextComponents } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanity';

	let { data }: { data: PageData } = $props();
	const { post } = data;

	const components: PortableTextComponents = {
		types: {
			image: ImageBlock,
			externalImage: ExternalImageBlock
		}
	};
</script>

<article class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	<nav class="mb-8">
		<ol
			class="flex flex-wrap items-center space-x-2 gap-y-1 text-[0.875rem] leading-[1.5] text-neutral-500"
		>
			<li><a href="/" class="transition-colors hover:text-mocha-500">Home</a></li>
			<li>/</li>
			<li class="text-neutral-700">{post.title}</li>
		</ol>
	</nav>

	{#if post.featuredMedia}
		<div class="mb-8">
			<img
				src={urlFor(post.featuredMedia).width(800).auto('format').url()}
				alt="Kind met spaarpot en geld"
				class="h-[400px] w-full rounded-2xl object-cover shadow-lg sm:h-[500px]"
			/>
		</div>
	{/if}

	<div class="mb-8">
		{#if post.categories?.length}
			<div class="mb-4 flex flex-wrap gap-2">
				{#each post.categories as category (category.name)}
					<span
						class="inline-block rounded-full bg-rose-100 px-4 py-2 text-[0.875rem] leading-[1.5] font-medium text-rose-700"
					>
						{category.name}
					</span>
				{/each}
			</div>
		{/if}
		<h1
			class="mb-6 text-[2.25rem] leading-[1.15] font-bold tracking-[-0.015em] break-words hyphens-auto text-neutral-900 max-sm:text-[1.625rem] max-sm:leading-[1.25] sm:text-[1.875rem] sm:leading-[1.2]"
		>
			{post.title}
		</h1>
		<div
			class="flex flex-wrap items-center space-x-6 gap-y-2 text-[0.875rem] leading-[1.5] text-neutral-500"
		>
			<div class="flex items-center space-x-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-rose-200">
					<span class="text-xs font-medium text-rose-700">R</span>
				</div>
				<span>Door Redactie</span>
			</div>
			<span class="hidden sm:inline">•</span>
			<span
				>{new Date(post.date).toLocaleDateString('nl-NL', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				})}</span
			>
			<span class="hidden sm:inline">•</span>
			<span>{post.estimatedReadingTime} min lezen</span>
			<span class="hidden sm:inline">•</span>
			<span>19 reacties</span>
		</div>
	</div>

	<div class="mb-8">
		<div
			class="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>

	<div class="prose max-w-4xl prose-neutral">
		<PortableText value={post.content} {components} />
	</div>

	{#if post.tags?.length}
		<div class="mt-8 border-t border-neutral-100 pt-6">
			<div class="flex flex-wrap items-center gap-3">
				<span class="text-[0.875rem] font-medium text-neutral-500">Tags:</span>
				<div class="flex flex-wrap gap-2">
					{#each post.tags as tag (tag.name)}
						<a
							href="/tag/{tag.slug.current}"
							class="inline-flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 text-[0.75rem] font-medium text-neutral-600 transition-colors hover:border-mocha-200 hover:bg-mocha-50 hover:text-mocha-700"
						>
							#{tag.name.toLowerCase()}
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<div class="mt-8 mb-8">
		<div
			class="flex h-32 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>
</article>

<section class="mx-auto max-w-4xl border-t border-neutral-200 px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-8">
		<h3 class="mb-2 text-[2rem] leading-[1.3] font-bold text-neutral-900">Reacties (19)</h3>
		<p class="text-[1rem] leading-[1.7] text-neutral-600">
			Deel je ervaringen en steun andere ouders die met vergelijkbare situaties te maken hebben.
		</p>
	</div>

	<!-- Comment Form -->
	<div class="mb-12 rounded-2xl bg-neutral-50 p-6">
		<h4 class="mb-4 text-[1.5rem] leading-[1.4] font-semibold text-neutral-900">
			Reactie plaatsen
		</h4>
		<div class="space-y-4">
			<div class="grid gap-4 md:grid-cols-2">
				<input
					type="text"
					placeholder="Je naam"
					class="rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-mocha-300 focus:ring-2 focus:ring-mocha-200"
				/>
				<input
					type="email"
					placeholder="Je e-mailadres"
					class="rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-mocha-300 focus:ring-2 focus:ring-mocha-200"
				/>
			</div>
			<textarea
				placeholder="Deel je gedachten en ervaringen..."
				rows="4"
				class="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 transition-colors outline-none focus:border-mocha-300 focus:ring-2 focus:ring-mocha-200"
			></textarea>
			<div class="flex items-center justify-end">
				<button
					class="rounded-xl bg-mocha-500 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-mocha-600"
				>
					Plaatsen
				</button>
			</div>
		</div>
	</div>

	<!-- Ad Placeholder - Before Comments -->
	<div class="mb-8">
		<div
			class="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-100"
		>
			<span class="font-medium text-neutral-400">Ad</span>
		</div>
	</div>

	<!-- Comments List -->
	<div class="space-y-6">
		<!-- Comment 1 -->
		<div
			class="rounded-xl border border-neutral-200 p-6 transition-all duration-200 hover:bg-neutral-50"
		>
			<div class="flex items-start space-x-4">
				<div
					class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-mocha-200"
				>
					<span class="text-sm font-medium text-mocha-700">JD</span>
				</div>
				<div class="flex-1">
					<div class="mb-2 flex items-center space-x-3">
						<h5 class="font-semibold text-neutral-900">Jane Doe</h5>
						<span class="text-[0.875rem] leading-[1.5] text-neutral-500">2 uur geleden</span>
					</div>
					<p class="mb-3 text-[1rem] leading-[1.7] text-neutral-700">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel eros felis.
						Aenean at ultrices eros, et vestibulum orci. Pellentesque elementum odio eget elementum
						imperdiet. Nulla dapibus vulputate felis sed egestas. Integer urna est, dignissim ac
						consequat et, tincidunt vel turpis. Praesent eget posuere nibh.
					</p>
					<div class="flex items-center space-x-4">
						<button
							class="text-[0.875rem] leading-[1.5] text-neutral-500 transition-colors hover:text-rose-500"
							>Beantwoorden</button
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Comment 2 with Reply -->
		<div
			class="rounded-xl border border-neutral-200 p-6 transition-all duration-200 hover:bg-neutral-50"
		>
			<div class="flex items-start space-x-4">
				<div
					class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-mocha-200"
				>
					<span class="text-sm font-medium text-mocha-700">JD</span>
				</div>
				<div class="flex-1">
					<div class="mb-2 flex items-center space-x-3">
						<h5 class="font-semibold text-neutral-900">Jane Doe</h5>
						<span class="text-[0.875rem] leading-[1.5] text-neutral-500">4 uur geleden</span>
					</div>
					<p class="mb-3 text-[1rem] leading-[1.7] text-neutral-700">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel eros felis.
						Aenean at ultrices eros, et vestibulum orci. Pellentesque elementum odio eget elementum
						imperdiet. Nulla dapibus vulputate felis sed egestas. Integer urna est, dignissim ac
						consequat et, tincidunt vel turpis. Praesent eget posuere nibh.
					</p>
					<div class="mb-4 flex items-center space-x-4">
						<button
							class="text-[0.875rem] leading-[1.5] text-neutral-500 transition-colors hover:text-rose-500"
							>Beantwoorden</button
						>
					</div>

					<!-- Reply -->
					<div class="ml-10 border-l-2 border-neutral-200 pl-4">
						<div class="flex items-start space-x-4">
							<div
								class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-mocha-200"
							>
								<span class="text-xs font-medium text-mocha-700">JD</span>
							</div>
							<div class="flex-1">
								<div class="mb-2 flex items-center space-x-3">
									<h6 class="text-[1rem] font-semibold text-neutral-900">John Doe</h6>
									<span class="text-[0.875rem] leading-[1.5] text-neutral-500">3 uur geleden</span>
								</div>
								<p class="mb-2 text-[1rem] leading-[1.7] text-neutral-700">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel eros
									felis. Aenean at ultrices eros, et vestibulum orci. Pellentesque elementum odio
									eget elementum imperdiet. Nulla dapibus vulputate felis sed egestas. Integer urna
									est, dignissim ac consequat et, tincidunt vel turpis. Praesent eget posuere nibh.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Comment 3 -->
		<div
			class="rounded-xl border border-neutral-200 p-6 transition-all duration-200 hover:bg-neutral-50"
		>
			<div class="flex items-start space-x-4">
				<div
					class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-mocha-200"
				>
					<span class="text-sm font-medium text-mocha-700">JD</span>
				</div>
				<div class="flex-1">
					<div class="mb-2 flex items-center space-x-3">
						<h5 class="font-semibold text-neutral-900">John Doe</h5>
						<span class="text-[0.875rem] leading-[1.5] text-neutral-500">6 uur geleden</span>
					</div>
					<p class="mb-3 text-[1rem] leading-[1.7] text-neutral-700">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel eros felis.
						Aenean at ultrices eros, et vestibulum orci. Pellentesque elementum odio eget elementum
						imperdiet. Nulla dapibus vulputate felis sed egestas. Integer urna est, dignissim ac
						consequat et, tincidunt vel turpis. Praesent eget posuere nibh.
					</p>
					<div class="flex items-center space-x-4">
						<button
							class="text-[0.875rem] leading-[1.5] text-neutral-500 transition-colors hover:text-rose-500"
							>Beantwoorden</button
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Load More Comments -->
		<div class="pt-6 text-center">
			<button
				class="rounded-full border-2 border-neutral-300 px-8 py-3 font-medium text-neutral-700 transition-colors hover:border-rose-300 hover:bg-neutral-50"
			>
				Laad meer reacties
			</button>
		</div>
	</div>
</section>
