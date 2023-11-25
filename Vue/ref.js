import { track, trigger } from './effect.js';
import { TrackOpTypes, TriggerOpTypes } from './operations.js';
import { reactive } from './reactive.js';

export function ref(value) {
  if (typeof value === 'object' && value !== null) {
    return reactive({ value });
  }
  return {
    get value() {
      track(this, TrackOpTypes.GET, 'value');
      return value;
    },
    set value(newValue) {
      if (!Object.is(value, newValue)) {
        trigger(this, TriggerOpTypes.SET, 'value', newValue);
        value = newValue;
      }
    },
  };
}
