// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11. How to let player choose whether Ace is 1 or 11?
// The player who is closer to, but not above 21 wins the hand.

// REQUIRED STATES
// State 1 - Player draws 2 cards. Chooses to Hit or Stand
// State 2 - Player chose to Hit, draw 1 card. Chooses to Hit or Stand. If Hit, draw an extra card
// State 3 - Player chose an Ace, and can choose whether the Ace value is 1 or 11
// State 4 - Player chooses to Stand, compares scores and declares winner.
// State 5 - If Player or Computer exceeds 21, they automatically lose
var DRAW_CARDS = "DRAW_CARDS";
var HIT_OR_STAND = "HIT_OR_STAND";
var ACE_CARD = "ACE_CARD";
var DECLARE_WINNER = "DECLARE_WINNER";
var EXCEEDING_NUMBER = "EXCEEDING_NUMBER";

var gameMode = DRAW_CARDS;

var HIT = "hit";
var STAND = "stand";
var button2;

var main = function (input) {
  makeDeck();
  var myOutputValue;
  var shuffledDeck = shuffleCards(cardDeck);
  // computer draws 2 cards but doesn't reveal it
  var computerCardOne = shuffledDeck.pop();
  var computerCardTwo = shuffledDeck.pop();
  // player draws 2 cards, these two cards are revealed to player
  var playerCardOne = shuffledDeck.pop();
  var playerCardTwo = shuffledDeck.pop();
  // additional card for when player chooses Hit
  var playerCardThree = shuffledDeck.pop();
  // combined number
  var computerCombinedNumber =
    Number(computerCardOne.rank) + Number(computerCardTwo.rank);
  var playerCombinedNumber =
    Number(playerCardOne.rank) + Number(playerCardTwo.rank);
  // compare conditions
  if (gameMode === DRAW_CARDS && playerCombinedNumber < 21) {
    // button.innerText = "Hit";
    // button2 = document.createElement("button");
    // button2.innerText = "Stand";
    // document.body.appendChild(button2);
    gameMode = HIT_OR_STAND;
    return `You drew ${playerCardOne.rank} & ${playerCardTwo.rank} with a combined number of ${playerCombinedNumber}. Input "Hit" to draw another card, or "Stand" to end your turn.`;
  } else if (gameMode === DRAW_CARDS && playerCombinedNumber > 21) {
    return `You exceeded the number of 21. Input "Stand" to end your turn.`;
  }
  if (gameMode === HIT_OR_STAND && input === HIT) {
    var playerCombinedNumber =
      Number(playerCardOne.rank) +
      Number(playerCardTwo.rank) +
      Number(playerCardThree.rank);
    if (playerCombinedNumber < 21) {
      return `You drew an additional card of ${playerCardOne.rank}. Combined, your total number is ${playerCombinedNumber}. Input "Stand" to end your turn.`;
    } else if (playerCombinedNumber > 21) {
      return `You exceeded the number of 21. Input "Stand" to end your turn.`;
    }
    if (gameMode === HIT_OR_STAND && input === STAND) {
      gameMode = DECLARE_WINNER;
    }
  }
  return myOutputValue;
};

var cardDeck = [];

// define card deck
var makeDeck = function () {
  // Initialise an empty deck array

  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    console.log(`Current Suit: ${currentSuit}`);

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      console.log(`Current Card Number: ${rankCounter}`);
      // Create a variable to store the card names
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // create if conditions for the other cards
      if (cardName == 1) {
        // change card name to Ace
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // create a card with the current name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the new card to the deck
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

// Initialise index to 0 to start from the beginning of the array
var index = 0;
// Define loop condition to loop until index is the length of cardDeck
while (index < cardDeck.length) {
  // Access attributes of each card with dot notation.
  console.log(cardDeck[index].name);
  // Construct a string using attributes of each card object
  var cardTitle = cardDeck[index].name + " of " + cardDeck[index].suit;
  // Log the string
  console.log(cardTitle);
  // Increment the card index
  index = index + 1;
}

// Get a random index ranging from 0 (inclusive) to max (exclusive).
// What does max mean?
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  // shuffle each card as many times as there are cards in the deck
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
