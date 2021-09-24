var GAME_MODE_NUM_PLAYERS = "MODE_NUM_PLAYERS";
var GAME_MODE_PLAYER_NAME = "PLAYER_NAME";
var GAME_MODE_BETS = "BETS";
var GAME_MODE_DEAL_CARDS = "DEAL_CARDS";
var GAME_MODE_Check_BJ = "Check Blackjack";
var GAME_MODE_HIT_STAND = "Hit_Stand";
var GAME_MODE_DEALER = "DEALER_PLAYS";
var GAME_MODE_RESULTS = "RESULTS";
var betAmount = 0;
var capital = 100;

//store deck in array
var cardDeck = [];

var mode = GAME_MODE_NUM_PLAYERS;

// Determine whether the computer's card has been revealed
var isDealerCardHidden = true;

// Store players' details (e.g. name, hand, bet) in an array of objects
var playerProfiles = [];

// set a var that points to the current player within the playerProfile array. The pointer/index starts at 0 since arrays are 0 indexed
var currPlayerIndex = 0;

// Track num of players that the game starts with
var initialNumOfPlayers = 0;

// The maximum valid sum in Blackjack is 21.
var sumLimit = 21;

// Dealer always hits until he/she reaches a sum greater than 16.
var dealerHitThreshold = 16;

// Keep track of when the game ends to prevent further moves
var gameOver = false;

// Store player's cards and dealer's cards in separate arrays
var playerHand = [];
var dealerHand = [];

var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    console.log(cardDeck);

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var counter = 1;
    while (counter <= 13) {
      var rankCounter = counter;
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      if (currentSuit === "hearts") {
        var emojiSuit = "♥️";
      } else if (currentSuit === "diamonds") {
        var emojiSuit = "♦️";
      } else if (currentSuit === "spades") {
        var emojiSuit = "♠️";
      } else if (currentSuit === "clubs") {
        var emojiSuit = "♣️";
      }

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emojiSuit: emojiSuit,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      counter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
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

// Deal a card to the given hand
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

// Get sum of cards in hand
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    // If card is Ace, value is 11 by default
    if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    } else {
      sum += currCard.rank;
    }

    counter = counter + 1;
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11
  // to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (sum > sumLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      // If the sum is less than sumLimit before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (sum <= sumLimit) {
        break;
      }
    }
  }
  return sum;
};

// Return whether the hand contains a Blackjack combination
var isBlackjack = function (hand) {
  return hand.length === 2 && getHandSum(hand) === sumLimit;
};

// Convert hand to a string where objects within the array are stringified
var convertHandToString = function (hand) {
  var cards = "";
  var handIndex = 0;

  while (handIndex < hand.length) {
    cards = cards + " , " + hand[handIndex].name + hand[handIndex].emojiSuit;
    handIndex = handIndex + 1;
  }

  return cards;
};

var getDefaultOutput = function () {
  return `${playerProfiles[currPlayerIndex].name}'s hand:
  ${convertHandToString(playerProfiles[currPlayerIndex].hand)} <br>
  Sum: ${getHandSum(playerProfiles[currPlayerIndex].hand)} 
  <br><br>
  Computer's first card: ${convertHandToString([dealerHand[0]])} <br>
  Sum: ${getHandSum([dealerHand[0]])}`;
};

var displayDealerFullHand = function () {
  return `Computer's hand: ${convertHandToString(dealerHand)}<br>
  Sum: ${getHandSum(dealerHand)}`;
};

var createPlayerProfiles = function (playerName) {
  playerProfiles.push({
    id: currPlayerIndex + 1,
    name: playerName,
    hand: [],
    bet: 0,
    dollars: 100,
  });
};

var dealCardsToPlayersAndComputer = function () {
  for (var j = 0; j < 2; j += 1) {
    // Iterate thru playerProfiles, deal 1 cards to each player's hand
    for (var i = 0; i < playerProfiles.length; i += 1) {
      dealCardToHand(playerProfiles[i].hand);
    }
    dealCardToHand(dealerHand);
  }
};

var currPlayerIsLastPlayer = function () {
  // The current player is the last player if the currPlayerIndex is equal to the length -1 (We deduct one to account for arrays be 0 indexed)
  return currPlayerIndex == playerProfiles.length - 1;
};

