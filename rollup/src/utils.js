/**
 * 生成随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns 随机数
 */
export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * 深度克隆
 * @param {*} obj 目标对象
 * @returns 转换后的对象
 */
export const deepClone = obj => {
  if (typeof obj !== 'object' || obj === null) return obj;
  let result;
  if (Array.isArray(obj)) {
    result = [];
  } else {
    result = {};
  }
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    result[key] = deepClone(obj[key]);
  }
  return result;
};

export default {
  randomNumber,
  deepClone,
};
