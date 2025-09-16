export const menuItems = [
	{
		title: 'Home',
		href: '/',
		type: 'link' as const
	},
	{
		title: 'Aanmelden',
		type: 'dropdown' as const,
		children: [
			{ title: 'Mijn verhaal', href: '/insturen' },
			{ title: 'Blogster', href: '/aanmelden-blogster' },
			{ title: 'Influencer', href: '/aanmelden-influencer' }
		]
	},
	{
		title: 'Blogs',
		type: 'dropdown' as const,
		children: [
			{ title: 'Alles', href: '/blogs' },
			{ title: 'Ouder', href: '/blogs/ouder' },
			{ title: 'Expat', href: '/blogs/expatblog' },
			{ title: 'Deskundige', href: '/blogs/deskundige' }
		]
	},
	{
		title: 'Artikelen',
		type: 'dropdown' as const,
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
		type: 'dropdown' as const,
		children: [
			{ title: 'Alles', href: '/ouderverhalen' },
			{ title: 'Jane Doe', href: '/jane-doe' },
			{ title: 'Mijn verhaal', href: '/mijn-verhaal' }
		]
	},
	{
		title: 'Toffe ouders',
		type: 'dropdown' as const,
		children: [
			{ title: 'Alles', href: '/toffe-ouders' },
			{ title: 'Mooie mama', href: '/toffe-ouders/mooie-mama' },
			{ title: 'Leuke papa', href: '/toffe-ouders/leuke-papa' }
		]
	},
	{
		title: 'TV',
		type: 'dropdown' as const,
		children: [
			{ title: 'Alles', href: '/tv' },
			{ title: 'Clips', href: '/tv/clips' },
			{ title: 'Serie', href: '/tv/serie' },
			{ title: 'Vlogs', href: '/tv/vlogs' }
		]
	},
	{
		title: 'Over',
		type: 'dropdown' as const,
		children: [
			{ title: 'Over kids en kurken', href: '/over' },
			{ title: 'Adverteren', href: '/adverteren' },
			{ title: 'Bloggers', href: '/bloggers' },
			{ title: 'Vacatures', href: '/vacatures' },
			{ title: 'Contact', href: '/contact' }
		]
	}
];

export const footerLinks = [
	{ name: 'Adverteren', href: '#' },
	{ name: 'Voorwaarden', href: '/voorwaarden' },
	{ name: 'Disclaimer', href: '#' },
	{ name: 'Huisregels', href: '#' },
	{ name: 'Privacy & cookiebeleid', href: '#' },
	{ name: 'Cookieinstellingen', href: '#' }
];
