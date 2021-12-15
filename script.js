// Implement a game of blackjack.
// 1) A deck of 52 cards are shuffled and dealt to players and the dealer. Hand Size = 2 cards
// 2) Cards dealt are assigned their face value. JQK are = 10 A = 10/11 depending on player's prerogative
// 3) Once hands are dealt, the player may choose to hit or stand. Dealer has to hit if hand is below 17
// The hand closes to 21 wins. Any hand larger than 21 goes bust.

// Make Deck Card generation code from 10.2 -
//var cardValue implemented (JQK = 10)
// cardDeck an empty deck array as global Var so shuffle cards can refer
var cardDeck = [];
var playerHand = [];
var dealerHand = [];
var playerValue = 0;
var dealerValue = 0;
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
      var cardValue = rankCounter;
      if (cardName == "jack") {
        cardValue = 10;
      } else if (cardName == "queen") {
        cardValue = 10;
      } else if (cardName == "king") {
        cardValue = 10;
      }
      // Create a new card with the current name, suit, rank and value
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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
var shuffleCards = function () {
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
//  At this point we have a shuffled deck with an assigned face value. Except A is still 1. Work on this later. Now we will let each player draw a card until each player has two cards.
//Two arrays represent the starting hands of player and dealer

// Deal cards into hands(arrays)
function dealCards() {
  makeDeck();
  shuffleCards();
  playerHand = [];
  dealerHand = [];
  deal = cardDeck.pop();
  deal2 = cardDeck.pop();
  deal3 = cardDeck.pop();
  deal4 = cardDeck.pop();
  playerHand[0] = deal;
  playerHand[1] = deal2;
  dealerHand[0] = deal3;
  dealerHand[1] = deal4;
}
// Arrays are populated with 2 cards in each hand. Now a function when player needs more cards
// Removes a card from card Deck and pushes into playerHand Array
function hitMe() {
  hit = cardDeck.pop();
  playerHand.push(hit);
}

//Function to sum all value in hand
//Loop over each element in array, take the value property and sums into a variable named playerValue
function sumPlayerHand() {
  playerValue = 0;
  playerHand.forEach((element) => (playerValue += element.value));
}
//Dealer needs to draw card from the deck as well, dealer draws until a number more than 17. Stands on 17 aceFinder function determines aces in hand and modifies the value in hand
function dealerPlay() {
  dealerValue = 0;
  aceFinder(dealerHand, "dealer", dealerValue);
  dealerHand.forEach((element) => (dealerValue += element.value));

  while (dealerValue < 17) {
    aceFinder(dealerHand, "dealer", dealerValue);
    deal5 = cardDeck.pop();
    dealerHand.push(deal5);
    dealerValue = 0;
    dealerHand.forEach((element) => (dealerValue += element.value));
  }
}

function sumDealerHand() {
  dealerValue = 0;
  dealerHand.forEach((element) => (dealerValue += element.value));
}

// Results of match

function play() {
  results = 0;
  if (playerValue > 21 && dealerValue <= 21) {
    results = `Player goes bust! Player gets ${playerValue} and dealer gets ${dealerValue} Dealer Wins!`;
  } else if (dealerValue > 21 && playerValue <= 21) {
    results = `Dealer goes bust! Player gets ${playerValue} and dealer gets ${dealerValue} Player Wins!`;
  } else if (dealerValue > 21 && playerValue > 21) {
    results = `Both goes bust! It's a draw! Dealer gets ${dealerValue} and player gets ${playerValue}`;
  } else if (dealerValue > playerValue) {
    results = `Dealer has ${dealerValue} while player has ${playerValue} dealer wins!`;
  } else if (playerValue > dealerValue) {
    results = `Dealer has ${dealerValue} while player has ${playerValue} Player wins!`;
  } else if ((playerValue = dealerValue)) {
    results = `Dealer has ${dealerValue} while player has ${playerValue},it's a draw!`;
  }
  gameState = "initialiseGame";
}

// Previous aceFinder did not account for multiple aces
// .filter to create an aceSort array. Use length of array to determine logic for Ace.
function aceFinder(arr, player, handValue) {
  const aceSort = arr.filter((element) => element.value == 1);
  if (aceSort.length == 1 && handValue == 11) {
    handValue = 21;
  } else if (aceSort.length == 2 && handValue == 2) {
    handValue = 21;
  } else if (aceSort.length > 0 && handValue < 21) {
    handValue += 10;
  }
  if (player == "player") {
    playerValue = handValue;
  } else {
    dealerValue = handValue;
  }
}

var gameState = "initialiseGame";

// Strings card for output
function showHand() {
  let output = "";
  playerHand.forEach((element) => {
    output += `${element.name} `;
  });
  return output;
}
function submitButtonOn() {
  var submitButton = document.getElementById("submit-button");
  submitButton.disabled = false;
}

function submitButtonOff() {
  var submitButton = document.getElementById("submit-button");
  submitButton.disabled = true;
}
var hitButton = document.getElementById("hit-button");
hitButton.disabled = true;

var playButton = document.getElementById("play-button");
playButton.disabled = true;

function hitButtonOn() {
  var hitButton = document.getElementById("hit-button");
  hitButton.disabled = false;
}

function hitButtonOff() {
  var hitButton = document.getElementById("hit-button");
  hitButton.disabled = true;
}

function playButtonOn() {
  var playButton = document.getElementById("play-button");
  playButton.disabled = false;
}

function playButtonOff() {
  var playButton = document.getElementById("play-button");
  playButton.disabled = true;
}

// Main function that plays when submit is clicked.
var main = function (input) {
  myOutputValue = `Cards have been dealt! Your cards are: ${showHand()} `;
  if (input == "" && gameState == "initialiseGame") {
    playerHand = [];
    dealerHand = [];
    cardDeck = [];
    dealCards();
    sumPlayerHand();
    sumDealerHand();
    aceFinder(playerHand, "player", playerValue);
    aceFinder(dealerHand, "dealer", dealerValue);
    gameState = "cardsDealt";
    if (playerValue == 21 && dealerValue == 21) {
      gameState = "initialiseGame";
      myOutputValue = `Both get blackjack! Draw!`;
    } else if (playerValue == 21) {
      gameState = "initialiseGame";
      myOutputValue = `Player gets ${playerValue}! BlackJack! Player wins.`;
    } else if (dealerValue == 21) {
      gameState = "initialiseGame";
      myOutputValue = `Dealer gets ${dealerValue}! BlackJack! Dealer wins.`;
    } else {
      myOutputValue = `Cards have been dealt! your hand is ${playerValue} type Hit! to draw a card or Play! to see the results.`;
    }

    return myOutputValue;
  } else if (input == "Hit!" && gameState == "cardsDealt") {
    hitMe();
    sumPlayerHand();
    myOutputValue = `Your hand is ${playerValue}. Type Hit! to draw a card or Play! to see results`;
  } else if (input == "Play!" && gameState == "cardsDealt") {
    dealerPlay();
    play();
    myOutputValue = result;
  }
  return myOutputValue;
};
