// Global variables
var mode = "start";
var cardDeck = [];
var shuffledDeck = [];
var playerHand = [];
var computerHand = [];
var initialMessage = ""; // the initial output after player and computer are each dealt two cards
var messageAfterPlayerHits = ""; // the output message after play enters 'hit' and is given a new card
var myOutputValue = "";
var playerTotalScore = 0; // the player's current total score which is to determine if player busts or wins
var computerTotalScore = 0;

// a function that gets a random index ranging from 0 (inclusive) to max (exclusive). it's used in the shuffleCards function.
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// a function that makes a normal card deck
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

// a function that shuffles the deck
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

// a function that deals initial two cards each to both computer and player
var initialDealRound = function () {
  cardDeck = makeDeck();
  shuffledDeck = shuffleCards(cardDeck);

  // program deals one card each to computer and player, then repeats this. in total, two cards are dealt to both computer and player
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

  // output message to display four cards dealt so far
  message = `Computer's hand: <br>${computerHand[0].name} of ${computerHand[0].suit} <br>${computerHand[1].name} of ${computerHand[1].suit} <br><br> Player's hand: <br>${playerHand[0].name} of ${playerHand[0].suit} <br>${playerHand[1].name} of ${playerHand[1].suit}`;

  // stores message from determineInitialWinner function
  initialMessage = determineInitialWinner();
  // concentenate messages after second round. final message will either be (1) player wins Black Jack, or (2) an output message that tells user to enter 'hit' or 'stand'
  initialDealRoundMessage = initialMessage + message;
  return initialDealRoundMessage;
};

// a function that determines if player wins Black Jack after being dealt two cards. if player didn't win, program outputs message asking player to enter 'hit' or 'stand'.
var determineInitialWinner = function () {
  // player wins Black Jack
  if (
    (playerHand[0].name == "ace" && playerHand[1].name == "ace") ||
    (playerHand[0].name == "ace" && playerHand[1].rank == 10) ||
    (playerHand[0].rank == 10 && playerHand[1].name == "ace")
  ) {
    initialMessage = "Player wins Black Jack! You got 21.<br><br>";
  }
  // game continues
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
  // if player enters 'hit', takes a card from the deck and decide if it's a bust (rank is > 21) or not. either way, displays a message
  if (input == "hit") {
    // add a third card to player's hand
    playerHand.push(shuffledDeck.pop());
    // displays the latest card that's been added to player's hand.
    console.log(
      `Player's card no. ${playerHand.length} is: ${
        playerHand[playerHand.length - 1].name
      } of ${playerHand[playerHand.length - 1].suit}`
    );
    // update the main output message (of all the cards on table) by adding the new hard that player drew to his/her hand.
    message =
      message +
      `<br>${playerHand[playerHand.length - 1].name} of ${
        playerHand[playerHand.length - 1].suit
      }`;
    // update player's total score
    playerTotalScore =
      playerTotalScore + playerHand[playerHand.length - 1].rank;
    console.log(`Player's Total Score: ${playerTotalScore}`);
    // determine if player busts
    if (playerTotalScore > 21) {
      messageAfterPlayerHits = `You bust. Your score is over 21. <br><br>${message}`;
      console.log(`Message after player hits: ${messageAfterPlayerHits}`);
      return messageAfterPlayerHits;
    } else {
      messageAfterPlayerHits = `${message}`;
      console.log(`Message after player hits: ${messageAfterPlayerHits}`);
      return messageAfterPlayerHits;
    }
  } else if (input == "stand") {
    mode = "evaluateComputerHand";
  }
  return messageAfterPlayerHits;
};

// a function that evaluates the computer's hand after player enters 'stand'
var evaluateComputerHand = function () {
  return "evaluate computer's hand";
};

var main = function (input) {
  if (mode == "start") {
    myOutputValue = initialDealRound();
  }
  if (mode == "playerHitOrStand") {
    myOutputValue = hitOrStand(input);
  }
  if (mode == "evaluateComputerHand") {
    myOutputValue = evaluateComputerHand();
  }

  // change mode
  if (mode == "start") {
    mode = "playerHitOrStand";
  }

  return myOutputValue;
};
