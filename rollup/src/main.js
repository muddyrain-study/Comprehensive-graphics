// import { deepClone } from './utils';

// const obj = {
//   a: 1,
//   b: 2,
//   c: {
//     d: 3,
//   },
// };
// const obj2 = deepClone(obj);
// console.log(obj2);
// console.log(obj2 === obj);

function run() {
  import('./utils').then(chunk => {
    const r = chunk.randomNumber(1, 100);
    console.log(r);
  });
}

run();
