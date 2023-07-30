//There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//Clobal variables
var HEARTS = "♥️";
var DIAMONDS = "♦️";
var SPADES = "♠️";
var CLUBS = "♣️";
var ACE = "ace";
var JACK = "jack";
var QUEEN = "queen";
var KING = "king";

//1. create a card deck (helper function)
var createDeck = function () {
  var deck = []; //array for the card deck
  console.log(deck);
  // 4 suits
  var suits = [HEARTS, DIAMONDS, SPADES, CLUBS];
  //create a loop so for each suit there's 13 cards of different rank
  var suitsCounter = 0;
  while (suitsCounter < 4) {
    var currentSuit = suits[suitsCounter];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (rankCounter === 1) {
        cardName = ACE;
      }
      if (rankCounter === 11) {
        cardName = JACK;
      }
      if (rankCounter === 12) {
        cardName = QUEEN;
      }
      if (rankCounter === 13) {
        cardName = KING;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      console.log("card", card);
      deck.push(card);

      rankCounter = rankCounter + 1;
    }

    suitsCounter = suitsCounter + 1;
  }
  return deck;
};

//2. Get a random number for shuffling the deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//3. Shuffle the deck (helper function)
var shuffleCards = function (deck) {
  //we need to swap the current card with a random card
  var currentIndex = 0;
  var randomIndex = getRandomIndex(deck.length);
  console.log("random index", randomIndex);
  while (currentIndex < deck.length) {
    var currentCard = deck[currentIndex];
    var randomCard = deck[randomIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    console.log("random card", randomCard);
    console.log("current card", currentCard);
    currentIndex = currentIndex + 1;
  }
  return deck;
};

var main = function (input) {
  var shuffledDeck = shuffleCards(createDeck());
  var randomCard = shuffledDeck[getRandomIndex(shuffledDeck.length)];
  return randomCard.name + " of " + randomCard.suit;
};
