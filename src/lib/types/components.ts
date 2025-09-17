export interface PostListItem {
	_id: string;
	title: string;
	date: string;
	slug: { current: string };
	categories: { name: string; slug: { current: string } }[];
	featuredMedia?: {
		asset: { url: string; metadata: { lqip: string } };
		alt?: string;
	};
	estimatedReadingTime: number;
}

export interface SectionHeaderProps {
	title: string;
	icon?: typeof import('svelte').SvelteComponent;
	iconClass?: string;
	viewAllLink?: string;
	viewAllText?: string;
}
