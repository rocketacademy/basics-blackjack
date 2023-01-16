var cardName = [
  "ace",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "jack",
  "queen",
  "king",
];

var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

// To create an array to store the cards drawn by player >> playerHand [i]
// To create a function that totals up the value of the cards in the array
// To win, playerTotal == 21 or more than dealer but still below 21

// Game Mode
var mode = "hit";
function hit() {
  playerDraws();
  computerDraws();
  return checkPlayerCards();
}

// Player and computer hand as an array to track cards drawn
var playerHand = [];
var computerHand = [];

function playerDraws() {
  var card = shuffledDeck.pop();
  playerHand.push(card);
}

function aceOneOrEleven() {
  if (handTotal(playerHand) <= 11) {
    for (var i = 0; i < playerHand.length; i += 1) {
      if (playerHand[i].rank == 1) {
        playerHand[i].rank = 11;
        i = playerHand.length;
      }
    }
    return checkPlayerCards();
  } else {
    return checkPlayerCards();
  }
}

// Variable to state the hand total of both player and computer
function compareHand() {
  var compareHandStatement = `Player's card total is ${handTotal(
    playerHand
  )}. Computer's card total is ${handTotal(computerHand)}.`;
  return compareHandStatement;
}

// Computer will draw as long as it's below 21
function computerDraws() {
  var computerRiskTolerance = 21 - getRandomIndex(3);
  if (handTotal(computerHand) < computerRiskTolerance) {
    var card = shuffledDeck.pop();
    computerHand.push(card);
  }
}

// Calculator function to calculate number player has
function handTotal(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i += 1) {
    sum += array[i].rank;
  }
  return sum;
}

// Win by getting 21 condition
function winCondition(array) {
  if (handTotal(array) == 21) {
    return true;
  } else {
    return false;
  }
}

// Comparing functions
function isBoth21() {
  if (winCondition(playerHand) && winCondition(computerHand)) {
    return true;
  } else {
    return false;
  }
}

// Check if bust
function checkBustOrWin() {
  if (handTotal(playerHand) > 21 && handTotal(computerHand) > 21) {
    return "Both players bust!" + compareHand();
  } else if (handTotal(playerHand) > 21) {
    return "Player bust! Computer wins by default!" + compareHand();
  } else if (handTotal(computerHand) > 21) {
    return "Computer bust! Player wins by default!" + compareHand();
  } else if (handTotal(playerHand) > handTotal(computerHand)) {
    return "Player Wins! " + compareHand();
  } else if (handTotal(playerHand) < handTotal(computerHand)) {
    return "Computer Wins! " + compareHand();
  } else {
    return "Both players have tied! " + compareHand();
  }
}

// function checkIfBothBust() {
//   if (handTotal(playerHand) > 21 && handTotal(computerHand) > 21) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function checkIfPlayerBust() {
//   if (handTotal(playerHand) > 21) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function checkIfComputerBust() {
//   if (handTotal(computerHand) > 21) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function checkWhoWon() {
//   if (handTotal(playerHand) > handTotal(computerHand)) {
//     return "Player Wins! " + compareHand();
//   } else if (handTotal(playerHand) < handTotal(computerHand)) {
//     return "Computer Wins! " + compareHand();
//   } else {
//     return "Both players have tied! " + compareHand();
//   }
// }

function playerBust(playerHand) {
  if (handTotal(playerHand) > 21) {
    return "You're busted!";
  } else {
    return false;
  }
}

function checkPlayerCards() {
  var playerCards = `Player total is ${handTotal(
    playerHand
  )}. Player is holding `;
  for (var j = 0; j < playerHand.length; j += 1) {
    // cannot make a linebreak in statement
    playerCards += playerHand[j].name + " of " + playerHand[j].suit + "; ";
  }
  return playerCards;
}

function checkBothBelow17() {
  console.log("Player's Hands");
  console.log(handTotal(playerHand));
  console.log("Computer's Hands");
  console.log(handTotal(computerHand));
  if (handTotal(playerHand) < 17 || handTotal(computerHand) < 17) {
    return true;
  } else {
    return false;
  }
}

function passTurn() {
  computerDraws();
  return checkPlayerCards();
}

function resetGame() {
  var deck = [];
  deck = makeDeck();
  shuffledDeck = shuffleCards(deck);
  console.log(shuffledDeck);
  playerHand = [];
  computerHand = [];
  initializeCards();
  console.log(playerHand);
  console.log(computerHand);
  return checkPlayerCards();
}

function makeDeck() {
  var cardDeck = [];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
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
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
}
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function shuffleCards(cardDeck) {
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
}
var deck = makeDeck();
console.log(deck);
var shuffledDeck = shuffleCards(deck);

function initializeCards() {
  for (var i = 0; i < 2; i += 1) {
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());
  }
}

initializeCards();
console.log(playerHand);
console.log(computerHand);

function main(input) {
  if (input.toLowerCase() == "stand") {
    if (checkBothBelow17()) {
      return "One or both players are below 17, continue to hit";
    } else {
      mode = "stand";
      if (mode == "stand") {
        // Not sure how to run each function 1 by 1
        if (isBoth21()) {
          return "Both players scored 21!";
        } else {
          return checkBustOrWin();
          // } else if (checkIfBothBust()) {
          //   return "Both players bust!";
          // } else if (checkIfPlayerBust()) {
          //   return "Player bust! Computer wins by default!";
          // } else if (checkIfComputerBust()) {
          //   return "Computer bust! Player wins by default!";
          // } else {
          //   return checkWhoWon();
        }
      }
    }
  } else if (input.toLowerCase() == "reset") {
    return resetGame();
  } else if (input.toLowerCase() == "check") {
    console.log("Player's Hands");
    console.log(handTotal(playerHand));
    console.log("Computer's Hands");
    console.log(handTotal(computerHand));
    return checkPlayerCards();
  } else if (input.toLowerCase() == "pass") {
    if (input == "pass") {
      return passTurn();
    }
  } else if (input.toLowerCase() == "ace") {
    return aceOneOrEleven();
  } else {
    mode = "hit";
    return hit();
  }
}
