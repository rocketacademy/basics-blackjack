// global variables
var mode = "start";
var cardDeck = [];
var shuffledDeck = [];
var playerHand = [];
var computerHand = [];
var initialMessage = ""; // the initial output after player and computer are each dealt two cards
var messageAfterPlayerHits = ""; // the output message after play enters 'hit' and is given a new card
var playerCardsMessage = ""; // all the cards in the player's current hand.
var computerCardsMessage = ""; // all the cards in the computer's current hand.
var message = ""; // the message that outputs ALL cards of both players. later below, it'll be made up of 'computerCardsMessage' and 'playerCardsMessage'
var myOutputValue = "";
var playerTotalScore = 0; // the player's current total score which is to determine if player wins or busts
var computerTotalScore = 0; // the computer's current total score which is to determine if computer wins or busts

// a function that gets a random index ranging from 0 (inclusive) to max (exclusive). it's used in the shuffleCards function.
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// a function that makes a regular 52-card deck, arranged in order of rank and suit.
var makeDeck = function () {
  // Initialise an empty deck array

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
      // created new variable 'blackJackScore' to change the rank of jacks, queens, and kings to 10 WITHOUT changing the ranks of other cards in the deck.
      var blackJackScore = rankCounter;
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name and also assigns rank of 10 to jacks, queens, and kings
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        blackJackScore = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        blackJackScore = 10;
      } else if (cardName == 13) {
        cardName = "king";
        blackJackScore = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: blackJackScore,
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

// a function that shuffles the we have deck
var shuffleCards = function (cardDeck) {
  // loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // select the card that corresponds to the random index
    var randomCard = cardDeck[randomIndex];
    // select the card that corresponds to the current index
    var currentCard = cardDeck[currentIndex];
    // swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // return the shuffled deck
  return cardDeck;
};

// a function that deals two initial cards each to computer and player
var initialDealRound = function () {
  cardDeck = makeDeck();
  shuffledDeck = shuffleCards(cardDeck);

  // one card dealt each is first dealt to computer and player, then this repeats. so in total two cards each dealt to computer and player
  // push 1st card to computer's hand
  computerHand.push(shuffledDeck.pop());
  // push 1st card to player's hand
  playerHand.push(shuffledDeck.pop());
  // push 2nd card to computer's hand
  computerHand.push(shuffledDeck.pop());
  // push 2nd card to player's hand
  playerHand.push(shuffledDeck.pop());

  // new variables to make naming and console logging easier
  computerTotalScore = computerHand[0].rank + computerHand[1].rank;
  playerTotalScore = playerHand[0].rank + playerHand[1].rank;
  console.log(`Computer's current total score: ${computerTotalScore}`);
  console.log(`Player's current total score: ${playerTotalScore}`);

  // output a message to display the four cards dealt so far
  computerCardsMessage = `Computer's hand: <br>${computerHand[0].name} of ${computerHand[0].suit} <br>${computerHand[1].name} of ${computerHand[1].suit}`;
  playerCardsMessage = `Player's hand: <br>${playerHand[0].name} of ${playerHand[0].suit} <br>${playerHand[1].name} of ${playerHand[1].suit}`;
  message = `${computerCardsMessage} <br><br> ${playerCardsMessage}`;

  // stores message from determineInitialWinner function
  initialMessage = determineInitialWinner();
  // concentenates the messages. 'initialDealRoundMessage' message will either: (1) say player wins Black Jack, or (2) message that tells user to enter 'hit' or 'stand'
  initialDealRoundMessage = initialMessage + message;
  return initialDealRoundMessage;
};

// a function that determines if player wins Black Jack after being dealt the first two cards. if player didn't win, program outputs message asking player to enter 'hit' or 'stand'.
var determineInitialWinner = function () {
  // player wins Black Jack from his two cards
  if (
    (playerHand[0].name == "ace" && playerHand[1].name == "ace") ||
    (playerHand[0].name == "ace" && playerHand[1].rank == 10) ||
    (playerHand[0].rank == 10 && playerHand[1].name == "ace")
  ) {
    initialMessage = "Player wins Black Jack! You got 21.<br><br>";
  }
  // game continues: player doesn't win Black Jack from his two cards
  else {
    initialMessage =
      "You can choose to hit (type 'hit') or stand (type 'stand'). <br><br>";
  }
  console.log(`initial message: ${initialMessage}`);
  return initialMessage;
};

// a function that outputs a message if the player types 'hit' or 'stand'
// it evaluates the player's total score after the player hits, gets a new card for the player, and then returns a message that shows what the current score is and whether player busts (score/rank >21)
var hitOrStand = function (input) {
  // default output message if player doesn't enter 'hit' or 'stand'
  var messageAfterPlayerHits = "You typed something wrong.";
  // if player enters 'hit', takes a card from the deck and decide if it's a bust (rank is > 21), or not. either way, displays a message
  if (input == "hit") {
    // add a card from the deck to player's hand
    playerHand.push(shuffledDeck.pop());

    // console log the latest card that's been added to player's hand
    console.log(
      `Player's card no. ${playerHand.length} is: ${
        playerHand[playerHand.length - 1].name
      } of ${playerHand[playerHand.length - 1].suit}`
    );

    // updates the main output message (of all the cards on table) by adding the new card that player drew to his/her hand
    playerCardsMessage =
      playerCardsMessage +
      `<br>${playerHand[playerHand.length - 1].name} of ${
        playerHand[playerHand.length - 1].suit
      }`;
    message = `${computerCardsMessage} <br><br> ${playerCardsMessage}`;
    // console.log(`message: ${message}`);
    // console.log(`Player's Cards message: ${playerCardsMessage}`);

    // updates player's total score
    playerTotalScore =
      playerTotalScore + playerHand[playerHand.length - 1].rank;
    console.log(`Player's Total Score: ${playerTotalScore}`);

    // calls on the Bust function and returns Bust message
    var bustMessage = determineIfBust(playerTotalScore);
    console.log(`Bust message is: ${bustMessage}`);
    messageAfterPlayerHits = bustMessage + message;

    return messageAfterPlayerHits;
  } else if (input == "stand") {
    mode = "evaluateComputerHand";
  }
  return messageAfterPlayerHits;
};

// a function that evaluates the computer's hand after player enters 'stand'
var evaluateComputerHand = function () {
  var computerBustMessage = "";
  // logic for computer(dealer) adding cards to their hand.

  // a While Loop that first checks if computer's score is <17, and if so, draws a card for computer till its score is >= 17
  while (computerTotalScore < 17) {
    // add card from the deck to computer's hand
    computerHand.push(shuffledDeck.pop());

    // console logs the latest card that's been added to computer's hand.
    console.log(
      `Computer's card no. ${computerHand.length} is: ${
        computerHand[computerHand.length - 1].name
      } of ${computerHand[computerHand.length - 1].suit}`
    );

    // updates the main output message (of all the cards on table) by adding the new card that player drew to his hand.
    computerCardsMessage =
      computerCardsMessage +
      `<br>${computerHand[computerHand.length - 1].name} of ${
        computerHand[computerHand.length - 1].suit
      }`;
    message = `${computerCardsMessage} <br><br> ${playerCardsMessage}`;
    // console.log(`message: ${message}`);
    // console.log(`Computer's Cards message: ${computerCardsMessage}`);

    // updates computer's total score
    computerTotalScore =
      computerTotalScore + computerHand[computerHand.length - 1].rank;
    console.log(`Computer's Total Score: ${computerTotalScore}`);

    // bust condition for computer. outputs 'player win'
    if (computerTotalScore > 21) {
      computerBustMessage = `Computer bust. You win twice your bet. Refresh the page to play again.`;
      message = `${computerBustMessage} <br><br>${computerCardsMessage} <br><br> ${playerCardsMessage}`;
      return message;
    }
  }
  // compares computer's score and player's score and outputs a message saying who is the winner (here computer's total score is > 17).
  if (playerTotalScore == computerTotalScore) {
    var tieMessage = `It's a tie. Your money stays the same. Refresh the page to play again.`;
    return `${tieMessage} <br><br>${message}`;
  } else if (playerTotalScore > computerTotalScore) {
    var playerWinMessage = `You win. You scored higher than the dealer. You win twice your bet. Refresh the page to play again.`;
    return `${playerWinMessage} <br><br>${message}`;
  } else if (playerTotalScore < computerTotalScore) {
    var playerWinMessage = `You lose. You scored lower than the dealer. You lose your initial bet. Refresh the page to play again.`;
    return `${playerWinMessage} <br><br>${message}`;
  }

  return message;
};

// a function that determines if the score is a bust or not and outputs one of two relevant messages
var determineIfBust = function (totalScore) {
  if (totalScore > 21) {
    bustMessage = `You bust. Your score is over 21. You lose your initial bet. <br><br>`;
    return bustMessage;
  } else {
    bustMessage = ``;
    return bustMessage;
  }
};

var main = function (input) {
  // outputs a different message based on which mode program is in
  if (mode == "start") {
    myOutputValue = initialDealRound();
  }
  if (mode == "playerHitOrStand") {
    myOutputValue = hitOrStand(input);
  }
  if (mode == "evaluateComputerHand") {
    myOutputValue = evaluateComputerHand();
  }

  // this changes the mode. note: the "playerHitOrStand" mode is changed to "evaluateComputerHand" mode inside the hitOrStand function and NOT inside the main function.
  if (mode == "start") {
    mode = "playerHitOrStand";
  }

  return myOutputValue;
};
