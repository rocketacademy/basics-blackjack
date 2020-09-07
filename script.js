var deck = [
  {
    name: 'ace',
    suit: 'hearts',
    rank: 1
  }, {
    name: '2',
    suit: 'hearts',
    rank: 2
  }, {
    name: '3',
    suit: 'hearts',
    rank: 3
  }, {
    name: '4',
    suit: 'hearts',
    rank: 4
  }, {
    name: '5',
    suit: 'hearts',
    rank: 5
  }, {
    name: '6',
    suit: 'hearts',
    rank: 6
  }, {
    name: '7',
    suit: 'hearts',
    rank: 7
  }, {
    name: '8',
    suit: 'hearts',
    rank: 8
  }, {
    name: '9',
    suit: 'hearts',
    rank: 9
  }, {
    name: '10',
    suit: 'hearts',
    rank: 10
  }, {
    name: 'jack',
    suit: 'hearts',
    rank: 10
  }, {
    name: 'queen',
    suit: 'hearts',
    rank: 10
  }, {
    name: 'king',
    suit: 'hearts',
    rank: 10
  }, {
    name: 'ace',
    suit: 'diamonds',
    rank: 1
  }, {
    name: '2',
    suit: 'diamonds',
    rank: 2
  }, {
    name: '3',
    suit: 'diamonds',
    rank: 3
  }, {
    name: '4',
    suit: 'diamonds',
    rank: 4
  }, {
    name: '5',
    suit: 'diamonds',
    rank: 5
  }, {
    name: '6',
    suit: 'diamonds',
    rank: 6
  }, {
    name: '7',
    suit: 'diamonds',
    rank: 7
  }, {
    name: '8',
    suit: 'diamonds',
    rank: 8
  }, {
    name: '9',
    suit: 'diamonds',
    rank: 9
  }, {
    name: '10',
    suit: 'diamonds',
    rank: 10
  }, {
    name: 'jack',
    suit: 'diamonds',
    rank: 10
  }, {
    name: 'queen',
    suit: 'diamonds',
    rank: 10
  }, {
    name: 'king',
    suit: 'diamonds',
    rank: 10
  }, {
    name: 'ace',
    suit: 'clubs',
    rank: 1
  }, {
    name: '2',
    suit: 'clubs',
    rank: 2
  }, {
    name: '3',
    suit: 'clubs',
    rank: 3
  }, {
    name: '4',
    suit: 'clubs',
    rank: 4
  }, {
    name: '5',
    suit: 'clubs',
    rank: 5
  }, {
    name: '6',
    suit: 'clubs',
    rank: 6
  }, {
    name: '7',
    suit: 'clubs',
    rank: 7
  }, {
    name: '8',
    suit: 'clubs',
    rank: 8
  }, {
    name: '9',
    suit: 'clubs',
    rank: 9
  }, {
    name: '10',
    suit: 'clubs',
    rank: 10
  }, {
    name: 'jack',
    suit: 'clubs',
    rank: 10
  }, {
    name: 'queen',
    suit: 'clubs',
    rank: 10
  }, {
    name: 'king',
    suit: 'clubs',
    rank: 10
  }, {
    name: 'ace',
    suit: 'spades',
    rank: 1
  }, {
    name: '2',
    suit: 'spades',
    rank: 2
  }, {
    name: '3',
    suit: 'spades',
    rank: 3
  }, {
    name: '4',
    suit: 'spades',
    rank: 4
  }, {
    name: '5',
    suit: 'spades',
    rank: 5
  }, {
    name: '6',
    suit: 'spades',
    rank: 6
  }, {
    name: '7',
    suit: 'spades',
    rank: 7
  }, {
    name: '8',
    suit: 'spades',
    rank: 8
  }, {
    name: '9',
    suit: 'spades',
    rank: 9
  }, {
    name: '10',
    suit: 'spades',
    rank: 10
  }, {
    name: 'jack',
    suit: 'spades',
    rank: 10
  }, {
    name: 'queen',
    suit: 'spades',
    rank: 10
  }, {
    name: 'king',
    suit: 'spades',
    rank: 10
  }
];

// Homework here!  Understand  this
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size)
};
var shuffleCards = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
}

var cards = shuffleCards(deck);

var playerHand = [];
var cpuHand = [];
var gameMode = 'deal';


var main = function (input) {
  var myOutputValue = '';
  var playerPoints = 0;
  var cpuPoints = 0;

  console.log('game mode is ' + gameMode)

  // dealing cards
  if (gameMode == 'deal') {
    var dealIndex = 0;
    while (dealIndex < 2) {
      playerHand.push(cards.pop());
      cpuHand.push(cards.pop());
      dealIndex = dealIndex + 1;
    }

    console.log('cpuHand')
    console.log(cpuHand)

    console.log('playerHand')
    console.log(playerHand)

    myOutputValue = 'You cards are ' + playerHand[0].name + ',' + playerHand[1].name;

    // checking for blackjack
    if ((playerHand[0].rank == 1 && playerHand[1].rank == 10) || (playerHand[0].rank == 10 && playerHand[1].rank == 1)) {
      myOutputValue = 'Blackjack you win! ' + myOutputValue;
      gameMode = 'gameOver';
    } else if ((cpuHand[0].rank == 1 && cpuHand[1].rank == 10) || (cpuHand[0].rank == 10 && cpuHand[1].rank == 1)) {
      myOutputValue = 'Blackjack you lose! ' + myOutputValue;
      gameMode = 'gameOver';
    } else {
      gameMode = 'gameStart';
    }
    console.log('game mode is ' + gameMode)
  } else if (gameMode == 'gameStart') {

    myOutputValue = 'Your hand is';
    console.log('playerHand')
    console.log(playerHand)
    console.log('cpuHand')
    console.log(cpuHand)

    // when user hits
    if (input == 'hit') {
      playerHand.push(cards.pop());
    }

    // count and output playerPoints
    var playerCountIndex = 0;
    while (playerHand.length > playerCountIndex) {
      playerPoints = playerPoints + playerHand[playerCountIndex].rank;
      myOutputValue = myOutputValue + ' ' + playerHand[playerCountIndex].name;
      playerCountIndex = playerCountIndex + 1;
    }
    console.log('playerPoints ' + playerPoints)

    // count cpu points
    var cpuCountIndex = 0;
    while (cpuHand.length > cpuCountIndex) {
      cpuPoints = cpuPoints + cpuHand[cpuCountIndex].rank;
      cpuCountIndex = cpuCountIndex + 1;
    }
    console.log('cpuPoints ' + cpuPoints)


    // cpu behavior
    if (cpuPoints < 17) {
      cpuHand.push(cards.pop());
    }

    // checking for burst
    if (playerPoints > 21) {
      myOutputValue = 'You lost! You went over 21! ' + myOutputValue;
      gameMode == 'gameOver';
    }
    if (cpuPoints > 21) {
      myOutputValue = 'You won! CPU went over 21! ' + myOutputValue;
      gameMode == 'gameOver';
    }

    // when user stands
    if (input == 'stand') {
      if (playerPoints > cpuPoints) {
        myOutputValue = 'You won! ' + myOutputValue;
        gameMode == 'gameOver';
      } else if (cpuPoints > playerPoints) {
        myOutputValue = 'You lost! ' + myOutputValue;
        gameMode == 'gameOver';
      } else {
        myOutputValue = 'You tied! ' + myOutputValue;
        gameMode == 'gameOver';
      }
    }

  } else if (gameMode == 'gameOver') {
    myOutputValue = "Game over, please refresh browser to play again!";
  }
  return myOutputValue;
};