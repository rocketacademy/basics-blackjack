/*============================
======GLOBAL VARIABLES========
=============================*/
var MODE_QUERY_PLAYER_NAME = 'MODE_QUERY_PLAYER_NAME';
var MODE_SCAN_FOR_BLACKJACK = 'MODE_SCAN_FOR_BLACKJACK';
var MODE_CHOOSE_NUM_PLAYERS = 'MODE_CHOOSE_NUM_PLAYERS';
var MODE_CHOOSE_NUM_PLAYERS = 'MODE_CHOOSE_NUM_PLAYERS';
var MODE_HIT_OR_STAND = 'MODE_HIT_OR_STAND';
var MODE_COLLECT_BET = 'MODE_COLLECT_BET';
var MODE_DEAL_CARDS = 'MODE_DEAL_CARDS';

// Store player's cards and computer's cards in separate arrays
// var playerHand = [];
var computerHand = [];
var mode = MODE_CHOOSE_NUM_PLAYERS;

// set a var that controls the index of the playerProfile that is currently playing the game. Start at 0 since arrays are 0 indexed
var currPlayerIndex = 0;

// The maximum valid sum in Blackjack is 21.
var sumLimit = 21;
// Dealer always hits until she reaches a sum greater than 16.
var dealerHitThreshold = 16;
// If player has chosen to stand, then player can no longer hit until game is over
var playerHasChosenToStand = false;
// Keep track of when the game ends to prevent further moves
var gameOver = false;

// Track num of players
var numPlayers = 0;

// Set an array that will contains details about each player (i.e. an array of objects)
var playerProfiles = [];

/*============================
======HELPER FUNCTIONS========
=============================*/

// ------Helper functions taken from unit 10.3-----
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

// ------New Helper Functions-----

// Deal a card to the given hand
var dealCardToHand = function (hand) {
  hand.push(deck.pop());
};

/** Get sum of cards in hand
 * @param {Array} hand A player or computer's hand
 * @returns {number} The sum of the cards's value in a given hand
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
 * @returns {Boolean} True if black jack detected, else False
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
  Computer's hand: ${convertHandToString(computerHand)} <br>
  Sum: ${getHandSum(computerHand)}`;
};

/** Create profiles for each player
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

/** Deal cards to player and computer, one
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

/** Handle bet win
 * @returns {Array} Array of players who have a black jack
 */
var handleBetWin = function (isBlackjack) {
  // Increase the points by a multiplier
  // If player wins with a blackjack, multiplier is 1.5 times of betted amt
  var winAmt = playerProfiles[currPlayerIndex].bet;
  if (isBlackjack == true) {
    winAmt = playerProfiles[currPlayerIndex].bet * 1.5;
    playerProfiles[currPlayerIndex].points += winAmt;
    return winAmt;
  }
  // else player did not win with blackjack, multiplier is 1 times of the betted amt
  playerProfiles[currPlayerIndex].points += winAmt;
  return winAmt;
};

var handleBetLose = function () {
  // Decrease the points by the amount betted
  playerProfiles[currPlayerIndex].points -= playerProfiles[currPlayerIndex].bet;
  // Return the amount of money that the playerProfiles[currPlayerIndex] lost
  return playerProfiles[currPlayerIndex].bet;
};

var craftInstructionsForNextSteps = function () {
  // If the last player is playing, it's the end of the current game. Press refresh to start again
  if (playerProfiles[currPlayerIndex].id == numPlayers) {
    return 'Press refresh to play again';
  }
  // If the last player is not playing, cue the next person is play
  return (
    "It's " +
    playerProfiles[currPlayerIndex + 1].name +
    's turn next. Click submit to continue'
  );
};

/** End a players turn by resetting relevant global variables and changing to an appropriate mode
 */
var endCurrPlayerTurn = function () {
  // Start a new round-- change mode and reset currPlyerIndex
  if (playerProfiles[currPlayerIndex].id == numPlayers) {
    // Change mode to progress the game
    mode = MODE_SCAN_FOR_BLACKJACK;
    // reset playerHasChosenToStand
    playerHasChosenToStand = !playerHasChosenToStand;
    // Point the current player to first player
    currPlayerIndex = 0;
    return;
  }

  // else if current player is not the last player
  // Reset the playerHasChosenToStand to false
  playerHasChosenToStand = false;

  // Change mode to progress the game
  mode = MODE_SCAN_FOR_BLACKJACK;
  // Move to the next player by incrementing the currPlayerIndex
  currPlayerIndex += 1;
};

