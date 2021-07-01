/*============================
======GLOBAL VARIABLES========
=============================*/

var MODE_CHOOSE_NUM_PLAYERS = 'MODE_CHOOSE_NUM_PLAYERS';
var MODE_QUERY_PLAYER_NAME = 'MODE_QUERY_PLAYER_NAME';
var MODE_COLLECT_BET = 'MODE_COLLECT_BET';
var MODE_DEAL_CARDS = 'MODE_DEAL_CARDS';
var MODE_SCAN_FOR_BLACKJACK = 'MODE_SCAN_FOR_BLACKJACK';
var MODE_HIT_OR_STAND = 'MODE_HIT_OR_STAND';
var MODE_COMPUTER_PLAYS = 'MODE_COMPUTER_PLAYS';
var MODE_DISPLAY_RESULTS = 'MODE_DISPLAY_RESULTS';
// Set the starting mode
var mode = MODE_CHOOSE_NUM_PLAYERS;

// Store players' details (e.g. name, hand, bet) in an array of objects
var playerProfiles = [];

// Store computer's cards in an array
var computerHand = [];

// set a var that points to the current player within the playerProfile array. The pointer/index starts at 0 since arrays are 0 indexed
var currPlayerIndex = 0;

// The maximum valid sum in Blackjack is 21.
var sumLimit = 21;

// Dealer always hits until she reaches a sum greater than 16.
var dealerHitThreshold = 16;

// Determine whether the computer's card has been revealed
var isComputerCardHidden = true;

// Keep track of when the game ends to prevent further moves
var gameOver = false;

// Track num of players that the game starts with
var initialNumOfPlayers = 0;

// Store the deck in an array
var deck = [];

/*============================
======HELPER FUNCTIONS========
=============================*/

// ------Helper functions taken from unit 10.3-----
/** Make a deck of cards
 */
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];
  var suits = ['♥️', '♦️', '♠️', '♣️'];
  // var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};

/** Get a random number within a specified range of possibilities starting from 0
 * @param {number} size The upper bound that constrains the range of possible integers generated
 */
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

/** Shuffle a deck of cards
 * @param {array} cards A deck of cards
 * @returns A shuffled deck of the cards that were provided
 */
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

// ------New Helper Functions-----

// Deal a card to the given hand
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

/** Get sum of cards in hand
 * @param {Array} hand A player or computer's hand
 * @returns {number} The sum of the cards' value in a given hand
 **/
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    // If card rank is 2-10, value is same as rank
    if (currCard.rank >= 2 && currCard.rank <= 10) {
      sum += currCard.rank;
      // If card rank is 11-13, i.e. Jack, Queen, or King, value is 10
    } else if (currCard.rank >= 11 && currCard.rank <= 13) {
      sum += 10;
      // If card is Ace, value is 11 by default
    } else if (currCard.rank === 1) {
      numAcesInHand += 1;
      sum += 11;
    }
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

/**Return whether the hand contains a Blackjack combination
 * @param {Array} hand
 * @returns {Boolean} True if Blackjack detected, else False
 */
var isBlackjack = function (hand) {
  return hand.length === 2 && getHandSum(hand) === sumLimit;
};

/** Convert hand to a string where objects within the array are stringified
 * @param {Array} hand
 * @returns {String} A string displaying card names in a given hand e.g. [6,2]. Note that while there are square brackets, the output is not an array because the square brackets are of type String.
 */
var convertHandToString = function (hand) {
  // The map function takes a function F as input, and returns a new array A_new after applying
  // F to each element e_orig in the original array A_orig. F takes e_orig as input and F's
  // return value is e_new, the element at the same index as e_orig in A_new.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  // Arrow function syntax (i.e. "=>") is a shorthand function syntax in JS.
  // The equivalent function in traditional function syntax would be:
  // function (card) {
  //   return card.name;
  // }
  return hand.map((card) => ` [${card.name} of ${card.suit}]`);
};

/** Create output that displays player and computer's output, as well as total hand value
 * @returns {String}
 */
