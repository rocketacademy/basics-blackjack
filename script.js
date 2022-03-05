/*

Pseudo coding framework:
1. What is the objective?
2. Break down problem into sub-problems (optional for now)
---- First version -----
a. Create deck [Create make deck function]
b. Shuffle deck [create shuffle deck function]
c. Deal 2 cards for player and compueter
d. compare which card is higher and display winner message

3. What information do I have?
4. What information do I need?
5. How can I get there?

*/

// Helper functions below

/**
 * Create a standard 52-card deck
 */
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
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
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
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

// ----- global variable definition ------
// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

// Define empty player hand and computer hand
var playerHand = [];
var computerHand = [];

// define game modes

// ------ main function below --------
var main = function (input) {
  // Define game deck
  var gameDeck = deck;
  console.log(gameDeck);

  // deal out 2 cards from the gamedeck into the player's hand, and push into player's hand array
  playerHand.push(gameDeck.pop());
  playerHand.push(gameDeck.pop());

  console.log(playerHand);
  // deal out 2 cards from the gamedeck into the computer's hand, and push into computer's hand array
  computerHand.push(gameDeck.pop());
  computerHand.push(gameDeck.pop());

  console.log(computerHand);

  return myOutputValue;
};
