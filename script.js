/*Implement a simplified version of Blackjack. Our simplified rules are the following. Please read all the requirements before starting it!

There will be only two players.
One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.*/

/*VERSION 2 OF BLACKJACK
allow more than 1 player
all players play against dealer
allow betting*/

// CONSTANT
var MIN_NUM_PLAYER = 1;
var MAX_NUM_PLAYER = 4;

// GLOBAL VARIABLES
var myOutputValue = "";

// GAME MODE
var ASK_FOR_PLAYERS = "ask for players";
var mode = ASK_FOR_PLAYERS;
var CREATE_PLAYERS = "create players";
var ASK_FOR_BETS = "ask for bets";
var DEAL_STARTING_HAND = "deal starting hand";

// GAME STATUS
var numberOfPlayers = 0;
var players = [];
var dealer = {};
var currentBetIndex = 0;

var initialisePlayers = function () {
  // create players
  for (var i = 0; i < numberOfPlayers; i += 1) {
    players[i] = {
      name: `Player ${i + 1}`,
      hand: [],
      blackjack: false,
      handValue: 0,
      wallet: 100,
      bet: 0,
    };
  }
  // create dealer
  dealer = {
    name: "Dealer",
    hand: [],
    blackjack: false,
    handValue: 0,
  };
};

var initialiseDeck = function () {
  var deck = [];
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
  var values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
  var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

  // make standard 52-card deck
  var index = 0;
  for (var suit = 0; suit < suits.length; suit += 1) {
    for (var name = 0; name < names.length; name += 1) {
      deck[index] = {
        name: names[name],
        value: values[name],
        suit: suits[suit],
      };
      index += 1;
    }
  }
  return deck;
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

function isEmpty(str) {
  return !str || str.length === 0;
}

var showBetMessage = function () {
  var name = players[currentBetIndex].name;
  var wallet = players[currentBetIndex].wallet;

  var message = `${name}, you have $${wallet}. Place your bet.
  <br><br>
  Press Submit to continue.`;

  return message;
};

var dealStartingHand = function () {
  var startingHandSize = 2;
  // deal to players then dealer
  for (var round = 0; round < startingHandSize; round += 1) {
    for (var player = 0; player < numberOfPlayers; player += 1) {
      var randomCard = shuffledDeck.pop();
      players[player].hand.push(randomCard);
    }
    randomCard = shuffledDeck.pop();
    dealer.hand.push(randomCard);
  }
};

/* persuo code for blackjack - version 2
create players
make deck
shuffle deck
deal card to players and computer

check for blackjack; draw if both blackjack; move to game if no blackjack
if blackjack, betting * 2

players hit or stand

computer hit if value <= 16

players vs computer
give winning
*/

var main = function (input) {
  // first load, ask for number of players
  if (mode == ASK_FOR_PLAYERS) {
    console.log("========== entering ask for players ==========");
    var userInput = Number(input);

    // true when input is between min and max number of players
    if (userInput >= MIN_NUM_PLAYER && userInput <= MAX_NUM_PLAYER) {
      numberOfPlayers = userInput;
      myOutputValue = `${numberOfPlayers} player(s) will be playing in this game of Blackjack.
      <br><br>
      Creating player(s)...
      <br><br>
      Player(s) place your bet.
      <br><br>
      Press Submit to continue.`;

      mode = CREATE_PLAYERS;

      console.log("========== exiting ask for players ==========");
      return myOutputValue;
    }

    // false
    myOutputValue = `You typed in an invalid response. How many players will be playing? (min: 1, max: 4)`;
    return myOutputValue;
  }

  if (mode == CREATE_PLAYERS) {
    console.log("========== entering create players ==========");
    initialisePlayers();
    mode = ASK_FOR_BETS;
    myOutputValue = showBetMessage();
    console.log("========== exiting create players ==========");
    return myOutputValue;
  }

  if (mode == ASK_FOR_BETS) {
    console.log("========== entering ask for bets ==========");

    var betAmount = Number(input);
    var playerWallet = players[currentBetIndex].wallet;

    // bet must be valid and less than what wallet has
    if (betAmount > 0 && playerWallet >= betAmount) {
      players[currentBetIndex].bet = betAmount;
      console.log(players[currentBetIndex].bet);
      currentBetIndex += 1;

      // all players betted, exit mode
      if (currentBetIndex >= numberOfPlayers) {
        currentBetIndex = 0;
        mode = DEAL_STARTING_HAND;
        console.log("========== exiting ask for bets & change mode ==========");
        return "mode = dealing starting hand";
      }
      // prompt next player bet
      myOutputValue = showBetMessage();
      return myOutputValue;
    }
    // invalid response
    myOutputValue = "You typed in an invalid bet.<br><br>" + showBetMessage();
    return myOutputValue;
  }

  if (mode == DEAL_STARTING_HAND) {
  }

  // shuffledDeck = shuffleCards(initialiseDeck());
  // dealStartingHand();

  return "end of main";
};
