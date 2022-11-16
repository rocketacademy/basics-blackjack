// Declare Game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards are drawn";
var GAME_HIT_OR_STAND = "hit or stand";
var GAME_COMP_HIT_OR_STAND = "computer hit or stand";
var GAME_COMPUTER_TURN = "computer turn";
var GAME_COMPARE_SCORES = "compare final score";
var currentGameMode = GAME_START;
var totalHandValue = 0;
var computerTotalHandValue = 0;

//let the game start with the player

var playerDraws = [];
var computerDraws = [];

// var currentPlayer = 1;

var makeDeck = function () {
  // Initialise an empty deck array to hold deck of cards
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

//I NEED TO SHUFFLE THE DECK
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

var makeHand = function () {
  var takeOneCard = shuffledDeck.pop();
  console.log("this is the card");
  console.log(takeOneCard);
  return takeOneCard;
};

// Shows the player what cards they drew
var showCardsDrawn = function (inputHand) {
  var playerDrawn = "<br><br> The cards in this current hand are:<br> ";
  var index = 0;
  while (index < inputHand.length) {
    playerDrawn =
      playerDrawn +
      inputHand[index].name +
      " of " +
      inputHand[index].suit +
      ". <br>";
    index = index + 1;
  }

  return playerDrawn;
};

// Shows the player what cards the computer drew
var showComputerDrawn = function (inputHand) {
  var computerDrawn =
    "<br><br>The cards in the computer's current hand are:<br> ";
  var index = 0;
  while (index < inputHand.length) {
    computerDrawn =
      computerDrawn +
      inputHand[index].name +
      " of " +
      inputHand[index].suit +
      ". <br>";
    index = index + 1;
  }

  return computerDrawn;
};

//pass smth into this valueCalculator function
//if i enter the entire player hand, regardless of no. of cards, it will help me calculate the value of the entire hand.

var valueCalculator = function (cardHand) {
  var sumOfHand = 0;
  for (let counter = 0; counter < cardHand.length; counter++) {
    // cardHand[counter].rank;
    var cardName = cardHand[counter].name;
    if (cardName == "Jack" || cardName == "Queen" || cardName == "King") {
      sumOfHand = sumOfHand + 10;
    } else if (cardName == "Ace") {
      sumOfHand = sumOfHand + 11;
    } else sumOfHand = sumOfHand + cardHand[counter].rank;
  }

  return sumOfHand;
};

// check if anyone has blackjack

var gotBlackJack = function (cardHand) {
  var playerCard1 = cardHand[0];
  var playerCard2 = cardHand[1];
  var blackJack = false;

  if (
    (playerCard1.name == "Ace" && playerCard2.rank >= 10) ||
    (playerCard2.name == "Ace" && playerCard1.rank >= 10)
  ) {
    blackJack = true;
  }

  return blackJack;
};

var playerHasBlackJack = false;
var computerHasBlackJack = false;

//below is the code to try to show what the player has drawn
var main = function (input) {
  console.log("submit button pressed!");
  var outputMessage = "";
  console.log("current game mode: ", currentGameMode);
  if (currentGameMode == GAME_START) {
    console.log("inside IF currentGameMode == GAME_START");
    shuffledDeck = shuffleCards(deck);

    // deal 2 cards to player
    playerDraws.push(shuffledDeck.pop());
    playerDraws.push(shuffledDeck.pop());
    totalHandValue = valueCalculator(playerDraws);
    console.log("your cards are: ", playerDraws);

    // playerDraws = [
    //   { name: "Ace", rank: 1, suit: "spade" },
    //   { name: "King", rank: 13, suit: "spade" },
    // ];

    playerHasBlackJack = gotBlackJack(playerDraws);
    console.log("does player have blackjack: " + playerHasBlackJack);

    currentGameMode = GAME_HIT_OR_STAND;
    if (playerHasBlackJack == true) {
      currentGameMode = GAME_COMPUTER_TURN;
      console.log(
        "after player gets blackjack, the game mode is: " + currentGameMode
      );
      return (outputMessage =
        "Welcome Player! You'll go first!" +
        "<br><br>Your first card is: " +
        playerDraws[0].name +
        " of " +
        playerDraws[0].suit +
        "<br><br>Your second card is: " +
        playerDraws[1].name +
        " of " +
        playerDraws[1].suit +
        "<br><br>Congrats! You got a Blackjack! You're such a lucky charm! Hit submit to see if the computer is as lucky as you.");
    }

    return (
      "Welcome Player! You'll go first!" +
      "<br><br>Your first card is: " +
      playerDraws[0].name +
      " of " +
      playerDraws[0].suit +
      "<br><br>Your second card is: " +
      playerDraws[1].name +
      " of " +
      playerDraws[1].suit +
      " <br><br> The total value of your hand is: " +
      totalHandValue +
      "." +
      " <br><br> Enter the word 'hit' if you'd like to draw another card. <br> <br> Enter the word 'stand' if you're feeling great about your hand and like to end your turn."
    );
  }

  console.log(
    "current game mode after player's first 2 cards= " + currentGameMode
  );

  var totalHandValue = valueCalculator(playerDraws);
  console.log("total value is " + totalHandValue);

  if (currentGameMode == GAME_HIT_OR_STAND) {
    //if player chooses to hit aka draw another card
    if (input == "hit") {
      console.log("game mode is now hit or stand");
      playerDraws.push(shuffledDeck.pop());
      console.log(playerDraws);
      totalHandValue = valueCalculator(playerDraws);
      // if player's hand exceeds 21
      if (totalHandValue > 21) {
        console.log(
          "player burst. the current game mode is: " + currentGameMode
        );
        return (
          "OH NO!!! Your hand has exploded!" +
          showCardsDrawn(playerDraws) +
          "<br>Your total score is: " +
          totalHandValue +
          "<br><br> Hit submit to see if the computer is as unlucky as you are!"
        );
      }
      return (
        "You drew another card!" +
        showCardsDrawn(playerDraws) +
        "<br>The total value of your hand is now: " +
        totalHandValue +
        "." +
        " <br><br> Enter the word 'hit' if you'd like to draw another card. <br> <br> Enter the word 'stand' if you're feeling great about your hand and like to end your turn."
      );
    }
  }
  //if player chooses to stand aka go to computer's turn
  if (
    currentGameMode != GAME_COMPARE_SCORES &&
    (input == "stand" ||
      playerHasBlackJack ||
      (totalHandValue > 21 && currentGameMode == GAME_HIT_OR_STAND))
  ) {
    currentGameMode = GAME_COMPUTER_TURN;
    console.log("player chose stand, current game mode is: " + currentGameMode);

    // if (currentGameMode == GAME_COMPUTER_TURN) {
    console.log("currentGameMode=" + currentGameMode);
    // deal 2 cards to computer
    computerDraws.push(shuffledDeck.pop());
    computerDraws.push(shuffledDeck.pop());
    console.log("the computer's first 2 cards are: ", computerDraws);

    computerTotalHandValue = valueCalculator(computerDraws);

    // computerDraws = [
    //   { name: "Ace", rank: 1, suit: "spade" },
    //   { name: "King", rank: 13, suit: "spade" },
    // ];

    computerHasBlackJack = gotBlackJack(computerDraws);
    console.log("does player have blackjack: " + computerHasBlackJack);

    if (computerHasBlackJack == true) {
      currentGameMode = GAME_COMPARE_SCORES;
      console.log(
        "computer has got blackjack current game mode is: " + currentGameMode
      );
      return (outputMessage =
        "The computer's first card is: " +
        computerDraws[0].name +
        " of " +
        computerDraws[0].suit +
        "<br><br>The computer's second card is: " +
        computerDraws[1].name +
        " of " +
        computerDraws[1].suit +
        "<br><br>Competiton is on! Computer got a Blackjack! Hit submit to compare scores.");
    }
    computerTotalHandValue = valueCalculator(computerDraws);

    while (computerTotalHandValue < 16) {
      computerDraws.push(shuffledDeck.pop());
      computerTotalHandValue = valueCalculator(computerDraws);
      console.log("this is the com's total hand: " + computerTotalHandValue);
    }

    currentGameMode = GAME_COMPARE_SCORES;
    console.log("current game mode: " + currentGameMode);
    var computerOutput =
      "It is now the computer's turn! <br><br>The computer's hand is: ";
    console.log(computerDraws);
    for (let i = 0; i < computerDraws.length; i++) {
      computerOutput +=
        "<br>" + computerDraws[i].name + " of " + computerDraws[i].suit;
    }
    computerOutput +=
      " <br><br> The total value of the computer's hand is: " +
      computerTotalHandValue +
      "." +
      "<br><br> Hit submit to compare your scores.";

    return computerOutput;
    // }
  }

  if (currentGameMode == GAME_COMPARE_SCORES) {
    // a tied game
    if (
      totalHandValue == computerTotalHandValue ||
      (totalHandValue > 21 && computerTotalHandValue > 21)
    ) {
      return (
        "Your score was: " +
        totalHandValue +
        "." +
        "<br><br>The computer's score was: " +
        computerTotalHandValue +
        "." +
        "<br><br>It's a tie! 😬😬😬"
      );
    }
    //player wins
    if (
      (totalHandValue > computerTotalHandValue && totalHandValue <= 21) ||
      (totalHandValue <= 21 && computerTotalHandValue > 21)
    ) {
      return (
        "Your score was: " +
        totalHandValue +
        "." +
        "<br><br>The computer's score was: " +
        computerTotalHandValue +
        "." +
        "<br><br>You won 🥳🥳🥳!"
      );
    }
    //computer wins
    if (
      (totalHandValue < computerTotalHandValue &&
        computerTotalHandValue <= 21) ||
      (computerTotalHandValue <= 21 && totalHandValue > 21)
    ) {
      return (
        "Your score was: " +
        totalHandValue +
        "." +
        "<br><br>The computer's score was: " +
        computerTotalHandValue +
        "." +
        "<br><br>Sorry, the computer won 😭😭😭!"
      );
    }
    // both got blackjack
    if (playerHasBlackJack == true && computerHasBlackJack == true) {
      return "Sick odds! Both you and the computer got a Blackjack hand!";
    }
  }
};
