var makeDeck = function () {
  var deck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      deck.push(card);
      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }
  return deck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};
var deck = shuffleCards(makeDeck());

// Player and Dealer hand arrays
// playerHand replaced by individual player hands var playerHand = [];
var dealerHand = [];

// Deal a card to the given hand
var dealCard = function (hand) {
  hand.push(deck.pop());
};

// Game cycle in sequence
// In this code I made it so that it goes like this with an extra mode in between games that only displays instructions (freshTable)
var Mode_choosePlayerNumber = "Mode_choosePlayerNumber";
var Mode_enterPlayerNames = "Mode_enterPlayerNames";
var Mode_bettingPhase = "Mode_bettingPhase";
var Mode_blackjackCheck = "Mode_blackjackCheck";
var Mode_hitOrStand = "Mode_hitOrStand";
var Mode_dealerPlays = "Mode_dealerPlays";
var Mode_results = "Mode_results";

// Function to start new rounds from results to bettingPhase
var newRound = function () {
  resetHands();
  mode = Mode_bettingPhase;
  playerTurn = 0;
  dealerCardsHidden = true;
};

// Game parameters
var playerNumber = 0;
var playerNames = [];
var playerTurn = 0;
var bustLimit = 21;
var dealerHit = 17;

// Initial states
var dealerCardsHidden = true;
var playerStanding = false;
var freshTable = false;
var mode = Mode_choosePlayerNumber;

// New players create their profiles through this function
var newPlayer = function (playerName) {
  playerNames.push({
    id: playerNumber + 1,
    name: playerName,
    hand: [],
    bet: 0,
    points: 100,
  });
};

// Detemines if it's the last player before the Dealer
var lastPlayer = function () {
  if (playerTurn == playerTurn.length - 1) {
    return true;
  }
  return false;
};

// If it's the last player, switch to Dealer
var endTurn = function () {
  if ((lastPlayer = true)) {
    mode = Mode_dealerPlays;
    playerTurn = 0;
    return;
  }
  playerTurn += 1;
  mode = Mode_blackjackCheck;
};

// Turn message
var turnMessage = function () {
  if ((lastPlayer = true)) {
    return "Click submit to reveal the Dealer's cards!";
  }
  return (
    "It's " +
    playerNames[playerTurn + 1].name +
    "'s turn! Click submit to choose your next move."
  );
};

// Get sum of cards in hand
var handValue = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      sum += currCard.rank;
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      sum += 10;
    } else if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }
  if (sum > bustLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      if (sum <= bustLimit) {
        break;
      }
    }
  }
  return sum;
};

// Blackjack checker
var isBlackjack = function (hand) {
  return hand.length === 2 && handValue(hand) === bustLimit;
};

// Game Logic
var generateResults = function () {
  outcome = "Round ends with: <br>";
  // Dealer busts
  // Need to recheck what continue function does
  if (handValue(dealerHand) > bustLimit) {
    for (var i = 0; i < playerNames.length; i += 1) {
      var playerTurn = playerNames[i];
      var listIndex = i + 1;
      if (handValue(playerTurn.hand) > bustLimit) {
        var deductedLosings = pointsLoss(playerTurn);
        playerTurn.points -= deductedLosings;
        outcome += `${listIndex}. ${playerTurn.name}- Bet: ${playerTurn.bet}; <br> Change: - ${playerTurn.bet} points; <br> Remaining points: ${playerTurn.points}<br>`;
        continue;
      }
      var obtainedWinnings = pointsWon(playerTurn);
      playerTurn.points += obtainedWinnings;
      outcome += `${listIndex}. ${playerTurn.name}- Bet: ${playerTurn.bet}; <br> Change: + ${playerTurn.bet} points; <br> Remaining points: ${playerTurn.points}<br>`;
    }
    return outcome;
  }

  // Dealer Blackjack
  if (isBlackjack(dealerHand)) {
    for (var i = 0; i < playerNames.length; i += 1) {
      var playerTurn = playerNames[i];
      var listIndex = i + 1;
      if (handValue(playerTurn.hand) > bustLimit) {
        var deductedLosings = pointsLoss(playerTurn);
        playerTurn.points -= deductedLosings;
        outcome += `${listIndex}. ${playerTurn.name}- Bet: ${playerTurn.bet}; <br> Change: - ${playerTurn.bet} points; <br> Remaining points: ${playerTurn.points}<br>`;
      }
      return outcome;
    }
  }
  for (var i = 0; i < playerNames.length; i += 1) {
    var playerTurn = playerNames[i];
    var listIndex = i + 1;
    if (
      handValue(playerTurn.hand) > bustLimit ||
      handValue(playerTurn.hand < handValue(dealerHand))
    ) {
      var deductedLosings = pointsLoss(playerTurn);
      playerTurn.points -= deductedLosings;
      outcome += `${listIndex}. ${playerTurn.name}- Bet: ${playerTurn.bet}; <br> Change: - ${playerTurn.bet} points; <br> Remaining points: ${playerTurn.points}<br>`;
      continue;
    }
    var obtainedWinnings = pointsWon(playerTurn);
    playerTurn.points += obtainedWinnings;
    outcome += `${listIndex}. ${playerTurn.name}- Bet: ${playerTurn.bet}; <br> Change: + ${playerTurn.bet} points; <br> Remaining points: ${playerTurn.points}<br>`;
  }
  return outcome;
};

