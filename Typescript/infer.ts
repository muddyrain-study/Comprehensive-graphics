type Return<T> = T extends (...arg: any[]) => infer R ? R : T;

type ReturnPromise<T> = T extends Promise<infer R> ? R : T;

type FistArg<T> = T extends (firstArg: infer f, ...args: any[]) => void ? f : T;

type ArrayType<T> = T extends (infer R)[] ? R : T;

type ItemType = ArrayType<[string, number]>;
type ItemType2 = ArrayType<string[]>;

type fa = FistArg<(name: string, age: number) => void>;

type A = Return<() => string>;

type B = ReturnPromise<Promise<any[]>>;
