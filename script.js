// Make ACE logic, if burst, ace = 1, if no burst, ace = 11
// ******************************************** //
// ************ Global Variables*************** //
// ******************************************** //
var playerHand = [];
var computerHand = [];
var mode1 = "Hit! Get another card";
var mode2 = "Stand! Computer's turn to draw";
var mode3 = "Transition, let player decide what to do";
var mode4 = "Comparing the cards";
var currentGameMode = mode1;
var shuffledDeck = [];

// ******************************************** //
// ************** Main Function *************** //
// ******************************************** //

var main = function (input) {
  var playerPoints = 0;
  var computerPoints = 0;
  var playerAceCounter = 0;
  var computerAceCounter = 0;
  if (currentGameMode == mode1) {
    if (playerHand.length == 0) {
      shuffledDeck = shuffleCards(makeDeck());
      computerAndPlayerStartingHand(shuffledDeck);
      currentGameMode = mode3;
      playerPoints = calculatePlayerPoints();
      var gameStartMessage = `Game Start! You have ${playerPoints} points!`;
      return gameStartMessage;
    } else {
      currentGameMode = mode3;
      return `What would you like to do next?`;
    }
  }
  // drawing more cards for the computer
  if (currentGameMode == mode2) {
    computerPoints = calculateComputerPoints();
    console.log(`Computer Points Before Burst`);
    console.log(computerPoints);
    while (computerPoints < 16) {
      computerDrawCard(shuffledDeck);
      console.log(computerHand);
      computerPoints = calculateComputerPoints();
    }
    while (computerPoints > 21 && computerAceCounter < computerHand.length) {
      if (computerHand[computerAceCounter].points == 11) {
        computerHand[computerAceCounter].points = 1;
        console.log(`Aces value switch`);
        return `Computer Aces are now 1 point`;
      }
      computerAceCounter += 1;
    }
    if (computerPoints > 21 && computerAceCounter == computerHand.length) {
      var computerBurstOutcome = `Computer BURST! Computer has ${computerPoints} points. You win! `;
      gameReset();
      return computerBurstOutcome;
    }
    currentGameMode = mode4;
    return "Computer has finished their turn";
  }
  // player decides to get another card or not
  if (currentGameMode == mode3) {
    if (input == "hit") {
      playerDrawCard(shuffledDeck);
      playerPoints = calculatePlayerPoints();
      while (playerPoints > 21 && playerAceCounter < playerHand.length) {
        if (playerHand[playerAceCounter].points == 11) {
          playerHand[playerAceCounter].points = 1;
          console.log(`Aces value switch`);
          return `Your aces are now 1 point!`;
        }
        playerAceCounter += 1;
      }
      if (playerPoints > 21 && playerAceCounter == playerHand.length) {
        var playerBurstOutcome = `BURST! You have ${playerPoints} points! You LOSE!!`;
        console.log("Your Hand");
        console.log(playerHand);
        gameReset();
        return playerBurstOutcome;
      } else currentGameMode = mode1;
      return `You have drawn a card. You now have ${playerPoints} points`;
    }
    if (input == "stand") {
      currentGameMode = mode2;
      return "Computer's turn!";
    } else playerPoints = calculatePlayerPoints();
    var choosingResponse = `You have ${playerPoints} points. Please choose only either "hit" or "stand"`;
    return choosingResponse;
  }
  // Comparing the cards
  if (currentGameMode == mode4) {
    playerPoints = calculatePlayerPoints();
    computerPoints = calculateComputerPoints();
    currentGameMode = mode1;
    var winningMessage = `You have won! You have ${playerPoints} points and the computer has ${computerPoints} points.`;
    var blackJackWinningMessage = `Black Jack! You have won! You have ${playerPoints} points and the computer has ${computerPoints} points.`;
    var losingMessage = `You have lost! You have ${playerPoints} points and the computer has ${computerPoints} points.`;
    var blackJacklosingMessage = `You have lost! You have ${playerPoints} points and the computer has Black Jack.`;
    var drawMessage = `Its a draw but the house always wins so.. you lose! Hit the button to start a new game`;

    if (playerHand.length == 2 && playerPoints == 21) {
      gameReset();
      return blackJackWinningMessage;
    }
    if (computerHand.length == 2 && computerPoints == 21) {
      gameReset();
      return blackJacklosingMessage;
    }
    if (playerPoints < computerPoints) {
      gameReset();
      return losingMessage;
    }
    if (playerPoints > computerPoints) {
      gameReset();
      return winningMessage;
    }
    if (playerPoints == computerPoints) {
      gameReset();
      return drawMessage;
    }
  }
};

// ******************************************** //
// ********** Getting Starting Hands ********** //
// ******************************************** //

var computerAndPlayerStartingHand = function () {
  var playerDrawnCard = shuffledDeck.pop();
  playerHand.push(playerDrawnCard);
  playerDrawnCard = shuffledDeck.pop();
  playerHand.push(playerDrawnCard);
  var computerDrawnCard = shuffledDeck.pop();
  computerHand.push(computerDrawnCard);
  computerDrawnCard = shuffledDeck.pop();
  computerHand.push(computerDrawnCard);
};

// ******************************************** //
// ************* Card Draw Function *********** //
// ******************************************** //

var playerDrawCard = function () {
  var playerDrawnCard = shuffledDeck.pop();
  playerHand.push(playerDrawnCard);
  return playerDrawnCard;
};

var computerDrawCard = function () {
  var computerDrawnCard = shuffledDeck.pop();
  computerHand.push(computerDrawnCard);
  return computerDrawnCard;
};

// ******************************************** //
// ************ Make Deck Function ************ //
// ******************************************** //

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardPoints = rankCounter;

      if (cardName == 1) {
        (cardName = "ace"), (cardPoints = 11);
      } else if (cardName == 11) {
        (cardName = "jack"), (cardPoints = 10);
      } else if (cardName == 12) {
        (cardName = "queen"), (cardPoints = 10);
      } else if (cardName == 13) {
        (cardName = "king"), (cardPoints = 10);
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: cardPoints,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// ******************************************** //
// ********* Shuffle Deck Function ************ //
// ******************************************** //

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

// ******************************************** //
// ******** Point Counting Function *********** //
// ******************************************** //

var calculatePlayerPoints = function () {
  var playerPoints = 0;
  var playerCounter = 0;
  while (playerHand.length > playerCounter) {
    playerPoints += playerHand[playerCounter].points;
    playerCounter += 1;
  }
  return playerPoints;
};
var calculateComputerPoints = function () {
  var computerPoints = 0;
  var computerCounter = 0;
  while (computerHand.length > computerCounter) {
    computerPoints += computerHand[computerCounter].points;
    computerCounter += 1;
  }
  return computerPoints;
};

// ******************************************** //
// *********** Game Reset Function ************ //
// ******************************************** //

var gameReset = function () {
  playerHand = [];
  computerHand = [];
  shuffledDeck = [];
  currentGameMode = mode1;
};
