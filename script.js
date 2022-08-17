// 1. define player & dealer
// 2. create and shuffle a deck
// 3. draw 2 cards for player & dealer respectively
// 4. win conditions
//    - blackjack
//    - higher hand value
// 5. display hands of player & dealer and declare winner

// 1. extra game mode (hit or stand)
// 2. function to hit or stand

// 1. dealer to hit or stand ONLY AFTER player stands
// 2. if dealer hand value < 17, dealer hits
// 3. if dealerhand value > 17, dealer stands

// if total hand value, incl ace, is < 21, ace = 11
// if total hand value, incl ace, is > 21, ace = 1


// game modes
let gameStart = 'game start';
let cardsDrawn = 'cards drawn';
let resultsShown = 'results shown';
let hitOrStand = 'hot or stand';
let currentMode = gameStart;

// store hands
let playerHand = [];
let dealerHand = [];

// deck of cards
let gameDeck = 'empty at the start';

// Function that creates a deck of cards, used by createNewDeck function
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
        cardName = 'ace';
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = 'jack';
      }
      if (cardName == 12) {
        cardName = 'queen';
      }
      if (cardName == 13) {
        cardName = 'king';
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

// Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that shuffles a deck, used by createNewDeck function
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

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

// game functions -------------------------------------------------------------

// checks for blackjack
let checkForBJ = function(handArray) {
  // check player hand
  let playerCard1 = handArray[0];
  let playerCard2 = handArray[1];
  let isBJ = false;

  // if have bj, true
  // possible scenarios:
  // 1st card ace, 2nd card 10 or picture
  // 1st card 10 or picture, 2nd card ace
  if ((playerCard1.name == 'ace' && playerCard2.rank >= 10) || (playerCard1.rank >= 10 && playerCard2.name == 'ace')) {
    isBJ = true;
  }
  // else false
  return isBJ;
};

// calculates hand
let calculateHand = function(handArray) {

  let totalHand = 0;
  let aceCount = 0;

  // loop through player or dealer hand and add values
  let index = 0;
  while (index < handArray.length) {
    
    let currentCard = handArray[index];

    // for J, Q, K, value is 10
    if (currentCard.name == 'jack' || currentCard.name == 'queen' || currentCard.name == 'king') {
      totalHand += 10;
    } else if (currentCard.name == 'ace') {
      totalHand += 11;
      aceCount += 1;
    } else {
      totalHand += currentCard.rank;
    }
    index += 1;
  }

  index = 0;
  while (index < aceCount) {
    if (totalHand > 21) {
      totalHand -= 10;
    }
    index += 1;
  }
  return totalHand;
};

// display player & dealer cards
let displayHands = function(playerHandArray, dealerHandArray) {

  // player
  let playerDisplay = `<strong>your hand (${calculateHand(playerHand)}): </strong><br />`;
  let index = 0;
  while (index < playerHandArray.length) {
    playerDisplay = `${playerDisplay} - ${playerHandArray[index].name} of ${playerHandArray[index].suit} <br />`;
    index += 1;
  };

  // dealer
  index = 0;
  let dealerDisplay = `<strong>dealer's hand (${calculateHand(dealerHand)}): </strong><br />`;
  while (index < dealerHandArray.length) {
    dealerDisplay = `${dealerDisplay} - ${dealerHandArray[index].name} of ${dealerHandArray[index].suit} <br />`;
    index += 1;
  };

  return playerDisplay + '<br />' + dealerDisplay + '<br />';
};

var main = function (input) {
  
  let answer = input.toLowerCase();

  let myOutputValue = '';

  let playerName = '' || input;

  // first click
  if (currentMode == gameStart) {

    // create game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);
    
    // deal 2 cards to player & dealer respectively
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log('player', playerHand);
    console.log('dealer', dealerHand);
    
    // progress the gameMode
    currentMode = cardsDrawn;
    
    // write and return the output
    myOutputValue = `hello <strong><span>${playerName}</span></strong>!<br /><br />
                      The cards have been shuffled and dealt~<br />
                      Click the button again to proceed`;
    
    return myOutputValue;
  };

  // second click
  if (currentMode == cardsDrawn) {

    // hardcode test
    // playerHand = [{name: 'queen', suit: 'clubs', rank: 12}, {name: 'ace', suit: 'diamonds', rank: 1}];
    // dealerHand = [{name: 'ace', suits: 'clubs', rank: 1}, {name: 10, suit: 'spades', rank: 10}];
    
    // check for blackjack
    let playerHasBJ = checkForBJ(playerHand);
    let dealerHasBJ = checkForBJ(dealerHand);

    // console.log('does player have bj', playerHasBJ);
    // console.log('does dealer have bj', dealerHasBJ);

    // hardcode testing
    // playerHasBJ = true;
    // dealerHasBJ = false;

    if (playerHasBJ == true || dealerHasBJ == true) {

      // both have, tie
      if (playerHasBJ == true && dealerHasBJ == true) {
        myOutputValue = `You both tie by <span>blackjack</span>! <br /><br />` + displayHands(playerHand, dealerHand);
      }
      // player have, player win
      else if (playerHasBJ == true && dealerHasBJ == false) {
        myOutputValue = `<span>YAYYYYYYYYYY!!!!!!</span> You with <span>blackjack</span>! <br /><br />` + displayHands(playerHand, dealerHand);
      }
      // dealer have, dealer win
      else {
        myOutputValue = `Dealer wins with <span>blackjack</span>! <br /><br />` + displayHands(playerHand, dealerHand);
      };
      return myOutputValue;
      console.log(myOutputValue);
    }

    else {
      myOutputValue = `Here are the cards!<br />Would you like to <strong>hit</strong> or <strong>stand</strong>? <br /><br />` + displayHands(playerHand, dealerHand);
      console.log(myOutputValue);

      // change game mode
      currentMode = hitOrStand;
      // output msg
      return myOutputValue;
    };
  };

  // hit or stand
  if (currentMode == hitOrStand) {

    // player hit
    if (answer == 'hit') {
      playerHand.push(gameDeck.pop());
      myOutputValue = `You drew a card! Would you like to <strong>hit</strong> (again) or <strong>stand</strong>?<br /><br />` + displayHands(playerHand, dealerHand);
    }

    // player stand
    else if (answer == 'stand') {
      // calc total hand of player & dealer
      let playerHandValue = calculateHand(playerHand);
      let dealerHandValue = calculateHand(dealerHand);

      console.log('player hand val:', playerHandValue);
      console.log('dealer hand val:', dealerHandValue);

      while (dealerHandValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandValue = calculateHand(dealerHand);
      };

      // hardcode testing
      // playerHandValue = 11;
      // dealerHandValue = 11;


      // compare total hand value
        if ((playerHandValue > 21) || (dealerHandValue > 21)) {

          if ((playerHandValue > 21) && (dealerHandValue > 21)) {
            myOutputValue = `<span>You both bust!</span> <br /><br />` + displayHands(playerHand, dealerHand);

          } else if (playerHandValue > 21) {
          myOutputValue = `<span>busted!</span> I'm sorry but you lose! <br /><br />` + displayHands(playerHand, dealerHand);

          console.log('player hand val:', playerHandValue);
          console.log('dealer hand val:', dealerHandValue);
          } else {
            myOutputValue = `<span>YAYYYYYYYYYY!!!!!!</span> You won! The dealer bust! <br /><br />` + displayHands(playerHand, dealerHand);
  
            console.log('player hand val:', playerHandValue);
            console.log('dealer hand val:', dealerHandValue);
          }
        }
        // same value, tie
        else if (playerHandValue == dealerHandValue) {
          myOutputValue = `<span>It is a tie!</span> <br /><br />` + displayHands(playerHand, dealerHand);
          console.log('tie with drawn');
        }
        // player higher, win
        else if (playerHandValue > dealerHandValue) {
          myOutputValue = `<span>YAYYYYYYYYYY!!!!!!</span> You won! <br /><br />` + displayHands(playerHand, dealerHand);
          console.log('player wins');
        }
        // dealer higher, win
        else {
          myOutputValue = `I'm sorry but the dealer has won! <br /><br />` + displayHands(playerHand, dealerHand);
          console.log('dealer wins');
        };


    }

    // input validation
    else {
      myOutputValue = `I'm sorry! <em>${input}</em> is an invalid input. Please kindly input either <strong>hit</strong> or <strong>stand</strong> <br /><br />` + displayHands(playerHand, dealerHand);
    };

    return myOutputValue;
  };
};
