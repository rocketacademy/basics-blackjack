var playerArrayOfCards = [];
var dealerAarrayOfCards = [];
var gameMode = 'input username';
var deck = [];
var userName = ''
var twentyOne = 21;
var dealerThreshold = 16;
var playerChoseToSkip = false;
var gameOver = false;
var playerTotalSum = (calSumInHand(playerArrayOfCards))
var dealerTotalSum = (calSumInHand(dealerAarrayOfCards))


var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  var currentEmoji = "";
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    if (currentSuit == "hearts") {
      currentEmoji = "♥️";
    } else if (currentSuit == "diamonds") {
      currentEmoji = "♦";
    } else if (currentSuit == "spades") {
      currentEmoji = "♠";
    } else if (currentSuit == "clubs") {
      currentEmoji = "♣️";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "king";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitEmoji: currentEmoji,
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
var deck = makeDeck();

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
var shuffledDeck = shuffleCards(deck);


var main = function (input) {
   if (gameOver) {
    return `Game is over. Please refresh to play another round.`
  };

  makeDeck();
  shuffleCards(deck);
  var myOutputValue = ''
  // username input
  if (gameMode == 'input username'){
    if (!userName) {
      if (!input) {
    myOutputValue = `Please input a username`
    return myOutputValue
      }
    };

  if (userName = input) {
  gameMode = 'start'
  myOutputValue = `Hello ${userName}, you have a cool name! Please click Submit to start playing Blackjack!`
}
  if (gameMode == "start") {
    if (playerArrayOfCards.length == 0) {
      dealCardToHand(playerArrayOfCards);
      dealCardToHand(dealerAarrayOfCards);
      dealCardToHand(playerArrayOfCards);
      dealCardToHand(dealerAarrayOfCards);
      gameMode = 'Blackjack'
    };
  
  if (gameMode == 'Blackjack') {
    if (isBlackjack(dealerAarrayOfCards)) {
      gameOver = true;
      myOutputValue = `Dealer wins with Blackjack. Please refresh to play again`;
    }
    else if (isBlackjack(playerArrayOfCards)) {
      gameOver = true;
      myOutputValue = `${userName} wins with Blackjack. Please refresh to play again`;
  }
  else {
    gameMode = 'player choose hit or skip'
      myOutputValue =  `Please enter "hit" or "skip" and press Submit to continue.`;
  }
    return `${getStandardOutputValue()} <br>
     ${myOutputValue}`
};

if (!playerChoseToSkip) {
  if (input !== 'hit' && input !== 'skip') {
    return `Please input 'hit' or 'skip' to continue.`
  }
};

  if (input == 'hit') {
    dealCardToHand(playerArrayOfCards);
    if (calSumInHand(playerArrayOfCards > twentyOne)) {
      gameOver = true;
      return `${getStandardOutputValue()} <br>
      ${userName} busted and loses. Please refresh to play again.`;
    }
  }
if (input == 'skip') {
  playerChoseToSkip = true;
  }
}

var dealerCardsSum = calSumInHand(dealerAarrayOfCards);
if (dealerCardsSum <= dealerThreshold) {
  dealCardToHand(dealerAarrayOfCards);
  dealerCardsSum = calSumInHand(dealerAarrayOfCards);
  if (calSumInHand(dealerAarrayOfCards > twentyOne)) {
  gameOver = true;
  return `${getStandardOutputValue()} <br>
  Dealer busted and ${userName} wins. Please refresh to play again.`;
  }
}

  if (playerChoseToSkip && dealerCardsSum > dealerThreshold) {
    gameOver = true;
    if (calSumInHand(playerArrayOfCards) > dealerCardsSum) {
      return `${getStandardOutputValue()} <br>
        ${userName} wins! Please refresh to play again.`;
    }
    return `${getStandardOutputValue()} <br>
      Dealer wins! Please refresh to play again.`;
  }
  return `${getStandardOutputValue()} <br>
    playerChoseToSkip is ${playerChoseToSkip} <br>
    No valid input, please enter "hit" or "skip". <br>
    Else, press Submit to continue.`;
}
};


// Deal cards to hand
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

// sum of cards in hand
// doesn't work
var calSumInHand = function (hand) {
  var numOfAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currentCard = hand[counter];
    if (currentCard.rank == 1){
      numOfAcesInHand += 1;
      sum += 11;
    }
    else {
      sum += currentCard.rank;
    }
    counter += 1
  }
};

// covert ace rank from 11 to 1
// don't know how to do
var convertAceValue = function () {
  if (numOfAcesHand >= 1) {
   if (playerTotalSum <= 21) {
    currentCard.rank == 11
  } else {
    currentCard.rank == 1
  }
  if (dealerTotalSum <= 21) {
    currentCard.rank == 11
  } else {
    currentCard.rank == 1
  }
}
};

// when the hand is blackjack
var isBlackjack = function (hand) {
return hand.length == 2 && calSumInHand(hand) == twentyOne;
};

var convertHandToString = function (hand) {
  var cards = "";
  var handIndex = 0;
  while (handIndex < hand.length) {
    cards = `${cards}, ${hand[handIndex].name}`;
    handIndex += 1;
  }
  return cards;
};

var getStandardOutputValue = function () {
  return `${userName}'s hand ${convertHandToString(
    playerArrayOfCards
  )} with sum ${calSumInHand(playerArrayOfCards)}. <br>
    Dealer's hand ${convertHandToString(
      dealerAarrayOfCards
    )} with sum ${calSumInHand(dealerAarrayOfCards)}.`;
};