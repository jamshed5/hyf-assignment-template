const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function checkOrderStock(items) {
  // fetch all inventory
  const response = await fetch(`${API_BASE}/inventory`);
  const inventory = await response.json();
  // console.log(inventory)

  // check shortages
  const shortages = [];

  for (const item of items) {
    // find (first match)
    const stockItem = inventory.find((inv) => inv.teaId === item.teaId);

    if (!stockItem) {
      //   not exist
      shortages.push({
        teaId: item.teaId,
        name: `Tea ID ${item.teaId}`,
        needed: item.grams,
        available: 0,
      });
    } else if (stockItem.stockCount < item.grams) {
      //  exist but not eough stock
      shortages.push({
        teaId: item.teaId,
        name: `Tea ID ${item.teaId}`,
        needed: item.grams,
        available: stockItem.stockCount,
      });
    }
  }

  // return object
  return {
    inStock: shortages.length === 0,
    shortages,
  };
}

// test
const largeOrder = [
  { teaId: 1, grams: 100 },
  { teaId: 2, grams: 500 }, // might be out of stock
  { teaId: 3, grams: 9999 }, // definitely out of stock
];

// again promise
checkOrderStock(largeOrder).then((result) => {
  if (result.inStock) {
    console.log("All items in stock!");
  } else {
    console.log("Shortages:");
    result.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
  }
});

// insight:
// fetching data from an API is one way to get the current context or state.
// alternatively, the data could come from a database or be saved locally.
// using async/await is usually better than chaining fetch().then(),
// because it avoids deeply nested Promises and makes the code easier to read.
