//Global Variables
const deck = [],
  playerHand = [],
  dealerHand = [];

function main(input, myOutputValue) {
  if (input === "S") {
    initDeck(1);
    shuffleDeck();
  }
  if (input === "D") {
    initGame();
  }
  myOutputValue = `${printDeck()}<br><br><br>Player:<br>${printHand(
    playerHand
  )} Score: ${calculateScore(playerHand)}<br><br>Dealer:<br>${printHand(
    dealerHand
  )} Score: ${calculateScore(dealerHand)}<br><br>${gameEvaluation()}`;
  return myOutputValue;
}

//Create decks
function initDeck(numberOfDecks) {
  if (deck.length <= 0) {
    const nameConstruct = [
      "Ace",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Jack",
      "Queen",
      "King",
    ];
    const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
    const indexName = Object.entries({ ...nameConstruct });
    for (i = 0; i < numberOfDecks; i++) {
      for (const [index, name] of indexName) {
        for (const suit of suits) {
          const card = { Name: name, Suit: suit, Rank: Number(index) + 1 };
          deck.push(card);
        }
      }
    }
  }
}

//Fisher-Yates Shuffle, Durstenfeld variation
function shuffleDeck() {
  let i, j, holdIndex;
  for (i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    holdIndex = deck[i];
    deck[i] = deck[j];
    deck[j] = holdIndex;
  }
}

// //Fisher-Yates Shuffle, Durstenfeld variation
// function shuffle(array) {
//   var m = array.length,
//     t,
//     i;
//   // While there remain elements to shuffle…
//   while (m) {
//     // Pick a remaining element…
//     i = Math.floor(Math.random() * m--);
//     // And swap it with the current element.
//     t = array[m];
//     array[m] = array[i];
//     array[i] = t;
//   }
//   return array;
// }

function initGame() {
  for (let i = 0; i < 2; i++) {
    hit(playerHand);
    hit(dealerHand);
  }
}

function printHand(hand) {
  let output = "";
  for (let i = 0; i < hand.length; i++) {
    output += `${hand[i].Name} (${hand[i].Rank}) of ${hand[i].Suit}<br>`;
  }
  return output;
}

function printDeck() {
  let output = "";
  for (let i = 0; i < deck.length; i++) {
    output += `${deck[i].Name} (${deck[i].Rank}) of ${deck[i].Suit}<br>`;
  }
  return output;
}

function calculateScore(hand) {
  let totalPoints = 0;
  for (i = 0; i < hand.length; i++) {
    let point = hand[i].Rank >= 10 ? 10 : hand[i].Rank;
    totalPoints += point;
  }
  const ace = (card) => card.Rank === 1;
  return !hand.some(ace)
    ? totalPoints
    : totalPoints > 11
    ? totalPoints
    : (totalPoints += 10);
}

const hit = (hand) => hand.push(deck.pop());

//Evaluation if draw
const drawEvaluation = () =>
  calculateScore(playerHand) === calculateScore(dealerHand);

//Evaluate if win
const winEvaluation = () =>
  calculateScore(playerHand) > calculateScore(dealerHand);

//Evaluate game
const gameEvaluation = () =>
  drawEvaluation() ? "You tied!" : winEvaluation() ? "You won!" : "You lost!";
