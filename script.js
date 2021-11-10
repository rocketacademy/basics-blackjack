// Global variables
var currentGameMode = "Deal cards";
var cardDeck = [];
var playerCards = [];
var computerCards = [];
var playerFinalPoints = "";
var playerCardsMsg = "";
var computerCardsMsg = "";

var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getDeckOfCards = function () {
  var deckOfCards = [];
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      var currentRank = rankCounter;
      var currentName = String(rankCounter);

      if (rankCounter == 1) {
        currentName = "Ace";
      } else if (rankCounter == 11) {
        currentName = "Jack";
      } else if (rankCounter == 12) {
        currentName = "Queen";
      } else if (rankCounter == 13) {
        currentName = "King";
      }

      var card = {
        rank: currentRank,
        suit: currentSuit,
        name: currentName,
      };

      deckOfCards.push(card);
    }
  }
  return deckOfCards;
};

var shufflingCards = function (deckOfCards) {
  for (
    var currentIndex = 0;
    currentIndex < deckOfCards.length;
    currentIndex += 1
  ) {
    var randomIndex = getRandomIndex(deckOfCards);
    var currentCard = deckOfCards[currentIndex];
    var randomCard = deckOfCards[randomIndex];

    deckOfCards[randomIndex] = currentCard;
    deckOfCards[currentIndex] = randomCard;
  }

  return deckOfCards;
};

var dealCard = function (cardDeck) {
  var card = cardDeck.pop();
  return card;
};

console.log(shufflingCards(getDeckOfCards()));

var checkBlackjack = function (card1, card2) {
  var gotBlackjack = false;
  if (card1.name == "Ace" || card2.name == "Ace") {
    if (card1.rank >= 10 || card2.rank >= 10) {
      gotBlackjack = true;
    }
  }

  return gotBlackjack;
};

var calculatePoints = function (cardHandArray) {
  var outputString = "";
  var pointsIfAceEqualsTo1 = 0;
  var pointsIfAceEqualsTo11 = 0;
  for (var cardIndex = 0; cardIndex < cardHandArray.length; cardIndex += 1) {
    if (cardHandArray[cardIndex].rank >= 10) {
      pointsIfAceEqualsTo1 += 10;
      pointsIfAceEqualsTo11 += 10;
    } else if (cardHandArray[cardIndex].rank == 1) {
      pointsIfAceEqualsTo1 += 1;
      pointsIfAceEqualsTo11 += 11;
    } else {
      pointsIfAceEqualsTo1 += cardHandArray[cardIndex].rank;
      pointsIfAceEqualsTo11 += cardHandArray[cardIndex].rank;
    }
  }

  if (pointsIfAceEqualsTo1 == pointsIfAceEqualsTo11) {
    outputString = `${pointsIfAceEqualsTo11}`;
  } else if (
    (pointsIfAceEqualsTo11 > 21 && pointsIfAceEqualsTo1 <= 21) ||
    (pointsIfAceEqualsTo11 > 21 && pointsIfAceEqualsTo1 > 21)
  ) {
    outputString = `${pointsIfAceEqualsTo1}`;
  } else {
    outputString = `${pointsIfAceEqualsTo1} / ${pointsIfAceEqualsTo11}`;
  }

  return outputString;
};

var getPointsFeedback = function (pointsString) {
  var pointsFeedback = "";

  if (pointsString.indexOf("/") != -1) {
    var pointsArray = pointsString.split(" / ");
    var pointsIfAceEqualsTo1 = 0;
    var pointsIfAceEqualsTo11 = 0;
    pointsIfAceEqualsTo1 = Number(pointsArray[0]);
    pointsIfAceEqualsTo11 = Number(pointsArray[1]);

    if (pointsIfAceEqualsTo1 > 21 && pointsIfAceEqualsTo11 > 21) {
      pointsFeedback = "bust";
    } else if (
      (pointsIfAceEqualsTo11 > 16 && pointsIfAceEqualsTo11 <= 21) ||
      (pointsIfAceEqualsTo1 > 16 && pointsIfAceEqualsTo1 <= 21)
    ) {
      pointsFeedback = "17-21";
    } else {
      pointsFeedback = "below 17";
    }
  } else {
    var currentpoints = Number(pointsString);

    if (currentpoints > 21) {
      pointsFeedback = "bust";
    } else if (currentpoints > 16 && currentpoints <= 21) {
      pointsFeedback = "17-21";
    } else {
      pointsFeedback = "below 17";
    }
  }

  return pointsFeedback;
};

