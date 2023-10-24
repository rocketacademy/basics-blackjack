//Global Variables
const deck = [],
  playerHand = [],
  dealerHand = [];
let gameState = 0,
  gameMessage = "";

//Main function
function main(input, myOutputValue) {
  if (gameState === 1) {
    playRound(input);
  } else if (gameState === 2) {
    resetRound();
    initRound();
    gameState = 1;
  } else if (gameState === 0) {
    if (Number.isInteger(Number(input)) && Number(input) > 0) {
      numberOfDecks = Number(input);
      initGame(numberOfDecks);
      gameState = 1;
    } else gameMessage = "Please type in number of decks (integer).";
  } else gameMessage = "Error in main function";
  myOutputValue = gameMessage;
  return myOutputValue;
}

//Print array
function print(hand) {
  let output = "";
  for (const card of hand) {
    output += `${card.Name} of ${card.Suit}<br>`;
  }
  return output;
}

//Draw a card
const hit = (hand) => hand.push(deck.pop());

//Start round
function initRound() {
  for (let i = 0; i < 2; i++) {
    hit(playerHand);
    hit(dealerHand);
  }
  if (calculateScore(playerHand) === 21 && calculateScore(dealerHand === 21)) {
    gameMessage =
      `${displayHand(playerHand)}<br><br>${displayHand(dealerHand)}` +
      `<br><br>${gameEvaluation()}` +
      `<br>Push!`;
    resetRound();
  } else if (calculateScore(dealerHand) === 21) {
    gameMessage =
      `${displayHand(playerHand)}<br><br>${displayHand(dealerHand)}` +
      `<br><br>${gameEvaluation()}` +
      `<br>Dealer has Blackjack`;
    resetRound();
  } else if (calculateScore(playerHand) === 21) {
    gameMessage =
      `${displayHand(playerHand)}<br><br>${displayHand(dealerHand)}` +
      `<br><br>${gameEvaluation()}` +
      `<br>You have Blackjack`;
    resetRound();
  } else
    gameMessage = `${displayHand(
      playerHand
    )}<br><br>Type "H" to Hit and "S" to Stand`;
}

//Game flow for Hit and Stand
function playRound(input) {
  switch (input) {
    case "H":
      hit(playerHand);
      gameMessage = `${displayHand(
        playerHand
      )}<br><br>Type "H" to Hit and "S" to Stand`;
      gameState = 1;
      break;
    case "S":
      dealerAI();
      gameMessage =
        `${displayHand(playerHand)}<br><br>${displayHand(dealerHand)}` +
        `<br><br>${gameEvaluation()}` +
        `<br><br>Press submit to play another round`;
      gameState = 2;
      break;
    default:
      gameMessage = `Invalid input!<br><br>${displayHand(
        playerHand
      )}<br><br>Type "H" to Hit and "S" to Stand`;
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

//Reset round
function resetRound() {
  deck.push(...playerHand);
  playerHand.length = 0;
  deck.push(...dealerHand);
  dealerHand.length = 0;
  shuffleDeck();
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

//Display hand and score
const displayHand = (hand) =>
  hand == dealerHand
    ? `Dealer's Hand:<br>${print(hand)}Score: ${calculateScore(hand)}`
    : `Player's Hand:<br>${print(hand)}Score: ${calculateScore(hand)}`;

//Dealer logic
function dealerAI() {
  while (calculateScore(dealerHand) < 17) {
    hit(dealerHand);
    if (dealerHand.some(ace) && calculateScore(dealerHand) <= 17) {
      hit(dealerHand);
    }
  }
}

//Sets the game up with the indicated number of decks
function initGame(numberOfDecks) {
  initDeck(numberOfDecks);
  shuffleDeck();
  initRound();
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
