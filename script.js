// 0. Preparation
//    - Create game modes (how many game modes needed?)
//    - Create player's hand
//    - Create dealer's hand
// 1. Deck is shuffled.
//    - Create a set of card
//    - Shuffle the card
//    - Store the deck in a variable
// 2. User clicks Submit to deal cards.
//    - First click to deal the cards
//    - Second click to compare player's and dealer's cards
// 3. The cards are analysed for game winning conditions, e.g. Blackjack.
//    A Blackjack win. When either player or dealer draw Blackjack.
//    A tie. When both the player and dealer draw Blackjack
//    - Check if by player or dealer has Blackjack
// 4. Comparing both hands and determining a winner. The possible scenarios are:
//    A normal win. When neither draw Blackjack, the winner is decided by whomever has the higher hand total.
//    A tie. When both the player and dealer have the same total hand values
//    - Sum up the card value
//    - Compare between player's and dealer's cards
// 5. The cards are displayed to the user.
// 6. The user decides whether to hit or stand, using the submit button to submit their choice.
// 7. The user's cards are analysed for winning or losing conditions
// 8. The computer decides to hit or stand automatically based on game rules.
// 9. The game either ends or continues.

// Declare game modes
var gameStartMode = `game start`;
var drawCardsMode = `draw cards`;
var showResultsMode = `show results`;
var hitOrStandMode = `hit or stand`;
var currentGameMode = gameStartMode;

// Declare variables to store player and dealer hands
var playerHand = [];
var dealerHand = [];

// Declare variable to hold deck of cards
var gameDeck = "empty at the start";

// 1. Deck is shuffled.
var makeDeck = function () {
  console.log(`control flow: start of makeDeck`);
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
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

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cards) {
  var currentIndex = 0;
  while (currentIndex < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var randomCard = cards[randomIndex];
    var currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cards;
};

var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

var checkBlackjack = function (handArray) {
  // Check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  // return is true if:
  // 1st card ace, 2nd card 10 or picture cards
  // 1st card 10 or picture cards, 2nd card ace
  // else return false
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

var totalCardsValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  // check all card values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      totalHandValue += 10;
    } else if (currentCard.name == "Ace") {
      totalHandValue += 11;
      aceCounter += 1;
    } else {
      totalHandValue += currentCard.rank;
    }
    index += 1;
  }

  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue -= 10;
    }
    index += 1;
  }

  return totalHandValue;
};

// 4. The cards are displayed to the user.
// Player's cards
var showPlayerCards = function (playerHand) {
  var playerTotalCards = totalCardsValue(playerHand);
  var playerCardsMessage = `You got: ${playerTotalCards}<br>Your cards:<br>`;
  var index = 0;
  while (index < playerHand.length) {
    playerCardsMessage = `${playerCardsMessage}  - ${playerHand[index].name} of ${playerHand[index].suit}<br>`;
    index += 1;
  }
  return playerCardsMessage;
};
// Dealer's cards
var showDealerCards = function (dealerHand) {
  var dealerTotalCards = totalCardsValue(dealerHand);
  var dealerCardsMessage = `Dealer got: ${dealerTotalCards}<br>Dealer's cards:<br>`;
  var index = 0;
  while (index < dealerHand.length) {
    dealerCardsMessage = `${dealerCardsMessage}  - ${dealerHand[index].name} of ${dealerHand[index].suit}<br>`;
    index += 1;
  }
  return dealerCardsMessage;
};

