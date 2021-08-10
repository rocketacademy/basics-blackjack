var main = function (input) {
  var myOutputValue = 'hello world';
  return myOutputValue;
};
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
// Shuffle Function
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


// Make card deck
var deck = makeDeck ();
  console.log (deck);

// Shuffle the card
var shuffleDeck = shuffleCards (deck);
console.log(shuffleDeck);


// 2 players, computer and player
// Keep track Computer variables
var compCards = [];

// Keep track Player variables
var playerCards = [];

// Keep track of other variables
var gameMode = 'start game';
var twoCardsVal = [];
// Initialize an array for player
var players = ['player1', 'computer'];

// On submit deal the cards
var dealCard = function (){
var card = shuffleDeck.pop ()
  console.log(card);
  return card.name +" "+ card.suit
};

// Deal 2 cards to 2 players
var playerIndex = 0
var deal2Cards = function() {
  while (playerIndex < players.length) {
    // Store players in variable
    var playersName = players[playerIndex];
    
        var cardIndex = 0;
        while (cardIndex < 2){
          var cards = dealCard(deck)

          
          cardIndex += 1;

          // Create players card
          var dealtCards = {
            name: playersName,
            cardsVal: cards,
          }

        twoCardsVal.push(dealtCards);
        }

    playerIndex += 1;
    console.log(twoCardsVal);

  }

  return twoCardsVal;
};

// Cards analyzed for game winning ex: Blackjack
// Cards displayed to user
// User decide to hit or stand using the submit button


var main = function (input) {
  var myOutputValue = 'hello world';
  // Deal 2 cards for player and computer
  if (gameMode = 'start game') {
    var playerDeal = deal2Cards(input);
    playerCards = playerDeal;
    console.log(playerCards); 

    var compDeal = deal2Cards(input);
    compCards = compDeal;
    console.log ('compcard' + compCards);

  }
};
  
  
  
  
  


