// deck shuffled on page load
// user enters how many players
// user enters name for each player
// start round: each user enters bet one by one
// user clicks submit to deal cards
// cards are analysed to see if anyone alr hit blackjack
// cards are displayed to the users (turn by turn)
// users take turn to decide whether to hit or stand (by using submit button)
// after each hit / stand decision, check for winning condition
// computer's turn after all users have finished their turns: decides to hit or stand automatically based on game rules
// end of round: display tally of points of all users
// new round: shuffle deck -> users enter bets -> deal cards

// Constants
const suits = ["diamonds", "clubs", "hearts", "spades"];
const names = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const CHOOSE_NUM_PLAYERS = "choose number of players";
const CHOOSE_PLAYER_NAMES = "choose names of players";
const PLACE_BETS = "place bets";

// Global variables
var gameMode = CHOOSE_NUM_PLAYERS;
var numPlayers;
var players = []; // Array of player objects that will be updated as the game progresses
var currentTurn = 0; // Game starts on the first player's turn: 0 to represent first element in `players` array

var createDeck = function () {
  var deck = [];
  for (var i = 0; i < names.length; i++) {
    for (var x = 0; x < suits.length; x++) {
      var card = { name: names[i], suit: suits[x], rank: ranks[i] };
      deck.push(card);
    }
  }
  return deck;
};

var shuffleCards = function (cardDeck) {
  for (var i = 0; i < cardDeck.length; i++) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[i];
    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

var updateNumPlayers = function (numPlayersInput) {
  var resultMessage;
  // Input validation
  if (!(Number(numPlayersInput) >= 1 && Number(numPlayersInput) <= 4)) {
    resultMessage = `You have entered an invalid input.<br>Please enter a number between 1 and 4! All decimals will be rounded up.`;
    return resultMessage;
  }
  numPlayers = Math.ceil(Number(numPlayersInput));
  // Create array of player objects
  for (var i = 0; i < numPlayers; i++) {
    var player = { playerNum: i + 1, points: 100 };
    players.push(player);
  }
  gameMode = CHOOSE_PLAYER_NAMES;
  resultMessage = `You have chosen to play the game with ${numPlayers} players.<br><br>Now please enter the name of each player, starting with the first.`;
  return resultMessage;
};

var updatePlayerNames = function (playerNameInput) {
  var resultMessage;
  // Input validation
  if (playerNameInput == "") {
    resultMessage = `You have entered an empty name.<br>Please enter a valid name!`;
    return resultMessage;
  }
  // Valid input, so we update player names in the `players` array
  resultMessage = `Welcome to 🃏 Blackjack 🃏, ${playerNameInput}!`;
  // Condition to check if we are adding the player name for the final player
  if (currentTurn == players.length - 1) {
    currentTurn = 0; // Reset currentTurn so that bets can be placed in the right order
    gameMode = PLACE_BETS; // Update game mode to the next mode
    resultMessage += `All players have successfully entered their names.<br><br>You currently have ${players[currentTurn].points} chips, ${players[currentTurn].playerName}. Please enter your bet for this round.`;
  } else {
    players[currentTurn].playerName = playerNameInput;
    currentTurn += 1;
    resultMessage += `<br><br>Please enter the name of the next player.`;
  }
  return resultMessage;
};

var main = function (input) {
  var myOutputValue;
  if (gameMode == CHOOSE_NUM_PLAYERS) {
    myOutputValue = updateNumPlayers(input);
  } else if (gameMode == CHOOSE_PLAYER_NAMES) {
    myOutputValue = updatePlayerNames(input);
  }
  return myOutputValue;
};
