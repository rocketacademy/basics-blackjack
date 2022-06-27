//constants
var WIN = "win";
var LOSE = "lose";
var DRAW = "draw";
var BLACKJACKWIN = "blackjack win";

var DEALING = 0;
var PLAYING = 1;
var PLAYERSELECTION = 2;
var BETSELECTION = 3;
var NAMESELECTION = 4;

// Global variables
var noOfPlayers = 2;
var playerIndexArray = [];
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

var betValidator = function (betList) {
  var validities = [];
  for (i = 0; i < playerInfo.length; i++) {
    if (
      betList[i] <= playerInfo[i].score &&
      betList[i] % 10 == 0 &&
      betList[i] != 0
    ) {
      validities.push(true);
    } else {
      validities.push(false);
    }
  }
  if (validities.includes(false)) {
    return false;
  } else {
    return true;
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
    text += `<div class = "playingCards">${hand[i].value} ${hand[i].suit}</div>`;
  }
  return text;
};

var statusDisplay = function (handlist, ai, slice) {
  var status = "<br>";
  for (i of handlist) {
    status +=
      `<br>${playerInfo[i].name}'s cards drawn (${handValueCounter(
        playerInfo[i].hand
      )}): ` + handDisplay(playerInfo[i].hand);
  }
  if (slice) {
    status +=
      `<br><br>Dealer cards drawn (${handValueCounter(
        ai.slice(slice)
      )}): <div class = "playingCards" style = "background-color: green">?</div>` +
      handDisplay(ai.slice(slice));
  } else {
    status +=
      `<br><br>Dealer cards drawn (${handValueCounter(ai.slice(slice))}): ` +
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

var DOMnameSelection = function (state) {
  if (state) {
    const div = document.createElement("div");
    div.id = "name-selection";
    document.getElementById("container").appendChild(div);

    const para = document.createElement("p");
    para.innerHTML = "Please enter your names:";

    const inputBoxDiv = document.createElement("div");
    inputBoxDiv.id = "name-box-div";

    document.getElementById("name-selection").appendChild(para);
    document.getElementById("name-selection").appendChild(inputBoxDiv);

    for (let i = 0; i < playerInfo.length; i++) {
      inputBoxDiv.appendChild(document.createTextNode(`Player ${i + 1}: `));

      var nameBox = document.createElement("input");
      nameBox.type = "text";
      nameBox.id = "name-box-" + (i + 1);
      nameBox.style = "width:50%";
      inputBoxDiv.appendChild(nameBox);
      // Append a line break
      inputBoxDiv.appendChild(document.createElement("br"));
    }

    const startButton = document.createElement("button");
    startButton.id = "start-button";
    startButton.innerHTML = "Start";
    startButton.style.display = "block";
    startButton.addEventListener("click", function () {
      var nameList = [];
      for (let i = 0; i < noOfPlayers; i++) {
        var tempBox = document.getElementById(`name-box-${i + 1}`);
        nameList.push(tempBox.value);
      }
      // Set result to input value
      var result = main(nameList);

      // Display result in output element
      var output = document.querySelector("#output-div");
      output.innerHTML = result;

      // Reset input value
      input.value = "";
    });

    document.getElementById("name-selection").appendChild(startButton);
  } else {
    var element = document.getElementById("name-selection");
    element.parentNode.removeChild(element);
  }
};

var DOMgameplay = function (state) {
  if (state) {
    const div = document.createElement("div");
    div.id = "gameplay";
    document.getElementById("container").appendChild(div);

    const scoreboard = document.createElement("div");
    scoreboard.id = "scoreboarddiv";

    document.getElementById("gameplay").appendChild(scoreboard);

    var boxlabels = [""];
    var boxes = [];
    var scores = [];

    var boxCell = document.createElement("td");
    var scoreCell = document.createElement("td");
    boxCell.append("Bet");
    scoreCell.append("Score");
    boxes.push(boxCell);
    scores.push(scoreCell);

    for (let i = 0; i < noOfPlayers; i++) {
      var cell = document.createElement("td");
      var cell2 = document.createElement("td");

      label = `${playerInfo[i].name}`;
      boxlabels.push(label);
      cell.append(playerInfo[i].betAmt);
      cell2.append(playerInfo[i].score);
      boxes.push(cell);
      scores.push(cell2);
    }

    let scoreboardTable = document.createElement("table"); // Create the table itself
    scoreboardTable.className = "scoreboardTable";
    let scoreboardTableHead = document.createElement("thead"); // Creates the table header group element
    scoreboardTableHead.className = "scoreboardTableHead";
    let scoreboardTableHeaderRow = document.createElement("tr"); // Creates the row that will contain the headers
    scoreboardTableHeaderRow.className = "scoreboardTableHeaderRow";

    boxlabels.forEach((header) => {
      let scoreHeader = document.createElement("th"); // Creates the current header cell during a specific iteration
      scoreHeader.innerText = header;
      scoreboardTableHeaderRow.append(scoreHeader); // Appends the current header cell to the header row
    });

    scoreboardTableHead.append(scoreboardTableHeaderRow); // Appends the header row to the table header group element
    scoreboardTable.append(scoreboardTableHead);
    let scoreboardTableBody = document.createElement("tbody"); // Creates the table body group element
    scoreboardTableBody.className = "scoreboardTable-Body";
    scoreboardTable.append(scoreboardTableBody); // Appends the table body group element to the table
    scoreboard.append(scoreboardTable); // Appends the table to the scoreboard div

    let scoreboardTableBodyRow = document.createElement("tr"); // Create the current table row
    scoreboardTableBodyRow.className = "scoreboardTableBodyRow";
    scoreboardTableBodyRow.append(...boxes); // Append all 5 cells to the table row
    scoreboardTable.append(scoreboardTableBodyRow);

    let scoreboardTableBodyRow2 = document.createElement("tr"); // Create the current table row
    scoreboardTableBodyRow.className = "scoreboardTableBodyRow";
    scoreboardTableBodyRow2.append(...scores); // Append all 5 cells to the table row
    scoreboardTable.append(scoreboardTableBodyRow2);

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
    para.innerHTML = "Please place your bets (in multiples of 10):";

    const inputBoxDiv = document.createElement("div");
    inputBoxDiv.id = "input-box-div";

    document.getElementById("bet-selection").appendChild(para);
    document.getElementById("bet-selection").appendChild(inputBoxDiv);

    var boxlabels = [""];
    var boxes = [];
    var scores = [];

    var boxCell = document.createElement("td");
    var scoreCell = document.createElement("td");
    boxCell.append("Bet");
    scoreCell.append("Score");
    boxes.push(boxCell);
    scores.push(scoreCell);

    for (let i = 0; i < noOfPlayers; i++) {
      var cell = document.createElement("td");
      var cell2 = document.createElement("td");

      var inputField = document.createElement("input");
      inputField.id = `input-field${i + 1}`;
      inputField.style = "width:50%";

      label = playerInfo[i].name;
      boxlabels.push(label);
      cell.append(inputField);
      cell2.append(playerInfo[i].score);
      boxes.push(cell);
      scores.push(cell2);
    }

    let scoreboardTable = document.createElement("table"); // Create the table itself
    scoreboardTable.className = "scoreboardTable";
    let scoreboardTableHead = document.createElement("thead"); // Creates the table header group element
    scoreboardTableHead.className = "scoreboardTableHead";
    let scoreboardTableHeaderRow = document.createElement("tr"); // Creates the row that will contain the headers
    scoreboardTableHeaderRow.className = "scoreboardTableHeaderRow";

    boxlabels.forEach((header) => {
      let scoreHeader = document.createElement("th"); // Creates the current header cell during a specific iteration
      scoreHeader.innerText = header;
      scoreboardTableHeaderRow.append(scoreHeader); // Appends the current header cell to the header row
    });

    scoreboardTableHead.append(scoreboardTableHeaderRow); // Appends the header row to the table header group element
    scoreboardTable.append(scoreboardTableHead);
    let scoreboardTableBody = document.createElement("tbody"); // Creates the table body group element
    scoreboardTableBody.className = "scoreboardTable-Body";
    scoreboardTable.append(scoreboardTableBody); // Appends the table body group element to the table
    inputBoxDiv.append(scoreboardTable); // Appends the table to the scoreboard div

    let scoreboardTableBodyRow = document.createElement("tr"); // Create the current table row
    scoreboardTableBodyRow.className = "scoreboardTableBodyRow";
    scoreboardTableBodyRow.append(...boxes); // Append all 5 cells to the table row
    scoreboardTable.append(scoreboardTableBodyRow);

    let scoreboardTableBodyRow2 = document.createElement("tr"); // Create the current table row
    scoreboardTableBodyRow.className = "scoreboardTableBodyRow";
    scoreboardTableBodyRow2.append(...scores); // Append all 5 cells to the table row
    scoreboardTable.append(scoreboardTableBodyRow2);

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
      gameMode = NAMESELECTION;
      for (let i = 0; i < noOfPlayers; i++) {
        playerIndexArray.push(i);
      }
      playerInfoGenerator(noOfPlayers);
      DOMplayerSelection(false);
      DOMnameSelection(true);
      return "";
    } else {
      return "Please key in a player number between 0 and 8.";
    }
  }

  if (gameMode == NAMESELECTION) {
    if (input.includes("")) {
      return "";
    } else {
      for (let i = 0; i < playerInfo.length; i++) {
        playerInfo[i].name = input[i];
      }
      gameMode = BETSELECTION;
      DOMnameSelection(false);
      DOMbetSelection(true);
      return "";
    }
  }

  if (gameMode == BETSELECTION) {
    if (betValidator(input)) {
      for (let i = 0; i < noOfPlayers; i++) {
        playerInfo[i].betAmt = input[i];
      }
      gameMode = DEALING;
      DOMbetSelection(false);
      DOMgameplay(true);
      toggleButtons(true);
      return "Bets have been placed. Press Continue to deal cards.";
    } else {
      return "Please place bets in multiples of 10 or what you can afford.";
    }
  }

  if (gameMode == DEALING) {
    aiHand = [];
    emptyHands(playerInfo);
    sampleDeck = shuffleDeck(makeDeck());
    deal(playerInfo, aiHand, 2, sampleDeck);
    blackjackCheck = totalBjChecker(playerInfo, aiHand);
    if (blackjackCheck.length == noOfPlayers + 1) {
      gameMode = BETSELECTION;
      toggleButtons(true);
      DOMgameplay(false);
      DOMbetSelection(true);
      return (
        "It's a tie! Press Submit again to start a new round." +
        statusDisplay(playerIndexArray, aiHand, 0)
      );
    } else if (blackjackCheck.includes(noOfPlayers)) {
      gameMode = BETSELECTION;
      for (var i = 0; i < playerInfo.length; i++) {
        playerInfo[i].score -= playerInfo[i].betAmt * 1.5;
      }
      toggleButtons(true);
      DOMgameplay(false);
      DOMbetSelection(true);
      return (
        "Blackjack! The dealer wins! Press Submit again to start a new round." +
        statusDisplay(playerIndexArray, aiHand, 0)
      );
    } else if (blackjackCheck.length) {
      gameMode = PLAYING;
      currentPlayer = 1;
      var winningHands = [];
      for (let i of blackjackCheck) {
        winningHands.push(playerInfo[i].name);
      }
      return (
        `Blackjack! ${winningHands.join(
          ", "
        )} wins! Press Submit again to continue.` +
        statusDisplay(blackjackCheck, aiHand, 1)
      );
    } else {
      gameMode = PLAYING;
      currentPlayer = 1;
      toggleButtons(false);
      return (
        `Cards have been dealt; ${
          playerInfo[currentPlayer - 1].name
        } hit or stand?` + statusDisplay([currentPlayer - 1], aiHand, 1)
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
          statusDisplay([currentPlayer - 2], aiHand, 1)
        );
      }
      return (
        `Player ${playerInfo[currentPlayer - 1].name} hit or stand?` +
        statusDisplay([currentPlayer - 1], aiHand, 1)
      );
    } else if (input == "s" && currentPlayer == noOfPlayers) {
      toggleButtons(true);
      currentPlayer += 1;
      return (
        "Alright, now it's the dealer's turn. Press Submit again to continue." +
        statusDisplay([currentPlayer - 2], aiHand, 1)
      );
    } else if (input == "s") {
      toggleButtons(true);
      currentPlayer += 1;
      return (
        `Alright, now it will be ${
          playerInfo[currentPlayer - 1].name
        }'s turn. Press Submit again to continue.` +
        statusDisplay([currentPlayer - 2], aiHand, 1)
      );
    } else {
      toggleButtons(false);
      return (
        `${playerInfo[currentPlayer - 1].name} hit or stand?` +
        statusDisplay([currentPlayer - 1], aiHand, 1)
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
    ai(sampleDeck);

    var winners = totalWinChecker(playerInfo, aiHand);
    var winStatement = "Round ended!<br>";
    for (var i = 0; i < winners.length; i++) {
      winStatement += `${playerInfo[i].name}: ${winners[i]}!<br>`;
    }
    toggleButtons(true);
    DOMgameplay(false);
    DOMbetSelection(true);
    gameMode = BETSELECTION;
    currentPlayer = 0;
    return winStatement + statusDisplay(playerIndexArray, aiHand, 0);
  }
};
