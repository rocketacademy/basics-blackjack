// Helper functions
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
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        value: cardValue,
      };

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

// Input validator, returns boolean
var inputValidator = function (input) {
  if (gameState == "player") {
    if (input != "hit" && input != "stand" && input != "h" && input != "s") {
      return false;
    }
    return true;
  }

  if (gameState == "init") {
    if (isNaN(input) || input == "" || input > playerPoints) {
      return false;
    }
    return true;
  }

  return true;
};

// Deal two cards from the given deck, returns array
var dealCards = function (deck) {
  var dealtHand = [];
  dealtHand.push(deck.pop());
  dealtHand.push(deck.pop());
  return dealtHand;
};

// Calculates the value of the hand, returns integer
var handCalculate = function (hand) {
  var handValue = 0;
  for (let i = 0; i < hand.length; i += 1) {
    handValue += hand[i].value;
  }

  // If the handvalue is above 21, iterate over the hand to check for aces and subtract 10 for each until the hand is less than 21
  if (handValue > 21) {
    for (let i = 0; i < hand.length; i += 1) {
      if (hand[i].value == 11) {
        handValue -= 10;
        if (handValue <= 21) {
          break;
        }
      }
    }
  }
  return handValue;
};

// Checks that the computer doesn't have 21, then if the computer has a lower card value than the player or has <17 value, returns true, returns boolean
var doesComHit = function () {
  if (comValue == 21) {
    return false;
  } else if (comValue < playerValue || comValue < 17) {
    return true;
  }

  return false;
};

// Checks if the hand value is a bust, returns boolean
var isBust = function (value) {
  if (value > 21) {
    return true;
  }

  return false;
};

// Prints out a string of the cards in the hand, returns string
var printHand = function (hand) {
  var outputString = "";
  for (let i = 0; i < hand.length; i += 1) {
    outputString += `${hand[i].name} of ${hand[i].suit}<br>`;
  }
  return outputString;
};

// Prints value and hand neatly, returns string
var printResults = function () {
  var outputString = "";

  outputString += `<br><br>Your hand value is ${playerValue}.<br>${printHand(
    playerHand
  )}<br>`;
  outputString += `The computer's hand value is ${comValue}.<br>${printHand(
    comHand
  )}`;

  return outputString;
};

// Determines who wins, pays out bets; returns string
var determineWinner = function () {
  var result = "<br>";

  // Draw
  if (playerValue == comValue) {
    result += "It's a draw!";
  }

  // Player win
  if ((playerValue > comValue && !isBust(playerValue)) || isBust(comValue)) {
    result += "The player wins!";
    playerPoints += playerBet;
  }

  // Computer win
  if ((playerValue < comValue && !isBust(comValue)) || isBust(playerValue)) {
    result += "The computer wins!";
    playerPoints -= playerBet;
  }

  return `${result}<br>You currently have ${playerPoints} points.<br>Submit another bet to play again!`;
};

// Global variables
var mainDeck = shuffleCards(makeDeck());
var gameState = "init"; // States: initialise, player, computer
var playerHand = [];
var comHand = [];
var playerValue = 0;
var comValue = 0;
var playerPoints = 100;
var playerBet = 0;

// Main function
var main = function (input) {
  if (gameState == "init") {
    if (!inputValidator(input)) {
      return `Please input a bet within your points (${playerPoints}).`;
    }
    playerBet = parseInt(input);
    gameState = "player";
    playerHand = dealCards(mainDeck);
    comHand = dealCards(mainDeck);

    playerValue = handCalculate(playerHand);
    comValue = handCalculate(comHand);

    var outputString = "Do you want to hit(h) or stand(s)?";

    outputString += printResults();

    return outputString;
  }

  if (gameState == "player") {
    if (!inputValidator(input)) {
      return `Please input hit(h) or stand(s)!${printResults()}`;
    }

    if (input == "hit" || input == "h") {
      playerHand.push(mainDeck.pop());
      playerValue = handCalculate(playerHand);
    }

    var outputString = "";

    if (isBust(playerValue)) {
      outputString += "You've gone bust! Better luck next time.";
      outputString += determineWinner();
      gameState = "init";
    } else if (input == "stand" || input == "s") {
      outputString += "Press submit to see the computer's turn.";
      gameState = "com";
    } else {
      outputString += "Do you want to hit(h) or stand(s)?";
    }

    outputString += printResults();

    return outputString;
  }
  //test

  if (gameState == "com") {
    if (doesComHit()) {
      comHand.push(mainDeck.pop());
      comValue = handCalculate(comHand);
    }

    var outputString = "";

    if (isBust(comValue)) {
      outputString += "The computer's gone bust!";
      outputString += determineWinner();
      gameState = "init";
    } else if (doesComHit()) {
      outputString += "The computer will hit again.";
    } else {
      outputString += "The computer stands.";
      outputString += determineWinner();
      gameState = "init";
    }

    outputString += printResults();

    return outputString;
  }
};

// Deck is shuffled. DONE
// User clicks Submit to deal cards. DONE
// The cards are analysed for game winning conditions, e.g. Blackjack. DONE
// The cards are displayed to the user. DONE
// The user decides whether to hit or stand, using the submit button to submit their choice. DONE
// The user's cards are analysed for winning or losing conditions. DONE
// The computer decides to hit or stand automatically based on game rules. DONE
// The game either ends or continues. DONE
