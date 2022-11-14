import { DECK } from "./deck.js";
// left with check for blackjack wins and variable ace value
let cardDeck = DECK;
const GAMESTATES = ["draw-cards", "stand-or-hit", "show-results"];
let gameState = GAMESTATES[0];
let results = {
  dealer: {
    score: 0,
    cardsDrawn: [],
    cardNames: [],
    cardTotal: 0,
  },
  "Player 1": {
    score: 0,
    cardsDrawn: [],
    cardNames: [],
    cardTotal: 0,
  },
};
const renderButtons = () => {
  document
    .querySelectorAll(".btn--conditional")
    .forEach((e) => (e.style.display = "inline-block"));
};
const hideButtons = () => {
  document
    .querySelectorAll(".btn--conditional")
    .forEach((e) => (e.style.display = "none"));
};
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // FisherYates Algorithm
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
const drawCards = (numCards, player) => {
  for (let _ = 0; _ < numCards; _++) {
    // adds drawn cards to cardsDrawn
    results[player].cardsDrawn.push(cardDeck.pop());
  }
  results[player].cardNames = results[player].cardsDrawn.map(
    // get the card names
    (card) => card.name
  );
  // compute total score
  results[player].cardTotal = results[player].cardNames.reduce(
    (total, cardName) => {
      if (+cardName) {
        // if it is a normal number just add the number
        return (total += +cardName);
      } else if (cardName === "ace") {
        if (total > 10) return (total += 1); // if total > 10 ace becomes 1
        return (total += 11);
      }
      return (total += 10); // if it is jack queen etc
    },
    0
  );
};
const checkBlackjackWin = (player) => {
  if (
    results[player].cardTotal === 21 &&
    results[player].cardNames.length === 2
  )
    return true;
  return false;
};

const drawCardOutput = function () {
  if (results["Player 1"].cardTotal > 21) {
    // if bust proceed to results
    hideButtons();
    gameState = GAMESTATES[2];
    return "Oops, you busted! Click submit to check if the dealer also busted...";
  }
  // else just continue drawing
  const cardDescription = results["Player 1"].cardsDrawn.map(
    (card) => card.name + " of " + card.suit
  );
  return `Your cards are ${cardDescription.join(", ")}<br><br>
  Your total score is now ${
    results["Player 1"].cardTotal
  }. Please press hit to draw one more or stand to stop drawing!`;
};
// need a fxn to check for blackjack when both player and dealer first draw 2 cards
const analyzeGame = function () {
  if (
    results["Player 1"].cardTotal === results.dealer.cardTotal ||
    (results.dealer.cardTotal > 21 && results["Player 1"].cardTotal > 21)
  )
    return "draw";
  else if (
    (results["Player 1"].cardTotal > results.dealer.cardTotal &&
      results["Player 1"].cardTotal <= 21) ||
    (results["Player 1"].cardTotal <= 21 && results.dealer.cardTotal > 21)
  ) {
    results["Player 1"].score += 1;
    if (checkBlackjackWin("Player 1")) return "Player won by Blackjack";
    else return "Player won";
  } else if (
    (results.dealer.cardTotal > results["Player 1"].cardTotal &&
      results.dealer.cardTotal <= 21) ||
    (results.dealer.cardTotal <= 21 && results["Player 1"].cardTotal > 21)
  )
    results.dealer.score += 1;
  if (checkBlackjackWin("dealer")) return "Dealer won by Blackjack";
  else return "Dealer won";
};
const resetGame = () => {
  gameState = GAMESTATES[0];
  cardDeck = DECK; // make the deck back to the 52 cards
  for (const player of Object.keys(results)) {
    results[player].cardsDrawn = [];
    results[player].cardNames = [];
    results[player].cardTotal = 0;
  } // reset all parameters
};
const resultOutput = (gameResult) => {
  let output = "";
  for (const player of Object.keys(results)) {
    const cardDescription = results[player].cardsDrawn.map(
      (card) => card.name + " of " + card.suit
    );
    output += `${"♠️".repeat(30)} ${player}'s results: ${"♠️".repeat(
      30
    )} <br><br>
    ${cardDescription.join("<br><br>")}<br><br>
    Total Score: ${results[player].cardTotal} <br><br>
    `;
  }
  output += `${analyzeGame()}!<br><br>
  Click submit to play again!`;
  resetGame();
  return output;
};

// 3. ask player to hit or stand
// 4. end
const pressHit = () => {
  drawCards(1, "Player 1");
  return drawCardOutput();
};
const pressStand = () => {
  gameState = GAMESTATES[2];
  hideButtons();
  return "Click the submit button to see the result of the game!";
};
document.querySelector(".button__div").addEventListener("click", function (e) {
  // event delegation - attach listener to parent div
  var input = document.querySelector("#input-field");
  var output = document.querySelector("#output-div");
  if (e.target.classList.contains("submit-button")) {
    // Set result to input value

    var result = main(input.value);

    // Display result in output element

    output.innerHTML = result;

    // Reset input value
    input.value = "";
  } else if (e.target.classList.contains("hit-button")) {
    if (gameState === GAMESTATES[1]) {
      // console.log("hit");
      output.innerHTML = pressHit();
      input.value = "";
    }
  } else if (e.target.classList.contains("stand-button")) {
    if (gameState === GAMESTATES[1]) {
      // console.log("stand");
      output.innerHTML = pressStand();
      input.value = "";
    }
  }
});
const main = function (input) {
  outputLeaderBoard();
  if (gameState === GAMESTATES[0]) {
    // 1. shuffle the card deck
    // 2. draw the cards
    shuffleArray(cardDeck);
    drawCards(2, "Player 1");
    drawCards(2, "dealer");
    while (results.dealer.cardTotal < 17) drawCards(1, "dealer");
    gameState = GAMESTATES[1]; // if dealer total less than 17 draw a card
    renderButtons();
    return drawCardOutput();
  }
  return resultOutput(); // if gameState === show-results
};
const outputLeaderBoard = function () {
  let allScores = [];
  const players = Object.keys(results);
  for (const player of players) {
    allScores.push(results[player].score);
  }
  const scoreNodes = document.querySelectorAll(".score");
  scoreNodes.forEach((score, idx) => {
    score.innerHTML = `${players[idx]}'s score: ${allScores[idx]}`;
  });
};
