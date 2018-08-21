import babel from 'rollup-plugin-babel';


export default {
  input: 'src/js/kodhus.js',
  output: {
    name: 'Kodhus',
    file: 'dist/kodhus-latest.js',
    format: 'iife',
    banner: `/*!
    * Kodhus v-latest
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
