/* eslint-disable dot-notation */
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];

  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];
    console.log('current suit : ' + currentSuit);

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

      console.log('rank : ' + rankCounter + ' value of card: ' + cardValue);

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
// decide if the game has ended
var gamenEnds = false;
var sumOfHand = function (hand) {

};

// Main game play
var main = function (input) {
  var myOutputValue = '';
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
  }
  // get sum of playerhand and computer hand

  // eslint-disable-next-line quotes
  var sumOfPlayerHand = PlayerHand[0]["value"] + combinedPlayerHand[1]["value"];
  var sumOfDealerHand = combinedDealerHand[0]['value'] + combinedDealerHand[1]['value'];
  myOutputValue = 'You have been dealt ' + combinedPlayerHand[0]['name'] + ' of ' + combinedPlayerHand[0]['suit']
  + ' and ' + combinedPlayerHand[1]['name'] + ' of ' + combinedPlayerHand[1]['suit'] + '<br> <br>Dealer has been dealt '
  + combinedDealerHand[0]['name'] + ' of ' + combinedDealerHand[0]['suit'] + ' and ' + combinedDealerHand[0]['name'] + ' of '
  + combinedDealerHand[0]['suit'] + '<br> <br> Please input your decision to hit or to stay';
  if (input == 'hit' && sumOfPlayerHand < 21) {
    combinedPlayerHand.push(deck.pop());
  }

  console.log(combinedPlayerHand);
  console.log(combinedDealerHand);
  console.log(sumOfPlayerHand);
  console.log(sumOfDealerHand);
  return myOutputValue;
};
