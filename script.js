//This ia a game of Blacjack!
//Assumes two users, player vs. dealer
//Allows player and dealer to hit or stand
//Calculates Blackjack win

//2 users
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
      //Ace is assigned value of 11 unless total score becomes > 21, then assume value of 1
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
