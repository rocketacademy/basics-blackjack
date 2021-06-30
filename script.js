var playerNum = 1;
var arrangeOrder = false;
var diceOne = "";
var diceTwo = "";
var playerOneScore = 0;
var playerTwoScore = 0;
var currentplayer = 0;
var scoreBoard = 0;
var gameMode = "";
var gameModechosen = false;
var NumberOfPlayersChosen = false;
var numberOfPlayers = 0;
var list = [];
var firstRound = true;

var main = function (input) {
  //Arranging the order of dice is false initially and player just roll dice
  var diceResults = 0;
  var highestCombinedNumber = 0;
  var playeraction = "";
  var lowestCombinedNumber = 0;
  var finalScoreboard = "";
  var sortedList = "";

  // select game mode
  if (input == "normal" || input == "reversed" || input == "knockout") {
    gameMode = input;
    list = [];

    gameModechosen = true;
    return `You have chosen ${gameMode} mode. Choose the number of players.`;
  }

  // select number of players
  if (gameModechosen == true && !NumberOfPlayersChosen) {
    numberOfPlayers = input;
    playerNum = 1;
    NumberOfPlayersChosen = true;
    return `You have selected ${numberOfPlayers} players. For Player 1, enter the number of dice you want to roll.`;
  }
  // Play game in normal or knockout gamemodes
  if (
    gameMode == "normal" ||
    (gameMode == "knockout" &&
      gameModechosen == true &&
      NumberOfPlayersChosen == true)
  ) {
    if (input == 0 || input == 1) {
      input = 2;
    }
    diceResults = rollTheDice(input);
    highestCombinedNumber = selectionSort(diceResults, gameMode);
    combinedScoring = combinedScore(highestCombinedNumber);
    playeraction = playerAction(diceResults, input, combinedScoring, gameMode);
    console.log(playeraction);

    //running normal gamemode
    if (gameMode == "normal") {
      //Add array of objects to a list when list is empty
      if (firstRound == true) {
        //Array of Objects - Combine player string and score together
        var scoreBoard = {
          player: `Player ${playerNum}`,
          score: combinedScoring,
        };
        list.push(scoreBoard);
      } else {
        list[playerNum - 1].score += combinedScoring;
      }
      //Store an existing list in a new list to be used for sorting
      sortedList = [...list];

      finalScoreboard = finalScoreboardStatement(
        selectionSortForScoreboard(sortedList, gameMode)
      );

      var output = `Welcome Player ${playerNum} <br> ${playeraction}. <br><br> ${sortedList[0].player} is the winner!<br>${finalScoreboard} `;
      playerNum++;
      if (playerNum - 1 == numberOfPlayers) {
        console.log("read");
        playerNum = 1;
        firstRound = false;
      }
      return output;
    }
    //running knockout gamemode
    if (gameMode == "knockout") {
      var scoreBoard = {
        player: `Player ${playerNum}`,
        score: combinedScoring,
      };
      console.log(scoreBoard);
      list.push(scoreBoard);

      console.log(list[0].score);
      //initate the first round
      if (playerNum == 1) {
        playerNum++;
        return `${list[0].player} is the winner. <br> ${playeraction}. <br><br> Your Score is ${list[0].score}<br> It is player ${playerNum}'s turn.`;
      }
      console.log(playerNum);
      //compare if second player is higher than first player
      if (list[1].score > list[0].score) {
        playerNum++;
        if (playerNum > numberOfPlayers) {
          var insert = "<br>The game has ended.";
        } else {
          var insert = `<br> It is player ${playerNum}'s turn.`;
        }

        var output = `You are ${list[1].player}.<br><br>${list[1].player} is the winner. <br> ${playeraction}. <br><br> ${list[1].player} score is ${list[1].score}<br>${list[0].player} score is ${list[0].score}.`;
        list[0] = list[1];
        list.pop(scoreBoard);
        console.log(list);

        return output + insert;
      }
      //compare if first player is higher than second player.
      if (list[0].score > list[1].score) {
        playerNum++;
        if (playerNum > numberOfPlayers) {
          var insert = "<br>The game has ended.";
        } else {
          var insert = `<br> It is player ${playerNum}'s turn.`;
        }
        var output = `You are ${list[1].player}.<br><br> ${list[0].player} is the winner. <br> ${playeraction}. <br><br> ${list[0].player} score is ${list[0].score}<br>${list[1].player} score is ${list[1].score}.`;
        list.pop(scoreBoard);

        return output + insert;
      }

      if (playerNum - 1 == numberOfPlayers) {
        return `The knockout game has ended <br> ${list[0].player} is the overall winner with a score of ${list[0].score}. `;
      } else return "Roll again.";
    }
  }

  //Play game in reversed gamemode
  if (
    gameMode == "reversed" &&
    gameModechosen == true &&
    NumberOfPlayersChosen == true
  ) {
    if (input == 0 || input == 1) {
      input = 2;
    }
    diceResults = rollTheDice(input);
    lowestCombinedNumber = selectionSort(diceResults, gameMode);
    combinedScoring = combinedScore(lowestCombinedNumber);
    playeraction = playerAction(diceResults, input, combinedScoring, gameMode);

    if (firstRound == true) {
      var scoreBoard = {
        player: `Player ${playerNum}`,
        score: combinedScoring,
      };
      list.push(scoreBoard);
    } else {
      list[playerNum - 1].score += combinedScoring;
    }
    sortedList = [...list];

    finalScoreboard = finalScoreboardStatement(
      selectionSortForScoreboard(sortedList, gameMode)
    );
    var output = `Welcome Player ${playerNum} <br> ${playeraction}. <br><br> ${sortedList[0].player} is the winner!<br>${finalScoreboard} `;
    playerNum++;
    if (playerNum - 1 == numberOfPlayers) {
      console.log("read");
      playerNum = 1;
      firstRound = false;
    }
    return output;
  } else return `Choose your gamemode: normal, reversed or knockout.`;
};

