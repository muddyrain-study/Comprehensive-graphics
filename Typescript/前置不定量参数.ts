type JSTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  object: object;
  function: Function;
  symbol: symbol;
  bigint: bigint;
  undefined: undefined;
  null: null;
  unknown: unknown;
  any: any;
};
type JSTypeName = keyof JSTypeMap;

type ArgsType<T extends JSTypeName[]> = {
  [I in keyof T]: JSTypeMap[T[I]];
};
declare function addImpl<T extends JSTypeName[]>(
  ...args: [...T, (...args: ArgsType<T>) => any]
): void;

addImpl('string', 'boolean', 'number', 'bigint', (a, b, c) => {});
