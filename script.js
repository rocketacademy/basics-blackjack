//23.5 hours
//2000

//player contains name,chips,stand-check,value and array of cards,winLoss(win/lose/draw/"").
//player[0] is the dealer(computer)winLoss is "lose" for easy check if everyone bust (line240)
var player = [
  {
    card: [],
    value: 0,
    winLose: "lose",
  },
];
var deck = [];
var chipOnTable = [0];
var playerRound = 1;
var time = 0;
var splitPlayerAskIndex = [false];

var addPlayer = function (playerName) {
  if (playerName === "") {
    gameInstruct.innerHTML = `I would like to know your name.👉👈`;
    return;
  }
  for (let i = 0; i < player.length; i++) {
    if (playerName === player[i].name) {
      gameInstruct.innerHTML = `${playerName} is already in the game.😉<br>New player may want to choose another name.`;
      return;
    }
  }
  if (player.length === 6) {
    addPlayerButton.disabled = true;
  }
  let playerInfo = {
    name: playerName,
    chip: 100,
    stand: false,
    card: [],
    value: 0,
    winLose: "",
  };
  player.push(playerInfo);
  splitPlayerAskIndex.push(false);
  playButton.disabled = false;
  deleteButton.disabled = false;
  let playerTable = document.querySelector(`#player${player.length - 1}Table`);
  playerTable.innerHTML = `<center><font size="5">${playerInfo.name}</font></center><center>Chips: ${playerInfo.chip}</center>`;
  gameInstruct.innerHTML = "Welcome, who wants to play BlackJack?";
  return;
};

var genPlayerDelete = function () {
  for (let i = 1; i < player.length; i++) {
    let playerTable = document.querySelector(`#player${i}Table`);
    let playerButton = document.createElement("button");
    playerButton.addEventListener("click", function () {
      input.disabled = false;
      playButton.disabled = false;
      addPlayerButton.disabled = false;
      noOne.remove();
      player.splice(i, 1);
      for (let i = 1; i < player.length; i++) {
        renewPlayerTable(i);
      }
      for (let i = 0; i < 7 - player.length; i++) {
        let playerTable = document.querySelector(`#player${6 - i}Table`);
        playerTable.innerHTML = ``;
      }
      gameInstruct.innerHTML = "Welcome, who wants to play BlackJack?";
      if (player.length === 1) {
        playButton.disabled = true;
        deleteButton.disabled = true;
      }
    });
    playerButton.innerHTML = player[i].name;
    playerButton.classList.add("deleteButton");
    playerTable.innerHTML = "";
    playerTable.appendChild(playerButton);
  }

  input.disabled = true;
  addPlayerButton.disabled = true;
  playButton.disabled = true;
  gameInstruct.innerHTML = `Who wants to quit the game?`;
  var noOne = document.createElement("button");
  noOne.innerHTML = "No One";
  noOne.classList.add("deleteButton");
  noOne.addEventListener("click", function () {
    for (let i = 1; i < player.length; i++) {
      renewPlayerTable(i);
    }
    gameInstruct.innerHTML = "Welcome, who wants to play BlackJack?";
    input.disabled = false;
    if (player.length < 7) {
      addPlayerButton.disabled = false;
    }
    playButton.disabled = false;
    noOne.remove();
  });
  mainMenu.append(noOne);
};

var main = function () {
  mainMenu.style.visibility = "hidden";
  gameInstruct.innerHTML = "Please bet!";
  makeBetButton();
};

var makeBetButton = function () {
  for (let i = 1; i < player.length; i++) {
    chipOnTable.push(0);
    let playerTable = document.querySelector(`#player${i}Table`);
    let betChips = document.createElement("input");
    let betButton = document.createElement("button");
    betChips.type = "number";
    betChips.value = Math.floor(player[i].chip / 2);
    betChips.min = 1;
    betChips.max = player[i].chip;
    betChips.classList.add("betChips");
    betButton.innerHTML = "Bet!";
    betButton.classList.add("betButton");
    betChips.addEventListener("change", function () {
      if (betChips.value > player[i].chip || betChips.value <= 0) {
        betButton.disabled = true;
      } else {
        betButton.disabled = false;
      }
    });
    betButton.addEventListener("click", function () {
      bet(betChips.value, i);
      betChips.disabled = true;
      betButton.disabled = true;
    });
    playerTable.append(betChips, betButton);
  }
};

