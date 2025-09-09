<script lang="ts">
	interface Props {
		size?: 'small' | 'medium' | 'large';
		class?: string;
	}

	let { size = 'medium', class: className = '' }: Props = $props();

	const sizeClasses = {
		small: 'h-24',
		medium: 'h-32',
		large: 'h-40'
	};

	const heightClass = sizeClasses[size];
</script>

<div class={`mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
	<div
		class={`flex ${heightClass} w-full items-center justify-center rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-100`}
	>
		<span class="font-medium text-neutral-400">Ad</span>
	</div>
</div>