var getDefaultOutput = function () {
  return `${playerProfiles[currPlayerIndex].name}'s hand: <br>
  ${convertHandToString(playerProfiles[currPlayerIndex].hand)} <br>
  Sum: ${getHandSum(playerProfiles[currPlayerIndex].hand)} 
  <br><br>
  Computer's first card: ${convertHandToString([computerHand[0]])} <br>
  Sum: ${getHandSum([computerHand[0]])}`;
};

/** Display all the computer's cards to the user
 * @returns {string}
 */
var displayComputerFullHand = function () {
  return `Computer's hand: ${convertHandToString(computerHand)}<br>
  Sum: ${getHandSum(computerHand)}`;
};

/** Create a profile for each player
 * @param {string} playerName A string containing the name that a player identifies with
 */
var createPlayerProfiles = function (playerName) {
  playerProfiles.push({
    id: currPlayerIndex + 1,
    name: playerName,
    hand: [],
    bet: 0,
    points: 100,
  });
};

/** Deal cards to player and computer
 */
var dealCardsToPlayersAndComputer = function () {
  for (var j = 0; j < 2; j += 1) {
    // Iterate thru playerProfiles, deal 1 cards to each player's hand
    for (var i = 0; i < playerProfiles.length; i += 1) {
      dealCardToHand(playerProfiles[i].hand);
    }
    dealCardToHand(computerHand);
  }
};

/** Calculate a player's winnings from winning a bet
 * @param {object} player A given player's profile
 * @returns {number} The amount won by a given player
 */
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

/** Calculate a player losses a player incurs from losing a bet
 * @param {object} player A given player's profile
 * @returns {number} The amount lost by a given player
 */
var calcBetLosses = function (player) {
  // return the amount lost
  return player.bet;
};

/** Create a string that cues the next person to play. If there are no other players, cue user that computer will be playing next
 * @returns {string} Directions about what happens next
 */
var craftInstructionsForNextSteps = function () {
  // If the last player is playing, it's the end of the current game. Press refresh to start again
  if (currPlayerIsLastPlayer()) {
    return "All players have played. Next, click submit to see computer's cards";
  }
  // If the last player is not playing, cue the next person is play
  return (
    "It's " +
    playerProfiles[currPlayerIndex + 1].name +
    's turn next. Click submit to continue'
  );
};

/** Empty computer's and all players' hand
 */
var emptyAllHands = function () {
  // Empty the players' hand
  for (var i = 0; i < playerProfiles.length; i += 1) {
    // replace each player's hand with an empty array
    playerProfiles[i].hand = [];
  }
  // empty the computer hand
  computerHand = [];
};

/** End a players turn by resetting relevant global variables and changing to an appropriate mode
 */
var endCurrPlayerTurn = function () {
  // Start a new round-- change mode and reset currPlayerIndex
  if (currPlayerIsLastPlayer()) {
    // Change mode to progress the game
    mode = MODE_COMPUTER_PLAYS;
    // Point the current player to first player
    currPlayerIndex = 0;
    return;
  }
  // Increase currPlayerIndex to point at the next player in playerProfiles
  currPlayerIndex += 1;
  // Change mode to progress the game
  mode = MODE_SCAN_FOR_BLACKJACK;
};

/** Determine if current player is the last player in the playerProfiles array
 * @returns {boolean} true if curent player is the last player
 */
var currPlayerIsLastPlayer = function () {
  // The current player is the last player if the currPlayerIndex is equal to the length -1 (We deduct one to account for arrays be 0 indexed)
  return currPlayerIndex == playerProfiles.length - 1;
};

/** Determine if the computer busts its hand
 * @returns {boolean} true if the computer's hand's value exceeds the sumLimit
 */
var didComputerBust = function () {
  return getHandSum(computerHand) > sumLimit;
};

/** Display a summary of each player's performance in the current game
 * @returns {string} A list of each player's bet, winnings/losses, and remaining points. Also cues first player to enter bet
 */
