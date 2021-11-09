// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks."Jaacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. BlackJack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

var deck = [];
var playerCardsArray = [];
// var playerCardsArray = [
//   {
//     name: "King",
//     suit: "hearts",
//     rank: 10,
//   },
//   {
//     name: "Queen",
//     suit: "hearts",
//     rank: 10,
//   },
//   // {
//   //   name: "2",
//   //   suit: "hearts",
//   //   rank: 2,
//   // },
//   // {
//   //   name: "2",
//   //   suit: "diamond",
//   //   rank: 2,
//   // },
// ];
var computerCardsArray = [];
var playerFinalScore = 0;
var computerFinalScore = 0;
var playerGameMode = "start game";
var playerHasBust = "no";
var computerHasBust = "no";
var secondMessage = "";
var currentPlayer = "player";

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
      //Ace 1 or 10 or 11
      //***Variable Ace Value */
    } else if (hand[getScoreCounter].name == "Ace" && hand.length == 2) {
      currentPlayerFinalScore += 11;
    } else if (hand[getScoreCounter].name == "Ace" && hand.length == 3) {
      currentPlayerFinalScore += 10;
    } else if (hand[getScoreCounter].name == "Ace" && hand.length > 3) {
      currentPlayerFinalScore += 1;
    } else {
      currentPlayerFinalScore += hand[getScoreCounter].rank;
    }
    getScoreCounter += 1;
  }

  return currentPlayerFinalScore;
};

var blackjack = function (hand, currentPlayerFinalScore) {
  return hand.length == 2 && currentPlayerFinalScore == 21;
};

var createFirstMessage = function (currentPlayerArray) {
  counter = 0;
  firstMessage = "";
  while (counter < currentPlayerArray.length) {
    firstMessage += `${currentPlayerArray[counter].name} of ${currentPlayerArray[counter].suit} <br>`;
    counter += 1;
  }

  return firstMessage;
};

var resetGame = function () {
  playerCardsArray = [];
  computerCardsArray = [];
  playerHasBust = "no";
  computerHasBust = "no";
};

// function hide() {
//   var div = document.getElementyById("start-button");
//   div.style.display = "none";
// }

// get a cross-browser function for adding events, place this in [global] or somewhere you can access it
// var on = (function () {
//   if (window.addEventListener) {
//     return function (target, type, listener) {
//       target.addEventListener(type, listener, false);
//     };
//   } else {
//     return function (object, sEvent, fpNotify) {
//       object.attachEvent("on" + sEvent, fpNotify);
//     };
//   }
// })();

// // find the element
// var el = document.getElementById("start-button");

// // add the first listener
// // on(el, "click", function () {
// //   alert("foo");
// // });

// // add the second listener
// on(el, "click",  getCards(playerCardsArray, 2)) {
//   return (playerCardsArray);
// }

var startGame = function () {
  getCards(playerCardsArray, 2);
  return playerCardsArray;
};

