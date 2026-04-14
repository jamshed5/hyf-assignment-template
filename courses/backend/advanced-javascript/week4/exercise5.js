import { teas } from "./data/teas.js";

class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    // Validation
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name is required");
    }

    const validTypes = ["green", "black", "herbal", "oolong", "white"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}`);
    }

    if (typeof pricePerGram !== "number" || pricePerGram <= 0) {
      throw new Error("Price per gram must be a positive number");
    }

    // Store properties
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = Boolean(organic);
  }

  priceFor(grams) {
    return this.pricePerGram * grams;
  }

  describe() {
    const pricePer100g = (this.pricePerGram * 100).toFixed(2);
    const organicLabel = this.organic ? " [organic]" : "";
    return `${this.name} (${this.type}) from ${this.origin} - ${pricePer100g} DKK/100g${organicLabel}`;
  }
  /*
 static method / class method
*/
  static fromObject(obj) {
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic,
    );
  }
}

class OrderItem {
  constructor(tea, grams) {
    if (!(tea instanceof Tea)) {
      throw new Error("tea must be a Tea instance");
    }
    if (typeof grams !== "number" || grams <= 0) {
      throw new Error("grams must be a positive number");
    }

    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    // this.tea is a instnace of class Tea (So Tea class is availabe)
    return this.tea.priceFor(this.grams);
  }

  describe() {
    return `${this.grams}g ${this.tea.name} - ${this.lineTotal().toFixed(2)} DKK`;
  }
}

class Order {
  // cart
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    // console.log(orderItem)
    // Note: these validation doesnt make sense (but requirements)
    if (this.status !== "pending") {
      throw new Error("Cannot add items to a non-pending order");
    }
    // extra (alreadt know that instance of OrderItem though passing)
    if (!(orderItem instanceof OrderItem)) {
      throw new Error("orderItem must be an instance of OrderItem");
    }
    this.items.push(orderItem);
  }

  getTotal() {
    // Again have instances of Tea class (methods of Tea are availabe here)
    return this.items.reduce((sum, item) => sum + item.lineTotal(), 0);
  }

  getSummary() {
    const itemLines = this.items
      .map((item) => `  ${item.describe()}`)
      .join("\n");
    const itemCount = this.items.length;
    const plural = itemCount !== 1 ? "s" : "";

    return `Order (${this.status}) - ${itemCount} item${plural}
  ${itemLines}
  Total: ${this.getTotal().toFixed(2)} DKK`;
  }

  // // check cart
  // getCart(){
  //   return this.items
  // }
}

class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = []; // store all orders
  }

  // confimed order on UI after payment
  placeOrder(order) {
    if (!(order instanceof Order)) {
      throw new Error("order must be an instance of Order");
    }
    order.status = "confirmed"; // mark order as confirmed
    this.orders.push(order);
    return order;
  }

  totalSpent() {
    return this.orders.reduce((sum, order) => sum + order.getTotal(), 0);
  }

  getOrderHistory() {
    const lines = this.orders.map((order, index) => {
      const orderHeader = `Order ${index + 1} (${order.status}) - ${order.items.length} item${order.items.length !== 1 ? "s" : ""}`;
      const orderItems = order.items
        .map((item) => `  ${item.describe()}`)
        .join("\n");
      const orderTotal = `Total: ${order.getTotal().toFixed(2)} DKK`;
      return [orderHeader, orderItems, orderTotal].join("\n");
    });

    return `${this.name} (${this.email}) - ${this.orders.length} order${this.orders.length !== 1 ? "s" : ""}\n\n${lines.join("\n\n")}\n\nLifetime total: ${this.totalSpent().toFixed(2)} DKK`;
  }
}

class Inventory {
  constructor() {
    // Map of tea name → { tea: Tea instance, stockCount: number }
    this.items = new Map();
  }

  add(tea, stockCount) {
    // extra but requirement
    if (!(tea instanceof Tea)) {
      throw new Error("tea must be a Tea instance");
    }
    // validate that stock should be positive and number
    if (typeof stockCount !== "number" || stockCount < 0) {
      throw new Error("stockCount must be a non-negative number");
    }
    this.items.set(tea.name, { tea, stockCount });
  }

  //   consuming
  sell(teaName, grams) {
    const item = this.items.get(teaName);
    if (!item) throw new Error(`Tea not found: ${teaName}`);
    if (grams > item.stockCount)
      throw new Error(`Not enough stock of ${teaName}`);
    item.stockCount -= grams;
  }
  //   adding stock
  restock(teaName, grams) {
    const item = this.items.get(teaName);
    if (!item) throw new Error(`Tea not found: ${teaName}`);
    if (grams <= 0) throw new Error("Restock amount must be positive");
    item.stockCount += grams;
  }

  //   always check befor selling
  getStock(teaName) {
    const item = this.items.get(teaName);
    if (!item) return 0;
    return item.stockCount;
  }

  getLowStock(threshold) {
    return Array.from(this.items.values()).filter(
      (item) => item.stockCount < threshold,
    );
  }

  getTotalValue() {
    return Array.from(this.items.values()).reduce(
      (sum, item) => sum + item.tea.pricePerGram * item.stockCount,
      0,
    );
  }
}

class TeaShop {
  constructor(teaData) {
    // Create catalog and inventory
    // Catalog without stock
    this.catalog = teas.map((obj) => Tea.fromObject(obj));
    this.inventory = new Inventory();
    this.catalog.forEach((tea) => {
      // Assuming teaData has stockCount (which is true)
      const data = teaData.find((t) => t.name === tea.name);
      //   Create inventory table
      this.inventory.add(tea, data.stockCount);
    });

    this.customers = []; // store Customer instances
  }

  registerCustomer(name, email) {
    const customer = new Customer(name, email);
    this.customers.push(customer);
    return customer;
  }

  createOrder(customer, items) {
    if (!(customer instanceof Customer)) {
      throw new Error("Invalid customer");
    }

    const order = new Order();

    for (const { teaName, grams } of items) {
      // Find tea in catalog
      const tea = this.catalog.find((t) => t.name === teaName);
      if (!tea) throw new Error(`Tea not found: ${teaName}`);

      // Check stock
      const available = this.inventory.getStock(teaName);
      if (grams > available) {
        throw new Error(
          `Not enough stock for ${teaName}. Available: ${available}g`,
        );
      }

      // Create OrderItem and add to Order
      const orderItem = new OrderItem(tea, grams);
      order.addItem(orderItem);

      // Reduce inventory
      this.inventory.sell(teaName, grams);
    }

    // Place order on customer
    customer.placeOrder(order);

    // Return the order
    return order;
  }

  getReport() {
    const totalCustomers = this.customers.length;
    const totalOrders = this.customers.reduce(
      (sum, c) => sum + c.orders.length,
      0,
    );
    const totalRevenue = this.customers.reduce(
      (sum, c) => sum + c.totalSpent(),
      0,
    );

    const lowStockItems = this.inventory.getLowStock(50); // example threshold 50g

    const lowStockReport = lowStockItems
      .map((item) => `- ${item.tea.name}: ${item.stockCount}g`)
      .join("\n");

    return `
TeaShop Report:
Total customers: ${totalCustomers}
Total orders: ${totalOrders}
Total revenue: ${totalRevenue.toFixed(2)} DKK
Low stock items (below 50g):
${lowStockReport || "None"}
`.trim();
  }
}

// create all tea instances
const teaInstances = teas.map((obj) => Tea.fromObject(obj));

const shop = new TeaShop(teas);

const alex = shop.registerCustomer("Alex", "alex@example.com");
const maria = shop.registerCustomer("Maria", "maria@example.com");

const order1 = shop.createOrder(alex, [
  { teaName: "Sencha", grams: 100 },
  //   { teaName: "Matcha", grams: 50 }, // exceeding limit while (inventory have stockcount 30) and putted the check
  { teaName: "Matcha", grams: 20 },
]);
console.log(order1.getSummary());

const order2 = shop.createOrder(maria, [{ teaName: "Earl Grey", grams: 200 }]);
console.log(order2.getSummary());

console.log(shop.getReport());
