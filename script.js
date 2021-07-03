// set the different game turns
var GAME_MODE_PLAYER_COUNT = "PLAYER_COUNT";
var GAME_MODE_USERNAME = "USERNAME";
var GAME_MODE_BETTING = "BETTING";
var GAME_MODE_MULTI_PLAYER = "MULTI_PLAYER";
var GAME_MODE_SPLITS = "SPLITS";
var GAME_MODE_DEAL_CARDS = "DEAL_CARDS";
var GAME_MODE_DEAL_COMP_CARDS = "DEAL_COMP_CARDS";
var GAME_MODE_CHOOSE_ACE_VALUE = "CHOOSE_ACE_VALUE";
var GAME_MODE_ANALYSE_CARDS = "ANALYSE_CARDS";
var GAME_MODE_HIT_OR_STAND = "HIT_OR_STAND";
var GAME_MODE_ANALYSE_CARDS_FURTHER = "ANALYSE_CARDS_FURTHER";

// set the first game mode to input username
var gameMode = GAME_MODE_PLAYER_COUNT;

// set different variables and arrays to hold values
var userInput = "";
var currentPlayerIndex = 0;
var playerCount = null;
var playerNames = [];
var playerCards = [];
var allPlayerCards = [];
var computerCards = [];
var playerCard1;
var playerCard2;
var playerCard;
var computerCard1;
var computerCard2;
var computerCard;
var playerCardsTotal = 0;
var allPlayerCardsTotal = [];
var computerCardsTotal = 0;
var numOfPlayerCards = 0;
var allNumOfPlayerCards = [];
var numOfComputerCards = 0;
var playerBankroll = 100;
var playerBankrolls = [];
var computerBankroll = 100;
var playerBets = [];
var computerHasAce = false;
var hasChosenAce1Value = false;
var hasChosenAce2Value = false;
var hasChosenAceValue = false;
var hasPlayerExited = false;
var hasPlayerExitedArray = [];
var hasComputerBust = false;
var hasRoundEnded = false;

var main = function (input) {
  var myOutputValue = "";
  userInput = input;
  console.log(`MAIN - userInput is ${userInput}`);
  console.log(`MAIN - gameMode is ${gameMode}`);

  if (gameMode == GAME_MODE_PLAYER_COUNT) {
    myOutputValue = inputPlayerCount();
    return myOutputValue;
  }
  if (gameMode == GAME_MODE_USERNAME) {
    myOutputValue = inputUsername();
    return myOutputValue;
  } else if (gameMode == GAME_MODE_BETTING) {
    myOutputValue = inputBet();
    return myOutputValue;
  } else if (gameMode == GAME_MODE_DEAL_CARDS) {
    myOutputValue = dealCards();
  } else if (gameMode == GAME_MODE_DEAL_COMP_CARDS) {
    myOutputValue = dealCompCards();
  } else if (gameMode == GAME_MODE_CHOOSE_ACE_VALUE) {
    myOutputValue = chooseAceValue();
  } else if (gameMode == GAME_MODE_ANALYSE_CARDS) {
    myOutputValue = analyseCards();
  } else if (gameMode == GAME_MODE_HIT_OR_STAND) {
    myOutputValue = hitOrStand();
    return myOutputValue;
  } else if (gameMode == GAME_MODE_ANALYSE_CARDS_FURTHER) {
    myOutputValue = analyseCardsFurther();
  }

  return myOutputValue;
};

var inputPlayerCount = function () {
  // user input validation
  if (userInput == "") {
    return `Welcome to ♣️ Blackjack ♠️! Please enter number of players.`;
  }

  // Set player count
  playerCount = userInput;

  // push player bank rolls & game status into arrays
  while (currentPlayerIndex < playerCount) {
    playerBankrolls.push(playerBankroll);
    hasPlayerExitedArray.push(hasPlayerExited);
    currentPlayerIndex += 1;
  }

  // Back to currentPlayerIndex 0
  currentPlayerIndex = 0;

  // Moving on to next stage
  gameMode = GAME_MODE_USERNAME;
  var outputText = `Alright! There will be ${playerCount} players today. Press submit to continue.`;
  return outputText;
};

var inputUsername = function () {
  // First press
  if (userInput == "") {
    return `Input the name of player 1`;
  }

  // Set player names
  while (currentPlayerIndex < playerCount) {
    playerNames[currentPlayerIndex] = userInput;
    currentPlayerIndex += 1;

    if (currentPlayerIndex == playerCount) {
      var outputText = `Moving on to the next stage - Betting. Press to continue.`;

      // Back to currentPlayerIndex 0
      currentPlayerIndex = 0;

      // Moving on to next round
      gameMode = GAME_MODE_BETTING;
      return outputText;
    } else {
      var outputText = `Input the name of player ${currentPlayerIndex + 1}`;
      return outputText;
    }
  }
};

