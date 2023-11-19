import { TrackOpTypes } from './operations.js';
let shouldTrack = true;
export function pauseTracking() {
  shouldTrack = false;
}
export function resumeTracking() {
  shouldTrack = true;
}
// 依赖收集
export function track(target, type, key) {
  if (!shouldTrack) {
    return;
  }
  if (type === TrackOpTypes.ITERATE) {
    console.log(`%c【${type}】`, 'color: red;');
    return;
  }
  // 打印样式改为红色
  console.log(`%c【${type}】`, 'color: red;', key);
}

// 派发更新
export function trigger(target, type, key) {
  console.log(`%c【${type}】`, 'color: blue;', key);
}
