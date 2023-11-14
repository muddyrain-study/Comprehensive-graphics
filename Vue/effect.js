import { TrackOpTypes } from './operations.js';

// 依赖收集
export function track(target, type, key) {
  if (type === TrackOpTypes.ITERATE) {
    console.log(`%c【${type}】`, 'color: red;');
    return;
  }
  // 打印样式改为红色
  console.log(`%c【${type}】${key}`, 'color: red;');
}

// 派发更新
export function trigger(target, type, key) {
  console.log(`%c【${type}】${key}`, 'color: blue;');
}