var inputBet = function () {
  console.log(`Player ${currentPlayerIndex + 1} entering inputBet`);
  // First Press
  if (userInput == "") {
    return "Player 1, input your bet";
  }

  // end the game if either the player or the computer has no more points.
  if (playerBankrolls[currentPlayerIndex] == 0) {
    return `You have no points left. Refresh the page to restart the game.`;
  }

  if (computerBankroll <= 0) {
    return `The dealer has no points left. Refresh the page to restart the game.`;
  }

  // Set player bets
  while (currentPlayerIndex < playerCount) {
    playerBets[currentPlayerIndex] = Number(userInput);
    var outputText = `Player ${currentPlayerIndex + 1}, You have ${
      playerBankrolls[currentPlayerIndex]
    } points. <br> You have chosen to bet ${
      playerBets[currentPlayerIndex]
    } points. <br>`;
    currentPlayerIndex += 1;

    // When all players have set bets
    if (currentPlayerIndex == playerCount) {
      outputText += `Moving on to the next stage - Deal Cards. <br> Player 1, Press submit to continue.`;

      // Back to currentPlayerIndex 0
      currentPlayerIndex = 0;

      // Moving on to next round
      gameMode = GAME_MODE_DEAL_CARDS;
      return outputText;
    } else {
      outputText += `Next player, input your bet.`;
      return outputText;
    }
  }
};

var dealCards = function () {
  // players take turn to deal cards
  while (currentPlayerIndex < playerCount) {
    // Empty the playerCards array & restart the
    playerCards = [];
    numOfPlayerCards = 0;

    playerCard1 = deck.pop(); // face up
    numOfPlayerCards += 1;
    playerCard2 = deck.pop(); // face up
    numOfPlayerCards += 1;

    // the cards are displayed to the player
    var outputText = `Player ${currentPlayerIndex + 1}, your cards are: <br> ${
      playerCard1.name
    } of ${playerCard1.suitEmoji} <br> ${playerCard2.name} of ${
      playerCard2.suitEmoji
    }. <br><br> `;

    // push player's cards to player cards array
    playerCards.push(playerCard1);
    playerCards.push(playerCard2);
    allPlayerCards.push(playerCards);
    playerCardsTotal = Number(playerCard1.rank) + Number(playerCard2.rank);
    allPlayerCardsTotal.push(playerCardsTotal);
    allNumOfPlayerCards.push(numOfPlayerCards);

    // If player gets ace cards, player chooses ace's value, i.e. either 1 or 11.
    if (playerCard1.name == "ace" && playerCard2.name == "ace") {
      outputText += `Please choose the values of both of your ace cards, either "1" or "11", starting from the first ace card.`;
      gameMode = GAME_MODE_CHOOSE_ACE_VALUE;
      return outputText;
    }

    if (playerCard1.name == "ace" || playerCard2.name == "ace") {
      outputText += `Please choose the value of your ace card, i.e. either "1" or "11".`;
      gameMode = GAME_MODE_CHOOSE_ACE_VALUE;
      return outputText;
    }

    currentPlayerIndex += 1;

    if (currentPlayerIndex == playerCount) {
      outputText += `Press submit to see dealer's face-up cards.`;

      // Back to currentPlayerIndex 0
      currentPlayerIndex = 0;

      // Empty the playerCards array
      playerCards = [];

      // Moving on to next round
      gameMode = GAME_MODE_DEAL_COMP_CARDS;
      return outputText;
    } else {
      outputText += `Next player, press submit to deal your cards.`;
    }
    return outputText;
  }
};

