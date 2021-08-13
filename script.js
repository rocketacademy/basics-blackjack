// rules: there are only two players - player and computer
// game starts with shuffling cards
// deal two cards to player
// deal two cards to computer
// ace = 1 or 11, jack queen king = 10, 2 to 9 are face value
// computer is dealer. dealer has to draw card if their hand is below 17
// player will choose to hit or stand first, player can draw as many cards as they want
// if player gets 21, player wins immediately
// if player busts, player loses immediately
// computer goes ahead to hit or stand after player is done
// the one with a score closer to 21 wins

// set current game mode start the game
// define all global variables
var currentGameMode = "welcome";
var playerHand = [];
var computerHand = [];
var playerScore = 0;
var computerScore = 0;
var playerCardIndex = 2;
var playerName = "";

// function to check player name
var checkPlayerName = function (input) {
  playerName = input;

  if (input == "") {
    myOutputValue = `Hey you gotta type in a name!`;
  } else {
    myOutputValue = `Welcome, ${playerName}! Let's play Blackjack!<br>
  Click Submit to shuffle and deal cards!`;
    currentGameMode = "game starts";
  }
  return myOutputValue;
};

// function to make card deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    var cardPoint = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardPoint = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      if (cardName == "ace") {
        cardPoint = 1;
      } else if (cardName == "jack") {
        cardPoint = 10;
      } else if (cardName == "queen") {
        cardPoint = 10;
      } else if (cardName == "king") {
        cardPoint = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        point: cardPoint,
      };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// function to shuffle cards
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

// create shuffled deck as global variable
var shuffledCardDeck = shuffleCards(makeDeck());

// function to deal cards
var dealCards = function () {
  playerHand.push(shuffledCardDeck.pop(), shuffledCardDeck.pop());
  computerHand.push(shuffledCardDeck.pop(), shuffledCardDeck.pop());

  console.log("computer card 1");
  console.log(computerHand[0].name);
  console.log("computer card 2");
  console.log(computerHand[1].name);

  playerScore = playerHand[0].point + playerHand[1].point;
  myOutputValue = `Computer's hand is a secret for now, but you've got<br>
    Card 1: ${playerHand[0].name} of ${playerHand[0].suit}<br>
    Card 2: ${playerHand[1].name} of ${playerHand[1].suit}<br>`;
  // if player gets ace + picture card = blackjack
  if (
    (playerHand[0].name == "ace" && playerHand[1].point == 10) ||
    (playerHand[1].name == "ace" && playerHand[0].point == 10)
  ) {
    playerScore = playerScore + 10;
    myOutputValue =
      myOutputValue +
      `21 points! Nice! You won, ${playerName}! 😀<br>
    Refresh the page to play again!`;
  } else if (playerScore < 21) {
    myOutputValue =
      myOutputValue + `${playerName}, would you like to hit or stand? 😎`;
  }
  return myOutputValue;
};

// function to check computer hand to hit or stand
var checkComputerHand = function () {
  computerScore = computerHand[0].point + computerHand[1].point;
  if (computerScore >= 17) {
    if (computerScore >= 17 && computerScore < 21) {
      return "computer stand >= 17";
    }
  } else if (computerScore < 17) {
    if (
      (computerHand[0].name == "ace" && computerHand[1].point == 10) ||
      (computerHand[1].name == "ace" && computerHand[0].point == 10)
    ) {
      computerScore = computerScore + 10;
      return `computer blackjack`;
    }
    for (cardIndex = 2; computerScore < 17; cardIndex += 1) {
      computerHand.push(shuffledCardDeck.pop());
      console.log("computer extra card");
      console.log(computerHand[cardIndex].name);
      computerScore = computerScore + computerHand[cardIndex].point;
    }
    if (computerScore > 21) {
      return `computer bust after hitting`;
    } else {
      return `computer stand after hitting`;
    }
  }
};

