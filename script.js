//constants
var WIN = "win";
var LOSE = "lose";
var DRAW = "draw";
var BLACKJACKWIN = "blackjack win";

var DEALING = 0;
var PLAYING = 1;
var PLAYERSELECTION = 2;
var BETSELECTION = 3;

// Global variables
var noOfPlayers = 0;
var playerInfo = [];
var aiHand = [];
var gameMode = PLAYERSELECTION;
var aiRiskThreshold = 17;
var currentPlayer = 0;

var makeDeck = function () {
  var deck = [];
  var suits = ["♠", "♣", "♥", "♦"];
  var values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  for (countSuit = 0; countSuit < suits.length; countSuit++) {
    for (let countValues = 0; countValues < values.length; countValues++) {
      deck.push({ value: values[countValues], suit: suits[countSuit] });
    }
  }
  return deck;
};

var draw = function (hand, deck) {
  var drawnCard = deck.pop();
  hand.push(drawnCard);
};

var playerInfoGenerator = function (noOfPlayers) {
  for (var i = 0; i < noOfPlayers; i++) {
    playerInfo[i] = { score: 100, hand: [], betAmt: 0 };
  }
};

var emptyHands = function (info) {
  for (var i = 0; i < info.length; i++) {
    info[i].hand = [];
  }
};

var deal = function (info, ai, noOfCards, deck) {
  for (var i = 0; i < noOfCards; i++) {
    for (var j = 0; j < info.length; j++) {
      draw(info[j].hand, deck);
    }
    draw(ai, deck);
  }
};

var shuffleDeck = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

var handValueCounter = function (hand) {
  var totalValue = 0;
  var noOfAces = 0;
  for (var i = 0; i < hand.length; i++) {
    if (hand[i].value == "J" || hand[i].value == "Q" || hand[i].value == "K") {
      totalValue += 10;
    } else if (hand[i].value == "A") {
      noOfAces += 1;
    } else {
      totalValue += Number(hand[i].value);
    }
  }
  for (var i = 0; i < noOfAces; i++) {
    if (totalValue + 11 <= 21) {
      totalValue += 11;
    } else {
      totalValue += 1;
    }
  }
  return totalValue;
};

var winChecker = function (hand1, hand2) {
  if (bjChecker(hand1) && bjChecker(hand2)) {
    return DRAW;
  } else if (bjChecker(hand1)) {
    return BLACKJACKWIN;
  }
  if (handValueCounter(hand1) > 21 && handValueCounter(hand2) > 21) {
    return DRAW;
  } else if (handValueCounter(hand1) > 21) {
    return LOSE;
  } else if (handValueCounter(hand2) > 21) {
    return WIN;
  } else {
    if (handValueCounter(hand1) > handValueCounter(hand2)) {
      return WIN;
    } else if (handValueCounter(hand1) < handValueCounter(hand2)) {
      return LOSE;
    } else {
      return DRAW;
    }
  }
};

var totalWinChecker = function (info, ai) {
  var output = [];
  for (var i = 0; i < info.length; i++) {
    var status = winChecker(info[i].hand, ai);
    output.push(status);
    if (status == WIN) {
      info[i].score += info[i].betAmt;
    } else if (status == BLACKJACKWIN) {
      info[i].score += info[i].betAmt * 1.5;
    } else if (status == LOSE) {
      info[i].score -= info[i].betAmt;
    }
    info[i].betAmt = 0;
  }
  return output;
};

var bjChecker = function (hand) {
  if (handValueCounter(hand) == 21 && hand.length == 2) {
    return true;
  }
  return false;
};

var totalBjChecker = function (info, ai) {
  var output = [];
  for (var i = 0; i < info.length; i++) {
    if (bjChecker(info[i].hand)) {
      output.push(i);
    }
  }
  if (bjChecker(ai)) {
    output.push(info.length);
  }
  return output;
};

var handDisplay = function (hand) {
  var text = ``;
  for (var i = 0; i < hand.length; i++) {
    text += `${hand[i].value + hand[i].suit}  `;
  }
  return text;
};

var statusDisplay = function (handlist, ai, slice) {
  var status = "<br>";
  for (let i = 0; i < handlist.length; i++) {
    status +=
      `<br>Player ${i + 1}'s cards drawn (${handValueCounter(
        handlist[i].hand
      )}): ` + handDisplay(handlist[i].hand);
  }
  if (slice) {
    status +=
      `<br><br>AI cards drawn (${handValueCounter(ai.slice(slice))}):<br>??  ` +
      handDisplay(ai.slice(slice));
  } else {
    status +=
      `<br><br>AI cards drawn (${handValueCounter(ai.slice(slice))}): ` +
      handDisplay(ai.slice(slice));
  }
  return status;
};

var ai = function (deck) {
  var currentScore = handValueCounter(aiHand);
  if (currentScore < aiRiskThreshold) {
    draw(aiHand, deck);
  }
};