var dealCompCards = function () {
  // the dealer deals his cards
  computerCard1 = deck.pop(); // face up
  numOfComputerCards += 1;
  computerCard2 = deck.pop(); // face down
  numOfComputerCards += 1;

  // dealer's first ace counts as 11 unless it busts the hand. Subsequent aces count as ones.
  // 1. both dealer's cards are aces.
  if (computerCard1.name == "ace" && computerCard2.name == "ace") {
    computerCard1.rank = 11;
    computerCard2.rank = 1;
  } // 2. one of the dealer's cards is ace.
  else if (computerCard1.name == "ace") {
    computerCard1.rank = 11;
  } else if (computerCard2.name == "ace") {
    computerCard2.rank = 11;
  }

  // push dealer's cards to dealer cards array
  computerCards.push(computerCard1);
  computerCards.push(computerCard2);
  computerCardsTotal = computerCard1.rank + computerCard2.rank;

  // the dealer decides to hit or stand automatically based on the game rules.
  // 1. the dealer has to stand if their hand is 17 or higher
  // 2. the dealer has to hit if their hand is below 17
  // TODO(CHANGE BACK TO 17)
  while (computerCardsTotal < 17) {
    console.log(
      `DEALCOMPCARDS - Still at ${computerCardsTotal} points, less than 17 points, getting more cards.`
    );
    computerCard = deck.pop();
    numOfComputerCards += 1;

    console.log(`DEALCOMPCARDS - Got ${computerCard.name}.`);

    // push dealer's card into computerCards array.
    computerCards.push(computerCard);

    // if dealer gets ace, need to analyse whether it's dealer's first ace or not.
    if (computerCard.name == "ace") {
      var counter = 0;
      while (counter < numOfComputerCards) {
        if (computerCards[counter].name == "ace") {
          computerHasAce = true;
          computerCard.rank = 1; // dealer's subsequent ace counts as one
        } else {
          computerCard.rank = 11; // dealer's first ace counts as 11
        }
        counter += 1;
      }
    }

    // Calculate
    computerCardsTotal += computerCard.rank;

    console.log(`DEALCOMPCARDS - New value is ${computerCardsTotal}`);

    // Decide if computer bust or not
    if (computerCardsTotal > 21) {
      console.log(`DEALCOMPCARDS - COMPUTER BUST. BUT DOING NOTHING.`);
    }
  }

  var outputText = `The dealer's face-up card is: <br> ${computerCard1.name} of ${computerCard1.suitEmoji}. <br><br> Moving on to the next stage - Analysing Cards. <br> Player 1, Press submit to continue.`;

  // Back to currentPlayerIndex 0
  currentPlayerIndex = 0;

  // Moving on to next round
  gameMode = GAME_MODE_ANALYSE_CARDS;

  return outputText;
};

