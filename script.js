//Global Variables
const deck = [],
  playerHand = [],
  dealerHand = [];

function main(input, myOutputValue) {
  if (deck.length <= 0) {
    initDeck(1);
    shuffleDeck();
    initGame();
  }
  if (input === "H") {
    hit(playerHand);
  } else if (input === "S") {
    dealerAI();
  }
  if (input === "R") {
    resetGame();
  }
  myOutputValue =
    `Player:<br>${print(playerHand)} Score: ${calculateScore(
      playerHand
    )}<br><br>Dealer:<br>${print(dealerHand)} Score: ${calculateScore(
      dealerHand
    )}<br><br>${gameEvaluation()}` + `<br><br><br>${print(deck)}`;
  return myOutputValue;
}

//Draw a card
const hit = (hand) => hand.push(deck.pop());

//Start game
function initGame() {
  for (let i = 0; i < 2; i++) {
    hit(playerHand);
    hit(dealerHand);
  }
}

//Helper function for checking ace
const ace = (card) => card.Rank === 1;

//Calculate points of current hand
function calculateScore(hand) {
  let totalPoints = 0;
  for (const card of hand) {
    let point = card.Rank >= 10 ? 10 : card.Rank;
    totalPoints += point;
  }
  return !hand.some(ace)
    ? totalPoints
    : totalPoints > 11
    ? totalPoints
    : (totalPoints += 10);
}

//Dealer logic
function dealerAI() {
  while (calculateScore(dealerHand) < 17) {
    hit(dealerHand);
    if (dealerHand.some(ace) && calculateScore(dealerHand) <= 17) {
      hit(dealerHand);
    }
  }
}

//Evaluation if draw
const drawEvaluation = () =>
  calculateScore(playerHand) === calculateScore(dealerHand) ||
  (calculateScore(playerHand) > 21 && calculateScore(dealerHand) > 21);
//Evaluate if win
const winEvaluation = () =>
  21 >= calculateScore(playerHand) &&
  (calculateScore(playerHand) > calculateScore(dealerHand) ||
    calculateScore(dealerHand) > 21);
//Evaluate game
const gameEvaluation = () =>
  drawEvaluation() ? "You tied!" : winEvaluation() ? "You won!" : "You lost!";

//Print hand
function print(hand) {
  let output = "";
  for (const card of hand) {
    output += `${card.Name} (${card.Rank}) of ${card.Suit}<br>`;
  }
  return output;
}

//Create decks
function initDeck(numberOfDecks) {
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
  const suitConstruct = ["Diamonds", "Clubs", "Hearts", "Spades"];
  for (let i = 0; i < numberOfDecks; i++) {
    for (const name of nameConstruct) {
      for (const suit of suitConstruct) {
        const card = {
          Name: name,
          Suit: suit,
          Rank: nameConstruct.indexOf(name) + 1,
        };
        deck.push(card);
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

//Reset game
function resetGame() {
  deck.push(...playerHand);
  playerHand.length = 0;
  deck.push(...dealerHand);
  dealerHand.length = 0;
  shuffleDeck();
  initGame();
}
