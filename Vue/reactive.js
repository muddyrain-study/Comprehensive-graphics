import { handles } from './handles.js';
import { isObject } from './utils.js';

// 用于存储响应式对象的属性和依赖之间的关系
const targetMap = new WeakMap();

export function reactive(target) {
  if (!isObject(target)) {
    return target;
  }
  // 优化：如果已经代理过了，就不要再次代理了
  if (targetMap.has(target)) {
    return targetMap.get(target);
  }

  const proxy = new Proxy(target, handles);

  // 保存响应式对象和代理对象之间的关系
  targetMap.set(target, proxy);

  return proxy;
}
