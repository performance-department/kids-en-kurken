<script lang="ts">
	import { menuItems } from '$lib/data/menu';

	let { openSearchModal }: { openSearchModal: () => void } = $props();

	let mobileMenuOpen = $state(false);
	let openDropdowns = $state({});

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
		if (!mobileMenuOpen) {
			openDropdowns = {};
		}
	}

	function toggleMobileDropdown(title: string) {
		openDropdowns[title] = !openDropdowns[title];
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		openDropdowns = {};
	}
</script>

<!-- Header with Logo - Hidden on mobile -->
<header class="hidden border-b border-neutral-200 bg-white lg:block">
	<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
		<div class="flex justify-center">
			<a href="/" class="block">
				<img src="/logo_2x.png" alt="Kids en Kurken" class="h-12 w-auto" />
			</a>
		</div>
	</div>
</header>

<!-- Sticky Navigation -->
<nav class="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-14 items-center justify-between lg:justify-end">
			<!-- Mobile Logo -->
			<div class="lg:hidden">
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
							class="px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-warm-500"
						>
							{item.title}
						</a>
					{:else if item.type === 'dropdown'}
						<div class="group relative">
							<button
								class="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:text-warm-500"
							>
								<span>{item.title}</span>
								<svg
									class="h-3 w-3 transition-transform group-hover:rotate-180"
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
								class="invisible absolute top-full right-0 mt-1 rounded-lg border border-neutral-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100 {item.title ===
								'Over'
									? 'w-56'
									: 'w-48'}"
							>
								<div class="py-2">
									{#each item.children as child (child.title)}
										<a
											href={child.href}
											class="block px-4 py-2 text-neutral-700 transition-colors hover:bg-warm-50 hover:text-warm-700"
										>
											{child.title}
										</a>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				{/each}

				<!-- Desktop Search Button -->
				<button
					onclick={openSearchModal}
					aria-label="Zoeken openen"
					class="ml-4 rounded-lg p-2 text-neutral-700 transition-colors hover:bg-warm-50 hover:text-warm-500"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
					onclick={openSearchModal}
					aria-label="Zoeken openen"
					class="rounded-lg p-2 text-neutral-700 transition-colors hover:bg-warm-50 hover:text-warm-500"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
					aria-label={mobileMenuOpen ? 'Menu sluiten' : 'Menu openen'}
					class="rounded-lg p-2 text-neutral-700 transition-colors hover:text-warm-500"
				>
					{#if mobileMenuOpen}
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					{:else}
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
							class="block rounded-lg px-4 py-3 font-medium text-neutral-700 transition-colors hover:bg-warm-50 hover:text-warm-700"
						>
							{item.title}
						</a>
					{:else if item.type === 'dropdown'}
						<div class="space-y-1">
							<!-- Dropdown Trigger -->
							<button
								onclick={() => toggleMobileDropdown(item.title)}
								class="flex w-full items-center justify-between rounded-lg px-4 py-3 font-medium text-neutral-700 transition-colors hover:bg-warm-50 hover:text-warm-700"
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
											class="block rounded-lg px-4 py-2 text-neutral-600 transition-colors hover:bg-warm-50 hover:text-warm-700"
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
