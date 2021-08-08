var GM_DEAL = "deal";
var GM_PLAY = "play";
var GM_REVEAL = "reveal";
var NEW_GAME_MSG = "Click 'Submit' to start a new game!";
var HIT_STAND = "Would you like to hit or stand? (hit/stand)";

var gameMode = GM_DEAL;
var currentDeck = [];
var playerHand = [];
var comHand = [];
var showCards = false;
var comDone = false;
var sumPlayer = 0;

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
  if (showCards == false) {
    var msg = `Your hand: ${printCards(
      playerHand
    )} <br> Dealer's hand: ${printCardsHidden(comHand)}`;
  } else {
    var msg = `Your hand: ${printCards(
      playerHand
    )} <br> Dealer's hand: ${printCards(comHand)}`;
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
  showCards = true;
  var msg = `Computer stands.`;
  if (getSum(comHand) < 17) {
    var i = 0;
    while (getSum(comHand) < 17) {
      comHand.push(currentDeck.shift());
      i += 1;
    }
    msg = `Computer drew ${i} card(s).`;
  }
  msg += `<br><br> ${printHands()} <br><br>`;
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

var main = function (input) {
  if (gameMode == GM_DEAL) {
    createNewGame();
    myOutputValue = "Cards dealt.";
    console.log(`Computer sum: ${getSum(comHand)}`);
    // check for blackjacks
    if (getSum(playerHand) == 21 || getSum(comHand) == 21) {
      showCards = true;
      myOutputValue += `<br><br> ${printHands()} <br><br> `;
      if (getSum(playerHand) == getSum(comHand)) {
        myOutputValue += "Both you and computer blackjack! It's a tie! ";
      } else if (getSum(playerHand) == 21) {
        myOutputValue += "Blackjack! ";
      } else if (getSum(comHand) == 21) {
        myOutputValue += "Computer blackjack! ";
      }
      myOutputValue += NEW_GAME_MSG;
      return myOutputValue;
    } else {
      myOutputValue += `<br><br> ${printHands()} <br><br> ${HIT_STAND}`;
      gameMode = GM_PLAY;
    }
  } else if (gameMode == GM_PLAY) {
    if (input != "hit" && input != "stand") {
      myOutputValue = `⚠️ Invalid input! Please input 'hit' or 'stand' only. ⚠️ <br><br> ${printHands()} <br><br> ${HIT_STAND}`;
    } else if (input == "hit") {
      playerHand.push(currentDeck.shift());
      myOutputValue = `You drew a card. `;
      // variable ace value
      sumPlayer = changeAces(getSum(playerHand), checkAces(playerHand));
      // check for player bust
      if (sumPlayer > 21) {
        showCards = true;
        myOutputValue += `<br><br> ${printHands()} <br><br> You busted! ${NEW_GAME_MSG}`;
        gameMode = GM_DEAL;
      } else {
        myOutputValue += `<br><br> ${printHands()} <br><br> ${HIT_STAND}`;
      }
    } else if (input == "stand") {
      myOutputValue = "You stand. ";
      myOutputValue += playComTurn();
      // variable ace value
      var sumCom = changeAces(getSum(comHand), checkAces(comHand));
      // check for computer bust
      if (sumCom > 21) {
        myOutputValue += `Computer busted! ${NEW_GAME_MSG}`;
        gameMode = GM_DEAL;
        return myOutputValue;
      }
      // check who wins
      if (sumPlayer == sumCom) {
        myOutputValue += "It's a draw! ";
      } else if (sumPlayer > sumCom) {
        myOutputValue += "Congratulations you win! ";
      } else {
        myOutputValue += "Meh you lose! ";
      }
      myOutputValue += NEW_GAME_MSG;
      gameMode = GM_DEAL;
    }
  }
  return myOutputValue;
};
