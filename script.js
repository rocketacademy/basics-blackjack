// Function to make the deck
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

// Function to shuffle deck
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
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
var deck = [];
deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// function to deal 2 cards in the beginning
var dealCards = function (initialCardsDealt) {
  var initialCardsDealt = [];
  var numberOfCardsDealtInTheBeginning = 2;
  for (let i = 0; i < numberOfCardsDealtInTheBeginning; i++) {
    var dealtCards = shuffledDeck.pop();
    initialCardsDealt.push(dealtCards);
  }
  return initialCardsDealt;
};

//function to show the name and the suit of the cards on hand
var toDisplayCardsOnHand = function (playerOrComputer) {
  var cardsOnHandObject = playerOrComputer;
  var cardsOnHandArray = "";
  for (let j = 0; j < cardsOnHandObject.length; j++) {
    cardsOnHandArray = `${cardsOnHandArray} 
      ${cardsOnHandObject[j].name} of
      ${cardsOnHandObject[j].suit},`;
  }
  return cardsOnHandArray;
};

// function to calculate the sum of the cards
var sumRankCardsOnHand = function (playerOrComputer) {
  var cardsOnHandObject = playerOrComputer;
  var totalRank = 0;
  for (let k = 0; k < cardsOnHandObject.length; k++) {
    totalRank = totalRank + cardsOnHandObject[k].rank;
  }
  return totalRank;
};

// function to hit or stand for player
var toHitOrStand = function (playerCards) {
  var dealtCards = shuffledDeck.pop();
  console.log(dealtCards);
  return dealtCards;
};

// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// winning condition: closest to 21 and not the same sum with dealer

var gamePhase = function () {};
// global variables

var dealingPhase = true;
var hitOrStandPhase = true;
var playerHandMessage = `Player's cards`;
var computerHandMessage = `Computer's cards`;
var hitOrStandMessage = `Would you like to hit or stand?`;

var main = function (input) {
  // phase one = dealing phase
  var playerCards = dealCards();
  var computerCards = dealCards();
  console.log(playerCards);
  console.log(computerCards);
  var playerCardsString = toDisplayCardsOnHand(playerCards);
  var computerCardsString = toDisplayCardsOnHand(computerCards);
  var playerCardsSum = sumRankCardsOnHand(playerCards);
  var computerCardSum = sumRankCardsOnHand(computerCards);
  // var playerTotalRank = ;
  // var computerTotalRank = 0;

  if (dealingPhase == true) {
    dealingPhase = false;
    return `${playerHandMessage}: ${playerCardsString} total point = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${hitOrStandMessage}`;
  }
  // phase two = hit or stand phase
  if (input == "hit") {
    var hitCard = toHitOrStand();
    playerCards.push(hitCard);
    playerCardsString = toDisplayCardsOnHand(playerCards);
    playerCardsSum = sumRankCardsOnHand(playerCards);
    return `${playerHandMessage}: ${playerCardsString} total point = ${playerCardsSum}<br>${computerHandMessage}: ${computerCardsString} with sum = ${computerCardSum}<br><br>${hitOrStandMessage}`;
  }
};
