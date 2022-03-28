/* -------------------------------- */
/* ------- GLOBAL VARIABLES ------- */
/* -------------------------------- */

// game states.
const STATE_DEAL = "deal";
const STATE_PLAY = "play";
const STATE_RESULT = "result";
const STATE_RESTART = "restart";

// game keywords
const STAND = "STAND";
const HIT = "HIT";

// variables to get page elements.
const instructBox = document.querySelector("#instructions");
const inputBox = document.querySelector("#input-field");
const outputBox = document.querySelector("#output-div");
const containerBox = document.querySelector("#container");

// colour variables.
const RED = "#ffd7d9";
const GREEN = "#a7f0ba";
const BLUE = "#dce6f0";

// variables to store game state.
let gameState = STATE_DEAL;

// variable to store player name.
let playerName = "";

// variable to store game deck.
let gameDeck = [];

// empty arrays to store cards that computer and player draw.
let computerHand = [];
let playerHand = [];

/* -------------------------------- */
/* ------- HELPER FUNCTIONS ------- */
/* -------------------------------- */

// function to create deck of cards.
var createBaseDeck = function () {
  const suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
  const names = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];

  const cardDeck = []; // array to store finished cards.

  for (let suitCounter = 0; suitCounter < suits.length; suitCounter += 1) {
    // suit counter: max 3 (total 4): hearts, spades, diamonds, clubs.
    let currentSuit = suits[suitCounter];
    // loops through individual card names and pushes card object.
    for (let rankCounter = 0; rankCounter < names.length; rankCounter += 1) {
      // rank counter: max 12 (total 13): ace, 2, 3, ..., 10, jack, queen, king.
      let currentName = names[rankCounter];
      let currentRank = rankCounter + 1;
      cardDeck.push({
        rank: currentRank,
        name: currentName,
        suit: currentSuit,
      });
    }
  }
  return cardDeck;
};

// function to get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// function to shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  let currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    let randomIndex = getRandomIndex(cardDeck.length);
    let randomCard = cardDeck[randomIndex];
    let currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// function to create and shuffle deck.
var createGameDeck = function () {
  return shuffleCards(createBaseDeck());
};

// takes the top card from the deck.
var drawCard = function (deck) {
  return deck.pop(0);
};

// function to draw two cards from the deck to the hand.
// and arrange it in descending order.
var dealHand = function (deck, hand) {
  hand.push(drawCard(deck));
  hand.push(drawCard(deck));
  return hand;
};

// function to sum up cards in hand.
var sumHand = function (hand) {
  let sum = 0;
  // this function relies on the fact that the hand is sorted in
  // descending order for it to properly score the value of the ace.
  hand.sort((a, b) => b.rank - a.rank);
  for (let i = 0; i < hand.length; i += 1) {
    if (hand[i]["rank"] >= 10) {
      // each card above 10 is only worth 10 points.
      sum += 10;
    } else if (hand[i]["name"] === "Ace") {
      if (sum < 11) {
        // score +11 if the current hand is less than 11 points.
        sum += 11;
      } else {
        // once the sum is more than 11 points, the ace should only be worth 1 point,
        // so that the player does not go bust.
        sum += 1;
      }
    } else {
      sum += hand[i]["rank"];
    }
  }
  return sum;
};

// function to check for 21.
var checkBlackjack = function (hand) {
  let cardOne = hand[0];
  let cardTwo = hand[1];
  return (cardOne.name === "Ace" && cardTwo.rank >= 10) ||
    (cardOne.rank >= 10 && cardTwo.name === "Ace")
    ? true
    : false;
};

// function to display contents of both player and computer hands.
var displayHand = function (handOne, handTwo) {
  // display player's hand.
  let output = `<em>${playerName}:</em> <br/>`;
  for (let i = 0; i < handOne.length; i += 1) {
    output += `${handOne[i]["name"]} of ${emojiSuit(handOne[i]["suit"])} <br/>`;
  }
  // display computer's hand.
  output += `<br/> <em>Computer:</em> <br/>`;
  for (let i = 0; i < handTwo.length; i += 1) {
    output += `${handTwo[i]["name"]} of ${emojiSuit(handTwo[i]["suit"])} <br/>`;
  }
  return output;
};

var displayScore = function (scoreOne, scoreTwo) {
  let output = `<br/> Player score: ${scoreOne} 
  <br/> Computer score: ${scoreTwo} <br/>`;
  // if player or computer hand exceeds 21.
  if (scoreOne > 21 || scoreTwo > 21) {
    if (scoreOne > 21 && scoreTwo > 21) {
      output += `<br/> Both player and dealer lose.`;
      containerBox.style.backgroundColor = RED;
    } else if (scoreOne > 21) {
      output += `<br/> Your hand has exceeded 21. You lose.`;
      containerBox.style.backgroundColor = RED;
    } else {
      output += `<br/> The dealer's hand has exceeded 21. You win!`;
      containerBox.style.backgroundColor = GREEN;
    }
  }
  // else compare scores normally.
  else {
    if (scoreTwo === scoreOne) {
      output += `<br/><br/> It's a tie.`;
      containerBox.style.backgroundColor = GREEN;
    } else if (scoreOne > scoreTwo) {
      output += `<br/><br/> ${playerName}, you have a higher score. You win!`;
      containerBox.style.backgroundColor = GREEN;
    } else {
      output += `<br/><br/> The computer has a higher score. The computer wins.`;
      containerBox.style.backgroundColor = RED;
    }
  }
  return output;
};

