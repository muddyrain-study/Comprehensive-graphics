module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 2,
    }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html'],
    }),
  ],
};
