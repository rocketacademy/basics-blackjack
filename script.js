// Global variables
var gameMode = "get player name";
var shuffledDeck = [];
var computerCard = [];
var allPlayersHand = []; // Nested Array. Outer array represents players, inner array holds cards which are objects
var playerName = [];
var playerBets = [];
var playerTurn = 0; // variable to keep track of which player's turn
var playerScore = [];
var winner = "";
var winnerDetermined = false;

// Function to generate deck of cards.
// Picture cards = 10
var deckGeneration = function () {
  var cardDeck = [];
  var suits = ["diamonds", "clubs", "hearts", "spades"];

  for (var i = 0; i < suits.length; i += 1) {
    var cardSuit = "";
    if (suits[i] == "diamonds") {
      cardSuit = "♦️";
    } else if (suits[i] == "clubs") {
      cardSuit = "♣️";
    } else if (suits[i] == "hearts") {
      cardSuit = "❤️";
    } else if (suits[i] == "spades") {
      cardSuit = "♠️";
    }
    var index = 1;
    while (index < 14) {
      var cardName = index;
      var rankIndex = index;
      if (index == 1) {
        cardName = "Ace";
        rankIndex = 11; // Let all Aces be worth 11 points from the start.
      } else if (index == 11) {
        cardName = "Jack";
        rankIndex = 10;
      } else if (index == 12) {
        cardName = "Queen";
        rankIndex = 10;
      } else if (index == 13) {
        cardName = "King";
        rankIndex = 10;
      }
      var card = {
        name: cardName,
        suit: cardSuit,
        rank: rankIndex,
      };
      cardDeck.push(card);
      index += 1;
    }
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
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

// Function to give 100 points to each player when the game initialise.
var assignBankRoll = function () {
  for (var i = 0; i < playerName.length; i += 1) {
    playerScore.push(Number(100));
  }
};

// Function to obtain names of players and store in an array.
var getName = function (input) {
  if (input == "end") {
    gameMode = "get player bets";
    assignBankRoll();
    return `Welcome to the game ${playerName.join(
      ", "
    )}. <br> It's time to place your bets. <br><br> You start off with 100 points. Please input your bet amount.`;
  }

  if (input.length < 1) {
    return `Your name cannot be empty!`;
  }

  playerName.push(input);
  return `Welcome to the game ${playerName.join(
    ", "
  )}. <br><br> Type the next name to register more players. Otherwise, type "end".`;
};

// Helper global variable for this function to track how many players have placed their bets.
var numPlayersPlacedBet = 0;
// Function to get players' bets. Bets are stored in an array.
var getBets = function (input) {
  var index = 0;
  var output = "";
  if (numPlayersPlacedBet < playerName.length - 1) {
    playerBets.push(input);
    output = `${
      playerName[numPlayersPlacedBet]
    } is waging ${input} points. <br><br> ${
      playerName[numPlayersPlacedBet + 1]
    } please input your bet.`;
    numPlayersPlacedBet += 1;
    return output;
  } else {
    playerBets.push(input);
    output = `${playerName[numPlayersPlacedBet]} is waging ${input} points. <br><br> All players have placed their bets. <br> Let the games begin!`;
    gameMode = "shuffle";
    return output;
  }
};

// Function to update the players' current scores given the outcome of the game. First parameter is the index of the player, second parameter is boolean, if true, player wins the bet.
var updateScores = function (playerIndex, playerWon) {
  if (playerWon) {
    playerScore[playerIndex] += Number(playerBets[playerIndex]);
  } else {
    playerScore[playerIndex] -= Number(playerBets[playerIndex]);
  }
};

// Function to print the current points on all players.
var showLeaderboard = function () {
  var output = "";
  for (var i = 0; i < playerName.length; i += 1) {
    output += `${playerName[i]}: ${playerScore[i]} <br>`;
  }
  return `<br><br> ======LEADERBOARD====== <br> ${output} <br><br> To continue to the next round, ${playerName[0]} please input your bet amount for the next round.`;
};

// Function to deal the initial 2 cards to all players. Function takes in the number of players as an integer.
var dealCards = function (numPlayers) {
  var index = 0;
  var inputArray = [];
  while (index < numPlayers) {
    inputArray.push([shuffledDeck[0], shuffledDeck[1]]);
    shuffledDeck.splice(0, 2);
    index += 1;
  }
  return inputArray;
};

// Function to total points of the player's hand. Takes in array of cards on player's hand.
var calculateHand = function (playerHand) {
  var outerIndex = 0;
  var innerIndex = 0;
  var totalScore = 0;
  var numAce = 0;
  var allPlayerPoints = [];
  while (outerIndex < playerHand.length) {
    while (innerIndex < playerHand[outerIndex].length) {
      totalScore += playerHand[outerIndex][innerIndex].rank;
      if (playerHand[outerIndex][innerIndex].name == "Ace") {
        numAce += 1;
      }
      innerIndex += 1;
    }
    if (totalScore > 21 && numAce > 0) {
      totalScore = 0;
      for (var i = 0; i < playerHand[outerIndex].length; i += 1) {
        if (playerHand[outerIndex][i].name == "Ace") {
          playerHand[outerIndex][i].rank = 1;
        }
        totalScore += playerHand[outerIndex][i].rank;
      }
    }
    allPlayerPoints.push(totalScore);
    totalScore = 0;
    innerIndex = 0;
    outerIndex += 1;
  }

  return allPlayerPoints;
};

// Function to print the hands of each player. Input is the array of object for each player.
var printHand = function (playerHand) {
  var index = 0;
  var outputValue = "";
  while (index < playerHand.length) {
    outputValue += `${playerHand[index].name} of ${playerHand[index].suit}<br>`;
    index += 1;
  }
  return outputValue;
};

// Function to compare scores of all players against the dealer.
var compareHands = function (inputPlayerCard, inputComputerCard) {
  var playerCurrentTotal = calculateHand(inputPlayerCard);
  var computerCurrentTotal = calculateHand(inputComputerCard);
  var i = 0;
  var output = [];

  while (i < playerCurrentTotal.length) {
    var playerWon = false;
    // if computer = player, tie. OR If computer bust and player bust, tie.
    if (
      playerCurrentTotal[i] == computerCurrentTotal[0] ||
      (playerCurrentTotal[i] > 21 && computerCurrentTotal[0] > 21)
    ) {
      output.push(
        `This is a draw! Hand Total is ${
          playerCurrentTotal[i]
        } points. <br><br> Player ${playerName[i]} cards: <br> ${printHand(
          inputPlayerCard[i]
        )}<br><br>`
      );
    }

    // if computer < player, player wins. OR If computer bust and player did not, player win.
    else if (
      (playerCurrentTotal[i] > computerCurrentTotal[0] &&
        playerCurrentTotal[i] <= 21) ||
      (computerCurrentTotal[0] > 21 && playerCurrentTotal[i] <= 21)
    ) {
      output.push(
        `Player ${playerName[i]} won the dealer! Hand Total is ${
          playerCurrentTotal[i]
        } points. <br><br> ${playerName[i]} cards: <br> ${printHand(
          inputPlayerCard[i]
        )} <br><br>`
      );
      playerWon = true;
      updateScores(i, playerWon);
    }

    // if computer > player, computer wins. OR player bust and computer did not.
    else {
      output.push(
        `Player ${playerName[i]} lost to the dealer! Hand Total is ${
          playerCurrentTotal[i]
        } points. <br><br> ${playerName[i]} cards: <br> ${printHand(
          inputPlayerCard[i]
        )}<br><br>`
      );
      updateScores(i, playerWon);
    }
    i += 1;
  }
  return output;
};

// Function to reset all global variables for the next round.
var resetGame = function () {
  shuffledDeck = [];
  playerCard = [];
  computerCard = [];
  gameMode = "get player bets";
  winnerDetermined = false;
  playerBets = [];
  numPlayersPlacedBet = 0;
  playerTurn = 0;
};

// Function to draw additional card and add to hand. Function reads the specific playerCard array
var drawAdditionalCard = function (inputPlayerHand) {
  inputPlayerHand.push(shuffledDeck[0]);
  shuffledDeck.splice(0, 1);
};

// Function for computer to hit or stand. Computer has to hit when total hand is below 17.
// Takes in an array of computer current hand.
var computerDecisions = function (inputComputerCard) {
  var index = 0;
  var outputValue = "";
  var computerCurrentTotal = calculateHand(inputComputerCard);
  if (computerCurrentTotal > 17) {
    return `The dealer has decided not to hit. <br><br> Click "submit" to compare all players' hands.`;
  }

  while (computerCurrentTotal < 17) {
    drawAdditionalCard(inputComputerCard[0]);
    computerCurrentTotal = calculateHand(inputComputerCard);
    index += 1;
  }
  return `The dealer has drawn ${index} card(s). <br><br> Click "submit" to compare all players' hands.`;
};

//  Main function to run the game
var main = function (input) {
  var outputValue = "";
  var playerState = [];
  if (gameMode == "get player name") {
    return getName(input);
  }

  if (gameMode == "get player bets") {
    return getBets(input);
  }

  if (gameMode == "shuffle") {
    shuffledDeck = shuffleCards(deckGeneration());
    gameMode = "deal";
    return `The deck has been shuffled. <br><br> Click "Submit" to deal cards.`;
  }

  if (gameMode == "deal") {
    allPlayersHand = dealCards(playerName.length);
    computerCard = dealCards(1);
    gameMode = "player turn";
    return `Click "submit" for each player to start looking at their own hand.`;
  }

  if (gameMode == "player turn" && playerTurn < playerName.length) {
    var playerCurrentTotal = calculateHand(allPlayersHand);
    var computerCurrentTotal = calculateHand(computerCard);
    gameMode = "player choice";
    return `${playerName[playerTurn]}, you drew: <br> ${printHand(
      allPlayersHand[playerTurn]
    )} <br><br> Please input "hit" or "stand". `;
  }

  if (gameMode == "player choice") {
    if (!(input == "hit" || input == "stand")) {
      return `Please input only "hit" or "stand".`;
    }

    var output = "";
    var lastPlayerDecided = false;
    if (playerTurn == playerName.length - 1) {
      lastPlayerDecided = true;
      var lastStatement =
        "All players have made their moves. <br><br> The dealer will make his move now.";
    } else {
      lastStatement = `Click "submit" for ${
        playerName[playerTurn + 1]
      }'s turn.`;
    }

    if (input == "hit") {
      drawAdditionalCard(allPlayersHand[playerTurn]);
      if (
        calculateHand(allPlayersHand)[playerTurn] > 21 &&
        lastPlayerDecided == false
      ) {
        gameMode = "player turn";
        output = `On your hand: <br> ${printHand(
          allPlayersHand[playerTurn]
        )} <br><br> Your total has exceeded 21. You can only stand. <br><br> ${lastStatement}`;
        playerTurn += 1;
        return output;
      } else if (
        calculateHand(allPlayersHand)[playerTurn] > 21 &&
        lastPlayerDecided
      ) {
        gameMode = "computer choice";
        output = `On your hand: <br> ${printHand(
          allPlayersHand[playerTurn]
        )} <br><br> Your total has exceeded 21. You can only stand. <br><br> ${lastStatement}`;
        playerTurn += 1;
        return output;
      } else {
        return `On your hand: <br> ${printHand(
          allPlayersHand[playerTurn]
        )} <br><br> Please input "hit" or "stand".`;
      }
    }

    if (input == "stand" && !lastPlayerDecided) {
      gameMode = "player turn";
      playerTurn += 1;
      return `${lastStatement}`;
    } else if (input == "stand" && lastPlayerDecided) {
      gameMode = "computer choice";
      playerTurn += 1;
      return `${lastStatement}`;
    }
  }

  if (gameMode == "computer choice") {
    gameMode = "compare hands";
    return computerDecisions(computerCard);
  }

  if (gameMode == "compare hands") {
    var dealerOutput = `Dealer hand total is ${
      calculateHand(computerCard)[0]
    } points. <br><br> Dealer cards: <br>${printHand(computerCard[0])}`;
    var finalOutput = compareHands(allPlayersHand, computerCard).join("");
    resetGame();
    return `${finalOutput} ${dealerOutput} <br><br> ${showLeaderboard()}`;
  }
};
