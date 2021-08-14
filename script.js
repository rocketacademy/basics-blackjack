// gamemodes
var gameMode = "pre-game";

// global state for some booleans

var cardsFinished = false;

// blank array
var playerDeck = [];
var computerDeck = [];

// creating deck automatically using loop

var makeDeck = function () {
  var deck = [];

  // loop 1: separate to suits hearts spades

  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spade"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    //// console.log(`current suit: ${currentSuit}`);

    //loop 2: separate to rank 1-13

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // special cases for 1 11 12 13

      if (cardName == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // creating the object

      var cardDeck = {
        name: `${cardName} of ${currentSuit}<br>`,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      ///// console.log(`rank : ${rankCounter}`);

      // creating the object array

      deck.push(cardDeck);
      rankCounter += 1;
      // console.log(cardDeck);
    }

    suitIndex += 1;
  }

  // console.log("deck", deck);
  return deck;
};

// function to make the deck

var cardDeck = makeDeck();

// shuffling the deck

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  console.log(`your deck is shuffled successfully`);
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    //// console.log("random card ", randomCard);
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    //// console.log("random card ", currentCard);
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    //// console.log("random card after swop", randomCard);
    //// console.log("currentcard after swop", currentCard);
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }

  return cardDeck;
};

// function to shuffle cards based on the card deck we made

var shuffledDeck = shuffleCards(cardDeck);
// console.log("shuffled deck", shuffledDeck);

// function to collect score with loop

var playerScore = function () {
  var scoreIndex = 0;
  var playerScoreCounter = 0;
  var playerAces = 0;
  while (scoreIndex < playerDeck.length) {
    playerScoreCounter += playerDeck[scoreIndex].value;

    if (playerDeck[scoreIndex].value == 11) {
      playerAces += 1;
    }
    scoreIndex += 1;
  }

  if (playerAces > 0) {
    playerScoreCounter -= 10 * (playerAces - 1);
    if (playerScoreCounter > 21) {
      playerScoreCounter -= 10;
    }
  }
  return playerScoreCounter;
};

var computerScore = function () {
  var scoreIndex2 = 0;
  var computerScore = 0;
  var computerAces = 0;
  while (scoreIndex2 < computerDeck.length) {
    computerScore += computerDeck[scoreIndex2].value;

    if (computerDeck[scoreIndex2].value == 11) {
      computerAces += 1;
    }
    scoreIndex2 += 1;
  }
  return computerScore;
};

// a collection of messages

messageCompareResults = `Click submit to see who wins!`;
messageHitStand = `<br>Would you like to hit or stand? Type your choice in and press submit!`;
messageLess17 = `<br>You need to draw again as your score is less than 17. Type 'Hit' to add a card!`;
messageInstructions = `Hello, welcome to a simplified version of Blackjack!<br><br>
The rules of the game are as follows:<br>
1. The dealer and player(s) will draw two cards each. The dealer will have one card faced up<br>
2. Each player can choose to hit (draw another card) or stand (lock their current cards)<br>
3. After all players are done, the dealer will hit if their score is less than 17<br>
4. The player wins if they score higher than the dealer without exceeding a total score of 21
<br><br>
Can we find out who we're playing with today? Type in your name and press submit!`;

// //keeps track of player name
// var userName = ``;
// var createUserName = function (input) {
//   userName = input;
//   output = `Hello ${userName}! Let's start. Click submit to deal cards.`;
//   return output;
// };

// dealing initial hand

var dealInitialHand = function () {
  // dealer draws two cards from shuffled deck
  var dealerFaceUpCard = shuffledDeck.pop();
  var dealerFaceDownCard = shuffledDeck.pop();
  computerDeck.push(dealerFaceUpCard, dealerFaceDownCard);
  console.log(`dealer initial hand`, computerDeck);

  var playerCard1 = shuffledDeck.pop();
  var playerCard2 = shuffledDeck.pop();
  playerDeck.push(playerCard1, playerCard2);
  console.log(`player initial hand`, playerDeck);

  output = `The dealer drew ${dealerFaceUpCard.name}<br>
          You drew ${playerCard1.name} and ${playerCard2.name}<br>`;
  return output;
};

// inserting the message that can only come after the cards have been drawn

var checkHitOrStand = function () {
  if (playerScore() < 17) {
    output = messageLess17;
    gameMode = "hit or stand";
    return output;
  } else if (playerScore() >= 17 && playerScore() <= 21) {
    output = messageHitStand;
    gameMode = "hit or stand";
    return output;
  }
};

// function for player hitting or standing

var playerDeckArray = function () {
  deckIndex = 0;
  while (deckIndex < playerDeck.length) {
    output = playerDeck[deckIndex].name;
    deckIndex += 1;
    return output;
  }
};

