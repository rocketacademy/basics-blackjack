var cardDeck = [];

var playerDetails = []; //Keeps Player name, Coins, Bet
var playerCardsInHand = [[]]; //3D array
var dealerHand = [];

var gameMode = "start";

var showCard = function (name, suit) {
  if (name == "ace") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Playing_card_club_A.svg/800px-Playing_card_club_A.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Playing_card_diamond_A.svg/800px-Playing_card_diamond_A.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Playing_card_heart_A.svg/800px-Playing_card_heart_A.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Playing_card_spade_A.svg/800px-Playing_card_spade_A.svg.png" width="100">`;
  } else if (name == "2") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Playing_card_club_2.svg/800px-Playing_card_club_2.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Playing_card_diamond_2.svg/800px-Playing_card_diamond_2.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Playing_card_heart_2.svg/800px-Playing_card_heart_2.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Playing_card_spade_2.svg/800px-Playing_card_spade_2.svg.png" width="100">`;
  } else if (name == "3") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Playing_card_club_3.svg/800px-Playing_card_club_3.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Playing_card_diamond_3.svg/800px-Playing_card_diamond_3.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Playing_card_heart_3.svg/800px-Playing_card_heart_3.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_spade_3.svg/800px-Playing_card_spade_3.svg.png" width="100">`;
  } else if (name == "4") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Playing_card_club_4.svg/800px-Playing_card_club_4.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Playing_card_diamond_4.svg/800px-Playing_card_diamond_4.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Playing_card_heart_4.svg/800px-Playing_card_heart_4.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Playing_card_spade_4.svg/800px-Playing_card_spade_4.svg.png" width="100">`;
  } else if (name == "5") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_club_5.svg/800px-Playing_card_club_5.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Playing_card_diamond_5.svg/800px-Playing_card_diamond_5.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_heart_5.svg/800px-Playing_card_heart_5.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_spade_5.svg/800px-Playing_card_spade_5.svg.png" width="100">`;
  } else if (name == "6") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Playing_card_club_6.svg/800px-Playing_card_club_6.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Playing_card_diamond_6.svg/800px-Playing_card_diamond_6.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Playing_card_heart_6.svg/800px-Playing_card_heart_6.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Playing_card_spade_6.svg/800px-Playing_card_spade_6.svg.png" width="100">`;
  } else if (name == "7") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Playing_card_club_7.svg/800px-Playing_card_club_7.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Playing_card_diamond_7.svg/800px-Playing_card_diamond_7.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_heart_7.svg/800px-Playing_card_heart_7.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Playing_card_spade_7.svg/800px-Playing_card_spade_7.svg.png" width="100">`;
  } else if (name == "8") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Playing_card_club_8.svg/800px-Playing_card_club_8.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_8.svg/800px-Playing_card_diamond_8.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_8.svg/800px-Playing_card_heart_8.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Playing_card_spade_8.svg/800px-Playing_card_spade_8.svg.png" width="100">`;
  } else if (name == "9") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Playing_card_club_9.svg/800px-Playing_card_club_9.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Playing_card_diamond_9.svg/800px-Playing_card_diamond_9.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_9.svg/800px-Playing_card_heart_9.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Playing_card_spade_9.svg/800px-Playing_card_spade_9.svg.png" width="100">`;
  } else if (name == "10") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Playing_card_club_10.svg/800px-Playing_card_club_10.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Playing_card_diamond_10.svg/800px-Playing_card_diamond_10.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Playing_card_heart_10.svg/800px-Playing_card_heart_10.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Playing_card_spade_10.svg/800px-Playing_card_spade_10.svg.png" width="100">`;
  } else if (name == "jack") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Playing_card_club_J.svg/800px-Playing_card_club_J.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Playing_card_diamond_J.svg/800px-Playing_card_diamond_J.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Playing_card_heart_J.svg/800px-Playing_card_heart_J.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Playing_card_spade_J.svg/800px-Playing_card_spade_J.svg.png" width="100">`;
  } else if (name == "queen") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Playing_card_club_Q.svg/800px-Playing_card_club_Q.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Playing_card_diamond_Q.svg/800px-Playing_card_diamond_Q.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Playing_card_heart_Q.svg/800px-Playing_card_heart_Q.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Playing_card_spade_Q.svg/800px-Playing_card_spade_Q.svg.png" width="100">`;
  } else if (name == "king") {
    if (suit == "clubs")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Playing_card_club_K.svg/800px-Playing_card_club_K.svg.png" width="100">`;
    else if (suit == "diamonds")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_K.svg/800px-Playing_card_diamond_K.svg.png" width="100">`;
    else if (suit == "hearts")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Playing_card_heart_K.svg/800px-Playing_card_heart_K.svg.png" width="100">`;
    else if (suit == "spades")
      return `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Playing_card_spade_K.svg/800px-Playing_card_spade_K.svg.png" width="100">`;
  }
};

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
    return `Welcome to Basics Blackjack, Type '<b>start</b>' to play the Game </br></br>
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
  else if (checkNum == 0)
    return `Atleast 1 player is needed </br></br>
    Number of Players: </br>
    How many players will be playing Blackjack?`;

  for (let player = 0; player < checkNum; player++) {
    playerDetails.push({
      name: player,
      coins: 0,
      bet: 0,
    });
  }

  gameMode = "coins";
  return `Number of Players: <b>${checkNum}</b></br>
     Starting currency per player: </br> How much currency will each player start (<i>Minimum of 10</i>)?`;
};

var coinMode = function (coin) {
  var checkCoin = Number(coin);
  if (!Number.isInteger(checkCoin))
    return `Please input a number </br></br>
      Number of Players: <b>${checkCoin}</b></br>
      Starting currency per player: </br> How much currency will each player start (Minimum of 10)?`;
  if (checkCoin < 10)
    return `Currency must be minimum of 10 </br></br>
      Number of Players: <b>${checkCoin}</b></br>
      Starting currency per player: </br> How much currency will each player start (Minimum of 10)?`;

  for (let player = 0; player < playerDetails.length; player++) {
    playerDetails[player].coin = checkCoin;
  }

  gameMode = "game proper";
  return `Number of Players: <b>${playerDetails.length} </b></br>
     Starting currency per player: <b>${coin} M/b></br></br>
     The Blackjack will now start. </br>
     Please click <b>'Submit'</b>`;
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
  How much will you bet <b>Player ${playerDetails.name}</b>?`;
  else {
    if (playerDetails[currPlayerBet - 1].coin < checkBet) {
      console.log("coins", playerCoins[currPlayerBet - 1]);
      console.log("bet", bet);
      return `Your currency would not reach: ${bet} </br></br>
  - BETTING - </br>
  How much will you bet Player ${currPlayerBet}?`;
    } else if (checkBet == 0)
      return `You need to bet </br></br>
  - BETTING - </br>
  How much will you bet Player ${currPlayerBet}?`;

    playerDetails[currPlayerBet - 1].bet = checkBet;
    playerDetails[currPlayerBet - 1].coin -= checkBet;
    currPlayerBet++;

    if (currPlayerBet <= playerDetails.length)
      return `- BETTING - </br>
  How much will you bet Player ${currPlayerBet}?`;
    else {
      var betString = "";
      for (let p = 0; p < playerDetails.length; p++) {
        betString += `Player ${p + 1}: ${playerDetails[p].bet} | Remaining ${
          playerDetails[p].coin
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
    for (let player = 0; player <= playerDetails.length; player++) {
      var rndCard = randomizer(cardDeck.length);
      var playerCard = cardDeck[rndCard];
      cardDeck.splice(rndCard, 1);
      if (player == playerDetails.length) {
        dealerHand.push(playerCard);
      } else {
        playerCardsInHand[player].push(playerCard);
        console.log(playerCard.name);
      }
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
};
