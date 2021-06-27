// user enters number of players
// user enters name for each player
// start round: each player enters bet one by one. winner gets twice their bet back.
// user clicks submit to deal cards. dealer's first card is shown to all players.
// cards are displayed to the players (turn by turn)
// players take turns to decide whether to hit or stand (by using submit button)
// check if player won before asking for their decision
// after each player decision, check if user won
// computer's turn after all players have finished their turns: decides to hit or stand automatically based on game rules
// end of round: display tally of chips of all players
// new round: shuffle deck -> players enter bets -> deal cards

// Constants
const SUITS = ["diamonds", "clubs", "hearts", "spades"];
const NAMES = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
const CHOOSE_NUM_PLAYERS = "choose number of players";
const CHOOSE_PLAYER_NAMES = "choose names of players";
const PLACE_BETS = "place bets";
const DEAL_CARDS = "deal cards";
const SHOW_HAND = "show hand";
const PENDING_PLAYER_DECISION = "pending player decision";
const STARTING_CHIPS = 100; // Initial tally of chips for each player
const HIT = "hit";
const STAY = "stay";
const BLACKJACK = "blackjack";
const UNDER = "under";
const BUST = "bust";

// Global variables
var gameMode = CHOOSE_NUM_PLAYERS;
var numPlayers;
var players = []; // Array of player objects that will be updated as the game progresses
var dealerHand = {};
var turn = 0; // Game starts on the first player's turn: 0 to represent first element in `players` array
var deck = [];

var createDeck = function () {
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
    var player = { chips: STARTING_CHIPS };
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
  players[turn].playerName = playerNameInput.italics();
  resultMessage = `Welcome to 🃏 Blackjack 🃏, ${players[turn].playerName}!`;
  turn += 1;
  // Condition to check if we have added the names for all players
  if (turn == players.length) {
    turn = 0; // Reset turn so that bets can be placed in the right order
    gameMode = PLACE_BETS; // Update game mode to the next mode
    resultMessage += `<br><br>All players have successfully entered their names. We will now start taking bets for the first round.<br><br>You currently have ${players[turn].chips} chips, ${players[turn].playerName}. Please enter your bet for this round - note that input will be rounded down.`;
  } else {
    resultMessage += `<br><br>Please enter the name of the next player.`;
  }
  return resultMessage;
};

var updateBets = function (playerBetInput) {
  var resultMessage;
  // Input validation: if user tries to place a bet higher than their current chips tally
  if (isNaN(playerBetInput) || Math.floor(Number(playerBetInput)) > players[turn].chips) {
    resultMessage = `Sorry ${players[turn].playerName}, you have an entered an invalid bet.<br><br>You currently have ${players[turn].chips} chips - please try again.`;
    return resultMessage;
  }
  // Valid input, so we update player bets in the `players` array and decrease their chips tally accordingly
  players[turn].playerBet = Math.floor(Number(playerBetInput));
  players[turn].chips -= playerBetInput;
  resultMessage = `You have placed a bet of ${players[turn].playerBet} chips for this round, ${players[turn].playerName}.`;
  turn += 1;
  // Condition to check if all players have placed their bets
  if (turn == players.length) {
    turn = 0; // Reset turn so that the round can start in the right order
    gameMode = DEAL_CARDS; // Update game mode to the next mode
    resultMessage += `<br><br>All players have successfully placed their bets for the round. Please click on "Submit" to deal the cards.`;
  } else {
    resultMessage += `<br><br>It is now your turn to place your bet, ${players[turn].playerName}. You currently have ${players[turn].chips} chips.`;
  }
  return resultMessage;
};

var dealCards = function () {
  // Create the deck and shuffle it
  deck = shuffleCards(createDeck());
  // Deal the cards to each player and the dealer
  for (var i = 0; i < players.length; i++) {
    players[i].handOne = {};
    players[i].handOne.cards = [deck.pop(), deck.pop()]; // Call it `handOne` as a player might have `handTwo` if they split
  }
  dealerHand.cards = [deck.pop(), deck.pop()];
  var resultMessage = `All players have now received their hand.<br><br>The dealer's first card is ${dealerHand.cards[0].name} of ${dealerHand.cards[0].suit}.<br><br> Click on "Submit" to start playing the round.`;
  gameMode = SHOW_HAND;
  return resultMessage;
};

