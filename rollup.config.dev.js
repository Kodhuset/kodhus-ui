import babel from 'rollup-plugin-babel';

const { version } = require('./package.json');

export default {
  input: 'src/js/kodhus.js',
  output: {
    name: 'Kodhus',
    file: `dist/kodhus-${version}.js`,
    format: 'iife',
    banner: `/*!
    * Kodhus v${version}
    * Copyright 2018 Kodhus (https://kodhus.com)
    * Licensed under MIT (https://github.com/Kodhuset/kodhus-ui/blob/master/LICENSE.md)
    */`,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
