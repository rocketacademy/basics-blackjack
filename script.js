// global variables
var MODE = 'HOW MANY PLAYERS?';
var myOutputValue = '';
var playerArray = [];
var computerArray = [];
var playerPoints = 0;
var computerPoints = 0;
var playerHand1 = [];
var playerHand2 = [];
var playerName = '';
var betAmount = 0;
var players = [];
// var singleCard = {
//   name: 'jack',
//   suit: 'hearts',
//   rank: 11,
// };

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
  var i = 1;
  while (i <= whoseArray.length) {
    message += `${who}'s card ${i}: ${whoseArray[i].name} of ${whoseArray[i].suit}<br>`;
    i += 1;
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
    MODE = 'CARDS ARE PICKED';
    result += 'BUST !! ' + who + ' LOSES';
  }

  if (whosePoints == 21) {
    MODE = 'CARDS ARE PICKED';
    result += 'BLACKJACK !! ' + who + ' WINS !! ';
  }

  if (calcPoints(playerHand2) != 0) {
    MODE = 'THERE IS A SECOND HAND!';
  }
  result += '<br><br>Enter your bet amount and click submit to start another game';
  return result;
};

// calculating whether/ how much the player wins
var calcAndDisplayPlayerBet = function () {
  var result;
  if (playerPoints == 21) {
    result = `<br>You win $${betAmount / 2}`;
  } else if (playerPoints > 21 || computerPoints == 21) {
    result = '<br>You lose your bet';
  } else if (computerPoints > 21) {
    result = `<br>You win $${betAmount}`;
  }

  betAmount = 0;

  return result;
};

// displaying the computer's first card
var displayComputerCard1 = function () {
  return `Computer's card 1: ${computerArray[0].name} of ${computerArray[0].suit}`;
};

// displaying player/ computer cards and points
var displayCardsAndPoints = function (who, whoseArray, whosePoints) {
  return displayCards(who, whoseArray) + displayPoints(whosePoints);
};

