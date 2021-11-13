// Declare Game modes
var gameStart = "Game start";
var drawGameCards = "Cards are drawn";
var showGameResults = "Results shown";
var gameHitOrStand = "Hit or stand";
var currentGameMode = gameStart;

// Declare variable to store human and computer hands
// We use arrays as each hand will be holding multiple card objects
var humanHand = [];
var computerHand = [];

// Declare an empty variable to hold deck of cards
var gameDeck = [];

/* =========== DECK CREATION FUNCTIONS ============== */

// Function that creates a deck of cards, used by createNewDeck function
var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ["diamonds", "clubs", "hearts", "spades"];
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

/* ================ GAME FUNCTIONS ================ */

// Function that checks a hand for black jack
var checkForBlackJack = function (handArray) {
  // Loop through human hand
  // if there is a blackjack return true
  // else return false
  var humanCardOne = handArray[0];
  var humanCardTwo = handArray[1];
  var isBlackJack = false;

  // Possible black jack scenerios
  // First card is Ace +  Second card is 10 or suits
  // Second card is Ace +  First card is 10 or suits
  if (
    (humanCardOne.name == "ace" && humanCardTwo.rank >= 10) ||
    (humanCardTwo.name == "ace" && humanCardOne.rank >= 10)
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

  // Loop through human or computers hand and add up the ranks
  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];

    // In blackjack, the value of king, queen, and jack are counted as 10 by default
    if (
      currCard.name == "king" ||
      currCard.name == "queen" ||
      currCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // We count the value of ace as 11 by default
    else if (currCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
      // Else, all other numbered cards are valued by their ranks
    } else {
      totalHandValue = totalHandValue + currCard.rank;
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

// Function that displays the human and computers hand in a message
var displayHumanAndComputerHands = function (
  humanHandArray,
  computerHandArray
) {
  var humanMessage = "Human hand ✋ <br>";
  var index = 0;
  while (index < humanHandArray.length) {
    humanMessage =
      humanMessage +
      "- " +
      humanHandArray[index].name +
      " of " +
      humanHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  index = 0;
  var computerMessage = "Computer hand 💻 <br>";
  while (index < computerHandArray.length) {
    computerMessage =
      computerMessage +
      "- " +
      computerHandArray[index].name +
      " of " +
      computerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return humanMessage + "<br>" + computerMessage;
};

// Function that displays the total hand values of the human and the computer in a message
var displayHandTotalValues = function (humanHandValue, computerHandValue) {
  var totalHandValueMessage =
    "<br>Human ✋ total hand value: " +
    humanHandValue +
    "<br>Computer 💻 total hand value: " +
    computerHandValue;
  return totalHandValueMessage;
};

/* ================= MAIN FUNCTION ================ */

var main = function (input) {
  var myOutputValue = "";

  // FIRST CLICK
  if (currentGameMode == gameStart) {
    // create a deck of cards
    gameDeck = createNewDeck();

    // deal 2 cards to human and computer
    humanHand.push(gameDeck.pop());
    humanHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());

    // check human and computer cards
    console.log("Human Hand ==>");
    console.log(humanHand);
    console.log("Computer Hand ==>");
    console.log(computerHand);

    // update gameMode
    currentGameMode = drawGameCards;

    // reassign output message
    myOutputValue =
      "Both human ✋ and computer 💻 have 2 cards now. Click 'Get lucky!' to calculate cards!";

    // return message
    return myOutputValue;
  }

  // SECOND CLICK
  if (currentGameMode == drawGameCards) {
    // check for blackjack
    var humanHasBlackJack = checkForBlackJack(humanHand);
    var computerHasBlackJack = checkForBlackJack(computerHand);

    console.log("Does human have Black Jack? ==>", humanHasBlackJack);
    console.log("Does computer have Black Jack? ==>", computerHasBlackJack);

    // Condition when either human or computer has black jack
    if (humanHasBlackJack == true || computerHasBlackJack == true) {
      // Condition where both have black jack
      if (humanHasBlackJack == true && computerHasBlackJack == true) {
        outputMessage =
          displayHumanAndComputerHands(humanHand, computerHand) +
          "<br>it's a blackjack tie! 👔👔👔";
      }

      // Condition when only human has black jack
      else if (humanHasBlackJack == true && computerHasBlackJack == false) {
        outputMessage =
          displayHumanAndComputerHands(humanHand, computerHand) +
          "<br>blackjack! human ✋ wins!";
      }
      // Condition when only computer has black jack
      else {
        outputMessage =
          displayHumanAndComputerHands(humanHand, computerHand) +
          "<br>blackjack! computer 💻 wins!";
      }
    }

    // Condition where neither human nor computer has black jack
    // ask human to input 'hit' or 'stand'
    else {
      outputMessage =
        displayHumanAndComputerHands(humanHand, computerHand) +
        '<br> There are no blackjacks. <br>Please input "hit" or "stand".';

      // update gameMode
      currentGameMode = gameHitOrStand;
    }

    // return message
    return myOutputValue;
  }

  // THIRD CLICK
  if (currentGameMode == gameHitOrStand) {
    // Condition where human inputs 'hit'
    if (input == "hit") {
      humanHand.push(gameDeck.pop());
      myOutputValue =
        displayHumanAndComputerHands(humanHand, computerHand) +
        '<br> You drew another card. <br>Please input "hit" or "stand".';
    }

    // Condition where human inputs 'stand'
    else if (input == "stand") {
      // Calculate hands
      var humanHandTotalValue = calculateTotalHandValue(humanHand);
      var computerHandTotalValue = calculateTotalHandValue(computerHand);

      // computer's hit or stand logic
      while (computerHandTotalValue < 17) {
        computerHand.push(gameDeck.pop());
        computerHandTotalValue = calculateTotalHandValue(computerHand);
      }

      // Conditions for tied game
      if (
        humanHandTotalValue == computerHandTotalValue ||
        (humanHandTotalValue > 21 && computerHandTotalValue > 21)
      ) {
        myOutputValue =
          displayHumanAndComputerHands(humanHand, computerHand) +
          "<br>Its a Tie! 👔" +
          displayHandTotalValues(humanHandTotalValue, computerHandTotalValue);
      }

      // Conditions for human win
      else if (
        (humanHandTotalValue > computerHandTotalValue &&
          humanHandTotalValue <= 21) ||
        (humanHandTotalValue <= 21 && computerHandTotalValue > 21)
      ) {
        myOutputValue =
          displayHumanAndComputerHands(humanHand, computerHand) +
          "<br>Human ✋ is the final winner!" +
          displayHandTotalValues(humanHandTotalValue, computerHandTotalValue);
      }

      // Computer wins when above two conditions are not met
      else {
        myOutputValue =
          displayHumanAndComputerHands(humanHand, computerHand) +
          "<br>Computer 💻 is the final winner!" +
          displayHandTotalValues(humanHandTotalValue, computerHandTotalValue);
      }
      // update game mode - GAME_RESULTS_SHOWN is not used in this base example
      // However, you may wish to implement your own game modes for further functionality
      // i.e. going back to GAME_START to loop the game
      currentGameMode = showGameResults;
    }

    // Input validation when human inputs anything outside of 'hit' or 'stand'
    else {
      myOutputValue =
        'Please only input "hit" or "stand".<br><br>' +
        displayHumanAndComputerHands(humanHand, computerHand);
    }

    // return output message
    return myOutputValue;
  }
};
