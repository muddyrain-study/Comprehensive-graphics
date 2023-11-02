declare function debounce<A extends any[], R>(
  fn: (...args: A) => R,
  delay?: number
): (...args: A) => void;

function handler(a: number, b: number) {
  return a + b;
}

const dHandler = debounce(handler);

dHandler(1, 2);
