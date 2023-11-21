import { effect } from './effect.js';
import { reactive } from './reactive.js';

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

function fn1() {
  if (state.a === 1) {
    state.b;
  } else {
    state.c;
  }
}

// 运行函数 fn1 运行期间用到的所有响应式对象属性，都会收集为对应关系
effect(fn1);

function fn2() {
  if (state.a === 1) {
  } else {
    state.c;
  }
}

// 运行函数 fn1 运行期间用到的所有响应式对象属性，都会收集为对应关系
effect(fn2);
