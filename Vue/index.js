import { reactive } from './reactive.js';

const obj = {};
const arr = [1, obj, 3];
const state = reactive(arr);

function fn() {
  const i = state.indexOf(obj);
  console.log(i);
}
console.log(state[1], arr[1]);
fn();
