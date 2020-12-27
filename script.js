// There will be only two players. One human and one computer.
// The computer will always be the dealer. The dealer has to hit if their hand is below 17.
// The player who is closer to 21 wins the hand. Aces can be 1 or 11.

// Deck is shuffled.
// User clicks submit button to deal cards.
// The cards are analysed for any game winning conditions. (E.g. Blackjack)
// The cards are displayed to the user.
// Then begins a new action, where the user has to decide whether to hit or stand, using the submit button to submit their choice.
// When the user makes a decision the cards are analysed for winning conditions. They are also analysed for losing conditions, since it's possible for any player to lose now.
// The computer also decides to hit or stand automatically based on game rules.
// Either the game ends or continues.

// global variables
var mode = 'cards are picked';
var myOutputValue = '';
var playerCard1 = {};
var playerCard2 = {};
var computerCard1 = {};
var computerCard2 = {};

// deck of cards, presented in an object
var makeDeck = function () {
  var deck = [];
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = 'Ace';
      } else if (cardName == 11) {
        cardName = 'Jack';
      } else if (cardName == 12) {
        cardName = 'Queen';
      } else if (cardName == 13) {
        cardName = 'King';
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

// shuffle card function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var currentIndex = 0;

  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[currentIndex];
    var randomItem = cards[randomIndex];

    cards[currentIndex] = randomItem;
    cards[randomIndex] = currentItem;

    currentIndex = currentIndex + 1;
  }

  return cards;
};

// displaying player and computer cards helper function
var displayCards = function () {
  return `Player card 1: ${playerCard1.name} of ${playerCard1.suit}<br>
    Player card 2: ${playerCard2.name} of ${playerCard2.suit}<br>
    <br>
    Computer card 1: ${computerCard1.name} of ${computerCard1.suit}<br>
    Computer card 2: ${computerCard2.name} of ${computerCard2.suit}`;
};

// check for winning conditions function
var checkForWinningConditions = function () {
  var message = `You got ${playerCard1.rank + playerCard2.rank}<br>
    The computer got ${computerCard1.rank + computerCard2.rank}<br><br>`;

  if (playerCard1.rank + playerCard2.rank == 21) {
    message += `BLACKJACK !!<br><br>
    YOU WIN !!`;
    return message;
  }

  if (playerCard1.rank + playerCard2.rank > 21) {
    message += `You bust!<br>
    YOU LOSE !!`;
    return message;
  }

  if (computerCard1.rank + computerCard2.rank > 21) {
    message += `Dealer busts!<br>
    YOU WIN !!`;
    return message;
  }

  if (playerCard1.rank + playerCard2.rank > computerCard1.rank + computerCard2.rank) {
    message += 'YOU WIN !!';
  } else if (computerCard1.rank + computerCard2.rank > playerCard1.rank + playerCard2.rank) {
    message += 'YOU LOSE !!';
  } else {
    message += 'IT\'S A TIE';
  }
  return message;
};

var main = function (input) {
  while (mode == 'cards are picked') {
    var cards = shuffleCards(makeDeck());
    // obtaining player cards
    playerCard1 = cards.pop();
    playerCard2 = cards.pop();

    // obtaining computer cards
    computerCard1 = cards.pop();
    computerCard2 = cards.pop();

    // check for winning conditions and display player's and computer's cards
    myOutputValue = checkForWinningConditions() + '<br><br>' + displayCards();
    return myOutputValue;
  }
};
