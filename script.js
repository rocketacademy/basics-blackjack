// Global variables
var gameMode = "shuffle";
var shuffledDeck = [];
var playerCard = [];
var computerCard = [];
var winnerDetermined = false;

// Function to generate deck of cards.
// Picture cards = 10
var deckGeneration = function () {
  var cardDeck = [];
  var suits = ["diamonds", "clubs", "hearts", "spades"];

  for (var i = 0; i < suits.length; i += 1) {
    var cardSuit = suits[i];
    var index = 1;
    while (index < 14) {
      var cardName = index;
      var rankIndex = index;
      if (index == 1) {
        cardName = "Ace";
        rankIndex = 11; // Let all Aces be worth 11 points from the start.
      } else if (index == 11) {
        cardName = "Jack";
        rankIndex = 10;
      } else if (index == 12) {
        cardName = "Queen";
        rankIndex = 10;
      } else if (index == 13) {
        cardName = "King";
        rankIndex = 10;
      }
      var card = {
        name: cardName,
        suit: cardSuit,
        rank: rankIndex,
      };
      cardDeck.push(card);
      index += 1;
    }
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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

// Function to deal the initial 2 cards to players. Input is the shuffledDeck array, as well as the player or computer card array.
var dealCards = function (shuffledDeck, inputHand) {
  var index = 0;
  while (inputHand.length != 2) {
    inputHand.push(shuffledDeck[index]);
    shuffledDeck.splice(index, 1);
  }
  index = 0;
  return inputHand;
};

// Function to total points of the player's hand. Takes in array of cards on player's hand.
var calculateHand = function (playerHand) {
  var index = 0;
  var totalScore = 0;
  while (index < playerHand.length) {
    totalScore += playerHand[index].rank;
    index += 1;
  }
  if (totalScore > 21) {
    totalScore = 0;
    for (var i = 0; i < playerHand.length; i += 1) {
      if (playerHand[i].name == "Ace") {
        playerHand[i].rank = 1;
      }
      totalScore += playerHand[i].rank;
    }
  }
  return totalScore;
};

// Function to print the hands of each player. Input is the array of object for each player.
var printHand = function (playerHand) {
  var index = 0;
  var outputValue = "";
  while (index < playerHand.length) {
    outputValue += `${playerHand[index].name} of ${playerHand[index].suit}<br>`;
    index += 1;
  }
  return outputValue;
};

// Compare initial hands
var compareInitialHands = function (playerCard, computerCard) {
  var playerCurrentTotal = calculateHand(playerCard);
  var computerCurrentTotal = calculateHand(computerCard);

  if (playerCurrentTotal == 21 && computerCurrentTotal != 21) {
    winnerDetermined = true;
    return `Player Blackjack! Player wins! <br><br> Player cards: <br> ${printHand(
      playerCard
    )} <br> Computer cards: <br> ${printHand(computerCard)}`;
  } else if (computerCurrentTotal == 21) {
    winnerDetermined = true;
    return `Computer Blackjack! Computer wins! <br><br> Player cards: <br> ${printHand(
      playerCard
    )} <br> Computer cards: <br> ${printHand(computerCard)}`;
  } else {
    return `Player cards: <br> ${printHand(
      playerCard
    )} <br> Computer cards: <br> ${printHand(
      computerCard
    )} <br><br> Player to choose "stand" or "hit".`;
  }
};

// Function to compare scores after initial comparison ie continuation of game after 2 cards have been dealt with no blackjack.
var compareHands = function (playerCard, computerCard) {
  var playerCurrentTotal = calculateHand(playerCard);
  var computerCurrentTotal = calculateHand(computerCard);

  if (playerCurrentTotal > computerCurrentTotal) {
    return `Player wins! Hand Total is ${playerCurrentTotal} points. <br><br> Player cards: <br> ${printHand(
      playerCard
    )} <br> Computer cards: <br> ${printHand(computerCard)}`;
  } else {
    return `Computer wins! Hand Total is ${computerCurrentTotal} points. <br><br> Player cards: <br> ${printHand(
      playerCard
    )} <br> Computer cards: <br> ${printHand(computerCard)}`;
  }
};

// Function to reset all global variables for the next round.
var resetGame = function () {
  shuffledDeck = [];
  playerCard = [];
  computerCard = [];
  gameMode = "shuffle";
  winnerDetermined = false;
};

// Function to draw additional card and add to hand. Function reads the specific playerCard array
var drawAdditionalCard = function (inputPlayerHand) {
  inputPlayerHand.push(shuffledDeck[0]);
  shuffledDeck.splice(0, 1);
};

// Function to check player hand if it has gone bust
var checkPlayerHand = function (playerHand) {
  var playerBusted = false;
  var playerCurrentTotal = calculateHand(playerHand);
  if (playerCurrentTotal > 21) {
    playerBusted = true;
    return [
      playerBusted,
      `Player BUSTED!! <br><br> Player cards: <br> ${printHand(
        playerCard
      )} <br> Computer cards: <br> ${printHand(
        computerCard
      )} <br><br> Click "submit" to begin new round.`,
    ];
  } else {
    return [
      playerBusted,
      `Player cards: <br> ${printHand(
        playerCard
      )} <br> Computer cards: <br> ${printHand(
        computerCard
      )} <br><br> Player to choose "stand" or "hit".`,
    ];
  }
};

// Function for computer to hit or stand. Computer has to hit when total hand is below 17.
// Takes in an array of computer current hand.
var computerDecisions = function (inputComputerCard) {
  var index = 0;
  var outputValue = "";
  var computerCurrentTotal = calculateHand(inputComputerCard);
  if (computerCurrentTotal > 17) {
    return `Computer has decided not to hit. <br><br> Click "submit" to compare hands.`;
  }

  while (computerCurrentTotal < 17) {
    drawAdditionalCard(inputComputerCard);
    computerCurrentTotal = calculateHand(inputComputerCard);
    outputValue += `${
      inputComputerCard[inputComputerCard.length - 1].name
    } of ${inputComputerCard[inputComputerCard.length - 1].suit} <br>`;
    index += 1;
  }
  computerCurrentTotal = calculateHand(inputComputerCard);
  if (computerCurrentTotal > 21) {
    var tempOutput = `Computer BUSTED! The computer has drawn ${index} card(s): <br> ${outputValue}<br><br> Computer has:<br> ${printHand(
      inputComputerCard
    )}`;
    resetGame();
    return tempOutput;
  }
  return `The computer has drawn ${index} card(s): <br> ${outputValue} <br> Click "submit" to compare your hands.`;
};

var main = function (input) {
  var outputValue = "";
  var playerState = [];
  if (gameMode == "shuffle") {
    shuffledDeck = shuffleCards(deckGeneration());
    gameMode = "deal";
    return `The deck has been shuffled. <br> Click "Submit" to deal cards.`;
  } else if (gameMode == "deal") {
    playerCard = dealCards(shuffledDeck, playerCard);
    computerCard = dealCards(shuffledDeck, computerCard);
    gameMode = "compare initial hands";
    return `Click "submit" to compare your current hands and show your cards.`;
  } else if (gameMode == "compare initial hands") {
    outputValue = compareInitialHands(playerCard, computerCard);
    if (winnerDetermined) {
      resetGame();
      return outputValue;
    } else {
      gameMode = "player choice";
      return outputValue;
    }
  } else if (gameMode == "player choice") {
    if (!(input == "hit" || input == "stand")) {
      return `Please input only "hit" or "stand".`;
    }

    if (input == "hit") {
      drawAdditionalCard(playerCard);
      playerState = checkPlayerHand(playerCard);
      if (playerState[0]) {
        outputValue = playerState[1];
        resetGame();
        return outputValue;
      } else {
        return playerState[1];
      }
    }

    if (input == "stand") {
      gameMode = "computer choice";
      return `${computerDecisions(computerCard)}`;
    }
  } else if (gameMode == "computer choice") {
    outputValue = compareHands(playerCard, computerCard);
    resetGame();
    return outputValue;
  }
};