var getGameResults = function () {
  // Set a preamble
  var gameResults = 'Results: <br>';
  // Handle scenario  where computer busts
  if (didComputerBust()) {
    // Iterate thru all players
    for (var i = 0; i < playerProfiles.length; i += 1) {
      var currPlayer = playerProfiles[i];
      var listIndex = i + 1;
      // If the player also busted, they lose their bet
      if (getHandSum(currPlayer.hand) > sumLimit) {
        // Calculate how much the player lost
        var amtLost = calcBetLosses(currPlayer);
        // Subtract the bet from the player's points
        currPlayer.points -= amtLost;
        gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Delta: - ${currPlayer.bet} points. || Total points: ${currPlayer.points}<br>`;
        continue;
      }
      // Else the computer busts but the player did not: Player wins.
      // Calculate the player winnings
      var amtWon = calcBetWinnings(currPlayer);
      //  Add the winnings to the player's points
      currPlayer.points += amtWon;
      // Update the string that will be printed
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Delta: + ${amtWon} points. || Total points: ${currPlayer.points}<br>`;
    }
    // Return the string of results
    return gameResults;
  }

  // If computer did not bust, it could have won; check if it won by blackjack. If so, all players lose their bets
  if (isBlackjack(computerHand)) {
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
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Delta: - ${currPlayer.bet} points. || Total points: ${currPlayer.points}<br>`;
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
      currPlayer.points -= amtLost;
      // Append results to existing gameResults String
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Delta: - ${currPlayer.bet} points. || Total points: ${currPlayer.points}<br>`;
    }
    // If player did not bust, player wins if their hand's sum >computer's hand sum
    else if (getHandSum(currPlayer.hand) > getHandSum(computerHand)) {
      // Calculate the player's winnings
      var amtWon = calcBetWinnings(currPlayer);
      // Add winnings to player's points
      currPlayer.points += amtWon;
      gameResults += `${listIndex}. ${currPlayer.name}- Bet: ${currPlayer.bet} || Delta: + ${amtWon} points. || Total points: ${currPlayer.points}<br>`;
    } else {
      // In all other scenarios, computer wins
      // Calculate the player's losses
      var amtLost = calcBetLosses(currPlayer);
      // Subtract the losses from the player's points
      currPlayer.points -= amtLost;
      // Append results to existing gameResults String
      gameResults += `${listIndex}. ${currPlayer.name} - Bet: ${currPlayer.bet} || Delta: - ${currPlayer.bet} points. || Total points: ${currPlayer.points}<br>`;
    }
  }
  return gameResults;
};

/** After each round, reset the necessary variables so that players can continue playing by entering their bet
 */
var restartFromBets = function () {
  // Empty each player's hand
  emptyAllHands();
  // Change mode to collect bets
  mode = MODE_COLLECT_BET;
  // reset currPlayerIndex so that the first person in playerProfiles plays first
  currPlayerIndex = 0;

  isComputerCardHidden = true;
};

/** Identify which players have been eliminated for having <1 point.
 * @returns {array} An array of playerProfiles that are eliminated
 */
var getEliminatedPlayers = function () {
  /* The .filter method returns a NEW array of elements that meet the specified criteria 
  (i.e. where each player has more than 1 point, in our case below)
  More info here: https://www.w3schools.com/jsref/jsref_filter.asp */
  var criterionToEliminate = function (player) {
    return player.points < 1;
  };
  return playerProfiles.filter(criterionToEliminate);
};

/** Identify which players are still in the game  i.e. they have >1 points
 * @returns {array} An array of playerProfiles still in the game
 */
var getRemainingPlayers = function () {
  /* The .filter method returns a NEW array of elements that meet the specified criteria 
  (i.e. where each player has more than 1 point, in our case below)
  More info here: https://www.w3schools.com/jsref/jsref_filter.asp */
  var criterionToRemain = function (player) {
    return player.points > 0;
  };
  return playerProfiles.filter(criterionToRemain);
};

/** Display which players were eliminated
 * @param {array} eliminatedPlayersArray
 * @returns {string} A list of which players were eliminated this round
 */
