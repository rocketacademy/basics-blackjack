// Blackjack base game
// playable game : creating deck, shuffling deck, dealing cards, who wins
// ability for player to hit or stand
// ability for computer to hit or stand
// variable value of ace either 1 or 11

// Declare game modes
const GAME_START = "game start";
const GAME_CARDS_DRAWN = "cards drawn";
const GAME_RESULTS_SHOWN = "results shown";
const GAME_HIT_STAND = "Hit or stand";
var GAME_MODE = GAME_START;

document.querySelector("#Hit-button").disabled = true;
document.querySelector("#Stand-button").disabled = true;
document.querySelector("#submit-button").disabled = false;
// arrays to store each hand
var playerHand = [];
var dealerHand = [];

var gameDeck = "";

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♠️", "♣️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var cardIndex = 1;
    while (cardIndex <= 13) {
      var cardName = cardIndex;
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
        rank: cardIndex,
        suit: currentSuit,
      };
      cardDeck.push(card);
      cardIndex += 1;
    }
    suitIndex += 1;
  }
  console.log(cardDeck);
  return cardDeck;
};
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
    currentIndex += 1;
  }
  return cardDeck;
};

var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

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

var calculateTotalHandValue = function (handArray) {
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
      totalHandValue += 10;
    } else if (currentCard.name == "Ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter += 1;
    } else {
      totalHandValue += currentCard.rank;
    }
    index += 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index += 1;
  }
  return totalHandValue;
};

var displayPlayerHand = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player Hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index += 1;
  }
  // to continue by adding just one card of the dealer
  var dealerMessage =
    "Dealer Hand:<br>- " +
    dealerHandArray[0].name +
    " of " +
    dealerHandArray[0].suit +
    "<br>";
  return playerMessage + "<br>" + dealerMessage;
};

var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player Hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index += 1;
  }

  var dealerMessage = "Dealer Hand : <br>";
  var index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index += 1;
  }
  return playerMessage + "<br>" + dealerMessage + "<br>";
};

var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br> Player total hand value: " +
    playerHandValue +
    "<br> Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

var resetGame = function () {
  playerHand = [];
  dealerHand = [];
};

var main = function (input) {
  var myOutputValue = "";
  if (GAME_MODE == GAME_START) {
    gameDeck = createNewDeck();

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    console.log(playerHand, dealerHand);
    GAME_MODE = GAME_CARDS_DRAWN;
    var image1 =
      '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/PBMIdI4wlpoAAAAC/jennifer-lawrence-the-mocking-jay.gif" max-width="40%" /></div>';

    myOutputValue = `Everyone has been dealt a card. Click the Start button to continue.`;

    return myOutputValue + image1;
  }

  if (GAME_MODE == GAME_CARDS_DRAWN) {
    var playerHasBlackJack = checkforBlackjack(playerHand);
    var dealerHasBlackJack = checkforBlackjack(dealerHand);
    document.querySelector("#Hit-button").disabled = false;
    document.querySelector("#Stand-button").disabled = false;
    document.querySelector("#submit-button").disabled = true;
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        var image7 =
          '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/wyfhYqF1tJIAAAAC/mark-wahlberg-wahlberg.gif" width="20%"/>';
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "It is a blackjack tie!" +
          image7;
        console.log(myOutputValue);
      } else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        var image4 =
          '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/GFZRTVYcdWMAAAAC/blackjack-21.gif" width="20%"/>';
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Player wins by blackjack!" +
          image4;
        console.log(myOutputValue);
      } else {
        var image6 =
          '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/58rVrcSfwCcAAAAM/panda-oh-no.gif" width="20%"/>';
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dealer wins by blackjack!" +
          image6;
        console.log(myOutputValue);
      }
    } else {
      var image2 =
        '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/68l8oNneHuUAAAAC/wheelie-rollin.gif" width="20%"/>';
      myOutputValue =
        displayPlayerHand(playerHand, dealerHand) +
        'There is no blackjack! <br> Click the "Hit" to draw another card or "Stand" to stop drawing!';
      console.log(myOutputValue);
      GAME_MODE = GAME_HIT_STAND;
      return myOutputValue + image2;
    }
  }

  if (GAME_MODE == GAME_HIT_STAND) {
    var playerHandTotalValue = calculateTotalHandValue(playerHand);
    var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
    document.querySelector("#Hit-button").disabled = false;
    document.querySelector("#Stand-button").disabled = false;
    document.querySelector("#submit-button").disabled = true;
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      playerHandTotalValue = calculateTotalHandValue(playerHand);
      if (playerHandTotalValue > 21) {
        var image3 =
          '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/NLc7SW4PKJgAAAAd/myth-busted-busted.gif" width="20%"/>';
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "You are busted! You went over 21! <br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
        resetGame();
        GAME_MODE = GAME_START;
        document.querySelector("#Hit-button").disabled = true;
        document.querySelector("#Stand-button").disabled = true;
        document.querySelector("#submit-button").disabled = false;
        return myOutputValue + '<br><br> Click "Start" to play again!' + image3;
      } else {
        myOutputValue =
          displayPlayerHand(playerHand, dealerHand) +
          '<br> you drew another card. <br> Please input "hit" or "stand".';
        document.querySelector("#Hit-button").disabled = false;
        document.querySelector("#Stand-button").disabled = false;
        document.querySelector("#submit-button").disabled = true;
        return myOutputValue;
      }
    } else if (input == "stand") {
      // var playerHandTotalValue = calculateTotalHandValue(playerHand);
      // var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      if (dealerHandTotalValue > 21) {
        var image5 =
          '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/9oyVodbFp0AAAAAC/win-confetti.gif" width="20%"/>';
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dealer has bust! Dealer went over 21! <br> Player has won! <br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          '<br><br> Click "Start" to play again!' +
          image5;
      } else if (playerHandTotalValue == dealerHandTotalValue) {
        var image7 =
          '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/wyfhYqF1tJIAAAAC/mark-wahlberg-wahlberg.gif" width="20%"/>';
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "It is a tie! <br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          '<br><br> Click "Start" to play again!' +
          image7;
      } else if (playerHandTotalValue > dealerHandTotalValue) {
        var image5 =
          '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/9oyVodbFp0AAAAAC/win-confetti.gif" width="20%"/>';
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Player wins! <br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          '<br><br> Click "Start" to play again!' +
          image5;
      } else if (dealerHandTotalValue > playerHandTotalValue) {
        var image6 =
          '<div style="display: flex; justify-content: center;"><img src="https://c.tenor.com/58rVrcSfwCcAAAAM/panda-oh-no.gif" width="20%"/>';
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dealer wins! <br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          '<br><br> Click "Start" to play again!' +
          image6;
      }
      resetGame();
      GAME_MODE = GAME_START;
      document.querySelector("#Hit-button").disabled = true;
      document.querySelector("#Stand-button").disabled = true;
      document.querySelector("#submit-button").disabled = false;
      return myOutputValue;
    }
  }
  resetGame();
  document.querySelector("#Hit-button").disabled = true;
  document.querySelector("#Stand-button").disabled = true;
  document.querySelector("#submit-button").disabled = false;
  GAME_MODE = GAME_START;
  return myOutputValue;
};
