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
  var suits = ["♥", "♦", "♣", "♠"];

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
var placeBet = "betting";
// default game mode
var gameMode = gameStart;

// store player name
var playerName;
// store player info
var playerInfo = [];

// number of players
var playerIndex = 0;

// Betting
// The player starts with 100 points. Each round the player wagers a number of points before their hand is dealt. Keep track of the player's points throughout the game.
var createPlayer = function (nameInput) {
  playerInfo.push({
    name: nameInput,
    hand: [],
    bet: 0,
    points: 100,
  });
};

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
  // Deck is shuffled.
  var shuffledDeck = shuffleCards(makeDeck());

  var myOutputValue =
    "ERROR! Please be good and follow the instructions given! Hit Refresh and try again! 😡";
  // player hit or stand, default is hit
  if (gameMode == hitOrStand) {
    playerInput = input;
    var newPlayerCard = shuffledDeck.pop();
    if (playerInput == "yes") {
      playerInfo[playerIndex].hand.push(newPlayerCard);
      console.log("player add card", playerInfo[playerIndex].hand);
      console.log(
        "new player hands value",
        getTotalHandsValue(playerInfo[playerIndex].hand)
      );
      if (getTotalHandsValue(playerInfo[playerIndex].hand) > blackJack) {
        playerInfo[playerIndex].points -= playerInfo[playerIndex].bet;
        gameMode = placeBet;
        return `BUST! You LOSE! <br><br> Player's points balance: ${playerInfo[playerIndex].points} <br><br> Place your bets to play again`;
      }
      return `Player new card is: <br> ${newPlayerCard.name} of ${
        newPlayerCard.suit
      } <br> Total hands value: ${getTotalHandsValue(
        playerInfo[playerIndex].hand
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
        playerInfo[playerIndex].points += playerInfo[playerIndex].bet;
        gameMode = placeBet;
        return `Dealer BUST! Player Wins!! Congratulations 🥂 <br><br> Player's points balance: ${playerInfo[playerIndex].points} <br><br> Place your bets to play again`;
        // compare final hands value
        // higher value and closer to 21 wins, if daaw, stand off
      } else if (
        getTotalHandsValue(dealerHand) <
        getTotalHandsValue(playerInfo[playerIndex].hand)
      ) {
        playerInfo[playerIndex].points += playerInfo[playerIndex].bet;
        gameMode = placeBet;
        return `Congratulations 🥂 Players Wins with ${getTotalHandsValue(
          playerInfo[playerIndex].hand
        )} vs Dealer ${getTotalHandsValue(
          dealerHand
        )} <br><br> Player's points balance: ${
          playerInfo[playerIndex].points
        } <br><br> Place your bets to play again`;
      } else if (
        getTotalHandsValue(dealerHand) >
        getTotalHandsValue(playerInfo[playerIndex].hand)
      ) {
        playerInfo[playerIndex].points -= playerInfo[playerIndex].bet;
        gameMode = placeBet;
        return `Dealer Wins with ${getTotalHandsValue(
          dealerHand
        )} vs ${getTotalHandsValue(
          playerInfo[playerIndex].hand
        )} <br><br> Player's points balance: ${
          playerInfo[playerIndex].points
        } <br><br> Place your bets to play again`;
      } else if (
        getTotalHandsValue(dealerHand) ==
        getTotalHandsValue(playerInfo[playerIndex].hand)
      ) {
        gameMode = placeBet;
        return `It's a Stand Off!! No winner. <br> Dealer Hands: ${getTotalHandsValue(
          dealerHand
        )} vs Player Hands: ${getTotalHandsValue(
          playerInfo[playerIndex].hand
        )} <br><br> Player's points balance: ${
          playerInfo[playerIndex].points
        } <br><br> Place your bets to play again`;
      }
    }
  }
  // game start
  if (gameMode == gameStart && input != "") {
    playerName = input;
    createPlayer(playerName);
    console.log("player info", playerInfo);

    // gameMode = dealCards;
    gameMode = placeBet;
    return `Hi ${playerInfo[playerIndex].name}! Welcome to Basic BlackJack! <br><br> There will be only two players. <br> One human and one computer. <br> The computer will always be the dealer. <br> The player plays against the Dealer. <br> The dealer has to hit if their hand is below 17. <br> Closer to 21 wins the hand. Over 21 is bust. <br> When the player has the same total as the Dealer it is a stand off. <br> Aces can be 1 or 11. <br> Court cards count as 10 and all other cards have their face value. <br> Player may take as many cards as they wish up to a total of 21. <br><br> ▶ Player have 100 points. <br> Please enter yout bets and press submit`;
  }

  if (gameMode == placeBet && input != 0) {
    if (Number.isNaN(Number(input)) == true) {
      return `Please enter a correct bet! 1 to ${playerInfo[playerIndex].points}`;
    }
    if (input > playerInfo[playerIndex].points) {
      if (playerInfo[playerIndex].points < 1) {
        return `GameOver! You have lost all your points. <br><br> Hit refresh to restart. Bye Bye`;
      }
      return `Player only have ${playerInfo[playerIndex].points} points. Please enter a correct bet!!`;
    }
    playerInfo[playerIndex].hand = [];
    dealerHand = [];
    playerInfo[playerIndex].bet = Number(input);
    console.log("player bet", playerInfo[playerIndex].bet);
    console.log("player points balance", playerInfo[playerIndex].points);
    gameMode = dealCards;
    return `${playerInfo[playerIndex].name} bet ${playerInfo[playerIndex].bet} points <br><br> Press submit to deal cards`;
  }
  // deal cards
  if (gameMode == dealCards && input == "") {
    // Draw two card each from the top of the deck
    var cardDealCount = 0;
    while (cardDealCount < 2) {
      var computerCard = shuffledDeck.pop();
      var playerCard = shuffledDeck.pop();
      // var playerCard = fakeDeck.pop();
      playerInfo[playerIndex].hand.push(playerCard);
      console.log("player hands", playerInfo[playerIndex].hand);
      console.log(getTotalHandsValue(playerInfo[playerIndex].hand));
      dealerHand.push(computerCard);
      console.log("dealer hands", dealerHand);
      console.log(getTotalHandsValue(dealerHand));
      cardDealCount += 1;
    }

    // check hands for blackjack
    if (getTotalHandsValue(playerInfo[playerIndex].hand) == blackJack) {
      // player wins
      var playerBlackJackWins = playerInfo[playerIndex].bet * 1.5;
      console.log("blackjack 1.5 times", playerBlackJackWins);
      playerInfo[playerIndex].points += playerBlackJackWins;
      gameMode = placeBet;
      return `BlackJack!! Player Wins! Congratulations 🥂 <br><br> Player's points balance: ${playerInfo[playerIndex].points} <br><br> Place your bets to play again`;
      // dealer wins
    } else if (getTotalHandsValue(dealerHand) == blackJack) {
      playerInfo[playerIndex].points -= playerInfo[playerIndex].bet;
      gameMode = placeBet;
      return `BlackJack!! Dealer Wins! <br><br> Player's points balance: ${playerInfo[playerIndex].points} <br><br> Place your bets to play again`;
    } else if (
      getTotalHandsValue(dealerHand) != blackJack &&
      getTotalHandsValue(playerInfo[playerIndex].hand) != blackJack
    ) {
      gameMode = hitOrStand;
      return `Player current hands are: <br> ${
        playerInfo[playerIndex].hand[0].name
      } of ${playerInfo[playerIndex].hand[0].suit} & ${
        playerInfo[playerIndex].hand[1].name
      } of ${
        playerInfo[playerIndex].hand[1].suit
      } <br> Total hands value: ${getTotalHandsValue(
        playerInfo[playerIndex].hand
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
