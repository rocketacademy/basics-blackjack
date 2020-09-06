// two players - user vs. computer
// computer always 'dealer' -> hits if below 17
// whowever closer to 21 wins -> win if; (u > c) && ( u < 21 ) // lose if: ( x > 21 )
// aces are 1 or 11
// gameplay turns represented by main()

// sequence: game play turns represented by the main function
// 1. deck is shuffled - DONE
// 2. cards analyzed for win conditions (blackjack) - DONE
// 3. cards are displayed to the user -> computer cards are hidden, duh... - DONE
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
  var foundAce = 0;
  var handIndex = 0;
  // while loop to find ace
  while (handIndex < hand.length) {
    var currCard = hand[handIndex];
    if (currCard.name == 'Ace') {
      foundAce = foundAce + 1;
    }
    handIndex = handIndex + 1;
  }
  return foundAce;
};

// display hand + details
var displayHand = function (hand, handValue) {
  var message = 'Hand:<br>';
  var printHandIndex = 0;
  while (printHandIndex < hand.length) {
    message = message + '- ' + hand[printHandIndex].name + ' of ' + hand[printHandIndex].suit + '<br>';
    printHandIndex = printHandIndex + 1;
  }
  message = message + 'Hand value: ' + handValue;
  return message;
};
// hit + stand instructions
var instructions = function () {
  var text = '';
  text = '<br><br> Please enter "hit" or "stand" to continue<br><br>';
  text = text + 'Hit: to draw another card.<br>Stand: to lock in your hand<br><br>NOTE! If you hit and you get more than 21, you lose!';
  return text;
};
// resolve hand function
var resolveHands = function (userValue, comValue) {
  var gameEndText = '';
  if (comValue > 21 || userValue > comValue) {
    gameEndText = 'You won!';
  } else if (userValue < comValue) {
    gameEndText = 'You lost!';
  } else if (userValue == comValue) {
    gameEndText = 'You did well but you tied!';
  } else {
    gameEndText = 'Sorry, there is an error, please refresh the page and notify Bryan!';
  }
  return gameEndText;
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
    myOutputValue = 'Welcome, you are playing Blackjack. <br>You are up against a computer, the dealer.<br><br>';
    myOutputValue = myOutputValue + 'Winner: higher hand value<br>';
    myOutputValue = myOutputValue + 'Immediate win: Blackjack (10/J/Q/K + A)<br>';
    myOutputValue = myOutputValue + 'Immediate lose: hand value > 21<br>The dealer ALWAYS hits if their hand is below 17!<br><br>';
    myOutputValue = myOutputValue + 'Numbers = their value<br>Ace = 1 or 11<br>J-Q-K = 10<br><br>';
    myOutputValue = myOutputValue + 'Smash the button again and you will get your hand. <br>';
    myOutputValue = myOutputValue + 'Instructions will continue to guide you, please enjoy!';
  } else if (mode == 'draw hand') {
    mode = 'hit or stand';
    // user hand
    userHand.push(gameDeck.pop());
    userHand.push(gameDeck.pop());
    userHandValue = countHandValue(userHand);
    // com hand
    comHand.push(gameDeck.pop());
    comHand.push(gameDeck.pop());
    comHandValue = countHandValue(comHand);

    // display user hand
    myOutputValue = 'Your ' + displayHand(userHand, userHandValue) + instructions();

    // check for blackjacks (22 for double 'ace')
    if (userHandValue == 21 && comHandValue == 21) {
      mode = 'end of round';
      myOutputValue = 'Blackjack! However, both of you got it... truly unfortunate. You tied!<br><br>' + displayHand(userHand, userHandValue) + '<br><br>';
      myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
    } else if (userHandValue == 21 || userHandValue == 22) {
      mode = 'end of round';
      myOutputValue = 'Blackjack! You won!<br><br>' + displayHand(userHand, userHandValue) + '<br><br>';
      myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
    } else if (comHandValue == 21 || comHandValue == 22) {
      mode = 'end of round';
      myOutputValue = 'Computer Blackjack! You lost!<br><br>' + displayHand(userHand, userHandValue) + '<br><br>';
      myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
    }
  } else if (mode == 'hit or stand') {
    // rest of game happens here
    // code comHand; goal: x > 17
    var comHandResolved = false;
    while (comHandResolved == false) {
      comHandValue = countHandValue(comHand);
      // factoring in ace 1/11
      comHandValue = comHandValue - (10 * findAce(comHand));
      if (comHandValue >= 17) {
        comHandResolved = true;
      } else if (comHandValue < 17) {
        comHand.push(gameDeck.pop());
      }
    }
    console.log(comHand);
    console.log(comHandValue);

    // input validation, only 'hit or 'stand';
    // if hit: draw card, check lose conditions, if x < 21, display hand, else, lose screen
    if (input.toLowerCase() == 'hit') {
      userHand.push(gameDeck.pop());
      userHandValue = countHandValue(userHand);
      userHandValue = userHandValue - (10 * findAce(userHand));
      // display user hand
      myOutputValue = 'Your ' + displayHand(userHand, userHandValue) + instructions();
      // end of round conditions
      if (userHandValue == 21) {
        // auto-stand
        mode = 'end of round';
        myOutputValue = 'Good job, you hit 21 on the dot!<br><br>' + resolveHands(userHandValue, comHandValue) + '<br><br>Your ' + displayHand(userHand, userHandValue);
        myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
      } else if (userHandValue > 21) {
        mode = 'end of round';
        if (comHandValue > 21) {
          myOutputValue = 'You exceeded 21!! :() <br>But so did the computer you lucky person! <br><br>Your ' + displayHand(userHand, userHandValue);
          myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
        } else {
          myOutputValue = 'You lost! Your hand value exceeded 21!<br><br>Your ' + displayHand(userHand, userHandValue);
          myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
        }
      }
    } else if (input.toLowerCase() == 'stand') {
      userHandValue = countHandValue(userHand);
      userHandValue = userHandValue - (10 * findAce(userHand));
      // stand goes into mode = 'end of round'
      // compare hand values
      mode = 'end of round';
      myOutputValue = resolveHands(userHandValue, comHandValue);
      myOutputValue = myOutputValue + 'Your ' + displayHand(userHand, userHandValue);
      myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
    } else {
      myOutputValue = 'Error detected! Please only input "hit" or "stand". Thank you.<br><br>';
      // display user hand
      userHandValue = countHandValue(userHand);
      myOutputValue = myOutputValue + displayHand(userHand, userHandValue) + instructions();
    }
  } else if (mode == 'end of round') {
    // if continue... input > mode = 'draw hand'
    // do I need to have a "reshuffle deck" function?
    // if deck.length < 10... newdeck(); or something
  } else {
    // error mode, ask to refresh and notify for debugging
    myOutputValue = 'There has been an error. Please refresh the page and continue play if you want. However, please do Bryan a favor and inform him that there was this error.';
  }
  return myOutputValue;
};
