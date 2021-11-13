// Blackjack Project for RA

var deck = [];
var playerCardsArray = [];
// var playerCardsArray = [
//   {
//     name: "King",
//     suit: "hearts",
//     rank: 10,
//   },
//   {
//     name: "Ace",
//     suit: "hearts",
//     rank: 11,
//   },
// ];
var computerCardsArray = [];
var playerFinalScore = 0;
var computerFinalScore = 0;
var playerGameMode = "start game";
var playerHasBust = "no";
var computerHasBust = "no";
var secondMessage = "";
var playerWinCount = 0;
var computerWinCount = 0;
var numberOfAce = 0;
var playerNumberofAce = 0;
var computerNumberofAce = 0;

var getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

//Create a deck
var deckFunction = function () {
  var suits = ["♣️", "♦️", "♥️", "♠️"];
  var suitsCounter = 0;
  while (suitsCounter < suits.length) {
    var currentSuit = suits[suitsCounter];
    var cardRankCounter = 1;
    while (cardRankCounter < 14) {
      var currentCardRank = cardRankCounter;

      if (currentCardRank == 1) {
        currentCardRank = "Ace";
      } else if (currentCardRank == 11) {
        currentCardRank = "Jack";
      } else if (currentCardRank == 12) {
        currentCardRank = "Queen";
      } else if (currentCardRank == 13) {
        currentCardRank = "King";
      }

      var cardName = {
        name: currentCardRank,
        suit: currentSuit,
        rank: cardRankCounter,
      };
      deck.push(cardName);
      cardRankCounter += 1;
    }
    suitsCounter += 1;
  }
  return deck;
};

//Shuffle the deck
var shuffledDeck = function (cards) {
  var shuffleDeckCounter = 0;
  while (shuffleDeckCounter < cards.length) {
    var randomNumberInDeck = getRandomNumber(deck.length);
    randomCard = cards[randomNumberInDeck];
    currentCard = cards[shuffleDeckCounter];
    cards[randomNumberInDeck] = currentCard;
    cards[shuffleDeckCounter] = randomCard;
    shuffleDeckCounter += 1;
  }
  return cards;
};

deck = shuffledDeck(deckFunction());

//Using a while loop, generate 2 random cards for the player and computer each
var getCards = function (hand, max) {
  counter = 0;
  while (counter < max) {
    hand.push(deck.pop());
    counter += 1;
  }
};

//Calculate the number of aces in hand
var aceVariableValues = function (hand) {
  var counter = 0;
  numberOfAce = 0;
  while (counter < hand.length) {
    if (hand[counter].name == "Ace") {
      numberOfAce += 1;
    }
    counter += 1;
  }
  return numberOfAce;
};
//Using the rank attribute of the card, add up the final scores for both the player and computer.
var getScore = function (hand) {
  var getScoreCounter = 0;
  var currentPlayerFinalScore = 0;
  while (getScoreCounter < hand.length) {
    if (
      hand[getScoreCounter].name == "Queen" ||
      hand[getScoreCounter].name == "King" ||
      hand[getScoreCounter].name == "Jack"
    ) {
      currentPlayerFinalScore += 10;
    } else if (hand[getScoreCounter].name == "Ace") {
      currentPlayerFinalScore += 11;
    } else {
      currentPlayerFinalScore += hand[getScoreCounter].rank;
    }
    getScoreCounter += 1;
  }
  return currentPlayerFinalScore;
};

var aceScores = function (currentPlayerFinalScore) {
  if (currentPlayerFinalScore > 21 && numberOfAce > 0) {
    currentPlayerFinalScore -= 10 * numberOfAce;
  }
};

// The cards are analysed for game winning conditions, e.g. BlackJack.
var blackjack = function (hand, currentPlayerFinalScore) {
  return hand.length == 2 && currentPlayerFinalScore == 21;
};

var displayWholeArray = function (currentPlayerArray) {
  counter = 0;
  var message = "";
  while (counter < currentPlayerArray.length) {
    message += `${currentPlayerArray[counter].name} of ${currentPlayerArray[counter].suit}・`;
    counter += 1;
  }
  return message;
};

var resetGame = function () {
  playerCardsArray = [];
  computerCardsArray = [];
  playerHasBust = "no";
  computerHasBust = "no";
};

var winCount = function () {
  if (playerWinCount >= computerWinCount) {
    return `<br> 🏆 Leaderboard 🏆 : <br> 1. 👩🏻‍💻 You (Win count: ${playerWinCount}/${
      playerWinCount + computerWinCount
    })<br> 2. 💻 Computer (Win count: ${computerWinCount}/${
      playerWinCount + computerWinCount
    }) `;
  } else {
    return `<br> 🏆 Leaderboard 🏆 <br> 1. 💻 Computer (Win count: ${computerWinCount}/${
      playerWinCount + computerWinCount
    }) <br> 2. 👩🏻‍💻 You (Win count: ${playerWinCount}/${
      playerWinCount + computerWinCount
    })`;
  }
};

// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
var hitButtonClicked = function () {
  getCards(playerCardsArray, 1);
  playerFinalScore = getScore(playerCardsArray);
};
var standButtonClicked = function () {
  playerGameMode = "player has chosen to stand";
  playerFinalScore = getScore(playerCardsArray);
  return `You have chosen to stand 🕺🏻 <br> Your final score is ${playerFinalScore}. <br> It is the computer's turn. <br>Press submit for the computer to draw their cards.`;
};

