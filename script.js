//SHUFFLED DECK OF CARDS
// name suit suitPic rank
var makeDeck = function () {
  var cardDeck = [];

  var suits = ["diamond", "club", "heart", "spade"];
  var suitsPic = ["♦️", "♣️", "♥️", "♠️"];
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentSuitPic = suitsPic[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (rankCounter == 1) {
        cardName = "Ace";
      } else if (rankCounter == 11) {
        cardName = "Jack";
      } else if (rankCounter == 12) {
        cardName = "Queen";
      } else if (rankCounter == 13) {
        cardName = "King";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        suitPic: currentSuitPic,
        rank: rankCounter,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }

  return cardDeck;
};
var getRandomIndex = function (size) {
  var randomInteger = Math.floor(Math.random() * size);
  return randomInteger;
};
var shuffleCards = function () {
  var cardDeck = makeDeck();
  numberOfCards = cardDeck.length;

  var currentIndex = 0;

  while (currentIndex < numberOfCards) {
    var randomIndex = getRandomIndex(numberOfCards);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;

    currentIndex = currentIndex + 1;
  }

  return cardDeck;
};

//GAME MODES
// Enter number of players
var GAME_MODE_ENTER_NUMBER_OF_PLAYERS = "ENTER_NUMBER_OF_PLAYERS";
// Enter Name: Output - Name & Click submit to deal cards.
// Input = name. Output: `Hi ${input}, click "submit" to deal cards.`
var GAME_MODE_ENTER_NAME = "ENTER_NAME";
//Betting
// 1. Player starts with 100 points. Each round the player wagers a number of points before their hand is dealt. Lower point = better
var GAME_MODE_WAGER = "WAGER";
// Deal Cards: Output - Details of cards & Type "hit"/"submit"
// Input: Nothing. Output: The cards are dealed. Hi player, click "submit" to view your cards.
var GAME_MODE_DEAL_CARDS = "DEAL_CARDS";
// Decides: "hit" or "stand"
var GAME_MODE_DECISION = "DECISION";
var GAME_MODE_POST_DECISION = "POST_DECISION";
// If user hits "stand" & computer makes sense to stand:  -- calculate result of both & shows the result of both
var GAME_MODE_LEADERBOARD = "LEADERBOARD";
// ACE
var GAME_MODE_ACE_POST_DECISION = "ACE_POST_DECISION";

// Current game mode
var gameMode = GAME_MODE_ENTER_NUMBER_OF_PLAYERS;
var currentPlayer = 1;
var numOfPlayers = 0;
var wager = 0;
var userName = [];
var cardNumberPerPlayer = []; // player's card number
var numberofWinsPerPlayer = [];
var numberOfGamesPerPlayer = [];
var wagerPointSystem = [];
var cardsPerRound = [];
var playerCardsTemp = [];
var newDeck = [];

var indexOfMaxInArray = function (cardNumberPerPlayer) {
  if (cardNumberPerPlayer.length == 0) {
    return -1;
  }

  var max = cardNumberPerPlayer[0];
  var maxIndex = 0;

  for (var i = 1; i < cardNumberPerPlayer.length; i++) {
    if (cardNumberPerPlayer[i] > max) {
      maxIndex = i;
      max = cardNumberPerPlayer[i];
    }
  }

  return maxIndex;
};
var incrementNumberOfWinsOfEachPlayer = function (returnIndexOfHighestNumber) {
  numberofWinsPerPlayer[returnIndexOfHighestNumber] += 1;
};
var countWagerPointSystem = function (returnIndexOfHighestNumber) {
  wagerPointSystem[returnIndexOfHighestNumber] -= wager;
};

var main = function (input) {
  if (gameMode == GAME_MODE_ENTER_NUMBER_OF_PLAYERS) {
    numOfPlayers = Number(input);
    numberofWinsPerPlayer = Array(numOfPlayers).fill(0);
    numberOfGamesPerPlayer = Array(numOfPlayers).fill(0);
    wagerPointSystem = Array(numOfPlayers).fill(100);
    gameMode = GAME_MODE_ENTER_NAME;

    return `Number of Players: ${numOfPlayers}<br><br>Enter Player ${currentPlayer}'s name!`;
  } else if (gameMode == GAME_MODE_ENTER_NAME) {
    var name = input;
    userName.push(name);

    if (userName.length == numOfPlayers) {
      var playerIndex = 0;
      var playerNumber = 1;
      var output = "";
      while (playerIndex < userName.length) {
        output = `${output}Player ${playerNumber}: ${userName[playerIndex]}<br>`;
        playerIndex += 1;
        playerNumber += 1;
      }

      gameMode = GAME_MODE_WAGER;

      return `${output}<br>Enter the preferred wager points!`;
    }

    var nextPlayer = currentPlayer + 1;
    currentPlayer = nextPlayer;

    return `Player ${nextPlayer}, enter your name!`;
  } else if (gameMode == GAME_MODE_WAGER) {
    wager = input;
    gameMode = GAME_MODE_DEAL_CARDS;
    return `Wager: ${wager} points<br><br>Click on "Submit" to deal the cards!`;
  } else if (gameMode == GAME_MODE_DEAL_CARDS) {
    cardNumberPerPlayer = [];
    cardsPerRound = [];
    currentPlayer = 1;
    var shuffledDeck = shuffleCards();
    newDeck = shuffledDeck;
    var numberOfCardsToBeDealed = numOfPlayers * 2;
    var cardIndex = 0;
    while (cardIndex < numberOfCardsToBeDealed) {
      var card = newDeck.pop();

      if (card.name == "Jack" || card.name == "Queen" || card.name == "King") {
        card.rank = 10;
      } else if (card.name == "Ace") {
        card.rank = " ";
      }

      cardsPerRound.push(card);
      cardIndex += 1;
    }
    gameMode = GAME_MODE_DECISION;
    return `All cards have been dealt.<br><br>${
      userName[currentPlayer - 1]
    }, click "Submit" to review your cards.`;
  } else if (gameMode == GAME_MODE_DECISION) {
    playerCardsTemp = [];

    var firstCardIndex = currentPlayer - 1;
    var secondCardIndex = firstCardIndex + numOfPlayers;
    console.log(`First card index: ${firstCardIndex}`);
    console.log(`Second card index: ${secondCardIndex}`);

    var cardOne = cardsPerRound[firstCardIndex];
    playerCardsTemp.push(cardOne);
    var cardTwo = cardsPerRound[secondCardIndex];
    playerCardsTemp.push(cardTwo);
    var standardOutput = `(1) ${cardOne.name} of ${cardOne.suitPic}<br>(2) ${cardTwo.name} of ${cardTwo.suitPic}`;

    if (cardOne.name == "Ace" && cardTwo.name == "Ace") {
      gameMode = GAME_MODE_POST_DECISION;
      return `Hi ${
        userName[currentPlayer - 1]
      }, congratulations! You have gotten a "BAN-BAN!"<br><br>${standardOutput}<br><br>Enter "stand" to finalize your hands!`;
    } else if (
      (cardOne.name == "Ace" &&
        (cardTwo.name == "Jack" ||
          cardTwo.name == "Queen" ||
          cardTwo.name == "King" ||
          cardTwo.name == 10)) ||
      (cardTwo.name == "Ace" &&
        (cardOne.name == "Jack" ||
          cardOne.name == "Queen" ||
          cardOne.name == "King" ||
          cardOne.name == 10))
    ) {
      gameMode = GAME_MODE_POST_DECISION;
      return `Hi ${
        userName[currentPlayer - 1]
      }, congratulations! You have gotten a "BAN-LUCK!"<br><br>${standardOutput}<br><br>Enter "stand" to finalize your hands!`;
    } else if (cardOne.name == "Ace") {
      var pointsIfOne = cardTwo.rank + 1;
      var pointsIfEleven = cardTwo.rank + 11;
      gameMode = GAME_MODE_ACE_POST_DECISION;
      return `Hi ${
        userName[currentPlayer - 1]
      }, here are your cards:<br><br>${standardOutput}<br><br>Ace can be 1 or 11.<br>If your Ace = 1, card points: ${pointsIfOne}<br>If your Ace = 11, card points: ${pointsIfEleven}<br><br>Enter "hit" to draw a new card.<br>Enter number to finalize your hand.`;
    } else if (cardTwo.name == "Ace") {
      var pointsIfOne = cardOne.rank + 1;
      var pointsIfEleven = cardOne.rank + 11;
      gameMode = GAME_MODE_ACE_POST_DECISION;
      return `Hi ${
        userName[currentPlayer - 1]
      }, here are your cards:<br><br>${standardOutput}<br><br>Ace can be 1 or 11.<br>If your Ace = 1, card points: ${pointsIfOne}<br>If your Ace = 11, card points: ${pointsIfEleven}<br><br>Enter "hit" to draw a new card.<br>Enter number to finalize your hand.`;
    }

    var points = cardOne.rank + cardTwo.rank;
    gameMode = GAME_MODE_POST_DECISION;
    var cardOutput = `Hi ${
      userName[currentPlayer - 1]
    }, here are your cards:<br><br>${standardOutput}<br><br>Card points: ${points}`;
    return `${cardOutput}<br><br>Enter "hit" to draw a new card.<br>Enter "stand" to finalize your hand.`;
  } else if (gameMode == GAME_MODE_POST_DECISION) {
    if (input == "hit") {
      var card = newDeck.pop();

      if (card.name == "Jack" || card.name == "Queen" || card.name == "King") {
        card.rank = 10;
      } else if (card.name == "Ace") {
        card.rank = " ";
      }

      playerCardsTemp.push(card);

      var cardIndex = 0;
      var number = 1;
      var standardOutput = "";
      var points = 0;

      while (cardIndex < playerCardsTemp.length) {
        points += playerCardsTemp[cardIndex].rank;

        standardOutput = `${standardOutput}(${number}) ${playerCardsTemp[cardIndex].name} of ${playerCardsTemp[cardIndex].suitPic}<br>`;

        cardIndex += 1;
        number += 1;
      }

      if (points > 21) {
        return `Hi ${
          userName[currentPlayer - 1]
        }, your cards have busted!<br><br>${standardOutput}<br>Card points: ${points}<br><br>Enter "stand" to finalize your hand.`;
      }

      return `Hi ${
        userName[currentPlayer - 1]
      }, here are your cards:<br><br>${standardOutput}<br>Card points: ${points}<br><br>Enter "hit" to draw a new card.<br>Enter "stand" to finalize your hand.`;
    } else if (input == "stand") {
      if (
        playerCardsTemp[0].name == "Ace" &&
        playerCardsTemp[1].name == "Ace"
      ) {
        var cardPoints = 21;
        cardNumberPerPlayer.push(cardPoints);
      } else if (
        (playerCardsTemp[0].name == "Ace" &&
          (playerCardsTemp[1].name == "Jack" ||
            playerCardsTemp[1].name == "Queen" ||
            playerCardsTemp[1].name == "King" ||
            playerCardsTemp[1].name == 10)) ||
        (playerCardsTemp[1].name == "Ace" &&
          (playerCardsTemp[0].name == "Jack" ||
            playerCardsTemp[0].name == "Queen" ||
            playerCardsTemp[0].name == "King" ||
            playerCardsTemp[0].name == 10))
      ) {
        var cardPoints = 21;
        cardNumberPerPlayer.push(cardPoints);
      } else {
        var cardIndex = 0;
        var cardPoints = 0;

        while (cardIndex < playerCardsTemp.length) {
          cardPoints += playerCardsTemp[cardIndex].rank;
          cardIndex += 1;
        }

        cardNumberPerPlayer.push(cardPoints);
      }

      var nextPlayer = (currentPlayer % numOfPlayers) + 1;

      if (currentPlayer == numOfPlayers) {
        currentPlayer = 1;
        gameMode = GAME_MODE_LEADERBOARD;
        return `Please click on "Submit" to see who won!`;
      }

      currentPlayer = nextPlayer;
      gameMode = GAME_MODE_DECISION;
      return `Hi ${
        userName[currentPlayer - 1]
      }, please click on "Submit" to view your cards!`;
    }
  } else if (gameMode == GAME_MODE_ACE_POST_DECISION) {
    if (input == "hit") {
      var card = newDeck.pop();
      playerCardsTemp.push(card);

      var cardIndex = 0;
      var number = 1;
      var standardOutput = "";

      while (cardIndex < playerCardsTemp.length) {
        standardOutput = `${standardOutput}(${number}) ${playerCardsTemp[cardIndex].name} of ${playerCardsTemp[cardIndex].suitPic}<br>`;

        cardIndex += 1;
        number += 1;
      }

      return `Hi ${
        userName[currentPlayer - 1]
      }, here are your cards:<br><br>${standardOutput}<br>Enter "hit" to draw a new card.<br>Enter number to finalize your hand.`;
    } else if (Number(input)) {
      if (Number.isNaN(Number(input)) == true) {
        return `Please enter a number!`;
      }

      var cardPoints = Number(input);
      cardNumberPerPlayer.push(cardPoints);

      var nextPlayer = (currentPlayer % numOfPlayers) + 1;

      if (currentPlayer == numOfPlayers) {
        currentPlayer = 1;
        gameMode = GAME_MODE_LEADERBOARD;
        return `Please click on "Submit" to see who won!`;
      }

      currentPlayer = nextPlayer;
      gameMode = GAME_MODE_DECISION;
      return `Hi ${
        userName[currentPlayer - 1]
      }, please click on "Submit" to view your cards!`;
    }
  } else if (gameMode == GAME_MODE_LEADERBOARD) {
    cardNumberPerPlayer = cardNumberPerPlayer.map(Number);
    var returnIndexOfHighestNumber = Number(
      indexOfMaxInArray(cardNumberPerPlayer)
    );

    if (cardNumberPerPlayer[returnIndexOfHighestNumber] <= 21) {
      incrementNumberOfWinsOfEachPlayer(returnIndexOfHighestNumber);
      countWagerPointSystem(returnIndexOfHighestNumber);

      var playerWhoWon = returnIndexOfHighestNumber + 1;

      var number = 1;
      var index = 0;
      var output = "";

      while (index < cardNumberPerPlayer.length) {
        output = `${output}Player ${number} card number: ${cardNumberPerPlayer[index]}<br>`;
        number += 1;
        index += 1;
      }

      var number1 = 1;
      var index1 = 0;
      var output1 = "";

      while (index1 < wagerPointSystem.length) {
        output1 = `${output1}Player ${number1} card number: ${wagerPointSystem[index1]}<br>`;
        number1 += 1;
        index1 += 1;
      }

      gameMode = GAME_MODE_WAGER;

      return `${
        userName[playerWhoWon - 1]
      } won!<br><br>${output}<br>${output1}<br>Enter the preferred wager points if you would like tocontinue the game!`;
    } else if (cardNumberPerPlayer[returnIndexOfHighestNumber] > 21) {
      var defaultState = true;

      while (defaultState == true) {
        if (returnIndexOfHighestNumber > -1) {
          cardNumberPerPlayer.splice(returnIndexOfHighestNumber, 1);
        }

        var returnIndexOfHighestNumber = Number(
          indexOfMaxInArray(cardNumberPerPlayer)
        );

        if (cardNumberPerPlayer[returnIndexOfHighestNumber] <= 21) {
          var playerWhoWon = returnIndexOfHighestNumber + 1;
          defaultstate = false;
        }
      }

      var number = 1;
      var index = 0;
      var output = "";

      while (index < cardNumberPerPlayer.length) {
        output = `${output}Player ${number} card number: ${cardNumberPerPlayer[index]}<br>`;
        number += 1;
        index += 1;
      }

      var number1 = 1;
      var index1 = 0;
      var output1 = "";

      while (index1 < wagerPointSystem.length) {
        output1 = `${output1}Player ${number1} card number: ${wagerPointSystem[index1]}<br>`;
        number1 += 1;
        index1 += 1;
      }

      gameMode = GAME_MODE_WAGER;

      return `${
        userName[playerWhoWon - 1]
      } won!<br><br>${output}<br>${output1}<br>Enter the preferred wager points if you would like tocontinue the game!`;
    }
  }
};
