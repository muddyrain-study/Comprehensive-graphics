// 用于打包的配置文件

import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
const buildIndexOptions = defineConfig({
  input: './src/index.js',
  output: {
    dir: 'dist/esm',
    format: 'esm',
    // manualChunks: {
    //   'lodash-es': ['lodash-es'],
    // },
    entryFileNames: '[name]-[hash].js',
    chunkFileNames: 'chunks/[name]-[hash].js',
    // manualChunks(id) {
    //   if (id.includes('lodash-es')) {
    //     return 'lodash-es';
    //   }
    // },
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      include: 'src/**',
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
    }),
    typescript(),
  ],
});
// const buildMainOptions = defineConfig({
//   input: './src/main.js',
//   output: {
//     dir: 'dist/esm',
//     format: 'esm',
//     entryFileNames: '[name]-[hash].js',
//     chunkFileNames: 'chunks/[name]-[hash].js',
//   },
// });
export default [buildIndexOptions];
