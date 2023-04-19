var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var valueCount = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
        valueCount = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        valueCount = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        valueCount = 10;
      } else if (cardName == 13) {
        cardName = "king";
        valueCount = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: valueCount,
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

var suitIcon = function (suit) {
  if (suit == "hearts") {
    return "♥️";
  } else if (suit == "diamonds") {
    return "♦️";
  } else if (suit == "clubs") {
    return "♣️";
  } else return "♠️";
};

var gameMode = "start";
var main = function (input) {
  if (gameMode == "start") {
    var myOutputValue = `Press submit to start the game.`;
    gameMode = "dealCards";
    return myOutputValue;
  }

  if (gameMode == "dealCards") {
    var deckOfCards = makeDeck();
    var shuffledDeckOfCards = shuffleCards(deckOfCards);
    var playerCard1 = shuffledDeckOfCards[51];
    var playerCard2 = shuffledDeckOfCards[50];
    var computerCard1 = shuffledDeckOfCards[49];
    var computerCard2 = shuffledDeckOfCards[48];

    var cardsDrawn = `You drew ${playerCard1.name} of ${suitIcon(
      playerCard1.suit
    )} and ${playerCard2.name} of ${suitIcon(
      playerCard2.suit
    )}.<br>Computer drew ${computerCard1.name} of ${suitIcon(
      computerCard1.suit
    )} and ${computerCard2.name} of ${suitIcon(computerCard2.suit)}. `;
    var playerScore = playerCard1.value + playerCard2.value;
    var computerScore = computerCard1.value + computerCard2.value;
    if (playerScore > computerScore && playerScore < 21 && computerScore < 21) {
      var conclusion = `Player has ${playerScore} points and computer has ${computerScore} points. Player Wins.`;
      if (
        (playerCard1.rank > 10 && playerCard2.rank == 1) ||
        (playerCard2.rank > 10 && playerCard1 == 1)
      ) {
        var conclusion = `Player has blackjack. Player wins.`;
      }
    }
    if (computerScore > playerScore && playerScore < 21 && computerScore < 21) {
      var conclusion = `Player has ${playerScore} points and computer has ${computerScore} points. Computer Wins.`;
      if (
        (computerCard1.rank > 10 && computerCard2.rank == 1) ||
        (computerCard2.rank > 10 && computerCard1 == 1)
      ) {
        var conclusion = `Computer has blackjack. Computer wins.`;
      }
    }
    if (
      playerScore == computerScore &&
      playerScore < 21 &&
      computerScore < 21
    ) {
      var conclusion = `Player has ${playerScore} points and computer has ${computerScore} points. Its a tie.`;
    }
    return cardsDrawn + "<br>" + conclusion;
  }
};
