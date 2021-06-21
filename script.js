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
var main = function (cardDeck) {
  var playerCard1 = shuffledDeck.pop(cardDeck);
  var computerCard1 = shuffledDeck.pop(cardDeck);
  var playerCard2 = shuffledDeck.pop(cardDeck);
  var computerCard2 = shuffledDeck.pop(cardDeck);
  var sumOfPlayerCardValue = playerCard1.value + playerCard2.value;
  console.log(playerCard1.value + playerCard2.value);
  var sumOfComputerCardValue = computerCard1.value + computerCard2.value;
  console.log(computerCard1.value + computerCard2.value);
  var outcome =
    "Player had " +
    playerCard1.name +
    " of " +
    playerCard1.suit +
    " and " +
    playerCard2.name +
    " of " +
    playerCard2.suit +
    "<br>Computer had " +
    computerCard1.name +
    " of " +
    computerCard1.suit +
    " and " +
    computerCard2.name +
    " of " +
    computerCard2.suit;
  if (sumOfPlayerCardValue > sumOfComputerCardValue) {
    myOutputValue = "Player Wins.<br> " + outcome;
  } else if (sumOfPlayerCardValue < sumOfComputerCardValue) {
    myOutputValue = "Computer Wins.<br> " + outcome;
  } else {
    myOutputValue = "Its a tie.<br> " + outcome;
  }
  return myOutputValue;
};
