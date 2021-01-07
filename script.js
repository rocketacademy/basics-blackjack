/* eslint-disable max-len */
// Global Variables Here
var gameMode = 'default';
var playerScore;
var dealerScore;
var playerArray = [];
var dealerArray = [];

// Helper function : Create a random index
var getRandomIndex = function (size) {
  var randomNum = Math.floor(Math.random() * size);
  return randomNum;
};

// Helper function : Shuffle the deck
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

// Helper function : Add the sum of values in the array
var getTotalCardSum = function (cardsArray) {
  var i = 0;
  var sum = 0;
  while (i < cardsArray.length) {
    var currentCard = cardsArray[i];
    sum = sum + currentCard.value;
    i = i + 1;
  }
  return sum;
};

// Helper function : Determine the winner
var decideWinner = function (playerScore, dealerScore) {
  if (dealerScore > playerScore && dealerScore <= 21) {
    return '<br><br><b>DEALER WINS!</b>';
  }
  if ((dealerScore > playerScore && dealerScore >= 21)) {
    return '<br><br><b>PLAYER WINS!</b>';
  }
  if (dealerScore < playerScore && playerScore <= 21) {
    return '<br><br><b>PLAYER WINS!</b>!';
  }
  if (dealerScore < playerScore && playerScore >= 21) {
    return '<br><br><b>DEALER WINS!</b>';
  }
  if (dealerScore == playerScore) {
    return '<br><br>IT IS A DRAW. Refresh to restart game.';
  }
  if (dealerScore == 21) {
    return 'BlackJack! Dealer Wins!';
  }
  if (playerScore == 21) {
    return 'BlackJack! Player Wins!';
  }
};

