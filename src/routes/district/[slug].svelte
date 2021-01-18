<script context="module">
	export async function preload({ params }, session) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`district/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { district: data, session };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let district;
	export let session;

	let vaccinated = 0 
	let unvaccinated = 0 

	const handleInterest = async () => {
		const result = await fetch(`http://localhost:6969/districts/increment?id=${district.id}&interested=true`, {
			method: "POST",
			mode: 'cors',
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				'Access-Control-Allow-Origin': '*',
				'Authorization': `Bearer ${session.token}`,
			},
		});
	
		const parsed = await result.json();
	
		if (typeof parsed.error !== "undefined") {
			throw new Error(parsed.error);
		}
	}

	const handleVaccinated = async () => {
		console.log('vaccinated');
		const result = await fetch(`http://localhost:6969/districts/increment?id=${district.id}&vaccinated=true`, {
			method: "POST",
			mode: 'cors',
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				'Access-Control-Allow-Origin': '*',
				'Authorization': `Bearer ${session.token}`,
			},
		});
	
		const parsed = await result.json();
	
		if (typeof parsed.error !== "undefined") {
			throw new Error(parsed.error);
		}

		vaccinated += 1;
	}

	const handleUnvaccinated = async () => {
		console.log('unvaccinated');
		const result = await fetch(`http://localhost:6969/districts/increment?id=${district.id}&unvaccinated=true`, {
			method: "POST",
			mode: 'cors',
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				'Access-Control-Allow-Origin': '*',
				'Authorization': `Bearer ${session.token}`,
			},
		});
	
		const parsed = await result.json();
	
		if (typeof parsed.error !== "undefined") {
			throw new Error(parsed.error);
		}

		unvaccinated += 1;
	}
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title>{district.display_name}</title>
</svelte:head>

<h1>{district.display_name}</h1>

<div class="content">
	<p> Of the visitors that claimed to be from {district.display_name}</p>
	<p>
		<strong>{district.vaccinated + vaccinated}</strong> claimed to be <strong>vaccinated</strong> and
	</p>
	<p>
		<strong>{district.unvaccinated + unvaccinated}</strong> claimed to be <strong>un</strong>-vaccinated.
	</p>

</div>

<hr/>

<form on:submit|preventDefault="{handleInterest}" method="post">
	<button type="submit">Add Interest</button>
</form>
<form on:submit|preventDefault="{handleVaccinated}" method="post">
	<button type="submit">Add Vaccinated</button>
</form>
<form on:submit|preventDefault="{handleUnvaccinated}" method="post">
	<button type="submit">Add <strong>Un</strong>vaccinated</button>
</form>

