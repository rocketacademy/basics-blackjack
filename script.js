// Blackjack Project

// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

// BASE
// Gameplay Description
// The main function runs on each player's turn. The sequence of actions in the game might be the following.
// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.
// Note that for the main function to perform different logic on user input, for example when a player decides to hit or stand, we may wish to consider using a new game mode.

/*
Thought process 
- copy make deck function, shuffle cards

- User clicks submit, => 2  cards are dealt

- Display computer's hand => 2 carsd are dealt

- User Card and Computer Cards are compared.

- User decides to "hit"(to take an additional card) or "stand"(To leave card value as is)

- Minimum card value is 17, if not user or computer has to take a card

- 21 is automatic victory for User unless Computer also draws 21 .

- Computer decides to "hit" or "stand" base on pre determined rules

- Game outcome is determined base on which card value is higher (player or Computer)

- Game repeats
*/
// second version
// 1.extra game mode " hit or stand"
// 2.functionality for user to input hit or stand
// 3.if the deal hand value is less than 17, dealer hits.
// 4.if the deal hand is more than 17, dealer stands.

// third version
// 1.Dealer to hit or stand ONLY AFTER player choose to stand.

// fourth version
// if totalHand, including ace, is less than 21, ace value is 11.
// when totalHand, including ace, is more than 21, ace value is 1.

// Fifth Version
// if totalHand > 21 ==> Player or Computer will go "bust".

//GAME MODE (stuck, looked at walk through)
var gameStart = "game start";
var gameCardsDrawn = "cards drawn";
var gameResultsShown = "results shown";
var gameHitOrStand = "hit or stand";
var currentGameMode = gameStart;

var myImage = '<img src="https://c.tenor.com/2Z-LaYDMiyIAAAAC/bite-me3-bitcoin.gif"/>';

var resetGame = function () {
  currentGameMode = gameStart;
  playerHand = [];
  computerHand = [];
  myOutputValue = "Game Over, please press submit to start again.";
};
//declare variable to hold deck of cards
var gameDeck = "empty at the start";

// Function that calculates a hand
var calculateHand = function (handArray) {
  var totalHand = 0;
  var aceCounter = 0;
  // loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // for jack, queen, king, value is 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHand = totalHand + 10;
    } else if (currentCard.name == "ace") {
      totalHand = totalHand + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHand = totalHand + currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHand > 21) {
      totalHand = totalHand - 10;
    }
    index = index + 1;
  }

  return totalHand;
};

// Function that displays the player and dealer hands in a message
var displayHand = function (playerHandArray, computerHandArray) {
  // Player hand
  var playerDisplay = "Player Hand :<br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerDisplay =
      playerDisplay +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  // Computer hand
  var computerDisplay = "Computer Hand :<br>";
  var index = 0;
  while (index < computerHandArray.length) {
    computerDisplay =
      computerDisplay +
      "- " +
      computerHandArray[index].name +
      " of " +
      computerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerDisplay + "<br>" + computerDisplay;
};

// Function that display the total hand values of the player and dealer  in a message
var displayTotalHand = function (playerHandValue, computerHandValue) {
  var totalHandDisplay =
    "<br>Player Total Hand Value: " +
    playerHandValue +
    "<br>Computer Total Hand Value: " +
    computerHandValue;
  return totalHandDisplay;
};

//copy make deck

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

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
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
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

//copy shuffle Card

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

// Helper function to bring shuffled deck into main
var shuffledDeck = shuffleCards(makeDeck());

// Function that checks a hand for blackjack
var checkBlackJack = function (handArray) {
  //check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;
  // if there is blackjack, return true
  // possible scenarios:
  // 1st card ace, 2nd card 10 or picture cards
  // 1st card 10 or picture cards, 2nd card ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10) & (playerCardTwo.name == "ace")
  ) {
    isBlackJack = true;
  }
  //else return false - dont need statement because variable already set to false
  return isBlackJack;
};

// Player's Hand

var playerHand = [];

// // Computer's Hand

var computerHand = [];

