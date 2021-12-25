//make a deck of cards
var makeDeck = function () {
  var cardDeck = [];
  var suitIndex = 0;
  var suit = [`hearts`, `spades`, `diamonds`, `clubs`];
  while (suitIndex < 4) {
    var currentSuit = suit[suitIndex];
    var rankIndex = 1;
    while (rankIndex < 14) {
      var cardName = ``;
      if (rankIndex == 1) {
        cardName = `ace`;
      } else if (rankIndex == 11) {
        cardName = `jack`;
      } else if (rankIndex == 12) {
        cardName = `queen`;
      } else if (rankIndex == 13) {
        cardName = `king`;
      } else {
        cardName = rankIndex;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankIndex,
      };
      if (card.rank == 11 || card.rank == 12 || card.rank == 13) {
        card.rank = 10;
      }

      cardDeck.push(card);
      rankIndex += 1;
    }
    suitIndex += 1;
  }

  return cardDeck;
};

var cardDeck = makeDeck();

//get a random number
var getRandomNum = function (max) {
  return Math.floor(Math.random() * max);
};

//shuffle deck of cards
var shuffleDeck = function (cardDeck) {
  var cardDeckLength = cardDeck.length;
  var cardIndex = 0;
  while (cardIndex < cardDeckLength) {
    var randomNum = getRandomNum(cardDeckLength);
    var randomCard = cardDeck[randomNum];
    var currentCard = cardDeck[cardIndex];

    cardDeck[randomNum] = currentCard;
    cardDeck[cardIndex] = randomCard;

    cardIndex += 1;
  }
  return cardDeck;
};

var shuffledCardDeck = shuffleDeck(cardDeck);

var STARTGAME = `start game`;
var HITORSTAND = `hit or stand`;
var HIT = `hit`;
var STAND = `stand`;
var ENDROUND = `end of round`;
var COMPUTERCHOICE = `computer to choose hit or stand`;
var BET = `player bet`;
var gameMode = BET;

var playerCards = [];
var computerCards = [];

var playerSum = 0;
var computerSum = 0;

var playerMoney = 100;
var playerBet = 0;

var betMoney = function (betAmount) {
  playerBet = betAmount;
  console.log(playerBet);
  var message = ``;
  message =
    `You have ${playerMoney}.` +
    "<br><br>" +
    `Your bet is ${playerBet}.` +
    "<br><Br>" +
    `Press <b>Submit</b> to draw two cards.`;
  gameMode = STARTGAME;
  return message;
};

//computer and player get dealt two cards to start. Store in global variables.
var drawFirstTwoCards = function () {
  //computer draws 2 cards
  computerCards.push(shuffledCardDeck.pop());
  computerCards.push(shuffledCardDeck.pop());
  console.log(computerCards);
  computerSum = computerCards[0].rank + computerCards[1].rank;
  console.log(computerSum);

  //player draws 2 cards
  playerCards.push(shuffledCardDeck.pop());
  playerCards.push(shuffledCardDeck.pop());
  console.log(playerCards);
  playerSum = playerCards[0].rank + playerCards[1].rank;
  console.log(playerSum);

  if (
    playerSum == 21 ||
    computerSum == 21 ||
    (playerSum == 21 && computerSum == 21)
  ) {
    gameMode = ENDROUND;
    return endRound();
  } else {
    var showDrawnCards = displayCards();

    var message =
      showDrawnCards +
      "<br><br>" +
      `Would you like to <b>hit</b> or <b>stand</b>?`;
    gameMode = HITORSTAND;
    console.log("After drawing first 2 cards: " + gameMode);
  }
  return message;
};

var displayCards = function () {
  var message = ``;
  var showComputerCard = `Dealer has drawn:` + "<br>";
  var showPlayerCard = `You have drawn:` + "<br>";
  var showPlayerSum = displayPlayerSum();
  var showComputerSum = displayComputerSum();

  if (gameMode == ENDROUND) {
    for (let index = 0; index < computerCards.length; index++) {
      showComputerCard +=
        `<b>${computerCards[index].name} of ${computerCards[index].suit}</b>` +
        "<br>";
    }
    showComputerCard += showComputerSum;
  } else {
    showComputerCard +=
      `<b>${computerCards[0].name} of ${computerCards[0].suit}</b>` +
      "<br>" +
      `& ${computerCards.length - 1} covered cards` +
      "<br>";
  }

  for (let index = 0; index < playerCards.length; index++) {
    showPlayerCard +=
      `<b>${playerCards[index].name} of ${playerCards[index].suit}</b>` +
      "<br>";
  }
  showPlayerCard += showPlayerSum;

  message = showComputerCard + "<br><br>" + showPlayerCard;
  return message;
};

