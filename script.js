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
var deck = shuffleCards(makeDeck())
var playerCards = [];
var dealerCards = [];
//var playerNames = [];
var burstSum = 22
var dealerHitThreshold = 16
var playerSum;
var dealerSum;
var myOutputValue = ''
var playerPoints = Number(100)
var userName = ''

// ==================  Game Modes ================= \\
var welcomeMessage = true
var userNameRecord = false
var betting = false
var initialDeal = false
var hitOrStand = false
var gameOver = false

// ==================  Card Dealing Function ================= \\
var dealCard = function(cards) {
  cards.push(deck.pop());
};

// ==================  Sum Comparing Function ================= \\
var compareSums = function(playerSum, dealerSum){
  console.log(`comparing the sums`)
  playerSum = getSum(playerCards);
  dealerSum = getSum(dealerCards);
  // draw; both did not burst
  if (playerSum == dealerSum && playerSum < burstSum && dealerSum < burstSum){
    myOutputValue = `${drawMessage} ${showPlayerCards()} ${showDealerCards()} ${refreshMessage}`
    console.log('Draw, both did not burst')
    gameOver = true
    hitOrStand = false
    return myOutputValue
  }
  // check if player burst first
  if (playerSum >= burstSum && dealerSum < burstSum){
    myOutputValue = `${playerLostMessage} ${showPlayerCards()} ${showDealerCards()} ${refreshMessage}`
    console.log(`Player burst, dealer did not`)
    gameOver = true
    hitOrStand = false
    playerPoints -= currentBet
    return myOutputValue
  }
  // check if dealer burst, if player did not burst
  if (playerSum < burstSum && dealerSum >= burstSum){
    myOutputValue = `${playerWonMessage} ${showPlayerCards()} ${showDealerCards()} ${refreshMessage}`
    console.log(`Dealer burst, player did not`)
    gameOver = true
    hitOrStand = false
    playerPoints += currentBet
    return myOutputValue
  }
  // if both players did not burst, check. Player value is less than dealer
  if (playerSum < dealerSum && dealerSum < burstSum && playerSum < burstSum){
    myOutputValue = `${playerLostMessage} ${showPlayerCards()} ${showDealerCards()} ${refreshMessage}`
    console.log(`Player lost, both did not burst`)
    gameOver = true
    hitOrStand = false
    playerPoints -= currentBet
    return myOutputValue
  }
  // if both players did not burst, check. Player value is more than dealer
  if (playerSum > dealerSum && dealerSum < burstSum && playerSum < burstSum){
    myOutputValue = `${playerWonMessage} ${showPlayerCards()} ${showDealerCards()} ${refreshMessage}`
    console.log(`Player won, both did not burst`)
    gameOver = true
    hitOrStand = false
    playerPoints += currentBet
    return myOutputValue
  }
}

// ==================  Check for BlackJack ================= \\
var checkBlackJack = function(){
  console.log(`Checking for BlackJack`)
  // check only the first two cards
  // check if dealer has blackjack first
  if(dealerCards.length == 2 && getSum(dealerCards) == 21){
    gameOver = true
    hitOrStand = false
    playerPoints -= currentBet
    myOutputValue = `${playerLostMessage} ${showDealerCards()} ${dealerBlackJackMessage} ${refreshMessage}`
    console.log(`Dealer got Black Jack`)
    return playerLostMessage
  } // if dealer did not have blackjack, check if player has
    else if (playerCards.length == 2 && getSum(playerCards) == 21 && getSum(dealerCards) != 21){
    gameOver = true
    hitOrStand = false
    playerPoints += currentBet
    myOutputValue = `${playerWonMessage} ${showPlayerCards()} ${playerBlackJackMessage} ${refreshMessage}`
    console.log(`Player got Black Jack`)
    return playerWonMessage
  }
}

// ==================  Sum of cards ================= \\
var getSum = function(playerOrDealerCards){
  console.log(`Trying to get sum`)
  var sum = 0
  var aceCounter = 0
  // loop to add value of each card to the current sum
  for(let cardCounter = 0; cardCounter < playerOrDealerCards.length; cardCounter += 1){
    currentCard = playerOrDealerCards[cardCounter]
    // if card is 2-10, add exact value of rank
    if (currentCard.rank >= 2 && currentCard.rank <= 10) {
      sum += currentCard.rank;
    } // if card is jack, queen or king, add 10 instead
      else if (currentCard.rank >= 11 && currentCard.rank <= 13) {
      sum += 10
    } // if card is ace, add 11
      else if (currentCard.rank == 1){
      aceCounter += 1
      sum += 11
    }
  }
  // if there is an ace in dealer/player's hand and it exceeds 21, change ace's value, one at a time, from 11 to 1, until it is 21 or less.
  if(sum >= burstSum && aceCounter > 0){
    for(checkingAllTheAcesCounter = 0; checkingAllTheAcesCounter < aceCounter ; checkingAllTheAcesCounter += 1){
      sum -= 10
    }
  }
  console.log(`sum ${sum}`)
  console.log(`finished summing`)
  return sum
}

