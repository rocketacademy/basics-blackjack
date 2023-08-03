// -- BLACKJACK GAME FEATURES --
// A) COMPARE INITIAL HANDS TO  DETERMINE WINNER : Create Deck, Shuffle Deck, Deal Cards, Determines Winner
// 1. Create Player and Dealer
// 2. Create Deck
// 3. Shuffle Deck
// 4. Draw 2 Cards for Player and Dealer
// 5. Determine Winner: Case 1: Someone gets Blackjack, Case 2: Someone gets higher hand value
// 6. Display Results

// B) ADD PLAYER HIT OR STAND
// C) ADD DEALER HIT OR STAND
// D) ADD VARIABLE ACE VALUES : Either '1' or '11'

// -- EXAMPLES & REFERENCES --
// https://liztanyl.github.io/basics-blackjack/
// https://liangtcode.github.io/basics-blackjack/
// https://waynerbee.github.io/basics-blackjack/
// https://codepen.io/gloriasoh/pen/OQExmP

// -- GLOBAL VARIABLES --
var gameStart = "start";
var cardsDrawn = "drawn";
var hitStand = "hit or stand";
var currentMode = gameStart;
var playerCards = [];
var dealerCards = [];
var gameDeck = [];

// -- HELPER FUNCTIONS --

// Function that creates a deck of cards, used by createNewDeck function
var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' & 'queen' & 'king' = 10
      if (cardName == 1) {
        cardName = "ace";
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = "jack";
      }
      if (cardName == 12) {
        cardName = "queen";
      }
      if (cardName == 13) {
        cardName = "king";
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

// Function to check for blackjack
var checkBlackJack = function (playerHand) {
  var cardOne = playerHand[0];
  var cardTwo = playerHand[1];
  // default value
  var result = false;
  if (
    (cardOne.name == "ace" && cardTwo.rank >= 10) ||
    (cardOne.rank >= 10 && cardTwo.name == "ace")
  ) {
    result = true;
  }
  return result;
};

// Function to check hand value with option to count ace as 1 or 11
var calcHandValue = function (playerHand) {
  var totalVal = 0;
  var aceCount = 0;

  var counter = 0;
  while (counter < playerHand.length) {
    var currCard = playerHand[counter];

    if (
      currCard.name == "jack" ||
      currCard.name == "queen" ||
      currCard.name == "king"
    ) {
      totalVal = totalVal + 10;
    } else if (currCard.name == "ace") {
      totalVal = totalVal + 11;
      aceCount = aceCount + 1;
    } else {
      totalVal = totalVal + currCard.rank;
    }
    counter = counter + 1;
  }

  num = 0;
  while (num < aceCount) {
    if (totalVal > 21) {
      totalVal = totalVal - 10;
    }
    num = num + 1;
  }

  return totalVal;
};

// Function to display hands of player and dealer
var displayCards = function (playerHand, dealerHand) {
  var playerMessage = "Player Hand: <br>";
  var index = 0;
  while (index < playerHand.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHand[index].name +
      " of " +
      playerHand[index].suit +
      "<br>";
    index = index + 1;
  }

  var dealerMessage = "Dealer Hand: <br>";
  var index = 0;
  while (index < dealerHand.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHand[index].name +
      " of " +
      dealerHand[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// Function to display hand value of player and dealer
var displayValue = function (playerVal, dealerVal) {
  var displayTotVal =
    "<br>Player total hand value: " +
    playerVal +
    "<br>Dealer total hand value: " +
    dealerVal;

  return displayTotVal;
};

// -- MAIN FUNCTION --
// Function when submit button is clicked
var main = function (input) {
  var myOutputValue = "";

  // initialise game with first submit button click
  if (currentMode == gameStart) {
    //create game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    //deal 2 cards to player and dealer
    playerCards.push(gameDeck.pop());
    playerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());

    console.log(playerCards);
    console.log(dealerCards);
    currentMode = cardsDrawn;

    //Return output message

    myOutputValue = "Cards Dealt. Click Submit to view current status.";
    return myOutputValue;
  }

  // determine winner with second button click
  // check for blackjack in both (tie), either(player/dealer wins) and neither(continue)
  // neither case requires total hand value to be computed, higher value wins and same value means tie.
  if (currentMode == cardsDrawn) {
    var PlayerBlackJack = checkBlackJack(playerCards);
    var DealerBlackJack = checkBlackJack(dealerCards);

    if (PlayerBlackJack == true || DealerBlackJack == true) {
      if (PlayerBlackJack == true && DealerBlackJack == true) {
        myOutputValue =
          displayCards(playerCards, dealerCards) + "Blackjack Tie!";
      } else if (PlayerBlackJack == true && DealerBlackJack == false) {
        myOutputValue =
          displayCards(playerCards, dealerCards) +
          "Player has Blackjack and wins";
      } else {
        myOutputValue =
          displayCards(playerCards, dealerCards) +
          "Dealer has Blackjack and wins";
      }
    } else {
      myOutputValue =
        displayCards(playerCards, dealerCards) + "<br>There is no Blackjack";
      currentMode = hitStand;
      return myOutputValue;
    }
  }
  // HIT OR STAND
  if (currentMode == hitStand) {
    if (input == "hit") {
      playerCards.push(gameDeck.pop());
      myOutputValue =
        displayCards(playerCards, dealerCards) +
        '<br> You drew another card. <br>Please input "hit" or "stand".';
    } else if (input == "stand") {
      var PlayerHandValue = calcHandValue(playerCards);
      var DealerHandValue = calcHandValue(dealerCards);

      while (DealerHandValue < 17) {
        dealerCards.push(gameDeck.pop());
        DealerHandValue = calcHandValue(dealerCards);
      }

      if (PlayerHandValue == DealerHandValue) {
        myOutputValue =
          displayCards(playerCards, dealerCards) +
          "<br>It a tie." +
          displayValue(PlayerHandValue, DealerHandValue);
      } else if (PlayerHandValue > DealerHandValue) {
        myOutputValue =
          displayCards(playerCards, dealerCards) +
          "<br>Player wins.<br><br>" +
          displayValue(PlayerHandValue, DealerHandValue);
      } else {
        myOutputValue =
          displayCards(playerCards, dealerCards) +
          "<br>Dealer wins.<br><br>" +
          displayValue(PlayerHandValue, DealerHandValue);
      }
    } else {
      myOutputValue =
        'Invalid input. Please key in only "hit" or "stand".<br><br>' +
        displayCards(playerCards, dealerCards);
    }
  }
  return myOutputValue;
};