var displayPlayerSum = function () {
  var sumOfPlayer = 0;
  var showSum = ``;
  for (let index = 0; index < playerCards.length; index++) {
    sumOfPlayer += playerCards[index].rank;
  }
  playerSum = sumOfPlayer;

  //if ace + card < 12, + 10 to sumOfPlayer.
  for (let index = 0; index < playerCards.length; index++) {
    var currentCardName = playerCards[index].name;
    if (currentCardName == `ace` && playerSum < 12) {
      playerSum += 10;
      console.log(playerSum);
    }
  }

  showSum = `SUM: ${playerSum}` + "<br>";
  return showSum;
};

var displayComputerSum = function () {
  var sumOfComp = 0;
  var showSum = ``;
  for (let index = 0; index < computerCards.length; index++) {
    sumOfComp += computerCards[index].rank;
  }
  computerSum = sumOfComp;

  for (let index = 0; index < computerCards.length; index++) {
    var currentCardName = computerCards[index].name;
    if (currentCardName == `ace` && computerSum < 12) {
      computerSum += 10;
      console.log(computerSum);
    }
  }

  showSum = `SUM: ${computerSum}` + "<br>";
  return showSum;
};

//Player decides if they want to hit (draw a card) or stand (end their turn)
var hitOrStand = function (userChoice) {
  var message = ``;

  if (userChoice == HIT) {
    playerCards.push(shuffledCardDeck.pop());
    console.log(playerCards);

    var playerDecision = `You have chosen to HIT.`;
    var showDrawnCards = displayCards();
    message =
      showDrawnCards +
      "<br><br>" +
      playerDecision +
      "<br><br>Would you like to <b>hit</b> or <b>stand</b>?";

    //ASK AGAIN HIT OR STAND
  } else if (userChoice == STAND) {
    console.log(playerCards);
    gameMode = COMPUTERCHOICE;
    return getComputerChoice();
  } else {
    message = `please enter hit or stand`;
  }

  return message;
};

//Computer to draw card if <17
var getComputerChoice = function () {
  if (computerSum < 17) {
    computerCards.push(shuffledCardDeck.pop());
    var lastCardIndex = computerCards.length - 1;
    computerSum += computerCards[lastCardIndex].rank;
    console.log(computerSum);
    return getComputerChoice();
  } else {
    gameMode = ENDROUND;
  }
  return endRound();
};

var endRound = function () {
  gameMode = ENDROUND;
  var showDrawnCards = displayCards();
  var message =
    `PLAYER SUM: ${playerSum} vs DEALER SUM: ${computerSum}.` + "<br>";
  if (playerSum > 21 && computerSum > 21) {
    message += `You both bust. Tie.`;
  } else if (computerSum > 21 && playerSum <= 21) {
    playerMoney += playerBet;
    message += `Dealer bust! You won.`;
  } else if (computerSum <= 21 && playerSum > 21) {
    playerMoney -= playerBet;
    message += `You bust! Dealer won.`;
  } else if (playerSum <= 21 && computerSum <= 21) {
    if (playerSum < computerSum) {
      playerMoney -= playerBet;
      message += `Dealer won.`;
    } else if (playerSum > computerSum) {
      playerMoney += playerBet;
      message += `You won.`;
    } else {
      message += `Tie.`;
    }
  }

  var restartGame = `Press submit to play again.`;
  gameMode = STARTGAME;
  playerCards = [];
  computerCards = [];
  playerSum = 0;
  computerSum = 0;

  return (
    showDrawnCards +
    "<br>" +
    message +
    "<br><br>" +
    `Money: ${playerMoney}` +
    "<br><br>" +
    restartGame
  );
  //if both > 21, bust.
  //if computer > 21 and player <= 21, player wins.
  // if player > 21 and computer <= 21, computer wins.
  //if player and computer both <= 21:
  // if player > computer, player wins.
  // if computer > player, computer wins.
  //if player = computer, tie.
};

var main = function (input) {
  var myOutputValue = ``;
  console.log(gameMode);
  if (gameMode == BET) {
    myOutputValue = betMoney(input);
  } else if (gameMode == STARTGAME) {
    myOutputValue = drawFirstTwoCards();
  } else if (gameMode == HITORSTAND) {
    myOutputValue = hitOrStand(input);
  } else if (gameMode == ENDROUND) {
    myOutputValue = endRound();
  } else if (gameMode == COMPUTERCHOICE) {
    myOutputValue = getComputerChoice();
  } else {
  }

  return myOutputValue;
};
