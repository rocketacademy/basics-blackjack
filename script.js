var deck = makeDeck();
var shuffledDeck = [];
var playerHand = [];
var computerHand = [];

var dealButton = document.querySelector("#deal-button");
var hitButton = document.querySelector("#hit-button");
var standButton = document.querySelector("#stand-button");
var restartButton = document.querySelector("#restart-button");

startGameButtonStates();

function main(mode) {
  let output = "";

  if (mode === "deal") {
    inGameButtonStates();
    shuffledDeck = shuffleCards(deck);
    for (let i = 0; i < 2; i++) {
      playerHand.push(drawCard(shuffledDeck));
      computerHand.push(drawCard(shuffledDeck));
    }
  } else if (mode === "hit") {
    playerHand.push(drawCard(shuffledDeck));
  } else if (mode === "stand") {
    while (getScore(computerHand) < 17) {
      computerHand.push(drawCard(shuffledDeck));
    }
  } else if (mode === "restart") {
    resetGame();
    return "Click 'Deal' to begin!";
  }

  if (
    getScore(playerHand) >= 21 ||
    getScore(computerHand) >= 21 ||
    mode === "stand"
  ) {
    endGameButtonStates();
    output = winStatement(playerHand, computerHand) + "<br>";
  }

  output += getSitrep();
  return output;
}

function resetGame() {
  deck = makeDeck();
  shuffledDeck = [];
  playerHand = [];
  computerHand = [];
  startGameButtonStates();
}

function getScore(hand) {
  let score = 0;
  let aceCounter = 0;
  for (let i = 0; i < hand.length; i++) {
    if (hand[i].rank > 1 && hand[i].rank < 11) {
      score += hand[i].rank;
    } else if (hand[i].rank > 10) {
      score += 10;
    } else {
      score += 11;
      aceCounter += 1;
    }
  }

  while (score > 21 && aceCounter > 0) {
    score -= 10;
    aceCounter -= 1;
  }

  return score;
}

//Game Statement Generators

function getWinner(playerHand, computerHand) {
  let playerScore = getScore(playerHand);
  let computerScore = getScore(computerHand);
  if (
    playerScore === 21 ||
    (playerScore > computerScore && playerScore <= 21) ||
    (computerScore > 21 && playerScore <= 21)
  ) {
    return "player";
  } else if (
    computerScore === 21 ||
    (computerScore > playerScore && computerScore <= 21) ||
    (playerScore > 21 && computerScore <= 21)
  ) {
    return "dealer";
  } else if (computerScore === playerScore) {
    return "draw";
  } else {
    return "";
  }
}

function winStatement(playerHand, computerHand) {
  let playerScore = getScore(playerHand);
  let computerScore = getScore(computerHand);
  let winner = getWinner(playerHand, computerHand);
  let result = `<div id="result"`;

  if (winner === "player") {
    result += `style = "background-color: #B5EA8D">`;
  } else if (winner === "dealer") {
    result += `style = "background-color: #FF8484">`;
  } else {
    result += ">";
  }

  if (playerScore === 21 || computerScore === 21) {
    result += "Blackjack! ";
  } else if (playerScore > 21 || computerScore > 21) {
    result += "Bust! ";
  }

  if (winner == "draw") {
    result += "It's a draw!";
  } else if (winner == "player") {
    result += "You win!";
  } else if (winner == "dealer") {
    result += "Dealer wins!";
  }
  result += `</div>`;
  return result;
}

function getSitrep() {
  return `Your hand: ${displayHand(playerHand)}<br>Your score: ${getScore(
    playerHand
  )} <br><br>——————————<br><br> Dealer's hand: ${displayHand(
    computerHand
  )}<br>Dealer's score: ${getScore(computerHand)}`;
}

// Card Aesthetics

function displayHand(hand) {
  let result = `<div id = "all-cards">`;
  for (let i = 0; i < hand.length; i++) {
    result += `<div id="${getCardColor(hand[i])}"> ${getCardName(
      hand[i]
    )} </div>`;
  }
  result += `</div>`;
  return result;
}

function getCardColor(card) {
  if (card.suit === "hearts" || card.suit === "diamonds") {
    return "redcard";
  } else {
    return "card";
  }
}

function getCardName(card) {
  var name = "";

  if (card.rank <= 10 && card.rank > 1) {
    name += card.name;
  } else if (card.rank === 1) {
    name += "A";
  } else if (card.rank === 11) {
    name += "J";
  } else if (card.rank === 12) {
    name += "Q";
  } else if (card.rank === 13) {
    name += "K";
  }

  if (card.suit === "hearts") {
    name += "♥️";
  } else if (card.suit === "diamonds") {
    name += "♦️";
  } else if (card.suit === "clubs") {
    name += "♣️";
  } else {
    name += "♠️";
  }

  return name;
}

// Deck Creation & Functionality

function drawCard(deck) {
  return deck.pop();
}

function makeDeck() {
  var cardDeck = [];
  var suits = ["diamonds", "clubs", "hearts", "spades"];

  for (let i = 0; i < suits.length; i += 1) {
    var cardSuit = suits[i];
    for (let j = 1; j <= 13; j += 1) {
      var cardName = j;
      if (cardName === 1) {
        cardName = "ace";
      } else if (cardName === 11) {
        cardName = "jack";
      } else if (cardName === 12) {
        cardName = "queen";
      } else if (cardName === 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: cardSuit,
        rank: j,
      };
      cardDeck.push(card);
    }
  }
  return cardDeck;
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

function shuffleCards(cards) {
  for (let i = 0; i < cards.length; i += 1) {
    var randomIndex = getRandomIndex(cards.length);
    var currentCard = cards[i];
    var randomCard = cards[randomIndex];
    cards[i] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
}

/// Button Functionalities

dealButton.addEventListener("click", function () {
  var result = main("deal");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

hitButton.addEventListener("click", function () {
  var result = main("hit");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

standButton.addEventListener("click", function () {
  var result = main("stand");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

restartButton.addEventListener("click", function () {
  var result = main("restart");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
});

function startGameButtonStates() {
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
  restartButton.disabled = true;
}

function inGameButtonStates() {
  dealButton.disabled = true;
  hitButton.disabled = false;
  standButton.disabled = false;
  restartButton.disabled = false;
}

function endGameButtonStates() {
  dealButton.disabled = true;
  hitButton.disabled = true;
  standButton.disabled = true;
  restartButton.disabled = false;
}
