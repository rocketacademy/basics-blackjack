// ======== GAME RULES ======== //
// 1) Deck is shuffled
// 2) User clicks submit to deal cards.
// 3) The cards are analysed for game winning conditions, e.g., Blackjack.
// 4) The cards are displayed to the user.
// 5) The user decides whether to hit (i.e. to draw a card) or stand (i.e. to end their turn), using the submit button to submit their choice.
// 6) The user's cards are analysed for winning or losing conditions.
// 7) The computer decides to hit or stand automatically based on game rules. The computer/dealer has to hit if their hand is below 17 pts.
// 8) The game either ends or continues.
// TIP: Create new game mode for each scenario.

// Global Var: Declare Game Modes
var gameModeStart = "GAME START";
var gameModeCards = "CARDS DRAWN";
var gameModeResult = "DISPLAY RESULTS";
var gameModeHitStand = "HIT OR STAND";
var gameModeReset = "GAME RESET";
var currentGameMode = gameModeStart;

// Global Var: Store Player and Dealer Cards
var playerCards = [];
var dealerCards = [];
var gameDeck = "EMPTY AT THE START";

// Others
var myOutputValue = "";
var resultMessage = "";

// Helper Function #1: MAKE A CARD DECK
var makeDeck = function () {
  var deck = [];
  // Outer Loop: to create the 4 suits
  var suitIndex = 0;
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  while (suitIndex < suits.length) {
    var cardSuit = suits[suitIndex];
    //console.log("Card Suit: " + cardSuit);

    // Inner Loop: to create the card ranks
    var counter = 1;
    while (counter <= 13) {
      var rankCounter = counter;
      var cardName = rankCounter;
      // scenarios if the card is not a number (e.g., 1, 11, 12, 13)
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        // rankCounter = 10 bcos in blackjack the max is 10 points.
        rankCounter = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "king";
      }

      //creating an object to store all the 52 cards
      var card = {
        name: cardName,
        suit: cardSuit,
        rank: rankCounter,
      };
      console.log("rank: " + rankCounter);
      deck.push(card);
      counter += 1;
      //console.log(card);
    }
    suitIndex += 1;
  }
  return deck;
};

// Helper Function #2: SHUFFLE THE CARDS
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
var shuffleCards = function (cards) {
  var currentIndex = 0;
  // "card" will be replaced by whatever input that was passed in.
  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[currentIndex];

    // shuffle the cards by swapping the cards
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cards;
};

// Helper Function #3: CREATE & SHUFFLE DECK
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

// Helper Function #4: CHECK FOR BLACKJACK (using true/false)
var checkForBlackj = function (cardOnHand) {
  var cardOne = cardOnHand[0];
  var cardTwo = cardOnHand[1];
  var isBlackj = false;
  // if there is a blackj return 'true'
  // scenario: ace card + 10 or picture card
  if (
    (cardOne.name == "ace" && cardTwo.rank >= 10) ||
    (cardTwo.name == "ace" && cardOne.rank >= 10)
  ) {
    isBlackj = true;
  }
  return isBlackj;
};

// Helper Function #5: CALCULATE THE TOTAL HAND VALUE
var totalHandValue = function (handArray) {
  var sumOfHand = 0;
  var aceCounter = 0;

  var index = 0;
  // loop through player or dealer hand and add up the values
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // for jack, queen, king, value = 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      sumOfHand += 10;
    } else if (currentCard.name == "ace") {
      sumOfHand += 11;
      aceCounter += 1;
    } else {
      sumOfHand += currentCard.rank;
    }
    index += 1;
  }

  // once the above loop finishes, this loop will run based on the number of aces card on hand, if there are 2 aces card, the loop will check if the total hand value > 21 - if yes, it'll deduct the first ace card by 10 pts during the first loop. Then the loop checks if the total hand value > 21, if no, the second ace card will remain at 11.

  index = 0;
  while (index < aceCounter) {
    if (sumOfHand > 21) {
      sumOfHand -= 10;
    }
    index += 1;
  }
  return sumOfHand;
}; // note to add bust if total hand value > 21

// Helper Function #6: DISPLAY THE PLAYER HAND
var displayPlayerHand = function (playerHandArray) {
  var index = 0;
  var playerHandMessage = "";
  while (index < playerHandArray.length) {
    playerHandMessage =
      playerHandMessage +
      `☞ ${playerHandArray[index].name} of ${playerHandArray[index].suit} <br>`;
    index += 1;
  }
  return playerHandMessage;
};

// Helper Function #7: DISPLAY THE DEALER HAND
var displayDealerHand = function (dealerHandArray) {
  var index = 0;
  var dealerHandMessage = "";
  while (index < dealerHandArray.length) {
    dealerHandMessage =
      dealerHandMessage +
      `☞ ${dealerHandArray[index].name} of ${dealerHandArray[index].suit} <br>`;
    index += 1;
  }
  return dealerHandMessage;
};

