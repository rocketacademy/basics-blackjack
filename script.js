var twentyOne = 21;
var dealerMinimumPointsThreshold = 16;
var gameOver = false;
var MODE_INPUT_NUM_OF_PLAYERS = "MODE_INPUT_NUM_OF_PLAYERS";
var MODE_INPUT_PLAYER_NAME = "MODE_INPUT_PLAYER_NAME";
var MODE_BETTING = "MODE_BETTING";
var MODE_DEAL_CARDS = "MODE_DEAL_CARDS";
var MODE_HIT_OR_STAND = "MODE_HIT_OR_STAND";
var MODE_DEALER_PLAYS = "MODE_DEALER_PLAYS";
var MODE_SHOW_RESULTS = "MODE_SHOW_RESULTS";
var MODE_CHECK_FOR_BLACKJACK = "CHECK_FOR_BLACKJACK";
var mode = MODE_INPUT_NUM_OF_PLAYERS;
var playerProfilesArray = [];
var dealerHandArray = [];
var hit = "h";
var stand = "s";
var currentPlayerIndex = 0;
var dealerCardHidden = true;
var startingNumOfPlayers = 0;


//make deck function
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];

  var suits = ["Hearts ♥️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var counter = 1;
    while (counter <= 13) {
      var rankCounter = counter;
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      // for BlackJack only, change the card rank for the face cards to 10.
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "Jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "Queen";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "King";
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);

      counter = counter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};
// random cards function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
// shuffle cards function
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
// deal cards to hand function
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};
// calculate sum of hand function
var calSumInHand = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  for (let cardIndex = 0; cardIndex < hand.length; cardIndex += 1) {
    var currentCard = hand[cardIndex];

    if (currentCard.rank >= 2 && currentCard.rank <= 10) {
      sum += currentCard.rank;
    } else if (currentCard.rank >= 11 && currentCard.rank <= 13) {
      sum += 10;
    } else if (currentCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    }
  }

  if (sum > twentyOne && numAcesInHand > 0) {
    for (let aceIndex = 0; aceIndex < numAcesInHand; aceIndex += 1) {
      sum -= 10;

      if (sum <= twentyOne) {
        break;
      }
    }
  }
  return sum;
};
// convert number to string
var convertHandToString = function (hand) {
  var cards = "";
  var handIndex = 0;

  while (handIndex < hand.length) {
    cards = cards + "," + hand[handIndex].name;
    handIndex = handIndex + 1;
  }

  return cards;
};
// standard output
var getDefaultOutput = function () {
  return `${playerProfilesArray[currentPlayerIndex].name}'s hand: <br>
  ${convertHandToString(playerProfilesArray[currentPlayerIndex].hand)} <br>
  Sum: ${calSumInHand(playerProfilesArray[currentPlayerIndex].hand)} 
  <br><br>
  Dealer's first card: ${convertHandToString([dealerHandArray[0]])} <br>
  Sum: ${calSumInHand([dealerHandArray[0]])}`;
};
// show dealer cards
var displayDealerHand = function () {
  return `Dealer's hand: ${convertHandToString(dealerHandArray)}<br>
  Sum: ${calSumInHand(dealerHandArray)}`;
};
// store players info
var createPlayerProfiles = function (playerName) {
  playerProfilesArray.push({
    id: currentPlayerIndex + 1,
    name: playerName,
    hand: [],
    bet: 0,
    points: 100,
  });
};
// deal cards to all
var dealCardsToPlayersAndDealer = function () {
  for (var counter = 0; counter < 2; counter += 1) {
    for (
      var playerIndex = 0;
      playerIndex < playerProfilesArray.length;
      playerIndex += 1
    ) {
      dealCardToHand(playerProfilesArray[playerIndex].hand);
    }
    dealCardToHand(dealerHandArray);
  }
};
// check if it's blackjack
var isBlackjack = function (hand) {
  return hand.length == 2 && calSumInHand(hand) == twentyOne;
};
// calculate winnings
var calcBetWinnings = function (player) {
  var winAmt = player.bet;
  if (isBlackjack(player.hand)) {
    winAmt = player.bet * 1.5;
    return winAmt;
  }
  return winAmt;
};
// calculate losses
var calcBetLosses = function (player) {
  return player.bet;
};

