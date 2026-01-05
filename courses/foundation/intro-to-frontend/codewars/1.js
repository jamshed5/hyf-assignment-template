// Remove First and Last Character

function removeFirstAndLast(str) {
  if (str.length === 2) return "";
  return str.slice(1, -1);
}

// Test cases
console.log(removeFirstAndLast("eloquent"));
console.log(removeFirstAndLast("country"));
console.log(removeFirstAndLast("person"));
console.log(removeFirstAndLast("ab"));
console.log(removeFirstAndLast("xyz"));
console.log(removeFirstAndLast("1!2"));
