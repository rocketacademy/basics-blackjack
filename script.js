//  ==== Blackjack Game ====
// 1. Game needs functons: card deck, shuffle deck, deal deck, get winner
// 2. Player can either "hit" or "stand"
// 3. Dealer can either "hit" or "stand"
// 4. variable value of Ace = either 1 or 11

// ==== Pseudo Code ====
// 1.define player & dealer
// 2. create & shuffle a game deck
// 3. draw 2 cards for player & dealer respectively
// 4. win conditions [BLACKJACK or HIGHER HAND VALUE]
// 5. display dealer and player hand and declare winner

// Game States
var gameStart = "game start";
var drawCards = "draw cards";
var gameResults = "game results";
var currentGameMode = gameStart;

// Computer & Dealer Hands
var playerHand = [];
var computerHand = [];

// Variable to hold deck o cards
var gameDeck = "empty at the start";

// All my cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// ==== Function to shuffle my cards ====
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// ==== Function for shuffled deck ====
var shuffledDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

var main = function (input) {
  // 1st click - click to shuffle cards
  var message = "";
  if (currentGameMode == gameStart) {
    gameDeck = shuffledDeck();
    console.log(gameDeck);

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());
    console.log(" P HAND", playerHand);
    console.log(" COM HAND", computerHand);

    currentGameMode = drawCards;

    message = "Ya'll ben dealt cards bruh";

    return message;
  }

  if (currentGameMode == drawCards) {
    var playerBlackjack = BlackjackCheck(playerHand);
    var comBlackJack = BlackjackCheck(computerHand);
    // 2nd click - check for blackjack
    // player & com have blackjack = draw
    // player has blackjack = player wins
    // com has blackjack = com wins

    // no blackjack - game continues >>
    // calculate sum of hand value & com
    // compare total hand value
    // same value = draw
    // player has higher value = player wins
    // com has higher value = com wins

    // change game mode
    // appropriate output message
  }

  var myOutputValue = "shiz niz";
  return myOutputValue;
};

// // ===== BLACKJACK GAME PLAYERS ======
// // There will always be two players - 1 player & 1 computer
// // Computer is always the dealer.

// // ===== BLACKJACK GAME FLOW ====
// // 1. Player gets dealt 2 cards to start.
// // 2. Player goes first & decide to hit (draw a card) or stand (end their turn).
// // 3. Computer hits if hand is below 17.
// // 4. Player's score = total of their card ranks. Jacks/Queen/Kings = 10. Aces = 1 or 11
// // 5. Player close to 21, but not above 21, wins hand.

// // ==== GLOBAL VARIABLES ====
// var player = 1;
// var computer = 2;
// // ==== HELPER FUNCTIONS ====

// // ````Deck of cards````
// var makeDeck = function () {
//   var cardDeck = [];
//   var suits = ["hearts", "diamonds", "clubs", "spades"];

//   var suitIndex = 0;
//   while (suitIndex < suits.length) {
//     var currentSuit = suits[suitIndex];

//     var rankCounter = 1;
//     while (rankCounter <= 13) {
//       var cardName = rankCounter;

//       // If rank is 1 or 11 should be ace, If rank is 10, should be jack or queen or king
//       if (cardName == 1 || cardName == 11) {
//         cardName = "ace";
//       } else if (cardName == 10) {
//         cardName = "jack" || "queen" || "king";
//       }

//       // Create a new card with the current name, suit, and rank
//       var card = {
//         name: cardName,
//         suit: currentSuit,
//         rank: rankCounter,
//       };

//       // Add the new card to the deck
//       cardDeck.push(card);

//       // Increment rankCounter to iterate over the next rank
//       rankCounter += 1;
//     }

//     // Increment the suit index to iterate over the next suit
//     suitIndex += 1;
//   }

//   // Return the completed card deck
//   return cardDeck;
// };

// // ```` SHUFFLE CARDS ````
// // Get a random index ranging from 0 (inclusive) to max (exclusive).
// var getRandomIndex = function (max) {
//   return Math.floor(Math.random() * max);
// };

// // Shuffle the elements in the cardDeck array
// var shuffleCards = function (cardDeck) {
//   // Loop over the card deck array once
//   var currentIndex = 0;
//   while (currentIndex < cardDeck.length) {
//     // Select a random index in the deck
//     var randomIndex = getRandomIndex(cardDeck.length);
//     // Select the card that corresponds to randomIndex
//     var randomCard = cardDeck[randomIndex];
//     // Select the card that corresponds to currentIndex
//     var currentCard = cardDeck[currentIndex];
//     // Swap positions of randomCard and currentCard in the deck
//     cardDeck[currentIndex] = randomCard;
//     cardDeck[randomIndex] = currentCard;
//     // Increment currentIndex
//     currentIndex = currentIndex + 1;
//   }
//   // Return the shuffled deck
//   return cardDeck;
// };

// // ==== MAIN FUNCTION ====

// var main = function (input) {
//   var comCardArray = [];
//   console.log("com card array global", comCardArray);
//   var playerCardArray = [];
//   console.log("player card array global", playerCardArray);
//   var cardDeck = makeDeck();
//   var shuffle = shuffleCards(cardDeck);
//   var randomIndex = getRandomIndex(cardDeck.length);
//   // Com Draw a Card
//   var computerCard = shuffle.pop();
//   console.log("com", computerCard);
//   // Record Com Card
//   comCardArray.push(computerCard);
//   console.log("com record", comCardArray);
//   // Player Draw a Card
//   var playerCard = shuffle.pop();
//   console.log("p", playerCard);
//   // Record Player Card
//   playerCardArray.push(playerCard);
//   console.log("p record", playerCardArray);

//   // Construct an output string to communicate which cards were drawn
//   var myOutputValue =
//     "Computer had " +
//     computerCard.name +
//     " of " +
//     computerCard.suit +
//     ". Player had " +
//     playerCard.name +
//     " of " +
//     playerCard.suit +
//     ". ";

//   return myOutputValue;
// };

// // ==== GAME RUNNING SEQUENCE ====

// // 2. Player clicks to Submit to deal cards
// // 3. Cards analysed for game winning conditions
// // 4. Cards are displayed to the player
// // 5. Player decides to "hit" or "stand" using submit button to submit their choice.
// // 6. Player's cards are analysed for winning or losing conditions
// // 7. Computer decides to hit or stand automatically based on game rules.
// // 8. Game either ends or continues