// DOM manipulation and html elements
// true to enable submit button
var toggleButtons = function (state) {
  if (state == true) {
    document.getElementById("hit-button").disabled = true;
    document.getElementById("stand-button").disabled = true;
    document.getElementById("submit-button").disabled = false;
  } else {
    document.getElementById("hit-button").disabled = false;
    document.getElementById("stand-button").disabled = false;
    document.getElementById("submit-button").disabled = true;
  }
};

var DOMplayerSelection = function (state) {
  if (state) {
    const div = document.createElement("div");
    div.id = "player-selection";
    document.getElementById("container").appendChild(div);

    const para = document.createElement("p");
    para.innerHTML =
      "Welcome to Blackjack! Please enter the number of players.";

    const inputField = document.createElement("input");
    inputField.id = "input-field";

    const startButton = document.createElement("button");
    startButton.id = "start-button";
    startButton.innerHTML = "Start";
    startButton.style.display = "block";
    startButton.addEventListener("click", function () {
      // Set result to input value
      var result = main(inputField.value);

      // Display result in output element
      var output = document.querySelector("#output-div");
      output.innerHTML = result;

      // Reset input value
      input.value = "";
    });

    const outputField = document.createElement("div");
    outputField.id = "output-div";

    document.getElementById("player-selection").appendChild(para);
    document.getElementById("player-selection").appendChild(inputField);
    document.getElementById("player-selection").appendChild(startButton);
    document.getElementById("player-selection").appendChild(outputField);
  } else {
    var element = document.getElementById("player-selection");
    element.parentNode.removeChild(element);
  }
};

var DOMgameplay = function (state) {
  if (state) {
    const div = document.createElement("div");
    div.id = "gameplay";
    document.getElementById("container").appendChild(div);

    const para = document.createElement("p");
    para.innerHTML = "Press <b>Continue</b> to get started and deal cards.";

    const continueButton = document.createElement("button");
    continueButton.id = "submit-button";
    continueButton.innerHTML = "Continue";
    continueButton.addEventListener("click", function () {
      var result = main();
      var output = document.querySelector("#output-div");
      output.innerHTML = result;
    });

    const hitButton = document.createElement("button");
    hitButton.id = "hit-button";
    hitButton.innerHTML = "Hit";
    hitButton.addEventListener("click", function () {
      var result = main("h");
      var output = document.querySelector("#output-div");
      output.innerHTML = result;
    });

    const standButton = document.createElement("button");
    standButton.id = "stand-button";
    standButton.innerHTML = "Stand";
    standButton.addEventListener("click", function () {
      var result = main("s");
      var output = document.querySelector("#output-div");
      output.innerHTML = result;
    });

    const outputField = document.createElement("div");
    outputField.id = "output-div";

    document.getElementById("gameplay").appendChild(para);
    document.getElementById("gameplay").appendChild(continueButton);
    document.getElementById("gameplay").appendChild(hitButton);
    document.getElementById("gameplay").appendChild(standButton);
    document.getElementById("gameplay").appendChild(outputField);
  } else {
    var element = document.getElementById("gameplay");
    element.parentNode.removeChild(element);
  }
};

var DOMbetSelection = function (state) {
  if (state) {
    const div = document.createElement("div");
    div.id = "bet-selection";
    document.getElementById("container").appendChild(div);

    const para = document.createElement("p");
    para.innerHTML = "Please place your bets:";

    const inputBoxDiv = document.createElement("div");
    inputBoxDiv.id = "input-box-div";

    document.getElementById("bet-selection").appendChild(para);
    document.getElementById("bet-selection").appendChild(inputBoxDiv);

    var boxes = [];

    for (let i = 0; i < noOfPlayers; i++) {
      var inputField = document.createElement("input");
      inputField.id = `input-field${i + 1}`;
      boxes.push(inputField);
    }

    boxes.forEach((box) =>
      document.getElementById("input-box-div").appendChild(box)
    );

    const betButton = document.createElement("button");
    betButton.id = "bet-button";
    betButton.innerHTML = "Bet!";
    betButton.style.display = "block";
    betButton.addEventListener("click", function () {
      var betList = [];
      for (let i = 0; i < noOfPlayers; i++) {
        var tempBox = document.getElementById(`input-field${i + 1}`);
        betList.push(Number(tempBox.value));
      }
      // Set result to input value
      var result = main(betList);

      // Display result in output element
      var output = document.querySelector("#output-div");
      output.innerHTML = result;

      // Reset input value
      input.value = "";
    });

    const outputField = document.createElement("div");
    outputField.id = "output-div";

    document.getElementById("bet-selection").appendChild(betButton);
    document.getElementById("bet-selection").appendChild(outputField);
  } else {
    var element = document.getElementById("bet-selection");
    element.parentNode.removeChild(element);
  }
};

