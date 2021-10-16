/**
 * Create a standard 52-card deck.
 * Taken from https://basics.rocketacademy.co/10-javascript-objects/10.3-card-game-example-war
 */
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
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

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 * Taken from https://basics.rocketacademy.co/10-javascript-objects/10.3-card-game-example-war
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 * Taken from https://basics.rocketacademy.co/10-javascript-objects/10.3-card-game-example-war
 */
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

/**
 * Get card value in the game of Blackjack
 * - Aces = 11
 * - Jack, Queen, King = 10
 * @param {number} cardRank Face value of the card. 
 */
var getBlackjackCardValue = (cardRank) => {
  if (cardRank == 1) return 11;
  else if (cardRank > 10) return 10;
  
  return cardRank;
}

// Initialize players and dealer hands
var playerHands = [];
var dealerHand = [];

/**
 * Deal a card to a hand (player or dealer).
 * @param {object} hand Card hand. 
 */
var dealCard = (hand) => {
  let dealtCard = deck.pop();

  hand.total += getBlackjackCardValue(dealtCard.rank);
  hand.cards.push(dealtCard);
  
  // Count how many aces are in hand, default value set to 11
  if (dealtCard.rank == 1) hand.acesAsEleven++;
}

/**
 * Deal an Ace of Spades card to a hand (player or dealer).
 * Used for testing aces as 1 or 11. Or to cheat :)
 * @param {object} hand Card hand. 
 */
var dealAceOfSpades = (hand) => {
  let dealtCard = {
    name: "ace",
    suit: "spades",
    rank: 1,
  };

  hand.total += getBlackjackCardValue(dealtCard.rank);
  hand.cards.push(dealtCard);
  
  // Count how many aces are in hand, default value set to 11
  if (dealtCard.rank == 1) hand.acesAsEleven++;
}

/**
 * Deal cards to players and dealer.
 * @param {number} numOfPlayers Number of players in this round. 
 * @param {number} numOfCards Number of cards to deal per hand.
 */
var dealCards = (numOfPlayers, numOfCards) => {
  // Prepare hands for players and dealer
  for (let i=0; i <= numOfPlayers; i++) {
    let hand = {
      player: i,
      cards: [],
      total: 0,
      acesAsEleven: 0,
    };
    
    if (i == 0) dealerHand.push(hand);
    else playerHands.push(hand);
  }

  // Deal cards to players and dealer
  for (let count=0; count < numOfCards; count++) {
    for (let i=0; i < numOfPlayers; i++) {
      dealCard(playerHands[i]); 
    }
    dealCard(dealerHand[0]);  
  }
}

/**
 * Print cards in a hand.
 * @param {string} name Name of the hand holder.
 * @param {object} hand Hand object that hold the cards. 
 */
var printCards = (name, hand, onlyFirstCard = false) => {
    let myOutputValue;
    
    if (name == "DEALER") myOutputValue = name + " has ";
    else myOutputValue = name + " " + hand.player + " has ";

    // Print out first card
    myOutputValue +=
    hand.cards[0].name + " of " + hand.cards[0].suit;

    if (!onlyFirstCard) {
      // Print out more cards
      for (let j=1; j < hand.cards.length; j++) {
        myOutputValue +=
        " and " +
        hand.cards[j].name + " of " + hand.cards[j].suit;  
      }

      // Print out total
      myOutputValue +=
      " with total hands of  " + hand.total; 
    }
    
    myOutputValue += "<br/>";

    return myOutputValue;
}

/*
Game Rules
1. Deck is shuffled.
2. User clicks Submit to deal cards.
3. The cards are analysed for game winning conditions, e.g. Blackjack.
4. The cards are displayed to the user.
5. The user decides whether to hit or stand, using the submit button to submit their choice.
6. The user's cards are analysed for winning or losing conditions.
7. The computer decides to hit or stand automatically based on game rules.
8. The game either ends or continues.
*/

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

var numOfPlayers = 1;
var gameMode = "READY";
var playerInFocus = 1;

const BLACKJACK = 21;
const DEALER_HIT_LIMIT = 17;
const NUMBER_OF_CARDS_TO_START = 2;

/**
 * Each player action triggers the main function.
 */
