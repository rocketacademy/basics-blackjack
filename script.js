// create standard deck

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var emoji = ["♥", "♦", "♣️", "♠️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
        rankCounter = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        rankCounter = 10;
      } else if (cardName == 13) {
        cardName = "King";
        rankCounter = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }

  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//shuffle the deck of cards
var shuffleCards = function (cards) {
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cards;
};

// Create deck for BlackJack - 1. Standard Deck 2. Shuffle standard deck

var gameDeck = shuffleCards(makeDeck());

// define global variables

var gameMode = START_MODE;
var START_MODE = "START MODE";
var FIRST_HAND_MODE = "FIRST HAND MODE";
var CHOOSE_HIT_OR_STAND = "CHOOSE HIT OR STAND";
var BLACKJACK_LIMIT = 21;
var COMPUTER_LIMIT = 17;

var playerHand = [];
var computerHand = [];
var cardsDealtPerPax = 0;
var cardsDealtPlayer = 0;
var cardsDealtComputer = 0;
var playerHandSum = 0;
var computerHandSum = 0;

// Helper function to sum hand

var sumHand = function (hand) {
  var numOfAces = 0;
  var sum = 0;
  var counter = 0;

  while (counter < hand.length) {
    var currentCard = hand[counter];

    if (currentCard.rank == 1) {
      numOfAces = numOfAces + 1;
      sum = sum + 11;
    } else if (
      currentCard.rank == 1 &&
      numOfAces > 0 &&
      sum + 11 > BLACKJACK_LIMIT
    ) {
      sum = sum + 1;
    } else {
      sum = sum + currentCard.rank;
    }
  }
  return sum;
};

// helper function to output cards in hand for messages

var displayCards = function (hand) {
  var cards = "";
  var handCounter = 0;

  while (handCounter < hand.length) {
    cards =
      cards + hand[handCounter].name + " of " + hand[handCounter].emoji + " . ";
    handCounter = handCounter + 1;
  }

  return cards;
};

// Standard Messages

var playerHandMessage =
  "<br> Your Current Hand is: " + displayCards(playerHand);
var playerSumMessage = "<br> Total player sum: " + playerHandSum;
var computerHandMessage =
  "<br> Computer Hand is: " + displayCards(computerHand);
var computerSumMessage = "<br> Total computer sum: " + computerHandSum;
var fullStandardMessage =
  playerHandMessage +
  playerSumMessage +
  computerHandMessage +
  computerSumMessage;

//Helper function to determine winners

var determineWinner = function () {
  // are either hands more than 21? game ends

  if (playerHandSum > BLACKJACK_LIMIT && computerHandSum > BLACKJACK_LIMIT) {
    return (
      fullStandardMessage +
      "You lost, but the computer loses too. Click refresh to retry."
    );
  } else if (playerHandSum > BLACKJACK_LIMIT) {
    return (
      playerHandMessage +
      computerHandMessage +
      "<br> Sum of your hand is " +
      playerHandSum +
      ", greater than 21. You lost, game over! Click refresh to retry."
    );
  } else if (computerHandSum > BLACKJACK_LIMIT) {
    return (
      playerHandMessage +
      computerHandMessage +
      "Sum of computer's hand is " +
      computerHandSum +
      ", greater than 21. You won, game over! Click refresh to play again."
    );

    // is player or computer hand = 21? either wins
  } else if (
    playerHandSum == BLACKJACK_LIMIT &&
    computerHandSum == BLACKJACK_LIMIT
  ) {
    return (
      fullStandardMessage +
      "BLACKJACK! Both you and the computer won. Click refresh to play again!"
    );
  } else if (playerHandSum == BLACKJACK_LIMIT) {
    return (
      "BLACKJACK! You won. <br>" +
      playerHandMessage +
      computerHandMessage +
      ". Click refresh to play again!"
    );
  } else if (computerHandSum == BLACKJACK_LIMIT) {
    return (
      "COMPUTER BLACKJACK! You lost. <br>" +
      playerHandMessage +
      computerHandMessage +
      ". Click refresh to play again!"
    );
  }
  // if player or computer hand is less than 21, compare for winner
  else if (computerHandSum > playerHandSum) {
    return fullStandardMessage + ". You lost. Click refresh to retry!";
  } else return fullStandardMessage + ". You won. Click refresh to play again!";
};

// function to deal first two cards

var firstHandDealt = function () {
  while (cardsDealtPerPax < 2) {
    playerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());

    playerHandSum = sumHand(playerHand);
    computerHandSum = sumHand(computerHand);

    cardsDealtPerPax = cardsDealtPerPax + 1;
    cardsDealtComputer = cardsDealtComputer + 1;
    cardsDealtPlayer = cardsDealtPlayer + 1;
  }

  // if player hand or computer hand is already = or > 21, then determine winner accordingly

  if (playerHandSum >= BLACKJACK_LIMIT || computerHandSum >= BLACKJACK_LIMIT) {
    return determineWinner();
  }

  // else return hit/stand message
  else
    return (
      playerHandMessage +
      playerSumMessage +
      "<br> Now enter 'hit' to draw another card, or 'stand' to end game."
    );
};

var main = function (input) {
  // start mode - ensure player hand has nothing inside

  if (gameMode == START_MODE && playerHand.length == 0) {
    gameMode = DEAL_FIRST_HAND;
    return "Welcome! Click submit to deal first hand.";
    // enter first hand mode to deal first hand
  } else if (gameMode == FIRST_HAND_MODE) {
    gameMode = CHOOSE_HIT_OR_STAND;
    return firstHandDealt();
  }

  // if neither hands >= 21, then enter mode for player to enter hit/stand
  // player inputs "hit" (draw another card), or "stand" (end game at current results)
  else if (gameMode == CHOOSE_HIT_OR_STAND) {
    // computer to "hit" if sum of computer hand is < 17
    if (computerHandSum < COMPUTER_LIMIT) {
      computerHand = computerHand.push(gameDeck.pop());
      computerHandSum = sumHand(computerHand);
      cardsDealtComputer = cardsDealtComputer + 1;
    }

    // if player enters hit mode, deal another card into player hand
    if (input.toLowerCase() == "hit") {
      // if sum of player hand is still less than 21, offer another opportunity to hit/stand
      while (playerHandSum < BLACKJACK_LIMIT) {
        playerHand = playerHand.push(gameDeck.pop());
        playerHandSum = sumHand(playerHand);
        cardsDealtPlayer = cardsDealtPlayer + 1;
        return (
          playerHandMessage +
          playerSumMessage +
          "<br> Now enter 'hit' to draw another card, or 'stand' to end game."
        );
      }
      // if sum of player cards is >= over 21, determine winner
      return determineWinner();
    } else if (input.toLowerCase() == "stand") {
      // if player enters stand mode, end game and determine winner
      return determineWinner();
    } else return "Did you enter 'hit' or 'stand' correctly?";
  }
};
