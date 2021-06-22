// Function to make a deck of 52 cards
// rank 1-13; 1-4 suits: hearts, diamonds, clubs, spades; 2-10 and jack, queen, king and ace
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];

  // Create an array of 4 suits
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;

  // Create an outer loop through the 4 suits
  while (suitIndex < suits.length) {
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var card = {
        name: rankCounter,
        suit: suits[suitIndex],
        rank: rankCounter
      }
      if (rankCounter == 1) {
        card.name = 'ace';
      } else if (rankCounter == 11) {
        card.name = 'jack';
      } else if (rankCounter == 12) {
        card.name = 'queen';
      } else if (rankCounter == 13) {
        card.name = 'king';
      }
      cardDeck.push(card);
      rankCounter += 1;
    } 
    suitIndex += 1;
  }
return cardDeck;
}

// make deck
var deck = makeDeck();
// winner message after the game ends
var winnerMessage = '';
// game modes
var GAME_MODE_WELCOME = 'GAME_MODE_WELCOME';
var GAME_MODE_PLAYER_HIT = 'GAME_MODE_PLAYER_HIT';
var GAME_MODE_EVALUATE_WIN = 'GAME_MODE_EVALUATE_WIN';
// initialise game mode
var gameMode = GAME_MODE_WELCOME;

// Function to get a random index ranging from 0 (inclusive) to max (exclusive)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
}

// Function to shuffle the elements in the cardDeck array
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
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
}

// Function to determine winner
var determineWinner = function (computerCard, playerCard) {
  var message = "";
 // Create winning/losing conditions: Base on rank attribue
 if (computerCard.rank > playerCard.rank) {
  message = message + 'Computer wins.';
  } else if (computerCard.rank < playerCard.rank) {
    message = message + 'Player wins.';
  } else {
    message = message + 'It is a tie.';
  }
  return message;
}

var main = function (input) {
  // Default output value
  var myOutputValue = 'Welcome to BlackJack! There are 2 players in this round - you vs the computer. Press submit to draw a random card from the deck for both you and the computer.';
  console.log('Game mode:');
  console.log(gameMode);

  if (gameMode == 'welcome') {
    gameMode = 'play';
    console.log('Game mode:');
    console.log(gameMode);
    console.log('myOutputValue');
    console.log(myOutputValue);
    return myOutputValue;
  }

  if (gameMode == 'play') {
    // Shuffle the deck and store it in a new variable shuffledDeck
    var shuffledDeck = shuffleCards(deck);

    // Draw 2 cards from the top of the deck
    var computerCard = shuffledDeck.pop();
    var playerCard = shuffledDeck.pop();

    // Create message stating which cards were drawn for each player
    var myOutputValue = 
    'Computer had ' +
    computerCard.name +
    ' of ' +
    computerCard.suit +
    '. Player had ' +
    playerCard.name +
    ' of ' +
    playerCard.suit +
    '. ';

    // Determine winner
    winnerMessage = determineWinner(computerCard, playerCard);
  }

  return myOutputValue + winnerMessage;
};


