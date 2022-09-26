// Blackjack Base Game Walkthrough
// 1. Playable game with minimum functions: creating deck, shuffling, dealing cards, evaluate winner
// 2. Ability for the player to hit or stand
// 3. Ability for the dealer to hit or stand
// 4. Variable value of Ace - either '1' or '11'.

// ===== ===== Psuedocode for Version 1 ===== ===== //
// 1. define player and dealer
// 2. create and shuffle a game deck
// 3. draw 2 cards for player and dealer respectively
// 4. win conditions
//    - - blackjack
//    - - higher hand value
// 5. display hands of both player and dealer and declare winner

// ===== ===== Psuedocode for Version 2 ===== ===== //
// 1. extra game mode 'hit or stand'
// 2. functionality for user to input hit or stand

// ===== ===== Psuedocode for Version 3 ===== ===== //
// 1. Dealer to hit or stand only after player choose to stand
// 2. If dealer hand value is less than 17, dealer hits
// 3. If dealer hand value is more than 17, dealer stands

// ===== ===== Psuedocode for Version 4 ===== ===== //
// 1. if totalHandValue, including an ace, is less than 21, ace value is 11.
// 2. if totalHandValue, including an ace, is more than 21, ace value is reduced to 1.

// ===== ===== GLOBAL VARIABLES ===== ===== //

// Declare game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards are drawn";
var GAME_RESULTS_SHOWN = "results shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

// Declare variables to store player and dealer hands
// We use arrays as each hand will be holding multiple card objects
var playerHand = [];
var dealerHand = [];

// Declare an empty variable to hold deck of cards
var gameDeck = [];

// pointsBoard
var pointsBoard = {
  Player: 100,
  Computer: 100,
};

// increasePointsBoard
var increasePointsBoard = function (pointsBoard, winner) {
  pointsBoard[winner] += 10;
  var playerScore = document.querySelector("#player-wins");
  var computerScore = document.querySelector("#computer-wins");
  playerScore.innerHTML = `Player: ${pointsBoard["Player"]}`;
  computerScore.innerHTML = `Computer: ${pointsBoard["Computer"]}`;
};

// decreasePointsBoard
var decreasePointsBoard = function (pointsBoard, winner) {
  pointsBoard[winner] -= 10;
  var playerScore = document.querySelector("#player-wins");
  var computerScore = document.querySelector("#computer-wins");
  playerScore.innerHTML = `Player: ${pointsBoard["Player"]}`;
  computerScore.innerHTML = `Computer: ${pointsBoard["Computer"]}`;
};

// increasePointsBoardbbyBJ
var increasePointsBoardbyBJ = function (pointsBoard, winner) {
  pointsBoard[winner] += 15;
  var playerScore = document.querySelector("#player-wins");
  var computerScore = document.querySelector("#computer-wins");
  playerScore.innerHTML = `Player: ${pointsBoard["Player"]}`;
  computerScore.innerHTML = `Computer: ${pointsBoard["Computer"]}`;
};

// decreasePointsBoardbyBJ
var decreasePointsBoardbyBJ = function (pointsBoard, winner) {
  pointsBoard[winner] -= 15;
  var playerScore = document.querySelector("#player-wins");
  var computerScore = document.querySelector("#computer-wins");
  playerScore.innerHTML = `Player: ${pointsBoard["Player"]}`;
  computerScore.innerHTML = `Computer: ${pointsBoard["Computer"]}`;
};

/* ================================================== */
/* =========== DECK CREATION FUNCTIONS ============== */
/* ================================================== */

// Function that creates a deck of cards, used by createNewDeckfucntion
var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ["💎", "♣️", "❤️", "♠️"];

  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' 'queen' 'king' = 10
      if (cardName == 1) {
        cardName = "Ace";
        // define ace value as 11 all the way, if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = "Jack";
      }
      if (cardName == 12) {
        cardName = "Queen";
      }
      if (cardName == 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };

      // Add the new card to the deck
      deck.push(card);

      // Increment rankCounter to iterate over the next rank
      indexRanks = indexRanks + 1;
    }

    // Increment the suit index to iterate over the next suit
    indexSuits = indexSuits + 1;
  }

  // Return the completed card deck
  return deck;
};

// Function that generates a random number, used by shuffleDeck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that shuffles a deck
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

