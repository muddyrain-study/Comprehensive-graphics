const rollup = require('rollup');
const inputOptions = {
  input: 'src/index.js',
  external: [],
  plugins: [],
};
const outputOptions = {
  dir: 'dist',
  format: 'esm',
  sourcemap: true,
  entryFileNames: '[name].[hash].js',
};
const build = async () => {
  let bundle;
  let bundleFailed = false;
  try {
    bundle = await rollup.rollup(inputOptions);

    const resp = await bundle.write(outputOptions);
    console.log('🚀 ~ build ~ resp:', resp);
  } catch (error) {
    bundleFailed = true;
    console.log('🚀 ~ build ~ error', error);
  }
  if (bundle) {
    await bundle.close();
  }

  process.exit(bundleFailed ? 1 : 0);
};

build();

const watchOptions = {
  ...inputOptions,
  output: [outputOptions],
};
const watcher = rollup.watch(watchOptions);

watcher.on('event', event => {
  if (event.result) {
    event.result.close();
  }
  console.log('🚀 ~ watcher.on ~ event', event);
});
