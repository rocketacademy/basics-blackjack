// Playable game with minimum function: Create Deck, shuffle deck, dealing cards and evaluating winner
// Player able to hit or stand
// Computer/Dealer able to hit or stand
// Ace value either 1 or 11

//create version 1
// define computer and player
// create and shuffle deck
// initial draw 2 cards each for both player and computer
// define winning conditions; Blackjack (21) or anyone's hand with higher value and bust if >21
// to display the hands of the player and computer and declare the winner

//version 2
// new game modes to add hit or stand
// user to input hit or stand
// Hit --> player draws a card
// stand --> comparing the hands of player and computer to determine winner

//version 3
// adds functionality of computer to hit or stand after player stand
// computer will only hit if sum is <17
// computer will stand if sum >17

//version 4
//to  define the the ace value
// if total Value >21, ace will be 1
// if total value <21, ace will be 11

//version 5
// restart the game once currentGameMode == resultsShownMode
//add number of games tracker

// Game modes
var startGameMode = "game start"; //GAME_START 'game start'
var cardsDrawnMode = "cards are drawn"; // GAME_CARDS_DRAWN 'cards are drawn'
var resultsShownMode = "results are shown"; // GAME_RESULTS_SHOWN
var hitOrStandMode = "hit or stand"; //GAME_HIT_OR_STAND
var currentGameMode = startGameMode;
var numberOfGames = -1;
var numberOfComputerWins = 0;
var numberOfPlayerWins = 0;
var playerWinningPercentage = (numberOfPlayerWins / numberOfGames) * 100;

// Declare variable to store player and computer hands
// We use arrays as each hand will be holding multiple card objects
var playerHand = [];
var computerHand = [];

// variable to hold cards
var gameDeck = "";

/* ================================================== */
/* =========== DECK CREATION FUNCTIONS ============== */
/* ================================================== */

// Function that creates a deck of cards, used by createNewDeck function -> similar to the makeDeck function //create deck
var makeDeck = function () {
  // deck array
  var cardDeck = [];
  // for 'while loop' to create suits for cards
  var suits = ["♦️", "♣️", "♥️", "♠️"];
  var suitsIndex = 0;
  while (suitsIndex < suits.length) {
    var currentSuit = suits[suitsIndex];
    // 13 ranks... ace to king - rank to define "card positions"
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
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
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitsIndex += 1;
  }
  return cardDeck;
};

// Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Function that shuffles a deck, used by createNewDeck function
var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);

    var randomCard = cardDeck[randomIndex];

    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex += 1;
  }
  return cardDeck;
};

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// Function that checks a hand for black jack
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
    currentGameMode == resultsShownMode;
  }

  return isBlackJack;
};

// Function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // Counter to keep track of the number of aces found within the given hand
  var aceCounter = 0;

  // Loop through player or dealers hand and add up the ranks
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // In blackjack, the value of king, queen, and jack are counted as 10 by default
    if (
      currentCard.name == "king" ||
      currentCard.name == "queen" ||
      currentCard.name == "jack"
    ) {
      totalHandValue = totalHandValue + 10;
    }
    // We count the value of ace as 11 by default
    else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter += 1;
      // Else, all other numbered cards are valued by their ranks
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index += 1;
  }

  // Reset index for ace counter
  index = 0;
  // Loop for the number of aces found and only deduct 10 from total hand value
  // when totalHandValue is more than 21.
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index += 1;
  }

  return totalHandValue;
};

var displayPlayerAndComputerHands = function (
  playerHandArray,
  computerHandArray
) {
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
    index += 1;
  }

  index = 0;
  var computerMessage = "Computer hand:<br>";
  while (index < computerHandArray.length) {
    computerMessage =
      computerMessage +
      "- " +
      computerHandArray[index].name +
      " of " +
      computerHandArray[index].suit +
      "<br>";
    index += 1;
  }

  return playerMessage + "<br>" + computerMessage;
};

var displayHandTotalValues = function (playerHandValue, computerHandValue) {
  var totalHandValueMessage =
    "<br><br>Your hand value: " +
    playerHandValue +
    "<br><br>Computer hand value: " +
    computerHandValue;
  return totalHandValueMessage;
};

//==========================================