// Helper Function #8: DEAL CARDS TO PLAYER AND DEALER
var dealCards = function () {
  // 2. deal 2 cards to player and dealer
  playerCards.push(gameDeck.pop());
  playerCards.push(gameDeck.pop());
  dealerCards.push(gameDeck.pop());
  dealerCards.push(gameDeck.pop());
};

// Helper Function #9: START GAME LOGIC
var processGameStart = function () {
  if (currentGameMode == gameModeStart) {
    gameDeck = createNewDeck();
    dealCards();
    myOutputValue = `Now that everyone has received 2 cards, click "Submit" to proceed with the game!`;
  }
};

// Helper Function #10: DISPLAY HANDS LOGIC
var processGameCards = function (playerCards, dealerCards) {
  if (currentGameMode == gameModeCards) {
    var playerHandMessage = displayPlayerHand(playerCards);
    var dealerHandMessage = displayDealerHand(dealerCards);

    var playerHandValue = totalHandValue(playerCards);
    var dealerHandValue = totalHandValue(dealerCards);
    myOutputValue = `Snoopy's Hands: <br>${dealerHandMessage} = ${Number(
      String(dealerHandValue)
    )}<br><br> Player's Hands: <br>${playerHandMessage} = ${Number(
      String(playerHandValue)
    )}<br><br>`;

    // 2. check for blackjack
    var playerHasBlackj = checkForBlackj(playerCards);
    var dealerHasBlackj = checkForBlackj(dealerCards);

    console.log("player has blackjack: ", playerHasBlackj);
    console.log("snoopy has blackjack: ", dealerHasBlackj);

    // 3. If dealer has BJ and player does not have BJ
    if (playerHasBlackj == true && dealerHasBlackj == true) {
      resultMessage = `Game Result: It's a tie. Let's play again!`;
      var snoopyTieImg =
        '<img src="https://media.tenor.com/eNEGgBFm5rAAAAAd/snoopy-billycart.gif"/>';
      myOutputValue = myOutputValue + resultMessage + "<br><br>" + snoopyTieImg;
      currentGameMode = gameModeReset;
    } else if (playerHasBlackj == true && dealerHasBlackj == false) {
      currentGameMode = gameModeResult;
      resultMessage = `Game Result: Player has Blackjack! Player won the game! 🤑`;
      var snoopyLoseImg =
        '<img src="https://media.tenor.com/m1TvHNAFXYcAAAAC/byuntear-snoopy.gif"/>';
      myOutputValue =
        myOutputValue + resultMessage + "<br><br>" + snoopyLoseImg;
      currentGameMode = gameModeReset;
    } else if (playerHasBlackj == false && dealerHasBlackj == true) {
      currentGameMode = gameModeResult;
      resultMessage = `Game Result: Snoopy has Blackjack! Player lost the game! 😢`;
      var snoopyWinImg =
        '<img src="https://media.tenor.com/GstVwcHZ-qEAAAAC/snoopy.gif"/>';
      myOutputValue = myOutputValue + resultMessage + "<br><br>" + snoopyWinImg;
      currentGameMode = gameModeReset;
    } else {
      currentGameMode = gameModeHitStand;
      resultMessage = `To continue, player please input either "hit" or "stand".`;
      var myShufflingImage =
        '<img src="https://media.tenor.com/9nVvCPYBwe4AAAAC/snoopy-poker.gif"/>';
      myOutputValue = myOutputValue + myShufflingImage + "<br>" + resultMessage;
    }
  }
};

