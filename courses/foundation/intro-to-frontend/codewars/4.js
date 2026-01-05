// 7kyu Odd or Even?

function oddOrEven(array) {
  if (array.length === 0) array = [0];
  const sum = array.reduce((acc, num) => acc + num, 0);
  return sum % 2 === 0 ? "even" : "odd";
}

// Test cases
console.log(oddOrEven([0]));
console.log(oddOrEven([0, 1, 4]));
console.log(oddOrEven([0, -1, -5]));
console.log(oddOrEven([]));
