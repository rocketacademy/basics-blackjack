const cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
let allCards = [...cards, ...cards, ...cards, ...cards];
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // FisherYates Algorithm
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
const GAME_STATES = ["show-cards", "hit-or-stand", "end-game"];
let results = {
  game_state: GAME_STATES[0],
  hitOrNot: "",
  dealer: {
    score: 0,
    cards: [],
    total: 0,
  },
  1: {
    score: 0,
    cards: [],
    total: 0,
  },
};
const resetGame = function () {
  results.game_state = GAME_STATES[0];
  allCards = [...cards, ...cards, ...cards, ...cards];
  results.dealer.cards = [];
  results[1].cards = [];
};
const computeTotal = function (arr) {
  return arr.reduce((sum, val) => {
    return (sum += val);
  }, 0);
};
const drawCards = function (numCards, player) {
  let drawnCards = [];
  for (let _ = 0; _ < numCards; _++) {
    let drawnCard = allCards.shift();
    drawnCards.push(drawnCard);
  }
  results[player].cards = [...results[player].cards, ...drawnCards];
  results[player].total = computeTotal(results[player].cards);
};
const winner = function () {
  const dealerTotal = results.dealer.total;
  const playerTotal = results[1].total;
  if (dealerTotal === playerTotal) return "Draw";
  else if (dealerTotal === 21) return "Dealer won";
  else if (playerTotal === 21) return "Player won";
  else if (playerTotal > dealerTotal && playerTotal < 22) return "Player won";
  else if (dealerTotal > playerTotal && dealerTotal < 22) return "Dealer won";
};

const wonBy = function (winnerMessage) {
  if (winnerMessage === "Player won") {
    if (results[1].total === 21) return "Blackjack";
    return "Normal win";
  } else if (winnerMessage === "Dealer won") {
    if (results.dealer.total === 21) return "Blackjack";
    return "Normal win";
  } else return "Draw";
};
const analyzeForBlackjack = function () {
  if (results.dealer.total === 21 && results[1].total === 21)
    return "Both Blackjack";
  else if (results.dealer.total === 21) return "dealer Blackjack";
  else if (results[1].total === 21) return "Player Blackjack";
  return "No Blackjack";
};
const showCardsOutput = function () {
  let output;
  if (analyzeForBlackjack() === "No Blackjack") {
    output = `Your cards are ${results[1].cards.join(", ")}. <br><br>
    Your score is ${results[1].total}. <br><br>
    Would you like to hit (draw a card) or stand (end your turn)?<br><br>
    Type hit to draw or stand to end`;
    results.game_state = GAME_STATES[1];
  } else if (analyzeForBlackjack() === "Both Blackjack") {
    output = `Both you and the dealer drew Blackjacks, it was a draw!<br><br>
    Please press submit to restart the game!`;
    resetGame();
  } else if (analyzeForBlackjack() === "Player Blackjack") {
    output = `Congrats, you drew a Blackjack, so you won!<br><br>
    Please press submit to restart the game!`;
    resetGame();
  } else if (analyzeForBlackjack() === "dealer Blackjack") {
    output = `Oops, the dealer drew a Blackjack, so you lost!<br><br>
    Please press submit to restart the game!`;
    resetGame();
  }
  return output;
};
const drawCardsOutput = function (input) {
  if (input === "hit") {
    if (results[1].total > 21) {
      console.log("what");
      results.game_state = GAME_STATES[2];
      return `Oops... you busted! Click submit to see if the dealer also busted.`;
    }
    drawCards(1, 1);
    return showCardsOutput();
  } else if (input === "stand") {
    results.game_state = GAME_STATES[2];
    return `Click submit to check the result!`;
  }
};
const main = function (input) {
  // shuffle cards
  // draw cards for both
  // analyze cards
  if (results.game_state === GAME_STATES[0]) {
    shuffleArray(allCards);
    drawCards(2, 1);
    drawCards(2, "dealer");
    return showCardsOutput();
  }
  // player to decide whether to hit or stand (while loop)
  else if (results.game_state === GAME_STATES[1]) {
    return drawCardsOutput(input);
  }
  // computer to hit or stand
  // generate result
};
