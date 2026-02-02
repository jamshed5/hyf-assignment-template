// (Done by Ali and Rashmi)
let moves = 0;
let timer = 0;
let timerInterval;
let timerStarted = false;
let gameOver = false; // flag to stop the game

const counterDisplay = document.getElementById("counter");
const timerDisplay = document.getElementById("timer");
const container = document.getElementById("cardContainer");

let flippedCards = []; // currently flipped cards

// duplicate and shuffle cards (Done by Rashmi)
const duplicatedCards = [...cardsData, ...cardsData];
shuffle(duplicatedCards);

// (Render Cards Done by Ali)
duplicatedCards.forEach((cardData) => {
  const card = document.createElement("div");
  card.className = "card";

  card.dataset.id = cardData.id; // store id for matching

  card.innerHTML = `
    <div class="card-back">
      <span class="card-name">?</span>
    </div>
    <div class="card-front">
      <span class="card-icon">${cardData.symbol}</span>
    </div>
  `;

  // (Done by Ali)
  card.addEventListener("click", () => {
    if (gameOver) return; // stop clicks if game is over

    // Start timer on first click
    if (!timerStarted) {
      timerStarted = true;

      // Start counting seconds
      timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `Time: ${timer}s`;
      }, 1000);

      // Stop game after 5 minutes
      setTimeout(
        () => {
          gameOver = true;
          clearInterval(timerInterval);
          alert(`Time's up! You made ${moves} moves in ${timer}s.`);
        },
        5 * 60 * 1000,
      ); // 5 minutes = 300,000 ms
    }

    // Ignore clicks on already flipped cards or when 2 cards are flipped
    if (card.classList.contains("flipped") || flippedCards.length === 2) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    // Increment moves
    moves++;
    counterDisplay.textContent = `Moves: ${moves}`;

    // Check for match if 2 cards flipped
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;

      if (card1.dataset.id === card2.dataset.id) {
        // Match: keep flipped
        flippedCards = [];
      } else {
        // Not matched: flip back after 1 second
        setTimeout(() => {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  });

  container.appendChild(card);
});

// shuffle function -(Done by Rashmi)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
