//General functions
// RNG from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Deck Generator - with BlackJack rank
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Spades♠️", "Hearts♥️", "Clubs♣️", "Diamonds♦️"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice counter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var counter = 1;
    while (counter <= 13) {
      // By default, the card name is the same as counter
      var cardName = counter;
      var cardRank = counter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      //(also chg rank for BlanckJack)
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
        cardRank = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardRank = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment counter to iterate over the next rank
      counter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
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

// Generates new deck
var deck = shuffleCards(makeDeck());

//*****//
//Blackjack Game Logic - base
//Global vars for game logic param
var dealerStandThreshold = 17;
var blackJack21 = 21;
//Starting num of cards
var startCardNum = 2;
//Flag to end game
var gameOver = false;

//Helper Functions
//Initialise array for hands
var dealerHand = [];
var playerHand = [];

//Draws card to hand
var drawCard = function (hand) {
  hand.push(deck.pop());
};

//Hand-Value calculator
var getHandValue = function (hand) {
  var handAcesNum = 0;
  var handValue = 0;
  for (handCounter = 0; handCounter < hand.length; handCounter += 1) {
    var currHandCard = hand[handCounter];
    if (currHandCard.rank == 1) {
      handAcesNum += 1;
      handValue += 11;
    } else {
      handValue += currHandCard.rank;
    }
  }
  if (handValue > blackJack21 && handAcesNum > 0) {
    for (aceCounter = 0; aceCounter < handAcesNum; aceCounter += 1) {
      handValue -= 10;
      if (handValue <= blackJack21) {
        break;
      }
    }
  }
  return handValue;
};

//BlackJack check
var isBlackJack = function (hand) {
  return hand.length === 2 && getHandValue(hand) === blackJack21;
};

//Hands' Card Printer
var handCardPrinter = function (hand) {
  var cardPrint = "";
  for (j = 0; j < hand.length; j += 1) {
    cardPrint = cardPrint + hand[j].name + " of " + hand[j].suit + ", ";
  }
  return cardPrint;
};

//Hand Printer
var printHands = function () {
  return `Dealer has ${handCardPrinter(dealerHand)} of value ${getHandValue(
    dealerHand
  )};<br>
    Player has ${handCardPrinter(playerHand)} of value ${getHandValue(
    playerHand
  )}`;
};

//Error Msg
var errorMsg = function () {
  return (
    `Error detected. Please click "hit" or "stand", or refresh page to restart` +
    imageError
  );
};

//Images
var imageWin =
  '<img src="https://c.tenor.com/y_qDvEaALjMAAAAC/spongebob-patrick-star.gif"/>';

var imageLose =
  '<img src="https://c.tenor.com/aarhUPUcLUYAAAAd/parks-and-rec-ron-swanson.gif"/>';

var imageTie = '<img src="https://i.imgflip.com/47hbu2.gif"/>';

var imageError =
  '<img src="https://c.tenor.com/FOzbM2mVKG0AAAAd/error-windows-xp.gif"/>';

var imageRIP =
  '<img src="https://c.tenor.com/HxrlhfaY1twAAAAd/rip-coffin.gif"/>';

//*****//
//Core Game Logic
var blackjackBase = function (input) {
  if (gameOver) {
    return `GAME OVER! Pls refresh`;
  }
  //Generate starting hands
  if (dealerHand.length === 0) {
    for (i = 0; i < startCardNum; i += 1) {
      drawCard(dealerHand);
      drawCard(playerHand);
    }
    if (isBlackJack(dealerHand)) {
      gameOver = true;
      return (
        printHands() +
        `<br>
        Dealer has Blackjack! Dealer Wins.` +
        imageRIP
      );
    }
    if (isBlackJack(playerHand)) {
      gameOver = true;
      return (
        printHands() +
        `<br>
        Player has Blackjack! Player Wins.` +
        imageWin
      );
    }
    return (
      printHands() +
      `<br>
      hit or stand?`
    );
  }
  if (input == `hit`) {
    drawCard(playerHand);
    if (getHandValue(playerHand) > blackJack21) {
      gameOver = true;
      return (
        printHands() +
        `<br>
        Player Bust!` +
        imageRIP
      );
    }
    return (
      printHands() +
      `<br>
      hit or stand?`
    );
  }
  if (input == `stand`) {
    var dealerHandValue = getHandValue(dealerHand);
    while (dealerHandValue <= dealerStandThreshold) {
      drawCard(dealerHand);
      dealerHandValue = getHandValue(dealerHand);
    }
    if (dealerHandValue > blackJack21) {
      gameOver = true;
      return (
        printHands() +
        `<br>
        Dealer Bust! Player Wins!` +
        imageWin
      );
    }
    if (dealerHandValue > getHandValue(playerHand)) {
      return (
        printHands() +
        `<br>
      Dealer Wins!` +
        imageLose
      );
    }
    if (dealerHandValue < getHandValue(playerHand)) {
      return (
        printHands() +
        `<br>
      Player Wins!` +
        imageWin
      );
    }
    if ((dealerHandValue = getHandValue(playerHand))) {
      return (
        printHands() +
        `<br>
      Tie!` +
        imageTie
      );
    }
  }

  // Return current Hands
  return errorMsg();
};

var main = function (input) {
  return blackjackBase(input);
};
