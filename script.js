/*Implement a simplified version of Blackjack. Our simplified rules are the following. Please read all the requirements before starting it!

There will be only two players. One human and one computer (for the Base solution).The computer will always be the dealer.Each player gets dealt two cards to start.The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).The dealer has to hit if their hand is below 17.Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.The player who is closer to, but not above 21 wins the hand.*/

/*
shuffle deck
deal card to player, computer, player, computer
for now - find winner
*/

// GLOBAL VARIABLES
var mode = "init";
var numberOfPlayers = 4;
var myOutputValue = "";

// GAME STATUS
var deck = [];
var shuffledDeck = [];
var players = [];

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

// initialise computer and players
var initialisePlayers = function () {
  for (var i = 0; i < numberOfPlayers; i += 1) {
    // last player to be computer/dealer
    if (i == numberOfPlayers - 1) {
      players[i] = { player: "Dealer", hands: [] };
      continue;
    }
    // rest of the players
    players[i] = { player: `Player ${i + 1}`, hands: [] };
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
  // deal starting cards to players
  var startingHandSize = 2;

  // rounds of dealing
  for (var round = 0; round < startingHandSize; round += 1) {
    // deal player by player
    for (var i = 0; i < numberOfPlayers; i += 1) {
      var randomCard = shuffledDeck.pop();
      players[i]["hands"].push(randomCard);
    }
  }
};

var showHandMessage = function () {
  // use loop to display hand status
  myOutputValue = "";
  for (var i = 0; i < numberOfPlayers; i += 1) {
    var name = players[i].player;
    var firstCard =
      players[i].hands[0].name + " of " + players[i].hands[0].suit;
    var secondCard =
      players[i].hands[1].name + " of " + players[i].hands[1].suit;
    var value = players[i].hands[0].value + players[i].hands[1].value;
    myOutputValue += `${name}, your hands are ${firstCard} and ${secondCard} (Value: ${value}).
    <br>`;
  }
};

var main = function (input) {
  // shuffle deck
  // deal cards to players
  if (mode == "init") {
    initialisePlayers();
    initialiseDeck();
    shuffledDeck = shuffleCards(deck);
    dealStartingHand();
    showHandMessage();
    return myOutputValue;
  }

  return myOutputValue;
};