var bet = function (betChips, who) {
  player[who].chip -= betChips;
  chipOnTable[who] = Number(betChips);
  let check = true;
  for (let i = 1; i < chipOnTable.length; i++) {
    if (chipOnTable[i] === 0) {
      check = false;
      break;
    }
  }
  if (check) {
    inGame();
  }
};

var inGame = function () {
  let splitAskList = ``;
  createDeck();
  shuffleDeck();
  dealCard(player[0].card);
  dealCard(player[0].card);
  computerTable.innerHTML = `<center>Computer Hand.</center><center>${player[0].card[0].name}🂠</center>`;
  for (let i = 1; i < player.length; i++) {
    dealCard(player[i].card);
    dealCard(player[i].card);
    calValue(i);
    if (player[i].card[0].rank === player[i].card[1].rank) {
      splitPlayerAskIndex[i] = true;
      splitAskList += player[i].name + ` `;
    }
    renewPlayerTable(i);
    genCardAndCompareValue(i);
  }
  if (splitPlayerAskIndex.includes(true)) {
    splitPlayerAsk();
    gameInstruct.innerHTML = `${splitAskList}, you have two card with same rank. <br>Do you want to split?`;
    return;
  }
  hitButton.style.visibility = "visible";
  standButton.style.visibility = "visible";

  passPlayerRound();
  if (playerRound === player.length) {
    dealerTurn();
    return;
  }
  gameInstruct.innerHTML = `${player[playerRound].name}, it's your turn. You hit or stand?`;
};

var splitPlayerAsk = function () {
  for (let i = 1; i < splitPlayerAskIndex.length; i++) {
    if (splitPlayerAskIndex[i] === true) {
      let playerTable = document.querySelector(`#player${i}Table`);
      let splitButton = document.createElement("button");
      let dontButton = document.createElement("button");
      splitButton.classList.add("#betButton");
      splitButton.innerHTML = `Split!`;
      dontButton.classList.add("#betButton");
      dontButton.innerHTML = `Dont!`;
      splitButton.addEventListener("click", function () {
        if (player[i].chip < chipOnTable[i]) {
          gameInstruct.innerHTML = `${player[i].name}, you don't have enough chips.<br>You cannot split`;
          splitButton.disabled = true;
        } else {
          processSpliting(true, i);
          splitButton.disabled = true;
          dontButton.disabled = true;
        }
      });
      dontButton.addEventListener("click", function () {
        processSpliting(false, i);
        splitButton.disabled = true;
        dontButton.disabled = true;
      });
      playerTable.append(splitButton, dontButton);
    }
  }
};

var processSpliting = function (split, who) {
  if (split) {
    player[who].splitCard = [];
    player[who].splitCard.push(player[who].card.pop());
    player[who].splitValue = 0;
    player[who].splitWinLose = "";
    player[who].splitStand = false;
    player[who].chip -= chipOnTable[who];
    chipOnTable[who] *= 2;
  }

  splitPlayerAskIndex[who] = false;
  if (
    splitPlayerAskIndex.every(function (a) {
      return a === false;
    })
  ) {
    for (let i = 1; i < player.length; i++) {
      if (player[i].card.length === 1) {
        dealCard(player[i].card);
        dealCard(player[i].splitCard);
        calValue(i);
        calSplitValue(i);
        renewPlayerTable(i);
        genCardAndCompareValue(i);
      }
    }
    passPlayerRound();
    hitButton.style.visibility = "visible";
    standButton.style.visibility = "visible";
    if (playerRound === player.length) {
      dealerTurn();
      return;
    }
  }
  gameInstruct.innerHTML = `${player[playerRound].name}, it's your turn. You hit or stand?`;
};

