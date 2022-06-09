/* Game Rules

1. There will be only two players. One human and one computer (for the Base solution).
2. The computer will always be the dealer.
3. Each player gets dealt two cards to start.
4. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
5. The dealer has to hit if their hand is below 17.
6. Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. 
7. Aces can be 1 or 11. (Ace default to 11 unless in excess of 21, then Ace is 1)
8. The player who is closer to, but not above 21 wins the hand.

*/

// function to create deck of cards
var makeDeck = function () {
  var deck = [];

  var suits = ["diamonds", "clubs", "hearts", "spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    rankCounter = 1;

    while (rankCounter <= 13) {
      var card = {
        name: rankCounter,
        rank: rankCounter,
        suit: suits[suitIndex],
      };

      if (rankCounter == 1) {
        card.name = "ace";
      } else if (rankCounter == 11) {
        card.name = "jack";
      } else if (rankCounter == 12) {
        card.name = "queen";
      } else if (rankCounter == 13) {
        card.name = "king";
      }

      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

// function to shuffle deck of cards
var shuffleDeck = function (deck) {
  var currentIndex = 0;

  while (currentIndex < deck.length) {
    var randomNumber = Math.floor(Math.random() * deck.length);

    var currentCard = deck[currentIndex];
    var randomCard = deck[randomNumber];

    deck[currentIndex] = randomCard;
    deck[randomNumber] = currentCard;

    currentIndex += 1;
  }
  return deck;
};

/* Gameplay Description

1. Deck is shuffled.
2. User clicks Submit to deal cards.
3. The cards are analysed for game winning conditions, e.g. Blackjack.
4. The cards are displayed to the user.
5. The user decides whether to hit or stand, using the submit button to submit their choice.
6. The user's cards are analysed for winning or losing conditions.
7. The computer decides to hit or stand automatically based on game rules.
8. The game either ends or continues.

*/

var deck = shuffleDeck(makeDeck());
var playerHand = [];
var computerHand = [];
var gameStatus = "";

// function to calculate hand score
var calculateHandScore = function (hand) {
  var handScore = 0;

  var index = 0;
  while (index < hand.length) {
    var currentCard = hand[index];
    //set value for jack, queen, king to 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      currentCard.rank = 10;
    }
    // set value for ace
    if (currentCard.name == "ace") {
      currentCard.rank = 11;
    }

    handScore += currentCard.rank;
    console.log("hand score:", handScore);
    index += 1;
  }
  return handScore;
};

// function to check
var checkWinningCondition = function (playerScore, computerScore) {
  var outcome = "";

  // draw condition
  if (
    playerScore == computerScore ||
    (playerScore > 21 && computerScore > 21)
  ) {
    outcome = "draw";
  }
  // draw with blackjack
  else if (playerScore == 21 && computerScore == 21) {
    outcome = "draw with blackjack";
  }
  // winning condition
  else if (
    (playerScore < 21 && playerScore > computerScore) ||
    (playerScore < 21 && computerScore > 21)
  ) {
    outcome = "player wins";
  }
  // losing condition
  else if (
    (computerScore < 21 && computerScore > playerScore) ||
    (computerScore < 21 && playerScore > 21)
  ) {
    outcome = "computer wins";
  }
  // player winning with blackjack
  else if (
    (playerScore == 21 && computerScore < 21) ||
    (playerScore == 21 && computerScore > 21)
  ) {
    outcome = "player wins with blackjack";
  }
  // player lose to computer blackjack
  else if (
    (computerScore == 21 && playerScore < 21) ||
    (computerScore == 21 && playerScore > 21)
  ) {
    outcome = "computer wins with blackjack";
  }

  return outcome;
};

var main = function (input) {
  var gameMessage = "";

  // deal cards to player
  for (var counter = 0; counter < 2; counter += 1) {
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
  }

  // calculate player's hand
  var playerScore = calculateHandScore(playerHand);

  // calculate computer's hand
  var computerScore = calculateHandScore(computerHand);

  // check winning condition based on player and computer score
  var outcome = checkWinningCondition(playerScore, computerScore);

  gameMessage += `Player Hand: ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].rank} of ${playerHand[1].suit} and Score: ${playerScore}<br>
  Computer Hand: ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].rank} of ${computerHand[1].suit} and Score: ${computerScore}<br>
  ${outcome}`;

  return gameMessage;
};
