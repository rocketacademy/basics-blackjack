/**
 * Add all elements from fromArray to the start of toArray.
 */
var addArray = function (fromArray, toArray) {
  var fromArrayIndex = 0;
  while (fromArrayIndex < fromArray.length) {
    // Add each element in fromArray to toArray individually
    toArray.unshift(fromArray[fromArrayIndex]);
    // Increment the index to operate on the next index of fromArray
    fromArrayIndex += 1;
  }
  return toArray;
};

/**
 * Create a standard 52-card deck
 */
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

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// ! above code from class

// initialize the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

var playerHand = [];
var dealerHand = [];

var mode = '';

var myOutputValue = '';

// check for blackack and also check for what to do next
// adding up the player and dealer hand by using Array.reduce -
// to sum a property in an array of objects
function sumOfHands(handsTotal) {
  var playerHandsTotal = playerHand.reduce((previous, current) => previous + current.rank, 0);
  console.log('player total card count: ', playerHandsTotal);

  var playerScore = playerHandsTotal;
  if (playerScore == 21) {
    return 'player has blackjack! player wins!';
  } if (playerScore > 21) {
    return 'player went over 21, it"s a bust';
  } if (playerScore < 21) {
    mode = 'PLAYER_MODE';
    return 'you can hit or stay, the choice is yours!';
  }

  var dealerHandsTotal = dealerHand.reduce((previous, current) => previous + current.rank, 0);
  console.log('dealer total card count: ', dealerHandsTotal);
  if (dealerScore > 21) {
    // if dealer bust goto restart mode
    return 'dealer bust!';
  }
  if (dealerScore < 17) {
    // if dealer has less than 17 get new card from deck
    dealerHand.push(deck.pop());
    return 'dealer hits until 17 or higher is reached';
  }
  if (dealerScore >= 17) {
    // if dealer gets 17 or higher goto score comparison mode
    mode = 'COMPARE_SCORES';
    return 'dealer stays let"s compare scores';
  }
}

// player mode where player can hit or stay
function playerTurn(input) {
  mode = 'PLAYER_MODE';
  var playerChoice = input;
  // player can either hit or stay depending on the input
  if (playerChoice == 'hit') {
    playerHand.push(deck.pop());
    return sumOfHands(playerHand);
  }
  if (playerChoice == 'stay') {
    mode = 'DEALER_MODE';
    return 'you have decided to stay, now it is dealer turn';
  }

  return 'please type hit or stay to play the game';
}

// dealer mode where the total number of dealer card is checked
function dealerTurn() {
  mode = 'DEALER_MODE';
  var dealerScore = sumOfHands(dealerHandsTotal);
  if (dealerScore < 17) {
    var i = 1;
    while (i < dealerscore) {
      dealerHand.push(deck.pop());
      i += 1;
    }
    return 'dealer has hit' + dealerScore;
  }
}

// player and dealer are dealt cards
var dealCards = function () {
  mode = 'START_GAME';
  // cards are dealt to the player and dealer
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];

  // check player cards for blackjack
  return sumOfHands(playerHand);
};

var main = function (input) {
  if (input == '') {
    mode = 'START_GAME';
    dealCards();
  }
  if (mode == 'PLAYER_MODE') {
    playerTurn();
    return playerTurn(input);
  }
  if (mode == 'DEALER_MODE') {
    dealerTurn();
  }
  return myOutputValue;
};
