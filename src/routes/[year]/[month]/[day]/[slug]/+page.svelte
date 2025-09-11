<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PageData } from './$types';
	import ImageBlock from '$lib/components/ImageBlock.svelte';
	import ExternalImageBlock from '$lib/components/ExternalImageBlock.svelte';
	import YouTubeBlock from '$lib/components/YouTubeBlock.svelte';
	import type { PortableTextComponents } from '@portabletext/svelte';
	import { urlFor } from '$lib/sanity';
	import Ad from '$lib/components/Ad.svelte';
	import CommentForm from '$lib/components/CommentForm.svelte';
	import CommentThread from '$lib/components/CommentThread.svelte';
	import type { Comment } from '$lib/commentService.js';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();
	const { post, comments: initialComments, commentCount: initialCommentCount } = data;

	let comments = $state<Comment[]>(initialComments);
	let commentCount = $state(initialCommentCount);

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

	function handleCommentSuccess() {
		// Form actions will trigger a page reload which updates the comments automatically
		// No need to manually update state since SvelteKit handles this
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
			<a href="#reacties" class="transition-colors hover:text-mocha-500">{commentCount} reacties</a>
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
		<h3
			id="reacties"
			class="mb-2 scroll-mt-16 text-[2rem] leading-[1.3] font-bold text-neutral-900"
		>
			Reacties ({commentCount})
		</h3>
		<p class="text-[1rem] leading-[1.7] text-neutral-600">
			Deel je ervaringen en steun andere ouders die met vergelijkbare situaties te maken hebben.
		</p>
	</div>

	<!-- Comment Form -->
	<div class="mb-12">
		<CommentForm postId={post._id} onSuccess={handleCommentSuccess} />
	</div>

	<Ad size="small" class="mb-8" />

	<!-- Comments List -->
	{#if comments.length > 0}
		<div class="space-y-6">
			{#each comments as comment (comment.wpId)}
				<CommentThread {comment} postId={post._id} onSuccess={handleCommentSuccess} />
			{/each}
		</div>
	{:else}
		<div class="py-12 text-center">
			<p class="text-neutral-500">Nog geen reacties. Wees de eerste!</p>
		</div>
	{/if}
</section>
