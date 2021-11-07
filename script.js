var main = function (input) {
  var myOutputValue = "hello world";
  return myOutputValue;
};
var pokerCardDeck = [];
var gameMode = "Prepare Deck";
var myOutputValue = "";
var players = 0;
var player1 = [];
var computer = [];

var main = function (input) {
  if (gameMode == "Prepare Deck") {
    // make Card Deck & store in global variable pokercardDeck
    pokerCardDeck = makeDeck();
    // shuffle pokercardDeck
    pokerCardDeck = shuffleCards(pokerCardDeck);
    // switch gameModes
    gameMode = "Enquire No. of Players";
    // Output msg - see line:XXX for statements
    myOutputValue = enquirePlayers;
  } else if (gameMode == "Enquire No. of Players") {
    // assign no. of players in global variable players
    players = input;
    // gameMode for 1 Player
    if (players == 1) {
      gameMode = "Deal cards for 1 player";
      myOutputValue = dealCardsMsg;
      // gameMode for more than 1 Player
    } else if (players > 1) {
      gameMode = "Deal cards for more than 1 player";
      myOutputValue = dealCardsMsg;
    }
    // deal cards for 1 Player
  } else if (gameMode == "Deal cards for 1 player") {
    player1 = dealCards();
    computer = dealCards();
    // calling add rank function
    player1TotalScore = addScore(player1);
    // calling msg to show cards
    showMsg = playerShowCardsMsg(player1);
    myOutputValue = `${showMsg} <br> your total points: ${player1TotalScore} <br> ${playerOptions}`;
    //Have to change gameModes because if not, gameMode will always be "Deal cards for 1 player". Even if input is "hit", it won't proceed.
    gameMode = "break";
    // changing gameModes from hit and stand
  } else if (input == "hit") {
    gameMode = "hit";
    if (player1TotalScore < 22) {
      // Do not have to necessarily store in a variable because your hit function directly returns to global variable playerX array
      hit(player1);
      // Calling add score function
      player1TotalScore = addScore(player1);
      // calling msg to show cards
      showMsg = playerShowCardsMsg(player1);
      myOutputValue = `${showMsg} <br> your total points: ${player1TotalScore} <br> ${playerOptions}`;
    }
    if (player1TotalScore >= 22) {
      gameMode = "end of player1's turn";
      myOutputValue = `${showMsg} <br> your total points: ${player1TotalScore} <br> You are BUST! <br> ${computerTurn}`;
    }
  } else if (input == "stand") {
    gameMode = "end of player1's turn";
    myOutputValue = `${computerTurn}`;
  } else if (gameMode == "end of player1's turn") {
    // Calling add score function
    computerTotalScore = addScore(computer);
    // calling msg to show cards
    showMsg = playerShowCardsMsg(computer);
    // dealer to always hit at 13
    if (computerTotalScore < 14) {
      myOutputValue = `${showMsg} <br> dealer's total points: ${computerTotalScore} <br> Since it's less than 13 computer is going to hit! Click submit to see what card the dealer draws!`;
      gameMode = "dealer hit";
      // dealer to stand if score is more or equals to 14
    } else if (computerTotalScore >= 14) {
      myOutputValue = `${showMsg} <br> dealer's total points: ${computerTotalScore} <br> Since it's more than 13 computer is going to stand!`;
      gameMode = "end of game";
    }
  } else if (gameMode == "dealer hit") {
    hit(computer);
    // Calling add score function
    computerTotalScore = addScore(computer);
    // calling msg to show cards
    showMsg = playerShowCardsMsg(computer);
    if (computerTotalScore < 14) {
      myOutputValue = `${showMsg} <br> dealer's total points: ${computerTotalScore} <br> Since it's less than 13 computer is going to hit! Click submit to see what card the dealer draws!`;
      gameMode = "dealer hit";
    } else if (computerTotalScore >= 14) {
      myOutputValue = `${showMsg} <br> dealer's total points: ${computerTotalScore} <br> Since it's more than 13 computer is going to stand!`;
      gameMode = "end of game";
    }
  } else if (gameMode == "end of game") {
    //call compare results function
    myOutputValue = compareResults(
      playerName1,
      player1TotalScore,
      computerTotalScore
    );
  }
  return myOutputValue;
};

