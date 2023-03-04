var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts ♥️", "diamonds ♦️", "clubs ♣️", "spades ♠️"];
  var tenthNames = [10, "jack 🎃", "queen 👸", "king 🤴"];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    var currentSuit = suits[suitIndex];
    for (var rankCounter = 1; rankCounter <= 10; rankCounter += 1) {
      var cardName = rankCounter;

      if (cardName != 10) {
        if (cardName == 1) {
          cardName = "ace";
        }

        var card = {
          name: cardName,
          suit: currentSuit,
          rank: rankCounter,
        };

        cardDeck.push(card);
      }

      while (cardName == 10) {
        var nameCounter = 0;
        while (nameCounter < 4) {
          cardName = tenthNames[nameCounter];

          var tenthCard = {
            name: cardName,
            suit: currentSuit,
            rank: rankCounter,
          };

          cardDeck.push(tenthCard);

          nameCounter += 1;
        }
      }
    }
  }

  return cardDeck;
};

var shuffleCards = function (cardDeck) {
  var deckOfCards = cardDeck.slice();

  for (
    var currentIndex = 0;
    currentIndex < deckOfCards.length;
    currentIndex += 1
  ) {
    var randomIndex = Math.floor(Math.random() * deckOfCards.length);
    var randomCard = deckOfCards[randomIndex];
    var currentCard = deckOfCards[currentIndex];
    deckOfCards[randomIndex] = currentCard;
    deckOfCards[currentIndex] = randomCard;
  }

  return deckOfCards;
};

var dealCardsToPlayers = function (hand) {
  var firstCard = shuffledDeck.pop();
  var secondCard = shuffledDeck.pop();
  hand.push(firstCard, secondCard);
  return hand;
};

var handResults = function (hand) {
  var myOutputValue = "";
  for (var counter = 0; counter < hand.length; counter += 1) {
    if (dealerHand[counter] == hand[0] && gameState == "deal") {
      myOutputValue = myOutputValue + ` Hidden card, `;
    } else {
      myOutputValue =
        myOutputValue + ` ${hand[counter].name} of ${hand[counter].suit} , `;
    }
  }

  myOutputValue = myOutputValue.substring(0, myOutputValue.length - 2);

  return myOutputValue;
};

var dealResult = function () {
  var myOutputValue = "";

  playersData[turn - 1].hand = dealCardsToPlayers(playersData[turn - 1].hand);

  if (turn == 1) {
    dealerHand = dealCardsToPlayers(dealerHand);
  }

  myOutputValue += `Player ${playersData[turn - 1].index} hand : ${handResults(
    playersData[turn - 1].hand
  )}<br>`;
  myOutputValue += `Dealer hand : ` + handResults(dealerHand) + `<br>`;
  myOutputValue += `</br> Please enter "hit" or "stand".`;

  return myOutputValue;
};

var playerHandResults = function () {
  var myOutputValue = "";
  for (var counter = 0; counter < totalNumOfPlayers; counter += 1) {
    myOutputValue += `Player ${playersData[counter].index} hand : ${handResults(
      playersData[counter].hand
    )} <br>`;
  }

  return myOutputValue;
};

var totalValueOfHand = function (hand) {
  var total = 0;
  var aceCounter = 0;

  for (var counter = 0; counter < hand.length; counter += 1) {
    if (hand[counter].name == "ace") {
      aceCounter += 1;
    } else {
      total += hand[counter].rank;
    }
  }

  var assume = total + 11;

  if (aceCounter >= 1 && assume <= 21) {
    total += aceCounter + 10;
  } else {
    total += aceCounter;
  }

  return total;
};

var totalPlayerScore = function () {
  for (var counter = 0; counter < totalNumOfPlayers; counter += 1) {
    var score = totalValueOfHand(playersData[counter].hand);
    playerScores.push(score);
  }
};

