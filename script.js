var gameMode = "startGame";
var playerCards = [];
var compCards = [];

// Function to create deck of 52 cards
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

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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

// Get a random index ranging from 0 (inclusive) to max (exclusive). <- For shuffle
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Function to shuffle deck
var shuffleCards = function () {
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

var cardDeck = makeDeck();
console.log(cardDeck);
var shuffledDeck = shuffleCards();

var main = function (input) {
  var myOutputValue = "";
  var playerHand = 0;
  var computerHand = 0;

  if (gameMode == "startGame" && input == "") {
    gameMode = "drawCards1";
    return `Hello there! <br>Let's play a game of Blackjack ♣️ ♥️ ♠️ ♦️ <br> Hit submit to draw your first card.`;
  }

  // User clicks submit and is given 1st card (face up)
  // Computer gets 1st card (face up)
  if (gameMode == "drawCards1" && input == "") {
    var player1stCard = shuffledDeck.pop();
    playerCards.push(player1stCard);
    var comp1stCard = shuffledDeck.pop();
    compCards.push(comp1stCard);
    gameMode = "drawCards2";

    console.log(cardDeck);
    console.log(playerCards);
    console.log(playerCards[0].name);
    console.log(compCards);

    myOutputValue = `Your first card is ${playerCards[0].name} of ${playerCards[0].suit}! <br> The computer's first card is ${compCards[0].name} of ${compCards[0].suit}! <br><br>Hit submit to draw your 2nd card.`;
    return myOutputValue;
  }

  // User clicks submit and is given 2nd card (face up)
  // Computer gets 2nd card (face down)
  if (gameMode == "drawCards2" && input == "") {
    var player2ndCard = shuffledDeck.pop();
    playerCards.push(player2ndCard);
    var comp2ndCard = shuffledDeck.pop();
    compCards.push(comp2ndCard);

    console.log(playerCards);
    console.log(playerCards[0].rank);
    console.log(playerCards[1].rank);
    console.log(cardDeck);

    playerHand = Number(playerCards[0].rank) + Number(playerCards[1].rank);
    gameMode = "playerChoose";

    myOutputValue = `You've drawn your second card! <br> Here are your current cards: ${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit}<br><br>The computer has drawn a second card but it remains face down. <br>The computer's first card: ${compCards[0].name} of ${compCards[0].suit}<br><br>Enter 'h' if you would like to hit (get another card ➡️ add to your hand) OR <br>Enter 's' if you would like to stand (keep your current cards ➡️ play with your current hand)`;

    // Check if user cards add up to 21, if yes -> user wins
    if (playerHand == 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn your second card! Here are your current cards:  ${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit}. <br> You WIN!`;
    }

    if (playerHand > 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn your second card! <br>Here are your current cards:  ${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit}. <br> You LOSE!`;
    }

    return myOutputValue;
  }

  // If not, user can either:
  // Option 1: Hit as many times as you want -> give out new card when user hits submit -> auto calculate if hand is more than 21 (if yes -> LOSE, if no -> ask user, do you want to draw another card? OR stand)

  // Drawing player 3rd card
  if (gameMode == "playerChoose" && input == "h") {
    var playerNextCard = shuffledDeck.pop();
    playerCards.push(playerNextCard);
    gameMode = "playerHas3Card";
    console.log(cardDeck);

    playerHand =
      Number(playerCards[0].rank) +
      Number(playerCards[1].rank) +
      Number(playerCards[2].rank);

    console.log(playerHand);

    if (playerHand < 21) {
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>The computer has drawn a second card but it remains face down. <br>The computer's first card: ${compCards[0].name} of ${compCards[0].suit}<br><br>Enter 'h' if you would like to hit (get another card ➡️ add to your hand) OR <br>Enter 's' if you would like to stand (keep your current cards ➡️ play with your current hand)`;
    } else if (playerHand == 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You won!<br>Hit refresh to restart the game.`;
    } else if (playerHand > 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You lose!<br>Hit refresh to restart the game.`;
    }
    return myOutputValue;
  }

  // Drawing player 4th card
  if (gameMode == "playerHas3Card" && input == "h") {
    var playerNextCard = shuffledDeck.pop();
    playerCards.push(playerNextCard);
    gameMode = "playerHas4Card";

    playerHand =
      Number(playerCards[0].rank) +
      Number(playerCards[1].rank) +
      Number(playerCards[2].rank) +
      Number(playerCards[3].rank);

    console.log(playerHand);

    if (playerHand < 21) {
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>The computer has drawn a second card but it remains face down. <br>The computer's first card: ${compCards[0].name} of ${compCards[0].suit}<br><br>Enter 'h' if you would like to hit (get another card ➡️ add to your hand) OR <br>Enter 's' if you would like to stand (keep your current cards ➡️ play with your current hand)`;
    } else if (playerHand == 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You won!<br>Hit refresh to restart the game.`;
    } else if (playerHand > 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You lose!<br>Hit refresh to restart the game.`;
    }
    return myOutputValue;
  }

  // Drawing player 5th card
  if (gameMode == "playerHas4Card" && input == "h") {
    var playerNextCard = shuffledDeck.pop();
    playerCards.push(playerNextCard);
    gameMode = "playerHas5Card";

    playerHand =
      Number(playerCards[0].rank) +
      Number(playerCards[1].rank) +
      Number(playerCards[2].rank) +
      Number(playerCards[3].rank) +
      Number(playerCards[4].rank);

    console.log(playerHand);

    if (playerHand < 21) {
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>The computer has drawn a second card but it remains face down. <br>The computer's first card: ${compCards[0].name} of ${compCards[0].suit}<br><br>Enter 'h' if you would like to hit (get another card ➡️ add to your hand) OR <br>Enter 's' if you would like to stand (keep your current cards ➡️ play with your current hand)`;
    } else if (playerHand == 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You won! <br>Hit refresh to restart the game.`;
    } else if (playerHand > 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You lose!<br>Hit refresh to restart the game.`;
    }
    return myOutputValue;
  }

  // Drawing player 6th card
  if (gameMode == "playerHas5Card" && input == "h") {
    var playerNextCard = shuffledDeck.pop();
    playerCards.push(playerNextCard);
    gameMode = "playerHas6Card";

    playerHand =
      Number(playerCards[0].rank) +
      Number(playerCards[1].rank) +
      Number(playerCards[2].rank) +
      Number(playerCards[3].rank) +
      Number(playerCards[4].rank) +
      Number(playerCards[5].rank);

    console.log(playerHand);

    if (playerHand < 21) {
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>The computer has drawn a second card but it remains face down. <br>The computer's first card: ${compCards[0].name} of ${compCards[0].suit}<br><br>Enter 'h' if you would like to hit (get another card ➡️ add to your hand) OR <br>Enter 's' if you would like to stand (keep your current cards ➡️ play with your current hand)`;
    } else if (playerHand == 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You won! <br>Hit refresh to restart the game.`;
    } else if (playerHand > 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You lose!<br>Hit refresh to restart the game.`;
    }
    return myOutputValue;
  }

  // Drawing player 7th card
  if (gameMode == "playerHas6Card" && input == "h") {
    var playerNextCard = shuffledDeck.pop();
    playerCards.push(playerNextCard);
    gameMode = "playerHas7Card";

    playerHand =
      Number(playerCards[0].rank) +
      Number(playerCards[1].rank) +
      Number(playerCards[2].rank) +
      Number(playerCards[3].rank) +
      Number(playerCards[4].rank) +
      Number(playerCards[5].rank) +
      Number(playerCards[6].rank);

    console.log(playerHand);

    if (playerHand < 21) {
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>The computer has drawn a second card but it remains face down. <br>The computer's first card: ${compCards[0].name} of ${compCards[0].suit}<br><br>Enter 'h' if you would like to hit (get another card ➡️ add to your hand) OR <br>Enter 's' if you would like to stand (keep your current cards ➡️ play with your current hand)`;
    } else if (playerHand == 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You won! <br>Hit refresh to restart the game.`;
    } else if (playerHand > 21) {
      gameMode = "startGame";
      myOutputValue = `You've drawn another card! <br> You have ${playerCards.length} cards and the total value is ${playerHand}<br><br>You lose!<br>Hit refresh to restart the game.`;
    }
    return myOutputValue;
  }

  // Option 2: Stand (player DOES NOT draw anymore cards)
  // -> 'Flip up computer's face down card'

  if (
    (gameMode == "playerChoose" ||
      gameMode == "playerHas3Card" ||
      gameMode == "playerHas4Card" ||
      gameMode == "playerHas5Card" ||
      gameMode == "playerHas6Card" ||
      gameMode == "playerHas7Card") &&
    input == "s"
  ) {
    var counter = 0;
    console.log("codes running");
    while (counter < playerCards.length) {
      playerHand += Number(playerCards[counter].rank);
      console.log(playerHand);
      counter += 1;
    }
    console.log(playerHand);

    computerHand = Number(compCards[0].rank) + Number(compCards[1].rank);
    console.log(computerHand);

    // (1): If 16 or under, computer draws 3rd card -> go to (2), (3) or (4)
    if (computerHand <= 16) {
      console.log("scenario1");
      var comp3rdCard = shuffledDeck.pop();
      compCards.push(comp3rdCard);
      computerHand =
        Number(compCards[0].rank) +
        Number(compCards[1].rank) +
        Number(compCards[2].rank);
      console.log(computerHand);

      if (playerHand > computerHand || computerHand > 21) {
        console.log("this ran");
        gameMode = "startGame";
        myOutputValue = `The computer's total hand is ${computerHand}<br>Your hand is ${playerHand}. <br><br>You win!<br>Hit refresh to restart the game.`;
        return myOutputValue;
      }
      if (playerHand < computerHand && computerHand > 21) {
        console.log("this ran");
        gameMode = "startGame";
        myOutputValue = `The computer's total hand is ${computerHand}<br>Your hand is ${playerHand}. <br><br>You win!<br>Hit refresh to restart the game.`;
        return myOutputValue;
      }
      if (playerHand < computerHand) {
        console.log("this ran");
        gameMode = "startGame";
        myOutputValue = `The computer's total hand is ${computerHand}<br>Your hand is ${playerHand}. <br><br>You lose!<br>Hit refresh to restart the game.`;
        return myOutputValue;
      }
    }

    // (2): If computer hand 21 and over, USER wins
    if (computerHand > 21) {
      console.log("scenario2");
      myOutputValue = `The computer's total hand is ${computerHand}<br>Your hand is ${playerHand}. <br><br>You win!<br>Hit refresh to restart the game.`;
      return myOutputValue;
    }

    // (3): If computer hand is 21, computer wins
    if (computerHand == 21) {
      console.log("scenario3");
      myOutputValue = `The computer's total hand is ${computerHand}<br>Your hand is ${playerHand}. <br><br>You lose!<br>Hit refresh to restart the game.`;
      return myOutputValue;
    }

    // (4): If 17 or higher, computer stays with the hand (comp only has 2 cards)
    if (computerHand >= 17) {
      console.log("scenario4");
      // - if player hands > computer hands, USER wins
      if (playerHand > computerHand) {
        gameMode = "startGame";
        myOutputValue = `The computer's total hand is ${computerHand}<br>Your hand is ${playerHand}. <br><br>You win!<br>Hit refresh to restart the game.`;
        // - if computer hands > player hands, COMPUTER wins
      } else if (playerHand < computerHand) {
        gameMode = "startGame";
        myOutputValue = `The computer's total hand is ${computerHand}<br>Your hand is ${playerHand}. <br><br>You lose!<br>Hit refresh to restart the game.`;
      }
      return myOutputValue;
    }
  }
};
