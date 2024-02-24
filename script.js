/* ================================================== */
/* ================ CREATE VARIABLES ================ */
/* ================================================== */

// Declare Game modes
var GAME_START = "game start";
var GAME_SEE_CARDS = "see cards in hand";
var GAME_RESULTS_SHOWN = "results are shown";
var GAME_CHECK_RESULTS = "tally both hands and check for winner";

// Declare variable to store player and dealer hands
// We use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];
var playerHandValue;
var dealerHandValue;

var getHandValue;

// Declare an empty variable to hold deck of cards
var gameDeck = [];

/* ================================================== */
/* ================ CREATE FUNCTIONS ================ */
/* ================================================== */

var concatenate2Num = function (num1, num2) {
  return Number(String(num1) + String(num2));
};

// Function that creates a deck of cards, used by createNewDeck function
var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' & 'queen' & 'king' = 10
      if (cardName == 1) {
        cardName = "ace";
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = "jack";
      }
      if (cardName == 12) {
        cardName = "queen";
      }
      if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

// Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that shuffles a deck, used by createNewDeck function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

/* ============================================ */
/* ================ GAME LOGIC ================ */
/* ============================================ */

//note: input is for hit or stand

var TWENTY_ONE = 21;
var dealerhitThreshold = 16;

//analyse the game for winning conditions
// Get sum of cards in hand
var getHandValue = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    // If card is Ace, value is 11 by default
    if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    } else {
      sum += currCard.rank;
    }

    counter = counter + 1;
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11 to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > TWENTY_ONE && numAcesInHand > 0) {
    var aceCounter = 0;
    while (aceCounter < numAcesInHand) {
      sum -= 10;
      // If the sum is less than TWENTY_ONE before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= TWENTY_ONE) {
        break; // break keyword causes the loop to finish
      }
      aceCounter = aceCounter + 1;
    }
  }
  return sum;
};

// Return whether the hand contains a Blackjack combination
var isBlackjack = function (hand) {
  return getHandValue(hand) === TWENTY_ONE;
};

/* ============================================ */
/* ================ USER INPUT ================ */
/* ============================================ */

var mode = GAME_START;
var player = "player";

var gameDeck = createDeck();
var shuffledDeck = shuffleDeck(gameDeck);

//user input to hit or stand
//dealer must hit if hand is below 17
function main(input) {
  //click submit to deal 2 cards to each player
  if (mode == GAME_START && input == "") {
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    console.log(playerHand);

    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    console.log(dealerHand);

    mode = GAME_SEE_CARDS;
    return "Cards have been dealt. Click submit to see player's cards";
  }

  if (mode == GAME_SEE_CARDS && player == "player" && input == "") {
    mode = GAME_RESULTS_SHOWN;
    return `Player cards: ${playerHand[0].name} and ${playerHand[1].name}. Click hit to draw, stand to skip.`;
  } else if (mode == GAME_SEE_CARDS && player == "dealer" && input == "") {
    mode = GAME_CHECK_RESULTS;
    return `Dealer cards: ${dealerHand[0].name} and ${dealerHand[1].name}. Click hit to draw, stand to tally results.`;
  }

  if (mode == GAME_RESULTS_SHOWN && player == "player" && input == "hit") {
    playerHand.push(gameDeck.pop());
    console.log(playerHand);
    if (isBlackjack(playerHand)) {
      playerHandValue = getHandValue(playerHand);
      console.log(getHandValue(playerHand));
      return `Blackjack. Player cards: ${playerHandValue}. Player wins! Refresh to restart the game`;
    } else if (getHandValue(playerHand) < 21) {
      playerHandValue = getHandValue(playerHand);
      console.log(getHandValue(playerHand));
      return `Player cards: ${playerHandValue}. Player pass. Submit hit to draw again, else submit stand for dealer's turn`;
    } else if (getHandValue(playerHand) > 21) {
      playerHandValue = getHandValue(playerHand);
      console.log(getHandValue(playerHand));
      return `Player cards: ${playerHandValue}. Player busted. Refresh to restart the game`;
    }
  } else if (
    mode == GAME_RESULTS_SHOWN &&
    player == "dealer" &&
    input == "hit"
  ) {
    dealerHand.push(gameDeck.pop());
    console.log(dealerHand);
    if (isBlackjack(dealerHand)) {
      dealerHandValue = getHandValue(dealerHand);
      console.log(getHandValue(dealerHand));
      return `Dealer has Blackjack. Dealer cards: ${dealerHandValue}. Dealer wins! Refresh to restart the game`;
    } else if (getHandValue(dealerHand) < 17) {
      dealerHandValue = getHandValue(dealerHand);
      console.log(getHandValue(dealerHand));
      return `Dealer cards: ${dealerHandValue}. Dealer pass. Submit hit to draw again, else submit stand for player's turn`;
    } else if (getHandValue(dealerHand) > 21) {
      dealerHandValue = getHandValue(dealerHand);
      console.log(getHandValue(dealerHand));
      return `Dealer cards: ${dealerHandValue}. Dealer busted. Refresh to restart the game`;
    }
  } else if (
    mode == GAME_RESULTS_SHOWN &&
    player == "player" &&
    input == "stand"
  ) {
    mode = GAME_SEE_CARDS;
    player = "dealer";
    return "Dealer's turn now. Click submit to see dealer's card";
  } else if (mode == GAME_RESULTS_SHOWN && input == "stand") {
    return "Player's turn now. Click submit to see player's card";
  } else if ((mode = GAME_RESULTS_SHOWN && input == "")) {
    return "Please submit hit or stand";
  }

  mode = GAME_CHECK_RESULTS;
  console.log(mode);
  console.log(playerHand);
  console.log(dealerHand);
  playerHandValue = getHandValue(playerHand);
  dealerHandValue = getHandValue(dealerHand);

  if (dealerHandValue > playerHandValue && dealerHandValue <= 21) {
    return `Deaker wins! Player's hand: ${playerHandValue}, Dealer's hand: ${dealerHandValue}`;
  } else if (playerHandValue > dealerHandValue && playerHandValue <= 21) {
    return `Player wins! Player's hand: ${playerHandValue}, Dealer's hand: ${dealerHandValue}`;
  } else {
    return `It's a tie! Player's hand: ${playerHandValue}, Dealer's hand: ${dealerHandValue}`;
  }
}
