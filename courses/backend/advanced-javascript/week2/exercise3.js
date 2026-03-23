import { teas } from "./data/teas.js";
import {
  validateOrder,
  calculateTotal,
  checkStock,
  order,
} from "./exercise2.js";

// processOrder
function processOrder(order) {
  console.log("Processing order", order.id);

  // validateOrder
  validateOrder(order, (validation) => {
    if (!validation.valid) {
      // no any chance to move further
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");
    // calculateTotal
    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");

      // checkStock
      checkStock(order, (stockResult) => {
        if (!stockResult.inStock) {
          console.log("Stock check failed:", stockResult.shortages);
        } else {
          console.log("Stock available for all items");
        }

        // log final result (context in real api)
        const finalResult = {
          orderId: order.id,
          total: pricing.total,
          inStock: stockResult.inStock,
          shortages: stockResult.shortages,
        };

        console.log("Final result:", finalResult);
      });
    });
  });
}
processOrder(order);


// Insights
// Exercise: read data from two tables, process it, and create a context object for rendering.