var displayEliminatedPlayers = function (eliminatedPlayersArray) {
  // Set a preamble that is of datatype String
  var outputMsg = `Players with 0 points and thus will be eliminated:`;

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

/*============================
=======Main function==========
=============================*/
var main = function (input) {
  //If a gameOver is true, display a message to prompt user to refresh the screen
  if (gameOver) {
    return 'The game is over. Please refresh to play again.';
  }

  // Mode for user to indicate the number of players
  if (mode == MODE_CHOOSE_NUM_PLAYERS) {
    // Validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return 'Please enter a number larger than 0';
    }
    // Convert user input from string to number, and assign it to the global var tracking the number of dice users have chosen to play with
    initialNumOfPlayers = Number(input);

    //Progress game to next mode
    mode = MODE_QUERY_PLAYER_NAME;
    // Output a msg about the number of players the user has chosen
    return `There are ${initialNumOfPlayers} players in this game. Player 1, please enter your name to begin.`;
  }

  // Mode to get player names
  if (mode == MODE_QUERY_PLAYER_NAME) {
    // Validate if user provided a name. Prompt user again if input field was empty.
    // The trim() method allows removes empty spaces before and after a word. Hence if the user inputs a series of empty spaces, it be trimemed to a single space i.e. ''
    if (input.trim() == '') {
      return 'Please input your name to begin';
    }
    // Assign input to a more descriptive variable name
    playerName = input;

    // Create a player profile with the given name
    createPlayerProfiles(playerName);

    // Based on the indicated number of players, determine if all players have submitted their names. If so:
    if (playerProfiles[currPlayerIndex].id == initialNumOfPlayers) {
      // change the mode
      mode = MODE_COLLECT_BET;

      // reset currPlayer Index;
      currPlayerIndex = 0;

      // output a message that welcomes the latest player and cues first player to enter a bet
      return (
        'Welcome, ' +
        playerProfiles[playerProfiles.length - 1].name +
        '. <br><br>' +
        playerProfiles[0].name +
        ', you have ' +
        playerProfiles[0].points +
        ' points.<br> Please enter a bet.'
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
  if (mode == MODE_COLLECT_BET) {
    // Validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return 'Please enter a number larger than 0';
    }

    // Validate that the bet amount is not larger than the amount of points this player has
    if (input > playerProfiles[currPlayerIndex].points) {
      return `${playerProfiles[currPlayerIndex].name}, you have ${playerProfiles[currPlayerIndex].points} points. Please enter an amount less than or equal to this.`;
    }
    // update player's profile with the betted amount
    playerProfiles[currPlayerIndex].bet = Number(input);

    //If all players have submitted their bets, cue player 1 to start playing
    if (currPlayerIsLastPlayer()) {
      //Progress game to next mode
      mode = MODE_DEAL_CARDS;

      // Reset currPlayerIndex back to 0 so that he/she is the next player
      currPlayerIndex = 0;

      return ` 
        ${playerProfiles[playerProfiles.length - 1].name}
        , you've chosen to bet 
        ${playerProfiles[playerProfiles.length - 1].bet} 
       points. 
       <br><br>==>
       ${playerProfiles[currPlayerIndex].name}
       , you'll play first. Click submit to deal cards and see your cards`;
    }

    // Else, some players have not submitted their bet. Acknowledge the current player's bet and invite the next player to enter their bet.
    // Assign current player's index to prevPlayrIndex
    var prevPlayerIndex = currPlayerIndex;
    // Increase currentPlayerIndex so that it points at the next player in playerProfiles
    currPlayerIndex += 1;
    return ` ${playerProfiles[prevPlayerIndex].name}, you've chosen to bet ${playerProfiles[prevPlayerIndex].bet} points. ${playerProfiles[currPlayerIndex].name}, please enter your bet.`;
  }

  // Mode to deal cards out to players and computer
  if (mode == MODE_DEAL_CARDS) {
    // Shuffle a deck and assign it to deck
    deck = shuffleCards(makeDeck());
    // Deal cards to all all players and computer
    dealCardsToPlayersAndComputer();
    // Change mode to progress the game
    mode = MODE_SCAN_FOR_BLACKJACK;
  }

  // Mode to scan for blackjack in user's hand
  if (mode === MODE_SCAN_FOR_BLACKJACK) {
    // If player has Blackjack, inform them and end the turn
    if (isBlackjack(playerProfiles[currPlayerIndex].hand)) {
      // Craft an output msg to inform player of Blackjack
      var myOutputValue = `
      ${playerProfiles[currPlayerIndex].name}
      has a Blackjack! Player will win if computer/dealer does not also have a Blackjack.<br>
      ${getDefaultOutput()} 
      <br><br>==>  ${craftInstructionsForNextSteps()}`;

      // End curr player's turn: Cue next player to play, else cue computer's turn if currPlayer is the last player
      endCurrPlayerTurn();

      return myOutputValue;
    }
    // If no one has a blackjack, change mode to progress game
    mode = MODE_HIT_OR_STAND;

    // Display card to user and prompt them to hit or stand
    return `${getDefaultOutput()} <br><br>
      ==> Please enter "hit" or "stand", then press Submit`;
  }

  // Mode where user must decide whether to hit or stand.
  if (mode == MODE_HIT_OR_STAND) {
    // Validate input to ensure either 'hit' or 'stand
    if (input !== 'hit' && input !== 'stand') {
      return '==> Please input either "hit" or "stand" as possible moves in Blackjack';
    }
    // Get the default output that is relevant if player stands
    var defaultOutput = getDefaultOutput();
    // Get the instructions on the next steps
    var instructionsForNextSteps = craftInstructionsForNextSteps();

    // Handle 'hit'
    if (input == 'hit') {
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
    if (input == 'stand') {
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

  if (mode == MODE_COMPUTER_PLAYS) {
    if (isComputerCardHidden) {
      // Set to false so that this doesn't appear when main runs again
      isComputerCardHidden = false;

      return `Computer's cards are: <br> ${displayComputerFullHand()}.
      <br><br>==> Click submit to see computer's next move`;
    }

    // Check if computer has blackjack
    if (isBlackjack(computerHand)) {
      // Change the mode
      mode = MODE_DISPLAY_RESULTS;
      // Inform all players that computer wins
      return `Computer has a Blackjack and wins all players! <br>
      ${displayComputerFullHand()}
      <br><br>==> Click submit to see results`;
    }
    // Else if computer does not have a blackjack, it has to decide to hit or stand.
    var computerHandSum = getHandSum(computerHand);

    // Computer hits if sum less than or equal to dealer hit threshold
    if (computerHandSum <= dealerHitThreshold) {
      dealCardToHand(computerHand);
      // Update computer hand sum after dealing new card
      computerHandSum = getHandSum(computerHand);
      // If computer busts
      if (didComputerBust()) {
        // Change mode so that results will be displayed next
        mode = MODE_DISPLAY_RESULTS;
        // Inform players of the bust
        return `Computer has busted and loses. <br> ${displayComputerFullHand()} 
        <br><br>==> Click submit to see results `;
      }
      // Else computer has not busted.
      return `Computer chose to hit. <br> ${displayComputerFullHand()}
      <br><br>==> Click submit to see computer's next move.`;
    }

    // Otherwise, computer stands
    // get the game results
    mode = MODE_DISPLAY_RESULTS;
    return `Computer chose to stand. <br> ${displayComputerFullHand()}
    <br><br>==> Click submit to see results`;
  }
  if (mode == MODE_DISPLAY_RESULTS) {
    // Get the game's results in the form of a string
    var gameResults = getGameResults();
    // Eliminate the players with 0 points left
    var eliminatedPlayers = getEliminatedPlayers();
    // Identify which players are still playing
    var remainingPlayers = getRemainingPlayers();

    // If all players have been eliminated, display the results and  prompt users to refresh screen to play again
    if (remainingPlayers.length < 1) {
      gameOver = true;
      return `${gameResults} 
      <br> ${displayEliminatedPlayers(eliminatedPlayers)}
      <br><br>==> There are no remaining players. Please hit refresh to play again`;
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
};
