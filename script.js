var deck = [];
//player contains name,coins,stand-check and array of cards.
var player = [];
var playerRound = 0;
var gameOn = false;

var main = function (input) {
  createDeck();
  shuffleDeck();

  submit.style.visibility = "hidden";
  gameOn = true;
  return `Game On`;
};

var addPlayer = function (input) {
  let name = input;
  let playerInfo = {
    name: name,
    coin: 100,
    stand: false,
    card: [],
  };
  player.push(playerInfo);
  return `${name} added`;
};

var addComputer = function () {
  let nameTag = 1;
  let name = `Computer ${nameTag}`;
  for (let i = 1; i < player.length; i++) {
    if (player[i].name == name) {
      nameTag += 1;
      name = `Computer ${nameTag}`;
    }
  }
  addPlayer(name);
  return `${name} Added`;
};

var hit = function () {
  let cardDealt = dealCard();
  player[playerRound].card.push(cardDealt);
  return `Card Dealed`;
};

var stand = function () {
  player[0].stand = true;
  return `Stand`;
};

var dealCard = function () {
  return deck.pop();
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
