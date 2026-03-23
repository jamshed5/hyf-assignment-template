import { fetchTea } from './experiment_fun.js';

async function test() {
  const tea = await fetchTea(1);
  console.log("Tea result:", tea);
}

test();