var chooseAceValue = function () {
  console.log(
    `CHOOSEACEVALUE - Player ${currentPlayerIndex + 1} entered the function`
  );

  // if both of player's cards are aces, need to choose value for both
  if (allNumOfPlayerCards[currentPlayerIndex] == 2) {
    console.log(
      `HITORSTAND - Player ${
        currentPlayerIndex + 1
      } has only 2 cards (Came here from dealCards())`
    );
    if (
      playerCard1.name == "ace" &&
      playerCard2.name == "ace" &&
      hasChosenAce1Value == false &&
      hasChosenAce2Value == false
    ) {
      if (Number(userInput) == 1) {
        playerCard1.rank = 1;
        hasChosenAce1Value = true;
        playerCardsTotal = Number(playerCard1.rank) + Number(playerCard2.rank);
        allPlayerCardsTotal[currentPlayerIndex] = playerCardsTotal;
        return `You chose your first ace's value to be 1. <br> Please enter the value of your second ace: either "1" or "11".`;
      } else if (Number(userInput) == 11) {
        playerCard1.rank = 11;
        hasChosenAce1Value = true;
        playerCardsTotal = Number(playerCard1.rank) + Number(playerCard2.rank);
        allPlayerCardsTotal[currentPlayerIndex] = playerCardsTotal;
        return `You chose your first ace's value to be 11. <br> Please enter the value of your second ace: either "1" or "11".`;
      } else {
        return 'Please enter a valid ace value, either "1" or "11".';
      }
    } else if (
      playerCard1.name == "ace" &&
      playerCard2.name == "ace" &&
      hasChosenAce1Value == true &&
      hasChosenAce2Value == false
    ) {
      if (Number(userInput) == 1) {
        playerCard2.rank = 1;
        hasChosenAce2Value = true;
        playerCardsTotal = Number(playerCard1.rank) + Number(playerCard2.rank);
        allPlayerCardsTotal[currentPlayerIndex] = playerCardsTotal;
        if (currentPlayerIndex < playerCount - 1) {
          gameMode = GAME_MODE_DEAL_CARDS;
        } else if (currentPlayerIndex == playerCount - 1) {
          gameMode = GAME_MODE_DEAL_COMP_CARDS;
        }
        currentPlayerIndex += 1;
        return `You chose your second ace's value to be 1. <br> Please submit to continue the game.`;
      } else if (Number(userInput) == 11) {
        playerCard2.rank = 11;
        hasChosenAce2Value = true;
        playerCardsTotal = Number(playerCard1.rank) + Number(playerCard2.rank);
        allPlayerCardsTotal[currentPlayerIndex] = playerCardsTotal;
        if (currentPlayerIndex < playerCount - 1) {
          gameMode = GAME_MODE_DEAL_CARDS;
        } else if (currentPlayerIndex == playerCount - 1) {
          gameMode = GAME_MODE_DEAL_COMP_CARDS;
        }
        currentPlayerIndex += 1;
        return `You chose your second ace's value to be 11. <br> Press submit to continue the game.`;
      } else {
        return 'Please enter a valid ace value, either "1" or "11".';
      }
    }

    // if player's first card is ace
    if (
      playerCard1.name == "ace" &&
      playerCard2.name != "ace" &&
      hasChosenAce1Value == false
    ) {
      if (Number(userInput) == 1) {
        playerCard1.rank = 1;
        hasChosenAce1Value = true;
        playerCardsTotal = Number(playerCard1.rank) + Number(playerCard2.rank);
        allPlayerCardsTotal[currentPlayerIndex] = playerCardsTotal;
        if (currentPlayerIndex < playerCount - 1) {
          gameMode = GAME_MODE_DEAL_CARDS;
        } else if (currentPlayerIndex == playerCount - 1) {
          gameMode = GAME_MODE_DEAL_COMP_CARDS;
        }
        currentPlayerIndex += 1;
        return `You chose your ace's value to be 1. <br> Please submit to continue the game.`;
      } else if (Number(userInput) == 11) {
        playerCard1.rank = 11;
        hasChosenAce1Value = true;
        playerCardsTotal = Number(playerCard1.rank) + Number(playerCard2.rank);
        allPlayerCardsTotal[currentPlayerIndex] = playerCardsTotal;
        if (currentPlayerIndex < playerCount - 1) {
          gameMode = GAME_MODE_DEAL_CARDS;
        } else if (currentPlayerIndex == playerCount - 1) {
          gameMode = GAME_MODE_DEAL_COMP_CARDS;
        }
        currentPlayerIndex += 1;
        return `You chose your ace's value to be 11. <br> Press submit to continue the game.`;
      } else {
        return 'Please enter a valid ace value, either "1" or "11".';
      }
    }

    // if player's second card is ace
    if (
      playerCard2.name == "ace" &&
      playerCard1.name != "ace" &&
      hasChosenAce2Value == false
    ) {
      if (Number(userInput) == 1) {
        playerCard2.rank = 1;
        hasChosenAce2Value = true;
        playerCardsTotal = Number(playerCard1.rank) + Number(playerCard2.rank);
        allPlayerCardsTotal[currentPlayerIndex] = playerCardsTotal;
        if (currentPlayerIndex < playerCount - 1) {
          gameMode = GAME_MODE_DEAL_CARDS;
        } else if (currentPlayerIndex == playerCount - 1) {
          gameMode = GAME_MODE_DEAL_COMP_CARDS;
        }
        currentPlayerIndex += 1;
        return `You chose your ace's value to be 1. <br> Please submit to continue the game.`;
      } else if (Number(userInput) == 11) {
        playerCard2.rank = 11;
        hasChosenAce2Value = true;
        playerCardsTotal = Number(playerCard1.rank) + Number(playerCard2.rank);
        allPlayerCardsTotal[currentPlayerIndex] = playerCardsTotal;
        if (currentPlayerIndex < playerCount - 1) {
          gameMode = GAME_MODE_DEAL_CARDS;
        } else if (currentPlayerIndex == playerCount - 1) {
          gameMode = GAME_MODE_DEAL_COMP_CARDS;
        }
        currentPlayerIndex += 1;
        return `You chose your ace's value to be 11. <br> Press submit to continue the game.`;
      } else {
        return 'Please enter a valid ace value, either "1" or "11".';
      }
    }
  }

  if (allNumOfPlayerCards[currentPlayerIndex] > 2) {
    console.log(
      `HITORSTAND - Player ${
        currentPlayerIndex + 1
      } has MORE than 2 cards (came here from hitOrStand())`
    );
    // if player's other card is ace
    if (
      playerCard.name == "ace" &&
      userInput == "1" &&
      hasChosenAceValue == false
    ) {
      playerCard.rank = 1;
      hasChosenAceValue = true;
      gameMode = GAME_MODE_ANALYSE_CARDS_FURTHER;
      // TODO (Might not need to increase currentPlayerIndex)
      // currentPlayerIndex += 1;
      return `Player ${currentPlayerIndex}, you have chosen your ace's face value to be 1. <br> Press submit to continue.`;
    } else if (
      playerCard.name == "ace" &&
      userInput == "11" &&
      hasChosenAceValue == false
    ) {
      playerCard.rank = 11;
      allPlayerCardsTotal[currentPlayerIndex] += 10;
      hasChosenAceValue = true;
      gameMode = GAME_MODE_ANALYSE_CARDS_FURTHER;
      // TODO (Might not need to increase currentPlayerIndex)
      // currentPlayerIndex += 1;
      return `Player ${currentPlayerIndex}, you have chosen your ace's value to be 11. <br> Press submit to continue.`;
    }
  }
};

