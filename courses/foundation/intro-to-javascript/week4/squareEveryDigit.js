function squareDigits(num) {
  return Number(
    String(num)
      .split("")
      .map((digit) => digit * digit)
      .join("")
  );
}

console.log(squareDigits(9119));
console.log(squareDigits(765));
