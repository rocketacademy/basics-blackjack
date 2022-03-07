/* 
1. 

*/

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
let instructBox = document.querySelector("#instructions");
let inputBox = document.querySelector("#input-field");

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
  let suits = ["Hearts", "Spades", "Diamonds", "Clubs"];
  let names = [
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

  let suitCounter = 0; // max 3 (total 4): hearts, spades, diamonds, clubs.
  let cardDeck = []; // array to store finished cards.

  while (suitCounter < suits.length) {
    let currentSuit = suits[suitCounter];
    let rankCounter = 0; // max 12 (total 13): ace, 2, 3, ..., 10, jack, queen, king.
    // loops through individual card names and pushes card object.
    while (rankCounter < names.length) {
      let currentName = names[rankCounter];
      let currentRank = rankCounter + 1;
      cardDeck.push({
        rank: currentRank,
        name: currentName,
        suit: currentSuit,
      });
      rankCounter++;
    }
    suitCounter++;
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
var dealHand = function (deck, hand) {
  hand.push(drawCard(deck));
  hand.push(drawCard(deck));
  return hand;
};

// function to display contents of hand.
var displayHand = function (name, hand) {
  let output = `<b>${name}:</b>`;
  for (let i = 0; i < hand.length; i++) {
    output += `<br/> ${hand[i]["name"]} of ${emojiSuit(hand[i]["suit"])}`;
  }
  return output;
};

// function to sum up cards in hand.
var sumHand = function (hand) {
  let sum = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i]["rank"] >= 10) {
      sum += 10;
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
  return (cardOne.name == "Ace" && cardTwo.rank >= 10) ||
    (cardOne.rank >= 10 && cardTwo.name == "Ace")
    ? true
    : false;
};

// function to check for bust.
var checkBust = function (handTotal) {
  return handTotal > 21 ? true : false;
};

// function to check if computer needs to draw another card.
var forceDraw = function (handTotal) {
  return handTotal < 17 ? true : false;
};

var resetGame = function () {
  instructBox = document.querySelector("#instructions");
  inputBox = document.querySelector("#input-field");

  gameDeck = [];
  computerHand = [];
  playerHand = [];

  console.log("Game reset");
};

// function to substitute suit name with emoji.
var emojiSuit = function (suitName) {
  return suitName == "Hearts"
    ? "♥️"
    : suitName == "Spades"
    ? "♠️"
    : suitName == "Diamonds"
    ? "♦️"
    : "♣️";
};

/* -------------------------------- */
/* -------- GAME FUNCTIONS -------- */
/* -------------------------------- */

// give initial game instructions.
instructBox.innerHTML =
  "Hello, player! Please type in your name and press submit to begin dealing cards!";
inputBox.placeholder = "NAME";

// function to run under STATE_DEAL.
// function to run under STATE_PLAY.
// function to run under STATE_RESULT.

/* -------------------------------- */
/* --------- MAIN FUNCTION -------- */
/* -------------------------------- */

var main = function (input) {
  // starting game state, user presses submit once to deal cards.
  if (gameState == STATE_DEAL) {
    // first input should be player name, if player name is empty.
    if (!playerName) {
      playerName = input;
    }

    gameDeck = createGameDeck();
    console.log(gameDeck);

    // deal cards to player and computer.
    // dealHand(gameDeck, playerHand);
    // dealHand(gameDeck, computerHand);
    playerHand = [
      { rank: 1, name: "Ace", suit: "Spades" },
      { rank: 10, name: "Queen", suit: "Clubs" },
    ];
    computerHand = [
      { rank: 1, name: "Ace", suit: "Spades" },
      { rank: 3, name: "Queen", suit: "Clubs" },
    ];

    // switch to next game state.
    gameState = STATE_RESULT;

    // display instructions.
    instructBox.innerHTML = `${playerName}, do you wish to draw another card? <br/><br/>
    Enter "HIT" to draw a card, or "STAND" to end your turn. `;
    inputBox.placeholder = `HIT or STAND`;

    // display output.
    let output = displayHand(playerName, playerHand);

    return output;
  }

  // <b>:</b><br/> 3 of ♣️<br/> 9 of ♦️
  // <b>:</b><br/> Ace of ♦️<br/> 10 of ♣️
  // <b>:</b><br/> Ace of ♦️<br/> 10 of ♠️

  // if (gameState == STATE_PLAY) {
  //   if (input == "" || (input != HIT && input != STAND)) {
  //     return `Please enter "HIT" or "STAND" to continue. `;
  //   }

  //   if (input == HIT) {
  //     playerHand.push(drawCard(gameDeck));

  //     output = `<b>${playerName}:</b> `;
  //     output += displayHand(playerName, playerHand);

  //     output += `<br/><br/> Do you wish to draw another card? `;

  //     return output;
  //   }

  //   if (input == STAND) {
  //     gameState = STATE_RESULT;

  //     instructBox.innerHTML = `${playerName}, do you wish to draw another card? <br/><br/>
  //     Enter "HIT" to draw a card, or "STAND" to end your turn. `;
  //     inputBox.placeholder = `HIT or STAND`;

  //     output = `You ended your turn. <br/><br/>
  //     output += displayHand(playerName, playerHand);
  //     output += `<br/><br/>`;
  //     output += displayHand("Computer", computerHand);
  //     return output;
  //   }
  // }

  if (gameState == STATE_RESULT) {
    let playerBlackjack = checkBlackjack(playerHand);
    let computerBlackjack = checkBlackjack(computerHand);

    let computerScore = sumHand(computerHand);
    let playerScore = sumHand(playerHand);

    // display output.
    let output = displayHand(playerName, playerHand);
    output += `<br/> Player score: ${playerScore} <br/><br/>`;
    output += displayHand("Computer", computerHand);
    output += `<br/> Computer score: ${computerScore}`;

    // if there's a blackjack.
    if (playerBlackjack || computerBlackjack) {
      if (playerBlackjack && computerBlackjack) {
        // both blackjack.
        output += `<br/><br/> Both players have blackjacks, it's a tie. `;
      } else if (playerBlackjack) {
        // only player blackjack.
        output += `<br/><br/> ${playerName} wins with a blackjack!`;
      } else {
        // only computer blackjack.
        output += `<br/><br/> The computer wins!`;
      }
    } else {
      if (computerScore == playerScore) {
        output += `<br/><br/> It's a tie.`;
      } else if (playerScore > computerScore) {
        output += `<br/><br/> ${playerName}, you have a higher score. You win!`;
      } else {
        output += `<br/><br/> The computer has a higher score. The computer wins.`;
      }
    }

    gameState = STATE_DEAL;
    resetGame();

    return output;
  }
};
