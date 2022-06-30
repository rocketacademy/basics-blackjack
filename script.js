// GLOBAL VARIABLES
// current player
var currentPlayer = "0";
// number of players
var numOfPlayers = "number of players";

// OBJECTS/ ARRAYS
// card deck - stores entire deck of unshuffled cards
var deck = [];
// current player hand - stores current player hand
var currentPlayerHand = [];
// individual player statistics
var allPlayerStatistics = [];
// dealer hand
var computerHand = [];

// GAME MODES
// player number input
var gameModeNumOfPlayers = "input numOfPlayers";
// player bets
// var gameModePlaceBets = "place bets";
var gameModeCurrentPlayerTurn = "current player turn";
// player number decision
// var gameModeCurrentPlayerDecision = "current player decision";
// game mode player change
// var gameModeChangePlayer = " change player turn";
// computer decision
var gameModeComputerTurn = "computer turn";
// compare scores
var gameModeCompareScores = "compare scores";
// default starting game mode where all arrays are empty/reset
var gameModeReset = "reset";
var gameMode = gameModeReset;

// ******** START CARD HELPER FUNCTIONS START *******
// Create a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["spades", "hearts", "clubs", "diamonds"];
  // suitValue helps compare suit superiority
  var suitValue = [4, 3, 2, 1];
  // card value is the score we compare against player vs computer. index [0] is Ace/1 where this is not read by the code generating the deck, index [1] for Ace is default cardValue of 11.
  var cardValue = [1, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // Store the current suit value in a variable
    var currentSuitValue = suitValue[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // Store the current card value in a variable
      var currentCardValue = cardValue[rankCounter];

      // rankCounter determines name of card
      var cardName = rankCounter;
      // If rank is 1, 11, 12, 13 set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      // Create a new card with the current name, suit, suitValue, rankCounter/name of card in number value and cardValue
      var card = {
        name: cardName,
        suit: currentSuit,
        suitValue: currentSuitValue,
        rank: rankCounter,
        cardValue: currentCardValue,
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

// Get a random index ranging from 0 (inclusive) to max (exclusive) - used in shuffleCards()
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

// draw one random card
var drawOneCard = function (shuffledDeck) {
  var oneRandomCard = shuffledDeck.pop();
  return oneRandomCard;
};

// draw player hand function uses pop to get 2 random cards out of shuffleddeck.
var drawStartingPlayerHand = function (shuffledDeck) {
  currentPlayerHand.push(drawOneCard(shuffledDeck));
  currentPlayerHand.push(drawOneCard(shuffledDeck));
};

// draw player hand function uses pop to get 1 random cards out of shuffleddeck.
var hitPlayerHand = function (shuffledDeck) {
  currentPlayerHand.push(drawOneCard(shuffledDeck));
};

// computer hand function draws 2 random cards from shuffleddeck
var drawStartingComputerHand = function (shuffledDeck) {
  computerHand.push(drawOneCard(shuffledDeck));
  computerHand.push(drawOneCard(shuffledDeck));
};

// calculates total sum of computer hand array, checks for ace value, stores to all player statistics index [0]
var calculateComputerHand = function () {
  // calculates sum of computerhandarray
  var sumOfComputerHandArray = 0;

  for (var cardIndex = 0; cardIndex < computerHand.length; cardIndex += 1) {
    sumOfComputerHandArray = Math.floor(
      sumOfComputerHandArray + computerHand[cardIndex].cardValue
    );

    // conditional ace value function NOT WORKING

    var numOfAces = 0;
    if (computerHand[cardIndex].rank == 1) {
      numOfAces = numOfAces + 1;
    }

    for (var index = 0; index < numOfAces; index += 1) {
      if (sumOfComputerHandArray > 21) {
        sumOfComputerHandArray = sumOfComputerHandArray - 10;
      }
    }
  }
  return sumOfComputerHandArray;
};

////////// computerhand function not working /////////////
// check sumofcomputerhandarray and stores result to allplayerstatistics[0]
// var checkComputerHand = function () {
//   var myOutputValue = "";
//   var sumOfComputerHandArray = calculateComputerHand();
//   if (computerHand.length == 2 && sumOfComputerHandArray == 21) {
//     myOutputValue = `DEALER BLACKJACK! Dealer drew ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}.`;
//     allPlayerStatistics[0].playerName = "Dealer";
//     allPlayerStatistics[0].totalSum = "blackjack";
//     gameMode = gameModeCompareScores;
//     console.log("dealerblackjack");
//     return myOutputValue;
//   }
//   // check if >=17 && <21 = stand
//   else if (sumOfComputerHandArray >= 17 && sumOfComputerHandArray <= 21) {
//     // myOutputValue = displayComputerHand`which comes up to ${sumOfComputerHandArray}`;
//     myOutputValue = ______();
//     console.log(myOutputValue);
//     console.log("dealer stand");
//     gameMode = gameModeCompareScores;
//     return myOutputValue;
//   }

//   // check if <=16, hit until <=21
//   else if (sumOfComputerHandArray < 17) {
//     computerHand.push(drawOneCard(shuffledDeck));
//     // myOutputValue = displayComputerHand`which comes up to (${sumOfComputerHandArray})`;
//     myOutputValue = _________();
//     console.log(myOutputValue);
//     console.log("dealer hand less than 17, should hit until 21");
//     return myOutputValue;
//   }
//   // check if >21 = bust
//   else {
//     allPlayerStatistics[0].totalSum = "bust";
//     myOutputValue = "dealer busts!";
//     console.log("dealer busts");
//     gameMode = gameModeCompareScores;
//     return myOutputValue;
//   }
// };
////////// computer hand function not working CONTROL FLOW ISSUE ///////////

// ******** END CARD HELPER FUNCTIONS END *******

// ****** START GAME MODE/MAIN HELPER FUNCTIONS START *****
// game mode = gamemodenumofplayers, input validation to check number of players is a number, not isnan
var checkNumOfPlayers = function (input) {
  if (input == isNaN || input > 11) {
    return (myOutputValue = `Your input is invalid. Please enter the number of players playing today.`);
  } else {
    numOfPlayers = input;
    return numOfPlayers;
  }
};

// game mode = gamemodenumofplayers, push number of players to create player names and 100 points per player. array starts at index 1 for player 1.
var createPlayerProfiles = function (numOfPlayers) {
  // for loop to run player counter and increment to max of numOfPlayers,  setting up each player 1 to numOfPlayers with 100 points - betting NOT COMPLETED -
  for (
    var playerCounter = 0;
    playerCounter <= numOfPlayers;
    playerCounter += 1
  ) {
    var playerNameValue = playerCounter;
    var currentPlayerTokens = 100;
    var sumOfCards = 0;
    // var card = {
    //   name: cardName,
    //   suit: currentSuit,
    //   suitValue: currentSuitValue,
    //   rank: rankCounter,
    //   cardValue: currentCardValue,
    // };

    //creates new player in an object array at index 0

    var player = {
      playerName: playerNameValue,
      tokens: currentPlayerTokens,
      totalSum: sumOfCards,
    };

    // pushes individual player stat into all player stats within the loop
    allPlayerStatistics.push(player);
  }

  return allPlayerStatistics;
};

// prints current player hand to myoutputvalue
var displayCurrentPlayerHand = function (currentPlayerHand) {
  var printCurrentPlayerHand = "";
  for (var index = 0; index < currentPlayerHand.length; index += 1) {
    var cardsOfCurrentPlayerHand = `${currentPlayerHand[index].name} of ${currentPlayerHand[index].suit}<br>`;
    printCurrentPlayerHand = printCurrentPlayerHand + cardsOfCurrentPlayerHand;
  }
  return `Player ${currentPlayer}, you have drawn ${printCurrentPlayerHand}`;
};

var displayComputerHand = function (computerHand) {
  var printComputerHand = "";
  for (var index = 0; index < computerHand.length; index += 1) {
    var cardsOfComputerHand = `${computerHand[index].name} of ${computerHand[index].suit}<br>`;
    printComputerHand = printComputerHand + cardsOfComputerHand;
  }
  return `Dealer has drawn ${printComputerHand}`;
};

// var allocateCurrentPlayerHandToAllPlayerStats = function(){
// }

// var displayAllPlayerStatistics = function () {
//   var printAllPlayerStatistics = "";
//   for (playerIndex = 1; playerIndex < allPlayerStatistics.length; playerIndex += 1) {
//     var allPlayerHands = `${allPlayerStatistics[playerIndex].name} of ${allPlayerStatistics[playerIndex].suit}<br>`;
//     printAllPlayerStatistics = printAllPlayerStatistics + allPlayerHands;
//     console.log(printAllPlayerStatistics);
//   }
//   return `Player ${currentPlayer}, you have drawn ${printAllPlayerStatistics}`;
// };

// game mode reset all DOESN'T WORK >.<
var resetAllGameMode = function () {
  gameMode = gameModeReset;
  if (gameMode == "reset") {
    currentPlayer = "0";
    numOfPlayers = "input numofPlayers";
    deck = [];
    shuffledDeck = [];
    computerHand = [];
    currentPlayerHand = [];
    allPlayerStatistics = [];
    return `The game has been reset.`;
  }
};

// ****** END GAME MODE/MAIN HELPER FUNCTIONS END *****

// ****** START MATH FUNCTIONS START *****

var calculateTotalHand = function () {
  var totalSumOfCurrentPlayerHandArray = 0;

  for (
    var cardIndex = 0;
    cardIndex < currentPlayerHand.length;
    cardIndex += 1
  ) {
    totalSumOfCurrentPlayerHandArray = Math.floor(
      totalSumOfCurrentPlayerHandArray + currentPlayerHand[cardIndex].cardValue
    );

    // conditional ace value function NOT WORKING

    var numOfAces = 0;
    if (currentPlayerHand[cardIndex].rank == 1) {
      numOfAces = numOfAces + 1;
    }

    for (var index = 0; index < numOfAces; index += 1) {
      if (totalSumOfCurrentPlayerHandArray > 21) {
        totalSumOfCurrentPlayerHandArray =
          totalSumOfCurrentPlayerHandArray - 10;
      }
    }
  }

  allPlayerStatistics[currentPlayer].totalSum =
    totalSumOfCurrentPlayerHandArray;

  return totalSumOfCurrentPlayerHandArray;
};

var checkPlayerScore = function () {
  //player blackjack only if 2 cards and total card value = 21, payout = 1.5x
  var myOutputValue = "";

  if (
    currentPlayerHand[currentPlayer].length < 2 &&
    allPlayerStatistics[currentPlayer].totalSum == 21
  ) {
    allPlayerStatistics[currentPlayer].totalSum = "blackjack";
    myOutputValue = `BLACKJACK!`;

    return myOutputValue;
    // player 777 payout =7x
  } else if (
    currentPlayerHand[0].cardValue == 7 &&
    currentPlayerHand[1].cardValue == 7 &&
    currentPlayerHand[2].cardValue == 7
  ) {
    allPlayerStatistics[currentPlayer].totalSum = "seventimes";
    myOutputValue = `TRIPLE 7 WIN!`;
    return myOutputValue;
  }
  // player 5cardwin payout =2x
  else if (
    currentPlayerHand[currentPlayer].length <= 5 &&
    allPlayerStatistics[currentPlayer].totalSum <= 21
  ) {
    allPlayerStatistics[currentPlayer].totalSum = "fivecardwin";
    myOutputValue = `5 cards less than 21, great hand!`;
    return myOutputValue;
  } else if (allPlayerStatistics[currentPlayer].totalSum > 21) {
    allPlayerStatistics[currentPlayer].totalSum = "bust";
    myOutputValue = `Sorry ${currentPlayer}, you bust! Click submit to start the game again.`;
    //currently only using 1 playermode
    gameMode = gameModeReset;

    resetAllGameMode();
    deck = makeDeck();
    var shuffledDeck = shuffleCards(deck);
    return myOutputValue;
  } else if (allPlayerStatistics[currentPlayer].totalSum < 21);
  myOutputValue = `Please enter h to hit or s to stand and click submit.`;

  return myOutputValue;
};

//

//****** END MATH FUNCTIONS END *****

// generate card deck
// shuffle deck

deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
console.log(shuffledDeck);

var main = function (input) {
  var myOutputValue = "";
  var currentPlayerScore = "";

  // launch screen - instructions are on HTML page. This if statement:
  // 1. creates allPlayerStatistics[]
  // 2. allows user to input number of players
  // 3. output is a prompt for player to click submit to draw starting hand
  if (currentPlayer == 0 && gameMode == "reset") {
    // first input from user requires indication of numofplayers. input validation for any input other than numbers is invalid.
    gameMode = gameModeNumOfPlayers;
    // run input validation function to check that input is a number
    var numOfPlayers = checkNumOfPlayers(input);

    //call function that generates allplayerstats objarray. we need to store .playerName .tokens .sumOfCards
    createPlayerProfiles(numOfPlayers);
    currentPlayer = 1;
    myOutputValue =
      myOutputValue + `welcome player(s)! Click submit to draw your cards. `;
    return myOutputValue;
  }
  console.log(currentPlayer);
  console.log(gameMode);
  //switch game mode from input = number of players to current player turn
  if (currentPlayer == 1 && gameMode == "input numOfPlayers") {
    gameMode = gameModeCurrentPlayerTurn;
  }

  // gamemode = current player turn. the idea is to push currentplayer into all player statistics after the current player turn ends. for loop cycles through all players until each player either wins, busts or hits "s". code is written only for 1 player at the moment. bust = needs hard reset and "s" should prompt computer turn.
  if (currentPlayer == 1 && gameMode == "current player turn") {
    for (var playerIndex = 1; playerIndex < numOfPlayers; playerIndex += 1) {
      currentPlayer = playerIndex;
    }
    if (
      gameMode == "current player turn" &&
      currentPlayer == playerIndex &&
      input == "h"
    ) {
      hitPlayerHand(shuffledDeck);

      calculateTotalHand(currentPlayer);
      currentPlayerScore = checkPlayerScore(currentPlayer);
      myOutputValue = displayCurrentPlayerHand(currentPlayerHand);

      return myOutputValue + currentPlayerScore;
    } else if (
      gameMode == "current player turn" &&
      currentPlayer == playerIndex &&
      input == "s"
    ) {
      myOutputValue = "you've selected Stand! It's the computer's turn.";
      // modify this for including additional players
      // currentPlayerScore = checkPlayerScore(currentPlayer);
      // myOutputValue = displayCurrentPlayerHand();
      // currentPlayerHand = [];
      gameMode = gameModeComputerTurn;
      currentPlayer = "computer";

      return myOutputValue;
    } else if (
      gameMode == "current player turn" &&
      currentPlayer == playerIndex
    ) {
      drawStartingPlayerHand(shuffledDeck);
      drawStartingComputerHand(shuffledDeck);
      calculateTotalHand(currentPlayer);
      currentPlayerScore = checkPlayerScore(currentPlayer);
      myOutputValue = displayCurrentPlayerHand(currentPlayerHand);
      return myOutputValue + currentPlayerScore;
    }
  }

  // game mode changes to computer turn after all player(s) have had a turn.
  gameMode == gameModeComputerTurn;
  console.log(currentPlayer);
  console.log(gameMode);
  if (gameMode == "computer turn" && currentPlayer == "computer") {
    var sumOfComputerHandArray = calculateComputerHand();
    var computerOutcome = "";
    if (computerHand.length == 2) {
      if (sumOfComputerHandArray == 21) {
        computerOutcome = `DEALER BLACKJACK! Dealer drew ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}.`;
        allPlayerStatistics[0].playerName = "Dealer";
        allPlayerStatistics[0].totalSum = "blackjack";
        return computerOutcome;
      }
    }
    if (sumOfComputerHandArray < 16) {
      computerHand.push(drawOneCard(shuffledDeck));
      computerOutcome = displayComputerHand(computerHand);
      sumOfComputerHandArray = calculateComputerHand();
      return computerOutcome;
    } else if (sumOfComputerHandArray >= 17 && sumOfComputerHandArray <= 21) {
      allPlayerStatistics[0].totalSum = sumOfComputerHandArray;
      computerOutcome = displayComputerHand(computerHand);
      gameMode = gameModeCompareScores;

      return computerOutcome;
    } else if (sumOfComputerHandArray > 21) {
      computerOutcome = displayComputerHand(computerHand);
      allPlayerStatistics[0].totalSum = "bust";
      console.log(allPlayerStatistics[0].totalSum);
      gameMode = gameModeCompareScores;
      return computerOutcome;
    }
  }
  console.log(gameMode);

  // scores are compared within the all player statistics array. computer hand is stored at index [0], player 1 at [1] etc. currently hard coded for all the permutations, need to work on functions for each condition.

  console.log(allPlayerStatistics[0].totalSum);
  console.log(allPlayerStatistics[1].totalSum);

  if (gameMode == "compare scores") {
    // for (var playerIndex = 1; playerIndex <= numOfPlayers; playerIndex += 1) {
    //   console.log(myOutputValue);
    if (
      // tie for the following outcomes: dealer blackjack == player(s) blackjack || dealer score == player score.
      //player win blackjack, fivecard and seventimes is an instant win regardless of dealer hand
      (allPlayerStatistics[0].totalSum == "blackjack" &&
        allPlayerStatistics[1].totalSum == "blackjack") ||
      allPlayerStatistics[0].totalSum == allPlayerStatistics[1].totalSum
    ) {
      myOutputValue = "it's a tie!";
      return myOutputValue;
    } else if (
      allPlayerStatistics[0].totalSum > allPlayerStatistics[1].totalSum ||
      (allPlayerStatistics[0].totalSum <= 21 &&
        allPlayerStatistics[1].totalSum == "bust")
    ) {
      myOutputValue = "sorry player loses to dealer";
      console.log(myOutputValue);
      return myOutputValue;
    } else if (
      allPlayerStatistics[0].totalSum < allPlayerStatistics[1].totalSum ||
      (allPlayerStatistics[0].totalSum == "bust" &&
        allPlayerStatistics[1].totalSum <= 21)
    ) {
      myOutputValue = "player wins dealer";
      console.log(myOutputValue);
      return myOutputValue;
    } else if (
      (allPlayerStatistics[0].totalSum =
        "bust" || allPlayerStatistics[0].totalSum <= 21) &&
      (allPlayerStatistics[1].totalSum == "blackjack" ||
        allPlayerStatistics[1].totalSum == "seventimes" ||
        allPlayerStatistics[1].totalSum == "fivecardwin")
    ) {
      myOutputValue = "player wins dealer";
      console.log(myOutputValue);
      return myOutputValue;
    } else if (
      (allPlayerStatistics[0].totalSum =
        "blackjack" ||
        allPlayerStatistics[0].totalSum == "seventimes" ||
        allPlayerStatistics[0].totalSum == "fivecardwin")
    ) {
      myOutputValue = "dealer special win!";
      console.log(myOutputValue);
      return myOutputValue;
    }
  }
  console.log(myOutputValue);
  return myOutputValue;
};