var calcBetWinnings = function (player) {
  var winAmt = player.bet;
  // If player wins with a blackjack
  if (isBlackjack(player.hand)) {
    //  Multiplier is 1.5 times of betted amt
    winAmt = player.bet * 1.5;

    // player.points += winAmt;
    return winAmt;
  }
  // else player did not win with blackjack, multiplier is 1 times of the betted amt
  // playerProfiles[currPlayerIndex].points += winAmt;
  return winAmt;
};

var calcBetLosses = function (player) {
  // return the amount lost
  return player.bet;
};

var NextSteps = function () {
  // If the last player is playing, it's the end of the current game. Press refresh to start again
  if (currPlayerIsLastPlayer()) {
    return "All players have played. Next, click submit to see Dealer's cards";
  }
  // If the last player is not playing, cue the next person is play
  return (
    "It's " +
    playerProfiles[currPlayerIndex + 1].name +
    "s turn next. Click submit to continue"
  );
};

var emptyAllHands = function () {
  // Empty the players' hand
  for (var i = 0; i < playerProfiles.length; i += 1) {
    // replace each player's hand with an empty array
    playerProfiles[i].hand = [];
  }
  // empty the computer hand
  dealerHand = [];
};

var endCurrPlayerTurn = function () {
  // Start a new round-- change mode and reset currPlayerIndex
  if (currPlayerIsLastPlayer()) {
    // Change mode to progress the game
    mode = GAME_MODE_DEALER;
    // Point the current player to first player
    currPlayerIndex = 0;
    return;
  }
  // Increase currPlayerIndex to point at the next player in playerProfiles
  currPlayerIndex += 1;
  // Change mode to progress the game
  mode = GAME_MODE_Check_BJ;
};

var currPlayerIsLastPlayer = function () {
  // The current player is the last player if the currPlayerIndex is equal to the length -1 (We deduct one to account for arrays be 0 indexed)
  return currPlayerIndex == playerProfiles.length - 1;
};

var didDealerBust = function () {
  return getHandSum(dealerHand) > sumLimit;
};

