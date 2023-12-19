const terser = require('terser');
const path = require('path');
const fs = require('fs');

// 定义输入和输出文件路径
const inputPath = path.resolve(__dirname, './index.js');
const outDir = path.resolve(__dirname, '../dist/');
const outputPath = path.resolve(outDir, './index.js');
const outputSourceMapPath = path.resolve(outDir, './index.js.map');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// 读取文件内容
const code = {
  'index.js': fs.readFileSync(inputPath, 'utf8'),
};

// 压缩代码
terser
  .minify(code, {
    sourceMap: {
      filename: 'index.js',
      url: 'index.js.map',
    },
  })
  .then(result => {
    // 生成压缩后的文件
    fs.writeFileSync(outputPath, result.code);
    // 生成 sourceMap 文件
    fs.writeFileSync(outputSourceMapPath, result.map);
  });
