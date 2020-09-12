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
      if (cardName == 1) {
        cardName = 'Ace';
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = 'Jack';
      }
      if (cardName == 12) {
        cardName = 'Queen';
      }
      if (cardName == 13) {
        cardName = 'King';
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
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
  var aceFound = 0;
  var handValue = 0;
  var index = 0;
  while (index < hand.length) {
    var currCard = hand[index];
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      handValue = handValue + currCard.rank;
    } else if (currCard.rank > 10 && currCard.rank <= 13) {
      // value for Jack, Queen, King
      handValue = handValue + 10;
    } else if (currCard.rank == 1) {
      // default Ace value: 11
      handValue = handValue + 11;
      aceFound = aceFound + 1;
    }
    if (handValue < 10 && aceFound > 0) {
      handValue = handValue - (aceFound * 10);
    }
    index = index + 1;
  }
  return handValue;
};
// display hand + details
var displayHand = function (hand, handValue) {
  var message = 'hand:<br>';
  var printHandIndex = 0;
  while (printHandIndex < hand.length) {
    message = message + '- ' + hand[printHandIndex].name + ' of ' + hand[printHandIndex].suit + '<br>';
    printHandIndex = printHandIndex + 1;
  }
  message = message + 'Hand value: ' + handValue;
  return message;
};
// hit + stand instructions
var hitStandInstructions = function () {
  var text = '';
  text = '<br><br> Please enter "hit" or "stand" to continue<br><br>';
  text = text + 'Hit: to draw another card.<br>';
  text = text + 'Stand: to lock in your hand<br><br>NOTE! If you hit and you get more than 21, you lose!';
  return text;
};
// resolve hand function
var resolveHands = function (userValue, comValue) {
  var gameEndText = '';
  if (comValue > 21 || userValue > comValue) {
    gameEndText = 'You won!<br>To continue, hit the button to reset your hand<br><br>';
  } else if (userValue < comValue) {
    gameEndText = 'You lost!<br>To continue, hit the button to reset your hand<br><br>';
  } else if (userValue == comValue) {
    gameEndText = 'You did well but you tied!<br>To continue, hit the button to reset your hand<br><br>';
  } else {
    gameEndText = 'Sorry, there is an error, please refresh the page and notify Bryan!';
  }
  return gameEndText;
};
// create and shuffle deck
var createGameDeck = function () {
  var freshDeck = createDeck();
  var shuffledDeck = shuffleDeck(freshDeck);
  return shuffledDeck;
};
var firstDeck = createGameDeck();
// BLACKJACK LETS GO!!
var main = function (input) {
  var myOutputValue = 'hello world';
  var gameDeck = firstDeck;
  if (gameDeck.length < 10) {
    gameDeck = createGameDeck();
  }
  var userHandValue = 0;
  var userSplitHandValue = 0;
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
    myOutputValue = 'Your ' + displayHand(userHand, userHandValue) + hitStandInstructions();
    // check for blackjacks (22 for double 'ace')
    if ((userHandValue == 21 && comHandValue == 21)
      || (userHandValue == 22 && comHandValue == 22)) {
      mode = 'end of round';
      myOutputValue = 'Blackjack! However, both of you got it... truly unfortunate. You tied!<br>To continue, hit the button to reset your hand<br><br>';
      myOutputValue = myOutputValue + displayHand(userHand, userHandValue) + '<br><br>';
      myOutputValue = myOutputValue + 'Com ' + displayHand(comHand, comHandValue);
    } else if (userHandValue == 21 || userHandValue == 22) {
      mode = 'end of round';
      myOutputValue = 'Blackjack! You won!<br>To continue, hit the button to reset your hand<br><br>';
      myOutputValue = myOutputValue + displayHand(userHand, userHandValue) + '<br><br>';
      myOutputValue = myOutputValue + 'Com ' + displayHand(comHand, comHandValue);
    } else if (comHandValue == 21 || comHandValue == 22) {
      mode = 'end of round';
      myOutputValue = 'Computer Blackjack! You lost!<br>To continue, hit the button to reset your hand<br><br>';
      myOutputValue = myOutputValue + displayHand(userHand, userHandValue) + '<br><br>';
      myOutputValue = myOutputValue + 'Com ' + displayHand(comHand, comHandValue);
    }
  } else if (mode == 'hit or stand') {
    // rest of game happens here
    // code comHand; goal: x > 17
    var comHandResolved = false;
    while (comHandResolved == false) {
      comHandValue = countHandValue(comHand);
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
      // display user hand
      myOutputValue = 'Your ' + displayHand(userHand, userHandValue) + hitStandInstructions();
      // end of round conditions
      if (userHandValue == 21) {
        // auto-stand
        mode = 'end of round';
        myOutputValue = 'Good job, you hit 21 on the dot!<br><br>' + resolveHands(userHandValue, comHandValue) + 'Your ' + displayHand(userHand, userHandValue);
        myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
      } else if (userHandValue > 21) {
        mode = 'end of round';
        if (comHandValue > 21) {
          myOutputValue = 'You exceeded 21!! :( <br>But so did the computer you lucky person!<br>To continue, hit the button to reset your hand<br><br>';
          myOutputValue = myOutputValue + 'Your ' + displayHand(userHand, userHandValue);
          myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
        } else {
          myOutputValue = 'You lost! Your hand value exceeded 21!<br>To continue, hit the button to reset your hand<br><br>';
          myOutputValue = myOutputValue + 'Your ' + displayHand(userHand, userHandValue);
          myOutputValue = myOutputValue + '<br><br> Com ' + displayHand(comHand, comHandValue);
        }
      }
    } else if (input.toLowerCase() == 'stand') {
      userHandValue = countHandValue(userHand);
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
      myOutputValue = myOutputValue + displayHand(userHand, userHandValue) + hitStandInstructions();
    }
  } else if (mode == 'end of round') {
    // if continue... input > mode = 'draw hand'
    myOutputValue = 'Great, hand emptied, to continue hit the button again to draw a new hand!';
    mode = 'draw hand';
    userHand = [];
    comHand = [];
  } else {
    // error mode, ask to refresh and notify for debugging
    myOutputValue = 'There has been an error. Please refresh the page and continue play if you want. However, please do Bryan a favor and inform him that there was this error.';
  }
  return myOutputValue;
};
