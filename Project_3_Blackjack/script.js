//game state
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_HIT_OR_STAND = "hit or stand";
var gameState = GAME_START;

var gameDeck = "empty";
var playerCards = [];
var dealerCards = [];
var isPlayerBust = false;
var isDealerBust = false;
var isUserUnderValue = false;

//================================================
//create deck
var createDeck = function () {
  var deck = [];
  var suit = ["Hearts♥️", "Diamonds♦️", "Clubs♣️", "Spades♠️"];
  var suitCounter = 0;
  while (suitCounter < suit.length) {
    var currentSuit = suit[suitCounter];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        rank: rankCounter,
        suit: currentSuit,
      };
      deck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitCounter = suitCounter + 1;
  }
  return deck;
};

//================================================
//display card values message
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
//================================================
var shuffleCard = function (cards) {
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[currentIndex];

    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cards;
};

//================================================
//shuffled deck function
var ShuffledCardDeck = function () {
  var newDeck = createDeck();
  var gameDeck = shuffleCard(newDeck);
  return gameDeck;
};

//================================================
//check blackjack
var checkForBlackjack = function (cardsArray) {
  var playerCard1 = cardsArray[0];
  var playerCard2 = cardsArray[1];
  var isBlackjack = false;
  if (
    (playerCard1.name == "Ace" && playerCard2.rank >= 10) ||
    (playerCard2.name == "Ace" && playerCard1.rank >= 10)
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

//================================================
//calculate total cards value
var calculateTotalCardsValue = function (cardsArray) {
  var totalCardsValue = 0;
  var aceCounter = 0;

  var index = 0;
  while (index < cardsArray.length) {
    var currentCard = cardsArray[index];

    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      totalCardsValue = totalCardsValue + 10;
    } else if (currentCard.name == "Ace") {
      totalCardsValue = totalCardsValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalCardsValue = totalCardsValue + currentCard.rank;
    }
    index = index + 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalCardsValue > 21) {
      totalCardsValue = totalCardsValue - 10;
    }
    index = index + 1;
  }
  return totalCardsValue;
};