var main = function (input) {
  var outputMessage = "";
  console.log("Current Game Mode = ", currentGameMode);

  // 2. User clicks Submit to deal cards.
  // click submit
  if (currentGameMode == gameStartMode) {
    // Create game deck
    gameDeck = createNewDeck();
    console.log(gameDeck);

    //Deal 2 cards to player and dealer respectively
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand ==> ");
    console.log(playerHand);
    console.log("dealer hand ==> ");
    console.log(dealerHand);

    // 3. The cards are analysed for game winning conditions, e.g. Blackjack.
    // click submit
    // check for blackjack
    // previously the following section was part of drawCardsMode.
    // to shorten the steps, it's disolved and combined to gameStartMode

    var playerHasBlackjack = checkBlackjack(playerHand);
    var dealerHasBlackjack = checkBlackjack(dealerHand);

    console.log("Player has Blackjack -> ", playerHasBlackjack);
    console.log("Dealer has Blackjack -> ", dealerHasBlackjack);

    if (playerHasBlackjack == true || dealerHasBlackjack == true) {
      // both player and dealer has blackjack ->
      if (playerHasBlackjack == true && dealerHasBlackjack == true) {
        outputMessage = `Both player and dealer got Blackjack!<br><br>It is a Blackjack tie!<br><br>${showPlayerCards(
          playerHand
        )}<br><br>${showDealerCards(
          dealerHand
        )}<br><br>Please hit refresh to play again.`;
      }

      // only player has blackjack -> player wins
      else if (playerHasBlackjack == true && dealerHasBlackjack == false) {
        outputMessage = `You got Blackjack!<br><br>YOU WIN!<br><br>${showPlayerCards(
          playerHand
        )}<br><br>${showDealerCards(
          dealerHand
        )}<br><br>Please hit refresh to play again.`;
      }

      // only dealer has blackjack -> dealer wins
      else {
        outputMessage = `Dealer got Blackjack!<br><br>YOU LOSE!<br><br>${showPlayerCards(
          playerHand
        )}<br><br>${showDealerCards(
          dealerHand
        )}<br><br>Please hit refresh to play again.`;
      }

      // no blackjack
    } else {
      outputMessage = `${showPlayerCards(
        playerHand
      )}<br>Please type...<br>"Hit" if you want to draw more card; or<br>"Stand" if you have enough.`;

      // change to the next gameMode
      currentGameMode = hitOrStandMode;

      // give an output message
      return outputMessage;
    }
  }

  // Hit or stand mode
  if (currentGameMode == hitOrStandMode) {
    console.log(`Control flow : starting of hitOrStandMode`);

    // Player Hit
    if (input == "hit" || input == "Hit" || input == "h" || input == "H") {
      playerHand.push(gameDeck.pop());

      //check total player cards
      var playerTotalCards = totalCardsValue(playerHand);
      console.log(`total card value -> ${playerTotalCards}`);

      if (playerTotalCards <= 21) {
        outputMessage = `Wow, you're at ${playerTotalCards} right now! Do you want to hit or stand?<br><br>Type h for Hit or s for Stand. <br><br>${showPlayerCards(
          playerHand
        )}`;
      }

      // Player more than 21
      else {
        // check total dealer cards
        var dealerTotalCards = totalCardsValue(dealerHand);
        console.log(`total card value -> ${dealerTotalCards}`);

        while (dealerTotalCards < 17) {
          console.log(`dealer hits`);
          dealerHand.push(gameDeck.pop());
          dealerTotalCards = totalCardsValue(dealerHand);
        }

        if (dealerTotalCards <= 21) {
          outputMessage = `YOU LOSE!<br><br>${showPlayerCards(
            playerHand
          )}<br><br>${showDealerCards(
            dealerHand
          )}<br><br>Please hit refresh to play again.`;
        }

        if (dealerTotalCards > 21) {
          outputMessage = `IT'S A TIE!<br><br>${showPlayerCards(
            playerHand
          )}<br><br>${showDealerCards(
            dealerHand
          )}<br><br>Please hit refresh to play again.`;
        }
      }
    }

    // Player Stand
    else if (
      input == "stand" ||
      input == "Stand" ||
      input == "s" ||
      input == "S"
    ) {
      // sum up the cards in player's and dealer's hand
      var playerTotalCards = totalCardsValue(playerHand);
      var dealerTotalCards = totalCardsValue(dealerHand);

      console.log("Player total cards -> ", playerTotalCards);
      console.log("Dealer total cards -> ", dealerTotalCards);

      while (dealerTotalCards < 17) {
        dealerHand.push(gameDeck.pop());
        dealerTotalCards = totalCardsValue(dealerHand);
      }

      // Dealer < 21
      if (dealerTotalCards <= 21) {
        // compare the cards

        // same value -> tie
        if (playerTotalCards == dealerTotalCards) {
          outputMessage = `IT'S A TIE!<br><br>${showPlayerCards(
            playerHand
          )}<br><br>${showDealerCards(
            dealerHand
          )}<br><br>Please hit refresh to play again.`;
        }

        // player value is higher -> player wins
        else if (playerTotalCards > dealerTotalCards) {
          outputMessage = `YOU WIN!<br><br>${showPlayerCards(
            playerHand
          )}<br><br>${showDealerCards(
            dealerHand
          )}<br><br>Please hit refresh to play again.`;
        }

        // dealer value is higher -> player wins
        else {
          outputMessage = `YOU LOSE!<br><br>${showPlayerCards(
            playerHand
          )}<br><br>${showDealerCards(
            dealerHand
          )}<br><br>Please hit refresh to play again.`;
        }
      }

      // Dealer > 21
      else {
        outputMessage = `YOU WIN!<br><br>${showPlayerCards(
          playerHand
        )}<br><br>${showDealerCards(
          dealerHand
        )}<br><br>Please hit refresh to play again.`;
      }
    }

    // Input validation
    else {
      outputMessage = `Wrong input.<br>Please type "Hit" or "Stand".<br><br>${showPlayerCards(
        playerHand
      )}<br><br>${showDealerCards(dealerHand)}`;
    }
    return outputMessage;
  }
};
