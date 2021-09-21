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

var playerHand = deck;
var computerHand = deck;

var gameMode1 = "deck shuffled";
var gameMode2 = "hit or stand";

//Each player action triggers the main function.
var main = function (winOrLose) {
  // The player and computer each draw the top card from their hand.
  var playerCard1 = playerHand.pop();
  var playerCard2 = playerHand.pop();
  var computerCard1 = computerHand.pop();
  var computerCard2 = computerHand.pop();

  console.log(playerCard1);
  console.log(playerCard2);
  console.log(computerCard1);
  console.log(computerCard2);

  var playerPoints = playerCard1.rank + playerCard2.rank;
  var computerPoints = computerCard1.rank + computerCard2.rank;
  console.log("player points " + playerPoints);
  console.log("computer points " + computerPoints);

  // Initialise an output value with the cards drawn by each player.
  var myOutputValue =
    "PLAYER card 1: " +
    playerCard1.name +
    " of " +
    playerCard1.suit +
    "<br>PLAYER card 2: " +
    playerCard2.name +
    " of " +
    playerCard2.suit +
    "<br> Total points is " +
    playerPoints +
    "<br><br>COMPUTER card 1: " +
    computerCard1.name +
    " of " +
    computerCard1.suit +
    "<br>COMPUTER card 2: " +
    computerCard2.name +
    " of " +
    computerCard2.suit +
    "<br> Total points is " +
    computerPoints +
    "<br><br>Enter 'Hit' to hit or 'Stand' to stand";

  return myOutputValue;
};

var winOrLose = function () {
  if (playerPoints >= 21) {
    myOutputValue = "Player wins";
  }
  if (computerPoints >= 21) {
    myOutputValue = "Computer wins";
  }
};
