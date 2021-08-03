var main = function (input) {
  if (playersCards.length == 0) {
    shuffleDeck(createDeck());
    dealCard(playersCards);
    dealCard(computersCards);
    dealCard(playersCards);
    dealCard(computersCards);
    if (sumOfHand(playersCards) == 21 && sumOfHand(computersCards) == 21) {
      return "Blackjack! Computer won (dealer)";
    } else if (sumOfHand(playersCards) == 21) {
      return "Blackjack! Player won";
    } else if (sumOfHand(computersCards) == 21) {
      return "Blackjack! Computer won";
    } else {
      return (
        "Your cards are " +
        playersCards[0].name +
        " of " +
        playersCards[0].suit +
        " and " +
        playersCards[1].name +
        " of " +
        playersCards[1].suit +
        "<br><br> Your score is " +
        sumOfHand(playersCards) +
        " Please choose to hit or stand"
      );
    }
  }
  if (input == "hit") {
    dealCard(playersCards);
    if (sumOfHand(playersCards) == 21) {
      return "Blackjack! Player won";
    } else if (sumOfHand(playersCards) > 21) {
      return (
        "bust, you drew " +
        playersCards[playersCards.length - 1].cardName +
        " of " +
        playersCards[playersCards.length - 1].suit
      );
    } else {
      return (
        "Your cards are " +
        playersCards[0].name +
        " of " +
        playersCards[0].suit +
        " and " +
        playersCards[1].name +
        " of " +
        playersCards[1].suit +
        "<br><br> Your score is " +
        sumOfHand(playersCards) +
        " Please choose to hit or stand"
      );
    }
  }
  if (input == "stand") {
    if (sumOfHand(playersCards) > sumOfHand(computersCards)) {
      return "you won";
    } else if (sumOfHand(playersCards) < sumOfHand(computersCards)) {
      return "you lost";
    } else {
      return "you lost cos it was a draw";
    }
  }
};

var deckOfCards = [];
var suits = ["hearts", "diamonds", "clubs", "spades"];
var cardCounter = 1;
var suitCounter = 0;
var scoreCounter = 1;

var createDeck = function () {
  while (suitCounter <= suits.length - 1) {
    cardName = cardCounter;
    cardSuit = suits[suitCounter];
    if (cardCounter == 1) {
      var cardName = "Ace";
    }
    if (cardCounter == 11) {
      var cardName = "Jack";
    }
    if (cardCounter == 12) {
      var cardName = "Queen";
    }
    if (cardCounter == 13) {
      var cardName = "King";
    }
    var card = {
      name: cardName,
      suit: cardSuit,
      score: scoreCounter,
    };
    deckOfCards.push(card);
    if (cardCounter == 13) {
      cardCounter = 0;
      suitCounter += 1;
      scoreCounter = 1;
    }
    cardCounter += 1;
    scoreCounter += 1;
  }
  return deckOfCards;
};

var shuffleCounter = 0;
var shuffleDeck = function (cards) {
  while (shuffleCounter <= cards.length) {
    // index needs to go up to 53
    var randomNumber = Math.floor(Math.random() * 53 + 1);
    var shuffleCard1 = cards[shuffleCounter];
    var shuffleCard2 = cards[randomNumber];
    cards[randomNumber] = shuffleCard1;
    cards[shuffleCounter] = shuffleCard2;
    shuffleCounter += 1;
  }
  return cards;
};

var playersCards = [];
var computersCards = [];

var dealCard = function (cards) {
  cards.push(deckOfCards.pop());
};

var sumOfHand = function (hand) {
  handCounter = 0;
  handSum = 0;
  while (handCounter <= hand.length) {
    handSum += hand[handCounter].scoreCounter;
  }
  return handSum;
};
