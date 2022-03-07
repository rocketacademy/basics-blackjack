// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start. For each player, both cards are dealt face up. For the dealer, one card is face down.
// If a player has a total of 21, they automatically win 1.5 times their bet from the dealer and they are done.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17. If it's 17 or higher they have to stay. If dealer busts, every player in that round win 1x their bet.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

// FUNCTION: MAKE DECK
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// FUNCTION: SHFUFLE DECK
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

// make a deck and shuffle it
var cardDeck = shuffleCards(makeDeck());
var playerHand = [];
var computerHand = [];
var myOutputValue = "";
var playerHandScore = 0;
var computerHandScore = 0;
var currentPlayer = 0;
var GAME_STATE_DEAL_HAND = "GAME_STATE_DEAL_HAND";
var CURRENT_GAME_STATE = GAME_STATE_DEAL_HAND;
var GAME_STATE_HIT_STAY = "GAME_STATE_HIT_STAY";
var GAME_STATE_END_GAME = "GAME_STATE_END_GAME";
var GAME_STATE_COMPUTER_TURN = "GAME_STATE_COMPUTER_TURN";
var GAME_STATE_DETERMINE_WINNER = "GAME_STATE_DETERMINE_WINNER";
// var button = document.querySelector("#submit-button");
// var button2 = document.createElement("button");
// var buttonBox = document.querySelector("#button-container");

var resetGame = function () {
  playerHand = [];
  computerHand = [];
  myOutputValue = "";
  playerHandScore = 0;
  computerHandScore = 0;
  currentPlayer = 0;
  CURRENT_GAME_STATE = GAME_STATE_DEAL_HAND;
};

var calculateScore = function (array) {
  // while counter<length of array then add the rank of the card
  counter = 0;
  var score = 0;
  var aceExists = false;
  while (counter < array.length) {
    if (array[counter].rank > 10) {
      score += 10;
    } else if (array[counter].rank == 1) {
      aceExists = true;
      score += 1;
    } else {
      score += array[counter].rank;
    }
    counter += 1;
  }
  // if total score > 21 and hand has an ace in it, then count ace as 1
  if (aceExists && score < 12) {
    score += 10;
  }
  console.log(`Score: ${score}`);
  return score;
};

var checkWinLoseCondition = function (score) {
  var message = "";
  if (CURRENT_GAME_STATE != GAME_STATE_COMPUTER_TURN) {
    if (score == 21) {
      message += `<br><br> Player ${currentPlayer + 1} scored 21. Player ${
        currentPlayer + 1
      } wins! <br><br> Click 'Submit' to play again.`;
      CURRENT_GAME_STATE = GAME_STATE_END_GAME;
      console.log(
        `Control flow: current game state changed from deal hand to end game. Current game state is ${CURRENT_GAME_STATE}`
      );
      return message;
    }
    if (score > 21) {
      message += `<br><br> Player ${
        currentPlayer + 1
      } busted! Press submit to play again.`;
      CURRENT_GAME_STATE = GAME_STATE_END_GAME;
      console.log(
        `Control flow: player busted. Current game state should be changed to end game. It is ${CURRENT_GAME_STATE}`
      );
      return message;
    } else {
      message += `<br><br> Please enter "hit" or "stay".`;
      CURRENT_GAME_STATE = GAME_STATE_HIT_STAY;
      console.log(
        `Control flow: current game state changed from deal hand to hit/stay. Current game state is ${CURRENT_GAME_STATE}`
      );
      return message;
    }
  } else if (CURRENT_GAME_STATE == GAME_STATE_COMPUTER_TURN) {
    if (score == 21) {
      message = `<br><br> The dealer scored 21. The dealer wins! <br><br> Click 'Submit' to play again.`;
      CURRENT_GAME_STATE = GAME_STATE_END_GAME;
      console.log(
        `Control flow: current game state changed from deal hand to end game. Current game state is ${CURRENT_GAME_STATE}`
      );
      return message;
    }
    if (score > 21) {
      message += `<br><br> The dealer busted! Press submit to play again.`;
      CURRENT_GAME_STATE = GAME_STATE_END_GAME;
      console.log(
        `Control flow: dealer busted. Current game state should be changed to end game. It is ${CURRENT_GAME_STATE}`
      );
      return message;
    } else {
      // CURRENT_GAME_STATE = GAME_STATE_HIT_STAY;
      console.log(`Control flow: dealer's hand is under 21`);
      return message;
    }
  }
};

