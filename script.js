// var hardCodedDeck = [
//   {
//     name: "Ace",
//     suits: "hearts",
//     score: 1,
//   },
//   {
//     name: "10",
//     suits: "Hearts",
//     score: 10,
//   },
//   {
//     name: "Jack",
//     suits: "Hearts",
//     score: 10,
//   },
//   {
//     name: "Queen",
//     suits: "Hearts",
//     score: 10,
//   },
//   {
//     name: "King",
//     suits: "Hearts",
//     score: 10,
//   },
// ];
// console.log(hardCodedDeck);
// shuffledDeck = shuffleCards(hardCodedDeck);
var deck = [];
var shuffledDeck;
var gameBustScore = 22;
var gameMode = "shuffled cards";
var numberOfCardsToDrawForComputer;
// var computerCardDeck = [
//   {
//     name: "Ace",
//     suits: "Hearts",
//     score: 1,
//   },
//   {
//     name: "2",
//     suits: "Hearts",
//     score: 2,
//   },
//   {
//     name: "3",
//     suits: "Hearts",
//     score: 3,
//   },
//   {
//     name: "10",
//     suits: "Hearts",
//     score: 10,
//   },
// ];
var computerCardDeck = [];
var doesComputerCardDeckHaveAce = false;
var numberOfAceComputerCardDeckHave = 0;
var computerCurrentCardScore = 0;
var numberOfCardsToDrawForPlayer;
// var playerCardDeck = [
//   {
//     name: "Ace",
//     suits: "Hearts",
//     score: 1,
//   },
//   {
//     name: "4",
//     suits: "Hearts",
//     score: 4,
//   },
//   {
//     name: "5",
//     suits: "Hearts",
//     score: 5,
//   },
//   {
//     name: "10",
//     suits: "Hearts",
//     score: 10,
//   },
// ];
// when HARD code, comment out below and use above
var playerCardDeck = [];
var doesPlayerCardDeckHaveAce = false;
var numberOfAcePlayerCardDeckHave = 0;
var playerCurrentCardScore = 0;

// cards 2 through 10 are scored using their face value
// jack, queen and king are scored 10
// ace can be scored 1 or 11

