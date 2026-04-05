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

// Test validation:
try {
  new Tea("", "green", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Name is required"

try {
  new Tea("Test", "purple", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Invalid type: purple"

// create all tea instances
const teaInstances = teas.map((obj) => Tea.fromObject(obj));
// console.log(teaInstances)

// Note
// Array of objects(each object is a instance of Tea class - in memory)
console.log(typeof teaInstances);

console.log(teaInstances.length); // 20
console.log(teaInstances[0].describe());

// "Sencha (green) from Japan - 12.00 DKK/100g [organic]"
console.log(teaInstances[1].describe());
// "Earl Grey (black) from India - 8.00 DKK/100g"
