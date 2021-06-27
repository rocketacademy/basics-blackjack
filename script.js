var main = function (input) {
  // var card = deck.pop();
  var playerCard = playerHand.pop();
  var dealerCard = dealerHand.pop();

  // Initialise an output value with the cards drawn by each player.
  var myOutputValue =
    "PLAYER: " +
    playerCard.name +
    " of " +
    playerCard.suit +
    "<br>DEALER: " +
    dealerCard.name +
    " of " +
    dealerCard.suit +
    "<br>";
  // If the player's card beats the dealer's card, the player wins.
  if (playerCard.rank > dealerCard.rank) {
    myOutputValue = myOutputValue + "PLAYER WINS!<br>";
  }
  // If the dealer's card beats the player's card, the dealer wins.
  else if (dealerCard.rank > playerCard.rank) {
    myOutputValue = myOutputValue + "DEALER WINS!<br>";
  }
  // If the player's and dealer's cards match, it's War.

  return myOutputValue;
};

var makeDeck = function () {
  // create an empty deck at the beginning
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    console.log("current suit: " + currentSuit);

    // loop to create all cards in this suit: rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // For special cards
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      console.log("rank: " + rankCounter);
      // add the card to the deck
      deck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

var deck = shuffleCards(makeDeck());
var playerHand = deck.splice(0, 26);
var dealerHand = deck;

// First Version: Compare Initial Hands to Determine Winner
// Aim for a playable game. A minimal version of Blackjack could just compare the ranks of the player's and dealer's cards. For now, we can leave out features such as Aces being 1 or 11, and the player and dealer choosing to hit or stand. Write pseudocode to guide your logic.
// Compare the initially-drawn cards to determine a winner. Code with the understanding that your code will expand later to encompass other Blackjack functionality.
// Test your code.
//
//
//
//
//
// rules of game;-
// Objective: Win highest card
// deck is shuffled and split evenly among players
// players take turns drawing one card
// highest card wins
//
// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.
