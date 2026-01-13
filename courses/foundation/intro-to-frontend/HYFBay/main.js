const products = getAvailableProducts();

const productList = document.querySelector("#productList");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");

function renderProducts(productsToRender) {
  productList.innerHTML = "";

  productsToRender.forEach((product) => {
    const li = document.createElement("li");
    li.className = "product-item";

    li.innerHTML = `
      <strong class="product-title">${product.name}</strong>
      <span class="product-meta">Price: ${product.price} kr</span>
      <span class="product-meta">Rating: ${product.rating}</span>
    `;

    productList.appendChild(li);
  });
}

renderProducts(products);

searchButton.addEventListener("click", (event) => {
  event.preventDefault();

  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );

  renderProducts(filteredProducts);
});