// Helper Function #11: DETERMINE WINNER
var processGameHitStand = function (playerInput) {
  if (currentGameMode == gameModeHitStand) {
    // input = input.toLowerCase (to check again)
    if (playerInput == "hit") {
      playerCards.push(gameDeck.pop());

      var playerHandValue = totalHandValue(playerCards);
      var dealerHandValue = totalHandValue(dealerCards);

      myOutputValue = `Player drew ${
        playerCards[playerCards.length - 1].name
      } of ${
        playerCards[playerCards.length - 1].suit
      }. <br><br>Player's Hand: <br>${displayPlayerHand(
        playerCards
      )} = ${Number(
        String(playerHandValue)
      )} <br><br>Input "hit" if you would like to draw another card. <br>Otherwise, input "stand" to find out if you have won 👀`;
    } else if (playerInput == "stand") {
      var playerHandMessage = displayPlayerHand(playerCards);
      var dealerHandMessage = displayDealerHand(dealerCards);
      playerHandValue = totalHandValue(playerCards);
      dealerHandValue = totalHandValue(dealerCards);

      // after player has chosen to stand, check dealer's hand
      while (dealerHandValue < 17) {
        dealerCards.push(gameDeck.pop());
        dealerHandValue = totalHandValue(dealerCards);
      }

      myOutputValue = `Snoopy's Hands: <br>${dealerHandMessage} = ${Number(
        String(dealerHandValue)
      )}<br><br> Player's Hands: <br>${playerHandMessage} = ${Number(
        String(playerHandValue)
      )}<br><br>`;

      // scenario: same hand value => TIE
      if (playerHandValue == dealerHandValue) {
        resultMessage = `Game Result: It's a tie. Let's play again!`;
        var snoopyTieImg =
          '<img src="https://media.tenor.com/eNEGgBFm5rAAAAAd/snoopy-billycart.gif"/>';
        myOutputValue =
          myOutputValue + resultMessage + "<br><br>" + snoopyTieImg;
        currentGameMode = gameModeReset;
      }
      // scenario: player > dealer (both values < 21) => PLAYER WINS
      if (playerHandValue <= 21 && playerHandValue > dealerHandValue) {
        resultMessage = `Game Result: Player won the game! 🤑`;
        var snoopyLoseImg =
          '<img src="https://media.tenor.com/m1TvHNAFXYcAAAAC/byuntear-snoopy.gif"/>';
        myOutputValue =
          myOutputValue + resultMessage + "<br><br>" + snoopyLoseImg;
        currentGameMode = gameModeReset;
      }
      // scenario: player < dealer => player lost
      if (playerHandValue < dealerHandValue && dealerHandValue <= 21) {
        resultMessage = `Game Result: Player lost the game! 😢`;
        var snoopyWinImg =
          '<img src="https://media.tenor.com/GstVwcHZ-qEAAAAC/snoopy.gif"/>';
        myOutputValue =
          myOutputValue + resultMessage + "<br><br>" + snoopyWinImg;
        currentGameMode = gameModeReset;
      }
      // scenario: both busted => TIE!
      if (playerHandValue > 21 && dealerHandValue > 21) {
        resultMessage = `Game Result: It's a tie! Both player and snoopy have busted. Let's play again!`;
        var snoopyTieImg =
          '<img src="https://media.tenor.com/eNEGgBFm5rAAAAAd/snoopy-billycart.gif"/>';
        myOutputValue =
          myOutputValue + resultMessage + "<br><br>" + snoopyTieImg;
        currentGameMode = gameModeReset;
      }
      // senario: player <= 21, dealer > 21 => PLAYER WINS
      if (playerHandValue <= 21 && dealerHandValue > 21) {
        resultMessage = `Game Result: Snoopy has busted! Player won the game! 🤑`;
        var snoopyLoseImg =
          '<img src="https://media.tenor.com/m1TvHNAFXYcAAAAC/byuntear-snoopy.gif"/>';
        myOutputValue =
          myOutputValue + resultMessage + "<br><br>" + snoopyLoseImg;
        currentGameMode = gameModeReset;
      }
      // scenario: player > 21, dealer < 21 => DEALER WINS
      if (playerHandValue > 21 && dealerHandValue <= 21) {
        resultMessage = `Game Result: Player has busted! Player lost the game! 😢`;
        var snoopyWinImg =
          '<img src="https://media.tenor.com/GstVwcHZ-qEAAAAC/snoopy.gif"/>';
        myOutputValue =
          myOutputValue + resultMessage + "<br><br>" + snoopyWinImg;
        currentGameMode = gameModeReset;
      }
    }
    // input validation: player did not indicate either hit or stand
    else {
      playerHandValue = totalHandValue(playerCards);
      myOutputValue = `✖️ Input Error ✖️<br><br>Player's Current Hand: <br>${displayPlayerHand(
        playerCards
      )} = ${Number(
        String(playerHandValue)
      )} <br><br>Please input either "hit" or "stand"!`;
    }
  }
};

// Helper Function #12: RESET GAME
var resetGame = function () {
  currentGameMode = gameModeStart;
  playerCards = [];
  dealerCards = [];
  myOutputValue = `Press "Submit" to play with Snoopy again!`;
  var restartImage =
    '<img src="https://media.tenor.com/ODj9rPcREr0AAAAC/snoopy-snoops.gif"/>';
  myOutputValue = myOutputValue + "<br><br>" + restartImage;
};

// ===== MAIN FUNCTION ===== //

var main = function (input) {
  // 1) GAME START MODE
  if (currentGameMode == gameModeStart) {
    processGameStart();
    currentGameMode = gameModeCards;
    return myOutputValue;
  }
  // 2) COMPARE HANDS + CHECK FOR BLACKJACK
  if (currentGameMode == gameModeCards) {
    processGameCards(playerCards, dealerCards);
    if (currentGameMode == gameModeHitStand) {
      return myOutputValue;
    } else if (currentGameMode == gameModeReset) {
      return myOutputValue;
    }
    return myOutputValue;
  }
  // 3) NO BLACKJACK -> PLAYER PROCEED TO CHOOSE HIT OR STAND
  if (currentGameMode == gameModeHitStand) {
    if (currentGameMode == gameModeHitStand) {
      input = input.toLowerCase();
      processGameHitStand(input);
      return myOutputValue;
    } else if (currentGameMode == gameModeReset) {
      return myOutputValue;
    }
  }
  // 4) RESTART GAME
  if (currentGameMode == gameModeReset) {
    resetGame();
    return myOutputValue;
  }
};
