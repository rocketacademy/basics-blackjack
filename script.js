var gameStateHitOrStand = "choose_HitOrStand";
var gameStateDealCards = "InitialCardDealing";
var gameStateDealNextCard = "NextCardDealing";
var gameStateEnd = "gameEnds";
var gameState = gameStateDealCards;
var playerCardsRankArr = [];
var compCardsRankArr = [];
var unshuffledCardDeck = [];
var shuffledCardDeck = [];
var playerAceCounter = 0;

var main = function (input) {
  if (gameState == gameStateEnd && (input == true || input == false)) {
    return "The game is over. Please refresh to play again.";
  }

  if (gameState == gameStateHitOrStand && input != "hit" && input != "stand") {
    return "Error! Please return only 'hit' or 'stand'";
  }

  if (gameState == gameStateHitOrStand && input == "hit") {
    var playerNextCard = shuffledCardDeck.pop();
    playerCardsRankArr.push(playerNextCard);
    playerScore = playerNextCard.rank + playerScore;
    aceCounterPlayer(playerCardsRankArr);
    var playerScoreCalculatorFn = playerScoreCalculator();
    playerScore = playerScoreCalculatorFn;
    var displayPlayerAndCompHandsFn = displayPlayerAndCompHands(
      playerCardsRankArr,
      compCardsRankArr
    );
    var scoreKeepingFn = scoreKeeping(playerScore, compScore);
    return (
      displayPlayerAndCompHandsFn +
      scoreKeepingFn +
      ". <br><br>Please input 'hit' or 'stand', then press Submit"
    );
  }

  if (gameState == gameStateHitOrStand && input == "stand") {
    while (compScore < 17) {
      var compNextCard = shuffledCardDeck.pop();
      compScore = compScore + compNextCard.rank;
      compCardsRankArr.push(compNextCard);
      aceCounterComp(compCardsRankArr);
      var compScoreCalculatorFn = compScoreCalculator();
      compScore = compScoreCalculatorFn;
    }
    gameState = gameStateEnd;
    if (playerScore > 21 && compScore > 21) {
      var displayPlayerAndCompHandsFn = displayPlayerAndCompHands(
        playerCardsRankArr,
        compCardsRankArr
      );
      var scoreKeepingFn = scoreKeeping(playerScore, compScore);
      return (
        "Both player and dealer bust! Please refresh to play again. <br><br>" +
        displayPlayerAndCompHandsFn +
        scoreKeepingFn
      );
    } else if (playerScore > 21 && compScore < 22) {
      var displayPlayerAndCompHandsFn = displayPlayerAndCompHands(
        playerCardsRankArr,
        compCardsRankArr
      );
      var scoreKeepingFn = scoreKeeping(playerScore, compScore);
      return (
        "Sorry, you have lost. Please refresh to play again. <br><br>" +
        displayPlayerAndCompHandsFn +
        scoreKeepingFn
      );
    } else if (playerScore < 22 && compScore > 21) {
      var displayPlayerAndCompHandsFn = displayPlayerAndCompHands(
        playerCardsRankArr,
        compCardsRankArr
      );
      var scoreKeepingFn = scoreKeeping(playerScore, compScore);
      return (
        "Congratulations, you won! Please refresh to play again. <br><br>" +
        displayPlayerAndCompHandsFn +
        scoreKeepingFn
      );
    } else if (playerScore == compScore) {
      var displayPlayerAndCompHandsFn = displayPlayerAndCompHands(
        playerCardsRankArr,
        compCardsRankArr
      );
      var scoreKeepingFn = scoreKeeping(playerScore, compScore);
      return (
        "It's a tie! Please refresh to play again. <br><br>" +
        displayPlayerAndCompHandsFn +
        scoreKeepingFn
      );
    } else if (playerScore < compScore && compScore < 22) {
      var displayPlayerAndCompHandsFn = displayPlayerAndCompHands(
        playerCardsRankArr,
        compCardsRankArr
      );
      var scoreKeepingFn = scoreKeeping(playerScore, compScore);
      return (
        "Sorry, you have lost. Please refresh to play again. <br><br>" +
        displayPlayerAndCompHandsFn +
        scoreKeepingFn
      );
    } else if (playerScore > compScore && playerScore < 22) {
      var displayPlayerAndCompHandsFn = displayPlayerAndCompHands(
        playerCardsRankArr,
        compCardsRankArr
      );
      var scoreKeepingFn = scoreKeeping(playerScore, compScore);
      return (
        "Congratulations, you won! Please refresh to play again. <br><br>" +
        displayPlayerAndCompHandsFn +
        scoreKeepingFn
      );
    }
  }

  if (gameState == gameStateDealCards) {
    unshuffledCardDeck = makeDeck();
    shuffledCardDeck = shuffleCards(unshuffledCardDeck);
    var playerCardOne = shuffledCardDeck.pop();
    var playerCardTwo = shuffledCardDeck.pop();
    playerScore = playerCardOne.rank + playerCardTwo.rank;

    playerCardsRankArr.push(playerCardOne, playerCardTwo);
    aceCounterPlayer(playerCardsRankArr);
    var playerScoreCalculatorFn = playerScoreCalculator();
    var compCardOne = shuffledCardDeck.pop();
    var compCardTwo = shuffledCardDeck.pop();
    compScore = compCardOne.rank + compCardTwo.rank;

    compCardsRankArr.push(compCardOne, compCardTwo);
    var displayPlayerAndCompHandsFn = displayPlayerAndCompHands(
      playerCardsRankArr,
      compCardsRankArr
    );
    var scoreKeepingFn = scoreKeeping(playerScore, compScore);
    if (playerScore == 21 && compScore != 21) {
      return (
        "Congratulations, you win by Blackjack! Please refresh to play again. <br><br>" +
        displayPlayerAndCompHandsFn +
        scoreKeepingFn
      );
    }
    if (playerScore != 21 && compScore == 21) {
      return (
        "Sorry, computer wins by Blackjack. Please refresh to play again.<br><br>" +
        displayPlayerAndCompHandsFn +
        scoreKeepingFn
      );
    }
    if (playerScore == 21 && compScore == 21) {
      return "It's a tie! Play again.";
    }
    gameState = gameStateHitOrStand;
  }
  var displayPlayerAndCompHandsFn = displayPlayerAndCompHands(
    playerCardsRankArr,
    compCardsRankArr
  );
  var scoreKeepingFn = scoreKeeping(playerScore, compScore);
  if (gameState == gameStateHitOrStand) {
    return (
      displayPlayerAndCompHandsFn +
      scoreKeepingFn +
      ". <br><br>Please input 'hit' or 'stand', then press Submit"
    );
  }
};

