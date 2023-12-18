const babel = require('@babel/core');

const code = `const func = async (a) => {
  console.log(a);
}`;

const transformPlugin = require('../plugin2');

babel.transform(
  code,
  {
    plugins: [transformPlugin],
  },
  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result.code);
  }
);
