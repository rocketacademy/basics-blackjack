var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥ hearts", "♦ diamonds", "♣ clubs", "♠ spades"];
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
  if (
    gameState == `registerPlayers` &&
    input != 1 &&
    input != 2 &&
    input != 3 &&
    input != 4 &&
    input != 5 &&
    input != 6
  ) {
    return `Please enter number of players against dealer!<br><br>Minimum: 1, Maximum: 6`;
  }
  if (gameState == `registerPlayers`) {
    numberOfPlayers = input;
    gameState = `betsCreate`;
    playerBet[Number(numberOfPlayers) + 1] = `0`; // for input validation in line 150
    for (counter = 1; counter <= numberOfPlayers; counter += 1) {
      //betting system not functional
      playerMoney[counter] = 100;
      playerBet[counter] = 0;
    }
    var moneyStatement =
      `Click "Submit" to continue<br><br>` + moneyLeft(numberOfPlayers);
    return moneyStatement;
  }
  if (gameState == `betsCreate`) {
    gameState = `betsIn`;
    roundCounter = 1;
    return `Player 1, place your bets`;
  }
  if (
    gameState == `betsIn` &&
    roundCounter <= numberOfPlayers &&
    (isNaN(input) == true || input <= 0 || input.length == 0)
  ) {
    return `Player ${roundCounter}, place your bets`;
  }
  if (gameState == `betsIn`) {
    playerBet[roundCounter] = input;
    if (playerMoney[roundCounter] == 0) {
      playerBet[roundCounter] = "";
      roundCounter += 1;
      return `Player ${roundCounter - 1} is broke. Bye bye.`;
    } else if (playerMoney[roundCounter] - playerBet[roundCounter] < 0) {
      // early return if no money 85 - 89
      return `You dont have enough money bro, you only have $${playerMoney[roundCounter]}`; // early return if no money 85 - 89
    } // early return if no money 85 - 89
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
      if (playerBet[counter] > 0) {
        player[counter].push(deck.pop());
        player[counter].push(deck.pop());
      } else {
      }
      // player[counter].push({ rank: 2 }); //to test multiple aces
      // player[counter].push({ rank: 11 });//to test multiple aces
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
    if (playerBet[roundCounter].length == 0) {
      roundCounter += 1;
      return `Sorry Player ${
        roundCounter - 1
      }, you're not in the game.<br><br>Click "Submit" to continue.😋`;
    } else {
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
          // player[roundCounter].push({ rank: 11 }); //to test multiple aces
          if (buster(roundCounter) >= 21) {
            scoreRec[roundCounter] = buster(roundCounter);
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
          scoreRec[roundCounter] = buster(roundCounter);
          roundCounter += 1;
          if (roundCounter > numberOfPlayers) {
            var cardsOnTableStatement =
              `Click "Submit" to continue<br><br>` +
              dealerHandsShown() +
              cardsOnTable(numberOfPlayers);
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
      scoreRec[0] = buster(0);
      // for (counter = 0; counter <= numberOfPlayers; counter += 1) {
      //   scoreRec.push(buster(counter));
      // }
      gameState = `whoWon`; //gameState = `betsCreate` if betting is functional
      // betCalculator(numberOfPlayers);
      // var statement =
      //   `Click "Submit" to continue<br><br>` + moneyLeft(numberOfPlayers);
      // return statement;
      // for (counter = 0; counter <= numberOfPlayers; counter += 1) {
      //   buster(counter);
      // }
      return `Click "Submit" to continue`;
    }
  }
  if (gameState == `whoWon`) {
    var finalStatement =
      `Click "Submit" to continue<br><br>` + scoreText(numberOfPlayers);
    gameState = `finalScore`;
    return finalStatement;
  }
  if (gameState == `finalScore`) {
    var finalStatement =
      `Click "Submit" to continue<br><br>` + moneyLeft(numberOfPlayers);
    gameState = `betsCreate`;
    return finalStatement;
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
var playerBet = [0];
var scoreRec = [];
var playerMoney = [9999];
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
  // var miniCounter = playerNo;
  for (counter = 0; counter < player[playerNo].length; counter += 1) {
    if (player[playerNo][counter].rank == 11) {
      aceCounter += 1;
    }
    score = score + player[playerNo][counter].rank;
  }
  if (score <= 21) {
    score = score; // what if player wants to use 2 aces?
  } else {
    for (counter = 1; counter <= aceCounter && score > 21; counter += 1) {
      score = score - 10; // what if player wants to use 2 aces?
    }
  }
  // scoreRec[miniCounter] = score;
  return score;
};

var scoreText = function (numberOfPlayers) {
  var statement = "";
  for (counter = 1; counter <= numberOfPlayers; counter += 1) {
    if (scoreRec[counter] == 21 && player[counter].length == 2) {
      playerMoney[counter] = playerMoney[counter] + 2.5 * playerBet[counter];
      statement = statement + `Player ${counter} has won stylishly.<br><br>`;
    } else if (scoreRec[counter] > 21 && scoreRec[0] > 21) {
      //difference between if and else if? - 1 outcome || if + if if got early return
      playerMoney[counter] = playerMoney[counter] + 1 * playerBet[counter];
      statement = statement + `Player ${counter} has bust with dealer.<br><br>`;
    } else if (scoreRec[counter] > 21 && scoreRec[0] < 22) {
      statement = statement + `Player ${counter} has bust.<br><br>`;
    } else if (
      scoreRec[counter] < 22 &&
      scoreRec[0] < 22 &&
      scoreRec[counter] > scoreRec[0]
    ) {
      playerMoney[counter] = playerMoney[counter] + 2 * playerBet[counter];
      statement = statement + `Player ${counter} has won.<br><br>`;
    } else if (
      scoreRec[counter] < 22 &&
      scoreRec[0] < 22 &&
      scoreRec[counter] < scoreRec[0]
    ) {
      statement = statement + `Player ${counter} has lost.<br><br>`;
    } else if (scoreRec[counter] < 22 && scoreRec[counter] == scoreRec[0]) {
      playerMoney[counter] = playerMoney[counter] + 1 * playerBet[counter];
      statement =
        statement + `Player ${counter} has drawn with dealer.<br><br>`;
    } else if (scoreRec[counter] < 22 && scoreRec[0] > 21) {
      playerMoney[counter] = playerMoney[counter] + 2 * playerBet[counter];
      statement = statement + `Player ${counter} has won.<br><br>`;
    }
  }
  return statement;
};
var moneyBet = function (numberOfPlayers) {
  var statement = `Click "Submit" to continue<br><br>`;
  for (counter = 1; counter <= numberOfPlayers; counter += 1) {
    statement =
      statement +
      `Player ${counter} has bet $${playerBet[counter]}.<br>Player ${counter} has $${playerMoney[counter]} left.<br><br>`;
  }
  return statement;
};
var moneyLeft = function (numberOfPlayers) {
  var statement = "";
  for (counter = 1; counter <= numberOfPlayers; counter += 1) {
    statement =
      statement +
      `Player ${counter} has $${playerMoney[counter]} left.<br><br>`;
  }
  return statement;
};

// nonsense down here trying to combine win/lose + bet outcome lol
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
// var winLose = function (numberOfPlayers){
//   for (counter)
// })
