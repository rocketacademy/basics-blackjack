//There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//Clobal variables

var GAME_START = "start the game";
var HIT_OR_STAND = "hit or stand after the first hand is dealt";
var SHOW_SCORE = "show the total hands and declare the winner";
var gameState = GAME_START;
var HEARTS = "♥️";
var DIAMONDS = "♦️";
var SPADES = "♠️";
var CLUBS = "♣️";
var ACE = "ace";
var JACK = "jack";
var QUEEN = "queen";
var KING = "king";
var deck = []; //array for the card deck
console.log(deck);
var playerHand = [];
var dealerHand = [];

//1. create a card deck (helper function)
var createDeck = function () {
  // 4 suits
  var suits = [HEARTS, DIAMONDS, SPADES, CLUBS];
  //create a loop so for each suit there's 13 cards of different rank
  var suitsCounter = 0;
  while (suitsCounter < 4) {
    console.log("suitsCounter", suitsCounter);
    var currentSuit = suits[suitsCounter];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      console.log("rank counter", rankCounter);
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
  while (currentIndex < deck.length) {
    console.log("currentIndex", currentIndex);
    var randomIndex = getRandomIndex(deck.length);
    console.log("random index", randomIndex);
    var currentCard = deck[currentIndex];
    var randomCard = deck[randomIndex];
    console.log(currentCard);
    console.log(randomCard);
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    console.log("random card", randomCard);
    console.log("current card", currentCard);
    currentIndex = currentIndex + 1;
  }
  return deck;
};
//Game mode = GAME_START
//5. Deal the cards:
//Player gets 2 cards
//Computer gets 2 cards

var main = function (input) {
  var myOutputMessage = "";
  if (gameState === GAME_START) {
    var cardDeck = shuffleCards(createDeck());
    index = 0;
    while (index < 2) {
      playerHand.push(cardDeck.pop());
      console.log("player hand: ", playerHand);
      dealerHand.push(cardDeck.pop());
      console.log("dealer hand: ", dealerHand);
      index = index + 1;
    }
    myOutputMessage =
      "You got a " +
      playerHand[0].name +
      " of " +
      playerHand[0].suit +
      " and a " +
      playerHand[1].name +
      " of " +
      playerHand[0].suit +
      "." +
      "<br>" +
      "One card in Dealer's hand is a " +
      dealerHand[0].name +
      " of " +
      dealerHand[0].suit +
      "." +
      "<br>" +
      "Now key in 'hit' if you'd like one more card or 'stand' if you think it's enough.";
  }
  return myOutputMessage;
};

////4. draw a random card (helper function)
// var dealCards = function () {
// var shuffledDeck = shuffleCards(createDeck());
// var randomCard = shuffledDeck[getRandomIndex(shuffledDeck.length)];
// var cardInHand = randomCard.name + " of " + randomCard.suit;
// console.log("Card drawn: ", cardInHand);
// return cardInHand;
