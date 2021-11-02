var DEAL = "deal";
var PLAY = "play";
var gamesection = DEAL;
var playerCards = [];
var dealerCards = [];

var main = function (input) {
  var mydeck = generateDeck();
  var shuffledDeck = shuffleDeck(mydeck);
  var cardIndex = 0;

  while (cardIndex < 2) {
    playerCards[cardIndex] = shuffledDeck.pop();
    console.log(playerCards);
    dealerCards[cardIndex] = shuffledDeck.pop();
    console.log(dealerCards);
    cardIndex += 1;
  }

  var playerBlackjack = checkForBlackjack(playerCards);
  var computerBlackjack = checkForBlackjack(dealerCards);

  if (playerBlackjack === true && computerBlackjack === true) {
    myOutputValue = "<br> Both players have blackjacks!, Its a tie!";
  } else if (playerBlackjack === true && computerBlackjack === false) {
    myOutputValue = "<br> Player have blackjack!, You win!";
  } else if (playerBlackjack === false && computerBlackjack === true) {
    myOutputValue = "<br> Computer have blackjack!, You lose!";
  }

  if (playerBlackjack === false && computerBlackjack === false) {
    var playerValue = playerCards[0].value + playerCards[1].value;
    var dealerValue = dealerCards[0].value + dealerCards[1].value;
    if (playerValue < dealerValue) {
      myOutputValue = "<br> You Lose!";
    } else if (playerValue > dealerValue) {
      myOutputValue = "<br> You Win!";
    } else if (playerValue == dealerValue) {
      myOutputValue = "<br> Its a Draw!";
    }
  }

  myOutputValue =
    "Player your cards are: <br>" +
    printCard(playerCards) +
    "Player value is: " +
    playerValue +
    "<br><br> The dealer cards are: <br>" +
    printCard(dealerCards) +
    "Dealer value is: " +
    dealerValue +
    myOutputValue;

  return myOutputValue;
};

//Generating the deck
var generateDeck = function () {
  deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var index = 0;
  //for each suit

  while (index < suits.length) {
    var currentSuit = suits[index];
    var currentRank = 1;

    while (currentRank <= 13) {
      var cardName = currentRank;
      var cardValue = currentRank;

      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      var newCard = {
        name: cardName,
        suit: currentSuit,
        rank: currentRank,
        value: cardValue,
      };

      deck.push(newCard);
      currentRank += 1;
    }

    index += 1;
  }

  return deck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }

  return cardDeck;
};

var printCard = function (array) {
  var card1 = array[0];
  var card2 = array[1];
  return (
    card1.name +
    " of " +
    card1.suit +
    "<br>" +
    card2.name +
    " of " +
    card2.suit +
    "<br>"
  );
};

var checkForBlackjack = function (array) {
  var blackjack = false;
  if (array[0] == "Ace" && 10 <= array[1]) {
    blackjack = true;
  } else if (array[1] == "Ace" && 10 <= array[0]) {
    blackjack = true;
  }
  return blackjack;
};
