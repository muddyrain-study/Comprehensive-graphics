import { effect } from './effect.js';
import { reactive } from './reactive.js';

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);

function fn() {
  console.log('fn');
  state.a++;
  console.log(state.a);
}

let isRun = false;
// 运行函数 fn1 运行期间用到的所有响应式对象属性，都会收集为对应关系
const effectFn = effect(fn, {
  lazy: true,
  scheduler: effect => {
    Promise.resolve().then(() => {
      if (!isRun) {
        isRun = true;
        effect();
      }
    });
  },
});
effectFn();
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
