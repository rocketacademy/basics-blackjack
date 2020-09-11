var deck = [
  {
    name: 'ace',
    suit: 'hearts',
    rank: 1,
  }, {
    name: '2',
    suit: 'hearts',
    rank: 2,
  }, {
    name: '3',
    suit: 'hearts',
    rank: 3,
  }, {
    name: '4',
    suit: 'hearts',
    rank: 4,
  }, {
    name: '5',
    suit: 'hearts',
    rank: 5,
  }, {
    name: '6',
    suit: 'hearts',
    rank: 6,
  }, {
    name: '7',
    suit: 'hearts',
    rank: 7,
  }, {
    name: '8',
    suit: 'hearts',
    rank: 8,
  }, {
    name: '9',
    suit: 'hearts',
    rank: 9,
  }, {
    name: '10',
    suit: 'hearts',
    rank: 10,
  }, {
    name: 'jack',
    suit: 'hearts',
    rank: 10,
  }, {
    name: 'queen',
    suit: 'hearts',
    rank: 10,
  }, {
    name: 'king',
    suit: 'hearts',
    rank: 10,
  }, {
    name: 'ace',
    suit: 'diamonds',
    rank: 1,
  }, {
    name: '2',
    suit: 'diamonds',
    rank: 2,
  }, {
    name: '3',
    suit: 'diamonds',
    rank: 3,
  }, {
    name: '4',
    suit: 'diamonds',
    rank: 4,
  }, {
    name: '5',
    suit: 'diamonds',
    rank: 5,
  }, {
    name: '6',
    suit: 'diamonds',
    rank: 6,
  }, {
    name: '7',
    suit: 'diamonds',
    rank: 7,
  }, {
    name: '8',
    suit: 'diamonds',
    rank: 8,
  }, {
    name: '9',
    suit: 'diamonds',
    rank: 9,
  }, {
    name: '10',
    suit: 'diamonds',
    rank: 10,
  }, {
    name: 'jack',
    suit: 'diamonds',
    rank: 10,
  }, {
    name: 'queen',
    suit: 'diamonds',
    rank: 10,
  }, {
    name: 'king',
    suit: 'diamonds',
    rank: 10,
  }, {
    name: 'ace',
    suit: 'clubs',
    rank: 1,
  }, {
    name: '2',
    suit: 'clubs',
    rank: 2,
  }, {
    name: '3',
    suit: 'clubs',
    rank: 3,
  }, {
    name: '4',
    suit: 'clubs',
    rank: 4,
  }, {
    name: '5',
    suit: 'clubs',
    rank: 5,
  }, {
    name: '6',
    suit: 'clubs',
    rank: 6,
  }, {
    name: '7',
    suit: 'clubs',
    rank: 7,
  }, {
    name: '8',
    suit: 'clubs',
    rank: 8,
  }, {
    name: '9',
    suit: 'clubs',
    rank: 9,
  }, {
    name: '10',
    suit: 'clubs',
    rank: 10,
  }, {
    name: 'jack',
    suit: 'clubs',
    rank: 10,
  }, {
    name: 'queen',
    suit: 'clubs',
    rank: 10,
  }, {
    name: 'king',
    suit: 'clubs',
    rank: 10,
  }, {
    name: 'ace',
    suit: 'spades',
    rank: 1,
  }, {
    name: '2',
    suit: 'spades',
    rank: 2,
  }, {
    name: '3',
    suit: 'spades',
    rank: 3,
  }, {
    name: '4',
    suit: 'spades',
    rank: 4,
  }, {
    name: '5',
    suit: 'spades',
    rank: 5,
  }, {
    name: '6',
    suit: 'spades',
    rank: 6,
  }, {
    name: '7',
    suit: 'spades',
    rank: 7,
  }, {
    name: '8',
    suit: 'spades',
    rank: 8,
  }, {
    name: '9',
    suit: 'spades',
    rank: 9,
  }, {
    name: '10',
    suit: 'spades',
    rank: 10,
  }, {
    name: 'jack',
    suit: 'spades',
    rank: 10,
  }, {
    name: 'queen',
    suit: 'spades',
    rank: 10,
  }, {
    name: 'king',
    suit: 'spades',
    rank: 10,
  },
];
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
var shuffleCards = function (cards) {
  var index = 0;
  while (index < deck.length) {
    var randomIndex = getRandomIndex(deck.length);
    var currentItem = deck[index];
    var randomItem = deck[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};
// Sum of the cards in hand
// Loop goes through array, and adds up the ranks of each object
var getSum = function (hand) {
  var counter = 0;
  var sum = 0;
  while (counter < hand.length) {
    // When loop runs, capture object.rank and add it to sum
    sum = sum + hand[counter].rank;
    counter = counter + 1;
  }
  return sum;
};
// Check if there is an ace in hand. If there is, check for sum is 11 for blackjack
var blackJack = function (hand) {
  if (hand[0].name == 'ace' || hand[1].name == 'ace') {
    // Assume aces is 1
    if (getSum(hand) == 11) {
      return true;
    }
    return false;
  }
  return false;
};
// Check if there is an ace in hand. If there is, return true, else return false
var checkAce = function (hand) {
  var counter = 0;
  while (counter < hand.length) {
    if (hand[counter].name == 'ace') {
      return true;
    }
    counter = counter + 1;
  }
  return false;
};
// Deck is shuffled.
var gameDeck = shuffleCards(deck);
var playerHand = [];
var computerHand = [];

var drawCard = function (hand) {
  var card = gameDeck.pop();
  hand.push(card);
};
// To show all cards on hand
var showHand = function (hand) {
  var cards = '';
  var index = 0;
  while (index < hand.length) {
    // for visual purpose
    cards = cards + hand[index].name.toString() + hand[index].suit.toString() + ' ';
    index = index + 1;
  }
  return cards;
};

// Start game
var main = function () {
  // Deck is shuffled.
  gameDeck = shuffleCards(deck);
  playerHand = [];
  computerHand = [];
  var myOutputValue = '';
  // User clicks submit button to start game and deal 2 cards.
  drawCard(playerHand);
  console.log('player cards(' + getSum(playerHand) + '): ' + showHand(playerHand));
  drawCard(computerHand);
  console.log('computer cards(' + getSum(computerHand) + '): ' + showHand(computerHand));
  drawCard(playerHand);
  console.log('player cards(' + getSum(playerHand) + '): ' + showHand(playerHand));
  drawCard(computerHand);
  console.log('computer cards(' + getSum(computerHand) + '): ' + showHand(computerHand));
  // The cards are displayed to the user.
  myOutputValue = myOutputValue + 'player hand(' + getSum(playerHand) + '): ' + showHand(playerHand) + '<br>computer hand(' + getSum(computerHand) + '): ' + showHand(computerHand);
  // The cards are analyzed for any game winning conditions. (Blackjack)
  if (blackJack(playerHand) == true) {
    myOutputValue = myOutputValue + 'You win! Black jack!';
  }
  if (blackJack(computerHand) == true) {
    myOutputValue = myOutputValue + 'You lose! Computer got blackjack!';
  }
  return myOutputValue;
};

// User looks at cards, then chooses to hit or stand
// User chooses to hit then player is given another card
var hit = function () {
  var myOutputValue = '';
  drawCard(playerHand);
  // Check if the player has an ace in hand or not. If there is an ace, sum can be +1 or +11
  if (checkAce(playerHand) == true) {
    var maxValue = getSum(playerHand) + 10;
    console.log('player cards(' + getSum(playerHand) + ' or ' + maxValue + '): ' + showHand(playerHand));
    myOutputValue = myOutputValue + 'player hand(' + getSum(playerHand) + ' or ' + maxValue + '): ' + showHand(playerHand);
  } else {
    console.log('player cards(' + getSum(playerHand) + '): ' + showHand(playerHand));
    myOutputValue = myOutputValue + 'player hand(' + getSum(playerHand) + '): ' + showHand(playerHand);
  }
  // If playerHand is greater than 21, then bust -> game over
  if (getSum(playerHand) > 21) {
    return myOutputValue + 'You lose!';
  }
  // Otherwise, show user's hand. Ask them to hit or stand
  return myOutputValue;
};

// User chooses to stand
// Computer decides to hit or stand; compare scores
var stand = function () {
  var myOutputValue = '';
  var computerHandSum = getSum(computerHand);
  var drawDecision = true;
  // If computerHand is less then 17 or 17, then computer must keep hitting
  // computer hand is 18 or above, computer will stand
  while (computerHandSum <= 17) {
    // If there is an ace, count sum with ace as 11
    // If sum is more than 17 and less than 22, computer stands
    if (checkAce(computerHand) == true) {
      var maxValue = computerHandSum + 10;
      if (maxValue > 17 && maxValue < 22) {
        computerHandSum = maxValue;
        drawDecision = false;
      }
    }
    // Else computer keeps drawing and treat ace as 1
    if (drawDecision == true) {
      drawCard(computerHand);
      computerHandSum = getSum(computerHand);
    }
    console.log('computer cards(' + computerHandSum + '): ' + showHand(computerHand));
  }
  myOutputValue = myOutputValue + 'player hand(' + getSum(playerHand) + '): ' + showHand(playerHand) + '<br>computer hand(' + computerHandSum + '): ' + showHand(computerHand);

  // If computerHand is greater than 21, then bust -> player win (no ace or ace is treated as 1)
  if (computerHandSum > 21) {
    myOutputValue = myOutputValue + 'You win!';
    return myOutputValue;
  }
  // If player decides to use ace as 11, sum player cards with aces as 11
  var playerHandSum = getSum(playerHand);
  if (checkAce(playerHandSum) == true && playerHandSum + 10 <= 21) {
    playerHandSum = playerHandSum + 10;
  }
  // If playerHand is greater than computerHand but less than or equal to 21, player wins
  if (computerHandSum < playerHandSum) {
    myOutputValue = myOutputValue + 'You win!';
  } else if (computerHandSum == playerHandSum) {
    myOutputValue = myOutputValue + 'You draw with the computer! Try again!';
  } else { // Else, computer wins
    myOutputValue = myOutputValue + 'You lose!';
  }
  return myOutputValue;
};
