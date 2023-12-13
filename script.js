var gameMode1 = "Compare initial hands";
var gameMode2 = "Player hit or stand";
var gameMode3 = "Dealer hit or stand";
var currentGameMode = gameMode1;

var cardDeck = [];
var playerArray = [];
var dealerArray = [];

var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var calcHandValue = function (array) {
  var value = 0;
  var index = 0;
  // no of cards = how many times the loop runs
  while (index < array.length) {
    var latestCard = array[index];
    // queen king jack values = 10
    if (
      latestCard.name == "queen" ||
      latestCard.name == "king" ||
      latestCard.name == "jack"
    ) {
      value = value + 10;
      //ace value = 11 if >21
    } else if (latestCard.name == "ace" && value > 21) {
      value = value + 11;
    } else {
      //the rest: = rank number
      value = value + latestCard.rank;
    } //last line of while loop: increment index
    index = index + 1;
  }
  return value;
};

var showPlayerHand = function (playerArray) {
  message = "Player Hand: <br>";
  index = 0;
  while (index < playerArray.length) {
    message =
      message +
      playerArray[index].name +
      " of " +
      playerArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return message;
};

var showDealerHand = function (dealerArray) {
  message = "Dealer Hand: <br>";
  index = 0;
  while (index < dealerArray.length) {
    message =
      message +
      dealerArray[index].name +
      " of " +
      dealerArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return message;
};

var main = function (input) {
  var myOutputValue = "";
  var shuffledCardDeck = shuffleCards(makeDeck());
  var showHandsAndValue =
    showPlayerHand(playerArray) +
    calcHandValue(playerArray) +
    "<br><br>" +
    showDealerHand(dealerArray) +
    calcHandValue(dealerArray);
  if (currentGameMode == gameMode1) {
    playerArray.push(shuffledCardDeck.pop());
    playerArray.push(shuffledCardDeck.pop());
    dealerArray.push(shuffledCardDeck.pop());
    dealerArray.push(shuffledCardDeck.pop());
    var playerValue = calcHandValue(playerArray);
    var dealerValue = calcHandValue(dealerArray);
    var showHandsAndValue =
      showPlayerHand(playerArray) +
      calcHandValue(playerArray) +
      "<br><br>" +
      showDealerHand(dealerArray) +
      calcHandValue(dealerArray);
    if (playerValue == 21) {
      myOutputValue =
        showHandsAndValue +
        "<br>Player wins by blackjack. Refresh to play again.";
    }
    if (dealerValue == 21) {
      myOutputValue =
        showHandsAndValue +
        "<br>Dealer wins by blackjack. Refresh to play again.";
    }
    if ((playerValue == dealerValue) == 21) {
      myOutputValue =
        showHandsAndValue +
        "<br>Its a tie with blackjack. Refresh to play again.";
    } else {
      currentGameMode = gameMode2;
      myOutputValue =
        showHandsAndValue + "<br><br> Type 'h' to hit or 's' to stand.";
    }
    return myOutputValue;
  }
  if (currentGameMode == gameMode2) {
    if (input == "h") {
      playerArray.push(shuffledCardDeck.pop());
      var playerHandValue = calcHandValue(playerArray);
      if (playerHandValue > 21) {
        myOutputValue =
          showPlayerHand(playerArray) +
          playerHandValue +
          "<br><br>" +
          showDealerHand(dealerArray) +
          "<br> You bust.";
      } else {
        myOutputValue =
          showPlayerHand(playerArray) +
          playerHandValue +
          "<br><br>" +
          showDealerHand(dealerArray) +
          "<br> Type 'h' to hit or 's' to stand.";
      }
    } else if (input == "s") {
      var dealerHandValue = calcHandValue(dealerArray);

      while (dealerHandValue < 17) {
        dealerArray.push(shuffledCardDeck.pop());
        dealerHandValue = calcHandValue(dealerArray);
      }
    }
    return myOutputValue;
  }
};
