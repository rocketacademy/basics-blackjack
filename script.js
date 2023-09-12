var modeEnterPlayerName = true;
var modeDrawFirstTwoCards = false;
var modeHitOrStand = false;

var remainingCardsInDeck = [];
var currentCard = {};

var playerCardsArray = [];
var computerCardsArray = [];

var playerStand = false;
var computerStand = false;

var playerName = "";
var playerWinCount = 0;
var playerRoundsPlayed = 0;

var main = function (input) {
  if (modeEnterPlayerName) {
    playerName = input;
    modeEnterPlayerName = false;
    modeDrawFirstTwoCards = true;
    return `Welcome to the game of blackjack, ${playerName}! To draw your first two cards, press the button.`;
  }
  if (modeDrawFirstTwoCards) {
    remainingCardsInDeck = makeThenShuffleDeck();
    drawOneCardByPlayer();
    drawOneCardByComputer();
    drawOneCardByPlayer();
    drawOneCardByComputer();
    modeDrawFirstTwoCards = false;
    modeHitOrStand = true;
    return `🎆✨ Round ${playerRoundsPlayed + 1} ✨🎆 <br><br>
    ♥️♦️♠️♣️ ${playerName}, you drew the following two cards ♥️♦️♠️♣️: <br>
    Card 1: ${playerCardsArray[0].name} of ${playerCardsArray[0].suit} <br>
    Card 2: ${playerCardsArray[1].name} of ${playerCardsArray[1].suit} <br><br>
    ➡️ What would you like to do next? <br>
    Type 'h' to hit 🙆🏻‍♂️<br>
    Type 's' to stand 🙅🏻‍♂️`;
  }
  if (modeHitOrStand) {
    output = chooseHitOrStandByPlayer(input);
    if (playerStand == false || computerStand == false) {
      playerStand = false;
      computerStand = false;
      return output;
    } else {
      return compareHands();
    }
  }
};

