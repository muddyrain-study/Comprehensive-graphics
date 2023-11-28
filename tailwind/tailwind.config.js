const loadingPlugins = require('./src/plugins/loadingPlugins');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html'],
  theme: {
    extend: {
      fontSize: {
        50: '50px',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [loadingPlugins, require('@tailwindcss/typography')],
};
