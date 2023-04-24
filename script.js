// Global variables
let deck, hands, gameState, playerScore, dealerScore;

// Helper function to create a deck of cards
function createDeck() {
  suits = ["♥", "♦", "♣", "♠"];
  ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  deck = [];

  var i = 0;
  while (i < suits.length) {
    var j = 0;
    while (j < ranks.length) {
      deck.push({ suit: suits[i], rank: ranks[j] });
      j++;
    }
    i++;
  }

  return deck;
}
// Helper function to shuffle the deck of cards
function shuffleDeck(deck) {
  var i = deck.length - 1;
  while (i > 0) {
    var j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    i--;
  }
}

// Helper function to deal two cards to each player
function dealCards(deck) {
  return {
    player: [drawCard(deck), drawCard(deck)],
    dealer: [drawCard(deck), drawCard(deck)],
  };
}

// Helper function to calculate the score of a hand
function calculateScore(hand) {
  var score = 0;
  var hasAce = false;

  var i = 0;
  while (i < hand.length) {
    rank = hand[i].rank;

    if (rank === "A") {
      hasAce = true;
      score += 11;
    } else if (rank === "K" || rank === "Q" || rank === "J") {
      score += 10;
    } else {
      score += parseInt(rank);
    }

    i++;
  }

  if (score > 21 && hasAce) {
    score -= 10;
  }

  return score;
}

// Helper function to draw a card from the deck
function drawCard(deck) {
  return deck.shift();
}

// Helper function to display the hands of the players
function displayHands(hands) {
  if (gameState === "player" && playerScore < 22) {
    return `Player's hand:<br> ${cardsToString(
      hands.player
    )}<br>Dealer's hand: ${hands.dealer[0].rank}, [Hidden Card]`;
  } else {
    return `Player's hand:<br> ${cardsToString(
      hands.player
    )}<br>Dealer's hand:<br> ${cardsToString(hands.dealer)}`;
  }
}

// Helper function to convert a single card array to a string representation
function oneCardToString(card) {
  return `${card.rank} of ${card.suit}`;
}

// Helper function to convert multiple card array to a string representation
function cardsToString(cards) {
  return cards.map((card) => oneCardToString(card)).join("<br>");
}

// Helper function to handle the dealer's turn
function dealerTurn(hands) {
  while (true) {
    dealerScore = calculateScore(hands.dealer);
    if (dealerScore < 17) {
      hands.dealer.push(drawCard(deck));
    } else {
      playerScore = calculateScore(hands.player);
      var message = `Player's cards:<br> 
        ${cardsToString(hands.player)}<br>
        Dealers's cards:<br> ${cardsToString(hands.dealer)}<br>
        Player's final score: ${playerScore}<br>
        Dealer's final score: ${dealerScore}<br>`;
      gameState = "end";

      if (playerScore > 21 && dealerScore > 21) {
        message += "Both players busted! It's a tie!";
        message += `<br><img src="https://media.tenor.com/OiBRj-lhVUgAAAAS/well-call-it-a-tie-lucifer-morningstar.gif" width="477" height="480" class="giphy-embed">`;
      } else if (playerScore <= 21 && dealerScore <= 21) {
        if (playerScore > dealerScore) {
          message += "Player wins!";
          message += `<br><img src="https://media.tenor.com/FAIxgHJ6oX4AAAAi/white-chicken.gif" width="477" height="480" class="giphy-embed">`;
        } else if (playerScore < dealerScore) {
          message += "Dealer wins!";
          message += `<br><img src="https://media.tenor.com/PUm1wkSXINMAAAAC/teasing-amanda-cee.gif" width="477" height="480" class="giphy-embed">`;
        } else {
          message += "It's a tie!";
          message += `<br><img src="https://media.tenor.com/OiBRj-lhVUgAAAAS/well-call-it-a-tie-lucifer-morningstar.gif" width="477" height="480" class="giphy-embed">`;
        }
      } else if (playerScore > 21 && dealerScore <= 21) {
        message += "Player busted! Dealer wins!";
        message += `<br><img src="https://media.tenor.com/PUm1wkSXINMAAAAC/teasing-amanda-cee.gif" width="477" height="480" class="giphy-embed">`;
      } else if (playerScore <= 21 && dealerScore > 21) {
        message += "Dealer busted! Player wins!";
        message += `<br><img src="https://media.tenor.com/FAIxgHJ6oX4AAAAi/white-chicken.gif" width="477" height="480" class="giphy-embed">`;
      }

      return message;
    }
  }
}

// Helper function to handle the players's turn

function playerTurn(input) {
  if (input === "hit") {
    card = drawCard(deck);
    hands.player.push(card);
    playerScore = calculateScore(hands.player);
    message = `Player drew a ${oneCardToString(card)}.<br>${displayHands(
      hands
    )}<br>Player's current score: ${playerScore}`;

    if (playerScore > 21) {
      gameState = "dealer";
    } else {
      return message;
    }
  } else if (input === "stand") {
    gameState = "dealer";
  } else {
    return "Invalid input. Please press 'hit' or 'stand'.";
  }
}

// Main function to run the game
function main(input) {
  if (!gameState) {
    if (input !== "start") {
      return "Please press 'start' to begin the game.";
    }
    deck = createDeck();
    shuffleDeck(deck);
    hands = dealCards(deck);
    gameState = "player";
    playerScore = calculateScore(hands.player);
    return `${displayHands(hands)}<br>
    Player's current score: ${playerScore}`;
  }

  if (gameState === "player") {
    playerResult = playerTurn(input);
    if (playerResult) return playerResult;
  }

  if (gameState === "dealer") {
    return dealerTurn(hands);
  }

  return "Game has ended. Press 'restart' the page to start a new game.";
}

// Helper function to reset the game
function resetGame() {
  deck = createDeck();
  shuffleDeck(deck);
  hands = dealCards(deck);
  gameState = "player";
  playerScore = calculateScore(hands.player);
  dealerScore = calculateScore(hands.dealer);
  return `${displayHands(hands)}<br>
  Player's current score: ${playerScore}`;
}