// Main function
var main = function (input) {
  // output message is empty string because the message changes when there are other game modes.
  var myOutputValue = "";

  // First Submit
  if (currentGameMode == gameStart) {
    //create the game deck
    gameDeck = shuffledDeck;
    console.log(gameDeck);

    // Deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());
    computerHand.push(gameDeck.pop());

    console.log("player hand ==>");
    console.log(playerHand);
    console.log("computer hand ==>");
    console.log(computerHand);
    // progress the gameMode
    currentGameMode = gameCardsDrawn;
    // write and return the appropriate output message
    myOutputValue =
      displayHand(playerHand, computerHand) +
      '<br>Player and Computer has been dealt 2 cards, Click "Submit" to start the game!';
    return myOutputValue;
  }
  // Second submit
  if (currentGameMode == gameCardsDrawn) {
    // // test checkBlackJack function
    // playerHand = [
    //   { name: "queen", suit: "clubs", rank: 12 },
    //   { name: "ace", suit: "diamonds", rank: 1 },
    // ];
    // computerHand = [
    //   { name: "ace", suit: "clubs", rank: 1 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];

    // check for blackjack
    var playerBlackJack = checkBlackJack(playerHand);
    var computerBlackJack = checkBlackJack(computerHand);

    // playerBlackJack = true;
    // computerBlackJack = true;

    if (playerBlackJack == true || computerBlackJack == true) {
      // both player and computer has blackjack -> tie
      if (playerBlackJack == true && computerBlackJack == true) {
        myOutputValue =
          displayHand(playerHand, computerHand) + "Its a Black Jack tie!";
        resetGame();
      }
      // only player has blackjack -> player wins
      else if (playerBlackJack == true && computerBlackJack == false) {
        myOutputValue =
          displayHand(playerHand, computerHand) +
          "Player got a Black Jack! Player Wins!";
        resetGame();
      }
      // only computer has black jack -> computer wins
      else {
        myOutputValue =
          displayHand(playerHand, computerHand) +
          "Computer got a Black Jack! Computer Wins!";
        resetGame();
      }
      console.log(myOutputValue);
      return myOutputValue;
    } else {
      myOutputValue =
        displayHand(playerHand, computerHand) +
        "<br>There is no blackjack!<br><br> Please input hit or stand to continue";
      console.log(myOutputValue);
      // no black jack -> game continues

      // change game mode
      currentGameMode = gameHitOrStand;
      // appropriate output message
      return myOutputValue;
    }
  }
  // Hit or Stand
  if (currentGameMode == gameHitOrStand) {
    // Player Hit
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      myOutputValue =
        displayHand(playerHand, computerHand) +
        '<br> You drew another card. <br><br>Please input "hit" or "stand".';
      console.log(myOutputValue);
    }
    // Player Stand
    else if (input == "stand") {
      // calculate the total hand value of both player and comptuer
      var playerTotalHand = calculateHand(playerHand);
      var computerTotalHand = calculateHand(computerHand);

      while (computerTotalHand < 17) {
        computerHand.push(gameDeck.pop());
        computerTotalHand = calculateHand(computerHand);
      }

      // console.log("Palyer Total Hand Value ==>", playerTotalHand);
      // console.log("Computer Total Hand Value ==>", computerTotalHand);

      // BUST
      if (playerTotalHand > 21) {
        myOutputValue =
          displayHand(playerHand, computerHand) +
          "Bust!<br><br> Player loses! Computer Wins!" +
          displayTotalHand(playerTotalHand, computerTotalHand);
        console.log("Player bust", playerTotalHand);
        resetGame();
        return myOutputValue;
      }

      if (computerTotalHand > 21) {
        myOutputValue =
          displayHand(playerHand, computerHand) +
          "Bust! <br><br>Computer loses! Player wins!" +
          displayTotalHand(playerTotalHand, computerTotalHand);
        console.log("Computer bust", computerTotalHand);
        resetGame();
        return myOutputValue;
      }

      // compare total hand value
      // same value -> tie
      if (playerTotalHand == computerTotalHand) {
        myOutputValue =
          displayHand(playerHand, computerHand) +
          "Its a tie!<br><br>" +
          displayTotalHand(playerTotalHand, computerTotalHand);
        resetGame();
      }
      // player has higher value -> player wins
      else if (
        (playerTotalHand > computerTotalHand && playerTotalHand <= 21) ||
        (playerTotalHand <= 21 && computerTotalHand > 21)
      ) {
        myOutputValue =
          displayHand(playerHand, computerHand) +
          "Player Wins!<br><br>" +
          displayTotalHand(playerTotalHand, computerTotalHand);
        resetGame();
      }
      // computer has higher value -> computer wins
      else {
        myOutputValue =
          displayHand(playerHand, computerHand) +
          "Computer wins!<br><br>" +
          displayTotalHand(playerTotalHand, computerTotalHand);
        resetGame();
      }
    }
    // input validation
    else {
      myOutputValue =
        'Wrong input. Please input only "hit" or "stand".<br><br>' +
        displayHand(playerHand, computerHand);
      console.log(myOutputValue);
    }

    return myOutputValue;
  }
};
