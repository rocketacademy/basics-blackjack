var player1Cards = document.getElementById("player1Cards");
var player2Cards = document.getElementById("player2Cards");
var dealButton = document.getElementById("deal-button");
var myOutputvalue = document.getElementById("myOutputvalue");
var resetgameButton = document.getElementById("reset-button");
var player1scoreHolder = document.getElementById("player1score");
var player2scoreHolder = document.getElementById("player2score");
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
      if (name === "1") {
        name = "A";
      } else if (name === "11") {
        name = "J";
      } else if (name === "12") {
        name = "Q";
      } else if (name === "13") {
        name = "K";
      }
      var card = {
        value: i,
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
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
function dealCard(card, player) {
  var cardImage = document.createElement("img");
  // change src of cardImage
  cardImage.src = card.img;
  cardImage.classList.add("card");
  console.log(card.img);
  // append the cardImage
  player.appendChild(cardImage);
}
var counter = 0;
var turn = "player1";
var threshold = 21;
var player1Hand = [];
var player2Hand = [];
function getHandValue(hand) {
  var sum = 0;
  //new stuff
  var aceCount = 0;
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].value !== 1) {
      // adding some new stuff
      sum += hand[i].value;
    } else {
      aceCount++;
    }
  }

  for (var j = 0; j < aceCount; j++) {
    if (sum + 11 <= threshold - aceCount + 1) {
      sum += 11;
    } else {
      sum += 1;
    }
  }

  //
  return sum;
}

// ...

// ...

function resetgame() {
  counter = 0;
  turn = "player1";
  player1Hand = [];
  player2Hand = [];
  myOutputvalue.textContent = "";

  // playerscore.textContent = "SCORE : 0";

  // Clear card displays
  player1Cards.innerHTML = "";
  player2Cards.innerHTML = "";

  // Update player titles (if needed)
  document.getElementById("player1Cards").innerHTML = "<p>Player 1</p>";
  document.getElementById("player2Cards").innerHTML = "<p>Player 2</p>";

  player1scoreHolder.textContent = "SCORE: " + getHandValue(player1Hand);
  player2scoreHolder.textContent = "SCORE: " + getHandValue(player2Hand);
  // Shuffle the deck and update the shuffledDeck variable
  shuffledDeck = shuffleCards(makeDeck());
}

// ...

dealButton.addEventListener("click", () => {
  // getting the score for the players when they click the deal button
  if (getHandValue(player1Hand) <= 21 && getHandValue(player2Hand) <= 21) {
    var card = shuffledDeck.pop();
    if (counter == 0) {
      if (getHandValue(player1Hand) + card.value <= 21) {
        dealCard(card, player1Cards);
        player1Hand.push(card);
      }
      counter = 1;
    } else {
      if (getHandValue(player2Hand) + card.value <= 21) {
        dealCard(card, player2Cards);
        player2Hand.push(card);
      }
      counter = 0;
    }
  }

  // showing the winner of the rounds

  if (
    getHandValue(player1Hand) == 21 ||
    (getHandValue(player1Hand) > getHandValue(player2Hand) &&
      getHandValue(player1Hand) > 15)
  ) {
    myOutputvalue.textContent = "player 1 win";
  } else if (
    getHandValue(player2Hand) == 21 ||
    (getHandValue(player2Hand) > getHandValue(player1Hand) &&
      getHandValue(player2Hand) > 15)
  ) {
    myOutputvalue.textContent = "player 2 win";
  } else if (getHandValue(player1Hand) === getHandValue(player2Hand)) {
    myOutputvalue.textContent = "It is a tie";
  } else {
    myOutputvalue.textContent = "Who won?";
  }

  player1scoreHolder.textContent = "score: " + getHandValue(player1Hand);
  player2scoreHolder.textContent = "score: " + getHandValue(player2Hand);

  return myOutputvalue;
});

resetgameButton.addEventListener("click", () => {
  resetgame();
});