var main = function (input) {

  // Deal cards
  if ((gameMode == "READY") && (input == "")) {
    gameMode = "GAME_STARTED";
    playerHands = []; dealerHand = []; // Reset hands

    dealCards(numOfPlayers, NUMBER_OF_CARDS_TO_START);
  }
  else if ((gameMode == "GAME_IN_PROGRESS") && (input == "h")) {
    //deal a card to player because the player chooses to 'hit'
    dealCard(playerHands[playerInFocus-1]);
  }
  else if ((gameMode == "GAME_IN_PROGRESS") && (input == "s")) {
    //player chooses to 'stay' so go the next step
    gameMode = "EVALUATE_HANDS";
  }
  else if ((gameMode == "GAME_IN_PROGRESS") && (input == "ha")) {
    //deal an Ace of Spades to player because the player wants to win
    dealAceOfSpades(playerHands[playerInFocus-1]);
  }

  // Prepare output values
  let playerInfoMessage = "", dealerInfoMessage = "", resultMessage = "", directionMessage = ""; 

  // Print out what the player and dealer have
  playerInfoMessage = printCards("PLAYER", playerHands[playerInFocus-1]);
  dealerInfoMessage = printCards("DEALER", dealerHand[0], true);

  if (gameMode == "GAME_STARTED") {
    let isGameDone = false;

    // Determine if the player was dealt a blackjack
    if ((dealerHand[0].total == BLACKJACK) && (playerHands[playerInFocus-1].total == BLACKJACK)) {
      resultMessage += "<br/>It's a Blackjack push!";
      isGameDone = true;
    }
    else if (playerHands[playerInFocus-1].total == BLACKJACK) {
      resultMessage += "<br/>You win 150%! You have Blackjack!";
      isGameDone = true;
    }      
    else if (playerHands[playerInFocus-1].total > BLACKJACK) {
      //if hand has Aces, replaced value with 1 to avoid bust
      //this is to handle case where you're dealt with 2 Aces when the game starts
      if (playerHands[playerInFocus-1].acesAsEleven > 0) {
        playerHands[playerInFocus-1].total -= 10;
        playerHands[playerInFocus-1].acesAsEleven--;
        playerInfoMessage = printCards("PLAYER", playerHands[playerInFocus-1]);
      }
    }

    if (isGameDone) {
      directionMessage += "<br/><br/>Click on the Submit button to play again.";    
      gameMode = "READY";
    }
    else {
      directionMessage += "<br/>Please input 'h' if you want to hit (add a card) or 's' if you want to stand (stay with your cards)."
      gameMode = "GAME_IN_PROGRESS";
    }
  }
  else if (gameMode == "GAME_IN_PROGRESS") {
    let isGameDone = false;

    if (playerHands[playerInFocus-1].total > BLACKJACK) {
      //if hand has Aces, replaced value with 1 to avoid bust
      if (playerHands[playerInFocus-1].acesAsEleven > 0) {
        playerHands[playerInFocus-1].total -= 10;
        playerHands[playerInFocus-1].acesAsEleven--;
        playerInfoMessage = printCards("PLAYER", playerHands[playerInFocus-1]);
      }
      else {
        resultMessage += "<br/>Sorry, you bust.";
        isGameDone = true;  
      }
    }

    if (isGameDone) {
      directionMessage += "<br/><br/>Click on the Submit button to play again.";    
      gameMode = "READY";
    }
    else {
      directionMessage += "<br/>Please input 'h' if you want to hit (add a card) or 's' if you want to stand (stay with your cards)."
    }
  }
  // Player is done with their cards, time for the dealer to move
  else if (gameMode == "EVALUATE_HANDS") {
    // Add cards to dealer
    while (dealerHand[0].total < DEALER_HIT_LIMIT) {
      dealCard(dealerHand[0]);

      //if hand has Aces, replaced value with 1 to avoid bust
      if ((dealerHand[0].total > BLACKJACK) && (dealerHand[0].acesAsEleven > 0)) {
        dealerHand[0].total -= 10;
        dealerHand[0].acesAsEleven--;
      }              
    }
    
    // Print out what the player and dealer have
    playerInfoMessage = printCards("PLAYER", playerHands[playerInFocus-1]);
    dealerInfoMessage = printCards("DEALER", dealerHand[0]);
    
    // Determine if any of the players or dealer has 21
    if ((dealerHand[0].total == BLACKJACK) && (playerHands[playerInFocus-1].total == BLACKJACK)) {
      if ((dealerHand[0].cards.length == 2) && (playerHands[playerInFocus-1].cards.length == 2)) {
        resultMessage += "<br/>It's a Blackjack push!";
      } 
      else {
        resultMessage += "<br/>It's a push!";
      }
    }
    else if (playerHands[playerInFocus-1].total == BLACKJACK) {
      resultMessage += "<br/>You win!";
    }
    else if (dealerHand[0].total == BLACKJACK) {
      if (dealerHand[0].cards.length == 2) {
        resultMessage += "<br/>Sorry, you lost. The dealer has Blackjack.";
      }
      else {
        resultMessage += "<br/>Sorry, you lost.";
      }
    }
    else if (dealerHand[0].total > BLACKJACK) {
      resultMessage += "<br/>You win! The dealer busts.";
    }
    else {
      // Determine who wins between the players and the dealer
      if (playerHands[playerInFocus-1].total == dealerHand[0].total) {
        resultMessage += "<br/>It's a push!";    
      }
      else if (playerHands[playerInFocus-1].total > dealerHand[0].total) {
        resultMessage += "<br/>Congratulation! You win!";    
      }
      else {
        resultMessage += "<br/>Sorry, you lost.";    
      }
    }

    directionMessage += "<br/><br/>Click on the Submit button to play again.";
    gameMode = "READY";
  }

  let myOutputValue = playerInfoMessage + dealerInfoMessage + resultMessage + directionMessage;
  //myOutputValue = myOutputValue + "<br/><br/>game mode: " + gameMode;

  // Return output to screen.
  return myOutputValue;
};