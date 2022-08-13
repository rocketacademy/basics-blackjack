// var playerTurn = "player turn";
// var computerTurn = "computer turn";
var startGame = "start game";
var drawnCard = "drawn card";
var showResults = "show results";
// var hitOrStay = "hit or stay";
var gameMode = drawnCard;
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
    gameMode == drawnCard;
    outputMessage = `Everyone have drawn 2 cards. Click submit to check the cards!`;
    return outputMessage;
  }
  if (gameMode == drawnCard) {
    //check whether player or dealer has drawn bj
    playerHand = [
      { name: 10, suit: "diamonds", rank: 10 },
      { name: 3, suit: "spades", rank: 3 },
    ];
    dealerHand = [
      { name: 4, suit: "hearts", rank: 4 },
      { name: 5, suit: "hearts", rank: 5 },
    ];
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);
    // console.log("Does player have BJ? ==?" + playerHasBlackjack);
    // console.log("Does dealer have BJ? ==?" + dealerHasBlackjack);
    // playerHasBlackjack = true;
    // dealerHasBlackjack = true;
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage = `It's a tie! Player and dealer both have blackjack.`;
      } else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage = `Player wins! Player drew blackjack.`;
      } else {
        outputMessage = `Dealer wins! Dealer drew blackjack.`;
      }
      console.log(outputMessage);
    }
    //no blackjack scenerio
    else {
      outputMessage = `There is no blackjack!`;
      console.log(outputMessage);
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      console.log("Player hand total value:" + playerHandTotalValue);
      console.log("Dealer hand total value:" + dealerHandTotalValue);
    }
  }
};
