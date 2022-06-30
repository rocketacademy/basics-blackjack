let playerBet = 0;
let playerMoney = 100;
let hiddenDealer;
let loser = "";
let deck = [];
let dealerHand = [];
let playerHand = [];
let player;
let dealer;
const sumLimit = 21;
let playerBlackjack = false;
let dealerBlackjack = false;

const betInput = document.getElementById("bet-input");
const hitButton = document.getElementById("hit-button");
const stayButton = document.getElementById("stay-button");
const dealButton = document.getElementById("deal-button");
const hiddenDealerCard = document.getElementById("hidden");
let hiddenDealerCardFront = document.getElementById("hidden-front");
let hiddenDealerContainer = document.getElementById("hidden-container");

let stayed = false;
hitButton.disabled = false;
dealButton.disabled = true;

let quotes = [
  "Come on again now..",
  "Well, I'm just warming up",
  "Hah! You thought it would be this easy?",
  "You say me 1 time 2 time ok, 3 time CANNOT",
  "Thumbs up man 👍",
  "Can devs do something?",
  "Best out of 3",
  "Go again",
  "Have you played this before?",
];

window.onload = function () {
  createDeck(deck);
  shuffleDeck(deck);
  console.log(deck);
  dealCards();
  dealValidation();
  setupListeners();
  inputValidation();
};

function setupListeners() {
  hitButton.addEventListener("click", () => {
    hitValidation();
    console.log("hit button pushed");
  });
  stayButton.addEventListener("click", () => {
    standValidation();
  });
  dealButton.addEventListener("click", () => {
    hitButton.disabled = false;
    console.log("hit button enabled again");
    dealValidation();
    resetGame();
    createDeck(deck);
    shuffleDeck(deck);
    dealCards();
  });
}

function dealCards() {
  let visibleDealer = deck.pop();
  hiddenDealer = deck.pop();
  dealerHand = [visibleDealer, hiddenDealer];
  console.log(
    "hidden dealer card",
    hiddenDealer,
    "visible dealer card",
    visibleDealer
  );
  console.log(getHandTotal(dealerHand), "get dealer value", dealerHand);
  hiddenDealerCardFront.src =
    "./images/" + hiddenDealer.imageName + "-" + hiddenDealer.suit + ".png";
  let visibleDealerCard = document.createElement("img");
  visibleDealerCard.src =
    "./images/" + visibleDealer.imageName + "-" + visibleDealer.suit + ".png";
  document.getElementById("dealer-initial").append(visibleDealerCard);
  console.log("visible dealer card source", visibleDealerCard.src);

  for (let i = 0; i < 2; i++) {
    let cardImage = document.createElement("img");
    let playerCard = deck.pop();
    cardImage.src =
      "./images/" + playerCard.imageName + "-" + playerCard.suit + ".png";
    playerHand.push(playerCard);
    document.getElementById("player-cards").append(cardImage);
  }
}

function hitDealerHand() {
  while (getHandTotal(dealerHand) < 17 && dealerHand.length <= 5) {
    let cardImage = document.createElement("img");
    let card = deck.pop();
    dealerHand.push(card);
    console.log("dealer's card", card);
    cardImage.src = "./images/" + card.imageName + "-" + card.suit + ".png";
    document.getElementById("dealer-initial").append(cardImage);
  }
  console.log(getHandTotal(dealerHand), "dealer hand sum");
}

