//Create a deck of card
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Diamonds ♦️", "Hearts ♥️", "Clubs ♣️", "Spades ♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    // Loop from 1 to 13 to create all cards for each suit
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, rank and value
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

var main = function (input) {
  if (input == "start") {
    // Turn on Hit and Stand button
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    // Turn off Start button
    document.getElementById("start-button").disabled = true;

    makeDeck();
    console.log(makeDeck());
    return "Start";
  } else if (input == "hit") {
    return "Hit";
  } else if (input == "stand") {
    // Turn off Hit button and Stand button
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    // Turn on Start button
    document.getElementById("start-button").disabled = false;

    return "Stand";
  }
};
