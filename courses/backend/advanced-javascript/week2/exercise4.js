import fs from "fs";
import { teas } from "./data/teas.js";

export function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      // error (not passing data)
      callback(error, null);
      return;
    }

    try {
      // array of objects
      const updates = JSON.parse(data);

      // calculate net change per tea
      const netChanges = updates.reduce((acc, update) => {
        // || first truth value
        acc[update.teaId] = (acc[update.teaId] || 0) + update.change;
        return acc;
      }, {});

      // combine with original tea data
      const report = teas.map((tea) => {
        const change = netChanges[tea.id] || 0;
        const newStock = tea.stockCount + change;

        return {
          id: tea.id,
          name: tea.name,
          originalStock: tea.stockCount,
          change,
          newStock,
          inStock: newStock > 0,
        };
      });

      console.log("Inventory Report:\n");

      report.forEach((t) => {
        console.log(
          `${t.name} (ID: ${t.id}) | ` +
            `${t.originalStock} → ${t.newStock} ` +
            `(Change: ${t.change}) ` +
            `${t.inStock ? "In stock" : "Out of stock"}`,
        );
      });

      callback(null, report);
    } catch (err) {
      callback(err, null);
    }
  });
}

generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }

  console.log("\nFinal Report Object:", report);
});
