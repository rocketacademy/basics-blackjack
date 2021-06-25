// Project 3: Blackjack

// ---players---
var PLAYER;
var COMPUTER;
var currentPlayer = PLAYER;
var playerHand = [];
var computerHand = [];

var main = function (input) {
  var myOutputValue;
  myOutputValue = `${stdDealCards()} <br> ${generateWinner()}`;
  return myOutputValue;
};

// Generate deck of 52 playing cards
// Added "value" key for easier tabulation; (J,Q,K = 10)
var makeDeck = function () {
  var deck = [];

  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;

    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var value = rankCounter;

      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      if (value == 11 || (value == 12) | (value == 13)) {
        value = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: value,
      };
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive); for use in ShuffleCards
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle deck of cards
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var deck = shuffleCards(makeDeck());

var dealCard = function (userHand) {
  userHand.push(deck.pop());
};

var stdDealCards = function () {
  // Draws 2 player cards and 2 computer cards
  dealCard(playerHand);
  dealCard(computerHand);
  dealCard(playerHand);
  dealCard(computerHand);

  // Prints out cards for computer and player
  var playerCards = displayCards(playerHand);
  var computerCards = displayCards(computerHand);

  return `Player drew ${playerCards} <br> Computer drew ${computerCards}`;
};

// Prints out cards in hand of any player
var displayCards = function (userHand) {
  var counter = 0;
  var returnString = ``;
  while (counter < userHand.length - 1) {
    var currCard = userHand[counter];
    returnString += `${currCard.name} of ${currCard.suit}, `;
    counter += 1;
  }
  var lastCard = userHand[userHand.length - 1];
  returnString += `and ${lastCard.name} of ${lastCard.suit}.`;

  return returnString;
};

// Totals value of cards for any user
var totalCards = function (userHand) {
  var counter = 0;
  var total = 0;
  while (counter < userHand.length) {
    var currCardValue = userHand[counter].value;
    total += currCardValue;
    counter += 1;
  }
  return total;
};

// Determines winner based on winning conditions
var generateWinner = function () {
  var playerTotal = totalCards(playerHand);
  var computerTotal = totalCards(computerHand);
  var nearestBlackjack = nearestToBlackJack(playerTotal, computerTotal);

  var total = `Player: ${playerTotal} <br> Computer: ${computerTotal} <br>`;

  if (playerTotal == 21) {
    return `${total} BLACKJACK!! You win!!`;
  }

  if (playerTotal == computerTotal) {
    myOutputValue = `${total} No one wins! You both have the same total`;
  }

  if (nearestBlackjack == playerTotal) {
    myOutputValue = ` ${total} You win!`;
  } else myOutputValue = `${total} You lose!`;

  //
  playerHand = resetArray(playerHand);
  computerHand = resetArray(computerHand);

  return myOutputValue;
};

// Finds nearest number to 21 out of two values a and b
var nearestToBlackJack = function (a, b) {
  a1 = Math.abs(a - 21);
  b1 = Math.abs(b - 21);

  if (a1 < b1) {
    return a;
  }

  if (b1 < a1) {
    return b;
  }
};

var resetArray = function (array) {
  array = [];
  return array;
};

// simplified blackjack
// two players
// computer is dealer
// dealer hits if hand is below 17
// player closer to 21 wins hand,
// aces can be 1 or 11

// first version
// two players
// computer is dealer
// dealer hits
// compare the ranks of the player's and dealer's cards

// second
// third
// fourth
