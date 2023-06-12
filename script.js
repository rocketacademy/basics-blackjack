gameMode = "start";

var createDeck = function () {
  var cardDeck = [];
  var suits = ["spades", "hearts", "clubs", "diamonds"];
  var suitIndex = 0;
  while (suitIndex < suitIndex.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    var cardVal = 0;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
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
      cardVal = rankCounter;
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
      var nextComCard = cardDeck.pop();
      comHandSum += nextComCard.rank;
    }
  }
  var dealtCards = {
    playerHandSum,
    comHandSum,
    currentDeck,
  };
  playMode = "playing";
  return dealtCards;
};

var checkInstaWin = function (dealtCards) {
  if (dealtCards.playerHandSum == 11 && dealtCards.comHandSum == 11) {
    return "Draw as both Player and Computer have Blackjack!";
  } else if ((dealtCards.playerHandSum = 11)) {
    return "Player wins with Blackjack!";
  } else if (dealtCards.comHandSum == 11) {
    return "Computer wins with Blackjack!";
  } else {
    return "Type 'hit', to draw another card, or 'stand', to end the turn, in the input box and click submit";
  }
};

var hitTurn = function (dealtCards) {
  var hitCard = dealtCards.currentDeck.pop();
  dealtCards.playerHandSum += hitCard.rank;
  return { dealtCards };
};

var checkWin = function (dealtCards) {
  var playerScore = 21 - dealtCards.playerHandSum;
  var comScore = 21 - dealtCards.comHandSum;
  if (playerScore < 0 && comScore < 0) {
    return "Draw as both Player and Computer go bust!";
  } else if (playerScore < 0) {
    return "Computer wins as Player goes bust!";
  } else if (comScore < 0) {
    return "Player wins as Computer goes bust!";
  } else if (playerScore < comScore) {
    return "Player wins!";
  } else if (playerScore > comScore) {
    return "Computer loses!";
  }
};

var main = function (input) {
  if (gameMode == "start") {
    var toPlayDeck = createDeck();
    toPlayDeck = shuffleDeck(toPlayDeck);
    var inPlayCards = dealCards(toPlayDeck);
    return checkInstaWin(inPlayCards);
  }
  if (gameMode == "playing") {
    if (input == "hit") {
      inPlayCards = hitTurn(inPlayCards);
      return "Type 'hit', to draw another card, or 'stand', to end the turn, in the input box and click submit";
    } else if (input == "stand") {
      return checkWin();
    }
  }
};
