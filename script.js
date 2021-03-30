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
    while (rankCounter <= 10) {
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

// Initialize the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());
console.log(deck);

//! Code above from class materials...

// an array to hold player and dealer card hands
var playerHand = [];
var dealerHand = [];

// function to deal cards to player and dealer hand
function dealCards() {
  return this.deck.pop();
}

// function to track the sum of dealt hand
/* var sumOfHand = function (){
} */

// if player goes over sum of 21, "player bust"
// 17 points or higher dealer must stay

// function to reveal cards of player and dealer
function revealCards() {
  var i = 0;
  while (i <= 1) {
    playerHand.push(dealCards());
    dealerHand.push(dealCards());
    i++;
  }

  var dealerHandCards = dealerHand[0].name + ' of ' + dealerHand[0].suit
  + ' & ' + dealerHand[1].name + ' of ' + dealerHand[1].suit;

  var playerHandCards = playerHand[0].name + ' of ' + playerHand[0].suit
  + ' & ' + playerHand[1].name + ' of ' + playerHand[1].suit;

  var myOutputValue = 'Player Hand: ' + playerHandCards + ' <br> '
  + 'Dealer Hand : ' + dealerHandCards;

  console.log(myOutputValue);
  return myOutputValue;
}

// add up player hands and dealer hands
function sumOfHands() {
  // adding up the player and dealer hand by using Array.reduce -
  // to sum a property in an array of objects
  var playerHandsTotal = playerHand.reduce((previous, current) => previous + current.rank, 0);
  console.log('player total card count: ', playerHandsTotal);

  var dealerHandsTotal = dealerHand.reduce((previous, current) => previous + current.rank, 0);
  console.log('dealer total card count: ', dealerHandsTotal);
}

// hit user with a new card from the deck, dealer checks until min 17
function hitCard() {
  // if user types hit one more card is drawn from the deck
  playerHand.push(dealCards());
  var playerHitMessage = playerHand[2].name + ' of ' + playerHand[2].suit;

  dealerHand.push(dealCards());
  var dealerHitMessage = dealerHand[2].name + ' of ' + dealerHand[2].suit;

  var hitMessage = 'Player Hit: ' + playerHitMessage + '<br>'
  + 'Dealer Hit: ' + dealerHitMessage;

  return hitMessage;
}

// when player stay, dealer hits until min card value is 17
function stayCard() {
}

// comparison of cards between player and dealer

var main = function (input) {
// if user click input button, card is revealed from the hand
  if (input == '') {
    revealCards();
    sumOfHands();
  }
  console.log('player cards: ', playerHand);
  console.log('dealer cards: ', dealerHand);

  // if user inputs 'hit' run hit function
  if (input == 'hit') {
    hitCard();
    console.log(hitCard());
  }

  // if user inputs 'stay run stay function
  if (input == 'stay') {
    stayCard();
    console.log(stayCard());
  }
  // return comparison for winner and loser
};
