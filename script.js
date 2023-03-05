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
      if (pointInHand == 1) {
        pointInHand = 11;
      } else if (pointInHand == 11) {
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

// SUM OF HAND.
function sumCardsInArray(inputArray) {
  var outputSum = 0;
  var acesInHand = 0;
  for (let sumCounter = 0; sumCounter < inputArray.length; sumCounter += 1) {
    var indexCard = inputArray[sumCounter];
    if (indexCard.rank == 1) {
      // count number of aces
      acesInHand += 1;
      outputSum += inputArray[sumCounter];
    } else {
      outputSum += inputArray[sumCounter];
    }
  }

  if (outputSum > 21 && acesInHand > 0) {
    var aceCounter = 0;
    while (aceCounter < acesInHand) {
      sum -= 10;
      // If the sum is less than TWENTY_ONE before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (outputSum <= 21) {
        break; // break keyword causes the loop to finish
      }
      aceCounter = aceCounter + 1;
    }
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
    // dealerHandArr.push(5);
    // playerHandArr.push(10.5);
  }
};

// DEAL ONE CARD FOR PLAYER
var playerHit = function () {
  playerCard = shuffledDeck.pop();
  playerArr.push(playerCard);
  playerHandArr.push(playerCard.point);
};

// DEAL ONE CARD FOR DEALER
var dealerHit = function () {
  dealerCard = shuffledDeck.pop();
  dealerArr.push(dealerCard);
  dealerHandArr.push(dealerCard.point);
};

// RESET GAME
var resetGame = function () {
  playerArr = [];
  playerHandArr = [];
  dealerArr = [];
  dealerHandArr = [];
  dealerChoseToStand = false;
  playerChoseToStand = false;
  dealerBust = false;
  playerBust = false;
  gameMode = GAME_MODE_START;
  shuffledDeck = shuffleCards(makeDeck());
};

// OUPUT PLAYER'S HAND
var generatePlayerOutput = function () {
  var playerTotalValue = sumCardsInArray(playerHandArr);
  var PLAYER_OUTPUT_MSG = `<b><u>YOUR HAND</u></b><br>`;
  for (var i = 0; i < playerArr.length; i += 1) {
    PLAYER_OUTPUT_MSG += `${playerArr[i].name} of ${playerArr[i].suit}<br>`;
  }
  PLAYER_OUTPUT_MSG += `<b>Your hand totals to ${playerTotalValue}.</b><br><br>`;
  return PLAYER_OUTPUT_MSG;
};

// OUPUT DEALER'S HAND
var generateDealerOutput = function () {
  var dealerTotalValue = sumCardsInArray(dealerHandArr);
  var DEALER_OUTPUT_MSG = `<b><u>DEALER'S HAND</u></b><br>`;
  for (var i = 0; i < dealerArr.length; i += 1) {
    DEALER_OUTPUT_MSG += `${dealerArr[i].name} of ${dealerArr[i].suit}<br>`;
  }
  DEALER_OUTPUT_MSG += `<b>The dealer's hand totals to ${dealerTotalValue}.</b><br><br>`;
  return DEALER_OUTPUT_MSG;
};

// GIFS
var playerWinGif =
  '<img src ="https://media.tenor.com/OaYYWO9efBIAAAAC/rich-money.gif"/>';
var playerLosesGif =
  '<img src = "https://media.tenor.com/lgDnQxXr8XIAAAAC/spongebob.gif"/>';
var playerChoiceGif =
  '<img src = "https://media.tenor.com/juxL3ZtqwRMAAAAd/what-will-you-do-next-anya-taylor-joy.gif"/>';
var playerNervousGif =
  '<img src ="https://media.tenor.com/pB-cPZmiMeEAAAAC/stress-spongebob.gif"/>';

