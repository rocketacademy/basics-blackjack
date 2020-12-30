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

// checking for blackjack or bust (conditions where game ends)
var checkForBlackjackOrBust = function (who, whoseArray, whosePoints) {
  var result = `${displayCards(who, whoseArray)} ${displayPoints(whoseArray)}<br><br>`;
  if (whosePoints > 21) {
    result += 'BUST !! ' + who + ' LOSES';
  }
  if (whosePoints == 21) {
    result += 'BLACKJACK !! ' + who + ' WINS !! ';
  }
  return result;
};

// displaying the computer's first card
var displayComputerCard1 = function () {
  return `Computer card 1: ${computerArray[0].name} of ${computerArray[0].suit}`;
};

// calculating player/ computer points
var calcSumCards = function (whoseArray) {
  var sumCards = 0;
  var j = 0;
  while (j < whoseArray.length) {
    sumCards += whoseArray[j].rank;
    j += 1;
  }
  return sumCards;
};

// displaying player/ computer points
var displayPoints = function (whoseArray) {
  return 'Total points: ' + calcSumCards(whoseArray);
};

// displaying player/ computer cards and points
var displayCardsAndPoints = function (who, whoseArray) {
  return displayCards(who, whoseArray) + displayPoints(whoseArray); };

var main = function (input) {
  var cards = shuffleCards(makeDeck());

  if (MODE == 'CARDS ARE PICKED') {
    // obtaining player cards
    playerArray.push(cards.pop());
    playerArray.push(cards.pop());

    // calculating player points
    playerPoints = calcSumCards(playerArray);

    // checking for blackjack or bust (conditions where game ends)
    if (playerPoints == 21 || playerPoints > 21) {
      myOutputValue = checkForBlackjackOrBust('Player', playerArray, playerPoints);
      return myOutputValue;
    }

    // obtaining computer cards
    computerArray.push(cards.pop());
    computerArray.push(cards.pop());

    // change mode to allow player to hit or stand
    MODE = 'PLAYER CHOICE, HIT OR STAND?';

    // display player's cards, and computer's first card
    myOutputValue = `${displayCardsAndPoints('Player', playerArray)}<br><br>
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
      playerPoints = calcSumCards(playerArray);
      // check for blackjack or bust (game ends)
      if (playerPoints == 21 || playerPoints > 21) {
        myOutputValue = checkForBlackjackOrBust('Player', playerArray, playerPoints);
      } else {
        // or else player can choose whether or not to draw another card
        myOutputValue = displayCardsAndPoints('Player', playerArray) + '<br><br>Would you like to \'hit\' or \'stand\' ?';
      }
      return myOutputValue;
    }

    // if player chooses not to draw another card, it becomes the computer's turn (change mode)
    if (input == 'stand') {
      computerPoints = calcSumCards(computerArray);
      // check if computer has got blackjack or bust
      if (computerPoints == 21 || computerPoints > 21) {
        myOutputValue = checkForBlackjackOrBust('Computer', computerArray, computerPoints);
      } else {
        MODE = 'COMPUTER CHOICE';
        myOutputValue = `You currently have :<br><br>
        ${displayCardsAndPoints('Player', playerArray)}<br><br>
        ${displayCardsAndPoints('Computer', computerArray)}<br><br>
        It is now the computer's turn`;
      }
      return myOutputValue;
    }
  }

  if (MODE == 'COMPUTER CHOICE') {
    // if computer hand is <= 16, computer has to hit
    if (computerPoints <= 16) {
      computerArray.push(cards.pop());
      MODE = 'DETERMINE WINNER';
      myOutputValue = `Computer hits!<br>
      ${displayCardsAndPoints('Computer', computerArray)}`;
      return myOutputValue;
    }
    // if computer hand is >= 17, computer has to stand
    if (computerPoints >= 17) {
      MODE = 'DETERMINE WINNER';
      myOutputValue = `Computer stands<br>
      ${displayCardsAndPoints('Computer', computerArray)}`;
      return myOutputValue;
    }
  }

  if (MODE == 'DETERMINE WINNER') {
    playerPoints = calcSumCards(playerArray);
    computerPoints = calcSumCards(computerArray);

    // checking if computer has bust or blackjack
    if (computerPoints == 21 || computerPoints > 21) {
      myOutputValue = checkForBlackjackOrBust('Computer', computerArray, computerPoints);
      return myOutputValue;
    }

    // checking to see if player or computer wins
    myOutputValue = `${displayCardsAndPoints('Player', playerArray)}<br><br>
    ${displayCardsAndPoints('Computer', computerArray)}<br><br>`;

    if (playerPoints > computerPoints) {
      myOutputValue += 'YOU WIN !!';
    } else if (computerPoints > playerPoints) {
      myOutputValue += 'COMPUTER WINS !!';
    } else {
      myOutputValue += 'It\'s a TIE !!';
    }

    return myOutputValue;
  }
};
  // comparing player and computer cards
//   if (MODE == 'DETERMINE WINNER') {
//     myOutputValue = checkForWinningConditions() + `<br>Enter 'y' to play again,
//     or 'n' to exit the game`;
//     if (input == 'y' || input == 'n') {
//       if (input == 'y') {
//         playerArray = [];
//         computerArray = [];
//         MODE = 'CARDS ARE PICKED';
//       } else if (input == 'n') {
//         myOutputValue =
//       }
//     }

//     return myOutputValue;
//   }
