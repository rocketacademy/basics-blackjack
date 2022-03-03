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
var GAME_STATE_DEAL_HAND = "GAME_STATE_DEAL_HAND";
var CURRENT_GAME_STATE = GAME_STATE_DEAL_HAND;
var GAME_STATE_HIT_STAY = "GAME_STATE_HIT_STAY";
var GAME_STATE_END_GAME = "GAME_STATE_END_GAME";
var button = document.querySelector("#submit-button");
var button2 = document.createElement("button");
var buttonBox = document.querySelector("#button-container");

var resetGame = function () {
  playerHand = [];
  computerHand = [];
  myOutputValue = "";
  playerHandScore = 0;
  computerHandScore = 0;
  CURRENT_GAME_STATE = GAME_STATE_DEAL_HAND;
};

// if player gets Blackjack they win automatically
// change game state to allow player to hit or stay
// The player decides whether to hit or stand, using the submit button to submit their choice.
// create function calculate game score
// if player hits, check if they have lost
// if player has an ace, and total score>21, count ace as 1.
// The player decides whether to hit or stand, using the submit button to submit their choice.
// if player hits, check if they have lost
// deal cards to computer
// calculate computer score
// computer must draw to 17

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

var dealCard = function () {
  playerHand.push(cardDeck.pop());
};

var main = function (input) {
  if (CURRENT_GAME_STATE == GAME_STATE_END_GAME) {
    resetGame();
  }
  // player clicks Submit to deal cards and display cards to player
  if (CURRENT_GAME_STATE == GAME_STATE_DEAL_HAND) {
    for (i = 0; i < 2; i += 1) {
      playerHand.push(cardDeck.pop());
      computerHand.push(cardDeck.pop());
    }
    myOutputValue = `The cards have been dealt! <br><br> The player's cards are ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}. <br><br> The dealer's face-up card is a ${computerHand[0].name} of ${computerHand[0].suit}.`;

    console.log(
      `playerHand: ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}`
    );
    console.log(
      `computerHand: ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].name} of ${computerHand[1].suit}`
    );

    // check player's cards - if 21, player automatically wins
    playerHandScore = calculateScore(playerHand);
    console.log(`playerHandScore: ${playerHandScore}`);
    if (playerHandScore == 21) {
      myOutputValue += `<br><br> You scored 21, you win! <br><br> Click 'Submit' to play again.`;
      CURRENT_GAME_STATE = GAME_STATE_END_GAME;
      return myOutputValue;
    }

    CURRENT_GAME_STATE = GAME_STATE_HIT_STAY;
    button.innerText = "hit";
    button2.innerText = "stay";
    buttonBox.appendChild(button2);
    return myOutputValue;
  }

  // if player clicks stay, move on
  if (CURRENT_GAME_STATE == GAME_STATE_HIT_STAY) {
    // if player clicks hit, deal an extra card
    button.addEventListener("click", dealCard);
    myOutputValue = `The player's cards are: <br> ${playerHand[0].name} of ${playerHand[0].suit} <br> ${playerHand[1].name} of ${playerHand[1].suit} <br> ${playerHand[2].name} of ${playerHand[2].suit}. <br><br> The dealer's face-up card is: <br> ${computerHand[0].name} of ${computerHand[0].suit}.`;
    // calculate total score of player's hand
    // if >21, return "You busted!"
  }
};
