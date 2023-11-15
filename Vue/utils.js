export function isObject(val) {
  return typeof val === 'object' && val !== null;
}

export function hasChanged(value1, value2) {
  return !Object.is(value1, value2);
}
