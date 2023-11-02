// Define the deck of cards
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

// Function to create a deck of cards
function makeDeck() {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  var ranks = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];

  for (var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for (var rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
      var card = {
        rank: rankIndex + 1,
        suit: suits[suitIndex],
        name: ranks[rankIndex],
      };
      cardDeck.push(card);
    }
  }

  return cardDeck;
}

// Function to shuffle the deck of cards
function shuffleCards(deck) {
  var shuffledDeck = deck.slice(); // Copy the original deck
  for (var i = shuffledDeck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffledDeck[i];
    shuffledDeck[i] = shuffledDeck[j];
    shuffledDeck[j] = temp;
  }
  return shuffledDeck;
}

// Function to calculate the value of a hand
function getHandValue(hand) {
  var value = 0;
  var hasAce = false;

  for (var i = 0; i < hand.length; i++) {
    var card = hand[i];
    value += card.rank;

    if (card.rank === 1) {
      hasAce = true; // Ace is present
    }
  }

  if (hasAce && value + 10 <= 21) {
    value += 10;
  }

  return value;
}

// Function to format a hand for display
function formatHand(hand, hideFirstCard) {
  var result = "";
  for (var i = 0; i < hand.length; i++) {
    if (i === 0 && hideFirstCard) {
      result += "Hidden Card, ";
    } else {
      result += hand[i].name + " of " + hand[i].suit + ", ";
    }
  }
  return result.slice(0, -2); // Remove the trailing comma and space
}

// Player and dealer (computer) hands
var playerHand = [];
var dealerHand = [];

// Flags to track game state
var isGameStarted = false;
var isGameOver = false;
var playerWins = 0;
var dealerWins = 0;
var draws = 0;

// Main game function
var main = function (input) {
  var output =
    "Welcome to Blackjack! Click 'Submit' to deal the first two cards.";

  if (isGameOver) {
    if (input.toLowerCase() === "play again") {
      isGameStarted = false;
      isGameOver = false;
      shuffledDeck = shuffleCards(deck);
      playerHand = [];
      dealerHand = [];
    } else {
      return "Type 'play again' to start a new game.";
    }
  }

  if (!isGameStarted) {
    for (var i = 0; i < 2; i++) {
      playerHand.push(shuffledDeck.pop());
      dealerHand.push(shuffledDeck.pop());
    }
    isGameStarted = true;
  }

  output += "Player's hand: " + formatHand(playerHand) + "<br>";
  output += "Dealer's hand: " + formatHand(dealerHand, true) + "<br>";

  if (getHandValue(playerHand) === 21) {
    output += "Blackjack! Player wins!";
    isGameOver = true;
    playerWins++;
  } else if (getHandValue(dealerHand) === 21) {
    output += "Blackjack! Dealer wins!";
    isGameOver = true;
    dealerWins++;
  } else if (getHandValue(playerHand) > 21) {
    output += "Player busts! Dealer wins!";
    isGameOver = true;
    dealerWins++;
  } else if (getHandValue(dealerHand) > 21) {
    output += "Dealer busts! Player wins!";
    isGameOver = true;
    playerWins++;
  } else if (isGameOver) {
    output += "Player's hand: " + formatHand(playerHand) + "<br>";
    output += "Dealer's hand: " + formatHand(dealerHand) + "<br>";

    if (getHandValue(dealerHand) <= 21) {
      if (getHandValue(playerHand) > getHandValue(dealerHand)) {
        output += "Player wins!";
        playerWins++;
      } else if (getHandValue(playerHand) < getHandValue(dealerHand)) {
        output += "Dealer wins!";
        dealerWins++;
      } else {
        output += "It's a tie!";
        draws++;
      }
    } else {
      output += "Dealer busts! Player wins!";
      playerWins++;
    }

    output +=
      "<br>Type 'play again' to start a new game.<br>Wins: " +
      playerWins +
      ", Losses: " +
      dealerWins +
      ", Draws: " +
      draws;
  } else if (input.toLowerCase() === "hit") {
    playerHand.push(shuffledDeck.pop());
    output += "Player chose to hit.<br>";
  } else if (
    input.toLowerCase() === "stand" &&
    getHandValue(playerHand) >= 16
  ) {
    isGameOver = true;

    while (getHandValue(dealerHand) < 17) {
      dealerHand.push(shuffledDeck.pop());
    }

    output += "Player chose to stand.<br>";

    output += "Player's hand: " + formatHand(playerHand) + "<br>";
    output += "Dealer's hand: " + formatHand(dealerHand) + "<br>";

    if (getHandValue(dealerHand) > 21) {
      output += "Dealer busts! Player wins!";
      playerWins++;
    } else {
      if (getHandValue(playerHand) > getHandValue(dealerHand)) {
        output += "Player wins!";
        playerWins++;
      } else if (getHandValue(playerHand) < getHandValue(dealerHand)) {
        output += "Dealer wins!";
        dealerWins++;
      } else {
        output += "It's a tie!";
        draws++;
      }
    }

    output +=
      "<br>Type 'play again' to start a new game.<br>Wins: " +
      playerWins +
      ", Losses: " +
      dealerWins +
      ", Draws: " +
      draws;
  }

  return output;
};
