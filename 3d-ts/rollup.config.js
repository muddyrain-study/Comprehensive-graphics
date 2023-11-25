const typescript = require('@rollup/plugin-typescript');
const livereload = require('rollup-plugin-livereload');
const serve = require('rollup-plugin-serve');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');
/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'public/js/bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve(), // 解析第三方模块
    commonjs(), // 将 CommonJS 模块转换为 ES 模块
    typescript({}), // 解析 ts
    terser(), // 压缩输出
    serve({
      open: true,
      contentBase: 'public',
      host: 'localhost',
      port: 8080,
    }),
    livereload('public'),
  ],
  watch: {
    clearScreen: false,
  },
};
