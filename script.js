gameMode = "start";

var createDeck = function () {
  var cardDeck = [];
  var suits = ["spades", "hearts", "clubs", "diamonds"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardVal = rankCounter;
      if (cardName == 11) {
        cardName = "Jack";
        cardVal = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardVal = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardVal = 10;
      } else if (cardName == 1) {
        cardName = "Ace";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardVal,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRanIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var currentCard = cardDeck[currentIndex];
    var ranIndex = getRanIndex(cardDeck.length);
    var ranCard = cardDeck[ranIndex];
    cardDeck[currentIndex] = ranCard;
    cardDeck[ranIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

var dealCards = function (currentDeck) {
  var playerFirstCard = currentDeck.pop();
  var comFirstCard = currentDeck.pop();
  var playerSecondCard = currentDeck.pop();
  var comSecondCard = currentDeck.pop();
  var playerHandSum = playerFirstCard.rank + playerSecondCard.rank;
  var comHandSum = comFirstCard.rank + comSecondCard.rank;
  if (comHandSum != 11) {
    while (comHandSum < 17) {
      var nextComCard = currentDeck.pop();
      comHandSum += nextComCard.rank;
    }
  }
  var dealtCards = {
    playerHandSum,
    comHandSum,
    currentDeck,
    playerFirstCard,
    playerSecondCard,
  };
  return dealtCards;
};

var checkInstaWin = function (dealtCards) {
  if (dealtCards.playerHandSum == 11 && dealtCards.comHandSum == 11) {
    return "Draw as both Player and Computer have Blackjack!";
  } else if (dealtCards.playerHandSum == 11) {
    dealtCards.playerHandSum == 21;
    return "Player wins with Blackjack!";
  } else if (dealtCards.comHandSum == 11) {
    dealtCards.playerHandSum == 21;
    return "Computer wins with Blackjack!";
  } else {
    console.log(dealtCards.playerHandSum);
    console.log(dealtCards.comHandSum);
    var playerFirstCard =
      dealtCards.playerFirstCard.name +
      " of " +
      dealtCards.playerFirstCard.suit;
    var playerSecondCard =
      dealtCards.playerSecondCard.name +
      " of " +
      dealtCards.playerSecondCard.suit;
    return `You got ${playerFirstCard} and ${playerSecondCard} <br> Type 'hit', to draw another card, or 'stand', to end the turn, in the input box and click submit`;
  }
};

var hitTurn = function (dealtCards) {
  var hitCard = dealtCards.currentDeck.pop();
  dealtCards.playerHandSum += hitCard.rank;
  return dealtCards;
};

var checkWin = function (dealtCards) {
  var playerScore = 21 - dealtCards.playerHandSum;
  var comScore = 21 - dealtCards.comHandSum;
  if (playerScore < 0 && comScore < 0) {
    return `Draw as both Player with score of ${dealtCards.playerHandSum} and Computer with score of ${dealtCards.comHandSum} go bust!`;
  } else if (playerScore < 0) {
    return `Computer wins with score of ${dealtCards.comHandSum} as Player goes bust with score of ${dealtCards.playerHandSum}!`;
  } else if (comScore < 0) {
    return `Player wins with score of ${dealtCards.playerHandSum} as Computer goes bust with score of ${dealtCards.comHandSum}!`;
  } else if (playerScore < comScore) {
    return `Player wins with score of ${dealtCards.playerHandSum} while Computer had a score of ${dealtCards.comHandSum}!`;
  } else if (playerScore > comScore) {
    return `Computer wins with score of ${dealtCards.comHandSum} while Player had a score of ${dealtCards.playerHandSum}!`;
  }
};

var inPlayCards;

var main = function (input) {
  if (gameMode == "start") {
    var toPlayDeck = createDeck();
    toPlayDeck = shuffleDeck(toPlayDeck);
    inPlayCards = dealCards(toPlayDeck);
    gameMode = "playing";
    return checkInstaWin(inPlayCards);
  }
  if (gameMode == "playing") {
    if (input == "hit") {
      inPlayCards = hitTurn(inPlayCards);
      console.log(inPlayCards.playerHandSum);
      console.log(inPlayCards.comHandSum);
      return `Your cards add up to ${inPlayCards.playerHandSum} <br> Type 'hit', to draw another card, or 'stand', to end the turn, in the input box and click submit`;
    } else if (input == "stand") {
      var gameResult = checkWin(inPlayCards);
      gameMode = "start";
      return gameResult;
    }
  }
};