var main = function (input) {
  var outputMessage = "";

  // FIRST CLICK
  if (currentGameMode == startGameMode || currentGameMode == resultsShownMode) {
    // create a game deck

    // increase the number of games by 1
    numberOfGames = numberOfGames + 1;
    gameDeck = createNewDeck();

    console.log(gameDeck);

    //reset the 2 hand cards available for player and computer when game restarts.
    playerHand = [];
    computerHand = [];
    // deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());

    // check player and dealer cards
    console.log("Player Hand ==>");
    console.log(playerHand);
    console.log("Computer Hand ==>");
    console.log(computerHand);

    // update gameMode
    currentGameMode = cardsDrawnMode;

    // reassign output message
    outputMessage =
      'Everyone has been dealt a card. Click "Submit" button to proceed! <br><br><br>' +
      "No. of Games: " +
      numberOfGames +
      "<br><br> No. of Computer Wins: " +
      numberOfComputerWins +
      "<br><br> No. of Player Wins: " +
      numberOfPlayerWins +
      "<br><br> Your Current Winning Percentage: " +
      playerWinningPercentage +
      "%";

    // return message
    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == cardsDrawnMode) {
    // check for blackjack
    var playerBlackJack = checkForBlackJack(playerHand);
    var computerBlackJack = checkForBlackJack(computerHand);

    console.log("Does Player have Black Jack? ==>", playerBlackJack);
    console.log("Does Dealer have Black Jack? ==>", computerBlackJack);

    // Condition when either player or dealer has black jack
    if (playerBlackJack == true || computerBlackJack == true) {
      // Condition where both have black jack

      if (playerBlackJack == true && computerBlackJack == true) {
        outputMessage =
          displayPlayerAndComputerHands(playerHand, computerHand) +
          "<br>TIE! Both Player and Computer have Black Jack!";
      }
      // Condition when only player has black jack
      else if (playerBlackJack == true && computerBlackJack == false) {
        numberOfPlayerWins += 1;

        outputMessage =
          displayPlayerAndComputerHands(playerHand, computerHand) +
          "<br>Congratulations Player! You have won by Black Jack!";
      }
      // Condition when only dealer has black jack
      else {
        numberOfComputerWins += 1;

        outputMessage =
          displayPlayerAndComputerHands(playerHand, computerHand) +
          "<br>Better Luck Next Time, Computer have won by Black Jack!";
      }
    } else if (calculateTotalHandValue(playerHand) > 14) {
      outputMessage =
        displayPlayerAndComputerHands(playerHand, computerHand) +
        "<br> No Black Jack detected from Player and Computer, but Wow it's getting close to 21. <br><br>, Player sum is now " +
        calculateTotalHandValue(playerHand) +
        ".<br><br>" +
        'Please input "1" for hit or "2" for stand.';

      currentGameMode = hitOrStandMode;
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndComputerHands(playerHand, computerHand) +
        '<br> No Black Jack detected from Player And Computer. <br>Please input "1" for hit or "2" for stand.' +
        "<br><br> Do note that you have a sum of " +
        calculateTotalHandValue(playerHand);

      // update gameMode
      currentGameMode = hitOrStandMode;
    }
    console.log(gameDeck.length, +" cards left.");
    // return message
    return outputMessage;
  }

  // THIRD CLICK
  if (currentGameMode == hitOrStandMode) {
    // HIT
    if (input == "1") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndComputerHands(playerHand, computerHand) +
        '<br> You drew another card. <br>Please input "1" for hit or "2" for stand. <br><br> Your sum now is ' +
        calculateTotalHandValue(playerHand);

      {
        if (calculateTotalHandValue(playerHand) > 21) {
          outputMessage =
            displayPlayerAndComputerHands(playerHand, computerHand) +
            "You have lost. <br><br>" +
            "You have now a sum of " +
            calculateTotalHandValue(playerHand) +
            "<br><br> and now you have bust above 21. <br><br> Press Submit again to restart the game.";

          numberOfComputerWins += 1;

          currentGameMode = resultsShownMode;
        }
      }
    }

    // STAND
    else if (input == "2") {
      // Calculate hands
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var computerHandTotalValue = calculateTotalHandValue(computerHand);

      // Dealer's hit or stand logic
      while (computerHandTotalValue < 17) {
        computerHand.push(gameDeck.pop());
        computerHandTotalValue = calculateTotalHandValue(computerHand);
      }

      //Tie same value

      if (playerHandTotalValue == computerHandTotalValue) {
        outputMessage =
          displayPlayerAndComputerHands(playerHand, computerHand) +
          "<br><br> TIE! Both you and computer has the same value! " +
          displayHandTotalValues(playerHandTotalValue, computerHandTotalValue) +
          " <br> Press Summit again to restart.";

        currentGameMode = resultsShownMode;
      }

      // both user and computer bust
      else if (playerHandTotalValue > 21 && computerHandTotalValue > 21) {
        outputMessage =
          displayPlayerAndComputerHands(playerHand, computerHand) +
          "<br>TIE! You have bost bust through 21." +
          displayHandTotalValues(playerHandTotalValue, computerHandTotalValue) +
          "<br><br> Press Submit again to restart.";

        currentGameMode = resultsShownMode;
      }

      // winning conditions for player -> Player has higher value than computer while >21 or player is =<21 and computer bust 21.
      else if (
        (playerHandTotalValue > computerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && computerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndComputerHands(playerHand, computerHand) +
          "<br>Congratulations Player! You have won!" +
          displayHandTotalValues(playerHandTotalValue, computerHandTotalValue) +
          "<br><br>Press Submit again to restart.";
        currentGameMode = resultsShownMode;
        numberOfPlayerWins += 1;
      }

      // Dealer wins when above two conditions are not met
      else {
        outputMessage =
          displayPlayerAndComputerHands(playerHand, computerHand) +
          "<br>Tough luck, Computer wins! Better luck next time, Player!" +
          displayHandTotalValues(playerHandTotalValue, computerHandTotalValue) +
          "<br><br> Press Submit again to restart.";
        currentGameMode = resultsShownMode;
        numberOfComputerWins += 1;
      }
      // update game mode - GAME_RESULTS_SHOWN is not used in this base example
      // However, you may wish to implement your own game modes for further functionality
      // i.e. going back to GAME_START to loop the game
    }

    // Input validation when player inputs anything outside of 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndComputerHands(playerHand, computerHand) +
        '<br><br>Invalid input, please select "1" for Hit or "2" for Stand.';
    }

    // return output message
    return outputMessage;
  }
};
