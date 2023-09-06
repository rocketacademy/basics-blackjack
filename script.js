//define global variables
var cardDeck = [];
var gameMode = "initial draw";
var computerCardScore = 0;
var playerCardScore = 0;

//create deck
var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var score = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        score = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        score = 10;
      } else if (cardName == 13) {
        cardName = "king";
        score = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: score,
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
};

//shuffle deck. shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once

  for (
    var currentIndex = 0;
    currentIndex < cardDeck.length;
    currentIndex += 1
  ) {
    // Select a random index in the deck
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
  }
  // Return the shuffled deck
  return cardDeck;
};

var main = function (input) {
  //make the deck
  makeDeck();
  //create shuffled deck
  var shuffledDeck = shuffleCards(cardDeck);
  var computerCardOne = shuffledDeck.pop();
  var playerCardOne = shuffledDeck.pop();
  var computerCardTwo = shuffledDeck.pop();
  var playerCardTwo = shuffledDeck.pop();
  computerCardScore = computerCardOne.score + computerCardTwo.score;
  playerCardScore = playerCardOne.score + playerCardTwo.score;
  return `Computer drew ${computerCardOne.name} of ${computerCardOne.suit} & ${computerCardTwo.name} of ${computerCardTwo.suit}. Total of ${computerCardScore}. Player drew ${playerCardOne.name} of ${playerCardOne.suit} & ${playerCardTwo.name} of ${playerCardTwo.suit}. Total of ${playerCardScore}`;
};
