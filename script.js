// initializations
var playerScoreNormal = 0;
var playerScoreSpecial = 0;
var dealerScoreNormal = 0;
var dealerScoreSpecial = 0;
var mode = 'player';
var output = '';

// helper functions

// (1) shuffledDeck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};
var shuffledDeck = shuffleCards(makeDeck());

var playerDeck = [];
var dealerDeck = [];

// (2) points calculator
var rankCal = function (y) {
  if (y.rank == 11
    || y.rank == 12
    || y.rank == 13) {
    y.rank = 10;
  }
  return y.rank;
};
var total = function (x) {
  var m = 0;
  var sum = 0;
  while (m < x.length) {
    rankRes = rankCal(x[m]);
    sum += rankRes;
    m += 1;
  }
  return sum;
};

// check if an Ace card is inside the array of
// card objects held by the player.

var checkAce = function (x) {
  var n = 0;
  while (n < x.length) {
    if (x[n].rank == 1) {
      var rankRes = true;
      console.log(rankRes);
      return rankRes;
    }
    console.log(rankRes);
    n += 1;
  }
};

var isAce = checkAce(playerDeck);

var main = function (input) {
// default mode: mode 1: player & computer both draw their first
  // open card & their second closed card.Then player will decide if
  // he wants to hit or stand. if he stands, go to mode 2.

  // parallel 1
  if (mode == 'player') {
    if (!input) {
      output = 'welcome to blackjack, player! enter "hit" to draw your cards';
      dealerDeck.push(shuffledDeck.pop());
      dealerDeck.push(shuffledDeck.pop());
      dealerScoreNormal = total(dealerDeck);
      return output;
    }
    // parallel 2
    if (input == 'hit' || input == 'hit ') {
      playerDeck.push(shuffledDeck.pop());
      var i = 0;
      output = 'Hey player! your current deck of cards are: <br>';
      while (i < playerDeck.length) {
        output += playerDeck[i].name + ' of ' + playerDeck[i].suit + ',<br>';
        playerScoreNormal = total(playerDeck);
        i += 1;
      }
      if (isAce == 1) {
        output += '<br>player, do you want to count your Ace as "1" or "11"? key in either. <br><br> your total score now is: ' + playerScoreNormal + '.';
      }

      if (input == '11') {
        output += '<br> player, your total score now is: ' + playerScoreNormal + '.';
      }
      else if (input == '1') {
        playerScoreSpecial = playerScoreNormal - 10;
        output += '<br> player, your total score now is: ' + playerScoreSpecial + '.';
      } else {
        output += '<br><br> player, your total score now is: ' + playerScoreNormal + '.';
      }

      if (playerScoreNormal == 21) {
        output += '<br<br> omfg you damn lucky you won!';
        return output;
      } if (playerScoreNormal > 21) {
        output += '<br><br> you are busted! pray that the dealer will go bust as well.key in "dealer" to see the deck of cards it will have drawn.';
        return output;
      }
      output += '<br><br> dealer‘s current deck of cards are: <br>' + dealerDeck[0].name + ' of ' + dealerDeck[0].suit + ',<br> x of xxxx(a face-down card)' + ',<br><br> do you want to "hit" or "stand"? key in either and click the submit button.';
      return output;
    }
    // parallel 3
    if (input == 'stand' || input == 'stand ') {
    // decide if the dealer needs to draw cards
      if (dealerScoreNormal < 16) {
        dealerDeck.push(shuffledDeck.pop());
        dealerScoreNormal = total(dealerDeck);
        output = '<br><br> dealer‘s current deck of cards are: <br>' + dealerDeck[0].name + ' of ' + dealerDeck[0].suit + ',<br> ' + dealerDeck[1].name + ' of ' + dealerDeck[1].suit + ',<br> ' + dealerDeck[2].name + ' of ' + dealerDeck[2].suit + ',<br> the dealer‘s total score is: ' + dealerScoreNormal + '<br><br> the player‘s total score is: ' + playerScoreNormal;
        return output;
      }
    }
  } else if (mode == 'dealer') {

  }
};

// mode 2: computer's turn to hit or stand
// if stand, go to mode 3

// mode 3: compare totals of computerDeck and that of playerDeck to
// decide the winner
