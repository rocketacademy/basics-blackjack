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
//     name: "2",
//     suits: "Hearts",
//     score: 12,
//   },
//   {
//     name: "3",
//     suits: "Hearts",
//     score: 13,
//   },
// ];
var computerCardDeck = [];
var doesComputerCardDeckHaveAce = false;
var computerCurrentCardScore = 0;
var numberOfCardsToDrawForPlayer;
// var playerCardDeck = [
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
// ];
var playerCardDeck = [];
var doesPlayerCardDeckHaveAce = false;
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
      doesComputerCardDeckHaveAce = checkForAce(currentCard);
    }

    // assign 2 cards to player
    numberOfCardsToDrawForPlayer = 2;
    for (let i = 0; i < numberOfCardsToDrawForPlayer; i++) {
      var currentCard = shuffledDeck.pop();
      playerCardDeck.push(currentCard);
      doesPlayerCardDeckHaveAce = checkForAce(currentCard);
    }

    calculateComputerScore(numberOfCardsToDrawForComputer);
    calculatePlayerScore(numberOfCardsToDrawForPlayer);

    // in the event player reaches 21 with 2 cards, i.e. ACE + JACK/QUEEN/KING, declare player as winner
    if (playerCurrentCardScore == 21) {
      // if computer score less than 21, prompt computer to draw
      if (computerCurrentCardScore < 21) {
        myOutputValue =
          playerCardMessage() +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          promptComputerDrawCardMessage();
        gameMode = "await dealer hit or stand";
        return myOutputValue;
      }
      // if computer score more than 21, show player won message
      if (computerCurrentCardScore > 21) {
        myOutputValue =
          messageWhenPlayerHit21ComputerHitMoreThan21() + resetGameMessage();
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
      // "hit" means that I want more cards, "stand" means don't want
      gameMode = "1st prompt player to hit or stand";
    }
  }

  if (gameMode == "1st prompt player to hit or stand") {
    myOutputValue =
      playerCardMessage() +
      playerScoreMessage() +
      promptPlayerDrawCardMessage();
    gameMode = "await player hit or stand";
    // console.log("Yes, I only expect this to happen 1 time.");
    // console.log(gameMode);
    return myOutputValue;
  }

  if (gameMode == "await player hit or stand") {
    if (
      inputLowerCase !== "hit" &&
      inputLowerCase !== "stand" &&
      inputLowerCase == ""
    ) {
      myOutputValue =
        promptErrorDrawCardMessage() +
        playerCardMessage() +
        playerScoreMessage() +
        promptPlayerDrawCardMessage();
      return myOutputValue;
    }

    // if player stand, calculate player score
    if (inputLowerCase == "stand") {
      // check if computer score bust, if yes, display player won
      if (computerCurrentCardScore >= 22) {
        console.log("Yes, I expect this to happen when dealer bust.");
        myOutputValue =
          playerCardMessage() +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          computerBust21() +
          resetGameMessage();
        return myOutputValue;
      }
      // check if player score bigger than computer score, if yes, prompt dealer to draw
      if (playerCurrentCardScore >= computerCurrentCardScore) {
        myOutputValue = "Prompt dealer to draw";
        gameMode = "await dealer hit or stand";
        return myOutputValue; // continue to work on myoutputvalue
      }
      // check if player score bigger than computer score, if no, proceed to check who won
      if (playerCurrentCardScore < computerCurrentCardScore) {
        myOutputValue = checkWhoWon();
        gameMode = "end of game submit to restart";
        return myOutputValue; // this works
      }
    }

    // determine if bust
    // if yes, display player lost
    // if no, set gameMode to await player hit or stand
    if (inputLowerCase == "hit") {
      // if player hit, assign 1 more card
      var currentCard = shuffledDeck.pop();
      playerCardDeck.push(currentCard);
      doesPlayerCardDeckHaveAce = checkForAce(currentCard);
      // calculate score
      numberOfCardsToDrawForPlayer = numberOfCardsToDrawForPlayer + 1;
      calculatePlayerScore(numberOfCardsToDrawForPlayer);

      // if 3rd card never, gameMode = await player hit or stand
      if (playerCurrentCardScore < gameBustScore) {
        gameMode = "await player hit or stand";
        myOutputValue =
          playerCardMessage() +
          playerScoreMessage() +
          promptPlayerDrawCardMessage();
        return myOutputValue;
      }

      // if 3rd card BUST, check if there's ACE
      // if 3rd card BUST, NO ACE
      // if 3rd card BUST, display player lost, rest game
      if (playerCurrentCardScore >= gameBustScore) {
        myOutputValue =
          playerCardMessage() +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          playerBust21() +
          resetGameMessage();
        gameMode = "end of game submit to restart";
        console.log("Yes, I expect this to happen when player bust.");
        return myOutputValue;
      }
    }
  }

  if (gameMode == "end of game submit to restart") {
    // console.log("Yes, I expect this to appear when I restart.");
    // deck = [];
    // shuffledDeck = [];
    // gameMode = "shuffled cards";
    // numberOfCardsToDrawForComputer = 0;
    // computerCardDeck = [];
    // doesComputerCardDeckHaveAce = false;
    // computerCurrentCardScore = 0;
    // numberOfCardsToDrawForPlayer = 0;
    // // playerCardDeck = [];
    // doesPlayerCardDeckHaveAce = false;
    // playerCurrentCardScore = 0;
    // myOutputValue = "Game's been reset! Click Submit to deal again.";
    return resetEntireGame();
  }

  return myOutputValue;
};