var analyseCards = function () {
  var outputText = `Player ${currentPlayerIndex + 1}, `;
  // The cards are analysed for game winning conditions
  console.log(`Player ${currentPlayerIndex + 1} ARRIVED AT ANALYZECARDS`);
  while (currentPlayerIndex < playerCount) {
    // if the player gets blackjack, the player wins
    if (
      allPlayerCardsTotal[currentPlayerIndex] == 21 &&
      hasPlayerExitedArray[currentPlayerIndex] == false
    ) {
      console.log(`Player ${currentPlayerIndex + 1} won blackjack`);
      playerBankrolls[currentPlayerIndex] += playerBets[currentPlayerIndex];
      computerBankroll -= playerBets[currentPlayerIndex];
      hasPlayerExitedArray[currentPlayerIndex] = true;
      outputText += `you win! <br> Your points: ${playerBankrolls[currentPlayerIndex]} <br> The dealer's points: ${computerBankroll} <br><br> Next player, press submit to continue.`;
      currentPlayerIndex += 1;
      // Decide whether or not to JUMP forward to a possible reset via analyseCardsFurther()
      if (currentPlayerIndex == playerCount) {
        gameMode = GAME_MODE_ANALYSE_CARDS_FURTHER;
      }
      return outputText;
    }

    //if the player busts, the player loses. even if the dealer also bust, the dealer still wins.
    // This condition will never be true
    if (
      allPlayerCardsTotal[currentPlayerIndex] > 21 &&
      hasPlayerExitedArray[currentPlayerIndex] == false
    ) {
      console.log(
        `Player ${
          currentPlayerIndex + 1
        } goes into a condition that should never be true.`
      );
      playerBankrolls[currentPlayerIndex] -= playerBets[currentPlayerIndex];
      computerBankroll += playerBets[currentPlayerIndex];
      hasPlayerExitedArray[currentPlayerIndex] = true;
      outputText += `you bust! <br> Your cards total: ${
        allPlayerCardsTotal[currentPlayerIndex]
      } <br>Your points: ${
        playerBankrolls[currentPlayerIndex]
      } <br><br> The dealer's face-down card: ${
        computerCards[numOfComputerCards - 1].name
      } of ${
        computerCards[numOfComputerCards - 1].suitEmoji
      }. <br> The dealer's cards total: ${computerCardsTotal}.<br> The dealer's points: ${computerBankroll} <br><br> Next player, press submit to continue.`;
      currentPlayerIndex += 1;
      // Decide whether or not to JUMP forward to a possible reset via analyseCardsFurther()
      if (currentPlayerIndex == playerCount) {
        gameMode = GAME_MODE_ANALYSE_CARDS_FURTHER;
      }
      return outputText;
    }

    // Continues the game
    // else, the player decides whether to hit or stand
    if (
      allPlayerCardsTotal[currentPlayerIndex] < 21 &&
      hasPlayerExitedArray[currentPlayerIndex] == false
    ) {
      console.log(
        `Player ${
          currentPlayerIndex + 1
        } entering hit or stand mode with total value of ${
          allPlayerCardsTotal[currentPlayerIndex]
        }`
      );
      gameMode = GAME_MODE_HIT_OR_STAND;
      outputText += `do you want another card from the deck? <br> If yes, please enter "hit". <br> If no, please enter "stand".`;
      return outputText;
    }

    return "UNEXPECTED STATE!";
  }

  currentPlayerIndex = 0;
};

