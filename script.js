// initializations
var playerScore = 0;
var dealerScore = 0;
var output = '';
var playerHand = [];
var dealerHand = [];
var isAceInside = false;
var aceCount = 0;
var isDealerMode = false;

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

// points calculator & check for Ace
var handValue = function (hand) {
  var i = 0;
  var sum = 0;
  while (i < hand.length) {
    if (hand[i].rank == 11
    || hand[i].rank == 12
    || hand[i].rank == 13) {
      sum += 10;
    } else if (hand[i].rank == 1) {
      sum += 11;
      aceCount += 1;
      isAceInside = true;
    } else {
      sum += hand[i].rank;
    }
    i += 1;
  }
  return sum;
};

var main = function (input) {
// default mode: mode 1: player & computer both draw their first
  // open card & their second closed card.Then player will decide if
  // he wants to hit or stand. if he stands, go to mode 2.

  // parallel 1
  if (!input) {
    output = 'welcome to blackjack, player! enter "hit" to draw your cards';
    dealerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    dealerScore = handValue(dealerHand);
    return output;
  }
  // parallel
  if (!isDealerMode) {
    if (input == 'hit' || input == 'hit ') {
      playerHand.push(shuffledDeck.pop());
      var i = 0;
      output = 'Hey player! your current deck of cards are: <br>';
      while (i < playerHand.length) {
        output += playerHand[i].name + ' of ' + playerHand[i].suit + ',<br>';
        playerScore = handValue(playerHand);
        i += 1;
      }

      // conditionals for the players for winning/losing decision
      if (isAceInside == true && playerScore > 21) {
        var i = 0;
        while (i < aceCount) {
          playerScore -= 10;
          i += 1;
        }
        output += ' <br><br> your current score now is: ' + playerScore + '.';
      } else if (playerScore == 21) {
        output += '<br<br><br> you got 21 points you damn lucky you won!';
        return output;
      } else if (isAceInside == false && playerScore > 21) {
        output += ' <br><br> you are busted!';
        return output;
      } else { output += '<br><br> player, your current score is: ' + playerScore + '.';
      }

      output += '<br><br> dealer‘s current deck of cards are: <br>' + dealerHand[0].name + ' of ' + dealerHand[0].suit + ',<br> hand of xxxx(a face-down card)' + ',<br><br> do you want to "hit" or "stand"? key in either and click the submit button.';
      return output;
    }
    if (input == 'stand' || input == 'stand ') {
      isDealerMode = true;
    }
  }

  // parallel 3: dealer's turn + compare + decide winner
  if (isDealerMode == true) {
    // reset aceCount & isAceInside
    aceCount = 0;
    isAceInside = false;
    // re-invoke handValue function to update the value for aceCount & isAceInside for the dealer
    dealerScore = handValue(dealerHand);
    // decide if the dealer needs to draw cards
    if (dealerScore < 16) {
      dealerHand.push(shuffledDeck.pop());
      dealerScore = handValue(dealerHand);
      output = '<br><br> the dealer’s score was less than 16 so the dealer has to draw a 3rd card. The dealer‘s current deck of cards are: <br>' + dealerHand[0].name + ' of ' + dealerHand[0].suit + ',<br> ' + dealerHand[1].name + ' of ' + dealerHand[1].suit + ',<br> ' + dealerHand[2].name + ' of ' + dealerHand[2].suit + ',<br> the dealer‘s current score is: ' + dealerScore + '<br><br> the player‘s current score is: ' + playerScore;
    } else {
      output = '<br><br> the dealer’s score was less than 16 so the dealer has to draw a 3rd card. <br><br> The dealer‘s current deck of cards are: <br>' + dealerHand[0].name + ' of ' + dealerHand[0].suit + ',<br> ' + dealerHand[1].name + ' of ' + dealerHand[1].suit + ',<br> the dealer‘s current score is: ' + dealerScore + '<br><br> the player‘s current score is: ' + playerScore;
    }

    if (dealerScore == 21) {
      output += '<br>the dealer got 21 points! <br> the dealer won!';
    } else if (dealerScore > 21 && isAceInside == true) {
      var i = 0;
      while (i < aceCount) {
        dealerScore -= 10;
        i += 1;
      }
      if (dealerScore > playerScore) {
        output += '<br><br> the dealer won!';
      } else {
        output += '<br><br> the player won!';
      }
    } else if (dealerScore > 21 && isAceInside == false) {
      output += '<br><br> the dealer is busted! the player won!';
    } else if (dealerScore > playerScore) {
      output += '<br><br> the dealer won!';
    } else {
      output += '<br><br> the player won!';
    }
    return output;
  }
};
