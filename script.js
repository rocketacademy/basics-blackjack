/*Implement a simplified version of Blackjack. Our simplified rules are the following. Please read all the requirements before starting it!

There will be only two players. One human and one computer (for the Base solution).The computer will always be the dealer.Each player gets dealt two cards to start.The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).The dealer has to hit if their hand is below 17.Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.The player who is closer to, but not above 21 wins the hand.*/

/*
shuffle deck
deal card to player, computer, player, computer
for now - find winner
*/

// GLOBAL VARIABLES
var mode = "init";
var deck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 1,
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
  },
  {
    name: "3",
    suit: "hearts",
    rank: 3,
  },
  {
    name: "4",
    suit: "hearts",
    rank: 4,
  },
  {
    name: "5",
    suit: "hearts",
    rank: 5,
  },
  {
    name: "6",
    suit: "hearts",
    rank: 6,
  },
  {
    name: "7",
    suit: "hearts",
    rank: 7,
  },
  {
    name: "8",
    suit: "hearts",
    rank: 8,
  },
  {
    name: "9",
    suit: "hearts",
    rank: 9,
  },
  {
    name: "10",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "jack",
    suit: "hearts",
    rank: 11,
  },
  {
    name: "queen",
    suit: "hearts",
    rank: 12,
  },
  {
    name: "king",
    suit: "hearts",
    rank: 13,
  },
  {
    name: "ace",
    suit: "diamonds",
    rank: 1,
  },
  {
    name: "2",
    suit: "diamonds",
    rank: 2,
  },
  {
    name: "3",
    suit: "diamonds",
    rank: 3,
  },
  {
    name: "4",
    suit: "diamonds",
    rank: 4,
  },
  {
    name: "5",
    suit: "diamonds",
    rank: 5,
  },
  {
    name: "6",
    suit: "diamonds",
    rank: 6,
  },
  {
    name: "7",
    suit: "diamonds",
    rank: 7,
  },
  {
    name: "8",
    suit: "diamonds",
    rank: 8,
  },
  {
    name: "9",
    suit: "diamonds",
    rank: 9,
  },
  {
    name: "10",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "jack",
    suit: "diamonds",
    rank: 11,
  },
  {
    name: "queen",
    suit: "diamonds",
    rank: 12,
  },
  {
    name: "king",
    suit: "diamonds",
    rank: 13,
  },
  {
    name: "ace",
    suit: "clubs",
    rank: 1,
  },
  {
    name: "2",
    suit: "clubs",
    rank: 2,
  },
  {
    name: "3",
    suit: "clubs",
    rank: 3,
  },
  {
    name: "4",
    suit: "clubs",
    rank: 4,
  },
  {
    name: "5",
    suit: "clubs",
    rank: 5,
  },
  {
    name: "6",
    suit: "clubs",
    rank: 6,
  },
  {
    name: "7",
    suit: "clubs",
    rank: 7,
  },
  {
    name: "8",
    suit: "clubs",
    rank: 8,
  },
  {
    name: "9",
    suit: "clubs",
    rank: 9,
  },
  {
    name: "10",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "jack",
    suit: "clubs",
    rank: 11,
  },
  {
    name: "queen",
    suit: "clubs",
    rank: 12,
  },
  {
    name: "king",
    suit: "clubs",
    rank: 13,
  },
  {
    name: "ace",
    suit: "spades",
    rank: 1,
  },
  {
    name: "2",
    suit: "spades",
    rank: 2,
  },
  {
    name: "3",
    suit: "spades",
    rank: 3,
  },
  {
    name: "4",
    suit: "spades",
    rank: 4,
  },
  {
    name: "5",
    suit: "spades",
    rank: 5,
  },
  {
    name: "6",
    suit: "spades",
    rank: 6,
  },
  {
    name: "7",
    suit: "spades",
    rank: 7,
  },
  {
    name: "8",
    suit: "spades",
    rank: 8,
  },
  {
    name: "9",
    suit: "spades",
    rank: 9,
  },
  {
    name: "10",
    suit: "spades",
    rank: 10,
  },
  {
    name: "jack",
    suit: "spades",
    rank: 11,
  },
  {
    name: "queen",
    suit: "spades",
    rank: 12,
  },
  {
    name: "king",
    suit: "spades",
    rank: 13,
  },
];
var player = [];
var computer = [];
var shuffledDeck = [];
var myOutputValue = "";

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var dealStartingHand = function () {
  player.push(shuffledDeck.pop());
  computer.push(shuffledDeck.pop());
  player.push(shuffledDeck.pop());
  computer.push(shuffledDeck.pop());
  console.log("==== deal starting hand ====");
  console.log(player);
  console.log(computer);
};

var showHandMessage = function () {
  // use loop to display hand status
  var playerHand = [];
  var computerHand = [];
  for (var i = 0; i < player.length; i += 1) {
    playerHand.push(player[i].name + " of " + player[i].suit);
    computerHand.push(computer[i].name + " of " + computer[i].suit);
  }
  myOutputValue = `Player: ${playerHand[0]} and ${playerHand[1]}
  <br>
  Computer: ${computerHand[0]} and ${computerHand[1]}`;
  return;
};

var main = function (input) {
  // shuffle deck
  // deal cards to player and computer
  if ((mode = "init")) {
    shuffledDeck = shuffleCards(deck);
    dealStartingHand();
    showHandMessage();
    return myOutputValue;
  }

  return myOutputValue;
};
