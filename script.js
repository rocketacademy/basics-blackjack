// ------------------------------------------------
// Blackjack V3 (Refactor Player Object + Add Betting)
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

var BETTING_MODE = 'BETTING_MODE';
var DEAL_CARDS_MODE = 'DEAL_CARDS_MODE';
var HIT_MODE = 'HIT_MODE';
var STAND_MODE = 'STAND_MODE';
var SPLIT_MODE = 'SPLIT_MODE';
var SCORING_MODE_STAND = 'SCORING_MODE_STAND';
var SCORING_MODE_SPLIT = 'SCORING_MODE_SPLIT';

// Set default game mode to dealing the first 2 cards for each player.
var mode = BETTING_MODE;
var gameOver = false;

// ------------------------------------------------
// Refactored
// ------------------------------------------------
var sum = function (arr) {
  var sumPoints = arr.reduce((a, b) => a + b);
  return sumPoints;
};

const Player = {
  init() {
    this.name = '';
    this.handArr = []; // Keep track of Player cards & rank of cards
    this.pointsArr = []; // Used to track points of cards (whether split or not)
    this.bet = 0;

    return this;
  },
  /** Player is dealt card along with information stored above */
  receiveCard(gameMode = HIT_MODE) {
    if (gameMode === HIT_MODE) {
      const topCard = drawCard(shuffledDeck);
      this.handArr.push(topCard);
      this.pointsArr.push(topCard.points);
    }

    // Activated only in SPLIT_MODE after Player has received 2 cards
    if (gameMode === SPLIT_MODE) {
      // Two cards for each new split set
      const newCard1 = drawCard(shuffledDeck);
      const newCard2 = drawCard(shuffledDeck);

      // Push 2 arrays each containing 1st/2nd card respectively to handArr
      var setOne = this.handArr.splice(0, 1);
      var setTwo = this.handArr.splice(0, 1);
      this.handArr.push(setOne, setTwo);

      // Tally points for both hands in handArr
      var setOnePoints = this.pointsArr[0];
      var setTwoPoints = this.pointsArr[1];
      this.pointsArr = [[setOnePoints], [setTwoPoints]];

      // After hand has been split, push 1 new card to each split set
      this.handArr[0].push(newCard1);
      this.handArr[1].push(newCard2);

      // Push new card points to pointsArr (which is now made of 2 arrays)
      this.pointsArr[0].push(newCard1.points);
      this.pointsArr[1].push(newCard2.points);
    }
  },
  /** Cards are optimised to attain best possible score (SPLIT_MODE not factored in) */
  optimiseAces() {
    var totalPoints = sum(this.pointsArr);
    var rankArr = [];

    // Push rank of card to de termine if Ace exists
    this.handArr.forEach((cardObj) => rankArr.push(cardObj.rank));

    // If the points greater than game limit AND rank includes an Ace
    if (totalPoints > 21 && rankArr.includes(1)) {
      this.points = this.points - 10;
      // Remove the current rank of the Ace so as to deduct 10 points once per Ace
      rankArr = rankArr.filter((i) => i !== 1);
    }
    return totalPoints;
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
    return `🃏 Blackjack 🃏 <br> Player drew: ${forEachCard(player.handArr)} <br> 
            Total points: ${sum(player.pointsArr)} <br><br> Player 1 Wins! <br>
            You now have $${player1.bet * 1.5}! 💰 <br>
            <br> Game Over. Please refresh to play again.`;
  } if (gameMode === SPLIT_MODE) {
    return `🃏 Blackjack 🃏 <br> Player cards (1st Set): ${forEachCard(player.handarr[0])} <br> Player points (1st Set): ${player.pointsArr[0]} <br> 
            Player cards (2nd Set): ${forEachCard(player.handarr[1])} <br> Player points (2nd Set): ${player.pointsArr[1]} <br><br> 
            You now have $${player1.bet * 1.5}! 💰 <br>
            Player 1 Wins! <br><br> Game Over. Please refresh to play again.`;
  }
};

