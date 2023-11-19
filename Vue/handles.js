import { track, trigger } from './effect.js';
import { TrackOpTypes, TriggerOpTypes } from './operations.js';
import { reactive } from './reactive.js';
import { hasChanged, isObject } from './utils.js';

const arrayInstrumentations = {};

['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
  arrayInstrumentations[key] = function (...args) {};
});

function get(target, key, receiver) {
  // 依赖收集
  track(target, TrackOpTypes.GET, key);
  if (arrayInstrumentations.hasOwnProperty(key) && Array.isArray(target)) {
    return arrayInstrumentations[key];
  }
  // 返回对象的属性值
  const result = Reflect.get(target, key, receiver);

  // 如果是对象，递归代理
  if (isObject(result)) {
    return reactive(result);
  }

  return result;
}

function set(target, key, value, receiver) {
  const oldValue = target[key];
  const type = target.hasOwnProperty(key)
    ? TriggerOpTypes.SET
    : TriggerOpTypes.ADD;

  const result = Reflect.set(target, key, value, receiver);
  if (!result) {
    return result;
  }
  // 派发更新
  if (hasChanged(oldValue, value) || type === TriggerOpTypes.ADD) {
    trigger(target, type, key);
  }
  // 设置对象的属性值
  // 赋值返回true 代为成功
  return result;
}

function deleteProperty(target, key) {
  const hadKey = target.hasOwnProperty(key);
  const result = Reflect.deleteProperty(target, key);
  if (hadKey && result) {
    // 依赖收集
    trigger(target, TriggerOpTypes.DELETE, key);
  }
  return result;
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
  deleteProperty,
};
