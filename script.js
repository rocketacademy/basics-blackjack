// control deck
var fakeDeck = [
  {
    rank: 1,
    suit: "heart",
    name: "ace",
  },
  {
    rank: 13,
    suit: "heart",
    name: "king",
  },
];

// card deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

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
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};
// Deck is shuffled.
var shuffledDeck = shuffleCards(makeDeck());

// player
var playerHand = [];

// computer, always the dealer, dealer hase to hit hands below 17
var dealerHand = [];
var dealerToHit = 17;

// sure win hands
var blackJack = 21;

// hit or stand
var hit = "yes";
var stand = "no";
//default choice is to hit
var playerInput = hit;

// game modes
var gameStart = "start";
var dealCards = "deal";
var hitOrStand = "yes or no";
// default game mode
var gameMode = gameStart;

// get total value of cards on hand
// ace can be 1 or 11
var getTotalHandsValue = function (currentHand) {
  var aceOnHand = 0;
  var cardValue = 0;
  var cardTotalValueCount = 0;
  while (cardTotalValueCount < currentHand.length) {
    var card = currentHand[cardTotalValueCount];
    if (card.rank >= 11 && card.rank <= 13) {
      cardValue += 10;
    } else if (card.rank == 1) {
      aceOnHand += 1;
      cardValue += 11;
    } else {
      cardValue += card.rank;
    }
    cardTotalValueCount += 1;
  }
  // if ace on hand < 2, value > 21, total minus 10
  // if ace on hand > 2, value > 21, total card > 2, total add 10
  if (cardValue > blackJack && aceOnHand != 0) {
    var aceCounter = 0;
    while (aceCounter < aceOnHand) {
      cardValue -= 10;
      aceCounter += 1;
      console.log("card value with ace", cardValue);
      if (cardValue <= blackJack) {
        break;
      }
    }
    if (aceOnHand > 2) {
      cardValue += 10;
      console.log("aceonhand", aceOnHand);
      console.log("card value with ace > 2", cardValue);
    }
  }
  return cardValue;
};

