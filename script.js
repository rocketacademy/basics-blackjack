// There will be only two players. One human and one computer.
// The computer will always be the dealer. The dealer has to hit if their hand is below 17.
// The player who is closer to 21 wins the hand. Aces can be 1 or 11.

// Deck is shuffled.
// User clicks submit button to deal cards.
// The cards are analysed for any game winning conditions. (E.g. Blackjack)
// The cards are displayed to the user.
// Then begins a new action, where the user has to decide whether to hit or stand, using the submit button to submit their choice.
// When the user makes a decision the cards are analysed for winning conditions. They are also analysed for losing conditions, since it's possible for any player to lose now.
// The computer also decides to hit or stand automatically based on game rules.
// Either the game ends or continues.

// global variables
var MODE = 'CARDS ARE PICKED';
var myOutputValue = '';
var playerArray = [];
var computerArray = [];
var playerPoints = 0;
var computerPoints = 0;

// deck of cards, presented in an object
var makeDeck = function () {
  var deck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = 'Ace';
      } else if (cardName == 11) {
        cardName = 'Jack';
      } else if (cardName == 12) {
        cardName = 'Queen';
      } else if (cardName == 13) {
        cardName = 'King';
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

// displaying player/ computer cards helper function
var displayCards = function (who, whoseArray) {
  var message = '';
  var i = 0;
  while (i < whoseArray.length) {
    message += `${who} card ${i + 1}: ${whoseArray[i].name} of ${whoseArray[i].suit}<br>`;
    i += 1;
  }

  return message;
};

// displaying player/ computer points
var displayPoints = function (whosePoints) {
  return 'Total points: ' + whosePoints;
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

  result += '<br>Click submit to start a new game';
  return result;
};

// displaying the computer's first card
var displayComputerCard1 = function () {
  return `Computer card 1: ${computerArray[0].name} of ${computerArray[0].suit}`;
};

// calculating player/ computer points
var calcPoints = function (whoseArray) {
  var sumCards = 0;
  var j = 0;
  while (j < whoseArray.length) {
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

var main = function (input) {
  var cards = shuffleCards(makeDeck());

  if (MODE == 'CARDS ARE PICKED') {
    // obtaining player cards
    playerArray.push(cards.pop());
    playerArray.push(cards.pop());

    // calculating player points
    playerPoints = calcPoints(playerArray);

    // checking for blackjack or bust (conditions where game ends), clear data for next game
    if (playerPoints == 21 || playerPoints > 21) {
      myOutputValue = blackjackOrBust('Player', playerArray, playerPoints);
      clearArraysAndPoints();
      return myOutputValue;
    }

    // obtaining computer cards
    computerArray.push(cards.pop());
    computerArray.push(cards.pop());

    // change mode to allow player to hit or stand
    MODE = 'PLAYER CHOICE, HIT OR STAND?';

    // display player's cards, and computer's first card
    myOutputValue = `${displayCardsAndPoints('Player', playerArray, playerPoints)}<br><br>
    ${displayComputerCard1()}<br><br><br>
    Would you like to hit or stand?`;
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

      // check for blackjack or bust (game ends)
      if (playerPoints == 21 || playerPoints > 21) {
        myOutputValue = blackjackOrBust('Player', playerArray, playerPoints);
        clearArraysAndPoints();
      } else {
        // or else player can choose whether or not to draw another card
        myOutputValue = displayCardsAndPoints('Player', playerArray, playerPoints) + '<br><br>Would you like to \'hit\' or \'stand\' ?';
      }
      return myOutputValue;
    }

    // if player chooses not to draw another card, it becomes the computer's turn (change mode)
    if (input == 'stand') {
      // calculate computer points with variable Ace
      computerPoints = calcPoints(computerArray);

      // check if computer has got blackjack or bust (game ends)
      if (computerPoints == 21 || computerPoints > 21) {
        myOutputValue = blackjackOrBust('Computer', computerArray, computerPoints);
        clearArraysAndPoints();
      } else {
        MODE = 'COMPUTER CHOICE';
        myOutputValue = `You currently have :<br><br>
        ${displayCardsAndPoints('Player', playerArray, playerPoints)}<br><br>
        ${displayCardsAndPoints('Computer', computerArray, computerPoints)}<br><br>
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

      myOutputValue = 'Computer hits!<br><br>';
      // checking if computer has bust or blackjack (game ends)
      if (computerPoints == 21 || computerPoints > 21) {
        myOutputValue += blackjackOrBust('Computer', computerArray, computerPoints);
        clearArraysAndPoints();
      } else {
        myOutputValue += `${displayCardsAndPoints('Computer', computerArray, computerPoints)}<br><br>
        Click submit to see who wins`;
        MODE = 'DETERMINE WINNER';
      }
    }

    // if computer hand is >= 17, computer has to stand
    if (computerPoints >= 17) {
      myOutputValue = `Computer stands<br>${displayCardsAndPoints('Computer', computerArray, computerPoints)}<br><br>
      Click submit to see who wins`;
      MODE = 'DETERMINE WINNER';
    }

    return myOutputValue;
  }

  // determining the winner
  if (MODE == 'DETERMINE WINNER') {
    myOutputValue = `${displayCardsAndPoints('Computer', computerArray, computerPoints)}<br><br>
    ${displayCardsAndPoints('Player', playerArray, playerPoints)}<br><br>`;

    if (playerPoints > computerPoints) {
      myOutputValue += 'YOU WIN !!';
    } else if (computerPoints > playerPoints) {
      myOutputValue += 'COMPUTER WINS !!';
    } else {
      myOutputValue += 'It\'s a TIE !!';
    }

    myOutputValue += '<br>Click submit to start a new game';
    MODE = 'CARDS ARE PICKED';
    clearArraysAndPoints();

    return myOutputValue;
  }
};
