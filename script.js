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

// Input array of cards and output total score of card.
var countScore = function (cardArray) {
  var counter = 0;
  var cardScore = 0;
  var numofAces = 0;
  while (counter < cardArray.length) {
    if (cardArray[counter].rank >= 10) {
      cardArray[counter].rank = 10;
    }
    if (cardArray[counter].rank == 1) {
      cardScore += 11;
      numofAces += 1;
    } else cardScore = cardScore + cardArray[counter].rank;
    counter += 1;
  }
  //Aces are counted as 11 unless the player busts, then they are counted as 1.
  while (cardScore > 21 && numofAces >= 1) {
    cardScore -= 10;
    numofAces -= 1;
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
    outputMessage =
      outputMessage +
      `Player Busto! You lose $${currentBetAmount[currentPlayerNum]}!`;
    playerWallet[currentPlayerNum] -= currentBetAmount[currentPlayerNum];
  } else if (compCardScore >= 22 && userCardScore <= 21) {
    outputMessage =
      outputMessage +
      `Computer Busto! You win $${currentBetAmount[currentPlayerNum]}!`;
    playerWallet[currentPlayerNum] += currentBetAmount[currentPlayerNum];
  } else if (userCardScore >= 22 && compCardScore >= 22) {
    outputMessage = outputMessage + "Player and computer Busto! It's a draw!";
  } else if (userCardScore > compCardScore) {
    outputMessage =
      outputMessage +
      `You scored closer to 21! You win $${currentBetAmount[currentPlayerNum]}!`;
    playerWallet[currentPlayerNum] += currentBetAmount[currentPlayerNum];
  } else if (compCardScore > userCardScore) {
    outputMessage =
      outputMessage +
      `Computer scored closer to 21! You lose $${currentBetAmount[currentPlayerNum]}!`;
    playerWallet[currentPlayerNum] -= currentBetAmount[currentPlayerNum];
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
var userCards1 = [];
var userCards2 = [];
var userCards3 = [];
var computerCards = [];
var numOfPlayers = 0;
var playerWallet = [100, 100, 100];
var currentBetAmount = [0, 0, 0];
var currentPlayerNum = 0;
var myOutputValue = "";

var main = function (input) {
  if (gameMode == "game start") {
    myOutputValue = "Game time! Enter the number of players! (up to 3)";
    gameMode = "enter num of players";
    return myOutputValue;
  }

  if (gameMode == "enter num of players") {
    if (input == 1 || input == 2 || input == 3) {
      numOfPlayers = input;
      gameMode = "deal cards";
      return `Player 1, you now have $${playerWallet[0]}. Key in your bet and hit submit to begin your game!`;
    } else return "Enter the number of players! (up to 3)";
  }
  if (gameMode == "deal cards") {
    // 2. User clicks Submit to deal 2 cards to each player.
    // 1. Deck is shuffled.
    shuffledDeck = shuffleCards(makeDeck());
    console.log(shuffledDeck);
    currentPlayerNum = 0;
    userCards1 = [];
    userCards2 = [];
    userCards3 = [];
    computerCards = [];
    userCards1.push(shuffledDeck.pop());
    userCards1.push(shuffledDeck.pop());
    console.log(userCards1);
    if (numOfPlayers >= 2) {
      userCards2.push(shuffledDeck.pop());
      userCards2.push(shuffledDeck.pop());
      console.log(userCards2);
    }
    if (numOfPlayers == 3) {
      userCards3.push(shuffledDeck.pop());
      userCards3.push(shuffledDeck.pop());
      console.log(userCards3);
    }
    computerCards.push(shuffledDeck.pop());
    computerCards.push(shuffledDeck.pop());
    console.log(computerCards);
    gameMode = "enter bet 1";
  }

  // if (gameMode == "score board") {
  //   myOutputValue = `Scoreboard!:<br>Player 1: $${playerWallet[0]} <br>`;
  //   if (numOfPlayers >= 2) {
  //     myOutputValue += `Player 2: $${playerWallet[1]} <br>`;
  //   }
  //   if (numOfPlayers >= 3) {
  //     myOutputValue += `Player 3: $${playerWallet[2]} <br>`;
  //   }
  //   gameMode = "deal cards";
  //   return myOutputValue;
  // }

  if (gameMode == "enter bet 1") {
    if (input > playerWallet[0] || input < 1) {
      return `Player 1, you now have $${playerWallet[0]}. Key in your bet and hit submit to begin your game!`;
    } else {
      gameMode = "check and show cards 1";
      currentBetAmount[0] = Number(input);
    }
  }

  if (gameMode == "check and show cards 1") {
    // 3. The cards are analysed for game winning conditions, e.g. Blackjack.

    if (
      (userCards1[0].name == "ace" && userCards1[1].rank >= 10) ||
      (userCards1[1].name == "ace" && userCards1[0].rank >= 10)
    ) {
      if (numOfPlayers == 1) {
        gameMode = "deal cards";
      } else {
        gameMode = "check and show cards 2";
      }
      playerWallet[0] += currentBetAmount[0] * 2;
      myOutputValue = `Player 1, you drew a ${userCards1[0].name} of ${
        userCards1[0].suit
      } and a ${userCards1[1].name} of ${
        userCards1[1].suit
      }. Blackjack! You win $${
        currentBetAmount[0] * 2
      }!<br><br> Click submit to continue!`;
      return myOutputValue;
    } else if (
      (computerCards[0].name == "ace" && computerCards[1].rank >= 10) ||
      (computerCards[1].name == "ace" && computerCards[0].rank >= 10)
    ) {
      gameMode = "deal cards";
      playerWallet[0] -= currentBetAmount[0] * 2;
      playerWallet[1] -= currentBetAmount[1] * 2;
      playerWallet[2] -= currentBetAmount[2] * 2;
      myOutputValue = `Player 1, you drew a ${userCards1[0].name} of ${
        userCards1[0].suit
      } and a ${userCards1[1].name} of ${
        userCards1[1].suit
      }. <br><br> Computer drew a ${computerCards[0].name} of ${
        computerCards[0].suit
      } and a ${computerCards[1].name} of ${
        computerCards[1].suit
      }.Blackjack to computer, you lose $${
        currentBetAmount[0] * 2
      }!<br><br> Click submit to continue!`;
      return myOutputValue;
    }
    // 4. The cards are displayed to the user
    else
      myOutputValue = `Player 1, you drew a ${userCards1[0].name} of ${userCards1[0].suit} and a ${userCards1[1].name} of ${userCards1[1].suit}. <br><br> Type "hit" to draw another card or "stand" if you are happy with what you have!`;
    gameMode = "hit or stand 1";
    return myOutputValue;
  }

  // 5. The user decides whether to hit or stand, using the submit button to submit their choice.

  while (countScore(computerCards) <= 16) {
    computerCards.push(shuffledDeck.pop());
    console.log(computerCards);
  }

  if (gameMode == "hit or stand 1") {
    if (input == "hit") {
      var newCard = shuffledDeck.pop();
      userCards1.push(newCard);
      myOutputValue = `Player 1, you drew a ${newCard.name} of ${newCard.suit}! Type "hit" to draw another card or "stand" if you are happy with what you have! <br><br>You have drawn:`;
      myOutputValue = myOutputValue + convertCardArrayToList(userCards1);
      return myOutputValue;
    } else if (input == "stand") {
      myOutputValue =
        compareWinner(userCards1, computerCards) +
        `<br><br>You have drawn:${convertCardArrayToList(
          userCards1
        )}<br><br> Computer has drawn:${convertCardArrayToList(
          computerCards
        )}` +
        " <br><br>Click submit to continue!";

      if (numOfPlayers == 1) {
        gameMode = "deal cards";
      } else {
        gameMode = "enter bet 2";
      }
      return myOutputValue;
    } else {
      return 'Please input "hit" or "stand"!';
    }
  }

  if (gameMode == "enter bet 2") {
    if (input > playerWallet[1] || input < 1) {
      return `Player 2, you now have $${playerWallet[1]}. Key in your bet and hit submit to begin your game!`;
    } else {
      gameMode = "check and show cards 2";
      currentBetAmount[1] = Number(input);
    }
  }

  if (gameMode == "check and show cards 2") {
    if (
      (userCards2[0].name == "ace" && userCards2[1].rank >= 10) ||
      (userCards2[1].name == "ace" && userCards2[0].rank >= 10)
    ) {
      if (numOfPlayers == 2) {
        gameMode = "deal cards";
      } else {
        gameMode = "check and show cards 3";
      }
      playerWallet[1] += currentBetAmount[1] * 2;
      myOutputValue = `Player 2, you drew a ${userCards2[0].name} of ${
        userCards2[0].suit
      } and a ${userCards2[1].name} of ${
        userCards2[1].suit
      }. Blackjack! You win $${
        currentBetAmount[1] * 2
      }!<br><br> Click submit to continue!`;
      return myOutputValue;
    } else
      myOutputValue = `Player 2, you drew a ${userCards2[0].name} of ${userCards2[0].suit} and a ${userCards2[1].name} of ${userCards2[1].suit}. <br><br> Type "hit" to draw another card or "stand" if you are happy with what you have!`;
    gameMode = "hit or stand 2";
    return myOutputValue;
  }

  if (gameMode == "hit or stand 2") {
    if (input == "hit") {
      var newCard = shuffledDeck.pop();
      userCards2.push(newCard);
      myOutputValue = `Player 2, you drew a ${newCard.name} of ${newCard.suit}! Type "hit" to draw another card or "stand" if you are happy with what you have! <br><br>You have drawn:`;
      myOutputValue = myOutputValue + convertCardArrayToList(userCards2);
      return myOutputValue;
    } else if (input == "stand") {
      currentPlayerNum += 1;
      myOutputValue =
        compareWinner(userCards2, computerCards) +
        `<br><br>You have drawn:${convertCardArrayToList(
          userCards2
        )}<br><br> Computer has drawn:${convertCardArrayToList(
          computerCards
        )}` +
        " <br><br>Click submit to continue!";

      if (numOfPlayers == 2) {
        gameMode = "deal cards";
      } else {
        gameMode = "enter bet 3";
      }
      return myOutputValue;
    } else {
      return 'Please input "hit" or "stand"!';
    }
  }

  if (gameMode == "enter bet 3") {
    if (input > playerWallet[2] || input < 1) {
      return `Player 3, you now have $${playerWallet[2]}. Key in your bet and hit submit to begin your game!`;
    } else {
      gameMode = "check and show cards 3";
      currentBetAmount[2] = Number(input);
    }
  }

  if (gameMode == "check and show cards 3") {
    if (
      (userCards3[0].name == "ace" && userCards3[1].rank >= 10) ||
      (userCards3[1].name == "ace" && userCards3[0].rank >= 10)
    ) {
      gameMode = "deal cards";
      playerWallet[2] += currentBetAmount[2] * 2;
      myOutputValue = `Player 3, you drew a ${userCards3[0].name} of ${
        userCards3[0].suit
      } and a ${userCards3[1].name} of ${
        userCards3[1].suit
      }. Blackjack! You win $${
        currentBetAmount[2] * 2
      }!<br><br> Click submit to continue!`;
      return myOutputValue;
    }
    // 4. The cards are displayed to the user
    else
      myOutputValue = `Player 3, you drew a ${userCards3[0].name} of ${userCards3[0].suit} and a ${userCards3[1].name} of ${userCards3[1].suit}. <br><br> Type "hit" to draw another card or "stand" if you are happy with what you have!`;
    gameMode = "hit or stand 3";
    return myOutputValue;
  }

  if (gameMode == "hit or stand 3") {
    if (input == "hit") {
      var newCard = shuffledDeck.pop();
      userCards3.push(newCard);
      myOutputValue = `Player 3, you drew a ${newCard.name} of ${newCard.suit}! Type "hit" to draw another card or "stand" if you are happy with what you have! <br><br>You have drawn:`;
      myOutputValue = myOutputValue + convertCardArrayToList(userCards3);
      return myOutputValue;
    } else if (input == "stand") {
      currentPlayerNum += 1;
      myOutputValue =
        compareWinner(userCards3, computerCards) +
        `<br><br>You have drawn:${convertCardArrayToList(
          userCards3
        )}<br><br> Computer has drawn:${convertCardArrayToList(
          computerCards
        )}` +
        " <br><br>Click submit to continue!";
      gameMode = "deal cards";
    }
    return myOutputValue;
  } else {
    return 'Please input "hit" or "stand"!';
  }
};
