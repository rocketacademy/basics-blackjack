/* -------------------------------- */
/* ------- GLOBAL VARIABLES ------- */
/* -------------------------------- */

// game states.
const STATE_DEAL = "deal";
const STATE_PLAY = "play";
const STATE_BUST = "bust";
const STATE_RESULT = "result";

// game keywords
const PASS = "PASS";
const DRAW = "DRAW";

// variables to store game state.
let gameState = STATE_DEAL;

// variable to store player name.
let playerName = "";

// empty arrays to store cards that computer and player draw.
let computerHand = [];
let playerHand = [];

/* -------------------------------- */
/* ------- HELPER FUNCTIONS ------- */
/* -------------------------------- */

// function to create deck of cards.
var makeDeck = function () {
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
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// takes the top card from the deck.
var drawCard = function (deck) {
  return deck.pop(0);
};

// function to draw two cards from the deck to the hand.
var drawHand = function (deck, hand) {
  hand.push(drawCard(deck));
  hand.push(drawCard(deck));
  return hand;
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

// function to sum up cards in hand.
var sumCards = function (hand, aceValue) {
  let sum = 0;

  for (let i = 0; i < hand.length; i++) {
    if (hand[i]["rank"] > 1 && hand[i]["rank"] < 11) {
      sum += hand[i]["rank"];
    } else if (hand[i]["rank"] > 10) {
      sum += 10;
    } else if (hand[i]["rank"] == 1) {
      sum += aceValue;
    }
  }
};

// function to check for 21.
var checkTwentyOne = function (handTotal) {
  // return true if 21, else false.
  return handTotal == 21 ? true : false;
};

// function to check for bust.
var checkBust = function (handTotal) {
  // return true if > 21, else false.
  return handTotal > 21 ? true : false;
};

// function to check if draw needs to be forced.
var forceDraw = function (handTotal) {
  return handTotal < 17 ? true : false;
};

/* -------------------------------- */
/* -------- GAME FUNCTIONS -------- */
/* -------------------------------- */

// create and shuffle the deck of cards.
let deck = makeDeck();
let shuffledDeck = shuffleCards(deck);

/* -------------------------------- */
/* --------- MAIN FUNCTION -------- */
/* -------------------------------- */

var main = function (input) {
  // starting game state, user presses submit once to deal cards.
  let output;

  if (gameState == STATE_DEAL) {
    // first input should be player name, if player name is empty.
    if (!playerName) {
      playerName = input;
    }

    drawHand(deck, playerHand);
    drawHand(deck, computerHand);

    gameState = STATE_PLAY;

    // display output.
    output = `<b>${playerName}:</b> <br />
    ${playerHand[0]["name"]} of ${emojiSuit(playerHand[0]["suit"])} <br />
    ${playerHand[1]["name"]} of ${emojiSuit(playerHand[1]["suit"])} <br /><br />
    ${playerName}, do you wish to draw another card? <br /><br />
    Please enter "DRAW" or "PASS". `;
    return output;
  }

  if (gameState == STATE_PLAY) {
    if (input == "" || (input != DRAW && input != PASS)) {
      return `Please enter "DRAW" or "PASS" to continue. `;
    }

    if (input == DRAW) {
      playerHand.push(drawCard(deck));
      // should check for bust here after drawing a new card.
      // if bust, display the cards, then inform the player that he has gone bust and loses.

      output = `<b>${playerName}:</b> `;
      for (let i = 0; i < playerHand.length; i++) {
        output += `<br /> ${playerHand[i]["name"]} of ${emojiSuit(
          playerHand[i]["suit"]
        )}`;
      }

      // if (bust) {
      //   output += `<br /><br /> Your hand has exceeded 21. You lose. `;
      //   return output;
      // }

      output += `<br /><br /> ${playerName}, do you wish to draw another card? <br /><br />
      Please enter "DRAW" to draw a card, or "PASS" to end your turn. `;

      return output;
    }

    if (input == PASS) {
      gameState = STATE_RESULT;

      output = `<b>${playerName}</b> has passed his turn. <br /><br />
      Show results here. `;
      return output;
    }
  }
};
