//  * Create a standard 52-card deck
//  */
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

//  Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//  Shuffle elements in the cardDeck array. Return the shuffled deck.
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// GAME PLAY
// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

//  Global variable for game modes
var modeDeal2Cards = "deal 2 cards";
var modePlayerHitStand = "player hit or stand";
currentMode = modeDeal2Cards;
console.log(currentMode);

//  Arrays for player and computer hands
var playerHand = [];
var computerHand = [];

// Helper function to push 2 cards into player's hand
var draw2Cards = function (userHand) {
  var counter = 0;
  while (counter < 2) {
    var drawnCard = deck.pop();
    userHand.push(drawnCard);
    counter += 1;
  }
};

// Function to push 1 card into player's hand
var drawCard = function (userHand) {
  var drawnCard = deck.pop();
  userHand.push(drawnCard);
};

var main = function (input) {
  // Draw 2 cards
  if (currentMode == modeDeal2Cards) {
    draw2Cards(playerHand);
    draw2Cards(computerHand);

    console.log(playerHand);
    console.log(computerHand);

    // Count points in player's hand
    playerHand[0].rank;
    playerHand[1].rank;
    console.log("player card 1 " + playerHand[0].rank);
    console.log("player card 2 " + playerHand[1].rank);

    var playerPoints = playerHand[0].rank + playerHand[1].rank;
    console.log("player points " + playerPoints);

    computerHand[0].rank;
    computerHand[1].rank;
    console.log("computer card 1 " + computerHand[0].rank);
    console.log("computer card 1 " + computerHand[1].rank);

    var computerPoints = computerHand[0].rank + computerHand[1].rank;
    console.log("computer points " + computerPoints);

    //  Declare BLACKJACK if either player or computer points == 21
    if (playerPoints == 21 || computerPoints == 21) {
      return (
        "Blackjack!" +
        "</br>player points is " +
        playerPoints +
        "<br>computer points is " +
        computerPoints
      );
    }
  }

  //  Second verion:
  //  1. The player hitting or standing is different from the dealer hitting or standing. The rules state that the dealer hits or stands after all players are done, so let's work on the players hitting or standing first.

  // 2. The player hitting or standing is a new mode in the game that allows the player to enter their choice. Add the logic for when the player busts.

  //  If player and computer hands are under 22, change mode to mode2 and tell player to enter hit or stand
  if (playerPoints < 22 && computerPoints < 22) {
    currentMode = modePlayerHitStand;
    console.log(currentMode);
    return (
      "player points is " +
      playerPoints +
      "<br>computer points is " +
      computerPoints +
      "<br>enter 'hit' or 'stand'"
    );
  }

  //  Declare BUST if either player or computer points is more than 21
  if (playerPoints > 21 || computerPoints > 21) {
    return (
      "Bust!" +
      "<br>player points is " +
      playerPoints +
      "<br>computer points is " +
      computerPoints
    );
  }

  // If current mode is mode 2, and player enters 'hit', draw a card into player's hand <-- NOT WORKING
  if (currentMode == modePlayerHitStand) {
    console.log("current mode is " + currentMode);
    if (input == "hit") {
      var drawnCard = deck.pop();
      playerHand.push(drawnCard);
      console.log(playerHand);

      return (
        "player points is " +
        playerPoints +
        "<br>computer points is " +
        computerPoints
      );
    }
  }

  //  First Version: Compare Initial Hands to Determine Winner
  // if (playerPoints >= 22) {
  //   return (
  //     "player loses" +
  //     "<br>player points is " +
  //     playerPoints +
  //     "<br>computer points is " +
  //     computerPoints
  //   );
  // }

  // if (computerPoints >= 22) {
  //   return (
  //     "computer loses" +
  //     "<br>player points is " +
  //     playerPoints +
  //     "<br>computer points is " +
  //     computerPoints
  //   );
  // }

  // if (
  //   playerPoints < 22 &&
  //   playerPoints > computerPoints &&
  //   computerPoints < 22
  // ) {
  //   return (
  //     "player wins" +
  //     "<br>player points is " +
  //     playerPoints +
  //     "<br>computer points is " +
  //     computerPoints
  //   );
  // }

  // if (
  //   computerPoints < 22 &&
  //   computerPoints > playerPoints &&
  //   playerPoints < 22
  // ) {
  //   return (
  //     "computer wins" +
  //     "<br>player points is " +
  //     playerPoints +
  //     "<br>computer points is " +
  //     computerPoints
  //   );
  // }
};
