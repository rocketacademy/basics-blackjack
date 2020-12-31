// ------------------------------------------------
// Blackjack V1
// ------------------------------------------------

/** Created an ordered deck of 52 cards */
var makeDeck = function () {
  var deck = [];
  var suits = ['♦', '♣', '♥', '♠'];

  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var suitName = suits[suitIndex];
    // Ace to King Per Suit.
    var rankCounter = 1;

    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      if (rankCounter == 1) {
        cardName = 'A';
        cardValue = 11;
      } else if (rankCounter == 11) {
        cardName = 'J';
        cardValue = 10;
      } else if (rankCounter == 12) {
        cardName = 'Q';
        cardValue = 10;
      } else if (rankCounter == 13) {
        cardName = 'K';
        cardValue = 10;
      }

      // Store card information in an object
      var card = {
        name: cardName,
        suit: suitName,
        rank: rankCounter,
        points: cardValue,
      };
      deck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return deck;
};

/** Randomise order of the deck */
var shuffleDeck = function () {
  var deck = makeDeck();

  for (var i = 0; i < deck.length; i += 1) {
    var randomCardPos = Math.floor(Math.random() * deck.length);
    var currentCard = deck[i];
    var randomCard = deck[randomCardPos];
    // Swap current card with a card at a random position
    deck[i] = randomCard;
    deck[randomCardPos] = currentCard;
  }
  return deck;
};

/** Execute shufflDeck() and store it within a variable */
var shuffledDeck = shuffleDeck();

/** Take top card of the randomised ordered deck */
var drawCard = function (fromDeck) {
  var card = fromDeck.pop();
  return card;
};

var DEAL_CARDS_MODE = 'DEAL_CARDS_MODE';
var HIT_MODE = 'HIT_MODE';
var STAND_MODE = 'STAND_MODE';
var SCORING_MODE = 'SCORING_MODE';

// Set default game mode to dealing the first 2 cards for each player
var mode = DEAL_CARDS_MODE;
var gameOver = false;

/** Represents the player or dealer. */
var Player = {
  init() {
    this.cards = [];
    this.rank = [];
    this.points = 0;
    return this;
  },

  /** Player is dealt card along with information stored above */
  receiveCard() {
    var topCard = drawCard(shuffledDeck);
    this.cards.push(' ' + topCard.name + topCard.suit);
    this.rank.push(topCard.rank);
    this.points = this.points + topCard.points;
  },

  /** Player's cards are optimised to get best possible score */
  optimiseAces() {
    if (this.points > 21 && this.rank.includes(1)) {
      this.points = this.points - 10;
      // Remove the current rank of the Ace so as to deduct 10 points once per Ace
      this.rank = this.rank.filter((i) => i !== 1);
    }
  },
};

// Initialise 2 players: player1 & the dealer
var player1 = Object.create(Player).init();
var dealer = Object.create(Player).init();

/** Output message to refresh since game has ended */
var outputGameOver = function () {
  return 'Game Over. Please refresh the page.';
};

/** Run check to see if the number of points player has crossed game limit */
var handBurst = function (numPoints) {
  if (numPoints > 21) {
    return true;
  }
};

/** Run check to see if Ace and picture or '10' card is dealt at start */
var dealtBlackJack = function (numPoints, numCards) {
  if (numPoints == 21 && numCards == 2) {
    return true;
  }
};

/** Output winning messages */
var displayOutcome = function (outcome) {
  var outputMsg = '';

  if (outcome == 'player1') {
    outputMsg = ` Player cards: ${player1.cards} <br> Player score: ${player1.points}  <br> Dealer cards: ${dealer.cards} <br> Dealer score: ${dealer.points} <br><br> Player Wins!`;
  }

  if (outcome == 'dealer') {
    outputMsg = `Player cards: ${player1.cards} <br> Player score: ${player1.points}  <br> Dealer cards: ${dealer.cards} <br> Dealer score: ${dealer.points} <br><br> Dealer Wins!`;
  }

  if (outcome == 'draw') {
    outputMsg = `Player cards: ${player1.cards} <br> Player score: ${player1.points}  <br> Dealer cards: ${dealer.cards} <br> Dealer score: ${dealer.points} <br><br> It's a draw!`;
  }

  outputMsg += '<br><br> Game Over. Please refresh to play again.';

  return outputMsg;
};

