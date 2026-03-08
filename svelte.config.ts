import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import adapterStatic from '@sveltejs/adapter-static';
import type { Config } from '@sveltejs/kit';

const adapter = process.env.ADAPTER === 'static'
	? adapterStatic({ pages: 'build', assets: 'build', fallback: '404.html' })
	: adapterCloudflare();

const config: Config = {
	kit: { adapter },
};

export default config;