var main = function (input) {
  // deckFunction();
  // getRandomNumber(deck.length);

  if (playerGameMode == "start game") {
    playerGameMode = "player initial draw";
    return `Hi Player! Press submit to draw your first two cards.`;
  }

  if (playerGameMode == "player initial draw") {
    getCards(playerCardsArray, 2);
    getCards(computerCardsArray, 1);
    playerGameMode = "player has drawn";
    playerFinalScore = getScore(playerCardsArray);
    //After player is dealt his 2 cards, show him his draw and ask if he wants to hit or stand
    if (playerFinalScore > 16) {
      message = `Hi Player. <br> You drew: <br>
       ${createFirstMessage(playerCardsArray)} Your current score is
       ${playerFinalScore}. <br> Computer drew: <br> ${createFirstMessage(
        computerCardsArray
      )} br> Type hit or stand please.`;
      playerGameMode = "player has drawn";
    } else if (playerFinalScore <= 16) {
      message = `Hi Player. <br> You drew:<br>
       ${createFirstMessage(playerCardsArray)}Your current score is
       ${playerFinalScore}.<br> Computer drew: <br> ${createFirstMessage(
        computerCardsArray
      )} You have drawn below 16. <br> Please enter hit to draw more cards.`;
      playerGameMode = "player has drawn";
    }
    console.log(playerGameMode);
    console.log(playerFinalScore);
    return message;
  }

  if (playerGameMode == "player has drawn") {
    console.log(playerGameMode);
    //If hit, draw one more card, add it to his final score, and shoe him his draw and final score
    if (input != "hit" || input != "stand") {
      secondMessage = `Please type either hit or stand`;
    }
    if (input == "hit") {
      var newCard = getCards(playerCardsArray, 1);
      playerFinalScore = getScore(playerCardsArray);
      //If he has bust, change game mode to player bust
      if (playerFinalScore > 21) {
        playerHasBust = "yes";
        console.log(playerFinalScore);
      }

      secondMessage = `You drew ${
        playerCardsArray[playerCardsArray.length - 1].name
      } of ${
        playerCardsArray[playerCardsArray.length - 1].suit
      }. <br> Your current hand is: <br> ${createFirstMessage(
        playerCardsArray
      )} Your current score is ${playerFinalScore}. Computer drew: <br> ${createFirstMessage(
        computerCardsArray
      )} Type hit if you want to draw one more card or stand to end your turn.`;
    }
    if (input == "stand") {
      //If stand, show him that he has chosen stand and his final score
      playerFinalScore = getScore(playerCardsArray);
      console.log(playerGameMode);
      console.log(playerFinalScore);

      currentPlayer = "computer";
      playerGameMode = "computer initial draw";
      secondMessage = `Your final score is ${playerFinalScore}. <br> It is the computer's turn. <br>Press submit for the computer to draw their cards.`;
    }
    return secondMessage;
  }

  if (playerGameMode == "computer initial draw") {
    getCards(computerCardsArray, 1);
    computerFinalScore = getScore(computerCardsArray);

    if (computerFinalScore < 17) {
      while (computerFinalScore < 17) {
        getCards(computerCardsArray, 1);
        computerFinalScore = getScore(computerCardsArray);
        playerGameMode = "computer has finished hitting";
        console.log(playerGameMode);
      }
      if (computerFinalScore > 21) {
        computerHasBust = "yes";
      }
    }
    if (computerFinalScore > 16) {
      playerGameMode = "computer chose to stand";
      console.log(playerGameMode);
    }
    playerGameMode = "calculate result";
    console.log(computerFinalScore);
    return `Computer has finished their turn. <br> Computer drew:<br>
       ${createFirstMessage(computerCardsArray)} Computer's final score is
       ${computerFinalScore}. <br> Press submit to calculate the results.`;
  }

  finalMessage = `<br> Player had a hand of: <br> ${createFirstMessage(
    playerCardsArray
  )} and a final score of ${playerFinalScore}. <br> Computer had a hand of ${createFirstMessage(
    computerCardsArray
  )} and a final score of ${computerFinalScore}.`;

  if (playerGameMode == "calculate result") {
    playerGameMode = "start game";
    if (blackjack(playerCardsArray, playerFinalScore)) {
      resetGame();
      return `Player has won blackJack. ${finalMessage}`;
    }
    if (blackjack(computerCardsArray, computerFinalScore)) {
      resetGame();
      return `Computer has won blackJack. ${finalMessage}`;
    }
    // Compare both hands and determine a winner.
    if (playerHasBust == "yes" && computerHasBust == "yes") {
      resetGame();
      return `Player lost. Both the player and computer has bust. <br> ${finalMessage} <br> Press submit to begin the game again.`;
    } else if (playerHasBust == "yes" && computerHasBust == "no") {
      resetGame();
      return `Player has bust and lost. <br> ${finalMessage} <br> Press submit to begin the game again.`;
    } else if (playerHasBust == "no" && computerHasBust == "yes") {
      resetGame();
      return `Computer has bust and lost. <br> ${finalMessage} <br> Press submit to begin the game again.`;
    } else if (playerFinalScore > computerFinalScore) {
      resetGame();
      return `Player has won. <br> ${finalMessage}<br> Press submit to begin the game again.`;
    } else if (playerFinalScore < computerFinalScore) {
      resetGame();
      return `Computer has won. <br> ${finalMessage}<br> Press submit to begin the game again.`;
    } else if (playerFinalScore == computerFinalScore) {
      resetGame();
      return `It's a tie. <br>${finalMessage}<br> Press submit to begin the game again.`;
    }
  }
};
