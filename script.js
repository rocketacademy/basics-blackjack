var makeDeck = function () {
  var cardDeck = [];
  //var suits = ["hearts ♥️", "diamonds ♦️", "clubs ♣️", "spades ♠️"];
  //var tenthNames = [10, "jack 🎃", "queen 👸", "king 🤴"];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var tenthNames = [10, "jack", "queen", "king"];

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
          img: `<img src="./Imgs/PNG-cards-1.3/${cardName}_of_${currentSuit}.png"/>`,
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
            img: `<img src="./Imgs/PNG-cards-1.3/${cardName}_of_${currentSuit}.png"/>`,
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

var dealOneCard = function (hand) {
  var dealtCard = shuffledDeck.pop();
  hand.push(dealtCard);
  return hand;
};

var handResults = function (hand) {
  var myOutputValue = "";
  for (var counter = 0; counter < hand.length; counter += 1) {
    if (dealerHand[counter] == hand[0] && gameState == "deal") {
      myOutputValue =
        myOutputValue + ` <img src="./Imgs/PNG-cards-1.3/emptyCard.png"/> `;
    } else {
      myOutputValue = myOutputValue + `${hand[counter].img}`;
      //myOutputValue =
      // myOutputValue + ` ${hand[counter].name} of ${hand[counter].suit} , `;
    }
  }

  myOutputValue = myOutputValue.substring(0, myOutputValue.length - 2);

  return myOutputValue;
};

var dealResult = function () {
  var myOutputValue = "";

  playersData[turn - 1].hand = dealCardsToPlayers(playersData[turn - 1].hand);

  myOutputValue += `Player ${
    playersData[turn - 1].index
  } hand :<br>${handResults(playersData[turn - 1].hand)}<br>`;

  if (turn == 1) {
    dealerHand = dealCardsToPlayers(dealerHand);
  }

  myOutputValue += `<br>Dealer hand :<br> ${handResults(dealerHand)}<br>`;
  myOutputValue += `</br> Please enter "hit" or "stand".`;

  return myOutputValue;
};

var currentHandResult = function () {
  var myOutputValue = "";

  var counter = 0;
  while (counter < playersData[turn - 1].hand.length) {
    playersData[turn - 1].hand[counter] = dealOneCard(
      playersData[turn - 1].hand[counter]
    );
    myOutputValue += `Player ${
      playersData[turn - 1].index
    } hand :<br>${handResults(playersData[turn - 1].hand[counter])}<br><br>`;
    counter += 1;
  }

  return myOutputValue;
};

var loopHandResult = function () {
  var myOutputValue = "";
  var counter = 0;
  while (counter < playersData[turn - 1].hand.length) {
    myOutputValue += `Player ${
      playersData[turn - 1].index
    } hand :<br>${handResults(playersData[turn - 1].hand[counter])}<br><br>`;
    counter += 1;
  }

  return myOutputValue;
};

var playerHandResults = function () {
  var myOutputValue = "";

  for (var counter = 0; counter < totalNumOfPlayers; counter += 1) {
    if (playersData[counter].hand[0][0] != undefined) {
      var deckIndex = 0;
      while (deckIndex < playersData[counter].hand.length) {
        myOutputValue += `<br>Player ${
          playersData[counter].index
        } hand :<br> ${handResults(playersData[counter].hand[deckIndex])} <br>`;
        deckIndex++;
      }
    } else {
      myOutputValue += `<br>Player ${
        playersData[counter].index
      } hand :<br> ${handResults(playersData[counter].hand)} <br>`;
    }
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
    if (playersData[counter].hand[0][0] != undefined) {
      var index = 0;
      while (index < playersData[counter].hand.length) {
        var score = totalValueOfHand(playersData[counter].hand[index]);
        score = { player: playersData[counter].index, score: score };
        playerScores.push(score);
        index++;
      }
    } else {
      var score = totalValueOfHand(playersData[counter].hand);
      score = { player: playersData[counter].index, score: score };
      playerScores.push(score);
    }
  }
};

var winResult = function (dealerScore) {
  var myOutputValue = "";
  for (var counter = 0; counter < playerScores.length; counter++) {
    if (
      playerScores[counter].score == dealerScore ||
      (playerScores[counter].score > 21 && dealerScore > 21)
    ) {
      myOutputValue += `Its a tie.<br>`;
    } else if (
      (playerScores[counter].score <= 21 &&
        playerScores[counter].score > dealerScore) ||
      (playerScores[counter].score <= 21 && dealerScore > 21)
    ) {
      var playerIndex = 0;
      while (playerIndex < playersData.length) {
        if (playersData[playerIndex].index == playerScores[counter].player) {
          playersData[playerIndex].savings =
            playersData[playerIndex].savings + playersData[playerIndex].betting;
          myOutputValue += `Player ${playersData[playerIndex].index} wins with ${playersData[playerIndex].betting}! `;
        }
        playerIndex++;
      }

      myOutputValue += `Dealer loses!<br>`;
    } else {
      var playerIndex = 0;
      while (playerIndex < playersData.length) {
        if (playersData[playerIndex].index == playerScores[counter].player) {
          playersData[playerIndex].savings =
            playersData[playerIndex].savings - playersData[playerIndex].betting;
          myOutputValue += `Player ${playersData[playerIndex].index} loses with ${playersData[playerIndex].betting}! `;
        }
        playerIndex++;
      }

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
    myOutputValue += `Please refresh to restart the game !`;
    myOutputValue += `<br><br><img src = "./Imgs/lose.gif"/>`;
  } else {
    myOutputValue += `<br><br><img src = "./Imgs/win.gif"/>`;
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
    deckTurn = 0;
  }

  return myOutputValue;
};

var splitTheDeck = function () {
  var lastCard = playersData[turn - 1].hand[1];
  var firstCard = playersData[turn - 1].hand[0];
  playersData[turn - 1].hand = [[firstCard], [lastCard]];
  console.log(playersData[turn - 1].hand);

  var myOutputValue = "";
  myOutputValue = currentHandResult();
  splitted = true;

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

  if (shuffledDeck.length == 0 && gameState != "shuffling") {
    //shuffledDeck = shuffleCards(unshuffledDeck);
    myOutputValue += `Shuffled Deck is empty. Refresh to start a new round.`;
    myOutputValue += `<br><br><img src = "./Imgs/emptydeck.gif"/>`;
  } else {
    if (gameState == "shuffling") {
      shuffledDeck = shuffleCards(unshuffledDeck);

      if (turn == 1 && newGame == false) {
        if (setNumOfPlayer.value == "") {
          totalNumOfPlayers = 1;
        } else {
          totalNumOfPlayers = setNumOfPlayer.value;
        }

        var inputPlayers = document.getElementById("numOfplayers");
        inputPlayers.style.display = "none";
      }

      myOutputValue = `Cards have been shuffled! Click submit to deal cards.`;
      gameState = "deal";
      inputSettings.style.display = "none";
    } else if (gameState == "deal") {
      if (!newGame) {
        inputSettings.style.display = "none";
        playersData = assignPlayers();
      } else {
        inputSettings.style.display = "block";
        playersData[turn - 1].betting = Number(inputRange.value);
      }

      console.log(playersData);

      myOutputValue = dealResult();

      if (
        playersData[turn - 1].hand[0].name == playersData[turn - 1].hand[1].name
      ) {
        splitButton.style.display = "inline-block";
      }

      gameState = "hitStand";
      hitButton.style.display = "inline-block";
      standButton.style.display = "inline-block";
      button.style.display = "none";
      if (newGame) {
        inputSettings.style.display = "none";
      }
    } else if (gameState == "winnerDetermine") {
      totalPlayerScore();
      console.log(playerScores);
      var dealerScore = totalValueOfHand(dealerHand);

      myOutputValue = playerHandResults();
      myOutputValue += `<br>Dealer hand :<br> ${handResults(dealerHand)}`;

      var result = winResult(dealerScore);

      myOutputValue += `<br><br><br><br>${result} <br><br>${continueGame()}`;
    }
  }

  return myOutputValue;
};
