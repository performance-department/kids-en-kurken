<script lang="ts">
	import { page } from '$app/state';
	import { dev } from '$app/environment';
</script>

<div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
	<main class="mx-auto flex w-full max-w-xl flex-col">
		<div class="text-center">
			<p class="text-[1rem] leading-[1.5] font-semibold text-rose-600">
				{page.status}
			</p>
			<h1
				class="mt-4 text-[2.25rem] leading-[1.15] font-bold tracking-[-0.015em] text-neutral-900 sm:text-[3rem]"
			>
				{#if page.status === 404}
					Pagina niet gevonden
				{:else}
					Er is iets misgegaan
				{/if}
			</h1>
			<p class="mt-4 text-[1rem] leading-[1.7] text-neutral-600 sm:text-[1.125rem]">
				{#if page.status === 404}
					Sorry, we konden de pagina die je zoekt niet vinden.
				{:else}
					{page.error?.message || 'Sorry, er is een onverwachte fout opgetreden.'}
				{/if}
			</p>
			<div class="mt-10">
				<a
					href="/"
					class="rounded-xl bg-mocha-500 px-6 py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-mocha-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mocha-600"
					>Terug naar de homepage</a
				>
			</div>
		</div>

		<!-- Developer-only error details -->
		{#if dev && page.error}
			<div class="mt-12 rounded-lg bg-neutral-50 p-4">
				<h2 class="text-lg font-semibold text-neutral-800">Foutdetails voor ontwikkelaars</h2>
				<pre
					class="mt-2 w-full overflow-auto rounded-md bg-neutral-100 p-3 text-left text-sm whitespace-pre-wrap text-neutral-700"><code
						>{JSON.stringify(page.error, null, 2)}</code
					></pre>
			</div>
		{/if}
	</main>
</div>
