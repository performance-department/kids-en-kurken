<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import ImageBlock from '$lib/components/ImageBlock.svelte';
	import ExternalImageBlock from '$lib/components/ExternalImageBlock.svelte';
	import YouTubeBlock from '$lib/components/YouTubeBlock.svelte';
	import type { PortableTextComponents } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanity';
	import Ad from '$lib/components/Ad.svelte';
	import type { Comment } from './+page.server';

	let { data }: { data: PageData } = $props();
	const { post, comments, commentCount } = data;

	function extractTextFromPortableText(blocks: any[]): string {
		if (!blocks) return '';

		return blocks
			.filter((block) => block._type === 'block')
			.map(
				(block) =>
					block.children
						?.filter((child: any) => child._type === 'span' && child.text)
						.map((child: any) => child.text)
						.join(' ') || ''
			)
			.join(' ')
			.replace(/\s+/g, ' ')
			.trim();
	}

	const contentText = extractTextFromPortableText(post.content);
	const metaDescription =
		contentText.length > 160 ? contentText.substring(0, 157) + '...' : contentText;

	const components: PortableTextComponents = {
		types: {
			image: ImageBlock,
			externalImage: ExternalImageBlock,
			youtube: YouTubeBlock
		}
	};

	// Helper function to get initials from name
	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

	// Helper function to format date
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffHours / 24);

		if (diffDays === 0) {
			if (diffHours === 0) return 'Zojuist';
			return `${diffHours} uur geleden`;
		} else if (diffDays === 1) {
			return 'Gisteren';
		} else if (diffDays < 7) {
			return `${diffDays} dagen geleden`;
		} else {
			return date.toLocaleDateString('nl-NL', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});
		}
	}
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={metaDescription} />
</svelte:head>

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
				style={`view-transition-name: ${post._id}`}
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
			<span>{commentCount} reacties</span>
		</div>
	</div>

	<Ad size="small" class="mb-8" />

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

	<Ad class="mt-8 mb-8" />
</article>

<section class="mx-auto max-w-4xl border-t border-neutral-200 px-4 py-12 sm:px-6 lg:px-8">
	<div class="mb-8">
		<h3 class="mb-2 text-[2rem] leading-[1.3] font-bold text-neutral-900">
			Reacties ({commentCount})
		</h3>
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

	<Ad size="small" class="mb-8" />

	<!-- Comments List -->
	{#if comments.length > 0}
		<div class="space-y-6">
			{#each comments as comment}
				{@render renderComment(comment, 0)}
			{/each}
		</div>
	{:else}
		<div class="py-12 text-center">
			<p class="text-neutral-500">Nog geen reacties. Wees de eerste!</p>
		</div>
	{/if}
</section>

{#snippet renderComment(comment: Comment, depth: number)}
	{@const maxDepth = 5}
	{@const isMaxDepth = depth >= maxDepth}
	{@const marginLeft = depth > 0 ? `${Math.min(depth * 2.5, 12.5)}rem` : '0'}
	{@const avatarSize = depth === 0 ? 'h-12 w-12' : 'h-10 w-10'}
	{@const textSize = depth === 0 ? 'text-sm' : 'text-xs'}

	<div
		class="rounded-xl border border-neutral-200 p-6 transition-all duration-200 hover:bg-neutral-50"
		style={`margin-left: ${marginLeft}`}
	>
		<div class="flex items-start space-x-4">
			<div
				class={`flex ${avatarSize} flex-shrink-0 items-center justify-center rounded-full bg-mocha-200`}
			>
				<span class={`${textSize} font-medium text-mocha-700`}>
					{getInitials(comment.authorName || 'Anonymous')}
				</span>
			</div>
			<div class="flex-1">
				<div class="mb-2 flex items-center space-x-3">
					<h5 class={`font-semibold text-neutral-900 ${depth === 0 ? 'text-base' : 'text-sm'}`}>
						{comment.authorName || 'Anonymous'}
					</h5>
					{#if comment.date}
						<span class="text-[0.875rem] leading-[1.5] text-neutral-500">
							{formatDate(comment.date)}
						</span>
					{/if}
				</div>
				{#if comment.content}
					<div
						class={`mb-3 leading-[1.7] text-neutral-700 ${depth === 0 ? 'text-[1rem]' : 'text-[0.875rem]'}`}
					>
						{@html comment.content}
					</div>
				{/if}
				{#if !isMaxDepth}
					<div class="flex items-center space-x-4">
						<button
							class="text-[0.875rem] leading-[1.5] text-neutral-500 transition-colors hover:text-rose-500"
						>
							Beantwoorden
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Render replies -->
	{#if comment.replies.length > 0 && !isMaxDepth}
		<div class="mt-4 space-y-4">
			{#each comment.replies as reply}
				{@render renderComment(reply, depth + 1)}
			{/each}
		</div>
	{/if}
{/snippet}
