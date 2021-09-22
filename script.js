var gameMode = 0;
var deck = [];
var playerList = [];
var playerIndex = 0;
var naturalList = [];
var bustList = [];

var main = function (input) {
  var myOutputValue = "♣♦♥♠";
  if (gameMode == 0) {
    myOutputValue = initialiseDeck();
  } else if (gameMode == 1) {
    myOutputValue = initialiseParticipants(input);
  } else if (gameMode == 2) {
    dealCards();
    myOutputValue = checkNaturalCondition();
    myOutputValue += displayDealtCards();
  } else if (gameMode == 3) {
    playerIndex = checkParticipantValid();
    myOutputValue = checkDealerOrPlayerTurn();
    myOutputValue += displayPlayerCards();
  } else if (gameMode == 4) {
    myOutputValue = playerGame(input);
  } else if (gameMode == 5) {
    myOutputValue = dealerGame();
  } else if (gameMode == 6) {
    myOutputValue = checkWinningCondition();
  } else if (gameMode == 7) {
    myOutputValue = resetGame();
  }

  return myOutputValue;
};

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
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // By default, the card value is the same as rankCounter
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      // If rank is 11, 12, or 13, set cardValue to 10
      // If rank is 1, set cardValue to 11
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, rank and value
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

var shuffleDeck = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex += 1;
  }
  // move gamemode forward 1 step
  gameMode += 1;
  // Return the shuffled deck
  return cardDeck;
};

var initialiseDeck = function () {
  deck = shuffleDeck(makeDeck());
  var myString =
    "How many players are there?<br><br>Please input a number from 1 through 7 and click the submit button.";
  return myString;
};

var initialiseParticipants = function (playerCount) {
  var myString = "";
  if (!isNaN(playerCount) && playerCount >= 1 && playerCount <= 7) {
    playerList = [];
    var participants = Number(playerCount) + 1;
    for (var i = 0; i < participants; i += 1) {
      playerList.push([]);
    }
    myString = `There are ${playerList.length} participants including the dealer.<br><br>Click the submit button to deal cards to all participants.`;
    gameMode += 1;
  } else {
    myString =
      "You have entered an invalid input.<br><br>How many players are there?<br><br>Please input a number from 1 through 7 and click the submit button.";
  }
  return myString;
};

var dealCards = function () {
  for (var j = 0; j < 2; j += 1) {
    for (var i = 0; i < playerList.length; i += 1) {
      playerList[i].push(deck.pop());
    }
  }
  console.log(playerList);
};

var calculatePlayerScore = function (player) {
  var totalScore = 0;
  for (var i = 0; i < player.length; i += 1) {
    totalScore += player[i].value;
  }
  return totalScore;
};

var checkNaturalCondition = function () {
  var myString = "Click the submit button to continue.<br><br>";
  var dealerScore = calculatePlayerScore(playerList[playerList.length - 1]);
  if (dealerScore == 21) {
    for (var i = 0; i < playerList.length - 1; i += 1) {
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      var displayNum = i + 1;
      if (currentPlayerScore == 21) {
        myString += `Player ${displayNum} stand-off<br>`;
      } else if (currentPlayerScore != 21) {
        myString += `Player ${displayNum} loses<br>`;
      }
    }
    gameMode = 0;
  } else if (dealerScore != 21) {
    for (var i = 0; i < playerList.length - 1; i += 1) {
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      var displayNum = i + 1;
      if (currentPlayerScore == 21) {
        myString += `Player ${displayNum} wins<br>`;
        naturalList.push(i);
      } else if (currentPlayerScore != 21) {
        myString += `Player ${displayNum} continues<br>`;
      }
    }
    // if all players get 21 except the dealer game reset
    if (naturalList.length == playerList.length - 1) {
      gameMode = 0;
    } else {
      gameMode += 1;
    }
  }
  myString += "<br>";
  return myString;
};

var checkParticipantValid = function () {
  for (var i = playerIndex; i < playerList.length; i += 1) {
    if (!naturalList.includes(i)) {
      gameMode += 1;
      return i;
    }
  }
};

