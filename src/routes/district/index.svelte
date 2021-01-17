<script context="module">
	export function preload() {
		return this.fetch(`district.json`).then(r => r.json()).then(districts => {
			return { districts };
		});
	}
</script>

<script>
	export let districts;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Country</title>
</svelte:head>

<h1>Recent districts</h1>

<ul>
	{#each districts as district}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="district/{district.slug}">{district.name}</a></li>
	{/each}
</ul>