var playerMain = function (input) {
  var myOutputValue = "playerMain";
  var inputLowerCase = input.toLowerCase();

  if (gameMode == "shuffled cards") {
    makeDeck();
    shuffledDeck = shuffleCards(deck);
    gameMode = "compare card score";
    // console.log(shuffledDeck);
  }

  if (gameMode == "compare card score") {
    // assign 2 cards to computer
    numberOfCardsToDrawForComputer = 2;
    for (let i = 0; i < numberOfCardsToDrawForComputer; i++) {
      var currentCard = shuffledDeck.pop();
      computerCardDeck.push(currentCard);
      // when HARD CODE, comment out .push & use the following
      // currentCard = computerCardDeck[i];
      doesComputerCardDeckHaveAce = checkForAce(currentCard, "computerTurn");
    }

    // assign 2 cards to player
    numberOfCardsToDrawForPlayer = 2;
    for (let i = 0; i < numberOfCardsToDrawForPlayer; i++) {
      var currentCard = shuffledDeck.pop();
      playerCardDeck.push(currentCard);
      // when HARD CODE, comment out .push & use the following
      // currentCard = playerCardDeck[i];
      doesPlayerCardDeckHaveAce = checkForAce(currentCard, "playerTurn");
    }

    calculateComputerScore(numberOfCardsToDrawForComputer);
    calculatePlayerScore(numberOfCardsToDrawForPlayer);

    // playerCurrentCardScore = 21;
    // computerCurrentCardScore = 25;

    // in the event player reaches 21 with 2 cards, i.e. ACE + JACK/QUEEN/KING, declare player as winner
    if (playerCurrentCardScore == 21) {
      // if computer score less than 21, prompt computer to draw
      if (computerCurrentCardScore < 21) {
        myOutputValue =
          playerCardMessage() +
          "<br><br>" +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          "<br><br>" +
          promptComputerDrawCardMessage();
        gameMode = "await dealer hit or stand";
        return myOutputValue;
      }
      // if computer score more than 21, show player won message
      if (computerCurrentCardScore > 21) {
        myOutputValue =
          messageWhenPlayerHit21ComputerHitMoreThan21() +
          "<br><br>" +
          resetGameMessage();
        gameMode = "end of game submit to restart";
        return myOutputValue;
      }
      // if computer score also equal 21, show tie message
      if (computerCurrentCardScore == 21) {
        myOutputValue = checkWhoWon();
        gameMode = "end of game submit to restart";
        return myOutputValue;
      }
    } else {
      // in the event player didn't reach 21 with 2 cards, i.e. ACE + JACK/QUEEN/KING, proceed to prompt to submit "hit" or "stand"
      gameMode = "1st prompt player to hit or stand";
    }
  }

  if (gameMode == "1st prompt player to hit or stand") {
    myOutputValue =
      playerCardMessage() +
      "<br><br>" +
      playerScoreMessage() +
      "<br><br>" +
      promptPlayerDrawCardMessage();
    gameMode = "await player hit or stand";
    return myOutputValue;
  }

  if (gameMode == "await player hit or stand") {
    if (
      inputLowerCase != "hit" &&
      inputLowerCase != "stand" &&
      inputLowerCase == ""
    ) {
      myOutputValue =
        promptErrorDrawCardMessage() +
        "<br><br>" +
        playerCardMessage() +
        "<br><br>" +
        playerScoreMessage() +
        "<br><br>" +
        promptPlayerDrawCardMessage();
      return myOutputValue;
    }

    // if player stand, calculate player score
    if (inputLowerCase == "stand") {
      // check if computer score bust, i.e. 22 & above, if yes, display player won
      // this bust logic section must be before the other sections
      if (computerCurrentCardScore >= gameBustScore) {
        console.log("Yes, I expect this to happen when dealer bust.");
        myOutputValue =
          playerCardMessage() +
          "<br><br>" +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          "<br><br>" +
          computerBust21() +
          "<br><br>" +
          resetGameMessage();
        return myOutputValue;
      }
      // check if player score bigger than computer score, if yes, prompt dealer to draw
      if (playerCurrentCardScore >= computerCurrentCardScore) {
        myOutputValue =
          playerCardMessage() +
          "<br><br>" +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          "<br><br>" +
          promptComputerDrawCardMessage();
        gameMode = "await dealer hit or stand";
        return myOutputValue;
      }
      // check if player score bigger than computer score, if no, proceed to check who won
      if (playerCurrentCardScore < computerCurrentCardScore) {
        myOutputValue = checkWhoWon();
        gameMode = "end of game submit to restart";
        return myOutputValue;
      }
    }

    // determine if bust
    // if yes, display player lost
    // if no, set gameMode to await player hit or stand
    if (inputLowerCase == "hit") {
      // if player hit, assign 1 more card
      var currentCard = shuffledDeck.pop();
      // if HARD code, comment out .pop above and use the following
      // var currentCard = {
      //   name: "Ace",
      //   suits: "Hearts",
      //   score: 1,
      // };
      playerCardDeck.push(currentCard);
      doesPlayerCardDeckHaveAce = checkForAce(currentCard, "playerTurn");
      // calculate score
      numberOfCardsToDrawForPlayer = numberOfCardsToDrawForPlayer + 1;
      calculatePlayerScore(numberOfCardsToDrawForPlayer);

      // if score less than 21, gameMode = await player hit or stand
      if (playerCurrentCardScore < 21) {
        myOutputValue =
          playerCardMessage() +
          "<br><br>" +
          playerScoreMessage() +
          "<br><br>" +
          promptPlayerDrawCardMessage();
        gameMode = "await player hit or stand";
        console.log("<21");
        return myOutputValue;
      }

      // if score more than 21, display player lost, rest game
      if (playerCurrentCardScore > 21) {
        myOutputValue =
          playerCardMessage() +
          "<br><br>" +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          "<br><br>" +
          playerBust21() +
          "<br><br>" +
          resetGameMessage();
        gameMode = "end of game submit to restart";
        console.log(">21");
        return myOutputValue;
      }

      if (playerCurrentCardScore == 21) {
        myOutputValue =
          playerCardMessage() +
          "<br><br>" +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          "<br><br>" +
          promptComputerDrawCardMessage();
        gameMode = "await dealer hit or stand";
        console.log("==21");
        return myOutputValue;
      }
    }
  }

  if (gameMode == "end of game submit to restart") {
    return resetEntireGame();
  }

  console.log("Console's here!");
  consolelog();
  return myOutputValue;
};

