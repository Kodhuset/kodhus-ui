import babel from 'rollup-plugin-babel';

const { version } = require('./package.json');

export default {
  input: 'src/js/kodhus.js',
  output: {
    name: 'Kodhus',
    file: `dist/kodhus-${version}.js`,
    format: 'iife',
    // sourcemap: 'inline'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
