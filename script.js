var deck = [];
var currentRoundScores = [];
var activePlayer = 1; // player 0 is computer
var handsArray = []; // will initialize into a nested array
var numberOfPlayers = 1; // dealer computer is not a player, per se
var gameOver = false;
var playerActionLock = false;
var fullResponseMessage = "";
// at round start, every player is given 2 cards (dealer's 2nd is face down)
// hit: draw another card
// stand: no more cards
// bust: total hand score exceeds 21, dealer gets your bet
// 21: insta-win, take 1.5x your bet from the dealer
// if dealer busts, every remaining player wins twice their bet
// if dealer has 17 or higher, every player with a score greater wins twice their bet. all other players lose their bet.

const cardNameMap = {
  1: "Ace",
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: "Jack",
  12: "Queen",
  13: "King",
};

const cardScoreValueMap = {
  1: 11, // can be 1 or 11, defaults to 11 before user input
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 10,
  12: 10,
  13: 10,
};

const cardRankEmojiMap = {
  1: "🅰",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",
  10: "🔟",
  11: "👑👶",
  12: "👑👩",
  13: "👑👨",
};

const cardSuitEmojiMap = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const refreshMessage = "Please refresh the page to play again.";
const hitStandMessage = "<br><br>To continue, please type 'hit' or 'stand'.";

var initializeHandsArray = function (numberOfPlayers) {
  handsArray = [];
  for (var i = 0; i <= numberOfPlayers; i += 1) {
    handsArray.push([]); // create new nested array for every player
  }
  return handsArray;
};

var readEmojiFromCard = function (cardObject) {
  // takes a card, reads emoji keys, and combines into a string
  var cardSummary = `${cardObject.cardRankEmoji} ${cardObject.cardSuitEmoji}`;
  // console.log(cardSummary);
  return cardSummary;
};

var createEmojiHandSummary = function (arr) {
  // the array input must be a subarrray of hands array
  var summaryMessage = "";
  for (let cardIndex = 0; cardIndex < arr.length; cardIndex += 1) {
    summaryMessage += readEmojiFromCard(arr[cardIndex]) + " | ";
  }
  return summaryMessage;
};

