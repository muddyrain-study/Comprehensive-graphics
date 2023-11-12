import { track, trigger } from './effect.js';

export function reactive(target) {
  return new Proxy(target, {
    get(target, key) {
      // 依赖收集
      track(target, key);
      // 返回对象的属性值
      return target[key];
    },
    set(target, key, value) {
      // 派发更新
      trigger(target, key);
      // 设置对象的属性值
      // 赋值返回true 代为成功
      return Reflect.set(target, key, value);
    },
  });
}