/*============================
=======Main function==========
=============================*/
var main = function (input) {
  //If a gameOver is true, display a message to prompt user to refresh the screen
  if (gameOver) {
    return 'The game is over. Please refresh to play again.';
  }

  // Mode to get user input on no. of players
  if (mode == MODE_CHOOSE_NUM_PLAYERS) {
    // validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return 'Please enter a number larger than 0';
    }
    // Convert user input from string to number, and assign it to the global var tracking the number of dice users have chosen to play with
    numPlayers = Number(input);

    //Progress game to next mode
    mode = MODE_QUERY_PLAYER_NAME;
    // Output a msg about the number of players the user has chosen
    return (
      'There are ' +
      numPlayers +
      ' players in this game. Player 1, please enter your name to begin.'
    );
  }

  // Mode to get player names
  if (mode == MODE_QUERY_PLAYER_NAME) {
    // For each of the players, get their name and create a player profile based on the name

    // Prompt user again if input field was empty. The trim() method allows removes empty spaces before and after a word. Hence if the user inputs a series of empty spaces, it be trimemed to a single space i.e. ''
    if (input.trim() == '') {
      return 'Please input your name to begin';
    }
    // Assign input to a var called playerName to make it more descriptive
    playerName = input;

    // Create a player profile with this name
    createPlayerProfiles(playerName);

    // If the last player has entered his name, prompt players to start entering bets.
    if (playerProfiles[currPlayerIndex].id == numPlayers) {
      // change the mode
      mode = MODE_COLLECT_BET;

      // reset currPlayer Index;
      currPlayerIndex = 0;

      // Create an output message
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

    // Else the last player has not keyed in their name. Prompt them to do so.
    var myOutputValue =
      'Welcome, ' +
      playerProfiles[currPlayerIndex].name +
      '. Player ' +
      (playerProfiles[currPlayerIndex].id + 1) +
      ', please enter your name. ';

    // increase the currentPlayerIndex
    currPlayerIndex += 1;

    // Output the msg
    return myOutputValue;
  }

  // Mode to collect user input on their bet amount
  if (mode == MODE_COLLECT_BET) {
    // validate that user has provided an an integer larger than 0
    if (isNaN(input) == true || !Number(input) > 0) {
      return 'Please enter a number larger than 0';
    }

    // validate that the bet amount is not larger than the amount of points this player has
    if (input > playerProfiles[currPlayerIndex].points) {
      return (
        playerProfiles[currPlayerIndex].name +
        ', you have ' +
        playerProfiles[currPlayerIndex].points +
        ' points. Please enter an amount less than or equal to this. '
      );
    }

    // Assign the bet to the current player
    playerProfiles[currPlayerIndex].bet = Number(input);

    //If this is the final player output a msg to cue player 1 to start playing
    if (playerProfiles[currPlayerIndex].id == numPlayers) {
      //Progress game to next mode
      mode = MODE_DEAL_CARDS;

      // Set currPlayerIndex back to 0 so that he/she is the next player
      currPlayerIndex = 0;

      // Prompt user to click submit
      return (
        playerProfiles[playerProfiles.length - 1].name +
        ", you've chosen to bet " +
        playerProfiles[playerProfiles.length - 1].bet +
        ' points. <br><br>' +
        playerProfiles[currPlayerIndex].name +
        ", you'll play first. Click submit to deal cards and see your cards"
      );
    }

    // Else there are still players who have not entered their bet. Acknowledge the current player's bet and invite the next player to enter their bet.
    var myOutputValue =
      playerProfiles[currPlayerIndex].name +
      ", you've chosen to bet " +
      playerProfiles[currPlayerIndex].bet +
      ' points. ' +
      playerProfiles[currPlayerIndex + 1].name +
      ', please enter your bet.';

    // Increase the currPlayerIndex
    currPlayerIndex += 1;

    return myOutputValue;
  }

  // Mode to deal cards out to players and computer
  if (mode == MODE_DEAL_CARDS) {
    // Deal cards to all all players and computer
    dealCardsToPlayersAndComputer();
    mode = MODE_SCAN_FOR_BLACKJACK;
  }

  // Mode to play the game
  if (mode === MODE_SCAN_FOR_BLACKJACK) {
    // The cards are analyzed for Blackjack

    // If computer has Blackjack, computer auto wins because computer is dealer
    if (isBlackjack(computerHand)) {
      //Deduct player points for losing.
      var pointsLost = handleBetLose(playerProfiles[currPlayerIndex]);

      // Computer wins, return
      var myOutputValue = `${getDefaultOutput()} <br>
        Computer has Blackjack and wins. ${
          playerProfiles[currPlayerIndex].name
        }, you lost ${pointsLost} points.<br><br>
        Your current points: ${playerProfiles[currPlayerIndex].points} <br>
        ${craftInstructionsForNextSteps()}`;

      // End curr player's turn by incrementing currPlayerIndex
      endCurrPlayerTurn();

      return myOutputValue;
    }

    // If player has Blackjack and computer does not, player wins
    if (isBlackjack(playerProfiles[currPlayerIndex].hand)) {
      // handle winning the bet
      var pointsWon = handleBetWin(playerProfiles[currPlayerIndex], true);

      // current player wins, create an output value to inform users
      var myOutputValue = `${getDefaultOutput()} <br>
      ${
        playerProfiles[currPlayerIndex].name
      } has Blackjack and wins ${pointsWon} points. <br> Your current points: ${
        playerProfiles[currPlayerIndex].points
      } <br> ${craftInstructionsForNextSteps()}`;

      // End curr player's turn by incrementing
      endCurrPlayerTurn();

      return myOutputValue;
    }

    // Change mode to progress game
    mode = MODE_HIT_OR_STAND;

    // Change the mode to progress the game
    // The cards are displayed to the user.
    return `${getDefaultOutput()} <br>
      Please enter "hit" or "stand", then press Submit`;
  }

  if (mode == MODE_HIT_OR_STAND) {
    // Then begins a new action, where the user has to decide something: do they hit or stand.
    if (!playerHasChosenToStand) {
      // If user input is neither "hit" nor "stand" prompt user
      // Validate input to ensure either 'hit' or 'stand
      if (input !== 'hit' && input !== 'stand') {
        return 'Please input either "hit" or "stand" as possible moves in Blackjack';
      }
      // Handle 'hit'
      if (input === 'hit') {
        dealCardToHand(playerProfiles[currPlayerIndex].hand);

        // If bust, show player that she busts
        if (getHandSum(playerProfiles[currPlayerIndex].hand) > sumLimit) {
          // gameOver = true;
          // Handle losing the bet. The function returns the num of points that were lost
          var pointsLost = handleBetLose(playerProfiles[currPlayerIndex]);
          var myOutputValue = `${getDefaultOutput()} <br> 
          ${
            playerProfiles[currPlayerIndex].name
          } has busted and loses ${pointsLost} points.<br> Your current points: ${
            playerProfiles[currPlayerIndex].points
          } <br> ${craftInstructionsForNextSteps()}`;

          // End curr player's turn by incrementing
          endCurrPlayerTurn();

          return myOutputValue;
        }
      }
      // Handle 'stand'
      if (input == 'stand') {
        playerHasChosenToStand = true;
      }
    }

    // The computer also decides to hit or stand.
    // Computer hits if sum less than or equal to dealer hit threshold
    // Otherwise, computer stays
    var computerHandSum = getHandSum(computerHand);

    if (computerHandSum <= dealerHitThreshold) {
      dealCardToHand(computerHand);
      // Update computer hand sum after dealing new card
      computerHandSum = getHandSum(computerHand);
    }
    // If bust, show computer that she busts
    if (computerHandSum > sumLimit) {
      // gameOver = true;
      // Handle bet win
      var pointsWon = handleBetWin(playerProfiles[currPlayerIndex], false);
      var myOutputValue = `${getDefaultOutput()} <br>
            Computer has busted and loses. ${
              playerProfiles[currPlayerIndex].name
            }, you won ${pointsWon}. <br> Your points:  ${
        playerProfiles[currPlayerIndex].points
      } <br>${craftInstructionsForNextSteps()}`;

      // End curr player's turn by incrementing
      endCurrPlayerTurn();

      return myOutputValue;
    }

    // If player and computer have both not busted and chosen to stand, decide who wins
    if (playerHasChosenToStand && computerHandSum > dealerHitThreshold) {
      // The game is always over after this point
      // gameOver = true  ;

      // If player hand sum is greater than computer hand sum, player wins!
      if (getHandSum(playerProfiles[currPlayerIndex].hand) > computerHandSum) {
        // Handle bet win
        var pointsWon = handleBetWin(playerProfiles[currPlayerIndex]);

        var myOutputValue = `${getDefaultOutput()} <br>
        ${
          playerProfiles[currPlayerIndex].name
        } wins ${pointsWon} points! Your points: ${
          playerProfiles[currPlayerIndex].points
        } <br> ${craftInstructionsForNextSteps()}`;
        // End curr player's turn by incrementing
      } else {
        // Else, computer wins
        var pointsLost = handleBetLose(playerProfiles[currPlayerIndex]);
        var myOutputValue = `${getDefaultOutput()} <br>
        Computer wins! ${
          playerProfiles[currPlayerIndex].name
        }, you lost ${pointsLost} points. <br> ${craftInstructionsForNextSteps()}`;
      }
      endCurrPlayerTurn();

      return myOutputValue;
    }

    if (playerHasChosenToStand) {
      return `${getDefaultOutput()} <br>Click submit to see the computer's next move.`;
    } else {
      return `${getDefaultOutput()} <br>
      Please enter "hit" or "stand". <br>      `;
    }
  }
};
