//define global variables
var cardDeck = [];
var gameMode = "betting";
var computerCardArray = [];
var playerCardArray = [];
var computerCardScore = 0;
var playerCardScore = 0;
var playerBets = [100];

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

//calculate the score of the cards on computer's hand
var calcScoresComputer = function () {
  computerCardScore = 0;
  for (var k = 0; k < computerCardArray.length; k += 1) {
    if (computerCardArray[k].name == "ace") {
      computerCardArray[k].score = 0;
    }
    computerCardScore += computerCardArray[k].score;
  }
  //loop through again to calc ace is 11 or 1
  for (var j = 0; j < computerCardArray.length; j += 1) {
    if (computerCardArray[j].name == "ace" && computerCardScore < 11) {
      computerCardArray[j].score = 11;
      computerCardScore += computerCardArray[j].score;
    } else if (computerCardArray[j].name == "ace" && computerCardScore > 10) {
      computerCardArray[j].score = 1;
      computerCardScore += computerCardArray[j].score;
    }
  }
  console.log(computerCardArray);
};

//calculate the score of the cards on player's hand
var calcScoresPlayer = function () {
  playerCardScore = 0;
  //loop through the cards and exclude ace first to calc scores
  for (var k = 0; k < playerCardArray.length; k += 1) {
    if (playerCardArray[k].name == "ace") {
      playerCardArray[k].score = 0;
    }
    playerCardScore += playerCardArray[k].score;
  }
  //loop through again to calc ace is 11 or 1
  for (var j = 0; j < playerCardArray.length; j += 1) {
    if (playerCardArray[j].name == "ace" && playerCardScore < 11) {
      playerCardArray[j].score = 11;
      playerCardScore += playerCardArray[j].score;
    } else if (playerCardArray[j].name == "ace" && playerCardScore > 10) {
      playerCardArray[j].score = 1;
      playerCardScore += playerCardArray[j].score;
    }
  }
};

//run through each card array and return the card obj as strings
var outputHandsMsg = function () {
  var dealerOutput = `<ins>Dealer's Hand</ins><br>`;
  var playerOutput = `<ins>Player's Hand</ins><br>`;

  if (gameMode == "determine winner") {
    for (var i = 0; i < computerCardArray.length; i += 1) {
      var computerCardString = `${computerCardArray[i].name} of ${computerCardArray[i].suit}`;
      dealerOutput += `${computerCardString} <br>`;
    }
  } else {
    for (var i = 1; i < computerCardArray.length; i += 1) {
      dealerOutput = `<ins>Dealer's Hand</ins><br> * of *<br>`;
      var computerCardString = `${computerCardArray[i].name} of ${computerCardArray[i].suit}`;
      dealerOutput += `${computerCardString} <br>`;
    }
  }
  for (var j = 0; j < playerCardArray.length; j += 1) {
    var playerCardString = `${playerCardArray[j].name} of ${playerCardArray[j].suit}`;
    playerOutput += `${playerCardString} <br>`;
  }
  return `${dealerOutput} <br> ${playerOutput}`;
};

var determineWinner = function () {
  var whoWin = "";

  if (playerCardScore == 21) {
    whoWin = "<b>🥂 BLACKJACK! Player wins! 🥂</b>";
  } else if (computerCardScore == 21) {
    whoWin = "<b>BLACKJACK! Dealer wins!</b>";
  } else if (
    (playerCardScore > computerCardScore && playerCardScore < 22) || //check player not busted and if com busted
    (playerCardScore < 22 && computerCardScore > 21)
  ) {
    whoWin = "<b>🥂 Player wins! 🥂</b>";
  } else if (
    playerCardScore == computerCardScore ||
    (playerCardScore > 21 && computerCardScore > 21)
  ) {
    whoWin = "<b>It's a draw!</b>";
  } else {
    whoWin = "<b>Dealer wins!</b>";
  }
  return `${whoWin}`;
};

var resetGame = function () {
  cardDeck = [];
  computerCardArray = [];
  playerCardArray = [];
  gameMode = "betting";
};

//first draw
var shuffleAndIssueTwoCards = function () {
  var shuffledDeck = shuffleCards(cardDeck); //give out cards to computer and player and push into their arrays
  for (var i = 0; i < 4; i += 1) {
    if (i == 0 || i == 2) {
      computerCardArray.push(shuffledDeck.pop());
    } else if (i == 1 || i == 3) {
      playerCardArray.push(shuffledDeck.pop());
    }
  }
};

//new game reset deck
var startNewGame = function () {
  makeDeck();
  shuffleAndIssueTwoCards();
  calcScoresComputer();
  calcScoresPlayer();
};

