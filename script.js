//===== BLACK JACK GAME =====//
// Step 1 - Shuffle Deck
// Step 2 - Deal 2 cards each to Player and Computer (Dealer).
// Step 3 - Player chooses whether to "hit" or "stand".
// Step 4 - Player card selection is finalized.
// Step 5 - Computer (Dealer) card selection is finalized.
// Step 6 - Compare Player's cards against Computer's cards, and determine winner.
// Step 7 - Game resets and continues.

// Planning
// 1) Define game states and global variables.
// 2) Make create (make) deck helper function. - Helper Function 1
// 3) Make shuffle deck helper function. - Helper Function 2
// 4) Make 2 separate arrays to store Player's Cards and Computer Cards.
// 5) Main function - Change to game state for Dealing Cards from base state (Press Submit), and output message for displaying 2 cards to Player, and showing 2 cards on Computer's hand.
// 6) Main function - Game State to shift to Player inputing whether to "hit" or "stand".
// 7) Main function - Game State to shift to Player receiving 1 card per turn if Player chooses "hit".
// 8) Main function - Game State to shift to Dealer receiving cards if Dealer has less than score = 17.
// 8) (Otherwise) Main function - Game State to shift to Compare Cards between Player and Computer (Dealer) if Player chooses "stand".
// 9) Make dealing card helper function. - Helper Function 3
// 10) Make Computer card generation helper function. - Helper Function 4
// 11) Make compare scores helper function. - Helper Function 5
// 12) Make reset game helper function. - Helper Function 6
// 13) Make computing score helper function. - Helper Function 7
// 14) Compute scores for Aces on hand within Helper Function 7.
// 15) Make reveal card hand function - Helper Function 8.

// Global Variables
// GV - Constants
const GAME_STATE_START_GAME = "Game State - Start of Game";
const GAME_STATE_DEAL_CARDS = "Game State - Deal Cards";
const GAME_STATE_CHOOSE_PLAYER_CHOICE = "Game State - Choose Hit or Stand";
const GAME_STATE_DEAL_COM_ADD_CARDS =
  "Game State - Computer - Deal Additional Cards";
const GAME_STATE_COMPARE_CARDS = "Game State - Compare Cards";

// GV - Variables
var gameState = GAME_STATE_START_GAME;
var gameRound = 0;
var dealCardPlayerRound = 1;
var playerScore = 0;
var computerScore = 0;
var currentPlayerScore = 0;
var currentPlayerScoreNumber = 0;
var currentComputerScore = 0;
var currentComputerScoreNumber = 0;
var instructionToPlayer = `To Player - <br><br> Please input "hit" 👈 if you like to draw an additional card from the deck <br><br> OR <br><br> "stand" ✋ if you are satisfied with your hand and would like to compare your score against the Computer.`;
var instructionToPlayerChooseStand = `To Player - <br><br> You have chosen to "stand" ✋.<br>Please press the Submit button to reveal the Computer's final hand.`;
var playerCard = "";
var computerCard = "";

// Arrays
var playerHand = [];
var computerHand = [];
var cardDeck = [];
var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
var emoji = ["♥", "♦", "♣", "♠"];

