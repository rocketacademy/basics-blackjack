// ===== Global Variables =========

//GAME MODES
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var currentGameMode = GAME_START;

//variables to store player and dealer hand
var playerHand = [];
var dealerHand = [];
var gameDeck = "empty at the start";

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
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cards) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cards;
};

//function that creatres and shuffles a deck
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

// ====== GAME FUNCTIONS ============//

var checkForBlackJack = function (handArray) {
  // Check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
};

//function that calculates a hand

var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;

  var index = 0;

  while (index < handArray.length) {
    var currentCard = handArray[index];

    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  return totalHandValue;
};

// function that displays the player and dealer hands in a message

var displayPlayerAndDealerhands = function (playerHandArray, dealerHandArray) {
  //Player hand
  var playerMessage = "Player Hand: <br>";
  var index = 0;

  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  //Dealer hand
  var dealerMessage = "Dealer Hand: <br>";
  var index = 0;

  while (index < playerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

// finction that displays the total hand values of the player and dealer in  a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

// ====== MAIN FUNCTIONS ============//

var main = function (input) {
  var outputMessage = "";
  //FIRST CLICK
  if (currentGameMode == GAME_START) {
    gameDeck = createNewDeck();
    console.log(gameDeck);

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand ==> ");
    console.log(playerHand);
    console.log("dealer hand ==> ");
    console.log(dealerHand);

    //progress the gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    //write and return the appropriate output message
    outputMessage =
      "Everyone has been dealt a card. Click the 'submit' button to move forward";
    return outputMessage;
  }
  //SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    var playerHasBlackjack = checkForBlackJack(playerHand);
    var dealerHasBlackjack = checkForBlackJack(dealerHand);

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage =
          displayPlayerAndDealerhands(playerHand, dealerHand) +
          "It is a blackjack tie!";
      } else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage =
          displayPlayerAndDealerhands(playerHand, dealerHand) +
          "Player wins by blackjack!";
      } else {
        outputMessage =
          displayPlayerAndDealerhands(playerHand, dealerHand) +
          "Dealer wins by blackjack!";
      }
      console.log(outputMessage);
    } else {
      outputMessage =
        displayPlayerAndDealerhands(playerHand, dealerHand) +
        "There is no blackjack!";
      console.log(outputMessage);

      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      console.log("player total hand value ==> ");
      console.log(playerHandTotalValue);
      console.log("dealer total hand value ==> ");
      console.log(dealerHandTotalValue);

      //compare total hand value
      // same value -> tie
      if (playerHandTotalValue == dealerHandTotalValue) {
        console.log("It is a tie!");
        outputMessage =
          displayPlayerAndDealerhands(playerHand, dealerHand) +
          "<br>It is a tie!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // player higher value -> player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        console.log("Player wins!");
        outputMessage =
          displayPlayerAndDealerhands(playerHand, dealerHand) +
          "<br>Player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // dealer higher value -> dealer wins
      else {
        console.log("Dealer wins!");
        outputMessage =
          displayPlayerAndDealerhands(playerHand, dealerHand) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }

      //change game mode
      currentGameMode = GAME_RESULTS_SHOWN;

      // appropriate output message
      return outputMessage;
    }
  }
};
