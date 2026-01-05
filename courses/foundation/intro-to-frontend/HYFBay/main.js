const products = getAvailableProducts(); // This comes from hyfBayHelpers.js

const productList = document.querySelector("#productList");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");

// Function to render products
function renderProducts(productsToRender) {
  productList.innerHTML = "";

  productsToRender.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${product.name}</strong>
      <span>Price: ${product.price} kr</span>
      <span>Rating: ${product.rating}</span>
    `;
    productList.appendChild(li);
  });
}

// Initial render: display all products
renderProducts(products);

// Search functionality
searchButton.addEventListener("click", () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );

  renderProducts(filteredProducts);
});
