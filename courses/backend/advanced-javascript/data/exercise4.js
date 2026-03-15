import { teas as data } from "./data/teas.js";


const teasByOrigin = (data) => {
  return data.reduce((acc, row) => {
    if (!acc[row.origin]) {
      acc[row.origin] = [];
    }
    acc[row.origin].push(row.name);
    return acc;
  }, {});
}

console.log(teasByOrigin(data));