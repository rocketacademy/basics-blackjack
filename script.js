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
const SUITS = ["diamonds", "clubs", "hearts", "spades"];
const NAMES = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const CHOOSE_NUM_PLAYERS = "choose number of players";
const CHOOSE_PLAYER_NAMES = "choose names of players";
const PLACE_BETS = "place bets";
const DEAL_CARDS = "deal cards";
const STARTING_CHIPS = 100; // Initial tally of chips for each player

// Global variables
var gameMode = CHOOSE_NUM_PLAYERS;
var numPlayers;
var players = []; // Array of player objects that will be updated as the game progresses
var currentTurn = 0; // Game starts on the first player's turn: 0 to represent first element in `players` array

var createDeck = function () {
  var deck = [];
  for (var i = 0; i < NAMES.length; i++) {
    for (var x = 0; x < SUITS.length; x++) {
      var card = { name: NAMES[i], suit: SUITS[x], rank: RANKS[i] };
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
  // Input validation: Limit num of players to 4 for performance reasons
  if (!(Number(numPlayersInput) >= 1 && Number(numPlayersInput) <= 4)) {
    resultMessage = `You have entered an invalid input.<br>Please enter a number between 1 and 4! All decimals will be rounded up.`;
    return resultMessage;
  }
  numPlayers = Math.ceil(Number(numPlayersInput));
  // Create array of player objects
  for (var i = 0; i < numPlayers; i++) {
    var player = { playerNum: i + 1, chips: STARTING_CHIPS };
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
  players[currentTurn].playerName = playerNameInput;
  resultMessage = `Welcome to 🃏 Blackjack 🃏, ${playerNameInput}!`;
  currentTurn += 1;
  // Condition to check if we have added the names for all players
  if (currentTurn == players.length) {
    currentTurn = 0; // Reset currentTurn so that bets can be placed in the right order
    gameMode = PLACE_BETS; // Update game mode to the next mode
    resultMessage += `<br><br>All players have successfully entered their names. We will now start taking bets for the first round.<br><br>You currently have ${players[currentTurn].chips} chips, ${players[currentTurn].playerName}. Please enter your bet for this round - input will be rounded down.`;
  } else {
    resultMessage += `<br><br>Please enter the name of the next player.`;
  }
  return resultMessage;
};

var updateBets = function (playerBetInput) {
  var resultMessage;
  // Input validation: if user tries to place a bet higher than their current chips tally
  if (Math.floor(Number(playerBetInput)) > players[currentTurn].chips) {
    resultMessage = `Sorry ${players[currentTurn].playerName}, you have an entered an invalid bet.<br><br>You currently only have ${players[currentTurn].chips} chips - please try again.`;
    return resultMessage;
  }
  // Valid input, so we update player bets in the `players` array
  players[currentTurn].playerBet = Math.floor(Number(playerBetInput));
  resultMessage = `You have placed a bet of ${players[currentTurn].playerBet} chips for this round, ${players[currentTurn].playerName}.`;
  currentTurn += 1;
  // Condition to check if all players have placed their bets
  if (currentTurn == players.length) {
    currentTurn = 0; // Reset currentTurn so that the round can start in the right order
    gameMode = DEAL_CARDS; // Update game mode to the next mode
    resultMessage += `<br><br>All players have successfully placed their bets. The cards will now be dealt for the round.`;
  } else {
    resultMessage += `<br><br>It is now your turn to place your bet, ${players[currentTurn].playerName}. You currently have ${players[currentTurn].chips} chips.`;
  }
  return resultMessage;
};

var main = function (input) {
  var myOutputValue;
  if (gameMode == CHOOSE_NUM_PLAYERS) {
    myOutputValue = updateNumPlayers(input);
  } else if (gameMode == CHOOSE_PLAYER_NAMES) {
    myOutputValue = updatePlayerNames(input);
  } else if (gameMode == PLACE_BETS) {
    myOutputValue = updateBets(input);
  }
  return myOutputValue;
};