/** Run game in main function */
var main = function (input) {
  if (gameOver == true) {
    outputGameOver();
  }

  if (input == 'hit') {
    mode = HIT_MODE;
    return "Hit 'Submit' again to view your new card & total points.";
  }

  if (input == 'stand') {
    mode = STAND_MODE;
    return "Hit 'Submit' again to see what the Dealer's score is.";
  }

  if (mode == DEAL_CARDS_MODE) {
    if (gameOver == true) {
      outputGameOver();
    }

    // Deal 1st card to player & dealer.
    player1.receiveCard();
    dealer.receiveCard();
    // Deal 2nd card to player & dealer.
    player1.receiveCard();
    dealer.receiveCard();

    // If player is dealt blackjack, game is over.
    if (dealtBlackJack(player1.points, player1.cards.length) == true) {
      gameOver = true;
      return `Blackjack. Player drew: ${player1.cards} <br> Total points: ${player1.points} <br><br> Player 1 Wins! <br><br> Game Over. Please refresh to play again.`;
    }

    // If dealer is dealt blackjack, game is over.
    if (dealtBlackJack(dealer.points, dealer.cards.length) == true) {
      gameOver = true;
      return `Blackjack. Dealer drew: ${dealer.cards} <br> Total points: ${dealer.points} <br><br> Dealer Wins! <br><br> Game Over. Please refresh to play again.`;
    }

    return `Player drew: ${player1.cards} <br> Total points: ${player1.points} <br><br> Type in 'hit' to get another card.
    <br> Type in 'stand' to remain.`;
  }

  // In this mode, the player continues to hit cards.
  if (mode == HIT_MODE) {
    if (gameOver == true) {
      outputGameOver();
    }

    // Player is dealt card since he/she has selected to "hit".
    player1.receiveCard();

    // Aces if it exists, will be optimised to get best score.
    player1.optimiseAces();

    // End the game if the user busts his hand, dealer automatically wins.
    if (handBurst(player1.points) == true) {
      gameOver = true;
      return `Player 1 is out of the game! <br> Player drew: ${player1.cards} <br>Bust with ${player1.points} points. <br><br>Dealer wins. <br><br> Please refresh to play again.`;
    }

    return `Player's current cards: ${player1.cards} <br> Total points: ${player1.points}<br><br> Type in 'hit' to get another card.
    <br> Type in 'stand' to remain`;
  }

  // In this mode, the dealer is the one being dealt the cards.
  if (mode == STAND_MODE) {
    // Aces if it exists, will be optimised to get best score.
    dealer.optimiseAces();

    // Make dealer draw if points between 16 & 21, & player's points.
    if (dealer.points < 16 && dealer.points < player1.points && dealer.points < 21) {
      dealer.receiveCard();
      dealer.optimiseAces();

      return `Dealer's current cards: ${dealer.cards} <br> Dealer points: ${dealer.points}<br><br> Hit 'Submit' for Dealer to continue hitting.`;
    }

    // Move to compare player & dealer scores.
    mode = SCORING_MODE;
  }

  // In this mode, we are comparing the scores between dealer & player.
  if (mode == SCORING_MODE) {
    if (dealer.points > player1.points && !handBurst(dealer.points)) {
      return `${displayOutcome('dealer')}`;
    }
    if (dealer.points < player1.points || (handBurst(dealer.points))) {
      return `${displayOutcome('player1')}`;
    }
    if (dealer.points == player1.points) {
      return `${displayOutcome('draw')}`;
    }
  }
};