// Function that checks a hand for blackjack
var checkForBlackjack = function (handArray) {
  // check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;
  // if there is a blackjack, return true
  // possible scenarios
  // 1st card ace, 2nd card 10 or picture cards
  // 1st card 10 or picture cards, 2nd card ace
  if (
    (playerCardOne.name == "Ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "Ace")
  ) {
    isBlackjack = true;
  }
  // else return false - dont need statement because veriable already set to false
  return isBlackjack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // Counter to keep track of the number of aces found within the given hand
  var aceCounter = 0;

  // loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // for jack, queen, king, value is 10
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // We count the value of ace as 11 by default
    else if (currentCard.name == "Ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    }
    // Else, all other numbered cards are valued by their ranks
    else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }

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

  return totalHandValue;
};

// Function that displays the player and dealer hands in a message
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  // Player Hand
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
  // Dealer Hand
  index = 0;
  var dealerMessage = "Dealer hand:<br>";
  //while (index < dealerHandArray.length) {
  {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    //index = index + 1;
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
    // create the game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    // deck 2 cards to player and dealer respectively
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    // check player and dealer cards
    console.log("player hand ==>");
    console.log(playerHand);
    console.log("dealer hand ==>");
    console.log(dealerHand);

    // update gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    // reassign output message
    outputMessage =
      "Everyone has been dealt a card. Click the EVALUATE button to evaluate the cards!";

    // return message
    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // check for blackjack
    var playerhasBlackjack = checkForBlackjack(playerHand);
    var dealerhasBlackjack = checkForBlackjack(dealerHand);

    console.log("Does Player have Black Jack? ==>", playerhasBlackjack);
    console.log("Does Dealer have Black Jack? ==>", dealerhasBlackjack);

    // Condition when either player or dealer has black jack
    if (playerhasBlackjack == true || dealerhasBlackjack == true) {
      // both player and dealer has blackjack -> tie
      if (playerhasBlackjack == true && dealerhasBlackjack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Its a ♣️Black Jack♠️ Tie!";
      }
      // only player has blackjack -> player wins
      else if (playerhasBlackjack == true && dealerhasBlackjack == false) {
        increasePointsBoardbyBJ(pointsBoard, "Player");
        decreasePointsBoardbyBJ(pointsBoard, "Computer");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br> 🏆 Player wins by ♣️Black Jack♠️!" +
          "<img src=https://c.tenor.com/5mY0_OI1MSUAAAAj/peach-cat.gif>";
      }
      // only dealer has blackjack -> dealer wins
      else {
        increasePointsBoardbyBJ(pointsBoard, "Computer");
        decreasePointsBoardbyBJ(pointsBoard, "Player");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br> 🤖 Dealer wins by ♣️Black Jack♠️!" +
          "<img src=https://c.tenor.com/Hr98vjSz-V8AAAAM/cat-kitty.gif>";
      }
      currentGameMode = GAME_START;
      playerHand = [];
      dealerHand = [];
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br> There are no Black Jacks. <br>Please click on HIT or STAND button.";

      // update gameMode
      currentGameMode = GAME_HIT_OR_STAND;
    }

    // return message
    return outputMessage;
  }

  // THIRD CLICK
  if ((currentGameMode = GAME_HIT_OR_STAND)) {
    // Player Hit
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br> You drew another card. <br> Please click on HIT or STAND button.";
    }

    // Player Stand
    else if (input == "stand") {
      // calculate the total hand value of both player and dealer
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      // Dealer's hit or stand logic
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // compare total hand value
      // same value -> tie
      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Its a Tie!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue);
      }
      // player higher value -> player win
      else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        increasePointsBoard(pointsBoard, "Player");
        decreasePointsBoard(pointsBoard, "Computer");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br> 🏆 Player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<img src=https://c.tenor.com/5mY0_OI1MSUAAAAj/peach-cat.gif>";
      }
      // dealer higher value -> dealer win
      else {
        increasePointsBoard(pointsBoard, "Computer");
        decreasePointsBoard(pointsBoard, "Player");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br> 🤖 Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<img src=https://c.tenor.com/Hr98vjSz-V8AAAAM/cat-kitty.gif>";
      }

      // update game mode - GAME_RESULTS_SHOWN is not used in this base example
      // However, you may wish to implement your own game modes for further functionality
      // i.e. going back to GAME_START to loop the game
      currentGameMode = GAME_START;
      playerHand = [];
      dealerHand = [];
    }

    // return output message
    return outputMessage;
  }
};
