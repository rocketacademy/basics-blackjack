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

function displayAllPlayerCards() {
  var output = `Player ${displayUserCards(
    playerHand
  )} <br>Computer ${displayUserCards(computerHand)}`;
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

function isMatch(number, cardTotal) {
  return cardTotal === number;
}

function isLessThan(number, array) {
  var cardTotal = findCardTotal(array);
  return cardTotal < number;
}

function isBust(number, cardTotal) {
  //Boolean
  return cardTotal > number;
}

function checkWinningMode() {
  var playerCardTotal = findCardTotal(playerHand);
  var computerCardTotal = findCardTotal(computerHand);
  var playerBlackjack = isMatch(21, playerCardTotal);
  var computerBlackjack = isMatch(21, computerCardTotal);
  if (isBust(21, playerCardTotal) || isBust(21, computerCardTotal)) {
    winningMode = "bust";
  } else if (playerBlackjack || computerBlackjack) {
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

// function findBlackjack(playerHand, computerHand) {
//   if (winningMode === "blackjack") {
//     var playerCardTotal = findCardTotal(playerHand);
//     var computerCardTotal = findCardTotal(computerHand);
//     var winner = "Blackjack! ";
//     winner += findRoundWinner(playerCardTotal, computerCardTotal);
//   }
//   return winner;
// }

function findRoundOutcome() {
  var playerCardTotal = findCardTotal(playerHand);
  var computerCardTotal = findCardTotal(computerHand);
  if (playerCardTotal === computerCardTotal) {
    var output = "Player and computer";
  } else if (playerCardTotal > computerCardTotal) {
    output = "Player";
  } else {
    output = "Computer";
  }
  return output;
}

function craftMessage() {
  var playerCardTotal = findCardTotal(playerHand);
  var computerCardTotal = findCardTotal(computerHand);
  if (gameMode === "game continues") {
    output = `No blackjack, game continues. Player please choose hit or stand! Computer would draw if its hand is below 17<br>`;
  } else if (gameMode === "find winner") {
    if (winningMode === "bust") {
      var busted = findRoundOutcome(playerCardTotal, computerCardTotal);
      output = `${busted} has/have busted. Game restarts<br>`;
    } else if (winningMode === "blackjack") {
      var winner = findRoundOutcome(playerCardTotal, computerCardTotal);
      var output = `Blackjack! ${winner} is/are the winner. Game restarts<br>`;
    } else if (winningMode === "bigger number") {
      winner = findRoundOutcome(playerCardTotal, computerCardTotal);
      output = `${winner} is/are the winner. Game restarts<br>`;
    }
  }
  return `${output}<br> ${displayAllPlayerCards()}`;
}

function findWinner() {
  checkWinningMode();
  var playerCardTotal = findCardTotal(playerHand);
  var computerCardTotal = findCardTotal(computerHand);
  if (winningMode === "bust") {
    if (playerCardTotal === computerCardTotal) {
      output = `Player and computer bust. It's a tie. Game restarts<br>`;
    } else if (isBust(21, playerCardTotal) && isBust(21, computerCardTotal)) {
      output = `Player and computer both bust. Game restarts<br>`;
    } else {
      output = craftMessage();
    }
    restartGame();
  } else if (winningMode === "blackjack") {
    var winner = findRoundOutcome(playerCardTotal, computerCardTotal);
    var output = craftMessage();
    restartGame();
  } else if (winningMode === "bigger number") {
    winner = findRoundOutcome(playerCardTotal, computerCardTotal);
    output = craftMessage();
    restartGame();
  } else {
    gameMode = "game continues";
    output = craftMessage();
  }
  return output;
}

function isInvalid(input) {
  return !(input === "hit" || input === "stand");
}

function restartGame() {
  playerHand = [];
  computerHand = [];
  gameMode = "first round";
  gameRound = 1;
}

var main = function (input) {
  //first round
  if (gameMode === "first round") {
    restartGame();
    makeDeck();
    shuffleDeck();
    playerHand = getStartingHand(2, playerHand);
    computerHand = getStartingHand(2, computerHand);
    // playerHand = [{ rank: 11 }, { rank: 10 }];
    // computerHand = [{ rank: 7 }, { rank: 10 }];
    var output = displayAllPlayerCards();
    gameMode = "find winner";
  }
  //second round onwards
  else if (gameMode === "game continues") {
    if (isInvalid(input)) {
      output = `Please type in hit or stand. <br><br> ${displayAllPlayerCards()}`;
    } else {
      gameMode = input;
      if (gameMode === "hit") {
        playerHand = getStartingHand(1, playerHand);
        computerHand = getStartingHand(1, computerHand);
        output = displayAllPlayerCards();
      } else if (gameMode === "stand") {
        if (isLessThan(17, computerHand)) {
          computerHand = getStartingHand(1, computerHand);
          output = displayAllPlayerCards();
        }
      }
      gameMode = "find winner";
    }
  } else if (gameMode === "find winner") {
    output = findWinner();
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
