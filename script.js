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
    name: 'ace',
    suit: 'hearts',
    rank: 1,
  },
  {
    name: 'king',
    suit: 'spades',
    rank: 10,
  },
  {
    name: 'jack',
    suit: 'spades',
    rank: 10,
  },
];
var computerDeck = [
  {
    name: 'ace',
    suit: 'hearts',
    rank: 1,
  },
  {
    name: 'king',
    suit: 'spades',
    rank: 10,
  },
  {
    name: 'jack',
    suit: 'spades',
    rank: 10,
  },
];

// Create empty hand for player and computer
var playerHand = [];
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
  result = '';
  for (let i = 0; i < hand.length; i += 1) {
    result += hand[i].name + ' of ' + hand[i].suit + ' ';
  }

  return result;
};

// create mode
var mode;

// Variables to store points
var computerPoints;
var playerPoints;

// --------------------------------------------------------------------------------------------
// User clicks submit button to deal cards.
// The cards are analyzed for any game winning conditions. (Blackjack)
// The cards are displayed to the user.
// Then begins a new action, where the user has to decide something: do they hit or stand.
// The computer also decides to hit or stand.
// ----------------------------------------------------------------------------------------------

var main = function (input) {
  var myOutputValue = '';

  mode = input;
  console.log('mode: ' + mode);

  if (mode == '') {
    // User clicks submit button to deal 2 cards at the start of the game
    if (playerHand.length > 0) {
      // If player accidentally click submit without an input
      return 'You have entered an invalid word. Please enter \'hit\' or \'stand\' <br><br> Your current hand: ' + displayHand(playerHand) + '<br>Your points = ' + playerPoints;
    }
    console.log('game starts');
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
  } else if (mode == 'stand') {
    // Computer draws if the computer's points are less than 17 or lower than the player.
    while (computerPoints < 17) {
      computerHand.push(deck.pop());
      computerPoints = getPoints(computerHand);
    }

    while (computerPoints < playerPoints) {
      computerHand.push(deck.pop());
      computerPoints = getPoints(computerHand);
    }
  } else if (mode == 'hit') {
    // Deal cards
    playerHand.push(deck.pop());
    playerPoints = getPoints(playerHand);
    computerPoints = getPoints(computerHand);
    while (playerPoints == 21 && computerPoints < playerPoints) {
      computerHand.push(deck.pop());
      computerPoints = getPoints(computerHand);
    }
  } else {
    if (playerHand.length > 0) {
      // If player accidentally click submit with an invalid input
      return 'You have entered an invalid word. Please enter \'hit\' or \'stand\' <br><br> Your current hand: ' + displayHand(playerHand) + '<br>Your points = ' + playerPoints;
    }

    if (playerHand.length == 0) {
      return 'You have entered an invalid word. Please click the submit button without any input to start the game.';
    }
  }

  // calculate points in player and computer hand
  playerPoints = getPoints(playerHand);
  computerPoints = getPoints(computerHand);
  console.log('player points: ');
  console.log(playerPoints);
  console.log('computer points');
  console.log(computerPoints);

  // display hand cards to player and total score.
  myOutputValue += 'Your current hand: ' + displayHand(playerHand);

  myOutputValue += '<br>Your points = ' + playerPoints;

  // check for winning conditions
  // If player and computer both gets 21, or both get over 21, or (if mode is stand and computer and player's points are the same), its a tie
  // If player gets 21 or computer gets over 21, player wins
  // If computer gets 21 or player gets over 21, computer wins
  // else continue the game by asking for player if he wants to hit or stand
  if ((playerPoints == 21 && computerPoints == 21) || (playerPoints > 21 && computerPoints > 21) || (mode == 'stand' && playerPoints == computerPoints)) {
    myOutputValue += '<br><br>Computer points = ' + computerPoints + '<br>Computer hand: ' + displayHand(computerHand) + '<br><br>It\'s a tie!';
  } else if (playerPoints == 21 || computerPoints > 21 || (mode == 'stand' && playerPoints > computerPoints)) {
    myOutputValue += '<br><br>Computer points = ' + computerPoints + '<br>Computer hand: ' + displayHand(computerHand) + '<br><br>You win!';
  } else if (computerPoints == 21 || playerPoints > 21 || (mode == 'stand' && playerPoints < computerPoints)) {
    myOutputValue += '<br><br>Computer points = ' + computerPoints + '<br>Computer hand: ' + displayHand(computerHand) + '<br><br>Computer wins!';
  } else {
    myOutputValue += '<br><br>Please enter \'hit\' to deal 1 more card to yourself or \'stand\' if you are satisfied with your cards.';
  }

  return myOutputValue;
};
