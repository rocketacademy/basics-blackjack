// Create a function for drawing cards to compare the drawn card to whats in the discardPile array
// return true or false
// if true, run draw card function again
// Only if result is false, then proceed with removing card from deck.
// When a card is picked out, the card is removed from the deck. (.splice)
// This card is also pushed into a discardPile array
var playerOneHand = [];
var computerHand = [];
var discardPile = [];
var newCardPlayerArray = [];
var newCardComputerArray = [];
var playerOneModeInitial = true;
var computerModeInitial = false;
var playerOneModeDrawingMode = false;
var computerDrawingMode = false;
var declarationMode = false;
var comFinalScore = 0;
var playerTrialScore = 0;

// Function that compares drawn card to discardPile array
var compareToDiscardPile = function (drawnCard) {
  var discardCounter = 0;
  var compareDiscardResult = false;
  while (discardCounter > discardPile.length) {
    if (drawnCard == discardPile[discardCounter]) {
      compareDiscardResult = true;
    }
    discardCounter++;
  }
  console.log("comparetoDiscardPile Check");
  return compareDiscardResult;
};

// Makes a random number
var MakeARandomNumber = function () {
  randomDigit = Math.floor(Math.random() * 51);
  return randomDigit;
};

// Generates a full 52 card Deck
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
        value = 1;
        cardName = "ace";
      } else if (cardName == 11) {
        value = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        value = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        value = 10;
        cardName = "king";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardName,
        true: cardName + " of " + currentSuit,
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

// Draws a card from the deck and pushes it up to playerOneHand's array.
var drawingPlayerOneCard = function () {
  var checkResult = false;
  // If checkResult is false, draw a card, and run compareToDiscardPile(). If true, discardPile.pop, and function is looped. If false, push card to playerOneHand's array.
  while (checkResult == false) {
    var p1Digit = MakeARandomNumber();
    var p1Draw = createdDeck[p1Digit];
    discardPile.push(p1Draw);
    if (compareToDiscardPile(p1Draw) == true) {
      discardPile.pop;
    } else {
      checkResult = true;
    }
  }
  playerOneHand.push(p1Draw);
  console.log("drawingPlayerOneCard Check");

  return p1Draw;
};

// Draws a card from the deck and pushes it up to computerHand's array.
var drawingComputerCard = function () {
  var checkResult = false;
  // If checkResult is false, draw a card, and run compareToDiscardPile(). If true, discardPile.pop, and function is looped. If false, push card to computerHand's array.
  while (checkResult == false) {
    var comDigit = MakeARandomNumber();
    var comDraw = createdDeck[comDigit]; //continually draws a card until it has eliminated all matches to discard pile;

    discardPile.push(comDigit);
    if (compareToDiscardPile(comDigit) == true) {
      discardPile.pop;
    } else {
      checkResult = true;
    }
  }
  computerHand.push(comDraw);
  console.log("drawingComputerCard Check");
  console.log("computerHand");
  console.log(computerHand);
  return comDraw;
};

// drawStartCardsPlayer1 - Runs when playerOneModeInitial = true. When playerOneHand.length = 2, function ends. When function ends, playerOneModeInitial = false
var drawStartCardsPlayer1 = function () {
  while (playerOneHand.length < 2) {
    drawingPlayerOneCard();
  }
  var playerStatement =
    "Your cards are : <br>" +
    playerOneHand[0].true +
    "<br>" +
    playerOneHand[1].true;
  playerOneModeInitial = false;
  computerModeInitial = true;
  return playerStatement;
};

// drawStartCardsCom - Runs when computerModeInitial = true. When computerHand.length = 2, function ends. When function ends, computerModeInitial = false
var drawStartCardsCom = function () {
  while (computerHand.length < 2) {
    drawingComputerCard();
  }
  var computerStatement =
    "The Dealer has drawn his hand. <br><br> Your cards are: <br> " +
    playerOneHand[0].true +
    "<br>" +
    playerOneHand[1].true +
    "<br><br> Draw again?<br><br> If not, type NO";
  computerModeInitial = false;
  playerOneModeDrawingMode = true;
  return computerStatement;
};

// Calls the function into a generated deck
var createdDeck = makeDeck();

// Sums up the total score of the player's Hand
var CalculatePlayerOneSum = function () {
  var p1SumCounter = 0;
  while (p1SumCounter < playerOneHand.length) {
    var playerScore = playerScore + playerOneHand[p1SumCounter];
    p1SumCounter++;
  }
  return playerScore;
};

// Generates a new card to the player's hand, compares it to discard pile. Will return/announce all cards in player's hand
var generateCardForPlayerOne = function () {
  var newCard = drawingPlayerOneCard();

  newCardPlayerArray.push(newCard.true);
  var showPlayerHand =
    "Your cards are: <br><br>" +
    playerOneHand[0].true +
    "<br>" +
    playerOneHand[1].true +
    "<br><br> Drawn cards are: <br>" +
    newCardPlayerArray +
    "<br><br>Click to Draw again, enter NO to end your turn";
  return showPlayerHand;
};

// This is the last turn. It Generates a new card to the Computer's hand, compares it to discard pile. Will return/announce all cards in Computer's hand
var generateCardForComputer = function () {
  var scoreCounter = 0;
  var outerCounter = 0;
  var comScoreArray = [];
  while (outerCounter < computerHand[outerCounter].length) {
    // If trueScore is lesser than 15, run drawingComputerCard function
    if (comFinalScore >= 21) {
      // stopper
      outerCounter = computerHand.length;
    }
    drawingComputerCard();
    while (scoreCounter < computerHand.length) {
      // This is to continually push the key-value into the comScoreArray
      if (computerHand[scoreCounter].rank > 10) {
        computerHand[scoreCounter].value = 10;
      }
      scoreCounter++;
      comScoreArray.push(computerHand[scoreCounter].value);
    }
    comFinalScore = comFinalScore + comScoreArray[scoreCounter];
  }
  var showComHand = "Computer has a score of: " + comFinalScore;
  return showComHand;
};

// sets up a declare mode that runs once the computer's totalScore is shown. If below 22, and above player's totalScore. computer wins. Else, player wins.
var declareTheWinner = function () {
  var p1Score = CalculatePlayerOneSum();
  console.log("p1Score: " + p1Score);
  if (comFinalScore < 22 && comFinalScore > p1Score) {
    var declareResult =
      "The winner is the Computer with a score of: " + comFinalScore;
  } else {
    declareResult = "The winner is the player with a score of: " + p1Score;
  }
  return declareResult;
};

//_______MAIN FUNCTION___________
var main = function (input) {
  var myOutputValue = "Default Answer";
  if (declarationMode == true) {
    myOutputValue = declareTheWinner();
  }
  if (computerDrawingMode == true) {
    myOutputValue = generateCardForComputer();
    computerDrawingMode = false;
    declarationMode = true;
  }
  if (playerOneModeDrawingMode == true) {
    if (input == "NO") {
      playerOneModeDrawingMode = false;
      computerDrawingMode = true;
      myOutputValue = "Understood. Your turn will end";
    } else {
      myOutputValue = generateCardForPlayerOne();
    }
  }
  if (computerModeInitial == true) {
    myOutputValue = drawStartCardsCom();
  }
  if (playerOneModeInitial == true) {
    myOutputValue = drawStartCardsPlayer1();
  }
  return myOutputValue;
};
//_____MAIN FUNCTION END_________
