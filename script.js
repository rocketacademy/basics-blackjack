// Game modes stored in constants
const WAITING_FOR_NUM_PLAYERS = "waiting for num of players";
const WAITING_FOR_NAME = "waiting for username";
const INSTRUCTIONS = "tell player instructions";
const ASK_FOR_BET = "ask player for betting amount";
const TAKE_BET = "take user's bet";
const DEAL_CARDS = "deal cards";
const SELECT_PLAYER = "select player and check for blackjack";
const PLAYER_ACTION = "player hits or stands";
const CHANGE_ACE_MODE = "change ace mode";
const COMPUTER_CALCULATES = "computer calculates";
const FINAL_RESULT = "final result";
const GAME_SUMMARY = "output all results";

// Declare user inputs as constants
const INPUT_HIT = "hit";
const INPUT_STAND = "stand";
const INPUT_CHANGE_ACE = "ace";
const POSITION = "position";
const ACE_ONE = "ace 1";
const ACE_ELEVEN = "ace 11";
const INPUT_RESET = "reset";

// Global variables
var allPlayerOutcomes = [];
var allPlayerCards = [];
var playerCards = [];
var computerCards = [];
var cardDeck = [];
var shuffledDeck;
var createDeck;
var playerPoints = 0;
var computerPoints = 0;
var aceIndex = 0;
var aceValue = 0;
var aceCounter = 0;
var userName = [];
var bankRoll = [];
var userBet = [];
var numPlayers = 0;
var stringNames = "";
var stringBet = "";
var currentPlayer = 0;

// Current game mode
var gameMode = WAITING_FOR_NUM_PLAYERS;