var dealerMain = function (input) {
  var myOutputValue = "dealerMain";
  var inputLowerCase = input.toLowerCase();

  if (gameMode == "await dealer hit or stand") {
    if (
      inputLowerCase != "hit" &&
      inputLowerCase != "stand" &&
      inputLowerCase == ""
    ) {
      myOutputValue =
        promptErrorDrawCardMessage() +
        "<br><br>" +
        playerCardMessage() +
        "<br><br>" +
        playerScoreMessage() +
        "<br><br>" +
        computerCardMessage() +
        "<br><br>" +
        computerScoreMessage() +
        "<br><br>" +
        promptComputerDrawCardMessage();
      return myOutputValue;
    }

    // if computer stand, calculate score and display who won
    if (inputLowerCase == "stand") {
      myOutputValue = checkWhoWon();
      gameMode = "end of game submit to restart";
      return myOutputValue;
    }

    if (inputLowerCase == "hit") {
      // if computer hit, assign 1 more card
      var currentCard = shuffledDeck.pop();
      // var currentCard = {
      //   name: "Ace",
      //   suits: "Hearts",
      //   score: 1,
      // };
      computerCardDeck.push(currentCard);
      doesComputerCardDeckHaveAce = checkForAce(currentCard, "computerTurn");
      // calculate score
      numberOfCardsToDrawForComputer = numberOfCardsToDrawForComputer + 1;
      calculateComputerScore(numberOfCardsToDrawForComputer);

      // if 3rd card never BUST, gameMode = await dealer hit or stand
      if (computerCurrentCardScore <= 20) {
        myOutputValue =
          playerCardMessage() +
          "<br><br>" +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          "<br><br>" +
          promptComputerDrawCardMessage();
        gameMode = "await dealer hit or stand";
        console.log("<=20");
        return myOutputValue;
      }
      // if 3rd card never BUST and also 21, show tie message
      if (computerCurrentCardScore == 21) {
        myOutputValue = checkWhoWon();
        gameMode = "end of game submit to restart";
        console.log("==21");
        return myOutputValue;
      }

      // if 3rd card BUST, check if there's ACE
      // if 3rd card BUST, NO ACE
      // if 3rd card BUST, display player lost, rest game
      if (computerCurrentCardScore >= gameBustScore) {
        myOutputValue =
          playerCardMessage() +
          "<br><br>" +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          "<br><br>" +
          computerBust21() +
          "<br><br>" +
          resetGameMessage();
        gameMode = "end of game submit to restart";
        console.log(">= gameBustScore");
        return myOutputValue;
      }
    }
  }

  if (gameMode == "end of game submit to restart") {
    return resetEntireGame();
  }

  return myOutputValue;
};

var resetEntireGame = function () {
  deck = [];
  shuffledDeck = [];
  gameMode = "shuffled cards";
  numberOfCardsToDrawForComputer = 0;
  computerCardDeck = [];
  doesComputerCardDeckHaveAce = false;
  numberOfAceComputerCardDeckHave = 0;
  computerCurrentCardScore = 0;
  numberOfCardsToDrawForPlayer = 0;
  playerCardDeck = [];
  doesPlayerCardDeckHaveAce = false;
  numberOfAcePlayerCardDeckHave = 0;
  playerCurrentCardScore = 0;
  return "Game's been reset! Player, please click Submit to deal again.";
};

var resetGameMessage = function () {
  return "Good game! Play your next round by clicking the Player Submit button.";
};

var computerBust21 = function () {
  return "Dealer, you busted!";
};

var playerBust21 = function () {
  return "Player, you busted!";
};