var main = function (input) {
  if (gameMode == PLAYERSELECTION) {
    if (Number(input) > 0 && Number(input) < 8) {
      noOfPlayers = Number(input);
      gameMode = BETSELECTION;
      playerInfoGenerator(noOfPlayers);
      DOMplayerSelection(false);
      DOMbetSelection(true);
      return "";
    } else {
      return "Please key in a player number between 0 and 8.";
    }
  }

  if (gameMode == BETSELECTION) {
    for (let i = 0; i < noOfPlayers; i++) {
      playerInfo[i].betAmt = input[i];
    }
    gameMode = DEALING;
    DOMbetSelection(false);
    DOMgameplay(true);
    toggleButtons(true);
    return "Bets have been placed. Press Continue to deal cards.";
  }

  if (gameMode == DEALING) {
    aiHand = [];
    emptyHands(playerInfo);
    sampleDeck = shuffleDeck(makeDeck());
    deal(playerInfo, aiHand, 2, sampleDeck);
    blackjackCheck = totalBjChecker(playerInfo, aiHand);
    if (blackjackCheck.length == noOfPlayers + 1) {
      gameMode = BETSELECTION;
      return (
        "It's a tie! Press Submit again to start a new round." +
        statusDisplay(playerInfo, aiHand, 0)
      );
    } else if (blackjackCheck.includes(noOfPlayers)) {
      gameMode = BETSELECTION;
      for (var i = 0; i < playerInfo.length; i++) {
        info[i].score -= info[i].betAmt * 1.5;
      }
      return (
        "Blackjack! AI wins! Press Submit again to start a new round." +
        statusDisplay(playerInfo, aiHand, 0)
      );
    } else if (blackjackCheck.length) {
      gameMode = PLAYING;
      currentPlayer = 1;
      var winningHands = [];
      for (let i of blackjackCheck) {
        winningHands.push(playerInfo[i]);
      }
      return (
        `Blackjack! Player 1+ ${blackjackCheck.join(
          ", "
        )} wins! Press Submit again to continue.` +
        statusDisplay(winningHands, aiHand, 1)
      );
    } else {
      gameMode = PLAYING;
      currentPlayer = 1;
      toggleButtons(false);
      return (
        "Cards have been dealt; player 1 hit or stand?" +
        statusDisplay([playerInfo[currentPlayer - 1]], aiHand, 1)
      );
    }
  }
  if (
    gameMode == PLAYING &&
    currentPlayer < noOfPlayers + 1 &&
    !blackjackCheck.includes(currentPlayer - 1)
  ) {
    if (input == "h") {
      draw(playerInfo[currentPlayer - 1].hand, sampleDeck);
      if (handValueCounter(playerInfo[currentPlayer - 1].hand) > 21) {
        toggleButtons(true);
        currentPlayer += 1;
        return (
          "Oops! Looks like you bust. Press Submit again to continue." +
          statusDisplay([playerInfo[currentPlayer - 2]], aiHand, 1)
        );
      }
      return (
        `Player ${currentPlayer} hit or stand?` +
        statusDisplay([playerInfo[currentPlayer - 1]], aiHand, 1)
      );
    } else if (input == "s" && currentPlayer == noOfPlayers) {
      toggleButtons(true);
      currentPlayer += 1;
      return (
        "Alright, now it's the AI's turn. Press Submit again to continue." +
        statusDisplay([playerInfo[currentPlayer - 2]], aiHand, 1)
      );
    } else if (input == "s") {
      toggleButtons(true);
      currentPlayer += 1;
      return (
        `Alright, now it will be player ${currentPlayer}'s turn. Press Submit again to continue.` +
        statusDisplay([playerInfo[currentPlayer - 2]], aiHand, 1)
      );
    } else {
      toggleButtons(false);
      return (
        `Player ${currentPlayer} hit or stand?` +
        statusDisplay([playerInfo[currentPlayer - 1]], aiHand, 1)
      );
    }
  } else if (
    gameMode == PLAYING &&
    currentPlayer < noOfPlayers + 1 &&
    blackjackCheck.includes(currentPlayer - 1)
  ) {
    toggleButtons(true);
    currentPlayer += 1;
    return "This player has won a blackjack this round. Press continue to move on to the next player.";
  }
  if (currentPlayer > noOfPlayers) {
    toggleButtons(true);
    DOMgameplay(false);
    DOMbetSelection(true);
    ai(sampleDeck);

    var winners = totalWinChecker(playerInfo, aiHand);
    var winStatement = "Round ended!<br>";
    for (var i = 0; i < winners.length; i++) {
      winStatement += `Player ${i + 1}: ${winners[i]}     Current points: ${
        playerInfo[i].score
      }<br>`;
    }
    gameMode = BETSELECTION;
    currentPlayer = 0;
    return winStatement + statusDisplay(playerInfo, aiHand, 0);
  }
};
