//3hours

//6 people at most
//Add user/computer before play
//After hitting to play button
//computer will automaticlly hit/stand.(no button can be pressed)
//After each round you can choose quit/play again.

//Game button flow (Completed)
//Play button, add player , add computer, delete player
//bet hit, stand
//play again, quit

//Logic/Function Needed
//player name validation(Complete)
//Add player(Complete)
//Delete Player(Complete)
//hit (complete)
//stand (complete)
//Coins select(complete)
//Check if the user over 21 or not

//Comparing result
//End Game Cal
//hit/stand for computer awaits
// setTimeout(() => {
//   output.innerHTML = result;
// }, 5000);

var deck = [];
//player contains name,coins,stand-check,value and array of cards.
//player[0] is the dealer(computer)
var player = [
  {
    stand: false,
    card: [],
    value: 0,
  },
];
var playerRound = 0;

var addPlayer = function (playerName) {
  if (player.length == 6) {
    return `At most 6 player`;
  }
  let playerInfo = {
    name: playerName,
    coin: 100,
    stand: false,
    card: [],
    value: 0,
  };
  player.push(playerInfo);
  return `${playerName} added`;
};

var playerDelete = function (deletePlayer) {
  for (let i = 0; i < player.length; i++) {
    if (deletePlayer == player[i].name) {
      player.splice(i, 1);
      return `${deletePlayer} deleted`;
    }
  }
  return `Player name ${deletePlayer} cannot be found`;
};

var main = function () {
  if (player.length == 1) {
    return `Please Add player first`;
  }
  createDeck();
  shuffleDeck();

  for (let i = 0; i < player.length; i++, playerRound += 1) {
    dealCard();
    dealCard();
  }
  playerRound = 1;

  calValue();
  return `Game On`;
};

var bet = function (input) {
  if (player[playerRound].coin < input) {
    return `you do not have enough coins`;
  }
  return `you bet ${input}`;
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

var quit = function () {};

var calValue = function () {
  for (let i = 0; i < player[playerRound].card.length; i++) {
    if (player[playerRound].card[i].rank >= 11) {
      player[playerRound].value += 10;
    } else {
      player[playerRound].value += player[playerRound].card[i].rank;
    }
  }
  console.log(player[playerRound].value);
};

var compareValue = function () {};

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