/** Output winning messages */
var displayOutcome = function (outcome, gameMode = SCORING_MODE_STAND) {
  var outputMsg = '';

  var allDealerCards = forEachCard(dealer.handArr);
  var totalDealerPoints = sum(dealer.pointsArr);
  var playerBet = player1.bet;
  // var playerWinnings = player1.be

  if (gameMode === SCORING_MODE_STAND) {
  // Assign each possible array of cards to a variable
    var allPlayer1Cards = forEachCard(player1.handArr);
    var totalPlayer1Points = sum(player1.pointsArr);
    var playersHandInfoStandMode = `Player cards: ${allPlayer1Cards} <br> Player score: ${totalPlayer1Points}  <br> 
                                    Dealer cards: ${allDealerCards} <br> Dealer score: ${totalDealerPoints} <br><br>
                                    Player's bet: $${playerBet} <br><br>`;

    // Winning conditions after STAND_MODE
    if (outcome == 'playerWins') {
      outputMsg = playersHandInfoStandMode + 'Player Wins!';
    }
    if (outcome == 'dealerWins') {
      outputMsg = playersHandInfoStandMode + 'Dealer Wins!';
    }
    if (outcome == 'draw') {
      outputMsg = playersHandInfoStandMode + "It's a draw!";
    }
  }

  if (gameMode === SCORING_MODE_SPLIT) {
    var firstSplitPlayer1Cards = forEachCard(player1.handArr[0]);
    var totalPlayer1FirstSplitPoints = sum(player1.pointsArr[0]);

    var secondSplitPlayer1Cards = forEachCard(player1.handArr[1]);
    var totalPlayer1SecondSplitPoints = sum(player1.pointsArr[1]);

    var playersHandInfoSplitMode = `Player cards (1st Set): ${firstSplitPlayer1Cards} <br> Player points (1st Set): ${totalPlayer1FirstSplitPoints} <br> 
                                    Player cards (2nd Set): ${secondSplitPlayer1Cards} <br> Player points (2nd Set): ${totalPlayer1SecondSplitPoints} <br><br>
                                    Dealer cards: ${allDealerCards} <br> Dealer score: ${totalDealerPoints} <br><br>
                                    Player's bet: $${playerBet} <br><br>`;

    // Winnining conditions after SPLIT_MODE:
    if (outcome == 'player1SplitOneWin') {
      outputMsg = playersHandInfoSplitMode + "One of Player 1's set wins. <br> Hence, Player 1 wins!";
    }
    if (outcome == 'player1SplitBothWin') {
      outputMsg = playersHandInfoSplitMode + 'Both Player 1 sets wins!';
    }
    if (outcome == 'player1SplitBothLose') {
      outputMsg = playersHandInfoSplitMode + "Both Player 1 sets lose to the Dealer's. Dealer wins!";
    }
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

  if (mode === BETTING_MODE) {
    if (isNaN(Number(input)) === true || input === '') {
      return 'Please input a number for your bet.';
    }
    player1.bet = Number(input);
    mode = DEAL_CARDS_MODE;

    return `💵 You placed a bet of $${player1.bet}. 💵  <br><br> Hit 'submit' to see your hand.`;
  }

  // [1] In this mode, the game starts off by dealing 2 cards to each
  if (mode === DEAL_CARDS_MODE) {
    if (gameOver === true) {
      outputGameOver();
    }

    // Input validation to ensure player moves forward appropriately
    if (player1.handArr.length >= 2) {
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
    if (player1.handArr[0].rank === player1.handArr[1].rank) {
      return `Player drew: ${forEachCard(player1.handArr)} <br> Total points: ${sum(player1.pointsArr)} <br><br> 
              Type 'split' to get split cards. <br>Type 'hit' to get another card. <br> Type 'stand' to remain.`;
    }

    // If player is dealt blackjack, game is over.
    if (dealtBlackJack(sum(player1.pointsArr), player1.handArr.length) === true) {
      gameOver = true;
      return `${displayBlackjackMessage(player1)}`;
    }

    // If dealer is dealt blackjack, game is over.
    if (dealtBlackJack(sum(dealer.pointsArr), dealer.handArr.length) === true) {
      gameOver = true;
      return `${displayBlackjackMessage(dealer)}`;
    }

    return `Player drew: ${forEachCard(player1.handArr)} <br> Total points: ${sum(player1.pointsArr)} <br><br> 
            Type 'hit' to get another card. <br> Type 'stand' to remain.`;
  }

  // [2] In this mode, the player continues to hit cards.
  if (mode === HIT_MODE) {
    if (gameOver === true) {
      outputGameOver();
    }

    player1.receiveCard(); // Player is dealt card since he/she has selected to "hit".
    player1.optimiseAces(); // Aces if it exists, will be optimised to get best score.

    // End the game if the user busts his hand, dealer automatically wins.
    if (handBurst(sum(player1.pointsArr)) === true) {
      gameOver = true;
      return `Player 1 is out of the game! <br> Player drew: ${forEachCard(player1.handArr)} <br>
              Bust with ${sum(player1.pointsArr)} points. <br><br>
              Dealer wins. <br><br> Please refresh to play again.`;
    }

    return `Player's current cards: ${forEachCard(player1.handArr)} <br> Total points: ${sum(player1.pointsArr)}<br><br>
            Hit 'submit' to get another card. Otherwise, <br> Type 'stand' to remain`;
  }

  // [3] In this mode, Player gets a card each for his split hands.
  if (mode === SPLIT_MODE) {
    // New card is added to each split set
    player1.receiveCard(SPLIT_MODE);
    player1.bet = player1.bet * 2;

    // Check for BlackJack for both split sets
    if (dealtBlackJack(sum(player1.pointsArr), player1.handArr[0].length) === true) {
      player1.bet = (player1.bet) * 1.5 / 2;
      gameOver = true;
      return `${displayBlackjackMessage(player1, SPLIT_MODE)}`;
    } if (dealtBlackJack(sum(player1.pointsArr), player1.handArr[1].length === true)) {
      player1.bet = (player1.bet) * 1.5 / 2;
      gameOver = true;
      return `${displayBlackjackMessage(player1, SPLIT_MODE)}`;
    }

    // Optimise Ace cards for Dealer
    // eslint-disable-next-line max-len
    if ((sum(dealer.pointsArr) < 17) || (sum(dealer.pointsArr) < sum(player1.pointsArr) && sum(dealer.pointsArr) < 21)) {
      dealer.receiveCard();
      dealer.optimiseAces();
    }

    // Move to compare player & dealer scores.
    mode = SCORING_MODE_SPLIT;

    return `Player 1: <br> 1st set of split cards: ${forEachCard(player1.handArr[0])} <br> 1st split set points: ${sum(player1.pointsArr[0])}
            <br> 2nd set of split cards: ${forEachCard(player1.handArr[1])} <br> 2nd split set points: ${sum(player1.pointsArr[1])}<br><br> 
            Hit 'Submit' to continue.`;
  }

  // [4] In this mode, the dealer is the one being dealt the cards.
  if (mode == STAND_MODE) {
    // Aces if it exists, will be optimised to get best score.
    dealer.optimiseAces();

    // Optimise Ace cards for Dealer
    // eslint-disable-next-line max-len
    if ((sum(dealer.pointsArr) < 17) || (sum(dealer.pointsArr) < sum(player1.pointsArr) && sum(dealer.pointsArr) < 21)) {
      dealer.receiveCard();
      dealer.optimiseAces();

      return `Dealer's current cards: ${forEachCard(dealer.handArr)} <br> Dealer points: ${sum(dealer.pointsArr)}<br><br> 
              Hit 'Submit' for Dealer to continue hitting.`;
    }
    // Move to compare player & dealer scores.
    mode = SCORING_MODE_STAND;
  }

  // [5] In this mode, we are comparing the scores between dealer & player (STAND).
  if (mode === SCORING_MODE_STAND) {
    if ((sum(dealer.pointsArr) > sum(player1.pointsArr)) && (!handBurst(sum(dealer.pointsArr)))) {
      player1.bet = 0;
      return `${displayOutcome('dealerWins')}`;
    }
    if ((sum(dealer.pointsArr) < sum(player1.pointsArr)) || (handBurst(sum(dealer.pointsArr)))) {
      player1.bet += player1.bet;
      return `${displayOutcome('playerWins')}`;
    }
    if (sum(dealer.pointsArr) === sum(player1.pointsArr)) {
      return `${displayOutcome('draw')}`;
    }
  }

  // [6] In this mode, we are comparing the scores between dealer & player (SPLIT).
  if (mode === SCORING_MODE_SPLIT) {
    // Store total points in variables
    var dealerPoints = sum(dealer.pointsArr);
    var player1SetOnePoints = sum(player1.pointsArr[0]);
    var player1SetTwoPoints = sum(player1.pointsArr[1]);

    // Winning conditions for SPLIT_MODE
    if (dealerPoints < player1SetOnePoints || dealerPoints < player1SetTwoPoints
       || (handBurst(dealerPoints))) {
      player1.bet += player1.bet;
      return `${displayOutcome('player1SplitOneWin', mode)}`;
    }
    if ((dealerPoints < player1SetOnePoints && dealerPoints < player1SetTwoPoints)
       || (handBurst(sum(dealer.pointsArr)))) {
      player1.bet = player1.bet * 2;
      return `${displayOutcome('player1SplitBothWin', mode)}`;
    }
    if ((dealerPoints > player1SetOnePoints && dealerPoints > player1SetTwoPoints)
       || (!handBurst(dealerPoints))) {
      player1.bet -= player1.bet;
      return `${displayOutcome('player1SplitBothLose', mode)}`;
    }
    if ((dealerPoints === player1SetOnePoints && dealerPoints === player1SetTwoPoints)
       || (!handBurst(dealerPoints))) {
      return "It's a draw! All card sets have the same points!";
    }
  }
};
