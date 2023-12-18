// Author: Samuel Lee
// Last Update: 18/12/2023

// ----- GLOBAL VARIABLES -----
var player1 = [];
var dealer = [];

var player1SumCards = 0;
var dealerSumCards = 0;
var cardVal = 0;

// game modes
const GAME_START = "game_start";
const GAME_PLAY = "game_play";
const GAME_SCORE = "game_score";
const PLAYER_HIT = "player_hit";
const PLAYER_STAND = "player_stand";
const DEALER_HIT = "dealer_hit";
const DEALER_STAND = "dealer_stand";
const WAITING_FOR_OPTION = "waiting_for_option";
const PLAYER_BUST = "player_bust";
var mode = GAME_START;
// ----- HELPER FUNCTIONS -----

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

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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

// Store the Deck cards into a global variable
var cardDeck = makeDeck();
console.log(cardDeck);

var shuffleCards = function () {
  var deckNum = cardDeck.length;
  var randomDecimal = Math.random() * deckNum;
  var randomInteger = Math.floor(randomDecimal);
  var cardResult = randomInteger + 1;
  return cardResult;
};

var playerHands = function () {
  for (var i = 0; i < 4; i++) {
    cardVal = shuffleCards();
    if (i < 2) {
      player1.push(cardDeck[cardVal]);
      cardDeck.splice(cardVal, 1);
    } else {
      dealer.push(cardDeck[cardVal]);
      cardDeck.splice(cardVal, 1);
    }
  }
};

var printHands = function () {
  var player1Hand = "";
  var dealerHand = "";
  player1Length = player1.length;
  dealerLength = dealer.length;
  for (var i = 0; i < player1Length - 1; i++) {
    player1Hand += `${player1[i].name} ${player1[i].suit}, `;
  }
  for (var j = 0; j < dealerLength - 1; j++) {
    dealerHand += `${dealer[j].name} ${dealer[j].suit}, `;
  }
  player1Hand += `${player1[player1Length - 1].name} ${
    player1[player1Length - 1].suit
  }`;
  dealerHand += `${dealer[dealerLength - 1].name} ${
    dealer[dealerLength - 1].suit
  }`;
  totalScores();
  var scoreOutput = `Player Hand: ${player1Hand} - <b>${player1SumCards}</b> <br> Dealer Hand: ${dealerHand} - <b>${dealerSumCards}</b> <br>`;
  var gameRulesOutput = gameRules();
  // var scoreOutput = gameRules();
  return scoreOutput + gameRulesOutput;
};

var totalScores = function () {
  player1SumCards = 0;
  dealerSumCards = 0;
  for (var i = 0; i < player1.length; i++) {
    if (player1[i].name == "ace") {
      if (player1SumCards + 11 > 21) {
        player1SumCards += 1;
        break;
      }
    }
    player1SumCards += player1[i].rank;
  }
  for (var j = 0; j < dealer.length; j++) {
    if (dealer[j].name == "ace") {
      if (dealerSumCards + 11 > 21) {
        dealerSumCards += 1;
        break;
      }
    }
    dealerSumCards += dealer[j].rank;
  }
};

var gameRules = function () {
  if (mode == PLAYER_BUST) {
    if (dealerSumCards <= 21) {
      return `Dealer DID NOT bust! Dealer Wins!`;
    } else if (dealerSumCards > 21) {
      return `It's a DRAW! Dealer and Player are both BUSTED!`;
    }
  }
  if (player1SumCards == dealerSumCards && player1SumCards < 21) {
    return `This is a DRAW for now. Waiting for next action...`;
  } else if (
    player1SumCards == dealerSumCards ||
    (player1SumCards == 21 && dealerSumCards == 21)
  ) {
    return `This is a DRAW`;
  } else if (player1SumCards == 21 && dealerSumCards != 21) {
    return `PLAYER WINS by BlackJack!`;
  } else if (dealerSumCards == 21 && player1SumCards != 21) {
    return `DEALER WINS by BlackJack!`;
  } else if (player1SumCards > 21 && dealerSumCards < 21) {
    mode = PLAYER_BUST;
    return `Player BUST! But waiting to see if Dealer will Bust too...`;
  } else if (dealerSumCards > 21 && player1SumCards <= 21) {
    return `Player WINS! Dealer is Busted`;
  } else {
    return `Waiting for next action...`;
  }

  // else if (player1SumCards > dealerSumCards) {
  //   return `PLAYER WINS by Higher Value! <br> `;
  // } else if (dealerSumCards) {
  //   return `DEALER WINS by Higher Value! <br> `;
  // } else {
  //   return `Maybe an Error here`;
  // }
};

var cardHit = function (playerType) {
  // LOGIC TO RANDOMLY DRAW A CARD
  console.log("--- In CARDHIT ---");
  cardVal = shuffleCards();
  if (playerType == "player") {
    console.log("--- In CARDHIT >> PLAYER hit ---");
    player1.push(cardDeck[cardVal]);
  } else {
    console.log("--- In CARDHIT >> DEALER hit ---");
    dealer.push(cardDeck[cardVal]);
  }
  cardDeck.splice(cardVal, 1);
  console.log(dealer);
};

var main = function (input) {
  // var cardDeck = makeDeck();

  if (mode == PLAYER_BUST) {
    console.log("Entering PLAYER_BUST function");
    cardHit("dealer");
    return printHands();
  }
  if (mode == DEALER_HIT) {
    console.log("Entering DEALER_HIT function");
    cardHit("dealer");
    if (dealerSumCards > player1SumCards && dealerSumCards <= 21) {
      mode = DEALER_STAND;
      return printHands();
    }
    return printHands();
  }
  if (mode == GAME_START) {
    console.log("Entering GAME_START function");
    playerHands();
    mode = WAITING_FOR_OPTION;
    return printHands();
  }
  if (input.toLowerCase() == "h" && mode != GAME_START) {
    console.log("Entering PLAYER_HIT function");
    mode = PLAYER_HIT;
    cardHit("player");
    return printHands();
  }
  if (input.toLowerCase() == "s" && mode != GAME_START) {
    console.log("Entering PLAYER_STAND function");
    mode = DEALER_HIT;

    return `Player Stands. Dealer's Move!<br>` + printHands();
  }

  var myOutputValue = "hello world";
  return myOutputValue;
};
