export function formatPermalink(dateString: string, slug: string): string {
	const date = new Date(dateString);
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getUTCDate()).padStart(2, '0');
	return `/${year}/${month}/${day}/${slug}`;
}

export function timeAgo(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const seconds = Math.floor(diffMs / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const years = Math.floor(days / 365);

	if (years > 0) return years === 1 ? '1 jaar geleden' : `${years} jaar geleden`;
	if (days > 0) return days === 1 ? '1 dag geleden' : `${days} dagen geleden`;
	if (hours > 0) return hours === 1 ? '1 uur geleden' : `${hours} uur geleden`;
	if (minutes > 0) return minutes === 1 ? '1 minuut geleden' : `${minutes} minuten geleden`;
	return 'zojuist';
}
