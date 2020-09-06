// two players - user vs. computer
// computer always 'dealer' -> hits if below 17
// whowever closer to 21 wins -> win if; (u > c) && ( u < 21 ) // lose if: ( x > 21 )
// aces are 1 or 11
// gameplay turns represented by main()

// sequence: game play turns represented by the main function
// deck is shuffled
// cards analyzed for win conditions (blackjack)
// cards are displayed to the user -> computer cards are hidden, duh...
// after above, new action... user to decide "hit" or "stand"
// computer also decides hit or stand

// for user choice to hit or stand... new action of user has different logic
// means game must have a mode to deal with this

// when user makes decision, cards are analyzed for winning conditions
// also analyzed for losing conditions...

var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    console.log(currSuit);
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' & 'queen' & 'king' = 10
      var cardValue = indexRanks;
      if (cardName == 1) {
        cardName = 'Ace';
      }
      if (cardName == 11) {
        cardName = 'Jack';
        cardValue = 10;
      }
      if (cardName == 12) {
        cardName = 'Queen';
        cardValue = 10;
      }
      if (cardName == 13) {
        cardName = 'King';
        cardValue = 10;
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
        value: cardValue,
      };
      console.log('rank: ' + indexRanks);
      console.log('value: ' + cardValue);
      console.log(card);
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
};

var defineAce = function () {
  // if hand value > 10, ace = 1, if hand value <= 10, ace = 11
};

// BLACKJACK LETS GO!!
var main = function (input) {
  var myOutputValue = 'hello world';
  return myOutputValue;
};