var checkWhoWon = function () {
  if (computerCurrentCardScore < playerCurrentCardScore) {
    return (
      playerCardMessage() +
      "<br><br>" +
      playerScoreMessage() +
      "<br><br>" +
      computerCardMessage() +
      "<br><br>" +
      computerScoreMessage() +
      "<br><br>Player won!<br><br>" +
      resetGameMessage()
    );
  }

  if (computerCurrentCardScore > playerCurrentCardScore) {
    return (
      playerCardMessage() +
      "<br><br>" +
      playerScoreMessage() +
      "<br><br>" +
      computerCardMessage() +
      "<br><br>" +
      computerScoreMessage() +
      "<br><br>Dealer won!<br><br>" +
      resetGameMessage()
    );
  }

  if (computerCurrentCardScore == playerCurrentCardScore) {
    return (
      playerCardMessage() +
      "<br><br>" +
      playerScoreMessage() +
      "<br><br>" +
      computerCardMessage() +
      "<br><br>" +
      computerScoreMessage() +
      "<br><br>It's a tie!<br><br>" +
      resetGameMessage()
    );
  }
};

var promptComputerDrawCardMessage = function () {
  return "Dealer, would you like to draw 1 more card to your deck?<br><br>If yes, please input 'Hit'.<br><br>If not, please input 'Stand'.";
};

var computerScoreMessage = function () {
  // if (doesComputerCardDeckHaveAce && computerCurrentCardScore == 21) {
  //   return "Dealer's score: Won by Black Jack";
  // } else
  return "Dealer's score: " + computerCurrentCardScore;
};

var computerCardMessage = function () {
  let message = "Dealer hand: ";
  for (let i = 0; i < computerCardDeck.length; i++) {
    message =
      message +
      computerCardDeck[i].name +
      " of " +
      computerCardDeck[i].suits +
      ", ";
  }
  return message;
};

var promptErrorDrawCardMessage = function () {
  return "You have entered an unexpected input.";
};

var promptPlayerDrawCardMessage = function () {
  return "Player, would you like to draw 1 more card to your deck?<br><br>If yes, please input 'Hit'.<br><br>If not, please input 'Stand'.";
};

var playerScoreMessage = function () {
  // if (doesPlayerCardDeckHaveAce && playerCurrentCardScore == 21) {
  //   return "Player's score: Won by Black Jack";
  // } else
  return "Player's score: " + playerCurrentCardScore;
};

var playerCardMessage = function () {
  let message = "Player hand: ";
  for (let i = 0; i < playerCardDeck.length; i++) {
    message =
      message +
      playerCardDeck[i].name +
      " of " +
      playerCardDeck[i].suits +
      ", ";
  }
  return message;
};

var messageWhenPlayerHit21ComputerHitMoreThan21 = function () {
  return (
    playerCardMessage() +
    "<br><br>" +
    playerScoreMessage() +
    "<br><br>" +
    computerCardMessage() +
    "<br><br>" +
    computerScoreMessage() +
    "<br><br>Player won by Black Jack!"
  );
};

// version 2
var calculatePlayerScore = function (numberOfCardsToDraw) {
  playerCurrentCardScore = 0;
  // calculate player card score
  for (let i = 0; i < numberOfCardsToDraw; i++) {
    if (playerCardDeck[i].name == "Ace") {
      playerCardDeck[i].score = determineScoreOfAce(playerCurrentCardScore);
    }
    // original below
    // if player has ACE in 2 cards, score of ACE increase to 11
    // if (playerCardDeck[i].name == "Ace" && gameMode == "compare card score") {
    //   // playerCardDeck[i].score = 11;
    //   playerCardDeck[i].score = determineScoreOfAce(playerCurrentCardScore);
    // }

    playerCurrentCardScore = playerCurrentCardScore + playerCardDeck[i].score;
  }
};

// // version 1
// var calculatePlayerScore = function (numberOfCardsToDraw) {
//   playerCurrentCardScore = 0;
//   // calculate player card score
//   for (let i = 0; i < numberOfCardsToDraw; i++) {
//     // if player has ACE in 2 cards, score of ACE increase to 11
//     if (playerCardDeck[i].name == "Ace" && gameMode == "compare card score") {
//       playerCardDeck[i].score = 11;
//     }
//     playerCurrentCardScore = playerCurrentCardScore + playerCardDeck[i].score;
//   }
// };