var main = function (input) {
  if (playerGameMode == "start game") {
    playerGameMode = "player initial draw";
    return `Hi Player! Press submit to draw your first two cards. 🚩🚩🚩`;
  }

  // User clicks Submit to deal cards.
  if (playerGameMode == "player initial draw") {
    // Each player gets dealt two cards to start.
    getCards(playerCardsArray, 2);
    getCards(computerCardsArray, 1);

    //Calculate number of aces and score for player
    playerNumberofAce = aceVariableValues(playerCardsArray);
    playerGameMode = "player has drawn";
    playerFinalScore = getScore(playerCardsArray);

    playerInitialDrawMessage = `Hi Player. <br> You drew: <br>
       ${displayWholeArray(playerCardsArray)} <br><br> Your current score is
       ${playerFinalScore}. <br> One of Computer's cards is:  <br> ${displayWholeArray(
      computerCardsArray
    )} <br>`;

    if (playerFinalScore > 16) {
      playerInitialDrawMessage += `Click hit or stand please.`;
      playerGameMode = "player has drawn";
    } else if (playerFinalScore <= 16) {
      playerInitialDrawMessage +=
        "You have drawn below 16. <br> Click hit to draw more cards.";
      playerGameMode = "player has drawn";
    }
    return playerInitialDrawMessage;
  }

  //After player has drawn a new card
  if (playerGameMode == "player has drawn") {
    playerNumberofAce = aceVariableValues(playerCardsArray);

    //Save bust condition
    if (playerFinalScore > 21) {
      playerHasBust = "yes";
    }

    return `You drew ${playerCardsArray[playerCardsArray.length - 1].name} of ${
      playerCardsArray[playerCardsArray.length - 1].suit
    }. <br> Your current hand is: <br> ${displayWholeArray(
      playerCardsArray
    )} Your current score is ${playerFinalScore}. <br> Computer drew: <br> ${displayWholeArray(
      computerCardsArray
    )} <br> Click hit or stand`;
  }

  //If player has chosen to stand/click the stand button
  if (playerGameMode == "player has chosen to stand") {
    getCards(computerCardsArray, 1);
    computerNumberofAce = aceVariableValues(computerNumberofAce);
    computerFinalScore = getScore(computerCardsArray);

    // The dealer has to hit if their hand is below 17.
    if (computerFinalScore < 17) {
      while (computerFinalScore < 17) {
        getCards(computerCardsArray, 1);

        //Calculate number of aces and score for computer
        computerNumberofAce = aceVariableValues(computerNumberofAce);
        computerFinalScore = getScore(computerCardsArray);
        playerGameMode = "computer has finished hitting";
      }
      //Save bust condition
      if (computerFinalScore > 21) {
        computerHasBust = "yes";
      }
    }
    //Stand when computer doesnt need to draw more cards
    if (computerFinalScore > 16) {
      playerGameMode = "computer chose to stand";
    }
    playerGameMode = "calculate result";
    return `Computer has finished their turn. <br> Computer drew:<br>
       ${displayWholeArray(computerCardsArray)} <br>Computer's final score is
       ${computerFinalScore}. <br> Press submit to calculate the results.`;
  }

  finalMessage = `<br> You had a hand of: <br> ${displayWholeArray(
    playerCardsArray
  )} and a final score of ${playerFinalScore}. <br> Computer had a hand of ${displayWholeArray(
    computerCardsArray
  )} and a final score of ${computerFinalScore}.<br> `;

  //Calculate results
  if (playerGameMode == "calculate result") {
    playerGameMode = "start game";

    //Evaluate for blackjack conditions
    if (blackjack(playerCardsArray, playerFinalScore)) {
      resetGame();
      playerWinCount += 1;
      return `You got blackjack! 🎊 ${finalMessage}${winCount()}<br> <br> Press submit to begin the game again.`;
    }
    //Evaluate for blackjack conditions
    if (blackjack(computerCardsArray, computerFinalScore)) {
      resetGame();
      computerWinCount += 1;
      return `Snap...Computer got blackjack! 😢 ${finalMessage}${winCount()}<br> <br> Press submit to begin the game again.`;
    }
    // Compare both hands and determine a winner.
    if (playerHasBust == "yes" && computerHasBust == "yes") {
      resetGame();
      computerWinCount += 1;
      return `You lost! 🥺 Both you and computer has bust. <br> ${finalMessage} ${winCount()} <br> <br> Press submit to begin the game again.`;
    } else if (playerHasBust == "yes" && computerHasBust == "no") {
      resetGame();
      computerWinCount += 1;
      return `You bust and lost! 🥺 <br> ${finalMessage} ${winCount()}<br> <br> Press submit to begin the game again.`;
    } else if (playerHasBust == "no" && computerHasBust == "yes") {
      resetGame();
      playerWinCount += 1;
      return `Yipee Computer has bust and lost! ✌🏻  <br> ${finalMessage}  ${winCount()} <br> <br> Press submit to begin the game again.`;
    } else if (playerFinalScore > computerFinalScore) {
      resetGame();
      playerWinCount += 1;
      return `Yipee you won! ✌🏻 <br> ${finalMessage} ${winCount()}<br><br>  Press submit to begin the game again.`;
    } else if (playerFinalScore < computerFinalScore) {
      resetGame();
      computerWinCount += 1;
      return `Snap...Computer has won! 🥺 <br> ${finalMessage} ${winCount()}
      }<br> Press submit to begin the game again.`;
    } else if (playerFinalScore == computerFinalScore) {
      resetGame();
      return `It's a tie. <br>${finalMessage} ${winCount()}<br><br>  Press submit to begin the game again.`;
    }
  }
};
