<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Comment } from '$lib/commentService.js';

	interface Props {
		postId: string;
		parentComment?: Comment;
		onSuccess?: () => void;
		onCancel?: () => void;
	}

	let { postId, parentComment, onSuccess, onCancel }: Props = $props();

	const isReply = !!parentComment;
	const title = isReply ? 'Reageren' : 'Reactie plaatsen';
	const buttonText = isReply ? 'Reageren' : 'Plaatsen';
	const action = isReply ? '?/addReply' : '?/addComment';

	let isSubmitting = $state(false);
	let fieldErrors = $state<Record<string, string>>({});
	let generalError = $state('');
	let successMessage = $state('');

	function clearError(field: string) {
		if (fieldErrors[field]) {
			const newErrors = { ...fieldErrors };
			delete newErrors[field];
			fieldErrors = newErrors;
		}
	}
</script>

<div
	class={`rounded-2xl p-6 ${isReply ? 'border border-neutral-200 bg-neutral-100' : 'bg-neutral-50'}`}
>
	<h4 class="mb-4 text-[1.5rem] leading-[1.4] font-semibold text-neutral-900">
		{title}
	</h4>

	{#if isReply && parentComment}
		<div class="mb-4 rounded-xl border-l-4 border-mocha-300 bg-white p-4">
			<p class="mb-1 text-sm text-neutral-600">
				Reageren op <strong>{parentComment.authorName}</strong>:
			</p>
			<p class="line-clamp-2 text-sm text-neutral-700">
				{@html parentComment.content}
			</p>
		</div>
	{/if}

	{#if generalError}
		<div class="mb-4 rounded-xl border border-red-200 bg-red-50 p-4">
			<p class="text-sm text-red-700">{generalError}</p>
		</div>
	{/if}

	{#if successMessage}
		<div class="mb-4 rounded-xl border border-green-200 bg-green-50 p-4">
			<p class="text-sm text-green-700">{successMessage}</p>
		</div>
	{/if}

	<form
		method="POST"
		{action}
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			isSubmitting = true;
			fieldErrors = {};
			generalError = '';
			successMessage = '';

			return async ({ result, update }) => {
				isSubmitting = false;

				if (result.type === 'success') {
					successMessage = 'Je reactie is ingediend en wacht op goedkeuring.';
					formElement.reset();

					if (onSuccess) {
						onSuccess();
					}

					// Auto-cancel reply form after successful submission
					if (isReply && onCancel) {
						setTimeout(() => onCancel(), 1500);
					}
				} else if (result.type === 'failure' && result.data) {
					if (result.data.fieldErrors) {
						fieldErrors = result.data.fieldErrors;
					} else {
						generalError = result.data.error || 'Er is een fout opgetreden. Probeer het opnieuw.';
					}
				} else {
					generalError = 'Er is een fout opgetreden. Probeer het opnieuw.';
				}

				await update();
			};
		}}
	>
		<input type="hidden" name="postId" value={postId} />
		{#if parentComment}
			<input type="hidden" name="parentWpId" value={parentComment.wpId} />
		{/if}

		<div class="space-y-4">
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<input
						type="text"
						name="authorName"
						placeholder="Je naam"
						oninput={() => clearError('authorName')}
						class={`w-full rounded-xl border px-4 py-3 transition-colors outline-none focus:ring-2 focus:ring-mocha-200 ${
							fieldErrors.authorName
								? 'border-red-300 focus:border-red-300'
								: 'border-neutral-300 focus:border-mocha-300'
						}`}
						disabled={isSubmitting}
						required
					/>
					{#if fieldErrors.authorName}
						<p class="mt-1 text-sm text-red-600">{fieldErrors.authorName}</p>
					{/if}
				</div>
				<div>
					<input
						type="email"
						name="authorEmail"
						placeholder="Je e-mailadres"
						oninput={() => clearError('authorEmail')}
						class={`w-full rounded-xl border px-4 py-3 transition-colors outline-none focus:ring-2 focus:ring-mocha-200 ${
							fieldErrors.authorEmail
								? 'border-red-300 focus:border-red-300'
								: 'border-neutral-300 focus:border-mocha-300'
						}`}
						disabled={isSubmitting}
						required
					/>
					{#if fieldErrors.authorEmail}
						<p class="mt-1 text-sm text-red-600">{fieldErrors.authorEmail}</p>
					{/if}
				</div>
			</div>
			<div>
				<textarea
					name="content"
					placeholder={isReply ? 'Deel je reactie...' : 'Deel je gedachten en ervaringen...'}
					rows="4"
					oninput={() => clearError('content')}
					class={`w-full resize-none rounded-xl border px-4 py-3 transition-colors outline-none focus:ring-2 focus:ring-mocha-200 ${
						fieldErrors.content
							? 'border-red-300 focus:border-red-300'
							: 'border-neutral-300 focus:border-mocha-300'
					}`}
					disabled={isSubmitting}
					required
				></textarea>
				{#if fieldErrors.content}
					<p class="mt-1 text-sm text-red-600">{fieldErrors.content}</p>
				{/if}
			</div>
			<div class="flex items-center justify-end gap-3">
				{#if isReply && onCancel}
					<button
						type="button"
						onclick={onCancel}
						class="px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-800"
						disabled={isSubmitting}
					>
						Annuleren
					</button>
				{/if}
				<button
					type="submit"
					class="rounded-xl bg-mocha-500 px-6 py-3 font-medium text-white shadow-md transition-colors hover:bg-mocha-600 disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isSubmitting}
				>
					{#if isSubmitting}
						<span class="flex items-center gap-2">
							<svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
								<circle
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
									fill="none"
									opacity="0.25"
								/>
								<path
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Bezig...
						</span>
					{:else}
						{buttonText}
					{/if}
				</button>
			</div>
		</div>
	</form>
</div>
