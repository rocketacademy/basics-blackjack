// Project #3 - Blackjack

// Add logic for replaying game + if blackjack to go to replay state
// Add computer hit or stand logic
// Add ace variable logic
// Bonus Features: add ban-ban or 5 cards<21 logic? (Only if bets are included); multi players; betting features

// Game States & Modes
var gameState = "deal";

// Arrays
var playerCards = [];
var computerCards = [];

// Make deck function
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  // Loop over the suits array
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
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

//Create card deck and shuffle it
var createShuffledDeck = function () {
  cardDeck = makeDeck();
  var shuffledDeck = shuffleCards(cardDeck);
  return shuffledDeck;
};

// Get a random index
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
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
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// Deal first two cards to player and computer
var dealFirstHand = function () {
  // Draw and remove
  playerCards.push(shuffledDeck.pop());
  computerCards.push(shuffledDeck.pop());
  playerCards.push(shuffledDeck.pop());
  computerCards.push(shuffledDeck.pop());

  playerFirstTwoCards =
    "Player's hand:<br>" +
    playerCards[0].name +
    " of " +
    playerCards[0].suit +
    "<br>" +
    playerCards[1].name +
    " of " +
    playerCards[1].suit +
    "<br>";

  return playerFirstTwoCards + calculateHandValue(playerCards);
};

// Check for Blackjack
var checkBlackjack = function (inputArray) {
  var isBlackjack = false;
  var cardOne = inputArray[0];
  var cardTwo = inputArray[1];
  if (
    (cardOne.name == "Ace" && cardTwo.rank >= 10) ||
    (cardTwo.name == "Ace" && cardOne.rank >= 10) ||
    (cardOne.name == "Ace" && cardTwo.name == "Ace")
  ) {
    return (isBlackjack = true);
  }
  return isBlackjack;
};

// Loop through arrays to calculate value of current hands
var calculateHandValue = function (inputArray) {
  var handValue = 0;
  for (let counter = 0; counter < inputArray.length; counter += 1) {
    var currentCard = inputArray[counter];
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      handValue = handValue + 10;
    } else {
      handValue = handValue + currentCard.rank;
    }
  }
  return "<br>Hand value: " + handValue;
};

// Loop to update Player's hand throughout game
var showPlayerHand = function (playerCards) {
  var playerMessage = "Player's hand:<br>";
  for (let counter = 0; counter < playerCards.length; counter += 1) {
    playerMessage =
      playerMessage +
      playerCards[counter].name +
      " of " +
      playerCards[counter].suit +
      "<br>";
  }
  return playerMessage + calculateHandValue(playerCards);
};

// Loop for Computer's hand
var showComputerHand = function (computerCards) {
  var computerMessage = "Computer's hand:<br> ";
  for (let counter = 0; counter < computerCards.length; counter += 1) {
    computerMessage =
      computerMessage +
      computerCards[counter].name +
      " of " +
      computerCards[counter].suit +
      "<br>";
  }
  return computerMessage + calculateHandValue(computerCards);
};

// Restart Game
var restartGame = function () {
  gameState = "deal";
  playerCards = [];
  computerCards = [];
};

var main = function (input) {
  var myOutputvalue = "";

  // Game State deal - deal first hand to players and computer
  if (gameState == "deal") {
    shuffledDeck = createShuffledDeck();
    playerFirstTwoCards = dealFirstHand();

    // Blackjack Check
    var playerBlackjack = checkBlackjack(playerCards);
    var computerBlackjack = checkBlackjack(computerCards);

    // Two Blackjacks
    if (playerBlackjack == true && computerBlackjack == true) {
      outputMessage = "<br><br>It's a tie.";
      gameState = "results";
      // Player blackjack
    } else if (playerBlackjack == true && computerBlackjack == false) {
      outputMessage = "<br><br>Blackjack! Player wins.";
      gameState = "results";
      // Computer Blackjack
    } else if (playerBlackjack == false && computerBlackjack == true) {
      outputMessage = "<br><br>Blackjack! Computer wins.";
      gameState = "results";
    } else {
      outputMessage =
        "<br><br> Choose your next action by typing in 'hit' or 'stand'.";
      gameState = "choose";
    }
    return playerFirstTwoCards + outputMessage;
  }

  // Game State "Choose" - player to decide to hit or stand
  if (gameState == "choose") {
    outputMessage =
      "<br><br> Choose your next action by typing in 'hit' or 'stand'.";
    if (input == "hit") {
      playerCards.push(shuffledDeck.pop());
      return (
        "You drew a card!<br><br>" + showPlayerHand(playerCards) + outputMessage
      );
    } else if (input == "stand") {
      gameState = "results";
    } else {
      return showPlayerHand(playerCards) + outputMessage;
    }
  }

  // Game State "Results"
  if (gameState == "results") {
    var allScores =
      showPlayerHand(playerCards) +
      "<br><br>♣️♠️♦️♥️♣️♠️♦️♥️<br><br>" +
      showComputerHand(computerCards);
    var playerTotal = calculateHandValue(playerCards);
    var computerTotal = calculateHandValue(computerCards);

    // Tie Scenario - #1 Player and Computer tie but less than 21, #2 Both bust
    if (
      (playerTotal == computerTotal && playerTotal <= 21) ||
      (playerTotal > 21 && computerTotal > 21)
    ) {
      outputMessage = "It's a tie.<br><br>" + allScores;
    }
    // Player Win - #1 Player > Computer but less than 21, #2 Computer bust only
    else if (
      (playerTotal > computerTotal && playerTotal <= 21) ||
      (playerTotal <= 21 && computerTotal > 21)
    ) {
      outputMessage = "Player wins!<br><br>" + allScores;
    }
    // Computer Win
    else {
      outputMessage = "Computer wins!<br><br>" + allScores;
    }
    // Update game state to replay
    restartGame();
    return (
      outputMessage +
      "<br><br> Ready for another round? Press submit to deal a new hand."
    );
  }

  return myOutputvalue;
};
