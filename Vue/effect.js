import { TrackOpTypes } from './operations.js';

const targetMap = new WeakMap();
const ITERATE_KEY = Symbol('iterate');

let activeEffect = null;
let shouldTrack = true;
export function pauseTracking() {
  shouldTrack = false;
}
export function resumeTracking() {
  shouldTrack = true;
}

// 创建副作用函数
export function effect(fn) {
  const effectFn = function () {
    try {
      activeEffect = effectFn;
      return fn();
    } finally {
      activeEffect = null;
    }
  };
  effectFn();
}

// 依赖收集
export function track(target, type, key) {
  if (!shouldTrack || !activeEffect) {
    return;
  }
  // 获取 target 对应的 Map  存储响应式对象
  let propMap = targetMap.get(target);
  if (!propMap) {
    // 如果没有，创建一个新的 Map
    propMap = new Map();
    targetMap.set(target, propMap);
  }
  // 类型是否为 ITERATE_KEY
  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_KEY;
  }
  // 存储 类型集合
  let typeMap = propMap.get(key);
  if (!typeMap) {
    typeMap = new Map();
    propMap.set(key, typeMap);
  }
  // 存储 副作用函数集合
  let depSet = typeMap.get(type);
  if (!depSet) {
    depSet = new Set();
    typeMap.set(type, depSet);
  }
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect);
  }
  if (type === TrackOpTypes.ITERATE) {
    console.log(`%c【${type}】`, 'color: red;');
    return;
  }
  // 打印样式改为红色
  console.log(`%c【${type}】`, 'color: red;', key);
  console.log(targetMap);
}

// 派发更新
export function trigger(target, type, key) {
  console.log(`%c【${type}】`, 'color: blue;', key);
}

// 获取目标同key同类型的副作用函数
function getEffectFns(target, type, key) {}
