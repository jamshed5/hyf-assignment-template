import { teas as data } from "./data/teas.js";


const inventoryReport = (data) => {
  const totalTeas = data.length;
  const inStock = data.filter(tea => tea.inStock).length;
  const outOfStock = data.filter(tea => !tea.inStock).length;

  const inventoryValues = data.map(tea => tea.pricePerGram * tea.stockCount);
  let totalInventoryValue = 0;
  for (let value of inventoryValues) totalInventoryValue += value;

  const prices = data.map(tea => tea.pricePerGram);
  let totalPrice = 0;
  for (let price of prices) totalPrice += price;
  const averagePrice = totalPrice / totalTeas;

  return {
    totalTeas,
    inStock,
    outOfStock,
    totalInventoryValue,
    averagePrice
  };
};

console.log(inventoryReport(data));