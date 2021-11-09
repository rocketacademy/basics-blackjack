// gamestate
var gameMode = 0;
// an array representing a deck of cards
var deck = [];
// an array of arrays where each represents a player
var playerList = [];
// index number of current player
var playerIndex = 0;
// an array of index numbers of players who won with initial dealt cards
var naturalList = [];
// an array of index numbers of players who bust
var bustList = [];

var main = function (input) {
  var myOutputValue = "♣♦♥♠";
  if (gameMode == 0) {
    // initialise a deck of card with user instructions and move gamestate forward one step
    myOutputValue = initialiseDeck();
  } else if (gameMode == 1) {
    // initialise the playerList with empty arrays representing all participants and move the gamestate forward one step
    myOutputValue = initialiseParticipants(input);
  } else if (gameMode == 2) {
    // deal cards to all participants
    dealCards();
    // check for initial game winning conditions and move the gamestate forward one step
    myOutputValue = checkNaturalCondition();
    // display the dealt card objects as images
    myOutputValue += displayDealtCards();
  } else if (gameMode == 3) {
    // return the index of a valid participant and move the gamestate forward one step
    playerIndex = checkParticipantValid();
    // identify if the current valid participant is the dealer or a player
    myOutputValue = checkDealerOrPlayerTurn();
    // display the current participant's cards
    myOutputValue += displayPlayerCards();
    // if the current participant is not the dealer
    if (playerIndex != playerList.length - 1) {
      // display the dealer's cards with the second card face down
      myOutputValue += displayDealerCards();
    }
  } else if (gameMode == 4) {
    // function that defines the game logic including changing the gamestate during any player's turn
    // includes input validation and user instruction
    myOutputValue = playerGame(input);
  } else if (gameMode == 5) {
    // function that define the game logic during the dealer's turn and move the gamestate forward one step
    myOutputValue = dealerGame();
  } else if (gameMode == 6) {
    // check for game winning conditions and move the gamestate forward one step
    myOutputValue = checkWinningCondition();
  } else if (gameMode == 7) {
    // reset gloval variables and provide user instruction
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
  // make and shuffle a list of objects representing a deck of cards and store in deck
  deck = shuffleDeck(makeDeck());
  // provide instructions for input of number of players
  var myString =
    "How many players are there?<br><br>Please input a number from 1 through 7 and click the submit button.";
  return myString;
};

var initialiseParticipants = function (playerCount) {
  var myString = "";
  // input validation condition to accept numbers 1 through 7 only
  if (!isNaN(playerCount) && playerCount >= 1 && playerCount <= 7) {
    // ensure playerList is an empty array
    playerList = [];
    // participants is the number of players plus one dealer
    var participants = Number(playerCount) + 1;
    // for each participant push an empty array into playerList to represent them
    for (var i = 0; i < participants; i += 1) {
      playerList.push([]);
    }
    // acknowledge the number of participants and provide user instruction
    myString = `There are ${playerList.length} participants including the dealer.<br><br>Click the submit button to deal cards to all participants.`;
    // move gamestate forward one step
    gameMode += 1;
  } else {
    // acknowledge an invalid input and reiterate question with user instruction
    myString =
      "You have entered an invalid input.<br><br>How many players are there?<br><br>Please input a number from 1 through 7 and click the submit button.";
  }
  return myString;
};

var dealCards = function () {
  // for two rounds
  for (var j = 0; j < 2; j += 1) {
    // for each participant deal a card from the deck
    for (var i = 0; i < playerList.length; i += 1) {
      playerList[i].push(deck.pop());
    }
  }
  // print to check what cards are dealt
  //console.log(playerList);
};

var calculatePlayerScore = function (player) {
  // initialise player score at 0
  var totalScore = 0;
  // for all cards in a player
  for (var i = 0; i < player.length; i += 1) {
    // sum the value of cards
    totalScore += player[i].value;
  }
  return totalScore;
};

var checkNaturalCondition = function () {
  // provide user instruction
  var myString = "Click the submit button to continue.<br><br>";
  // determine the score of the dealer's cards
  var dealerScore = calculatePlayerScore(playerList[playerList.length - 1]);
  // if the scenario is the dealer with a score of 21
  if (dealerScore == 21) {
    // for all players except the dealer
    for (var i = 0; i < playerList.length - 1; i += 1) {
      // determine the score of the player
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      // player number representation
      var displayNum = i + 1;
      // if the score of the player is 21
      if (currentPlayerScore == 21) {
        // the player will tie with the dealer
        myString += `Player ${displayNum} stand-off<br>`;
        // if the score of the player is not 21
      } else if (currentPlayerScore != 21) {
        // the player will lose to the dealer
        myString += `Player ${displayNum} loses<br>`;
      }
    }
    // gamestate is reset as all players tie or lose
    gameMode = 0;
    // if the scenario is the dealer with a score not 21
  } else if (dealerScore != 21) {
    // for all players except the dealer
    for (var i = 0; i < playerList.length - 1; i += 1) {
      // determine the score of the player
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      // player number representation
      var displayNum = i + 1;
      // if the score of the player is 21
      if (currentPlayerScore == 21) {
        // the player wins against the dealer
        myString += `Player ${displayNum} wins<br>`;
        // the index of the player that wins is pushed to the naturalList array
        naturalList.push(i);
        // if the score of the player is not 21
      } else if (currentPlayerScore != 21) {
        // the player continues on to play the game against the dealer
        myString += `Player ${displayNum} continues<br>`;
      }
    }
    // in the unlikely scenario of all players drawing a blackjack
    if (naturalList.length == playerList.length - 1) {
      // the game will reset as all players win against the dealer
      gameMode = 0;
    } else {
      // move gamestate forward one step for continuing players
      gameMode += 1;
    }
  }
  myString += "<br>";
  return myString;
};

var checkParticipantValid = function () {
  // for all participants
  for (var i = playerIndex; i < playerList.length; i += 1) {
    // if the player has not won with their initially dealt cards
    if (!naturalList.includes(i)) {
      // move the gamestate forward one step
      gameMode += 1;
      // return the index of a valid participant
      return i;
    }
  }
};

var playerGame = function (input) {
  var myString = "";
  // player number representation
  var displayNum = playerIndex + 1;
  // if the user hits
  if (input == "h") {
    // draw a card from the deck in the player's hand
    playerList[playerIndex].push(deck.pop());
    // calculate the player's score
    var currentPlayerScore = calculatePlayerScore(playerList[playerIndex]);
    // if the player has tentatively bust after hitting
    if (currentPlayerScore > 21) {
      // check for aces and update player score
      currentPlayerScore = changeAceValue();
    }
    // if the current player bust
    if (currentPlayerScore > 21) {
      // push the index of the bust player to the array bustList
      bustList.push(playerIndex);
      // state player has bust and user instructions
      myString = `Player ${displayNum} has bust!<br><br>Click the submit button to continue.<br><br>`;
      // display the player cards
      myString += displayPlayerCards();
      // display the dealer cards
      myString += displayDealerCards();
      // define the next participant and change the gamestate
      defineNextPlayer();
      // if the current player has not bust
    } else if (currentPlayerScore <= 21) {
      // state the player's previous action and user instruction
      myString = `Player ${displayNum} decides to hit!<br><br>Type 'h' to hit and 's' to stand.<br><br>`;
      // display the player cards
      myString += displayPlayerCards();
      // display the dealer cards
      myString += displayDealerCards();
    }
    // if the user stands
  } else if (input == "s") {
    // state the player's previous action and user instruction
    myString = `Player ${displayNum} decides to stand!<br><br>Click the submit button to continue.<br><br>`;
    // display the player cards
    myString += displayPlayerCards();
    // display the dealer cards
    myString += displayDealerCards();
    // define the next participant and change the gamestate
    defineNextPlayer();
    // if the input is not valid
  } else {
    // state the current player's turn and the user instruction
    myString = `Player ${displayNum} turn!<br><br>Type 'h' to hit and 's' to stand.<br><br>`;
    // display the player cards
    myString += displayPlayerCards();
    // display the dealer cards
    myString += displayDealerCards();
  }
  return myString;
};

var changeAceValue = function () {
  // define the player
  var player = playerList[playerIndex];
  // calculate the player's score
  var playerScore = calculatePlayerScore(player);
  // initialise the counter of qualifying aces
  var aceCounter = 0;
  // for all cards in a player
  for (var i = 0; i < player.length; i += 1) {
    // if the card is an ace and has a value of 11
    if (player[i].rank == 1 && player[i].value == 11) {
      // increment the ace counter
      aceCounter += 1;
    }
  }
  // if there is any qualifying ace
  if (aceCounter > 0) {
    // for all cards in a player
    for (var j = 0; j < player.length; j += 1) {
      // if the current player score is a bust
      if (playerScore > 21) {
        // if the current card is a qualifying ace
        if (player[j].rank == 1 && player[j].value == 11) {
          // change the value of ace to 1
          player[j].value = 1;
          // update the current player score
          playerScore = calculatePlayerScore(player);
        }
      }
    }
  }
  return playerScore;
};

var defineNextPlayer = function () {
  // if the current participant is not the dealer
  if (playerIndex < playerList.length - 1) {
    // define the next participant
    playerIndex += 1;
    // move the gamestate back one step
    gameMode -= 1;
  }
  // if all players have bust or won in the initial deal
  if (bustList.length + naturalList.length == playerList.length - 1) {
    // change the gamestate to check the winning conditions
    gameMode = 6;
  }
};

var checkDealerOrPlayerTurn = function () {
  var myString = "";
  // if the current participant is the dealer
  if (playerIndex == playerList.length - 1) {
    // state the dealer's turn and provide user instructions
    myString = `Dealer turn is up!<br><br>Click the submit button to continue.<br><br>`;
    // move the gamestate forward one step
    gameMode += 1;
    // if the current participant is not the dealer (it is a player)
  } else {
    // player number representation
    var displayNum = playerIndex + 1;
    // state the player's turn and provide user instructions
    myString = `Player ${displayNum} turn!<br><br>Type 'h' to hit and 's' to stand.<br><br>`;
  }
  return myString;
};

var dealerGame = function () {
  // define the dealer
  var dealer = playerList[playerList.length - 1];
  // calculate the dealer score
  var dealerScore = calculatePlayerScore(dealer);
  // if the dealer in the unlikely scenario drew two aces initially and tentatively bust
  if (dealerScore > 21) {
    // change the ace value and update the dealer score
    dealerScore = changeAceValue();
  }
  // provide user instruction and state the dealer stands by default
  var myString = `Click the submit button to continue.<br><br>Dealer will stand with score of ${dealerScore}.<br><br>`;
  // while the dealer score is less than 16
  while (dealerScore <= 16) {
    // dealer will draw a card
    dealer.push(deck.pop());
    // dealer score is updated
    dealerScore = calculatePlayerScore(dealer);
    // if dealer score is a bust
    if (dealerScore > 21) {
      // change the ace value and update the dealer score
      dealerScore = changeAceValue();
    }
    // provide user instruction and state the dealer stands by default with updated score
    myString = `Click the submit button to continue.<br><br>Dealer will stand with score of ${dealerScore}.<br><br>`;
  }
  // if the dealer goes bust
  if (dealerScore > 21) {
    // provide user instruction and state the dealer is bust
    myString = `Click the submit button to continue.<br><br>Dealer has bust with score of ${dealerScore}.<br><br>`;
  }
  // display participant cards
  myString += displayPlayerCards();
  // move the gamestate forward one step
  gameMode += 1;
  return myString;
};

var checkWinningCondition = function () {
  // provide user instructions
  var myString = "Click the submit button to continue.<br><br>";
  // define the dealer
  var dealer = playerList[playerList.length - 1];
  // calculate the dealer score
  var dealerScore = calculatePlayerScore(dealer);
  // if the dealer is bust
  if (dealerScore > 21) {
    // for all players
    for (var i = 0; i < playerList.length - 1; i += 1) {
      // player number representation
      var displayNum = i + 1;
      // calculate the player score
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      // if player did not win with initial dealt cards
      if (!naturalList.includes(i)) {
        // if the player score is 21 or less
        if (currentPlayerScore <= 21) {
          // state the player wins
          myString += `Player ${displayNum} wins<br>`;
        }
      }
    }
    // if the dealer stands
  } else if (dealerScore <= 21) {
    // for all players
    for (var i = 0; i < playerList.length - 1; i += 1) {
      // player number representation
      var displayNum = i + 1;
      // calculate the player score
      var currentPlayerScore = calculatePlayerScore(playerList[i]);
      // if player did not win with initial dealt cards
      if (!naturalList.includes(i)) {
        // if the player score is less than the dealer score
        if (currentPlayerScore < dealerScore) {
          // state the player loses
          myString += `Player ${displayNum} loses<br>`;
          // if the player score is equal the dealer score
        } else if (currentPlayerScore == dealerScore) {
          // state the tie
          myString += `Player ${displayNum} ties<br>`;
          // if the player score is not a bust and is greater than the dealer score
        } else if (
          currentPlayerScore > dealerScore &&
          currentPlayerScore <= 21
        ) {
          // state the player wins
          myString += `Player ${displayNum} wins<br>`;
        }
      }
    }
  }
  myString += "<br>";
  // display all dealt cards
  myString += displayDealtCards();
  // move the gamestate forward one step
  gameMode += 1;
  return myString;
};

var resetGame = function () {
  // reset gamestate to 0
  gameMode = 0;
  // clear the current player tracking index
  playerIndex = 0;
  // empty the natural winner list
  naturalList = [];
  // empty the list of bust players
  bustList = [];
  // provide user instruction
  var myString = "Click the submit button to reset the game.";
  return myString;
};

var displayDealtCards = function () {
  var myString = "";
  // for all participants
  for (var i = 0; i < playerList.length; i += 1) {
    // if the participant is the dealer
    if (i == playerList.length - 1) {
      // state the dealer cards
      myString += `Dealer cards:<br><div class="row">`;
      // if not the dealer (it is a player)
    } else {
      // player number representation
      var displayNum = i + 1;
      // state the player cards
      myString += `Player ${displayNum} cards:<br><div class="row">`;
    }
    // if the participant is the dealer
    if (i == playerList.length - 1) {
      // calculate the dealer score
      var dealerScore = calculatePlayerScore(playerList[i]);
      // for all cards in a participant
      for (var j = 0; j < playerList[i].length; j += 1) {
        // if the card is the last card and the gamestate is before state 4 and the dealer score is not 21
        if (
          j == playerList[i].length - 1 &&
          gameMode < 4 &&
          dealerScore != 21
        ) {
          // the last card is face down
          myString += displayCardImage("cover", "cover");
          // the last card is face up
        } else {
          myString += displayCardImage(
            playerList[i][j].name,
            playerList[i][j].suit
          );
        }
      }
      // if the participant is not the dealer
    } else {
      // for all cards in a participant
      for (var j = 0; j < playerList[i].length; j += 1) {
        // display the card
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
  // if the current participant is the dealer
  if (playerIndex == playerList.length - 1) {
    // state the dealer
    myString = `Dealer cards:<br><div class ="row">`;
    // if the current participant is not the dealer (it is a player)
  } else {
    // player number representation
    var displayNum = playerIndex + 1;
    // state the player
    myString = `Player ${displayNum} cards:<br><div class="row">`;
  }
  // for all cards of a participant
  for (var i = 0; i < playerList[playerIndex].length; i += 1) {
    // display the cards
    myString += displayCardImage(
      playerList[playerIndex][i].name,
      playerList[playerIndex][i].suit
    );
  }
  myString += "</div><br>";
  return myString;
};

var displayDealerCards = function () {
  // state the dealer
  var myString = `Dealer cards:<br><div class ="row">`;
  // the dealer is defined the last person in the playerList
  var dealer = playerList[playerList.length - 1];
  // for all cards of the dealer
  for (var i = 0; i < dealer.length; i += 1) {
    // if the card is the last dealt card
    if (i == dealer.length - 1) {
      // face down the card
      myString += displayCardImage("cover", "cover");
      // if the card is not the last dealt card
    } else {
      // face up the card
      myString += displayCardImage(dealer[i].name, dealer[i].suit);
    }
  }
  myString += "</div><br>";
  return myString;
};
