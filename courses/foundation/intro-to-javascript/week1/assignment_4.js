// step 1
const firstWords = [
  "Easy",
  "Awesome",
  "Corporate",
  "Smart",
  "Bright",
  "Quick",
  "Happy",
  "Bold",
  "Fresh",
  "Next",
];
const secondWords = [
  "Hub",
  "Forge",
  "Collective",
  "Dynamics",
  "Labs",
  "Works",
  "Studios",
  "Ventures",
  "Network",
  "Sphere",
];

// step 2
const randomIndex_1 = Math.floor(Math.random() * 10);
const randomIndex_2 = Math.floor(Math.random() * 10);

// step 3
const startupName = firstWords[randomIndex_1] + " " + secondWords[randomIndex_2];

// step 4
console.log(
  'The startup: "' +
    startupName +
    '" contains ' +
    startupName.length +
    " characters"
);