//see if hit blackjack after first draw
var checkIfBlackJackStart = function () {
  var dealerPlayerScores = `Dealer's Score: ???<br> <b>Player's Score: ${playerCardScore}</b>`;
  var handOutput = outputHandsMsg();
  if (playerCardScore == 21) {
    gameMode = "determine winner";
    handOutput = outputHandsMsg();
    var findWinner = determineWinner();
    var bettingResults = calcBettingResults(findWinner);
    resetGame();
    disableHitStandButton();
    return `${findWinner} <br><br> ${handOutput}<br>${bettingResults}`;
  }
  gameMode = "post initial draw";
  return `${handOutput} <br> ${dealerPlayerScores} <br><br>Do you want to <b>"hit"</b> or <b>"stand"</b>?`;
};

var playHitMode = function (lastDrawnPlayerCard) {
  var handOutput = outputHandsMsg();
  var playerDealerHands = `You drew ${lastDrawnPlayerCard.name} of ${lastDrawnPlayerCard.suit}.<br><br>${handOutput}<br>Dealer's Score: ???<br> <b>Player's Score: ${playerCardScore}</b>`;
  //auto skip to stand if busted, auto skip to blackjack if 21
  if (playerCardScore > 21 || playerCardScore == 21) {
    gameMode = "stand";
    disableHitStandButton();
    document.getElementById("intro").hidden = true;
    if (playerCardScore > 21) {
      return `${playerDealerHands}<br><br>You've <b>busted</b> your cards. Let's see who wins~`;
    } else if (playerCardScore == 21) {
      return `${playerDealerHands}<br><br>You've gotten a <b>BLACKJACK!</b><br><br>Let's see the dealer's cards~`;
    }
  } else {
    gameMode = "post initial draw";
    return `${playerDealerHands}<br><br>Do you want to <b>"hit" or "stand"</b>?`;
  }
};

var beginBetting = function (input) {
  playerBets[1] = Number(input);
  gameMode = "initial draw";
  document.getElementById("intro").hidden = true;
  return `You've bet $${input}. Good luck!`;
};

var calcBettingResults = function (whoWin) {
  if (whoWin == "BLACKJACK! Player wins!" || whoWin == "Player wins!") {
    playerBets[0] = playerBets[0] + playerBets[1];
    return `Your bet was $${playerBets[1]}<br>Your current winnings: $${playerBets[0]}`;
  } else if (whoWin == "It's a draw!") {
    return `Your current winnings: $${playerBets[0]}`;
  } else {
    playerBets[0] = playerBets[0] - playerBets[1];
    return `Your bet was $${playerBets[1]}<br>Your current winnings: $${playerBets[0]}`;
  }
};

var enableHitStandButton = function () {
  document.getElementById("hit-button").disabled = false;
  document.getElementById("stand-button").disabled = false;
  document.getElementById("submit-button").disabled = true;
  document.getElementById("input-field").disabled = true;
  document.getElementById("intro").hidden = true;
};

var disableHitStandButton = function () {
  document.getElementById("hit-button").disabled = true;
  document.getElementById("stand-button").disabled = true;
  document.getElementById("submit-button").disabled = false;
  document.getElementById("input-field").disabled = false;
  document.getElementById("intro").hidden = false;
};

var main = function (input) {
  if (gameMode == "betting") {
    if (isNaN(input) || input == "") {
      return `Please enter a your betting amount!`;
    }
    var startBet = beginBetting(input);
    return startBet;
  }
  //if start of game, create a new shuffled deck and issue 2 cards each
  if (gameMode == "initial draw") {
    enableHitStandButton();
    startNewGame();
    var didPlayerBlackJack = checkIfBlackJackStart(); //see if player win at first draw
    return didPlayerBlackJack;
  }
  //choose hit or stand after first draw
  if (gameMode == "post initial draw") {
    gameMode = input;
  }

  if (gameMode == "hit") {
    var lastDrawnPlayerCard = cardDeck.pop();
    playerCardArray.push(lastDrawnPlayerCard);
    calcScoresPlayer();
    var startHitMode = playHitMode(lastDrawnPlayerCard);
    return startHitMode;
  }

  if (gameMode == "stand") {
    disableHitStandButton();
    //dealer continue to draw until at least 17points
    while (computerCardScore < 17) {
      computerCardArray.push(cardDeck.pop());
      calcScoresComputer();
    }
    gameMode = "determine winner";
  }

  if (gameMode == "determine winner") {
    disableHitStandButton();
    //calcuate the scores and see who wins
    handOutput = outputHandsMsg();
    findWinner = determineWinner();
    bettingResults = calcBettingResults(findWinner);
    resetGame();
    return `${handOutput} <br> Dealer's Score: ${computerCardScore} <br> Player's Score: ${playerCardScore} <br><br> ${findWinner} <br><br>${bettingResults}`;
  }
};
