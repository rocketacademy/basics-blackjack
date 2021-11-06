var makeDeck = function () {
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
//
//
//
//
// SHUFFLE DECK
//
//
//
//
//
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
//
//
//
//
// START MAIN FUNCTION
//
//
//
//
//
var shuffledDeck = shuffleCards(makeDeck());
var playerDeck = shuffledDeck.splice(0, 26);
var computerDeck = shuffledDeck;

var main = function () {
  var myOutputValue = "";
  var playerCards = [];
  var computerCards = [];
  var playerScore = 0;
  var computerScore = 0;

  // deal 2 cards for each player
  var drawCounter = 0;
  while (drawCounter < 2) {
    playerCards.push(playerDeck.pop());
    computerCards.push(computerDeck.pop());
    drawCounter = drawCounter + 1;
  }
  console.log("player cards: ");
  console.log(playerCards);

  // calculate total score for each player
  playerScore = playerCards[0].value + playerCards[1].value;
  computerScore = computerCards[0].value + computerCards[1].value;

  myOutputValue =
    "Player drew a " +
    playerCards[0].name +
    " and " +
    playerCards[1].name +
    ". Player score = " +
    playerScore +
    "<br><br>Computer drew " +
    computerCards[0].name +
    " and " +
    computerCards[1].name +
    ". Computer score = " +
    computerScore;

  return myOutputValue;
};
// 3. The cards are analysed for game winning conditions, e.g. Blackjack.
// 4. The cards are displayed to the user.
// 5. The user decides whether to hit or stand, using the submit button to submit their choice.
// 6. The user's cards are analysed for winning or losing conditions.
// 7. The computer decides to hit or stand automatically based on game rules.
// 8. The game either ends or continues.
