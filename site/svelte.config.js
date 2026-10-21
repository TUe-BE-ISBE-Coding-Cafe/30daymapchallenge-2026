import adapter from '@sveltejs/adapter-static';

const config = {
	kit: {
		adapter: adapter(),
		// GitHub Pages serves the site under /<repo-name>; the workflow sets BASE_PATH.
		paths: { base: process.env.BASE_PATH ?? '' }
	}
};

export default config;
