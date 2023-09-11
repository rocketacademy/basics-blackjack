// Base
// Gameplay Description
// The main function runs on each player's turn. The sequence of actions in the game might be the following.
// Deck is shuffled. - done
// User clicks Submit to deal cards. - done
// The cards are analysed for game winning conditions, e.g. Blackjack. - done
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// store player's and dealer's hand
var playerHand = [];
var dealerHand = [];

// a deck of cards
var deckBuilder = function () {
  var cards = [];
  var suits = ["spades", "hearts", "clubs", "diamonds"];
  for (var i = 0; i < suits.length; i += 1) {
    for (var j = 1; j <= 13; j += 1) {
      var cardsObject = {
        name: j,
        suit: suits[i],
        value: j,
      };
      if (j == 1) {
        cardsObject.name = "ace";
      } else if (j == 11) {
        cardsObject.name = "jack";
      } else if (j == 12) {
        cardsObject.name = "queen";
      } else if (j == 13) {
        cardsObject.name = "king";
      }
      cards.push(cardsObject);
    }
  }
  return cards;
};

// deck is shuffled
var shuffleDeck = function (deck) {
  for (var i = 0; i < deck.length; i += 1) {
    var shuffle = Math.floor(Math.random() * deck.length);
    // save value of deck[i] to a temp variable
    var temp = deck[i];
    // put the value of deck[shuffle] in deck[i]
    deck[i] = deck[shuffle];
    // restore the value that was in deck[i] to deck[shuffle]
    deck[shuffle] = temp;
    // ignore the value of temp
  }
  return deck;
};

// user clicks submit to deal cards.
var dealCards = function () {
  var outputMessage = "player's turn";
  var shuffled = shuffleDeck(deckBuilder());
  console.log(`shuffling deck . . .`);
  console.log(shuffled);
  for (var i = 0; i < 2; i += 1) {
    var player = shuffled.pop();
    var dealer = shuffled.pop();
    playerHand.push(player);
    dealerHand.push(dealer);
  }
  console.log(`player's hand:`);
  console.log(playerHand);
  console.log(`dealer's hand:`);
  console.log(dealerHand);
  return outputMessage;
};

var checkForBlackjack = function (card) {
  var cardIndexOne = card[0];
  var cardIndexTwo = card[1];
  var blackjack = false;
  if (
    (cardIndexOne.name == "ace" && cardIndexTwo.value >= 10) ||
    (cardIndexOne.value >= 10 && cardIndexTwo.name == "ace")
  ) {
    blackjack = true;
  }
  return blackjack;
};

var main = function (input) {
  var myOutputValue = "hello world";
  console.log(dealCards());
  console.log(checkForBlackjack(playerHand));
  console.log(checkForBlackjack(dealerHand));
  return myOutputValue;
};
