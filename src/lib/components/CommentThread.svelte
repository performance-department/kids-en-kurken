<script lang="ts">
	import type { Comment } from '$lib/commentService.js';
	import CommentForm from './CommentForm.svelte';
	import CommentThread from './CommentThread.svelte';

	interface Props {
		comment: Comment;
		postId: string;
		depth?: number;
		onSuccess?: () => void;
	}

	let { comment, postId, depth = 0, onSuccess }: Props = $props();

	const maxDepth = 5;
	const isMaxDepth = depth >= maxDepth;
	const marginLeft = depth > 0 ? `${Math.min(depth * 2.5, 12.5)}rem` : '0';
	const avatarSize = depth === 0 ? 'h-12 w-12' : 'h-10 w-10';
	const textSize = depth === 0 ? 'text-sm' : 'text-xs';

	let showReplyForm = $state(false);

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}

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

	function handleReplyClick() {
		showReplyForm = !showReplyForm;
	}

	function handleReplySuccess() {
		showReplyForm = false;
		if (onSuccess) {
			onSuccess();
		}
	}

	function handleReplyCancel() {
		showReplyForm = false;
	}
</script>

<div style={`margin-left: ${marginLeft}`} class="space-y-4">
	<div
		class="rounded-xl border border-neutral-200 p-6 transition-all duration-200 hover:bg-neutral-50"
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
							onclick={handleReplyClick}
							class="text-[0.875rem] leading-[1.5] text-neutral-500 transition-colors hover:text-rose-500"
						>
							{showReplyForm ? 'Annuleren' : 'Beantwoorden'}
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#if showReplyForm}
		<div style={`margin-left: ${depth > 0 ? '2rem' : '0'}`}>
			<CommentForm
				{postId}
				parentComment={comment}
				onSuccess={handleReplySuccess}
				onCancel={handleReplyCancel}
			/>
		</div>
	{/if}

	{#if comment.replies.length > 0 && !isMaxDepth}
		<div class="space-y-4">
			{#each comment.replies as reply (reply.wpId)}
				<CommentThread comment={reply} {postId} depth={depth + 1} {onSuccess} />
			{/each}
		</div>
	{/if}
</div>
