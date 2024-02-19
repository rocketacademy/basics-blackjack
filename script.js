var player1Cards = document.getElementById("player1Cards");
var player2Cards = document.getElementById("player2Cards");
var dealButton = document.getElementById("deal-button");
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
    var imagePath = `images/${nums[i]}Of${suitsholder[j]}.jpg`;
    console.log("Image Path:", imagePath);
    imgholder[i].push(imagePath);
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
  cardImage.src = card.img;
  player.appendChild(cardImage);
}

var counter = 0;
var turn = "player1";
var threshold = 21;
var player1Hand = [];
var player2Hand = [];
function getHandValue(hand) {
  var sum = 0;
  for (var i = 0; i < hand.length; i++) {
    sum += hand[i].value;
  }
  return sum;
}
dealButton.addEventListener("click", () => {
  var card = shuffledDeck.pop();
  if (counter == 0) {
    if (getHandValue(player1Hand) < 21) {
      dealCard(card, player1Cards);
      player1Hand.push(card);
    }
    counter = 1;
  } else {
    if (getHandValue(player2Hand) < 21) {
      dealCard(card, player2Cards);
      player2Hand.push(card);
    }
    counter = 0;
  }
  if (counter == 0 && player1Hand.length == 2) {
    var hasAce = false;
    var hasSpecialCard = false;
    for (var i = 0; i < player1Hand.length; i++) {
      if (player1Hand[i].value == 1) {
        hasAce = true;
      } else if (player1Hand[i].value >= 10 && player1Hand[i].value <= 12) {
        hasSpecialCard = true;
      }
    }
    if (hasAce && hasSpecialCard) {
      alert("Player 1 wins with an Ace and a special card!");
    }
  }
});