// tell players to continue
var getInstructionsToContinuePlaying = function () {
  if (isLastPlayer()) {
    return `All players have played. Click Submit to see Dealer's move`;
  }
  return (
    `"It's ${playerProfilesArray[currentPlayerIndex + 1].name}'s turn. Click submit to continue`
  );
};
// empty hands to restart
var emptyAllHands = function () {
  for (
    var handIndex = 0;
    handIndex < playerProfilesArray.length;
    handIndex += 1
  ) {
    playerProfilesArray[handIndex].hand = [];
  }
  dealerHandArray = [];
};
// start new game with bets
var restartFromBets = function () {
  emptyAllHands();
  mode = MODE_BETTING;
  currentPlayerIndex = 0;
  dealerCardHidden = true;
};
// end a player turn
var endPlayerTurn = function () {
  if (isLastPlayer()) {
    mode = MODE_DEALER_PLAYS;
    currentPlayerIndex = 0;
    return;
  }
  currentPlayerIndex += 1;
  mode = MODE_CHECK_FOR_BLACKJACK;
};
// check if current player is last player
var isLastPlayer = function () {
  return currentPlayerIndex == playerProfilesArray.length - 1;
};
// check if dealer dust
var checkIfDealerBust = function () {
  return calSumInHand(dealerHandArray) > twentyOne;
};
// game results
var getGameResults = function () {
  var gameResults = "Results: <br>";
  if (checkIfDealerBust()) {
    for (
      var playerIndex = 0;
      playerIndex < playerProfilesArray.length;
      playerIndex += 1
    ) {
      var currentPlayer = playerProfilesArray[playerIndex];
      var listIndex = playerIndex + 1;
      if (calSumInHand(currentPlayer.hand) > twentyOne) {
        var amtLost = calcBetLosses(currentPlayer);
        currentPlayer.points -= amtLost;
        gameResults += `${listIndex}. ${currentPlayer.name}- Bet: ${currentPlayer.bet} || win/lose: - ${currentPlayer.bet} chips. || Total Chips: ${currentPlayer.points}<br>`;
        continue;
      }
      var amtWon = calcBetWinnings(currentPlayer);
      currentPlayer.points += amtWon;
      gameResults += `${listIndex}. ${currentPlayer.name}- Bet: ${currentPlayer.bet} || win/lose: + ${amtWon} chips. || Total Chips: ${currentPlayer.points}<br>`;
    }
  
    return gameResults;
  }

  if (isBlackjack(dealerHandArray)) {
    for (
      var playerIndex = 0;
      playerIndex < playerProfilesArray.length;
      playerIndex += 1
    ) {
      var currentPlayer = playerProfilesArray[playerIndex];
      var listIndex = playerIndex + 1;
      var amtLost = calcBetLosses(currentPlayer);
      currentPlayer.points -= amtLost;
      gameResults += `${listIndex}. ${currentPlayer.name}- Bet: ${currentPlayer.bet} || win/lose: - ${currentPlayer.bet} chips. || Total Chips: ${currentPlayer.points}<br>`;
    }
    return gameResults;
  }
  for (
    var playerIndex = 0;
    playerIndex < playerProfilesArray.length;
    playerIndex += 1
  ) {
    var currentPlayer = playerProfilesArray[playerIndex];
    var listIndex = playerIndex + 1;

    if ( calSumInHand(currentPlayer.hand) > twentyOne && calSumInHand(dealerHandArray) > twentyOne) {
      currentPlayer.points += 0;
      gameResults += `${listIndex}. ${currentPlayer.name}- Bet: ${currentPlayer.bet} || win/lose: + 0 chips. || Total Chips: ${currentPlayer.points}<br>`;
    } else if (calSumInHand(currentPlayer.hand) > twentyOne) {
      var amtLost = calcBetLosses(currentPlayer);
      currentPlayer.points -= amtLost;
      gameResults += `${listIndex}. ${currentPlayer.name}- Bet: ${currentPlayer.bet} || win/lose: - ${currentPlayer.bet} chips. || Total Chips: ${currentPlayer.points}<br>`;
    } else if (
      calSumInHand(currentPlayer.hand) > calSumInHand(dealerHandArray)
    ) {
      var amtWon = calcBetWinnings(currentPlayer);
      currentPlayer.points += amtWon;
      gameResults += `${listIndex}. ${currentPlayer.name}- Bet: ${currentPlayer.bet} || win/lose: + ${amtWon} chips. || Total Chips: ${currentPlayer.points}<br>`;
    } else if (
      calSumInHand(currentPlayer.hand) == calSumInHand(dealerHandArray)
    ) {
      currentPlayer.points += 0;
      gameResults += `${listIndex}. ${currentPlayer.name}- Bet: ${currentPlayer.bet} || win/lose: + 0 chips. || Total Chips: ${currentPlayer.points}<br>`;
    } else {
      var amtLost = calcBetLosses(currentPlayer);
      currentPlayer.points -= amtLost;
      gameResults += `${listIndex}. ${currentPlayer.name} - Bet: ${currentPlayer.bet} || win/lose: - ${currentPlayer.bet} chips. || Total Chips: ${currentPlayer.points}<br>`;
    }
  }
  return gameResults;
};
// eliminate player
var getPlayersOut = function () {
  var criterionToGetPlayersOut = function (player) {
    return player.points < 1;
  };
  return playerProfilesArray.filter(criterionToGetPlayersOut);
};
// check remaining players
var checkRemainingPlayers = function () {
  var criterionToRemain = function (player) {
    return player.points > 0;
  };
  return playerProfilesArray.filter(criterionToRemain);
};
// show eliminated players
var displayEliminatedPlayers = function (eliminatedPlayersArray) {
  var eliPlayersArray = []
 
  var message = `Player with no more chips will be eliminated:`;

  if (eliPlayersArray.length < 1) {
    message += `<br> 1. ${null}`;
  } else {
    for (
      var playerIndex = 0;
      playerIndex < eliPlayersArray.length;
      playerIndex += 1
    ) {
      var listIndex = playerIndex + 1;

      message += `<br> ${listIndex}. ${eliPlayersArray[playerIndex].name}`;
    }
  }
  
  return message;
};


