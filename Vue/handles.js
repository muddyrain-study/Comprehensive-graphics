import { track, trigger } from './effect.js';
import { TrackOpTypes, TriggerOpTypes } from './operations.js';
import { reactive } from './reactive.js';
import { isObject } from './utils.js';

function get(target, key, receiver) {
  // 依赖收集
  track(target, TrackOpTypes.GET, key);
  // 返回对象的属性值
  const result = Reflect.get(target, key, receiver);

  // 如果是对象，递归代理
  if (isObject(result)) {
    return reactive(result);
  }

  return result;
}

function set(target, key, value, receiver) {
  // 派发更新
  // TODO: 判定操作类型
  trigger(target, TriggerOpTypes.SET, key);
  // 设置对象的属性值
  // 赋值返回true 代为成功
  return Reflect.set(target, key, value, receiver);
}

function has(target, key) {
  // 依赖收集
  track(target, TrackOpTypes.HAS, key);
  // 返回对象的属性值
  const result = Reflect.has(target, key);
  return result;
}

function ownKeys(target) {
  // 依赖收集
  track(target, TrackOpTypes.ITERATE);

  // 返回对象的属性值
  return Reflect.ownKeys(target);
}

export const handles = {
  get,
  set,
  has,
  ownKeys,
};
