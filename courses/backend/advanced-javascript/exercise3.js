import { teas as data } from "./data/teas.js";


const lowStockAlert = data.map((d) => {
  return {
    name: d.name,
    stockCount: d.stockCount
  }
}).sort((a, b) => a.stockCount - b.stockCount);

console.log(lowStockAlert)