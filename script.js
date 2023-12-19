/* ================================================== */
/* ================ GLOBAL VARIABLES ================ */
/* ================================================== */

// Declare Game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards are drawn";
var GAME_RESULTS_SHOWN = "results are shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;
var GAME_RESTART = "game restart";

// Declare variable to store player and dealer hands
// We use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

// Declare an empty variable to hold deck of cards
var gameDeck = [];

/* ================================================== */
/* =========== DECK CREATION FUNCTIONS ============== */
/* ================================================== */

// Function that creates a deck of cards, used by createNewDeck function
var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' & 'queen' & 'king' = 10
      if (cardName == 1) {
        cardName = "ace";
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = "jack";
      }
      if (cardName == 12) {
        cardName = "queen";
      }
      if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

// Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that shuffles a deck, used by createNewDeck function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

/* ================================================= */
/* ================ GAME FUNCTIONS ================ */
/* ================================================ */

// // Function that checks a hand for black jack
var checkForBlackJack = function (handArray) {
  // Loop through player hand
  // if there is a blackjack return true
  // else return false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  // Possible black jack scenerios
  // First card is Ace +  Second card is 10 or suits
  // Second card is Ace +  First card is 10 or suits
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "ace" && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // Counter to keep track of the number of aces found within the given hand
  var aceCounter = 0;

  // Reset index for ace counter
  index = 0;
  // Loop for the number of aces found and only deduct 10 from total hand value
  // when totalHandValue is more than 21.
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
};

// Function that displays the player and dealers hand in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = "Player hand:<br>";
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

  index = 0;
  var dealerMessage = "Dealer hand:<br>";
  while (index < dealerHandArray.length) {
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

// Function that displays the total hand values of the player and the dealer in a message
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

/* ================================================= */
/* ================= MAIN FUNCTION ================ */
/* ================================================ */

var main = function (input) {
  var outputMessage = "";

  // FIRST CLICK
  if (currentGameMode == GAME_START) {
    // create a deck of cards
    gameDeck = createNewDeck();

    // deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    // check player and dealer cards
    console.log("Player Hand ==>");
    console.log(playerHand);
    console.log("Dealer Hand ==>");
    console.log(dealerHand);

    // update gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    // reassign output message
    outputMessage =
      "Everyone has recieved a card. Click 'Submit' button to calculate cards!";

    // return message
    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // check for blackjack
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    console.log("Does Player have Black Jack? ==>", playerHasBlackJack);
    console.log("Does Dealer have Black Jack? ==>", dealerHasBlackJack);

    // Condition when either player or dealer has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // Condition where both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Its a Black Jack Tie!" +
          "<br>Click submit to play again!";
        console.log("click submit to play again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }
      // Condition when only player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player wins by Black Jack!" +
          "<br>Click submit to play again!";
        console.log("click submit to play again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }
      // Condition when only dealer has black jack
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins by Black Jack!" +
          "<br>Click submit to play again!";
        console.log("click submit to play again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> There are no Black Jacks. <br>Please input "hit" or "stand".';

      // update gameMode
      currentGameMode = GAME_HIT_OR_STAND;
    }

    // return message
    return outputMessage;
  }

  // THIRD CLICK
  if (currentGameMode == GAME_HIT_OR_STAND) {
    // Condition where player inputs 'hit'
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> You drew another card. <br>Please input "hit" or "stand".';
    }

    // Condition where player inputs 'stand'
    else if (input == "stand") {
      // Calculate hands
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      // Dealer's hit or stand logic
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // Conditions for tied game
      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Its a Tie!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br> Click submit to play again!";
        console.log("click submit to play again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }

      // Conditions for player win
      else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>Click submit to play again!";
        console.log("click submit to play again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }

      //Bust if the total hand value is 22 and above
      else if (playerHandTotalValue >= 22) {
        console.log("Player busted");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player bust, Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>Click submit to play again!";
        console.log("click submit to play again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      } else if (dealerHandTotalValue >= 22) {
        console.log("Dealer busted");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer bust, player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>Click submit to play again!";
        console.log("click submit to play again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }

      // Dealer wins when above two conditions are not met
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>Click submit to play again!";
        console.log("click submit to play again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }

      // update game mode - GAME_RESULTS_SHOWN is not used in this base example
      // However, you may wish to implement your own game modes for further functionality
      // i.e. going back to GAME_START to loop the game
      currentGameMode = GAME_RESULTS_SHOWN;
    }

    // Input validation when player inputs anything outside of 'hit' or 'stand'
    else {
      outputMessage =
        'wrong input... only "hit" or "stand" are valid.<br><br>' +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }

    // return output message
    return outputMessage;
  }

  //RESTART GAME
  if (currentGameMode == GAME_RESTART) {
    //reset game variable
    playerHand = [];
    dealerHand = [];
    gameDeck = [];
    currentGameMode = GAME_START;
    console.log("GAME MODE:" + currentGameMode);

    outputMessage = "New game started. Click 'Submit' to draw cards.";
    console.log("Output Message:", outputMessage);
  }
  return outputMessage;
};
