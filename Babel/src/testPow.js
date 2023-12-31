const babel = require('@babel/core');

const code = '2 ** 3';

const transformPow = require('../plugin1');

babel.transform(
  code,
  {
    plugins: [transformPow],
  },
  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result.code);
  }
);
