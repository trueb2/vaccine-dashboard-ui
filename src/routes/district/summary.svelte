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

		return this.fetch(`district/summary.json`).then(r => r.json()).then(district => {
			return { district };
		});
	}
</script>

<script>
	export let district;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Summary</title>
</svelte:head>

<h1>Summary</h1>

<ul>
    <li>Unvaccinated: {district.unvaccinated}</li>
    <li>Vaccinated: {district.vaccinated}</li>
    <li>Interested: {district.interested}</li>
</ul>
