//This ia a game of Blacjack!
//Assumes two users, player vs. dealer
//Allows player and dealer to hit or stand
//Calculates Blackjack win

//2 users; player vs. dealer (computer)
var player = "Player";
var dealer = "Dealer";
var playerHand = [];
var dealerHand = [];
var gameDeck = [];

//Modes to run the game
//1) Start game, 2) Draw cards, 3) Player decides hit or stand 4) Dealer decides hit or stand, 5) Show results
var modeGameStart = "start game";
var modeDrawCards = "draw cards";
var modePlayerHitStand = "player hit or stand";
var modeDealerHitStand = "dealer hit or stand";
var modeShowResults = "show results";

//Start the game
var gameMode = modeGameStart;

//<----- DECK FUNCTIONS ----->

//Function to create a deck of cards
var createDeck = function () {
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  var deck = [];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (var rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
      var card = {
        rank: ranks[rankIndex],
        suit: suits[suitIndex],
      };

      //Assign value to the card
      if (
        ranks[rankIndex] === "J" ||
        ranks[rankIndex] === "Q" ||
        ranks[rankIndex] === "K"
      ) {
        card.value = 10;
      } else if (ranks[rankIndex] === "A") {
        card.value = 11;
      } else {
        card.value = parseInt(ranks[rankIndex]);
      }

      deck.push(card);
    }
  }

  return deck;
};

//Function to shuffle deck that is created by swapping card's position with another card in the deck, loops through the entire deck until all cards are shuffled

var shuffleDeck = function (shuffle) {
  // n is defined as the number of cards in the deck
  var n = shuffle.length;
  while (n > 1) {
    // Generate a random index between 0 and n (n > 1 so that while loop continues as long as n is greater than 1)
    // Math.random times n gives random number between 0 (inclusive) and n (exclusive), Math.floor to round down to integer
    //Then, n-- decrements the value of n after it's been used, ensuring that the random index will always be between 0 and n-1.
    var randomIndex = Math.floor(Math.random() * n--);
    //Temporarily stores the card at position 'n'
    var temp = shuffle[n];
    //Swap the current card with the card at the random index
    shuffle[n] = shuffle[randomIndex];
    shuffle[randomIndex] = temp;
  }
  return shuffle;
};

//Function to create AND shuffle deck
var prepareDeck = function () {
  var myDeck = createDeck();
  var shuffledDeck = shuffleDeck(myDeck);
  return shuffledDeck;
};

//<----- GAME FUNCTIONS ----->

//Check for Blackjack scenario first, because if player or dealer has Blackjack, automatically wins the game
var checkForBlackjack = function (handArray) {
  var userCardOne = handArray[0];
  var userCardTwo = handArray[1];
  var isBlackjack = false;

  var isTenCard = function (rank) {
    return rank === "10" || rank === "J" || rank === "Q" || rank === "K";
  };

  if (
    (userCardOne.rank === "A" && isTenCard(userCardTwo.rank)) ||
    (userCardTwo.rank === "A" && isTenCard(userCardOne.rank))
  ) {
    isBlackJack = true;
  }
  return isBlackjack;
};

//Calculate total value of hand
//Ace has assigned value of 11 unless total score becomes > 21, then assume value of 1

var calculateHandValue = function (handArray) {
  var handValue = 0;
  var hasAce = false;

  // Calculate the initial hand value
  for (var i = 0; i < handArray.length; i++) {
    var cardValue = handArray[i].value;
    handValue += cardValue;
    if (handArray[i].rank === "A") {
      hasAce = true;
    }
  }

  // If hand value exceeds 21 and there's an Ace, reduce Ace's value from 11 to 1
  if (handValue > 21 && hasAce) {
    handValue -= 10;
  }

  return handValue;
};

//Function to show player and dealer's hands respectively

var displayHands = function (playerHandArray, dealerHandArray) {
  var playerCardOne = playerHandArray[0];
  var playerCardTwo = playerHandArray[1];
  var dealerCardOne = dealerHandArray[0];
  var dealerCardTwo = dealerHandArray[1];

  var playerHand = `Player's hand:<br>${playerCardOne.rank} of ${playerCardOne.suit}<br>${playerCardTwo.rank} of ${playerCardTwo.suit}<br>`;
  var dealerHand = `Dealer's hand:<br>${dealerCardOne.rank} of ${dealerCardOne.suit}<br>${dealerCardTwo.rank} of ${dealerCardTwo.suit}<br>`;

  return playerHand + dealerHand;
};

//Function to show player and dealer's values respectively

var displayValue = function (playerHandArray, dealerHandArray) {
  var playerValue = `Player's value: ${calculateHandValue(
    playerHandArray
  )}<br>`;
  var dealerValue = `Dealer's value: ${calculateHandValue(
    dealerHandArray
  )}<br>`;

  return playerValue + dealerValue;
};
