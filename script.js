// -------------------------------------------------------------------------------------------------
// PROGRAM LOGIC:
// 1. User clicks submit button to deal 2 cards at the start of the game. Move on.
// 2. Ask if player wants to split, stand or hit if there are 2 of the same kind of cards.
//  2.1 If split, split cards into 2 piles and deal 1 card to each pile.
//    2.1.1 computer draw a card in attempt to tie if the player gets blackjack for either hand.
//    2.1.2 If player dont get blackjack, move on.
//  2.2 If stand, computer draws if the computer's points are less than 17 or lower than the player's highest score. Move on.
//  2.3 If hit, deal cards then computer draw a card in attempt to tie if the player gets blackjack for either hand. Move on.
// 3. Calculate points in player's and computer's hands.
// 4. Add player's hands cards to myOutputValue and find player's highest score .
// 5. Analyse who wins:
//  5.1 If both get 21/over 21/(if mode is stand and both points are equal), its a tie. Move on.
//  5.2 If player gets 21 or computer gets over 21, player wins. Move on.
//  5.3 If computer gets 21 or player gets over 21, computer wins. Move on.
//  5.4 else continue the game by asking for player if he wants to hit or stand. Move on.
// 6. Display myOutputValue:
//  6.1 If reached from 5.4: Display 5.4. If player inputs stand, go to 2.2. If hit, go to 2.3.
//  6.2 Else: display who wins, computer's and player's hands, and their points.
// -------------------------------------------------------------------------------------------------

// Create a deck.
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];

  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);

      // make jack, queen and king rank 10
      if (card.rank >= 11) {
        card.rank = 10;
      }

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
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
};

// Deck is shuffled.
var deck = shuffleCards(makeDeck());

// Decks used for testing code
var playerDeck = [
  {
    name: 'eight',
    suit: 'hearts',
    rank: 8,
  },
  {
    name: 'eight',
    suit: 'spades',
    rank: 8,
  },
  {
    name: 'two',
    suit: 'hearts',
    rank: 2,
  },
  {
    name: 'two',
    suit: 'spades',
    rank: 2,
  },
  {
    name: 'jack',
    suit: 'hearts',
    rank: 10,
  },
  {
    name: 'jack',
    suit: 'spades',
    rank: 10,
  },
  {
    name: 'ace',
    suit: 'hearts',
    rank: 1,
  },
  {
    name: 'nine',
    suit: 'hearts',
    rank: 9,
  },
  {
    name: 'nine',
    suit: 'spades',
    rank: 9,
  },
];
var computerDeck = [
  {
    name: 'two',
    suit: 'hearts',
    rank: 2,
  },
  {
    name: 'nine',
    suit: 'spades',
    rank: 9,
  },
  {
    name: 'jack',
    suit: 'spades',
    rank: 10,
  },
];

// Create empty hand for player and computer
var playerFirstHand = [];
var playerSecondHand = [];
var computerHand = [];

// function to check for ace
var checkAce = function (hand) {
  var result = false;
  for (let i = 0; i < hand.length; i += 1) {
    if (hand[i].name == 'ace') {
      result = true;
    }
  }
  return result;
};

// Function to calculate points in hand
var getPoints = function (hand) {
  var points = 0;
  for (let i = 0; i < hand.length; i += 1) {
    points = Number(points) + hand[i].rank;
  }

  // if the hand has at least 1 ace and points <= 11, change points of 1 ace to 11 by adding 10 points
  if (points <= 11) {
    if (checkAce(hand)) {
      points += 10;
    }
  }

  return points;
};

// display hand
var displayHand = function (hand) {
  var result = '';
  for (let i = 0; i < hand.length; i += 1) {
    result += hand[i].name + ' of ' + hand[i].suit + ', ';
  }

  return result;
};

// create mode
var mode;

// Variables to store points
var computerPoints = 0;
var playerFirstHandPoints = 0;
var playerSecondHandPoints = 0;
var playerHighestPoints = 0;

// function that returns true if there are 2 cards of the same rank
var checkPair = function (hand) {
  var result = false;
  if (hand[0].name == hand[1].name) {
    result = true;
  }
  return result;
};

var checkedPairBefore = false;

