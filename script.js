var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  for (suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];
    for (rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
    }
  }
  for (counter = 0; counter < cardDeck.length; counter += 1) {
    //J,Q,K all = 10, A = 11 by default
    if (
      cardDeck[counter].rank == 11 ||
      cardDeck[counter].rank == 12 ||
      cardDeck[counter].rank == 13
    ) {
      cardDeck[counter].rank = 10;
    }
    if (cardDeck[counter].rank == 1) {
      cardDeck[counter].rank = 11;
    }
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

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

var main = function (input) {
  // remember to early return otherwise the input from the first time will be used forever!
  if (gameState == `gameStart`) {
    deck = shuffleCards(makeDeck()); // why doesn't var deck = shuffleCards(makeDeck()) work here
    console.log(deck);
    gameState = `registerPlayers`; // why doesn't var gameState = `dealerDealsFirstCard` work here
    return `Please enter number of players against dealer!<br><br>Minimum: 1, Maximum: 6`;
  }
  if (gameState == `registerPlayers`) {
    numberOfPlayers = input;
    gameState = `dealerDeals`;
    // for (counter = 1; counter <= numberOfPlayers; counter += 1) {
    //betting system not functional
    // playerMoney[counter] = 100;
    // playerBet[counter] = 0;
    // }
    return `Click "Submit" to continue`;
  }
  if (gameState == `betsCreate`) {
    gameState = `betsIn`;
    roundCounter = 1;
    return `Player 1, place your bets`;
  }
  if (gameState == `betsIn`) {
    playerBet[roundCounter] = input;
    playerMoney[roundCounter] =
      playerMoney[roundCounter] - playerBet[roundCounter];
    roundCounter += 1;
    if (roundCounter > numberOfPlayers) {
      gameState = `dealerDeals`;
      var moneyStatement = moneyBet(numberOfPlayers);
    } else {
      var moneyStatement = `Player ${roundCounter}, place your bets`;
    }
    return moneyStatement;
  } //betting system not functional
  if (gameState == `dealerDeals`) {
    for (counter = 1; counter <= numberOfPlayers; counter += 1) {
      player[counter] = [];
      player[counter].push(deck.pop());
      player[counter].push(deck.pop());
    }
    player[0] = [];
    player[0].push(deck.pop());
    player[0].push(deck.pop());
    dealerHandsHiddenText = `Dealer has:<br>
    ${player[0][0].name} of ${player[0][0].suit}<br>
    and one hidden card<br><br>`;
    gameState = `hitStandBegins`;
    var cardsOnTableStatement =
      playerActionText(1) +
      dealerHandsHiddenText +
      cardsOnTable(numberOfPlayers);
    roundCounter = 1;
    return cardsOnTableStatement;
  }
  if (gameState == `hitStandBegins`) {
    // if (buster(roundCounter) >= 21) {
    //   roundCounter += 1;
    // }
    if (roundCounter <= numberOfPlayers) {
      if (input != `Hit` && input != `Stand`) {
        var cardsOnTableStatement =
          playerActionText(roundCounter) +
          dealerHandsHiddenText +
          cardsOnTable(numberOfPlayers);
        return cardsOnTableStatement;
      }
      if (input == `Hit`) {
        player[roundCounter].push(deck.pop());
        if (buster(roundCounter) >= 21) {
          roundCounter += 1;
        }
        if (roundCounter > numberOfPlayers) {
          //does this make sense with next else statement
          var cardsOnTableStatement =
            dealerHandsShown() + cardsOnTable(numberOfPlayers);
        } else {
          var cardsOnTableStatement =
            playerActionText(roundCounter) +
            dealerHandsHiddenText +
            cardsOnTable(numberOfPlayers);
        }
      }
      if (input == `Stand`) {
        roundCounter += 1;
        if (roundCounter > numberOfPlayers) {
          var cardsOnTableStatement =
            dealerHandsShown() + cardsOnTable(numberOfPlayers);
        } else {
          var cardsOnTableStatement =
            playerActionText(roundCounter) +
            dealerHandsHiddenText +
            cardsOnTable(numberOfPlayers);
        }
      }
      return cardsOnTableStatement;
    } else {
      gameState = `dealerTurn`;
    }
  }
  if (gameState == `dealerTurn`) {
    if (buster(0) < 17) {
      player[0].push(deck.pop());

      var cardsOnTableStatement =
        `Click "Submit" to continue<br><br>` +
        dealerHandsShown() +
        cardsOnTable(numberOfPlayers);
      return cardsOnTableStatement;
    } else {
      // for (counter = 0; counter <= numberOfPlayers; counter += 1) {
      //   scoreRec.push(buster(counter));
      // }
      gameState = `dealerDeals`; //gameState = `betsCreate` if betting is functional
      // betCalculator(numberOfPlayers);
      // var statement =
      //   `Click "Submit" to continue<br><br>` + moneyLeft(numberOfPlayers);
      // return statement;
      return `Click "Submit" to continue`;
    }
  }
};

/*too troublesome to deal two cards separately
  if (gameState == `dealerDealsSecondCard`) {
    for (counter = 1; counter <= numberOfPlayers; counter += 1) {
      player[counter].push(deck.pop());
    }
    player[0].push(deck.pop());
    gameState = `trueGameStart`;
    return `Dealer has dealt second card to all`;
  }
  */
// playerBet = [0];
// scoreRec = [];
// playerMoney = [100];
var gameState = `gameStart`;
var roundCounter = 1;
var player = [`dealer`]; // dealer is 0
var numberOfPlayers = ""; // against dealer
var cardsOnTable = function (numberOfPlayers) {
  //this function is the most important function ever
  var statement = "";
  for (counter = 1; counter <= numberOfPlayers; counter += 1) {
    statement = statement + `Player ${counter} has:<br>`;
    for (
      innercounter = 0;
      innercounter < player[counter].length;
      innercounter += 1
    ) {
      statement =
        statement +
        `${player[counter][innercounter].name} of ${player[counter][innercounter].suit}<br>`;
    }

    statement = statement + `<br>`;
  }
  return statement;
};
var dealerHandsShown = function () {
  var statement = `Dealer has:<br>`;
  for (counter = 0; counter < player[0].length; counter += 1) {
    statement =
      statement +
      `${player[0][counter].name} of ${player[0][counter].suit}<br>`;
  }
  statement = statement + `<br>`;
  return statement;
};

var playerActionText = function (playerNo) {
  var statement = `Player ${playerNo}, please "Hit" or "Stand"!<br><br>`;
  return statement;
};

var buster = function (playerNo) {
  var score = 0;
  var aceCounter = 0;
  for (counter = 0; counter < player[playerNo].length; counter += 1) {
    if (player[playerNo][counter].rank == 11) {
      aceCounter += 1;
    }
    score = score + player[playerNo][counter].rank;
  }
  if (score > 21) {
    score = score - aceCounter * 10;
  }
  return score;
};
// var moneyBet = function (numberOfPlayers) {
//   var statement = `Click "Submit" to continue<br><br>`;
//   for (counter = 1; counter <= numberOfPlayers; counter += 1) {
//     statement =
//       statement +
//       `Player ${counter} has bet $${playerBet[counter]}.<br>Player ${counter} has $${playerMoney[counter]} left.<br><br>`;
//   }
//   return statement;
// };
// var moneyLeft = function (numberOfPlayers) {
//   var statement = "";
//   for (counter = 1; counter <= numberOfPlayers; counter += 1) {
//     statement =
//       statement +
//       `Player ${counter} has $${playerMoney[counter]} left.<br><br>`;
//   }
//   return statement;
// };
// var betCalculator = function (numberOfPlayers) {
//   for (counter = 1; counter <= numberOfPlayers; counter += 1) {
//     if (scoreRec[counter] == 21 && player[counter].length == 2) {
//       playerMoney[counter] = playerBet[counter] * 2.5 + playerMoney[counter];
//       playerMoney[0] = playerMoney[0] - playerBet[counter] * 1.5;
//       return numberOfPlayers; //early returns?
//     } else if (scoreRec[counter] > 21) {
//       playerMoney[0] = playerMoney[0] + playerBet[counter];
//       return numberOfPlayers; //early returns?
//     } else if (scoreRec[0] > 21 && scoreRec[counter] <= 21) {
//       playerMoney[0] = playerMoney[0] - playerBet[counter];
//       playerMoney[counter] = playerMoney[counter] + 2 * playerBet[counter];
//       return numberOfPlayers; //early returns?
//     } else if (scoreRec[0] == scoreRec[counter] && scoreRec[0] <= 21) {
//       playerMoney[counter] = playerMoney[counter] + playerBet[counter];
//       return numberOfPlayers; //early returns?
//     } else if (scoreRec[0] > scoreRec[counter] && scoreRec[0] <= 21) {
//       playerMoney[0] = playerMoney[0] + playerBet[counter];
//       return numberOfPlayers; //early returns?
//     }
//   }
// };
