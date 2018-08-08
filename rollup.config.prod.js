import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const { version } = require('./package.json');

export default {
  input: 'src/js/kodhus.js',
  output: {
    name: 'Kodhus',
    file: `dist/kodhus-${version}.min.js`,
    format: 'iife',
    // sourcemap: 'inline'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
