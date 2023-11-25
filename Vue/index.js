import { effect } from './effect.js';
import { ref } from './ref.js';
import { computed } from './computed.js';
import { reactive } from './reactive.js';

const state = reactive({
  a: 1,
  b: 2,
});

const sum = computed(() => {
  console.log('computed');
  return state.a + state.b;
});

effect(() => {
  console.log('render', sum.value);
});

state.a++;
