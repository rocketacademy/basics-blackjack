// Project 3: Blackjack

// ---players and their variables---
var PLAYER;
var COMPUTER;
var currentPlayer = PLAYER;
var playerHand = [];
var playerTotal;
var computerHand = [];
var blackjack = false;

// ---modes---
var DEAL_CARDS_MODE = "deal cards";
var HIT_STAND_MODE = "hit or stand";
var gameMode = DEAL_CARDS_MODE;

var main = function (input) {
  var myOutputValue;
  if (gameMode == DEAL_CARDS_MODE) {
    myOutputValue = stdDealCards();
    checkForBlackjack();
    console.log(blackjack);
    if (blackjack == false) {
      gameMode = HIT_STAND_MODE;
    } else return checkForBlackjack();
  } else if (gameMode == HIT_STAND_MODE) {
    myOutputValue = hitStandChoice(input);
  }
  return myOutputValue;
};

var drawCard = function (userHand) {
  userHand.push(deck.pop());
};

// Distributes cards to player and computer
var stdDealCards = function () {
  // Draws 2 player cards and 2 computer cards
  drawCard(playerHand);
  drawCard(computerHand);
  drawCard(playerHand);
  drawCard(computerHand);
  console.log(computerHand);

  // Prints out cards for computer and player
  var playerCards = displayCards(playerHand);
  var computerCards = displayOneCard(computerHand);
  var playerTotal = totalCards(playerHand);

  return `You drew: <br> ${playerCards} <br> Your total: ${playerTotal}  <br><br> Computer drew: <br> ${computerCards} 1 face-down card <br><br> Enter "hit" to draw another card or click submit to stand.`;
};

// Prints out all cards in hand of any player
var displayCards = function (userHand) {
  var counter = 0;
  var returnString = ``;
  while (counter < userHand.length - 1) {
    var currCard = userHand[counter];
    returnString += `${currCard.name} of ${currCard.suit} <br>`;
    counter += 1;
  }
  var lastCard = userHand[userHand.length - 1];
  returnString += `${lastCard.name} of ${lastCard.suit}`;
  return returnString;
};

// Prints out only first card of player
var displayOneCard = function (userHand) {
  var counter = 0;
  var returnString = ``;
  while (counter < userHand.length - 1) {
    var currCard = userHand[counter];
    returnString += `${currCard.name} of ${currCard.suit} <br>`;
    counter += 1;
  }
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

// sth wrong here i think
var checkForBlackjack = function () {
  var myOutputValue;
  var playerTotal = totalCards(playerHand);
  var computerTotal = totalCards(computerHand);

  if (playerTotal == 21) {
    blackjack = true;
    myOutputValue = `BLACKJACK! You win!`;
  } else if (computerTotal == 21) {
    blackjack = true;
    myOutputValue = `The computer got blackjack! You lose!`;
  }
  return myOutputValue;
};

// Determines winner based on winning conditions
var generateOutcome = function () {
  var playerTotal = totalCards(playerHand);
  var computerTotal = totalCards(computerHand);
  var nearestBlackjack = nearestToBlackJack(playerTotal, computerTotal);
  checkForBlackjack();
  var total = `Player: ${playerTotal} <br> Computer: ${computerTotal} <br>`;

  if (blackjack == false) {
    if (playerTotal == computerTotal) {
      myOutputValue = `${total} You both have the same total. It's a push, no one wins!`;
    }

    if (nearestBlackjack == playerTotal) {
      myOutputValue = ` ${total} You win!`;
    } else myOutputValue = `${total} You lose!`;

    // Player busts
    if (playerTotal > 21) {
      myOutputValue = `${total} You bust and lost!`;
    }

    // Computer busts
    if (computerTotal > 21) {
      myOutputValue = `${total} You won! The computer bust!`;
    }

    // Resets game
    playerHand = resetArray(playerHand);
    computerHand = resetArray(computerHand);
    gameMode = DEAL_CARDS_MODE;
  } else return checkForBlackjack();

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

var hitStandChoice = function (input) {
  var playerCards = displayCards(playerHand);
  // var playerTotal = totalCards(playerHand);
  var hitMessage = `You should continue to hit as your total at ${playerTotal} is less than 16.`;

  if (input == `hit`) {
    drawCard(playerHand);
    playerCards = displayCards(playerHand);
    playerTotal = totalCards(playerHand);
    myOutputValue = `You drew a card. Your hand is now ${playerCards} <br> Your total is now: ${playerTotal} <br> <br> Enter "hit" to draw another card or click submit to stand.`;

    if (playerTotal < 16) {
      myOutputValue += `<br><br> ${hitMessage}`;
    }

    if (playerTotal > 21) {
      // repeated stand logic
      var computerTotal = totalCards(computerHand);
      while (computerTotal < 16) {
        //draws cards for computer until at least 16
        drawCard(computerHand);
        console.log(computerHand);
        computerTotal = totalCards(computerHand);
      }
      myOutputValue = generateOutcome();
      gameMode == DEAL_CARDS_MODE;
    }
  } else if (playerTotal < 16) {
    myOutputValue = hitMessage;
  } else {
    // logic for "stand"
    var computerTotal = totalCards(computerHand);
    while (computerTotal < 16) {
      //draws cards for computer until at least 16
      drawCard(computerHand);
      console.log(computerHand);
      computerTotal = totalCards(computerHand);
    }
    myOutputValue = generateOutcome();
    gameMode == DEAL_CARDS_MODE;
  }
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
    // var faceup = false;

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
        // faceup: faceup,
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

// second
// new mode: hit or stand
// hit: get another card
// stand: do nothing and not receive any more cards
// player busts when over 21
// player decide whether to hit or stand
// dealer hit or stand
// wait until player is done to evaluate game-winning condition

// third
// fourth
