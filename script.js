//10 hours

// setTimeout(() => {
//   output.innerHTML = result;
// }, 5000);

//player contains name,chips,stand-check,value and array of cards.
//player[0] is the dealer(computer)
var player = [
  {
    stand: false,
    card: [],
    value: 0,
  },
];
var deck = [];
var chipOnTable = [0];
var playerRound = 1;

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
  chipOnTable.push(betChips);

  if (chipOnTable.length === player.length) {
    inGame();
  }
};

var inGame = function () {
  renewPlayerTable();
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
  genInGameComponent();
  //Check if the first player have a instant win
  for (let i = 1; player[i].stand === true; i++) {
    playerRound += 1;
  }
  hitButton.style.visibility = "visible";
  standButton.style.visibility = "visible";

  gameInstruct.innerHTML = `${player[playerRound].name}, it's your turn. You hit or stand?`;
};

var genInGameComponent = function () {
  for (let i = 1; i < player.length; i++) {
    let cardContainer = document.createElement("div");
    let playerTable = document.querySelector(`#player${i}Table`);
    let cardList = ``;
    for (let j = 0; j < player[i].card.length; j++) {
      cardList += player[i].card[j].name;
    }
    cardContainer.innerHTML = `You bet ${chipOnTable[i]} chips<br>your cards are:<br>${cardList}<br>Value: ${player[i].value}`;

    if (player[i].value === 21) {
      cardContainer.innerHTML += "<br>Congrats, You Win!";
      player[i].stand = true;
    }
    playerTable.append(cardContainer);
  }
};

var hit = function () {
  dealCard(playerRound);
  calValue(playerRound);
  renewPlayerTable();
  genInGameComponent();
};

var stand = function () {
  player[playerRound].stand = true;
  playerRound += 1;
  gameInstruct.innerHTML = `${player[playerRound].name}, it's your turn. You hit or stand?`;
};

var calValue = function (who) {
  player[who].value = 0;
  for (let i = 0; i < player[who].card.length; i++) {
    if (player[who].card[i].rank >= 11) {
      player[who].value += 10;
    } else {
      player[who].value += player[who].card[i].rank;
    }
  }
};

var compareValue = function () {
  if (player[0].value > player[playerRound].value) {
    return `you loss`;
  }
  if (player[0].value < player[playerRound].value) {
    player[playerRound].chip += chipOnTable[playerRound] * 2;
    return `you win`;
  }
  if (player[0].value === player[i].value) {
    return `draw`;
  }
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
  }
  chipOnTable = [0];
};

var renewPlayerTable = function () {
  for (let i = 1; i < player.length; i++) {
    let playerTable = document.querySelector(`#player${i}Table`);
    playerTable.innerHTML = `<center><font size="5">${player[i].name}</font></center><center>Chips: ${player[i].chip}</center>`;
  }
  if (player.length != 7) {
    let playerTable = document.querySelector(`#player${player.length}Table`);
    playerTable.innerHTML = ``;
  }
};