function createDeck() {
  let suits = ["H", "S", "C", "D"];
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    let currentSuit = suits[suitIndex];

    let rankCounter = 1;
    while (rankCounter <= 13) {
      let card = {
        imageName: rankCounter,
        suit: currentSuit,
        rank: Math.min(10, rankCounter),
      };
      deck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
}

function shuffleDeck(deck) {
  let randomIndex = deck.sort(() => Math.random() - 0.5);
  console.log(randomIndex);
  return randomIndex;
}

function hitValidation() {
  if ((hitButton.disabled = true)) {
    document.querySelector("#game-results\\ taka").innerHTML =
      "Come on, put some money on that";
    restartAnimation();
    console.log("hit button disabled in validation");
    if (betInput.value != 0) {
      console.log("hit button enabled in hit validation");
      hitButton.disabled = false;
      hit();
    } else if (stayed == true) {
      hitButton.disabled = true;
      stayButton.disabled = true;
    }
  }
}

function hit() {
  if (getHandTotal(playerHand) == sumLimit) {
    console.log("player blackjack in hit moving to stand");
    hitButton.disabled = true;
    stand();
  } else if (getHandTotal(playerHand) > sumLimit) {
    console.log("player bust on hit");
    hitButton.disabled = true;
    stand();
  } else if (getHandTotal(playerHand) < sumLimit) {
    let cardImage = document.createElement("img");
    let playerCard = deck.pop();
    cardImage.src =
      "./images/" + playerCard.imageName + "-" + playerCard.suit + ".png";
    playerHand.push(playerCard);
    document.getElementById("player-cards").append(cardImage);
    console.log(getHandTotal(playerHand), "hitting player hand in for loop");
  }
}

function standValidation() {
  console.log("stand validation");
  if (betInput.value == 0) {
    document.querySelector("#game-results\\ taka").innerHTML =
      "You're really not putting anything in?";
    restartAnimation();
    stayButton.disabled = true;
    console.log("empty bet in stand validation");
  } else if (stayed == true) {
    return;
  } else {
    console.log("stand function called in stand validation");
    stand();
    stayButton.disabled = false;
  }
}

function stand() {
  stayed = true;
  hitButton.disabled = true;
  stayButton.disabled = true;
  hitDealerHand();
  const playerHandSum = getHandTotal(playerHand);
  const dealerHandSum = getHandTotal(dealerHand);
  console.log("calculating dealer hand", dealerHandSum);
  let gg = calculateLoser(playerHandSum, dealerHandSum);
  if (playerHandSum == sumLimit) {
    playerBlackjack = true;
  } else if (dealerHandSum == sumLimit) {
    dealerBlackjack = true;
  }
  calculateBet(gg);
  console.log("calculateloser", gg);
  updateLoserUI(gg);
}

function getHandTotal(hand) {
  let totalValue = hand.reduce((acc, next) => acc + next.rank, 0);
  if (totalValue < 12 && hand.filter((card) => card.rank == 1).length != 0) {
    totalValue += 10;
  }
  return totalValue;
}

function dealValidation() {
  if (
    betInput.value == 0 ||
    hitButton.disabled == false ||
    stayButton.disabled == false
  ) {
    dealButton.disabled = true;
  } else {
    dealButton.disabled = false;
  }
}

function calculateLoser(playerSum, dealerSum) {
  console.log("calculate loser", playerSum, dealerSum);
  if (playerSum > sumLimit) {
    return "player";
  } else if (dealerSum > sumLimit) {
    return "dealer";
  } else if (playerSum > dealerSum) {
    return "dealer";
  } else if (playerSum < dealerSum) {
    return "player";
  } else if (playerSum == dealerSum) {
    return "tie";
  } else {
    console.log("impossible case");
  }
}

function calculateBet(loser) {
  let currentBet = parseInt(document.getElementById("bet-input").value);
  console.log("current bet", currentBet, typeof currentBet);
  //player money type = number
  // playerMoney = parseInt(document.getElementById("player-money").value);
  console.log("calculate start money", playerMoney);
  if (loser == "dealer") {
    if (playerBlackjack == true) {
      playerMoney += currentBet * 1.5;
      console.log("player win bet bj", playerMoney);
      return playerMoney;
    } else if (playerBlackjack == false) {
      playerMoney += currentBet;
      console.log("player win normal bet", playerMoney);
    }
  } else if (loser == "player") {
    if (dealerBlackjack == true) {
      playerMoney -= currentBet * 1.5;
      console.log("player lose bj", playerMoney);
    } else if (dealerBlackjack == false) {
      playerMoney -= currentBet;
      console.log("player lose normal bet", playerMoney);
    } else if (loser == "tie") {
      playerMoney = playerMoney;
    }
  }

  return playerMoney;
}

function updateLoserUI(loser) {
  if (loser == "player") {
    document.getElementById("profile-player").style.filter = "grayscale(100%)";
    // hitButton.style.filter = "grayscale(100%)";
    // stayButton.style.filter = "grayscale(100%)";
    document.querySelector("#game-results\\ taka").innerHTML =
      "boo hoo.. pay up";
    restartAnimation();
  } else if (loser == "tie") {
    document.getElementById("profile-dealer").style.filter = "grayscale(100%)";
    document.getElementById("profile-player").style.filter = "grayscale(100%)";
    document.querySelector("#game-results\\ taka").innerHTML =
      "yikes, it's a tie";
  } else {
    document.getElementById("profile-dealer").style.filter = "grayscale(100%)";
    document.querySelector("#game-results\\ taka").innerHTML =
      "welp, I owe you";
    restartAnimation();
  }

  document.querySelector("#player-money").innerHTML = playerMoney;
  console.log("this is player  money:", playerMoney);
}

function inputValidation() {
  if (
    getHandTotal(playerHand) > sumLimit ||
    playerHand.length > 5 ||
    betInput.value == 0
  ) {
    console.log("hit button disabled in input validation");
    hitButton.disabled = true;
  } else {
    console.log("hit button enabled in input validation");
    hitButton.disabled = false;
  }

  if (betInput == 0) {
    stayButton.disabled = true;
  } else {
    stayButton.disabled = false;
  }
}

function resetGame() {
  dealerAceCounter = 0;
  playerAceCount = 0;
  hiddenDealer = "";
  deck = [];
  playerHand = [];
  dealerHand = [];
  hitButton.disabled = false;
  playerBlackjack = false;
  dealerBlackjack = false;
  stayed = false;
  randomGameResultsQuips();
  document.getElementById("player-cards").innerHTML = "";
  document.getElementById("dealer-initial").innerHTML = "";
  document.getElementById("hidden-front").remove;
  hitButton.style.filter = "grayscale(0%)";
  stayButton.style.filter = "grayscale(0%)";
  document.getElementById("profile-player").style.filter = "grayscale(0%)";
  document.getElementById("profile-dealer").style.filter = "grayscale(0%)";
  // document.createElement("hidden-back").src = "./images/back.png";
}

function randomGameResultsQuips() {
  var randomNumber = Math.floor(Math.random() * quotes.length);
  document.querySelector("#game-results\\ taka").innerHTML =
    quotes[randomNumber];
  restartAnimation();
  console.log("random quip number", randomNumber);
}

function restartAnimation() {
  var element = document.querySelector("#game-results\\ taka");
  element.style.animation = "none";
  element.offsetHeight;
  element.style.animation = null;
}