// Helper Functions
// Helper Function 1 - Make Deck Function
var makeDeck = function () {
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = emoji[suitIndex];
    var cardIndex = 1;
    while (cardIndex <= 13) {
      var cardName = cardIndex;
      var cardScore = cardName;
      var cardImageArray = [
        "🅰",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
        "7️⃣",
        "8️⃣",
        "9️⃣",
        "🔟",
        "Jack - 👲",
        "Queen - 👸",
        "King - 🤴",
      ];
      var cardImage = cardImageArray[cardIndex - 1];
      if (cardName == 1) {
        cardName = "Ace";
        cardScore = 11;
      }
      if (cardName == 11) {
        cardName = "Jack";
        cardScore = 10;
      }
      if (cardName == 12) {
        cardName = "Queen";
        cardScore = 10;
      }
      if (cardName == 13) {
        cardName = "King";
        cardScore = 10;
      }
      var card = {
        name: cardName,
        score: cardScore,
        suit: currentSuit,
        emoji: currentEmoji,
        image: cardImage,
      };
      cardDeck.push(card);
      cardIndex += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// Helper Function 2 - Shuffle Deck Function
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
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

// Helper Function 3 - Deal Card Function - Player
var dealPlayerCard = function (cardDeck) {
  if (gameState == GAME_STATE_DEAL_CARDS) {
    var dealPlayerIndex = 0;
    while (dealPlayerIndex < 2) {
      playerHand.push(cardDeck.pop());
      dealPlayerIndex += 1;
    }
    playerCard = `Player's hand is ${playerHand[0].image} of ${playerHand[0].suit}  ${playerHand[0].emoji} and ${playerHand[1].image} of ${playerHand[1].suit}  ${playerHand[1].emoji}.`;
  } else if (gameState == GAME_STATE_CHOOSE_PLAYER_CHOICE) {
    var playerInitialCardGameMessage = `Player's initial cards are ${playerHand[0].image} of ${playerHand[0].suit}  ${playerHand[0].emoji} and ${playerHand[1].image} of  ${playerHand[1].suit}  ${playerHand[1].emoji}.`;
    playerHand.push(cardDeck.pop());
    dealCardPlayerRound += 1;
    var currentPlayerHand = revealPlayerHand(playerHand);
    var playerCard =
      playerInitialCardGameMessage +
      ` Player was subsequently dealt with the following card this turn: ${playerHand[dealCardPlayerRound].image} of ${playerHand[dealCardPlayerRound].suit}  ${playerHand[dealCardPlayerRound].emoji}.<br><br> Player's current hand is ${currentPlayerHand}.`;
  }
  return playerCard;
};

// Helper Function 4 - Deal Card Function - Computer
var dealComputerCard = function (cardDeck) {
  if (gameState == GAME_STATE_DEAL_CARDS) {
    var dealComputerIndex = 0;
    while (dealComputerIndex < 2) {
      computerHand.push(cardDeck.pop());
      dealComputerIndex += 1;
    }
    computerCard = `Computer's hand is ${computerHand[0].image} of ${computerHand[0].suit}  ${computerHand[0].emoji} and ${computerHand[1].image} of ${computerHand[1].suit}  ${computerHand[1].emoji}.`;
    return computerCard;
  } else if (gameState == GAME_STATE_DEAL_COM_ADD_CARDS) {
    // If computer hand is less than 17, to deal additional card
    if (computerScore < 17) {
      var dealAddComputerIndex = 0;
      while (dealAddComputerIndex < cardDeck.length) {
        if (computerScore < 17) {
          computerHand.push(cardDeck.pop());
          computeComputerScore(computerHand);
        }
        dealAddComputerIndex += 1;
      }
      // If computer hand is more than 17, to switch to compare cards.
    } else if (computerScore >= 17) {
      gameState = GAME_STATE_COMPARE_CARDS;
    }
  }
  return computerCard;
};

// Helper Function 5 - Compare Scores Function

var compareScores = function (
  playerHand,
  computerHand,
  playerScore,
  computerScore
) {
  var finalComputerHand = revealComputerHand(computerHand);
  var finalPlayerHand = revealPlayerHand(playerHand);
  var finalComputerScore = computerScore;
  var finalPlayerScore = playerScore;
  var resultMessage = "";
  var winPlayerMessage =
    "Player's score is higher than Computer's score! Player won!";
  var losePlayerMessage =
    "Player's score is lower than Computer's score! Player lost!";
  var tiePlayerMessage = "It is a tie!";
  var bustPlayerMessage =
    "Player's score is more than 21, while Computer's score is still less than 21. Player lost!";
  var bustComputerMessage =
    "Player's score is less than 21, while Computer's score is more than 21. Computer lost!";
  var bustTieMessage =
    "Both Player's and Computer's scores are more than 21! Both Player and Computer bust.";
  var blackjackWinPlayerMessage =
    "Player's score is equal to 21. Player won by blackjack!";
  var blackjackLosePlayerMessage =
    "Computer's score is equal to 21. Computer won by blackjack!";
  var resetGameMessage = "Press the Submit button to reset the game!";
  var finalPlayerHandScoreMessage = `Player's final hand is ${finalPlayerHand}, <br> and Player's final score is ${finalPlayerScore}.`;
  var finalComputerHandScoreMessage = `Computer's final hand is ${finalComputerHand}, <br> and Computer's final score is ${finalComputerScore}. `;
  // If both Player and Computer bust
  if (finalPlayerScore > 21 && finalComputerScore > 21) {
    resultMessage = `${bustTieMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}`;
  }
  // If Players bust and Computer wins, incl blackjack
  else if (finalPlayerScore > 21 && finalComputerScore <= 21) {
    if (finalComputerScore == 21) {
      resultMessage = `${bustPlayerMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}<br><br>${blackjackLosePlayerMessage}`;
    } else {
      resultMessage = `${bustPlayerMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}`;
    }
  }
  // If Player wins, incl blackjack and Computer busts
  else if (finalPlayerScore <= 21 && finalComputerScore > 21) {
    if (finalPlayerScore == 21) {
      resultMessage = `${bustComputerMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}<br><br>${blackjackWinPlayerMessage}`;
    } else {
      resultMessage = `${bustComputerMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}`;
    }
  }
  // If Player and Computer draw
  else if (finalPlayerScore == finalComputerScore) {
    resultMessage = `${tiePlayerMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}`;
  }
  // If Player wins, incl blackjack
  else if (finalPlayerScore > finalComputerScore) {
    if (finalPlayerScore == 21) {
      resultMessage = `${blackjackWinPlayerMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}`;
    } else {
      resultMessage = `${winPlayerMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}`;
    }
  }
  // If Computer wins, incl blackjack
  else if (finalPlayerScore < finalComputerScore) {
    if (finalComputerScore == 21) {
      resultMessage = `${blackjackLosePlayerMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}`;
    } else {
      resultMessage = `${losePlayerMessage}<br><br>${finalPlayerHandScoreMessage}<br><br>${finalComputerHandScoreMessage}`;
    }
  }
  return `${resultMessage}<br><br>${resetGameMessage}`;
};

// Helper Function 6 - Reset Game Function

var resetGame = function () {
  playerHand = [];
  computerHand = [];
  cardDeck = [];
  playerScore = 0;
  computerScore = 0;
  gameRound += 1;
  gameState = GAME_STATE_START_GAME;
};

// Helper Function 7 - Score Computation Function
// Player Score Computation
var computePlayerScore = function (playerHand) {
  var playerScoreIndex = 0;
  var playerScoreMessage = "";
  var aceCounter = 0;
  playerScore = 0;
  // Search for Aces within Player Hand
  while (playerScoreIndex < playerHand.length) {
    var currentPlayerCardOnHand = playerHand[playerScoreIndex];
    if (currentPlayerCardOnHand.name == "Ace") {
      aceCounter += 1;
    }
    playerScore += currentPlayerCardOnHand.score;
    playerScoreIndex += 1;
  }
  // If player score is above 21, each Ace's score to change to 1
  var indexAce = 0;
  if (playerScore > 21) {
    while (indexAce < aceCounter) {
      playerScore = playerScore - 10;
      indexAce += 1;
    }
  }
  playerScoreMessage = `Player's current score is ${playerScore}.`;
  return playerScoreMessage;
};
// Computer Score Computation
var computeComputerScore = function (computerHand) {
  var computerScoreIndex = 0;
  var computerScoreMessage = "";
  computerScore = 0;
  // Search for Aces within Computer Hand
  while (computerScoreIndex < computerHand.length) {
    var currentComputerCardOnHand = computerHand[computerScoreIndex];
    if (currentComputerCardOnHand.name == "Ace") {
      aceCounter += 1;
    }
    computerScore += currentComputerCardOnHand.score;
    computerScoreIndex += 1;
  }
  // If computer score is above 21, each Ace's score to change to 1
  var indexAce = 0;
  if (computerScore > 21) {
    while (indexAce < aceCounter) {
      computerScore = computerScore - 10;
      indexAce += 1;
    }
  }
  computerScoreMessage = `Computer's current score is ${computerScore}.`;
  return computerScoreMessage;
};

// Helper Function 8 - reveal card hands
// Reveal Player's Hand
var revealPlayerHand = function (playerHand) {
  var playerHandIndex = 0;
  var currentFullPlayerHand = "";
  var currentFullPlayerHandArray = [];
  // To record player hand
  while (playerHandIndex < playerHand.length) {
    currentFullPlayerHand = `<br> ${playerHand[playerHandIndex].image} of ${playerHand[playerHandIndex].emoji}`;
    currentFullPlayerHandArray.push(currentFullPlayerHand);
    playerHandIndex += 1;
  }
  return currentFullPlayerHandArray;
};
// Reveal Computer's Hand
var revealComputerHand = function (computerHand) {
  var computerHandIndex = 0;
  var currentFullComputerHand = "";
  var currentFullComputerHandArray = [];
  // To record computer hand
  while (computerHandIndex < computerHand.length) {
    currentFullComputerHand = `<br> ${computerHand[computerHandIndex].image} of ${computerHand[computerHandIndex].emoji}`;
    currentFullComputerHandArray.push(currentFullComputerHand);
    computerHandIndex += 1;
  }
  return currentFullComputerHandArray;
};

// Main Function

var main = function (input) {
  var gameMessage = "";
  if (gameState == GAME_STATE_START_GAME) {
    // Shuffle Deck
    shuffleDeck(makeDeck());
    gameState = GAME_STATE_DEAL_CARDS;
    return (gameMessage = `The deck has been shuffled. Please press the Submit button to start the game!`);
  }
  // Deal Cards and display Player and Computer Cards
  else if (gameState == GAME_STATE_DEAL_CARDS) {
    var playerCard = dealPlayerCard(cardDeck);
    var computerCard = dealComputerCard(cardDeck);
    currentPlayerScore = computePlayerScore(playerHand);
    currentPlayerScoreNumber = playerScore;
    currentComputerScore = computeComputerScore(computerHand);
    currentComputerScoreNumber = computerScore;
    gameMessage =
      playerCard +
      `<br><br>` +
      currentPlayerScore +
      `<br><br><br>` +
      computerCard +
      `<br><br>` +
      currentComputerScore +
      `<br><br><br><br>` +
      instructionToPlayer;
    gameState = GAME_STATE_CHOOSE_PLAYER_CHOICE;
    return gameMessage;
  }
  // Player chooses to "hit" or "stand"
  else if (gameState == GAME_STATE_CHOOSE_PLAYER_CHOICE) {
    if (!(input == "hit" || input == "stand")) {
      gameMessage =
        'Invalid input! Please type in either "hit" or "stand" to continue playing the game!';
      gameState = GAME_STATE_CHOOSE_PLAYER_CHOICE;
      return gameMessage;
    } else if (input == "hit") {
      var addPlayerCard = dealPlayerCard(cardDeck);
      var currentAddPlayerScore = computePlayerScore(playerHand);
      gameMessage =
        addPlayerCard +
        `<br><br>` +
        currentAddPlayerScore +
        `<br><br><br><br>` +
        instructionToPlayer;
      if (input == "stand") {
        gameMessage = instructionToPlayerChooseStand;
        gameState = GAME_STATE_DEAL_COM_ADD_CARDS;
      }
      return gameMessage;
    } else if (input == "stand") {
      gameMessage = instructionToPlayerChooseStand;
      gameState = GAME_STATE_DEAL_COM_ADD_CARDS;
    }
    return gameMessage;
  }
  // Computer to be dealt cards if current hand is less than 17
  else if (gameState == GAME_STATE_DEAL_COM_ADD_CARDS) {
    dealComputerCard(cardDeck);
    var currentFinalComputerHand = revealComputerHand(computerHand);
    gameState = GAME_STATE_COMPARE_CARDS;
    gameMessage = `Computer's final hand is ${currentFinalComputerHand}, <br> and Computer's final score is ${computerScore}. <br><br>Please press the Submit button to compare scores!`;
    return gameMessage;
  }
  // Once player and computer hands finalized, to compare scores
  else if (gameState == GAME_STATE_COMPARE_CARDS) {
    var scoreComparison = compareScores(
      playerHand,
      computerHand,
      playerScore,
      computerScore
    );
    gameMessage = scoreComparison;
    // Reset game
    resetGame();
  }
  return gameMessage;
};