// GLOBAL VARIABLES
var dealerArr = [];
var playerArr = [];
var dealerHandArr = [];
var playerHandArr = [];
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var GAME_MODE_START = "DEAL_TWO_CARDS_EACH";
var GAME_MODE_PLAYER_MOVE = "PLAYER_CHOOSE_HIT_OR_STAND";
var GAME_MODE_DEALER = "DEALER_HIT_OR_STAND";
var GAME_MODE_EVALUATE = "EVALUATE_WINNING_CONDITIONS";
var dealerLimit = 17;

// initialise game mode to enter num dice mode
var gameMode = GAME_MODE_START;
// player choice to stand is false at the start
var playerChoseToStand = false;
var dealerChoseToStand = false;
// both players bust is false at the start
var playerBust = false;
var dealerBust = false;

// MAIN FUNCTION
var main = function (input) {
  if (gameMode == GAME_MODE_START) {
    drawTwoCards();

    // call function to sum cards
    var dealerSum = sumCardsInArray(dealerHandArr);
    var playerSum = sumCardsInArray(playerHandArr);
    console.log(dealerSum, "this is the sum of dealer's hand");
    console.log(playerSum, "this is the sum of player's hand");
    var genericOutput = `This is the dealer's cards points: ${dealerHandArr} and the total hand is ${dealerSum}. <br/> <br/> This is the player's cards: ${playerHandArr} and the total hand is ${playerSum} <br/><br/>`;
    // If both has blackjack, it's a tie. If either gets blackjack, that player wins in the first round.

    if (isBlackjack(playerHandArr) && isBlackjack(dealerHandArr)) {
      gameMode = GAME_MODE_START;
      resetGame();
      return (
        generatePlayerOutput() +
        generateDealerOutput() +
        ` Both players got Blackjack! It's a tie. Play again.`
      );
    }

    if (isBlackjack(playerHandArr)) {
      var myOutputValue =
        generatePlayerOutput() +
        generateDealerOutput() +
        `Player gets blackjack. Player wins the game!<br></br>` +
        playerWinGif;
      gameMode = GAME_MODE_START;
      resetGame();
      return myOutputValue;
    }

    if (isBlackjack(dealerHandArr)) {
      var myOutputValue =
        generatePlayerOutput() +
        generateDealerOutput() +
        `Dealer gets blackjack <br></br>` +
        playerLosesGif;
      gameMode = GAME_MODE_START;
      resetGame();
      return myOutputValue;
    }

    // If neither players got blackjack in the first round, the game state changes to ask the player to hit or stand
    gameMode = GAME_MODE_PLAYER_MOVE;
    return (
      generatePlayerOutput() +
      generateDealerOutput() +
      `Enter "h" to hit or "s" to stand.`
    );
  }

  // Start new state: Player's move to hit or stand

  if (gameMode == GAME_MODE_PLAYER_MOVE) {
    if (input != "h" && input != "s") {
      return "Enter 'h' for hit or 's' for stand to proceed";
    }
    if (input == "h") {
      playerHit();
      var playerSum = sumCardsInArray(playerHandArr);
      var dealerSum = sumCardsInArray(dealerHandArr);

      //Dealer needs to choose to hit or stand after the player

      if (isBust(playerSum)) {
        gameMode = GAME_MODE_DEALER;
        playerBust = true;
        myOutputValue =
          generatePlayerOutput() +
          generateDealerOutput() +
          `You've chosen to hit and gone bust! 💣 Let's see what the dealer does. <br><br>` +
          playerNervousGif;
        return myOutputValue;
      }
      gameMode = GAME_MODE_DEALER;
      myOutputValue =
        `You've chosen to hit. <br><br> The hands are now: <br><br>` +
        generatePlayerOutput() +
        generateDealerOutput();
      return myOutputValue;
    }
    playerChoseToStand = true;
    gameMode = GAME_MODE_DEALER;
    myOutputValue =
      `You've chosen to stand. <br><br> The hands remain: <br><br>` +
      generatePlayerOutput() +
      generateDealerOutput();
    return myOutputValue;
  }

  // Dealer needs to hit if their cards are under 17

  if (gameMode == GAME_MODE_DEALER) {
    if (sumCardsInArray(dealerHandArr) < dealerLimit) {
      dealerHit();
      var dealerSum = sumCardsInArray(dealerHandArr);
      gameMode = GAME_MODE_EVALUATE;
      if (isBust(dealerSum)) {
        dealerBust = true;
        myOutputValue =
          generatePlayerOutput() +
          generateDealerOutput() +
          `Dealer choses to hit and gone bust! 💣`;
        return myOutputValue;
      }
      return (
        "Dealer hit. <br><br> The hands are now: <br>" +
        generatePlayerOutput() +
        generateDealerOutput()
      );
    }
    dealerChoseToStand = true;
    gameMode = GAME_MODE_EVALUATE;
    return `Dealer chose to stand.`;
  }

  // EVALUATE WIN CONDITIONS
  if (gameMode == GAME_MODE_EVALUATE) {
    var playerSum = sumCardsInArray(playerHandArr);
    var dealerSum = sumCardsInArray(dealerHandArr);

    if (playerBust == true && dealerBust == true) {
      myOutputValue =
        generatePlayerOutput() +
        generateDealerOutput() +
        `Both players hands' bust! 💣💣 Restart game by hitting Submit.`;
      resetGame();
      gameMode = GAME_MODE_START;
      return myOutputValue;
    } else if (
      playerSum == dealerSum &&
      playerChoseToStand == true &&
      dealerChoseToStand == true
    ) {
      myOutputValue =
        generatePlayerOutput() +
        generateDealerOutput() +
        `Both players have chose to stand and are tied! Click Submit to play again`;
      resetGame();
      gameMode == GAME_MODE_START;
      return myOutputValue;
    } else if (dealerBust == true) {
      myOutputValue =
        generatePlayerOutput() +
        generateDealerOutput() +
        `Dealer has bust! 💣 You win!<br></br>` +
        playerWinGif;
      gameMode = GAME_MODE_START;
      resetGame();
      return myOutputValue;
    } else if (playerBust == true) {
      myOutputValue =
        generatePlayerOutput() +
        generateDealerOutput() +
        `You've bust! 💣 Dealer wins! Click Submit to play again.<br></br>` +
        playerLosesGif;
      gameMode = GAME_MODE_START;
      resetGame();
      return myOutputValue;
    } else if (
      playerChoseToStand == true &&
      dealerChoseToStand == true &&
      dealerSum > playerSum
    ) {
      myOutputValue =
        generatePlayerOutput() +
        generateDealerOutput() +
        `You lose! <br> Dealer has the hand closer to 21 and wins! <br></br> Click Submit to play again. <br></br>` +
        playerLosesGif;
      gameMode = GAME_MODE_START;
      resetGame();
      return myOutputValue;
    } else if (
      playerChoseToStand == true &&
      dealerChoseToStand == true &&
      dealerSum < playerSum
    ) {
      myOutputValue =
        generatePlayerOutput() +
        generateDealerOutput() +
        `You win! Click Submit to play again <br></br>` +
        playerWinGif;
      gameMode = GAME_MODE_START;
      resetGame();
      return myOutputValue;
    } else if (playerChoseToStand == false) {
      myOutputValue =
        generatePlayerOutput() +
        generateDealerOutput() +
        `Your turn to hit or stand. <br><br>` +
        playerChoiceGif;
      gameMode = GAME_MODE_PLAYER_MOVE;
      return myOutputValue;
    } else gameMode = GAME_MODE_DEALER;
    return `You've chosen to stand. It is the dealer's turn now.`;
  }
};

// Code Graveyard

// function sumCardsInArray(inputArray) {
//   var outputSum = 0;
//   for (let sumCounter = 0; sumCounter < inputArray.length; sumCounter += 1) {
//     outputSum += inputArray[sumCounter];
//   }
//   return outputSum;
// }

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
