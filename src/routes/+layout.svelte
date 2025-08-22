<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	const menuItems = [
		{
			title: 'Home',
			href: '/',
			type: 'link'
		},
		{
			title: 'Aanmelden',
			type: 'dropdown',
			children: [
				{ title: 'Mijn verhaal', href: '/insturen' },
				{ title: 'Blogster', href: '/aanmelden-blogster' },
				{ title: 'Influencer', href: '/aanmelden-influencer' }
			]
		},
		{
			title: 'Blogs',
			type: 'dropdown',
			children: [
				{ title: 'Alles', href: '/blogs' },
				{ title: 'Ouder', href: '/blogs/ouder' },
				{ title: 'Expat', href: '/blogs/expatblog' },
				{ title: 'Deskundige', href: '/blogs/deskundige' }
			]
		},
		{
			title: 'Artikelen',
			type: 'dropdown',
			children: [
				{ title: 'Alles', href: '/artikelen' },
				{ title: 'Geboorte en baby', href: '/artikelen/geboorte-en-baby' },
				{ title: 'Opvoeding', href: '/artikelen/opvoeding' },
				{ title: 'Relatie', href: '/artikelen/relatie' },
				{ title: 'De deur uit', href: '/artikelen/de-deur-uit' },
				{ title: 'Wonen', href: '/artikelen/wonen' },
				{ title: 'Mode', href: '/artikelen/mode' }
			]
		},
		{
			title: 'Verhalen',
			type: 'dropdown',
			children: [
				{ title: 'Alles', href: '/ouderverhalen' },
				{ title: 'Jane Doe', href: '/jane-doe' },
				{ title: 'Mijn verhaal', href: '/mijn-verhaal' }
			]
		},
		{
			title: 'Toffe ouders',
			type: 'dropdown',
			children: [
				{ title: 'Alles', href: '/toffe-ouders' },
				{ title: 'Mooie mama', href: '/toffe-ouders/mooie-mama' },
				{ title: 'Leuke papa', href: '/toffe-ouders/leuke-papa' }
			]
		},
		{
			title: 'TV',
			type: 'dropdown',
			children: [
				{ title: 'Alles', href: '/tv' },
				{ title: 'Clips', href: '/tv/clips' },
				{ title: 'Serie', href: '/tv/serie' },
				{ title: 'Vlogs', href: '/tv/vlogs' }
			]
		},
		{
			title: 'Over',
			type: 'dropdown',
			children: [
				{ title: 'Over kids en kurken', href: '/over' },
				{ title: 'Adverteren', href: '/adverteren' },
				{ title: 'Bloggers', href: '/bloggers' },
				{ title: 'Vacatures', href: '/vacatures' },
				{ title: 'Contact', href: '/contact' }
			]
		}
	];

	const footerLinks = [
		{ name: 'Adverteren', href: '#' },
		{ name: 'Voorwaarden', href: '#' },
		{ name: 'Disclaimer', href: '#' },
		{ name: 'Huisregels', href: '#' },
		{ name: 'Privacy & cookiebeleid', href: '#' },
		{ name: 'Cookieinstellingen', href: '#' }
	];

	let mobileMenuOpen = $state(false);
	let openDropdowns = $state({});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (!mobileMenuOpen) {
			openDropdowns = {};
		}
	}

	function toggleMobileDropdown(title) {
		openDropdowns[title] = !openDropdowns[title];
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		openDropdowns = {};
	}

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/" class="block">
					<img src="/logo_2x.png" alt="Kids en Kurken" class="h-8 w-auto" />
				</a>
			</div>

			<!-- Desktop Menu -->
			<div class="hidden items-center space-x-1 lg:flex">
				{#each menuItems as item (item.title)}
					{#if item.type === 'link'}
						<a
							href={item.href}
							class="px-4 py-2 font-medium text-neutral-700 transition-colors hover:text-mocha-500"
						>
							{item.title}
						</a>
					{:else if item.type === 'dropdown'}
						<div class="group relative">
							<button
								class="flex items-center space-x-1 px-4 py-2 font-medium text-neutral-700 transition-colors hover:text-mocha-500"
							>
								<span>{item.title}</span>
								<svg
									class="h-4 w-4 transition-transform group-hover:rotate-180"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									></path>
								</svg>
							</button>
							<div
								class="invisible absolute top-full left-0 mt-1 rounded-lg border border-neutral-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 {item.title ===
								'Over'
									? 'w-56'
									: 'w-48'}"
							>
								<div class="py-2">
									{#each item.children as child (child.title)}
										<a
											href={child.href}
											class="block px-4 py-2 text-neutral-700 transition-colors hover:bg-mocha-50 hover:text-mocha-700"
										>
											{child.title}
										</a>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<!-- Desktop Search Button -->
			<div class="hidden items-center space-x-4 lg:flex">
				<button
					class="rounded-lg p-2 text-neutral-700 transition-colors hover:bg-mocha-50 hover:text-mocha-500"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<div class="flex items-center space-x-4 lg:hidden">
				<!-- Mobile Search Button -->
				<button
					class="rounded-lg p-2 text-neutral-700 transition-colors hover:bg-mocha-50 hover:text-mocha-500"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</button>

				<!-- Hamburger Button -->
				<button
					onclick={toggleMobileMenu}
					class="rounded-lg p-2 text-neutral-700 transition-colors hover:text-mocha-500"
				>
					{#if mobileMenuOpen}
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					{:else}
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path>
						</svg>
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu Panel -->
	{#if mobileMenuOpen}
		<div class="border-t border-neutral-200 bg-white lg:hidden">
			<div class="space-y-2 px-4 py-4">
				{#each menuItems as item (item.title)}
					{#if item.type === 'link'}
						<a
							href={item.href}
							onclick={closeMobileMenu}
							class="block rounded-lg px-4 py-3 font-medium text-neutral-700 transition-colors hover:bg-mocha-50 hover:text-mocha-700"
						>
							{item.title}
						</a>
					{:else if item.type === 'dropdown'}
						<div class="space-y-1">
							<!-- Dropdown Trigger -->
							<button
								onclick={() => toggleMobileDropdown(item.title)}
								class="flex w-full items-center justify-between rounded-lg px-4 py-3 font-medium text-neutral-700 transition-colors hover:bg-mocha-50 hover:text-mocha-700"
							>
								<span>{item.title}</span>
								<svg
									class="h-4 w-4 transition-transform {openDropdowns[item.title]
										? 'rotate-180'
										: ''}"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									></path>
								</svg>
							</button>

							<!-- Dropdown Items -->
							{#if openDropdowns[item.title]}
								<div class="space-y-1 pl-4">
									{#each item.children as child}
										<a
											href={child.href}
											onclick={closeMobileMenu}
											class="block rounded-lg px-4 py-2 text-neutral-600 transition-colors hover:bg-mocha-50 hover:text-mocha-700"
										>
											{child.title}
										</a>
									{/each}
								</div>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</nav>

<section class="bg-mocha-600 py-4">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between">
			<!-- Tagline -->
			<div class="flex-1">
				<p class="text-[1rem] font-medium text-white">
					Blog- en vlogmagazine voor <span class="italic">èchte</span> ouders
				</p>
			</div>

			<!-- Social Links -->
			<div class="flex items-center space-x-4">
				<span class="hidden text-[0.875rem] font-medium text-mocha-200 sm:block">Volg ons:</span>

				<!-- Instagram -->
				<a
					href="https://www.instagram.com/kidsenkurkenmagazine/"
					class="rounded-lg p-2 text-mocha-200 transition-colors hover:bg-mocha-500 hover:text-white"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
						/>
					</svg>
				</a>

				<!-- Facebook -->
				<a
					href="https://www.facebook.com/kidsenkurken/"
					class="rounded-lg p-2 text-mocha-200 transition-colors hover:bg-mocha-500 hover:text-white"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
						/>
					</svg>
				</a>

				<!-- YouTube -->
				<a
					href="https://www.youtube.com/channel/UChzdujpm-327KAI4XqErKUg"
					class="rounded-lg p-2 text-mocha-200 transition-colors hover:bg-mocha-500 hover:text-white"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path
							d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<main class="flex-grow">
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
