//Global Variables
var gameMode = "start game";
var gameStart = "start game";
var gameCardsDrawn = "cards drawn";
var gameResultsShown = "results shown";
var gameHitOrStand = "hit or stand";

//store dealer and player hands
var dealerHand = [];
var playerHand = [];
var gameDeck = [];

//Logic for getting random draw
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

//Logic for shuffling
var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

//Logic for making deck, instead of hardcoding each card as obj element
var makeDeck = function () {
  var deck = [];
  //make 52 cards

  //det suits - hearts, diamonds, clubs,spades
  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    //det rank - 1-13 (1-10 and jack, queen, king and ace)
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var valueNumber = rankCounter;

      //rank 1, 11, 12, 13 are not number cards
      if (cardName == 1) {
        cardName = "ace";
        valueNumber = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        valueNumber = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        valueNumber = 10;
      } else if (cardName == 13) {
        cardName = "king";
        valueNumber = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: valueNumber,
      };

      deck.push(card);
      rankCounter = rankCounter + 1;
    }

    suitIndex = suitIndex + 1;
  }
  return deck;
};

//function to create and shuffle a deck
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

//function to check for blackjack
var checkForBlackJack = function (handArray) {
  //check player hand
  var playerCard01 = handArray[0];
  var playerCard02 = handArray[1];
  var isBlackjack = false;

  //if there is blackjack, return true
  //1. card01 ace, card02 10 or pic cards
  //2. card01 10 or pic cards, card02 ace

  if (
    (playerCard01.name == "ace" && playerCard02.rank >= 10) ||
    (playerCard01 >= 10 && playerCard02.name == "ace")
  ) {
    isBlackjack = true;
  }
  //else returns false (default)
  return isBlackjack;
};

//function to calc total hand value
var calcTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    //for J/Q/K value is 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue += 10;
    } else if (currentCard.name == "ace") {
      totalHandValue += 11;
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

//function to display hands
var displayHands = function (playerHandArray, dealerHandArray) {
  //player hand
  var playerMsg = `Player hand : <br>`;
  var index = 0;
  while (index < playerHandArray.length) {
    playerMsg =
      playerMsg +
      `- ${playerHandArray[index].name} of ${playerHandArray[index].suit} <br>`;
    index += 1;
  }

  //dealer hand
  var dealerIndex = 0;
  var dealerMsg = "Dealer hand : <br>";
  while (dealerIndex < dealerHandArray.length) {
    dealerMsg =
      dealerMsg +
      `- ${dealerHandArray[dealerIndex].name} of ${dealerHandArray[dealerIndex].suit} <br>`;
    dealerIndex += 1;
  }

  return `${playerMsg} <br> ${dealerMsg} <br>`;
};

//function that display total hand values
var displayValue = function (playerHandValue, dealerHandValue) {
  var valueMsg = `<br><br> Player's total hand value : ${playerHandValue} <br> Dealer's total hand value : ${dealerHandValue}`;
  return valueMsg;
};

var main = function (input) {
  var msg = "";

  //first click
  if (gameMode == gameStart) {
    //create game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    //deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log(playerHand);
    console.log(dealerHand);

    //switch gamemode
    gameMode = gameCardsDrawn;

    //write and return msg
    msg =
      'Everyone has been dealt their cards. Click the "submit" button to evaluate your hand.';

    return msg;
  }

  //second click
  if (gameMode == gameCardsDrawn) {
    //check for blackjack
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      //both player and dealer has blackjack - tie
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        msg = displayHands(playerHand, dealerHand) + `It's a blackjack tie!`;
      }
      //only player has blackjack - player wins
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        msg = displayHands(playerHand, dealerHand) + `Player wins by blackjack`;
      }
      //only dealer has blackjack - dealer wins
      else {
        msg = displayHands(playerHand, dealerHand) + `Dealer wins by blackjack`;
      }
    } else {
      //no blackjack -> game cont.
      msg = displayHands(playerHand, dealerHand) + `There is no blackjack!`;
      console.log(msg);

      //change game mode
      gameMode = gameHitOrStand;
    }
    return msg;
  }

  //3rd click
  //hit or stand mode
  if (gameMode == gameHitOrStand) {
    //player hit
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      msg =
        displayHands(playerHand, dealerHand) +
        `<br> You drew another card. <br> Please input "hit" or "stand" to continue the game`;
    } // player stand
    else if (input == "stand") {
      //calculate total hand value of both player and dealer
      var playerHandTotalValue = calcTotalHandValue(playerHand);
      var dealerHandTotalValue = calcTotalHandValue(dealerHand);

      console.log(playerHandTotalValue);
      console.log(dealerHandTotalValue);

      //compare total hand value
      //same value > tie
      if (playerHandTotalValue == dealerHandTotalValue) {
        msg =
          displayHands(playerHand, dealerHand) +
          `Its a tie` +
          displayValue(playerHandTotalValue, dealerHandTotalValue);
      }
      //player higher value > player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        msg =
          displayHands(playerHand, dealerHand) +
          `Player wins!` +
          displayValue(playerHandTotalValue, dealerHandTotalValue);
      }
      //dealer higher value > dealer wins
      else {
        msg =
          displayHands(playerHand, dealerHand) +
          `Dealer wins!` +
          displayValue(playerHandTotalValue, dealerHandTotalValue);
      }
    } //input validation
    else {
      msg =
        'Typed input is invalid. Please type "hit" or "stand" to continue the game' +
        displayHands(playerHand, dealerHand);
    }
    return msg;
  }
};
