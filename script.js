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
var dealerHandHide = true;
var standPlayers = [];
var dealerBust = false;
var dealerDraw = "";
var bankruptPlayerList = [];

var players = [];
var test = false;

//Function to initialize set of players
var playerInitialize = function () {
  var playerID = 1;
  for (i = 0; i < playerNum; i++) {
    var curPlayer = {};
    curPlayer.chips = 100;
    curPlayer.hands = [];
    curPlayer.bet = 0;
    curPlayer.roundStatus = ["Playing"];
    players.push(curPlayer);
    curPlayer.id = playerID;
    playerID++;
  }
};

//Function to reset game state and start next round
var gameReset = function () {
  var curListIndex = 0;
  for (j = 0; j < playerNum; j++) {
    if (players[curListIndex].chips <= 0) {
      players.splice(curListIndex, 1);
    } else {
      curListIndex++;
    }
  }

  playerNum = players.length;

  if (playerNum == 0) {
    startNewGame = true;
  }
  for (i = 0; i < playerNum; i++) {
    players[i].hands = [];
    players[i].bet = 0;
    players[i].roundStatus = ["Playing"];
  }
  dealerHand = [];
  currentDeck = [];
  activePlayers = [];
  standPlayers = [];
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
  dealerHandHide = true;
  dealerBust = false;
  dealerDraw = "";
};

