//Global Variables
const deck = [],
  playersHands = [],
  dealerHand = [];
const startingGame = 0,
  playingRound = 1,
  endingRound = 2;
let gameState = startingGame,
  gameMessage = "",
  numberOfDecks = 0;

//Main function
function main(input, myOutputValue) {
  if (gameState === playingRound) {
    playRound(input);
  } else if (gameState === endingRound) {
    resetRound();
    initRound();
  } else if (gameState === startingGame) {
    if (numberOfDecks === 0) {
      numberOfDecks =
        Number.isInteger(Number(input)) &&
        Number(input) > 0 &&
        Number(input) <= 8
          ? Number(input)
          : 1;
      gameMessage = `You selected ${numberOfDecks} decks! Press submit to play!`;
    } else if (numberOfDecks > 0) {
      initDeck();
      shuffleDeck();
      initRound();
    }
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

dealerFaceUp = () => `${dealerHand[0].Name} of ${dealerHand[0].Suit}<br>`;

//Draw a card
const hit = (hand) => hand.push(deck.pop());

//Start round
function initRound() {
  for (let i = 0; i < 2; i++) {
    hit(playersHands);
    hit(dealerHand);
  }
  if (
    calculateScore(playersHands) === 21 ||
    calculateScore(dealerHand) === 21
  ) {
    gameMessage =
      `${displayHand(playersHands)}<br><br>${displayHand(dealerHand)}` +
      `<br><br>${gameEvaluation()}` +
      `<br>${bjEvaluation()}`;
    gameState = endingRound;
  } else {
    gameMessage = `${displayHand(
      playersHands
    )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand`;
    gameState = playingRound;
  }
}

//Game flow for Hit and Stand
function playRound(input) {
  switch (input) {
    case "H":
      hit(playersHands);
      if (calculateScore(playersHands) < 21) {
        gameMessage = `${displayHand(
          playersHands
        )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand`;
        gameState = playingRound;
        break;
      }
    case "S":
      dealerAI();
      gameMessage =
        `${displayHand(playersHands)}<br><br>${displayHand(dealerHand)}` +
        `<br><br>${gameEvaluation()}` +
        `<br><br>Press submit to play another round`;
      gameState = endingRound;
      break;
    default:
      gameMessage = `Invalid input!<br><br>${displayHand(
        playersHands
      )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand`;
  }
}

//Evaluation if draw
const drawEvaluation = () =>
  calculateScore(playersHands) === calculateScore(dealerHand) ||
  (calculateScore(playersHands) > 21 && calculateScore(dealerHand) > 21);
//Evaluate if win
const winEvaluation = () =>
  21 >= calculateScore(playersHands) &&
  (calculateScore(playersHands) > calculateScore(dealerHand) ||
    calculateScore(dealerHand) > 21);
//Evaluate game
const gameEvaluation = () =>
  drawEvaluation() ? "You tied!" : winEvaluation() ? "You won!" : "You lost!";
//Evaluate Blackjack
const bjEvaluation = () =>
  drawEvaluation()
    ? "Push!"
    : winEvaluation()
    ? "Player has Blackjack"
    : "Dealer has Blackjack";

//Fisher-Yates Shuffle, Durstenfeld variation
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

//Reset round
function resetRound() {
  deck.push(playersHands);
  playersHands.length = 0;
  deck.push(...dealerHand);
  dealerHand.length = 0;
  shuffleDeck();
}

//Calculate points of current hand
const calculateScore = (hand) =>
  !hand.some((card) => card.Rank === 1)
    ? hardScore(hand)
    : hardScore(hand) > 11
    ? hardScore(hand)
    : hardScore(hand) + 10;

//Helper function for hard values
function hardScore(hand) {
  let totalPoints = 0;
  for (const card of hand) {
    let point = card.Rank >= 10 ? 10 : card.Rank;
    totalPoints += point;
  }
  return totalPoints;
}

//Display hand and score
const displayHand = (hand) =>
  hand == dealerHand
    ? `Dealer's Hand:<br>${print(hand)}Score: ${calculateScore(hand)}`
    : `Player's Hand:<br>${print(hand)}Score: ${calculateScore(hand)}`;

//Dealer hits soft 17, H17 rules
function dealerAI() {
  while (calculateScore(dealerHand) < 17 || hardScore(dealerHand) + 10 <= 17) {
    hit(dealerHand);
  }
}

//Create decks
function initDeck() {
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
