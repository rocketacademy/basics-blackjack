//Global Variables
const startingGame = 0,
  playingRound = 1,
  playingSplitRound = 2,
  endingRound = 3;
let playersHands = [],
  gameState = startingGame,
  gameMessage = "",
  numberOfDecks = 0,
  handCounter = 0;
const deck = [],
  dealerHand = [];

//Main function
function main(input, myOutputValue) {
  if (gameState === playingRound) {
    playNormalRound(input);
  } else if (gameState === endingRound) {
    resetRound();
    initRound();
  } else if (gameState === playingSplitRound) {
    playSplitRound(input);
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

//Print any hand
function print(hand) {
  let output = "";
  for (const card of hand) {
    output += `${card.Name} of ${card.Suit}<br>`;
  }
  return output;
}
//Prints first card of dealer face up
dealerFaceUp = () => `${dealerHand[0].Name} of ${dealerHand[0].Suit}<br>`;
//Helper function for hard values
function hardScore(hand) {
  let totalPoints = 0;
  for (const card of hand) {
    let point = card.Rank >= 10 ? 10 : card.Rank;
    totalPoints += point;
  }
  return totalPoints;
}
//Calculate points of current hand
const calculateScore = (hand) =>
  hand.some((card) => card.Rank === 1) && hardScore(hand) < 11
    ? hardScore(hand) + 10
    : hardScore(hand);
//Display hand and score
const displayHand = (hand) =>
  hand == dealerHand
    ? `Dealer's Hand:<br>${print(hand)}Score: ${calculateScore(hand)}`
    : `Hand:<br>${print(hand)}Score: ${calculateScore(hand)}`;

//Evaluation if draw
const drawEvaluation = (individualPlayerHand, dealerHand) =>
  calculateScore(individualPlayerHand) === calculateScore(dealerHand) ||
  (calculateScore(individualPlayerHand) > 21 &&
    calculateScore(dealerHand) > 21);
//Evaluate if win
const winEvaluation = (individualPlayerHand, dealerHand) =>
  21 >= calculateScore(individualPlayerHand) &&
  (calculateScore(individualPlayerHand) > calculateScore(dealerHand) ||
    calculateScore(dealerHand) > 21);
//Evaluate game
const gameEvaluation = (individualPlayerHand, dealerHand) =>
  drawEvaluation(individualPlayerHand, dealerHand)
    ? "You tied"
    : winEvaluation(individualPlayerHand, dealerHand)
    ? "You won"
    : "You lost";
//Evaluate Blackjack
const bjEvaluation = (individualPlayerHand, dealerHand) =>
  drawEvaluation(individualPlayerHand, dealerHand)
    ? "Push!"
    : winEvaluation(individualPlayerHand, dealerHand)
    ? "Player has Blackjack"
    : "Dealer has Blackjack";

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
      `Your ${displayHand(playersHands)}<br><br>${displayHand(dealerHand)}` +
      `<br><br>${gameEvaluation(playersHands, dealerHand)}` +
      `<br>${bjEvaluation(playersHands, dealerHand)}`;
    gameState = endingRound;
  } else if (playersHands[0].Rank === playersHands[1].Rank) {
    gameMessage = `Your ${displayHand(
      playersHands
    )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>You have a pair of ${
      playersHands[0].Name
    }s! Type "Y" to Split, "H" to Hit and "S" to Stand`;
    gameState = playingRound;
  } else {
    gameMessage = `Your ${displayHand(
      playersHands
    )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand`;
    gameState = playingRound;
  }
}

//Game flow for Hit and Stand and Split
function playNormalRound(input) {
  if (playersHands[0].Rank === playersHands[1].Rank && input === "Y") {
    playersHands = playersHands.map((card) => [card]);
    hit(playersHands[0]);
    hit(playersHands[1]);
    gameMessage = `First ${displayHand(
      playersHands[0]
    )}<br><br>Second ${displayHand(
      playersHands[1]
    )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand for first hand`;
    gameState = playingSplitRound;
  } else {
    switch (input) {
      case "H":
        hit(playersHands);
        if (calculateScore(playersHands) < 21) {
          gameMessage = `Your ${displayHand(
            playersHands
          )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand`;
          break;
        }
      case "S":
        dealerAI();
        gameMessage =
          `Your ${displayHand(playersHands)}<br><br>${displayHand(
            dealerHand
          )}` +
          `<br><br>${gameEvaluation(playersHands, dealerHand)}` +
          `<br><br>Press submit to play another round`;
        gameState = endingRound;
        break;
      default:
        gameMessage = `Invalid input!<br><br>Your ${displayHand(
          playersHands
        )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand`;
    }
  }
}

//Game flow when player has 2 hands
function playSplitRound(input) {
  switch (input) {
    case "H":
      hit(playersHands[handCounter]);
      if (calculateScore(playersHands[handCounter]) < 21) {
        gameMessage = `Curent ${displayHand(
          playersHands[handCounter]
        )}<br><br>First ${displayHand(
          playersHands[0]
        )}<br><br>Second ${displayHand(
          playersHands[1]
        )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand`;
        break;
      }
    case "S":
      handCounter++;
      if (handCounter === 2) {
        dealerAI();
        gameMessage =
          `First ${displayHand(playersHands[0])}` +
          `<br><br>${gameEvaluation(
            playersHands[0],
            dealerHand
          )} with first hand<br><br>` +
          `Second ${displayHand(playersHands[1])}` +
          `<br><br>${gameEvaluation(
            playersHands[1],
            dealerHand
          )} with second hand<br><br>${displayHand(dealerHand)}` +
          `<br><br>Press submit to play another round`;
        gameState = endingRound;
        break;
      } else {
        gameMessage = `Curent ${displayHand(
          playersHands[handCounter]
        )}<br><br>First ${displayHand(
          playersHands[0]
        )}<br><br>Second ${displayHand(
          playersHands[1]
        )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand`;
      }
      break;
    default:
      gameMessage = `Invalid input!<br><br>Curent ${displayHand(
        playersHands[handCounter]
      )}<br><br>First ${displayHand(
        playersHands[0]
      )}<br><br>Second ${displayHand(
        playersHands[1]
      )}<br><br>Dealer's Face up:<br>${dealerFaceUp()}<br>Type "H" to Hit and "S" to Stand`;
  }
}

//Draw a card
const hit = (hand) => hand.push(deck.pop());

//Dealer hits soft 17, H17 rules
function dealerAI() {
  while (calculateScore(dealerHand) < 17 || hardScore(dealerHand) + 10 <= 17) {
    hit(dealerHand);
  }
}

//Reset round
function resetRound() {
  deck.push(...playersHands.flat());
  playersHands.length = 0;
  deck.push(...dealerHand);
  dealerHand.length = 0;
  shuffleDeck();
}

//Fisher-Yates Shuffle, Durstenfeld variation
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
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
