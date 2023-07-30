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

//Game State
var currentGameMode = "Key in username";
var GAME_STARTS = "Game starts";
var GAME_CARDS_DRAWN = "Game cards drawn";
var GAME_RESUTLS = "Results of both players";

//Username
var userName = "";

// Store player and computer hands
var playerHand = [];
var computerHand = [];

//Empty card deck at the start of the game
var gameDeck = "";

// User must key in username before they start the game.
// User to key in the username.
var INPUT_USERNAME = function (input) {
  if (input !== "") {
    userName = input;
    currentGameMode = GAME_STARTS; // Move to the "play game" mode once the username is entered.
    return "Hello " + userName + "! Welcome to Blackjack!";
  }
  return "Hello! Please key in a username.";
};

// Create Card Deck
var CREATE_CARD_DECK = function () {
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

var deck = CREATE_CARD_DECK();

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements.
var SHUFFLE_DECK = function (cardDeck) {
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
var shuffledDeck = SHUFFLE_DECK(deck);

//Deal two cards to each player at the beginning of the game.
var DEAL_TWO_CARDS = function (hand) {
  hand.push(shuffledDeck.pop());
  hand.push(shuffledDeck.pop());
};

// Check player/computer hand for Blackjack
var checkForBlackJack = function (handArray) {
  //check hand, if there is blackjack, return true, else return false.
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  // if there is a blackjack, returns true
  // case 1: 1st card ace, 2nd card 10 or pictures
  // case 2: 1st card 10 or pictures, 2nd card ace.

  if (
    (playerCardOne.name === "Ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name === "Ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

var main = function (input) {
  var outputMessage = "";
  if (currentGameMode === "Key in username") {
    return INPUT_USERNAME(input);
  } else if (currentGameMode === GAME_STARTS) {
    console.log("game mode: ", GAME_STARTS);

    // create game deck
    gameDeck = shuffledDeck;
    console.log("Game Deck: ", gameDeck);

    // issue cards - 2 cards to player and dealer repsectively
    DEAL_TWO_CARDS(playerHand);
    DEAL_TWO_CARDS(computerHand);

    console.log("player hand: ", playerHand);
    console.log("computer hand: ", computerHand);

    // progress
    currentGameMode = GAME_CARDS_DRAWN;
    outputMessage = "Everyone has been dealt 2 cards. Sumit to evaluate cards.";
    // write and return the output message
    return outputMessage;
  }
  if ((currentGameMode = GAME_CARDS_DRAWN)) {
    // //testcheck for checkForBlackjack function
    // playerHand = [
    //   { name: "Queen", suit: "Hearts ♥️", rank: 12 },
    //   { name: "Ace", suit: "Hearts ♥️", rank: 1 },
    // ];
    // computerHand = [
    //   { name: "King", suit: "Hearts ♥️", rank: 13 },
    //   { name: "Ace", suit: "Clubs ♣️", rank: 1 },
    // ];

    console.log("Current game mode: ", GAME_CARDS_DRAWN);

    // check for blackjack - 1 ace + 1 10 or picture
    var playerHasBlackjack = checkForBlackJack(playerHand);
    var computerHasBlackjack = checkForBlackJack(computerHand);

    console.log("Does player has blackjack: ", playerHasBlackjack);
    console.log("Does dealer has blackjack: ", computerHasBlackjack);

    // // testcheck for if there's a blackjack
    // playerHasBlackjack = true;
    // computerHasBlackjack = true;

    var determineBlackjackOutcome = function (
      playerHasBlackjack,
      computerHasBlackjack
    ) {
      if (playerHasBlackjack && computerHasBlackjack) {
        // Both player and dealer have blackjack -- it's a tie
        return "It's a tie!";
      } else if (playerHasBlackjack) {
        // Only player has blackjack -- player wins
        return "You win!";
      } else computerHasBlackjack;
      // Only dealer has blackjack -- dealer wins
      return "Dealer wins!";
    };
  }

  // there is no blackjack (when all players have 2 cards only)
  else {
    outputMessage = "There is no blackjack.";
    console.log(outputMessage);
  }

  //----
  // change game mode
  //appropriate output message
};
