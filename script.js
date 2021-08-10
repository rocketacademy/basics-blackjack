var deckOfCards = [];
var suits = ["hearts", "diamonds", "clubs", "spades"];
var cardCounter = 1;
var suitCounter = 0;
var scoreCounter = 1;
var playerPoints = 100;
var playerWager = 0;

var createDeck = function () {
  while (suitCounter <= suits.length - 1) {
    var cardName = cardCounter;
    cardSuit = suits[suitCounter];
    if (cardCounter == 1) {
      cardName = "Ace";
    }
    if (cardCounter == 11) {
      cardName = "Jack";
      scoreCounter = 10;
    }
    if (cardCounter == 12) {
      cardName = "Queen";
      scoreCounter = 10;
    }
    if (cardCounter == 13) {
      cardName = "King";
      scoreCounter = 10;
    }
    var card = {
      name: cardName,
      suit: cardSuit,
      score: scoreCounter,
    };
    deckOfCards.push(card);
    if (cardCounter == 13) {
      cardCounter = 1;
      suitCounter += 1;
      scoreCounter = 1;
    } else {
      cardCounter += 1;
      scoreCounter += 1;
    }
  }
  return deckOfCards;
};

//var shuffleCounter = 0;
var shuffleDeck = function (cards) {
  var shuffleCounter = 0;
  // can shuffle any number of times, assume length of deck for now
  while (shuffleCounter <= cards.length) {
    var firstIndex = Math.floor(Math.random() * cards.length);
    var secondIndex = Math.floor(Math.random() * cards.length);
    var tempCard = cards[firstIndex];
    cards[firstIndex] = cards[secondIndex];
    cards[secondIndex] = tempCard;
    shuffleCounter += 1;
  }
  return cards;
};

var playersCards = [];
var computersCards = [];

var dealCard = function (cards, deck) {
  cards.push(deck.pop());
};

var sumOfHand = function (hand) {
  handCounter = 0;
  handSum = 0;
  aceInHand = 0;
  while (handCounter < hand.length) {
    handSum += hand[handCounter].score;
    if (aceInHand == 0 && hand[handCounter].name == "Ace") {
      aceInHand = 1;
      handSum += 10;
    }
    handCounter += 1;
    // to deal with the Ace problem - just assume Ace is 11 first, provided this is the first Ace
  }
  // if handSum exceeds 21 cos of Ace being 11, deduct 10 to make Ace 1
  if (aceInHand == 1 && handSum > 21) {
    handSum -= 10;
    aceInHand = 0;
  }
  return handSum;
};

var main = function (input) {
  if (playerPoints == 0) {
    return "you've lost everything...refresh to get another 100 points!";
  }
  if (input == "" && playerWager == 0) {
    return (
      "How many points would you like to wager? Choose a number greater than 0. <br><br> Points available: " +
      playerPoints
    );
  }
  if (playerWager == 0) {
    playerWager = input;
    playerPoints -= playerWager;
    return (
      `You wagered ${playerWager} points.` + " Submit again to start the game!"
    );
  }

  if (playersCards.length == 0) {
    shuffleDeck(createDeck());
    console.log(deckOfCards);
    dealCard(playersCards, deckOfCards);
    dealCard(computersCards, deckOfCards);
    dealCard(playersCards, deckOfCards);
    dealCard(computersCards, deckOfCards);
    if (sumOfHand(playersCards) == 21 && sumOfHand(computersCards) == 21) {
      playersCards = [];
      computersCards = [];
      playerWager = 0;
      return "Blackjack! Computer won (dealer)";
    } else if (sumOfHand(playersCards) == 21) {
      playerPoints += playerWager * 2;
      playersCards = [];
      computersCards = [];
      playerWager = 0;
      return "Blackjack! Player won";
    } else if (sumOfHand(computersCards) == 21) {
      playersCards = [];
      computersCards = [];
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
        ". Please choose to hit or stand"
      );
    }
  }
  if (input == "hit") {
    dealCard(playersCards, deckOfCards);
    if (sumOfHand(playersCards) == 21) {
      playerPoints += playerWager * 2;
      playerWager = 0;
      playersCards = [];
      computersCards = [];
      return "Blackjack! Player won";
    } else if (sumOfHand(playersCards) > 21) {
      playerWager = 0;
      gameOutcome =
        "bust, you drew " +
        playersCards[playersCards.length - 1].name +
        " of " +
        playersCards[playersCards.length - 1].suit;
      playersCards = [];
      computersCards = [];
      return gameOutcome;
    } else {
      gameOutcome =
        "You just drew " +
        playersCards[playersCards.length - 1].name +
        " of " +
        playersCards[playersCards.length - 1].suit +
        "<br><br> Your score is " +
        sumOfHand(playersCards) +
        " Please choose to hit or stand";
      return gameOutcome;
    }
  }
  // if (input == "stand") {
  //   if (sumOfHand(playersCards) > sumOfHand(computersCards)) {
  //     return "you won";
  //   } else if (sumOfHand(playersCards) < sumOfHand(computersCards)) {
  //     return "you lost";
  //   } else {
  //     return "you lost cos it was a draw";
  //   }
  // }
  if (input == "done" || input == "stand") {
    // console.log(sumOfHand(computersCards))
    // console.log(computersCards)
    while (sumOfHand(computersCards) < 17) {
      dealCard(computersCards, deckOfCards);
    }
    if (sumOfHand(computersCards) > 21) {
      gameOutcome = "computer lose";
      playerPoints += playerWager * 2;
      playerWager = 0;
      gameOutcome +=
        "<br><br>" +
        `Computer score: ${sumOfHand(computersCards)}` +
        "<br><br>" +
        `Your score: ${sumOfHand(playersCards)}`;
      playersCards = [];
      computersCards = [];
      return gameOutcome;
    }
    if (sumOfHand(playersCards) > sumOfHand(computersCards)) {
      playerPoints += playerWager * 2;
      playerWager = 0;
      gameOutcome = "the computer lost; you won";
    } else if (sumOfHand(playersCards) < sumOfHand(computersCards)) {
      playerWager = 0;
      gameOutcome = "the computer won; you lost";
    } else {
      playerWager = 0;
      gameOutcome = "the computer won cos it was a draw";
    }

    gameOutcome +=
      "<br><br>" +
      `Computer score: ${sumOfHand(computersCards)}` +
      "<br><br>" +
      `Your score: ${sumOfHand(playersCards)}`;
    playersCards = [];
    computersCards = [];
    return gameOutcome;
  }
};
