// ################ MAKE DECK ################
function makeDeck() {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["spades", "hearts", "clubs", "diamonds"];

  // Loop over the suits array
  for (suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    for (rankCounter = 1; rankCounter <= 13; rankCounter++) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
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
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
}

// ================ randomiser ================
function randomiser(max) {
  return Math.floor(Math.random() * max);
}

// ================ created deck ===============
var deck = makeDeck();

// ################ SHUFFLE DECK ################
// Shuffle the elements in the cardDeck array
function shuffleCards(cardDeck) {
  // Loop over the card deck array once
  for (index in cardDeck) {
    //(i = 0; i < cardDeck.length; i++) {
    // Select a random index in the deck
    var randomIndex = randomiser(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[index];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[index] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
}

// ################ MAIN FUNCTION ################
var main = function (input) {
  var deck = makeDeck();
  var shuffledDeck = shuffleCards(deck);
  var myOutputValue = "";
  for (card in shuffledDeck) {
    myOutputValue +=
      shuffledDeck[card].name + " of " + shuffledDeck[card].suit + "<br>";
  }
  return myOutputValue;
};
