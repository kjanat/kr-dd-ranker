<script lang="ts">
import '../app.css';
import favicon from '$lib/assets/favicon.svg';

let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="48x48">
	<link rel="icon" href={favicon} type="image/svg+xml">
	<title>DD Ranker</title>
	<meta
		name="description"
		content="Differentiaaldiagnose-trainer: rank diagnoses op waarschijnlijkheid en markeer alarmsignalen."
	>
</svelte:head>

<div class="container">
	<header class="app-header">
		<h1>DD Ranker</h1>
		<p>Differentiaaldiagnose-trainer</p>
	</header>

	<main aria-label="Hoofdinhoud">
		{@render children()}
	</main>
</div>
