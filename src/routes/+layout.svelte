<script lang="ts">
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
				{ title: 'Mijn verhaal', href: '/aanmelden/mijn-verhaal' },
				{ title: 'Blogster', href: '/aanmelden/blogster' },
				{ title: 'Influencer', href: '/aanmelden/influencer' }
			]
		},
		{
			title: 'Blogs',
			type: 'dropdown',
			children: [
				{ title: 'Alles', href: '/blogs' },
				{ title: 'Ouder', href: '/blogs/ouder' },
				{ title: 'Expat', href: '/blogs/expat' },
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
				{ title: 'Alles', href: '/verhalen' },
				{ title: 'Jane Doe', href: '/verhalen/jane-doe' },
				{ title: 'Mijn verhaal', href: '/verhalen/mijn-verhaal' }
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
				{#each menuItems as item}
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
									{#each item.children as child}
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
				{#each menuItems as item}
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
