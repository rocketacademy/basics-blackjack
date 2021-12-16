// create function to assemble cards: makeDeck
var makeDeck = function () {
  // make 52 cards
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // create a loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // store current suit in a variable
    var currentSuit = suits[suitIndex];

    // create a loop inside the suits array loop
    // loop from 1-13 to create all cards for a given suit
    // rank counter starts from 1 and not 0, and ends at 13
    // a loop without an array
    var rankCounter = 1;
    while (rankCounter <= 13) {
      //by default, the card name is the same as rankCounter

      var cardName = rankCounter;
      // special case for 1, 11, 12 and 13 where the card name is different from rankCounter
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      // create a new card object with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // add the new card to the deck
      cardDeck.push(card);
      //console.log(card);
      // increment rankCounter to iterate over the next rank (indicidual cards)
      rankCounter += 1;
    }
    // increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  return cardDeck;
};
// assemble the card and input into a new global variable
var deck = makeDeck();
// console.log(deck);
console.log(JSON.parse(JSON.stringify(deck)));

// Get a random index ranging from 0 (inclusive) to max number of cards (exclusive).
var getRandomIndex = function (deckLength) {
  return Math.floor(Math.random() * deck.length);
};
// shuffle card function
var shuffleDeck = function (deck) {
  var index = 0;

  while (index < deck.length) {
    var randomIndex = getRandomIndex(deck.length);
    var currentCard = deck[index];
    var randomCard = deck[randomIndex];
    deck[index] = randomCard;
    deck[randomIndex] = currentCard;

    index = index + 1;
  }
  return deck;
};
// shuffle the deck and save it in a new global variable
var shuffledCards = shuffleDeck(deck);

// User clicks Submit to deal cards.
// A starting hand of 2 cards for each player.
// store the drawn cards into array

// declare a new array to store drawn cards
var dealerCards = [];
var playerCards = [];
// declare a new variable to display all drawn cards
var playerAllCards = "";
var dealerAllCards = "";
// function to store drawn cards into array
var storeCards = function () {
  for (i = 0; i < 2; i += 1) {
    var playerDrawn = shuffledCards.pop();
    var dealerDrawn = shuffledCards.pop();
    playerCards.push(playerDrawn);
    playerAllCards =
      playerAllCards + playerDrawn.name + " of " + playerDrawn.suit + ",";
    dealerCards.push(dealerDrawn);
    dealerAllCards =
      dealerAllCards + dealerDrawn.name + " of " + dealerDrawn.suit + ",";
  }
};

var main = function () {
  storeCards();

  // construct an output string to communicate which cards were drawn
  var myOutputvalue = `Dealer drew ${dealerAllCards} <br> Player drew ${playerAllCards}`;

  return myOutputvalue;
};

// The cards are analysed for game win/draw/lose conditions
// winning conditions:
// a. A Blackjack win. When either player or dealer draw Blackjack.
// a.i. player = 21 or com = 21
// b. A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total
// b.i. player total cards is bigger than com total cards but smaller than 21
// b.ii. 22>player cards && player cards> com cards = win
// c.  A tie. When both the player and dealer have the same total hand values - or if both draw Blackjack
// d. ace can be 1 or 11 > how to decide this?

// The cards are displayed to the user.
// output drawn cards

// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.