//================================================
//display dealer & player's cards message
var displayPlayerDealerCards = function (playerCardsArray, dealerCardsArray) {
  var playerMessage = "Player had: <br>";
  index = 0;
  while (index < playerCardsArray.length) {
    playerMessage =
      playerMessage +
      "-" +
      playerCards[index].name +
      " of " +
      playerCards[index].suit +
      "<br>";
    index = index + 1;
  }

  var dealerMessage = "Dealer had: <br>";
  index = 0;
  while (index < dealerCardsArray.length) {
    dealerMessage =
      dealerMessage +
      "-" +
      dealerCards[index].name +
      " of " +
      dealerCards[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

//================================================
//display total cards value message
var displayTotalCardsValue = function (
  playerTotalCardsValue,
  dealerTotalCardsValue
) {
  var totalCardsValue =
    "Player total cards value: " +
    playerTotalCardsValue +
    "<br> Dealer total cards value: " +
    dealerTotalCardsValue;

  return totalCardsValue;
};

//reset game
var resetGame = function () {
  gameState = GAME_START;
  gameDeck = "empty";
  playerCards = [];
  dealerCards = [];
  isPlayerBust = false;
  isDealerBust = false;
  return gameState;
};

//===================================================================================//
//================================== MAIN FUNCTION ==================================//
//===================================================================================//
var main = function (input) {
  var myOutputValue = "";
  if (gameState == GAME_START) {
    if (input != "") {
      myOutputValue = "❌Invalid input! Press 'submit' to deal cards!";
    } else {
      gameDeck = ShuffledCardDeck();

      playerCards.push(gameDeck.pop());
      playerCards.push(gameDeck.pop());
      dealerCards.push(gameDeck.pop());
      dealerCards.push(gameDeck.pop());

      gameState = GAME_CARDS_DRAWN;
      myOutputValue =
        "Everyone has been dealt a card. Press submit button to continue 👉 ";
    }
    return myOutputValue;
  }

  //check blackjack
  if (gameState == GAME_CARDS_DRAWN) {
    var playerHasBlackjack = checkForBlackjack(playerCards);
    var dealerHasBlackjack = checkForBlackjack(dealerCards);
    //if player or dealer has blackjack
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      //player & dealer have blackjack
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        myOutputValue =
          displayPlayerDealerCards(playerCards, dealerCards) +
          "<br>🤡 ♠️♥️ It's a blackjack tie! 🤡♦️♣️ <br><br> 🃏Press the submit button to start a new game🃏";
      }
      //player has blackjack
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        myOutputValue =
          displayPlayerDealerCards(playerCards, dealerCards) +
          "<br>🎉 ♠️♥️ Player wins by blackjack! ♦️♣️ 🎉<br><br> 🃏Press the submit button to start a new game🃏";
      }
      //dealer has blackjack
      else if (playerHasBlackjack == false && dealerHasBlackjack == true) {
        myOutputValue =
          displayPlayerDealerCards(playerCards, dealerCards) +
          "<br>🎉 ♠️♥️ Dealer wins by blackjack! ♦️♣️ 🎉<br><br> 🃏Press the submit button to start a new game🃏";
      }
      resetGame();
      return myOutputValue;
    }
    //no blackjack, move on to hit or stand
    else {
      myOutputValue =
        displayPlayerDealerCards(playerCards, dealerCards) +
        "<br><br> Please input ' hit ' to draw a card OR ' stand ' to end your turn.";
      gameState = GAME_HIT_OR_STAND;
    }
    return myOutputValue;
  }

  //continue game if player & dealer dont have blackjack
  if (gameState == GAME_HIT_OR_STAND) {
    var cleanedInput = input.trim().toLowerCase();

    //invalid input
    if (cleanedInput != "hit" && cleanedInput != "stand") {
      myOutputValue =
        "❌Invalid input. <br> Please input only ' hit ' or ' stand '.<br><br>" +
        displayPlayerDealerCards(playerCards, dealerCards);
    }

    //player chose hit
    else if (cleanedInput == "hit") {
      playerCards.push(gameDeck.pop());
      myOutputValue =
        displayPlayerDealerCards(playerCards, dealerCards) +
        "<br><br> You just drew another card. Please input ' hit ' or ' stand ' to continue. ";
    }

    //player chose stand
    else if (cleanedInput == "stand") {
      var playerTotalCardsValue = calculateTotalCardsValue(playerCards);
      var dealerTotalCardsValue = calculateTotalCardsValue(dealerCards);

      //player cards value less than 17
      var isUserUnderValue = playerTotalCardsValue < 17;

      if (isUserUnderValue == true) {
        gameState = GAME_HIT_OR_STAND;
        myOutputValue =
          "❌Your cards value is below 17. <br> Please enter ' hit ' to draw a card. <br><br>" +
          displayPlayerDealerCards(playerCards, dealerCards);
      } else {
        //set dealer hit or stand automatically
        while (dealerTotalCardsValue < 17) {
          dealerCards.push(gameDeck.pop());
          dealerTotalCardsValue = calculateTotalCardsValue(dealerCards);
        }

        //check bust
        var isPlayerBust = playerTotalCardsValue > 21;
        var isDealerBust = dealerTotalCardsValue > 21;
        if (isPlayerBust == true || isDealerBust == true) {
          //player bust
          if (isPlayerBust == true) {
            myOutputValue =
              displayPlayerDealerCards(playerCards, dealerCards) +
              "<br><br> Player bust! 😶‍🌫️<br> 🎉 The winner is dealer! 🎉 <br><br> 🃏Press the submit button to start a new game🃏";
          }

          //dealer bust
          else if (isDealerBust == true) {
            myOutputValue =
              displayPlayerDealerCards(playerCards, dealerCards) +
              "<br><br> Dealer bust! 😶‍🌫️<br> 🎉 The winner is player! 🎉 <br><br> 🃏Press the submit button to start a new game🃏";
          }

          //player & dealer bust
          else if (isPlayerBust == true && isDealerBust == true) {
            myOutputValue =
              displayPlayerDealerCards(playerCards, dealerCards) +
              "<br><br> Both players are bust! 😶‍🌫️<br> There is no winner! 🤡<br><br> 🃏Press the submit button to start a new game🃏";
          }
          resetGame();
          return myOutputValue;
        }

        //comparison
        if (!isPlayerBust && !isDealerBust) {
          //tie condition
          if (playerTotalCardsValue == dealerTotalCardsValue) {
            myOutputValue =
              displayPlayerDealerCards(playerCards, dealerCards) +
              "<br>🤝 It's a tie! 🤝<br><br>" +
              displayTotalCardsValue(
                playerTotalCardsValue,
                dealerTotalCardsValue
              ) +
              "<br><br> 🃏Press the submit button to start a new game🃏";
          }
          //dealer win
          else if (playerTotalCardsValue < dealerTotalCardsValue) {
            myOutputValue =
              displayPlayerDealerCards(playerCards, dealerCards) +
              "<br>👻 Dealer win! 👻<br><br>" +
              displayTotalCardsValue(
                playerTotalCardsValue,
                dealerTotalCardsValue
              ) +
              "<br><br> 🃏Press the submit button to start a new game🃏";
          }
          //player win
          else if (playerTotalCardsValue > dealerTotalCardsValue) {
            myOutputValue =
              displayPlayerDealerCards(playerCards, dealerCards) +
              "<br> 🎉 Player win! 🎉<br><br>" +
              displayTotalCardsValue(
                playerTotalCardsValue,
                dealerTotalCardsValue
              ) +
              "<br><br> 🃏Press the submit button to start a new game🃏";
          }
          resetGame();
          return myOutputValue;
        }
        resetGame();
      }
    }
  }
  return myOutputValue;
};
