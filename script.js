// First Version: Compare Initial Hands to Determine Winner
// Aim for a playable game. The essence of blackjack requires:
// 1. Two players - a player and a dealer (computer).
// 2. A deck of cards.
// 3. A starting hand of 2 cards for each player.
// 4. Comparing both hands and determining a winner. The possible scenarios are:
// 4.1 A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
// 4.2 Blackjack win. When either player or dealer draw Blackjack.
// 4.3 normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.

// Small step at a time

// Global variables
var playerCards = [];
var playerCardsRank = [];
var playerCardsSum = 0;
var computerCards = [];
var computerCardsRank = [];
var computerCardsSum = 0;

// A deck of cards
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

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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

// Random number generator
var randomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle card function
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomCardIndex = randomIndex(cardDeck.length);
    // Assign random card and current card to exchange value
    var randomCard = cardDeck[randomCardIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[randomCardIndex] = currentCard;
    cardDeck[currentIndex] = randomCard;
    currentIndex += 1;
  }
  return cardDeck;
};

// create a shuffle deck
var shuffledDeck = shuffleCards(makeDeck());

// Generate 2 random cards for player and computer
var randomTwoCards = function () {
  var randomNumber;
  var randomCard;
  var pushValue;
  var sumValue;

  // Generate 2 numbers then push to empty array
  // Generate 2 cards for player
  for (let i = 0; i < 2; i += 1) {
    randomNumber = randomIndex(shuffledDeck.length);
    randomCard = shuffledDeck[randomNumber];
    playerCards.push(randomCard);
  }

  // Generate 2 cards for computer
  for (let i = 0; i < 2; i += 1) {
    randomNumber = randomIndex(shuffledDeck.length);
    randomCard = shuffledDeck[randomNumber];
    computerCards.push(randomCard);
  }

  // Extract rank from array to push into another array
  for (let i = 0; i < 2; i += 1) {
    pushValue = playerCards[i].rank;
    playerCardsRank.push(pushValue);
  }

  for (let i = 0; i < 2; i += 1) {
    pushValue = computerCards[i].rank;
    computerCardsRank.push(pushValue);
  }

  // Sum of 2 cards - error
  for (let i = 0; i < 2; i += 1) {
    sumValue = playerCardsRank[i];
    console.log(sumValue, "sumValue - player value");
    playerCardsSum = playerCardsSum + sumValue;
  }

  for (let i = 0; i < 2; i += 1) {
    sumValue = computerCardsRank[i];
    console.log(sumValue, "sumValue - computer value");
    computerCardsSum = computerCardsSum + sumValue;
  }
};

console.log(playerCards, "playerCards");
console.log(computerCards, "computerCards");

console.log(playerCardsRank, "playerCardsRank");
console.log(computerCardsRank, "computerCardsRank");
console.log(playerCardsSum, "playerCardsSum");
console.log(computerCardsSum, "computerCardsSum");

var main = function () {
  randomTwoCards();
  var outputValue =
    "Player Cards: " + playerCards + " Computer Cards: " + computerCards;
  return outputValue;
};
