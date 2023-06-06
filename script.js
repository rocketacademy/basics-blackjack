var main = function (input) {
  var playingCards = makeDeck();
  var shuffledDeck = shuffleCards(playingCards);
  var computerCards = [];
  var playerCards = [];

  for (var i = 0; i < 2; i += 1) {
    playerCards.push(shuffledDeck.pop());
  }
  for (var j = 0; j < 2; j += 1) {
    computerCards.push(shuffledDeck.pop());
  }

  var computerHandValue = calcHand(computerCards);
  var playerHandValue = calcHand(playerCards);
  console.log(`com: ${computerHandValue}`);
  console.log(`player: ${playerHandValue}`);

  var myOutputValue = `Player drew ${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit}. Total Hand Value is ${playerHandValue}<br><br>Computer drew ${computerCards[0].name} of ${computerCards[0].suit} and ${computerCards[1].name} of ${computerCards[1].suit}. Total Hand Value is ${computerHandValue}<br><br>Please enter "hit" or "stand", then click Submit`;
  return myOutputValue;
};

var calcHand = function (hand) {
  var handValue = 0;
  for (var k = 0; k < hand.length; k += 1) {
    handValue += hand[k].value;
  }
  return handValue;
};

var shuffleCards = function (cardDeck) {
  var l = 0;
  while (l < cardDeck.length) {
    var randomL = getRandomL(cardDeck.length);
    var currentCard = cardDeck[l];
    var randomCard = cardDeck[randomL];
    cardDeck[l] = randomCard;
    cardDeck[randomL] = currentCard;
    l += 1;
  }
  return cardDeck;
};

var getRandomL = function (size) {
  return Math.floor(Math.random() * size);
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Diamond", "Clubs", "Hearts", "Spades"];

  var suitM = 0;
  while (suitM < suits.length) {
    var currentSuit = suits[suitM];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 11;
      }
      if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      }
      if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      }
      if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitM += 1;
  }
  return cardDeck;
};
