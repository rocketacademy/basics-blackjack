var cardDeck = [];

var playerCoins = [];
var playerBet = [];

var playerCardsInHand = [[]]; //3D array
var dealerHand = 0;

var maxPlayers = 0;
var coins = 0;

var gameMode = "start";

var addCardToDeck = function () {
  cardDeck = [];
  var cardSuits = ["hearts", "diamonds", "clubs", "spades"];

  for (let pile = 0; pile < cardSuits.length; pile++) {
    for (let card = 1; card <= 13; card++) {
      var cardName = "";
      if (card == 1) cardName = "ace";
      else if (card == 11) cardName = "jack";
      else if (card == 12) cardName = "queen";
      else if (card == 13) cardName = "king";
      else cardName = card;

      if (card > 10)
        cardDeck.push({
          name: cardName,
          suit: cardSuits[pile],
          rank: card,
          value: card,
        });
      else
        cardDeck.push({
          name: cardName,
          suit: cardSuits[pile],
          rank: card,
          value: 10,
        });
    }
  }
};

var randomizer = function (num) {
  return Math.floor(Math.random() * num);
};

var shuffleDeck = function () {
  var shufffle = randomizer(100);
  console.log(shufffle);
  for (let numShuffle = 0; numShuffle < shufffle; numShuffle++) {
    var cardOne = randomizer(cardDeck.length);
    var cardTwo = randomizer(cardDeck.length);

    var temp = cardDeck[cardOne];
    cardDeck[cardOne] = cardDeck[cardTwo];
    cardDeck[cardTwo] = temp;
  }
};

var startMode = function (start) {
  if (start.toLowerCase() == "start") {
    gameMode = "players";
    return `Number of Players: </br>
        How many players will be playing Blackjack?`;
  } else {
    return `Welcome to Basics Blackjack, Type 'start' to play the Game </br></br>
        If you do not know the rules of Blackjack, here is a simple Guide.
        <iframe width="420" height="345" src="https://www.youtube.com/embed/eyoh-Ku9TCI"></iframe>`;
  }
};

var playerMode = function (numPlayer) {
  var checkNum = Number(numPlayer);
  if (!Number.isInteger(checkNum))
    return `Please input a number </br></br>
    Number of Players: </br>
    How many players will be playing Blackjack?`;

  maxPlayers = numPlayer;
  gameMode = "coins";
  return `Number of Players: ${maxPlayers}</br>
     Starting currency per player: </br> How much currency will each player start?`;
};

var coinMode = function (coin) {
  var checkNum = Number(coin);
  if (!Number.isInteger(checkNum))
    return `Please input a number </br></br>
    Number of Players: </br>
    How many players will be playing Blackjack?`;
  for (let player = 0; player < maxPlayers; player++) {
    playerCoins[player] = coin;
  }
  coins = coin;
  gameMode = "game proper";
  return `Number of Players: ${maxPlayers}</br>
     Starting currency per player: ${coins}</br></br>
     The Blackjack will now start. </br>
     Please click Submit`;
};

var currPlayerBet = 1;

var gameProperMode = function () {
  gameMode = "game proper bet";
  return `- BETTING - </br>
  How much will you bet Player ${currPlayerBet}?`;
};

var gameProperBetMode = function (bet) {
  var checkBet = Number(bet);
  if (!Number.isInteger(checkBet))
    return `Not a Number </br></br>
  - BETTING - </br>
  How much will you bet Player ${currPlayerBet}?`;
  else {
    if (playerCoins[currPlayerBet - 1] < checkBet) {
      console.log("coins", playerCoins[currPlayerBet - 1]);
      console.log("bet", bet);
      return `Your currency would not reach: ${bet} </br></br>
  - BETTING - </br>
  How much will you bet Player ${currPlayerBet}?`;
    } else if (checkBet == 0)
      return `You need to bet </br></br>
  - BETTING - </br>
  How much will you bet Player ${currPlayerBet}?`;

    playerBet[currPlayerBet - 1] = checkBet;
    playerCoins[currPlayerBet - 1] -= checkBet;
    currPlayerBet++;

    if (currPlayerBet <= maxPlayers)
      return `- BETTING - </br>
  How much will you bet Player ${currPlayerBet}?`;
    else {
      var betString = "";
      for (let p = 0; p < playerBet.length; p++) {
        betString += `Player ${p + 1}: ${playerBet[p]} | Remaining ${
          playerCoins[p]
        }</br>`;
      }

      gameMode = "blackjack";
      addCardToDeck();
      shuffleDeck();
      return `${betString} </br> </br> Collecting Bets...<br>Press Submit to Continue `;
    }
  }
};

var blackjackMode = "start";
var blackjackStart = function () {
  for (let card = 1; card <= 2; card++) {
    for (let player = 0; player < maxPlayers; player++) {
      var rndCard = randomizer(cardDeck.length);
      var playerCard = cardDeck[rndCard];
      cardDeck.splice(rndCard, 1);
      playerCardsInHand[player].push(playerCard);

      console.log(playerCard.name);
    }
  }
};
var blackjackMain = function (input) {
  blackjackStart();
};

var main = function (input) {
  if (gameMode == "start") return startMode(input);
  else if (gameMode == "players") return playerMode(input);
  else if (gameMode == "coins") return coinMode(input);
  else if (gameMode == "game proper") return gameProperMode(input);
  else if (gameMode == "game proper bet") return gameProperBetMode(input);
  else if (gameMode == "blackjack") return blackjackMain(input);

  var stringReturn = "";
  for (let i = 0; i < cardDeck.length; i++) {
    stringReturn += `${cardDeck[i].suit}  ${cardDeck[i].name} <br>`;
  }

  return "🂲";
};
