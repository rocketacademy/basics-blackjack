var main = function (input) {
  var myOutputValue = "";
  // ask for player name
  if (gameMode == "get player names") {
    //// store player name in an array in the same index as the player hand
    playerName.push(input);
    myOutputValue = `Hello ${playerName}. Click "Play" to begin the game.`;
    gameMode = "default";
  } else if (gameMode == "default") {
    startGame();
    myOutputValue = firstCheck();
  } else if (gameMode == "player turn") {
    myOutputValue = `Please enter "hit" to draw another card, or "stay" to keep your hand as it is.`;
  } else if (gameMode == "comp turn") {
    myOutputValue = `${dealerTurn()}<br>${checkOutcome()}`;
  }
  console.log(gameDeck.length);
  return myOutputValue;
};

var hit = function (input) {
  if (gameMode == "player turn") {
    var newCard = gameDeck.pop();
    playerHand.push(newCard);
    playerValue = sumArray(playerHand);
    var playerTurnMessage = `You chose HIT.<br><br>You drew ${
      newCard.name
    } of ${
      newCard.suit
    }.<br><br>So far, you've been dealt with:<br>${getHandMessage(
      playerHand
    )}<br>Your hand is now valued at ${playerValue}`;
    if (playerValue > 21) {
      resetRound();
      playerTurnMessage += `<br><br>Game Over! You bust!`;
    } else if (playerValue <= 21) {
      playerTurnMessage += `<br><br>Do you want to hit or stay?`;
    }
  } else {
    playerTurnMessage = `Please click Play to continue.`;
  }
  return playerTurnMessage;
};

var stay = function (input) {
  if (gameMode == "player turn") {
    playerValue = sumArray(playerHand);
    if (playerValue <= 21) {
      if (checkForAce(playerHand) > -1) {
        if (playerValue + 10 > 21) {
          playerValue += 0;
        } else {
          playerValue += 10;
        }
      } else {
        playerValue += 0;
      }
      gameMode = "comp turn";
      playerTurnMessage = `You chose STAY.<br><br>So far, you've been dealt with:<br>${getHandMessage(
        playerHand
      )}<br>Your hand is now valued at ${playerValue}. It is now dealer's turn.`;
    }
    if (playerValue > 21) {
      resetRound();
      playerTurnMessage += `Game Over! You bust!`;
    }
  } else {
    playerTurnMessage = `Please click Play to continue.`;
  }
  return playerTurnMessage;
};

// create deck
var cardDeck = [];
var makeDeck = function () {
  var deckCount = 0;
  while (deckCount < 6) {
    var suits = [`♦️ Diamonds`, `♣️ Clubs`, `♥️ Hearts`, `♠️ Spades`];
    var suitCounter = 0;

    while (suitCounter < suits.length) {
      var rankCounter = 1;
      while (rankCounter <= 13) {
        var cardRank = rankCounter;
        var cardName = rankCounter;

        if (cardRank === 1) {
          cardName = `Ace`;
        } else if (cardRank === 11) {
          cardName = `Jack`;
          cardRank = 10;
        } else if (cardRank === 12) {
          cardName = `Queen`;
          cardRank = 10;
        } else if (cardRank === 13) {
          cardName = `King`;
          cardRank = 10;
        }

        var card = {
          rank: cardRank,
          name: cardName,
          suit: suits[suitCounter],
        };

        cardDeck.push(card);
        rankCounter += 1;
      }
      suitCounter += 1;
    }
    deckCount += 1;
  }
  return cardDeck;
};

// get random number to use in shuffle deck function
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

// Make and shuffle deck when page loads
var sortedDeck = makeDeck();
var gameDeck = shuffleCards(sortedDeck);

// click submit to deal cards
//// 2 for player
//// 2 for computer
var playerHand = [];
var compHand = [];

// deal cards
var startGame = function () {
  playerHand.push(gameDeck.pop());
  compHand.push(gameDeck.pop());
  playerHand.push(gameDeck.pop());
  compHand.push(gameDeck.pop());
};

// function to sum arrays
var sumArray = function (a) {
  var array = a;
  var sum = 0;
  var sumIndex = 0;
  while (sumIndex < array.length) {
    sum += array[sumIndex].rank;
    sumIndex += 1;
  }
  sumIndex = 0;
  return sum;
};

// global variables to store values
var gameMode = "get player names";
var playerValue = 0;
var compValue = 0;
var playerName = [];
var playerPoints = 100;

// check if there is Ace in hand
var checkForAce = function (a) {
  aceArray = a;
  var getIndexOfAce = aceArray.findIndex((x) => x.name === "Ace");
  if (getIndexOfAce > -1) {
    return getIndexOfAce;
  }
};

// check if total of each array = 21
var firstCheck = function () {
  playerValue = sumArray(playerHand);
  compValue = sumArray(compHand);
  // if true, that person wins 1.5 times the bet, game is over
  if (playerValue == 21) {
    var firstCheckMessage = `You've been dealt with:<br>${getHandMessage(
      playerHand
    )}<br><br>Blackjack! You Win!`;
    resetRound();
  } else if (playerValue > 21) {
    firstCheckMessage = `You've been dealt with:<br>${getHandMessage(
      playerHand
    )}<br><br>Game over, you lost!`;
    resetRound();
  } else if (checkForAce(playerHand) > -1 && playerValue + 10 == 21) {
    firstCheckMessage = `You've been dealt with:<br>${getHandMessage(
      playerHand
    )}<br><br>Blackjack! You Win!`;
    resetRound();
  } else {
    gameMode = "player turn";
    firstCheckMessage = `You've been dealt with:<br>${getHandMessage(
      playerHand
    )}<br>Please enter "hit" to draw another card, or "stay" to keep your hand as it is.`;
  }
  return firstCheckMessage;
};

