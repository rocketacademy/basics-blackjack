//helper functions provided by rocket in 9.1 & 9.2
//make a deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts♥️", "Diamonds♦️", "Clubs♣️", "Spades♠️"];

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
      // These are custom lines added for blackjack scoring. add cardscore, then setting ace, j q and k to score 10 points worth each. we will deal with ace being a variable score later during the main function
      let cardScore = rankCounter;

      if (cardScore === 11 || cardScore === 12 || cardScore === 13) {
        cardScore = 10;
      }
      if (cardScore === 1) {
        cardScore = 11;
      }

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: cardScore,
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
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

/* things to do
1) edit the card editor to add in points for blackjack score counting (D)
3) plan for states
  a) "initialize" should make it such that when you click submit. draws 2 cards, shows player the results and total score. tells you to hit or stand.
  b) "playerMidgame" should have 2 inputs, hit or stand. plays a card if hit, shows the results and total score.
   ace will be lowered to score 10 if a card is hit. check for bust, if bust and in the presence of ace, reduce ace to 1.
   if stand, move game phase to "computerMidgame"
  c) "computerMidgame" should basically make the cpu hit until the cpu is either bigger than player, or busts. then moves to "result" phase  
  d) "result" phase shows who has won. moves it to cleaning phase
  e) "cleaning" phase will resets the deck, the hand and all required stuff on submit, moves it back to "initialize"
*/

let deck = shuffleCards(makeDeck());
let gameState = "initialize";
let playerHand = [];
let computerHand = [];
let playerScore = 0;
let computerScore = 0;
let playerBustStatus = false;
let computerBustStatus = false;
let playerWonTimes = 0;
let computerWonTimes = 0;
//main game
function main(gameInput) {
  let input = gameInput.toLowerCase();
  if (gameState === "initialize") {
    if (input !== "") {
      return `Hello Player! Please do not type in anything and just press submit to start a game of Blackjack!`;
    } else {
      dealInitialHands();
      console.log(playerHand, computerHand);
      if (checkInitialHands(playerHand, computerHand) === "double blackjack") {
        gameState = "result";
        return "It is a double blackjack! It is a draw!";
      } else if (
        checkInitialHands(playerHand, computerHand) === "player blackjack"
      ) {
        gameState = "result";
        return "You Win! You have a blackjack!";
      } else if (
        checkInitialHands(playerHand, computerHand) === "computer blackjack"
      ) {
        gameState = "result";
        return "You Lose! Computer has a blackjack! ";
      } else if (
        checkInitialHands(playerHand, computerHand === "game continue")
      ) {
        // gameState = "playerHitOrStand";
        checkForAces(playerHand);
        playerScore = calculatePlayerScore(playerHand);
        computerScore = calculateComputerScore(computerHand);
        gameState = "playerMidgame";
        console.log(playerScore);
        console.log(computerScore);
        return outputMessage();
      }
    }
  } else if (gameState === "playerMidgame") {
    if (input !== "h" && input !== "s") {
      return `Please input only hit or stand!<br>${outputMessage()}`;
    } else if (input === "h") {
      playerHand.push(deck.pop());
      checkForAces(playerHand);
      playerScore = calculatePlayerScore(playerHand);
      console.log(playerScore, playerHand);
      if (playerScore > 21) {
        gameState = "computerMidgame";
        playerBustStatus = true;
        return `You drew a ${playerHand[playerHand.length - 1].name} of ${
          playerHand[playerHand.length - 1].suit
        }! You BUSTED at💣${playerScore}💣!<br><br> The Computer will now take it's turn!<br> ${outputMessageForCPU()} Click Submit to proceed! `;
      }
      return `${outputMessage()}`;
    } else if (input === "s") {
      gameState = "computerMidgame";
      return `You have chosen to stand at ${playerScore} points!<br><br> The Computer will now take it's turn!<br> ${outputMessageForCPU()}`;
    }
  } else if (gameState === "computerMidgame") {
    console.log(computerScore, computerHand);
    if (computerScore > 21) {
      gameState = "result";
      computerBustStatus = true;
      return `The Computer drew ${
        computerHand[computerHand.length - 1].name
      } of ${
        computerHand[computerHand.length - 1].suit
      }! The Computer BUSTED at 💣${computerScore}💣!<br><br> Click Submit to proceed!`;
    } else if (computerScore < 17) {
      computerHand.push(deck.pop());
      checkForAces(computerHand);
      computerScore = calculateComputerScore(computerHand);
      return outputMessageForCPU();
    } else if (computerScore > 16 && computerScore < 22) {
      gameState = "result";
      return `The Computer has chosen to stand at ${computerScore}! Click Submit to Proceed!`;
    } else {
      return "ERROR: LOGIC WRONG PLEASE CHECK";
    }
  } else if (gameState === "result") {
    gameState = "scoreboard";
    if (playerBustStatus && computerBustStatus) {
      return `Both players have 💣BUSTED💣! It is a draw!<br>You scored ${playerScore}!<br> The Computer scored ${computerScore}!<br>Click Submit to head to the scoreboard!`;
    } else if (!playerBustStatus && computerBustStatus) {
      playerWonTimes += 1;
      return `You won!<br> You scored ${playerScore}!<br>The Computer scored 💣💣${computerScore}💣💣!<br>Click Submit to head to the scoreboard!`;
    } else if (playerBustStatus && !computerBustStatus) {
      computerWonTimes += 1;
      return `The Computer won!<br> You scored 💣💣${playerScore}💣💣!<br>The Computer scored ${computerScore}!<br>Click Submit to head to the scoreboard!`;
    } else if (playerScore === computerScore) {
      return `Both players have scored ${playerScore}!<br> It is a draw!<br> Click Submit to head to the scoreboard!`;
    } else if (playerScore > computerScore) {
      playerWonTimes += 1;
      return `You won!<br> You scored ${playerScore}!<br>The Computer scored ${computerScore}! Click Submit to head to the scoreboard!`;
    } else if (playerScore < computerScore) {
      computerWonTimes += 1;
      return `The Computer won!<br> You scored ${playerScore}!<br>The Computer scored ${computerScore}! Click Submit to head to the scoreboard! `;
    } else {
      return "THE RESULT LOGIC WENT WRONG";
    }
  } else if (gameState === "scoreboard") {
    refreshEverything();
    return `Scoreboard- You : Computer <br> ${playerWonTimes} : ${computerWonTimes}<br> Click Submit to start a new round!`;
  }
}
// dealing initial hands small function.
function dealInitialHands() {
  for (let i = 0; i < 2; i++) {
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
  }
}