// closer to 21 wins the hand
var main = function (input) {
  var myOutputValue =
    "ERROR! Please be good and follow the instructions given! Hit Refresh and try again! 😡";
  // player hit or stand, default is hit
  if (gameMode == hitOrStand) {
    playerInput = input;
    var newPlayerCard = shuffledDeck.pop();
    if (playerInput == "yes") {
      playerHand.push(newPlayerCard);
      console.log("player add card", playerHand);
      console.log("new player hands value", getTotalHandsValue(playerHand));
      if (getTotalHandsValue(playerHand) > blackJack) {
        gameMode = gameStart;
        return `BUST! You LOSE! <br><br> Press Refresh to play again`;
      }
      return `Player new card is: <br> ${newPlayerCard.name} of ${
        newPlayerCard.suit
      } <br> Total hands value: ${getTotalHandsValue(
        playerHand
      )} <br><br> Do you require additional cards? (yes/no)`;
    }
    if (playerInput == "no") {
      //dealer turn, check if dealer under 17

      while (getTotalHandsValue(dealerHand) < dealerToHit) {
        var newComputerCard = shuffledDeck.pop();
        dealerHand.push(newComputerCard);
        console.log("dealer add card", dealerHand);
        console.log("new dealer hands value", getTotalHandsValue(dealerHand));

        if (getTotalHandsValue(dealerHand) > dealerToHit) {
          break;
        }
      }
      // check if dealer bust
      if (getTotalHandsValue(dealerHand) > blackJack) {
        gameMode = gameStart;
        return `Dealer BUST! Player Wins!! Congratulations 🥂 <br><br> Press Refresh to play again`;
        // compare final hands value
        // higher value and closer to 21 wins, if daaw, stand off
      } else if (
        getTotalHandsValue(dealerHand) < getTotalHandsValue(playerHand)
      ) {
        gameMode = gameStart;
        return `Congratulations 🥂 Players Wins with ${getTotalHandsValue(
          playerHand
        )} vs Dealer ${getTotalHandsValue(
          dealerHand
        )} <br><br> Press Refresh to play again`;
      } else if (
        getTotalHandsValue(dealerHand) > getTotalHandsValue(playerHand)
      ) {
        gameMode = gameStart;
        return `Dealer Wins with ${getTotalHandsValue(
          dealerHand
        )} vs ${getTotalHandsValue(
          playerHand
        )} <br><br> Press Refresh to play again`;
      } else if (
        getTotalHandsValue(dealerHand) == getTotalHandsValue(playerHand)
      ) {
        gameMode = gameStart;
        return `It's a Stand Off!! No winner. <br> Dealer Hands: ${getTotalHandsValue(
          dealerHand
        )} vs Player Hands: ${getTotalHandsValue(
          playerHand
        )} <br><br> Press Refresh to play again`;
      }
    }
  }
  // game start and game reset point
  if (gameMode == gameStart && input == "") {
    playerHand = [];
    dealerHand = [];
    gameMode = dealCards;
    return `Welcome to Basic BlackJack! <br><br> Press submit to deal cards`;
  }
  // deal cards
  if (gameMode == dealCards && input == "") {
    // Draw two card each from the top of the deck
    var cardDealCount = 0;
    while (cardDealCount < 2) {
      var computerCard = shuffledDeck.pop();
      var playerCard = shuffledDeck.pop();
      // var playerCard = fakeDeck.pop();
      playerHand.push(playerCard);
      console.log("player hands", playerHand);
      console.log(getTotalHandsValue(playerHand));
      dealerHand.push(computerCard);
      console.log("dealer hands", dealerHand);
      console.log(getTotalHandsValue(dealerHand));
      cardDealCount += 1;
    }

    // check hands for blackjack
    if (getTotalHandsValue(playerHand) == blackJack) {
      // player wins
      gameMode = gameStart;
      return `BlackJack!! Player Wins! Congratulations 🥂 <br><br> Press Refresh to play again`;
      // dealer wins
    } else if (getTotalHandsValue(dealerHand) == blackJack) {
      gameMode = gameStart;
      return `BlackJack!! Dealer Wins! <br><br> Press Refresh to play again`;
    } else if (
      getTotalHandsValue(dealerHand) != blackJack &&
      getTotalHandsValue(playerHand) != blackJack
    ) {
      gameMode = hitOrStand;
      return `Player current hands are: <br> ${playerHand[0].name} of ${
        playerHand[0].suit
      } & ${playerHand[1].name} of ${
        playerHand[1].suit
      } <br> Total hands value: ${getTotalHandsValue(
        playerHand
      )} <br><br> Do you require additional cards? (yes/no)`;
    }
  }
  return myOutputValue;
};

/* 
Introduction
Implement a simplified version of Blackjack. 
There will be only two players. One human and one computer.
The computer will always be the dealer. The dealer has to hit if their hand is below 17.
The player who is closer to 21 wins the hand. Aces can be 1 or 11.
    
Base
Gameplay Description
The main function runs on each player's turn. The sequence of actions in the game might be the following.
    
Deck is shuffled.

User clicks Submit to deal cards.

The cards are analysed for game winning conditions, e.g. Blackjack.

The cards are displayed to the user.

The user decides whether to hit or stand, using the submit button to submit their choice.


The user's cards are analysed for winning or losing conditions.

The computer decides to hit or stand automatically based on game rules.

The game either ends or continues.

Note that for the main function to perform different logic on user input, for example when a player decides to hit or stand, we may wish to consider using a new game mode.

General Tips
Creating helper functions can be a powerful way to refactor your code and keep it neat.
Don't be afraid to throw away code, especially if you already know how you would write it better.
Commit your code often, whenever you have a small working version. For example, each action listed above would be a commit. Make concise and precise commit messages so that you can reference your old changes later.
*/
