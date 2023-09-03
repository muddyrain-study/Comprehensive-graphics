type DeepReadonly<T extends Record<string | symbol, any>> = {
  readonly [k in keyof T]: DeepReadonly<T[k]>;
};

interface Obj {
  a: number;
  b: number;
  c: {
    d: boolean;
  };
}

let obj: DeepReadonly<Obj> = {
  a: 1,
  b: 2,
  c: {
    d: true,
  },
};

// obj.c.d = false;
