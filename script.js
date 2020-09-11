// Deck is shuffled.
// User clicks submit button to deal cards.
// The cards are analyzed for any game winning conditions. (Blackjack)
// The cards are displayed to the user.
// Then begins a new action, where the user has to decide something: do they hit or stand.
// The computer also decides to hit or stand.

// Card deck (short version)
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    // console.log('current suit : ' + currentSuit);
    // loop to create all cards in this suit
    // assign value with respect to cards for 1 - 13
    // assign value = 10 to J, Q, K
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;
      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = 'jack';
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        cardValue = 10;
      }
      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };
      // console.log('rank : ' + rankCounter);
      // add the card to the deck
      deck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
};

// Randomize to return integer with values between 0 and max
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
// Deck is shuffled.
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

// shuffle deck
var deck = shuffleCards(makeDeck());

// arrays to store player and computer hand
var playerHand = [];
var computerHand = [];

// Deal a card to the given hand
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

// sum function to calcualte total hand score
var sumTotalHandScore = function (hand) {
  var sum = 0;
  for (var i = 0; i < hand.length; i += 1) {
    sum += hand[i].value;
  }
  return sum;
};

// calculate hand score
var playerTotalHandScore = function (hand) {
  sumTotalHandScore(hand);
  if (playerTotalHandScore > 21) {
    ace = 1;
  } else {
    ace = 11;
  }
};
var computerTotalHandScore = function (hand) {
  var ace = 11;
  var sum = 0;
  if (computerTotalHandScore < 21 && computerHand.length > 2) {
    ace = 1;
  }
};

// max score in blackjack is 21
var maxScore = 21;
// Dealer to hit player until reaches > score of 16
var autoHitTillPlayerHandScoreIs17 = function (hand) {
  // so long total player hand score is less than 17,
  // keep drawing +1 card at the time until reaches min score of 17
  var sum = playerHand[0].value + playerHand[1].value;
  var counter = 0;
  while (sum < 17) {
    dealCardToHand(playerHand);
  }
  if (sum > 17) {
    counter += 1;
    return 'You have got > 17';
  }
};

var autoHitTillComputerHandScoreIs17 = function (hand) {
  // so long total player hand score is less than 17,
  // keep drawing +1 card at the time until reaches min score of 17
  var sum = computerHand[0].value + computerHand[1].value;
  var counter = 0;
  while (sum < 17) {
    dealCardToHand(computerHand);
  }
  if (sum > 17) {
    counter += 1;
    return 'You have got > 17';
  }
};

// if get blackjack combination
var isBlackjack = function (hand) {
  if (playerHand.length === 2 && playerTotalHandScore(hand) === 21) {}
};

var playerDecision = '';

var main = function (input) {
  var myOutputValue = '';
  input = '';
  // both player and computer draws 2 cards each
  // player hand = 0 means beginning of game
  if (playerHand.length == 0) {
    dealCardToHand(playerHand);
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);
    dealCardToHand(computerHand);
    // Check for blackjacks
    if (isBlackjack(computerHand)) {
      return 'Computer wins';
    }
    if (isBlackjack(playerHand)) {
      return 'You win';
    }
    // cards are auto drawn until user and computer has a score of min 17
    console.log(sumTotalHandScore(playerHand));
    autoHitTillPlayerHandScoreIs17();
    console.log(sumTotalHandScore(playerHand));
    // if player hand total score < 22, player stands
    // The cards are displayed to the user
    // return player total score
    if (sumTotalHandScore(playerHand) < 22) {
      return 'Player stands ' + sumTotalHandScore(playerHand);
    }
    // if player hand total score > 21, player busts
    // The cards are displayed to the user
    // return player total score
    if (sumTotalHandScore(playerHand) > 21) {
      return 'Player loses with a total hand score of ' + sumTotalHandScore(playerHand);
    }

    // player input hit or stand. Decision();
    if (input == 'hit') {
      // player decision to hit ot stand
      playerDecision = 'stand';
      // if player input hit, dealCardToHand(playerhand)
      dealCardToHand(playerHand);
      console.log(sumTotalHandScore(playerHand));
      playerHand.push();
      // if player total score is < 22, let player know their score, give player choice to hit/stand
      // user choose to stand
      if (sumTotalHandScore(playerHand) < 22) {
        return 'Player stands ' + sumTotalHandScore(playerHand);
      }
      // if player total score > 21, player lose
      // return player total score & player lose
      if (sumTotalHandScore(playerHand) > 21) {
        return 'Player loses with a total hand score of ' + sumTotalHandScore(playerHand);
      }
    }
    if (input == 'stand') {
      console.log(sumTotalHandScore(playerHand));
      return playerDecision();
    } if (input != 'hit' || input != 'stand') {
      return 'Please enter hit or stand only';
    }
    // computer auto hit until score of min 17
    computerHand = autoHitTillComputerHandScoreIs17();
    if (sumTotalHandScore(computerHand) < 22) {
      return 'Comp stands ' + sumTotalHandScore(computerHand);
    }
    // if player total score > 21, player lose
    // return player total score & player lose
    if (sumTotalHandScore(computerHand) > 21) {
      return 'Comp loses with a total hand score of ' + sumTotalHandScore(computerHand);
    }
  }

  // return analyse winning conditions, determine winner, game end
  // return myOutputValue;
};
