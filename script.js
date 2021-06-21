var currentGameMode = "drawing of cards";
var playerCard1 = "";
var playerCard2 = "";
var computerCard1 = "";
var computerCard2 = "";
var sumOfPlayerCardValue = 10;
var sumOfComputerCardValue = "";
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      // add the value of each card
      var cardValue = rankCounter;
      if (cardValue == 1) {
        cardValue = 1 || 11;
      } else if (cardValue == 11 || cardValue == 12 || cardValue == 13) {
        cardValue = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
cardDeck = makeDeck();
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
var aceCard = function (input) {
  var message = "";
  console.log("function");
  console.log("player: " + sumOfPlayerCardValue);
  if (input == "11") {
    sumOfPlayerCardValue += 10;
  } else if (input == "1") {
    sumOfPlayerCardValue = sumOfPlayerCardValue;
    console.log(sumOfPlayerCardValue);
  }
  currentGameMode = "player hit or stand";
  message =
    playerHand +
    "<br><br> Your total value is " +
    sumOfPlayerCardValue +
    "<br><br>Enter HIT to draw another card or STAND to end your turn.";
  return message;
};

var shuffledDeck = shuffleCards(cardDeck);
var main = function (input) {
  if (currentGameMode == "drawing of cards") {
    playerCard1 = shuffledDeck.pop();
    var computerCard1 = shuffledDeck.pop();
    playerCard2 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();
    sumOfPlayerCardValue = playerCard1.value + playerCard2.value;
    console.log("player: " + sumOfPlayerCardValue);
    sumOfComputerCardValue = computerCard1.value + computerCard2.value;
    console.log(
      "Computer had " +
        computerCard1.name +
        " of " +
        computerCard1.suit +
        " and " +
        computerCard2.name +
        " of " +
        computerCard2.suit +
        " // " +
        sumOfComputerCardValue
    );
    playerHand =
      "Player had " +
      playerCard1.name +
      " of " +
      playerCard1.suit +
      " <br> " +
      playerCard2.name +
      " of " +
      playerCard2.suit;
    if (playerCard1.name == "ace" || playerCard2.name == "ace") {
      currentGameMode = "ace 1 or 11";
      return (
        playerHand +
        "<br><br> Ace have value of 1 or 11. Please enter 1 or 11 to choose the value."
      );
    } else if (playerCard1.name != "ace" && playerCard2.name != "ace") {
      currentGameMode = "player hit or stand";
      return (
        playerHand +
        "<br><br>Please enter HIT to draw another card or STAND to end your turn."
      );
    }
  }
  if (currentGameMode == "ace 1 or 11") {
    myOutputValue = aceCard(input);
    return myOutputValue;
  }
  if (currentGameMode == "player hit or stand") {
    if (input == "HIT") {
      var playerCard3 = shuffledDeck.pop();
      console.log("Player had " + playerCard3.name + " of " + playerCard3.suit);
      sumOfPlayerCardValue = sumOfPlayerCardValue + playerCard3.value;
      console.log("player: " + sumOfPlayerCardValue);
      return (
        "Your cards are:<br><br>" +
        playerCard1.name +
        " of " +
        playerCard1.suit +
        "<br>" +
        playerCard2.name +
        " of " +
        playerCard2.suit +
        "<br>" +
        playerCard3.name +
        " of " +
        playerCard3.suit
      );
    } else if (input == "STAND") {
      return (
        "Your cards are:<br><br>" +
        playerCard1.name +
        " of " +
        playerCard1.suit +
        "<br>" +
        playerCard2.name +
        " of " +
        playerCard2.suit
      );
    }
    currentGameMode = "computer hit or stand";
  }
  if (currentGameMode == "computer hit or stand") {
    if (sumOfComputerCardValue < 17) {
      var computerCard3 = shuffledDeck.pop();
      sumOfComputerCardValue = sumOfComputerCardValue + computerCard3.value;
      console.log(
        "computer: " + computerCard3.name + " of " + computerCard3.suit
      );
      console.log("computer: " + sumOfComputerCardValue);
    }
    currentGameMode = "result";
  }
  if (currentGameMode == "result") {
    console.log(currentGameMode);
    console.log("player: " + sumOfPlayerCardValue);
    console.log("computer: " + sumOfComputerCardValue);
    if (sumOfPlayerCardValue > 21) {
      myOutputValue = "Player Bust.";
    } else if (sumOfComputerCardValue > 21) {
      myOutputValue = "Computer Bust.";
    } else if (sumOfPlayerCardValue > 21 && sumOfComputerCardValue > 21) {
      myOutputValue = "Both Bust";
    } else if (sumOfPlayerCardValue > sumOfComputerCardValue) {
      myOutputValue = "Player Wins.";
    } else if (sumOfPlayerCardValue < sumOfComputerCardValue) {
      myOutputValue = "Computer Wins.";
    } else {
      myOutputValue = "Its a tie.";
    }
    currentGameMode = "drawing of cards";
  }
  return myOutputValue;
};
