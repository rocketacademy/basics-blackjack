//Shuffle the cards
//1st mode: COMPARE INITIAL HANDS TO DETERMINE WINNER
//ADD VARIABLE ACE VALUES
//next mode: ADD PLAYER HIT OR STAND
//next mode: ADD DEALER HIT OR STAND

// Initialise an empty deck array
let cardDeck = [];

let makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  let suits = ["hearts", "diamonds", "clubs", "spades"];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    let currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice cardName starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let cardName = 1; cardName <= 13; cardName += 1) {
      // Create a new card with the current name, suit, and rank
      let card = {
        name: cardName,
        value: cardName,
        suit: currentSuit,
      };

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        card.name = "ace";
        card.value = [1, 11];
      } else if (cardName == 11) {
        card.name = "jack";
        card.value = 10;
      } else if (cardName == 12) {
        card.name = "queen";
        card.value = 10;
      } else if (cardName == 13) {
        card.name = "king";
        card.value = 10;
      }
      // Add the new card to the deck
      cardDeck.push(card);
    }
  }
  // Return the completed card deck
  return cardDeck;
};
