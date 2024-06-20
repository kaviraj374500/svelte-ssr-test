import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) return;
    handler(warning);
  },
  kit: {
    adapter: adapter({
      out: 'build'
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (path === '/captions_en.vtt') {
          console.warn(`File not found during prerender: ${path}`);
          return;
        }
        throw new Error(message);
      }
    }
  }
};

export default config;
