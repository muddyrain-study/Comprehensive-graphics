const swc = require('@swc/core');
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');

const input = readFileSync('./src/index.js', 'utf8');

const output = swc.transformSync(input, {
  jsc: {
    target: 'es5',
    parser: {
      syntax: 'ecmascript',
    },
  },
});

console.log(output.code);

// 如果没有 dist 目录，自动创建
if (!existsSync('./dist')) {
  mkdirSync('./dist');
}

writeFileSync('./dist/index.js', output.code);
