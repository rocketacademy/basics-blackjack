//  ==== Blackjack Game ====
// 1. Game needs functons: card deck, shuffle deck, deal deck, get winner
// 2. Player can either "hit" or "stand"
// 3. Dealer can either "hit" or "stand"
// 4. variable value of Ace = either 1 or 11

// ==== Pseudo Code ====
// 1.define player & dealer
// 2. create & shuffle a game deck
// 3. draw 2 cards for player & dealer respectively
// 4. win conditions [BLACKJACK or HIGHER HAND VALUE]
// 5. display dealer and player hand and declare winner

// Game States
var gameStart = "game start";
var drawCards = "draw cards";
var gameResults = "game results";
var currentGameMode = gameStart;

// Computer & Dealer Hands
var playerHand = [];
var computerHand = [];

// Variable to hold deck o cards
var gameDeck = "empty at the start";

// All my cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

// ==== Function to shuffle my cards ====
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// ==== GAME HELPER FUNCTIONS ====

// ==== function to check blackjack ====
var BlackjackCheck = function (handArray) {
  // check for blackjack in hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  // if got blackjack, return true
  // else return false
  // possible scenarios:
  //  1st card ace, 2nd card 10 or picture cards
  // 1st card 10 or icture cards, 2nd card ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

// ==== function to display player & dealer hands =====
var showPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  // PLAYER
  var playerMessage = "Player Hand:<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      "of" +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  // DEALER
  var dealerMessage = "Dealer Hand:<br>";
  var index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      "of" +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

// ==== Function calclate total hand value ====
var totalHandValue = function (handArray) {
  var totalHandValue = 0;
  // loop through player & com hand and add values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }

  return totalHandValue;
};

// ==== Function for shuffled deck ====
var shuffledDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

var main = function (input) {
  // 1st click - click to shuffle cards
  var message = "";
  if (currentGameMode == gameStart) {
    gameDeck = shuffledDeck();
    console.log(gameDeck);

    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());
    console.log("P", playerHand);
    console.log("C", computerHand);

    currentGameMode = drawCards;
    // Approach through little steps first e.g. shuffle first etc
    message = "Ya'll been dealt cards bruh";

    return message;
  }
  // 2nd click - check for blackjack
  if (currentGameMode == drawCards) {
    // test checkforBlacjack function
    // playerHand = [
    //   { name: "queen", suit: "clubs", rank: 12 },
    //   { name: "ace", suit: "diamonds", rank: 1 },
    // ];
    // computerHand = [
    //   { name: "ace", suit: "clubs", rank: 1 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];

    var playerBlackjack = BlackjackCheck(playerHand);
    var comBlackJack = BlackjackCheck(computerHand);
    console.log("player got blackjack", playerBlackjack);
    console.log("com got blackjack", comBlackJack);

    // // player & com have blackjack = draw
    // // boolean false add ! in front of var
    if (playerBlackjack || comBlackJack) {
      if (playerBlackjack && comBlackJack) {
        message =
          showPlayerAndDealerHands(playerHand, computerHand) +
          "It's a blackjack tie mannn!";
      }
      //   // player has blackjack = player wins
      else if (playerBlackjack && !comBlackJack) {
        message =
          showPlayerAndDealerHands(playerHand, computerHand) +
          "Eyyyy! You won mannnn!";
      }
      //   // com has blackjack = com wins
      else {
        message =
          showPlayerAndDealerHands(playerHand, computerHand) +
          "Nawwww! Dealer won mannn!";
      }
    } else {
      message =
        showPlayerAndDealerHands(playerHand, computerHand) +
        "Nope! There is no Blackjack.";
      console.log(message);
    }
    //   // // no blackjack - game continues >>

    //   // // calculate sum of hand value & com
    var playerHandTotalValue = totalHandValue(playerHand);
    var compHandTotalValue = totalHandValue(computerHand);
    console.log("p total", playerHandTotalValue);
    console.log("c total", compHandTotalValue);

    //   // // compare total hand valuer
    //   // // same value = draw
    if (playerHandTotalValue == compHandTotalValue) {
      message =
        showPlayerAndDealerHands(playerHand, computerHand) +
        "It's a tie mannn!";
      console.log(message);
      return message;
      // If player gets a bust
    } else if (playerHandTotalValue >= 22) {
      message =
        showPlayerAndDealerHands(playerHand, computerHand) +
        "It's a bust! You loseeeeee!";
    }
    // If com gets a bust
    else if (compHandTotalValue >= 22) {
      message =
        showPlayerAndDealerHands(playerHand, computerHand) +
        "Dealer got bust! You won mannn!";
    }
    //   // //   // player has higher value = player wins
    else if (playerHandTotalValue > compHandTotalValue) {
      message =
        showPlayerAndDealerHands(playerHand, computerHand) +
        "Eyyyy! You won mannnn!";
      console.log(message);
      return message;
    } else {
      message =
        showPlayerAndDealerHands(playerHand, computerHand) +
        "Nawwww! Dealer won mannn!";
      console.log(message);
      return message;
    }
  }
  // change game mode
  currentGameMode = gameResults;
  return message;
};

// // ===== BLACKJACK GAME PLAYERS ======
// // There will always be two players - 1 player & 1 computer
// // Computer is always the dealer.

// // ===== BLACKJACK GAME FLOW ====
// // 1. Player gets dealt 2 cards to start.
// // 2. Player goes first & decide to hit (draw a card) or stand (end their turn).
// // 3. Computer hits if hand is below 17.
// // 4. Player's score = total of their card ranks. Jacks/Queen/Kings = 10. Aces = 1 or 11
// // 5. Player close to 21, but not above 21, wins hand.

// // ==== GLOBAL VARIABLES ====

// // ==== GAME RUNNING SEQUENCE ====

// // 2. Player clicks to Submit to deal cards
// // 3. Cards analysed for game winning conditions
// // 4. Cards are displayed to the player
// // 5. Player decides to "hit" or "stand" using submit button to submit their choice.
// // 6. Player's cards are analysed for winning or losing conditions
// // 7. Computer decides to hit or stand automatically based on game rules.
// // 8. Game either ends or continues.
