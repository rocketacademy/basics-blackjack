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

// ======== Pseudocode for Version 1 ======== //
// 1. define player and dealer
// 2. create and shuffle the game deck
// 3. draw 2 cards for player and dealer respectively
// 4. win conditions - A. Blackjack, B. Higher Hand Value
// 5. display hands of both player and dealer and declare winner

// ======== Pseudocode for Version 2 ======== //
// 1. extra game mode "hit" or "stand"
// 2. functionality for use to input hit or stand.

// ======== Pseudocode for Version 3 ======== //
// 1. dealer to hit or stand only AFTER player has chosen to stand
// 2. if dealer's hand is less than 17, dealer has to HIT
// 3. if dealer's hand is more than 17, dealer can choose to stand

// ======== Pseudocode for Version 4 ======== //
// 1. if total hand value, including ace is less than 21, ace = 11
// 2. if total hand value, including ace is more than 21, ace = 1

// Global Var: Declare Game Modes
var gameModeStart = "GAME START";
var gameModeCards = "CARDS DRAWN";
var gameModeResult = "DISPLAY RESULTS";
var gameModeHitStand = "HIT OR STAND";
var currentGameMode = gameModeStart;

// Global Var: Store Player and Dealer Cards
var playerCards = [];
var dealerCards = [];
var gameDeck = "EMPTY AT THE START";

// Winning Conditions (Blackjack = 21pts or higher hand value)
var winTwentyOne = 21;

// Others
var dealerMinCardNumber = 16;
var myOutputValue = "";

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

// Helper Function #6: CHECK IF TOTAL HAND VALUE > 21 (BUST)
var checkIfBust = function (handArray) {
  var index = 0;
  var handBusts = false;
  // if hand busts return 'true'
  // scenario: player/dealer > 21
  while (index < handArray.length) {
    if (totalHandValue(handArray) > 21) {
      handBusts = true;
    }
  }
  return handBusts;
};

// Helper Function #7: DISPLAY THE PLAYER HAND
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

// Helper Function #8: DISPLAY THE DEALER HAND
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