// else
// if player submit hit, deal card from deck, and add to array
// var playerTurn = function (input) {
//   if (input == "hit") {
//     // var newCard = gameDeck.pop();
//     // playerHand.push(newCard);
//     // playerValue = sumArray(playerHand);
//     // var playerTurnMessage = `You chose HIT.<br><br>You drew ${
//     //   newCard.name
//     // } of ${
//     //   newCard.suit
//     // }.<br><br>So far, you've been dealt with:<br>${getHandMessage(
//     //   playerHand
//     // )}<br>Your hand is now valued at ${playerValue}`;
//     // if (playerValue > 21) {
//     //   resetRound();
//     //   playerTurnMessage += `<br><br>Game Over! You bust!`;
//     // } else if (playerValue <= 21) {
//     //   playerTurnMessage += `<br><br>Do you want to hit or stay?`;
//     // }
//   } else if (input == "stay") {
//   playerValue = sumArray(playerHand);
//   if (playerValue <= 21) {
//     if (checkForAce(playerHand) > -1) {
//       if (playerValue + 10 > 21) {
//         playerValue += 0;
//       } else {
//         playerValue += 10;
//       }
//     } else {
//       playerValue += 0;
//     }
//     gameMode = "comp turn";
//     playerTurnMessage = `You chose STAY.<br><br>So far, you've been dealt with:<br>${getHandMessage(
//       playerHand
//     )}<br>Your hand is now valued at ${playerValue}. It is now dealer's turn.`;
//   }
//   if (playerValue > 21) {
//     resetRound();
//     playerTurnMessage += `Game Over! You bust!`;
//   }
// }
// console.log(playerValue);
// if player submit stay, check if player bust

//   return playerTurnMessage;
// };

// function to reset round
var resetRound = function () {
  playerHand = [];
  compHand = [];
  gameMode = "default";
};

// else
// if total of dealer array is <17, they have to draw. deal card and add to dealer array until total is >17 or elements in array is = 5

var dealerTurn = function () {
  compValue = sumArray(compHand);
  if (checkForAce(compHand) > -1) {
    if (compValue + 10 > 21) {
      compValue += 0;
    } else {
      compValue += 10;
      var aceAccounted = true;
    }
  }
  if (compValue <= 17) {
    var dealerIndex = compHand.length;
    while (dealerIndex < 5) {
      compHand.push(gameDeck.pop());
      compValue = sumArray(compHand);
      // if total of dealer array >17, they have to stay
      if (checkForAce(compHand) > -1 && aceAccounted == false) {
        if (compValue + 10 > 21) {
          compValue += 0;
        } else {
          compValue += 10;
        }
      }
      if (compValue > 17) {
        dealerIndex = 5;
      } else {
        dealerIndex += 1;
      }
    }
    dealerTurnMessage = `Dealer has been dealt with:<br>${getHandMessage(
      compHand
    )}<br>Dealer's value is now at ${compValue}`;
  }
  if (compValue > 17) {
    dealerTurnMessage = `Dealer has been dealt with:<br>${getHandMessage(
      compHand
    )}<br>Dealer's value is now at ${compValue}`;
  }
  return dealerTurnMessage;
};

// once it reaches this point, analyse game condition

// check if dealer bust,
var checkOutcome = function () {
  var outcomeMsg = `Player Hand Value: ${playerValue}<br>Dealer Hand Value: ${compValue}<br><br>`;
  if (compValue > 21 && playerValue <= 21) {
    outcomeMsg += `Dealer bust. You win!`;
  } else if (playerValue > 21 && compValue <= 21) {
    outcomeMsg += `You bust. Dealer wins!`;
  } else if (playerValue > compValue) {
    outcomeMsg += `Your hand is higher than dealer's. You win!`;
  } else if (playerValue < compValue) {
    outcomeMsg += `Your hand is lower than dealer's. You lose!`;
  } else if ((playerValue = compValue)) {
    outcomeMsg += `It's a tie.`;
  }
  resetRound();
  return outcomeMsg;
};

//// if true, player wins twice their bet

// get message to display info on hand
var getHandMessage = function (a) {
  var handMsgArray = a;
  var handMsgIndex = 0;
  var handMessage = "";
  while (handMsgIndex < handMsgArray.length) {
    handMessage += `${handMsgArray[handMsgIndex].name} of ${handMsgArray[handMsgIndex].suit}<br>`;
    handMsgIndex += 1;
  }
  return handMessage;
};

// debug the new buttons and add input validation

// variable ace values

// one more game mode initialised

// for split deck, maybe can use splice function which removes and returns a subset of an array as a new array

// for multiple players, consider
/// global variable to store num of players
/// deal cards loop based on num of players, and store each player as an array within a global player array
/// in order to have player turn repeat until all players have gone, use if condition based on global player array length. add count to player turn as the limit. once max player turn count is reached, game mode switches to dealer turn
//// to retrieve player hand, call the corresponding player array index of the global player array

//// apply the multiplayer concept to pull player name

// give full instructions

// betting
/// global variable to store initial points
/// insert code to plus/deduct based on winning conditions
