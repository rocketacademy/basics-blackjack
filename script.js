// global variables
var mode = "start";
var cardDeck = [];
var shuffledDeck = [];
var playerHand = [];
var computerHand = [];
var initialMessage = ""; // the initial output message after player and computer are each dealt two cards
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

// a function that determines if player or computer wins Black Jack based on first two cards. outputs different winning messages for player and computer
var blackJackWinningFunction = function (playerOrComputerHand) {
  if (playerOrComputerHand == "playerHand") {
    if (
      (playerHand[0].name == "ace" && playerHand[1].name == "ace") ||
      (playerHand[0].name == "ace" && playerHand[1].rank == 10) ||
      (playerHand[0].rank == 10 && playerHand[1].name == "ace")
    ) {
      return "Player has Black Jack! You got 21. Enter 'stand' to see if you won. <br><br>";
    } else {
      return "You can choose to hit (type 'hit') or stand (type 'stand'). <br><br>";
    }
  } else if (playerOrComputerHand == "computerHand") {
    if (
      (computerHand[0].name == "ace" && computerHand[1].name == "ace") ||
      (computerHand[0].name == "ace" && computerHand[1].rank == 10) ||
      (computerHand[0].rank == 10 && computerHand[1].name == "ace")
    ) {
      return (computerTotalScore = 21);
    } else {
      return;
    }
  } else {
    return "did not win black jack";
  }
};

// a function that determines if player wins Black Jack after being dealt the first two cards. if player didn't win, program outputs message asking player to enter 'hit' or 'stand'.
var determineInitialWinner = function () {
  if (
    ((playerHand[0].name == "ace" && playerHand[1].name == "ace") ||
      (playerHand[0].name == "ace" && playerHand[1].rank == 10) ||
      (playerHand[0].rank == 10 && playerHand[1].name == "ace")) &&
    !(
      (computerHand[0].name == "ace" && computerHand[1].name == "ace") ||
      (computerHand[0].name == "ace" && computerHand[1].rank == 10) ||
      (computerHand[0].rank == 10 && computerHand[1].name == "ace")
    )
  ) {
    return "Player has Black Jack! You got 21. You win the game. <br><br>";
  } else {
    return "You can choose to hit (type 'hit') or stand (type 'stand'). <br><br>";
  }
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
    // playerTotalScore =
    //   playerTotalScore + playerHand[playerHand.length - 1].rank;

    // updates player's total score V2
    playerTotalScore = countHandScore(playerHand);
    console.log(`Player's Total Score: ${playerTotalScore}`);

    // calls on the Bust function and returns Bust message
    var bustMessage = determineIfBust(playerTotalScore);
    // console.log(`Bust message is: ${bustMessage}`);
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

    // updates the main output message (of all the cards on table) by adding the new card that player just drew
    computerCardsMessage =
      computerCardsMessage +
      `<br>${computerHand[computerHand.length - 1].name} of ${
        computerHand[computerHand.length - 1].suit
      }`;
    message = `${computerCardsMessage} <br><br> ${playerCardsMessage}`;
    // console.log(`message: ${message}`);
    // console.log(`Computer's Cards message: ${computerCardsMessage}`);

    // updates computer's total score
    computerTotalScore = countHandScore(computerHand);
    // console logs both computer's and player's current total store
    console.log(`Computer's total score: ${computerTotalScore}`);
    console.log(`Player's total score: ${playerTotalScore}`);

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

// a function that determines if a current hand has any aces and returns true if there are, and false is there are none
var hasAceInHand = function (playerOrComputerHand) {
  var aceInHandCounter = 0;
  var word = "";
  // While Loop runs through entire hand to see if there's any aces in it
  while (aceInHandCounter < playerOrComputerHand.length) {
    word = playerOrComputerHand[aceInHandCounter].name;
    if (word == "ace") {
      return true;
    }
    aceInHandCounter = aceInHandCounter + 1;
  }
  // returns false if  no aces
  return false;
};

// a function that takes a current hand and determines the score. it also accommodates cases where hand has aces
var countHandScore = function (playerOrComputerHand) {
  var countHandScoreCounter = 0;
  var score = 0;
  // While Loop runs through entire hand that has no aces
  if (hasAceInHand(playerOrComputerHand) == false) {
    while (countHandScoreCounter < playerOrComputerHand.length) {
      score = score + playerOrComputerHand[countHandScoreCounter].rank;
      countHandScoreCounter = countHandScoreCounter + 1;
    }
    return score;
  } else if (hasAceInHand(playerOrComputerHand) == true) {
    while (countHandScoreCounter < playerOrComputerHand.length) {
      score = score + playerOrComputerHand[countHandScoreCounter].rank;
      countHandScoreCounter = countHandScoreCounter + 1;
    }
    // if current score is <= 11 and there's an ace in hand, treat ace as 11 (which means add 10 to score). this escapes the bust.
    // means if score >= 11, ace will be treated as having score of 1
    if (score <= 11) {
      score = score + 10;
    }
    return score;
  }
};

var main = function (input) {
  // outputs a different message based on which mode the program is in
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
