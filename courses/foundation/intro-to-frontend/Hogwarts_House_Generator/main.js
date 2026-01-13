const houses = [
  {
    name: "Gryffindor",
    image: "https://images3.alphacoders.com/556/556467.jpg",
  },
  {
    name: "Hufflepuff",
    image: "https://wallpapercave.com/wp/wp1958741.jpg",
  },
  {
    name: "Ravenclaw",
    image: "https://wallpapercave.com/wp/wp4237988.png",
  },
  {
    name: "Slytherin",
    image: "https://images6.alphacoders.com/556/thumb-1920-556486.jpg",
  },
];

const nameInput = document.getElementById("nameInput");
const result = document.getElementById("result");
const houseImage = document.getElementById("houseImage");
const sortButton = document.getElementById("sortButton");
const tryAgainButton = document.getElementById("tryAgainButton");

function getRandomHouse() {
  return houses[Math.floor(Math.random() * houses.length)];
}

function assignHouse() {
  const name = nameInput.value.trim();

  if (!name) {
    result.textContent = "Please enter your name!";
    houseImage.classList.remove("show");
    houseImage.style.display = "none";
    return;
  }

  const house = getRandomHouse();

  result.textContent = `${name} belongs in ${house.name}!`;

  houseImage.src = house.image;
  houseImage.alt = house.name;

  houseImage.style.display = "block";
  houseImage.classList.remove("show");

  // trigger animation
  setTimeout(() => {
    houseImage.classList.add("show");
  }, 50);
}

sortButton.addEventListener("click", assignHouse);
tryAgainButton.addEventListener("click", assignHouse);
