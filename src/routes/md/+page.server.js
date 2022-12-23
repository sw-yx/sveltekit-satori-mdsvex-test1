// import { compile } from 'mdsvex';

// /** @type {import('./$types').PageServerLoad} */
// export const load = async () => {
// 	const transformed = await compile(`
//     # Hello from mdsvex

// > This is a quote

// \`\`\`js
// console.log('hello world');
// \`\`\`
// `);
// 	return {
// 		content: transformed.code
// 			.replace(/>{@html `<code class="language-/g, '><code class="language-')
// 			.replace(/<\/code>`}<\/pre>/g, '</code></pre>')
// 	};
// };

import { error } from '@sveltejs/kit';

// we choose NOT to prerender blog pages because it is easier to edit and see changes immediately
// instead we set cache control headers
// export const prerender = true


/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, setHeaders }) {
	let res = null;
	res = await fetch(`/api/blog/foo.json`);
	if (res.status > 400) {
		throw error(res.status, await res.text());
	}
	setHeaders({
		'cache-control': 'public, max-age=60' // increase the max age as you get more confident in your caching
	});
	return {
		content: (await res.json()).content,
	};
	// } catch (err) {
	// 	console.error('error fetching blog post at [slug].svelte: ' + slug, res, err);
	// 	throw error(500, 'error fetching blog post at [slug].svelte: ' + slug + ': ' + res);
	// }
}