var main = function (input) {
  var myOutputValue = '';

  mode = input;
  console.log('mode: ' + mode);

  if (mode == '') {
    if (playerFirstHand.length > 0) {
      // If player accidentally click submit without an input when it is not the start of the game
      myOutputValue += 'You have entered an invalid word. Please enter \'hit\' or \'stand\' or \'split\' <br><br>';

      if (playerSecondHand.length > 0) {
        myOutputValue += 'Your 1st hand: ' + displayHand(playerFirstHand) + '<br>1st hand points = ' + playerFirstHandPoints;
        myOutputValue += '<br>Your 2nd hand: ' + displayHand(playerSecondHand) + '<br>2nd hand points = ' + playerSecondHandPoints;
      } else {
        myOutputValue += 'Your current hand: ' + displayHand(playerFirstHand) + '<br>Your points = ' + playerHighestPoints;
      }
      return myOutputValue;
    }

    // 1. User clicks submit button to deal 2 cards at the start of the game.
    console.log('game starts');
    playerFirstHand.push(deck.pop());
    computerHand.push(deck.pop());
    playerFirstHand.push(deck.pop());
    computerHand.push(deck.pop());
    playerFirstHandPoints = getPoints(playerFirstHand);
    computerPoints = getPoints(computerHand);
  } else if (mode == 'stand') {
    // 2.2 Computer draws if the computer's points are less than 17 or lower than the player's highest score. Move on.
    while (computerPoints < 17) {
      computerHand.push(deck.pop());
      computerPoints = getPoints(computerHand);
    }

    while (computerPoints < playerHighestPoints) {
      computerHand.push(deck.pop());
      computerPoints = getPoints(computerHand);
    }
  } else if (mode == 'hit') {
    //  2.3 If hit, deal cards then computer draw a card in attempt to tie if the player gets blackjack for either hand. Move on.

    // Deal cards
    playerFirstHand.push(deck.pop());
    playerFirstHandPoints = getPoints(playerFirstHand);

    // Deal cards to a second hand if there is a split
    if (playerSecondHand.length > 0) {
      playerSecondHand.push(deck.pop());
      playerSecondHandPoints = getPoints(playerSecondHand);
    }

    computerPoints = getPoints(computerHand);

    // computer draw a card in attempt to tie if the player gets blackjack for either hand.
    while ((playerFirstHandPoints == 21 || playerSecondHandPoints == 21)
    && (computerPoints < playerFirstHandPoints || computerPoints < playerSecondHandPoints)
    && (computerPoints < 21)) {
      computerHand.push(deck.pop());
      computerPoints = getPoints(computerHand);
    }
  } else if (mode == 'split') {
    // 2.1 If split, split cards into 2 piles and deal 1 card to each pile.
    // divide player's hand into 2 if there are 2 cards in his hand, if not send error message.
    if (playerFirstHand.length == 2) {
      playerSecondHand = playerFirstHand.splice(0, 1);

      // draw cards for player
      playerFirstHand.push(deck.pop());
      playerSecondHand.push(deck.pop());
      playerFirstHandPoints = getPoints(playerFirstHand);
      playerSecondHandPoints = getPoints(playerSecondHand);

      // 2.1.1 computer draw a card in attempt to tie if the player gets blackjack for either hand.
      while ((playerFirstHandPoints == 21 || playerSecondHandPoints == 21)
      && (computerPoints < playerFirstHandPoints || computerPoints < playerSecondHandPoints)
      && (computerPoints < 21)) {
        computerHand.push(deck.pop());
        computerPoints = getPoints(computerHand);
      }
    } else {
      return 'Are you a troll? Please enter \'hit\' or \'stand\'';
    }
  } else {
    // When player inputs an invalid word at the start or during the game
    if (playerFirstHand.length > 0) {
      // If player accidentally click submit without an input when it is not the start of the game
      myOutputValue += 'You have entered an invalid word. Please enter \'hit\' or \'stand\' or \'split\'<br><br>';

      if (playerSecondHand.length > 0) {
        myOutputValue += 'Your 1st hand: ' + displayHand(playerFirstHand) + '<br>1st hand points = ' + playerFirstHandPoints;
        myOutputValue += '<br>Your 2nd hand: ' + displayHand(playerSecondHand) + '<br>2nd hand points = ' + playerSecondHandPoints;
      } else {
        myOutputValue += 'Your current hand: ' + displayHand(playerFirstHand) + '<br>Your points = ' + playerFirstHandPoints;
      }
      return myOutputValue;
    }

    if (playerFirstHand.length == 0) {
      return 'You have entered an invalid word. Please click the submit button without any input to start the game.';
    }
  }

  // 2. Ask if player wants to split, stand or hit if there are 2 of the same kind of cards.
  if (checkPair(playerFirstHand) == true) {
    // if player had already mentioned not to split, don't ask the player to split again
    if (checkedPairBefore == false) {
      checkedPairBefore = true;
      return 'You have two of the same kind of cards: ' + displayHand(playerFirstHand) + '.<br><br>Input \'split\' to split your cards or \'hit\' to draw a card or \'stand\' to end your turn.';
    }
  }

  // 3. calculate points in player and computer hands
  playerFirstHandPoints = getPoints(playerFirstHand);
  computerPoints = getPoints(computerHand);
  console.log('player first hand points: ');
  console.log(playerFirstHandPoints);
  console.log('computer points');
  console.log(computerPoints);
  if (playerSecondHand.length > 0) {
    playerSecondHandPoints = getPoints(playerSecondHand);
    console.log('player second hand points: ');
    console.log(playerSecondHandPoints);
  }

  // 4. Add player's hands cards to myOutputValue and find player's highest score .
  if (playerSecondHand.length > 0) {
    myOutputValue += 'Your 1st hand: ' + displayHand(playerFirstHand) + '<br>1st hand points = ' + playerFirstHandPoints;
    myOutputValue += '<br>Your 2nd hand: ' + displayHand(playerSecondHand) + '<br>2nd hand points = ' + playerSecondHandPoints;

    // Find higher score of the player's hands
    if (playerFirstHandPoints > playerSecondHandPoints && playerFirstHandPoints <= 21) {
      playerHighestPoints = playerFirstHandPoints;
    } else if (playerSecondHandPoints > playerFirstHandPoints && playerSecondHandPoints <= 21) {
      playerHighestPoints = playerSecondHandPoints;
    } else if (playerFirstHandPoints == playerSecondHandPoints) {
      playerHighestPoints = playerFirstHandPoints;
    } else {
      playerHighestPoints = 22;
    }
  } else {
    myOutputValue += 'Your current hand: ' + displayHand(playerFirstHand);

    playerHighestPoints = playerFirstHandPoints;
    myOutputValue += '<br>Your points = ' + playerHighestPoints;
  }

  // 5. Analyse who wins:
  //  5.1 If both get 21/over 21/(if mode is stand and both points are equal), its a tie. Move on.
  //  5.2 If player gets 21 or computer gets over 21, player wins. Move on.
  //  5.3 If computer gets 21 or player gets over 21, computer wins. Move on.
  //  5.4 else continue the game by asking for player if he wants to hit or stand. Move on.
  if ((playerHighestPoints == 21 && computerPoints == 21) || (playerHighestPoints > 21 && computerPoints > 21) || (mode == 'stand' && playerHighestPoints == computerPoints)) {
    myOutputValue += '<br><br>Computer hand: ' + displayHand(computerHand) + '<br>Computer points = ' + computerPoints + '<br><br>It\'s a tie!';
  } else if (playerHighestPoints == 21 || computerPoints > 21 || (mode == 'stand' && playerHighestPoints > computerPoints)) {
    myOutputValue += '<br><br>Computer hand: ' + displayHand(computerHand) + '<br>Computer points = ' + computerPoints + '<br><br>You win!';
  } else if (computerPoints == 21 || playerHighestPoints > 21 || (mode == 'stand' && playerHighestPoints < computerPoints)) {
    myOutputValue += '<br><br>Computer hand: ' + displayHand(computerHand) + '<br>Computer points = ' + computerPoints + '<br><br>Computer wins!';
  } else {
    myOutputValue += '<br><br>Please enter \'hit\' to deal 1 more card to yourself or \'stand\' if you are satisfied with your cards.';
  }

  // 6. Display myOutputValue
  return myOutputValue;
};