// version 2
var calculateComputerScore = function (numberOfCardsToDraw) {
  computerCurrentCardScore = 0;
  // calculate computer card score
  for (let i = 0; i < numberOfCardsToDraw; i++) {
    if (computerCardDeck[i].name == "Ace") {
      computerCardDeck[i].score = determineScoreOfAce(computerCurrentCardScore);
    }
    computerCurrentCardScore =
      computerCurrentCardScore + computerCardDeck[i].score;
  }
};

// // version 1
// var calculateComputerScore = function (numberOfCardsToDraw) {
//   computerCurrentCardScore = 0;
//   // calculate computer card score
//   for (let i = 0; i < numberOfCardsToDraw; i++) {
//     // if computer has ACE in 2 cards, score of ACE increase to 11
//     if (
//       (computerCardDeck[i].name == "Ace" && gameMode == "compare card score") ||
//       (computerCardDeck[i].name == "Ace" &&
//         gameMode == "await dealer hit or stand")
//     ) {
//       computerCardDeck[i].score = 11;
//     }
//     computerCurrentCardScore =
//       computerCurrentCardScore + computerCardDeck[i].score;
//   }
// };

var determineScoreOfAce = function (currentScore) {
  // console.log("It came in here");
  // console.log(currentScore);
  // ACE can be 11 if
  // total current score is less than 10
  if (currentScore <= 10) {
    return 11;
  } else return 1;
  // ACE can be 1 if
  // current total score is less than 20
};

// 20230610 - check if this checkForAce is still required
var checkForAce = function (currentCard, whoseTurn) {
  if (currentCard.name == "Ace") {
    // console.log("card name is ACE");
    if (whoseTurn == "playerTurn") {
      numberOfAcePlayerCardDeckHave = numberOfAcePlayerCardDeckHave + 1;
    }

    if (whoseTurn == "computerTurn") {
      numberOfAcePlayerCardDeckHave = numberOfAcePlayerCardDeckHave + 1;
    }
    return true;
  }

  if (currentCard.name != "Ace") {
    // console.log("card name is NOT ACE");
    return false;
  }
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var makeDeck = function () {
  // suits
  var suits = ["Diamonds", "Hearts", "Clubs", "Spades"];
  var suitsIndex = 0;
  while (suitsIndex < suits.length) {
    var currentSuit = suits[suitsIndex];
    var currentName = "";
    var currentScore = "";
    // name ace,2,3,4,5,6,7,8,9,10,jack,queen,king
    // score

    var nameIndex = 1;
    while (nameIndex < 14) {
      currentName = nameIndex;
      currentScore = nameIndex;

      if (nameIndex == 1) {
        currentName = "Ace";
      } else if (nameIndex == 11) {
        currentName = "Jack";
        currentScore = 10;
      } else if (nameIndex == 12) {
        currentName = "Queen";
        currentScore = 10;
      } else if (nameIndex == 13) {
        currentName = "King";
        currentScore = 10;
      }

      var currentCard = {
        suits: currentSuit,
        name: currentName,
        score: currentScore,
      };

      deck.push(currentCard);

      nameIndex = nameIndex + 1;
    }

    suitsIndex = suitsIndex + 1;
  }
};

var consolelog = function () {
  console.log("computerCardDeck:");
  console.log(computerCardDeck);
  console.log("doesComputerCardDeckHaveAce:");
  console.log(doesComputerCardDeckHaveAce);
  console.log("computerCurrentCardScore:");
  console.log(computerCurrentCardScore);

  console.log("playerCardDeck:");
  console.log(playerCardDeck);
  console.log("doesPlayerCardDeckHaveAce:");
  console.log(doesPlayerCardDeckHaveAce);
  console.log("playerCurrentCardScore:");
  console.log(playerCurrentCardScore);

  console.log("gameMode:");
  console.log(gameMode);
};
