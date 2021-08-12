// ==================  Deck Creation ================= \\
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// ==================  Deck Shuffling ================= \\
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
// ==================  Misc Variables ================= \\
// prepared deck
var deck = shuffleCards(makeDeck())
var playerCards = [];
var dealerCards = [];
var burstSum = 22
var dealerHitThreshold = 16
var playerSum;
var dealerSum;
var myOutputValue = ''

// ==================  Game Modes ================= \\
var initialDeal = true
var hitOrStand = false
var gameOver = false
var determineWinner = false

// ==================  Card Dealing Function ================= \\
var dealCard = function(cards) {
  cards.push(deck.pop());
};

// ==================  Output Messages ================= \\
var playerWonMessage = `You Won!`
var playerLostMessage = `You Lost!`
var drawMessage = `It is a draw!`
var refreshMessage = `Please refresh the game to start a new game.`
var hitOrStandMessage = `Please indicate if you want to "Hit" or "Stand"`



// ==================  Sum Comparing Function ================= \\
var compareSums = function(playerSum, dealerSum){
  console.log(`comparing the sums`)
  playerSum = getSum(playerCards);
  dealerSum = getSum(dealerCards);
  // player total is equal to dealer
  if (playerSum == dealerSum && playerSum < burstSum && dealerSum < burstSum){
    myOutputValue = drawMessage
    console.log('Draw, both did not burst')
    return myOutputValue
  }
  //player hits burst value
  if (playerSum >= burstSum && dealerSum < burstSum){
    myOutputValue = playerLostMessage
    console.log(`Player burst, dealer did not`)
    return myOutputValue
  }
  //dealer hits burst value
  if (playerSum < burstSum && dealerSum >= burstSum){
    myOutputValue = playerWonMessage
    console.log(`Dealer burst, player did not`)
    return myOutputValue
  }
  
  //player total is less than dealer
  if (playerSum < dealerSum && dealerSum < burstSum && playerSum < burstSum){
    myOutputValue = playerLostMessage
    console.log(`Player lost, both did not burst`)
    return myOutputValue
  }
  if (playerSum > dealerSum && dealerSum < burstSum && playerSum < burstSum){
    myOutputValue = playerWonMessage
    console.log(`Player won, both did not burst`)
    return myOutputValue
  }
}

// ==================  Check for BlackJack ================= \\
var checkBlackJack = function(){
  console.log(`Checking for BlackJack`)
  if(dealerCards.length == 2 && getSum(dealerCards) == 21){
    gameOver = true
    myOutputValue = playerLostMessage
    console.log(`Dealer got Black Jack`)
    return playerLostMessage
  } else if (playerCards.length == 2 && getSum(playerCards) == 21 && getSum(dealerCards) != 21){
    gameOver = true
    myOutputValue = playerWonMessage
    console.log(`Player got Black Jack`)
    return playerWonMessage
  }
}

// ==================  Sum of cards ================= \\
var getSum = function(playerOrDealerCards){
  console.log(`Trying to get sum`)
  var sum = 0
  var aceCounter = 0
  for(let cardCounter = 0; cardCounter < playerOrDealerCards.length; cardCounter += 1){
    currentCard = playerOrDealerCards[cardCounter]
    if (currentCard.rank >= 2 && currentCard.rank <= 10) {
    sum += currentCard.rank;
  } else if (currentCard.rank >= 11 && currentCard.rank <= 13) {
    sum += 10
  } else if (currentCard.rank == 1){
    aceCounter += 1
    sum += 11
  }
}
if(sum >= burstSum && aceCounter > 0){
  for(checkingAllTheAcesCounter = 0; checkingAllTheAcesCounter < aceCounter ; checkingAllTheAcesCounter += 1){
    sum -= 10
  }
}
  console.log(`sum ${sum}`)
  console.log(`finish summing`)
  return sum
}



// ==================  Main Function ================= \\
var main = function(input){
  // deal 2 cards to dealer and player
  if(playerCards.length == 0 && initialDeal == true){
    dealCard(playerCards);
    dealCard(dealerCards);
  }
  if(playerCards.length == 1 && initialDeal == true){
    dealCard(playerCards);
    dealCard(dealerCards);
    initialDeal = false
    console.log(`Player Cards`)
    console.log(playerCards)
    console.log(`Dealer Cards`)
    console.log(dealerCards)
    console.log(`Finished dealing cards`)
  }
  if(playerCards.length == 2 && gameOver == false && hitOrStand == false){
  // Check if either players got Black Jack
  checkBlackJack();
    if(gameOver == true){
      hitOrStand = false
      console.log(`There was a BlackJack`)
    } else if(gameOver == false){
      console.log(`No BlackJack`)
      hitOrStand = true
      return hitOrStandMessage
    }
  } 

   // ==================  Player Hit or Stand ================= \\ 
  if(hitOrStand == true && input == `hit`){
    console.log(`Player decided to hit`)
    dealCard(playerCards)
    console.log(`player cards`)
    console.log(playerCards)
    if(getSum(playerCards) > burstSum){
      gameOver = true
      myOutputValue = playerLostMessage
      return myOutputValue
    }
  } 
  if(hitOrStand == true && input == `stand`){
    hitOrStand = false
    console.log(`Player decided to stand`)
    // ==================  Dealer Hit or Stand ================= \\
    while (getSum(dealerCards) <= dealerHitThreshold && gameOver == false) {
      dealCard(dealerCards);
      console.log(`dealer drawing more cards`)
      dealerSum = getSum(dealerCards);
      console.log(`Dealer cards`)
      console.log(dealerCards)
      if (dealerSum >= burstSum) {
        gameOver = true;
        return playerWonMessage;
      }
      console.log(`Dealer stopped drawing more cards`)
    }
    compareSums()
  }
  //return hit or stand message here---->>>>>

  // ==================  Determine a winner ================= \\  
  // if(gameOver == false && dealerSum < burstSum && playerSum < burstSum && hitOrStand == false){
  //   compareSums()
  //   // if(getSum(playerCards) > getSum(dealerCards)){
  //   //   return playerWonMessage
  //   // }
  //   // if(getSum(playerCards) < getSum(dealerCards)){
  //   //   return playerLostMessage
  //   // }
  // }
    return myOutputValue
}


//----->Don't forget about draws<!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!