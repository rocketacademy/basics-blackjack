// gamemodes
var gameMode = "dealing cards";

// creating deck automatically using loop

var makeDeck = function () {
  var deck = [];

  // loop 1: separate to suits hearts spades

  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spade"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);

    //loop 2: separate to rank 1-13

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // special cases for 1 11 12 13

      if (cardName == 1) {
        cardName = "ace";
        cardValue = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // creating the object

      var cardDeck = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      console.log(`rank : ${rankCounter}`);

      // creating the object array

      deck.push(cardDeck);
      rankCounter += 1;
      console.log(cardDeck);
    }

    suitIndex += 1;
  }

  console.log("deck", deck);
  return deck;
};

var cardDeck = makeDeck();

// shuffling the deck

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    console.log("random card ", randomCard);
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    console.log("random card ", currentCard);
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    console.log("random card after swop", randomCard);
    console.log("currentcard after swop", currentCard);
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }

  return cardDeck;
};

var shuffledDeck = shuffleCards(cardDeck);
console.log("shuffled deck", shuffledDeck);

var main = function (input) {
  //pop takes out at the end of the array
  var computerCard1 = shuffledDeck.pop();
  console.log("computer card 1", computerCard1);
  var computerCard2 = shuffledDeck.pop();
  var playerCard1 = shuffledDeck.pop();
  console.log("player card 1", playerCard1);
  var playerCard2 = shuffledDeck.pop();
  var output = "";
  var computerScore = function () {
    totalComputerCardsScore = computerCard1.value + computerCard2.value;
    return totalComputerCardsScore;
  };
  var playerScore = function () {
    totalPlayerCardsScore = playerCard1.value + playerCard2.value;
    return totalPlayerCardsScore;
  };

  if (gameMode == "dealing cards") {
    output = `The computer drew ${computerCard1.name} of ${
      computerCard1.suit
    } and ${computerCard2.name} of ${computerCard2.suit} .<br>You drew ${
      playerCard1.name
    } of ${playerCard1.suit} and ${playerCard2.name} of ${
      playerCard2.suit
    }.<br><br>The computer scored ${computerScore()}, while you scored ${playerScore()}. Click to see who wins!`;

    gameMode = "compare results";
    return output;
  }
  // highest card

  if (gameMode == "compare results") {
    if (computerScore() > playerScore()) {
      output = `The computer won!`;
      gameMode = "dealing cards";
      return output;
    } else if (playerScore() > computerScore()) {
      output = `You win!`;
      gameMode = "dealing cards";
      return output;
    }
  }
  // return output;
};
