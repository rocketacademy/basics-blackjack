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

      // amend the card rank for jack queen king to be 10
      if (card.rank == 11) {
        card.rank = 10;
      } else if (card.rank == 12) {
        card.rank = 10;
      } else if (card.rank == 13) {
        card.rank = 10;
      }

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
// define gamemodes in blackjack
var DEAL_CARDS = `deal cards`;
var HIT = `hit`;
var STAND = `stand`;
var DEALER_TURN = `dealer's turn`;

var gameMode = DEAL_CARDS;
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var calPlayerCurrScore;
var calComputerCurrScore;

// standard messages
var hitOrStandMessage = `Enter hit to take another card or stand to end your turn.`;

// rules of blackjack
// players will be dealt 2 cards
var dealHands = function () {
  // draw 2 cards for player and 1 card for dealer
  playerCard1 = shuffledDeck.pop();
  playerCard2 = shuffledDeck.pop();
  computerCard1 = shuffledDeck.pop();
  computerCard2 = shuffledDeck.pop();

  // calculate players score for the 2 cards
  calPlayerCurrScore = Number(playerCard1.rank + playerCard2.rank);
  // calculate computer score for the 2 cards
  calComputerCurrScore = Number(computerCard1.rank + computerCard2.rank);

  var myOutputValue = `Your hand is <br>${playerCard1.name} of ${playerCard1.suit} <br> ${playerCard2.name} of ${playerCard2.suit}
  <br>Your score is ${calPlayerCurrScore}<br> <br><br> Computer hand is <br>${computerCard1.name} of ${computerCard1.suit} <br> ${computerCard2.name} of ${computerCard2.suit}<br>Com score is ${calComputerCurrScore}<br>`;

  return myOutputValue;
};

var determineWinner = function () {
  if (calPlayerCurrScore > calComputerCurrScore) {
    myOutputValue = "<br>Player Wins";
  }

  if (calPlayerCurrScore < calComputerCurrScore) {
    myOutputValue = "<br>Computer Wins";
  }
  return myOutputValue;
};

var main = function (input) {
  if (gameMode == DEAL_CARDS) {
    myOutputValue = dealHands() + determineWinner();
  }

  return myOutputValue;
};
