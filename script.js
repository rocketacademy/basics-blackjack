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

/**
 * Each player action triggers the main function.
 */
var main = function (input) {
  var playerCards = [];
  var computerCards = [];

  var playerTotalHand = 0;
  var computerTotalHand = 0;

  // Deal 1st card to player
  var dealtCard = deck.pop();
  playerTotalHand += getBlackjackCardValue(dealtCard.rank);
  playerCards.push(dealtCard);
  
  // Deal 1st card to computer
  dealtCard = deck.pop();
  computerTotalHand += getBlackjackCardValue(dealtCard.rank);
  computerCards.push(dealtCard);

  // Deal 2nd card to player
  dealtCard = deck.pop();
  playerTotalHand += getBlackjackCardValue(dealtCard.rank);
  playerCards.push(dealtCard);
  
  // Deal 2nd card to computer
  dealtCard = deck.pop();
  computerTotalHand += getBlackjackCardValue(dealtCard.rank);
  computerCards.push(dealtCard);

  // Prepare output values
  var myOutputValue =
    'PLAYER has ' +
    playerCards[0].name + ' of ' + playerCards[0].suit +
    ' and ' +
    playerCards[1].name + ' of ' + playerCards[1].suit +
    ' with total hands of  ' + playerTotalHand +   
    '<br/>COMPUTER has ' +
    computerCards[0].name + ' of ' + computerCards[0].suit +
    ' and ' +
    computerCards[1].name + ' of ' + computerCards[1].suit +
    ' with total hands of  ' + computerTotalHand +   
    '<br/>';
  
  // Determine if any of the players or computer has blackjack
  if ((computerTotalHand == 21) && (playerTotalHand == 21)) {
    myOutputValue += "<br/>It's a Blackjack push!";
  }
  else if (playerTotalHand == 21) {
    myOutputValue += "<br/>You win! You have Blackjack!";
  }
  else if (computerTotalHand == 21) {
    myOutputValue += "<br/>Sorry, you lost. The computer has Blackjack.";
  }
  else {
    // Determine who wins between the players and the computer
    if (playerTotalHand == computerTotalHand) {
      myOutputValue += "<br/>It's a push!";    
    }
    else if (playerTotalHand > computerTotalHand) {
      myOutputValue += "<br/>Congratulation! You win!";    
    }
    else {
      myOutputValue += "<br/>Sorry, you lost.";    
    }
  }

  // Return output to screen.
  return myOutputValue;
};