// after choosing hit or stand, the analysis of cards will be done here
var hitOrStand = function () {
  // user input validation
  // if (userInput != "hit" || userInput != "stand") {
  //   return `Please enter "hit" to deal another card, <br> OR enter "stand" to hold your total and end your turn.<br>`;
  // }

  console.log(`Player ${currentPlayerIndex + 1} enters hit or stand function`);
  var outputText = `Player ${currentPlayerIndex + 1}, `;

  // if user chooses to hit
  if (userInput == "hit") {
    console.log(`HITORSTAND - Player ${currentPlayerIndex + 1} input hit`);
    playerCard = deck.pop();
    allPlayerCards[currentPlayerIndex].push(playerCard);
    allNumOfPlayerCards[currentPlayerIndex] += 1;
    allPlayerCardsTotal[currentPlayerIndex] += playerCard.rank;
    console.log(
      `HITORSTAND - Player ${currentPlayerIndex + 1} got ${
        playerCard.name
      } and now has ${allNumOfPlayerCards[currentPlayerIndex]} cards`
    );
    outputText += `you have chosen to hit. <br> Your card is: ${playerCard.name} of ${playerCard.suitEmoji}.<br>`;

    // if user gets ace
    if (playerCard.name == "ace" && hasChosenAceValue == false) {
      console.log(`Player ${currentPlayerIndex + 1} got ace`);
      gameMode = GAME_MODE_CHOOSE_ACE_VALUE;
      playerCard1 = null;
      playerCard2 = null;
      outputText += `Please choose your ace's value by entering either "1" or "11".`;
      return outputText;
    }

    outputText += `Press submit to continue.`;
    gameMode = GAME_MODE_ANALYSE_CARDS_FURTHER;
    if (currentPlayerIndex == playerCount) {
      console.log(
        `Inside hit or stand - currentplayerindex equals player count. resetting currentPlayerIndex to 0`
      );
      currentPlayerIndex = 0;
    }
    return outputText;
  }

  // if user chooses to stand
  if (userInput == "stand") {
    console.log(`Player ${currentPlayerIndex + 1} chose stand`);
    gameMode = GAME_MODE_ANALYSE_CARDS_FURTHER;
    hasPlayerExitedArray[currentPlayerIndex] = true;
    outputText += `you have chosen to stand. <br> Press submit to continue.`;
    return outputText;
  }

  return outputText;
};