// arrangeOrder = true;

// }

// if (arrangeOrder == true) {
//   switchPlayercalculateScore(playerNum, combinedScoring);
//   return output;
// }
// //Arranging the order of dice
// if (arrangeOrder == true) {
//   var scoring = arrangeDice(input);
//   var statementOne = scoring;
//   if (!isNaN(scoring)) {
//     switchPlayercalculateScore(playerNum, scoring);

//     if (playerOneScore > playerTwoScore) {
//       statementOne = `Player ${currentplayer}, You chose order ${input} first <br> Your number is ${scoring}. <br><br> Player 1 score: ${playerOneScore}<br>Player 2 score: ${playerTwoScore}<br><br>It is now Player ${playerNum}'s turn.`;
//       return statementOne;
//     }
//     if (playerTwoScore > playerOneScore) {
//       statementOne = `Player ${currentplayer}, You chose order ${input} first <br> Your number is ${scoring}. <br><br> Player 2 score: ${playerTwoScore}<br>Player 1 score: ${playerOneScore}<br><br>It is now Player ${playerNum}'s turn.`;
//       return statementOne;
//     }
//   } else return statementOne;
// }

//Roll the dice
var diceroll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceOutcome = randomInteger + 1;
  return diceOutcome;
};

//Output player dice results and combined number
var playerAction = function (
  diceResults,
  numberOfRolls,
  combinedScoring,
  gameMode
) {
  //Initiate results for first roll.
  var returnStatement = `You rolled ${diceResults[0]} for Dice 1 `;
  var finalStatement = "";
  //repeat statements for subsequent rolls
  if (gameMode == "normal" || gameMode == "knockout") {
    for (i = 1; i < numberOfRolls; i++) {
      returnStatement += `and ${diceResults[i]} for Dice ${i + 1} `;
    }

    finalStatement =
      returnStatement +
      ".<br> Your highest combined number is " +
      combinedScoring;

    return finalStatement;
  }
  if (gameMode == "reversed") {
    for (i = 1; i < numberOfRolls; i++) {
      returnStatement += `and ${diceResults[i]} for Dice ${i + 1} `;
    }

    finalStatement =
      returnStatement +
      ".<br> Your lowest combined number is " +
      combinedScoring;
    return finalStatement;
  }
};
//List of dice results
var rollTheDice = function (numberOfRolls) {
  var diceResults = [];
  for (i = 0; i < numberOfRolls; i++) {
    rolldice = diceroll();
    diceResults.push(rolldice);
  }

  return diceResults;
};

