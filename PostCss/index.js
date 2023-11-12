const postcss = require('postcss');
const fs = require('fs');
const autoprefixer = require('autoprefixer');

const css = fs.readFileSync('./index.css', 'utf-8');

postcss([
  autoprefixer({
    overrideBrowserslist: 'last 10 versions',
  }),
])
  .process(css, { from: undefined })
  .then(result => {
    console.log(result);
    fs.writeFileSync('./index.out.css', result.css);
  });
