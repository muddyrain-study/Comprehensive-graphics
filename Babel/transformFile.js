const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const src = path.resolve(__dirname, './src');
const out = path.resolve(__dirname, './dist');

if (!fs.existsSync(src)) {
  fs.mkdirSync(src);
}
if (!fs.existsSync(out)) {
  fs.mkdirSync(out);
}
fs.readdirSync(src).forEach(file => {
  if (path.extname(file) === '.js') {
    const filePath = path.join(src, file);
    const outPath = path.join(out, file);
    const result = babel.transformFileSync(filePath, {
      presets: ['@babel/preset-env'],
    });
    fs.writeFileSync(outPath, result.code);
  }
});
