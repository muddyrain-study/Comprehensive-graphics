export type Curried<A, R> = A extends []
  ? () => R
  : A extends [infer Arg]
  ? (param: Arg) => R
  : A extends [infer Arg, ...infer REST]
  ? (x: Arg) => Curried<REST, R>
  : never;

declare function curry<A extends any[], R>(
  fn: (...args: A) => R
): Curried<A, R>;

function sum(a: number, b: number, c: number) {
  return a + b;
}

const currySum = curry(sum);

console.log(currySum(1)(2));
