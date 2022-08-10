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
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      // add in card value property for easier counting
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

//shuffle deck helper function
var shuffleDeck = function (newDeck) {
  const shuffledDeck = [];
  //new deck needs to be a object array containing all 52 cards
  if (newDeck.length == 52 && Array.isArray(newDeck)) {
    for (var i = 0; i < 52; i++) {
      randomIndex = Math.floor(Math.random() * (52 - i));
      shuffledDeck.push(newDeck[randomIndex]);
      newDeck.splice(randomIndex, 1);
    }
  } else {
    return "Deck error, deck cannot be shuffled. Please check deck.";
  }
  return shuffledDeck;
};

//initialise deck as global variable
var deck = makeDeck();
console.log(deck);
var gameState = "Game Starting";
var dealerHand = [];
var playerHand = [];
var main = function (input) {
  //shuffle deck > is there a need to create a function to shuffle or draw random index is good enough? just pop after draw
  deck = shuffleDeck(deck);
  console.log(deck);
  //deal cards to player and dealer starting with player
  //check for black jack -> blackjack as object?
  //return player cards and ask to hit or stand - hit/stand state or helper function?
  //code ace condition? - helper?
  //check win/lose condition -helper?
  //dealer draw conditions < 17 hit
  var myOutputValue = "hello world";
  return myOutputValue;
};