//hit function; need to pop another card and push into globalPlayerHand array
var hit = function (playerNo) {
  return playerNo.push(pokerCardDeck.pop());
};

//statements
var enquirePlayers =
  "Deck is shuffled! Please input no. of players. please input '1' if you are the only player. Computer will always play as the dealer!";
var dealCardsMsg = "Click submit to deal the cards to all the players!";
var playerShowCardsMsg = function (playerNo) {
  var counter = 0;
  var myOutputValue = "Here are the cards drawn: <br>";
  while (counter < playerNo.length) {
    myOutputValue += `${playerNo[counter].name} of ${playerNo[counter].suit} <br>`;
    counter += 1;
  }
  return myOutputValue;
};
var playerOptions =
  "Please input 'hit' if you would like to draw another card; or 'stand' if you would like to keep your hand!";
var computerTurn = "It's the dealer's turn now!";
var playerName1 = "player 1";

// function to compare results
var compareResults = function (
  playerName,
  playerNoTotalResults,
  dealerTotalResults
) {
  var myOutputValue = "";
  //Draw condition : both player and dealer busts
  if (playerNoTotalResults > 21 && dealerTotalResults > 21) {
    myOutputValue = `${playerName} has drawn with dealer!`;
    // Draw condition : player and dealer has same score
  } else if (playerNoTotalResults == dealerTotalResults) {
    myOutputValue = `${playerName} has drawn with dealer!`;
    // player win condition : player did not bust, but dealer bust
  } else if (dealerTotalResults > 21 && playerNoTotalResults <= 21) {
    myOutputValue = `${playerName} has won against the dealer!`;
    // player win condition : player has more score than dealer, Note that this is placed after the else if where player did not bust, but dealer did
  } else if (playerNoTotalResults > 21 && dealerTotalResults <= 21) {
    myOutputValue = `${playerName} has lost against the dealer!`;
    // player lose condition : player has less score than dealer
  } else if (playerNoTotalResults > dealerTotalResults) {
    myOutputValue = `${playerName} has won against the dealer!`;
    // player lose condition : player bust, but dealer did not
  } else if (playerNoTotalResults < dealerTotalResults) {
    myOutputValue = `${playerName} has lost against the dealer!`;
  }
  return myOutputValue;
};

// Add score function
var addScore = function (playerNo) {
  var counter = 0;
  var totalScore = 0;
  while (counter < playerNo.length) {
    totalScore += playerNo[counter].score;
    counter += 1;
  }
  return totalScore;
};

// Deal 2 Cards function
var dealCards = function () {
  var playerHand = [];
  for (var i = 0; i < 2; i++) {
    playerHand.push(pokerCardDeck.pop());
  }
  return playerHand;
};

// Get random number
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffling function
var shuffleCards = function (pokerCardDeck) {
  var currentIndex = 0;
  while (currentIndex < pokerCardDeck.length) {
    //generates a random number from 0 to 51
    var randomIndex = getRandomIndex(pokerCardDeck.length);
    //selects a random card
    var randomCard = pokerCardDeck[randomIndex];
    //selects a card in a position (in increasing order, starting from 0) to swap
    var currentCard = pokerCardDeck[currentIndex];
    //swap
    pokerCardDeck[currentIndex] = randomCard;
    pokerCardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return pokerCardDeck;
};

//Make Deck Function
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts ♥️", "diamonds ♦️", "clubs ♣️", "spades ♠️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    var scoreCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        scoreCounter = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        scoreCounter = 10;
      } else if (cardName == 13) {
        cardName = "king";
        scoreCounter = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: scoreCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
      scoreCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};
