// Global Variables Here
var gameMode = 'default';
var dealerCard1;
var dealerCard2;
var dealerCard3;
var playerCard1;
var playerCard2;
var playerCard3;
var playerScore;
var dealerScore;

// Helper function #1 : Create a random index
var getRandomIndex = function (size) {
  var randomNum = Math.floor(Math.random() * size);
  return randomNum;
};

// Helper function #2 : Shuffle the deck
var shuffleCards = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomItem = cards[randomIndex];
    var currentItem = cards[index];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  } return cards;
};

// Helper function #3 : Determine the winner
var decideWinner = function (playerScore, dealerScore) {
  if (dealerScore > playerScore && dealerScore <= 21) {
    return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Dealer wins!';
  }
  if (dealerScore > playerScore && dealerScore >= 21) {
    return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Player wins!';
  }
  if (dealerScore < playerScore && playerScore <= 21) {
    return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Player wins!';
  }
  if (dealerScore < playerScore && playerScore >= 21) {
    return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Dealer wins!';
  }
  if (dealerScore == playerScore) {
    return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>It is a draw.';
  }
  if (dealerScore == 21) {
    return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>BlackJack! Dealer wins!';
  }
};

// Helper function #4 : When dealer hits
var whenDealerHits = function (playerScore, dealerScore) {
  if (dealerScore == 21) {
    return 'BlackJack! Dealer Wins!';
  }
  if (dealerScore >= 17 && dealerScore < 21) {
    return decideWinner(playerScore, dealerScore);
  }
  if (dealerScore > 21) {
    return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Dealer is busted! <br>Player Wins!';
  }
};

var main = function (input) {
  var makeDeck = function () {
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

  var deck = shuffleCards(makeDeck());

  if (gameMode == 'default') {
    // On Click, 2 cards are shown for player and 1 for dealer.
    dealerCard1 = deck.pop();
    dealerCard2 = deck.pop();
    playerCard1 = deck.pop();
    playerCard2 = deck.pop();

    // Calculate what is the score for player and dealer's hand
    playerScore = playerCard1.rank + playerCard2.rank;
    dealerScore = dealerCard1.rank;

    // If player score is <11, check if any card is an ace add 10 to change value of ace to 11.
    if (playerScore < 11 && (playerCard1.name == 'ace' || playerCard2.name == 'ace')) {
      playerScore += 10;

      if (playerScore == 21) {
        return 'BlackJack! Player Wins!';
      }
      if (playerScore > 21) {
        return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Player is busted! <br>Dealer Wins!';
      }
    }

    if (playerScore == 21) {
      return 'BlackJack! Player Wins!';
    }
    if (playerScore > 21) {
      return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Player is busted! <br>Dealer Wins!';
    }

    // Else, prompt player if they want to hit or stand.
    gameMode = 'User Hit or Stand';
    return 'PlayerScore: ' + playerScore + '<br>DealerScore: ' + dealerScore + '<br><br>User, do you want to hit or stand?';
  }

  if (gameMode == 'User Hit or Stand') {
    // Player to input 'hit' to add 1 more card.
    if (input == 'hit') {
      playerCard3 = deck.pop();
      playerScore += playerCard3.rank;
      console.log(playerScore, 'player 1+2+3');

      if (playerScore == 21) {
        return 'BlackJack! Player Wins!';
      }
      if (playerScore > 21) {
        return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Player is busted! <br>Dealer Wins!';
      }

      // Recalculate score for dealer's hand.
      dealerScore += dealerCard2.rank;
      console.log(dealerScore, 'dealer 1+2');
      // If dealer score is <= 16, draw the 3rd card.
      if (dealerScore <= 16) {
        dealerCard3 = deck.pop();
        dealerScore += dealerCard3.rank;
        console.log(dealerScore, 'dealer 1+2+3');
        // Use helper function #4 to determine winner if dealer auto hits.
        return whenDealerHits(playerScore, dealerScore);
      }
      // Use helper function #4 to determine winner if dealer auto hits.
      return decideWinner(playerScore, dealerScore);
    }

    if (input == 'stand') {
      dealerScore += dealerCard2.rank;
      console.log(dealerScore, 'dealer 1+2');
      // If dealer score is <11, check if any card is an ace add 10 to change value of ace to 11.
      if (dealerScore < 11 && (dealerCard1.name == 'ace' || dealerCard2.name == 'ace')) {
        dealerScore += 10;

        if (dealerScore == 21) {
          return 'BlackJack! Dealer Wins!';
        }
        if (dealerScore > 21) {
          return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Dealer is busted! <br>Player Wins!';
        }
      }
      // If dealer score is <= 16, dealer hits (draw the 3rd card).
      if (dealerScore <= 16) {
      // Recalculate score for dealer's hand.
        dealerCard3 = deck.pop();
        dealerScore += dealerCard3.rank;
        console.log(dealerScore, 'dealer 1+2+3');
        // Use helper function #4 to determine winner if dealer auto hits.
        return whenDealerHits(playerScore, dealerScore);
      }
      // Use helper function #3 to determine winner if dealer decides to stand.
      return decideWinner(playerScore, dealerScore);
    }
  }
};
