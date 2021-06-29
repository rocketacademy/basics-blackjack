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

// a function that gets a random index ranging from 0 (inclusive) to max (exclusive). it's used in the shuffleCards function later.
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
      // new variable 'blackJackScore' changes the rank/score of jacks, queens, and kings to 10 WITHOUT changing the ranks/score of other cards in the deck.
      var blackJackScore = rankCounter;
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name and also assigns rank of 10 to jacks, queens, and kings
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        // assigns score of 10 to each jack in the deck
        blackJackScore = 10;
      } else if (cardName == 12) {
        // assigns score of 10 to each queen in the deck
        cardName = "queen";
        blackJackScore = 10;
      } else if (cardName == 13) {
        // assigns score of 10 to each king in the deck
        cardName = "king";
        blackJackScore = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: blackJackScore,
      };

      // Add the new card to the deck which was previously an empty array (see global variables at the top)
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

// a function that shuffles the deck we have
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
  // push 1st card from shuffled deck to computer's hand
  computerHand.push(shuffledDeck.pop());
  // push 1st card from shuffled deck to player's hand
  playerHand.push(shuffledDeck.pop());
  // push 2nd card from shuffled deck to computer's hand
  computerHand.push(shuffledDeck.pop());
  // push 2nd card from shuffled deck to player's hand
  playerHand.push(shuffledDeck.pop());

  // add up card scores to give computerTotalScore and playerTotalScore
  // computerTotalScore = countHandScore(computerHand);
  // playerTotalScore = countHandScore(playerHand);
  computerTotalScore = computerHand[0].rank + computerHand[1].rank;
  playerTotalScore = playerHand[0].rank + playerHand[1].rank;
  console.log(`Computer's current total score: ${computerTotalScore}`);
  console.log(`Player's current total score: ${playerTotalScore}`);

  // output a message to display the four cards dealt so far
  computerCardsMessage = `Computer's hand: <br>${computerHand[0].name} of ${computerHand[0].suit} <br>${computerHand[1].name} of ${computerHand[1].suit}`;
  playerCardsMessage = `Player's hand: <br>${playerHand[0].name} of ${playerHand[0].suit} <br>${playerHand[1].name} of ${playerHand[1].suit}`;
  // final message combines computerCardsMessage and playerCardsMessage to show all cards
  message = `${computerCardsMessage} <br><br> ${playerCardsMessage}`;

  // stores message from determineInitialWinner function
  initialMessage = determineInitialWinner();
  // concentenates the messages. 'initialDealRoundMessage' message will either: (1) say player wins Black Jack, or (2) message that tells user to enter 'hit' or 'stand'
  initialDealRoundMessage = initialMessage + message;
  return initialDealRoundMessage;
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
  messageAfterPlayerHits = "You typed something wrong.";
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

    // updates player's total score
    playerTotalScore = countHandScore(playerHand);
    console.log(`Player's Total Score: ${playerTotalScore}`);

    // calls on the bust function and returns bust message
    var bustMessage = determineIfBust(playerTotalScore);
    // console.log(`Bust message is: ${bustMessage}`);
    messageAfterPlayerHits = bustMessage + message;

    return messageAfterPlayerHits;
  }
  // changes game mode when player enters "stand"
  // else if (input == "stand") {
  //   mode = "evaluateComputerHand";
  // }
  return messageAfterPlayerHits;
};

// a function that evaluates the computer's hand after player enters 'stand'
var evaluateComputerHand = function () {
  var computerBustMessage = "";

  // logic for computer(dealer) adding cards to their hand
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

    // updates computer's total score using countHandScore function
    computerTotalScore = countHandScore(computerHand);
    // console logs both computer's and player's current total store
    console.log(`Computer's total score: ${computerTotalScore}`);
    console.log(`Player's total score: ${playerTotalScore}`);

    // bust condition for computer. outputs 'player win' when computer busts
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
  // While Loop runs through entire hand to see if there's any aces in it and returns either true or false
  while (aceInHandCounter < playerOrComputerHand.length) {
    word = playerOrComputerHand[aceInHandCounter].name;
    // checks if there are aces
    if (word == "ace") {
      // returns true if there is at least one ace
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
  // While Loop runs through entire hand that has no aces to return total score of whole hand
  if (hasAceInHand(playerOrComputerHand) == false) {
    while (countHandScoreCounter < playerOrComputerHand.length) {
      score = score + playerOrComputerHand[countHandScoreCounter].rank;
      countHandScoreCounter = countHandScoreCounter + 1;
    }
    return score;
  }
  // While Loop runs through an entire hand that has at least one ace to return total score of whole hand
  else if (hasAceInHand(playerOrComputerHand) == true) {
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
  // begins in mode "start"
  if (mode == "start") {
    // changes mode to "playerHitOrStand" when in mode "start"
    mode = "playerHitOrStand";
    // calls initialDealRound function to output 4 dealt cards message to myOutputValue
    myOutputValue = initialDealRound();
  }
  // enters mode "playerHitOrStand"
  else if (mode == "playerHitOrStand") {
    // if player hits "stand"
    if (input == "stand") {
      // change mode to "evaluateComputerHand"
      mode = "evaluateComputerHand";
      // calls evaluateComputerhand function to output game outcome message
      myOutputValue = evaluateComputerHand();
      return myOutputValue;
    }
    // otherwise calls hitOrStand function which returns output message when player enters "hit"
    myOutputValue = hitOrStand(input);
  }

  return myOutputValue;
};
