//make a deck of cards
var makeDeck = function () {
  var cardDeck = [];
  var suitIndex = 0;
  var suit = [`❤️`, `♠️`, `♦️`, `♣️`];
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
var ENDROUND = `end round`;
var COMPUTERCHOICE = `computer hit or stand`;
var BET = `player bet`;

// now we are in start game game mode
var gameMode = STARTGAME;

// i have nothing in my array in start game mode
var myCards = [];
var computerCards = [];

// i have no score right now
var playerSum = 0;
var computerSum = 0;

//computer and player get dealt two cards to start. Store in global variables.
var drawFirstTwoCards = function () {
  //computer draws 2 cards
  computerCards.push(shuffledCardDeck.pop());
  computerCards.push(shuffledCardDeck.pop());
  console.log(computerCards);
  computerSum = computerCards[0].rank + computerCards[1].rank;
  console.log(computerSum);

  //player draws 2 cards
  myCards.push(shuffledCardDeck.pop());
  myCards.push(shuffledCardDeck.pop());
  console.log(myCards);
  playerSum = myCards[0].rank + myCards[1].rank;
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
      `Please decide if you want to <b>hit</b> or <b>stand</b> and type it in the input`;
    gameMode = HITORSTAND;
    console.log("After drawing first 2 cards: " + gameMode);
  }
  return message;
};

var displayCards = function () {
  var message = "";
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
      `& ${computerCards.length - 1} hidden cards in hand` +
      "<br>";
  }

  for (let index = 0; index < myCards.length; index++) {
    showPlayerCard +=
      `<b>${myCards[index].name} of ${myCards[index].suit}</b>` + "<br>";
  }
  showPlayerCard += showPlayerSum;

  message = showComputerCard + "<br><br>" + showPlayerCard;
  return message;
};

var displayPlayerSum = function () {
  var sumOfPlayer = 0;
  var showSum = ``;
  for (let index = 0; index < myCards.length; index++) {
    sumOfPlayer += myCards[index].rank;
  }
  playerSum = sumOfPlayer;

  //if ace + card < 12, + 10 to sumOfPlayer.
  for (let index = 0; index < myCards.length; index++) {
    var currentCardName = myCards[index].name;
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
    myCards.push(shuffledCardDeck.pop());
    console.log(myCards);

    var playerDecision = `You have chosen to HIT.`;
    var showDrawnCards = displayCards();
    message =
      showDrawnCards +
      "<br><br>" +
      playerDecision +
      "<br><br>Would you like to <b>hit</b> or <b>stand</b>?";

    //ASK AGAIN HIT OR STAND
  } else if (userChoice == STAND) {
    console.log(myCards);
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

// logic for winning
//if both > 21, bust.
//if computer > 21 and player <= 21, player wins.
// if player > 21 and computer <= 21, computer wins.
//if player and computer both <= 21:
// if player > computer, player wins.
// if computer > player, computer wins.
//if player = computer, tie.

var endRound = function () {
  gameMode = ENDROUND;
  var showDrawnCards = displayCards();
  var message =
    `PLAYER SUM: ${playerSum} vs COMPUTER SUM: ${computerSum}.` + "<br>";
  if (playerSum > 21 && computerSum > 21) {
    message += `You both bust. Tie.`;
  } else if (computerSum > 21 && playerSum <= 21) {
    message += `Computer bust! You won.`;
  } else if (computerSum <= 21 && playerSum > 21) {
    message += `You bust! Computer won.`;
  } else if (playerSum <= 21 && computerSum <= 21) {
    if (playerSum < computerSum) {
      message += `Computer won. You loser.`;
    } else if (playerSum > computerSum) {
      message += `You won. 🌷 `;
    } else {
      message += `Both of you tie. Press 'let's go' to play again!`;
    }

    var restartGame = "Press 'let's go' to play again!";
    gameMode = STARTGAME;
    myCards = [];
    computerCards = [];
    playerSum = 0;
    computerSum = 0;

    return showDrawnCards + "<br>" + message + "<br><br>" + restartGame;
  }
};

// main function
var main = function (input) {
  var myOutputValue = "";
  console.log(gameMode);
  if (gameMode == STARTGAME) {
    myOutputValue = drawFirstTwoCards();
  } else if (gameMode == HITORSTAND) {
    myOutputValue = hitOrStand(input);
  } else if (gameMode == ENDROUND) {
    myOutputValue = endRound();
  } else if (gameMode == COMPUTERCHOICE) {
    myOutputValue = getComputerChoice();
  }
  return myOutputValue;
};
