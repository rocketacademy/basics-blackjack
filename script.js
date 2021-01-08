// global variables
var MODE = 'HOW MANY PLAYERS?';
var myOutputValue = '';
var computerArray = [];
var playerPoints = 0;
var computerPoints = 0;
var playersCardsIndex;
var currentPlayer;
var playersNamesArray = [];
var playersBetAmounts = [];
var playersPointsArray = [];

/* *********
************
************
************ LIST OF FUNCTIONS
************
************
********* */

// deck of cards, presented in an object
var makeDeck = function () {
  var deck = [];
  var suits = ['♥️', '♦️', '♣️', '♠️'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = '🅰️';
      } else if (cardName == 11) {
        cardName = '🧝🏼';
      } else if (cardName == 12) {
        cardName = '👸🏼';
      } else if (cardName == 13) {
        cardName = '🤴🏼';
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

// shuffle card function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var currentIndex = 0;

  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[currentIndex];
    var randomItem = cards[randomIndex];

    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;

    currentIndex = currentIndex + 1;
  }

  return cards;
};

// displaying player/ computer cards
var displayCards = function (who, whoseArray) {
  var message = '';
  for (var i = 0; i < whoseArray.length; i++) {
    message += `${who}'s card ${i + 1}: ${whoseArray[i].name} of ${whoseArray[i].suit}<br>`;
  }

  return message;
};

// displaying player/ computer points
var displayPoints = function (whosePoints) {
  return 'Total points: ' + whosePoints;
};

// calculating player/ computer points
var calcPoints = function (whoseArray) {
  var sumCards = 0;
  var j = 0;
  while (j < whoseArray.length) {
    if (whoseArray[j].rank == 11 || whoseArray[j].rank == 12 || whoseArray[j].rank == 13) {
      whoseArray[j].rank = 10;
    }

    sumCards += whoseArray[j].rank;
    j += 1;
  }

  // if player/ computer points is <= 11 and there is an Ace present, 10 is added to score
  var k = 0;
  while (k < whoseArray.length) {
    if (sumCards <= 11) {
      if (whoseArray[k].rank == 1) {
        sumCards += 10;
      }
    }
    k += 1;
  }
  return sumCards;
};

// checking for blackjack or bust (conditions where game ends)
var blackjackOrBust = function (who, whoseArray, whosePoints) {
  var result = `${displayCards(who, whoseArray)} ${displayPoints(whosePoints)}<br><br>`;
  if (whosePoints > 21) {
    result += 'BUST !! ' + who + ' LOSES';
  } else if (whosePoints == 21) {
    result += 'BLACKJACK !! ' + who + ' WINS !! ';
  }

  return result;
};

// calculating whether/ how much the player wins
var calcAndDisplayPlayerBet = function () {
  var result;
  if (playerPoints == 21) {
    result = `<br>You win $${playersBetAmounts[currentPlayer] / 2}<br>`;
  } else if (playerPoints > 21 || computerPoints == 21) {
    result = '<br>You lose your bet<br>';
  } else if (computerPoints > 21) {
    result = `<br>You win $${playersBetAmounts[currentPlayer]}<br>`;
  }

  return result;
};

// displaying the computer's first card
var displayComputerCard1 = function () {
  return `Dealer's card 1: ${computerArray[0].name} of ${computerArray[0].suit}`;
};

// displaying player/ computer cards and points
var displayCardsAndPoints = function (who, whoseArray, whosePoints) {
  return displayCards(who, whoseArray) + displayPoints(whosePoints);
};

// happens if player gets >= 21
var happensAfterBlackjackOrBust = function () {
  var result = blackjackOrBust(playersNamesArray[currentPlayer], playersCardsIndex[currentPlayer], playerPoints);
  result += calcAndDisplayPlayerBet();
  playersCardsIndex[currentPlayer] = 0;
  currentPlayer += 1;
  // if there are no other it is the dealer's turn
  if (playersCardsIndex[currentPlayer] == undefined) {
    MODE = 'DEALER PLAYS';
    result += '<br>It is the Dealer\'s turn<br>Click submit to continue';
  } else {
    // if there are still other players
    MODE = 'WHAT IS YOUR NAME?';
    result += `It is player ${currentPlayer + 1}'s turn<br>
          Player ${currentPlayer + 1}, please enter your name`;
  }

  return result;
};

