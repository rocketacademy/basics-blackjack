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

// Input array of cards and output total score of card
var countScore = function (cardArray) {
  var counter = 0;
  var cardScore = 0;
  while (counter < cardArray.length) {
    if (cardArray[counter].rank >= 10) {
      cardArray[counter].rank = 10;
    }
    cardScore = cardScore + cardArray[counter].rank;
    counter += 1;
  }
  return cardScore;
};

// 6. The user's cards are analysed for winning or losing conditions. Take in arrays of user and computer card. Tally score and output win/lose message.
var compareWinner = function (userArray, compArray) {
  var userCardScore = countScore(userArray);
  var compCardScore = countScore(compArray);

  //Output win/lose message based on scoring matrix
  var outputMessage = `Player scored ${userCardScore} and Computer scored ${compCardScore}<br><br>`;
  if (userCardScore >= 22 && compCardScore <= 21) {
    outputMessage = outputMessage + "Player Busto! You lose!";
  } else if (compCardScore >= 22 && userCardScore <= 21) {
    outputMessage = outputMessage + "Computer Busto! You win!";
  } else if (userCardScore >= 22 && compCardScore >= 22) {
    outputMessage = outputMessage + "Player and computer Busto! It's a draw!";
  } else if (userCardScore > compCardScore) {
    outputMessage = outputMessage + "You scored closer to 21! You win!";
  } else if (compCardScore > userCardScore) {
    outputMessage = outputMessage + "Computer scored closer to 21! You lose!";
  } else if (userCardScore == compCardScore) {
    outputMessage = outputMessage + "It's a draw!";
  }

  return outputMessage;
};
var convertCardArrayToList = function (cardArray) {
  var counter = 0;
  var outputMessage = "";
  while (counter < cardArray.length) {
    outputMessage =
      outputMessage +
      `<br>${cardArray[counter].name} of ${cardArray[counter].suit}`;
    counter += 1;
  }
  return outputMessage;
};

//Define global variables
var gameMode = "game start";
var shuffledDeck = [];
var userCards = [];
var computerCards = [];

var main = function (input) {
  var myOutputValue = "Game time! Click submit to deal!";
  // 2. User clicks Submit to deal 2 cards to each player.
  if (gameMode == "game start") {
    // 1. Deck is shuffled.
    shuffledDeck = shuffleCards(makeDeck());
    console.log(shuffledDeck);
    userCards = [];
    computerCards = [];
    userCards.push(shuffledDeck.pop());
    userCards.push(shuffledDeck.pop());
    computerCards.push(shuffledDeck.pop());
    computerCards.push(shuffledDeck.pop());
    console.log(userCards);
    console.log(computerCards);
    gameMode = "check and show cards";
    return myOutputValue;
  }

  if (gameMode == "check and show cards") {
    // 3. The cards are analysed for game winning conditions, e.g. Blackjack.

    if (
      (userCards[0].name == "ace" && userCards[1].rank >= 10) ||
      (userCards[1].name == "ace" && userCards[0].rank >= 10)
    ) {
      gameMode = "game start";
      myOutputValue = `you drew a ${userCards[0].name} of ${userCards[0].suit} and a ${userCards[1].name} of ${userCards[1].suit}. Blackjack! You win!<br><br> Click submit to play again!`;
      return myOutputValue;
    } else if (
      (computerCards[0].name == "ace" && computerCards[1].rank >= 10) ||
      (computerCards[1].name == "ace" && computerCards[0].rank >= 10)
    ) {
      gameMode = "game start";
      myOutputValue = `you drew a ${userCards[0].name} of ${userCards[0].suit} and a ${userCards[1].name} of ${userCards[1].suit}. <br><br> Computer drew a ${computerCards[0].name} of ${computerCards[0].suit} and a ${computerCards[1].name} of ${computerCards[1].suit}.Blackjack to computer, you lose!<br><br> Click submit to play again!`;
      return myOutputValue;
    }
    // 4. The cards are displayed to the user
    else
      myOutputValue = `you drew a ${userCards[0].name} of ${userCards[0].suit} and a ${userCards[1].name} of ${userCards[1].suit}. <br><br> Type "hit" to draw another card or "stand" if you are happy with what you have!`;
    gameMode = "hit or stand"; //change later to hit/stand
    return myOutputValue;
  }

  // 5. The user decides whether to hit or stand, using the submit button to submit their choice.

  if (gameMode == "hit or stand") {
    if (input == "hit") {
      var newCard = shuffledDeck.pop();
      userCards.push(newCard);
      myOutputValue = `you drew a ${newCard.name} of ${newCard.suit}! Type "hit" to draw another card or "stand" if you are happy with what you have! <br><br>You have drawn:`;
      myOutputValue = myOutputValue + convertCardArrayToList(userCards);
      return myOutputValue;
    } else if (input == "stand") {
      gameMode = "determine winner";
    } else {
      return 'Please input "hit" or "stand"!';
    }

    // The computer decides to hit or stand automatically based on game rules. Computer will keep drawing if it has 15 points or below.
    while (countScore(computerCards) <= 15) {
      computerCards.push(shuffledDeck.pop());
      console.log(computerCards);
    }
  }

  // The game either ends or continues.

  if (gameMode == "determine winner") {
    myOutputValue = compareWinner(userCards, computerCards);
    gameMode = "game start";
    return (
      myOutputValue +
      `<br><br>You have drawn:${convertCardArrayToList(
        userCards
      )}<br><br> Computer has drawn:${convertCardArrayToList(computerCards)}` +
      " <br><br>Click submit to play again!"
    );
  }
};
