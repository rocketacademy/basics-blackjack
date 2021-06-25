////////// BLACKJACK - MORE COMFORTABLE: MULTIPLAYER WITH NAMES //////////

//// GLOBAL VARIABLES ////
// deck and shuffled deck
var deck;
var shuffledDeck;
// number of players
var numberOfPlayers = 0;
// object array to store player attributes
var playerArray = [];
// current player number
var currentPlayer = 0;
// array to track the dealer's cards
var dealerCardsArray = [];
// string message on list of currentplayer's cards
var listOfCards_player = "";
// string message on list of dealer's cards
var listOfCards_dealer = "";
// number of hits for currentplayer and dealer
var numberOfHits_player = 0;
var numberOfHits_dealer = 0;
// number of wins for dealer
var numberOfWins_dealer = 0;
// number of rounds
var numberOfRounds = 0;
// game modes
var GAME_MODE_WELCOME = "GAME_MODE_WELCOME";
var GAME_MODE_NUMBER_OF_PLAYERS = "GAME_MODE_NUMBER_OF_PLAYERS";
var GAME_MODE_NAMES = "GAME_MODE_NAMES";
var GAME_MODE_PLAYER_HIT = "GAME_MODE_PLAYER_HIT";
var GAME_MODE_PLAYER_STAND = "GAME_MODE_PLAYER_STAND";
var GAME_MODE_EVALUATE_WIN = "GAME_MODE_EVALUATE_WIN";
// initialise game mode
var gameMode = GAME_MODE_WELCOME;
// hit or stand message to player after every hit
var hitOrStandMessage = "";
// winner message after the game ends
var winnerMessage = "";

//// HELPER FUNCTIONS ////
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];

  // Create an array of 4 suits
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;

  // Create an outer loop through the 4 suits
  while (suitIndex < suits.length) {
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var card = {
        name: rankCounter,
        suit: suits[suitIndex],
        rank: rankCounter,
      };
      if (rankCounter == 1) {
        card.name = "ace";
      } else if (rankCounter == 11) {
        card.name = "jack";
      } else if (rankCounter == 12) {
        card.name = "queen";
      } else if (rankCounter == 13) {
        card.name = "king";
      }
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

//// MAIN FUNCTION ////