// ==================  Output Messages ================= \\
var playerWonMessage = `You Won! <br>`
var playerLostMessage = `You Lost! <br>`
var drawMessage = `It is a draw! <br>`
var refreshMessage = `Please type "again" to start a new game. <br>`
var restartMessage = `You do not have enough points to continue betting! Please refresh the website to play again.`
var hitOrStandMessage = `Would you like to "Hit" or "Stand"? <br>`
var playerBlackJackMessage = `You have gotten BlackJack! <br>`
var dealerBlackJackMessage = `Dealer had a BlackJack! <br>`
var userNameInputMessage = `Hello, my name is Kenneth. I will be your dealer. Please input your name. <br>`
var secretCheatMessage = `Nice try! Please do not cheat :'). <br>`
var betMessage =  ``
  // converting message to string (copied as kept getting undefined in messages)
  var convertHandToString = function (hand) {
    return `[${hand.map((card) => card.name)}]`;
  };

  var showPlayerCards = function () {
    return `You have hand ${convertHandToString(playerCards)} with sum ${getSum(playerCards)}. <br>`
  };

  var showDealerCards = function () {
    return `Dealer has hand ${convertHandToString(dealerCards)} with sum ${getSum(dealerCards)}. <br>`
  } 

// ==================  Main Function ================= \\
var main = function(input){
  // welcomes the player
  if(welcomeMessage == true){
    console.log (`welcome message and ask player for their name`)
    myOutputValue = `${userNameInputMessage}`
    welcomeMessage = false
    return myOutputValue
  }
  // check if there is a player name
  if(userNameRecord == false && input != ""){
    console.log(`asking player for their bet`)
    userName = input
    userNameRecord = true
    myOutputValue = `Hi ${userName}! Let's play Black Jack! You currently have ${playerPoints} points. How much would you like to bet? (Min. 2 pts)`
    return myOutputValue
  }
  // check if game is completed
  if(gameOver == true){
    // reset the game if user types this input, keeping username and playerPoints
    if(input == "again"){
      gameOver = false
      betting = false
      initialDeal = false
      playerCards = []
      dealerCards = []
      deck = shuffleCards(makeDeck())
      myOutputValue = `Hi ${userName}! Let's play Black Jack! You currently have ${playerPoints} points. How much would you like to bet? (Min. 2 pts)`
      // if player has less than the minimum bet, ask them to restart game
      if(playerPoints <2){
        myOutputValue = restartMessage
        return myOutputValue
      }
      return myOutputValue
    }
    return refreshMessage
  }
  // ask player on bet amount
  if(betting == false && playerPoints >= 2 && input >= 2){
    // if player inputs more than playerPoints
    if(input > playerPoints){
      myOutputValue = `${secretCheatMessage} You currently have ${playerPoints} points. How much would you like to bet? (Min. 2 pts)` 
      return myOutputValue
    }
    console.log (`recording player's bet and ready to deal cards`)
    // track the player's bet
    currentBet = Number(input)
    console.log()
    initialDeal = true
    betting = true
    myOutputValue = `Sure ${userName}! You bet ${currentBet}. <br> May luck be in your favour. <br> Press submit to deal cards.` 
    return myOutputValue 
  }
  // deal first card to dealer, then player
  if(playerCards.length == 0 && initialDeal == true){
    dealCard(playerCards);
    dealCard(dealerCards);
  }
  // deal second card to dealer, then player
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
  if(playerCards.length == 2 && gameOver == false && hitOrStand == false && betting == true){
    // Check if either players got Black Jack
    checkBlackJack();
    if(gameOver == true){
      hitOrStand = false
      console.log(`There was a BlackJack`)
    } else if(gameOver == false){
      console.log(`No BlackJack`)
      hitOrStand = true
      return `${showPlayerCards()} ${hitOrStandMessage}`
    }
  } 
  
  // ==================  Player Hit or Stand ================= \\ 
  // If the player input anything other than hit or stand, ask them to do so.
  if((hitOrStand == true && input != "hit") && (hitOrStand == true && input != "stand")){
    myOutputValue = `${showPlayerCards()} ${hitOrStandMessage}`
    return myOutputValue
  }
  // player chooses hit
  if(hitOrStand == true && input == `hit`){
    console.log(`Player decided to hit`)
    dealCard(playerCards)
    console.log(`player cards`)
    console.log(playerCards)
    myOutputValue = `${showPlayerCards()} ${hitOrStandMessage}`
    // player busts while hitting
    if(getSum(playerCards) >= burstSum){
      gameOver = true
      hitOrStand = false
      playerPoints -= currentBet
      myOutputValue = `${playerLostMessage} ${showPlayerCards()} You Bust!`
      return myOutputValue
    }
  } 
  // player chooses stand
  if(hitOrStand == true && input == `stand`){
    // player can no longer hit
    hitOrStand = false
    console.log(`Player decided to stand`)
    // ==================  Dealer Hit or Stand ================= \\
    // If dealer has 16 or less total value
    while (getSum(dealerCards) <= dealerHitThreshold && gameOver == false) {
      dealCard(dealerCards);
      console.log(`dealer drawing more cards`)
      dealerSum = getSum(dealerCards);
      console.log(`Dealer cards`)
      console.log(dealerCards)
      // Dealer bursts
      if (dealerSum >= burstSum) {
        gameOver = true;
        hitOrStand = false
        playerPoints += currentBet
        return `${playerWonMessage} ${showPlayerCards()} ${showDealerCards()} Dealer bust! `;
      }
      console.log(`Dealer stopped drawing more cards`)
    }
    // Determine a winner
    compareSums()
  }
  return myOutputValue
      }
      