import { track, trigger } from './effect.js';
import { reactive } from './reactive.js';
import { isObject } from './utils.js';

export const handles = {
  get(target, key, receiver) {
    // 依赖收集
    track(target, key);
    // 返回对象的属性值
    const result = Reflect.get(target, key, receiver);

    // 如果是对象，递归代理
    if (isObject(result)) {
      return reactive(result);
    }

    return result;
  },
  set(target, key, value, receiver) {
    // 派发更新
    trigger(target, key);
    // 设置对象的属性值
    // 赋值返回true 代为成功
    return Reflect.set(target, key, value, receiver);
  },
};