// function to check player hand to allow player to hit or stand
var checkPlayerHand = function (input) {
  if (playerCardIndex == 2 && input == "hit") {
    playerHand.push(shuffledCardDeck.pop());

    playerScore = playerScore + playerHand[playerCardIndex].point;
    myOutputValue = `You chose to hit, your cards are now<br>
    Card 1: ${playerHand[0].name} of ${playerHand[0].suit}<br>
    Card 2: ${playerHand[1].name} of ${playerHand[1].suit}<br>
    Card ${playerCardIndex + 1}: ${playerHand[playerCardIndex].name} of ${
      playerHand[playerCardIndex].suit
    }.<br>
    Your current score is ${playerScore}.<br>`;

    if (playerScore == 21) {
      myOutputValue =
        myOutputValue +
        `21 points! Nice! You won, ${playerName}! 😀<br>
    Refresh the page to play again!`;
    } else if (playerScore < 21) {
      myOutputValue =
        myOutputValue + `${playerName}, would you like to hit or stand? 😎`;
    } else {
      myOutputValue =
        myOutputValue +
        `Oh no, you bust 😖<br>
        You lost, ${playerName}!<br>
    Refresh the page to play again!`;
    }
    playerCardIndex += 1;
    return myOutputValue;
  }

  if (playerCardIndex == 3 && input == "hit") {
    playerHand.push(shuffledCardDeck.pop());
    playerScore = playerScore + playerHand[playerCardIndex].point;
    myOutputValue = `You chose to hit, your cards are now<br>
    Card 1: ${playerHand[0].name} of ${playerHand[0].suit}<br>
    Card 2: ${playerHand[1].name} of ${playerHand[1].suit}<br>
    Card 3: ${playerHand[2].name} of ${playerHand[2].suit}<br>
    Card ${playerCardIndex + 1}: ${playerHand[playerCardIndex].name} of ${
      playerHand[playerCardIndex].suit
    }.<br>
    Your current score is ${playerScore}.<br>`;
    if (playerScore == 21) {
      myOutputValue =
        myOutputValue +
        `21 points! Nice! You won, ${playerName}! 😀<br>
    Refresh the page to play again!`;
    } else if (playerScore < 21) {
      myOutputValue =
        myOutputValue + `${playerName}, would you like to hit or stand? 😎`;
    } else {
      myOutputValue =
        myOutputValue +
        `Oh no, you bust 😖<br>
        You lost, ${playerName}!<br>
    Refresh the page to play again!`;
    }
    playerCardIndex += 1;
    return myOutputValue;
  }

  if (playerCardIndex == 4 && input == "hit") {
    playerHand.push(shuffledCardDeck.pop());
    playerScore = playerScore + playerHand[playerCardIndex].point;
    myOutputValue = `You chose to hit, your cards are now<br>
    Card 1: ${playerHand[0].name} of ${playerHand[0].suit}<br>
    Card 2: ${playerHand[1].name} of ${playerHand[1].suit}<br>
    Card 3: ${playerHand[2].name} of ${playerHand[2].suit}<br>
    Card 4: ${playerHand[3].name} of ${playerHand[3].suit}<br>
    Card ${playerCardIndex + 1}: ${playerHand[playerCardIndex].name} of ${
      playerHand[playerCardIndex].suit
    }.<br>
    Your current score is ${playerScore}.<br>`;
    if (playerScore == 21) {
      myOutputValue =
        myOutputValue +
        `21 points! Nice! You won, ${playerName}! 😀<br>
    Refresh the page to play again!`;
    } else if (playerScore < 21) {
      myOutputValue =
        myOutputValue + `${playerName}, would you like to hit or stand? 😎`;
    } else {
      myOutputValue =
        myOutputValue +
        `Oh no, you bust 😖<br>
        You lost, ${playerName}!<br>
        Refresh the page to play again!`;
    }
    playerCardIndex += 1;
    return myOutputValue;
  }

  if (playerCardIndex == 5 && input == "hit") {
    playerHand.push(shuffledCardDeck.pop());
    playerScore = playerScore + playerHand[playerCardIndex].point;
    myOutputValue = `You chose to hit, your cards are now<br>
    Card 1: ${playerHand[0].name} of ${playerHand[0].suit}<br>
    Card 2: ${playerHand[1].name} of ${playerHand[1].suit}<br>
    Card 3: ${playerHand[2].name} of ${playerHand[2].suit}<br>
    Card 4: ${playerHand[3].name} of ${playerHand[3].suit}<br>
    Card 5: ${playerHand[4].name} of ${playerHand[4].suit}<br>
    Card ${playerCardIndex + 1}: ${playerHand[playerCardIndex].name} of ${
      playerHand[playerCardIndex].suit
    }.<br>
    Your current score is ${playerScore}.<br>`;
    if (playerScore == 21) {
      myOutputValue =
        myOutputValue +
        `21 points! Nice! You won, ${playerName}!😀<br>
    Refresh the page to play again!`;
    } else if (playerScore < 21) {
      myOutputValue =
        myOutputValue + `${playerName}, would you like to hit or stand? 😎`;
    } else {
      myOutputValue =
        myOutputValue +
        `Oh no, you bust 😖<br>
        You lost, ${playerName}!<br>
        Refresh the page to play again!`;
    }
    playerCardIndex += 1;
    return myOutputValue;
  }

  if (input == "stand") {
    myOutputValue = `You chose to stand.<br>
    Your final score is ${playerScore}.<br>
    Click Submit again to see who won! 😏`;
    currentGameMode = "reveal winner";
    return myOutputValue;
  }

  if (input != "hit" && input != "stand") {
    return `Hey ${playerName}, please only input either "hit" or "stand" 😬`;
  }
};

