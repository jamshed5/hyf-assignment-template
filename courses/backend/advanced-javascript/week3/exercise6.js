const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

// sign up
async function signup(email, password) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Signup failed");
  return response.json();
}

// login
async function getAuthToken() {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "test@gmail.com",
      password: "test",
    }),
  });

  if (!response.ok) throw new Error("Login failed");
  const data = await response.json();
  //   response have token from backend
  return data.token;
}

// Create a new order
async function createOrder(items) {
  // auto login and get token
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // send token
    },
    body: JSON.stringify({ items }), // send json
  });

  if (!response.ok) throw new Error("Order creation failed");
  return response.json();
}

// orders according to the login user
async function getMyOrders() {
  const token = await getAuthToken();

  const response = await fetch(`${API_BASE}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // send token
    },
  });

  if (!response.ok) throw new Error("Failed to fetch orders");
  return response.json();
}

// test
signup("test@gmail.com", "test")
  .catch(() => {}) // ignore if already signed up
  .then(() => createOrder([{ teaId: 1, grams: 100 }]))
  .then((order) => console.log("Created order:", order.id))
  .then(() => getMyOrders())
  .then((orders) => console.log("All orders:", orders.length))
  .catch((err) => console.error(err.message));