// GAME STARTS HERE //
var main = function (input) {
  var makeDeck = function () {
    var deck = [];
    var suits = ['♥️', '♦️', '♠️', '♣️'];

    var suitIndex = 0;
    while (suitIndex < suits.length) {
    // make a variable of the current suit
      var currentSuit = suits[suitIndex];

      // loop to create all cards in this suit
      // rank 1-13
      var rankCounter = 1;
      while (rankCounter <= 13) {
        var cardName = rankCounter;
        var cardValue = rankCounter;

        // 1, 11, 12 ,13
        if (cardName == 1) {
          cardName = 'A';
          cardValue = 11;
        } else if (cardName == 11) {
          cardName = 'J';
          cardValue = 10;
        } else if (cardName == 12) {
          cardName = 'Q';
          cardValue = 10;
        } else if (cardName == 13) {
          cardName = 'K';
          cardValue = 10;
        }

        // make a single card object variable
        var card = {
          name: cardName,
          suit: currentSuit,
          rank: rankCounter,
          value: cardValue,
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

  // Output Messages
  var twoCardsDealtEach;
  var threeCardsEach;
  var threeCardsPlayerTwoCardsDealer;
  var twoCardsPlayerThreeCardsDealer;

  if (gameMode == 'default') {
    // On Click, 2 cards are shown for player and 1 for dealer.
    playerArray.push(deck.pop());
    dealerArray.push(deck.pop());
    playerArray.push(deck.pop());
    dealerArray.push(deck.pop());

    // Calculate what is the score for player and dealer's hand
    playerScore = getTotalCardSum(playerArray);
    dealerScore = getTotalCardSum(dealerArray);

    twoCardsDealtEach = '<u><b>PLAYER:</b></u><br> ' + playerArray[0].name + playerArray[0].suit + '<br>' + playerArray[1].name + playerArray[1].suit + '<br>Player Score: ' + playerScore + '<br><br><u><b>DEALER:</b></u><br>' + dealerArray[0].name + dealerArray[0].suit + '<br>' + dealerArray[1].name + dealerArray[1].suit + '<br>Dealer Score: ' + dealerScore;

    // If player score is <=11, check if any card is an ace add 10 to change value of ace to 11.
    if (playerScore <= 11 && (playerArray[0].name == 'ace' || playerArray[1].name == 'ace')) {
      playerScore += 10;

      if (playerScore == 21) {
        return twoCardsDealtEach + decideWinner(playerScore, dealerScore);
      }
      if (playerArray[0].name == 'aces' && playerArray[1].name == 'aces') {
        playerScore = 21;
        return twoCardsDealtEach + decideWinner(playerScore, dealerScore);
      }
    }
    // If both of the players cards are aces, minus 10 from playersScore.
    if (playerArray[0].name == 'ace' || playerArray[1].name == 'ace') {
      playerScore -= 10;
      return twoCardsDealtEach + decideWinner(playerScore, dealerScore);
    }

    if (playerScore == 21) {
      return twoCardsDealtEach + decideWinner(playerScore, dealerScore);
    }

    if (dealerScore == 21) {
      return twoCardsDealtEach + decideWinner(playerScore, dealerScore);
    }

    // Else, prompt player if they want to hit or stand.
    gameMode = 'User Hit or Stand';
    return twoCardsDealtEach + '<br><br>Player, do you want to hit or stand?';
  }

  if (gameMode == 'User Hit or Stand') {
    // Player to input 'hit' to add 1 more card.
    if (input == '') {
      return 'Please input "hit" or "stand" to continue';
    }
    if (input == 'hit') {
      gameMode = 'Hit Mode';
    }
    if (input == 'stand') {
      gameMode = 'Stand Mode';
    }
    if (gameMode == 'Hit Mode') {
      playerArray.push(deck.pop());
      playerScore = getTotalCardSum(playerArray);

      threeCardsPlayerTwoCardsDealer = '<u><b>PLAYER:</b></u><br> ' + playerArray[0].name + playerArray[0].suit + '<br>' + playerArray[1].name + playerArray[1].suit + '<br>' + playerArray[2].name + playerArray[2].suit + '<br>Player Score: ' + playerScore + '<br><br><u><b>DEALER:</b></u><br>' + dealerArray[0].name + dealerArray[0].suit + '<br>' + dealerArray[1].name + dealerArray[1].suit + '<br>Dealer Score: ' + dealerScore;

      if (playerScore == 21 || playerScore > 21) {
        return threeCardsPlayerTwoCardsDealer + decideWinner(playerScore, dealerScore);
      }

      // If dealer score is <= 16, draw the 3rd card.
      if (dealerScore <= 16) {
        dealerArray.push(deck.pop());
        dealerScore = getTotalCardSum(dealerArray);

        threeCardsEach = '<u><b>PLAYER:</b></u><br> ' + playerArray[0].name + playerArray[0].suit + '<br>' + playerArray[1].name + playerArray[1].suit + '<br>' + playerArray[2].name + playerArray[2].suit + '<br>Player Score: ' + playerScore + '<br><br><u><b>DEALER:</b></u><br>' + dealerArray[0].name + dealerArray[0].suit + '<br>' + dealerArray[1].name + dealerArray[1].suit + '<br>' + dealerArray[1].name + dealerArray[1].suit + '<br>Dealer Score: ' + dealerScore;

        // Use helper function to determine winner if dealer auto hits.
        return threeCardsEach + decideWinner(playerScore, dealerScore); // 3 cards each
      }
      // Use helper function to determine winner
      // eslint-disable-next-line max-len
      return threeCardsPlayerTwoCardsDealer + decideWinner(playerScore, dealerScore); // 3 cards player, 2 cards dealer.
    }

    if (gameMode == 'Stand Mode') {
    // If dealer score is <11, check if any card is an ace add 10 to change value of ace to 11.
      if (dealerScore <= 11 && (dealerArray[0].name == 'ace' || dealerArray[1].name == 'ace')) {
        dealerScore += 10;

        if (dealerScore == 21) {
          // Use helper function to determine winner
          // eslint-disable-next-line max-len
          return twoCardsDealtEach + decideWinner(playerScore, dealerScore); // player 2 cards, dealer 2 cards.
        }
      }

      // If dealer score is <= 16, dealer hits (draw the 3rd card).
      if (dealerScore <= 16) {
      // Recalculate score for dealer's hand.
        dealerArray.push(deck.pop());
        dealerScore = getTotalCardSum(dealerArray);

        twoCardsPlayerThreeCardsDealer = '<u><b>PLAYER:</b></u><br> ' + playerArray[0].name + playerArray[0].suit + '<br>' + playerArray[1].name + playerArray[1].suit + '<br>Player Score: ' + playerScore + '<br><br><u><b>DEALER:</b></u><br>' + dealerArray[0].name + dealerArray[0].suit + '<br>' + dealerArray[1].name + dealerArray[1].suit + '<br>' + dealerArray[2].name + dealerArray[2].suit + '<br>Dealer Score: ' + dealerScore;

        // eslint-disable-next-line max-len
        // Use helper function to determine winner if dealer auto hits.
        return twoCardsPlayerThreeCardsDealer + decideWinner(playerScore, dealerScore); // player 2 cards, dealer 3 cards.
      }
      // Use helper function to determine winner if dealer auto hits.
      return decideWinner(playerScore, dealerScore);
    }
  }
};
