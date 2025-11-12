// // fun
// const whatToWear = (temperature) => {
//   if (temperature < 0) {
//     return "a heavy winter coat, gloves, and a warm hat";
//   } else if (temperature < 10) {
//     return "a jacket and warm pants"; 
//   } else if (temperature < 20) {
//     return "a light sweater or hoodie with jeans";
//   } else if (temperature < 30) {
//     return "shorts and a t-shirt";
//   } else {
//     return "light clothing and plenty of sunscreen!";
//   }
// };

// const clothesToWear = whatToWear(18);
// // printing
// console.log(clothesToWear);



// updated function according to mentor instructions 
const whatToWear = (temperature) => {
if (temperature < 20) {
return "a light sweater or hoodie with jeans";
} else if (temperature < 10) {
return "a jacket and warm pants";
} else if (temperature < 0) {
return "a heavy winter coat, gloves, and a warm hat";
} else if (temperature < 30) {
return "shorts and a t-shirt";
} else {
return "light clothing and plenty of sunscreen!";
}
};

const clothesToWear = whatToWear(0);
console.log(clothesToWear);
