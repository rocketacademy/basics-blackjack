var gameMode = 0;
var deck = [];
var playerCount = 0;
var playerList = [];
var playerIndex = 0;
var naturalList = [];

var main = function (input) {
  var myOutputValue = "♣♦♥♠";
  if (gameMode == 0) {
    deck = shuffleDeck(makeDeck());
    myOutputValue = "How many players are there including the dealer?<br><br>";
    myOutputValue +=
      "Please input a number from 2 through 8 and click the submit button.";
  } else if (gameMode == 1) {
    if (!isNaN(input) && input >= 2 && input <= 8) {
      initialisePlayers(input);
      myOutputValue = `There are ${input} players including the dealer.<br><br>`;
      myOutputValue += `Click the submit button to deal cards to all ${input} players.`;
    } else {
      myOutputValue = "You have entered an invalid input.<br><br>";
      myOutputValue +=
        "How many players are there including the dealer?<br><br>";
      myOutputValue +=
        "Please input a number from 2 through 8 and click the submit button.";
    }
  } else if (gameMode == 2) {
    dealCards();
    myOutputValue = displayDealtCards(); // change to show dealt cards
    gameMode += 1;
  } else if (gameMode == 3) {
    myOutputValue = "checking winning conditions...";
    myOutputValue += checkNaturalCondition();
  } else if (gameMode == 4) {
    playerIndex = checkPlayerValid();
    myOutputValue = checkEdge();
    console.log(playerList[playerIndex]);
  } else if (gameMode == 5) {
    console.log(playerList[playerIndex]);
    myOutputValue = playGame(input);
  } else if (gameMode == 6) {
    console.log("dealer stage");
    myOutputValue = dealerGame();
  } else if (gameMode == 7) {
    console.log("settlement stage");
    myOutputValue = checkWinningCondition();
  } else if (gameMode == 8) {
    playerCount = 0;
    playerIndex = 0;
    naturalList = [];
    gameMode = 0;
    console.log("reset stage");
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

var initialisePlayers = function (playerCount) {
  playerList = [];
  for (var i = 0; i < playerCount; i += 1) {
    playerList.push([]);
  }
  console.log(playerList);
  gameMode += 1;
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
  var myString = "";
  var dealerScore = calculatePlayerScore(playerList[playerList.length - 1]);
  if (dealerScore == 21) {
    for (var i = 0; i < playerList.length - 1; i += 1) {
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      if (currentPlayerScore == 21) {
        myString += `<br<br>Player ${i} stand-off`;
      } else if (currentPlayerScore != 21) {
        myString += `<br><br>Player ${i} loses`;
      }
    }
    gameMode = 0;
  } else if (dealerScore != 21) {
    for (var i = 0; i < playerList.length - 1; i += 1) {
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      if (currentPlayerScore == 21) {
        myString += `<br><br>Player ${i} wins`;
        naturalList.push(i);
      } else if (currentPlayerScore != 21) {
        myString += `<br><br>Player ${i} continues`;
      }
    }
    gameMode += 1;
  }
  return myString;
};

var checkPlayerValid = function () {
  for (var i = playerIndex; i < playerList.length - 1; i += 1) {
    var currentPlayer = playerList[i];
    var currentPlayerScore = calculatePlayerScore(currentPlayer);
    if (currentPlayerScore != 21) {
      gameMode += 1;
      return i;
    }
  }
};

var playGame = function (input) {
  var myString = "";
  if (input == "h") {
    playerList[playerIndex].push(deck.pop());
    var currentPlayerScore = calculatePlayerScore(playerList[playerIndex]);
    if (currentPlayerScore > 21) {
      myString = `Player ${playerIndex} has burst! Next Player!`;
      myString += defineNextPlayer();
    } else if (currentPlayerScore <= 21) {
      myString = `Player ${playerIndex} decides to hit! What next?`;
    }
  } else if (input == "s") {
    myString = `Player ${playerIndex} decides to stand! Next player!`;
    myString += defineNextPlayer();
  }
  return myString;
};

var defineNextPlayer = function () {
  var myString = "";
  if (playerIndex < playerList.length - 2) {
    playerIndex += 1;
    gameMode = 4;
  } else if (playerIndex == playerList.length - 2) {
    myString = `<br><br>Next player is the dealer.`;
    gameMode = 6;
  }
  return myString;
};

var checkEdge = function () {
  var myString = "";
  if (isNaN(playerIndex)) {
    gameMode = 6;
    myString = `Next player is the dealer.`;
  } else {
    myString = `Player ${playerIndex} turn is up! Type "h" to hit and "s" to stand.`;
  }
  return myString;
};

var dealerGame = function () {
  var dealer = playerList[playerList.length - 1];
  var dealerScore = calculatePlayerScore(dealer);
  var myString = `Dealer will stand. Has score of ${dealerScore}.`;
  while (dealerScore <= 16) {
    dealer.push(deck.pop());
    console.log("popping");
    dealerScore = calculatePlayerScore(dealer);
    console.log("updated dealer score: " + dealerScore);
    myString = `Dealer will stand. Has score of ${dealerScore}.`;
  }
  if (dealerScore > 21) {
    myString = `Dealer has burst. Has score of ${dealerScore}.`;
  }
  gameMode += 1;
  return myString;
};

var checkWinningCondition = function () {
  var myString = "";
  var dealer = playerList[playerList.length - 1];
  var dealerScore = calculatePlayerScore(dealer);
  if (dealerScore > 21) {
    console.log("dealer bust");
    for (var i = 0; i < playerList.length - 1; i += 1) {
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      // if player has hit 21, or less than 21
      // nothing happens if player has > 21
      if (!naturalList.includes(i)) {
        if (currentPlayerScore <= 21) {
          myString += `Player ${i} wins<br><br>`;
        }
      }
    }
  } else if (dealerScore <= 21) {
    console.log("dealer stand");
    for (var i = 0; i < playerList.length - 1; i += 1) {
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      // if player has hit 21, or less than 21
      // nothing happens if player has > 21
      if (!naturalList.includes(i)) {
        if (currentPlayerScore < dealerScore) {
          myString += `Player ${i} loses<br><br>`;
        } else if (currentPlayerScore == dealerScore) {
          myString += `Player ${i} ties<br><br>`;
        } else if (
          currentPlayerScore > dealerScore &&
          currentPlayerScore <= 21
        ) {
          myString += `Player ${i} wins<br><br>`;
        }
      }
    }
  }
  gameMode += 1;
  return myString;
};

var displayDealtCards = function () {
  var myString = "";
  for (var i = 0; i < playerList.length; i += 1) {
    myString += `Player ${i} cards:<br>`;
    myString += '<div class="row">';
    for (var j = 0; j < playerList[i].length; j += 1) {
      myString += displayCardImage(
        playerList[i][j].name,
        playerList[i][j].suit
      );
    }
    myString += "</div>";
    myString += "<br><br>";
  }
  return myString;
};

var displayCardImage = function (name, suit) {
  if (name == "ace" && suit == "hearts") {
    return '<div class="column"><img src="images/aceHearts.png" /></div>';
  } else if (name == 2 && suit == "hearts") {
    return '<div class="column"><img src="images/twoHearts.png" /></div>';
  } else if (name == 3 && suit == "hearts") {
    return '<div class="column"><img src="images/threeHearts.png" /></div>';
  } else if (name == 4 && suit == "hearts") {
    return '<div class="column"><img src="images/fourHearts.png" /></div>';
  } else if (name == 5 && suit == "hearts") {
    return '<div class="column"><img src="images/fiveHearts.png" /></div>';
  } else if (name == 6 && suit == "hearts") {
    return '<div class="column"><img src="images/sixHearts.png" /></div>';
  } else if (name == 7 && suit == "hearts") {
    return '<div class="column"><img src="images/sevenHearts.png" /></div>';
  } else if (name == 8 && suit == "hearts") {
    return '<div class="column"><img src="images/eightHearts.png" /></div>';
  } else if (name == 9 && suit == "hearts") {
    return '<div class="column"><img src="images/nineHearts.png" /></div>';
  } else if (name == 10 && suit == "hearts") {
    return '<div class="column"><img src="images/tenHearts.png" /></div>';
  } else if (name == "jack" && suit == "hearts") {
    return '<div class="column"><img src="images/jackHearts.png" /></div>';
  } else if (name == "queen" && suit == "hearts") {
    return '<div class="column"><img src="images/queenHearts.png" /></div>';
  } else if (name == "king" && suit == "hearts") {
    return '<div class="column"><img src="images/kingHearts.png" /></div>';
  } else if (name == "ace" && suit == "diamonds") {
    return '<div class="column"><img src="images/aceDiamonds.png" /></div>';
  } else if (name == 2 && suit == "diamonds") {
    return '<div class="column"><img src="images/twoDiamonds.png" /></div>';
  } else if (name == 3 && suit == "diamonds") {
    return '<div class="column"><img src="images/threeDiamonds.png" /></div>';
  } else if (name == 4 && suit == "diamonds") {
    return '<div class="column"><img src="images/fourDiamonds.png" /></div>';
  } else if (name == 5 && suit == "diamonds") {
    return '<div class="column"><img src="images/fiveDiamonds.png" /></div>';
  } else if (name == 6 && suit == "diamonds") {
    return '<div class="column"><img src="images/sixDiamonds.png" /></div>';
  } else if (name == 7 && suit == "diamonds") {
    return '<div class="column"><img src="images/sevenDiamonds.png" /></div>';
  } else if (name == 8 && suit == "diamonds") {
    return '<div class="column"><img src="images/eightDiamonds.png" /></div>';
  } else if (name == 9 && suit == "diamonds") {
    return '<div class="column"><img src="images/nineDiamonds.png" /></div>';
  } else if (name == 10 && suit == "diamonds") {
    return '<div class="column"><img src="images/tenDiamonds.png" /></div>';
  } else if (name == "jack" && suit == "diamonds") {
    return '<div class="column"><img src="images/jackDiamonds.png" /></div>';
  } else if (name == "queen" && suit == "diamonds") {
    return '<div class="column"><img src="images/queenDiamonds.png" /></div>';
  } else if (name == "king" && suit == "diamonds") {
    return '<div class="column"><img src="images/kingDiamonds.png" /></div>';
  } else if (name == "ace" && suit == "clubs") {
    return '<div class="column"><img src="images/aceClubs.png" /></div>';
  } else if (name == 2 && suit == "clubs") {
    return '<div class="column"><img src="images/twoClubs.png" /></div>';
  } else if (name == 3 && suit == "clubs") {
    return '<div class="column"><img src="images/threeClubs.png" /></div>';
  } else if (name == 4 && suit == "clubs") {
    return '<div class="column"><img src="images/fourClubs.png" /></div>';
  } else if (name == 5 && suit == "clubs") {
    return '<div class="column"><img src="images/fiveClubs.png" /></div>';
  } else if (name == 6 && suit == "clubs") {
    return '<div class="column"><img src="images/sixClubs.png" /></div>';
  } else if (name == 7 && suit == "clubs") {
    return '<div class="column"><img src="images/sevenClubs.png" /></div>';
  } else if (name == 8 && suit == "clubs") {
    return '<div class="column"><img src="images/eightClubs.png" /></div>';
  } else if (name == 9 && suit == "clubs") {
    return '<div class="column"><img src="images/nineClubs.png" /></div>';
  } else if (name == 10 && suit == "clubs") {
    return '<div class="column"><img src="images/tenClubs.png" /></div>';
  } else if (name == "jack" && suit == "clubs") {
    return '<div class="column"><img src="images/jackClubs.png" /></div>';
  } else if (name == "queen" && suit == "clubs") {
    return '<div class="column"><img src="images/queenClubs.png" /></div>';
  } else if (name == "king" && suit == "clubs") {
    return '<div class="column"><img src="images/kingClubs.png" /></div>';
  } else if (name == "ace" && suit == "spades") {
    return '<div class="column"><img src="images/aceSpades.png" /></div>';
  } else if (name == 2 && suit == "spades") {
    return '<div class="column"><img src="images/twoSpades.png" /></div>';
  } else if (name == 3 && suit == "spades") {
    return '<div class="column"><img src="images/threeSpades.png" /></div>';
  } else if (name == 4 && suit == "spades") {
    return '<div class="column"><img src="images/fourSpades.png" /></div>';
  } else if (name == 5 && suit == "spades") {
    return '<div class="column"><img src="images/fiveSpades.png" /></div>';
  } else if (name == 6 && suit == "spades") {
    return '<div class="column"><img src="images/sixSpades.png" /></div>';
  } else if (name == 7 && suit == "spades") {
    return '<div class="column"><img src="images/sevenSpades.png" /></div>';
  } else if (name == 8 && suit == "spades") {
    return '<div class="column"><img src="images/eightSpades.png" /></div>';
  } else if (name == 9 && suit == "spades") {
    return '<div class="column"><img src="images/nineSpades.png" /></div>';
  } else if (name == 10 && suit == "spades") {
    return '<div class="column"><img src="images/tenSpades.png" /></div>';
  } else if (name == "jack" && suit == "spades") {
    return '<div class="column"><img src="images/jackSpades.png" /></div>';
  } else if (name == "queen" && suit == "spades") {
    return '<div class="column"><img src="images/queenSpades.png" /></div>';
  } else if (name == "king" && suit == "spades") {
    return '<div class="column"><img src="images/kingSpades.png" /></div>';
  }
};

// ux

// display card?
// ace logic?
