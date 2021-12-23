// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Deck is shuffled
// User clicks Submit to deal cards.
// Each player gets dealt two cards to start.

// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn). use the submit button to submit their choice.
// The dealer has to hit if their hand is below 17. The computer decides to hit or stand automatically based on game rules.
// The user's cards are analysed for winning or losing conditions.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.
// The game either ends or continues.

var mustStand = false;
var playerCurrentHand = "";
var gameMode = "dealing cards";
var numberOfWins = 0;
var numberOfLosses = 0;
var myOutputValue = "";

var resetGame = function () {
  gameMode = "dealing cards";
  playerHand = [];
  computerHand = [];
  computerCurrentHand = "";
  playerCurrentHand = "";
  mustStand = false;
};

//images
var imgPlayerWin = `<img src="https://c.tenor.com/WPVeNwb0VTUAAAAC/angry-mad.gif">`;
var imgComputerWin = `<img src="https://c.tenor.com/f_crPxud2qkAAAAC/santa-dance-dancing-santa.gif">`;
var imgDraw = `<img src="https://cdn.dribbble.com/users/861491/screenshots/2430014/santa.gif">`;
var secretMode = `<img src="https://c.tenor.com/RNzK4KQ4rycAAAAC/santa-digibyte.gif">`;

// Make a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

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
      var cardRank = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardRank = 11;
        cardName = "Ace";
      } else if (cardName == 11) {
        cardRank = 10;
        cardName = "Jack";
      } else if (cardName == 12) {
        cardRank = 10;
        cardName = "Queen";
      } else if (cardName == 13) {
        cardRank = 10;
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
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

// create a function to shuffle cards

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
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

var deckOfCards = makeDeck();

//initialise a function to get deck of shuffled cards
var shuffledDeck = shuffleCards(deckOfCards);

//create arrays to store player and computer cards
var playerHand = [];
var computerHand = [];

//deal a card to a hand
var dealCardToHand = function (hand) {
  hand.push(shuffledDeck.pop());
};

var showCards = function (handArray) {
  var hand = "";
  var index = 0;
  while (index < handArray.length) {
    hand += `${handArray[index].name} of ${handArray[index].suit} <br>`;
    index += 1;
  }
  return hand;
};

var calScore = function (handArray) {
  var score = 0;
  var index = 0;
  var aceCounter = 0;
  while (index < handArray.length) {
    score += handArray[index].rank;

    if (handArray[index].name == "Ace") {
      aceCounter += 1;
    }
    index += 1;
  }
  // change ace from rank 11 to rank 1
  while (score > 21 && aceCounter > 0) {
    score -= 10;
    aceCounter -= 1;
  }
  return score;
};

var playerTotalScore = 0;
var computerTotalScore = 0;

var checkBlackjack = function () {
  if (playerHand.length == 2 && playerTotalScore == 21) {
    numberOfWins += 1;
    return `You have Blackjack! You won! You better watch out, Santa looks angry! <br><br>${imgPlayerWin}<br>Total number of rounds you won: ${numberOfWins}<br>Total number of rounds Santa won: ${numberOfLosses}<br><br>Click Deal to play again if you dare!`;
  }
  if (computerHand.length == 2 && computerTotalScore == 21) {
    numberOfLosses += 1;
    return `Santa has Blackjack! You lost! Santa is very happy. <br><br>${imgComputerWin}<br>Total number of rounds you won: ${numberOfWins}<br>Total number of rounds Santa won: ${numberOfLosses}<br><br>Click Deal to play again if you dare!`;
  }
  return "";
};

var main = function (input) {
  if (gameMode == "dealing cards") {
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);
    dealCardToHand(playerHand);
    dealCardToHand(computerHand);

    // calculate player's current score
    playerTotalScore = calScore(playerHand);
    console.log("player score:", playerTotalScore);

    // calculate computer's current score
    computerTotalScore = calScore(computerHand);
    console.log("computer score:", computerTotalScore);

    var blackjackStr = checkBlackjack();
    if (blackjackStr != "") {
      myOutputValue = `Your cards are ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}. <br>Santa's cards are ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}.<br>${blackjackStr}`;
      resetGame();
      return myOutputValue;
    }

    myOutputValue = `Your cards are ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}. <br>Type "Hit" if you want to draw another card or "Stand" if you wish to end the round and reveal Santa's cards.`;

    // now that the first two cards have been dealt to each player, switch the mode
    gameMode = "hit or stand";
  } else if (gameMode == "hit or stand") {
    if (input == "Merry Christmas!!!")
      return `Congratulations! You have used the secret phrase and won yourself a ₿itcoin from Santa!!! <br><br>${secretMode}<br>Have a Merry Christmas and a Happy New Year!!! Refresh to start on a clean slate for the new year!`;
    if (input == "Hit" && mustStand == false) {
      // draw a card
      dealCardToHand(playerHand);

      // show player cards
      playerCurrentHand = showCards(playerHand);

      myOutputValue = `Your cards are:<br> ${playerCurrentHand}<br>If you wish to draw another card, enter "Hit". If not, enter "Stand".`;
    } else if (input == "Stand" || mustStand == true) {
      // calculate player's current score
      playerTotalScore = calScore(playerHand);
      console.log("player score:", playerTotalScore);
      // show player cards
      playerCurrentHand = showCards(playerHand);

      // max 5 cards and max score of 21
      if (playerHand.length == 5 || playerTotalScore > 21) {
        mustStand = true;
      }
      // calculate computer's current score
      computerTotalScore = calScore(computerHand);
      // draw cards until computer's rank is more than 17
      while (computerTotalScore < 17) {
        var newCard = shuffledDeck.pop();
        computerHand.push(newCard);
        computerTotalScore += newCard.rank;
        computerTotalScore = calScore(computerHand);
      }

      console.log("computer score:", computerTotalScore);

      //show computer cards
      computerCurrentHand = showCards(computerHand);

      // compare player and computer cards and show results
      if (
        playerTotalScore <= 21 &&
        (playerTotalScore > computerTotalScore || computerTotalScore > 21)
      ) {
        myOutputValue = `You won! You better watch out, Santa looks angry! ${imgPlayerWin}`;
        numberOfWins += 1;
      } else if (
        computerTotalScore <= 21 &&
        (computerTotalScore > playerTotalScore || playerTotalScore > 21)
      ) {
        myOutputValue = `Ho! Ho! Ho! You lost! Santa is very happy. ${imgComputerWin}`;
        numberOfLosses += 1;
      } else if ((computerTotalScore = playerTotalScore)) {
        myOutputValue = `It's a draw! ${imgDraw}`;
      }
      myOutputValue += `<br><br>Your cards are:<br> ${playerCurrentHand} Total points: ${playerTotalScore}<br><br>Santa's cards are:<br> ${computerCurrentHand} Total points: ${computerTotalScore} <br><br>Total number of rounds you won: ${numberOfWins}<br>Total number of rounds Santa won: ${numberOfLosses}<br><br>Click Deal to play again if you dare!`;

      // reinitialise game
      resetGame();
    } else {
      myOutputValue = `Invalid input. Please enter "Hit" or "Stand".`;
    }
  }

  return myOutputValue;
};
