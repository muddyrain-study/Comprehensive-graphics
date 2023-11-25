module.exports = {
  plugins: [
    require('stylelint')({
      fix: true,
    }),
    require('autoprefixer'),
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: false,
          discardEmpty: false,
        },
      ],
    }),
  ],
};