// main
var main = function (input) {
  // if game over
  if (gameOver) {
    return "GAME OVER! Please refresh page to play again.";
  }
  // input how many players are playing
  if (mode == MODE_INPUT_NUM_OF_PLAYERS) {
    if (isNaN(input) == true || !Number(input) > 0) {
      return "Please input number of players participating";
    }
    startingNumOfPlayers = Number(input);
    // input player name
    mode = MODE_INPUT_PLAYER_NAME;
    return `There are ${startingNumOfPlayers} players. Player 1, please input your name.`;
  }
  // if no input of name
  if (mode == MODE_INPUT_PLAYER_NAME) {
    if (input == "") {
      return `Please input your name`;
    }

    playerName = input;
    // create player profile
    createPlayerProfiles(playerName);

    if (playerProfilesArray[currentPlayerIndex].id == startingNumOfPlayers) {
      mode = MODE_BETTING;

      currentPlayerIndex = 0;

      return (
        "Welcome, " +
        playerProfilesArray[playerProfilesArray.length - 1].name +
        ". <br><br>" +
        playerProfilesArray[0].name +
        ", you have " +
        playerProfilesArray[0].points +
        " chips.<br> Please input bet amount."
      );
    }

    var PreviousPlayerIndex = currentPlayerIndex;
    currentPlayerIndex += 1;
    return `Welcome,
      ${playerProfilesArray[PreviousPlayerIndex].name}. Player 
      ${playerProfilesArray[PreviousPlayerIndex].id + 1}
    , please input your name.`;
  }
  // place bet amount
  if (mode == MODE_BETTING) {
    if (isNaN(input) == true || !Number(input) > 0) {
      return "Please input a number larger than 0";
    }

    if (input > playerProfilesArray[currentPlayerIndex].points) {
      return `${playerProfilesArray[currentPlayerIndex].name}, you have ${playerProfilesArray[currentPlayerIndex].points} chips. Please input an amount less than or equal to this.`;
    }
    
    playerProfilesArray[currentPlayerIndex].bet = Number(input);

    if (isLastPlayer()) {
      mode = MODE_DEAL_CARDS;

      currentPlayerIndex = 0;

      return ` 
        ${playerProfilesArray[playerProfilesArray.length - 1].name}
        , you've chosen to bet 
        ${playerProfilesArray[playerProfilesArray.length - 1].bet} out of ${playerProfilesArray[currentPlayerIndex].points} chips. 
       <br><br>
       ${playerProfilesArray[currentPlayerIndex].name}
       , please click submit to deal cards and see your hand`;
    }

    var PreviousPlayerIndex = currentPlayerIndex;

    currentPlayerIndex += 1;
    return ` ${playerProfilesArray[PreviousPlayerIndex].name}, you've chosen to bet ${playerProfilesArray[PreviousPlayerIndex].bet} chips. ${playerProfilesArray[currentPlayerIndex].name}, please input your bet amount.`;
  }

  
  if (mode == MODE_DEAL_CARDS) {
    deck = shuffleCards(makeDeck());
    dealCardsToPlayersAndDealer();
    mode = MODE_CHECK_FOR_BLACKJACK;
  }

  if (mode === MODE_CHECK_FOR_BLACKJACK) {
    if (isBlackjack(playerProfilesArray[currentPlayerIndex].hand)) {
      var myOutputValue = `
      ${playerProfilesArray[currentPlayerIndex].name}
      has a Blackjack! Player wins if dealer does not have Blackjack.<br>
      ${getDefaultOutput()} 
      <br><br>  ${getInstructionsToContinuePlaying()}`;

      endPlayerTurn();

      return myOutputValue;
    }
   
    mode = MODE_HIT_OR_STAND;

    return `${getDefaultOutput()} <br><br>
       Please input "h" or "s", and press Submit`;
  }


  if (mode == MODE_HIT_OR_STAND) {
    if (input !== hit && input !== stand) {
      return ' Please input either "h" or "s" to continue';
    }

    var defaultOutput = getDefaultOutput();
    var instructionsForNextSteps = getInstructionsToContinuePlaying();

    if (input == hit) {
      dealCardToHand(playerProfilesArray[currentPlayerIndex].hand);

      defaultOutput = getDefaultOutput();

      if (calSumInHand(playerProfilesArray[currentPlayerIndex].hand) > twentyOne) {
       
        myOutputValue = `${playerProfilesArray[currentPlayerIndex].name} 
        has busted. <br> ${defaultOutput} 
        <br><br> ${instructionsForNextSteps}`;

        endPlayerTurn();

        return myOutputValue;
      }
   
      return `${defaultOutput}
      <br> Please input "h" to draw another card, or "s" to end turn.`;
    }

    
    if (input == stand) {
      
      if (isLastPlayer()) {
        var myOutputValue = `${playerProfilesArray[currentPlayerIndex].name} chose to stand. ${defaultOutput} 
        <br> ${instructionsForNextSteps}`;

        
        endPlayerTurn();
        return myOutputValue;
      }
      
      var myOutputValue = `You've chosen to stand. <br> 
      ${defaultOutput} 
      <br><br>  ${
        playerProfilesArray[currentPlayerIndex + 1].name
      }, click submit to see your hand. <br>`;
  
      endPlayerTurn();
      return myOutputValue;
    }
  }

  if (mode == MODE_DEALER_PLAYS) {
    if (dealerCardHidden) {
      dealerCardHidden = false;

      return `Dealer's cards: <br> ${displayDealerHand()}.
      <br><br> Click submit to see continue`;
    }

    if (isBlackjack(dealerHandArray)) {
      mode = MODE_SHOW_RESULTS;
      return `Dealer got Blackjack and wins! <br>
      ${displayDealerHand()}
      <br><br> Click submit to see results`;
    }
    
    var DealerHandSum = calSumInHand(dealerHandArray);

  
    if (DealerHandSum <= dealerMinimumPointsThreshold) {
      dealCardToHand(dealerHandArray);

      DealerHandSum = calSumInHand(dealerHandArray);

      if (checkIfDealerBust()) {
        mode = MODE_SHOW_RESULTS;

        return `Dealer busted and loses. <br> ${displayDealerHand()} 
        <br><br> Click submit to see results `;
      }

      return `Dealer chose to hit. <br> ${displayDealerHand()}
      <br><br> Click submit to continue.`;
    }

    
    mode = MODE_SHOW_RESULTS;
    return `Dealer chose to stand. <br> ${displayDealerHand()}
    <br><br> Click submit to see results`;
  }
  if (mode == MODE_SHOW_RESULTS) {
    
    var gameResults = getGameResults();
    
    var eliminatedPlayers = displayEliminatedPlayers();
    
    var remainingPlayers = checkRemainingPlayers();

    
    if (remainingPlayers.length < 1) {
      gameOver = true;
      return `${gameResults} 
      <br> ${displayEliminatedPlayers(eliminatedPlayers)}
      <br><br> There are no more players. Please refresh page to play again`;
    }


    playerProfilesArray = remainingPlayers;

    restartFromBets();

    return `${gameResults} 
    <br> ${displayEliminatedPlayers(eliminatedPlayers)}
    <br><br> ${playerProfilesArray[0].name}
    , input your bet to begin the new round.
    `;
  }
};
