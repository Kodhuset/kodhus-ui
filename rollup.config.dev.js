import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const version = require('./package.json').version;

export default {
  input: 'src/js/kodhus.js',
  output: {
    name: 'bundle',
    file: `dist/kodhus-${version}.js`,
    format: 'iife',
    // sourcemap: 'inline'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
