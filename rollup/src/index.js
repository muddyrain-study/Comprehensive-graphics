import { chunk } from 'lodash-es';

const a = chunk([1, 2, 3, 4, 5, 6, 7], 2);
console.log('🚀 ~ a:', a);

function run() {
  import('./utils').then(chunk => {
    const r = chunk.randomNumber(1, 100);
    console.log(r);
  });
}

run();

Promise.resolve(1).then(res => {
  console.log(res);
});
