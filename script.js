//Global Variables

var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck = [];

var canHit = true; //allows player to draw when yourSum <= 21
const audio = document.getElementById("audioPlayer");

var wins = 0;
var losses = 0;
var draws = 0;

/*---------------------------------------------*/

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
  let suits = ["C", "D", "H", "S"];
  deck = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(values[j] + "-" + suits[i]);
    }
  }
  //console.log(deck);
}

function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length); //to choose random cards
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
  console.log("hidden: " + hidden);
  console.log("dealer Sum: " + dealerSum);

  // append to dealer's card until total value is 17 or greater
  while (dealerSum < 17) {
    let cardImg = document.createElement("img"); //create image tag
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }
  console.log("Dealer Sum: " + dealerSum);

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img"); //create image tag
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
  }

  console.log("Your Sum: " + yourSum);
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
  document.getElementById("your-sum").innerText = yourSum;
}

// to draw new card by clicking hit button, to add to yourSum
function hit() {
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement("img"); //create image tag
  let card = deck.pop();
  cardImg.src = "./cards/" + card + ".png";
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById("your-cards").append(cardImg);
  console.log("your Sum: " + yourSum);
  document.getElementById("your-sum").innerText = yourSum;

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false;
  }

  if (yourSum > 21) {
    stay();
  } else {
    canHit = true;
  }
}

// to consider the presence of Aces to be counted as 1
function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./cards/" + hidden + ".png";
  updateScoreboard();
}

function updateScoreboard() {
  let message = "";
  if (yourSum == 21) {
    message = "BLACKJACK! You win!! Restart to play again!";
    wins += 1;
  } else if (yourSum > 21) {
    message = "Busted! You Lose! Restart to play again!";
    losses += 1;
  } else if (dealerSum > 21) {
    message = "Dealer busted! You win! Restart to play again!";
    wins += 1;
  } else if (yourSum == dealerSum) {
    message = "TIE! Restart to play again!";
    draws += 1;
  } else if (yourSum < dealerSum) {
    message = "You Lose! Restart to play again!";
    losses += 1;
  } else if (yourSum > dealerSum) {
    message = "You Win! Restart to play again!";
    wins += 1;
  }
  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("your-sum").innerText = yourSum;
  document.getElementById("results").innerText = message;
  document.getElementById("wins").innerText = wins;
  document.getElementById("draws").innerText = draws;
  document.getElementById("losses").innerText = losses;
}

// to get the numbered value for each card
function getValue(card) {
  let splitted = card.split("-"); //to split card names to extract number on card
  console.log("splitted: " + splitted);
  let cardNum = splitted[0];

  if (isNaN(cardNum)) {
    if (cardNum == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(cardNum);
}

// to check if presence of Ace card
function checkAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

// to devalue ace from 11 to 1 if sum exceeds 21
function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}

//to restart game
function restart() {
  dealerSum = 0;
  yourSum = 0;
  dealerAceCount = 0;
  yourAceCount = 0;
  canHit = true;
  deck = [];
  buildDeck();
  shuffleDeck();
  document.getElementById("dealer-sum").innerText = "";
  document.getElementById("dealer-cards").innerHTML =
    '<img id="hidden" src="./cards/Back.png" />';
  document.getElementById("your-sum").innerText = "";
  document.getElementById("your-cards").innerHTML = "";
  document.getElementById("results").innerText = "";
  document.getElementById("wins").innerText = wins;
  document.getElementById("losses").innerText = losses;
  document.getElementById("draws").innerText = draws;
  startGame();
}