var passPlayerRound = function () {
  for (let i = playerRound; i < player.length; i++) {
    if (player[i].stand === false) {
      gameInstruct.innerHTML = `${player[playerRound].name}, it's your turn. You hit or stand?`;
      break;
    } else if (player[i].splitStand === false) {
      gameInstruct.innerHTML = `${player[playerRound].name}, it's your turn for your second hand. You hit or stand?`;
      break;
    } else {
      playerRound += 1;
    }
  }
};

var genCardAndCompareValue = function (who) {
  let cardContainer = document.createElement("div");
  let playerTable = document.querySelector(`#player${who}Table`);
  let cardList = ``;
  for (let i = 0; i < player[who].card.length; i++) {
    cardList += player[who].card[i].name;
  }
  aceVariation(who);
  if (player[who].value > 21) {
    player[who].winLose = "lose";
    player[who].stand = true;
    cardContainer.innerHTML = `OH! You Bust! <br>your cards are:<br>${cardList}<br>Value: ${player[who].value}`;
  } else if (player[who].value === 21) {
    player[who].stand = true;
    cardContainer.innerHTML = `WoW you get 21!<br> your cards are:<br>${cardList}<br>Value: ${player[who].value}`;
  } else {
    cardContainer.innerHTML = `your cards are:<br>${cardList}<br>Value: ${player[who].value}`;
  }

  if ("splitCard" in player[who]) {
    let splitCardList = "";
    for (let i = 0; i < player[who].splitCard.length; i++) {
      splitCardList += player[who].splitCard[i].name;
    }
    aceSplitVariation(who);
    if (player[who].splitValue > 21) {
      player[who].splitWinLose = "lose";
      player[who].splitStand = true;
      cardContainer.innerHTML += `<br>Second hand is busted!<br>Cards are:${splitCardList}<br>Value :${player[who].splitValue}`;
    } else if (player[who].splitValue === 21) {
      player[who].splitStand = true;
      cardContainer.innerHTML += `<br>Second hand get 21!<br>Cards are:${splitCardList}<br>Value :${player[who].splitValue}`;
    } else {
      cardContainer.innerHTML += `<br>Second hand cards are:${splitCardList}<br>Value :${player[who].splitValue}`;
    }
  }
  playerTable.append(cardContainer);
};

var aceVariation = function (who) {
  for (let j = 0; j < player[who].card.length; j++) {
    if (player[who].card[j].rank === 1 && player[who].value > 21) {
      player[who].value -= 10;
    }
  }
};

var aceSplitVariation = function (who) {
  for (let j = 0; j < player[who].splitCard.length; j++) {
    if (player[who].splitCard[j].rank === 1 && player[who].splitValue > 21) {
      player[who].splitValue -= 10;
    }
  }
};

var hit = function () {
  if (
    player[playerRound].splitStand === false &&
    player[playerRound].stand === true
  ) {
    dealCard(player[playerRound].splitCard);
    calSplitValue(playerRound);
  } else {
    dealCard(player[playerRound].card);
    calValue(playerRound);
  }
  renewPlayerTable(playerRound);
  genCardAndCompareValue(playerRound);
  passPlayerRound();
  if (playerRound === player.length) {
    dealerTurn();
  }
};

var stand = function () {
  if (
    player[playerRound].splitStand === false &&
    player[playerRound].stand === true
  ) {
    player[playerRound].splitStand = true;
  } else {
    player[playerRound].stand = true;
  }
  passPlayerRound();
  if (playerRound === player.length) {
    dealerTurn();
  } else {
    gameInstruct.innerHTML = `${player[playerRound].name}, it's your turn. You hit or stand?`;
  }
};

