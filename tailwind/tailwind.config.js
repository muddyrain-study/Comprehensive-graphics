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
  variants: {
    extend: {
      opacity: ['peer-checked'],
    },
  },
  plugins: [loadingPlugins, require('@tailwindcss/typography')],
};
