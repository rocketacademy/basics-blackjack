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
var currentGameStatus = "dealing cards";
var playerScore = 0;
var computerScore = 0;

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
    outcome = "dealer wins";
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
    outcome = "dealer wins with blackjack";
  }

  return outcome;
};

// function to print hand and score
var formatHandAndScore = function (player, hand, score) {
  message = `${player} Hand:<br>`;

  for (var counter = 0; counter < hand.length; counter += 1) {
    message += `- ${hand[counter].name} of ${hand[counter].suit}<br>`;
  }

  message += `<br>Current Score: ${score}<br><br>`;

  return message;
};

var main = function (input) {
  var gameMessage = "";

  // initialise game start
  if (currentGameStatus == "dealing cards") {
    // deal cards to player
    for (var counter = 0; counter < 2; counter += 1) {
      playerHand.push(deck.pop());
      computerHand.push(deck.pop());
    }
    // calculate player's hand
    playerScore = calculateHandScore(playerHand);

    // calculate computer's hand
    computerScore = calculateHandScore(computerHand);

    gameMessage +=
      formatHandAndScore("Player", playerHand, playerScore) +
      `Input 'hit' if you want another card or 'stand' to end your turn.
      <br><br>${formatHandAndScore("Dealer", computerHand, computerScore)}`;

    currentGameStatus = "pending player choice";
  }
  // list our possible game outcomes based on player choice to hit or stand
  else if (currentGameStatus == "pending player choice") {
    // add card to player hand if 'hit'
    if (input.toLowerCase() == "hit") {
      playerHand.push(deck.pop());
      playerScore = calculateHandScore(playerHand);
      gameMessage =
        formatHandAndScore("Player", playerHand, playerScore) +
        `Input 'hit' if you want another card or 'stand' to end your turn.`;
    } else if (input.toLowerCase() == "stand".toLowerCase()) {
      gameMessage =
        formatHandAndScore("Player", playerHand, playerScore) +
        `It's the dealer's turn now.`;
      currentGameStatus = "computer turn";
    } else {
      gameMessage =
        "Invalid input! Enter 'hit' or 'stand' only<br><br>" +
        formatHandAndScore("Player", playerHand, playerScore);
    }
  }
  // dealer's turn to play
  else if (currentGameStatus == "computer turn") {
    // dealer stands if total equals or exceeds 17
    console.log("status", currentGameStatus);
    console.log("computer score", computerScore);
    if (computerScore >= 17) {
      currentGameStatus = "check win";
      gameMessage = formatHandAndScore("Dealer", computerHand, computerScore);
    } else {
      while (computerScore < 17 && computerHand.length < 5) {
        computerHand.push(deck.pop());
        computerScore = calculateHandScore(computerHand);
        gameMessage = formatHandAndScore("Dealer", computerHand, computerScore);
        currentGameStatus = "check win";
      }
    }
  }
  // check winning condition based on player and computer score
  else if (currentGameStatus == "check win") {
    var outcome = checkWinningCondition(playerScore, computerScore);
    gameMessage = `${formatHandAndScore("Player", playerHand, playerScore)}
    ${formatHandAndScore("Dealer", computerHand, computerScore)}
    ${outcome}`;
  }

  // Dealer Hand: ${computerHand[0].name} of ${computerHand[0].suit} and ${computerHand[1].rank} of ${computerHand[1].suit} and Score: ${computerScore}<br>
  // ${outcome}`;

  return gameMessage;
};
