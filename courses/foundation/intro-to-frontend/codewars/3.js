// String ends with?

function solution(str, ending) {
  return str.endsWith(ending);
}

// Test cases
console.log(solution("abc", "bc"));
console.log(solution("abc", "d"));
console.log(solution("hello", "lo"));
console.log(solution("hello", "he"));
