const babel = require('@babel/core');

const code = '2 ** 3';

const transformPow = require('../plugin');

babel.transform(
  code,
  {
    plugins: [transformPow],
  },
  (err, result) => {
    console.log(result.code);
  }
);