//function to compare final player and computer scores if player doesn't win immediately and both don't bust
var compareScores = function () {
  var checkComputerScore = checkComputerHand();

  if (checkComputerScore == "computer bust after hitting") {
    myOutputValue = `Computer bust! You win!😀<br>
  Computer's final score is ${computerScore} and your final score is ${playerScore}. Congrats, ${playerName}!<br>
  Refresh the page to play again!`;
    return myOutputValue;
  }

  if (
    checkComputerScore == "computer stand >= 17" ||
    checkComputerScore == "computer stand after hitting" ||
    checkComputerScore == "computer blackjack"
  ) {
    myOutputValue = `Computer's score is ${computerScore}<br>
    Your score is ${playerScore}.<br>`;

    if (computerScore > playerScore) {
      myOutputValue =
        myOutputValue +
        `Computer won! You lost, ${playerName} 😖<br>
  Refresh the page to play again!`;
    } else if (playerScore > computerScore) {
      myOutputValue =
        myOutputValue +
        `You won, ${playerName}! Computer lost 😀<br>
  Refresh the page to play again!`;
    } else {
      myOutputValue =
        myOutputValue +
        `It's a tie! 😮<br>
  Refresh the page to play again!`;
    }
    return myOutputValue;
  }
};

// main function
var main = function (input) {
  var myOutputValue = "";

  if (currentGameMode == "welcome") {
    currentGameMode = "input player name";
    return "Welcome to Blackjack! What's your name? 😀";
  }

  if (currentGameMode == "input player name") {
    myOutputValue = checkPlayerName(input);
    return myOutputValue;
  }

  if (currentGameMode == "game starts") {
    currentGameMode = "waiting player input";
    myOutputValue = dealCards();
    return myOutputValue;
  }

  if (currentGameMode == "waiting player input") {
    myOutputValue = checkPlayerHand(input);
    return myOutputValue;
  }

  if (currentGameMode == "reveal winner") {
    myOutputValue = compareScores();
    return myOutputValue;
  }
};