// Make a deck of 52 cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var blackjackRank = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
        blackjackRank = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        blackjackRank = 10;
      } else if (cardName == 13) {
        cardName = "King";
        blackjackRank = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: blackjackRank,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Make and shuffle a deck of 52 cards - requires function makeDeck()
var makeThenShuffleDeck = function () {
  var cardDeck = makeDeck();
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// Player draws one card from the existing deck
var drawOneCardByPlayer = function () {
  var randomIndex = Math.floor(Math.random() * remainingCardsInDeck.length);
  currentCard = remainingCardsInDeck.pop();
  playerCardsArray.push(currentCard);
};

// Computer draws one card from the existing deck
var drawOneCardByComputer = function () {
  var randomIndex = Math.floor(Math.random() * remainingCardsInDeck.length);
  currentCard = remainingCardsInDeck.pop();
  computerCardsArray.push(currentCard);
};

// Executes player's decision to either hit or stand
var chooseHitOrStandByPlayer = function (input) {
  var outputStatement = "";
  if (input != "h" && input != "s") {
    outputStatement += `You chose an invalid selection. <br><br>
    ➡️ What would you like to do next? <br>
    Type 'h' to hit 🙆🏻‍♂️ <br>
    Type 's' to stand 🙅🏻‍♂️ <br><br>
    ♥️♦️♠️♣️ You currently hold the following cards ♥️♦️♠️♣️: <br>`;
    for (var i = 0; i < playerCardsArray.length; i += 1) {
      outputStatement += `Card ${i + 1}: ${playerCardsArray[i].name} of ${
        playerCardsArray[i].suit
      } <br>`;
    }
    return outputStatement;
  }
  if (input == "h") {
    drawOneCardByPlayer();
    outputStatement += `${playerName}, you chose to draw a card! 🙆🏻‍♂️ <br><br> ♥️♦️♠️♣️ You now hold the following cards ♥️♦️♠️♣️: <br>`;
  } else if (input == "s") {
    playerStand = true;
    outputStatement += `${playerName}, you chose to stand! 🙅🏻‍♂️ <br><br> ♥️♦️♠️♣️ You currently hold the following cards ♥️♦️♠️♣️: <br>`;
  }
  for (var i = 0; i < playerCardsArray.length; i += 1) {
    outputStatement += `Card ${i + 1}: ${playerCardsArray[i].name} of ${
      playerCardsArray[i].suit
    } <br>`;
  }
  var computerChoice = chooseHitOrStandByComputer();
  outputStatement += computerChoice;
  return outputStatement;
};

// Computer chooses to either hit or stand
var chooseHitOrStandByComputer = function () {
  var handIfAceIsOne = 0;
  var handIfAceIsEleven = 0;
  for (i = 0; i < computerCardsArray.length; i += 1) {
    if (computerCardsArray[i].name == "Ace") {
      handIfAceIsOne += 1;
      handIfAceIsEleven += 11;
    } else {
      handIfAceIsOne += computerCardsArray[i].rank;
      handIfAceIsEleven += computerCardsArray[i].rank;
    }
  }
  if (handIfAceIsOne < 17 || handIfAceIsEleven < 17) {
    drawOneCardByComputer();
    return "<br> The computer chose to draw a card! 🙆🏻‍♂️";
  } else {
    computerStand = true;
    return "<br> The computer chose to stand! 🙅🏻‍♂️";
  }
};

// Compare hand of player and computer
var compareHands = function () {
  var outputValue = "";

  // Calculate computer's hand
  var computerHandIfAceIsOne = 0;
  var computerHandIfAceIsEleven = 0;
  var computerBestHand = 0;
  for (i = 0; i < computerCardsArray.length; i += 1) {
    if (computerCardsArray[i].name == "Ace") {
      computerHandIfAceIsOne += 1;
      computerHandIfAceIsEleven += 11;
    } else {
      computerHandIfAceIsOne += computerCardsArray[i].rank;
      computerHandIfAceIsEleven += computerCardsArray[i].rank;
    }
  }
  if (computerHandIfAceIsOne > 21) {
    computerHandIfAceIsOne = 0;
  }
  if (computerHandIfAceIsEleven > 21) {
    computerHandIfAceIsEleven = 0;
  }
  if (computerHandIfAceIsOne > computerHandIfAceIsEleven) {
    computerBestHand = computerHandIfAceIsOne;
  } else {
    computerBestHand = computerHandIfAceIsEleven;
  }

  // Calculate player's hand
  var playerHandIfAceIsOne = 0;
  var playerHandIfAceIsEleven = 0;
  var playerBestHand = 0;
  for (i = 0; i < playerCardsArray.length; i += 1) {
    if (playerCardsArray[i].name == "Ace") {
      playerHandIfAceIsOne += 1;
      playerHandIfAceIsEleven += 11;
    } else {
      playerHandIfAceIsOne += playerCardsArray[i].rank;
      playerHandIfAceIsEleven += playerCardsArray[i].rank;
    }
  }
  if (playerHandIfAceIsOne > 21) {
    playerHandIfAceIsOne = 0;
  }
  if (playerHandIfAceIsEleven > 21) {
    playerHandIfAceIsEleven = 0;
  }
  if (playerHandIfAceIsOne > playerHandIfAceIsEleven) {
    playerBestHand = playerHandIfAceIsOne;
  } else {
    playerBestHand = playerHandIfAceIsEleven;
  }

  // Compare both hands
  if (playerBestHand == computerBestHand) {
    outputValue += `It is a tie! 😐 <br><br>`;
  } else if (playerBestHand > computerBestHand) {
    outputValue += `You win!! 🙂 <br><br>`;
    playerWinCount += 1;
  } else {
    outputValue += `You lose... 😔 <br><br>`;
  }
  playerRoundsPlayed += 1;

  // Show both hands
  outputValue += "♥️♦️♠️♣️ These are your cards ♥️♦️♠️♣️: <br>";
  for (var i = 0; i < playerCardsArray.length; i += 1) {
    outputValue += `Card ${i + 1}: ${playerCardsArray[i].name} of ${
      playerCardsArray[i].suit
    } <br>`;
  }
  outputValue += "<br> ♥️♦️♠️♣️ These are the computer's cards ♥️♦️♠️♣️: <br>";
  for (var i = 0; i < computerCardsArray.length; i += 1) {
    outputValue += `Card ${i + 1}: ${computerCardsArray[i].name} of ${
      computerCardsArray[i].suit
    } <br>`;
  }
  outputValue += `<br> You have won ${playerWinCount} out of the ${playerRoundsPlayed} rounds you have played so far. <br> Press the button to play again!`;

  // Reset game mode
  modeDrawFirstTwoCards = true;
  modeHitOrStand = false;
  remainingCardsInDeck = [];
  currentCard = {};
  playerCardsArray = [];
  computerCardsArray = [];
  playerStand = false;
  computerStand = false;

  return outputValue;
};
