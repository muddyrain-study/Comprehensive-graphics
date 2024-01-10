// 用于打包的配置文件

import { defineConfig } from 'rollup';

export default defineConfig({
  input: ['./src/index.js', './src/main.js'],
  output: {
    dir: 'dist',
    format: 'esm',
    name: 'bundle',
  },
});
