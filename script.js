// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continue

var main = function (input) {
  var myOutputValue = `${playerDrawCards()} <br> ${computerDrawCards()} <br> ${compareHands()}`;

  console.log("player total hand rank");
  console.log(playerTotalHandRank());
  console.log("computer total hand rank");
  console.log(computerTotalHandRank());
  return myOutputValue;
};

// Aim for a playable game. The essence of blackjack requires:
// Two players - a player and a dealer (computer).
// A deck of cards.
// A starting hand of 2 cards for each player.

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

// shuffle deck
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

// create deck and shuffle
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// global variables
var playerHand = [];
var computerHand = [];
var playerHandRank = 0;
var computerHandRank = 0;

// player draw 2 cards
var playerDrawCards = function () {
  var playerCardOne = shuffledDeck.pop();
  var playerCardTwo = shuffledDeck.pop();

  playerHand.push(playerCardOne, playerCardTwo);
  console.log("player hand");
  console.log(playerHand);

  return `Player has ${playerCardOne.name} of ${playerCardOne.suit} and ${playerCardTwo.name} of ${playerCardTwo.suit}`;
};

// computer draw 2 cards
var computerDrawCards = function () {
  var computerCardOne = shuffledDeck.pop();
  var computerCardTwo = shuffledDeck.pop();

  computerHand.push(computerCardOne, computerCardTwo);
  console.log("computer hand");
  console.log(computerHand);

  return `Computer has ${computerCardOne.name} of ${computerCardOne.suit} and ${computerCardTwo.name} of ${computerCardTwo.suit}`;
};

// Comparing both hands and determining a winner. The possible scenarios are:
// A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
// A Blackjack win. When either player or dealer draw Blackjack.
// A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.

// compute ranking
var playerTotalHandRank = function () {
  playerHandRank =
    playerHand[playerHand.length - 2].rank +
    playerHand[playerHand.length - 1].rank;
  return playerHandRank;
};

var computerTotalHandRank = function () {
  computerHandRank =
    computerHand[computerHand.length - 2].rank +
    computerHand[computerHand.length - 1].rank;
  return computerHandRank;
};

// compare hands
var compareHands = function () {
  // A tie
  if (playerTotalHandRank() == computerTotalHandRank()) {
    return `It is a tie between Player and Computer.`;
    // A blackjack win: 21
  } else if (playerTotalHandRank() == 21) {
    return `Player wins with Blackjack (21)!`;
  } else if (computerTotalHandRank() == 21) {
    return `Computer wins with Blackjack (21)!`;
    // A normal win: whoever has the higher hand total
  } else if (playerTotalHandRank() > computerTotalHandRank()) {
    return `Player wins!`;
  } else if (playerTotalHandRank() < computerTotalHandRank()) {
    return `Computer wins!`;
  }
};
