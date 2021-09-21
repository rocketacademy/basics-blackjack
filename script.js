var playerScore = 0;
var computerScore = 0;
var firstScoreCheck = 0;

// global array to store cards
var playerHand = [];
var computerHand = [];

// gamemodes
var gameMode1 = `distribute hand`;
var gameMode2 = `evaluate hand`;
var gameMode3 = `hit or stand`;
var gameMode4 = `decide winner`;
var gameMode = gameMode1;

// make card deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

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
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var rankValue = rankCounter;
      if (rankCounter > 10) {
        rankValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankValue,
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

// get random index
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// make shuffled deck
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// make shuffled deck
var shuffledCardDeck = shuffleCards(makeDeck());
console.log(shuffledCardDeck);

// deal card from deck
var dealCard = function (hand) {
  hand.push(shuffledCardDeck.pop());
};

// check if combined cards add to 21
var checkBlackJack = function (firstDraw, secondDraw) {
  var firstHand = firstDraw;
  var secondHand = secondDraw;

  if (firstHand > 10) {
    firstHand === 10;
  }

  if (secondHand > 10) {
    secondHand === 10;
  }

  if (firstHand === 1) {
    firstHand === 11;
  }

  if (secondHand === 1) {
    secondHand === 11;
  }

  if (firstHand + secondHand > 21 && firstHand === 11) {
    firstHand === 1;
  }

  if (firstHand + secondHand > 21 && secondhand === 11) {
    secondHand === 1;
  }

  if (firstHand + secondHand === 21) {
    return 1;
  } else return -1;
};

var main = function (input) {
  playerHand = [];
  computerHand = [];
  firstScoreCheck = 0;

  // distribute two cards to player and computer
  // only reveal player cards
  if (gameMode == gameMode1) {
    var dealCounter = 0;
    while (dealCounter < 2) {
      dealCard(playerHand);
      dealCard(computerHand);
      console.log(playerHand);
      console.log(computerHand);
      dealCounter += 1;
      gameMode = gameMode2;
    }
    return `You drew ${playerHand[0].name} ${playerHand[0].suit} and ${playerHand[1].name} ${playerHand[1].suit}!`;
  }

  if (gameMode == gameMode2) {
    // Check if BlackJack
    firstScoreCheck = checkBlackJack(playerHand[0].rank, playerHand[1].rank);
    console.log(firstScoreCheck);

    if (firstScoreCheck == 1) {
      return `BLACKJACK. You win!`;
    } else if (firstScoreCheck == -1) {
      gameMode == gameMode3;
      return "No blackjack. Enter 'hit'or 'stand' to continue.";
    }
  }
};
