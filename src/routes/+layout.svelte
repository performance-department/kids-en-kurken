<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	const footerLinks = [
		{ name: 'Adverteren', href: '#' },
		{ name: 'Voorwaarden', href: '#' },
		{ name: 'Disclaimer', href: '#' },
		{ name: 'Huisregels', href: '#' },
		{ name: 'Privacy & cookiebeleid', href: '#' },
		{ name: 'Cookieinstellingen', href: '#' }
	];

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children?.()}
</main>

<footer class="bg-mocha-800 py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center space-y-8">
			<div class="flex-shrink-0">
				<img src="/logo-footer-2x.png" alt="Kids en Kurken Logo" class="h-24 w-auto" />
			</div>

			<nav class="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[0.875rem]">
				{#each footerLinks as { name, href } (name)}
					<a {href} class="font-medium text-mocha-200 transition-colors hover:text-white">{name}</a>
				{/each}
			</nav>

			<div class="text-center">
				<p class="text-[0.875rem] text-mocha-300">
					© 2016-{new Date().getFullYear()} Kids en Kurken
				</p>
			</div>
		</div>
	</div>
</footer>
