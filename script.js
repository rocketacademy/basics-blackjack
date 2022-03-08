var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_HIT_OR_STAND = "hit ot stand";
var currentGameMode = GAME_START;

var playerHand = [];
var dealerHand = [];

var gameDeck = "empty at the start";

//-------------make and shuffle-----------------------//

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♠️", "♥️", "♣️", "♦️"];
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      }
      if (cardName == 11) {
        cardName = "Jack";
      }
      if (cardName == 12) {
        cardName = "Queen";
      }
      if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
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
  }
};

var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

//-------------game functions-----------------------//
// check for blackjack
var checkforBlackjack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;
  if (
    (playerCardOne.name == "Ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "Ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

// calculate hand value
var calTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "Ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

// to display player and dealer hands in a message
var displayCards = function (playerHandArray, dealerHandArray) {
  var playerMessage = `Player Hand: <br>`;
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      `- ` +
      playerHandArray[index].name +
      playerHandArray[index].suit +
      `<br>`;
    index = index + 1;
  }
  index = 0;
  var dealerMessage = `Dealer Hand: <br>`;
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      `- ` +
      dealerHandArray[index].name +
      dealerHandArray[index].suit +
      `<br>`;
    index = index + 1;
  }
  return playerMessage + `<br>` + dealerMessage;
};

// to disply hand values of player and dealer cards
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    `<br>Player total hand value: ` +
    playerHandValue +
    `<br>Dealer total hand value: ` +
    dealerHandValue;
  return totalHandValueMessage;
};

//--------------------main----------------------//

var main = function (input) {
  if (currentGameMode == GAME_START) {
    gameDeck = createNewDeck();
    console.log(gameDeck);

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log`PLAYER HAND IS`;
    console.log(playerHand);
    console.log`DEALER HAND IS`;
    console.log(dealerHand);

    currentGameMode = GAME_CARDS_DRAWN;

    outputMessage = `Cards has been dealt. Click "Next" buttom to see the player and dealer cards.`;

    return outputMessage;
  }

  // SECOND GAME MODE
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // --------check for blackjack------
    var playerHasBlackjack = checkforBlackjack(playerHand);
    var dealerHasBlackjack = checkforBlackjack(dealerHand);

    var playerHandTotalValue = calTotalHandValue(playerHand);
    var dealerHandTotalValue = calTotalHandValue(dealerHand);
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      //tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage =
          displayCards(playerHand, dealerHand) +
          `It's a blackjack tie!` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      //player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage =
          displayCards(playerHand, dealerHand) +
          `Player wins by blackjack.` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      } else {
        outputMessage =
          displayCards(playerHand, dealerHand) +
          `Dealer wins by blackjack` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
    }
    // --------no blackjack------
    else {
      outputMessage =
        displayCards(playerHand, dealerHand) +
        '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';

      currentGameMode = GAME_HIT_OR_STAND;
    }

    return outputMessage;
  }
  if (currentGameMode == GAME_HIT_OR_STAND) {
    //player Hit
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayCards(playerHand, dealerHand) +
        `<br> You drew another card. <br> Please input "Hit" or "Stand"`;
      return outputMessage;
    }

    // player stand
    else if (input == "stand") {
      var playerHandTotalValue = calTotalHandValue(playerHand);
      var dealerHandTotalValue = calTotalHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calTotalHandValue(dealerHand);
      }

      // compare total hand value
      if (playerHandTotalValue > 21 && dealerHandTotalValue > 21) {
        outputMessage =
          displayCards(playerHand, dealerHand) +
          `<br>It's a tie. Both players and dealer have busted.<br>` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      } else if (playerHandTotalValue > 21 && dealerHandTotalValue < 21) {
        outputMessage =
          displayCards(playerHand, dealerHand) +
          `<br>Dealer wins. Player busted.<br>` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      } else if (playerHandTotalValue < 21 && dealerHandTotalValue > 21) {
        outputMessage =
          displayCards(playerHand, dealerHand) +
          `<br>Player wins. Dealer busted.<br>` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      } else {
        if (playerHandTotalValue == dealerHandTotalValue) {
          outputMessage =
            displayCards(playerHand, dealerHand) +
            `<br>It's a tie.<br>` +
            displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
          console.log(`tie`);
        } else if (playerHandTotalValue > dealerHandTotalValue) {
          outputMessage =
            displayCards(playerHand, dealerHand) +
            `<br>Player wins.<br>` +
            displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
          console.log(`player wins`);
        } else {
          outputMessage =
            displayCards(playerHand, dealerHand) +
            `<br>Dealer wins.<br>` +
            displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
          console.log(`dealer wins`);
        }
      }
      currentGameMode = GAME_START;
      playerHand = [];
      dealerHand = [];
      return outputMessage;
    }

    // input validation
    else {
      outputMessage =
        `Invalid input.Please input "hit" or "stand".` +
        `<br>` +
        `<br>` +
        displayCards(playerHand, dealerHand) +
        "<br> There are no Black Jacks.";

      return outputMessage;
    }
  }
};
