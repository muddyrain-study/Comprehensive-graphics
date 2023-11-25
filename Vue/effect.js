import { TrackOpTypes, TriggerOpTypes } from './operations.js';

const targetMap = new WeakMap();
const ITERATE_KEY = Symbol('iterate');

let activeEffect = null;
const effectStack = [];
let shouldTrack = true;
export function pauseTracking() {
  shouldTrack = false;
}
export function resumeTracking() {
  shouldTrack = true;
}

// 创建副作用函数
export function effect(fn, options = {}) {
  const { lazy = false, scheduler } = options;
  const effectFn = function () {
    try {
      activeEffect = effectFn;
      effectStack.push(effectFn);
      cleanupEffect(effectFn);
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  effectFn.deps = [];
  effectFn.options = options;
  if (!lazy) {
    effectFn();
  }
  return effectFn;
}

export function cleanupEffect(effectFn) {
  const { deps } = effectFn;
  if (!deps.length) {
    return;
  }
  for (const dep of deps) {
    dep.delete(effectFn);
  }
  deps.length = 0;
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
    activeEffect.deps.push(depSet);
  }
}

// 派发更新
export function trigger(target, type, key) {
  const effectFns = getEffectFns(target, type, key) || [];
  for (const effectFn of effectFns) {
    if (effectFn === activeEffect) {
      continue;
    }
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
      continue;
    }
    effectFn();
  }
}

// 获取目标同key同类型的副作用函数
function getEffectFns(target, type, key) {
  const propMap = targetMap.get(target);
  if (!propMap) {
    return;
  }
  const keys = [key];
  if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
    keys.push(ITERATE_KEY);
  }
  const effectFns = new Set();
  const triggerTypeMap = {
    [TriggerOpTypes.SET]: [TrackOpTypes.GET],
    [TriggerOpTypes.ADD]: [
      TrackOpTypes.GET,
      TrackOpTypes.ITERATE,
      TrackOpTypes.HAS,
    ],
    [TriggerOpTypes.DELETE]: [
      TrackOpTypes.GET,
      TrackOpTypes.ITERATE,
      TrackOpTypes.HAS,
    ],
  };
  for (const key of keys) {
    const typeMap = propMap.get(key);
    if (!typeMap) {
      continue;
    }
    const trackTypes = triggerTypeMap[type];
    for (const trackType of trackTypes) {
      const dep = typeMap.get(trackType);
      if (!dep) {
        continue;
      }
      for (const effectFn of dep) {
        effectFns.add(effectFn);
      }
    }
  }
  return effectFns;
}
