// Blackjack Project

/* RULES */

/* There will be two players. 
One human and one computer (for the Base solution).
The computer will always be the dealer.
Each player gets dealt two cards to start.
The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
The dealer has to hit if their hand is below 17.
Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
The player who is closer to, but not above 21 wins the hand.
*/

// MAKE DECK OF CARDS

var makeDeck = function (cardDeck) {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    // rankCounter starts from 1, otherwise it would start from 0

    while (rankCounter <= 13) {
      var cardName = rankCounter;
      // set cardName as rankCounter. i.e. 2 of hearts will have 2 as name and 2 as rank
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var pointInHand = rankCounter;
      // create new key called point to use later to sum up the hands
      if (pointInHand == 11) {
        pointInHand = 10;
      } else if (pointInHand == 12) {
        pointInHand = 10;
      } else if (pointInHand == 13) {
        pointInHand = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        point: pointInHand,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }

    suitIndex += 1;
  }

  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// the length of card deck will be used as "max". Hence 42 cards is the total/max number of cards in the deck

// SHUFFLE CARDS
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// SUM OF HAND
function sumCardsInArray(inputArray) {
  var outputSum = 0;
  for (let sumCounter = 0; sumCounter < inputArray.length; sumCounter += 1) {
    outputSum += inputArray[sumCounter];
  }
  return outputSum;
}

// CHECK FOR BLACKJACK
var isBlackjack = function (hand) {
  return hand.length === 2 && sumCardsInArray(hand) == 21;
};

// CHECK FOR BUST
var isBust = function (sumOfCards) {
  if (sumOfCards > 21) {
    return true;
  }
};

// DRAW TWO CARDS WHEN STARTING
var drawTwoCards = function () {
  for (let drawCardsCounter = 0; drawCardsCounter < 2; drawCardsCounter++) {
    // draw one card for each player
    dealerCard = shuffledDeck.pop();
    playerCard = shuffledDeck.pop();
    // push card into array for cards and array for points
    dealerArr.push(dealerCard);
    dealerHandArr.push(dealerCard.point);
    playerArr.push(playerCard);
    playerHandArr.push(playerCard.point);
  }
};

// DEAL ONE CARD FOR PLAYER
var playerHit = function () {
  playerCard = shuffledDeck.pop();
  playerArr.push(playerCard);
  playerHandArr.push(playerCard.point);
};

// RESET GAME
var resetGame = function () {
  playerArr = [];
  playerHandArr = [];
  dealerArr = [];
  dealerHandArr = [];
  gameMode = GAME_MODE_START;
  shuffledDeck = shuffleCards(makeDeck());
};

// GLOBAL VARIABLES
var dealerArr = [];
var playerArr = [];
var dealerHandArr = [];
var playerHandArr = [];
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var GAME_MODE_START = "DEAL_TWO_CARDS_EACH";
var GAME_MODE_PLAYER_MOVE = "PLAYER_CHOOSE_HIT_OR_STAND";

// initialise game mode to enter num dice mode
var gameMode = GAME_MODE_START;

// MAIN FUNCTION
var main = function (input) {
  if (gameMode == GAME_MODE_START) {
    drawTwoCards();
    // console.log(playerArr, playerHandArr);
    // console.log(dealerArr, dealerHandArr);

    // call function to sum cards
    var dealerSum = sumCardsInArray(dealerHandArr);
    var playerSum = sumCardsInArray(playerHandArr);
    console.log(dealerSum, "this is the sum of dealer's hand");
    console.log(playerSum, "this is the sum of player's hand");

    var genericOutput = `This is the dealer's cards: ${dealerHandArr} and the total hand is ${dealerSum}. <br/> <br/> This is the player's cards: ${playerHandArr} and the total hand is ${playerSum} <br/><br/>`;

    if (isBlackjack(playerHandArr)) {
      resetGame();
      return ` ${genericOutput} Player gets blackjack`;
    }

    if (isBlackjack(dealerHandArr)) {
      resetGame();
      return ` ${genericOutput} Dealer gets blackjack`;
    }
    gameMode = GAME_MODE_PLAYER_MOVE;
    return genericOutput + `Player please choose to "hit" or "stand".`;
  }

  if (gameMode == GAME_MODE_PLAYER_MOVE) {
    if (input == "hit") {
      playerHit();
      var playerSum = sumCardsInArray(playerHandArr);
      console.log(playerArr, playerHandArr);
      if (isBust) {
        resetGame();
        gameMode = GAME_MODE_START;
        return `This is the player's sum ${playerSum}. Player has gone bust. Restart game.`;
      }
      return "player has chosen to hit, this is the sum in hand: " + playerSum;
    }
    return (
      "player has chosen to stand. Player's current hand is: " + playerHandArr
    );
  }
};

// park
// } else if (dealerSum == playerSum) {
//   return ` ${genericOutput} There's a tie`;
// } else if (playerSum > dealerSum) {
//   return ` ${genericOutput} Player has the highest hand`;
// } else return `${genericOutput} Dealer has the highest hand and wins`;

// Code Graveyard

// draw cards one by one (replaced by for loop)
// var dealerCard1 = shuffledDeck.pop();
// dealerArr.push(dealerCard1);
// dealerHandArr.push(dealerCard1.rank);
// var dealerCard2 = shuffledDeck.pop();
// dealerArr.push(dealerCard2);
// dealerHandArr.push(dealerCard2.rank);
// var playerCard1 = shuffledDeck.pop();
// playerArr.push(playerCard1);
// playerHandArr.push(playerCard1.rank);
// var playerCard2 = shuffledDeck.pop();
// playerArr.push(playerCard2);
// playerHandArr.push(playerCard2.rank);

//   var myOutputValue = genericOutput + "placeholder";
//   return myOutputValue;
// };

// console.log(dealerArr, "dealerArr");
// console.log(playerArr, "player arr");
// console.log(dealerHandArr, "dealer hand Arr");
// console.log(playerHandArr, "player hand arr");

// loop it once more
