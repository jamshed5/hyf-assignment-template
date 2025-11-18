const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "Katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

// write some code here
const index = names.findIndex((name) => name === nameToRemove);
if (index !== -1) {
  names.splice(index, 1);
}
// code done
console.log(names);

