var gameMode = "deal cards";
var cardDeck = [];
var playersHand = [];
var computersHand = [];
var winningIndex = [];
var playerScore = 0;
var computerScore = 0;
var myOutputValue = "";

var makeDeck = function () {
  cardDeck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    var currentSuit = suits[suitIndex];
    for (let rankCounter = 1; rankCounter < 14; rankCounter++) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "A";
      } else if (cardName == 11) {
        cardName = "J";
      } else if (cardName == 12) {
        cardName = "Q";
      } else if (cardName == 13) {
        cardName = "K";
      }
      var card = { name: cardName, suit: currentSuit, rank: rankCounter };
      cardDeck.push(card);
    }
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  for (let currentIndex = 0; currentIndex < cardDeck.length; currentIndex++) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

var checkforBlackjack = function (whoseHand) {
  for (let rankCounter = 10; rankCounter < 14; rankCounter++) {
    if (
      (whoseHand[0].rank == 1 && whoseHand[1].rank == rankCounter) ||
      (whoseHand[1].rank == 1 && whoseHand[0].rank == rankCounter)
    ) {
      winningIndex.push(whoseHand);
    }
  }
};

var displayHand = function (whoseHand) {
  var hand = "";
  for (let index = 0; index < whoseHand.length; index++) {
    hand += `<b>  ${whoseHand[index].name}${whoseHand[index].suit}  </b>`;
  }
  return hand;
};

var calculateScore = function (whoseHand) {
  var score = 0;
  for (let index = 0; index < whoseHand.length; index++) {
    if (whoseHand[index].rank > 10) {
      whoseHand[index].rank = 10;
    }
  }
  for (let index = 0; index < whoseHand.length; index++) {
    score += whoseHand[index].rank;
  }
  for (let index = 0; index < whoseHand.length; index++) {
    if (whoseHand[index].rank == 1 && score < 12) {
      score += 10;
    }
  }
  return score;
};

var gameRestart = function () {
  cardDeck = [];
  playersHand = [];
  computersHand = [];
  winningIndex = [];
  gameMode = "deal cards";
};

var start = function () {
  if (gameMode == "deal cards") {
    shuffleCards(makeDeck());
    for (let index = 0; index < 2; index++) {
      playersHand.push(cardDeck.pop());
      computersHand.push(cardDeck.pop());
    }
    gameMode = "check for blackjack";
  }
  if (gameMode == "check for blackjack") {
    checkforBlackjack(playersHand);
    checkforBlackjack(computersHand);
    playerScore = calculateScore(playersHand);
    computerScore = calculateScore(computersHand);
    myOutputValue =
      `<b>Player's hand: </b>` +
      displayHand(playersHand) +
      `<br> Total: ${playerScore} <br> <br> <b>Computer's hand: </b>` +
      displayHand(computersHand) +
      `<br> Total: ${computerScore}`;
    if (winningIndex.length == 1) {
      if (winningIndex[0] == playersHand) {
        myOutputValue += ` <br> <br> <b>You got Blackjack! You win!</b>`;
      } else if (winningIndex[0] == computersHand) {
        myOutputValue += ` <br> <br> <b>The computer got Blackjack! You lose!</b>`;
      }
      myOutputValue += ` <br> <br> Click <b>Start</b> to play again!`;
      gameRestart();
    } else if (winningIndex.length == 2) {
      myOutputValue += ` <br> <br> <b>It's a tie! Both you and the computer got Blackjack!</b> <br> <br> Click <b>Start</b> to play again!`;
      gameRestart();
    } else if (winningIndex.length == 0) {
      myOutputValue =
        `<b>Player's hand: </b>` +
        displayHand(playersHand) +
        `<br> Total: ${playerScore} <br> <br> <b>Computer's hand: ? ${computersHand[1].name}${computersHand[1].suit}</b> <br> Total: ? <br> <br> Click <b>Hit</b> or <b>Stand</b> to continue.`;
      gameMode = "hit";
    }
  }
  return myOutputValue;
};

var hit = function () {
  if (gameMode == "hit") {
    if (playersHand.length < 5) {
      playersHand.push(cardDeck.pop());
      playerScore = calculateScore(playersHand);
      myOutputValue =
        `<b>Player's hand: </b>` +
        displayHand(playersHand) +
        `<br> Total: ${playerScore} <br> <br> <b>Computer's hand: ? ${computersHand[1].name}${computersHand[1].suit}</b> <br> Total: ? `;
      if (playerScore < 22) {
        myOutputValue += `<br> <br> Click <b>Hit</b> or <b>Stand</b> to continue.`;
      } else if (playerScore > 21) {
        myOutputValue += `<br> <br> Oh no! You bust! <br> <br> Click <b>Stand</b> to continue.`;
        gameMode = "stand";
      }
    } else if (playersHand.length > 4) {
      myOutputValue =
        `<b>Player's hand: </b>` +
        displayHand(playersHand) +
        `<br> Total: ${playerScore}  <br> <br> <b>Computer's hand: ? ${computersHand[1].name}${computersHand[1].suit}</b> <br> Total: ? <br> <br> You have reached your maximum hand of five cards, click <b>Stand</b> to continue.`;
    }
  } else if (gameMode == "deal cards") {
    myOutputValue = `Click <b>Start</b> to play again!`;
  }
  return myOutputValue;
};

var stand = function () {
  gameMode = "stand";
  if (gameMode == "stand") {
    if (cardDeck.length == 0) {
      myOutputValue = "Click <b>Start</b> to play again!";
      gameRestart();
    } else {
      playerScore = calculateScore(playersHand);
      computerScore = calculateScore(computersHand);
      while (computerScore < 17 && computersHand.length < 5) {
        computersHand.push(cardDeck.pop());
        computerScore = calculateScore(computersHand);
      }
      myOutputValue =
        `<b>Player's hand:</b>` +
        displayHand(playersHand) +
        `<br> Total: ${playerScore} <br> <br> <b>Computer's hand:</b>` +
        displayHand(computersHand) +
        `<br> Total: ${computerScore}`;
      if (computerScore > 21 && playerScore < 22) {
        myOutputValue += `<br> <br> <b>Computer bust! You win!</b>`;
      } else if (computerScore < 22 && playerScore > 21) {
        myOutputValue += `<br> <br> <b>You bust! You lose!</b>`;
      } else if (computerScore > 21 && playerScore > 21) {
        myOutputValue += `<br> <br> <b>You and the computer bust! It's a tie!</b>`;
      } else if (
        (computerScore > 16 && playerScore < 22) ||
        (computersHand.length > 4 && playerScore < 22)
      ) {
        if (computerScore > playerScore) {
          myOutputValue += `<br> <br> <b>You lose!</b>`;
        } else if (computerScore < playerScore) {
          myOutputValue += `<br> <br> <b>You win!</b>`;
        } else if (computerScore == playerScore) {
          myOutputValue += `<br> <br> <b>It's a tie!</b>`;
        }
      }
      myOutputValue += `<br> <br> Click <b>Start</b> to play again!`;
      gameRestart();
    }
  }
  return myOutputValue;
};
