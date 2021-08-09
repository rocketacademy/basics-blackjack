var GM_NAME = "name";
var GM_DEAL = "deal";
var GM_PLAY = "play";
var GM_REVEAL = "reveal";
var NEW_GAME_MSG =
  "<br> Please input a new wager and click 'Submit' to start a new round!";
var HIT_STAND = "Would you like to hit or stand? (hit/stand)";

var userName = "";
var gameMode = GM_NAME;
var currentDeck = [];
var playerHand = [];
var comHand = [];
var showCards = false;
var comDone = false;
var sumPlayer = 0;
var playerPoints = 100;
var currentBet = 0;

var createNewDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    if (currentSuit == "hearts") {
      suitEmoji = "❤️";
    } else if (currentSuit == "diamonds") {
      suitEmoji = "♦️";
    } else if (currentSuit == "clubs") {
      suitEmoji = "♣️";
    } else if (currentSuit == "spades") {
      suitEmoji = "♠️";
    }

    var rankCounter = 1;
    while (rankCounter <= 13) {
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

      if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
        var cardRank = 10;
      } else if (rankCounter == 1) {
        cardRank = 11;
      } else {
        cardRank = rankCounter;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
        emoji: suitEmoji,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cards) {
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cards;
};

var printCards = function (array) {
  var i = 0;
  var msg = "";
  while (i < array.length) {
    var currentCard = array[i];
    msg += `${currentCard.name}${currentCard.emoji} `;
    i += 1;
  }
  return msg;
};

var printCardsHidden = function (array) {
  var msg = "";
  var currentCard = array[0];
  msg += `${currentCard.name}${currentCard.emoji} `;
  var i = 1;
  while (i < array.length) {
    msg += "❓";
    i += 1;
  }
  return msg;
};

var printHands = function () {
  var msg = `${userName}'s hand: ${printCards(playerHand)} <br>`;
  if (showCards == false) {
    msg += `
 Computer's hand: ${printCardsHidden(comHand)}`;
  } else {
    msg += `Computer's hand: ${printCards(comHand)}`;
  }
  return msg;
};

var getSum = function (array) {
  var sum = 0;
  var i = 0;
  while (i < array.length) {
    var currentRank = array[i].rank;
    sum += currentRank;
    i += 1;
  }
  return sum;
};

var playComTurn = function () {
  var msg = `Computer stands.`;
  if (getSum(comHand) < 17) {
    var i = 0;
    while (getSum(comHand) < 17) {
      comHand.push(currentDeck.shift());
      i += 1;
    }
    msg = `Computer drew ${i} card(s).`;
  }
  return msg;
};

var createNewGame = function () {
  currentDeck = [];
  playerHand = [];
  comHand = [];
  showCards = false;
  currentDeck = createNewDeck();
  shuffleCards(currentDeck);
  playerHand = currentDeck.splice(0, 2);
  comHand = currentDeck.splice(0, 2);
};

var checkAces = function (array) {
  var i = 0;
  var count = 0;
  while (i < array.length) {
    var currentCard = array[i];
    if (currentCard.name == "A") {
      count += 1;
    }
    i += 1;
  }
  return count;
};

var changeAces = function (sum, numAces) {
  var newSum = sum;
  var newAces = numAces;
  while (newSum > 21 && newAces > 0) {
    newSum -= 10;
    newAces -= 1;
  }
  return newSum;
};

var checkBusted = function (someone) {
  showCards = true;
  var msg = `<br><br> ${printHands()} <br><br> ${someone} busted! `;
  gameMode = GM_DEAL;
  return msg;
};

var countPointsTie = function () {
  playerPoints += Number(currentBet);
  myOutputValue += `You now have ${playerPoints} points.`;
  currentBet = 0;
  myOutputValue += NEW_GAME_MSG;
  gameMode = GM_DEAL;
};

var countPointsWin = function (multiplier) {
  playerPoints += Number(currentBet);
  playerPoints += Number(currentBet) * multiplier;
  myOutputValue += `You now have ${playerPoints} points.`;
  currentBet = 0;
  myOutputValue += NEW_GAME_MSG;
  gameMode = GM_DEAL;
};