var playerHitOrStand = function (input, output) {
  var playerChoice = input;
  console.log(playerChoice);
  if (input == `hit`) {
    var playerHitCard = shuffledDeck.pop();
    playerDeck.push(playerHitCard);
    output = `You chose to ${playerChoice}. You drew ${playerHitCard.name}
  <br><br>Would you like to hit again or stand?`;
    return output;
  }

  if (input == `stand`) {
    output = `You chose to ${playerChoice}. Let's see the results!`;
    gameMode = "compare results";
    return output;
  }
  console.log(`the hit or stand mode is running`);
};

// function for dealer to hit or stand
//// if dealer score is less than 17, dealer has to hit. if dealer more than 17, dealer stands.

var dealerHitOrStand = function () {
  if (computerScore() >= 17) {
    output = `The dealer will not be drawing any additional cards.`;
  }

  while (computerScore() < 17) {
    var dealerHitHand = shuffledDeck.pop();
    computerDeck.push(dealerHitHand);
    dealerScore = computerScore(computerDeck);
    output = `The dealer drew ${dealerHitCard.name}.`;
    return dealerScore;
  }

  gameMode = "compare results";
  return output;
};

////////// start main function

var main = function (input) {
  // initialize output

  var output = "";

  // DEALING CARDS

  if (gameMode == "pre-game") {
    if (input == ``) {
      output = messageInstructions;
      return output;
    }
    gameMode = "username";
  }

  if (gameMode == "username") {
    userName = input;
    output = `Hello ${userName}! Let's start. Click submit to deal cards.`;
    gameMode = "dealing cards";
    return output;
  }

  if (gameMode == "dealing cards") {
    var initialMessage = dealInitialHand();
    calculatePlayerScore = playerScore(playerDeck);
    output = `${initialMessage} Your score is currently ${calculatePlayerScore}.<br>${checkHitOrStand()}`;
    gameMode = "hit or stand";
    return output;
  }

  if (gameMode == "hit or stand") {
    console.log(`inside game mode hit or stand`);
    console.log(input);
    var hitOrStand = playerHitOrStand(input, output);

    output = hitOrStand;
    gameMode = "compare results";
    return output;
  }

  if (gameMode == "compare results") {
    console.log(`the compare results is running`);
    calculatePlayerScore = playerScore(playerDeck);
    calculateComputerScore = computerScore(computerDeck);
    if (
      calculatePlayerScore > calculateComputerScore &&
      calculatePlayerScore <= 21
    ) {
      output = `Congratulations ${userName}, you won!<br><br>Your score is ${calculatePlayerScore} while the dealer's score is ${calculateComputerScore}.<br><br>Want to play again? Hit submit or refresh the page!`;
    } else if (
      calculatePlayerScore < calculateComputerScore &&
      calculateComputerScore <= 21
    ) {
      output = `Sorry ${userName}, you lost!<br><br>Your score is ${calculatePlayerScore} while the dealer's score is ${calculateComputerScore}.<br><br>Want to play again? Hit submit or refresh the page!`;
    } else if (calculatePlayerScore == calculateComputerScore) {
      output = `It's a tie! Both of you scored ${calculatePlayerScore}.<br><br>Want to play again? Hit submit or refresh the page!`;
    } else if (calculatePlayerScore > 21) {
      output = `Dang, sorry ${userName}, you busted.<br><br>Your score is ${playerScore()}. Want to play again? Hit submit or refresh the page!`;
    }
    gameMode = "dealing cards";
    shuffledDeck = playerDeck.concat(computerDeck, shuffledDeck);
    shuffledDeck = shuffleCards(shuffledDeck);
    playerDeck = [];
    computerDeck = [];
    return output;
  }
};

//     output = messageShuffledDeck + messageHitStand;
//     gameMode = "hit or stand";

//     if (playerScore() < 17) {
//       output = messageShuffledDeck + messageLess17;
//       gameMode = "hit or stand";
//       return output;
//     }

//     if (computerScore() < 17) {
//       output =
//         messageShuffledDeck +
//         `The computer needs to hit as it has less than 17. Click to see what the computer got!`;
//       gameMode = "computer hits";
//     }

//     if (computerScore() < 17 && playerScore() < 17) {
//       output =
//         messageShuffledDeck +
//         `Both the computer and you need to hit as you have less than 17. Type hit to see what each of you got!`;
//       gameMode = "computer and player hits";
//     }

//     return output;
//   }

//   if (gameMode == "computer and player hits" && input == "hit") {
//     var computerHitIndex = 0;
//     while (computerHitIndex < computerDeck.length) {
//       computerDeck.push(shuffledDeck.pop());
//       computerHitIndex += 1;
//     }

//     var playerHitIndex = 0;
//     while (playerHitIndex < playerDeck.length) {
//       playerDeck.push(shuffledDeck.pop());
//       playerHitIndex += 1;
//     }

//     output = `${messageComputerHits}.<br><br>This brings its score to ${computerScore2()}, while you scored ${playerScore()}. Would you like to hit or stand?`;
//     gameMode == "hit or stand";
//   }

//   if (gameMode == "computer and player hits") {
//     output = `${messageComputerHits}.<br><br>This brings its score to ${computerScore2()}, while you scored ${playerScore()}. Would you like to hit or stand?`;
//     gameMode == "hit or stand";
//   }