var main = function (input) {
  //Check if game state need to be reset as part of new round.
  if (gameResetStatus == true) {
    gameReset();

    if (playerNum > 0) {
      addInputBox();
      return `Player ${players[playerTurn].id}, please enter the number of chips you would like to bet for this round.`;
    } else {
      addInputBox();
      return `There are no more players with chips remaining.<br><br>You can start a new game with fresh set of players.<br>Input the number of players you would like to begin the new game with.`;
    }
  }

  //Setting initial shuffled deck and dealer hand
  if (initialDeck == false) {
    currentDeck = shuffleDeck(initializeDeck());
    initialDeck = true;
  }

  //Setting number of players
  if (playerNum == 0) {
    if (isNaN(input) == false && input % 1 == 0 && input > 0 && input <= 5) {
      playerNum = Number(input);
      playerInitialize();
      return `We will have ${playerNum} player(s) in this game.<br>Each player begins with 100 chips.<br><br>Player ${players[playerTurn].id}, please enter the number of chips you would like to bet for this round.`;
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
      return `Player ${playerTurn} bets ${input} chips this round.<br><br>Player ${players[playerTurn].id}, please enter the number of chips you would like to bet for this round.`;
    } else if (playerTurn == playerNum - 1) {
      playerTurn = 0;
      betInitial = true;
      switchDealButton();
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

      turnUpdate(playerTurn);
    }

    //Deal hand for dealer
    dealerHand.push(currentDeck.pop());
    dealerHand.push(currentDeck.pop());
    initialHand = true;
  }

  //Section for manually altering results of the hand draw to do scenario testing
  // if (test == false) {
  //   //   //Temporary to debug blackjackArr insert
  //   // players[0].hands = [
  //   //   // [
  //   //   //   { suit: "Spades", cardNum: "Ace", cardValue: 1 },
  //   //   //   { suit: "Hearts", cardNum: "King", cardValue: 10 },
  //   //   // ],
  //   //   [
  //   //     { suit: "Hearts", cardNum: 2, cardValue: 2 },
  //   //     { suit: "Spades", cardNum: 2, cardValue: 2 },
  //   //     { suit: "Clubs", cardNum: 2, cardValue: 2 },
  //   //     { suit: "Diamonds", cardNum: 2, cardValue: 2 },
  //   //     { suit: "Hearts", cardNum: 3, cardValue: 3 },
  //   //     { suit: "Spades", cardNum: 3, cardValue: 3 },
  //   //     { suit: "Clubs", cardNum: 3, cardValue: 3 },
  //   //     { suit: "Diamonds", cardNum: 3, cardValue: 3 },
  //   //   ],
  //   // ];
  //   players[0].hands = [
  //     // [
  //     //   { suit: "Spades", cardNum: "Ace", cardValue: 1 },
  //     //   { suit: "Hearts", cardNum: "King", cardValue: 10 },
  //     // ],
  //     [
  //       { suit: "Hearts", cardNum: 5, cardValue: 5 },
  //       { suit: "Spades", cardNum: 5, cardValue: 5 },
  //     ],
  //   ];
  //   test = true;
  //   // players[1].hands = [
  //   //   [
  //   //     { suit: "spades", cardNum: "Ace", cardValue: 1 },
  //   //     { suit: "spades", cardNum: "King", cardValue: 10 },
  //   //   ],
  //   // ];
  // }
  //  Check if player has 2 cards of the same type to split
  if (splitInitial == false) {
    for (o = playerTurn; o < playerNum; o++) {
      if (
        //Player able to split
        players[playerTurn].hands[0][0].cardNum ==
          players[playerTurn].hands[0][1].cardNum &&
        openSplit == false &&
        players[playerTurn].bet * (players[playerTurn].hands.length + 1) <=
          players[playerTurn].chips
      ) {
        //Check if player wants to split
        openSplit = true;
        switchSplitButton();
        addHandImg(playerTurn);
        return `Hi Player ${players[playerTurn].id}, you have a pair of ${players[playerTurn].hands[0][0].cardNum}s.<br>Would you like to split your hand?<br><br>Your current hand is:`;
      } else if (openSplit == true) {
        //User input validation
        if (input.toLowerCase() != "y" && input.toLowerCase() != "n") {
          return `Please enter either "y" to split or "n" to keep a single hand.`;
        } else if (input.toLowerCase() == "y") {
          splitHand(playerTurn);
        }
        openSplit = false;
        turnUpdate(playerTurn);
      } else if (
        players[playerTurn].hands[0][0].cardNum !=
          players[playerTurn].hands[0][1].cardNum ||
        players[playerTurn].bet * (players[playerTurn].hands.length + 1) >
          players[playerTurn].chips
      ) {
        turnUpdate(playerTurn);
      }
    }
    if (playerTurn == 0 && openSplit == false) {
      splitInitial = true;
      switchContinueButton();
    }
  }

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
      turnUpdate(playerTurn);

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
    for (m = 0; m < playerNum; m++) {
      var loopPlayer = m;
      if (playerDone(loopPlayer) == false) {
        activePlayers.push(loopPlayer);
      }
    }
    activePlayerBlackjack = true;

    if (activePlayers.length == 0) {
      gameResetStatus = true;
      removeInput();
      return (
        blackjackMsg +
        `<br>This round is over.<br><br>Hit "continue" to begin the next round.`
      );
    } else {
      activePlayers.reverse();

      playerTurn = activePlayers.pop();
    }
  }

  //Hit or stand phase
  if (hitStandInitial == false) {
    hitStandInitial = true;

    var hitStandMsg = `Hi Player ${players[playerTurn].id}, would you like to hit or stand?<br><br>Your current hand is:`;
    switchHitStandButton();
    addHandImg(playerTurn);
    return hitStandMsg;
  }

  var currentPlayerHand = playerTurnHand(playerTurn);

  if (hitStandDone == false) {
    hitStandMsg = "";

    //Invalid user input scenario
    if (input.toLowerCase() != "s" && input.toLowerCase() != "h") {
      switchHitStandButton();
      return `Please select whether you like to hit or stand?`;

      //User choose to stand
    } else if (input.toLowerCase() == "s") {
      hitStandMsg =
        hitStandMsg + `Player ${players[playerTurn].id} has chosen to stand.`;
      players[playerTurn].roundStatus[currentPlayerHand] = "Stand";
    } else {
      //User choose to hit
      var newCard = currentDeck.pop();

      players[playerTurn].hands[currentPlayerHand].push(newCard);

      //If player went bust after hitting
      if (handScore(players[playerTurn].hands[currentPlayerHand]) > 21) {
        players[playerTurn].roundStatus[currentPlayerHand] = "Bust";
        players[playerTurn].chips -= players[playerTurn].bet;
        hitStandMsg =
          hitStandMsg +
          `Player ${players[playerTurn].id} drew ${newCard.cardNum} of ${newCard.suit} and bust.`;
      } else {
        //Player didn't bust
        hitStandMsg =
          hitStandMsg +
          `Player ${players[playerTurn].id}, you drew ${newCard.cardNum} of ${newCard.suit}.<br>Would you like to hit or stand?<br><br>Your current hand is:`;
        switchHitStandButton();
        addHandImg(playerTurn);
        return hitStandMsg;
      }
    }

    if (playerDone(playerTurn) == false || activePlayers.length > 0) {
      if (playerDone(playerTurn) && activePlayers.length > 0) {
        //If the current player is done, go to next player
        playerTurn = activePlayers.pop();
      }
      if (playerDone(playerTurn) == false) {
        //Update latest hand
        currentPlayerHand = playerTurnHand(playerTurn);
      }
      hitStandMsg =
        hitStandMsg +
        `<br><br>Hi Player ${players[playerTurn].id}, would you like to hit or stand?<br><br>Your current hand is:`;
      switchHitStandButton();
      addHandImg(playerTurn);
      return hitStandMsg;
    } else {
      hitStandDone = true;
      switchContinueButton();
    }
  }

  //Checking which players stand
  for (n = 0; n < playerNum; n++) {
    var currentStandPlayer = n;
    if (standPlayer(currentStandPlayer) == true) {
      standPlayers.push(currentStandPlayer);
    }
  }

  if (standPlayers.length == 0) {
    hitStandMsg =
      hitStandMsg +
      `<br>This round is over.<br><br>Hit "continue" to begin the next round.`;
    gameResetStatus = true;
    removeInput();
    return hitStandMsg;
  } else {
    //Dealer draws if their score is less than 17
    hitStandMsg = hitStandMsg + `<br>`;
    dealerHandHide = false;
    while (handScore(dealerHand) < 17) {
      dealerDraw = currentDeck.pop();
      dealerHand.push(dealerDraw);

      if (handScore(dealerHand) > 21) {
        dealerBust = true;
        hitStandMsg =
          hitStandMsg +
          `<br>The dealer drew ${dealerDraw.cardNum} of ${dealerDraw.suit} and bust.`;
      } else {
        hitStandMsg =
          hitStandMsg +
          `<br>The dealer drew ${dealerDraw.cardNum} of ${dealerDraw.suit}.`;
      }
    }

    for (k = 0; k < playerNum; k++) {
      for (l = 0; l < players[k].hands.length; l++) {
        if (players[k].roundStatus[l] == "Stand") {
          if (dealerBust == true) {
            players[k].chips += players[k].bet * 2;
            players[k].roundStatus[l] = "Won";
          } else {
            if (handScore(dealerHand) > handScore(players[k].hands[l])) {
              //Player lose
              players[k].chips -= players[k].bet;
              players[k].roundStatus[l] = "Lost";
              hitStandMsg =
                hitStandMsg +
                `<br><br>The dealer has a hand of ${handScore(
                  dealerHand
                )} points, beating Player ${
                  players[k].id
                }'s hand of ${handScore(players[k].hands[l])} points.`;
            } else if (handScore(dealerHand) < handScore(players[k].hands[l])) {
              //Player win
              players[k].chips += players[k].bet * 2;
              players[k].roundStatus[l] = "Won";

              hitStandMsg =
                hitStandMsg +
                `<br><br>The dealer has a hand of ${handScore(
                  dealerHand
                )} points, losing to Player ${
                  players[k].id
                }'s hand of ${handScore(players[k].hands[l])} points.`;
            } else {
              //Draw
              players[k].roundStatus[l] = "Draw";
              hitStandMsg =
                hitStandMsg +
                `<br><br>The dealer has a hand of ${handScore(
                  dealerHand
                )} points, tying with Player ${
                  players[k].id
                }'s hand of ${handScore(players[k].hands[l])} points.`;
            }
          }
        }
      }
    }
  }

  //Check if a player is out of chips
  for (p = 0; p < playerNum; p++) {
    var chipCheck = 0;
    var bankruptPlayers = [];
    if (players[chipCheck].chips <= 0) {
      bankruptPlayers.push(chipCheck);
    }
  }

  if (bankruptPlayers.length == 1) {
    hitStandMsg =
      hitStandMsg +
      `<br><br>Player ${
        players[bankruptPlayers[0]].id
      } ran out of chips and is out of the game.`;
    bankruptPlayerList.push(bankruptPlayers[0]);
  } else if (bankruptPlayers.length > 1) {
    hitStandMsg = hitStandMsg + `<br><br>Players `;
    var bankruptMsg = "";
    for (q = 0; q < bankruptPlayers.length; q++) {
      if (players[bankruptPlayers[q]].chips <= 0) {
        bankruptMsg = bankruptMsg + `, ${players[bankruptPlayers[q]].id}`;
        bankruptPlayerList.push(bankruptPlayers[q]);
      }
    }
    bankruptMsg = bankruptMsg.substring(2);
    hitStandMsg =
      hitStandMsg + bankruptMsg + `ran out of chips and are out of the game.`;
  }
  hitStandMsg = hitStandMsg + `<br><br>Hit "continue" to start a new round.`;
  gameResetStatus = true;
  removeInput();
  return hitStandMsg;
};

