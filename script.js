var deck = makeDeck();
var shuffledDeck = [];
var playerHand = [];
var computerHand = [];

function main(inputMode) {
  let output = "";
  if (inputMode === "deal") {
    shuffledDeck = shuffleCards(deck);
    playerHand.push(drawCard(shuffledDeck));
    computerHand.push(drawCard(shuffledDeck));
    playerHand.push(drawCard(shuffledDeck));
    computerHand.push(drawCard(shuffledDeck));
    output = getSitrep(playerHand, computerHand);
  } else if (inputMode === "hit") {
    playerHand.push(drawCard(shuffledDeck));
    output = getSitrep(playerHand, computerHand);
  } else if (inputMode === "stand") {
    while (getScore(computerHand) < 17) {
      computerHand.push(drawCard(shuffledDeck));
    }
    output =
      getSitrep(playerHand, computerHand) +
      "<br><br>" +
      getWinner(playerHand, computerHand);
  } else if (inputMode === "restart") {
    resetGame();
    output = "Click 'Deal' to begin!";
  }
  console.log(deck.length);
  return output;
}

function resetGame() {
  deck = makeDeck();
  shuffledDeck = [];
  playerHand = [];
  computerHand = [];
  dealButton.disabled = false;
  hitButton.disabled = true;
  standButton.disabled = true;
  restartButton.disabled = true;
}

function getWinner(playerHand, computerHand) {
  let playerScore = getScore(playerHand);
  let computerScore = getScore(computerHand);
  if (playerScore == computerScore) {
    return "It's a draw!";
  } else if (playerScore === 21) {
    return "Blackjack! You win!";
  } else if (computerScore === 21) {
    return "Blackjack! Dealer wins!";
  } else if (playerScore > computerScore && playerScore <= 21) {
    return "You win!";
  } else if (playerScore < computerScore && computerScore <= 21) {
    return "Dealer wins!";
  } else if (playerScore > 21 && computerScore <= 21) {
    return "You busted. Dealer wins!";
  } else if (computerScore > 21 && playerScore <= 21) {
    return "Dealer busted. You win!";
  } else {
    return "You've both busted. Nobody wins!";
  }
}

function getSitrep(hand1, hand2) {
  return `Your hand: ${displayHand(hand1)}<br>Your score: ${getScore(
    hand1
  )} <br><br> Dealer's hand: ${displayHand(
    hand2
  )}<br>Dealer's score: ${getScore(hand2)}`;
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

function displayHand(hand) {
  let result = "";
  for (let i = 0; i < hand.length; i++) {
    result += getCardName(hand[i]);
  }

  return result;
}

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

var dealButton = document.querySelector("#deal-button");
var hitButton = document.querySelector("#hit-button");
var standButton = document.querySelector("#stand-button");
var restartButton = document.querySelector("#restart-button");

hitButton.disabled = true;
standButton.disabled = true;
restartButton.disabled = true;

dealButton.addEventListener("click", function () {
  var result = main("deal");
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
  dealButton.disabled = true;
  hitButton.disabled = false;
  standButton.disabled = false;
  restartButton.disabled = false;
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

// Button Backup

// var dealButton = document.querySelector("#deal-button");
// dealButton.addEventListener("click", function () {

//   var input = document.querySelector("#input-field");
//   var result = main(input.value);

//   var output = document.querySelector("#output-div");
//   output.innerHTML = result;

//   input.value = "";
// });
