/*
 Rules:
 1. Player plays against computer.
 2. The computer will always be the dealer.
 3. Each player gets dealt two cards to start.
 4. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
 5. The dealer has to hit if their hand is below 17.
 6. Each players' score is the total of their card ranks. 
    i) Jacks/Queen/Kings are 10.
    ii) Aces can be 1 or 11.
 7. The player who is closer to, but not above 21 wins the hand.
 */

// set values to deck - how is ace 1 or 11?
// draw deck

//Game State
var currentGameMode = "Key in username";

//Username
var userName = "";

// User must key in username before they start the game.
// User to key in the username.
var INPUTUSERNAME = function (input) {
  if (input !== "") {
    userName = input;
    currentGameMode = "play game"; // Move to the "play game" mode once the username is entered.
    return "Hello " + userName + "! Welcome to Blackjack!";
  }
  return "Hello! Please key in a username.";
};

// Create Card Deck
var CREATECARDDECK = function () {
  var deck = [];
  //Create outer loop for the suits
  var suitCounter = 0;
  var suits = ["Hearts ♥️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

  while (suitCounter < suits.length) {
    var currentSuit = suits[suitCounter];
    console.log("current suit: ", currentSuit);

    //Create a rank loop.

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // Set name to the following ranks: 1 (ace), 11 (jack), 12 (queen), 12 (king)
      if (cardName === 1) {
        cardName = "Ace";
      } else if (cardName === 11) {
        cardName = "Jack";
      } else if (cardName === 12) {
        cardName = "Queen";
      } else if (cardName === 13) {
        cardName = "King";
      }
      // Create card object. Name, Suit, Rank (value will be used for counting ("addition"))
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      console.log("rank: ", rankCounter);
      deck.push(card);
      rankCounter += 1;
    }
    suitCounter += 1;
  }
  return deck;
};

var deck = CREATECARDDECK();

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements.
var SHUFFLEDECK = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // This is the current card..
    var currentCard = cardDeck[currentIndex];
    // Switch positions of randomCard and currentCard in the deck (shuffling).
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  // Issue a new card deck.
  return cardDeck;
};

// Shuffle the deck and save it in a new variable shuffledDeck to communicate that we have shuffled the deck.
var shuffledDeck = SHUFFLEDECK(deck);

var main = function (input) {
  var outputMessage = "";
  if (currentGameMode === "Key in username") {
    return INPUTUSERNAME(input);
  } else if (currentGameMode === "play game") {
    console.log();
    // Implement your Blackjack game logic here. For now, we will return a simple message.
    return "You are now playing the game!";
  }
};

// create game