var analyseCardsFurther = function () {
  console.log(
    `Player ${currentPlayerIndex + 1} ARRIVED AT ANALYZECARDSFURTHER`
  );
  var outputText = `Player ${currentPlayerIndex + 1}, `;
  // The cards are analysed for game winning conditions
  while (currentPlayerIndex < playerCount) {
    console.log(
      `ANALYZECARDSFURTHER - Still at currentPlayerIndex ${currentPlayerIndex}. Entering while loop`
    );

    // if the player gets blackjack, the player wins
    if (
      allPlayerCardsTotal[currentPlayerIndex] == 21 &&
      hasPlayerExitedArray[currentPlayerIndex] == false
    ) {
      console.log(
        `ANALYZECARDSFURTHER - Player ${currentPlayerIndex + 1} won blackjack`
      );
      playerBankrolls[currentPlayerIndex] += playerBets[currentPlayerIndex];
      computerBankroll -= playerBets[currentPlayerIndex];
      hasPlayerExitedArray[currentPlayerIndex] = true;
      outputText += `you win! <br> Your points: ${playerBankrolls[currentPlayerIndex]} <br> The dealer's points: ${computerBankroll} <br><br> Next player, press submit to continue.`;
      currentPlayerIndex += 1;
      // Decide whether or not to go back to analyseCards (After incrementing currentPlayerIndex)
      if (currentPlayerIndex < playerCount) {
        gameMode = GAME_MODE_ANALYSE_CARDS;
      }
      return outputText;
    }

    //if the player busts, the player loses. even if the dealer also bust, the dealer still wins.
    if (
      allPlayerCardsTotal[currentPlayerIndex] > 21 &&
      hasPlayerExitedArray[currentPlayerIndex] == false
    ) {
      console.log(
        `ANALYZECARDSFURTHER - Player ${
          currentPlayerIndex + 1
        } in AnalyzeCardsFurther - Player bust`
      );
      playerBankrolls[currentPlayerIndex] -= playerBets[currentPlayerIndex];
      computerBankroll += playerBets[currentPlayerIndex];
      hasPlayerExitedArray[currentPlayerIndex] = true;
      outputText += `you bust! <br> Your cards total: ${
        allPlayerCardsTotal[currentPlayerIndex]
      } <br>Your points: ${
        playerBankrolls[currentPlayerIndex]
      } <br><br> The dealer's face-down card: ${
        computerCards[numOfComputerCards - 1].name
      } of ${
        computerCards[numOfComputerCards - 1].suitEmoji
      }. <br> The dealer's cards total: ${computerCardsTotal}.<br> The dealer's points: ${computerBankroll} <br><br> Next player, press submit to continue.`;
      currentPlayerIndex += 1;
      // Decide whether or not to go back to analyseCards (After incrementing currentPlayerIndex)
      if (currentPlayerIndex < playerCount) {
        gameMode = GAME_MODE_ANALYSE_CARDS;
      }

      return outputText;
    }

    // Continues game
    // else, the player decides whether to hit or stand
    if (
      allPlayerCardsTotal[currentPlayerIndex] < 21 &&
      hasPlayerExitedArray[currentPlayerIndex] == false
    ) {
      console.log(
        `ANALYZECARDSFURTHER - Player ${
          currentPlayerIndex + 1
        } - Ask player to hit or stand again with total value of ${
          allPlayerCardsTotal[currentPlayerIndex]
        }`
      );
      gameMode = GAME_MODE_HIT_OR_STAND;
      outputText += `do you want another card from the deck? <br> If yes, please enter "hit". <br> If no, please enter "stand".`;
      return outputText;
    }

    // if the dealer exceeds 21 and bust, the player wins
    if (
      computerCardsTotal > 21 &&
      allPlayerCardsTotal[currentPlayerIndex] <= 21 &&
      hasPlayerExitedArray[currentPlayerIndex] == true
    ) {
      console.log(
        `ANALYZECARDSFURTHER - Player ${
          currentPlayerIndex + 1
        } - Dealer exceeds 21 and bust`
      );
      playerBankrolls[currentPlayerIndex] += playerBets[currentPlayerIndex];
      computerBankroll -= playerBets[currentPlayerIndex];
      hasComputerBust = true;
      outputText += `<br> The dealer's face-down card is ${
        computerCards[numOfComputerCards - 1].name
      } of ${
        computerCards[numOfComputerCards - 1].suitEmoji
      }. <br> The dealer's cards total ${computerCardsTotal}. <br><br> The dealer bust! You win! <br>Your points: ${
        playerBankrolls[currentPlayerIndex]
      } <br> The dealer's points: ${computerBankroll} <br><br> Press submit.`;
      currentPlayerIndex += 1;
      // Decide whether or not to go back to analyseCards (After incrementing currentPlayerIndex)
      if (currentPlayerIndex < playerCount) {
        gameMode = GAME_MODE_ANALYSE_CARDS;
      }
      // This block of code seems inconsistent. It goes to betting when the rest does not
      // if (currentPlayerIndex == playerCount) {
      //   gameMode = GAME_MODE_BETTING;
      // }
      return outputText;
    }

    // the dealer who is closer to 21 wins the hand
    if (
      computerCardsTotal <= 21 &&
      computerCardsTotal > allPlayerCardsTotal[currentPlayerIndex] &&
      hasPlayerExitedArray[currentPlayerIndex] == true
    ) {
      console.log(
        `ANALYZECARDSFURTHER - Player ${
          currentPlayerIndex + 1
        } - the dealer who is closer to 21 wins the hand`
      );
      playerBankrolls[currentPlayerIndex] -= playerBets[currentPlayerIndex];
      computerBankroll += playerBets[currentPlayerIndex];
      outputText += `<br> The dealer
    s face-down card is ${computerCards[numOfComputerCards - 1].name} of ${
        computerCards[numOfComputerCards - 1].suit
      }. <br> The dealer's cards total ${computerCardsTotal}. <br><br> You lose! <br> Your points: ${
        playerBankrolls[currentPlayerIndex]
      } <br> The dealer's points: ${computerBankroll} <br><br> Press submit.`;
      currentPlayerIndex += 1;
      // Decide whether or not to go back to analyseCards (After incrementing currentPlayerIndex)
      if (currentPlayerIndex < playerCount) {
        gameMode = GAME_MODE_ANALYSE_CARDS;
      }
      return outputText;
    }

    // the player who is closer to 21 wins the hand
    if (
      allPlayerCardsTotal[currentPlayerIndex] <= 21 &&
      allPlayerCardsTotal[currentPlayerIndex] > computerCardsTotal &&
      hasPlayerExitedArray[currentPlayerIndex] == true
    ) {
      console.log(
        `ANALYZECARDSFURTHER - Player ${
          currentPlayerIndex + 1
        } - the player who is closer to 21 wins the hand`
      );
      playerBankrolls[currentPlayerIndex] += playerBets[currentPlayerIndex];
      computerBankroll -= playerBets[currentPlayerIndex];
      outputText += `<br> The dealer
    s face-down card is ${computerCards[numOfComputerCards - 1].name} of ${
        computerCards[numOfComputerCards - 1].suit
      }. <br> The dealer's cards total ${computerCardsTotal}. <br><br> You win! <br> Your points: ${
        playerBankrolls[currentPlayerIndex]
      } <br> The dealer's points: ${computerBankroll}. <br><br> Press submit.`;
      currentPlayerIndex += 1;
      // Decide whether or not to go back to analyseCards (After incrementing currentPlayerIndex)
      if (currentPlayerIndex < playerCount) {
        gameMode = GAME_MODE_ANALYSE_CARDS;
      }
      return outputText;
    }

    // when the player's cards and computer's cards totals are the same, it is a tie
    if (
      computerCardsTotal == allPlayerCardsTotal[currentPlayerIndex] &&
      computerCardsTotal <= 21 &&
      hasPlayerExitedArray[currentPlayerIndex] == true
    ) {
      console.log(
        `ANALYZECARDSFURTHER - Player ${
          currentPlayerIndex + 1
        } - when the player's cards and computer's cards totals are the same, it is a tie`
      );
      outputText += `<br> The dealer
    s face-down card is ${computerCards[numOfComputerCards - 1].name} of ${
        computerCards[numOfComputerCards - 1].suit
      }. <br> The dealer's cards total ${computerCardsTotal}. <br><br> It's a tie! <br><br> Your points: ${
        playerBankrolls[currentPlayerIndex]
      } <br> The dealer's points: ${computerBankroll}.<br><br> Press submit.`;
      currentPlayerIndex += 1;
      // Decide whether or not to go back to analyseCards (After incrementing currentPlayerIndex)
      if (currentPlayerIndex < playerCount) {
        gameMode = GAME_MODE_ANALYSE_CARDS;
      }
      return outputText;
    } else {
      return `analyzeCardsFurther ERROR!`;
    }
  }

  // Reset
  console.log(
    `ANALYZECARDSFURTHER - Already at currentPlayerIndex ${currentPlayerIndex}. Not doing while loop. Doing reset.`
  );

  var counter = 0;
  while (counter < playerCount) {
    if (hasPlayerExitedArray[counter] == true) {
      hasRoundEnded = true;
    } else if (hasPlayerExitedArray[counter] == false) {
      hasRoundEnded = false;
      counter = playerCount;
    }
    counter += 1;
  }

  if (hasRoundEnded == true) {
    gameMode = GAME_MODE_BETTING;
    currentPlayerIndex = 0;
    userInput = "";
    playerCards = [];
    allPlayerCards = [];
    computerCards = [];
    playerCard1 = null;
    playerCard2 = null;
    playerCard = null;
    computerCard1 = null;
    computerCard2 = null;
    computerCard = null;
    playerCardsTotal = 0;
    allPlayerCardsTotal = [];
    computerCardsTotal = 0;
    numOfPlayerCards = 0;
    allNumOfPlayerCards = [];
    numOfComputerCards = 0;
    playerBets = [];
    computerHasAce = false;
    hasChosenAce1Value = false;
    hasChosenAce2Value = false;
    hasChosenAceValue = false;
    hasPlayerExited = false;
    // Reset hasPlayerExitedArray
    hasPlayerExitedArray = [];
    currentPlayerIndex = 0;
    while (currentPlayerIndex < playerCount) {
      hasPlayerExitedArray.push(false);
      currentPlayerIndex += 1;
    }
    currentPlayerIndex = 0;
    hasComputerBust = false;
    hasRoundEnded = false;
    deck = shuffleCards(makeDeck());

    return `This round of blackjack has ended. <br> Player 1, please input your new bet.`;
  }

  return outputText;
};

/**
 * Create a standard 52-card deck
 */
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitEmoji = ["♥️", "♦️", "♣️", "♠️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    var currentSuitEmoji = suitEmoji[suitIndex];

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
        suitEmoji: currentSuitEmoji,
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

  // If card is jack, queen or king, set rank to be 10 for game of Blackjack
  cardDeck[10].rank = 10;
  cardDeck[11].rank = 10;
  cardDeck[12].rank = 10;
  cardDeck[23].rank = 10;
  cardDeck[24].rank = 10;
  cardDeck[25].rank = 10;
  cardDeck[36].rank = 10;
  cardDeck[37].rank = 10;
  cardDeck[38].rank = 10;
  cardDeck[49].rank = 10;
  cardDeck[50].rank = 10;
  cardDeck[51].rank = 10;

  // Return the completed card deck
  return cardDeck;
};

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

// Rules of the game:
// 1. there will be only two players, one human one computer
// 2. the computer will always be the dealer.
// the game either ends or continues