var dealerTurn = function () {
  hitButton.style.visibility = "hidden";
  standButton.style.visibility = "hidden";
  calValue(0);
  gameInstruct.innerHTML = `Dealer turn!`;
  computerTable.innerHTML = `<center>${player[0].card[0].name}${player[0].card[1].name}</center><center>Value: ${player[0].value}</center>`;

  let checkSplit = false;
  for (let i = 0; i < player.length; i++) {
    if ("splitCard" in player) {
      checkSplit = true;
      break;
    }
  }

  if (
    (player.every(function (a) {
      return a.winLose === "lose";
    }) &&
      checkSplit === false) ||
    (player.every(function (a) {
      return a.winLose === "lose";
    }) &&
      checkSplit === true &&
      player.every(function (a) {
        if ("splitCard" in player) {
          return a.splitWinLose;
        } else {
          return "lose";
        }
      }))
  ) {
    setTimeout(() => {
      gameInstruct.innerHTML = `Everyone is busted! Everyone lose!`;
      compareValueAddChips();
      endGameCal();
      againButton.style.visibility = "visible";
      quitButton.style.visibility = "visible";
    }, (time += 3000));
    return;
  }

  while (player[0].value < 17) {
    dealCard(player[0].card);
    calValue(0);
    aceVariation(0);
    let cardList = ``;
    for (let j = 0; j < player[0].card.length; j++) {
      cardList += player[0].card[j].name;
    }
    let newDrawCard = player[0].card[player[0].card.length - 1].name;
    let currentValue = player[0].value;
    setTimeout(() => {
      gameInstruct.innerHTML = `Dealer draw ${newDrawCard}`;
      computerTable.innerHTML = `<center>${cardList}</center><center>Value: ${currentValue}</center>`;
    }, (time += 3000));
  }
  setTimeout(() => {
    gameInstruct.innerHTML = `Dealer's final value is ${player[0].value}`;
  }, (time += 3000));

  if (player[0].value > 21) {
    for (let i = 1; i < player.length; i++) {
      if (player[i].winLose === "") {
        player[i].winLose = "win";
      }
      if (player[i].splitWinLose === "") {
        player[i].splitWinLose = "win";
      }
    }
    setTimeout(() => {
      gameInstruct.innerHTML = `Dealer is busted! Every hand which did not busted win!`;
    }, (time += 3000));
  }
  setTimeout(() => {
    compareValueAddChips();
    endGameCal();
    againButton.style.visibility = "visible";
    quitButton.style.visibility = "visible";
  }, (time += 3000));
};

var compareValueAddChips = function () {
  let loserIndex = [];

  for (let i = 1; i < player.length; i++) {
    let playerTable = document.querySelector(`#player${i}Table`);

    if (player[i].winLose === "" && player[i].value === player[0].value) {
      player[i].winLose = "tie";
    } else if (player[i].winLose === "" && player[i].value > player[0].value) {
      player[i].winLose = "win";
    } else if (player[i].winLose === "" && player[i].value < player[0].value) {
      player[i].winLose = "lose";
    }

    if (
      player[i].splitWinLose === "" &&
      player[i].splitValue === player[0].value
    ) {
      player[i].splitWinLose = "tie";
    } else if (
      player[i].splitWinLose === "" &&
      player[i].splitValue > player[0].value
    ) {
      player[i].splitWinLose = "win";
    } else if (
      player[i].splitWinLose === "" &&
      player[i].splitValue < player[0].value
    ) {
      player[i].splitWinLose = "lose";
    }

    if (player[i].winLose === "win" && player[i].splitWinLose === "win") {
      player[i].chip += chipOnTable[i] * 2;
      playerTable.innerHTML = `<center>Congrats! ${
        player[i].name
      }.</center>You win ${chipOnTable[i] * 2} chips, now you have ${
        player[i].chip
      } chips.`;
    } else if (
      (player[i].splitWinLose === "tie" && player[i].winLose === "win") ||
      (player[i].splitWinLose === "win" && player[i].winLose === "tie") ||
      (player[i].splitWinLose === undefined && player[i].winLose === "win")
    ) {
      player[i].chip += chipOnTable[i] * 2;
      playerTable.innerHTML = `<center>Congrats! ${player[i].name}.</center>You win ${chipOnTable[i]} chips, now you have ${player[i].chip} chips.`;
    } else if (
      (player[i].splitWinLose === undefined && player[i].winLose === "tie") ||
      (player[i].splitWinLose === "lose" && player[i].winLose === "win") ||
      (player[i].splitWinLose === "tie" && player[i].winLose === "tie") ||
      (player[i].splitWinLose === "win" && player[i].winLose === "loss")
    ) {
      player[i].chip += chipOnTable[i];
      playerTable.innerHTML = `<center>It's a tie! ${player[i].name}.</center>You take back ${chipOnTable[i]} chips, now you have ${player[i].chip} chips.`;
    } else {
      playerTable.innerHTML = `<center>Oh! ${player[i].name}.</center>You lose ${chipOnTable[i]} chips, now you have ${player[i].chip} chips.`;
      if (player[i].chip === 0) {
        playerTable.innerHTML = `<center>Hey! ${player[i].name}.</center> You don't have chips left.<br>Get out of my casino!!!`;
        loserIndex.push(i);
      }
    }
  }
  for (let i = 0; i < loserIndex.length; i++) {
    player.splice(loserIndex[loserIndex.length - i - 1], 1);
  }
};

