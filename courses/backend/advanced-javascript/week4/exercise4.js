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
      const orderItems = order.items.map(item => `  ${item.describe()}`).join("\n");
      const orderTotal = `Total: ${order.getTotal().toFixed(2)} DKK`;
      return [orderHeader, orderItems, orderTotal].join("\n");
    });

    return `${this.name} (${this.email}) - ${this.orders.length} order${this.orders.length !== 1 ? "s" : ""}\n\n${lines.join("\n\n")}\n\nLifetime total: ${this.totalSpent().toFixed(2)} DKK`;
  }
}

// create all tea instances
const teaInstances = teas.map((obj) => Tea.fromObject(obj));

const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100)); // Sencha
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50)); // Matcha
customer.placeOrder(order2);

// testing console - customer orders
// console.log(customer.orders[0])
// console.log(customer.orders[1])

console.log(customer.getOrderHistory());
console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");

/* 
// Insight 
1- its a myOrder page after successful payment 
*/