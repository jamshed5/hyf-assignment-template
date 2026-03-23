const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function calculateOrderTotal(items) {
  // fetch all teas
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();

  // total price
  let total = 0;

  for (const item of items) {
    // find for first match
    const tea = teas.find((t) => t.id === item.teaId);

    if (!tea) {
      throw new Error(`Tea with id ${item.teaId} not found`);
    }

    total += tea.pricePerGram * item.grams;
  }

  // 3. Return total price
  return total;
}

// test
const order = [
  { teaId: 1, grams: 100 },
  { teaId: 3, grams: 50 },
  { teaId: 8, grams: 200 },
];

// again promise (can be handle through again async await)
calculateOrderTotal(order)
  .then((total) => console.log(`Order total: ${total.toFixed(2)} DKK`))
  .catch((err) => console.error("Error:", err.message));

// insight:
// any async function always returns a promise.
// so, the value you get from calling it is wrapped in a promise.
