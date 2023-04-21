// First Version: Compare Initial Hands to Determine Winner
var playerCards = [];
var dealerCards = [];

var main = function (input) {
  var shuffledDeck = shuffleCards(cardDeck);

  playerCards.push(shuffledDeck.pop());
  playerCards.push(shuffledDeck.pop());
  dealerCards.push(shuffledDeck.pop());
  dealerCards.push(shuffledDeck.pop());

  var totalPlayerHand = calculateHandTotal(playerCards);
  console.log(totalPlayerHand);
  var totalDealerHand = calculateHandTotal(dealerCards);
  console.log(totalDealerHand);

  var myOutputValue =
    "Player hand: " +
    playerCards[0].name +
    " of " +
    playerCards[0].suit +
    " , " +
    playerCards[1].name +
    " of " +
    playerCards[1].suit +
    "<br>Player Total: " +
    totalPlayerHand +
    "<br><br>Dealer hand: " +
    dealerCards[0].name +
    " of " +
    dealerCards[0].suit +
    " , " +
    dealerCards[1].name +
    " of " +
    dealerCards[1].suit +
    "<br>Dealer Total: " +
    totalDealerHand;

  if (
    (playerCards[0].rank >= 10 && playerCards[1].name == "Ace") ||
    (playerCards[1].rank >= 10 && playerCards[0].name == "Ace")
  ) {
    myOutputValue = myOutputValue + "<br><br>Player wins by blackjack!";
  } else if (
    (dealerCards[0].rank >= 10 && dealerCards[1].name == "Ace") ||
    (dealerCards[1].rank >= 10 && dealerCards[0].name == "Ace")
  ) {
    myOutputValue = myOutputValue + "<br><br>Dealer wins by blackjack!";
  } else if (
    playerCards[0].rank + playerCards[1].rank >
      dealerCards[0].rank + dealerCards[1].rank &&
    playerCards[0].rank + playerCards[1].rank <= 21
  ) {
    myOutputValue = myOutputValue + "<br><br>Player wins!";
  } else if (
    dealerCards[0].rank + dealerCards[1].rank >
      playerCards[0].rank + playerCards[1].rank &&
    dealerCards[0].rank + dealerCards[1].rank <= 21
  ) {
    myOutputValue = myOutputValue + "<br><br>Dealer wins!";
  } else if (
    playerCards[0].rank + playerCards[1].rank ==
    dealerCards[0].rank + dealerCards[1].rank
  ) {
    myOutputValue = myOutputValue + "<br><br>It's a tie!";
  }

  return myOutputValue;
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;

    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      console.log(card.rank);

      cardDeck.push(card);

      rankCounter += 1;

      console.log(
        "Card rank counter: " + rankCounter + "Card Name: " + cardName
      );
    }

    suitIndex += 1;
  }

  return cardDeck;
};

var cardDeck = makeDeck();

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

var calculateHandTotal = function (cardsArray) {
  var handTotal = 0;

  var index = 0;
  while (index < cardsArray.length) {
    var currentCard = cardsArray[index];

    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      handTotal = handTotal + 10;
    } else {
      handTotal = handTotal + currentCard.rank;
    }
    index = index + 1;
  }
  return handTotal;
};
