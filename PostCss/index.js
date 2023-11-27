const postcss = require('postcss');
const fs = require('fs');
const autoprefixer = require('autoprefixer');

const css = fs.readFileSync('./src/index.css', 'utf-8');

const myPlugin = require('./my-plugins');

postcss([myPlugin])
  .process(css, { from: undefined })
  .then(result => {
    fs.writeFileSync('./index.out.css', result.css);
  });
