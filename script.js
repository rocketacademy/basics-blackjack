// Global variables
var currentGameMode = "Deal cards";
var cardDeck = [];
var playerHandPoints = 0;
var computerHandPoints = 0;
var playerCards = [];
var computerCards = [];

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

var calculatePoints = function (cardHand) {
  var output = [];
  var pointsIfAceEqualsTo1 = 0;
  var pointsIfAceEqualsTo11 = 0;
  for (var cardIndex = 0; cardIndex < cardHand.length; cardIndex += 1) {
    if (cardHand[cardIndex].rank >= 10) {
      pointsIfAceEqualsTo1 += 10;
      pointsIfAceEqualsTo11 += 10;
    } else if (cardHand[cardIndex].rank == 1) {
      pointsIfAceEqualsTo1 += 1;
      pointsIfAceEqualsTo11 += 11;
    } else {
      pointsIfAceEqualsTo1 += cardHand[cardIndex].rank;
      pointsIfAceEqualsTo11 += cardHand[cardIndex].rank;
    }
  }

  output.push(pointsIfAceEqualsTo1);
  output.push(pointsIfAceEqualsTo11);

  return output;
};

var getPointsFeedback = function (pointsArray) {
  var output = "";
  var pointsIfAceEqualsTo1 = pointsArray[0];
  var pointsIfAceEqualsTo11 = pointsArray[1];

  if (pointsIfAceEqualsTo11 > 21 && pointsIfAceEqualsTo1 > 21) {
    output = " bust";
  }
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

    myOutputValue = `Player's hand is:<br>
    Card 1: ${playerCards[0].name} of ${playerCards[0].suit}<br>
    Card 2: ${playerCards[1].name} of ${playerCards[1].suit}<br><br>

    Computer's hand is:<br>
    Card 1: ***************<br>
    Card 2: ${computerCards[1].name} of ${computerCards[1].suit}`;

    if (checkBlackjack(playerCards[0], playerCards[1])) {
      myOutputValue = `${myOutputValue}<br><br>Huat ah! Player won with a blackjack!`;
      return myOutputValue;
    }

    myOutputValue = `${myOutputValue}<br><br>`;
    currentGameMode = "Player action";
    return myOutputValue;
  }

  if (currentGameMode == "Player action") {
  }

  return myOutputValue;
};

// Tell user to hit "submit" to start code
// Deal 2 cards each to player & com (1 face down - use ***)
// DONE --- Check for blackjack
// if not blackjack, ask player to hit or stand
// show score after each hit
// if hit & becomes above 21, player lose
// once stand, open com face down card & instruct player to hit submit for each com action
// com draw until it has a minimum of 17