// Bet results if won & special blackjack winnings
var pointsWon = player.bet;
if (isBlackjack(player.hand)) {
  pointsWon = player.bet * 1.5;
  return pointsWon;
}

// Bet results if loss
var pointsLoss = function (player) {
  return player.bet;
};

// Players with 0 points are eliminated
var getOutOfPointPlayers = function () {
  var outOfPoint = function (player) {
    return player.points === 0;
  };
  return playerNames.filter(outOfPoint);
};

// Players remaining at the table
var getSurvivingPlayers = function () {
  var pointsLeft = function (player) {
    return player.points > 0;
  };
  return playerNames.filter(pointsLeft);
};

// Should display hand cards value and suit
var convertHandToString = function (hand) {
  return $hand.map((card) => ` [${card.name} of ${card.suit}]`);
};

// Hand display
var myOutputValue = function () {
  return `${playerNames[playerTurn].name} has hand ${convertHandToString(
    playerNames[playerTurn].hand
  )} with sum ${handValue(playerNames[playerTurn].hand)}. <br>
    Dealer has the first card ${convertHandToString(
      dealerHand[0]
    )} with sum ${handValue(dealerHand[0])}.`;
};

// See dealer full hand
var dealerFullHand = function () {
  return `Dealer has hand ${convertHandToString(
    dealerHand
  )} with sum ${handValue(dealerHand)}.`;
};

// Clear all hand arrays
var resetHands = function () {
  for (var i = 0; i < playerNames.length; i += 1) {
    playerNumber[i].hand = [];
  }
  dealerHand = [];
};