var playerGame = function (input) {
  var myString = "";
  var displayNum = playerIndex + 1;
  if (input == "h") {
    playerList[playerIndex].push(deck.pop());
    var currentPlayerScore = calculatePlayerScore(playerList[playerIndex]);
    if (currentPlayerScore > 21) {
      currentPlayerScore = changeAceValue();
    }
    if (currentPlayerScore > 21) {
      bustList.push(playerIndex);
      myString = `Player ${displayNum} has bust!<br><br>Click the submit button to continue.<br><br>`;
      myString += displayPlayerCards();
      defineNextPlayer();
    } else if (currentPlayerScore <= 21) {
      myString = `Player ${displayNum} decides to hit!<br><br>Type 'h' to hit and 's' to stand.<br><br>`;
      myString += displayPlayerCards();
    }
  } else if (input == "s") {
    myString = `Player ${displayNum} decides to stand!<br><br>Click the submit button to continue.<br><br>`;
    myString += displayPlayerCards();
    defineNextPlayer();
  } else {
    myString = `Player ${displayNum} turn!<br><br>Type 'h' to hit and 's' to stand.<br><br>`;
    myString += displayPlayerCards();
  }
  return myString;
};

var changeAceValue = function () {
  var player = playerList[playerIndex];
  var playerScore = calculatePlayerScore(player);
  var aceCounter = 0;
  for (var i = 0; i < player.length; i += 1) {
    if (player[i].rank == 1 && player[i].value == 11) {
      aceCounter += 1;
    }
  }
  if (aceCounter > 0) {
    for (var j = 0; j < player.length; j += 1) {
      if (playerScore > 21) {
        if (player[j].rank == 1 && player[j].value == 11) {
          player[j].value = 1;
          playerScore = calculatePlayerScore(player);
        }
      }
    }
  }
  return playerScore;
};

var defineNextPlayer = function () {
  if (playerIndex < playerList.length - 1) {
    playerIndex += 1;
    gameMode -= 1;
  }
  if (bustList.length + naturalList.length == playerList.length - 1) {
    gameMode = 6;
  }
};

var checkDealerOrPlayerTurn = function () {
  var myString = "";
  if (playerIndex == playerList.length - 1) {
    myString = `Dealer turn is up!<br><br>Click the submit button to continue.<br><br>`;
    gameMode += 1;
  } else {
    var displayNum = playerIndex + 1;
    myString = `Player ${displayNum} turn!<br><br>Type 'h' to hit and 's' to stand.<br><br>`;
  }
  return myString;
};

var dealerGame = function () {
  var dealer = playerList[playerList.length - 1];
  var dealerScore = calculatePlayerScore(dealer);
  var myString = `Click the submit button to continue.<br><br>Dealer will stand with score of ${dealerScore}.<br><br>`;
  while (dealerScore <= 16) {
    dealer.push(deck.pop());
    dealerScore = calculatePlayerScore(dealer);
    if (dealerScore > 21) {
      dealerScore = changeAceValue();
    }
    myString = `Click the submit button to continue.<br><br>Dealer will stand with score of ${dealerScore}.<br><br>`;
  }
  if (dealerScore > 21) {
    myString = `Click the submit button to continue.<br><br>Dealer has bust with score of ${dealerScore}.<br><br>`;
  }
  myString += displayPlayerCards();
  gameMode += 1;
  return myString;
};

var checkWinningCondition = function () {
  var myString = "Click the submit button to continue.<br><br>";
  var dealer = playerList[playerList.length - 1];
  var dealerScore = calculatePlayerScore(dealer);
  if (dealerScore > 21) {
    for (var i = 0; i < playerList.length - 1; i += 1) {
      var displayNum = i + 1;
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      // if player has hit 21, or less than 21
      // nothing happens if player has > 21
      if (!naturalList.includes(i)) {
        if (currentPlayerScore <= 21) {
          myString += `Player ${displayNum} wins<br>`;
        }
      }
    }
  } else if (dealerScore <= 21) {
    for (var i = 0; i < playerList.length - 1; i += 1) {
      var displayNum = i + 1;
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      // if player has hit 21, or less than 21
      // nothing happens if player has > 21
      if (!naturalList.includes(i)) {
        if (currentPlayerScore < dealerScore) {
          myString += `Player ${displayNum} loses<br>`;
        } else if (currentPlayerScore == dealerScore) {
          myString += `Player ${displayNum} ties<br>`;
        } else if (
          currentPlayerScore > dealerScore &&
          currentPlayerScore <= 21
        ) {
          myString += `Player ${displayNum} wins<br>`;
        }
      }
    }
  }
  myString += "<br>";
  myString += displayDealtCards();
  gameMode += 1;
  return myString;
};

var resetGame = function () {
  gameMode = 0;
  playerIndex = 0;
  naturalList = [];
  bustList = [];
  var myString = "Click the submit button to reset the game.";
  return myString;
};