var resetGame = function () {
  gameDeck = [];
  computerHand = [];
  playerHand = [];
};

// function to substitute suit name with emoji.
var emojiSuit = function (suitName) {
  return suitName === "Hearts"
    ? "♥️"
    : suitName === "Spades"
    ? "♠️"
    : suitName === "Diamonds"
    ? "♦️"
    : "♣️";
};

/* -------------------------------- */
/* -------- GAME FUNCTIONS -------- */
/* -------------------------------- */

// give initial game instructions.
instructBox.innerHTML =
  "Hello, player! <br/><br/> Please type in your name and press submit to begin dealing cards!";
inputBox.placeholder = "Name";

// function to run under STATE_DEAL.
var gameDeal = function (input) {
  // first input should be player name, if player name is empty.
  // else assign generic player name.
  if (!playerName) {
    if (!input) {
      playerName = "Player";
    } else {
      playerName = input;
    }
  }

  gameDeck = createGameDeck();

  // deal cards to player and computer.
  dealHand(gameDeck, playerHand);
  dealHand(gameDeck, computerHand);

  // switch to next game state.
  gameState = STATE_PLAY;

  // display instructions.
  instructBox.innerHTML = `${playerName}, do you wish to draw another card? <br/><br/>
    Enter "HIT" to draw a card, or "STAND" to end your turn. `;
  inputBox.placeholder = `HIT or STAND`;
  submitButton.innerHTML = `Submit`;
  containerBox.style.backgroundColor = BLUE;

  // display output.
  return displayHand(playerHand, computerHand);
};

// function to run under STATE_PLAY.
var gamePlay = function (input) {
  let output;
  if (
    input === "" ||
    (input.toUpperCase() != HIT && input.toUpperCase() != STAND)
  ) {
    output = `Please enter "HIT" or "STAND" to continue. <br/><br/> `;
    output += displayHand(playerHand, computerHand);
    return output;
  }

  if (input.toUpperCase() === HIT) {
    newCard = drawCard(gameDeck);
    playerHand.push(newCard);
    output = `You drew the ${newCard.name} of ${emojiSuit(
      newCard.suit
    )}. <br/><br/> `;
    output += displayHand(playerHand, computerHand);
    output += `<br/> Do you wish to draw another card? `;
    return output;
  }

  if (input.toUpperCase() === STAND) {
    gameState = STATE_RESULT;
    instructBox.innerHTML = `${playerName}, you ended your turn. Click submit again to see the scores. `;
    inputBox.placeholder = ``;

    return displayHand(playerHand, computerHand);
  }
};

// function to run under STATE_RESULT.
var gameResult = function () {
  // check if any player got a blackjack.
  let playerBlackjack = checkBlackjack(playerHand);
  let computerBlackjack = checkBlackjack(computerHand);

  // calculate player and computer score.
  let playerScore = sumHand(playerHand);
  let computerScore = sumHand(computerHand);
  // if computer score is below 17, the computer has to continue to draw.
  while (computerScore < 17) {
    console.log("computer is drawing card.");
    computerHand.push(drawCard(gameDeck));
    computerScore = sumHand(computerHand);
  }

  // display output.
  let output = displayHand(playerHand, computerHand);

  // if there's a blackjack,
  if (playerBlackjack || computerBlackjack) {
    if (playerBlackjack && computerBlackjack) {
      // both blackjack, tie.
      output += `<br/> Both players have blackjacks, it's a tie. `;
      containerBox.style.backgroundColor = GREEN;
    } else if (playerBlackjack) {
      // player wins.
      output += `<br/> ${playerName} wins with a blackjack!`;
      containerBox.style.backgroundColor = GREEN;
    } else {
      // computer wins.
      output += `<br/> The computer wins!`;
      containerBox.style.backgroundColor = RED;
    }
  }
  // compare scores.
  else {
    output += displayScore(playerScore, computerScore);
  }

  // reset the game.
  gameState = STATE_DEAL;
  instructBox.innerHTML = `Click restart to play again! `;
  submitButton.innerHTML = `Restart`;
  resetGame();

  return output;
};

/* -------------------------------- */
/* --------- MAIN FUNCTION -------- */
/* -------------------------------- */

var main = function (input) {
  // starting game state, user presses submit once to deal cards.
  if (gameState === STATE_DEAL) return gameDeal(input);
  if (gameState === STATE_PLAY) return gamePlay(input);
  if (gameState === STATE_RESULT) return gameResult();
};
