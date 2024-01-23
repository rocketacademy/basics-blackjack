// BlackJack project
// Steps:
// 1. deal and compare hands to determine any Blackjack winner
// 2. player hit or stand
// 3. compare player VS computer hands. declare winner

var playerHand = [];
var computerHand = [];
var cardDeck = [];
var shuffledDeck = [];
var gameMode = "deal"; //game modes: 'deal', 'compare', 'play', 'evaluate'

var checkBlackJack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

var makeDeck = function () {
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

var calcTotalHandValue = function (handArray) {
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
    index = index + 1;
  }
  return totalHandValue;
};

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == "deal") {
    shuffledDeck = shuffleCards(makeDeck());
    console.log("this is shuffled deck", shuffledDeck);
    playerHand.push(shuffledDeck.pop());
    console.log("1st player card");

    playerHand.push(shuffledDeck.pop());
    console.log("2nd player card");

    console.log("this is player hand", playerHand);

    computerHand.push(shuffledDeck.pop());
    console.log("1st computer card");

    computerHand.push(shuffledDeck.pop());
    console.log("2nd computer card");

    console.log("this is computer hand", computerHand);

    gameMode = "compare";
    myOutputValue =
      "Hands have been dealt. Your hand is " +
      playerHand[0].name +
      " of " +
      playerHand[0].suit +
      " and " +
      playerHand[1].name +
      " of " +
      playerHand[1].suit +
      ". Click submit again to compare your hand with the dealer's to check for BlackJack";
    return myOutputValue;
  }
  if (gameMode == "compare") {
    var playerBlackJack = checkBlackJack(playerHand);
    var computerBlackJack = checkBlackJack(computerHand);
    myOutputValue =
      "Nobody got BlackJack We will continue playing the game. Type 'Hit' to draw another card or 'Stand' to end your turn";
    if (playerBlackJack == true || computerBlackJack == true) {
      if (playerBlackJack == true && computerBlackJack == true) {
        return (myOutputValue = "You both got BlackJack! It is a tie!");
      } else if (playerBlackJack == true && computerBlackJack == false) {
        return (myOutputValue = "You got BlackJack! You win!");
      } else playerBlackJack == false && computerBlackJack == true;
      {
        return (myOutputValue = "Computer got BlackJack! You lose :(");
      }
    }

    gameMode = "play";
    console.log("game mode after blackjack check", gameMode);
    return myOutputValue;
  }
  if (gameMode == "play") {
    if (input == "hit") {
      playerHand.push(shuffledDeck.pop());
      myOutputValue =
        "Your hand is " +
        playerHand[0].name +
        " of " +
        playerHand[0].suit +
        " and " +
        playerHand[1].name +
        " of " +
        playerHand[1].suit +
        " and " +
        playerHand[2].name +
        " of " +
        playerHand[2].suit +
        ". Type STAND to compare your hand with the computer hand.";
      return myOutputValue;
    }
    if (input == "stand") {
      myOutputValue =
        "You chose to stand. Click submit again to compare your hand with the dealer's to see who wins";
      gameMode = "evaluate";
      console.log("game mode after STAND", gameMode);
      return myOutputValue;
    }
  }
  if (gameMode == "evaluate") {
    var playerHandValue = calcTotalHandValue(playerHand);
    var computerHandValue = calcTotalHandValue(computerHand);
    if (playerHandValue > computerHandValue) {
      return `Your hand is ${playerHandValue} which is greater than the computer's of ${computerHandValue}. You win!`;
    }
  }
  return `The computer's hand is ${computerHandValue} which is greater than yours of ${playerHandValue}. You lose :(`;
};
