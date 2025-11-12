const boughtCandyPrices = [];

// add candy
const addCandy = (candyType, weight) => {
  let pricePerGram;

  // price table
  if (candyType === "sweet") {
    pricePerGram = 0.5;
  } else if (candyType === "chocolate") {
    pricePerGram = 0.7;
  } else if (candyType === "toffee") {
    pricePerGram = 1.1;
  } else if (candyType === "chewing-gum") {
    pricePerGram = 0.03;
  } else {
    console.log("Unknown candy type:", candyType);
    return;
  }

  // calculate and store total price
  const totalPrice = pricePerGram * weight;
  boughtCandyPrices.push(totalPrice);
  console.log(
    `Added ${candyType} for ${weight}g costing ${totalPrice.toFixed(2)} kr`
  );
};

// Random budget
const amountToSpend = Math.random() * 100;
console.log("You can spend up to:", amountToSpend.toFixed(2), "kr");

// check if you can buy more candy
const canBuyMoreCandy = () => {
  let totalPrice = 0;

  // calculate total price using a for loop
  for (let i = 0; i < boughtCandyPrices.length; i++) {
    totalPrice += boughtCandyPrices[i];
  }

  // return true if still under budget
  return totalPrice < amountToSpend;
};

// add some candy to the cart
addCandy("sweet", 20);
addCandy("chocolate", 15);
addCandy("toffee", 30);
addCandy("chewing-gum", 50);

// check if you can buy more candy
if (canBuyMoreCandy()) {
  console.log("You can buy more, so please do!");
} else {
  console.log("Enough candy for you!");
}

// optional > log total spent
let totalSpent = 0;
for (let price of boughtCandyPrices) {
  totalSpent += price;
}
console.log("Total spent:", totalSpent.toFixed(2), "kr");
