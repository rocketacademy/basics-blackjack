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
        cardRank = 10;
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
  var msg = "Computer stands.";
  if (getSum(comHand) <= 17) {
    comHand.push(currentDeck.shift());
    msg = "Computer has drawn a card.";
    if (getSum(comHand) > 21) {
      showCards = true;
      msg += `<br><br> ${printHands()} <br><br> Computer busted! Click 'Submit' to start a new game!`;
      gameMode = GM_DEAL;
      return msg;
    }
  }
  console.log(`Computer sum: ${getSum(comHand)}`);
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

var GM_DEAL = "deal";
var GM_PLAY = "play";
var GM_REVEAL = "reveal";

var gameMode = GM_DEAL;
var currentDeck = [];
var playerHand = [];
var comHand = [];
var showCards = false;

var main = function (input) {
  if (gameMode == GM_DEAL) {
    createNewGame();
    myOutputValue = `Cards dealt. <br><br> ${printHands()} <br><br> Would you like to hit or stand? (hit/stand)`;
    gameMode = GM_PLAY;
  } else if (gameMode == GM_PLAY) {
    if (input != "hit" && input != "stand") {
      myOutputValue = `⚠️ Invalid input! Please input 'hit' or 'stand' only. ⚠️`;
    } else if (input == "hit") {
      playerHand.push(currentDeck.shift());
      myOutputValue = "You have drawn a card. ";
      if (getSum(playerHand) > 21) {
        showCards = true;
        myOutputValue += `<br><br> ${printHands()} <br><br> You busted! Click 'Submit' to start a new game!`;
        gameMode = GM_DEAL;
        return myOutputValue;
      }
      myOutputValue += playComTurn();
      if (showCards == true) {
        return myOutputValue;
      }
    } else if (input == "stand") {
      myOutputValue = "You stand. ";
      // make auto stand
      var comTurn = playComTurn();
      myOutputValue += comTurn;
      if (showCards == true) {
        resetGame();
        return myOutputValue;
      } else if (comTurn == "Computer stands.") {
        myOutputValue += `<br><br> ${printHands()} <br><br> Click 'Submit' to reveal the cards!`;
        gameMode = GM_REVEAL;
        return myOutputValue;
      }
    }
    myOutputValue += `<br><br> ${printHands()} <br><br> Would you like to hit or stand? (hit/stand)`;
  } else if (gameMode == GM_REVEAL) {
    // calculate points
    showCards = true;
    myOutputValue = `${printHands()} <br><br> The end! <br> Click 'Submit' to start a new game!`;
    gameMode = GM_DEAL;
  }
  return myOutputValue;
};