//checking initial hand for blackjacks
function checkInitialHands(playerHand, computerHand) {
  let playerStartScore = 0;
  let computerStartScore = 0;
  let initialPhaseResult = "";
  for (let i = 0; i < playerHand.length; i += 1) {
    playerStartScore += playerHand[i].score;
  }
  for (let j = 0; j < computerHand.length; j += 1) {
    computerStartScore += computerHand[j].score;
  }
  if (playerStartScore === computerStartScore && playerStartScore === 21) {
    initialPhaseResult = "double blackjack";
  } else if (playerStartScore === 21 && computerStartScore !== 21) {
    initialPhaseResult = "player blackjack";
  } else if (playerStartScore !== 21 && computerStartScore === 21) {
    initialPhaseResult = "computer blackjack";
  } else {
    initialPhaseResult = "game continue";
  }
  return initialPhaseResult;
}
// function to reset the whole game
function refreshEverything() {
  gameState = "initialize";
  deck = [];
  deck = shuffleCards(makeDeck());
  playerHand = [];
  computerHand = [];
  playerScore = 0;
  computerScore = 0;
  playerBustStatus = false;
  computerBustStatus = false;
}

//function to display all players cards depending on current size of hand
function callCards() {
  let message = "";
  for (i = 0; i < playerHand.length; i += 1) {
    message += `<br>${playerHand[i].name} of ${playerHand[i].suit} [${playerHand[i].score}]`;
  }
  return message;
}

// function to display all cpu cards depending on current size of hand
function callCPUCards() {
  let message = "";
  for (i = 0; i < computerHand.length; i += 1) {
    message += `<br>${computerHand[i].name} of ${computerHand[i].suit} [${computerHand[i].score}]`;
  }
  return message;
}

//function to calculate player scores
function calculatePlayerScore(playerHand) {
  let score = 0;
  for (let i = 0; i < playerHand.length; i += 1) {
    score += playerHand[i].score;
  }
  return score;
}

//function to calculate computer scores
function calculateComputerScore(computerHand) {
  let score = 0;
  for (let i = 0; i < computerHand.length; i += 1) {
    score += computerHand[i].score;
  }
  return score;
}
//function to check for aces, and reduce ONLY one ace each time if there are multiple aces.
function checkForAces(playerHand) {
  let temporaryPlayerScore = calculatePlayerScore(playerHand);
  if (temporaryPlayerScore > 21) {
    for (let i = 0; i < playerHand.length; i += 1) {
      if (playerHand[i].name === "Ace") {
        playerHand[i].name = "🂡 Ace";
        playerHand[i].score = 1;
        break;
      }
    }
  }
}
//output message for player turn
function outputMessage() {
  return `The Cards that you drew are as follows..${callCards()}<br>The total sum is currently ${playerScore}.<br> Please decide if you would like to Hit or Stand! Submit h to hit and submit s to stand!`;
}

//output message for computer turn
function outputMessageForCPU() {
  return `The Cards that the CPU drew are as follows.. ${callCPUCards()}<br>The total sum is currently ${computerScore}. <br> Please click on submit to proceed!`;
}