var main = function (input) {
  // Initial state
  if (freshTable) {
    freshTable = false;
    mode = Mode_choosePlayerNumber;
    resetHands();
    playerStanding = false;
    return "Press Submit to begin a new game of Blackjack!";
  }
  // Phase 1 - choose player number
  if (mode == Mode_choosePlayerNumber) {
    playerNumber = Number(input);
    mode = Mode_enterPlayerNames;
    return `There are ${playerNumber} dealers on the table. Please enter your name to begin the game!`;
  }

  // Phase 2 - choose player names
  while (mode == Mode_enterPlayerNames) {
    playerName = input;
    newPlayer(playerName);
    if (playerNames[playerTurn].id == playerNumber) {
      mode = Mode_bettingPhase;
      playerTurn = 0;
      return (
        playerNames[playerNames[0]].name +
        "<br> You have " +
        playerNames[0].points +
        " points. <br> Time to enter your bet for this turn!"
      );
    }
    var prevPlayerNumber = playerNumber;
    playerNumber += 1;
    return `Join the table, ${playerNames[prevPlayerNumber].name}. Player ${
      playerNumber[prevPlayerNumber].id + 1
    }, please enter your name!`;
  }

  // Phase 3 - Betting phase
  while ((mode = Mode_bettingPhase)) {
    if (input > playerNames[playerTurn].points) {
      return `${playerNames[playerTurn].name}, you only have ${
        playerNames[playerTurn.points]
      } points!}`;
    }
    playerNames[playerTurn].bet = Number(input);
    if ((lastPlayer = true)) {
      while (playerNames[0].hand < 2) {
        for (var i = 0; i < playerNames.length; i += 1) {
          dealCard(playerNames.length[i].hand);
          dealCard(dealerHand);
          playerTurn = 0;
          return `${playerNames[playerNames.length - 1].name} , you bet ${
            playerNames[playerNames.length - 1].bet
          } points! <br><br> It's ${
            playerNames[playerTurn].name
          }'s turn now. Press submit to see your hand!`;
        }
      }
      mode = Mode_blackjackCheck;
    }

    // Phase 4 - Hit or Stand
    if (mode == Mode_hitOrStand) {
      if (input !== "hit" && input !== "stand") {
        return "Please only input either 'hit' or 'stand' as your next action! ";
      }
      var output = myOutputValue();
      var nextMessage = turnMessage();
      if (input === "hit") {
        dealCard(playerNames[playerTurn.hand]);
        if (handValue(playerNames[playerTurn.hand]) > bustLimit) {
          bustMessage = `Bummer! ${playerNames[playerTurn].name} busted! ${output} <br> ${nextMessage}`;
          endTurn();
          return bustMessage;
        }
        return `${output} <br>
        Would you like to hit another card or stand?`;
      }
      if (input === "stand") {
        if ((lastPlayer = true)) {
          var myOutputValue = `${
            playerNames[playerTurn.name]
          } chose to stand! ${output} <br> ${nextMessage}`;
          endTurn();
          return myOutputValue;
        }
        var myOutputValue = `You chose to stand! <br>
        ${output} <br> ${
          playerNames[playerTurn + 1].name
        }, click submit to see your hand! <br>`;
        endTurn();
        return myOutputValue;
      }
    }

    // Phase 5 - Dealer plays according to Hit Threshold
    if (mode == Mode_dealerPlays) {
      if ((dealerCardsHidden = true)) {
        dealerCardsHidden = false;
        return `Dealer has ${dealerFullHand()} <br>
        Click sumbit to see the Dealer's next move!`;
      }
      if (isBlackjack(dealerHand)) {
        mode = Mode_results;
        return `The Dealer won with a Blackjack! All bets go to the house~ ${dealerFullHand()} <br> Click submit to see results!`;
      }
      var dealerSum = handValue(dealerHand);
      if (dealerSum <= dealerHit) {
        dealCard(dealerHand);
        dealerSum = handValue(dealerHand);
        if (dealerSum > bustLimit) {
          mode = Mode_results;
          return `The Dealer busted! <br> ${dealerFullHand()} <br> Click submit to see the results of this round!`;
        }
        if (dealerSum <= bustLimit) {
          return `The Dealer hit! <br> ${dealerFullHand()} <br> Click submit to see what the dealer does next!`;
        }
        mode = Mode_results;
        return `The Dealer stands! <br> ${dealerFullHand()} <br> Click submit to see the results of this round!`;
      }

      // Phase 6 - Results & check for points & players out of points
      if (mode == Mode_results) {
        var resultMessage = generateResults();
        var OutOfPointPlayers = GetOutOfPointPlayers();
        var survivingPlayers = getSurvivingPlayers();
        if (survivingPlayers.length === 0) {
          // The freshTable mode reverts back the game state to instructions
          freshTable = true;
          return `${resultMessage} <br> ${OutOfPointPlayers} was escorted off the table. Thank you for playing! <br> Hit submit to sit at another table!`;
        }
        playerNames = survivingPlayers;
        newRound();
        return `${resultMessage} <br> ${OutOfPointPlayers} is out of points and had to retire. <br> ${playerNames[0].name}, enter your bet to start a new round!`;
      }
    }
  }
};
