// GLOBAL VARIABLES
// current player
// number of players
// number of deck(s)

// OBJECTS ARRAYS
// card deck
var deck = [];
// shuffled deck
// individual player statistics

// ARRAYS

// GAME MODES
// player bets
// player number turn
// computer turn
// compare scores

// HELPER FUNCTIONS
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["spades", "hearts", "clubs", "diamonds"];
  // suitValue helps compare suit superiority
  var suitValue = [4, 3, 2, 1];
  // card value is the score we compare against player vs computer. index [0] is Ace/1 where this is not read by the code generating the deck, index [1] for Ace is default cardvalue of 11.
  var cardValue = [1, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // Store the current suit value in a variable
    var currentSuitValue = suitValue[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // rankCounter determines name of card
      var cardName = rankCounter;
      // If rank is 1, 11, 12, 13 set cardName to the ace or face card's name
      // Store the current card value in a variable
      var currentCardValue = cardValue[rankCounter];
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      // Create a new card with the current name, suit, suitValue, rankCounter/name of card in number value and cardValue
      var card = {
        name: cardName,
        suit: currentSuit,
        suitValue: currentSuitValue,
        rank: rankCounter,
        cardValue: currentCardValue,
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
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// generate card deck
// shuffle deck
// input validation
// PLAYER INPUT - number of players
// PLAYER INPUT - bet
// draw 1 random card
// click submit to get player hand - draw random card function x 2. pop from shuffled deck.
// using PLAYER INPUT, if a) hit: draw random card; b) stand: original player hand = final player hand; then push to player hand array
// get computer hand; push to computer hand array
// game mode compare scores - function to decide winner. sort by a. black jack, b. rank / number value, c. suit
// things to consider: ace value 1, 10 or 11. ? if three cards drawn Ace automatically == 1

//example from MOAR CARDS
//display a single card
// var main = function (input) {
//   deck = makeDeck();
//   var shuffleDeck = shuffleCards(deck);
//   console.log(shuffleDeck);
//   var randomCard = shuffleDeck.pop();
//   var myOutputValue = `You have drawn ${randomCard.name} of ${randomCard.suit}`;
//   console.log(randomCard);
//   return myOutputValue;
// };

var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
