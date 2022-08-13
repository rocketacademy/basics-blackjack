// var playerTurn = "player turn";
// var computerTurn = "computer turn";
var startGame = "start game";
var drawnCard = "drawn card";
var showResults = "show results";
var hitOrStand = "hit or stand";
var gameMode = startGame;
// var currentPlayer = playerTurn;

var playerHand = [];
var dealerHand = [];
var gameDeck = "empty at the start";
// var currentPlayerDraw = [];

//create and shuffle deck function
var makeNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

//randomize function
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
//shuffle cards function
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

//making the deck of cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
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

//check hands for blackjack function
var checkForBlackjack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

//calculate total hand value function
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index += 1;
  }
  return totalHandValue;
};

//display player and dealer hands function
var displayHands = function (playerHandArray, dealerHandArray) {
  //player hand message
  var playerMessage = `Player hand:<br>`;
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage = `${playerMessage} - ${playerHandArray[index].name} of ${playerHandArray[index].suit}<br>`;
    index += 1;
  }
  //dealer hand message
  var dealerMessage = `Dealer hand:<br>`;
  index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage = `${dealerMessage} - ${dealerHandArray[index].name} of ${dealerHandArray[index].suit}<br>`;
    index += 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

//display TOTAL player and dealer hands value function
var displayHandsTotalValue = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage = `<br>Player total hand value: ${playerHandValue} <br>Dealer total hand value: ${dealerHandValue}`;
  return totalHandValueMessage;
};

var main = function (input) {
  var outputMessage = "";
  if (gameMode == startGame) {
    gameDeck = makeNewDeck();
    console.log(gameDeck);
    //player(s) and dealer draw 2 cards each
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    console.log("player hand:");
    console.log(playerHand);
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    console.log("dealer hand:");
    console.log(dealerHand);
    //change game mode to game cards drawn
    gameMode = drawnCard;
    outputMessage = `Everyone have drawn 2 cards. Click submit to check the cards!`;
    return outputMessage;
  }
  if (gameMode == drawnCard) {
    //check whether player or dealer has drawn bj
    // playerHand = [
    //   { name: 10, suit: "diamonds", rank: 10 },
    //   { name: 3, suit: "spades", rank: 3 },
    // ];
    // dealerHand = [
    //   { name: 4, suit: "hearts", rank: 4 },
    //   { name: 5, suit: "hearts", rank: 5 },
    // ];
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);
    // console.log("Does player have BJ? ==?" + playerHasBlackjack);
    // console.log("Does dealer have BJ? ==?" + dealerHasBlackjack);
    // playerHasBlackjack = true;
    // dealerHasBlackjack = true;
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage =
          displayHands(playerHand, dealerHand) +
          "Its a tie! Player and dealer both have blackjack.";
      } else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage =
          displayHands(playerHand, dealerHand) +
          "Player wins! Player drew blackjack.";
      } else {
        outputMessage =
          displayHands(playerHand, dealerHand) +
          "Dealer wins! Dealer drew blackjack.";
      }
      console.log(outputMessage);
    }
    //no blackjack scenerio
    else {
      outputMessage =
        displayHands(playerHand, dealerHand) + "There is no blackjack!";
      console.log(outputMessage);

      //change game mode to show player and dealer results
      gameMode = hitOrStand;
      return outputMessage;
    }
  }

  //hit or stand function
  if (gameMode == hitOrStand) {
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayHands(playerHand, dealerHand) +
        "<br>Your drew another card. <br>Please enter hit or stand.";
    } else if (input == "stand") {
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      if (playerHandTotalValue == dealerHandTotalValue) {
        outputMessage =
          displayHands(playerHand, dealerHand) +
          "Its a tie!" +
          displayHandsTotalValue(playerHandTotalValue, dealerHandTotalValue);
      } else if (playerHandTotalValue > dealerHandTotalValue) {
        outputMessage =
          displayHands(playerHand, dealerHand) +
          "Player wins!" +
          displayHandsTotalValue(playerHandTotalValue, dealerHandTotalValue);
      } else {
        outputMessage =
          displayHands(playerHand, dealerHand) +
          "Dealer wins!" +
          displayHandsTotalValue(playerHandTotalValue, dealerHandTotalValue);
      }
    }
    //input validation
    else {
      outputMessage = `Sorry, please enter either "hit" or "stand". <br><br>${displayHands(
        playerHand,
        dealerHand
      )}`;
    }
    return outputMessage;
  }
};
