var main = function (input) {
  var myOutputValue = "";
  if (gameMode == "numPlayers") {
    myOutputValue = saveNumPlayers(input);
  } else if (gameMode == "username") {
    myOutputValue = savePlayerName(input);
  } else if (gameMode == "player") {
    currentPlayer = playerInfo[playerTurnIndex];
    myOutputValue = `${currentPlayer.name}, please submit your bet to continue.<br>You currently have ${currentPlayer.points} available for wager.`;
    if (isNaN(input) == false && input != "" && input <= currentPlayer.points) {
      currentPlayer = playerInfo[playerTurnIndex];
      myOutputValue = showPlayerHand(input);
    }
  } else if (gameMode == "player move") {
    myOutputValue = `${currentPlayer.name}, please click "hit" to draw another card, or "stand" to keep your hand as it is.<br><br>Note that you can't hold more than 5 cards in your hand.`;
  } else if (gameMode == "dealer") {
    myOutputValue = showDealerHand();
  } else if (gameMode == "dealer move") {
    myOutputValue = dealerTurn();
  } else if (gameMode == "results") {
    myOutputValue = `${getResults()}`;
    resetRound();
    dealCards();
  } else if (gameMode == "gameOver") {
    myOutputValue = resetGame();
  }
  return myOutputValue;
};

// all global variables
var numPlayers = 0;
var gameMode = "numPlayers";
var playerInfo = [];
var playerNameIndex = 1;
var compHand = [];
var compValue = 0;
var cardDeck = [];
var currentPlayer = {};
var playerTurnIndex = 0;
var listElimPlayers = [];

// GM: ask num of players
var saveNumPlayers = function (input) {
  if (input == "" || isNaN(input) == true) {
    var saveNumPlayersMsg = `Please enter number of players and click "Play".`;
  } else {
    numPlayers = Number(input);
    gameMode = "username";
    saveNumPlayersMsg = `There will be ${numPlayers} player(s) in this game.<br><br> >>> Player 1, please enter your name and click "Play".`;
  }
  return saveNumPlayersMsg;
};

// GM: get each player to enter username
var savePlayerName = function (input) {
  var savePlayerNameMsg = "";
  if (input == "") {
    savePlayerNameMsg = `Please enter username and click "Play"`;
  } else if (numPlayers > 1 && playerNameIndex < numPlayers) {
    var player = {
      name: input,
      hand: [],
      value: 0,
      points: 100,
      bet: 0,
    };
    playerInfo.push(player);
    playerNameIndex += 1;
    savePlayerNameMsg = `Hello ${input}!<br><br>>>> Player ${playerNameIndex}, please enter your username and click "Play".`;
  } else if (numPlayers > 1 && playerNameIndex == numPlayers) {
    player = {
      name: input,
      hand: [],
      value: 0,
      points: 100,
      bet: 0,
    };
    playerInfo.push(player);
    gameMode = "player";
    currentPlayer = playerInfo[0];
    savePlayerNameMsg = `Hello ${
      playerInfo[playerInfo.length - 1].name
    }!<br><br>Now that we have everyone, let's begin.<br><br>${
      currentPlayer.name
    }, you'll start first with 100 points.<br>>>> Enter your bet and click "Play". `;
    dealCards();
  } else if (numPlayers == 1) {
    var player = {
      name: input,
      hand: [],
      value: 0,
      points: 100,
      bet: 0,
    };
    playerInfo.push(player);
    gameMode = "player";
    currentPlayer = playerInfo[0];
    savePlayerNameMsg = `Hello ${currentPlayer.name}, you'll start with 100 points.<br>>>> Enter your bet and click "Play". `;
    dealCards();
  }
  return savePlayerNameMsg;
};

// make deck
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

// Make and shuffle deck
var sortedDeck = makeDeck();
var gameDeck = shuffleCards(sortedDeck);

// GM:

// deal cards to all players
var dealCards = function () {
  var cardSet = 0;
  while (cardSet < 2) {
    var playerCounter = 0;
    while (playerCounter < playerInfo.length) {
      var playerInfoIndex = playerInfo[playerCounter];
      var dealtCard = gameDeck.pop();
      playerInfoIndex.hand.push(dealtCard);
      playerCounter += 1;
    }
    var dealtCardDealer = gameDeck.pop();
    compHand.push(dealtCardDealer);
    cardSet += 1;
  }
};

