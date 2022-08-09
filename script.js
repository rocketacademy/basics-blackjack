var initialDeck = false;
var initialHand = false;
var currentDeck = [];
var dealerHand = [];
var playerNum = 0;
var playerNames = [];
var playerTurn = 0;
var betInitial = false;

var players = [];

//Function to initialize set of players
var playerInitialize = function (input) {
  for (i = 0; i < playerNum; i++) {
    var curPlayer = {};
    curPlayer.chips = 100;
    curPlayer.hands = [];
    curPlayer.bet = 0;
    players.push(curPlayer);
  }
};

//Function to reset players hands & bets, dealer hand
var handDeckReset = function () {
  dealerHand = [];
  for (i = 0; i < playerNum; i++) {
    players[i].hands = [];
    player[i].bet = 0;
  }
  initialHand = false;
  initialDeck = false;
};

var main = function (input) {
  //Setting initial shuffled deck and dealer hand
  if (initialDeck == false) {
    currentDeck = shuffleDeck(initializeDeck());
    initialDeck = true;
  }

  //Setting number of players
  if (playerNum == 0) {
    if (isNaN(input) == false && input % 1 == 0 && input > 0 && input <= 5) {
      playerNum = input;
      return `We will have ${playerNum} player(s) in this game.<br>Each player begins with 100 chips.<br><br>Hit "continue" to place the bets for the first round and deal the cards.`;
    } else {
      return "Please input a valid number of players (1 to 5).";
    }
  }

  //Taking bets for all players
  if (playerTurn < playerNum) {
  }

  //Dealing initial hand for each player, check if blackjack

  //Deal hand for dealer
  dealerHand.push(currentDeck.pop());
  dealerHand.push(currentDeck.pop());

  //
};
//Function for validating bet placed
var betValidate = function (input) {
  if (isNaN(input) == true || input < 0 || input % 1 != 0) {
    return "Please input a valid number of chips as your bet.";
  }

  if (input > players[playerTurn].chips) {
    return `I'm sorry, you do not have enough chips to bet ${input} chips.`;
  }

  return true;
};

//Function for dealing initial set of player hands.

//Function for generating unshuffled deck
var initializeDeck = function () {
  var suitList = ["spades", "hearts", "clubs", "diamonds"];
  var cardNumList = [
    "Ace",
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    "Jack",
    "Queen",
    "King",
  ];

  var suitLen = suitList.length;
  var cardLen = cardNumList.length;
  var unshuffledDeck = [];

  var currentCard = {};

  for (i = 0; i < suitLen; i++) {
    for (j = 0; j < cardLen; j++) {
      currentCard = {};
      currentCard.suit = suitList[i];
      currentCard.cardNum = cardNumList[j];
      currentCard.cardValue = Math.min(10, j + 1);
      unshuffledDeck.push(currentCard);
    }
  }
  return unshuffledDeck;
};

//Function for shuffling input deck
var shuffleDeck = function (input) {
  var unshuffledDeck = input.slice();
  var deckLen = unshuffledDeck.length;
  var shuffledDeck = [];

  for (k = 0; k < deckLen; deckLen--) {
    var currentCardIndex = Math.floor(Math.random() * deckLen);
    var currentCard = unshuffledDeck[currentCardIndex];
    unshuffledDeck.splice(currentCardIndex, 1);
    shuffledDeck.push(currentCard);
  }
  return shuffledDeck;
};

//Function for checking whether a hand has Blackjack
var isBlackjack = function (input) {
  if (
    (input[0].cardNum == "Ace" && input[1].cardValue == 10) ||
    (input[1].cardNum == "Ace" && input[0].cardValue == 10)
  ) {
    return true;
  } else {
    return false;
  }
};

//Function for checking hard score
var handScore = function (input) {
  var aceCounter = 0;
  var outputScore = 0;
  var handLen = input.length;

  for (i = 0; i < handLen; i++) {
    if (input[i].cardNum == "Ace") {
      aceCounter++;
    }
    outputScore += input[i].cardValue;
  }

  for (j = 0; j < aceCounter; j++) {
    if (outputScore + 10 <= 21) {
      outputScore += 10;
    }
  }

  return outputScore;
};