// Create a deck of cards
var makeDeck = function () {
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var emojiSuits = ["♥️", "♦️", "♣️", "♠️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmojiSuit = emojiSuits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // Create new object attribute for cards to represent their value
      var cardValue = rankCounter;
      if (rankCounter == 1) {
        // Set ace to be 11 points, so that blackjack condition can be fulfilled. Player can change value later
        cardValue = 11;
      } else if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
        cardValue = 10;
      }
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        emojiSuit: currentEmojiSuit,
        rank: rankCounter,
        value: cardValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle deck of cards
var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var dealCards = function () {
  // Deal two cards to each player as determined by user
  for (var playerCounter = 0; playerCounter < numPlayers; playerCounter += 1) {
    playerCards.push(shuffledDeck.pop());
    playerCards.push(shuffledDeck.pop());
    allPlayerCards.push(playerCards);
    playerCards = [];
  }
  // Deal two cards to computer
  computerCards.push(shuffledDeck.pop());
  computerCards.push(shuffledDeck.pop());
  // Add computer scores for first two cards
  computerPoints = computerCards[0].value + computerCards[1].value;
  return `The cards have been shuffled! <br> Click submit to see your cards!`;
};

var selectPlayer = function () {
  playerCardList = generatePlayerCardList();
  // Add relevant player's scores for first two cards
  // Use global value 'currentPlayer' to change index and hence select relevant player's cards that are being accessed in array
  playerPoints =
    allPlayerCards[currentPlayer][0].value +
    allPlayerCards[currentPlayer][1].value;
  if (
    // If player gets blackjack, declare winner
    playerPoints == 21 &&
    computerPoints != 21
  ) {
    playerPoints = 0;
    currentPlayer += 1;
    // Change to next player / summarize results if all players have played
    if (currentPlayer == numPlayers) {
      gameMode = GAME_SUMMARY;
    } else {
      gameMode = SELECT_PLAYER;
    }
    // Update points
    bankRoll[currentPlayer - 1] =
      bankRoll[currentPlayer - 1] + userBet[currentPlayer - 1] * 1.5;
    allPlayerOutcomes.push("win");

    return `${
      userName[currentPlayer - 1]
    }! <br>YOU HAVE GOTTEN BLACKJACK AND WIN! 🥳 <br><br> Your cards: <br>${
      allPlayerCards[currentPlayer - 1][0].name
    } of ${allPlayerCards[currentPlayer - 1][0].emojiSuit} <br>${
      allPlayerCards[currentPlayer - 1][1].name
    } of ${
      allPlayerCards[currentPlayer - 1][1].emojiSuit
    } <br><br> Your bank $${
      bankRoll[currentPlayer - 1]
    } <br><br> Time for the next player! `;
  } else if (
    // If both get blackjack, declare draw
    playerPoints == 21 &&
    computerPoints == 21
  ) {
    playerPoints = 0;
    currentPlayer += 1;
    // Change to next player / summarize results if all players have played
    if (currentPlayer == numPlayers) {
      gameMode = GAME_SUMMARY;
    } else {
      gameMode = SELECT_PLAYER;
    }
    bankRoll[currentPlayer - 1] =
      bankRoll[currentPlayer - 1] - userBet[currentPlayer - 1];
    allPlayerOutcomes.push("draw");

    return `${
      userName[currentPlayer - 1]
    }!<br> You both drew blackjacks! Its a draw! 😐 <br><br> Your cards: <br>${
      allPlayerCards[currentPlayer - 1][0].name
    } of ${allPlayerCards[currentPlayer - 1][0].emojiSuit} <br>${
      allPlayerCards[currentPlayer - 1][1].name
    } of ${
      allPlayerCards[currentPlayer - 1][1].emojiSuit
    } <br><br> Your bank $${
      bankRoll[currentPlayer - 1]
    } <br><br> Time for the next player!`;
  } else if (playerPoints > 21) {
    // If player gets two aces, inform them to change value
    gameMode = PLAYER_ACTION;
    return `${userName[currentPlayer]}, you will bust and lose unless you change your ace card's value! <br><br> Type 'ace' to change its value.<br><br> Your cards: <br>${allPlayerCards[currentPlayer][0].name} of ${allPlayerCards[currentPlayer][0].emojiSuit} <br>${allPlayerCards[currentPlayer][1].name} of ${allPlayerCards[currentPlayer][1].emojiSuit}  <br> Your points: ${playerPoints}`;
  } else {
    gameMode = PLAYER_ACTION;
    // Otherwise inform player of current cards and ask if they want to hit, stand or change ace value
    return `${userName[currentPlayer]}, your cards are: <br>${allPlayerCards[currentPlayer][0].name} of ${allPlayerCards[currentPlayer][0].emojiSuit} <br>${allPlayerCards[currentPlayer][1].name} of ${allPlayerCards[currentPlayer][1].emojiSuit}  <br> Your points: ${playerPoints} <br><br> Please enter 'hit' if you would like more cards <br><br> Please enter 'stand' if you do not want anymore cards <br><br> Please enter 'ace' if you would like to change the value of an ace card<br><br> Please enter 'reset' if you would like to restart the game`;
  }
};

// If player wants to change ace value, ensure they are selecting ace card in array, otherwise inform them of this condition
var checkForAce = function (input) {
  if (gameMode == CHANGE_ACE_MODE) {
    aceIndex = Number(input) - 1;
    if (allPlayerCards[currentPlayer][aceIndex].name != "Ace") {
      gameMode = PLAYER_ACTION;
      // Run while loop to output all player card names and suits in output statement
      var aceInvalidOutput = `${userName[currentPlayer]}, you can only change the value of aces. <br><br> Your cards are: `;
      aceCounter = 0;
      while (aceCounter < allPlayerCards[currentPlayer].length) {
        aceInvalidOutput =
          aceInvalidOutput +
          `<br> ${allPlayerCards[currentPlayer][aceCounter].name} of ${allPlayerCards[currentPlayer][aceCounter].emojiSuit}`;
        aceCounter += 1;
      }
      return (
        aceInvalidOutput +
        `<br> Your points: ${playerPoints}<br><br> Please enter 'hit' if you would like more cards <br><br> Please enter 'stand' if you do not want anymore cards <br><br> Please enter 'ace' if you would like to change the value of an ace card`
      );
      // If player selects ace card in their array, switch mode and allow them to change ace value
    } else if (allPlayerCards[currentPlayer][aceIndex].name == "Ace") {
      gameMode = PLAYER_ACTION;
      return `${userName[currentPlayer]}, you have chosen to change the value of the ace card in positon: ${input} <br><br> Please type either: <br><br> 'ace 1' to change the value of ace to 1 <br> 'ace 11' to change the value of ace to 11`;
    }
  }
};

// If ace card is correctly selected, allow player to enter string to change ace value
var changeAceValue = function (input) {
  if (input == ACE_ELEVEN) {
    aceValue = Number(11);
    playerPoints = playerPoints + 10;
  } else if (input == ACE_ONE) {
    aceValue = Number(1);
    playerPoints = playerPoints - 10;
  }
  allPlayerCards[currentPlayer][aceIndex].value = aceValue;
  gameMode = PLAYER_ACTION;
  // Run while loop to output all player card names and suits in output statement
  var aceChangeOutput = `${userName[currentPlayer]}, you have changed the value of ${allPlayerCards[currentPlayer][aceIndex].name} of ${allPlayerCards[currentPlayer][aceIndex].emojiSuit} to ${aceValue}. <br><br> Your cards are: `;
  aceCounter = 0;
  while (aceCounter < allPlayerCards[currentPlayer].length) {
    aceChangeOutput =
      aceChangeOutput +
      `<br> ${allPlayerCards[currentPlayer][aceCounter].name} of ${allPlayerCards[currentPlayer][aceCounter].emojiSuit}`;
    aceCounter += 1;
  }
  return (
    aceChangeOutput +
    `<br> Your points: ${playerPoints}<br><br> Please enter 'hit' if you would like more cards <br><br> Please enter 'stand' if you do not want anymore cards <br><br> Please enter 'ace' if you would like to change the value of an ace card<br><br> Please enter 'reset' if you would like to restart the game`
  );
};

// Allow player to draw extra card
var playerDrawsExtraCard = function () {
  playerCardList = generatePlayerCardList();
  allPlayerCards[currentPlayer].push(shuffledDeck.pop());
  var playerCardMessage = `Your cards are: `;
  var endMessage = "";
  // Update player points
  playerCounter = allPlayerCards[currentPlayer].length - 1;
  while (playerCounter < allPlayerCards[currentPlayer].length) {
    playerPoints =
      playerPoints + allPlayerCards[currentPlayer][playerCounter].value;
    endMessage = `<br> Your points: ${playerPoints}<br><br> Please enter 'hit' if you would like more cards <br><br> Please enter 'stand' if you do not want anymore cards <br><br> Please enter 'ace' if you would like to change the value of an ace card<br><br> Please enter 'reset' if you would like to restart the game`;
    playerCounter += 1;
  }
  aceCounter = 0;
  while (aceCounter < allPlayerCards[currentPlayer].length) {
    playerCardMessage =
      playerCardMessage +
      `<br> ${allPlayerCards[currentPlayer][aceCounter].name} of ${allPlayerCards[currentPlayer][aceCounter].emojiSuit}`;
    aceCounter += 1;
  }
  // If player busts, output results
  if (playerPoints > 21) {
    var bustOutput = "";
    // However, if player draws ace, allow them to change value
    counter = allPlayerCards[currentPlayer].length - 1;
    while (counter < allPlayerCards[currentPlayer].length) {
      if (allPlayerCards[currentPlayer][counter].name == "Ace") {
        gameMode = PLAYER_ACTION;
        return `${userName[currentPlayer]}, you will bust and lose unless you change your ace card's value! <br><br> Type 'ace' to change its value.<br><br> ${playerCardMessage}`;
      }
      counter += 1;
    }
    // Also, if player busts and has a previous ace card with value 11, allow them to change value
    secondCounter = 0;
    while (secondCounter < allPlayerCards[currentPlayer].length) {
      if (
        allPlayerCards[currentPlayer][secondCounter].name == "Ace" &&
        allPlayerCards[currentPlayer][secondCounter].value == 11
      ) {
        gameMode = PLAYER_ACTION;
        return `${userName[currentPlayer]}, you will bust and lose unless you change your ace card's value! <br><br> Type 'ace' to change its value.<br><br> ${playerCardMessage}`;
      }
      secondCounter += 1;
    }

    currentPlayer += 1;
    allPlayerOutcomes.push("lose");
    bankRoll[currentPlayer - 1] =
      bankRoll[currentPlayer - 1] - userBet[currentPlayer - 1];
    // Change to next player / summarize results if all players have played

    bustOutput = `${
      userName[currentPlayer - 1]
    }, you've bust and lost! 😭 <br><br>  ${playerCardMessage} <br> Your points: ${playerPoints}<br><br> Click submit for the next player's turn!<br><br> Your bank $${
      bankRoll[currentPlayer - 1]
    } `;
    if (currentPlayer == numPlayers) {
      playerPoints = 0;
      gameMode = GAME_SUMMARY;
    } else {
      playerPoints = 0;
      gameMode = SELECT_PLAYER;
    }
    return bustOutput;
  }
  // If player gets blackjack, output results
  if (playerPoints == 21) {
    currentPlayer += 1;
    bankRoll[currentPlayer - 1] =
      bankRoll[currentPlayer - 1] + userBet[currentPlayer - 1];
    allPlayerOutcomes.push("win");
    // Change to next player / summarize results if all players have played
    if (currentPlayer == numPlayers) {
      playerPoints = 0;
      gameMode = GAME_SUMMARY;
    } else {
      playerPoints = 0;
      gameMode = SELECT_PLAYER;
    }
    return `${
      userName[currentPlayer - 1]
    }, you've gotten blackjack and won! 🥳 <br><br>${playerCardMessage}<br><br> Your bank $${
      bankRoll[currentPlayer - 1]
    } <br><br> Click submit for the next player's turn!`;
  }
  return `${userName[currentPlayer]}, ${playerCardMessage}  ${endMessage};`;
};

// Calculate computer's score and automatically draw more if necessary
var calculateComputerScore = function () {
  playerCardList = generatePlayerCardList();
  // If two card score >= 17 and < 21, change game mode to compare with player's score
  if (computerPoints >= 17 && computerPoints < 21) {
    gameMode = FINAL_RESULT;
  }
  // If computer gets blackjack, output results
  else if (computerPoints == 21) {
    allPlayerOutcomes.push("lose");
    currentPlayer += 1;
    bankRoll[currentPlayer - 1] =
      bankRoll[currentPlayer - 1] - userBet[currentPlayer - 1];
    // Change to next player / summarize results if all players have played
    if (currentPlayer == numPlayers) {
      playerPoints = 0;
      gameMode = GAME_SUMMARY;
    } else {
      playerPoints = 0;
      gameMode = SELECT_PLAYER;
    }
    return ` ${
      userName[currentPlayer - 1]
    }! <br> ${playerCardList} <br><br> Find out if you've won at the end of the game! <br><br> Click submit for the next player's turn
     `;
  } else {
    // Otherwise computer draws card until it reaches at least 17, gets blackjack or busts
    while (computerPoints < 17) {
      computerCards.push(shuffledDeck.pop());
      computerPoints =
        computerPoints + computerCards[computerCards.length - 1].value;
      // Run while loop to generate all computer card names and suits
      var computerCardMessage = `Computer's cards were: `;
      computerCounter = 0;
      while (computerCounter < computerCards.length) {
        computerCardMessage =
          computerCardMessage +
          `<br> ${computerCards[computerCounter].name} of ${computerCards[computerCounter].emojiSuit}`;
        computerCounter += 1;
      }
      // If computer gets at least 17, change game mode and compare with player
      if (computerPoints >= 17 && computerPoints < 21) {
        gameMode = FINAL_RESULT;
      }
      // If computer gets blackjack after drawing cards, return winning statement and reset game
      if (computerPoints == 21) {
        allPlayerOutcomes.push("lose");
        playerPoints = 0;
        currentPlayer += 1;
        bankRoll[currentPlayer - 1] =
          bankRoll[currentPlayer - 1] - userBet[currentPlayer - 1];
        // Change to next player / summarize results if all players have played
        if (currentPlayer == numPlayers) {
          gameMode = GAME_SUMMARY;
        } else {
          gameMode = SELECT_PLAYER;
        }
        return ` ${
          userName[currentPlayer - 1]
        }! <br> ${playerCardList} <br><br> Find out if you've won at the end of the game! <br><br> Click submit for the next player's turn`;
      }
      // If computer busts, output results
      if (computerPoints > 21) {
        allPlayerOutcomes.push("win");
        playerPoints = 0;
        currentPlayer += 1;
        bankRoll[currentPlayer - 1] =
          bankRoll[currentPlayer - 1] + userBet[currentPlayer - 1];
        // Change to next player / summarize results if all players have played
        if (currentPlayer == numPlayers) {
          gameMode = GAME_SUMMARY;
        } else {
          gameMode = SELECT_PLAYER;
        }
        return ` ${
          userName[currentPlayer - 1]
        }! <br> ${playerCardList} <br><br> Find out if you've won at the end of the game! <br><br> Click submit for the next player's turn`;
      }
    }
  }
};
// If above conditions are all not met, compare player results to computer results
var determineFinalResult = function () {
  // Run while loop to generate all player card names and suits
  playerCardList = generatePlayerCardList();
  currentPlayer += 1;
  // Determine player's outcome
  if (playerPoints > computerPoints) {
    allPlayerOutcomes.push("win");
    bankRoll[currentPlayer - 1] =
      bankRoll[currentPlayer - 1] + userBet[currentPlayer - 1];
  } else if (playerPoints < computerPoints) {
    allPlayerOutcomes.push("lose");
    bankRoll[currentPlayer - 1] =
      bankRoll[currentPlayer - 1] - userBet[currentPlayer - 1];
  } else if (playerPoints == computerPoints) {
    allPlayerOutcomes.push("draw");
    bankRoll[currentPlayer - 1] =
      bankRoll[currentPlayer - 1] - userBet[currentPlayer - 1];
  }
  // Change to next player / summarize results if all players have played
  if (currentPlayer == numPlayers) {
    playerPoints = 0;
    gameMode = GAME_SUMMARY;
  } else {
    playerPoints = 0;

    gameMode = SELECT_PLAYER;
  }
  return ` ${
    userName[currentPlayer - 1]
  }! <br> ${playerCardList} <br><br> Find out if you've won at the end of the game! <br><br> Click submit for the next player's turn`;
};

// After all player's turns, display final results before starting new round and asking for new bets
var displayGameSummary = function () {
  gameMode = ASK_FOR_BET;
  var outerSummaryCounter = 0;
  var summaryOutput = "";
  // Outer loop to access index in main array
  while (outerSummaryCounter < allPlayerCards.length) {
    var summaryCounter = 0;
    summaryOutput =
      summaryOutput +
      `<br><br>Player ${outerSummaryCounter + 1}: ${
        userName[outerSummaryCounter]
      }, you: ${allPlayerOutcomes[outerSummaryCounter]}! <br> Your bank: ${
        bankRoll[outerSummaryCounter]
      } <br> Your cards were: `;
    // Inner loop to access index in sub arrays
    while (summaryCounter < allPlayerCards[outerSummaryCounter].length) {
      summaryOutput =
        summaryOutput +
        `<br> ${allPlayerCards[outerSummaryCounter][summaryCounter].name} of ${allPlayerCards[outerSummaryCounter][summaryCounter].emojiSuit} `;
      summaryCounter += 1;
    }
    outerSummaryCounter += 1;
  }
  var computerCardMessage = `Computer's cards are: `;
  computerCounter = 0;
  while (computerCounter < computerCards.length) {
    computerCardMessage =
      computerCardMessage +
      `<br> ${computerCards[computerCounter].name} of ${computerCards[computerCounter].emojiSuit}`;
    computerCounter += 1;
  }
  return (
    summaryOutput +
    `<br><br>` +
    computerCardMessage +
    `<br><br> Please click submit to start another game. <br> Please enter 'reset' if you would like to reset the game and choose a different number of players`
  );
};
// // Generate list of player cards to be used for various output statements for output formatting
var generatePlayerCardList = function () {
  aceCounter = 0;
  var playerCardMessage = `Your cards are: `;
  while (aceCounter < allPlayerCards[currentPlayer].length) {
    playerCardMessage =
      playerCardMessage +
      `<br> ${allPlayerCards[currentPlayer][aceCounter].name} of ${allPlayerCards[currentPlayer][aceCounter].emojiSuit}`;
    aceCounter += 1;
  }
  return playerCardMessage;
};
var playerCardList = "";

// Generate list of usernames to be used in main for output formatting
var generateUserNameList = function () {
  var nameOutput = ``;
  for (var nameCounter = 0; nameCounter < userName.length; nameCounter += 1) {
    nameOutput =
      nameOutput + `<br> Player ${nameCounter + 1}: ${userName[nameCounter]}`;
  }
  return nameOutput;
};

var main = function (input) {
  var myOutputValue = "";
  // Ask for number of players
  if (gameMode == WAITING_FOR_NUM_PLAYERS) {
    gameMode = WAITING_FOR_NAME;
    myOutputValue = `Hello player(s)! <br><br> Please enter the number of people playing`;
  } else if (gameMode == WAITING_FOR_NAME) {
    // Empty global variables if players want to change no of players and reset game
    playerPoints = 0;
    computerPoints = 0;
    allPlayerOutcomes = [];
    allPlayerCards = [];
    computerCards = [];
    userName = [];
    userBet = [];
    bankRoll = [];
    currentPlayer = 0;
    // Take in number of players and convert to integer
    numPlayers = Number(input);
    // Use loop to store bank roll for each player in an array
    for (var bankCounter = 0; bankCounter < numPlayers; bankCounter += 1) {
      bankRoll.push(100);
    }
    myOutputValue = `You have chosen to player with ${numPlayers} players <br><br> Please enter all your names with a spacing and without a comma!!`;
    gameMode = INSTRUCTIONS;
  } else if (gameMode == INSTRUCTIONS) {
    // Take in all player's names and convert into individual strings in an array
    stringNames = input;
    userName = stringNames.split(" ");
    var userNameList = generateUserNameList();
    gameMode = ASK_FOR_BET;
    myOutputValue = `Hello Players! <br> ${userNameList} <br><br> Welcome to Blackjack!!! 2️⃣1️⃣♠️❤️♣️♦️ <br><br> These are the rules:<br> You will be dealt two cards after clicking submit <br> The aim is to get 21 points without exceeding it & to score more points than the computer <br> You need to hit a minimum of 17 points <br> Aces are worth either 1 or 11 and can be changed throughout the game <br><br> Press submit to continue`;
  } else if (gameMode == ASK_FOR_BET) {
    // Empty global variables for subsequent rounds
    currentPlayer = 0;
    playerPoints = 0;
    computerPoints = 0;
    allPlayerOutcomes = [];
    allPlayerCards = [];
    computerCards = [];
    userBet = [];
    gameMode = TAKE_BET;
    // Ask player for individual bet amount
    myOutputValue = `${userName}, before we begin enter an amount that each of you would like to bet! <br> Please enter the amount with a space and without a comma`;
  } else if (gameMode == TAKE_BET) {
    gameMode = DEAL_CARDS;
    // Take in user bets and convert into individual integer in an array
    stringBet = input;
    userBet = stringBet.split(" ").map(Number);
    myOutputValue = `${userName}, you have chosen to bet $${userBet} this round respectively. <br><br> Your current bank totals are $${bankRoll}.
    <br><br> When you're ready click submit to play! `;
  } else if (gameMode == DEAL_CARDS) {
    gameMode = SELECT_PLAYER;
    // Create a deck of cards
    createDeck = makeDeck();
    // Shuffle deck of cards
    shuffledDeck = shuffleDeck(cardDeck);
    // Deal two cards to each player and computer
    myOutputValue = dealCards();
  }
  if (gameMode == SELECT_PLAYER) {
    gameMode = PLAYER_ACTION;
    // Selec appropriate patient's cards and check for blackjack, otherwise change allow player to choose their next action
    myOutputValue = selectPlayer();
  }
  if (gameMode == PLAYER_ACTION) {
    if (input == INPUT_CHANGE_ACE) {
      // Ask player to type in position that the ace card is in so that it can be checked if it is really an ace
      gameMode = CHANGE_ACE_MODE;
      return `${
        userName[currentPlayer]
      }, please type in the position of the ace that you want to change <br><br> ${generatePlayerCardList()}`;
    }
    // Once, correct (ace) card is selected, change player's ace card based on input and update player's points
    if (input == ACE_ELEVEN || input == ACE_ONE) {
      myOutputValue = changeAceValue(input);
    }
    // Allow player to draw extra card and update player's points
    if (input == INPUT_HIT) {
      myOutputValue = playerDrawsExtraCard();
    }
    // Allow player to stand and switch to next mode
    if (input == INPUT_STAND) {
      // Ensure that player meets minimum game score required, else change game mode back
      if (playerPoints < 17) {
        gameMode = PLAYER_ACTION;

        return `${
          userName[currentPlayer]
        }, you need at least 17 points. <br><br>Please type 'hit' to draw another card. <br><br> ${generatePlayerCardList()}`;
      }
      gameMode = COMPUTER_CALCULATES;
    }
  }
  if (gameMode == CHANGE_ACE_MODE) {
    // Ensure player has selected an ace card
    myOutputValue = checkForAce(input);
  }
  if (gameMode == COMPUTER_CALCULATES) {
    // Check if computer has enough cards and add if necessary
    myOutputValue = calculateComputerScore();
  }
  if (gameMode == FINAL_RESULT) {
    // Compare player and computer cards and determine winner
    myOutputValue = determineFinalResult();
    if (currentPlayer == numPlayers) {
      gameMode = GAME_SUMMARY;
    } else {
      gameMode = SELECT_PLAYER;
    }
  }
  // Allow player to reset entire game and reselect number of players and usernames
  if (input == INPUT_RESET) {
    gameMode = WAITING_FOR_NAME;
    myOutputValue =
      myOutputValue = `Hello player(s)! <br><br> Please enter the number of people playing`;
  }
  // Output final results of all players
  if (gameMode == GAME_SUMMARY) {
    myOutputValue = displayGameSummary();
    gameMode = ASK_FOR_BET;
  }
  return myOutputValue;
};
