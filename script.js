// ---------------- GLOBAL VARIABLES ----------------//

var GM_NAME = "name";
var GM_DEAL = "deal";
var GM_PLAY = "play";
var GM_REVEAL = "reveal";
var NEW_ROUND_MSG =
  "<br> <br> Please input the wagers for each player (separated by a space) and click 'Submit' to start a new round!";
var HIT_STAND = "would you like to hit or stand? (hit/stand)";
var STATUS_BUST = "*BUST*";
var STATUS_STAND = "*STAND*";
var STATUS_BJ = "*BLACKJACK*";

var gameMode = GM_NAME;
var currentDeck = [];
var comHand = [];
var showCards = false;
var players = [];
var namesArray = [];
var currentPlayer = -1;

// ---------------- HELPER FUNCTIONS ----------------//

// ======== CARDS RELATED ==========//

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

// ======== OUTPUT RELATED ==========//

var printPlayers = function (details) {
  var i = 0;
  var msg = "";
  while (i < players.length) {
    var num = i + 1;
    if (details == "points") {
      msg += `${num}) ${players[i].name} - Points left: ${players[i].points} <br>`;
    } else if (details == "wagers") {
      msg += `${num}) ${players[i].name} - Wager: ${players[i].wager} - Points left: ${players[i].points}<br>`;
    }

    i += 1;
  }
  return msg;
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
  var i = 0;
  var msg = "";
  while (i < players.length) {
    msg += `${players[i].name}'s hand: ${printCards(players[i].hand)} ${
      players[i].status
    } <br>`;
    i += 1;
  }
  if (showCards == false) {
    msg += `
 Computer's hand: ${printCardsHidden(comHand)}`;
  } else {
    msg += `Computer's hand: ${printCards(comHand)}`;
  }
  return msg;
};

// ======== LOGIC RELATED ==========//

var addPlayers = function (array) {
  var i = 0;
  var playersArray = [];
  while (i < array.length) {
    var currentObj = { name: array[i], points: 100, status: "", inRound: true };
    playersArray.push(currentObj);
    i += 1;
  }
  return playersArray;
};

var createNewGame = function () {
  currentPlayer = -1;
  currentDeck = [];
  comHand = [];
  showCards = false;
  currentDeck = createNewDeck();
  shuffleCards(currentDeck);
  var i = 0;
  while (i < players.length) {
    players[i].hand = currentDeck.splice(0, 2);
    players[i].status = "";
    players[i].inRound = true;
    i += 1;
  }
  comHand = currentDeck.splice(0, 2);
};

