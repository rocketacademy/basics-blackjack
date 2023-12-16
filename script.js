// Create a deck of 52 cards, with each card having a name, suit, and rank.
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitsIcon = ['♥', '♦', '♣', '♠'];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentSuitsIcon = suitsIcon[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 'ace') {
        cardValue = 11;
      } else if (cardName == 'jack') {
        cardValue = 10;
      } else if (cardName == 'queen') {
        cardValue = 10;
      } else if (cardName == 'king') {
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
        icon: currentSuitsIcon,
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

// Shuffle elements in the cardDeck array. Return the shuffled deck.
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Create a new shuffled deck.
var createNewShuffledDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards (newDeck);
  return shuffledDeck;
}

// Check Player Ace.
var checkPlayerAce = function () {
  // If the player score > 21, then check each of his card to see if there's an Ace.
  // If there is Ace, minus 10.
  var playerAceCounter = 0;
  while (playerAceCounter < playerHand.length) {
    if (playerHand[playerAceCounter].value == 11) {
      playerScore = playerScore - 10;
      playerHand[playerAceCounter].value = 1;
      playerAceCounter = playerHand.length;
    }
    playerAceCounter++;
  }
}

// Check Computer Ace.
var checkComputerAce = function () {
  // If the player score > 21, then check each of his card to see if there's an Ace.
  // If there is Ace, minus 10.
  var computerAceCounter = 0;
  while (computerAceCounter < computerHand.length) {
    if (computerHand[computerAceCounter].value == 11) {
      computerScore = computerScore - 10;
      computerHand[computerAceCounter].value = 1;
      computerAceCounter = computerHand.length
    }
    computerAceCounter++;
  }
}

// Global variables
var theDeck = createNewShuffledDeck();
var gameMode = "intro";
var playerHand = [];
var computerHand = [];
var playerScore = 0;
var computerScore = 0;

