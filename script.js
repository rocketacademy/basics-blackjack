var allPlayerCard = [];
var currentPlayer = 0;
var numberOfPlayer = 0;
var shuffledDeck;
var gameMode = "A";
var numPlayers = document.querySelector("#num-player");
var reset = document.querySelector("#reset-button");

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];
  var subindex = 0;
  while (subindex < suits.length) {
    var currentSuit = suits[subindex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 1;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    subindex += 1;
  }
  return cardDeck;
};

var cardDeck = makeDeck();

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleDeck = function () {
  for (var i = 0; i < cardDeck.length; i += 1) {
    var currentCard = cardDeck[i];
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
};

var generatePlayerDecks = function () {
  numberOfPlayer = numPlayers.value;
  generatePlayers();
  shuffleDeck();
  shuffledDeck = cardDeck;
  for (var i = 0; i < allPlayerCard.length; i += 1) {
    currentPlayer = i;
    allPlayerCard[i].card[0] = shuffledDeck.pop();
    updateNumberOfAce();
    allPlayerCard[i].card[1] = shuffledDeck.pop();
    updateNumberOfAce();
  }
  currentPlayer = 0;
  numPlayers.disabled = true;
};

var updateNumberOfAce = function () {
  var playerNumberOfCards = allPlayerCard[currentPlayer].card.length;
  if (
    allPlayerCard[currentPlayer].card[playerNumberOfCards - 1].name == "ace"
  ) {
    allPlayerCard[currentPlayer].numberOfAce += 1;
  }
};

var checkIfBlackJack = function () {
  for (var i = 0; i < allPlayerCard.length; i += 1) {
    var firstCard = allPlayerCard[i].card[0];
    var secCard = allPlayerCard[i].card[1];
    if (firstCard.name == "ace" || secCard.name == "ace") {
      if (firstCard.value == 10 || secCard.value == 10) {
        allPlayerCard[i].blackJack = true;
      }
    }
  }
};

var checkInitialWinning = function () {
  checkIfBlackJack();
  var outputMsg = "";
  var dealerCard = allPlayerCard[allPlayerCard.length - 1];
  if (dealerCard.blackJack == true) {
    outputMsg += `Dealer got BlackJack! <br>`;
    for (var i = 0; i < allPlayerCard.length - 1; i += 1) {
      if (allPlayerCard[i].blackJack == true) {
        outputMsg += `${allPlayerCard[i].name} got BlackJack as well! <br>`;
      } else outputMsg += `${allPlayerCard[i].name} lost! <br>`;
    }
    hit.disabled = true;
    stay.disabled = true;
    reset.style.visibility = "visible";
  } else if (
    allPlayerCard.length == 2 &&
    allPlayerCard[currentPlayer].blackJack == true
  ) {
    outputMsg = `${allPlayerCard[currentPlayer].name} got BlackJack!`;
    hit.disabled = true;
    stay.disabled = true;
    reset.style.visibility = "visible";
  } else if (allPlayerCard[currentPlayer].blackJack == true) {
    outputMsg = `${allPlayerCard[currentPlayer].name} got BlackJack!`;
    currentPlayer += 1;
  }
  return outputMsg;
};

var updateCardTotal = function () {
  var playerCard = allPlayerCard[currentPlayer].card;
  var playerNumberOfAce = allPlayerCard[currentPlayer].numberOfAce;
  var playerNumberOfCards = allPlayerCard[currentPlayer].card.length;
  allPlayerCard[currentPlayer].cardTotal[0] = 0;
  allPlayerCard[currentPlayer].cardTotal[1] = 0;
  for (var i = 0; i < playerCard.length; i += 1) {
    allPlayerCard[currentPlayer].cardTotal[0] += playerCard[i].value;
    allPlayerCard[currentPlayer].cardTotal[1] += playerCard[i].value;
  }
  if (playerNumberOfAce == 1 && playerNumberOfCards == 2) {
    allPlayerCard[currentPlayer].cardTotal[1] += 10;
  }
  if (playerNumberOfAce == 1 && playerNumberOfCards == 3) {
    allPlayerCard[currentPlayer].cardTotal[1] += 9;
  }
  if (playerNumberOfAce == 2 && playerNumberOfCards == 3) {
    allPlayerCard[currentPlayer].cardTotal[1] += 9;
  }
};

var generatePlayers = function () {
  for (var i = 0; i < numberOfPlayer; i += 1) {
    allPlayerCard.push({
      name: `Player ${i + 1}`,
      bet: 0,
      card: [],
      blackJack: false,
      cardTotal: [],
      numberOfAce: 0,
    });
  }
  allPlayerCard.push({
    name: `Dealer`,
    bet: 0,
    card: [],
    blackJack: false,
    cardTotal: [],
    numberOfAce: 0,
  });
};

var checkDealerCard = function () {
  var playerNumberOfCards = allPlayerCard[currentPlayer].card.length;
  while (
    allPlayerCard[currentPlayer].cardTotal[0] < 17 &&
    allPlayerCard[currentPlayer].cardTotal[1] < 17
  ) {
    allPlayerCard[currentPlayer].card[playerNumberOfCards] = shuffledDeck.pop();
    updateCardTotal();
  }
};

var displayCardsDrawn = function () {
  var outputMsg = `${allPlayerCard[currentPlayer].name} have drawn <br>`;
  for (var i = 0; i < allPlayerCard[currentPlayer].card.length; i += 1) {
    outputMsg += `${allPlayerCard[currentPlayer].card[i].name} of ${allPlayerCard[currentPlayer].card[i].suit} <br>`;
  }
  if (
    allPlayerCard[currentPlayer].cardTotal[0] ==
    allPlayerCard[currentPlayer].cardTotal[1]
  ) {
    outputMsg += `The cards add up will be ${allPlayerCard[currentPlayer].cardTotal[0]}.`;
  } else
    outputMsg += `The cards add up will be ${allPlayerCard[currentPlayer].cardTotal[0]}, ${allPlayerCard[currentPlayer].cardTotal[1]}.`;
  return outputMsg;
};

var checkWhoWin = function () {
  decidePlayerBestTotal();
  var outputMsg = `Dealer's card total is ${
    allPlayerCard[allPlayerCard.length - 1].bestTotal
  }. <br>`;
  for (var i = 0; i < allPlayerCard.length - 1; i += 1) {
    if (allPlayerCard[i].card.length < 5) {
      if (
        (allPlayerCard[i].bestTotal >
          allPlayerCard[allPlayerCard.length - 1].bestTotal &&
          allPlayerCard[i].bestTotal <= 21) ||
        (allPlayerCard[i].bestTotal <= 21 &&
          allPlayerCard[allPlayerCard.length - 1].bestTotal > 21)
      ) {
        outputMsg += `${allPlayerCard[i].name}'s card total is ${allPlayerCard[i].bestTotal}, ${allPlayerCard[i].name} won! <br>`;
      }
      if (
        allPlayerCard[i].bestTotal ==
          allPlayerCard[allPlayerCard.length - 1].bestTotal ||
        (allPlayerCard[i].bestTotal > 21 &&
          allPlayerCard[allPlayerCard.length - 1].bestTotal > 21)
      ) {
        outputMsg += `${allPlayerCard[i].name}'s card total is ${allPlayerCard[i].bestTotal}, it's a tie! <br>`;
      }
      if (
        (allPlayerCard[i].bestTotal <
          allPlayerCard[allPlayerCard.length - 1].bestTotal &&
          allPlayerCard[allPlayerCard.length - 1].bestTotal <= 21) ||
        (allPlayerCard[i].bestTotal >
          allPlayerCard[allPlayerCard.length - 1].bestTotal &&
          allPlayerCard[i].bestTotal > 21 &&
          allPlayerCard[allPlayerCard.length - 1].bestTotal <= 21)
      ) {
        outputMsg += `${allPlayerCard[i].name}'s card total is ${allPlayerCard[i].bestTotal}, ${allPlayerCard[i].name} lost! <br>`;
      }
    }
  }
  return outputMsg;
};

var decidePlayerBestTotal = function () {
  for (var i = 0; i < allPlayerCard.length; i += 1) {
    var firstPossibleTotal = allPlayerCard[i].cardTotal[0];
    var secPossibleTotal = allPlayerCard[i].cardTotal[1];
    if (firstPossibleTotal > secPossibleTotal && firstPossibleTotal <= 21) {
      allPlayerCard[i].bestTotal = firstPossibleTotal;
    } else allPlayerCard[i].bestTotal = secPossibleTotal;
  }
};

var resetGame = function () {
  allPlayerCard = [];
  cardDeck = makeDeck();
  currentPlayer = 0;
  numberOfPlayer = 0;
  gameMode = "A";
};

var main = function (input) {
  var outputMsg = "";
  if (gameMode == "A" && currentPlayer < numberOfPlayer) {
    outputMsg = checkInitialWinning();
    if (input == "hit") {
      if (
        allPlayerCard[currentPlayer].cardTotal[0] > 21 &&
        allPlayerCard[currentPlayer].cardTotal[1] > 21
      ) {
        outputMsg = `You have exceeded maximum 21. Please click <b>stay</b> to next player!`;
      } else var playerNumberOfCards = allPlayerCard[currentPlayer].card.length;
      allPlayerCard[currentPlayer].card[playerNumberOfCards] =
        shuffledDeck.pop();
      updateNumberOfAce();
    }
    if (input == "stay") {
      if (
        allPlayerCard[currentPlayer].cardTotal[0] > 15 ||
        allPlayerCard[currentPlayer].cardTotal[1] > 15 ||
        allPlayerCard[currentPlayer].blackJack == true
      ) {
        currentPlayer += 1;
      } else
        outputMsg = `Your card total did not meet minimum 15. <br> Please click <b>hit</b> to draw one more card!`;
    }
    if (outputMsg == "") {
      updateCardTotal();
      outputMsg = displayCardsDrawn();
      if (
        allPlayerCard[currentPlayer].card.length == 5 &&
        allPlayerCard[currentPlayer].cardTotal[0] <= 21
      ) {
        outputMsg += ` ${allPlayerCard[currentPlayer].name} won! <br>`;
        if (allPlayerCard.length == 2) {
          hit.disabled = true;
          stay.disabled = true;
          reset.style.visibility = "visible";
        } else outputMsg += `Please click <b>stay</b> to move to next player.`
      }
      if (
        allPlayerCard[currentPlayer].card.length == 5 &&
        allPlayerCard[currentPlayer].cardTotal[0] > 21
      ) {
        outputMsg += ` ${allPlayerCard[currentPlayer].name} lost! <br>`;
        if (allPlayerCard.length == 2) {
          hit.disabled = true;
          stay.disabled = true;
          reset.style.visibility = "visible";
        } else outputMsg += `Please click <b>stay</b> to move to next player.`
      }
    }
    if (currentPlayer == numberOfPlayer) {
      updateCardTotal();
      checkDealerCard();
      outputMsg = displayCardsDrawn();
      gameMode = "B";
    }
  } else if (gameMode == "B") {
    outputMsg = checkWhoWin();
    hit.disabled = true;
    stay.disabled = true;
    reset.style.visibility = "visible";
  }
  return outputMsg;
};