var checkPlayerBJ = function () {
  var bjIndex = 0;
  while (bjIndex < players.length) {
    if (getSum(players[bjIndex].hand) == 21) {
      players[bjIndex].status = STATUS_BJ;
      players[bjIndex].inRound = false;
    }
    bjIndex += 1;
  }
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

var payoutBJ = function () {
  var PlayerBJIndex = 0;
  while (PlayerBJIndex < players.length) {
    if (players[PlayerBJIndex].status == STATUS_BJ) {
      countPointsWinBJ(PlayerBJIndex);
    }
    PlayerBJIndex += 1;
  }
};

var getNextPlayer = function () {
  var index = 0;
  while (players[index].inRound == false) {
    index += 1;
    if (index >= players.length) {
      break;
    }
  }
  return index;
};

var endPlayersTurn = function () {
  gameMode = GM_REVEAL;
  myOutputValue += `<br><br> ${printHands()} <br><br> Click 'Submit' to reveal Computer's hand!`;
  myOutputValue += `<br><br> 📊 Tally: <br> ${printPlayers("wagers")}`;
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

var playComTurn = function () {
  var msg = `Computer stands.`;
  if (changeAces(getSum(comHand), checkAces(comHand)) < 17) {
    var i = 0;
    while (changeAces(getSum(comHand), checkAces(comHand)) < 17) {
      comHand.push(currentDeck.shift());
      i += 1;
    }
    msg = `Computer drew ${i} card(s).`;
  }
  return msg;
};

var payoutEnd = function () {
  var sum = changeAces(getSum(comHand), checkAces(comHand));
  var payoutIndex = 0;
  while (payoutIndex < players.length) {
    if (sum > 21) {
      if (players[payoutIndex].status == STATUS_BUST) {
        countPointsTie(payoutIndex);
      } else if (players[payoutIndex].status == STATUS_STAND) {
        countPointsWin(payoutIndex);
      }
    } else {
      if (players[payoutIndex].status == STATUS_BUST) {
        countPointsLose(payoutIndex);
      } else if (players[payoutIndex].status == STATUS_STAND) {
        if (players[payoutIndex].sum > sum) {
          countPointsWin(payoutIndex);
        } else if (players[payoutIndex].sum == sum) {
          countPointsTie(payoutIndex);
        } else {
          countPointsLose(payoutIndex);
        }
      }
    }
    payoutIndex += 1;
  }
};

var removePlayers = function () {
  var i = 0;
  var msg = "";
  while (i < players.length) {
    if (players[i].points <= 0) {
      var removedPlayer = players.splice(i, 1);
      msg += `<br> ${removedPlayer[0].name} will be disqualified.`;
      i -= 1;
    }
    i += 1;
  }
  return msg;
};

// ======== POINTS RELATED ==========//

var countPointsTie = function (i) {
  players[i].points += Number(players[i].wager);
  players[i].wager = 0;
};

var countPointsWin = function (i) {
  players[i].points += Number(players[i].wager);
  players[i].points += Number(players[i].wager);
  players[i].wager = 0;
};

var countPointsLose = function (i) {
  players[i].wager = 0;
};

var countPointsWinBJ = function (i) {
  players[i].points += Number(players[i].wager);
  players[i].points += Number(players[i].wager) * 2;
  players[i].wager = 0;
};

var countPointsLoseBJ = function (i) {
  players[i].points -= Number(players[i].wager);
  players[i].wager = 0;
};

// ---------------- MAIN ----------------//

var main = function (input) {
  if (gameMode == GM_NAME) {
    // ###################### GAME MODE NAME (INPUT NAME) ###########################
    if (namesArray.length < 1 && input == "") {
      myOutputValue = "⚠️ Please enter at least 1 name before starting! ⚠️";
    } else {
      if (input != "") {
        namesArray = input.split(" ");
      }
      players = addPlayers(namesArray);
      myOutputValue = `Welcome! <br><br> 📊 Tally: <br> ${printPlayers(
        "points"
      )}`;
      myOutputValue += NEW_ROUND_MSG;
      gameMode = GM_DEAL;
    }
  } else if (gameMode == GM_DEAL) {
    // ############## GAME MODE DEAL (INPUT WAGER, DEAL CARDS, CHECK BJ) ###################
    // ========== wagers ==========
    var wagersArray = input.split(" ");
    if (input == "" || wagersArray.length != players.length) {
      myOutputValue = `⚠️ Please input the wagers for each player separated by a space! ⚠️ <br><br> 📊 Tally: <br> ${printPlayers(
        "points"
      )}`;
      return myOutputValue;
    }
    var wagerIndex = 0;
    while (wagerIndex < wagersArray.length) {
      if (
        isNaN(wagersArray[wagerIndex]) ||
        wagersArray[wagerIndex] == 0 ||
        wagersArray[wagerIndex] > players[wagerIndex].points
      ) {
        myOutputValue = `⚠️ Please enter a valid wager for each player! ⚠️ <br><br> 📊 Tally: <br> ${printPlayers(
          "points"
        )}`;
        return myOutputValue;
      } else {
        players[wagerIndex].wager = Number(wagersArray[wagerIndex]);
        players[wagerIndex].points -= players[wagerIndex].wager;
      }
      wagerIndex += 1;
    }
    // ========== deal cards ==========
    createNewGame();
    myOutputValue = "Cards dealt.";
    checkPlayerBJ();
    // ========== check for COMPUTER blackjacks ==========
    if (getSum(comHand) == 21) {
      showCards = true;
      myOutputValue += `<br><br> ${printHands()} <br><br> Computer blackjack! `;
      var ComBJIndex = 0;
      while (ComBJIndex < players.length) {
        if (players[ComBJIndex].status != STATUS_BJ) {
          countPointsLoseBJ(ComBJIndex);
        } else {
          countPointsTie(ComBJIndex);
        }
        ComBJIndex += 1;
      }
      myOutputValue += NEW_ROUND_MSG;
      myOutputValue += `<br><br> 📊 Tally: <br> ${printPlayers("points")}`;
    } else {
      // ========== payout for player blackjack ==========
      payoutBJ();
      // ========== start hit/stand cycle ==========
      currentPlayer = getNextPlayer();
      if (currentPlayer >= players.length) {
        endPlayersTurn();
        return myOutputValue;
      }
      myOutputValue += `<br><br> ${printHands()} <br><br> ${
        players[currentPlayer].name
      }, ${HIT_STAND}`;
      gameMode = GM_PLAY;
      myOutputValue += `<br><br> 📊 Tally: <br> ${printPlayers("wagers")}`;
    }
  } else if (gameMode == GM_PLAY) {
    // ###################### GAME MODE NAME (HIT OR STAND) ###########################
    if (input != "hit" && input != "stand") {
      myOutputValue = `⚠️ Invalid input! Please input 'hit' or 'stand' only. ⚠️ <br><br> ${printHands()} <br><br> ${
        players[currentPlayer].name
      }, ${HIT_STAND}`;
      myOutputValue += `<br><br> 📊 Tally: <br> ${printPlayers("wagers")}`;
    } else {
      if (input == "hit") {
        // =========================== hit ==========================
        players[currentPlayer].hand.push(currentDeck.shift());
        myOutputValue = `${players[currentPlayer].name} drew a card. `;
        // ========== variable ace value ==========
        players[currentPlayer].sum = changeAces(
          getSum(players[currentPlayer].hand),
          checkAces(players[currentPlayer].hand)
        );
        // ========== check for PLAYER bust ==========
        if (players[currentPlayer].sum > 21) {
          players[currentPlayer].status = STATUS_BUST;
          players[currentPlayer].inRound = false;
          // move to next player
          currentPlayer = getNextPlayer();
          if (currentPlayer >= players.length) {
            endPlayersTurn();
            return myOutputValue;
          }
        }
        myOutputValue += `<br><br> ${printHands()} <br><br> ${
          players[currentPlayer].name
        }, ${HIT_STAND}`;
        myOutputValue += `<br><br> 📊 Tally: <br> ${printPlayers("wagers")}`;
      } else if (input == "stand") {
        // =========================== stand ============================
        myOutputValue = `${players[currentPlayer].name} chose to stand. `;
        players[currentPlayer].sum = changeAces(
          getSum(players[currentPlayer].hand),
          checkAces(players[currentPlayer].hand)
        );
        players[currentPlayer].status = STATUS_STAND;
        players[currentPlayer].inRound = false;
        // move to next player
        currentPlayer = getNextPlayer();
        if (currentPlayer >= players.length) {
          endPlayersTurn();
          return myOutputValue;
        }
        myOutputValue += `<br><br> ${printHands()} <br><br> ${
          players[currentPlayer].name
        }, ${HIT_STAND}`;
        myOutputValue += `<br><br> 📊 Tally: <br> ${printPlayers("wagers")}`;
      }
    }
  } else if (gameMode == GM_REVEAL) {
    // ###################### GAME MODE REVEAL ###########################
    // ========== COMPUTER'S TURN ==========
    myOutputValue = playComTurn();
    showCards = true;
    myOutputValue += `<br><br> ${printHands()} <br><br>`;
    var sumCom = changeAces(getSum(comHand), checkAces(comHand));
    payoutEnd();
    if (sumCom > 21) {
      myOutputValue += "Computer busted! All surviving players wins!";
    } else if (sumCom == 21) {
      myOutputValue += "All players smaller than 21 loses!";
    } else {
      myOutputValue += `All players larger than ${sumCom} wins!`;
    }
    myOutputValue += `<br><br> 📊 Tally: <br> ${printPlayers("points")}`;
    myOutputValue += removePlayers();
    if (players.length < 1) {
      myOutputValue +=
        "<br><br> All players have been disqualified! Please click 'Submit' for a new game!";
      gameMode = GM_NAME;
    } else {
      myOutputValue += NEW_ROUND_MSG;
      gameMode = GM_DEAL;
    }
  }
  return myOutputValue;
};
