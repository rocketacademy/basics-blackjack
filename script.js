//17 hours

//logic add
//what if blackjack at the start of the game?
//what if everyone busted?
//What if player have no more chips?

//player contains name,chips,stand-check,value and array of cards,winLoss(win/lose/draw/"").
//player[0] is the dealer(computer)
var player = [
  {
    stand: false,
    card: [],
    value: 0,
    winLose: "",
  },
];
var deck = [];
var chipOnTable = [0];
var playerRound = 1;
var time = 0;

var addPlayer = function (playerName) {
  if (player.length === 7) {
    gameInstruct.innerHTML = `At most 6 player`;
    return;
  }
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

  let playerInfo = {
    name: playerName,
    chip: 100,
    stand: false,
    card: [],
    value: 0,
    winLose: "",
  };
  player.push(playerInfo);
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
      addPlayerButton.disabled = false;
      playButton.disabled = false;
      noOne.remove();
      player.splice(i, 1);
      renewPlayerTable();
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
    renewPlayerTable();
    gameInstruct.innerHTML = "Welcome, who wants to play BlackJack?";
    input.disabled = false;
    addPlayerButton.disabled = false;
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
    betChips.value = 1;
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
  createDeck();
  shuffleDeck();
  dealCard(0);
  dealCard(0);
  computerTable.innerHTML = `<center>Computer Hand.</center><center>${player[0].card[0].name}🂠</center>`;
  for (let i = 1; i < player.length; i++) {
    dealCard(i);
    dealCard(i);
    calValue(i);
  }
  hitButton.style.visibility = "visible";
  standButton.style.visibility = "visible";
  renewPlayerTable();
  genCardAndCompareValue();
  passPlayerRound();
  if (playerRound === player.length) {
    dealerTurn();
  }
  gameInstruct.innerHTML = `${player[playerRound].name}, it's your turn. You hit or stand?`;
};

var passPlayerRound = function () {
  for (let i = playerRound; i < player.length; i++) {
    if (player[i].stand === false) {
      break;
    } else {
      playerRound += 1;
    }
  }
};

var genCardAndCompareValue = function () {
  for (let i = playerRound; i < player.length; i++) {
    let cardContainer = document.createElement("div");
    let playerTable = document.querySelector(`#player${i}Table`);
    let cardList = ``;
    for (let j = 0; j < player[i].card.length; j++) {
      cardList += player[i].card[j].name;
    }

    aceVariation(i);
    if (player[i].value > 21) {
      player[i].winLose = "lose";
      player[i].stand = true;
      cardContainer.innerHTML = `OH! You Bust! You lose ${chipOnTable[i]} chips<br>your cards are:<br>${cardList}<br>Value: ${player[i].value}`;
    } else if (player[i].value === 21) {
      player[i].stand = true;
      cardContainer.innerHTML = `WoW you get 21!<br>You bet ${chipOnTable[i]} chips<br>your cards are:<br>${cardList}<br>Value: ${player[i].value}`;
    } else {
      cardContainer.innerHTML = `You bet ${chipOnTable[i]} chips<br>your cards are:<br>${cardList}<br>Value: ${player[i].value}`;
    }

    playerTable.append(cardContainer);
  }
  passPlayerRound();
};

var aceVariation = function (who) {
  for (let j = 0; j < player[who].card.length; j++) {
    if (player[who].card[j].rank === 1 && player[who].value > 21) {
      player[who].value -= 10;
    }
  }
};

var hit = function () {
  dealCard(playerRound);
  calValue(playerRound);
  renewPlayerTable();
  genCardAndCompareValue();
  if (playerRound === player.length) {
    dealerTurn();
  } else {
    gameInstruct.innerHTML = `${player[playerRound].name}, it's your turn. You hit or stand?`;
  }
};

var stand = function () {
  player[playerRound].stand = true;
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
  while (player[0].value < 17) {
    time += 3000;
    dealCard(0);
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
    }, time);
  }
  setTimeout(() => {
    gameInstruct.innerHTML = `Dealer's final value is ${player[0].value}`;
  }, (time += 3000));

  if (player[0].value > 21) {
    for (let i = 1; i < player.length; i++) {
      if (player[i].winLose === "") {
        player[i].winLose = "win";
      }
    }
    setTimeout(() => {
      gameInstruct.innerHTML = `Dealer is busted! Everyone who did not busted win!`;
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
  for (let i = 1; i < player.length; i++) {
    let playerTable = document.querySelector(`#player${i}Table`);
    if (
      (player[i].winLose === "" && player[i].value > player[0].value) ||
      player[i].winLose === "win"
    ) {
      player[i].chip += chipOnTable[i] * 2;
      playerTable.innerHTML = `<center>Congrats! ${player[i].name}.</center>You win ${chipOnTable[i]} chips, now you have ${player[i].chip} chips.`;
    } else if (
      player[i].winLose === "" &&
      player[i].value === player[0].value
    ) {
      player[i].chip += chipOnTable[i];
      playerTable.innerHTML = `<center>It's a tie! ${player[i].name}.</center>You have returned ${chipOnTable[i]} chips, now you have ${player[i].chip} chips.`;
    } else {
      playerTable.innerHTML = `<center>Oh! ${player[i].name}.</center>You lose ${chipOnTable[i]} chips, now you have ${player[i].chip} chips.`;
    }
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
  player[who].value = 60;
};

var dealCard = function (who) {
  let cardDealt = deck.pop();
  player[who].card.push(cardDealt);
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
  }
  chipOnTable = [0];
  playerRound = 1;
  time = 0;
};

var again = function () {
  computerTable.innerHTML = ``;
  renewPlayerTable();
  againButton.style.visibility = "hidden";
  quitButton.style.visibility = "hidden";
  main();
};

var quit = function () {
  computerTable.innerHTML = ``;
  renewPlayerTable();
  gameInstruct.innerHTML = "Welcome, who wants to play BlackJack?";
  mainMenu.style.visibility = "visible";
  againButton.style.visibility = "hidden";
  quitButton.style.visibility = "hidden";
};

var renewPlayerTable = function () {
  for (let i = playerRound; i < player.length; i++) {
    let playerTable = document.querySelector(`#player${i}Table`);
    playerTable.innerHTML = `<center><font size="5">${player[i].name}</font></center><center>Chips: ${player[i].chip}</center>`;
  }
  if (player.length != 7) {
    let playerTable = document.querySelector(`#player${player.length}Table`);
    playerTable.innerHTML = ``;
  }
};
