// Global variables
var gameMode = "shuffle";
var shuffledDeck = [];
var playerCard = [];
var computerCard = [];

// Function to generate deck of cards
var deckGeneration = function () {
  var cardDeck = [];
  var suits = ["diamonds", "clubs", "hearts", "spades"];

  for (var i = 0; i < suits.length; i += 1) {
    var cardSuit = suits[i];
    var index = 1;
    while (index < 14) {
      console.log(index);
      var cardName = index;
      if (index == 1) {
        cardName = "Ace";
      } else if (index == 11) {
        cardName = "Jack";
      } else if (index == 12) {
        cardName = "Queen";
      } else if (index == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: cardSuit,
        rank: index,
      };
      cardDeck.push(card);
      index += 1;
    }
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
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

// Function to deal the initial 2 cards to players. Input is the shuffledDeck array, as well as the player or computer card array.
var dealCards = function (shuffledDeck, inputHand) {
  var index = 0;
  while (inputHand.length != 2) {
    inputHand.push(shuffledDeck[index]);
    shuffledDeck.splice(index, 1);
    index += 1;
  }
  index = 0;
  return inputHand;
};

// Function to total points of the player's hand
var calculateHand = function (playerHand) {
  var index = 0;
  var totalScore = 0;
  while (index < playerHand.length) {
    totalScore += playerHand[index].rank;
    index += 1;
    console.log("Computing total score" + totalScore);
  }
  index = 0;
  return totalScore;
};

// Function to print the hands of each player. Input is the array of object for each player.
var printHand = function (playerHand) {
  var index = 0;
  var outputValue = "";
  while (index < playerHand.length) {
    outputValue += `${playerHand[index].name} of ${playerHand[index].suit}<br>`;
    index += 1;
  }
  return outputValue;
};

// Compare initial hands
var compareInitialHands = function (playerCard, computerCard) {
  var playerCurrentTotal = calculateHand(playerCard);
  var computerCurrentTotal = calculateHand(computerCard);
  console.log("player current: " + playerCurrentTotal);
  console.log(typeof playerCurrentTotal);
  console.log("computer current: " + computerCurrentTotal);

  if (playerCurrentTotal == 21 && computerCurrentTotal != 21) {
    return `Player Blackjack! Player wins!`;
  } else if (computerCurrentTotal == 21) {
    return `Computer Blackjack! Computer wins!`;
  } else if (playerCurrentTotal > computerCurrentTotal) {
    return `Player wins! Hand Total is ${playerCurrentTotal} points. <br><br> Player cards: <br> ${printHand(
      playerCard
    )} <br> Computer cards: <br> ${printHand(computerCard)}`;
  } else {
    return `Computer wins! Hand Total is ${computerCurrentTotal} points. <br><br> Player cards: <br> ${printHand(
      playerCard
    )} <br> Computer cards: <br> ${printHand(computerCard)}`;
  }
};

var main = function (input) {
  if (gameMode == "shuffle") {
    shuffledDeck = shuffleCards(deckGeneration());
    gameMode = "deal";
    return `The deck has been shuffled. <br> Click "Submit" to deal cards.`;
  } else if (gameMode == "deal") {
    playerCard = dealCards(shuffledDeck, playerCard);
    computerCard = dealCards(shuffledDeck, computerCard);
    gameMode = "play";
    return `Click "submit" to compare your current hands.`;
  } else if (gameMode == "play") {
    gameMode = "shuffle";
    return compareInitialHands(playerCard, computerCard);
  }
};
