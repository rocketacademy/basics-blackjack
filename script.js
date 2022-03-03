// Generate Deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};
cardDeck = makeDeck();
// Shuffle Deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function () {
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
shuffledDeck = shuffleCards();

// Draw card function
var drawOpeningHand = function () {
  var card1 = shuffledDeck.pop();
  var card2 = shuffledDeck.pop();
  return `|    ${card1.name} of ${card1.suit}    |  |    ${card2.name} of ${card2.suit}    |`;
};

var main = function (input) {
  var playerOpeningHand = drawOpeningHand();
  var computerOpeningHand = drawOpeningHand();
  var myOutputValue = `Player Hand = ${playerOpeningHand} <br> Computer Hand = ${computerOpeningHand}`;
  return myOutputValue;
};

// BlackJack
// Player and Dealer(Computer) both draw 2 cards
// var playerCard = cardDeck.length()
// Player goes first, decide to HIT or STAND
// Total Score of each player will be compared
// Closest < or = 21 wins.
