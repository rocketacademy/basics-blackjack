/* What do I need for project blackjack?
1. Deck
2. Shuffle
3. Winning condition
4. user will submit "hit" or "stand"
5. dealer deals until 17

*/
let gameState1 = "DRAW CARDS";
let gameState2 = "PLAYER_DECIDE_TO_HIT_OR_STAND";
let gameState3 = "PLAYER_STAND_THEN_SHOW_RESULT";
let currentGameState = gameState1;

// array for player and dealer hands
let playerHands = [];
let dealerHands = [];

// Function to generate a deck
function deckMaker() {
  // collect data of generated card
  let cardDeck = [];
  // Four suits to be generated in a deck
  let cardSuits = ["hearts", "diamonds", "clubs", "spades"];
  let suitIndex = 0;
  while (suitIndex < cardSuits.length) {
    let currentSuits = cardSuits[suitIndex];
    // Each suits has 13 cards, value starts from 1 to 13.
    let cardValue = 1;
    // create a loop within a loop
    // when the cardValue is 1, change the cardname to "ace", 11 => "jack", 12 => "queen", 13 =>"king"
    while (cardValue <= 13) {
      let cardName = cardValue;
      if (cardValue == 1) {
        cardName = "ace";
      } else if (cardValue == 11) {
        cardName = "jack";
      } else if (cardValue == 12) {
        cardName = "queen";
      } else if (cardValue == 13) {
        cardName = "king";
      }
      // create a card with objects "name", "rank", "suits".
      let card = {
        name: cardName,
        value: cardValue,
        suits: currentSuits,
      };
      // push the card data in objects into cardDeck
      cardDeck.push(card);
      // After the card being pushed to cardDeck array, the cardValue increases 1 to run loop until 13.
      cardValue += 1;
    }
    // After 13 cards generated, the suitIndex will increase 1 to generate the remaining sets of suits.
    suitIndex += 1;
  }
  return cardDeck;
}

// Create a set of deck with the function deckMaker.
let deck = deckMaker();

// Function to change the value of jack queen and king to 10.
function newDeck(cards) {
  for (i = 0; i < 52; i++) {
    let currCard = cards[i];
    if (currCard.value == 11 || currCard.value == 12 || currCard.value == 13) {
      currCard.value = 10;
    }
  }
  return cards;
}

//  New valued deck.
let newValuedDeck = newDeck(deck);

// Create a function to generate random index.
function getRandomIndex(size) {
  return Math.floor(Math.random() * size);
}

// Create a function to shuffle the deck.
function shuffleCards(cardDeck) {
  let currentIndex = 0;
  // Loop over the card deck array once
  while (currentIndex < cardDeck.length) {
    // generate a random index using the the getRandomIndex function
    let randomIndex = getRandomIndex(cardDeck.length);
    let randomCard = cardDeck[randomIndex];
    let currentCard = cardDeck[currentIndex];
    // Swap the card to make the current card into random card by using randomIndex
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
}

// Declare a new variable to communicate that we have shuffled the deck.
let shuffledDeck = shuffleCards(newValuedDeck);
