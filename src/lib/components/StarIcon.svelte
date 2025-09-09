<script lang="ts">
	interface Props {
		size?: number;
		class?: string;
		fill?: string;
	}

	let { size = 24, class: className = '', fill = 'currentColor' }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 250 250"
	shape-rendering="geometricPrecision"
	class={className}
	role="img"
	aria-label="KEK star"
>
	<path
		d="M 142.00,209.50 107.00,209.50 105.50,208.00 105.00,152.50 77.00,179.50 33.00,179.50 29.50,177.00 29.50,174.00 77.50,126.00 77.50,124.00 29.50,76.00 29.50,72.00 31.00,70.50 79.00,70.50 105.00,96.50 105.50,41.00 108.00,39.50 141.00,39.50 144.50,43.00 145.00,96.50 171.00,70.50 218.00,70.50 220.50,73.00 220.50,75.00 171.50,124.00 219.50,173.00 220.50,176.00 216.00,179.50 173.00,179.50 169.00,177.50 144.00,152.50 144.50,206.00 142.00,209.50 Z"
		{fill}
		fill-rule="evenodd"
	/>
</svg>
