// initialize constants
var MAX_SCORE = 21;
var INITIAL_NUMBER_OF_CARDS_DRAWN = 2;
var GAME_STARTED = 'game started';
var CHOOSE_HIT_OR_STAND = 'choose hit or stand';
var SHOW_HANDS = 'show hands';

// initialize string instruction constants
var HIT_OR_STAND_INSTRUCTIONS = 'Do you wish to hit or stand? To hit, type in <i>hit</i> in the input box above and click Submit. Otherwise, type in <i>stand</i> in the input box above and click Submit.';
var SHOW_HAND_INSTRUCTIONS = 'Click Submit and we will display the results of this round.';
var FORCED_STAND_INSTRUCTIONS = 'Your current minimum score is now <strong>' + MAX_SCORE + ' or above</strong>, and you can\'t hit anymore. ' + SHOW_HAND_INSTRUCTIONS;
var BLACKJACK_FLAVOUR_TEXT = 'IT\'S A BLACKJACK!';

// initialize variables;
var gameMode = GAME_STARTED;

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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var getInitialCards = function (deck) {
  var hand = [];
  var counter = 0;
  while (counter < INITIAL_NUMBER_OF_CARDS_DRAWN) {
    var card = deck.pop();
    hand.push(card);
    counter += 1;
  }

  return hand;
};

// calculates the score of current hand
// stored as a pair, minScore in index 0 and maxScore in index 1
// minimum and maximum scores stored as feedback, because aces
// are counted as 1 or 11.
var getCurrentHandMinMaxScore = function (cards) {
  var minScore = 0;
  var maxScore = 0;
  var counter = 0;
  while (counter < cards.length) {
    if (cards[counter].name == 'ace') {
      minScore += 1;
      maxScore += 11;
    } else if (cards[counter].name == 'jack' || cards[counter].name == 'queen' || cards[counter].name == 'king') {
      minScore += 10;
      maxScore += 10;
    } else {
      minScore += cards[counter].rank;
      maxScore += cards[counter].rank;
    }
    counter += 1;
  }

  return [minScore, maxScore];
};

// checks if a hand is a blackjack
var isBlackjack = function (cards) {
  // blackjack: max score from 2 cards will be 21
  if (cards.length == 2 && getCurrentHandMinMaxScore(cards)[1] == 21) {
    return true;
  }

  return false;
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

// prints card name and suit
var showCard = function (card) {
  return card.name + ' of ' + card.suit;
};

// prints cards in hand of a player
var showCards = function (cards, playerType) {
  var output = 'Your cards are ';
  if (playerType == 'computer') {
    output = 'Computer\'s cards are ';
  }
  var counter = 0;
  while (counter < cards.length) {
    output = output + '<strong>' + showCard(cards[counter]) + '</strong>';
    counter += 1;
    if (counter != cards.length) {
      output = output + ' and ';
    }
  }
  output = output + '.';
  return output;
};

var showScores = function (cards, playerType) {
  if (isBlackjack(cards)) {
    return BLACKJACK_FLAVOUR_TEXT;
  }

  // not blackjack
  var output = 'Your current score is ';

  if (playerType == 'computer') {
    output = 'Computer\'s current score is ';
  }
  // no ace drawn
  if (getCurrentHandMinMaxScore(cards)[0] == getCurrentHandMinMaxScore(cards)[1]) {
    output = output + '<strong>' + getCurrentHandMinMaxScore(cards)[0] + '</strong>';
  }
  // at least 1 ace in the hand
  else {
    output = output + 'a minimum of <strong>' + getCurrentHandMinMaxScore(cards)[0] + '</strong>, and a maximum of <strong>' + getCurrentHandMinMaxScore(cards)[1] + '</strong>, because at least 1 <strong>ace</strong> is drawn';
  }

  output = output + '.';

  return output;
};

// create initial deck
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// assign first 2 cards to player and computer
var playerCards = getInitialCards(shuffledDeck);
var computerCards = getInitialCards(shuffledDeck);

var main = function (input) {
  var sanitisedInput = input.trim().toLowerCase();
  var myOutputValue = '';

  if (gameMode == GAME_STARTED) {
    myOutputValue = showCards(playerCards, 'player') + '<br />' + showScores(playerCards, 'player') + '<br /><br />';

    if (isBlackjack(playerCards)) {
      myOutputValue = myOutputValue + SHOW_HAND_INSTRUCTIONS;
      gameMode = SHOW_HANDS;
    } else {
      myOutputValue = myOutputValue + HIT_OR_STAND_INSTRUCTIONS;
      gameMode = CHOOSE_HIT_OR_STAND;
    }

    return myOutputValue;
  }

  if (gameMode == CHOOSE_HIT_OR_STAND) {
    // input validation
    if (sanitisedInput !== 'hit' && sanitisedInput !== 'stand') {
      myOutputValue = 'Please enter a valid input.<br /><br />' + showCards(playerCards, 'player') + '<br />' + showScores(playerCards, 'player') + '<br /><br />' + HIT_OR_STAND_INSTRUCTIONS;
      return myOutputValue;
    }

    if (sanitisedInput == 'hit') {
      var drawnCard = shuffledDeck.pop();
      playerCards.push(drawnCard);
      myOutputValue = 'You have decided to hit. You drew <strong>' + showCard(drawnCard) + '</strong>.<br /><br />' + showCards(playerCards, 'player') + '<br />' + showScores(playerCards, 'player') + '<br /><br />';

      if (getCurrentHandMinMaxScore(playerCards)[0] >= MAX_SCORE) {
        myOutputValue = myOutputValue + FORCED_STAND_INSTRUCTIONS;
        gameMode = SHOW_HANDS;
      } else {
        myOutputValue = myOutputValue + HIT_OR_STAND_INSTRUCTIONS;
      }

      return myOutputValue;
    }

    myOutputValue = 'You have decided to stand. ' + showCards(playerCards, 'player') + '<br />' + showScores(playerCards, 'player') + '<br /><br />' + SHOW_HAND_INSTRUCTIONS;
    gameMode = SHOW_HANDS;
    return myOutputValue;
  }

  // show hands
  // computer draws
  while (
    getCurrentHandMinMaxScore(computerCards)[0] < 17
  ) {
    var computerCard = shuffledDeck.pop();
    computerCards.push(computerCard);
  }
  myOutputValue = showCards(playerCards, 'player') + '<br />' + showScores(playerCards, 'player') + '<br /><br />' + showCards(computerCards, 'computer') + '<br />' + showScores(computerCards, 'computer');
  return myOutputValue;
};