// clear player and computer arrays
var clearArraysAndPoints = function () {
  computerArray = [];
  playerArray = [];
  computerPoints = 0;
  playerPoints = 0;
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

  // asking how many people are playing
  // generate 2 cards for each player + the dealer
  // playerCardsArray = [ [player1Cards], [player2Cards], etc...]
  // need to keep track of which player is playing, currentPlayer ? change mode?
  //
  //

  if (MODE == 'WHAT IS YOUR NAME?') {
    // asking for player name
    if (input != '') {
      playerName = input;
      myOutputValue = `Hi ${playerName} 🙂, please enter your bet amount 💰`;
      MODE = 'CARDS ARE PICKED';
    } else {
      myOutputValue = 'Please enter your name';
    }

    return myOutputValue;
  }

  if (MODE == 'CARDS ARE PICKED') {
    betAmount = Number(input);
    // checking if input is a number
    if (isNaN(betAmount) == true || betAmount == '') {
      myOutputValue = 'Please enter a number';
      return myOutputValue;
    }

    // obtaining player cards
    playerArray.push(cards.pop());
    playerArray.push(cards.pop());

    myOutputValue = displayCards(playerName, playerArray);
    // if player draws 2 cards of the same rank, cards can be split
    if (playerArray[0].rank == playerArray[1].rank) {
      myOutputValue += `<br>Would you like to split your cards ${playerName}?<br>Please enter 'y' or 'n' `;
      MODE = 'TO SPLIT OR NOT TO SPLIT';
    } else {
      // regular play continues
      myOutputValue += `<br>${playerName}, click 'submit' to continue`;
      MODE = 'CALCULATING PLAYER POINTS';
    }
    return myOutputValue;
  }

  // change mode, enable player to make choice, split or not to split
  if (MODE == 'TO SPLIT OR NOT TO SPLIT') {
    // player chooses to split their hand
    if (input == 'y') {
      playerHand1.push(playerArray[0]);
      playerHand1.push(cards.pop());

      playerHand2.push(playerArray[1]);
      playerHand2.push(cards.pop());

      playerArray = playerHand1;

      myOutputValue = `${playerName}, this is your first hand<br><br>
     ${displayCards(playerName, playerArray)}<br>
      Click 'submit' to continue`;
      MODE = 'CALCULATING PLAYER POINTS';

      // player chooses not to split their hand
    } else if (input == 'n') {
      myOutputValue = `${playerName}, you chose to keep your original cards<br>
      ${displayCards(playerName, playerArray)}<br>
      Click 'submit' to continue`;
      MODE = 'CALCULATING PLAYER POINTS';

      // error message
    } else {
      myOutputValue = 'Please enter either \'y\' or \'n\'';
    }

    return myOutputValue;
  }

  // calculating player points
  if (MODE == 'CALCULATING PLAYER POINTS') {
    playerPoints = calcPoints(playerArray);

    // checking for blackjack or bust (conditions where game ends)
    if (playerPoints == 21 || playerPoints > 21) {
      myOutputValue = blackjackOrBust(playerName, playerArray, playerPoints);
      // calculate if/ amount player wins
      myOutputValue += calcAndDisplayPlayerBet();

      // clear data for next game
      clearArraysAndPoints();
      return myOutputValue;
    }

    // obtaining computer cards
    computerArray.push(cards.pop());
    computerArray.push(cards.pop());

    // display player's cards, and computer's first card
    myOutputValue = `${displayCardsAndPoints(playerName, playerArray, playerPoints)}<br><br>
    ${displayComputerCard1()}<br><br><br>
    Would you like to 'hit' or 'stand'?`;

    // change mode to allow player to hit or stand
    MODE = 'PLAYER CHOICE, HIT OR STAND?';

    return myOutputValue;
  }

  // change mode, enable player to make choice, hit or stand
  if (MODE == 'PLAYER CHOICE, HIT OR STAND?') {
    if (!(input == 'hit' || input == 'stand')) {
      myOutputValue = 'Please enter \'hit\' or \'stand\'';
      return myOutputValue;
    }
    // if player chooses 'hit', another card is drawn and added to existing cards
    if (input == 'hit') {
      playerArray.push(cards.pop());

      // calculate points with extra card
      playerPoints = calcPoints(playerArray);

      // check for blackjack or bust (game ends), calculate if/ how much player wins
      if (playerPoints == 21 || playerPoints > 21) {
        myOutputValue = blackjackOrBust(playerName, playerArray, playerPoints);
        myOutputValue += calcAndDisplayPlayerBet();
        clearArraysAndPoints();
      } else {
        // or else player can choose whether or not to draw another card
        myOutputValue = displayCardsAndPoints(playerName, playerArray, playerPoints) + '<br><br>Would you like to \'hit\' or \'stand\' ?';
      }
      return myOutputValue;
    }

    // if player chooses not to draw another card, it becomes the computer's turn (change mode)
    if (input == 'stand') {
      // calculate computer points with variable Ace
      computerPoints = calcPoints(computerArray);

      // check if computer has got blackjack or bust (game ends)
      if (computerPoints == 21 || computerPoints > 21) {
        myOutputValue = blackjackOrBust('Dealer', computerArray, computerPoints);
        // check if/ how much player wins
        myOutputValue += calcAndDisplayPlayerBet();
        clearArraysAndPoints();
      } else {
        MODE = 'COMPUTER CHOICE';
        myOutputValue = `You currently have :<br><br>
        ${displayCardsAndPoints(playerName, playerArray, playerPoints)}<br><br>
        ${displayCardsAndPoints('Dealer', computerArray, computerPoints)}<br><br>
        It is now the computer's turn<br>
        Click submit to continue`;
      }
      return myOutputValue;
    }
  }

  // mode changed, computer's turn (hit or stand)
  if (MODE == 'COMPUTER CHOICE') {
    // if computer hand is <= 16, computer has to hit
    if (computerPoints <= 16) {
      // adding the extra card to computer's array
      computerArray.push(cards.pop());

      // calculating computer's points with the extra card
      computerPoints = calcPoints(computerArray);

      myOutputValue = 'Dealer hits!<br><br>';

      // checking if computer has bust or blackjack (game ends)
      if (computerPoints == 21 || computerPoints > 21) {
        myOutputValue += blackjackOrBust('Dealer', computerArray, computerPoints);
        // calculate if/ how much player wins
        myOutputValue += calcAndDisplayPlayerBet();
        clearArraysAndPoints();

        // if computer points is still <= 16, computer has to draw another card
      } else if (computerPoints <= 16) {
        myOutputValue += `${displayCardsAndPoints('Dealer', computerArray, computerPoints)}<br><br>
        Dealer has to hit again. Click submit to continue`;
        MODE = 'COMPUTER CHOICE';
      } else {
        myOutputValue += `${displayCardsAndPoints('Dealer', computerArray, computerPoints)}<br><br>
        Click submit to see who wins`;
        MODE = 'DETERMINE WINNER';
      }

      return myOutputValue;
    }
    // if computer hand is >= 17, computer has to stand
    if (computerPoints >= 17) {
      myOutputValue = `Dealer stands<br>${displayCardsAndPoints('Dealer', computerArray, computerPoints)}<br><br>
      Click submit to see who wins`;
      MODE = 'DETERMINE WINNER';
      return myOutputValue;
    }
  }

  // determining the winner
  if (MODE == 'DETERMINE WINNER') {
    myOutputValue = `${displayCardsAndPoints('Dealer', computerArray, computerPoints)}<br><br>
    ${displayCardsAndPoints(playerName, playerArray, playerPoints)}<br><br>`;

    if (playerPoints > computerPoints) {
      myOutputValue += `${playerName}, YOU WIN !! 🏆<br>
      You won $${betAmount}`;
    } else if (computerPoints > playerPoints) {
      myOutputValue += 'You LOSE !!<br>You lose your bet';
    } else {
      myOutputValue += 'It\'s a TIE !!';
    }

    myOutputValue += '<br>Enter your bet amount and click submit to start another game';

    // game ends, clear arrays and points for the next game
    clearArraysAndPoints();
    playerHand1 = [];
    MODE = 'CARDS ARE PICKED';

    // checking if a second hand exists
    if (calcPoints(playerHand2) != 0) {
      MODE = 'THERE IS A SECOND HAND!';
    }
    return myOutputValue;
  }

  if (MODE == 'THERE IS A SECOND HAND!') {
    // if the second hand does exist, we need 2 copies of playerHand2
    playerArray = playerHand2.slice();
    console.log(playerArray);
    playerPoints = calcPoints(playerArray);
    myOutputValue = `${playerName}, this is your second hand<br><br>
      ${displayCards(playerName, playerArray)}<br><br>
      Click 'submit' to see continue`;
    MODE = 'CALCULATING PLAYER POINTS';
    // clear playerHand2 so that the game can terminate
    playerHand2 = [];
    return myOutputValue;
  }
};
