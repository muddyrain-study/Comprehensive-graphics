// 依赖收集
export function track(target, key) {
  // 打印样式改为红色
  console.log(`%c依赖收集${key}`, 'color: red;');
}

// 派发更新
export function trigger(target, key) {
  console.log(`%c派发更新${key}`, 'color: blue;');
}
