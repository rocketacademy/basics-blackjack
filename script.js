var DEAL = "deal";
var HIT = "hit";
var STAY = "stay";
var PLAY = "play";
var RESULTS = "results";
var section = DEAL;
var playerCards = [];
var dealerCards = [];
var playerValue = 0;
var dealerValue = 0;

var main = function (input) {
  var mydeck = generateDeck();
  var shuffledDeck = shuffleDeck(mydeck);

  if (section == DEAL) {
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
    playerValue = playerCards[0].value + playerCards[1].value;
    dealerValue = dealerCards[0].value + dealerCards[1].value;

    if (playerBlackjack === true && computerBlackjack === true) {
      return (
        leaderboard(playerCards, playerValue, dealerCards, dealerValue) +
        "<br> Both players have blackjacks!, Its a tie!"
      );
    } else if (playerBlackjack === true && computerBlackjack === false) {
      return (
        leaderboard(playerCards, playerValue, dealerCards, dealerValue) +
        "<br> Player have blackjack!, You win!"
      );
    } else if (playerBlackjack === false && computerBlackjack === true) {
      return (
        leaderboard(playerCards, playerValue, dealerCards, dealerValue) +
        "<br> Computer have blackjack!, You lose!"
      );
    }

    section = PLAY;
    return (
      leaderboard(playerCards, playerValue, dealerCards, dealerValue) +
      "<br><br> Please input 'stay' or 'hit'"
    );
  }

  if (section == PLAY) {
    if (!input || !(input == STAY || input == HIT)) {
      return "Please input 'stay' or 'hit'";
    }

    if (input == HIT) {
      var newCard = shuffledDeck.pop();
      playerCards.push(newCard);
      console.log("New card", newCard.value);
      playerValue = playerValue + newCard.value;
      console.log("Player Value", playerValue);
      playerValue = adjustForAces(playerCards, playerValue);

      if (playerValue > 21 && dealerValue < 22) {
        section = DEAL;
        return (
          leaderboard(playerCards, playerValue, dealerCards, dealerValue) +
          "<br> You Bust! You Lose <br> Press submit to restart game"
        );
      }

      return (
        leaderboard(playerCards, playerValue, dealerCards, dealerValue) +
        "<br><br> Please input 'stay' or 'hit'"
      );
    }

    if (input == STAY) {
      while (dealerValue <= 15) {
        newCard = shuffledDeck.pop();
        dealerCards.push(newCard);
        dealerValue = dealerValue + newCard.value;
        dealerValue = adjustForAces(dealerCards, dealerValue);
      }

      if (playerValue > 21 && dealerValue < 22) {
        myOutputValue = "<br> You Bust! You Lose";
      } else if (playerValue < 22 && dealerValue > 21) {
        myOutputValue = "<br> Computer Bust! You Win";
      } else if (playerValue > 21 && dealerValue > 21) {
        myOutputValue = "<br> Both Busts! Its a draw";
      } else if (playerValue < dealerValue) {
        myOutputValue = "<br> You Lose!";
      } else if (playerValue > dealerValue) {
        myOutputValue = "<br> You Win!";
      } else if (playerValue == dealerValue) {
        myOutputValue = "<br> Its a Draw!";
      }

      section = DEAL;
      cardIndex = 0;
      myOutputValue =
        leaderboard(playerCards, playerValue, dealerCards, dealerValue) +
        myOutputValue;
      playerCards = [];
      dealerCards = [];
      return myOutputValue + "<br><br> Press Submit to start a new game";
    }
  }
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
  var count = 0;
  var printedCard = "";
  while (count < array.length) {
    printedCard =
      printedCard + array[count].name + " of " + array[count].suit + "<br>";
    count += 1;
  }
  return printedCard;
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

var leaderboard = function (
  playerCards,
  playerValue,
  dealerCards,
  dealerValue
) {
  return (
    "Player your cards are: <br>" +
    printCard(playerCards) +
    "Player value is: " +
    playerValue +
    "<br><br> The dealer cards are: <br>" +
    printCard(dealerCards) +
    "Dealer value is: " +
    dealerValue
  );
};

var checkForAces = function (array) {
  var aceIndex = 0;
  var noOfAces = 0;
  while (aceIndex < array.length) {
    var card = array[aceIndex];
    if (card.rank == 1) {
      noOfAces += 1;
    }
    aceIndex += 1;
  }
  return noOfAces;
};

var adjustForAces = function (array, value) {
  var aces = checkForAces(array);
  console.log("Aces", aces);

  while (aces > 0 && value < 11) {
    aces = aces - 1;
    value = value + 10;
  }

  console.log("Value", value);
  return value;
};
