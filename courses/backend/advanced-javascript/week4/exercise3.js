import { teas } from "./data/teas.js";

//  Tea class from ex-1
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

// create all tea instances
const teaInstances = teas.map((obj) => Tea.fromObject(obj));
const inventory = new Inventory();

// add teas to inventory with their stock counts
teaInstances.forEach((tea) => {
  /*
    in tea i have these variables (suppose frontend ui) 
    name: 'Pu-erh',
    type: 'black',
    origin: 'China',
    pricePerGram: 0.35,
    organic: false
    */
  //    check item exist -> in case of true add stockcount to inventory
  const data = teas.find((t) => t.name === tea.name);
  inventory.add(tea, data.stockCount);
});

console.log("Sencha stock:", inventory.getStock("Sencha")); // e.g., 150

inventory.sell("Sencha", 50);
console.log("After selling 50g:", inventory.getStock("Sencha")); // 100
// testing
// console.log(inventory)

console.log("Low stock (< 50):");
// check and chaining
inventory.getLowStock(50).forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log(
  "Total inventory value:",
  inventory.getTotalValue().toFixed(2),
  "DKK",
);

/* 
// Insight 
1- Inventory is stored in a separate table with stock counts.
2- UI shows “Out of Stock” based on inventory, not the product table.
3- Orders check inventory first; stock is reduced only if available.
4- The product table remains unchanged.

Product table: static info (name, type, price, origin, etc.) (not stockcount)
Inventory table: dynamic stock (stockCount) updated on sales or restocks

Case
If someone orders 200 but only 100 are available, the order should not proceed
1- Check inventory before adding to cart and at checkout.
2- If stock is insufficient, show a message and block the action.
3- Only allow checkout when inventory can fulfill the order.
4- This prevents overselling and keeps stock accurate.
*/