a = "cds";

var getOutcomeMsg = function (playerPointsString, ComputerPointsString) {
  var outputMsg = "";
  var playerPointsArray = playerPointsString.split(" / ");
  var computerPointsArray = ComputerPointsString.split(" / ");

  var playerPoints = Number(playerPointsArray[playerPointsArray.length - 1]);
  var computerPoints = Number(
    computerPointsArray[computerPointsArray.length - 1]
  );

  if (playerPoints > computerPoints) {
    outputMsg = "Player wins! 🥳";
  } else if (playerPoints < computerPoints) {
    outputMsg = "Computer wins 🤬";
  } else {
    outputMsg = "It's a draw 😬";
  }

  return outputMsg;
};

var getFinalPoints = function (pointsString) {
  var pointsArray = pointsString.split(" / ");
  var finalPoints = pointsArray[pointsArray.length - 1];

  return finalPoints;
};
// console.log(
//   checkBlackjack(
//     { rank: 1, suit: "Spades", name: "King" },
//     { rank: 13, suit: "Spades", name: "Ace" }
//   )
// );
// var cardDeck = shufflingCards(getDeckOfCards());

var main = function (input) {
  var myOutputValue = "";

  if (currentGameMode == "Deal cards") {
    playerCards = [];
    computerCards = [];
    cardDeck = shufflingCards(getDeckOfCards());
    playerCards.push(dealCard(cardDeck), dealCard(cardDeck));
    computerCards.push(dealCard(cardDeck), dealCard(cardDeck));

    playerCardsMsg = "";
    computerCardsMsg = "";

    playerCardsMsg = `Player's hand is:<br>
    Card 1: ${playerCards[0].name} of ${playerCards[0].suit}<br>
    Card 2: ${playerCards[1].name} of ${playerCards[1].suit}`;

    computerCardsMsg = `Computer's hand is:<br>
    Card 1: ***************<br>
    Card 2: ${computerCards[1].name} of ${computerCards[1].suit}`;

    myOutputValue = `${playerCardsMsg}<br><br>${computerCardsMsg}`;

    if (checkBlackjack(playerCards[0], playerCards[1])) {
      myOutputValue = `${myOutputValue}<br><br>Huat ah! Player won with a blackjack! 😎`;
      return myOutputValue;
    }

    var playerPoints = calculatePoints(playerCards);

    myOutputValue = `${myOutputValue}<br><br>
    Player has ${playerPoints} points.<br>
    Please input 'Hit' / 'Stand' to continue the game.`;
    currentGameMode = "Player action";
    return myOutputValue;
  }

  // Player chose "hit" / "stand"
  if (currentGameMode == "Player action") {
    if (input == "Hit") {
      myOutputValue = "Player chose to hit.";

      playerCards.push(dealCard(cardDeck));
      var cardNum = playerCards.length;
      var cardIndex = playerCards.length - 1;
      playerCardsMsg = `${playerCardsMsg}<br>
      Card ${cardNum}: ${playerCards[cardIndex].name} of ${playerCards[cardIndex].suit}`;
    } else if (input == "Stand") {
      myOutputValue = "Player chose to stand.";
      computerCardsMsg = `Computer's hand is:<br>
      Card 1: ${computerCards[0].name} of ${computerCards[0].suit}<br>
      Card 2: ${computerCards[1].name} of ${computerCards[1].suit}`;
    } else {
      myOutputValue = `Please ensure your input is 'Hit' / 'Stand' to continue the game.`;
    }

    playerPoints = calculatePoints(playerCards);
    var playerPointsFeedback = getPointsFeedback(playerPoints);

    myOutputValue = `${myOutputValue}<br><br>
    ${playerCardsMsg}<br><br>
    ${computerCardsMsg}<br><br>
    Player has ${playerPoints} points.`;

    if (input == "Stand") {
      if (checkBlackjack(computerCards[0], computerCards[1])) {
        myOutputValue = `${myOutputValue}<br>Oh no! Computer won with a blackjack! 😖`;
        currentGameMode = "Deal cards";
        return myOutputValue;
      }
      playerFinalPoints = playerPoints;
      var computerPoints = calculatePoints(computerCards);
      var computerPointsFeedback = getPointsFeedback(computerPoints);

      if (computerPointsFeedback == "17-21") {
        var outcomeMsg = getOutcomeMsg(playerFinalPoints, computerPoints);
        var computerFinalPoints = getFinalPoints(computerPoints);

        myOutputValue = `${myOutputValue}<br>
        Computer has ${computerFinalPoints} points.<br><br>
        ${outcomeMsg}`;
        currentGameMode = "Deal cards";
      } else {
        myOutputValue = `${myOutputValue}<br>
        Computer has ${computerPoints} points.<br><br>
        It's the computer's turn, click the "Submit" button to continue.`;
        currentGameMode = "Computer action";
      }
    } else if (playerPointsFeedback == "bust") {
      myOutputValue = `${myOutputValue}<br>
      Player busts, you lose 😢`;
      currentGameMode = "Deal cards";
    } else {
      myOutputValue = `${myOutputValue}<br>
      Please input 'Hit' / 'Stand' to continue the game.`;
    }

    return myOutputValue;
  }

  // Computer's Turn
  if (currentGameMode == "Computer action") {
    var computerPoints = calculatePoints(computerCards);
    var computerPointsFeedback = getPointsFeedback(computerPoints);

    if (computerPointsFeedback == "below 17") {
      myOutputValue = "Computer chose to hit.";
      computerCards.push(dealCard(cardDeck));
      var cardNum = computerCards.length;
      var cardIndex = computerCards.length - 1;
      computerCardsMsg = `${computerCardsMsg}<br>
      Card ${cardNum}: ${computerCards[cardIndex].name} of ${computerCards[cardIndex].suit}`;
    } else if (computerPointsFeedback == "17-21") {
      myOutputValue = "Computer chose to stand.";
    } else {
      myOutputValue = "Computer chose to hit.";
    }

    computerPoints = calculatePoints(computerCards);
    computerPointsFeedback = getPointsFeedback(computerPoints);

    myOutputValue = `${myOutputValue}<br><br>
    ${playerCardsMsg}<br><br>
    ${computerCardsMsg}<br><br>
    Player has ${playerFinalPoints} points.`;

    if (computerPointsFeedback == "below 17") {
      myOutputValue = `${myOutputValue}<br>
      Computer has ${computerPoints} points.<br><br>
      Computer will draw to 16 & stand on 17.`;
    } else if (computerPointsFeedback == "17-21") {
      var outcomeMsg = getOutcomeMsg(playerFinalPoints, computerPoints);
      var computerFinalPoints = getFinalPoints(computerPoints);

      myOutputValue = `${myOutputValue}<br>
      Computer has ${computerFinalPoints} points.<br><br>
      ${outcomeMsg}`;
      currentGameMode = "Deal cards";
    } else {
      var outcomeMsg = getOutcomeMsg(playerFinalPoints, computerPoints);
      var computerFinalPoints = getFinalPoints(computerPoints);

      myOutputValue = `${myOutputValue}<br>
      Computer has ${computerPoints} points.<br><br>
      Computer busts, player wins! 🥳`;
      currentGameMode = "Deal cards";
    }

    return myOutputValue;
  }

  return "Something went wrong";
};

// Tell user to hit "submit" to start code
// Deal 2 cards each to player & com (1 face down - use ***)
// DONE --- Check for blackjack
// if not blackjack, ask player to hit or stand
// show score after each hit
// if hit & becomes above 21, player lose
// once stand, open com face down card & instruct player to hit submit for each com action
// com draw until it has a minimum of 17