var calValue = function (who) {
  player[who].value = 0;
  for (let i = 0; i < player[who].card.length; i++) {
    if (player[who].card[i].rank >= 11) {
      player[who].value += 10;
    } else if (player[who].card[i].rank === 1) {
      player[who].value += 11;
    } else {
      player[who].value += player[who].card[i].rank;
    }
  }
};

var calSplitValue = function (who) {
  player[who].splitValue = 0;
  for (let i = 0; i < player[who].splitCard.length; i++) {
    if (player[who].splitCard[i].rank >= 11) {
      player[who].splitValue += 10;
    } else if (player[who].splitCard[i].rank === 1) {
      player[who].splitValue += 11;
    } else {
      player[who].splitValue += player[who].splitCard[i].rank;
    }
  }
};

var dealCard = function (card) {
  let cardDealt = deck.pop();
  card.push(cardDealt);
};

var renewPlayerTable = function (who) {
  let playerTable = document.querySelector(`#player${who}Table`);
  playerTable.innerHTML = `<center><font size="5">${player[who].name}</font></center><center>Chips: ${player[who].chip}</center>`;
  if (chipOnTable[who] !== undefined) {
    let betContainer = document.createElement(`div`);
    betContainer.classList.add("betContainer");
    betContainer.innerHTML = `Chips: ${chipOnTable[who]}`;
    playerTable.append(betContainer);
  }
};

var createDeck = function () {
  let suits = ["♦", "♣", "♥", "♠"];
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      let card = {};
      card.rank = j;
      card.suit = suits[i];
      if (j === 1) {
        card.name = `[A${suits[i]}]`;
      } else if (j === 11) {
        card.name = `[J${suits[i]}]`;
      } else if (j === 12) {
        card.name = `[Q${suits[i]}]`;
      } else if (j === 13) {
        card.name = `[K${suits[i]}]`;
      } else card.name = `[${j}${suits[i]}]`;
      deck.push(card);
    }
  }

  return;
};

var shuffleDeck = function () {
  for (let i = 1; i < deck.length; i++) {
    let randomIndex = Math.floor(Math.random() * deck.length);
    let temp = deck[i];

    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
};

var endGameCal = function () {
  deck = [];
  for (let i = 0; i < player.length; i++) {
    player[i].value = 0;
    player[i].card = [];
    player[i].stand = false;
    player[i].winLose = "";
    if ("splitCard" in player) {
      delete player[i].splitCard;
      delete player[i].splitValue;
      delete player[i].splitWinLose;
      delete player[i].splitStand;
    }
  }
  chipOnTable = [0];
  playerRound = 1;
  time = 0;
  splitPlayerAskIndex = [false];
};

var again = function () {
  computerTable.innerHTML = ``;
  for (let i = 1; i < player.length; i++) {
    renewPlayerTable(i);
  }
  againButton.style.visibility = "hidden";
  quitButton.style.visibility = "hidden";
  main();
};

var quit = function () {
  computerTable.innerHTML = ``;
  for (let i = 1; i < player.length; i++) {
    renewPlayerTable(i);
  }
  gameInstruct.innerHTML = "Welcome, who wants to play BlackJack?";
  mainMenu.style.visibility = "visible";
  againButton.style.visibility = "hidden";
  quitButton.style.visibility = "hidden";
};
