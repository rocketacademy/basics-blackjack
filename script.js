// Declare game modes
const GAME_MODE_INITIALIZE = `Game initialization`;
const GAME_MODE_PLAYER_TURN = `Player's turn`;
const GAME_MODE_PLAYER_HIT = `Player hits`;
const GAME_MODE_PLAYER_STAND = `Player stands`;
const GAME_MODE_COMPUTER_TURN = `Computer's turn`;
const GAME_MODE_COMPARE_SCORE = `Determine winner`;

var currentGameMode = GAME_MODE_INITIALIZE;

// Declare global variables
// var currentPlayer = 1;
var currentPlayerHand = [];
var dealerHand = [];
var allPlayerScore = [];
var sumPlayerHand = 0;
var sumDealerHand = 0;

// Create a global variable for the card deck so that it can be accessed
var cardDeck = [];

// Auto-generate a deck of cards
var makeDeck = function () {
  // Initialise an empty deck array
  //var cardDeck = [];
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
      var weightage = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        weightage = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        weightage = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        weightage = 10;
      } else if (cardName == 13) {
        cardName = "king";
        weightage = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        weightage: weightage,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  console.log(cardDeck);
  // Return the completed card deck
  return cardDeck;
};

// Shuffle the deck of cards
var shuffleDeck = function () {
  var cardDeck = makeDeck();
  // use the Fisher-Yates shuffle for fairness
  // In-place shuffle; in O(n) time complexity
  // first, create a counter m that is equivalent to the length of the array, cardDeck
  // create two other empty variables, temp [to store the value for swapping] and i [for randomly generating an index]
  var m = cardDeck.length,
    temp,
    i;
  while (--m > 0) {
    i = Math.floor(Math.random() * (m + 1));
    temp = cardDeck[i];
    cardDeck[i] = cardDeck[m];
    cardDeck[m] = temp;
  }
  console.log(cardDeck);
  //get weightage of card
  //console.log(cardDeck[2].weightage);
  return cardDeck;
};

// // // create a function that sets up the number of players

// var createPlayers = function (number) {
//   players = Array();
//   for (var i = 1; i <= number; i++) {
//     var hand = Array();
//     var player = { Name: "Player " + i, ID: i, Points: 0, Hand: hand };
//     players.push(player);
//     console.log(players);
//   }
//   return players;
// };

// initial drawing of cards from deck

var drawCards = function () {
  // use pop function
  // we deal two cards to each player (player and computer)
  for (var i = 0; i < 2; i++) {
    // for (var x = 0; x < players.length; x++) {
    var card = cardDeck.pop();
    currentPlayerHand.push(card);
    var card = cardDeck.pop();
    dealerHand.push(card);
    console.log(currentPlayerHand);
    console.log(dealerHand);
    console.log(cardDeck);
  }
  //}
};

// create a drawSingleCard function that can be called upon during hits
var drawSingleCard = function () {
  var card = cardDeck.pop();
  if (currentGameMode == GAME_MODE_PLAYER_TURN) {
    currentPlayerHand.push(card);
  }
  if (currentGameMode == GAME_MODE_COMPUTER_TURN) {
    dealerHand.push(card);
  }
};

// sum up player's hand
// var calculatePlayerScore = function () {
// set the conditions for
// if (rank == 11 || rank == 12 || rank == 13) {
//     then weightage = 10
//     if rank == 1
//     then weightage == 11
//     // we will recalculate it as ace if the total sum is higher than 21
//     else:
//     weightage = rank
//   }
//   sum it all up and see if >21 then bust
// otherwise,
// };

// sums up the total for player and dealer hands
var sumUpHand = function () {
  if (
    gameMode == GAME_MODE_PLAYER_TURN ||
    gameMode == GAME_MODE_PLAYER_HIT ||
    gameMode == GAME_MODE_PLAYER_STAND
  ) {
    var sumPlayerHand = 0;
    for (
      var cardIndex = 0;
      cardIndex < currentPlayerHand.length;
      cardIndex += 1
    ) {
      sumPlayerHand = sumPlayerHand + currentPlayerHand[cardIndex].weightage;
    }
    return sumPlayerHand;
  } else {
    var sumDealerHand = 0;
    for (var cardIndex = 0; cardIndex < dealerHand.length; cardIndex += 1) {
      sumDealerHand = sumDealerHand + dealerHand[cardIndex].weightage;
    }
    return sumDealerHand;
  }
};

// check win conditions for player
var checkPlayerWinningConditions = function () {
  pictureCardRanks = [11, 12, 13];
  aceRank = [1];
  if (
    (pictureCardRanks.includes(currentPlayerHand[0].rank) == true &&
      aceRank.includes(currentPlayerHand[1].rank) == true) ||
    (pictureCardRanks.includes(currentPlayerHand[1].rank) == true &&
      aceRank.includes(currentPlayerHand[0].rank) == true)
  ) {
    console.log("there is a picture card");
    console.log("it's a blackjack");
    myOutputValue = "Congratulations, it's a Blackjack! Player Wins!";
  } else if (sumPlayerHand > 21) {
    console.log("player went bust");
    myOutputValue = "player went bust";
  } else {
    console.log("give player option to hit or stand");
    myOutputValue = `Your current score is ${sumPlayerHand}. Would you like to hit or stand? please enter h or s and click submit`;
  }
  return myOutputvalue;
};

// play turn for dealer

// check conditions
// possible winning/losing conditions:
// black jack: if combination of rank == 11, 12 or 13 and rank == 1, then auto-declare player as winner
// elif: bust condition -
// if there is an ace in the hand, default the weightage to 11 unless the whole hand exceeds 21, then assign it a weightage of 1.
// if rank == 11, 12 or 13 (jack/queen/king), then assign weightage to 10.
// tally up score of player hand to check if >21. if yes, declare bust. otherwise, continue
// if neither of the above are true, simply tally up player's score and store in array first before proceeding to play dealer's turn

// This is the main function
// Flow:
// 1. create a deck + shuffle a deck (combined by using shuffleDeck() function that runs the createDeck function first)
// 2. player turn: deal cards to player
// 3. check for winning condition (if it's a blackjack, auto-win)
// 4. If did not win, display cards to user and give user option to hit (draw another card) or stand (end player turn)
// 5. if player chooses to hit, tally card score and check for bust condition with each draw
// 6. if player chooses to stand, store player's tallied score
// 7. play for the dealer - must hit if the score is below 17. check for winning conditions as per player's routine
// 8. end dealer's (computer's) turn if dealer did not go bust
// 9. tally up dealer's score, store and compare against stored player's score
// 10. Declare winner
var main = function (input) {
  //var players = createPlayers();
  // creates a deck and shuffles it
  var createDeck = shuffleDeck();
  // draws card for both player and computer
  var drawCard = drawCards();
  console.log(currentPlayerHand);
  var checkWin = checkPlayerWinningConditions();

  gameMode = GAME_MODE_PLAYER_TURN;

  var calculatePlayerSum = sumUpHand();

  gameMode = GAME_MODE_COMPUTER_TURN;
  var calculateDealerSum = sumUpHand();
  var myOutputValue = checkWin;
  return myOutputValue;
};