var sendDefaultSummaryMessage = function () {
  return `Computer has Drawn: <br>${createEmojiHandSummary(
    handsArray[0]
  )} with score ${calculateHandValue(
    0
  )}<br><br> Player has Drawn: <br>${createEmojiHandSummary(
    handsArray[1]
  )} with score ${calculateHandValue(1)}`;
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = cardNameMap[rankCounter];
      var cardSuitEmoji = cardSuitEmojiMap[suits[suitIndex]];
      var cardRankEmoji = cardRankEmojiMap[rankCounter];
      var cardScoreValue = cardScoreValueMap[rankCounter];

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardSuitEmoji: cardSuitEmoji,
        cardRankEmoji: cardRankEmoji,
        scoreValue: cardScoreValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var shuffleArray = function (array) {
  // based on Durstenfeld shuffle
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (var i = array.length - 1; i > 0; i -= 1) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var drawCardIntoHand = function (activePlayer) {
  var drawnCard = deck.pop();
  handsArray[activePlayer].push(drawnCard);
  return;
};

var initialDraw = function (numberOfPlayers) {
  for (let i = numberOfPlayers; i !== -1; i -= 1) {
    drawCardIntoHand(i);
    drawCardIntoHand(i);
  }
};

var initializeGame = function () {
  currentRoundScores = [];
  initializeHandsArray(numberOfPlayers);
  deck = shuffleArray(makeDeck());
  initialDraw(numberOfPlayers);
  calculateHandValue(0);
  calculateHandValue(1);
  return;
};

// var getDealerFaceUpCard = function () {
//   return handsArray[0][0];
// };

var calculateHandValue = function (actPlyr) {
  var currentPlayerHand = handsArray[actPlyr];
  var totalHandScoreValue = 0;
  var acesHeld = 0;
  var currentCard;
  var currentScoreValue;
  for (
    let cardIndex = 0;
    cardIndex < currentPlayerHand.length;
    cardIndex += 1
  ) {
    currentCard = handsArray[actPlyr][cardIndex];
    if (currentCard.name == "Ace") {
      acesHeld += 1;
    }
    currentScoreValue = currentCard.scoreValue;
    totalHandScoreValue += currentScoreValue;
  }
  if (totalHandScoreValue > 21 && acesHeld != 0) {
    // if the player might bust but still has aces
    var aceIncrementer = 0;
    while (aceIncrementer < acesHeld) {
      // manually convert ace score from 11 to 1
      totalHandScoreValue -= 10;
      if (totalHandScoreValue <= 21) {
        break;
      }
      aceIncrementer += 1;
    }
  }
  // this updates currentRoundScores global variable!!!
  currentRoundScores[actPlyr] = totalHandScoreValue;
  return totalHandScoreValue;
};

var isBlackjack = function (playerNumber) {
  if (
    calculateHandValue(playerNumber) == 21 &&
    handsArray[playerNumber].length == 2
  ) {
    // only applies to blackjack in the initial draw
    return true;
  }
  return false;
};

var checkPlayersforBlackjack = function () {
  if (isBlackjack(0)) {
    gameOver = true;
    fullResponseMessage += `Computer insta-wins by Blackjack. ${refreshMessage}<br><br>`;
  } else if (isBlackjack(1)) {
    gameOver = true;
    fullResponseMessage += `Player insta-wins by Blackjack. ${refreshMessage}<br><br>`;
  }
  // no action if neither player nor dealer have a 21
};

var givePlayerHitStandHints = function () {
  var plyrScore = currentRoundScores[1];
  if (isBlackjack(0) || isBlackjack(1)) {
    return;
  } else if (plyrScore < 14) {
    fullResponseMessage += "<br>You need to hit, by the way. <br><br>";
    return;
  } else if (plyrScore > 18) {
    fullResponseMessage +=
      "<br>You should probably stand. Don't want to bust, do we? <br><br>";
    return;
  }
  fullResponseMessage +=
    "<br>Well, do you feel lucky? Either a hit or a stand would work for you.<br><br>";
};

var sendFullResponseMessage = function () {
  fullResponseMessage += `${sendDefaultSummaryMessage()}`;
  if (!gameOver) {
    fullResponseMessage += `${hitStandMessage}`;
  }
  return fullResponseMessage;
};

var checkBust = function (plyrNum) {
  if (calculateHandValue(plyrNum) > 21) {
    gameOver = true;
    return true;
  }
  return false;
};

var dealerHitStand = function () {
  var dealer = 0;
  var dealerScore = currentRoundScores[0];
  while (dealerScore < 17) {
    drawCardIntoHand(dealer);
    fullResponseMessage += `Dealer drew a ${readEmojiFromCard(
      handsArray[0][handsArray[0].length - 1]
    )}!<br>`;
    if (checkBust(dealer) == true) {
      fullResponseMessage += "Looks like the dealer busted! ";
      gameOver = true;
      break;
    }
    if (calculateHandValue(dealer) >= 17) {
      break;
    }
  }
  return;
};

var comparePlayerandDealerScores = function (scoreArr) {
  // this part is designed for 1 human player
  // this is for initial hands, so neither player will bust
  var dealerScore = scoreArr[0];
  var playerScore = scoreArr[1];
  // console.log(dealerScore, playerScore);
  if (isBlackjack(0) || isBlackjack(1)) {
    return;
  } else if (dealerScore > playerScore) {
    fullResponseMessage += "Dealer is closer to 21.";
    return;
  } else if (dealerScore < playerScore) {
    fullResponseMessage += "Player is closer to 21.";
    return; // empty returns because i don't want to have another conditional for the scenario where scores are equal
  }
  fullResponseMessage += "Looks like a draw.";
};

var chooseWinner = function () {
  // this function assumes neither dealer not player busted
  var win;
  if (checkBust(0) == true || checkBust(1) == true) {
    if (checkBust(0) == true) {
      win = "Player"; // since dealer busted
    } else if (checkBust(1) == true) {
      win = "Dealer";
    }
    return win;
  }
  if (currentRoundScores[0] > currentRoundScores[1]) {
    win = "Dealer";
  } else if (currentRoundScores[0] < currentRoundScores[1]) {
    win = "Player";
  } else if (currentRoundScores[0] == currentRoundScores[1]) {
    win = "Nobody";
  }
  return win;
};

var main = function (input) {
  fullResponseMessage = "";
  if (gameOver) {
    return `${refreshMessage}`;
  }
  if (handsArray.length == 0) {
    initializeGame();
    checkPlayersforBlackjack();
    comparePlayerandDealerScores(currentRoundScores);
    givePlayerHitStandHints();
    return sendFullResponseMessage();
  }
  if (!playerActionLock) {
    if (input == "hit") {
      drawCardIntoHand(activePlayer);
      fullResponseMessage += `You drew a ${readEmojiFromCard(
        handsArray[1][handsArray.length]
      )}!<br>`;
      if (checkBust(1) == true) {
        return `You've busted! Dealer Wins.<br><br>${sendDefaultSummaryMessage()} <br><br>${refreshMessage}`;
      }
      givePlayerHitStandHints();
      return `${sendFullResponseMessage()}`;
    } else if (input == "stand") {
      playerActionLock = true;
      dealerHitStand();
      var winner = chooseWinner();
      gameOver = true;
      fullResponseMessage += `${winner} wins this round! <br><br>${sendDefaultSummaryMessage()} <br><br>${refreshMessage}`;
      return fullResponseMessage;
    }
  }
};