// displaying player's cards and asking if the player would like to draw another card
var choosingHitOrStand = function () {
  var result = `<br><br>${displayCardsAndPoints(playersNamesArray[currentPlayer], playersCardsIndex[currentPlayer], playerPoints)}<br><br>
    Would you like to 'hit' or 'stand'?`;

  MODE = 'PLAYER CHOICE, HIT OR STAND?';

  return result;
};
/// /////
/// /////
/// /////
/// /////
/// /////
/// ///// START OF GAME LOGIC
/// /////
/// /////
/// /////
/// /////
/// /////

var main = function (input) {
  var cards = shuffleCards(makeDeck());

  if (MODE == 'HOW MANY PLAYERS?') {
    var numPlayers = Number(input);
    // checking if input is a number
    if (isNaN(numPlayers) == true) {
      myOutputValue = 'Please enter a number';
      return myOutputValue;
    }
    // generate an array containing 2 cards per player (variable number of players)
    playersCardsIndex = [];
    for (var playerIndex = 0; playerIndex < numPlayers; playerIndex++) {
      var individualCardsIndex = [];
      // generating individual player's cards and storing them in an array
      for (var cardIndex = 0; cardIndex < 2; cardIndex++) {
        individualCardsIndex.push(cards.pop());
      }
      playersCardsIndex.push(individualCardsIndex);
    }

    // generating the computer's cards
    computerArray.push(cards.pop());
    computerArray.push(cards.pop());

    currentPlayer = 0;
    MODE = 'WHAT IS YOUR NAME?';
    myOutputValue = `Player ${currentPlayer + 1}, please enter your name`;

    return myOutputValue;
  }

  if (MODE == 'WHAT IS YOUR NAME?') {
    // storing player's name in an array
    var playerName = input;

    // checking that player enters a name
    if (input == '') {
      // error message if player does not enter a name
      myOutputValue = 'Please enter your name';
      return myOutputValue;
    }

    playersNamesArray.push(playerName);

    MODE = 'ENTER BET AMOUNT';
    // asking for player's bet amount
    myOutputValue = `Hi ${playerName} 🙂, please enter the amount you wish to bet 💰`;

    return myOutputValue;
  }

  if (MODE == 'ENTER BET AMOUNT') {
    // storing player's bet amount in an array
    var betAmount = Number(input);

    if (isNaN(betAmount) == true || betAmount == '') {
      myOutputValue = 'Please enter a valid amount';
      return myOutputValue;
    }

    playersBetAmounts.push(betAmount);

    // calculating player's points and storing them in an array
    playerPoints = calcPoints(playersCardsIndex[currentPlayer]);
    playersPointsArray.push(playerPoints);

    // displaying the computer's first card
    myOutputValue = displayComputerCard1();

    // if player gets blackjack or bust
    if (playerPoints == 21 || playerPoints > 21) {
      myOutputValue += happensAfterBlackjackOrBust();
    } else {
      // asking player if he wants to draw another card
      myOutputValue += choosingHitOrStand();
    }

    return myOutputValue;
  }

  if (MODE == 'PLAYER CHOICE, HIT OR STAND?') {
    if (!(input == 'hit' || input == 'stand')) {
      myOutputValue = 'Please enter \'hit\' or \'stand\'';
      return myOutputValue;
    }
    // if player chooses 'hit', another card is drawn and added to existing cards
    if (input == 'hit') {
      playersCardsIndex[currentPlayer].push(cards.pop());

      // calculate points with extra card
      playerPoints = calcPoints(playersCardsIndex[currentPlayer]);
      playersPointsArray[currentPlayer] = playerPoints;
      // check for blackjack or bust, calculate if/ how much player wins
      if (playerPoints == 21 || playerPoints > 21) {
        myOutputValue = happensAfterBlackjackOrBust();
      } else {
        myOutputValue = choosingHitOrStand();
      }

      return myOutputValue;
    }

    // if player chooses not to draw another card
    if (input == 'stand') {
      // if player is the last player, it is the Dealer's turn
      if (playersCardsIndex[currentPlayer + 1] == undefined) {
        MODE = 'DEALER PLAYS';
        myOutputValue = 'It is the Dealer\'s turn<br>Click submit to continue';
      } else {
        // if there are other players left
        MODE = 'WHAT IS YOUR NAME?';
        myOutputValue = `${displayCardsAndPoints(playersNamesArray[currentPlayer], playersCardsIndex[currentPlayer], playerPoints)}<br><br>
    It is now player ${currentPlayer + 2}'s turn<br>Player ${currentPlayer + 2}, please enter your name`;
        currentPlayer += 1;
      }

      return myOutputValue;
    }
  }

  if (MODE == 'DEALER PLAYS') {
    computerPoints = calcPoints(computerArray);

    // check if computer has got blackjack or bust
    if (computerPoints >= 21) {
      myOutputValue = `<br><br>${blackjackOrBust('Dealer', computerArray, computerPoints)}<br><br>Click submit to see the results`;
      MODE = 'DETERMINE WINNERS';
      // if computer has < 16 points
    } else if (computerPoints <= 16) {
      myOutputValue = `${displayCardsAndPoints('Dealer', computerArray, computerPoints)}<br><br>Dealer has to hit. Click submit to continue`;
      computerArray.push(cards.pop());
      // if computer points are > 16 but < 21, and not 21
    } else {
      myOutputValue = `${displayCardsAndPoints('Dealer', computerArray, computerPoints)}<br><br>Click submit to see the results`;
      MODE = 'DETERMINE WINNERS';
    }
    return myOutputValue;
  }

  // displaying results and calculating player winnings
  if (MODE == 'DETERMINE WINNERS') {
    myOutputValue = `Computer points: ${computerPoints}<br><br>`;
    var i = 0;
    while (i < playersPointsArray.length) {
      myOutputValue += `${playersNamesArray[i]}'s points: ${playersPointsArray[i]}<br>
      You bet $${playersBetAmounts[i]}`;
      if (playersPointsArray[i] > 21 || computerPoints == 21) {
        myOutputValue += `<br>${playersNamesArray[i]}, you lost your bet 😢<br><br>`;
      } else if (playersPointsArray[i] == 21) {
        myOutputValue += `<br>${playersNamesArray[i]}, YOU WIN 🤩 !!<br>You win $${playersBetAmounts[i] / 2}<br><br>`;
      } else if (playersPointsArray[i] < computerPoints && computerPoints <= 21) {
        myOutputValue += `<br>${playersNamesArray[i]}, You lost your bet 😢<br><br>`;
      } else if (playersPointsArray[i] > computerPoints && computerPoints <= 21) {
        myOutputValue += `<br>${playersNamesArray[i]}, YOU WIN 🤩 !!<br>You win $${playersBetAmounts[i]}<br><br>`;
      } else if (computerPoints > 21 && playersPointsArray[i] < 21) {
        myOutputValue += `<br>${playersNamesArray[i]}, YOU WIN 🤩 !!<br>You win $${playersBetAmounts[i]}<br><br>`;
      } else {
        myOutputValue += `<br>${playersNamesArray[i]}, it's a tie<br><br>`;
      }

      i += 1;
    }

    myOutputValue += '<br>Game over!<br>Enter the number of players to start a new game';
    MODE = 'HOW MANY PLAYERS?';
    // clear arrays for next game
    playersCardsIndex = [];
    playersNamesArray = [];
    playersBetAmounts = [];
    playersPointsArray = [];
    computerArray = [];
    return myOutputValue;
  }
};