var showPlayerHand = function () {
  // Calculate value of player hand
  calcHandValue(players[turn].handOne.cards, true);
  var resultMessage = `It is your turn, ${players[turn].playerName}.<br><br>
  ${displayHandCards(players[turn].handOne)}`;
  // Check for winning/losing condition to determine possible next steps for the player
  resultMessage += `<br><br>${interpretHandState(checkHandState(players[turn].handOne))}`;
  return resultMessage;
};

var displayHandCards = function (hand) {
  var handCards = hand.cards.map((x) => `${x.name} of ${x.suit}`).join(" | ");
  var resultMessage = `Your hand is (${handCards}), which represents a value of ${hand.value}.`;
  if (hand.altValue) {
    resultMessage += ` Or an alternate value of ${hand.altValue}.`;
  }
  return resultMessage;
};

var checkHandState = function (hand) {
  var handState;
  if (hand.value == 21 || hand.altValue == 21) {
    handState = BLACKJACK;
  } else if (hand.value > 21) {
    handState = BUST;
  } else {
    handState = UNDER;
  }
  return handState;
};

var interpretHandState = function (handState) {
  var resultMessage;
  if (handState == BLACKJACK) {
    resultMessage = `You have hit Blackjack, ${players[turn].playerName}! 🎉🎉<br><br>Click on "Submit" to proceed to the next player's turn.`;
    turn += 1;
  } else if (handState == BUST) {
    resultMessage = `Unfortunately that is a bust, ${players[turn].playerName}. 🤦‍♂️🤦‍♀️<br><br>Click on "Submit" to proceed to the next player's turn.`;
    turn += 1;
    gameMode = SHOW_HAND;
  } else if (handState == UNDER) {
    resultMessage = `Please enter "${HIT}" to receive another card, or "${STAY}" to end your turn, ${players[turn].playerName}.`;
    gameMode = PENDING_PLAYER_DECISION;
  }
  return resultMessage;
};

var pendingPlayerDecision = function (decisionInput) {
  var resultMessage;
  // Input validation
  if (decisionInput != HIT && decisionInput != STAY) {
    resultMessage = `You have entered an invalid input.<br><br>
    Please enter "${HIT}" to receive another card, or "${STAY}" to end your turn, ${players[turn].playerName}
    <br><br>In case you have forgotten: ${displayHandCards(players[turn].handOne)}`;
    return resultMessage;
  }
  // Process the player's decision
  interpretDecision(decisionInput, true);
  // Check for winning/losing condition and inform player of the result
  resultMessage = `${displayHandCards(players[turn].handOne)}<br><br>
  ${interpretHandState(checkHandState(players[turn].handOne))}`;
  return resultMessage;
};

var interpretDecision = function (decision, playerStatus) {
  if (decision == HIT) {
    var newCard = deck.pop();
    if (playerStatus == true) {
      players[turn].handOne.cards.push(newCard);
      calcHandValue(players[turn].handOne.cards, true);
    } else {
      dealerHand.cards.push(newCard);
    }
  } else if (decision == STAY && playerStatus == true) {
    turn += 1;
    gameMode = SHOW_HAND;
  }
};

var calcHandValue = function (hand, playerStatus) {
  // Sum the ranks of the cards in the hand to find the hand value
  var normHandValue = hand.reduce((x, y) => x + y.rank, 0);
  // Update the hand value for the player / dealer
  if (playerStatus == true) {
    players[turn].handOne.value = normHandValue;
  } else {
    dealerHand.value = normHandValue;
  }
  // Add 10 since the alternate value of `ace` is 11 instead of 1. We can only add this a maximum of once, as 2 * 11 is already > 21 which is a bust.
  var altHandValue = normHandValue + 10;
  // If player / dealer has one or more aces in their hand, update their alternate hand value
  if (hand.find(({ name }) => name == "ace")) {
    if (playerStatus == true) {
      players[turn].handOne.altValue = altHandValue;
    } else {
      dealerHand.altValue = altHandValue;
    }
  }
};

var main = function (input) {
  var myOutputValue;
  if (gameMode == CHOOSE_NUM_PLAYERS) {
    myOutputValue = updateNumPlayers(input);
  } else if (gameMode == CHOOSE_PLAYER_NAMES) {
    myOutputValue = updatePlayerNames(input);
  } else if (gameMode == PLACE_BETS) {
    myOutputValue = updateBets(input);
  } else if (gameMode == DEAL_CARDS) {
    myOutputValue = dealCards();
  } else if (gameMode == SHOW_HAND) {
    myOutputValue = showPlayerHand();
  } else if (gameMode == PENDING_PLAYER_DECISION) {
    myOutputValue = pendingPlayerDecision(input);
  }
  return myOutputValue;
};