var getGameResults = function () {
  // Set a preamble
  var gameResults = "Results: <br>";
  // Handle scenario  where computer busts
  if (didDealerBust()) {
    // Iterate thru all players
    for (var i = 0; i < playerProfiles.length; i += 1) {
      var currPlayer = playerProfiles[i];
      var listIndex = i + 1;
      // If the player also busted, they lose their bet
      if (getHandSum(currPlayer.hand) > sumLimit) {
        // Calculate how much the player lost
        var amtLost = calcBetLosses(currPlayer);
        // Subtract the bet from the player's points
        currPlayer.dollars -= amtLost;
        gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Result: - ${currPlayer.bet} dollars. || New Capital: ${currPlayer.dollars}<br>`;
        continue;
      }
      // Else the computer busts but the player did not: Player wins.
      // Calculate the player winnings
      var amtWon = calcBetWinnings(currPlayer);
      //  Add the winnings to the player's points
      currPlayer.dollars += amtWon;
      // Update the string that will be printed
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Result: + ${amtWon} dollars. || New Capital: ${currPlayer.dollars}<br>`;
    }
    // Return the string of results
    return gameResults;
  }

  // If computer did not bust, it could have won; check if it won by blackjack. If so, all players lose their bets
  if (isBlackjack(dealerHand)) {
    // Iterate thru all the player profiles
    for (var i = 0; i < playerProfiles.length; i += 1) {
      // Set a var to refer to the current player in the loop
      var currPlayer = playerProfiles[i];
      var listIndex = i + 1;
      //Calculate how much the current player lost
      var amtLost = calcBetLosses(currPlayer);
      // Subtract the bet from the player's points
      currPlayer.points -= amtLost;
      // Append results to existing gameResults String
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Result: - ${currPlayer.bet} dollars. || New Capital: ${currPlayer.dollars}<br>`;
    }
    // Return the string of results
    return gameResults;
  }

  // Else if the computer did not bust and did not win by blackjack, check if it wins by outnumbering each player's hand
  // iterate thru the player hands.
  for (var i = 0; i < playerProfiles.length; i += 1) {
    // Make the current player easily accessible using an intuitive variable name
    var currPlayer = playerProfiles[i];
    var listIndex = i + 1;

    // Compare each hand against the computer hand.
    // if player busts, they lose their bet
    if (getHandSum(currPlayer.hand) > sumLimit) {
      // Calculate the player's losses
      var amtLost = calcBetLosses(currPlayer);
      // Subtract the losses from the player's points
      currPlayer.dollars -= amtLost;
      // Append results to existing gameResults String
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Result: - ${currPlayer.bet} dollars. || New Capital: ${currPlayer.dollars}<br>`;
    }
    // If player did not bust, player wins if their hand's sum >computer's hand sum
    else if (getHandSum(currPlayer.hand) > getHandSum(dealerHand)) {
      // Calculate the player's winnings
      var amtWon = calcBetWinnings(currPlayer);
      // Add winnings to player's points
      currPlayer.dollars += amtWon;
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Result: + ${amtWon} dollars. || New Capital: ${currPlayer.dollars}<br>`;
    } else {
      // In all other scenarios, computer wins
      // Calculate the player's losses
      var amtLost = calcBetLosses(currPlayer);
      // Subtract the losses from the player's points
      currPlayer.dollars -= amtLost;
      // Append results to existing gameResults String
      gameResults += `${listIndex}. ${currPlayer.name} - Bet: ${currPlayer.bet} || Result: - ${currPlayer.bet} dollars. || New Capital: ${currPlayer.dollars}<br>`;
    }
  }
  return gameResults;
};

var restartFromBets = function () {
  // Empty each player's hand
  emptyAllHands();
  // Change mode to collect bets
  mode = GAME_MODE_BETS;
  // reset currPlayerIndex so that the first person in playerProfiles plays first
  currPlayerIndex = 0;

  isDealerCardHidden = true;
};

var getEliminatedPlayers = function () {
  var criterionToEliminate = function (player) {
    return player.dollars < 1;
  };
  return playerProfiles.filter(criterionToEliminate);
};

var getRemainingPlayers = function () {
  var criterionToRemain = function (player) {
    return player.dollars > 0;
  };
  return playerProfiles.filter(criterionToRemain);
};

var displayEliminatedPlayers = function (eliminatedPlayersArray) {
  // Set a preamble that is of datatype String
  var outputMsg = `Players with 0 dollars will be eliminated:`;

  // If the array is empty, return null
  if (eliminatedPlayersArray.length < 1) {
    outputMsg += `<br> 1. ${null}`;
  } else {
    // Else there will be players who need to be eliminated.
    // Loop thru the array and append their names to the outputMsg
    for (var i = 0; i < eliminatedPlayersArray.length; i += 1) {
      var listIndex = i + 1;
      // Append info about the eliminated player onto the preamble
      outputMsg += `<br> ${listIndex}. ${eliminatedPlayersArray[i].name}`;
    }
  }
  // Return the string
  return outputMsg;
};

/////////////////////////////////////// MAIN ////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
var main = function (input) {
  var blackJackImg =
    "<img src= https://c.tenor.com/IHsmIuB1ntgAAAAd/batman-joker.gif/>";
  var letsBeginImg =
    "<img src= https://c.tenor.com/yFZpXBKX61sAAAAC/poker-chips.gif>";

  if (gameOver) {
    return "The game is over. Please refresh to play again.";
  }
  if (mode == GAME_MODE_NUM_PLAYERS) {
    // Validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return "Pleae input the number of players, to begin";
    }
    // Convert user input from string to number, and assign it to the global var tracking the number of dice users have chosen to play with
    initialNumOfPlayers = Number(input);

    //Progress game to next mode
    mode = GAME_MODE_PLAYER_NAME;
    // Output a msg about the number of players the user has chosen
    return `There are ${initialNumOfPlayers} players in this game. Player 1, please enter your name to begin. <br> ${letsBeginImg}`;
  }
  // Mode to get player names
  if (mode == GAME_MODE_PLAYER_NAME) {
    // Validate if user provided a name. Prompt user again if input field was empty.
    // The trim() method allows removes empty spaces before and after a word. Hence if the user inputs a series of empty spaces, it be trimemed to a single space i.e. ''
    if (input.trim() == "") {
      return "Please input your name to begin";
    }
    // Assign input to a more descriptive variable name
    playerName = input;

    // Create a player profile with the given name
    createPlayerProfiles(playerName);

    // Based on the indicated number of players, determine if all players have submitted their names. If so:
    if (playerProfiles[currPlayerIndex].id == initialNumOfPlayers) {
      // change the mode
      mode = GAME_MODE_BETS;

      // reset currPlayer Index;
      currPlayerIndex = 0;

      // output a message that welcomes the latest player and cues first player to enter a bet
      return (
        "Welcome, " +
        playerProfiles[playerProfiles.length - 1].name +
        ". <br><br>" +
        playerProfiles[0].name +
        ", you have " +
        playerProfiles[0].dollars +
        " dollars.<br> Please enter a bet."
      );
    }

    // Else not all players have submitted their names. Output a msg that acknowldeges the player's name submission, and cues the next player to enter their name
    // Assign the currPlayerIndex to previousPlayer
    var prevPlayerIndex = currPlayerIndex;
    // Increment the currentPlayerIndex so it points at the next player
    currPlayerIndex += 1;
    return `Welcome,
      ${playerProfiles[prevPlayerIndex].name}. Player 
      ${playerProfiles[prevPlayerIndex].id + 1}
    , please enter your name.`;
  }

  // Mode to collect user input on their bet amount
  if (mode == GAME_MODE_BETS) {
    // Validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return "Please enter a number larger than 0";
    }

    // Validate that the bet amount is not larger than the amount of dollars this player has
    if (input > playerProfiles[currPlayerIndex].dollars) {
      return `${playerProfiles[currPlayerIndex].name}, you have ${playerProfiles[currPlayerIndex].dollars} dollars. Please enter an amount less than or equal to this.`;
    }
    // update player's profile with the betted amount
    playerProfiles[currPlayerIndex].bet = Number(input);

    //If all players have submitted their bets, cue player 1 to start playing
    if (currPlayerIsLastPlayer()) {
      //Progress game to next mode
      mode = GAME_MODE_DEAL_CARDS;

      // Reset currPlayerIndex back to 0 so that he/she is the next player
      currPlayerIndex = 0;

      return ` 
        ${playerProfiles[playerProfiles.length - 1].name}
        , you've chosen to bet 
        ${playerProfiles[playerProfiles.length - 1].bet} 
       dollars. 
       <br><br>==>
       ${playerProfiles[currPlayerIndex].name}
       , you'll play first. Click submit to deal cards and see your cards`;
    }

    var prevPlayerIndex = currPlayerIndex;
    // Increase currentPlayerIndex so that it points at the next player in playerProfiles
    currPlayerIndex += 1;
    return ` ${playerProfiles[prevPlayerIndex].name}, you've chosen to bet ${playerProfiles[prevPlayerIndex].bet} dollars. ${playerProfiles[currPlayerIndex].name}, please enter your bet.`;
  }

  // Mode to deal cards out to players and computer
  if (mode == GAME_MODE_DEAL_CARDS) {
    // Shuffle a deck and assign it to deck
    deck = shuffleCards(makeDeck());
    // Deal cards to all all players and computer
    dealCardsToPlayersAndComputer();
    // Change mode to progress the game
    mode = GAME_MODE_Check_BJ;
  }

  // The cards are analyzed for any game winning conditions. (Blackjack)
  // Mode to scan for blackjack in user's hand
  if (mode == GAME_MODE_Check_BJ) {
    // If player has Blackjack, inform them and end the turn
    if (isBlackjack(playerProfiles[currPlayerIndex].hand)) {
      // Craft an output msg to inform player of Blackjack
      var myOutputValue = `
      ${playerProfiles[currPlayerIndex].name}
      has a Blackjack! Player will win if computer/dealer does not also have a Blackjack.<br>
      ${getDefaultOutput()} <br> ${blackJackImg} `;

      // End curr player's turn: Cue next player to play, else cue computer's turn if currPlayer is the last player
      endCurrPlayerTurn();

      return myOutputValue;
    }
    /// If no one has a blackjack, change mode to progress game
    mode = GAME_MODE_HIT_STAND;

    // Display card to user and prompt them to hit or stand
    return `${getDefaultOutput()} <br><br>
      ==> Please enter "hit" or "stand", then press Deal`;
  }

  //Mode where user must decide whether to hit or stand.
  if (mode == GAME_MODE_HIT_STAND) {
    // Validate input to ensure either 'hit' or 'stand
    if (input !== "hit" && input !== "stand") {
      return '==> Please input either "hit" or "stand" as possible moves in Blackjack';
    }
    // Get the default output that is relevant if player stands
    var defaultOutput = getDefaultOutput();
    // Get the instructions on the next steps
    var instructionsForNextSteps = NextSteps();

    if (input == "hit") {
      // Deal a card to the player
      dealCardToHand(playerProfiles[currPlayerIndex].hand);

      // Update the default output since player drew a card
      defaultOutput = getDefaultOutput();

      // If bust, show player that they bust
      if (getHandSum(playerProfiles[currPlayerIndex].hand) > sumLimit) {
        // Display info to player that he has busted
        myOutputValue = `${playerProfiles[currPlayerIndex].name} 
        has busted. <br> ${defaultOutput} 
        <br><br>==> ${instructionsForNextSteps}`;

        // End the player's turn
        endCurrPlayerTurn();

        return myOutputValue;
      }
      // If player did not bust, show them their hand and prompt them to hit or stand
      return `${defaultOutput}
      <br> Please enter "hit" to draw another card, or "stand" to end your turn.`;
    }
    // Handle 'stand'
    if (input == "stand") {
      // If all other players have played
      if (currPlayerIsLastPlayer()) {
        // Set an output value
        var myOutputValue = `${playerProfiles[currPlayerIndex].name}'s chosen to stand. ${defaultOutput} 
        <br>==> ${instructionsForNextSteps}`;

        // End the current players turn
        endCurrPlayerTurn();

        return myOutputValue;
      }
      // else, other players have not played; move to the next player
      // Set an output message
      var myOutputValue = `You've chosen to stand. <br> 
      ${defaultOutput} 
      <br><br> ==> ${
        playerProfiles[currPlayerIndex + 1].name
      }, click submit to see your cards. <br>`;
      // End the current player's turn
      endCurrPlayerTurn();
      //Return the message to the user
      return myOutputValue;
    }
  }

  // Check if computer has blackjack
  if (isBlackjack(dealerHand)) {
    // Change the mode
    mode = GAME_MODE_RESULTS;
    // Inform all players that computer wins
    return `Computer has a Blackjack and wins all players! <br>
      ${displayDealerFullHand()}
      <br><br>==> Click submit to see results`;
  }

  if (mode == GAME_MODE_RESULTS) {
    // Get the game's results in the form of a string
    var gameResults = getGameResults();
    // Eliminate the players with 0 points left
    var eliminatedPlayers = getEliminatedPlayers();
    // Identify which players are still playing
    var remainingPlayers = getRemainingPlayers();
    // If all players have been eliminated, display the results and  prompt users to refresh screen to play again
    if (remainingPlayers.length < 1) {
      gameOver = true;
      return (
        gameResults +
        "<br>" +
        displayEliminatedPlayers(eliminatedPlayers) +
        "<br><br>" +
        "==> There are no remaining players. Please hit refresh to play again"
      );
    }
    // If there are still players remaining, replace playerProfiles with the remaining players' profiles
    playerProfiles = remainingPlayers;

    // reset the game so that the players continue by submitting bets
    restartFromBets();

    // Display the results from the current game
    return `${gameResults} 
    <br> ${displayEliminatedPlayers(eliminatedPlayers)}
    <br><br>==> ${playerProfiles[0].name}
    , enter your bet to begin the new round.
    `;
  }
  // Else if computer does not have a blackjack, it has to decide to hit or stand.
  var dealerHandSum = getHandSum(dealerHand);

  // Computer hits if sum less than or equal to dealer hit threshold
  if (dealerHandSum <= dealerHitThreshold) {
    dealCardToHand(dealerHand);
    // Update computer hand sum after dealing new card
    dealerHandSum = getHandSum(dealerHand);
    // If computer busts
    if (didDealerBust()) {
      // Change mode so that results will be displayed next
      mode = GAME_MODE_RESULTS;
      // Inform players of the bust
      return `Dealer has busted and loses. <br> ${displayDealerFullHand()} 
        <br><br>==> Click submit to see results `;
    }
    // Else computer has not busted.
    return `Dealer chose to hit. <br> ${displayDealerFullHand()}
      <br><br>==> Click submit to see computer's next move.`;
  }

  // Otherwise, computer stands
  // get the game results
  mode = GAME_MODE_RESULTS;
  return `Dealer chose to stand. <br> ${displayDealerFullHand()}
    <br><br>==> Click submit to see results`;
};
