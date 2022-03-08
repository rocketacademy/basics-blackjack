//gamemode: deal, hit or stand, show result, end game
var gamemode = "deal cards";
var cardDeck = [];
var computerCardsDeck = [];
var playerCardsDeck = [];
var computerScore = 0;
var playerScore = 0;

var makeDeck = function () {
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  for (let s = 0; s < suits.length; s++) {
    var currentSuit = suits[s];
    for (let r = 1; r <= 13; r++) {
      var cardRank = r;
      var cardName = cardRank;
      if (r == 1) {
        cardName = "ace";
        cardRank = 11;
      } else if (r == 11) {
        cardName = "jack";
        cardRank = 10;
      } else if (r == 12) {
        cardName = "queen";
        cardRank = 10;
      } else if (r == 13) {
        cardName = "king";
        cardRank = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };
      cardDeck.push(card);
    }
  }
  return;
};

var shuffleCards = function () {
  for (let i = 0; i < cardDeck.length; i++) {
    var randomIndex = Math.floor(Math.random() * cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[i];
    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return;
};

var drawCards = function (arr, numOfCards) {
  for (let i = 0; i < numOfCards; i++) {
    var card = cardDeck.pop();
    arr.push(card);
  }
  return;
};

var calcScore = function (arr) {
  var score = 0;
  var numOfAce = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === "ace") {
      numOfAce += 1;
    }
    score += arr[i].rank;
  }
  for (let i = 0; i < numOfAce; i++) {
    if (score > 21) {
      score -= 10;
    }
  }
  return score;
};

var dealCards = function () {
  makeDeck();
  shuffleCards();
  drawCards(computerCardsDeck, 2);
  drawCards(playerCardsDeck, 2);
  return;
};

var computerHitOrStand = function () {
  if (computerScore <= 16) {
    return true;
  } else {
    return false;
  }
};

var playerHitOrStand = function () {
  if (playerScore < 14) {
    return "hit";
  } else if (playerScore > 17) {
    return "stand";
  }
};

var isBust = function (score) {
  if (score > 21) {
    return true;
  }
};

var isBlackjack = function (score) {
  if (score == 21) {
    return true;
  }
};

var cardsOutput = function () {
  var playerCardsOutput = "<br>Player has drawn:<br>";
  var computerCardsOutput = "<br>Dealer has drawn:<br>";
  for (let i = 0; i < playerCardsDeck.length; i++) {
    playerCardsOutput += `${i + 1}) ${playerCardsDeck[i].name} of ${
      playerCardsDeck[i].suit
    }<br>`;
  }
  if (gamemode === "show result") {
    for (let i = 0; i < computerCardsDeck.length; i++) {
      computerCardsOutput += `${i + 1}) ${computerCardsDeck[i].name} of ${
        computerCardsDeck[i].suit
      }<br>`;
    }
  } else {
    computerCardsOutput += `1) ${computerCardsDeck[0].name} of ${computerCardsDeck[0].suit}<br>`;
  }
  var output = playerCardsOutput + computerCardsOutput;
  return output;
};

var getWinner = function () {
  if (playerScore > computerScore) {
    return "win";
  } else if (playerScore < computerScore) {
    return "lose";
  } else {
    return "tie";
  }
};

var inputValidation = function (input) {
  var lowercase = input.toLowerCase();
  if (lowercase === "hit" || lowercase === "stand") {
    return true;
  }
};
var main = function (input) {
  var myOutputValue;
  var firstLine = "";
  var lastLine = "<br>Please enter 'hit' or 'stand' to continue";
  //gamemode
  if (gamemode === "deal cards") {
    dealCards();
    gamemode = "hit or stand";
  } else if (gamemode === "hit or stand") {
    if (!inputValidation(input)) {
      return "Please enter 'hit' or 'stand' to continue.";
    }
    if (computerHitOrStand()) {
      drawCards(computerCardsDeck, 1);
    }
    if (input == "hit") {
      drawCards(playerCardsDeck, 1);
    } else if (input == "stand") {
      gamemode = "show result";
    }
  }
  //calculate score
  computerScore = calcScore(computerCardsDeck);
  playerScore = calcScore(playerCardsDeck);
  if (gamemode === "end game") {
    console.log("end");
    return "Refresh to play again.";
  }
  //check if bust or blackjack
  if (isBust(playerScore) || isBust(computerScore)) {
    if (isBust(playerScore) && isBust(computerScore)) {
      firstLine = "Both of you bust! It's a tie.<br>";
    } else if (isBust(playerScore)) {
      firstLine = "You bust! Dealer wins.<br>";
    } else {
      firstLine = "Dealer busts. You win!<br>";
    }
    gamemode = "show result";
  } else if (isBlackjack(playerScore) || isBlackjack(computerScore)) {
    if (isBlackjack(playerScore) && isBlackjack(computerScore)) {
      firstLine = "Both of you hit blackjack! It's a tie.<br>";
    } else if (isBlackjack(playerScore)) {
      firstLine = "You hit blackjack. You win!<br>";
    } else {
      firstLine = "Dealer hits blackjack. You lose!<br>";
    }
    gamemode = "show result";
  } else if (gamemode === "show result") {
    var result = getWinner();
    if (result === "win") {
      firstLine = "You win!";
    } else if (result === "lose") {
      firstLine = "You lose!";
    } else {
      firstLine = "Oops, it's a tie.";
    }
  }
  var cardLine = cardsOutput();

  //update display

  if (gamemode === "show result") {
    console.log("result");
    firstLine += `<br>Your total is ${playerScore}. Dealer total is ${computerScore}.<br>`;
    lastLine = "<br>Refresh to play again.";
    gamemode = "end game";
  } else if (gamemode === "deal cards" || gamemode === "hit or stand") {
    console.log("play");
    firstLine = `Your current total is ${playerScore}. `;
    if (playerHitOrStand() === "hit") {
      firstLine += "You should hit.<br>";
    } else if (playerHitOrStand() === "stand") {
      firstLine += "You should stand.<br>";
    } else {
      firstLine += "Hmmm, tricky!<br>";
    }
  }
  console.log("computerScore", computerScore);
  console.log("playerScore", playerScore);
  console.log(gamemode);
  myOutputValue = firstLine + cardLine + lastLine;
  return myOutputValue;
};
