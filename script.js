// 1. minimum functions: creating deck, shuffling, dealing cards, evaluating winner
// 2. ability for player to hit or stand
// 3. ability for dealer to hit or stand
// 4. variable value of ace - either '1' or '11'

// ===== version 1 pseudocode =====
// 1. define player and dealer
// 2. create and shuffle a game deck
// 3. draw 2 cards for player and dealer respectively
// 4. win conditions:
//    - blackjack
//    - higher hand value
// 5. display hands of both player and dealer in the output box and declare winner

// ===== version 2 pseudocode (add player hit or stand) =====
// 1. extra game mode hit or stand
// 2. functionality for user to input hit or stand
//    - if hit, add a card to their hand
//    - if stand, compare the player hand against the dealer

// ===== version 3 pseudocode (add dealer hit or stand) =====
// 1. dealer to hit or stand ONLY AFTER player chooses to stand
// 2. if dealer hand value is less than 17, dealer hits
// 3. if dealer hand value is more than 17, dealer stands

// ===== version 4 pseudocode (add variable ace values) =====
// 1. if totalHandValue, including an ace, is less than 21, ace value is 11
// 2. if totalHandValue, including an ace, is more than 21, ace value is reduced to 1

// Declare game modes:
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards are drawn";
var GAME_RESULTS_SHOWN = "results are shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

// Declare variables to store dealer and player hands
// Use arrays as each hand will be holding multiple card objects
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

// Function that checks a hand for black jack
var checkForBlackjack = function (handArray) {
  // Loop through player hand
  // if there is a blackjack return true
  // else return false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  // Possible black jack scenerios
  // First card is Ace +  Second card is 10 or suits (i.e. suits means picture cards)
  // Second card is Ace +  First card is 10 or suits (i.e. suits means picture cards)
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "ace" && playerCardOne.rank >= 10)
  ) {
    isBlackjack = true;
  }

  return isBlackjack;
};

// Function that calculates hand value
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // counter to track no. of times aces appear in hand array
  var aceCounter = 0;
  // loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    // for jack, king, queen, value is 10
    if (
      currentCard.name == "king" ||
      currentCard.name == "queen" ||
      currentCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index += 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index += 1;
  }
  return totalHandValue;
};

// Function that displays the player and dealer hands in a message by accessing the name and suit keys of each card object (javascript "objects" are called "dictionaries" in python)
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  // player hand
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
  // dealer hand
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
  var outputMessage = ``;
  // FIRST CLICK OF SUBMIT BUTTON
  if (currentGameMode == GAME_START) {
    // when we load the page, current game mode is GAME_START, as defined at the top
    // when submit button is pressed, this if block will run

    // create the game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    // deal 2 cards to player and dealer respectively
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log(`Player hand ==> `);
    console.log(playerHand);
    console.log(`Dealer hand ==> `);
    console.log(dealerHand);

    // change the gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    // write and return appropriate output message
    outputMessage = `Everyone has been dealt a card. Click submit to evaluate cards`;
    return outputMessage;
    // NOTE: "return outputMessage;" statement should be at the end of each gameMode if statement
    // It should be at the outermost but within each gameMode if statement to ensure it runs.
    // It shouldn't be inside any nested if/else/else if statement.
  }

  // SECOND CLICK OF SUBMIT BUTTON
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // check for blackjack
    var playerHasBlackjack = checkForBlackjack(playerHand);
    var dealerHasBlackjack = checkForBlackjack(dealerHand);
    console.log(`Does player have blackjack? ${playerHasBlackjack}`);
    console.log(`Does dealer have blackjack? ${dealerHasBlackjack}`);
    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      // both player and dealer has blackjack -> tie
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>Blackjack tie!`;
      }
      // only player has blackjack -> player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>Player wins by blackjack!`;
      }
      // only dealer has blackjack -> dealer wins
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>Dealer wins by blackjack!`;
      }
      console.log(outputMessage);
    } else {
      // no blackjack -> game continues
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br>There are no Black Jacks. <br>Please input "hit" or "stand".';

      // change the gameMode
      currentGameMode = GAME_HIT_OR_STAND;
    }
    // appropriate output message
    return outputMessage;
    // NOTE: "return outputMessage;" statement should be at the end of each gameMode if statement
    // It should be at the outermost but within each gameMode if statement to ensure it runs.
    // It shouldn't be inside any nested if/else/else if statement.
  }

  // THIRD CLICK: HIT OR STAND
  if (currentGameMode == GAME_HIT_OR_STAND) {
    // Player hit (i.e. draw one card)
    if (input.toLowerCase() == `hit`) {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        `<br>You drew another card. <br>Please input "hit" or "stand".`;
    }
    // Player stand
    else if (input.toLowerCase() == `stand`) {
      // calculate total hand value of both player and dealer
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      console.log(`Player total hand value = ${playerHandTotalValue}`);
      console.log(`Dealer total hand value = ${dealerHandTotalValue}`);

      // Dealer hit or stand (occurs ONLY AFTER player chooses to stand)
      // if dealer hand value is less than 17, dealer hits
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // compare total hand value
      // same value -> tie
      if (playerHandTotalValue == dealerHandTotalValue) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `It is a tie!<br>` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // player higher value -> player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>Player wins!<br>` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // dealer higher value -> dealer wins
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>Dealer wins!<br>` +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
    }
    // Input validation
    else {
      outputMessage =
        `Invalid input. Please input "hit" or "stand" only!<br><br>` +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }
    return outputMessage;
    // NOTE: "return outputMessage;" statement should be at the end of each gameMode if statement
    // It should be at the outermost but within each gameMode if statement to ensure it runs.
    // It shouldn't be inside any nested if/else/else if statement.
  }
};
