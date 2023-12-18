const babel = require('@babel/core');

const code = `const sum = (a, b) => a + b;`;

babel.transform(
  code,
  {
    presets: ['@babel/preset-env'],
  },
  (err, result) => {
    if (err) throw err;
    console.log(result.code);
  }
);