//Function for getting current active hand of active player
var playerTurnHand = function (input) {
  var activeHand = 0;
  while (players[input].roundStatus[activeHand] != "Playing") {
    activeHand++;
  }
  return activeHand;
};

//Function for getting current stand hand of active player
var playerStandHand = function (input) {
  var activeHand = 0;
  while (players[input].roundStatus[activeHand] != "Stand") {
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
  var playingCounter = 0;
  for (i = 0; i < players[input].roundStatus.length; i++) {
    if (players[input].roundStatus[i] == "Playing") {
      playingCounter++;
    }
  }

  if (playingCounter > 0) {
    return false;
  } else {
    return true;
  }
};

//Helper function to check if player has any active hands
var activeHandHelper = function (input) {
  return (input = "Playing");
};

//Function for checking if a player has any hands that they stand
var standPlayer = function (input) {
  var standCounter = 0;
  for (i = 0; i < players[input].roundStatus.length; i++) {
    if (players[input].roundStatus[i] == "Stand") {
      standCounter++;
    }
  }

  if (standCounter > 0) {
    return true;
  } else {
    return false;
  }
};

//Function for checking how many active hands a player has remaining
var activeHandsCounter = function (input) {
  var activeCounter = 0;
  for (i = 0; i < input.length; i++) {
    if (input[i] == "Playing") {
      activeCounter++;
    }
  }
  return activeCounter;
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
  var outputMsg = "";

  var gameStateBox = document.querySelector("#gameTracker");

  const dealerHeader = document.createElement("p");
  dealerHeader.innerHTML = `<b><u>Dealer</u><br>Hand:</b><br>`;
  dealerHeader.id = "dealerHeader";
  gameStateBox.appendChild(dealerHeader);

  const dealerHandImg = document.createElement("div");
  if (dealerHand.length > 0) {
    if (dealerHandHide == true) {
      const facedownCard = document.createElement("img");
      facedownCard.src = `../basics-blackjack/cards/jokers.png`;
      facedownCard.style.width = "20%";
      dealerHandImg.appendChild(facedownCard);
    } else {
      const dealerCard = document.createElement("img");
      dealerCard.src = `../basics-blackjack/cards/${dealerHand[0].cardNum}-of-${dealerHand[0].suit}.png`;
      dealerCard.style.width = "20%";
      dealerHandImg.appendChild(dealerCard);
    }
  }

  for (i = 1; i < dealerHand.length; i++) {
    const dealerCard = document.createElement("img");
    dealerCard.src = `../basics-blackjack/cards/${dealerHand[i].cardNum}-of-${dealerHand[i].suit}.png`;
    dealerCard.style.width = "20%";
    dealerHandImg.appendChild(dealerCard);
  }
  gameStateBox.appendChild(dealerHandImg);

  for (i = 0; i < playerNum; i++) {
    //Add player header
    const playerHeader = document.createElement("p");
    playerHeader.innerHTML = `<br><b><u>Player ${players[i].id}</u><br>Chips: ${players[i].chips}🪙<br>Current round bet: ${players[i].bet}🪙<br></b>`;
    playerHeader.id = `player${i}Header`;
    gameStateBox.appendChild(playerHeader);

    var handNum = players[i].hands.length;
    if (handNum > 1) {
      //Add scenario of number of hands per player > 1

      for (k = 0; k < players[i].hands.length; k++) {
        const playerHandStatus = document.createElement("p");
        playerHandStatus.innerHTML = `<b>Hand ${k + 1}:</b> [Hand Status: ${
          players[i].roundStatus[k]
        }]<br>`;
        playerHandStatus.id = `player${i}hand${k}header`;
        gameStateBox.appendChild(playerHandStatus);
        const playerHandImg = document.createElement("div");

        for (j = 0; j < players[i].hands[k].length; j++) {
          const playerCard = document.createElement("img");
          playerCard.src = `../basics-blackjack/cards/${players[i].hands[k][j].cardNum}-of-${players[i].hands[k][j].suit}.png`;
          playerCard.style.width = "20%";
          playerHandImg.appendChild(playerCard);
        }
        gameStateBox.appendChild(playerHandImg);
      }
    } else if (handNum == 1) {
      const playerHandStatus = document.createElement("p");
      playerHandStatus.innerHTML = `<b>Current round status: ${players[i].roundStatus[0]}<br>Hand:</b><br>`;
      playerHandStatus.id = `player${i}handheader`;
      gameStateBox.appendChild(playerHandStatus);
      const playerHandImg = document.createElement("div");

      for (j = 0; j < players[i].hands[0].length; j++) {
        const playerCard = document.createElement("img");
        playerCard.src = `../basics-blackjack/cards/${players[i].hands[0][j].cardNum}-of-${players[i].hands[0][j].suit}.png`;
        playerCard.style.width = "20%";
        playerHandImg.appendChild(playerCard);
      }
      gameStateBox.appendChild(playerHandImg);
    }
  }
};

//Function for player turn cycling
var turnUpdate = function (input) {
  if (input < playerNum - 1) {
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

var switchHitStandButton = function () {
  //Replace new buttons
  const container = document.getElementById("buttonBox");
  container.replaceChildren();

  const hitButton = document.createElement("button");
  const standButton = document.createElement("button");

  hitButton.innerHTML = "Hit";
  standButton.innerHTML = "Stand";

  hitButton.id = "hitButton";
  standButton.id = "standButton";

  hitButton.addEventListener("click", function () {
    //Clear player hand div
    var playerHand = document.querySelector("#player-hand");
    playerHand.replaceChildren();

    var result = main("h");
    var output = document.querySelector("#output-div");
    output.innerHTML = result;

    //Clear game state tracker div
    var trackerOutput = document.querySelector("#gameTracker");
    trackerOutput.replaceChildren();

    //Populate game state tracker div
    gameStateMsg();
  });

  standButton.addEventListener("click", function () {
    //Clear player hand div
    var playerHand = document.querySelector("#player-hand");
    playerHand.replaceChildren();

    var result = main("s");
    var output = document.querySelector("#output-div");
    output.innerHTML = result;

    //Clear game state tracker div
    var trackerOutput = document.querySelector("#gameTracker");
    trackerOutput.replaceChildren();

    //Populate game state tracker div
    gameStateMsg();
  });

  hitButton.style.width = "100px";
  standButton.style.width = "100px";

  container.appendChild(hitButton);
  container.appendChild(standButton);

  //Remove input box
  const container2 = document.getElementById("inputBox");
  container2.replaceChildren();
};

var switchContinueButton = function () {
  //Replace new buttons
  const container = document.getElementById("buttonBox");
  container.replaceChildren();

  const continueButton = document.createElement("button");

  continueButton.innerHTML = "Continue";

  continueButton.id = "submit-button";

  continueButton.addEventListener("click", function () {
    //Clear player hand div
    var playerHand = document.querySelector("#player-hand");
    playerHand.replaceChildren();

    // Set result to input value
    var input = document.querySelector("#input-field");

    var result = main(input.value);

    // Display result in output element
    var output = document.querySelector("#output-div");

    output.innerHTML = result;

    // Reset input value
    input.value = "";

    //Clear game state tracker div
    var trackerOutput = document.querySelector("#gameTracker");
    trackerOutput.replaceChildren();

    //Populate game state tracker div
    gameStateMsg();
  });

  container.appendChild(continueButton);

  //Add input box
  const container2 = document.getElementById("inputBox");
  container2.replaceChildren();
  const inputBox = document.createElement("input");
  inputBox.id = "input-field";
  container2.appendChild(inputBox);
};

var switchSplitButton = function () {
  //Replace new buttons
  const container = document.getElementById("buttonBox");
  container.replaceChildren();

  const splitYButton = document.createElement("button");
  const splitNButton = document.createElement("button");

  splitYButton.innerHTML = "Split";
  splitNButton.innerHTML = "Don't split";

  splitYButton.id = "splitYButton";
  splitNButton.id = "splitNButton";

  splitYButton.addEventListener("click", function () {
    //Clear player hand div
    var playerHand = document.querySelector("#player-hand");
    playerHand.replaceChildren();

    var result = main("y");
    var output = document.querySelector("#output-div");
    output.innerHTML = result;

    //Clear game state tracker div
    var trackerOutput = document.querySelector("#gameTracker");
    trackerOutput.replaceChildren();

    //Populate game state tracker div
    gameStateMsg();
  });

  splitNButton.addEventListener("click", function () {
    //Clear player hand div
    var playerHand = document.querySelector("#player-hand");
    playerHand.replaceChildren();

    var result = main("n");
    var output = document.querySelector("#output-div");
    output.innerHTML = result;

    //Clear game state tracker div
    var trackerOutput = document.querySelector("#gameTracker");
    trackerOutput.replaceChildren();

    //Populate game state tracker div
    gameStateMsg();
  });

  splitYButton.style.width = "120px";
  splitNButton.style.width = "120px";

  container.appendChild(splitYButton);
  container.appendChild(splitNButton);

  //Remove input box
  const container2 = document.getElementById("inputBox");
  container2.replaceChildren();
};

var switchDealButton = function () {
  //Replace new buttons
  const container = document.getElementById("buttonBox");
  container.replaceChildren();

  const continueButton = document.createElement("button");

  continueButton.innerHTML = "Deal Cards";

  continueButton.id = "submit-button";

  continueButton.addEventListener("click", function () {
    //Clear player hand div
    var playerHand = document.querySelector("#player-hand");
    playerHand.replaceChildren();

    // Set result to input value
    var input = document.querySelector("#input-field");

    var result = main();
    //var trackerMsg = gameStateMsg();

    // Display result in output element
    var output = document.querySelector("#output-div");
    output.innerHTML = result;

    //Clear game state tracker div
    var trackerOutput = document.querySelector("#gameTracker");
    trackerOutput.replaceChildren();

    //Populate game state tracker div
    gameStateMsg();
  });

  container.appendChild(continueButton);

  //Remove input box
  const container2 = document.getElementById("inputBox");
  container2.replaceChildren();
};

var removeInput = function () {
  //Replace new buttons
  const container = document.getElementById("buttonBox");
  container.replaceChildren();

  const continueButton = document.createElement("button");

  continueButton.innerHTML = "Continue";

  continueButton.id = "submit-button";

  continueButton.addEventListener("click", function () {
    //Clear player hand div
    var playerHand = document.querySelector("#player-hand");
    playerHand.replaceChildren();

    var result = main();

    // Display result in output element
    var output = document.querySelector("#output-div");
    output.innerHTML = result;

    //Clear game state tracker div
    var trackerOutput = document.querySelector("#gameTracker");
    trackerOutput.replaceChildren();

    //Populate game state tracker div
    gameStateMsg();
  });

  container.appendChild(continueButton);

  //Remove input box
  const container2 = document.getElementById("inputBox");
  container2.replaceChildren();
};

var addInputBox = function () {
  //Replace new buttons
  const container = document.getElementById("buttonBox");
  container.replaceChildren();

  const continueButton = document.createElement("button");

  continueButton.innerHTML = "Continue";

  continueButton.id = "submit-button";

  continueButton.addEventListener("click", function () {
    //Clear player hand div
    var playerHand = document.querySelector("#player-hand");
    playerHand.replaceChildren();

    // Set result to input value
    var input = document.querySelector("#input-field");

    var result = main(input.value);

    // Display result in output element
    var output = document.querySelector("#output-div");
    output.innerHTML = result;

    // Reset input value
    input.value = "";

    //Clear game state tracker div
    var trackerOutput = document.querySelector("#gameTracker");
    trackerOutput.replaceChildren();

    //Populate game state tracker div
    gameStateMsg();
  });

  container.appendChild(continueButton);

  //Add input box
  const container2 = document.getElementById("inputBox");
  container2.replaceChildren();
  const inputBox = document.createElement("input");
  inputBox.id = "input-field";
  container2.appendChild(inputBox);
};

var addHandImg = function (input) {
  var inputHand = players[input].hands[playerTurnHand(input)];
  const outputBox = document.querySelector("#player-hand");
  for (let i = 0; i < inputHand.length; i++) {
    const cardElement = document.createElement("img");

    var cardNumInput = inputHand[i].cardNum;
    var cardSuitInput = inputHand[i].suit.toLowerCase();

    if (isNaN(cardNumInput)) {
      cardNumInput = cardNumInput.toLowerCase();
    }

    cardElement.src = `../basics-blackjack/cards/${cardNumInput}-of-${cardSuitInput}.png`;
    cardElement.style.width = "20%";
    outputBox.appendChild(cardElement);
  }
  const newPara = document.createElement("p");
  const creditLink = document.createElement("a");
  creditLink.innerText = "Playing card icons courtesy of rizal2109";
  creditLink.href =
    "https://www.flaticon.com/packs/playing-cards-6?style_id=1216&family_id=333&group_id=810";
  newPara.appendChild(creditLink);
  newPara.style.fontSize = "10px";
  newPara.style.fontcolor = "black";
  outputBox.appendChild(newPara);
};
