// Global Variables Here
var gameMode = 'default';
var dealerCard1;
var dealerCard2;
var dealerCard3;
var playerCard1;
var playerCard2;
var playerCard3;
var playerCard4;
var playerScore;
var dealerScore;
var playerScoreDeck1;
var playerScoreDeck2;

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
};

// Helper function #4 : When dealer hits
var whenDealerHits = function (playerScore, dealerScore) {
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
        // add the card to the deck
        deck.push(card);

        rankCounter = rankCounter + 1;
      }
      suitIndex = suitIndex + 1;
    }

    return deck;
  };

  var deck = shuffleCards(makeDeck());

  var playerArray = [];
  var dealerArray = [];

  var getTotalCardSum = function(cardsArray){
    counter = 0;
    while(counter < cardsArray.length){
      sum += cardsArray[counter];
      counter = counter + 1;
    }
    return sum;
  }

  if (gameMode == 'default') {
    // On Click, 2 cards are shown for player and 1 for dealer.

    playerArray.push(deck.pop());
    dealerArray.push(deck.pop());
    playerArray.push(deck.pop());
    dealerArray.push(deck.pop());
    

    // Calculate what is the score for player and dealer's hand
    getTotalSum(playerArray);
    getTotalSum(dealerArray);

//     // When the player has 2 identical cardValues, he splits it into 2 decks.
//     if (playerCard1.value == playerCard2.value)
//     // Player will automatically receive 1 new card for each deck.
    

//     console.log(playerCard1.value);
//     console.log(playerCard2.value);
//     console.log(playerCard3.value);
//     console.log(playerCard4.value);

//     // Check if its blackjack for either hand.
//     if (playerScoreDeck1 < 11 && (playerCard1.name == 'ace' || playerCard3.name == 'ace')) {
//       playerScoreDeck1 += 10;

//       if (playerScoreDeck1 == 21) {
//         return 'BlackJack! Player Wins!';
//       }
//     }

//     else if (playerScoreDeck1 == 21) {
//       return 'BlackJack! Player Wins!';
//     }
//     gameMode = 'User Hit or Stand';
//     return 'PlayerScore: ' + playerScoreDeck1 + '<br>DealerScore: ' + dealerScore + '<br><br>User, do you want to hit or stand?';
//   }
//     if (playerScoreDeck2 < 11 && (playerCard1.name == 'ace' || playerCard3.name == 'ace')) {
//       playerScoreDeck1 += 10;

//       if (playerScoreDeck1 == 21) {
//         return 'BlackJack! Player Wins!';
//       }
//     }

//     else if (playerScoreDeck1 == 21) {
//       return 'BlackJack! Player Wins!';
//     }
//     gameMode = 'User Hit or Stand';
//     return 'PlayerScore: ' + playerScoreDeck2 + '<br>DealerScore: ' + dealerScore + '<br><br>User, do you want to hit or stand?';
//   }

//   // If player score is <11, check if any card is an ace add 10 to change value of ace to 1
//   if (playerScore < 11 && (playerCard1.name == 'ace' || playerCard2.name == 'ace')) {
//     playerScore += 10;

//     if (playerScore == 21) {
//       return 'BlackJack! Player Wins!';
//     }
//     // Else, prompt player if they want to hit or stand.
//     gameMode = 'User Hit or Stand';
//     return 'PlayerScore: ' + playerScore + '<br>DealerScore: ' + dealerScore + '<br><br>User, do you want to hit or stand?';
//   }

//   if (gameMode == 'User Hit or Stand') {
//     // Player to input 'hit' to add 1 more card.
//     if (input == 'hit') {
//       playerCard4 = deck.pop();
//       playerScore += playerCard4.value;
//       console.log(playerScore, 'player 1+2+3');

//       if (playerScore > 21) {
//         return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Player is busted! <br>Dealer Wins!';
//       }

//       // If dealer score is <= 16, draw the 3rd card.
//       if (dealerScore <= 16) {
//         dealerCard3 = deck.pop();
//         dealerScore += dealerCard3.value;
//         console.log(dealerScore, 'dealer 1+2+3');
//         // Use helper function #4 to determine winner if dealer auto hits.
//         return whenDealerHits(playerScore, dealerScore);
//       }
//       // Use helper function #3 to determine final winner if dealer auto hits.
//       return decideWinner(playerScore, dealerScore);
//     }

//     if (input == 'stand') {
//       // If dealer score is <11, check if any card is an ace add 10 to change value of ace to 11.
//       if (dealerScore < 11 && (dealerCard1.name == 'ace' || dealerCard2.name == 'ace')) {
//         dealerScore += 10;
//       }
//       if (dealerScore > 21) {
//         return 'Player Score: ' + playerScore + '<br>Dealer Score: ' + dealerScore + '<br><br>Dealer is busted! <br>Player Wins!';
//       }
//     }
//     // If dealer score is <= 16, dealer hits (draw the 3rd card).
//     if (dealerScore <= 16) {
//       // Recalculate score for dealer's hand.
//       dealerCard3 = deck.pop();
//       dealerScore += dealerCard3.value;
//       console.log(dealerScore, 'dealer 1+2+3');
//       // Use helper function #4 to determine winner if dealer auto hits.
//       return whenDealerHits(playerScore, dealerScore);
//     }
//     // Use helper function #3 to determine final winner if dealer decides to stand.
//     return decideWinner(playerScore, dealerScore);
//   }
// };
