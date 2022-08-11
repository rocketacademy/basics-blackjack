var initialDeck = false;
var initialHand = false;
var currentDeck = [];
var dealerHand = [];
var playerNum = 0;
var playerTurn = 0;
var betInitial = false;
var initialBlackjack = false;
var splitInitial = false;
var openSplit = false;
var activePlayerBlackjack = false;
var hitStandInitial = false;
var gameResetStatus = false;
var activePlayers = [];
var hitStandDone = false;

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

//Function to reset game state and start next round
var gameReset = function () {
  for (i = 0; i < playerNum; i++) {
    players[i].hands = [];
    players[i].bet = 0;
    players[i].roundStatus = ["Playing"];
  }
  dealerHand = [];
  currentDeck = [];
  activePlayers = [];
  initialHand = false;
  initialDeck = false;
  playerTurn = 0;
  betInitial = false;
  initialBlackjack = false;
  splitInitial = false;
  openSplit = false;
  hitStandInitial = false;
  gameResetStatus = false;
  activePlayerBlackjack = false;
  hitStandDone = false;
};

var main = function (input) {
  //Check if game state need to be reset as part of new round.
  if (gameResetStatus == true) {
    gameReset();
    return `Player ${
      playerTurn + 1
    }, please enter the number of chips you would like to bet for this round.`;
  }

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

    //Deal hand for dealer
    dealerHand.push(currentDeck.pop());
    dealerHand.push(currentDeck.pop());
    initialHand = true;
  }

  //Check if player has 2 cards of the same type to split
  if (splitInitial == false) {
    if (
      players[playerTurn].hands[0][0].cardNum ==
        players[playerTurn].hands[0][1].cardNum &&
      openSplit == false &&
      players[playerTurn].bet * (players[playerTurn].hands.length + 1) <=
        players[playerTurn].chips
    ) {
      openSplit = true;
      return `You have a pair of ${players[playerTurn].hands[0][0].cardNum}s.<br>Would you like to split your hand?<br>Enter "y" to split or "n" to keep a single hand.`;
    } else if (openSplit == true) {
      if (input.toLowerCase() != "y" && input.toLowerCase() != "n") {
        return `Please enter either "y" to split or "n" to keep a single hand.`;
      } else if (input.toLowerCase() == "y") {
        splitHand(playerTurn);
      }
      openSplit = false;
      turnUpdate();
      if (playerTurn == 0) {
        splitInitial = true;
      }
    } else {
      splitInitial = true;
    }
  }

  //Temporary to debug blackjackArr insert
  // players[0].hands = [
  //   [
  //     { suit: "Spades", cardNum: "Ace", cardValue: 1 },
  //     { suit: "Spades", cardNum: "King", cardValue: 10 },
  //   ],
  // [
  //   { suit: "Hearts", cardNum: "Ace", cardValue: 1 },
  //   { suit: "Hearts", cardNum: 5, cardValue: 5 },
  // ],
  // ];
  // players[1].hands = [
  //   [
  //     { suit: "spades", cardNum: "Ace", cardValue: 1 },
  //     { suit: "spades", cardNum: "King", cardValue: 10 },
  //   ],
  // ];

  //Check if any players have a natural blackjack
  var blackjackArr = [];
  if (initialBlackjack == false) {
    for (i = 0; i < playerNum; i++) {
      for (j = 0; j < players[i].hands.length; j++) {
        var curPlayerHand = players[i].hands[j];
        if (isBlackjack(curPlayerHand)) {
          players[i].roundStatus[j] = "Won";
          players[i].chips += Math.round(players[i].bet * 1.5);
          blackjackArr.push(i);
        }
      }
      turnUpdate();

      if (playerTurn == 0) {
        initialBlackjack = true;
      }
    }
    blackjackArr = [...new Set(blackjackArr)];
    for (i = 0; i < blackjackArr.length; i++) {
      blackjackArr[i] = blackjackArr[i] + 1;
    }

    var blackjackMsg = "";
    if (blackjackArr.length == 1) {
      blackjackMsg =
        blackjackMsg +
        `Congratulations Player ${blackjackArr[0]} for drawing a Blackjack!<br>`;
    } else if (blackjackArr.length > 1) {
      blackjackIntMsg = "";
      for (i = 0; i < blackjackArr.length; i++) {
        blackjackIntMsg = blackjackIntMsg + ", " + blackjackArr[i];
      }
      blackjackMsg = `Congratulations Players ${blackjackIntMsg.substring(
        2
      )} for drawing a Blackjack!<br>`;
    }
  }

  //Check if there are any active players left after blackjack round
  if (activePlayerBlackjack == false) {
    for (i = 0; i < playerNum; i++) {
      if (playerDone(i) == false) {
        activePlayers.push(i);
      }
    }
    activePlayerBlackjack = true;

    if (activePlayers.length == 0) {
      gameResetStatus = true;
      return (
        blackjackMsg +
        `<br>This round is over.<br><br>Hit "continue" to begin the next round.`
      );
    } else {
      for (i = 0; i < activePlayers.length; i++) {
        activePlayers[i] = activePlayers[i] + 1;
      }
      activePlayers.reverse();

      playerTurn = activePlayers.pop();
      //return blackjackMsg + `<br>Hit "continue" to move to the next phase.`;
    }
  }

  //Hit or stand phase
  if (hitStandInitial == false) {
    hitStandInitial = true;
    var hitStandMsg = `Hi Player ${playerTurn}, your current hand is:<br>${activePlayerHand(
      playerTurn - 1
    )}<br>Would you like to hit or stand?<br>Enter "h" to hit or "s" to stand.`;
    return hitStandMsg;
  }

  if (hitStandDone == false) {
    if (playerDone(playerTurn - 1) == false) {
      var currentPlayerHand = playerTurnHand(playerTurn - 1);
      hitStandMsg = "";

      if (input.toLowerCase() == "s") {
        hitStandMsg = hitStandMsg + `Player ${playerTurn} has chosen to stand.`;
        players[playerTurn - 1].roundStatus[currentPlayerHand] = "Stand";
      } else if (input.toLowerCase() == "h") {
        var newCard = currentDeck.pop();

        players[playerTurn - 1].hands[currentPlayerHand].push(newCard);

        if (handScore(players[playerTurn - 1].hands[currentPlayerHand]) > 21) {
          players[playerTurn - 1].roundStatus[currentPlayerHand] = "Bust";
          players[playerTurn - 1].chips -= players[playerTurn - 1].bet;
          hitStandMsg =
            hitStandMsg +
            `Player ${playerTurn} drew ${newCard.cardNum} of ${newCard.suit} and bust.`;
        } else {
          hitStandMsg =
            hitStandMsg +
            `Player ${playerTurn}, you drew ${newCard.cardNum} of ${
              newCard.suit
            }.<br>Your current hand is:<br>${activePlayerHand(
              playerTurn - 1
            )}<br>Would you like to hit or stand?<br>Enter "h" to hit or "s" to stand.`;
          return hitStandMsg;
        }
      } else {
        return `Please select whether you like to hit or stand?<br>Enter "h" to hit or "s" to stand.`;
      }

      if (players[playerTurn - 1].roundStatus[currentPlayerHand] == "Playing") {
        hitStandMsg =
          hitStandMsg +
          `<br><br>Hi Player ${playerTurn}, your current hand is:<br>${activePlayerHand(
            playerTurn - 1
          )}<br>Would you like to hit or stand?<br>Enter "h" to hit or "s" to stand.`;
        return hitStandMsg;
      } else if (
        players[playerTurn - 1].roundStatus[currentPlayerHand + 1] === undefined
      ) {
        if (activePlayers.length > 0) {
          playerTurn = activePlayers.pop();
          hitStandMsg =
            hitStandMsg +
            `<br><br>Hi Player ${playerTurn}, your current hand is:<br>${activePlayerHand(
              playerTurn - 1
            )}<br>Would you like to hit or stand?<br>Enter "h" to hit or "s" to stand.`;
          return hitStandMsg;
        } else {
          hitStandDone = true;
          // All players are done

          return hitStandMsg;
        }
      }
    }
  }

  //Dealer draws if their score is less than 17
  if (handScore(dealerHand) < 17) {
    dealerHand.push(currentDeck.pop());
  }
};

