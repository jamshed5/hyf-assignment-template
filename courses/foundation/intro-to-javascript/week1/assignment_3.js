// peter
const peterWidth = 8;
const peterDepth = 10;
const peterHeight = 10;
const peterGarden = 100;
const peterActualPrice = 2500000;

// calculation for peter
const peterVolume = peterWidth * peterDepth * peterHeight;
const peterCalculatedPrice = peterVolume * 2.5 * 1000 + peterGarden * 300;

// compare and logic
if (peterActualPrice > peterCalculatedPrice) {
  console.log("Peter is paying too much.");
} else if (peterActualPrice < peterCalculatedPrice) {
  console.log("Peter is paying too little.");
} else {
  console.log("Peter is paying the right price.");
}

// julia
const juliaWidth = 5;
const juliaDepth = 11;
const juliaHeight = 8;
const juliaGarden = 70;
const juliaActualPrice = 1000000;

// calculation for julia
const juliaVolume = juliaWidth * juliaDepth * juliaHeight;
const juliaCalculatedPrice = juliaVolume * 2.5 * 1000 + juliaGarden * 300;

// compare and logic
if (juliaActualPrice > juliaCalculatedPrice) {
  console.log("Julia is paying too much.");
} else if (juliaActualPrice < juliaCalculatedPrice) {
  console.log("Julia is paying too little.");
} else {
  console.log("Julia is paying the right price.");
}
