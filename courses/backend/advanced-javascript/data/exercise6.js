import { teas as data } from "./data/teas.js";


const totalValue = data.reduce((sum, row) => {
  return sum + row.pricePerGram * row.stockCount;
}, 0);

console.log("Total inventory value:", totalValue.toFixed(2));