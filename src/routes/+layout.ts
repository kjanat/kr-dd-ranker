// adapter-static requires prerender; adapter-cloudflare serves dynamically.
export const prerender = process.env.ADAPTER === 'static';
