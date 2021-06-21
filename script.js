var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
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
      // add the value of each card
      var cardValue = rankCounter;
      if (cardValue == 1) {
        cardValue = 1;
      } else if (cardValue == 11 || cardValue == 12 || cardValue == 13) {
        cardValue = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
cardDeck = makeDeck();
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
var shuffledDeck = shuffleCards(cardDeck);
var currentGameMode = "drawing of cards";
var playerCard1 = "";
var playerCard2 = "";
var sumOfPlayerCardValue = "";
var sumOfComputerCardValue = "";
var main = function (input) {
  if (currentGameMode == "drawing of cards") {
    playerCard1 = shuffledDeck.pop();
    var computerCard1 = shuffledDeck.pop();
    playerCard2 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();
    sumOfPlayerCardValue = playerCard1.value + playerCard2.value;
    console.log("player: " + sumOfPlayerCardValue);
    sumOfComputerCardValue = computerCard1.value + computerCard2.value;
    console.log(
      "Computer had " +
        computerCard1.name +
        " of " +
        computerCard1.suit +
        " and " +
        computerCard2.name +
        " of " +
        computerCard2.suit
    );
    currentGameMode = "hit or stand";
    return (
      "Player had " +
      playerCard1.name +
      " of " +
      playerCard1.suit +
      " and " +
      playerCard2.name +
      " of " +
      playerCard2.suit +
      "<br><br>Please enter HIT to draw another card or STAND to end your turn."
    );
  }
  if (currentGameMode == "hit or stand") {
    if (input == "HIT") {
      var playerCard3 = shuffledDeck.pop();
      console.log("Player had " + playerCard3.name + " of " + playerCard3.suit);
      sumOfPlayerCardValue = sumOfPlayerCardValue + playerCard3.value;
      console.log("player: " + sumOfPlayerCardValue);
      return (
        "Your cards are:<br><br>" +
        playerCard1.name +
        " of " +
        playerCard1.suit +
        "<br>" +
        playerCard2.name +
        " of " +
        playerCard2.suit +
        "<br>" +
        playerCard3.name +
        " of " +
        playerCard3.suit
      );
    } else if (input == "STAND") {
      return (
        "Your cards are:<br><br>" +
        playerCard1.name +
        " of " +
        playerCard1.suit +
        "<br>" +
        playerCard2.name +
        "<br>" +
        playerCard2.suit
      );
    }
    currentGameMode = "outcome";
  }
  if (currentGameMode == "outcome") {
    console.log("player: " + sumOfPlayerCardValue);
    console.log("computer: " + sumOfComputerCardValue);
    if (sumOfPlayerCardValue > 21) {
      myOutputValue = "Player Bust.";
    } else if (sumOfPlayerCardValue > sumOfComputerCardValue) {
      myOutputValue = "Player Wins.";
    } else if (sumOfPlayerCardValue < sumOfComputerCardValue) {
      myOutputValue = "Computer Wins.";
    } else {
      myOutputValue = "Its a tie.";
    }
  }
  return myOutputValue;
};
