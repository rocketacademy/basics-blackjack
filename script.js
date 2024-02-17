var nums = [
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
var suitsholder = ["Diamonds", "Hearts", "Clubs", "Spades"];
var imgholder = [];
for (let i = 0; i < 13; i += 1) {
  imgholder.push([]);
  for (let j = 0; j < 4; j += 1) {
    imgholder[i].push(`images/${nums[i]}Of${suitsholder[j]}.jpg`);
  }
}
// creating a deck of cards
const makeDeck = () => {
  var newDeck = [];
  for (let i = 1; i <= 13; i += 1) {
    var suits = ["♦", "♥", "♣", "♠"];
    for (let j = 0; j < suits.length; j += 1) {
      var name = `${i}`;
      if (name === "11") {
        name = "Jack";
      } else if (name === "12") {
        name = "Queen";
      } else if (name === "13") {
        name = "King";
      }
      var value = parseInt(name);
      if (name === "Jack" || name === "Queen" || name === "King") {
        value = 10;
      }

      var card = {
        value: value,
        suit: suits[j],
        img: imgholder[i - 1][j],
        name,
      };
      newDeck.push(card);
    }
  }
  return newDeck;
};
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);
// Shuffle an array of cards
const shuffleCards = (deck) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(deck.length);
    // Select the card that corresponds to randomIndex
    const randomCard = deck[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = deck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return deck;
};

//define global variables
var playerCardPlaceholders = document.getElementsByClassName("p-card");
var computerCardPlaceholders = document.getElementsByClassName("c-card");
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var playButton = document.getElementById("play-button");
var hitButton = document.getElementById("hit-button");
var standButton = document.getElementById("stand-button");
var restartButton = document.getElementById("restart-button");
var outputMessageElement = document.getElementById("output");

var playerCards = [];
var computerCards = [];
var playerScore = 0;
var computerScore = 0;

//defind helper functions
function checkBlackJacket(num1, num2) {
  if ((num1 == 1 && num2 == 10) || (num1 == 10 && num2 == 1)) {
    score = 21;
  } else {
    score = 0;
  }
  return score;
}

function compareScore(num1, num2) {
  var winner;
  if ((num1 == 21 && num2 == 21) || (num1 > 21 && num2 > 21)) {
    winner = "It's a draw!";
  } else if (num1 < 21 && num2 < 21) {
    if (21 - num1 < 21 - num2) {
      winner = "The winner is Player.";
    } else if (21 - num1 > 21 - num2) {
      winner = "The winner is Computer.";
    } else {
      winner = "It's a Draw!";
    }
  } else if (num1 > 21 && num2 <= 21) {
    winner = "The winner is Computer.";
  } else if (num2 > 21 && num1 <= 21) {
    winner = "The winner is Player.";
  }
  return winner;
}

playButton.addEventListener("click", () => {
  for (var i = 0; i < 2; i++) {
    var card = shuffledDeck.pop();
    playerCards.push(card);
    playerCardPlaceholders[i].src = card.img;
  }
  playerScore = checkBlackJacket(playerCards[0].value, playerCards[1].value);

  if (playerScore == 21) {
    playerScore = playerScore;
  } else {
    playerScore = playerCards[0].value + playerCards[1].value;
  }

  for (var i = 0; i < 2; i++) {
    var card = shuffledDeck.pop();
    computerCards.push(card);
    computerCardPlaceholders[i].src = card.img;
  }

  computerScore = checkBlackJacket(
    computerCards[0].value,
    computerCards[1].value
  );
  if (computerScore == 21) {
    computerScore = computerScore;
  } else {
    computerScore = computerCards[0].value + computerCards[1].value;
  }

  // Check if any player wins by Black Jacket
  if (playerScore == 21 || computerScore == 21) {
    if (playerScore == 21 && computerScore == 21) {
      outputMessageElement.innerText = "Draw!";
    } else if (playerScore == 21) {
      outputMessageElement.innerHTML = `Player wins by black jack!</p>`;
    } else {
      outputMessageElement.innerHTML = `Computer wins by black jack!</p>`;
    }
  } else {
    outputMessageElement.innerHTML = ` Computer Points: ${computerScore}<br>Player Points: ${playerScore}<br>
     
      You may click "Hit" or "Stand" button to continue the game.`;
  }
});

hitButton.addEventListener("click", () => {
  var card = shuffledDeck.pop();
  playerCards.push(card);
  var len = playerCards.length;
  playerCardPlaceholders[len - 1].src = card.img;
  playerScore += card.value;

  if (computerScore < 17) {
    var card = shuffledDeck.pop();
    computerCards.push(card);
    var len = computerCards.length;
    computerCardPlaceholders[len - 1].src = card.img;
    computerScore += card.value;
  }

  // check if anyone wins
  if (playerScore >= 21 || computerScore >= 21) {
    winner = compareScore(playerScore, computerScore);
    outputMessageElement.innerHTML = ` Computer Points: ${computerScore}<br>Player Points: ${playerScore} <br> ${winner}`;
  } else {
    outputMessageElement.innerHTML = ` Computer Points: ${computerScore}<br>Player Points: ${playerScore}<br>
     
      You may click "Hit" or "Stand" button to continue the game.`;
  }
});

standButton.addEventListener("click", () => {
  if (computerScore < 17) {
    var card = shuffledDeck.pop();
    computerCards.push(card);
    var len = computerCards.length;
    computerCardPlaceholders[len - 1].src = card.img;
    computerScore += card.value;
  }
  // check if anyone wins

  winner = compareScore(playerScore, computerScore);
  outputMessageElement.innerHTML = ` Computer Points: ${computerScore}<br>Player Points: ${playerScore}<br> ${winner} `;
});

restartButton.addEventListener("click", () => {
  window.location.reload();
});
