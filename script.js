var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards are drawn";
var GAME_RESULTS_SHOWN = "results are shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

var playerHand = [];
var dealerHand = [];

var gameDeck = [];

var createDeck = function () {
  var cardDeck = [];

  var suits = ["Spades ♠️", "Clubs ♣️", "Diamonds ♦️", "Hearts ♥️"];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    for (var rankIndex = 1; rankIndex <= 13; rankIndex += 1) {
      var cardObject = {
        suit: suits[suitIndex],
        rank: rankIndex,
      };
      if (rankIndex == 1) {
        cardObject.name = "Ace";
      } else if (rankIndex == 11) {
        cardObject.name = "Jack";
      } else if (rankIndex == 12) {
        cardObject.name = "Queen";
      } else if (rankIndex == 13) {
        cardObject.name = "King";
      } else {
        cardObject.name = rankIndex;
      }
      cardDeck.push(cardObject);
    }
  }
  return cardDeck;
};

var shuffleDeck = function (deck) {
  var copyDeck = [...deck];
  for (var i = 0; i < copyDeck.length; i += 1) {
    var randomIndex = Math.floor(Math.random() * copyDeck.length);
    var temporaryCard = copyDeck[i];
    copyDeck[i] = copyDeck[randomIndex];
    copyDeck[randomIndex] = temporaryCard;
  }
  return copyDeck;
};

var createNewDeck = function () {
  var deck = createDeck();
  var shuffledDeck = shuffleDeck(deck);
  return shuffledDeck;
};

var checkForBlackJack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  if (
    (playerCardOne.name == "Ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "Ace")
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;

  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      totalHandValue += 10;
    } else {
      totalHandValue += currentCard.rank;
    }
    index += 1;
  }
  return totalHandValue;
};

var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player Hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage = `${playerMessage} - ${playerHandArray[index].name} of ${playerHandArray[index].suit} <br>`;
    index += 1;
  }

  var dealerMessage = "Dealer Hand:<br>";
  var index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage = `${dealerMessage} - ${dealerHandArray[index].name} of ${dealerHandArray[index].suit} <br>`;
    index += 1;
  }

  return `${playerMessage} <br> ${dealerMessage}`;
};

var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

var dealCards = function () {
  playerHand.push(gameDeck.pop());
  playerHand.push(gameDeck.pop());
  dealerHand.push(gameDeck.pop());
  dealerHand.push(gameDeck.pop());
};

var checkBlackJack = function () {
  var playerHasBlackJack = checkForBlackJack(playerHand);
  var dealerHasBlackJack = checkForBlackJack(dealerHand);
  var outputMessage = "";

  if (playerHasBlackJack && dealerHasBlackJack) {
    outputMessage = `${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}<br>It's a Black Jack Tie!`;
  } else if (playerHasBlackJack) {
    outputMessage = `${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}<br>Player wins by Black Jack!`;
  } else if (dealerHasBlackJack) {
    outputMessage = `${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}<br>Dealer wins by Black Jack!`;
  } else {
    outputMessage = `${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}<br>There are no Black Jacks.<br>Please enter "hit" or "stand".`;
    currentGameMode = GAME_HIT_OR_STAND;
  }

  return outputMessage;
};

var hitOrStand = function (input) {
  var outputMessage = "";
  if (input == "hit") {
    playerHand.push(gameDeck.pop());
    outputMessage = `${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}<br> You drew another card. <br>Please enter 'hit' or 'stand'.`;
  } else if (input == "stand") {
    outputMessage = stand();
  } else {
    outputMessage = `Invalid input. Please enter either "hit" or "stand" <br><br> ${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}`;
  }
  return outputMessage;
};

var stand = function () {
  var playerHandTotalValue = calculateTotalHandValue(playerHand);
  var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
  var outputMessage = "";

  while (dealerHandTotalValue < 17) {
    dealerHand.push(gameDeck.pop());
    dealerHandTotalValue = calculateTotalHandValue(dealerHand);
  }

  outputMessage = evaluateResults(playerHandTotalValue, dealerHandTotalValue);
  currentGameMode = GAME_RESULTS_SHOWN;

  return outputMessage;
};

var evaluateResults = function (playerHandTotalValue, dealerHandTotalValue) {
  var outputMessage = "";

  if (playerHandTotalValue > 21) {
    outputMessage = `${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}<br>Player busts! Dealer wins!. ${displayHandTotalValues(
      playerHandTotalValue,
      dealerHandTotalValue
    )}<br>Enter "reset" to start a new game`;
  } else if (
    playerHandTotalValue == dealerHandTotalValue ||
    (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
  ) {
    outputMessage = `${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}<br>It's a Tie! ${displayHandTotalValues(
      playerHandTotalValue,
      dealerHandTotalValue
    )}<br>Enter "reset" to start a new game`;
  } else if (
    (playerHandTotalValue > dealerHandTotalValue &&
      playerHandTotalValue <= 21) ||
    (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
  ) {
    outputMessage = `${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}<br>Player wins! ${displayHandTotalValues(
      playerHandTotalValue,
      dealerHandTotalValue
    )}<br>Enter "reset" to start a new game`;
  } else {
    outputMessage = `${displayPlayerAndDealerHands(
      playerHand,
      dealerHand
    )}<br>Dealer wins! ${displayHandTotalValues(
      playerHandTotalValue,
      dealerHandTotalValue
    )}<br>Enter "reset" to start a new game`;
  }

  return outputMessage;
};

var resetGame = function () {
  currentGameMode = GAME_START;
  playerHand = [];
  dealerHand = [];
};

var main = function (input) {
  var outputMessage = "";
  gameDeck = createNewDeck();

  if (input == "reset") {
    resetGame();
    outputMessage =
      "The game has been reset. Click button to start a new game!";
    return outputMessage;
  }

  if (currentGameMode == GAME_START) {
    dealCards();
    currentGameMode = GAME_CARDS_DRAWN;
    outputMessage =
      "Everyone has been dealt a card. Click button to calculate cards!";
  } else if (currentGameMode == GAME_CARDS_DRAWN) {
    outputMessage = checkBlackJack();
  } else if (currentGameMode == GAME_HIT_OR_STAND) {
    outputMessage = hitOrStand(input);
  }

  return outputMessage;
};
