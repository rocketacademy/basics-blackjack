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
 * Get card value in the game of Blackjack.
 * - Ace = 11
 * - Jack, Queen, King = 10
 */
var getBlackjackCardValue = (cardRank) => {
  if (cardRank == 1) return 11;
  else if (cardRank > 10) return 10;
  
  return cardRank;
}

var playerHands = [];
var computerHand = [];

/**
 * Deal a card to a hand (player or computer).
 * @param {object} hand Card hand. 
 */
var dealCard = (hand) => {
  var dealtCard = deck.pop();

  hand.total += getBlackjackCardValue(dealtCard.rank);
  hand.cards.push(dealtCard);  
}

/**
 * Deal cards to players and computer.
 */
var dealCards = (numOfPlayers, numOfCards) => {
  
  // Prepare hands for players and computer
  for (var i=0; i <= numOfPlayers; i++) {
    var hand = {
      player: i,
      cards: [],
      total: 0,
    };
    
    if (i == 0) computerHand.push(hand);
    else playerHands.push(hand);
  }

  // Deal cards to players and computer
  for (let count=0; count < numOfCards; count++) {
    for (let i=0; i < numOfPlayers; i++) {
      dealCard(playerHands[i]); 
    }
    dealCard(computerHand[0]);  
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

var gameMode = "start";
var playerFocus = 1;

const BLACKJACK = 21;
const DEALER_HIT_LIMIT = 17;
const NUMBER_OF_CARDS_TO_START = 2;

/**
 * Each player action triggers the main function.
 */
var main = function (input) {
  var numOfPlayers = 1;

  if ((gameMode == "start") && (input == "")) {
    gameMode = "started";

    // Reset hands
    playerHands = [];
    computerHand = [];

    dealCards(numOfPlayers, NUMBER_OF_CARDS_TO_START);
  }
  else if ((gameMode == "started") && (input == "h")) {
    //deal a card to player
    dealCard(playerHands[playerFocus-1]);
  }
  else if ((gameMode == "started") && (input == "s")) {
    //deal card to next player
    //if there is no next player, then let computer get more cards
    gameMode = "evaluateHands";
  }

  // Prepare output values
  var myOutputValue = ""; 

  // Print out what the players have
  for (let i=0; i < numOfPlayers; i++) {
    myOutputValue += printCards("PLAYER", playerHands[i]);
  }

  // Print out what the computer has
  myOutputValue += printCards("DEALER", computerHand[0], true);

  // TODO: put this in helper function
  // Determine if any of the players or computer has blackjack
  if ((computerHand[0].total == BLACKJACK) && (playerHands[0].total == BLACKJACK)) {
    myOutputValue += "<br/>It's a Blackjack push!";
    myOutputValue += "<br/><br/>Click on the Submit button to play again.";    
    gameMode = "start";
  }
  else if (playerHands[0].total == BLACKJACK) {
    myOutputValue += "<br/>You win! You have Blackjack!";
    myOutputValue += "<br/><br/>Click on the Submit button to play again.";    
    gameMode = "start";
  }
  else if (computerHand[0].total == BLACKJACK) {
    myOutputValue += "<br/>Sorry, you lost. The computer has Blackjack.";
    myOutputValue += "<br/><br/>Click on the Submit button to play again.";    
    gameMode = "start";
  }
  else if (playerHands[0].total > BLACKJACK) {
    myOutputValue += "<br/>Sorry, you busted.";
    myOutputValue += "<br/><br/>Click on the Submit button to play again.";    
    gameMode = "start";
  }
  else if (gameMode == "evaluateHands") {
    // Add cards to computer
    if (computerHand[0].total < DEALER_HIT_LIMIT) {
      while (computerHand[0].total < DEALER_HIT_LIMIT) {
        dealCard(computerHand[0]);
      }
    }
  
    // Print out what the players have
    for (let i=0; i < numOfPlayers; i++) {
      myOutputValue = printCards("PLAYER", playerHands[i]);
    }

    // Print out what the computer has
    myOutputValue += printCards("DEALER", computerHand[0]);
    
    // Determine if any of the players or computer has blackjack
    if ((computerHand[0].total == BLACKJACK) && (playerHands[0].total == BLACKJACK)) {
      myOutputValue += "<br/>It's a Blackjack push!";
    }
    else if (playerHands[0].total == BLACKJACK) {
      myOutputValue += "<br/>You win! You have Blackjack!";
    }
    else if (computerHand[0].total == BLACKJACK) {
      myOutputValue += "<br/>Sorry, you lost. The computer has Blackjack.";
    }
    else if (computerHand[0].total > BLACKJACK) {
      myOutputValue += "<br/>You win! The computer has busted.";
    }
    else {
      // Determine who wins between the players and the computer
      if (playerHands[0].total == computerHand[0].total) {
        myOutputValue += "<br/>It's a push!";    
      }
      else if (playerHands[0].total > computerHand[0].total) {
        myOutputValue += "<br/>Congratulation! You win!";    
      }
      else {
        myOutputValue += "<br/>Sorry, you lost.";    
      }
    }

    // TODO
    // Print hands
    // Print result
    // Print message

    myOutputValue += "<br/><br/>Click on the Submit button to play again.";    
    gameMode = "start";
  }
  else {
    myOutputValue += "<br/>Please input 'h' if you want to add a card or 's' if you're happy with your cards."
  }

  //myOutputValue = myOutputValue + "<br/><br/>game mode: " + gameMode;

  // Return output to screen.
  return myOutputValue;
};