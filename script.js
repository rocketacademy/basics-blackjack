//1. playable game: creating deck, shuffling, dealing cards, evaluating winner
//2. ability for player to hit or stand
//3. ability for dealer to hit or stand
//4. variable value of Ace - '1' or '11'

// ---Pseudocode---
//1. define player and dealer
//2. create and shuffle a game deck
//3. draw 2 cards for player and dealer respectively
//4. win conditions
// --- black jack
// -- higher hand value

//5. display hands of both player

// ~~~~~~~~~~~~~~~~~~~~~~~~~GLOBAL VARIABLES~~~~~~~~~~~~~~~~~~~~~~~~~
var gameStateStart = "Start game";
var gameStateDrawCard = "Draw cards";
var gameStateShowCard = "Show cards";
var currentGameState = gameStateStart;
var playerHand = [];
var dealerHand = [];

// Declare variable to hold deck of cards
var gameDeck = "empty at the start";
// Make deck
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
// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffleDeck = shuffleCards(newDeck);
  return shuffleDeck;
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~GAME FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~
var blackJackCheck = function (array) {
  var cardOne = array[0];
  var cardTwo = array[1];
  var blackJack = false;

  if (
    (cardOne.name == "ace" && cardTwo.rank >= 10) ||
    (cardOne.rank >= 10 && cardTwo.name == "ace")
  ) {
    blackJack = true;
  }
  return blackJack;
};

var totalValue = function (array) {
  var totalValue = 0;

  var index = 0;
  // player value
  while (index < array.length) {
    var currentCard = array[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalValue = totalValue + 10;
    } else {
      totalValue = totalValue + currentCard.rank;
    }

    index += 1;
  }
  return totalValue;
};

var messageDisplay = function (playerArray, dealerArray) {
  var index = 0;
  var playerTotalValue = totalValue(playerArray);
  var playerMessage =
    "---PLAYER HAND TOTAL VALUE IS " +
    playerTotalValue +
    "---" +
    " <br> Player cards drawn: <br>";
  // hand message
  while (index < playerArray.length) {
    playerMessage =
      playerMessage +
      playerArray[index].name +
      " of " +
      playerArray[index].suit +
      "<br>";

    index += 1;
  }

  var dealerTotalValue = totalValue(dealerArray);
  var dealerMessage =
    "---DEALER HAND TOTAL VALUE IS " +
    dealerTotalValue +
    "---" +
    "<br>Dealer cards drawn: <br>";
  var index = 0;
  // dealer message
  while (index < dealerArray.length) {
    dealerMessage =
      dealerMessage +
      dealerArray[index].name +
      " of " +
      dealerArray[index].suit +
      "<br>";

    index += 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~MAIN FUNCTIONS~~~~~~~~~~~~~~~~~~~~~~~~~
var main = function (input) {
  var myOutputValue = "";
  // Game state to draw cards
  if (currentGameState == gameStateStart) {
    // Create deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    // Deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    console.log("Player hand");
    console.log(playerHand);
    console.log("Dealer hand");
    console.log(dealerHand);

    // change game states
    currentGameState = gameStateDrawCard;

    myOutputValue = `Cards has been drawn. Click the Submit button to evaluate cards`;

    return myOutputValue;
  }
  // Game state to show card
  if (currentGameState == gameStateDrawCard) {
    // test checkForBlackJack function
    // playerHand = [
    //   { name: "queen", suit: "clubs", rank: 12 },
    //   { name: "ace", suit: "diamonds", rank: 1 },
    // ];
    // dealerHand = [
    //   { name: "ace", suit: "diamonds", rank: 1 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];

    //BLACKJACK SCENARIOS
    var playerBlackJack = blackJackCheck(playerHand);
    var dealerBlackJack = blackJackCheck(dealerHand);

    // -- blackjack tie
    if (playerBlackJack == true || dealerBlackJack == true) {
      myOutputValue =
        messageDisplay(playerHand, dealerHand) + `<br> IT IS A BLACKJACK TIE!!`;
    }
    // -- player blackjack
    else if (playerBlackJack == true && dealerBlackJack == false) {
      myOutputValue =
        messageDisplay(playerHand, dealerHand) + `<br> BLACKJACK! PLAYER WINS!`;
    }
    // -- dealer blackjack
    else {
      myOutputValue =
        messageDisplay(playerHand, dealerHand) + `<br> BLACKJACK! DEALER WINS!`;
    }

    var playerValue = totalValue(playerHand);
    var dealerValue = totalValue(dealerHand);
    console.log(playerValue);
    console.log(dealerValue);
    // Win condition
    // -- tie
    if (playerValue == dealerValue) {
      myOutputValue =
        messageDisplay(playerHand, dealerHand) + `<br> IT IS A TIE!`;
    }
    // -- player win
    else if (playerValue > dealerValue) {
      myOutputValue =
        messageDisplay(playerHand, dealerHand) + `<br> PLAYER WINS`;
    } // -- dealer win
    else {
      myOutputValue =
        messageDisplay(playerHand, dealerHand) + `<br> DEALER WINS`;
    }

    // change game state
    currentGameState = gameStateShowCard;
  }

  return myOutputValue;
};
