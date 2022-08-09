var initialDeck = false;
var initialHand = false;
var currentDeck = [];
var dealerHand = [];
var playerNum = 0;
var playerNames = [];
var playerTurn = 0;
var betInitial = false;
var initialBlackjack = false;

var players = [];

//Function to initialize set of players
var playerInitialize = function () {
  for (i = 0; i < playerNum; i++) {
    var curPlayer = {};
    curPlayer.chips = 100;
    curPlayer.hands = [];
    curPlayer.bet = 0;
    curPlayer.roundStatus = ["Playing"];
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
      playerInitialize();
      return `We will have ${playerNum} player(s) in this game.<br>Each player begins with 100 chips.<br><br>Player ${
        playerTurn + 1
      }, please enter the number of chips you would like to bet for this round.`;
    } else {
      return "Please input a valid number of players (1 to 5).";
    }
  }

  //Taking bets for all players
  if (betInitial == false) {
    var betValidateResult = betValidate(input);
    if (betValidateResult != true) {
      return betValidateResult;
    }
    players[playerTurn].bet = input;

    if (playerTurn < playerNum - 1) {
      playerTurn++;
      return `Player ${playerTurn} bets ${input} chips this round.<br><br>Player ${
        playerTurn + 1
      }, please enter the number of chips you would like to bet for this round.`;
    } else if (playerTurn == playerNum - 1) {
      playerTurn = 0;
      betInitial = true;
      return `Player ${playerNum} bets ${input} chips this round.<br><br>Please hit "continue" to deal cards.`;
    }
  }

  //Dealing initial hand for each player and dealer
  if (initialHand == false) {
    for (i = 0; i < playerNum; i++) {
      var currentHand = [];
      currentHand.push(currentDeck.pop());
      currentHand.push(currentDeck.pop());
      players[playerTurn].hands.push(currentHand);

      turnUpdate();
    }

    //Temporary to debug blackjackArr insert
    players[0].hands = [
      [
        { suit: "Spades", cardNum: "Ace", cardValue: 1 },
        { suit: "Spades", cardNum: "King", cardValue: 10 },
      ],
      [
        { suit: "Spades", cardNum: 5, cardValue: 2 },
        { suit: "Spades", cardNum: 5, cardValue: 5 },
      ],
    ];
    // players[1].hands = [
    //   [
    //     { suit: "spades", cardNum: "Ace", cardValue: 1 },
    //     { suit: "spades", cardNum: "King", cardValue: 10 },
    //   ],
    // ];

    //Deal hand for dealer
    dealerHand.push(currentDeck.pop());
    dealerHand.push(currentDeck.pop());
    initialHand = true;
  }
  //Check if any players have a natural blackjack
  var blackjackArr = [];
  if (initialBlackjack == false) {
    for (i = 0; i < playerNum; i++) {
      var curPlayerHand = players[playerTurn].hands[0];
      if (isBlackjack(curPlayerHand)) {
        players[playerTurn].roundStatus[0] = "Won";
        players[playerTurn].chips += Math.round(players[playerTurn].bet * 1.5);
        blackjackArr.push(playerTurn);
      }
      turnUpdate();
      if (playerTurn == 0) {
        initialBlackjack = true;
      }
    }

    var blackjackMsg = "";
    if (blackjackArr.length == 1) {
      blackjackMsg =
        blackjackMsg +
        `Congratulations Player ${
          blackjackArr[0] + 1
        } for drawing a Blackjack!`;
    } else if (blackjackArr.length > 1) {
      blackjackIntMsg = "";
      for (i = 0; i < blackjackArr.length; i++) {
        blackjackIntMsg = blackjackIntMsg + ", " + blackjackArr[i];
      }
      blackjackMsg = `Congratulations Players ${blackjackIntMsg.substring(
        2
      )} for drawing a Blackjack!`;
    }
    return gameStateMsg();
  }
};

//Function for overall game status generation message
var gameStateMsg = function () {
  //Test multiple hand scenario
  players[0].roundStatus.push("Test State");

  var outputMsg = "";

  outputMsg =
    outputMsg + "<b><u>Dealer</u><br>Hand:</b><br>[Facedown card]<br>";
  for (i = 1; i < dealerHand.length; i++) {
    outputMsg =
      outputMsg + `${dealerHand[i].cardNum} of ${dealerHand[i].suit}<br>`;
  }

  for (i = 0; i < playerNum; i++) {
    outputMsg =
      outputMsg +
      `<br><b><u>Player ${i + 1}</u><br>Chips: ${
        players[i].chips
      }<br>Current round bet: ${players[i].bet}<br></b>`;
    var handNum = players[i].hands.length;
    if (handNum > 1) {
      //Add scenario of number of hands per player > 1

      for (k = 0; k < players[i].hands.length; k++) {
        outputMsg =
          outputMsg + `<b>Hand ${k + 1}:</b> ${players[i].roundStatus[k]}<br>`;
        for (j = 0; j < players[i].hands[k].length; j++) {
          outputMsg =
            outputMsg +
            `${players[i].hands[0][j].cardNum} of ${players[i].hands[0][j].suit}<br>`;
        }
      }
    } else {
      outputMsg =
        outputMsg +
        `<b>Current round status: ${players[i].roundStatus[0]}<br>Hand:</b><br>`;
      for (j = 0; j < players[i].hands[0].length; j++) {
        outputMsg =
          outputMsg +
          `${players[i].hands[0][j].cardNum} of ${players[i].hands[0][j].suit}<br>`;
      }
    }
  }
  return outputMsg;
};

//Function for player turn cycling
var turnUpdate = function () {
  if (playerTurn < playerNum - 1) {
    playerTurn++;
  } else {
    playerTurn = 0;
  }
};

//Function for validating bet placed
var betValidate = function (input) {
  if (isNaN(input) == true || input <= 0 || input % 1 != 0) {
    return "Please input a valid number of chips as your bet.";
  }
  var curPlayerChips = players[playerTurn].chips;
  if (input > curPlayerChips) {
    return `I'm sorry, you do not have enough chips to bet ${input} chips.<br>You only have ${curPlayerChips} chips.<br>Please enter a valid number of chips as your bet.`;
  }

  return true;
};

//Function for generating unshuffled deck
var initializeDeck = function () {
  var suitList = ["Spades", "Hearts", "Clubs", "Diamonds"];
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
