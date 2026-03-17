import { teas } from "./data/teas.js";

// part 1
export function validateOrder(order, callback) {
  setTimeout(() => {
    const errors = [];

    order.items.forEach((item) => {
      /*
    some() to check existence.
    Also, here `teas` acts as a global variable.
    */
      const teaExists = teas.some((tea) => tea.id === item.teaId);
      if (!teaExists) {
        errors.push(`Tea with id ${item.teaId} does not exist`);
      }
    });
    /*
    (result) callback taking one parameter which is result
    and result could be anything, e.g., object, array, integer, etc.
    This allows dynamic behavior depending on what is passed.
    */
    // i real api, this like developing context
    callback({
      valid: errors.length === 0, // 0===0
      errors: errors, // []
    });
  }, 200);
}

// part 2
export function calculateTotal(order, callback) {
  setTimeout(() => {
    let total = 0;

    order.items.forEach((item) => {
      /*
    .find() is used to get the **first matching element** in an array.
    It returns a single object (or undefined if nothing matches).
    */
      const tea = teas.find((tea) => tea.id === item.teaId);

      if (tea) {
        total += tea.pricePerGram * item.grams;
      }
    });

    // context
    callback({
      orderId: order.id,
      total: Number(total.toFixed(2)),
    });
  }, 300);
}

// part 3
export function checkStock(order, callback) {
  setTimeout(() => {
    const shortages = [];

    order.items.forEach((item) => {
      const tea = teas.find((tea) => tea.id === item.teaId);

      if (tea && item.grams > tea.stockCount) {
        shortages.push(`${tea.name} shortage`);
      }
    });

    callback({
      orderId: order.id,
      inStock: shortages.length === 0,
      shortages: shortages,
    });
  }, 400);
}

// order object
export const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

validateOrder(order, (result) => {
  console.log("Validation result:", result);
});

calculateTotal(order, (result) => {
  console.log("Total price:", result);
});

checkStock(order, (result) => {
  console.log("Stock check:", result);
});

