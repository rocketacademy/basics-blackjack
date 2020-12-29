// card rank goes from 1-10, 11, 12, 13
// card suit - hearts, diamonds, spades, clubs
// car name - 1 is ace, 2-10, jack is 11, queen is 12, king is 13

var makeDeck = function () {
  var deck = [];

  var cardSuits = ['hearts', 'diamonds', 'spades', 'clubs'];
  var cardSuitIndex = 0;

  while (cardSuitIndex < cardSuits.length) {
    var cardSuit = cardSuits[cardSuitIndex];
    var cardRankIndex = 1;
    var cardName;
    while (cardRankIndex < 14) {
      if (cardRankIndex == 1) {
        cardName = 'Ace';
      }
      else if (cardRankIndex == 11) {
        cardName = 'Jack';
      }
      else if (cardRankIndex == 12) {
        cardName = 'Queen';
      }
      else if (cardRankIndex == 13) {
        cardName = 'King';
      }
      else {
        cardName = cardRankIndex;
      }
      var card = {
        name: cardName,
        rank: cardRankIndex,
        suit: cardSuit,
      };
      cardRankIndex += 1;
      deck.push(card);
    }
    cardSuitIndex += 1;
  }

  return deck;
};

// function is given an object containing ordered deck
// function returns shuffled deck
var shuffleDeck = function (deck) {
  var cardIndex = 0;
  while (cardIndex < deck.length) {
    var randomNumber;
    var placeHolder;
    randomNumber = cardIndex + Math.floor(Math.random() * (deck.length - cardIndex));
    placeHolder = deck[randomNumber];
    deck[randomNumber] = deck[cardIndex];
    deck[cardIndex] = placeHolder;
    cardIndex += 1;
  }
  return deck;
};

// get card value from a function when a card is given to function as input
var cardScore = function (card) {
  var BlackjackCardScore;
  if (card.name == 'Jack' || card.name == 'Queen' || card.name == 'King') {
    BlackjackCardScore = 10;
  }
  else if (card.name == 'Ace') {
    BlackjackCardScore = 11;
  }
  else {
    BlackjackCardScore = card.rank;
  }
  return BlackjackCardScore;
};

var shuffledCards = shuffleDeck(makeDeck());
var playerHand = [];
var computerHand = [];
var gameMode;

var dealCard = function (deck) {
  deck.push(shuffledCards.pop());
  return deck;
};

var handScore = function (handDeck) {
  var counter = 0;
  var handScoreTotal = 0;
  while (counter < handDeck.length) {
    handScoreTotal += cardScore(handDeck[counter]);
    counter += 1;
  }
  return handScoreTotal;
};

// On submit button being pressed, a card is drawn by computer and player to be compared
var main = function (input) {
  // player dealt two cards
  dealCard(playerHand);
  dealCard(playerHand);
  console.log(playerHand);
  console.log(handScore(playerHand));
  console.log(computerHand);
};
