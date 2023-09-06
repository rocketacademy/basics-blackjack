//6.5hours
//2000

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
var playerRound = 0;

var addPlayer = function (playerName) {
  if (player.length == 7) {
    return `At most 6 player`;
  }
  if (playerName == "") {
    return `I would like to know your name.👉👈`;
  }
  for (let i = 0; i < player.length; i++) {
    if (playerName == player[i].name) {
      return `${playerName} is already in the game.😉<br>New player may want to choose another name.`;
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
  let playerTable = document.querySelector(`#player${player.length - 1}Table`);
  playerTable.innerHTML = `<center><font size="5">${playerInfo.name}</font></center><center>Chips: ${playerInfo.chip}</center>`;
  return `${playerName} added`;
};

var playerDelete = function (deletePlayer) {
  for (let i = 0; i < player.length; i++) {
    if (deletePlayer == player[i].name) {
      player.splice(i, 1);
      renewPlayerTable();
      return `${deletePlayer} deleted`;
    }
  }

  return `Player name ${deletePlayer} cannot be found`;
};

var main = function () {
  if (player.length == 1) {
    return `Please Add player first`;
  }
  mainMenu.style.visibility = "hidden";

  //gen
  gameInstruct.innerHTML = "Please choose your bet";
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
    betButton.addEventListener("click", function () {
      bet(betChips.value, i);
    });
    playerTable.append(betChips, betButton);
  }
};

var bet = function (betChips, who) {
  if (player[who].chip < input) {
    return `you do not have enough chips`;
  }
  player[who].chip -= betChips;
  chipOnTable.push[betChips];

  //Enter the game(not Completed)
  if (chipOnTable.length == player.length) {
    createDeck();
    shuffleDeck();

    for (let i = 0; i < player.length; i++, playerRound += 1) {
      dealCard();
      dealCard();
    }
    playerRound = 1;
    calValue();
  }
};

var hit = function () {
  dealCard();
  calValue();
  return `Card Dealed`;
};

var stand = function () {
  player[0].stand = true;
  playerRound += 1;
  return `Stand`;
};

var calValue = function () {
  for (let i = 0; i < player[playerRound].card.length; i++) {
    if (player[playerRound].card[i].rank >= 11) {
      player[playerRound].value += 10;
    } else {
      player[playerRound].value += player[playerRound].card[i].rank;
    }
  }
  if (player[playerRound].value > 21) {
    return `Bust`;
  }
  if (player[playerRound].value == 21) {
    player[playerRound].stand = true;
    return `Win`;
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
  if (player[0].value == player[i].value) {
    return `draw`;
  }
};

var dealCard = function () {
  cardDealt = deck.pop();
  player[playerRound].card.push(cardDealt);
  return;
};

var createDeck = function () {
  let suits = ["diamonds", "clubs", "hearts", "spades"];
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j <= 13; j++) {
      let card = {};
      card.rank = j;
      card.suit = suits[i];
      if (j == 1) {
        card.name = `Ace of ${suits[i]}`;
      } else if (j == 11) {
        card.name = `Jack of ${suits[i]}`;
      } else if (j == 12) {
        card.name = `Queen of ${suits[i]}`;
      } else if (j == 13) {
        card.name = `King of ${suits[i]}`;
      } else card.name = `${j} of ${suits[i]}`;
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
    playerTable.innerHTML = `<center>${player[i].name}</center><center>Chips: ${player[i].chip}</center>`;
  }
  let playerTable = document.querySelector(`#player${player.length}Table`);
  playerTable.innerHTML = ` `;
};
