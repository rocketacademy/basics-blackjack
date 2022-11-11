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
    results[player].cardsDrawn = [
      ...results[player].cardsDrawn,
      cardDeck.pop(),
    ];
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
        if (results[player].cardTotal > 10) return (total += 1); // if total > 10 ace becomes 1
        return (total += 11);
      }
      return (total += 10); // if it is jack queen etc
    },
    0
  );
};
const BlackjackWinScenario = () => {
  let output = "";
  for (const player of Object.keys(results)) {
    if (
      results[player].cardTotal === 21 &&
      results[player].cardNames.length === 2
    ) {
      const cardDescription = results["Player 1"].cardsDrawn.map(
        (card) => card.name + " of " + card.suit
      );
      output = `${player} has won by blackjack! <br><br>
    Your cards were ${cardDescription.join(", ")}<br><br>
    Click submit to play again!`;
      resetGame();
      return output;
    }
  }
  return output;
};
const drawCardOutput = function () {
  if (results["Player 1"].cardTotal > 21) {
    // if bust proceed to results
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
  }. Please type hit to draw one more or stand to stop drawing!`;
};
// need a fxn to check for blackjack when both player and dealer first draw 2 cards
const analyzeGame = function () {
  if (results["Player 1"].cardTotal === results.dealer.cardTotal) return "draw";
  else if (
    (results["Player 1"].cardTotal > results.dealer.cardTotal &&
      results["Player 1"].cardTotal <= 21) ||
    (results["Player 1"].cardTotal <= 21 && results.dealer.cardTotal > 21)
  )
    return "Player won";
  else if (
    (results.dealer.cardTotal > results["Player 1"].cardTotal &&
      results.dealer.cardTotal <= 21) ||
    (results.dealer.cardTotal <= 21 && results["Player 1"].cardTotal > 21)
  )
    return "Dealer won";
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
    output += `♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ${player}'s results:♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️ ♣️  <br><br>
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
const main = function (input) {
  if (gameState === GAMESTATES[0]) {
    // 1. shuffle the card deck
    // 2. draw the cards
    shuffleArray(cardDeck);
    drawCards(2, "Player 1");
    drawCards(2, "dealer");
    const blackjackWinOutput = BlackjackWinScenario();
    if (blackjackWinOutput) return blackjackWinOutput;
    while (results.dealer.cardTotal < 17) drawCards(1, "dealer");
    return drawCardOutput();
  } else if (gameState === GAMESTATES[1]) {
    if (input === "hit") {
      drawCards(1, "Player 1");
      return drawCardOutput();
    }
    gameState = GAMESTATES[2];
    return "Click submit to see the result of the game!";
  }
  return resultOutput();
};
