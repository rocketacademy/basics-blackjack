// ------------------------------------------------
// Blackjack V2 (Include Input Validation)
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

      // Store card information in an object.
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
    // Swap current card with a card at a random position.
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
var SPLIT_MODE = 'SPLIT_MODE';
var SCORING_MODE_STAND = 'SCORING_MODE_STAND';
var SCORING_MODE_SPLIT = 'SCORING_MODE_SPLIT';

// Set default game mode to dealing the first 2 cards for each player.
var mode = DEAL_CARDS_MODE;
var gameOver = false;

/** Represents the player or dealer. */
var Player = {
  init() {
    this.cards = []; // Store Player cards (object).
    this.rank = []; // Track individual rank of cards .
    this.points = 0; // Used to tally against max game score.

    // In SPLIT_MODE, Player cards are split into 2 arrays
    this.firstSet = [];
    this.firstSetPoints = 0;
    this.secondSet = [];
    this.secondSetPoints = 0;

    return this;
  },
  /** Player is dealt card along with information stored above */
  receiveCard(gameMode = HIT_MODE) {
    if (gameMode === HIT_MODE) {
      var topCard = drawCard(shuffledDeck);
      this.cards.push(topCard);
      this.rank.push(topCard.rank);
      this.points += topCard.points;
    }
    if (gameMode === SPLIT_MODE) {
      this.firstSet.push(drawCard(shuffledDeck));
      this.firstSetPoints += this.firstSet[0].points + this.firstSet[1].points;

      this.secondSet.push(drawCard(shuffledDeck));
      this.secondSetPoints += this.secondSet[0].points + this.secondSet[1].points;
    }
  },
  /** Player's exisiting cards are split into 2 individual arrays */
  splitCards() {
    this.firstSet.push(this.cards[0]);
    this.secondSet.push(this.cards[1]);
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

/** Store all player's card name & suit in an array for output */
var forEachCard = function (playerCards) {
  var nameSuitArr = [];
  for (var i = 0; i < playerCards.length; i += 1) {
    var name = playerCards[i].name;
    var suit = playerCards[i].suit;
    nameSuitArr.push(name + suit);
  }
  return nameSuitArr;
};

/** Output Blackjack message */
var displayBlackjackMessage = function (player, gameMode = DEAL_CARDS_MODE) {
  if (gameMode === DEAL_CARDS_MODE) {
    return `🃏 Blackjack 🃏 <br> Player drew: ${forEachCard(player.cards)} <br> Total points: ${player.points} <br><br> Player 1 Wins! <br>
        <br> Game Over. Please refresh to play again.`;
  } if (gameMode === SPLIT_MODE) {
    return `🃏 Blackjack 🃏 <br> Player cards (1st Set): ${forEachCard(player.firstSet)} <br> Player points (1st Set): ${player.firstSetPoints} <br> Player cards (2nd Set): ${forEachCard(player.secondSet)} <br> Player points (2nd Set): ${player.secondSetPoints} <br><br> Player 1 Wins! <br><br> Game Over. Please refresh to play again.`;
  }
};

/** Output winning messages */
var displayOutcome = function (outcome) {
  var outputMsg = '';

  // Assign each possible array of cards to a variable
  var allPlayer1Cards = forEachCard(player1.cards);
  var firstSplitPlayer1Cards = forEachCard(player1.firstSet);
  var secondSplitPlayer1Cards = forEachCard(player1.secondSet);
  var allDealerCards = forEachCard(dealer.cards);

  // Winning conditions after STAND_MODE
  if (outcome == 'playerWins') {
    outputMsg = ` Player cards: ${allPlayer1Cards} <br> Player score: ${player1.points}  <br> Dealer cards: ${allDealerCards} <br> Dealer score: ${dealer.points} <br><br> Player Wins!`;
  }
  if (outcome == 'dealerWins') {
    outputMsg = `Player cards: ${allPlayer1Cards} <br> Player score: ${player1.points}  <br> Dealer cards: ${allDealerCards} <br> Dealer score: ${dealer.points} <br><br> Dealer Wins!`;
  }
  if (outcome == 'draw') {
    outputMsg = `Player cards: ${allPlayer1Cards} <br> Player score: ${player1.points}  <br> Dealer cards: ${allDealerCards} <br> Dealer score: ${dealer.points} <br><br> It's a draw!`;
  }

  // Winnining conditions after SPLIT_MODE:
  if (outcome == 'player1SplitOneWin') {
    outputMsg = `Player cards (1st Set): ${firstSplitPlayer1Cards} <br> Player points (1st Set): ${player1.firstSetPoints} <br> Player cards (2nd Set): ${secondSplitPlayer1Cards} <br> Player points (2nd Set): ${player1.secondSetPoints} <br> Dealer cards: ${allDealerCards} <br> Dealer score: ${dealer.points} <br><br> One of Player 1's set wins. <br> Hence, Player 1 wins!`;
  }
  if (outcome == 'player1SplitBothWin') {
    outputMsg = `Player cards (1st Set): ${firstSplitPlayer1Cards} <br> Player points (1st Set): ${player1.firstSetPoints} <br> Player cards (2nd Set): ${secondSplitPlayer1Cards} <br> Player points (2nd Set): ${player1.secondSetPoints} <br> Dealer cards: ${allDealerCards} <br> Dealer score: ${dealer.points} <br><br>  Both Player 1 sets wins!`;
  }
  if (outcome == 'player1SplitBothLose') {
    outputMsg = `Player cards (1st Set): ${firstSplitPlayer1Cards} <br> Player points (1st Set): ${player1.firstSetPoints} <br> Player cards (2nd Set): ${secondSplitPlayer1Cards} <br> Player points (2nd Set): ${player1.secondSetPoints} <br> Dealer cards: ${allDealerCards} <br> Dealer score: ${dealer.points} <br><br>  Both Player 1 sets lose to the Dealer's. Dealer wins!`;
  }
  outputMsg += '<br><br> Game Over. Please refresh to play again.';

  return outputMsg;
};

/** Run game in main function */
var main = function (input) {
  // Check which mode game is in to activate respective logic
  // [a] When game is over
  if (gameOver === true) {
    outputGameOver();
  }
  // [b] When user chooses to hit
  if (input === 'hit') {
    mode = HIT_MODE;
    return "Hit 'Submit' again to view your new card & total points.";
  }
  // [c] When user chooses to stand
  if (input === 'stand') {
    mode = STAND_MODE;
    return "Hit 'Submit' again to see what the Dealer's score is.";
  }
  // [d] When user chooses to split cards
  if (input === 'split') {
    mode = SPLIT_MODE;
    return "Hit 'Submit' again to see your new 2nd card for each set.";
  }

  // [1] In this mode, the game starts off by dealing 2 cards to each
  if (mode === DEAL_CARDS_MODE) {
    if (gameOver === true) {
      outputGameOver();
    }

    // Input validation to ensure player moves forward appropriately
    if (player1.cards.length >= 2) {
      if (input !== 'hit' || input !== 'stand') {
        return 'Enter either "hit" or "stand" to continue..';
      }
    }

    // Deal cards to Player & Dealer
    var players = [player1, dealer, player1, dealer];
    for (var i = 0; i < players.length; i += 1) {
      players[i].receiveCard(); // Deal 1st card to player & dealer.
      players[i].optimiseAces(); // In the event 2 aces are dealt
    }

    // If player is dealt a pair, give option to split
    if (player1.rank[0] === player1.rank[1]) {
      return `Player drew: ${forEachCard(player1.cards)} <br> Total points: ${player1.points} <br><br> Type in 'split' to get split cards. <br>Type in 'hit' to get another card. <br> Type in 'stand' to remain.`;
    }

    // If player is dealt blackjack, game is over.
    if (dealtBlackJack(player1.points, player1.cards.length) === true) {
      gameOver = true;
      return `${displayBlackjackMessage(player1)}`;
    }

    // If dealer is dealt blackjack, game is over.
    if (dealtBlackJack(dealer.points, dealer.cards.length) === true) {
      gameOver = true;
      return `${displayBlackjackMessage(dealer)}`;
    }

    return `Player drew: ${forEachCard(player1.cards)} <br> Total points: ${player1.points} <br><br> Type in 'hit' to get another card. <br> Type in 'stand' to remain.`;
  }

  // [2] In this mode, the player continues to hit cards.
  if (mode === HIT_MODE) {
    if (gameOver === true) {
      outputGameOver();
    }

    // Player is dealt card since he/she has selected to "hit".
    player1.receiveCard();
    // Aces if it exists, will be optimised to get best score.
    player1.optimiseAces();

    // End the game if the user busts his hand, dealer automatically wins.
    if (handBurst(player1.points) === true) {
      gameOver = true;
      return `Player 1 is out of the game! <br> Player drew: ${forEachCard(player1.cards)} <br>Bust with ${player1.points} points. <br><br>Dealer wins. <br><br> Please refresh to play again.`;
    }

    return `Player's current cards: ${forEachCard(player1.cards)} <br> Total points: ${player1.points}<br><br>Hit 'submit' to get another card. Otherwise, 
    <br> Type in 'stand' to remain`;
  }

  // [3] In this mode, Player gets a card each for his split hands.
  if (mode === SPLIT_MODE) {
    // New card is added to each split set
    player1.splitCards();
    player1.receiveCard(SPLIT_MODE);

    // Check for BlackJack for both split sets
    if (dealtBlackJack(player1.firstSetPoints, player1.firstSet.length) === true) {
      gameOver = true;
      return `${displayBlackjackMessage(player1, SPLIT_MODE)}`;
    } if (dealtBlackJack(player1.secondSetPoints, player1.secondSet.length === true)) {
      gameOver = true;
      return `${displayBlackjackMessage(player1, SPLIT_MODE)}`;
    }

    // Optimise Ace cards for Dealer
    if ((dealer.points < 17) || (dealer.points < player1.points && dealer.points < 21)) {
      dealer.receiveCard();
      dealer.optimiseAces();
    }

    // Move to compare player & dealer scores.
    mode = SCORING_MODE_SPLIT;

    return `Player 1: <br> 1st set of split cards: ${forEachCard(player1.firstSet)} <br> 1st split set points: ${player1.firstSetPoints}<br> 2nd set of split cards: ${forEachCard(player1.secondSet)} <br> 2nd split set points: ${player1.secondSetPoints}<br><br> Hit 'Submit' to continue.`;
  }

  // [4] In this mode, the dealer is the one being dealt the cards.
  if (mode == STAND_MODE) {
    // Aces if it exists, will be optimised to get best score.
    dealer.optimiseAces();

    // Optimise Ace cards for Dealer
    if ((dealer.points < 17) || (dealer.points < player1.points && dealer.points < 21)) {
      dealer.receiveCard();
      dealer.optimiseAces();

      return `Dealer's current cards: ${forEachCard(dealer.cards)} <br> Dealer points: ${dealer.points}<br><br> Hit 'Submit' for Dealer to continue hitting.`;
    }
    // Move to compare player & dealer scores.
    mode = SCORING_MODE_STAND;
  }

  // [5] In this mode, we are comparing the scores between dealer & player (STAND).
  if (mode === SCORING_MODE_STAND) {
    if ((dealer.points > player1.points) && (!handBurst(dealer.points))) {
      return `${displayOutcome('dealerWins')}`;
    }
    if ((dealer.points < player1.points) || (handBurst(dealer.points))) {
      return `${displayOutcome('playerWins')}`;
    }
    if (dealer.points === player1.points) {
      return `${displayOutcome('draw')}`;
    }
  }

  // [6] In this mode, we are comparing the scores between dealer & player (SPLIT).
  if (mode === SCORING_MODE_SPLIT) {
    // Extra winning conditions for SPLIT_MODE
    if (dealer.points < player1.firstSetPoints || dealer.points < player1.secondSetPoints
       || (handBurst(dealer.points))) {
      return `${displayOutcome('player1SplitOneWin')}`;
    }
    if ((dealer.points < player1.firstSetPoints && dealer.points < player1.secondSetPoints)
       || (handBurst(dealer.points))) {
      return `${displayOutcome('player1SplitBothWin')}`;
    }
    if ((dealer.points > player1.firstSetPoints && dealer.points > player1.secondSetPoints)
       || (!handBurst(dealer.points))) {
      return `${displayOutcome('player1SplitBothLose')}`;
    }
    if ((dealer.points === player1.firstSetPoints && dealer.points === player1.secondSetPoints)
       || (!handBurst(dealer.points))) {
      return "It's a draw! All card sets have the same points!";
    }
  }
};
