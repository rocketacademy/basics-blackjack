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
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = cardName;

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

      // console.log('rank : ' + rankCounter + ' value of card: ' + cardValue);

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

var deck = shuffleCards(makeDeck());
// store hands
var playerHand = [];
var dealerHand = [];

// dealing cards to hand
var deal = function (hand) {
  hand.push(deck.pop());
};

// set limit for blackjack
var totalLimit = 21;
// dealer minimum value;
var dealerMinValue = 17;
// decide if the game has ended
var gamenEnds = false;
var sumOfHand = function (hand) {
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currentCard = hand[i];
    sum += hand[i].value;
    if ((currentCard.rank == 1) && (sum > totalLimit)) {
      sum -= 10;
    }
  }
};
var convertHandToString = function (hand) {
  return `[${hand.map((card) => card.name)}]`;
};

var getDefaultOutput = function () {
  return `Player has hand ${convertHandToString(playerHand)} with sum ${JSON.stringify(sumOfHand(playerHand))}. <br>
    Dealer has hand ${convertHandToString(dealerHand)} with sum ${JSON.stringify(sumOfHand(dealerHand))}. <br>`;
};
// when player inputs hit and submits
var hit = function () {
  deal(playerHand);
};
// Main game play
var main = function (input) {
  // check if game has ended
  if (gamenEnds) {
    return 'The game has ended. Please refresh the page to try again.';
  }
  // deal hands to player and computer.
  if (playerHand.length === 0) {
    deal(playerHand);
    deal(dealerHand);
    deal(playerHand);
    deal(dealerHand);
    sumOfHand(playerHand);
    sumOfHand(dealerHand);
    // check for blackjack
    if (sumOfHand(dealerHand) === totalLimit) {
      gamenEnds = true;
      return getDefaultOutput() + 'Dealer has blackjack and dealer wins.';
    }
    if (sumOfHand(playerHand) === totalLimit) {
      gamenEnds = true;
      return getDefaultOutput() + 'Player wins.';
    }
    if (playerHand.length == 2 || playerHand.length > 2) {
      return getDefaultOutput() + 'Please enter Hit or Stay';
    }
  }
  // Player choose to hit or to stand
  if (input == 'Hit') {
    hit(playerHand);
    if (sumOfHand(playerHand) < totalLimit) {
      return getDefaultOutput() + ' Please enter Hit or Stay';
    } if (sumOfHand(playerHand) > totalLimit) {
      gamenEnds = true;
      return getDefaultOutput() + ' Player lose as your hand is above 21';
    }
  }

  if (input == 'Stay') {
    // check if dealer has to hit
    if (sumOfHand(dealerHand) < dealerMinValue) {
      deal(dealerHand);
    }
    if ((sumOfHand(dealerHand) > sumOfHand(playerHand))
        && (sumOfHand(dealerHand) < totalLimit)) {
      gamenEnds = true;
      return getDefaultOutput() + ' Dealer wins';
    } if (sumOfHand(dealerHand > totalLimit)) {
      gamenEnds = true;
      return getDefaultOutput() + ' Player wins';
    } if (sumOfHand(dealerHand) < sumOfHand(playerHand)) {
      gamenEnds = true;
      return getDefaultOutput() + ' Player wins';
    } if (sumOfHand(dealerHand) == sumOfHand(playerHand)) {
      gamenEnds = true;
      return getDefaultOutput() + ' Dealer wins';
    } if (sumOfHand(dealerHand) > totalLimit) {
      gamenEnds = true;
      return getDefaultOutput() + ' Player wins';
    }
  }
  return getDefaultOutput() + ' Please input Hit or Stay';
};
