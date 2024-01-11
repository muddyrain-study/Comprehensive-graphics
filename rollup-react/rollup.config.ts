import { RollupOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import clear from 'rollup-plugin-clear';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import alias from '@rollup/plugin-alias';
import { fileURLToPath } from 'node:url';
import { terser } from 'rollup-plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

const config: RollupOptions = {
  input: 'src/main.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    name: 'rollup-react-ts',
    sourcemap: true,
    entryFileNames: 'chunk-[name]-[hash].js',
    manualChunks: {
      react: ['react', 'react-dom'],
    },
    plugins: [terser()],
    // cdn 引入
    // globals: {
    //   react: 'React',
    //   'react-dom': 'ReactDOM',
    // },
    // paths: {
    //   react: 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm',
    //   'react-dom': 'https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm',
    // },
  },
  // 剔除打包文件中的 react 和 react-dom
  // external: ['react', 'react-dom'],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    clear({
      targets: ['dist'],
      watch: true,
    }),
    alias({
      entries: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('src', import.meta.url)),
        },
      ],
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      include: ['src/**/*'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    serve({
      open: false,
      contentBase: 'dist',
      host: 'localhost',
      port: 3000,
    }),
    livereload('src'),
    postcss({
      extensions: ['.css', '.less', '.scss', '.sass'],
      // 将 css 插入到 style 中
      extract: true,
      // 压缩 css
      minimize: true,
      // css modules
      modules: true,
    }),
    htmlTemplate({
      template: 'public/index.html',
      target: 'dist/index.html',
      attrs: ['type="module"'],
    }),
    visualizer(),
    image(),
  ],
};

export default config;
