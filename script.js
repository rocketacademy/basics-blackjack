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
  if (input == "11") {
    sumOfPlayerCardValue += 10;
  } else if (input == "1") {
    sumOfPlayerCardValue = sumOfPlayerCardValue;
    console.log(sumOfPlayerCardValue);
  }
  currentGameMode = "player hit or stand";
  message =
    playerHandList +
    "<br><br> Your total value is " +
    sumOfPlayerCardValue +
    "<br><br>Enter HIT to draw another card or STAND to end your turn.";
  return message;
};
var shuffledDeck = shuffleCards(cardDeck);
var playerHand = [];
var comHand = [];
var currentGameMode = "place bet";
var playerCard1 = "";
var playerCard2 = "";
var playerHandList = "";
var computerCard1 = "";
var computerCard2 = "";
var comHandList = "";
var sumOfPlayerCardValue = "";
var sumOfComputerCardValue = "";
var points = 100;
var betAmt;
var main = function (input) {
  if (currentGameMode == "place bet") {
    if (input == "" || input == NaN || input > points) {
      return "Please enter a number below " + points;
    } else {
      betAmt = input;
      currentGameMode = "drawing of cards";
      return "You have bet: " + betAmt + " points.";
    }
  }
  if (currentGameMode == "drawing of cards") {
    playerCard1 = shuffledDeck.pop();
    playerHand.push(playerCard1);
    computerCard1 = shuffledDeck.pop();
    comHand.push(computerCard1);
    playerCard2 = shuffledDeck.pop();
    playerHand.push(playerCard2);
    computerCard2 = shuffledDeck.pop();
    comHand.push(computerCard2);
    computerCard1.name = "ace";
    computerCard1.value = 1;
    sumOfPlayerCardValue = playerCard1.value + playerCard2.value;
    console.log("player: " + sumOfPlayerCardValue);
    sumOfComputerCardValue = computerCard1.value + computerCard2.value;
    comHandList =
      "Computer had " +
      computerCard1.name +
      " of " +
      computerCard1.suit +
      " and " +
      computerCard2.name +
      " of " +
      computerCard2.suit +
      " // " +
      sumOfComputerCardValue;
    console.log(comHandList);
    playerHandList =
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
        playerHandList +
        "<br><br> Ace have value of 1 or 11. Please enter 1 or 11 to choose the value."
      );
    } else if (playerCard1.name != "ace" && playerCard2.name != "ace") {
      currentGameMode = "player hit or stand";
      return (
        playerHandList +
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
      var playerCard = shuffledDeck.pop();
      playerHand.push(playerCard);
      playerHandList += "<br>" + playerCard.name + " of " + playerCard.suit;
      console.log("Player had " + playerCard.name + " of " + playerCard.suit);
      sumOfPlayerCardValue = sumOfPlayerCardValue + playerCard.value;
      if (playerCard.name == "ace") {
        currentGameMode = "ace 1 or 11";
        return (
          playerHandList +
          "<br><br>Ace have value of 1 or 11. Please enter 1 or 11 to choose the value."
        );
      }
      if (sumOfPlayerCardValue > 21) {
        currentGameMode = "result";
        return "You have bust!";
      }
      console.log("player: " + sumOfPlayerCardValue);
      return (
        "Your cards are:<br><br>" +
        playerHandList +
        "<br><br>Please enter HIT to draw another card or STAND to end your turn."
      );
    } else if (input == "STAND") {
      currentGameMode = "computer hit or stand";
      return (
        "Your cards are:<br><br>" +
        playerHandList +
        "<br><br> Please click submit to view results"
      );
    }
  }
  // if computer has an ace, the ace should be 11 if sum of the cards are greater than 17
  if (currentGameMode == "computer hit or stand") {
    if (computerCard1.name == "ace" || computerCard2.name == "ace") {
      if (sumOfComputerCardValue > 7) {
        sumOfComputerCardValue += 10;
      }
    }
    while (sumOfComputerCardValue < 17) {
      var computerCard = shuffledDeck.pop();
      computerCard.name = "ace";
      computerCard.value = 1;
      comHand.push(computerCard);
      if (computerCard.name == "ace") {
        sumOfComputerCardValue += computerCard.value;
        if (sumOfComputerCardValue > 7) {
          sumOfComputerCardValue += 10;
        }
      }
      comHandList += computerCard.name + " of " + computerCard.suit;
      sumOfComputerCardValue += computerCard.value;
      console.log(
        "computer: " + computerCard.name + " of " + computerCard.suit
      );
    }
    console.log("computer: " + sumOfComputerCardValue);
    currentGameMode = "result";
  }
  if (currentGameMode == "result") {
    console.log(currentGameMode);
    console.log("player: " + sumOfPlayerCardValue);
    console.log("computer: " + sumOfComputerCardValue);
    if (sumOfPlayerCardValue > 21 && sumOfComputerCardValue > 21) {
      winner = "Tie";
    } else if (sumOfComputerCardValue > 21) {
      winner = "Player";
    } else if (sumOfPlayerCardValue > 21) {
      winner = "Com";
    } else if (sumOfPlayerCardValue > sumOfComputerCardValue) {
      winner = "Player";
    } else if (sumOfPlayerCardValue < sumOfComputerCardValue) {
      winner = "Com";
    } else {
      winner = "Tie";
    }
    if (winner == "Player") {
      points = Number(points) + Number(betAmt);
      console.log(points);
      myOutputValue = "Player Wins.<br>You have " + points + " points";
    } else if (winner == "Com") {
      points = Number(points) - Number(betAmt);
      myOutputValue = "Computer Wins.<br>You have " + points + " points";
    } else if (winner == "Tie") {
      myOutputValue = "It's a draw.<br>You have " + points + " points";
    }
    currentGameMode = "place bet";
  }
  return myOutputValue;
};
