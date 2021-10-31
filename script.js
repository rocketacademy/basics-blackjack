/*Implement a simplified version of Blackjack. Our simplified rules are the following. Please read all the requirements before starting it!

There will be only two players. One human and one computer (for the Base solution).The computer will always be the dealer.Each player gets dealt two cards to start.The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).The dealer has to hit if their hand is below 17.Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.The player who is closer to, but not above 21 wins the hand.*/

/*
shuffle deck
deal card to player, computer, player, computer
for now - find winner
*/

// GLOBAL VARIABLES
var deck = [];
var mode = "init";
var shuffledDeck = [];
var myOutputValue = "";

// create a standard 52-card deck
var initialiseDeck = function () {
  var names = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];
  var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  var ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

  // loop thru suits length = 4
  index = 0;
  for (var suit = 0; suit < suits.length; suit += 1) {
    // nested loop thru names length = 13
    for (var name = 0; name < names.length; name += 1) {
      deck[index] = {
        name: names[name],
        value: values[name],
        rank: ranks[name],
        suit: suits[suit],
      };
      index += 1;
    }
  }
};

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
  return myOutputValue;
};
