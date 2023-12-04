#!/usr/bin/env node

const prettier = require('prettier');
const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);

// 要做格式化的操作

// 读取源码
const sourcePath = path.resolve('src', 'index.js');
const jsSource = fs.readFileSync(sourcePath, 'utf-8');

// 读取配置文件
const options = JSON.parse(
  fs.readFileSync(path.resolve('.prettierrc'), 'utf-8')
);

if (args.length === 0) {
  console.error('没有输入参数');
  process.exit(1);
}
const input = args[0];

if (input === '--write' || input === '-w') {
  // 写入源码
  prettier.format(jsSource, options).then(code => {
    fs.writeFileSync(sourcePath, code, 'utf-8');
  });
  // 格式化操作完成
  console.log('格式化完成');
}