//Switch player and calculate score of each player
var switchPlayercalculateScore = function (number, score) {
  if (number == 1) {
    currentplayer = 1;
    playerNum = 2;
    playerOneScore += score;
  } else if (number == 2) {
    currentplayer = 2;
    playerNum = 1;
    playerTwoScore += score;
  }

  return currentplayer;
};

//Sort the score according to order
var selectionSort = function (diceResults, gameMode) {
  //Sort the score according to DESC order
  if (gameMode == "normal" || gameMode == "knockout") {
    for (var i = 0; i < diceResults.length; i++) {
      //set min to the current iteration of i
      var min = i;
      for (var j = i + 1; j < diceResults.length; j++) {
        if (diceResults[j] > diceResults[min]) {
          min = j;
        }
      }
      var temp = diceResults[i];
      diceResults[i] = diceResults[min];
      diceResults[min] = temp;
    }
    return diceResults;
  }
  //Sort the score according to ASC order
  if (gameMode == "reversed") {
    for (var i = 0; i < diceResults.length; i++) {
      //set min to the current iteration of i
      var min = i;
      for (var j = i + 1; j < diceResults.length; j++) {
        if (diceResults[j] < diceResults[min]) {
          min = j;
        }
      }
      var temp = diceResults[i];
      diceResults[i] = diceResults[min];
      diceResults[min] = temp;
    }
    return diceResults;
  }
};

//Change score from array to Score
var combinedScore = function (array) {
  var combinedScore = 0;
  var j = 0;

  for (i = array.length - 1; i >= 0; i--) {
    combinedScore += Math.pow(10, i) * array[j];
    j++;
  }

  return combinedScore;
};

//Sort the score according to  order
var selectionSortForScoreboard = function (listing, gameMode) {
  //Sort the score according to DESC order
  if (gameMode == "normal") {
    for (var i = 0; i < listing.length; i++) {
      //set min to the current iteration of i
      var min = i;
      for (var j = i + 1; j < listing.length; j++) {
        if (listing[j].score > listing[min].score) {
          min = j;
        }
      }
      var temp = listing[i];
      listing[i] = listing[min];
      listing[min] = temp;
    }
    console.log(listing);
    return listing;
  }

  //Sort the score according to ASC order
  if (gameMode == "reversed") {
    for (var i = 0; i < listing.length; i++) {
      //set min to the current iteration of i
      var min = i;
      for (var j = i + 1; j < listing.length; j++) {
        if (listing[j].score < listing[min].score) {
          min = j;
        }
      }
      var temp = listing[i];
      listing[i] = listing[min];
      listing[min] = temp;
    }
    return listing;
  }
};

//Print statement for final scoreboard
var finalScoreboardStatement = function (finalList) {
  var statement = "";
  for (i = 0; i < finalList.length; i++) {
    statement += `${finalList[i].player} Score: ${finalList[i].score} <br>`;
  }

  return statement;
};
// Arrange dice
// var arrangeDice = function (input) {
//   if (input == 1) {
//     console.log("read");
//     firstNum = diceOne;
//     secondNum = diceTwo;
//     arrangeOrder = false;
//   }
//   if (input == 2) {
//     firstNum = diceTwo;
//     secondNum = diceOne;
//     arrangeOrder = false;
//   }
//   if (input != 1 && input != 2) {
//     return `Please enter 1 or 2.`;
//   }
//   score = firstNum * 10 + secondNum;
//   return score;
// };

//roll the dice
