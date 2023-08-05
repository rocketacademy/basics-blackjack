// Global Variables

var dealerSum = 0;
var playerSum = 0;

// Variables to check if Ace is counted as 1 or 10
// Ace, 2 + King -> 1 + 2 + 10

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

// Player can get cards while playerSum <= 21

var canHit = true;

window.onload = function () {
  buildDeck();
  shuffleDeck();
  startGame();
};

function buildDeck() {
  let values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let types = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + types[i]);
    }
  }
  console.log(deck);
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.99999)
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
}

function startGame() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  console.log(hidden);
  console.log(dealerSum);
  while (dealerSum < 17) {
    // <img> Image Tag
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }
  console.log(dealerSum);

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);
  }

  console.log(playerSum);
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  playerSum += getValue(card);
  playerAceCount += checkAce(card);
  document.getElementById("player-cards").append(cardImg);

  if (reduceAce(playerSum, playerAceCount) > 21) {
    canHit = false;
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  playerSum = reduceAce(playerSum, playerAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./cards/" + hidden + ".png";

  let message = "";
  if (playerSum > 21) {
    message = "You Lose!";
  }
  // If both have the same tie
  else if (playerSum == dealerSum) {
    message = "Tie!";
  } else if (playerSum > dealerSum) {
    message = "You Win!";
  } else if (playerSum < dealerSum) {
    message = "You Lose!";
  }
  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("player-sum").innerText = playerSum;
  document.getElementById("results").innerText = message;
}

function getValue(card) {
  let data = card.split("-"); // "4-C" -> ["4", "C"]
  let value = data[0];

  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}

// My original Code had the issue that i couldn't change the value of the Ace to 1 if it is counted as 1
// // display the value of the rank of both cards for both sides
//var playerscore = Playercard1.rank + Playercard2.rank;
///var computerscore = ComputerCard1.rank + ComputerCard2.rank;
//console.log(
// "Player Score= " +
//playerscore +
" (" +
  /// Playercard1.name +
  " " +
  //Playercard1.suit +
  " & " +
  //Playercard2.name +
  " " +
  //Playercard2.suit +
  ")";
//);
///console.log(
// "Dealer Score= " +
// computerscore +
//" (" +
// ComputerCard1.name +
" " +
  // ComputerCard1.suit +
  " & " +
  //ComputerCard2.name +
  " " +
  ///ComputerCard2.suit +
  ")";
//);

// Check if the score of the cards is 21
//var playerresult = 21 - playerscore;
//var computerresult = 21 - computerscore;

//if (computerresult === playerresult) {
//console.log("tie");
//} //else if (computerresult > playerresult) {
//console.log(" Player wins!");
//} //else if (computerresult < playerresult) {
//console.log(" Dealer wins!");
//}
