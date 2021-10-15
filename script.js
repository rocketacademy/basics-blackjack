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
 * Deal a card to a player or computer. 
 */
var dealCard = (player) => {
  var dealtCard = deck.pop();

  if (player == 0) {
    computerHand[0].total += getBlackjackCardValue(dealtCard.rank);
    computerHand[0].cards.push(dealtCard);  
  }
  else {
    playerHands[player-1].total += getBlackjackCardValue(dealtCard.rank);
    playerHands[player-1].cards.push(dealtCard);  
  }
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
  for (var count=0; count < numOfCards; count++) {
    for (var i=0; i < numOfPlayers; i++) {
      dealCard(i+1); 
    }
    dealCard(0);  
  }

}

var printPlayerCards = (name, player) => {
    var myOutputValue = name + " " + player + " has ";

    // Print out first card
    myOutputValue +=
    playerHands[player-1].cards[0].name + " of " + playerHands[player-1].cards[0].suit;

    // Print out more cards
    for (var j=1; j < playerHands[player-1].cards.length; j++) {
      myOutputValue +=
      " and " +
      playerHands[player-1].cards[j].name + " of " + playerHands[player-1].cards[j].suit;  
    }

    // Print out total
    myOutputValue +=
    " with total hands of  " + playerHands[player-1].total + "<br/>"; 
    
    return myOutputValue;
}
var printComputerCards = (name) => {
  var myOutputValue = name + " has ";

  // Print out computer's first card
  myOutputValue +=
    computerHand[0].cards[0].name + " of " + computerHand[0].cards[0].suit;

  // Print out computer's next cards
  for (var k=1; k < computerHand[0].cards.length; k++) {
    myOutputValue +=
    " and " +
    computerHand[0].cards[k].name + " of " + computerHand[0].cards[k].suit;
  }

  myOutputValue +=
  " with total hands of  " + computerHand[0].total +   
  "<br/>";
  
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

    dealCards(numOfPlayers, 2);
  }
  else if ((gameMode == "started") && (input == "h")) {
    //deal a card to player
    dealCard(playerFocus);
  }
  else if ((gameMode == "started") && (input == "s")) {
    //deal card to next player
    //if there is no next player, then let computer get more cards
    gameMode = "evaluateHands";
  }

  // Prepare output values
  var myOutputValue = ""; 

  // Print out what the players have
  for (var i=0; i < numOfPlayers; i++) {
    myOutputValue += printPlayerCards("PLAYER", playerHands[i].player);
  }

  // Print out what the computer has
  myOutputValue += printComputerCards("COMPUTER");

  // Determine if any of the players or computer has blackjack
  if ((computerHand[0].total == 21) && (playerHands[0].total == 21)) {
    myOutputValue += "<br/>It's a Blackjack push!";
    gameMode = "start";
  }
  else if (playerHands[0].total == 21) {
    myOutputValue += "<br/>You win! You have Blackjack!";
    gameMode = "start";
  }
  else if (computerHand[0].total == 21) {
    myOutputValue += "<br/>Sorry, you lost. The computer has Blackjack.";
    gameMode = "start";
  }
  else if (playerHands[0].total > 21) {
    myOutputValue += "<br/>Sorry, you busted.";
    gameMode = "start";
  }
  else if (gameMode == "evaluateHands") {
    // Add cards to computer
    if (computerHand[0].total < 17) {
      while (computerHand[0].total < 17) {
        dealCard(0);
      }

      // Print out what the players have
      for (var i=0; i < numOfPlayers; i++) {
        myOutputValue = printPlayerCards("PLAYER", playerHands[i].player);
      }

      // Print out what the computer has
      myOutputValue += printComputerCards("COMPUTER");
    }
  
    // Determine if any of the players or computer has blackjack
    if ((computerHand[0].total == 21) && (playerHands[0].total == 21)) {
      myOutputValue += "<br/>It's a Blackjack push!";
    }
    else if (playerHands[0].total == 21) {
      myOutputValue += "<br/>You win! You have Blackjack!";
    }
    else if (computerHand[0].total == 21) {
      myOutputValue += "<br/>Sorry, you lost. The computer has Blackjack.";
    }
    else if (computerHand[0].total > 21) {
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

    gameMode = "start";
  }
  else {
    myOutputValue += "<br/>Please input 'h' if you want to add a card or 's' if you're happy with your cards."
  }

  //myOutputValue = myOutputValue + "<br/><br/>game mode: " + gameMode;

  // Return output to screen.
  return myOutputValue;
};