import { teas as data } from "./data/teas.js";


const countByType = data.reduce((counts, row) => {
  if (!counts[row.type]) {
    counts[row.type] = 0;
  }
  counts[row.type] += 1;
  return counts;
}, {});

console.log(countByType);