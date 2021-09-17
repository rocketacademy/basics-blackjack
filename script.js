// Helper functions
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Deal two cards from the given deck, returns array
var dealCards = function (deck) {
  var dealtHand = [];
  dealtHand.push(deck.pop());
  dealtHand.push(deck.pop());
  return dealtHand;
};

// Calculates the value of the hand, returns integer
var handCalculate = function (hand) {
  var handValue = 0;
  for (let i = 0; i < hand.length; i += 1) {
    handValue += hand[i].value;
  }

  // If the handvalue is above 21, iterate over the hand to check for aces and subtract 10 for each until the hand is less than 21
  if (handValue > 21) {
    for (let i = 0; i < hand.length; i += 1) {
      if (hand[i].value == 11) {
        handValue -= 10;
        if (handValue <= 21) {
          break;
        }
      }
    }
  }
  return handValue;
};

// Prints out a string of the cards in the hand, returns string
var printHand = function (hand) {
  var outputString = "";
  for (let i = 0; i < hand.length; i += 1) {
    outputString += `${hand[i].name} of ${hand[i].suit}<br>`;
  }
  return outputString;
};

// Global variables
var mainDeck = shuffleCards(makeDeck());
var gameState = "init"; // States: initialise, player, computer
var playerHand = [];
var comHand = [];
var playerValue = 0;
var comValue = 0;

// Main function
var main = function (input) {
  if (gameState == "init") {
    playerHand = dealCards(mainDeck);
    comHand = dealCards(mainDeck);

    playerValue = handCalculate(playerHand);
    comValue = handCalculate(comHand);

    var outputString = "";

    outputString += `Your card value is ${playerValue}.<br>${printHand(
      playerHand
    )}<br>`;
    outputString += `Computer card value is ${comValue}.<br>${printHand(
      comHand
    )}`;

    return outputString;
  }
};

// Deck is shuffled. DONE
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.
