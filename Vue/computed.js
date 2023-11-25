import { effect, track, trigger } from './effect.js';
import { TrackOpTypes, TriggerOpTypes } from './operations.js';

function normalizeParameter(getterOrOptions) {
  if (typeof getterOrOptions === 'function') {
    return {
      getter: getterOrOptions,
      setter: () => {
        console.warn(
          `Computed property "${key}" was assigned to but it has no setter.`
        );
      },
    };
  } else {
    const { get, set } = getterOrOptions;
    return {
      getter: get,
      setter: set,
    };
  }
}

export function computed(getterOrOptions) {
  const { getter, setter } = normalizeParameter(getterOrOptions);
  let value,
    dirty = true;
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
      trigger(obj, TriggerOpTypes.SET, 'value');
    },
  });
  const obj = {
    get value() {
      track(obj, TrackOpTypes.GET, 'value');
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      return value;
    },
    set value(newValue) {
      setter(newValue);
    },
  };
  return obj;
}
