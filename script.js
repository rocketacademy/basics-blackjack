// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start. (both face up, dealer has 1 card open and 1 card closed)
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

//global variables
var deck = [];
var gameMode = "first round";
var winningMode = ""; //blackjack, bigger number max 21
var playerHand = []; //to reset
var computerHand = [];
var gameRound = 1;

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
function shuffleDeck() {
  for (i = 0; i < deck.length; i += 1) {
    var randomIndex = getRandomNumber(deck.length);
    var currentIndex = i;
    var currentCard = deck[currentIndex];
    var randomCard = deck[randomIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
}

function getStartingHand(numberOfCards, array) {
  for (i = 0; i < numberOfCards; i += 1) {
    var card = dealCard();
    array.push(card);
  }
  return array;
}

function dealCard() {
  var drawnCard = deck.pop();
  return drawnCard;
}

function displayUserCards(array) {
  var output = `drew: <br>`;
  for (i = 0; i < array.length; i += 1) {
    output = output + `${array[i].name} of ${array[i].suit}<br>`;
  }
  return output;
}

// find total to determine ace rank and to determine whether dealer draws a card
function findCardTotal(array) {
  var cardTotal = 0;
  for (i = 0; i < array.length; i += 1) {
    cardTotal += array[i].rank;
  }
  return cardTotal;
}

function assignAceRank(array) {
  var cardTotal = findCardTotal(array);
  for (i = 0; i < array.length; i += 1) {
    if (array[i].rank === 1) {
      if (cardTotal === 11) {
        array[i].rank = 11; //playerhand array updated with new rank
      }
      cardTotal = findCardTotal(array);
    }
  }
  return cardTotal;
}

function getComputerDecision() {} //is this the same as assignAceRank()?

function isMatch(number, cardTotal) {
  return cardTotal === number;
}

function isBust(number, cardTotal) {
  return cardTotal > number;
}

function checkWinningMode(playerHand, computerHand) {
  var playerCardTotal = assignAceRank(playerHand);
  var computerCardTotal = assignAceRank(computerHand);
  var playerBlackjack = isMatch(21, playerCardTotal);
  var computerBlackjack = isMatch(21, computerCardTotal);
  if (playerBlackjack || computerBlackjack) {
    winningMode = "blackjack";
  } else {
    if (gameRound === 1) {
      gameMode = "game continues";
      gameRound += 1;
    } else {
      winningMode = "bigger number";
    }
  }
}

function findBlackjack(playerHand, computerHand) {
  if (winningMode === "blackjack") {
    var playerCardTotal = assignAceRank(playerHand);
    var computerCardTotal = assignAceRank(computerHand);
    var winner = "Blackjack! ";
    winner = +findWinner(playerCardTotal, computerCardTotal);
  }
  // if (playerBlackjack === computerBlackjack) {
  //   winner += "tie";
  // } else if (playerBlackjack) {
  //   winner += "player";
  // } else {
  //   winner += "computer";
  // }
  return winner;
}

function findWinner(playerCardTotal, computerCardTotal) {
  if (playerCardTotal === computerCardTotal) {
    var winner = "It's a tie";
  } else if (playerCardTotal > computerCardTotal) {
    winner = "Player wins";
  } else {
    winner = "Computer wins";
  }
  return winner;
}

function displayMessage() {
  var playerCardTotal = assignAceRank(playerHand);
  var computerCardTotal = assignAceRank(computerHand);
  if (winningMode === "blackjack") {
    var output =
      "Blackjack! " +
      findWinner(playerCardTotal, computerCardTotal) +
      ". Game restarts";
  } else if (gameMode === "game continues") {
    output = "No blackjack, game continues. Player please choose hit or stand!";
  } else if (winningMode === "bigger number") {
    output = findWinner(playerCardTotal, computerCardTotal);
  }
  return output;
}

function isGreaterThan(number, cardTotal) {
  //Boolean
  return cardTotal > number;
}

function restartGame() {
  playerHand = [];
  computerHand = [];
}

function displayGameStatus() {} //?

var main = function (input) {
  //first round
  if (gameMode === "first round") {
    makeDeck();
    shuffleDeck();
    playerHand = getStartingHand(2, playerHand);
    computerHand = getStartingHand(2, computerHand);
    // playerHand = [{ rank: 1 }, { rank: 10 }];
    // computerHand = [{ rank: 1 }, { rank: 10 }];
    var output = `Player ${displayUserCards(
      playerHand
    )} Computer ${displayUserCards(computerHand)}`;
    // gameMode = "find winner";
    checkWinningMode(playerHand, computerHand);
    if (winningMode === "blackjack") {
      output = output + displayMessage();
      restartGame();
      gameMode = "first round";
    } else {
      gameMode = "game continues";
      output = output + displayMessage();
    }
  }
  //second round onwards
  else if (gameMode === "game continues") {
    gameMode = input;
    if (gameMode === "hit") {
      console.log(gameMode);
      playerHand = getStartingHand(1, playerHand);
      output = displayUserCards(playerHand);
      gameMode = "stand";
    } else if (gameMode === "stand") {
      console.log("stand");
      getComputerDecision();
    }
    gameMode = "find winner";
  } else if (gameMode === "find winner") {
    var playerCardTotal = findCardTotal(playerHand);
    var computerCardTotal = findCardTotal(computerHand);
    if (
      isGreaterThan(21, playerCardTotal) ||
      isGreaterThan(21, computerCardTotal)
    ) {
      if (playerCardTotal === computerCardTotal) {
        output = "Player and computer bust. It's a tie. Game restarts";
      } else if (isGreaterThan(21, playerCardTotal)) {
        output = "Player busts. Computer wins";
      } else {
        output = "Computer busts. Player wins";
      }
    }
  }
  return output;
};

//card deck
function makeDeck() {
  for (i = 0; i < 4; i += 1) {
    var allSuits = ["diamonds ♦️", "spades ♠️", "clubs ♣️", "hearts ♥️"];
    var currentSuit = allSuits[i];
    for (j = 1; j <= 13; j += 1) {
      var currentRank = j;
      var currentName = String(j);
      if (currentRank === 1) {
        currentName = "ace";
      } else if (currentRank === 11) {
        currentName = "jack";
        currentRank = 10;
      } else if (currentRank === 12) {
        currentName = "queen";
        currentRank = 10;
      } else if (currentRank === 13) {
        currentName = "king";
        currentRank = 10;
      }
      var currentCard = {
        name: currentName,
        suit: currentSuit,
        rank: currentRank,
      };
      deck.push(currentCard);
    }
  }
  return deck;
}