var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      if (card.rank == 13 || card.rank == 12 || card.rank == 11) {
        card.rank = 10;
      }
      if (card.rank == 1) {
        card.rank = 11;
      }
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

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var displayPlayerAndCompHands = function (
  playerCardsRankArr,
  compCardsRankArr
) {
  var playerMessage = "Player hand:<br>";
  var index = 0;
  while (index < playerCardsRankArr.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerCardsRankArr[index].name +
      " of " +
      playerCardsRankArr[index].suit +
      "<br>";
    index = index + 1;
  }
  index = 0;
  var compMessage = "Dealer hand:<br>";
  while (index < compCardsRankArr.length) {
    compMessage =
      compMessage +
      "- " +
      compCardsRankArr[index].name +
      " of " +
      compCardsRankArr[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + compMessage;
};

var scoreKeeping = function (playerScore, compScore) {
  var totalScoreMessage =
    "<br>Player total hand value: " +
    playerScore +
    "<br>Dealer total hand value: " +
    compScore;
  return totalScoreMessage;
};

var aceCounterPlayer = function (playerCardsRankArr) {
  if (playerCardsRankArr.length == 2) {
    for (card of playerCardsRankArr) {
      if (card.name == "ace") {
        playerAceCounter += 1;
      }
    }
  } else {
    var card = playerCardsRankArr.at(-1);
    if (card.name == "ace") {
      playerAceCounter += 1;
    }
  }
};

var playerScoreCalculator = function () {
  if (playerScore > 21 && playerAceCounter > 0) {
    playerScore = playerScore - 10;
    playerAceCounter -= 1;
  }
  return playerScore;
};
// };

var aceCounterComp = function (compCardsRankArr) {
  if (compCardsRankArr.length == 2) {
    for (card of compCardsRankArr) {
      if (card.name == "ace") {
        compAceCounter += 1;
      }
    }
  } else {
    var card = compCardsRankArr.at(-1);
    if (card.name == "ace") {
      compAceCounter += 1;
    }
  }
};
var compScoreCalculator = function (compAceCounter) {
  if (compScore > 21 && compAceCounter > 0) {
    compScore = compScore - 10;
    compAceCounter -= 1;
  }
  return compScore;
};
