const sass = require('sass');
const path = require('path');
const fs = require('fs');

const res = sass.compile(path.resolve(__dirname, './index.scss'));

fs.writeFileSync(path.resolve(__dirname, './index.css'), res.css);