//   ///// ASK MICHELLE : how can i prevent the system from drawing cards again? i want there to only be ONE score. but everytime i hit, it draws a new card.

//   if (gameMode == "hit or stand") {
//     if (input == "hit" || input == "Hit") {
//       playerDeck.push(shuffledDeck.pop());
//       console.log(playerDeck, "playerDeck");

//       var playerScore2 = function () {
//         totalPlayerCardsScore = playerScore() + playerCard3.value;
//         return totalPlayerCardsScore;
//       };

//       messageHitScore = `You drew ${playerCard3.name} of ${
//         playerCard3.suit
//       }.<br><br>This brings your score to ${playerScore2()}, while the computer scored ${computerScore()}. `;
//       messageComputerHits = `The computer drew ${computerCard3.name} of ${computerCard3.suit}. `;

//       //// ASK MICHELLE: i'm not sure how i can repeat the hit multiple times, is it through using a loop? but how do i edit my score because it keeps adding on, then the code becomes too long. same for the computer's hit.

//       if (playerScore2() < 17) {
//         output = messageHitScore + messageLess17;
//         gameMode == "hit or stand";
//         return output;
//       } else if (playerScore2() >= 17 && playerScore2() <= 21) {
//         output = `${messageHitScore} ${messageCompareResults}`;
//         gameMode = "compare results";
//         return output;
//       } else if (playerScore2() > 21) {
//         output = `Bummer, you busted! You drew ${playerCard3.name} of ${
//           playerCard3.suit
//         }.<br><br>Your final score is ${playerScore2()} while the computer scored ${computerScore()}. Press submit or refresh the page to play again!`;
//         gameMode = "dealing cards";
//         return output;
//       } ///// ASK MICHELLE: i can't get the computer hit to work
//       else if (playerScore2() < 17 && computerScore() < 17) {
//         output = `You drew ${playerCard3.name} of ${
//           playerCard3.suit
//         }, while the computer drew ${computerCard3.name} of ${
//           computerCard3.suit
//         }. <br><br>Your final score is ${playerScore2()} while the computer scored ${computerScore2()}. Press submit to see the results!`;
//         gameMode = "compare results";
//       }
//     } else if (input == "stand" || input == "Stand") {
//       output = messageCompareResults;
//       gameMode = "compare results";
//       return output;
//     }
//   }

//   // compare results - highest card wins
//   if (gameMode == "compare results") {
//     console.log(`your compare results is working`);
//     if (computerScore() > playerScore() || computerScore() > playerScore2()) {
//       output = `The computer won! Press submit or refresh the page to play again!`;
//       gameMode = "dealing cards";

//       return output;
//     } else if (
//       playerScore() > computerScore() ||
//       playerScore2() > computerScore()
//     ) {
//       output = `You win! Press submit or refresh the page to play again!`;
//       gameMode = "dealing cards";
//       return output;
//     } else if (
//       playerScore() == computerScore() ||
//       playerScore2() == computerScore()
//     ) {
//       output = `It's a tie! Press submit or refresh the page to play again!`;
//       gameMode = "dealing cards";
//       return output;
//     }
//   }

//   //////// ASK MICHELLE -- error validation. not sure how to do.
//   // if all the cards are gone
//   // if the players hands are empty

//   if (shuffledDeck.length == 0 || shuffledDeck.length == 1) {
//     cardsFinished = true;
//     console.log("cards are finished");
//     output = "The deck is finished, refresh to start again";
//   }

//   if (cardsFinished == true) {
//     output = "The deck is finished, refresh to start again";
//   }
// };

// // compare results - highest card wins
// else if (gameMode == "compare results") {
//   console.log(`your compare results is working`);
//   if (computerScore() > playerScore() || computerScore() > playerScore2()) {
//     output = `The computer won! The computer scored ${computerScore()}, while you scored ${playerScore2()}. Press submit or refresh the page to play again!`;
//     gameMode = "dealing cards";

//     return output;
//   } else if (
//     playerScore() > computerScore() ||
//     playerScore2() > computerScore()
//   ) {
//     output = `You win! The computer scored ${computerScore()}, while you scored ${playerScore2()}. Press submit or refresh the page to play again!`;
//     gameMode = "dealing cards";
//     return output;
//   } else if (
//     playerScore() == computerScore() ||
//     playerScore2() == computerScore()
//   ) {
//     output = `It's a tie! The computer scored ${computerScore()}, while you scored ${playerScore2()}. Press submit or refresh the page to play again!`;
//     gameMode = "dealing cards";
//     return output;
//   }
// }

// ////// automatically draw two cards via pop

// var cardIndex = 0;
// while (cardIndex < 2) {
//   playerDeck.push(shuffledDeck.pop());
//   cardIndex += 1;
// }

// var cardIndex2 = 0;
// while (cardIndex2 < 2) {
//   computerDeck.push(shuffledDeck.pop());
//   cardIndex2 += 1;
// }
