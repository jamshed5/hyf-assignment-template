import { teas as data } from "./data/teas.js";


const searchTeas = (data, query) => {
  return data
    .filter((row) => {
      if (row.name.toLowerCase().includes(query.toLowerCase())) {
        return row;
      }
      return false;
    })
    .map((row) => {
      return row.name;
    })
    .sort();

};

console.log(searchTeas(data, "earl"));
console.log(searchTeas(data, "dragon"));
console.log(searchTeas(data, "ch"));

// Personal Note:
// if i return data in the end of the function logic (inside) like c++ then i get problem here because i am using chaining on arrayOfObjects inside function