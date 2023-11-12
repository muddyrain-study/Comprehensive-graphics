module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: 'last 10 versions',
    }),
    require('cssnano')({ preset: 'default' }),
  ],
};
