const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// validation
async function validateItemsExist(items) {
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();

  const invalidItems = items.filter(
    (item) => !teas.find((tea) => tea.id === item.teaId), // not exist ->true
  );

  if (invalidItems.length > 0) {
    const ids = invalidItems.map((i) => i.teaId).join(", "); // array of invalid ids
    throw new Error(`Invalid tea IDs: ${ids}`);
  }

  return teas;
}

// checkOrderStock
async function checkOrderStock(items) {
  const response = await fetch(`${API_BASE}/inventory`);
  const inventory = await response.json();

  const shortages = [];

  for (const item of items) {
    const stockItem = inventory.find((inv) => inv.teaId === item.teaId);
    if (!stockItem) {
      shortages.push({
        teaId: item.teaId,
        name: `Tea ID ${item.teaId}`,
        needed: item.grams,
        available: 0,
      });
    } else if (stockItem.stockCount < item.grams) {
      shortages.push({
        teaId: item.teaId,
        name: `Tea ID ${item.teaId}`,
        needed: item.grams,
        available: stockItem.stockCount,
      });
    }
  }

  return {
    inStock: shortages.length === 0,
    shortages,
  };
}

// calculateOrderTotal
async function calculateOrderTotal(items) {
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();

  let total = 0;

  for (const item of items) {
    const tea = teas.find((t) => t.id === item.teaId);
    if (!tea) throw new Error(`Tea ID ${item.teaId} not found`);
    total += tea.pricePerGram * item.grams;
  }

  return total;
}

// test
async function processOrder(items) {
  console.log("Processing order...\n");

  // validate items exist
  console.log("1. Validating items...");
  await validateItemsExist(items);
  console.log("All items exist");

  // check stock
  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    console.log("Shortages detected:");
    stockResult.shortages.forEach((s) =>
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`),
    );
    throw new Error("Some items are out of stock");
  }
  console.log("All items in stock");

  // calculate total
  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items);
  console.log(`Total calculated: ${total.toFixed(2)} DKK`);

  // create order summary
  console.log("4. Creating summary...\n");

  return {
    items: items.length,
    total,
    status: "ready",
  };
}

// example usage
const myOrder = [
  { teaId: 1, grams: 50 },
  { teaId: 5, grams: 100 },
];

// again promise
processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });

// insight (v.important for node)
// Keep your module “pure” by just defining/exporting functions and
// not running code at the top level. Otherwise, some “magic” might
// happen when it’s executed.
