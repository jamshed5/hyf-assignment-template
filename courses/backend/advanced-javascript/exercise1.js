import { teas as data } from "./data/teas.js";


const result = data.filter((row) => {
    return row.caffeineLevel !== "none"
}).map((row) => {
    return row.name.toUpperCase()
})

console.log(result)
