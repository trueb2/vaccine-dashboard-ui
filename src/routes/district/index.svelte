<script context="module">
	export async function preload(page, session) {
        const { token } = session;

        if (!token) {
            return this.redirect(302, "login");
        }

        const response = await this.fetch(`http://localhost:6969/auth_health`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const parsed = await response.json();

        if (parsed.error) {
            return this.error(response.status, parsed.error);
        }

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
	<title>All Districts</title>
</svelte:head>

<a href="district/summary">Summary</a>
<h1>Recent districts</h1>

<ul>
	{#each districts as district}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="district/{district.slug}">{district.display_name}</a></li>
	{/each}
</ul>
