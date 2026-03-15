<script lang="ts">
	import { browser } from '$app/environment';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	type Theme = 'auto' | 'light' | 'dark';

	let theme = $state<Theme>('auto');

	if (browser) {
		const stored = localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark') theme = stored;
	}

	const labels: Record<Theme, string> = {
		auto: 'Thema: systeem',
		light: 'Thema: licht',
		dark: 'Thema: donker',
	};

	function cycleTheme() {
		const order: Theme[] = ['auto', 'light', 'dark'];
		theme = order[(order.indexOf(theme) + 1) % order.length];

		if (theme === 'auto') {
			localStorage.removeItem('theme');
			document.documentElement.removeAttribute('data-theme');
		} else {
			localStorage.setItem('theme', theme);
			document.documentElement.setAttribute('data-theme', theme);
		}
	}
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
		<div style="width: 2.25rem"></div>
		<div class="app-header-text">
			<h1>DD Ranker</h1>
			<p>Differentiaaldiagnose-trainer</p>
		</div>
		<button
			class="theme-toggle"
			onclick={cycleTheme}
			aria-label={labels[theme]}
			title={labels[theme]}
		>
			{#if theme === 'auto'}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="9" />
					<path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
				</svg>
			{:else if theme === 'light'}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="5" />
					<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
				</svg>
			{:else}
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			{/if}
		</button>
	</header>

	<main aria-label="Hoofdinhoud">
		{@render children()}
	</main>
</div>
