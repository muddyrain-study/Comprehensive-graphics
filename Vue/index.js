import { reactive } from './reactive.js';

const arr = [1, 2, 3, 4, 5, 6];
const state = reactive(arr);

state.pop();

console.log(state);