//Function for getting current active hand of active player
var playerTurnHand = function (input) {
  var activeHand = 0;
  while (players[input].roundStatus[activeHand] != "Playing") {
    activeHand++;
  }
  return activeHand;
};

//Function for generating active player's hand as an output msg
var activePlayerHand = function (input) {
  outputMsg = "";
  var currentHand = playerTurnHand(input);
  players[input].hands[currentHand];
  for (i = 0; i < players[input].hands[currentHand].length; i++) {
    outputMsg =
      outputMsg +
      `${players[input].hands[currentHand][i].cardNum} of ${players[input].hands[currentHand][i].suit}<br>`;
  }
  return outputMsg;
};

//Function for checking if a player is done playing
var playerDone = function (input) {
  if (players[input].roundStatus.find(activeHandHelper) == "Playing") {
    return false;
  } else {
    return true;
  }
};

//Helper function to check if player has any active hands
var activeHandHelper = function (input) {
  return (input = "Playing");
};

var standPlayer = function (input) {
  if (players[input].roundStatus.find(standHandHelper) == "Stand") {
    return false;
  } else {
    return true;
  }
};

//Helper function to check if player has any hands that they stand
var standHelper = function (input) {
  return (input = "Stand");
};

//Function for splitting hands
var splitHand = function (input) {
  var handOne = [];
  var handTwo = [];

  handOne.push(players[input].hands[0][0]);
  handOne.push(currentDeck.pop());
  handTwo.push(players[input].hands[0][1]);
  handTwo.push(currentDeck.pop());

  players[input].hands = [];
  players[input].hands.push(handOne);
  players[input].hands.push(handTwo);
  players[input].roundStatus.push("Playing");
};

//Function for overall game status generation message
var gameStateMsg = function () {
  //Test multiple hand scenario

  var outputMsg = "";

  outputMsg = outputMsg + "<b><u>Dealer</u><br>";
  if (dealerHand.length > 0) {
    outputMsg = outputMsg + "Hand:</b><br>[Facedown card]<br>";
  }

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
          outputMsg +
          `<b>Hand ${k + 1}:</b> [Hand Status: ${
            players[i].roundStatus[k]
          }]<br>`;
        for (j = 0; j < players[i].hands[k].length; j++) {
          outputMsg =
            outputMsg +
            `${players[i].hands[k][j].cardNum} of ${players[i].hands[k][j].suit}<br>`;
        }
      }
    } else if (handNum == 1) {
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
