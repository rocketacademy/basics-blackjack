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

// GLOBAL VARIABLES
var numberOfPlayers = 0;
var MIN_PLAYER = 1;
var MAX_PLAYER = 4;
var myOutputValue = "";

// GAME MODE
var ASK_FOR_PLAYERS = "ask for players";
var mode = ASK_FOR_PLAYERS;
var INIT_GAME = "init game";

// GAME STATUS
var players = [];
var dealer = {};

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

    // true when input is >= 1 && <= 4
    if (
      !isNaN(userInput) &&
      userInput >= MIN_PLAYER &&
      userInput <= MAX_PLAYER
    ) {
      numberOfPlayers = userInput;
      myOutputValue = `${numberOfPlayers} player(s) will be playing in this game of Blackjack.
      <br><br>
      Dealing cards...
      <br><br>
      Press Submit to continue.`;

      mode = INIT_GAME;

      console.log("========== exiting ask for players ==========");
      return myOutputValue;
    }

    // false
    myOutputValue = `You typed in an invalid response. How many players will be playing? (min: 1, max: 4)`;
    return myOutputValue;
  }

  // start game
  if (mode == INIT_GAME) {
    console.log("========== entering init game ==========");
    initialisePlayers();
  }

  return "end of main";
};