var countPointsLose = function (multiplier) {
  playerPoints -= Number(currentBet) * (multiplier - 1);
  currentBet = 0;
  if (playerPoints > 0) {
    myOutputValue += `You now have ${playerPoints} points.`;
    myOutputValue += NEW_GAME_MSG;
    gameMode = GM_DEAL;
  } else {
    myOutputValue +=
      "You have no points remaining. <br> Please click 'Submit' to start a new game!";
    playerPoints = 100;
    gameMode = GM_NAME;
  }
};

var main = function (input) {
  if (gameMode == GM_NAME) {
    if (userName == "" && input == "") {
      myOutputValue = "⚠️ Please enter your name before starting! ⚠️";
    } else {
      if (userName == "") {
        userName = input;
      }
      myOutputValue = `Welcome ${userName}! <br> Please input your wager 💰 <br> You currently have ${playerPoints} points.`;
      gameMode = GM_DEAL;
    }
  } else if (gameMode == GM_DEAL) {
    if (input == "" || isNaN(input) || input == 0 || input > playerPoints) {
      myOutputValue = `⚠️ Please enter a valid number for your wager! ⚠️ <br> <br> You currently have ${playerPoints} points.`;
      return myOutputValue;
    }
    currentBet = input;
    playerPoints -= currentBet;
    myOutputValue = `[ Wager: ${currentBet} // Points remaining: ${playerPoints} ] <br><br>`;
    createNewGame();
    myOutputValue += "Cards dealt.";
    // check for blackjacks
    if (getSum(playerHand) == 21 || getSum(comHand) == 21) {
      showCards = true;
      myOutputValue += `<br><br> ${printHands()} <br><br> `;
      if (getSum(playerHand) == getSum(comHand)) {
        myOutputValue += "Both you and computer blackjack! It's a tie! ";
        countPointsTie();
      } else if (getSum(playerHand) == 21) {
        myOutputValue += "Blackjack! ";
        countPointsWin(2);
      } else if (getSum(comHand) == 21) {
        myOutputValue += "Computer blackjack! ";
        countPointsLose(2);
      }
    } else {
      myOutputValue += `<br><br> ${printHands()} <br><br> ${HIT_STAND}`;
      gameMode = GM_PLAY;
    }
  } else if (gameMode == GM_PLAY) {
    if (input != "hit" && input != "stand") {
      myOutputValue = `⚠️ Invalid input! Please input 'hit' or 'stand' only. ⚠️ <br><br> ${printHands()} <br><br> ${HIT_STAND}`;
    } else if (input == "hit") {
      playerHand.push(currentDeck.shift());
      myOutputValue = `[ Wager: ${currentBet} // Points remaining: ${playerPoints} ] <br><br>`;
      myOutputValue += `You drew a card. `;
      // variable ace value
      sumPlayer = changeAces(getSum(playerHand), checkAces(playerHand));
      // check for player bust
      if (sumPlayer > 21) {
        myOutputValue += checkBusted("You");
        countPointsLose(1);
      } else {
        myOutputValue += `<br><br> ${printHands()} <br><br> ${HIT_STAND}`;
      }
    } else if (input == "stand") {
      myOutputValue = `[ Wager: ${currentBet} // Points remaining: ${playerPoints} ] <br><br>`;
      myOutputValue += `You stand. `;
      myOutputValue += playComTurn();
      // variable ace value
      sumPlayer = changeAces(getSum(playerHand), checkAces(playerHand));
      var sumCom = changeAces(getSum(comHand), checkAces(comHand));
      // check for computer bust
      if (sumCom > 21) {
        myOutputValue += checkBusted("Computer");
        countPointsWin(1);
        return myOutputValue;
      }
      // check who wins
      showCards = true;
      myOutputValue += `<br><br> ${printHands()} <br><br>`;
      if (sumPlayer == sumCom) {
        myOutputValue += "It's a draw! ";
        countPointsTie();
      } else if (sumPlayer > sumCom) {
        myOutputValue += "Congratulations you win! ";
        countPointsWin(1);
      } else {
        myOutputValue += "Meh you lose! ";
        countPointsLose(1);
      }
    }
  }
  return myOutputValue;
};

// instructions
// multiplayer
// split

// refactor myoutput value
