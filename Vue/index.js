import { reactive } from './reactive.js';

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
  },
};
const state = reactive(obj);

function fn() {}

fn();

state.a = 1;

delete state.aaa;