// Main function
var main = function (input) {
  if (gameMode == "intro") {
    var myOutputValue = `Welcome! You have entered the game of Blackjack! 🃏💰 <br> Press "Submit" again to be dealt your starting hand!`;
    gameMode = "starting hand";
    return myOutputValue;
  }
  if (gameMode == "starting hand") {
    playerHand.push(theDeck.pop());
    playerHand.push(theDeck.pop());
    computerHand.push(theDeck.pop());
    computerHand.push(theDeck.pop());
    playerScore = playerHand[0].value + playerHand[1].value;
    computerScore = computerHand[0].value + computerHand[1].value;
    myOutputValue = `You have been dealt the ${playerHand[0].name} of ${playerHand[0].suit}${playerHand[0].icon}, and the ${playerHand[1].name} of ${playerHand[1].suit}${playerHand[1].icon}. <br> Your total score is ${playerScore}. <br><br> The computer has been dealt the ${computerHand[0].name} of ${computerHand[0].suit}${computerHand[0].icon}, and the ${computerHand[1].name} of ${computerHand[1].suit}${computerHand[1].icon}. <br> Its total score is ${computerScore}.`;
    // Blackjack condition.
    if (playerScore >= 21 && computerScore >= 21) {
      myOutputValue = myOutputValue + `<br><br> You and the computer both got a Blackjack! It's a draw! 🤝`;
      gameMode = "end game";
    } else if (playerScore < 21 && computerScore >= 21) {
      myOutputValue = myOutputValue + `<br><br> The computer got a Blackjack! You lost! ☠`;
      gameMode = "end game";
    } else if (playerScore >= 21 && computerScore < 21) {
      myOutputValue = myOutputValue + `<br><br> You got a Blackjack! You won! 🤑`;
      gameMode = "end game";
    } 
    // No Blackjack condition.
      else {
        myOutputValue = myOutputValue + `<br><br> Please type "hit" if you wish to draw another card, or "stand" if you don't wish to draw anymore.`;
        gameMode = "player hit or stand";
      }
    return myOutputValue;
  }
  // Player chooses to hit or stand.
  if (gameMode == "player hit or stand") {
    if (input != "hit" && input != "stand") {
      myOutputValue = `Please type "hit" if you wish to draw another card, or "stand" if you don't wish to draw anymore.`;
      return myOutputValue;
    }
    if (input == "hit") {
      playerHand.push(theDeck.pop());
      playerScore = playerScore + playerHand[playerHand.length - 1].value;
      if (playerScore > 21) {
        checkPlayerAce();
      }
      if (playerScore <= 21) {
        myOutputValue = `You have been dealt the ${playerHand[playerHand.length - 1].name} of ${playerHand[playerHand.length - 1].suit}${playerHand[playerHand.length - 1].icon}. <br> Your total score is now ${playerScore}. <br><br> Please type "hit" if you wish to draw another card, or "stand" if you don't wish to draw anymore.`;
      }
      if (playerScore > 21) {
        myOutputValue =  `You have been dealt the ${playerHand[playerHand.length - 1].name} of ${playerHand[playerHand.length - 1].suit}${playerHand[playerHand.length - 1].icon}. <br> Your total score is now ${playerScore}. <br> You have overshot 21. It's time for the computer's turn.`;
        gameMode = "computer hit or stand";
      }
    }
    if (input == "stand") {
      myOutputValue = `Your total score is ${playerScore}. <br> It's time for the computer's turn.`;
      gameMode = "computer hit or stand";
    }
    return myOutputValue;
  }
  // Computer will hit when below 17, and stand when above or equal to 17.
  if (gameMode == "computer hit or stand") {
    if (computerScore < 17) {
      computerHand.push(theDeck.pop());
      computerScore = computerScore + computerHand[computerHand.length - 1].value;
      if (computerScore > 21) {
        checkComputerAce();
      }
      myOutputValue = `The computer hits and has been dealt the ${computerHand[computerHand.length - 1].name} of ${computerHand[computerHand.length - 1].suit}${computerHand[computerHand.length - 1].icon}. <br> Its total score is now ${computerScore}.`;
      return myOutputValue;
    }
    if (computerScore >= 17) {
      myOutputValue = `The computer's score is ${computerScore}. <br> It will not draw anymore.`;
      gameMode = "time to compare";
      return myOutputValue;
    }
  }
  // Compare player and computer scores.
  if (gameMode == "time to compare") {
    if (playerScore > 21 && computerScore > 21) {
      myOutputValue = `Your score is ${playerScore} and the computer's score is ${computerScore}. <br> You both overshot 21. It's a tie! 🤝`;
    }
    if (playerScore <= 21 && computerScore > 21) {
      myOutputValue = `Your score is ${playerScore} and the computer's score is ${computerScore}. <br> The computer overshot 21. You won! 🤑`;
    }
    if (playerScore > 21 && computerScore <= 21) {
      myOutputValue = `Your score is ${playerScore} and the computer's score is ${computerScore}. <br> You overshot 21. You lost! ☠`;
    }
    if (playerScore <= 21 && computerScore <= 21 && playerScore == computerScore) {
      myOutputValue = `Your score is ${playerScore} and the computer's score is ${computerScore}. <br> It's a tie! 🤝`;
    }
    if (playerScore <= 21 && computerScore <= 21 && playerScore > computerScore) {
      myOutputValue = `Your score is ${playerScore} and the computer's score is ${computerScore}. <br> You won! 🤑`;
    }
    if (playerScore <= 21 && computerScore <= 21 && playerScore < computerScore) {
      myOutputValue = `Your score is ${playerScore} and the computer's score is ${computerScore}. <br> You lost! ☠`;
    }
    gameMode = "end game";
    return myOutputValue;
  }
  // End game. Reset all the global variables for a new game.
  if (gameMode == "end game") {
    theDeck = createNewShuffledDeck();
    gameMode = "intro";
    playerHand = [];
    computerHand = [];
    playerScore = 0;
    computerScore = 0;
    myOutputValue = `Please press "Submit" to restart the game!`
    return myOutputValue;
  }
};
