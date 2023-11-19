import { pauseTracking, resumeTracking, track, trigger } from './effect.js';
import { TrackOpTypes, TriggerOpTypes } from './operations.js';
import { reactive } from './reactive.js';
import { hasChanged, isObject } from './utils.js';

const arrayInstrumentations = {};
const RAW = Symbol('raw');

['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
  arrayInstrumentations[key] = function (...args) {
    // 1.正常找
    const result = Array.prototype[key].apply(this, args);
    // 2.找不到，从原始对象中重新找一遍
    if (result < 0 || result === false) {
      return Array.prototype[key].apply(this[RAW], args);
    }
    return result;
  };
});

['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
  arrayInstrumentations[key] = function (...args) {
    // 暂停依赖收集
    pauseTracking();
    const res = Array.prototype[key].apply(this, args);
    // 恢复依赖收集
    resumeTracking();
    return res;
  };
});

function get(target, key, receiver) {
  if (key === RAW) {
    return target;
  }
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
  const oldLength = Array.isArray(target) ? target.length : undefined;
  const result = Reflect.set(target, key, value, receiver);
  if (!result) {
    return result;
  }
  const newLength = Array.isArray(target) ? target.length : undefined;
  // 派发更新
  if (hasChanged(oldValue, value) || type === TriggerOpTypes.ADD) {
    trigger(target, type, key);
    if (Array.isArray(target) && oldLength !== newLength) {
      if (key !== 'length') {
        trigger(target, TriggerOpTypes.SET, 'length');
      } else {
        // 找到被删除的下标，依次派发更新
        for (let i = newLength; i < oldLength; i++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString());
        }
      }
    }
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
