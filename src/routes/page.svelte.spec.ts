import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render case selection grid', async () => {
		render(Page);

		const button = page.getByRole('button', { name: /Hartkloppingen/i });
		await expect.element(button).toBeInTheDocument();
	});
});