// need to change array variable to something else?
var dealCard = function (arrayDealCard) {
  arrayDealCard.push(cardDeck.pop());
  return arrayDealCard;
};

var listCards = function (array) {
  counter = 0;
  var message = "";
  while (counter < array.length) {
    message += `<br> ${array[counter].name} of ${array[counter].suit}`;
    counter += 1;
  }
  console.log(`listCards message is ${message}`);
  return message;
};

var determineWinner = function (playerHandScore, computerHandScore) {
  if (playerHandScore > computerHandScore) {
    return `Player beat the dealer!`;
  }
  if (playerHandScore == computerHandScore) {
    return `Player tied with the dealer and reclaims their bet.`;
  } else {
    return `Dealer won!`;
  }
};

// ========================== MAIN FUNCTION ==========================

var main = function (input) {
  if (CURRENT_GAME_STATE == GAME_STATE_END_GAME) {
    console.log(
      `Control flow: current game state should be end game. It is ${CURRENT_GAME_STATE}`
    );
    resetGame();
  }
  // player clicks Submit to deal cards and display cards to player
  if (CURRENT_GAME_STATE == GAME_STATE_DEAL_HAND) {
    console.log(
      `Control flow: current game state should be deal hand. It is ${CURRENT_GAME_STATE}`
    );
    for (i = 0; i < 2; i += 1) {
      playerHand.push(cardDeck.pop());
      computerHand.push(cardDeck.pop());
    }
    myOutputValue = `The cards have been dealt! <br><br> The player's cards are ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}.
    <br><br> The dealer's face-up card is a ${computerHand[0].name} of ${computerHand[0].suit}.`;

    console.log(
      `playerHand: ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}`
    );
    console.log(
      `computerHand: ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}`
    );

    // check player's cards - if 21, player automatically wins
    playerHandScore = calculateScore(playerHand);
    console.log(`playerHandScore: ${playerHandScore}`);
    myOutputValue += `<br><br> Player's score is ${playerHandScore}.`;
    myOutputValue += checkWinLoseCondition(playerHandScore);
    return myOutputValue;
  }

  if (CURRENT_GAME_STATE == GAME_STATE_HIT_STAY) {
    if (input.toLowerCase() != "hit" && input != "stay") {
      console.log(`Control flow: input invalid - input is not hit or stay`);
      return (myOutputValue = `The player's cards are: ${listCards(playerHand)}
      <br><br> Please enter "hit" or "stay".`);
    }
    // if player types hit, deal an extra card
    if (input.toLowerCase() == "hit") {
      console.log(`Control flow: player typed hit`);
      dealCard(playerHand);
      playerHandScore = calculateScore(playerHand);
      myOutputValue = `The player's cards are:`;
      myOutputValue += listCards(playerHand);
      myOutputValue += `<br><br> The dealer's face-up card is: <br> ${computerHand[0].name} of ${computerHand[0].suit}
      <br><br> Player's score is ${playerHandScore}.`;
      myOutputValue += checkWinLoseCondition(playerHandScore);
      return myOutputValue;
    }

    // if player types stay, move to computer's turn
    if (input.toLowerCase() == "stay") {
      CURRENT_GAME_STATE = GAME_STATE_COMPUTER_TURN;
      console.log(`Control flow: dealer's turn`);
      // show computer's card
      // calculate computer's score
      computerHandScore = calculateScore(computerHand);
      // check win lose condition
      // if computer has not won or lost, if computer's hand is below 17 draw card
      while (computerHandScore < 17) {
        dealCard(computerHand);
        console.log(`Computer is dealt another card`);
        console.log(`Computer's cards are: ${listCards(computerHand)}}`);
        computerHandScore = calculateScore(computerHand);
        myOutputValue = `The dealer's cards are: ${listCards(
          computerHand
        )} <br><br> The dealer's score is ${computerHandScore}
        <br><br> ${checkWinLoseCondition(computerHandScore)}`;
      }

      // if computer's score is at least 17 and not above 21, compare the player's and dealer's hands
      if (computerHandScore < 21) {
        CURRENT_GAME_STATE = GAME_STATE_DETERMINE_WINNER;
        console.log(`Control flow: game state determine winner`);
        myOutputValue = `The dealer's cards are: ${listCards(
          computerHand
        )} <br><br> The dealer's score is ${computerHandScore}
        <br><br> ${determineWinner(playerHandScore, computerHandScore)}
        <br><br> Click 'Submit' to play again.`;
        CURRENT_GAME_STATE = GAME_STATE_END_GAME;
      }
      return myOutputValue;
    }
  }
};