var dealerMain = function (input) {
  var myOutputValue = "dealerMain";
  var inputLowerCase = input.toLowerCase();
  if (gameMode == "await dealer hit or stand") {
    if (
      inputLowerCase !== "hit" &&
      inputLowerCase !== "stand" &&
      inputLowerCase == ""
    ) {
      myOutputValue =
        promptErrorDrawCardMessage() +
        playerCardMessage() +
        playerScoreMessage() +
        "<br><br>" +
        computerCardMessage() +
        "<br><br>" +
        computerScoreMessage() +
        promptComputerDrawCardMessage();
      return myOutputValue;
    } // this works

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
      doesComputerCardDeckHaveAce = checkForAce(currentCard);
      // calculate score
      numberOfCardsToDrawForComputer = numberOfCardsToDrawForComputer + 1;
      calculateComputerScore(numberOfCardsToDrawForComputer);

      // if 3rd card never BUST, gameMode = await dealer hit or stand
      if (computerCurrentCardScore <= 20) {
        gameMode = "await dealer hit or stand";
        myOutputValue =
          playerCardMessage() +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          promptComputerDrawCardMessage();
        console.log("Console's here!");
        consolelog();
        return myOutputValue;
      }
      // if 3rd card never BUST and also 21, show tie message
      if (computerCurrentCardScore == 21) {
        myOutputValue = checkWhoWon();
        gameMode = "end of game submit to restart";
        return myOutputValue;
      }

      // if 3rd card BUST, check if there's ACE
      // if 3rd card BUST, NO ACE
      // if 3rd card BUST, display player lost, rest game
      if (computerCurrentCardScore >= 22) {
        console.log("Yes, I expect this to happen when dealer bust.");
        myOutputValue =
          playerCardMessage() +
          playerScoreMessage() +
          "<br><br>" +
          computerCardMessage() +
          "<br><br>" +
          computerScoreMessage() +
          computerBust21() +
          resetGameMessage();
        gameMode = "end of game submit to restart";
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
  console.log("Yes, I expect this to appear when I restart.");
  deck = [];
  shuffledDeck = [];
  gameMode = "shuffled cards";
  numberOfCardsToDrawForComputer = 0;
  computerCardDeck = [];
  doesComputerCardDeckHaveAce = false;
  computerCurrentCardScore = 0;
  numberOfCardsToDrawForPlayer = 0;
  // playerCardDeck = [];
  doesPlayerCardDeckHaveAce = false;
  playerCurrentCardScore = 0;
  return "Game's been reset! Player, please click Submit to deal again.";
};

var resetGameMessage = function () {
  return "<br><br>Good game! Play your next round by clicking the Player Submit button.";
};

var computerBust21 = function () {
  return "<br><br>Dealer, you busted!";
};

var playerBust21 = function () {
  return "<br><br>Player, you busted!";
};

var checkWhoWon = function () {
  if (computerCurrentCardScore < playerCurrentCardScore) {
    return (
      playerCardMessage() +
      playerScoreMessage() +
      "<br><br>" +
      computerCardMessage() +
      "<br><br>" +
      computerScoreMessage() +
      "<br><br>Player won!" +
      resetGameMessage()
    );
  }

  if (computerCurrentCardScore > playerCurrentCardScore) {
    return (
      playerCardMessage() +
      playerScoreMessage() +
      "<br><br>" +
      computerCardMessage() +
      "<br><br>" +
      computerScoreMessage() +
      "<br><br>Dealer won!" +
      resetGameMessage()
    );
  }

  if (computerCurrentCardScore == playerCurrentCardScore) {
    return (
      playerCardMessage() +
      playerScoreMessage() +
      "<br><br>" +
      computerCardMessage() +
      "<br><br>" +
      computerScoreMessage() +
      "<br><br>It's a tie!" +
      resetGameMessage()
    );
  }
};

var promptComputerDrawCardMessage = function () {
  return "<br><br>Dealer, would you like to draw 1 more card to your deck?<br><br>If yes, please input 'Hit'.<br><br>If not, please input 'Stand'.";
};

var computerScoreMessage = function () {
  if (doesComputerCardDeckHaveAce && computerCurrentCardScore == 21) {
    return "Dealer's score: Won by Black Jack";
  } else return "Dealer's score: " + computerCurrentCardScore;
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
  return "You have entered an unexpected input.<br><br>";
};

var promptPlayerDrawCardMessage = function () {
  return "<br><br>Player, would you like to draw 1 more card to your deck?<br><br>If yes, please input 'Hit'.<br><br>If not, please input 'Stand'.";
};

var playerScoreMessage = function () {
  if (doesPlayerCardDeckHaveAce && playerCurrentCardScore == 21) {
    return "Player's score: Won by Black Jack";
  } else return "<br><br>Player's score: " + playerCurrentCardScore;
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
    playerScoreMessage() +
    "<br><br>" +
    computerCardMessage() +
    "<br><br>" +
    computerScoreMessage() +
    "<br><br>Player won by Black Jack!"
  );
};

var calculatePlayerScore = function (numberOfCardsToDraw) {
  playerCurrentCardScore = 0;
  // calculate player card score
  for (let i = 0; i < numberOfCardsToDraw; i++) {
    // if player has ACE in 2 cards, score of ACE increase to 11
    if (playerCardDeck[i].name == "Ace" && gameMode == "compare card score") {
      playerCardDeck[i].score = 11;
    }
    playerCurrentCardScore = playerCurrentCardScore + playerCardDeck[i].score;
  }
};

var calculateComputerScore = function (numberOfCardsToDraw) {
  computerCurrentCardScore = 0;
  // calculate computer card score
  for (let i = 0; i < numberOfCardsToDraw; i++) {
    // if computer has ACE in 2 cards, score of ACE increase to 11
    if (
      (computerCardDeck[i].name == "Ace" && gameMode == "compare card score") ||
      (computerCardDeck[i].name == "Ace" &&
        gameMode == "await dealer hit or stand")
    ) {
      computerCardDeck[i].score = 11;
    }
    computerCurrentCardScore =
      computerCurrentCardScore + computerCardDeck[i].score;
  }
};

var checkForAce = function (currentCard) {
  if (currentCard.name == "ace") {
    return true;
  }

  if (currentCard.name != "ace") {
    return false;
  }
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // console.log("I'm inside shuffleCards");
  // console.log(cardDeck);
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

// 20230607 decided not to use this function
// var assignTwoCards = function () {
//   numberOfCardsToDraw = 2;
//   for (let i = 0; i < numberOfCardsToDraw; i++) {
//     var currentCard = shuffledDeck.pop();
//     // computerCardDeck.push(currentCard);
//     return currentCard;
//   }
// };
