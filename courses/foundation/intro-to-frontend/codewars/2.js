// Counting sheep...

function countSheep(arrayOfSheep) {
  return arrayOfSheep.filter(Boolean).length;
}

// Test case
const sheepArray = [
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  true,
];

console.log(countSheep(sheepArray));
