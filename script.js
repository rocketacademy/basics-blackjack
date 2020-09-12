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
  var counter = 0;
  while (counter < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[counter];
    var randomItem = cards[randomIndex];
    cards[counter] = randomItem;
    cards[randomIndex] = currentItem;
    counter = counter + 1;
  }
  return cards;
};
// sum of the cards in hand
// loop goes through array, and adds up the ranks of each object
var getSum = function (hand) {
  var counter = 0;
  var sum = 0;
  while (counter < hand.length) {
    // when loop runs, it captures object.rank and adds it to sum
    sum = sum + hand[counter].rank;
    counter = counter + 1;
  }
  return sum;
};
var gameDeck = shuffleCards(makeDeck());

var dealCards = function (hand) {
  hand.push(gameDeck.pop());
};

var playerHand = [];
var computerHand = [];

var main = function (input) {
  var myOutputValue = '';
  if (playerHand.length == 0) {
    var counter = 0;
    while (counter < 2) {
      dealCards(playerHand);
      dealCards(computerHand);
      myOutputValue = myOutputValue + '<br> player hand: ' + playerHand[counter].rank.toString() + ' of ' + playerHand[counter].suit.toString() + '<br>computer hand: ' + computerHand[counter].rank.toString() + ' of ' + computerHand[counter].suit.toString();
      counter = counter + 1;
    }
    counter = 0;
    while (counter < playerHand.length) {
      console.log('player hand: ' + playerHand[counter]);
      console.log(playerHand[counter]);
      counter = counter + 1;
    }
    counter = 0;
    while (counter < computerHand.length) {
      console.log('computer hand: ' + computerHand[counter]);
      console.log(computerHand[counter]);
      counter = counter + 1;
    }
    console.log('player hand total:' + getSum(playerHand));
    console.log(getSum(playerHand));
    console.log(getSum(computerHand));

    return myOutputValue;
  }
  if (playerHand.length > 0) {
    if (getSum(playerHand) == 21) {
      return '<br>Black jack! You win! Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
    } if (getSum(computerHand) == 21) {
      return '<br>Computer got black jack! You lose. Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
    }
    if (input == 'stand') {
      while (getSum(computerHand) < 17) {
        dealCards(computerHand);
      }
      if (getSum(playerHand) < 21 && getSum(playerHand) > getSum(computerHand)) {
        return 'You win! Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
      } if (getSum(computerHand) < 21 && getSum(computerHand) > getSum(playerHand)) {
        return 'You lose! Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
      } if (getSum(playerHand) > 21) {
        return 'Game over. Bust! Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
      }
      if (getSum(computerHand) > 21) {
        return 'Game over. Bust! Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
      }
    }
  } else if (input == 'hit') {
    dealCards(playerHand);
    getSum(playerHand);
    console.log(dealCards(playerHand));
    console.log(getSum(playerHand));
    while (getSum(computerHand) < 17) {
      dealCards(computerHand);
    }
    if (getSum(playerHand) < 21 && getSum(playerHand) > getSum(computerHand)) {
      return 'You win! Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
    } if (getSum(computerHand) < 21 && getSum(computerHand) > getSum(playerHand)) {
      return 'You lose! Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
    } if (getSum(playerHand) > 21) {
      return 'Game over. Bust! Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
    }
    if (getSum(computerHand) > 21) {
      return 'Game over. Bust! Your sum: ' + getSum(playerHand) + '<br>My sum: ' + getSum(computerHand);
    }
    console.log(playerHand);
  }
};
