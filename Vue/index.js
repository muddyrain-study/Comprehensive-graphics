import { reactive } from './reactive.js';

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};
const state = reactive(obj);

function fn() {
  'e' in state;
}

state.e = 123;

fn();
