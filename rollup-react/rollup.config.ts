import { RollupOptions } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import htmlTemplate from 'rollup-plugin-generate-html-template';

const config: RollupOptions = {
  input: 'src/main.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    name: 'rollup-react-ts',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      include: ['src/**/*'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    htmlTemplate({
      template: 'public/index.html',
      target: 'dist/index.html',
      attrs: ['type="module"'],
    }),
  ],
};

export default config;
