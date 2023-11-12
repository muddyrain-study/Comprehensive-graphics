module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: 'last 10 versions',
    }),
    require('cssnano')({ preset: 'default' }),
  ],
  syntax: 'postcss-scss',
  map: { inline: false },
};