var main = function (input) {
  // FIRST CLICK OF THE SUBMIT BUTTON -- DEAL 2 CARDS
  if (currentGameMode == gameModeStart) {
    // 1. create & shuffle game deck
    gameDeck = createNewDeck();
    // 2. deal 2 cards to player and dealer
    playerCards.push(gameDeck.pop());
    playerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());

    // console.log("player's hand: ");
    // console.log(playerCards);
    // console.log("dealer's hand: ");
    // console.log(dealerCards);
    gameStartMessage = `Now that everyone has been dealt 2 cards, click "Submit" to proceed with the game!`;

    currentGameMode = gameModeCards;
    return gameStartMessage;
  }
  // SECOND CLICK OF THE SUBMIT BUTTON -- COMPARE CARDS
  if (currentGameMode == gameModeCards) {
    // 1. check for blackjack
    var playerHasBlackj = checkForBlackj(playerCards);
    var dealerHasBlackj = checkForBlackj(dealerCards);

    if (playerHasBlackj == true || dealerHasBlackj == true) {
      //    >> if both player and dealer has blackjack => TIE
      if (playerHasBlackj == true && dealerHasBlackj == true) {
        gameCardMessage = `Dealer: Blackjack! <br>${displayDealerHand(
          dealerCards
        )} <br>Player: Blackjack! <br>${displayPlayerHand(
          playerCards
        )} <br>Game Result: It's a tie. Let's play again!`;
      }

      //    >> if only player has blackjack => PLAYER WINS
      else if (playerHasBlackj == true && dealerHasBlackj == false) {
        gameCardMessage = `Dealer: <br>${displayDealerHand(
          dealerCards
        )} <br>Player: Blackjack! <br>${displayPlayerHand(
          playerCards
        )} <br>Game Result: Player won!`;
      }

      //    >> if only dealer has blackjack => DEALER WINS
      else {
        gameCardMessage = `Dealer: Blackjack! <br>${displayDealerHand(
          dealerCards
        )} <br>Player: <br>${displayPlayerHand(
          playerCards
        )} <br>Game Result: Player lost!`;
      }

      // 2. if NO blackjack => game continues
    } else {
      //    >> calculate the total hand value of both player & dealer
      var playerHandValue = totalHandValue(playerCards);
      var dealerHandValue = totalHandValue(dealerCards);

      gameCardMessage = `Dealer: <br>${displayDealerHand(
        dealerCards
      )} = ${Number(
        String(dealerHandValue)
      )} <br><br>Player: <br>${displayPlayerHand(playerCards)} = ${Number(
        String(playerHandValue)
      )}. <br><br>To continue, player please choose to "hit" or "stand".`;

      // // scenario one: same value => TIE
      // if (playerHandValue == dealerHandValue) {
      //   gameCardMessage = `Dealer: <br>${displayDealerHand(
      //     dealerCards
      //   )} = ${Number(
      //     String(dealerHandValue)
      //   )}<br><br>Player: <br>${displayPlayerHand(playerCards)} = ${Number(
      //     String(playerHandValue)
      //   )} <br><br>Game Result: It's a tie. Let's play again!`;
      // }

      // // scenario two: player > dealer => PLAYER WINS
      // else if (playerHandValue > dealerHandValue) {
      //   gameCardMessage = `Dealer: <br>${displayDealerHand(
      //     dealerCards
      //   )} = ${Number(
      //     String(dealerHandValue)
      //   )} <br><br>Player: <br>${displayPlayerHand(playerCards)} = ${Number(
      //     String(playerHandValue)
      //   )}<br><br>Game Result: Player won!`;
      // }

      // // scenario three: player < dealer => PLAYER LOSE
      // else {
      //   gameCardMessage = `Dealer: <br>${displayDealerHand(
      //     dealerCards
      //   )} = ${Number(
      //     String(dealerHandValue)
      //   )}<br><br>Player: <br>${displayPlayerHand(playerCards)} = ${Number(
      //     String(playerHandValue)
      //   )}<br><br>Game Result: Player lost!`;
      // }
    }
    currentGameMode = gameModeHitStand;
    return gameCardMessage;
  }
  // THIRD CLICK OF SUBMIT BUTTON -- CHOOSE HIT OR STAND
  if (currentGameMode == gameModeHitStand) {
    // player choose to HIT
    if (input == "hit") {
      playerCards.push(gameDeck.pop());

      playerHandValue = totalHandValue(playerCards);
      dealerHandValue = totalHandValue(dealerCards);

      gameHitStandMessage = `Player drew ${
        playerCards[playerCards.length - 1].name
      } of ${
        playerCards[playerCards.length - 1].suit
      }. <br><br>Player's Hand: <br>${displayPlayerHand(
        playerCards
      )} = ${Number(
        String(playerHandValue)
      )} <br><br>Input "hit" if you would like to draw another card. <br>Otherwise, input "stand" to find out if you have won 👀`;
    }

    // player choose to STAND
    else if (input == "stand") {
      playerHandValue = totalHandValue(playerCards);
      dealerHandValue = totalHandValue(dealerCards);

      // after player has chosen to stand, check dealer's hand
      while (dealerHandValue < 17) {
        dealerCards.push(gameDeck.pop());
        dealerHandValue = totalHandValue(dealerCards);
      }

      if (playerHandValue == dealerHandValue) {
        gameHitStandMessage = `Dealer: <br>${displayDealerHand(
          dealerCards
        )} = ${Number(
          String(dealerHandValue)
        )}<br><br>Player: <br>${displayPlayerHand(playerCards)} = ${Number(
          String(playerHandValue)
        )} <br><br>Game Result: It's a tie. Let's play again!`;
      } else if (playerHandValue > dealerHandValue) {
        gameHitStandMessage = `Dealer: <br>${displayDealerHand(
          dealerCards
        )} = ${Number(
          String(dealerHandValue)
        )} <br><br>Player: <br>${displayPlayerHand(playerCards)} = ${Number(
          String(playerHandValue)
        )}<br><br>Game Result: Player won!`;
      }

      // scenario three: player < dealer => player lost
      else {
        gameHitStandMessage = `Dealer: <br>${displayDealerHand(
          dealerCards
        )} = ${Number(
          String(dealerHandValue)
        )}<br><br>Player: <br>${displayPlayerHand(playerCards)} = ${Number(
          String(playerHandValue)
        )}<br><br>Game Result: Player lost!`;
      }
    }
    // input validation: player did not indicate either hit or stand
    else {
      playerHandValue = totalHandValue(playerCards);
      dealerHandValue = totalHandValue(dealerCards);
      gameHitStandMessage = `✖️ Input Error ✖️<br><br>Player's Current Hand: <br>${displayPlayerHand(
        playerCards
      )} = ${Number(
        String(playerHandValue)
      )} <br><br>Please input either "hit" or "stand"!`;
    }
    return gameHitStandMessage;
  }
};
