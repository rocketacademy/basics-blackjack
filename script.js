// gamemodes
var gameMode = "dealing cards";

// global state for some booleans

var cardsFinished = false;

// creating deck automatically using loop

var makeDeck = function () {
  var deck = [];

  // loop 1: separate to suits hearts spades

  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spade"];
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);

    //loop 2: separate to rank 1-13

    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // special cases for 1 11 12 13

      if (cardName == 1) {
        cardName = "ace";
        cardValue = 1;
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
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      console.log(`rank : ${rankCounter}`);

      // creating the object array

      deck.push(cardDeck);
      rankCounter += 1;
      console.log(cardDeck);
    }

    suitIndex += 1;
  }

  console.log("deck", deck);
  return deck;
};

// function to make the deck

var cardDeck = makeDeck();

// shuffling the deck

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    console.log("random card ", randomCard);
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    console.log("random card ", currentCard);
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    console.log("random card after swop", randomCard);
    console.log("currentcard after swop", currentCard);
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }

  return cardDeck;
};

// function to shuffle cards based on the card deck we made

var shuffledDeck = shuffleCards(cardDeck);
console.log("shuffled deck", shuffledDeck);

// start main function

var main = function (input) {
  // initialize output

  var output = "";

  //pop takes the card at the end of the array and removes

  var computerCard1 = shuffledDeck.pop();
  console.log("computer card 1", computerCard1);
  var computerCard2 = shuffledDeck.pop();
  console.log("computer card 2", computerCard2);
  var playerCard1 = shuffledDeck.pop();
  console.log("player card 1", playerCard1);
  var playerCard2 = shuffledDeck.pop();
  console.log("player card 2", playerCard2);
  var playerCard3 = shuffledDeck.pop();
  console.log("player card 3", playerCard3);

  // function to collect computer score

  var computerScore = function () {
    totalComputerCardsScore = computerCard1.value + computerCard2.value;
    return totalComputerCardsScore;
  };
  var playerScore = function () {
    totalPlayerCardsScore = playerCard1.value + playerCard2.value;
    return totalPlayerCardsScore;
  };

  var playerScore2 = function () {
    totalPlayerCardsScore = playerScore() + playerCard3.value;
    return totalPlayerCardsScore;
  };

  // DEALING CARDS

  if (gameMode == "dealing cards") {
    messageCompareResults = `Click submit to see who wins!`;
    messageHitStand = `<br><br>Would you like to hit or stand? Type your choice in and press submit!`;
    messageLess17 = `<br><br>You need to draw again as your score is less than 17. Type 'Hit' to add a card!`;
    messageShuffledDeck = `The computer drew ${computerCard1.name} of ${
      computerCard1.suit
    } and ${computerCard2.name} of ${computerCard2.suit} .<br>You drew ${
      playerCard1.name
    } of ${playerCard1.suit} and ${playerCard2.name} of ${
      playerCard2.suit
    }.<br><br>The computer scored ${computerScore()}, while you scored ${playerScore()}. `;

    output = messageShuffledDeck + messageHitStand;
    gameMode = "hit or stand";

    if (playerScore() < 17) {
      output = messageShuffledDeck + messageLess17;
      gameMode = "hit or stand";
      return output;
    }

    return output;
  }

  if (gameMode == "hit or stand") {
    if (input == "hit" || input == "Hit") {
      messageHitScore = `You drew ${playerCard3.name} of ${
        playerCard3.suit
      }.<br><br>This brings your score to ${playerScore2()}, while the computer scored ${computerScore()}. `;

      if (playerScore2() < 17) {
        output = messageHitScore + messageLess17;
        gameMode == "hit or stand";
        return output;
      } else if (playerScore2() >= 17 && playerScore2() <= 21) {
        output = `${messageHitScore} ${messageCompareResults}`;
        gameMode = "compare results";
        return output;
      } else if (playerScore2() > 21) {
        output = `Bummer, you busted! You drew ${playerCard3.name} of ${
          playerCard3.suit
        }.<br><br>Your final score is ${playerScore2()} while the computer scored ${computerScore()}. Press submit or refresh the page to play again!`;
        gameMode = "dealing cards";
        return output;
      }
    } else if (input == "stand" || input == "Stand") {
      output = messageCompareResults;
      gameMode = "compare results";
      return output;
    }
  }

  // compare results - highest card wins
  else if (gameMode == "compare results") {
    console.log(`your compare results is working`);
    if (computerScore() > playerScore() || computerScore() > playerScore2()) {
      output = `The computer won! Press submit or refresh the page to play again!`;
      gameMode = "dealing cards";

      return output;
    } else if (
      playerScore() > computerScore() ||
      playerScore2() > computerScore()
    ) {
      output = `You win! Press submit or refresh the page to play again!`;
      gameMode = "dealing cards";
      return output;
    } else if (
      playerScore() == computerScore() ||
      playerScore2() == computerScore()
    ) {
      output = `It's a tie! Press submit or refresh the page to play again!`;
      gameMode = "dealing cards";
      return output;
    }
  }

  //////// ASK MICHELLE -- error validation. not sure how to do.
  // if all the cards are gone
  // if the players hands are empty

  if (shuffledDeck.length == 0 || shuffledDeck.length == 1) {
    cardsFinished = true;
    console.log("cards are finished");
    output = "The deck is finished, refresh to start again";
  }
};

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