var winResult = function (dealerScore) {
  var myOutputValue = "";
  for (var counter = 0; counter < playerScores.length; counter++) {
    if (
      playerScores[counter] == dealerScore ||
      (playerScores[counter] > 21 && dealerScore > 21)
    ) {
      myOutputValue += `Its a tie.<br>`;
    } else if (
      (playerScores[counter] <= 21 && playerScores[counter] > dealerScore) ||
      (playerScores[counter] <= 21 && dealerScore > 21)
    ) {
      playersData[counter].savings =
        playersData[counter].savings + playersData[counter].betting;
      myOutputValue += `Player ${playersData[counter].index} wins with ${playersData[counter].betting}! `;
      myOutputValue += `Dealer loses!<br>`;
    } else {
      playersData[counter].savings =
        playersData[counter].savings - playersData[counter].betting;
      myOutputValue += `Player ${playersData[counter].index} loses with ${playersData[counter].betting}! `;
      myOutputValue += `Dealer wins!<br>`;
    }
  }

  return myOutputValue;
};

var hitOrStandDealer = function () {
  while (totalValueOfHand(dealerHand) < 17) {
    var hitCard = shuffledDeck.pop();
    dealerHand.push(hitCard);
  }

  return dealerHand;
};

var assignPlayers = function () {
  var chips = String(inputRange.value);
  var player = {
    index: turn,
    savings: 100,
    betting: Number(chips),
    hand: [],
  };

  playersData.push(player);

  return playersData;
};

var continueGame = function () {
  var myOutputValue = "";
  var counter = 0;
  while (counter < playersData.length) {
    if (playersData[counter].savings <= 0) {
      playersData.splice(counter, 1);
    } else {
      myOutputValue += `Player ${playersData[counter].index} remains with ${playersData[counter].savings}.<br>`;
      counter += 1;
    }
  }

  if (playersData.length == 0) {
    myOutputValue = `Please refresh to restart the game !`;
  } else {
    for (var counter = 0; counter < playersData.length; counter++) {
      playersData[counter].hand = [];
    }
    dealerHand = [];
    newGame = true;
    totalNumOfPlayers = playersData.length;
    turn = 1;
    playerScores = [];
    button.style.display = "inline-block";
    inputSettings.style.display = "block";
    gameState = "deal";
  }

  return myOutputValue;
};

var gameState = "shuffling";
var dealerHand = [];
var playerHand = [];
var unshuffledDeck = makeDeck();
var shuffledDeck = [];
var totalNumOfPlayers = 1;
var playersData = [];
var turn = 1;
var playerScores = [];
var betAmt = document.getElementById("valueBet");
var inputRange = document.getElementById("bettingRange");
var setNumOfPlayer = document.getElementById("numPlayers");
var inputSettings = document.getElementById("gameSettings");
var newGame = false;

var main = function (input) {
  var myOutputValue = "";

  if (gameState == "shuffling") {
    shuffledDeck = shuffleCards(unshuffledDeck);

    if (turn == 1 && newGame == false) {
      totalNumOfPlayers = setNumOfPlayer.value;

      var inputPlayers = document.getElementById("numOfplayers");
      inputPlayers.style.display = "none";
    }

    myOutputValue = `Cards have been shuffled! Click submit to deal cards.`;
    gameState = "deal";
    inputSettings.style.display = "none";
  } else if (gameState == "deal") {
    if (shuffledDeck.length == 0) {
      shuffledDeck = shuffleCards(unshuffledDeck);
    }
    if (!newGame) {
      inputSettings.style.display = "none";
      playersData = assignPlayers();
    } else {
      inputSettings.style.display = "block";
    }

    console.log(playersData);

    myOutputValue = dealResult();

    gameState = "hitStand";
    hitButton.style.display = "inline-block";
    standButton.style.display = "inline-block";
    button.style.display = "none";
    if (newGame) {
      inputSettings.style.display = "none";
    }
  } else if (gameState == "winnerDetermine") {
    totalPlayerScore();
    var dealerScore = totalValueOfHand(dealerHand);

    myOutputValue = playerHandResults();
    myOutputValue += `Dealer hand : ` + handResults(dealerHand);

    var result = winResult(dealerScore);

    myOutputValue += `</br></br>${result} <br><br>${continueGame()}`;
  }

  return myOutputValue;
};
