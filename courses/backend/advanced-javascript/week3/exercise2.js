const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function getTeaDetails(id) {
  // fetch concurrent (parallel-style)
  const [teaResponse, inventoryResponse] = await Promise.all([
    fetch(`${API_BASE}/teas/${id}`),
    fetch(`${API_BASE}/inventory/${id}`)
  ]);

  const tea = await teaResponse.json();
  const inventory = await inventoryResponse.json();

  // combined object (spread operator)
  return {
    ...tea,
    stock: inventory.stockCount
  };
}

// test (again promise and can be handle using again async await )
getTeaDetails(1).then((tea) => {
    // console.log(tea)
  console.log(`${tea.name} (${tea.origin})`);
  console.log(`Price: ${tea.pricePerGram} DKK/gram`);
  console.log(`Stock: ${tea.stock} grams`);
  console.log(`Value: ${(tea.pricePerGram * tea.stock).toFixed(2)} DKK`);
});

