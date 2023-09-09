//define global variables
var cardDeck = [];
var gameMode = "initial draw";
var computerCardArray = [];
var playerCardArray = [];
var computerCardScore = 0;
var playerCardScore = 0;

//create deck
var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var score = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        score = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        score = 10;
      } else if (cardName == 13) {
        cardName = "king";
        score = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: score,
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
};

//shuffle deck. shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once

  for (
    var currentIndex = 0;
    currentIndex < cardDeck.length;
    currentIndex += 1
  ) {
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
  }
  // Return the shuffled deck
  return cardDeck;
};

var calcScoresComputer = function () {
  computerCardScore = 0;
  //calculate the score of the cards on computer's hand
  for (var j = 0; j < computerCardArray.length; j += 1) {
    if (computerCardArray[j].name == "ace" && computerCardScore < 11) {
      console.log(`Current Com Score = ${computerCardScore}`);
      computerCardArray[j].score = 11;
      console.log(
        `Card is ${computerCardArray[j].name} Card score: ${computerCardArray[j].score}`
      );
    }
    computerCardScore += computerCardArray[j].score;
  }
};

var calcScoresPlayer = function () {
  //calculate the score of the cards on player's hand
  playerCardScore = 0;
  for (var k = 0; k < playerCardArray.length; k += 1) {
    if (playerCardArray[k].name == "ace" && playerCardScore < 11) {
      console.log(`Current Player Score = ${playerCardScore}`);
      playerCardArray[k].score = 11;
      console.log(
        `Card is ${playerCardArray[k].name} Card score: ${playerCardArray[k].score}`
      );
    }
    playerCardScore += playerCardArray[k].score;
  }
};

var outputHandsMsg = function () {
  var dealerOutput = `<b>Dealer's Hand:</b><br>`;
  var playerOutput = `<b>Player's Hand:</b><br>`;

  if (gameMode == "determine winner") {
    for (var i = 0; i < computerCardArray.length; i += 1) {
      var computerCardString = `${computerCardArray[i].suit} of ${computerCardArray[i].name}`;
      dealerOutput += `${computerCardString} <br>`;
    }
  } else {
    for (var i = 1; i < computerCardArray.length; i += 1) {
      dealerOutput = `<b>Dealer's Hand:</b><br> * of *<br>`;
      var computerCardString = `${computerCardArray[i].suit} of ${computerCardArray[i].name}`;
      dealerOutput += `${computerCardString} <br>`;
    }
  }
  for (var j = 0; j < playerCardArray.length; j += 1) {
    var playerCardString = `${playerCardArray[j].suit} of ${playerCardArray[j].name}`;
    playerOutput += `${playerCardString} <br>`;
  }
  return `${dealerOutput} <br> ${playerOutput}`;
};

var determineWinner = function () {
  var whoWin = "";

  if (playerCardScore == 21) {
    whoWin = "BLACKJACK! Player wins!";
  } else if (computerCardScore == 21) {
    whoWin = "BLACKJACK! Dealer wins!";
  } else if (
    (playerCardScore > computerCardScore && playerCardScore < 22) ||
    (playerCardScore < 22 && computerCardScore > 21)
  ) {
    whoWin = "Player wins!";
  } else if (
    playerCardScore == computerCardScore ||
    (playerCardScore > 21 && computerCardScore > 21)
  ) {
    whoWin = "It's a draw!";
  } else {
    whoWin = "Dealer wins!";
  }
  return `${whoWin}`;
};

var resetGame = function () {
  cardDeck = [];
  computerCardArray = [];
  playerCardArray = [];
  gameMode = "initial draw";
};

var shuffleAndIssueTwoCards = function () {
  var shuffledDeck = shuffleCards(cardDeck);
  //give out cards to computer and player and push into their arrays
  for (var i = 0; i < 4; i += 1) {
    if (i == 0 || i == 2) {
      computerCardArray.push(shuffledDeck.pop());
    } else if (i == 1 || i == 3) {
      playerCardArray.push(shuffledDeck.pop());
    }
  }
};

var startNewGame = function () {
  makeDeck();
  shuffleAndIssueTwoCards();
  calcScoresComputer();
  calcScoresPlayer();
};

var checkIfBlackJackStart = function () {
  var dealerPlayerScores = `Dealer's Score: ???<br> Player's Score: ${playerCardScore}`;
  var handOutput = outputHandsMsg();
  if (playerCardScore == 21) {
    gameMode = "determine winner";
    handOutput = outputHandsMsg();
    var findWinner = determineWinner();
    resetGame();
    return `${findWinner} <br><br> ${handOutput}`;
  }
  gameMode = "post initial draw";
  return `${handOutput} <br> ${dealerPlayerScores} <br><br> Do you want to "hit" or "stand"?`;
};

var playHitMode = function () {
  if (playerCardScore > 21 || playerCardScore == 21) {
    gameMode = "stand";
    handOutput = outputHandsMsg();
    if (playerCardScore > 21) {
      return `You drew ${
        playerCardArray[playerCardArray.length - 1].name
      }.<br><br>${handOutput}<br>Dealer's Score: ???<br> Player's Score: ${playerCardScore}<br><br>You've busted your cards. Let's see who wins~`;
    } else if (playerCardScore == 21) {
      return `You drew ${
        playerCardArray[playerCardArray.length - 1].name
      }.<br><br>${handOutput}<br>Dealer's Score: ???<br> Player's Score: ${playerCardScore}<br><br>You've gotten a BLACKJACK!<br><br>Let's see the dealer's cards~`;
    }
  } else {
    gameMode = "post initial draw";
    handOutput = outputHandsMsg();
    return `You drew ${
      playerCardArray[playerCardArray.length - 1].name
    }.<br><br>${handOutput}<br>Dealer's Score: ???<br> Player's Score: ${playerCardScore}<br><br>Do you want to "hit" or "stand"?`;
  }
};

var main = function (input) {
  //if start of game, create a new shuffled deck and issue 2 cards each
  if (gameMode == "initial draw") {
    startNewGame();
    var didPlayerBlackJack = checkIfBlackJackStart();
    return didPlayerBlackJack;
  }
  if (gameMode == "post initial draw") {
    gameMode = input;
  }

  if (gameMode == "hit") {
    playerCardArray.push(cardDeck.pop());
    calcScoresPlayer();
    var startHitMode = playHitMode();
    return startHitMode;
  }

  if (gameMode == "stand") {
    //dealer continue to draw until at least 17points
    while (computerCardScore < 17) {
      computerCardArray.push(cardDeck.pop());
      calcScoresComputer();
    }
    gameMode = "determine winner";
  }

  if (gameMode == "determine winner") {
    //calcuate the scores and see who wins
    handOutput = outputHandsMsg();
    findWinner = determineWinner();
    resetGame();
    return `${handOutput} <br> Dealer's Score: ${computerCardScore} <br> Player's Score: ${playerCardScore} <br><br> ${findWinner}`;
  }
};