var displayDealtCards = function () {
  var myString = "";
  for (var i = 0; i < playerList.length; i += 1) {
    if (i == playerList.length - 1) {
      myString += `Dealer cards:<br><div class="row">`;
    } else {
      var displayNum = i + 1;
      myString += `Player ${displayNum} cards:<br><div class="row">`;
    }
    if (i == playerList.length - 1) {
      var dealerScore = calculatePlayerScore(playerList[i]);
      for (var j = 0; j < playerList[i].length; j += 1) {
        if (
          j == playerList[i].length - 1 &&
          gameMode < 4 &&
          dealerScore != 21
        ) {
          myString += displayCardImage("cover", "cover");
        } else {
          myString += displayCardImage(
            playerList[i][j].name,
            playerList[i][j].suit
          );
        }
      }
    } else {
      for (var j = 0; j < playerList[i].length; j += 1) {
        myString += displayCardImage(
          playerList[i][j].name,
          playerList[i][j].suit
        );
      }
    }
    myString += "</div><br>";
  }
  return myString;
};

var displayCardImage = function (name, suit) {
  if (name == "ace" && suit == "hearts") {
    return '<div class="column"><img src="images/aceHearts.PNG" /></div>';
  } else if (name == 2 && suit == "hearts") {
    return '<div class="column"><img src="images/twoHearts.PNG" /></div>';
  } else if (name == 3 && suit == "hearts") {
    return '<div class="column"><img src="images/threeHearts.PNG" /></div>';
  } else if (name == 4 && suit == "hearts") {
    return '<div class="column"><img src="images/fourHearts.PNG" /></div>';
  } else if (name == 5 && suit == "hearts") {
    return '<div class="column"><img src="images/fiveHearts.PNG" /></div>';
  } else if (name == 6 && suit == "hearts") {
    return '<div class="column"><img src="images/sixHearts.PNG" /></div>';
  } else if (name == 7 && suit == "hearts") {
    return '<div class="column"><img src="images/sevenHearts.PNG" /></div>';
  } else if (name == 8 && suit == "hearts") {
    return '<div class="column"><img src="images/eightHearts.PNG" /></div>';
  } else if (name == 9 && suit == "hearts") {
    return '<div class="column"><img src="images/nineHearts.PNG" /></div>';
  } else if (name == 10 && suit == "hearts") {
    return '<div class="column"><img src="images/tenHearts.PNG" /></div>';
  } else if (name == "jack" && suit == "hearts") {
    return '<div class="column"><img src="images/jackHearts.PNG" /></div>';
  } else if (name == "queen" && suit == "hearts") {
    return '<div class="column"><img src="images/queenHearts.PNG" /></div>';
  } else if (name == "king" && suit == "hearts") {
    return '<div class="column"><img src="images/kingHearts.PNG" /></div>';
  } else if (name == "ace" && suit == "diamonds") {
    return '<div class="column"><img src="images/aceDiamonds.PNG" /></div>';
  } else if (name == 2 && suit == "diamonds") {
    return '<div class="column"><img src="images/twoDiamonds.PNG" /></div>';
  } else if (name == 3 && suit == "diamonds") {
    return '<div class="column"><img src="images/threeDiamonds.PNG" /></div>';
  } else if (name == 4 && suit == "diamonds") {
    return '<div class="column"><img src="images/fourDiamonds.PNG" /></div>';
  } else if (name == 5 && suit == "diamonds") {
    return '<div class="column"><img src="images/fiveDiamonds.PNG" /></div>';
  } else if (name == 6 && suit == "diamonds") {
    return '<div class="column"><img src="images/sixDiamonds.PNG" /></div>';
  } else if (name == 7 && suit == "diamonds") {
    return '<div class="column"><img src="images/sevenDiamonds.PNG" /></div>';
  } else if (name == 8 && suit == "diamonds") {
    return '<div class="column"><img src="images/eightDiamonds.PNG" /></div>';
  } else if (name == 9 && suit == "diamonds") {
    return '<div class="column"><img src="images/nineDiamonds.PNG" /></div>';
  } else if (name == 10 && suit == "diamonds") {
    return '<div class="column"><img src="images/tenDiamonds.PNG" /></div>';
  } else if (name == "jack" && suit == "diamonds") {
    return '<div class="column"><img src="images/jackDiamonds.PNG" /></div>';
  } else if (name == "queen" && suit == "diamonds") {
    return '<div class="column"><img src="images/queenDiamonds.PNG" /></div>';
  } else if (name == "king" && suit == "diamonds") {
    return '<div class="column"><img src="images/kingDiamonds.PNG" /></div>';
  } else if (name == "ace" && suit == "clubs") {
    return '<div class="column"><img src="images/aceClubs.PNG" /></div>';
  } else if (name == 2 && suit == "clubs") {
    return '<div class="column"><img src="images/twoClubs.PNG" /></div>';
  } else if (name == 3 && suit == "clubs") {
    return '<div class="column"><img src="images/threeClubs.PNG" /></div>';
  } else if (name == 4 && suit == "clubs") {
    return '<div class="column"><img src="images/fourClubs.PNG" /></div>';
  } else if (name == 5 && suit == "clubs") {
    return '<div class="column"><img src="images/fiveClubs.PNG" /></div>';
  } else if (name == 6 && suit == "clubs") {
    return '<div class="column"><img src="images/sixClubs.PNG" /></div>';
  } else if (name == 7 && suit == "clubs") {
    return '<div class="column"><img src="images/sevenClubs.PNG" /></div>';
  } else if (name == 8 && suit == "clubs") {
    return '<div class="column"><img src="images/eightClubs.PNG" /></div>';
  } else if (name == 9 && suit == "clubs") {
    return '<div class="column"><img src="images/nineClubs.PNG" /></div>';
  } else if (name == 10 && suit == "clubs") {
    return '<div class="column"><img src="images/tenClubs.PNG" /></div>';
  } else if (name == "jack" && suit == "clubs") {
    return '<div class="column"><img src="images/jackClubs.PNG" /></div>';
  } else if (name == "queen" && suit == "clubs") {
    return '<div class="column"><img src="images/queenClubs.PNG" /></div>';
  } else if (name == "king" && suit == "clubs") {
    return '<div class="column"><img src="images/kingClubs.PNG" /></div>';
  } else if (name == "ace" && suit == "spades") {
    return '<div class="column"><img src="images/aceSpades.PNG" /></div>';
  } else if (name == 2 && suit == "spades") {
    return '<div class="column"><img src="images/twoSpades.PNG" /></div>';
  } else if (name == 3 && suit == "spades") {
    return '<div class="column"><img src="images/threeSpades.PNG" /></div>';
  } else if (name == 4 && suit == "spades") {
    return '<div class="column"><img src="images/fourSpades.PNG" /></div>';
  } else if (name == 5 && suit == "spades") {
    return '<div class="column"><img src="images/fiveSpades.PNG" /></div>';
  } else if (name == 6 && suit == "spades") {
    return '<div class="column"><img src="images/sixSpades.PNG" /></div>';
  } else if (name == 7 && suit == "spades") {
    return '<div class="column"><img src="images/sevenSpades.PNG" /></div>';
  } else if (name == 8 && suit == "spades") {
    return '<div class="column"><img src="images/eightSpades.PNG" /></div>';
  } else if (name == 9 && suit == "spades") {
    return '<div class="column"><img src="images/nineSpades.PNG" /></div>';
  } else if (name == 10 && suit == "spades") {
    return '<div class="column"><img src="images/tenSpades.PNG" /></div>';
  } else if (name == "jack" && suit == "spades") {
    return '<div class="column"><img src="images/jackSpades.PNG" /></div>';
  } else if (name == "queen" && suit == "spades") {
    return '<div class="column"><img src="images/queenSpades.PNG" /></div>';
  } else if (name == "king" && suit == "spades") {
    return '<div class="column"><img src="images/kingSpades.PNG" /></div>';
  } else if (name == "cover" && suit == "cover") {
    return '<div class="column"><img src="images/coverCard.PNG" /></div>';
  }
};

var displayPlayerCards = function () {
  var myString = "";
  if (playerIndex == playerList.length - 1) {
    myString = `Dealer cards:<br><div class ="row">`;
  } else {
    var displayNum = playerIndex + 1;
    myString = `Player ${displayNum} cards:<br><div class="row">`;
  }
  for (var i = 0; i < playerList[playerIndex].length; i += 1) {
    myString += displayCardImage(
      playerList[playerIndex][i].name,
      playerList[playerIndex][i].suit
    );
  }
  myString += "</div><br>";
  return myString;
};

//////////////////////////////////////

// plug gap when all bust but continue to play dealer
// if playerlist.length - 1 == bustlist + naturallist