// get message to display info on player hand
var getHandMessage = function (a) {
  var handMsgArray = a;
  var handMsgIndex = 0;
  var handMessage = "";
  while (handMsgIndex < handMsgArray.length) {
    handMessage += `${handMsgArray[handMsgIndex].name} ${handMsgArray[handMsgIndex].suit}<br>`;
    handMsgIndex += 1;
  }
  return handMessage;
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

// player is shown hand
var showPlayerHand = function (input) {
  var showPlayerHandMsg = `${currentPlayer.name}, you placed a bet for ${input} points.`;
  currentPlayer.bet = Number(input);
  currentPlayer.value = sumArray(currentPlayer.hand);
  showPlayerHandMsg += `<br><br>Your cards are:<br>${getHandMessage(
    currentPlayer.hand
  )}<br>The dealer's face up card is:<br>${compHand[1].name} ${
    compHand[1].suit
  }`;
  if (checkBlackjack(currentPlayer.hand) == true) {
    currentPlayer.value = sumArray(currentPlayer.hand) + 10;
    showPlayerHandMsg += `<br><br>Blackjack! Your hand value is 21.<br>You win unless Dealer also has Blackjack.<br><br>`;
    if (playerTurnIndex < playerInfo.length - 1) {
      playerTurnIndex += 1;
      currentPlayer = playerInfo[playerTurnIndex];
      showPlayerHandMsg += `${currentPlayer.name}, it is now your turn.<br>You have ${currentPlayer.points} points available for wager.<br>>>> Enter your bet and click "Play" to see your cards.`;
      gameMode = "player";
    } else if (playerTurnIndex == playerInfo.length - 1) {
      showPlayerHandMsg += `Click "Play" to see the dealer's hand.`;
      gameMode = "dealer";
    }
  } else {
    showPlayerHandMsg += `<br><br>Your current hand value: ${currentPlayer.value}<br><br>>>> Please click "hit" to draw another card<br>or click "stand" to keep your hand.<br><br>Remember that Aces can have a value of 1 or 11. If you have any aces in hand, your hand value will automatically calculate using the most suitable Ace value once you select "Stand".<br>Otherwise and until "Stand" is selected, Ace will be considered as a value of 1.`;
    gameMode = "player move";
  }
  return showPlayerHandMsg;
};

// player is shown hand after every hit
var showPlayerHandAftHit = function () {
  var showPlayerHandAftHitMsg = `${currentPlayer.name}, you chose HIT.`;
  currentPlayer.value = sumArray(currentPlayer.hand);
  showPlayerHandAftHitMsg += `<br><br>Your cards are:<br>${getHandMessage(
    currentPlayer.hand
  )}<br>The dealer's face up card is:<br>${compHand[1].name} ${
    compHand[1].suit
  }<br><br>Your current hand value: ${currentPlayer.value}`;
  if (currentPlayer.value > 21) {
    showPlayerHandAftHitMsg += `<br>Oops, you bust!<br><br>`;
    if (playerTurnIndex < playerInfo.length - 1) {
      playerTurnIndex += 1;
      currentPlayer = playerInfo[playerTurnIndex];
      showPlayerHandAftHitMsg += `${currentPlayer.name}, it is now your turn.<br>You have ${currentPlayer.points} points available for wager.<br>>>> Enter your bet and click "Play" to see your cards.`;
      gameMode = "player";
    } else if (playerTurnIndex == playerInfo.length - 1) {
      showPlayerHandAftHitMsg += `<br><br>Click "Play" to see the dealer's hand.`;
      gameMode = "dealer";
    }
  } else if (currentPlayer.value <= 21) {
    showPlayerHandAftHitMsg += `<br><br>Please click "hit" to draw another card<br>or click "stand" to keep your hand.`;
  }
  return showPlayerHandAftHitMsg;
};

var hit = function () {
  var hitMessage = "";
  // only when gamemode = player turn
  if (gameMode == "player move" && currentPlayer.hand.length < 5) {
    // pop card to current player hand
    var newCard = gameDeck.pop();
    currentPlayer.hand.push(newCard);
    // showPlayerHand
    hitMessage = showPlayerHandAftHit();
  } else if (gameMode == "player move split" && splitHand1.length < 5) {
    // pop card to current player hands
    splitHand1.push(gameDeck.pop());
    splitHand2.push(gameDeck.pop());
    // showPlayerHand
    hitMessage = showPlayerHandAftHitForSplit();
  } else if (gameMode == "numPlayers" || gameMode == "username") {
    hitMessage = `Please click "Play" to continue.`;
  } else {
    currentPlayer = playerInfo[playerTurnIndex];
    hitMessage = `${currentPlayer.name}, please click "Play" to continue.`;
  }
  return hitMessage;
};

var stand = function () {
  // only when gamemode = player turn
  if (gameMode == "player move") {
    if (checkForAce(currentPlayer.hand) > -1) {
      if (currentPlayer.value + 10 > 21) {
        currentPlayer.value += 0;
      } else {
        currentPlayer.value += 10;
      }
    } else {
      currentPlayer.value += 0;
    }
    var standMessage = `${currentPlayer.name}, you chose to stand with a hand value of ${currentPlayer.value}.<br><br>`;
  } else if (gameMode == "player move split") {
    if (checkForAce(splitHand1) > -1) {
      if (splitValue1 + 10 > 21) {
        splitValue1 += 0;
      } else {
        splitValue1 += 10;
      }
    } else {
      splitValue1 += 0;
    }

    if (checkForAce(splitHand2) > -1) {
      if (splitValue2 + 10 > 21) {
        splitValue2 += 0;
      } else {
        splitValue2 += 10;
      }
    } else {
      splitValue2 += 0;
    }
    var standMessage = `${currentPlayer.name}, you chose to stand with a value of ${splitValue1} for your first hand and ${splitValue2} for your second hand.<br><br>`;
  }
  if (playerTurnIndex < playerInfo.length - 1) {
    playerTurnIndex += 1;
    currentPlayer = playerInfo[playerTurnIndex];
    standMessage += `${currentPlayer.name}, it is now your turn.<br>You have ${currentPlayer.points} points available for wager.<br>>>> Enter your bet and click "Play" to see your cards.`;
    gameMode = "player";
    // recap then ask next player to go
  } else if (playerTurnIndex == playerInfo.length - 1) {
    // recap and change game mode to dealer
    standMessage += `Click "Play" to see the dealer's hand.`;
    gameMode = "dealer";
  } else if (gameMode == "numPlayers" || gameMode == "username") {
    standMessage = `Please click "Play" to continue.`;
  } else {
    currentPlayer = playerInfo[playerTurnIndex];
    standMessage = `${currentPlayer.name}, please click "Play" to continue.`;
  }
  return standMessage;
};

// get message to show dealer hand
var getDealerHandMessage = function () {
  var dealerHandMsgIndex = 0;
  var dealerHandMessage = "";
  while (dealerHandMsgIndex < compHand.length) {
    dealerHandMessage += `${compHand[dealerHandMsgIndex].name} ${compHand[dealerHandMsgIndex].suit}<br>`;
    dealerHandMsgIndex += 1;
  }
  return dealerHandMessage;
};

// show dealer hand in full
var showDealerHand = function (input) {
  compValue = sumArray(compHand);
  var showDealerHandMsg = `Dealer holds:<br>${getDealerHandMessage()}<br> Dealer's hand value: ${compValue}<br><br>`;
  if (checkBlackjack(compHand) == true) {
    compValue = sumArray(compHand) + 10;
    showDealerHandMsg += `Dealer Blackjack! All players lose!<br><br>`;
    resetRound();
    dealCards();
    showDealerHandMsg += `${playerInfo[0].name}, enter your bet and click "Play" to deal again.`;
  } else {
    showDealerHandMsg += `Click "Play" to see the dealer's next move.`;
    gameMode = "dealer move";
  }
  return showDealerHandMsg;
};

// check if there is Ace in hand
var checkForAce = function (a) {
  aceArray = a;
  var getIndexOfAce = aceArray.findIndex((x) => x.name === "Ace");
  if (getIndexOfAce > -1) {
    return getIndexOfAce;
  }
};

// dealer move
var dealerTurn = function () {
  compValue = sumArray(compHand);
  var dealerTurnMsg = "";
  if (compValue < 17 && compHand.length < 5) {
    compHand.push(gameDeck.pop());
    compValue = sumArray(compHand);
    dealerTurnMsg = `Dealer chose to hit.<br><br>Dealer now holds:<br>${getDealerHandMessage()}<br>Dealer's hand value: ${compValue}<br><br>`;
    compValue = sumArray(compHand);
    if (compValue > 21) {
      dealerTurnMsg += `Dealer bust!<br><br>Click "Play" to see the results!`;
      gameMode = "results";
    } else {
      dealerTurnMsg += `Click "Play" to see the dealer's next move.`;
    }
  } else if (compValue >= 17 || (compValue < 17 && compHand.length >= 5)) {
    if (checkForAce(compHand) > -1) {
      if (compValue + 10 > 21) {
        compValue += 0;
      } else {
        compValue += 10;
      }
    } else {
      compValue += 0;
    }
    dealerTurnMsg = `Dealer chose to stand with a final hand value of ${compValue}.<br><br>Click "Play" to see the results!`;
    gameMode = "results";
  }
  return dealerTurnMsg;
};

// check if there is royal card in hand
var checkForRoyal = function (a) {
  royalArray = a;
  var getIndexOfRoyal = royalArray.findIndex(
    (x) => x.name === "Jack" || x.name === "Queen" || x.name === "King"
  );
  if (getIndexOfRoyal > -1) {
    return getIndexOfRoyal;
  }
};

// blackjack is royal card and ace
var checkBlackjack = function (a) {
  var handArray = a;
  // if one of the cards is Ace and if the other is J,Q,K
  if (
    handArray.length == 2 &&
    checkForAce(handArray) > -1 &&
    checkForRoyal(handArray) > -1
  ) {
    return true;
  } else {
    return false;
  }
};

var checkSplitEvent = function () {
  var call = false;
  if (splitValue1 > 0) {
    var call = true;
  }
  return call;
};
// GM:
// compare player hands against dealers
///recap
// dealer hand value

// var getResults = function () {
//   compValue = sumArray(compHand);
//   var resultMsg = `Dealer ended with a hand value of ${compValue}<br><br>`;
//   // if dealer busts, everyone wins back their bet *2 as long as player didnt bust
//   if (compValue > 21) {
//     playerTurnIndexA = 0;
//     while (playerTurnIndexA < playerInfo.length) {
//       var currPlayer = playerInfo[playerTurnIndexA];
//       if (currPlayer.value <= 21) {
//         currPlayer.points += currPlayer.bet * 2;
//         resultMsg += `${currPlayer.name} bet ${
//           currPlayer.bet
//         } points for hand value of ${currPlayer.value}.<br>${
//           currPlayer.name
//         } won and got back ${
//           currPlayer.bet * 2
//         } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
//       } else if (currPlayer.value > 21) {
//         currPlayer.points -= currPlayer.bet;
//         resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} bust and lost ${currPlayer.bet} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
//       }
//       playerTurnIndexA += 1;
//     }
//   } // if dealer blackjack, everyone loses
//   else if (checkBlackjack(compHand) == true) {
//     resultMsg += `Dealer blackjack! All players lose.<br><br>`;
//     playerTurnIndexB = 0;
//     while (playerTurnIndexB < playerInfo.length) {
//       currPlayer = playerInfo[playerTurnIndexB];
//       currPlayer.points -= currPlayer.bet;
//       resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} lost ${currPlayer.bet} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
//       playerTurnIndexB += 1;
//     }
//   } // if dealer didnt bust
//   else if (compValue <= 21) {
//     playerTurnIndexC = 0;
//     while (playerTurnIndexC < playerInfo.length) {
//       currPlayer = playerInfo[playerTurnIndexC];
//       // player with blackjack wins back their bet *2.5
//       if (checkBlackjack(currPlayer) == true) {
//         currPlayer.points += currPlayer.bet * 2.5;
//         resultMsg += `${currPlayer.name} bet ${
//           currPlayer.bet
//         } points for hand value of ${currPlayer.value}.<br>Blackjack! ${
//           currPlayer.name
//         } won and got back ${
//           currPlayer.bet * 2
//         } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
//       }
//       // players who bust loses their bet
//       else if (currPlayer.value > 21) {
//         currPlayer.points -= currPlayer.bet;
//         resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} bust and lost ${currPlayer.bet} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
//       }
//       // players with hands higher than dealer wins back their bet *2
//       else if (currPlayer.value > compValue) {
//         currPlayer.points += currPlayer.bet * 2;
//         resultMsg += `${currPlayer.name} bet ${
//           currPlayer.bet
//         } points for hand value of ${currPlayer.value}.<br>${
//           currPlayer.name
//         } won and got back ${
//           currPlayer.bet * 2
//         } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
//       }
//       // players with hands lower than dealer loses their bet
//       else if (currPlayer.value < compValue) {
//         currPlayer.points -= currPlayer.bet;
//         resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} lost ${currPlayer.bet} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
//       }
//       // players who tie with dealer gets back their bet
//       else if (currPlayer.value == compValue) {
//         resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} tied with Dealer and bet was returned.<br>Total points remaining: ${currPlayer.points}<br><br>`;
//       }
//       playerTurnIndexC += 1;
//     }
//   }
//   resetRound();
//   dealCards();
//   resultMsg += zeroPoints();
//   if (playerInfo.length > 0) {
//     resultMsg += `${playerInfo[0].name}, enter your bet and click "Play" to deal again.`;
//   } else {
//     resultMsg += `There are no more players. GAME OVER.<br><br>Click "Play" to start new game.`;
//     gameMode = "gameOver";
//   }
//   return resultMsg;
// };

var resetRound = function () {
  gameMode = "player";
  compHand = [];
  compValue = 0;
  currentPlayer = {};
  playerTurnIndex = 0;
  playerIndex = 0;
  splitHand1 = [];
  splitHand2 = [];
  splitValue1 = 0;
  splitValue2 = 0;
  splitBet1 = 0;
  splitBet2 = 0;
  while (playerIndex < playerInfo.length) {
    playerInfo[playerIndex].hand = [];
    playerInfo[playerIndex].value = 0;
    playerInfo[playerIndex].bet = 0;
    playerIndex += 1;
  }
};

var resetGame = function () {
  location.reload();
};

// What happens once zero points
var zeroPoints = function () {
  var zeroPointsMsg = "";
  var pointsCounter = 0;
  if (pointsCounter < playerInfo.length) {
    if (playerInfo[pointsCounter].points <= 0) {
      zeroPointsMsg += `${playerInfo[pointsCounter].name} has no more points to play and has been eliminated.<br><br>`;
      var elimPlayerArray = playerInfo.splice(pointsCounter, 1);
      var elimPlayerName = elimPlayerArray.pop().name;
      listElimPlayers.push(elimPlayerName);
    } else {
      listCounter = 0;
      while (listCounter < listElimPlayers.length) {
        zeroPointsMsg += `Eliminated Players:<br>${listElimPlayers[listCounter]}<br><br>`;
        listCounter += 1;
      }
    }
    pointsCounter += 1;
  }
  return zeroPointsMsg;
};

var splitPlayerIndex = 0;

// SPLIT FUNCTION

var split = function () {
  if (
    gameMode == "player move" &&
    playerInfo[playerTurnIndex].hand[0].name ==
      playerInfo[playerTurnIndex].hand[1].name
  ) {
    splitPlayerIndex = playerTurnIndex;
    gameMode = "player move split";
    // splice player Hand into 2 separate arrays
    var spliced = playerInfo[playerTurnIndex].hand.splice(0, 1);

    // convert hand in playerInfo into array
    playerInfo[playerTurnIndex].hand[0] = [playerInfo[playerTurnIndex].hand[0]];

    // push spliced hand as a separate array back to PlayerInfo.hand array
    playerInfo[playerTurnIndex].hand.push(spliced);

    // deal 1 card to each hand array within the hand array
    splitHand1 = playerInfo[playerTurnIndex].hand[0];
    splitHand2 = playerInfo[playerTurnIndex].hand[1];
    splitHand1.push(gameDeck.pop());
    splitHand2.push(gameDeck.pop());

    // assign value in array
    playerInfo[playerTurnIndex].value = [];
    playerInfo[playerTurnIndex].value.push(sumArray(splitHand1));
    playerInfo[playerTurnIndex].value.push(sumArray(splitHand2));
    splitValue1 = playerInfo[playerTurnIndex].value[0];
    splitValue2 = playerInfo[playerTurnIndex].value[1];

    // assign bets in array
    var splitPlayerBet = Number(playerInfo[playerTurnIndex].bet);
    playerInfo[playerTurnIndex].bet = [playerInfo[playerTurnIndex].bet];
    playerInfo[playerTurnIndex].bet.push(splitPlayerBet);
    splitBet1 = playerInfo[playerTurnIndex].bet[0];
    splitBet2 = playerInfo[playerTurnIndex].bet[1];

    var splitMessage = `You chose SPLIT.<br>You now hold two hands and the dealer has dealt another card for each hand.<br><br>First Hand:<br>${getHandMessage(
      splitHand1
    )}Hand Value: ${splitValue1}<br><br>Second Hand:<br>${getHandMessage(
      splitHand2
    )}Hand Value: ${splitValue2}<br><br>Please click "hit" to draw a card for each hand or "stay" to keep your hands as it is.`;
  } else {
    splitMessage = `Click "Play" to continue.`;
  }
  return splitMessage;
};

var splitHand1 = [];
var splitHand2 = [];
var splitValue1 = 0;
var splitValue2 = 0;
var splitBet1 = 0;
var splitBet2 = 0;

// player is shown hand after every hit
var showPlayerHandAftHitForSplit = function () {
  var showPlayerHandAftHitForSplitMsg = `${currentPlayer.name}, you chose HIT.`;
  splitValue1 = sumArray(splitHand1);
  splitValue2 = sumArray(splitHand2);
  // message for for first hand
  showPlayerHandAftHitForSplitMsg += `<br><br>First Hand:<br>${getHandMessage(
    splitHand1
  )}<br>Hand Value: ${splitValue1}<br>`;
  if (splitValue1 > 21) {
    showPlayerHandAftHitForSplitMsg += `<br>Oops, you bust!<br><br>`;
  }
  showPlayerHandAftHitForSplitMsg += `Second Hand:<br>${getHandMessage(
    splitHand2
  )}<br>Hand Value: ${splitValue2}`;
  if (splitValue2 > 21) {
    showPlayerHandAftHitForSplitMsg += `<br>Oops, you bust!<br><br>`;
  }
  showPlayerHandAftHitForSplitMsg += `<br><br>The dealer's face up card is:<br>${compHand[1].name} ${compHand[1].suit}`;
  if (splitValue1 > 21 && splitValue2 > 21) {
    if (playerTurnIndex < playerInfo.length - 1) {
      playerTurnIndex += 1;
      currentPlayer = playerInfo[playerTurnIndex];
      showPlayerHandAftHitForSplitMsg += `${currentPlayer.name}, it is now your turn.<br>You have ${currentPlayer.points} points available for wager.<br>>>> Enter your bet and click "Play" to see your cards.`;
      gameMode = "player";
    } else if (playerTurnIndex == playerInfo.length - 1) {
      showPlayerHandAftHitForSplitMsg += `<br><br>Click "Play" to see the dealer's hand.`;
      gameMode = "dealer";
    }
  } else {
    showPlayerHandAftHitForSplitMsg += `<br><br>Please click "hit" to draw another card<br>or click "stand" to keep your hand.`;
  }
  return showPlayerHandAftHitForSplitMsg;
};

var getResults = function () {
  compValue = sumArray(compHand);
  var resultMsg = `Dealer ended with a hand value of ${compValue}<br><br>`;
  // if dealer busts, everyone wins back their bet *2 as long as player didnt bust
  if (compValue > 21) {
    playerTurnIndexA = 0;
    while (playerTurnIndexA < playerInfo.length) {
      if (checkSplitEvent() == true && playerTurnIndexA == splitPlayerIndex) {
        var currPlayer = playerInfo[playerTurnIndexA];
        if (splitValue1 <= 21) {
          currPlayer.points += splitBet1 * 2;
          resultMsg += `${
            currPlayer.name
          } bet ${splitBet1} points for first hand value of ${splitValue1}.<br>${
            currPlayer.name
          } won and got back ${splitBet1 * 2} points.`;
        } else if (splitValue1 > 21) {
          currPlayer.points -= splitBet1;
          resultMsg += `${currPlayer.name} bet ${splitBet1} points for hand value of ${splitValue1}.<br>${currPlayer.name} bust and lost ${splitBet1} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }
        if (splitValue2 <= 21) {
          currPlayer.points += splitBet2 * 2;
          resultMsg += `${
            currPlayer.name
          } bet ${splitBet2} points for first hand value of ${splitValue2}.<br>${
            currPlayer.name
          } won and got back ${
            splitBet2 * 2
          } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        } else if (splitValue1 > 21) {
          currPlayer.points -= splitBet2;
          resultMsg += `${currPlayer.name} bet ${splitBet2} points for hand value of ${splitValue2}.<br>${currPlayer.name} bust and lost ${splitBet2} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }
      } else {
        var currPlayer = playerInfo[playerTurnIndexA];
        if (currPlayer.value <= 21) {
          currPlayer.points += currPlayer.bet * 2;
          resultMsg += `${currPlayer.name} bet ${
            currPlayer.bet
          } points for hand value of ${currPlayer.value}.<br>${
            currPlayer.name
          } won and got back ${
            currPlayer.bet * 2
          } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        } else if (currPlayer.value > 21) {
          currPlayer.points -= currPlayer.bet;
          resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} bust and lost ${currPlayer.bet} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }
        playerTurnIndexA += 1;
      }
    }
  }

  // if dealer blackjack, everyone loses
  else if (checkBlackjack(compHand) == true) {
    resultMsg += `Dealer blackjack! All players lose.<br><br>`;
    playerTurnIndexB = 0;
    while (playerTurnIndexB < playerInfo.length) {
      if (checkSplitEvent() == true && playerTurnIndexB == splitPlayerIndex) {
        currPlayer = playerInfo[playerTurnIndexB];
        currPlayer.points -= splitBet1;
        resultMsg += `${currPlayer.name} bet ${splitBet1} points for first hand value of ${splitValue1}.<br>${currPlayer.name} lost ${splitBet1} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        currPlayer.points -= splitBet2;
        resultMsg += `${currPlayer.name} bet ${splitBet2} points for first hand value of ${splitValue2}.<br>${currPlayer.name} lost ${splitBet2} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
      } else {
        currPlayer = playerInfo[playerTurnIndexB];
        currPlayer.points -= currPlayer.bet;
        resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} lost ${currPlayer.bet} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        playerTurnIndexB += 1;
      }
    }
  }

  // if dealer didnt bust
  else if (compValue <= 21) {
    playerTurnIndexC = 0;
    while (playerTurnIndexC < playerInfo.length) {
      if (checkSplitEvent() == true && playerTurnIndexC == splitPlayerIndex) {
        currPlayer = playerInfo[playerTurnIndexC];
        // player with blackjack wins back their bet *2.5
        if (checkBlackjack(splitHand1) == true) {
          currPlayer.points += splitBet1 * 2.5;
          resultMsg += `${
            currPlayer.name
          } bet ${splitBet1} points for hand value of ${splitValue1}.<br>Blackjack! ${
            currPlayer.name
          } won and got back ${
            splitBet1 * 2
          } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        } else if (splitValue1 > 21) {
          currPlayer.points -= splitBet1;
          resultMsg += `${currPlayer.name} bet ${splitBet1} points for hand value of ${splitValue1}.<br>${currPlayer.name} bust and lost ${splitBet1} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        } else if (splitValue1 > compValue) {
          currPlayer.points += splitBet1 * 2;
          resultMsg += `${
            currPlayer.name
          } bet ${splitBet1} points for hand value of ${splitValue1}.<br>${
            currPlayer.name
          } won and got back ${
            splitBet1 * 2
          } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        } else if (splitValue1 < compValue) {
          currPlayer.points -= splitBet1;
          resultMsg += `${currPlayer.name} bet ${splitBet1} points for hand value of ${splitValue1}.<br>${currPlayer.name} lost ${splitBet1} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        } else if (splitValue1 == compValue) {
          resultMsg += `${currPlayer.name} bet ${splitBet1} points for hand value of ${splitValue1}.<br>${currPlayer.name} tied with Dealer and bet was returned.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }

        if (checkBlackjack(splitHand2) == true) {
          currPlayer.points += splitBet2 * 2.5;
          resultMsg += `${
            currPlayer.name
          } bet ${splitBet2} points for hand value of ${splitValue2}.<br>Blackjack! ${
            currPlayer.name
          } won and got back ${
            splitBet2 * 2
          } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }

        // players who bust loses their bet
        else if (splitValue2 > 21) {
          currPlayer.points -= splitBet2;
          resultMsg += `${currPlayer.name} bet ${splitBet2} points for hand value of ${splitValue2}.<br>${currPlayer.name} bust and lost ${splitBet2} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }

        // players with hands higher than dealer wins back their bet *2
        else if (splitValue2 > compValue) {
          currPlayer.points += splitBet2 * 2;
          resultMsg += `${
            currPlayer.name
          } bet ${splitBet2} points for hand value of ${splitValue2}.<br>${
            currPlayer.name
          } won and got back ${
            splitBet2 * 2
          } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }

        // players with hands lower than dealer loses their bet
        else if (splitValue2 < compValue) {
          currPlayer.points -= splitBet2;
          resultMsg += `${currPlayer.name} bet ${splitBet2} points for hand value of ${splitValue2}.<br>${currPlayer.name} lost ${splitBet2} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }

        // players who tie with dealer gets back their bet
        else if (splitValue2 == compValue) {
          resultMsg += `${currPlayer.name} bet ${splitBet2} points for hand value of ${splitValue2}.<br>${currPlayer.name} tied with Dealer and bet was returned.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }
      } else {
        currPlayer = playerInfo[playerTurnIndexC];
        // player with blackjack wins back their bet *2.5
        if (checkBlackjack(currPlayer) == true) {
          currPlayer.points += currPlayer.bet * 2.5;
          resultMsg += `${currPlayer.name} bet ${
            currPlayer.bet
          } points for hand value of ${currPlayer.value}.<br>Blackjack! ${
            currPlayer.name
          } won and got back ${
            currPlayer.bet * 2
          } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }
        // players who bust loses their bet
        else if (currPlayer.value > 21) {
          currPlayer.points -= currPlayer.bet;
          resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} bust and lost ${currPlayer.bet} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }
        // players with hands higher than dealer wins back their bet *2
        else if (currPlayer.value > compValue) {
          currPlayer.points += currPlayer.bet * 2;
          resultMsg += `${currPlayer.name} bet ${
            currPlayer.bet
          } points for hand value of ${currPlayer.value}.<br>${
            currPlayer.name
          } won and got back ${
            currPlayer.bet * 2
          } points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }
        // players with hands lower than dealer loses their bet
        else if (currPlayer.value < compValue) {
          currPlayer.points -= currPlayer.bet;
          resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} lost ${currPlayer.bet} points.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }
        // players who tie with dealer gets back their bet
        else if (currPlayer.value == compValue) {
          resultMsg += `${currPlayer.name} bet ${currPlayer.bet} points for hand value of ${currPlayer.value}.<br>${currPlayer.name} tied with Dealer and bet was returned.<br>Total points remaining: ${currPlayer.points}<br><br>`;
        }
      }
      playerTurnIndexC += 1;
    }
  }

  resultMsg += zeroPoints();
  if (playerInfo.length > 0) {
    resultMsg += `${playerInfo[0].name}, enter your bet and click "Play" to deal again.`;
  } else {
    resultMsg += `There are no more players. GAME OVER.<br><br>Click "Play" to start new game.`;
    gameMode = "gameOver";
  }
  return resultMsg;
};
