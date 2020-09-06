// two players - user vs. computer
// computer always 'dealer' -> hits if below 17
// whowever closer to 21 wins -> win if; (u > c) && ( u < 21 ) // lose if: ( x > 21 )
// aces are 1 or 11
// gameplay turns represented by main()

// sequence: game play turns represented by the main function
// 1. deck is shuffled
// 2. cards analyzed for win conditions (blackjack)
// 3. cards are displayed to the user -> computer cards are hidden, duh...
// 4. after above, new action... user to decide "hit" or "stand"
// 5. computer also decides hit or stand

// for user choice to hit or stand... new action of user has different logic
// means game must have a mode to deal with this

// when user makes decision, cards are analyzed for winning conditions
// also analyzed for losing conditions...

// global variables
var mode = 'initialize';
var userHand = [];
var comHand = [];

var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' & 'queen' & 'king' = 10
      var cardValue = indexRanks;
      if (cardName == 1) {
        cardName = 'Ace';
        cardValue = 11;
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
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
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

// randomizer to shuffle deck
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
// shuffle deck function
var shuffleDeck = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);

    var currentItem = cards[index];

    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

// function to define hand value
var countHandValue = function (hand) {
  var index = 0;
  var handValue = 0;
  while (index < hand.length) {
    var currCard = hand[index];
    handValue = handValue + currCard.value;
    index = index + 1;
  }
  return handValue;
};
// find ace function
var findAce = function (hand) {
  var foundAce = false;
  var handIndex = 0;
  // while loop to find ace
  while (handIndex < hand.length) {
    var currCard = hand[handIndex];
    if (currCard.name == 'Ace') {
      foundAce = true;
      return foundAce;
    }
    handIndex = handIndex + 1;
  }
  return foundAce;
};

// create and shuffle deck
var freshDeck = createDeck();

// BLACKJACK LETS GO!!
var main = function (input) {
  var myOutputValue = 'hello world';
  var gameDeck = shuffleDeck(freshDeck);
  var userHandValue = 0;
  var comHandValue = 0;
  if (mode == 'initialize') {
    mode = 'draw hand';
    myOutputValue = 'Welcome, you are playing blackjack. You are playing against a computer player, the dealer.<br><br>';
    myOutputValue = myOutputValue + 'Winner: higher hand value<br>';
    myOutputValue = myOutputValue + 'Immediate win: Blackjack (10/J/Q/K + A)<br>';
    myOutputValue = myOutputValue + 'Immediate lose: hand value > 21<br>The dealer ALWAYS hits if their hand is below 17!<br><br>';
    myOutputValue = myOutputValue + 'Numbers = their value<br>Ace = 1 or 11<br>J-Q-K = 10<br><br>';
    myOutputValue = myOutputValue + 'Smash the button again and you will get your hand. <br>';
    myOutputValue = myOutputValue + 'Instructions will continue to guide you, please enjoy!';
  } else if (mode == 'draw hand') {
    // user hand
    userHand.push(gameDeck.pop());
    userHand.push(gameDeck.pop());
    userHandValue = countHandValue(userHand);
    // com hand
    comHand.push(gameDeck.pop());
    comHand.push(gameDeck.pop());
    comHandValue = countHandValue(comHand);
    console.log(comHand);
    console.log(comHandValue);

    // display user hand
    myOutputValue = 'Your hand:<br>- ' + userHand[0].name + ' of ' + userHand[0].suit + '<br>- ' + userHand[1].name + ' of ' + userHand[1].suit + '<br>';
    myOutputValue = myOutputValue + 'Hand value: ' + userHandValue;
    // check for blackjacks
    if (userHandValue == 21 && comHandValue == 21) {
      myOutputValue = 'Blackjack! However, both of you got it... truly unfortunate. You tied!<br><br>' + myOutputValue + '<br><br>';
      myOutputValue = myOutputValue + 'Computer hand:<br>- ' + comHand[0].name + ' of ' + comHand[0].suit + '<br>- ' + comHand[1].name + ' of ' + comHand[1].suit + '<br>';
    } else if (userHandValue == 21) {
      myOutputValue = 'Blackjack! You won!<br><br>' + myOutputValue + '<br><br>';
      myOutputValue = myOutputValue + 'Computer hand:<br>- ' + comHand[0].name + ' of ' + comHand[0].suit + '<br>- ' + comHand[1].name + ' of ' + comHand[1].suit + '<br>';
    } else if (comHandValue == 21) {
      myOutputValue = 'Computer Blackjack! You lost!<br><br>' + myOutputValue + '<br><br>';
      myOutputValue = myOutputValue + 'Computer hand:<br>- ' + comHand[0].name + ' of ' + comHand[0].suit + '<br>- ' + comHand[1].name + ' of ' + comHand[1].suit + '<br>';
    }
  }
  return myOutputValue;
};

// cheat card
// userHand = [{
//   name: 'Ace',
//   suit: 'Diamonds',
//   rank: 1,
//   value: 11,
// },
// {
//   name: 'Jack',
//   suit: 'Diamonds',
//   rank: 11,
//   value: 10,
// },
// ];
