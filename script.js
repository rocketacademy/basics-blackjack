// Create scream case variables for strings
var NO_OF_PLAYERS = "number of players";
var NAMES = "names";
var BET = "bet";
var GAME_DEAL = "game deal";
var GAME_SPLIT_HAND = "game split hand";
var GAME_HIT_STAND = "game hit stand";
var GAME_REVEAL = "reveal";
var H = "H";
var S = "S";
var Y = "Y";
var N = "N";
var DONE = "done";
var WIN = "win";
var LOSE = "lose";
var DRAW = "draw";

// Create global variables
var gameMode = NO_OF_PLAYERS;
var players = [];
var playersOriginal = [];
var betsPlaced = [];
var splitChoice = ``;
var numberOfPlayers = ``;
var removedPlayers = [];
var blackjackPlayers = [];
var cardDeck = [];
var nextPlayer = ``;
var currentPlayer = ``;
var win = [];
var draw = [];
var lose = [];
var counter = 0;
var object = ``;

// Create functions for the following:
// To create an array of players
var createPlayers = function (numberOfPlayers) {
  var playerIndex = 0;
  while (playerIndex < Number(numberOfPlayers)) {
    var indivPlayer = {
      name: `player ${playerIndex}`,
    };
    players.push(indivPlayer);
    playerIndex += 1;
  }
  // Then add dealer as the final player
  var dealer = {
    name: `Dealer`,
  };
  players.push(dealer);
  console.log("players", players);
  return players;
};

// Check for duplicate names
var checkName = function (nameEntry) {
  var counter = 0;
  var unique = true;
  while (counter < numberOfPlayers) {
    if (nameEntry.toLowerCase() == players[counter].name.toLowerCase()) {
      unique = false;
    }
    counter += 1;
  }
  console.log("unique", unique);
  return unique;
};

// Make card deck
var makeDeck = function () {
  // Create empty array for card deck
  var cardDeck = [];
  // Create array for suit
  var suit = ["♥️", "♦️", "♣️", "♠️"];
  // Loop suit array
  var suitIndex = 0;
  while (suitIndex < suit.length) {
    var currentSuit = suit[suitIndex];
    // Within which, loop rank array
    var rankIndex = 1;
    while (rankIndex <= 13) {
      // Create cardname variable from rank index
      var cardName = rankIndex;
      if (cardName == 1) {
        cardName = "A";
      } else if (cardName == 11) {
        cardName = "J";
      } else if (cardName == 12) {
        cardName = "Q";
      } else if (cardName == 13) {
        cardName = "K";
      }
      var pointSystem = [rankIndex];
      if (cardName == "J" || cardName == "Q" || cardName == "K") {
        pointSystem = [10];
      }
      if (cardName == "A") {
        pointSystem = [1, 11];
      }
      // Create object within inner loop
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankIndex,
        point: pointSystem,
      };
      // Then store object into card deck array each time loop runs to create a full deck of cards
      cardDeck.push(card);
      // Incrememt index
      rankIndex += 1;
    }
    suitIndex += 1;
  }
  // Return the full card deck
  return cardDeck;
};

// Generate random index
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle cards
var shuffle = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    // Exchange card positions
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment index
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Deal 2 cards per player, including dealer
var deal = function (cardDeck, allPlayers) {
  var index = 0;
  while (index < allPlayers) {
    players[index].cards = cardDeck.splice(0, 2);
    console.log(`player ${index} cards`, players[index].cards);
    index += 1;
  }
  console.log("players", players);
  return players;
};

// Check if data is a number greater than 0
var checkNumber = function (data) {
  return !isNaN(Number(data)) && Number(data) > 0;
};

// Set players' names
var setNames = function (name) {
  var index = 0;
  while (index < players.length) {
    players[index].name = name;
    index += 1;
  }
  return players;
};

// Check if split hand option is available for the player
var checkSplitHand = function (playerIndex) {
  var twiceCurrentBet = Number(2) * Number(betsPlaced[playerIndex]);
  return (
    players[playerIndex].cards[0].name == players[playerIndex].cards[1].name &&
    Number(players[playerIndex].points) - Number(twiceCurrentBet) >= 0 &&
    splitChoice == ``
  );
};

// Split hand
var splitHand = function () {
  // Keep key info to restore for fresh round
  var keyInfo = {
    index: currentPlayer,
    name: players[currentPlayer].name,
  };
  playersOriginal.push(keyInfo);
  // Deep clone object without risking referencing issues
  object = JSON.parse(JSON.stringify(players[currentPlayer]));
  players.splice(Number(currentPlayer), 0, object);
  // Duplicate bets placed
  betsPlaced.splice(currentPlayer, 0, betsPlaced[currentPlayer]);
  // Rename player names
  var nextIndex = Number(currentPlayer) + Number(1);
  players[currentPlayer].name = players[currentPlayer].name + ` (Hand 1)`;
  players[nextIndex].name = players[nextIndex].name + ` (Hand 2)`;
  // Remove one card from each hand
  players[currentPlayer].cards[0] = ``;
  players[nextIndex].cards[1] = ``;
  // Add one card to each hand
  players[currentPlayer].cards[0] = cardDeck.pop();
  players[nextIndex].cards[1] = cardDeck.pop();
  return players;
};

// Update affected index in removedPlayers array
var updateRemovedPlayers = function () {
  var count = removedPlayers.length - 1;
  while (count >= 0) {
    if (removedPlayers[count] > currentPlayer) {
      removedPlayers[count] = Number(removedPlayers[count]) + Number(1);
    }
    count -= 1;
    if (count < 0) {
      return removedPlayers;
    }
  }
};

// Remove split in players array for fresh round (undo backwards)
var removeSplit = function () {
  var counter = playersOriginal.length - 1;
  while (counter >= 0) {
    var playerIndex = playersOriginal[counter].index;
    // Calculate overall available bet points
    var avgBetPt =
      (players[playerIndex].points + players[playerIndex + 1].points) / 2;
    // Delete one of the two duplicated objects
    players.splice(playerIndex, 1);
    // Rename player name back to original name
    players[playerIndex].name = playersOriginal[counter].name;
    // Update bet point to avgBetPoint
    players[playerIndex].points = avgBetPt;
    // Reset number of players
    numberOfPlayers = players.length - 1;
    // Reset counter
    counter -= 1;
  }
  return players;
};

// Find all possible totals for a player's cards
var findTotal = function (playerIndex) {
  var cardIndex = 0;
  var total = 0;
  var allTotals = [];
  var playerCard = players[playerIndex].cards;
  while (cardIndex < playerCard.length) {
    // Total the first possible point(s) (i.e. 1 for As) across cards
    total = Number(total) + Number(playerCard[cardIndex].point[0]);
    cardIndex += 1;
  }
  // Store this total
  allTotals.push(total);
  cardIndex = 0;
  // For every card,
  while (cardIndex < playerCard.length) {
    // If there are 2 possible points per card, generate new potential total
    if (playerCard[cardIndex].point.length == 2) {
      total = Number(total) + Number(10);
      // Store each new potential total
      allTotals.push(total);
    }
    cardIndex += 1;
  }
  return allTotals;
};

// Check if total card points is 21 (as long as ANY ONE item in the array is 21)
var checkEqual21 = function (allTotals) {
  var counter = 0;
  var check = ``;
  while (counter < allTotals.length) {
    if (allTotals[counter] != 21) {
      check = false;
      // Increment counter
      counter += 1;
    } else {
      check = true;
      // End loop so as not to overwrite check variable once 'true' is obtained
      counter = allTotals.length;
    }
  }
  return check;
};

// Check if total card points > 21 (only if ALL item(s) in the array is/are over 21)
var checkAbove21 = function (allTotals) {
  var counter = 0;
  var check = true;
  while (counter < allTotals.length) {
    // If any item in the total array is <= 21, then change from default to false
    if (allTotals[counter] <= 21) {
      check = false;
      // End loop once check is false
      counter = allTotals.length;
    }
    counter += 1;
  }
  return check;
};

// Check if total card points is > 16 (as long as ANY ONE item in the array is such)
var checkAbove16 = function (allTotals) {
  var counter = 0;
  var check = false;
  while (counter < allTotals.length) {
    if (allTotals[counter] > 16) {
      check = true;
      counter = allTotals.length;
    }
    // Increment counter
    counter += 1;
  }
  return check;
};

// Find the highest total of a player's cards that is <= 21
var findHighest = function (allTotals) {
  var counter = 0;
  var highest = allTotals[0];
  while (counter < allTotals.length) {
    if (allTotals[counter] <= 21 && allTotals[counter] > highest) {
      highest = allTotals[counter];
    }
    counter += 1;
  }
  return highest;
};

// Compare highest total to find result
var findResult = function (player, dealer) {
  var result = ``;
  if (findHighest(findTotal(player)) > findHighest(findTotal(dealer))) {
    result = WIN;
  }
  if (findHighest(findTotal(player)) == findHighest(findTotal(dealer))) {
    result = DRAW;
  }
  if (findHighest(findTotal(player)) < findHighest(findTotal(dealer))) {
    result = LOSE;
  }
  return result;
};

// Print all players' cards in message form
var printCards = function () {
  var index = 0;
  var overallMessage = "";
  var innerMessage = "";
  var playerName = "";
  while (index < numberOfPlayers) {
    playerName = players[index].name;
    var cardCounter = 0;
    while (cardCounter < players[index].cards.length) {
      innerMessage =
        innerMessage +
        `${players[index].cards[cardCounter].name} ${players[index].cards[cardCounter].suit}.  `;
      cardCounter += 1;
    }
    overallMessage = overallMessage + `${playerName}: ${innerMessage} <br>`;
    innerMessage = ``;
    index += 1;
  }
  return overallMessage;
};

// Print selected individual player's cards in message form
var printIndivCards = function (playerIndex, maxCardIndex) {
  var cardIndex = 0;
  var indivMessage = ``;
  while (cardIndex <= maxCardIndex) {
    indivMessage =
      indivMessage +
      `${players[playerIndex].cards[cardIndex].name} ${players[playerIndex].cards[cardIndex].suit}.  `;
    cardIndex += 1;
  }
  return indivMessage;
};

// Calculate updated bet points
var calcBetPoints = function (counter, value) {
  // Subtract bet placed from overall bet points
  players[counter].points =
    Number(players[counter].points) - Number(betsPlaced[counter]);
  // Compute outcome of bet placed
  betsPlaced[counter] = betsPlaced[counter] * value;
  // Add computed outcome of bet placed back into overall bet points
  players[counter].points =
    Number(players[counter].points) + Number(betsPlaced[counter]);

  return players[counter].points;
};

// Print players' bet points in message form
var printBetPoints = function () {
  var index = 0;
  var message = "";
  while (index < numberOfPlayers) {
    message =
      message +
      `${players[index].name}: ${players[index].points} bet points <br>`;
    index += 1;
  }
  return message;
};

// Print names of players who got blackjack
var listBlackjack = function () {
  var counter = 0;
  var playerIndex = ``;
  var blackjackNames = [];
  while (counter < removedPlayers.length) {
    playerIndex = removedPlayers[counter];
    blackjackNames.push(players[playerIndex].name);
    counter += 1;
  }
  return blackjackNames;
};

// Find next standing player
var findNextPlayer = function (counter) {
  var playerIndex = counter;
  var removedIndex = 0;
  var standingPlayer = counter;
  // Compare each player index...
  while (playerIndex < players.length) {
    // to each removed player index
    while (removedIndex < removedPlayers.length) {
      // If the player that is being verified has been removed
      if (standingPlayer == removedPlayers[removedIndex]) {
        // Assign next player for verification
        standingPlayer = standingPlayer + 1;
        // Reset such that verification starts from comparison with removedPlayers[0]
        removedIndex = -1;
        // Reset such that verification continues with next playerIndex
        playerIndex = standingPlayer - 1;
      }
      // Check newly assigned standing player via increment counter
      removedIndex += 1;
    }
    // Check next player
    playerIndex += 1;
    return standingPlayer;
  }
};

// Remove cards from players' hands
var clearCards = function () {
  var counter = 0;
  while (counter < players.length) {
    players[counter].cards = [];
    counter += 1;
  }
  return players;
};

// Store standard messages
var msgDeal = function () {
  return `You have been dealt the following cards, <br> <br> ${printCards()} <br><br> The dealer's first card is ${printIndivCards(
    numberOfPlayers,
    0
  )} <br><br>`;
};
var msgStats = function () {
  return `================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br>`;
};
var msgHitStand = function () {
  return `, please type the letter 'H' if you decide to HIT (i.e. get additional card), or the letter 'S' if you decide to STAND (i.e. end your turn without further action).`;
};
var msgHitStandError = function () {
  return `${
    players[currentPlayer].name
  }, your current cards are: ${printIndivCards(
    currentPlayer,
    1
  )} <br><br> Please type the letter 'H' to HIT (i.e. get additional card), or the letter 'S' if you decide to STAND (i.e. end your turn without further action).`;
};
var msgBlackjack = function () {
  return `BLACKJACK! 🃑🂽 🎉 <br> You won 1.5 times of your bet placed!  <br><br> ${printCards()} <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br>`;
};
var msgBust = function () {
  return `Too bad, it's a bust!  <br><br> ${printCards()} <br> You lost your bet points for this round... <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br>`;
};
var msgWonBJ = function () {
  return `Congratulations ${blackjackPlayers}! You won BLACKJACK 🃑🂽 !! 🎉🎉🎉 <br> This means that you won 1.5 times of your bet placed! <br><br>`;
};
var msgReveal = function () {
  return `Please get everyone to gather round, it's my turn now! Please click on the submit button to reveal my second card. 🙂`;
};
var msgStand = function () {
  return `You have chosen STAND, sometimes not doing anything may be the best choice ya?  <br><br> ${printCards()} <br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br>`;
};
var msgCurious = function () {
  return `Just to satisfy your curiosity, the dealer has these cards on hand: ${printIndivCards(
    numberOfPlayers,
    1
  )} <br><br><br>`;
};
var msgBet = function () {
  return `You may begin a new round by placing your bet. <br><br> ${players[0].name}, please enter an amount less than or equal to ${players[0].points} and click submit.`;
};
var msgSplitHand = function () {
  return `, please type the letter 'Y' for YES if you wish to split hand or the letter 'N' for NO if you do not wish to split hand.`;
};
var msgShowdown = function () {
  return `🃁🂭 FINAL SHOWDOWN! 🃁🂭 <br><br> Some of you had dared to enter into the final duel with the dealer... <br><br>`;
};
var msgCards = function () {
  return `<br> ${printCards()} <br><br> The dealer's cards are: ${printIndivCards(
    numberOfPlayers,
    Number(players[numberOfPlayers].cards.length - 1)
  )} <br><br><br>`;
};
var msgSplitOption = function () {
  return `${
    players[currentPlayer].name
  }, your current cards are a pair of the same rank: ${printIndivCards(
    currentPlayer,
    1
  )} <br><br> You can choose to split your cards using the same amount of bet points that you have placed for your current hand in this round (you have enough bet points to do so). <br><br> Please type the letter 'Y' for YES if you wish to split hand or the letter 'N' for NO if you do not wish to split hand.`;
};

// Reset variables for fresh game
var reset = function () {
  betsPlaced = [];
  removedPlayers = [];
  blackjackPlayers = [];
  nextPlayer = ``;
  currentPlayer = ``;
  win = [];
  draw = [];
  lose = [];
  counter = 0;
  clearCards();
  if (playersOriginal.length != 0) {
    removeSplit();
    playersOriginal = [];
  }
};

// ============ MAIN FUNCTION ==============

var main = function (input) {
  // If mode is to determine number of players
  if (gameMode == NO_OF_PLAYERS) {
    // Set the number of players, if input is valid (i.e. number >0)
    if (checkNumber(input)) {
      players = createPlayers(input);
      // Change to NAMES mode
      gameMode = NAMES;
      // Output message
      return `You have initiated a ${input}-player game. <br><br> To continue, please enter Player 1's name and click submit.`;
    }
    // Generate error message for invalid input
    else {
      return `I'm sorry, please try again. <br> <br> Enter the number of players who wish to play. <br> Please use digits greater than 0.`;
    }
  }

  // If mode is NAMES
  if (gameMode == NAMES) {
    // Set players' names & tag 100 bet points to each of them
    numberOfPlayers = players.length - 1;
    // Henceforth 'numberOfPlayers' will be used interchangeably as dealer's index too
    while (counter < numberOfPlayers) {
      // If name is not yet taken
      if (checkName(input)) {
        players[counter].name = input;
        players[counter].points = 100;
        console.log("Player entered", players[counter]);
        if (counter < numberOfPlayers - 1) {
          // Increment counter
          counter += 1;
          // Give instruction for next player to enter name
          return `Welcome, ${input}. <br><br> Please get the next player to enter his/her name and click submit.`;
        } // After final name entry, give instruction for next step
        else if (counter == numberOfPlayers - 1) {
          // Change to BET mode, reset counter
          gameMode = BET;
          // Craft message
          var message = `Welcome, ${input}. <br><br><br> Please gather everyone round to read the next instruction: <br><br> 1. Each of you have been allocated 100 bet points! 🎉 <br> 2. Please take turns to key in the amount of bet points you wish to place for the upcoming round, starting from ${players[0].name}. You may enter any amount from 1 to 100.`;
          // Reset counter
          counter = 0;
          // Output message
          return message;
        }
        // If name has been taken
      } else {
        return `I'm sorry, this name has been taken. Please enter a different name.`;
      }
    }
  }

  // Allow players to place bets
  if (gameMode == BET) {
    // Record each player's bet points placed for the round, if input is valid
    if (checkNumber(input) && Number(input) <= players[counter].points) {
      while (counter < numberOfPlayers) {
        betsPlaced.push(input);
        console.log("Bets placed", betsPlaced);
        // Then, give instruction for next player to place bet
        if (counter < numberOfPlayers - 1) {
          var message = `Thank you ${
            players[counter].name
          }, you have chosen to bet ${input} points. <br><br> Please get ${
            players[counter + 1].name
          } to place his/her bet next. <br><br><br> ============= <br><br> Hi ${
            players[counter + 1].name
          }, you have ${
            players[counter + 1].points
          } bet points available. Please enter the amount of points you wish to bet in the upcoming round. The amount needs to be less than or equal to ${
            players[counter + 1].points
          }.`;
          // Increment index after message output
          counter += 1;
          return message;
          // After the final player has placed his/her bet
        } else if (counter < numberOfPlayers) {
          // Change to GAME_DEAL mode, reset counter, instruct next step
          gameMode = GAME_DEAL;
          message = `Thank you ${players[counter].name}, you have chosen to bet ${input} points. <br><br> Please gather all players while I shuffle the cards. <br> When you are ready, click submit for me to deal the cards out.`;
          counter = 0;
          return message;
        }
      }
    }
    // Generate error message if input is not valid
    else {
      return `I'm sorry ${players[counter].name}, you currently have ${players[counter].points} bet points available. <br> <br> Please enter the amount of points you wish to bet in the upcoming round. The amount needs to be less than or equal to ${players[counter].points}.`;
    }
  }

  // In GAME_DEAL mode
  if (gameMode == GAME_DEAL) {
    // Create a deck of shuffled cards
    cardDeck = shuffle(makeDeck());
    console.log("cardDeck", cardDeck);
    // Deal 2 cards to each player including dealer
    deal(cardDeck, players.length);
    console.log("cardDeck", cardDeck);
    // Check sum of players' cards (excluding dealer)
    while (counter < numberOfPlayers) {
      // If sum = 21
      if (checkEqual21(findTotal(counter))) {
        // Tabulate bet result of that player (add 1.5 times points)
        calcBetPoints(counter, 1.5);
        // Store player index in removed player array (to omit from hit/stand round later)
        removedPlayers.push(counter);
        console.log("removedPlayers", removedPlayers);
      }
      // Increment counter
      counter += 1;
    }
    // Reset counter
    counter = 0;
    // Find next player
    nextPlayer = findNextPlayer(counter);
    // If none won blackjack
    if (removedPlayers.length == 0) {
      // If split hand option is available for next player
      if (checkSplitHand(nextPlayer)) {
        // Change game mode to GAME_SPLIT _HAND
        gameMode = GAME_SPLIT_HAND;
        // Output message
        return `${msgDeal()} There are no blackjacks so far... 🃑🂽 <br><br><br> ${msgStats()} ${msgSplitOption(
          nextPlayer
        )}`;
      }
      // If split hand option is not available for next player
      else {
        // Change to GAME_HIT_STAND mode
        gameMode = GAME_HIT_STAND;
        // Output message
        return `${msgDeal()} There are no blackjacks so far... 🃑🂽 <br><br><br> ${msgStats()} ${
          players[0].name
        } ${msgHitStand()}`;
      }
    }
    // If one or more have won blackjack AND there are still players standing
    else if (removedPlayers.length < numberOfPlayers) {
      // Create name list of players who won blackjack
      blackjackPlayers = listBlackjack();
      // If split hand option is available for next player
      if (checkSplitHand(nextPlayer)) {
        // Change game mode to GAME_SPLIT _HAND
        gameMode = GAME_SPLIT_HAND;
        // Output message
        return `${msgDeal()} ${msgWonBJ()} ${msgStats()} ${
          players[nextPlayer].name
        } ${msgSplitOption(nextPlayer)}`;
      }
      // If split hand option is not available for next player
      else {
        // Change to GAME_HIT_STAND mode
        gameMode = GAME_HIT_STAND;
        // Output message
        return `${msgDeal()} ${msgWonBJ()} ${msgStats()} ${
          players[nextPlayer].name
        } ${msgHitStand()}`;
      }
    }
    // If one or more have won blackjack AND no more players are standing
    else {
      // Create name list of players who won blackjack
      blackjackPlayers = listBlackjack();
      // Change to BET mode
      gameMode = BET;
      // Craft message
      message = `${msgDeal()} ${msgWonBJ()} ${msgCurious()} ${msgStats()} There are no players left standing. ${msgBet()}`;
      // Reset variables for fresh game
      reset();
      // Output message
      return message;
    }
  }

  // In GAME_HIT_STAND mode,
  if (gameMode == GAME_HIT_STAND) {
    // Update current player
    currentPlayer = findNextPlayer(counter);
    console.log("currentPlayer", currentPlayer);
    // Loop for all players who are still remaining in the game
    while (currentPlayer < numberOfPlayers) {
      // If player can choose to split hand (pair + enough bet points) and has yet to choose
      if (checkSplitHand(currentPlayer)) {
        // Change game mode to GAME_SPLIT _HAND
        gameMode = GAME_SPLIT_HAND;
        // Output message
        return msgSplitOption(currentPlayer);
      }
      // After split hand option (if any)
      else {
        // If player select to hit, add a card to their hand
        if (input.toUpperCase() == H) {
          console.log("cardDeck", cardDeck);
          var nextCard = cardDeck.pop();
          console.log("nextCard", nextCard);
          players[currentPlayer].cards.push(nextCard);
          console.log(
            `player ${currentPlayer}'s cards`,
            players[currentPlayer].cards
          );
          // If the new sum is 21,
          if (checkEqual21(findTotal(currentPlayer))) {
            // Reset splitChoice before going to next player
            splitChoice = ``;
            // Tabulate bet result of that player (add 1.5 times points)
            calcBetPoints(currentPlayer, 1.5);
            // Store player index in removed player array (to omit from hit/stand round later)
            removedPlayers.push(currentPlayer);
            console.log("removedPlayers", removedPlayers);
            // Find out who is the next player
            nextPlayer = findNextPlayer(currentPlayer + 1);
            console.log("nextPlayerIndex", nextPlayer);
            // Output message
            if (players[nextPlayer].name != "Dealer") {
              // Update new current player
              currentPlayer = nextPlayer;
              counter = currentPlayer;
              // If split hand option is available for new current player
              if (checkSplitHand(currentPlayer)) {
                // Change game mode to GAME_SPLIT _HAND
                gameMode = GAME_SPLIT_HAND;
                // Output message accordingly
                return `${msgBlackjack()} ${msgSplitOption(currentPlayer)}`;
              }
              // If split hand option is not available for new current player
              else {
                return `${msgBlackjack()} ${
                  players[currentPlayer].name
                } ${msgHitStand()}`;
              }
            }
            // If dealer is next player
            else {
              // Change game mode
              gameMode = GAME_REVEAL;
              return `${msgBlackjack()} ${msgReveal()}`;
            }
          }
          // If the new sum is > 21,
          if (checkAbove21(findTotal(currentPlayer))) {
            // Reset splitChoice before going to next player
            splitChoice = ``;
            // Tabulate bet result of that player (0 points)
            calcBetPoints(currentPlayer, 0);
            console.log("bet points", betsPlaced[currentPlayer]);
            // Store player index in removed player array (to omit from hit/stand round later)
            removedPlayers.push(currentPlayer);
            console.log("removedPlayers", removedPlayers);
            // Find next player
            nextPlayer = findNextPlayer(currentPlayer + 1);
            console.log("nextPlayerIndex", nextPlayer);
            // Output message (if dealer is not next player)
            if (players[nextPlayer].name != "Dealer") {
              // Update current player
              currentPlayer = nextPlayer;
              counter = currentPlayer;
              // If split hand option is available for new current player
              if (checkSplitHand(currentPlayer)) {
                // Change game mode to GAME_SPLIT _HAND
                gameMode = GAME_SPLIT_HAND;
                // Output message accordingly
                return `${msgBust()} ${msgSplitOption(currentPlayer)}`;
              }
              // If split hand option is not available for new current player
              else {
                return `${msgBust()} ${
                  players[currentPlayer].name
                } ${msgHitStand()}`;
              }
            }
            // Output message (if it is dealer's turn next)
            else {
              // Update current player (optional)
              currentPlayer = nextPlayer;
              counter = currentPlayer;
              // Change game mode
              gameMode = GAME_REVEAL;
              return `${msgBust()} ${msgReveal()}`;
            }
          } else {
            // Output message
            message = `You have chosen HIT and have received an additional card: <br><br> ${printCards()} <br> The dealer's first card is ${printIndivCards(
              numberOfPlayers,
              0
            )} <br><br><br> ${msgStats()} ${
              players[currentPlayer].name
            } ${msgHitStand()}`;
            // Update counter
            counter = currentPlayer;
            // Return message
            return message;
          }
        }
        // If player select to stand,
        if (input.toUpperCase() == S) {
          // Reset splitChoice before going to next player
          splitChoice = ``;
          // Find next player
          nextPlayer = findNextPlayer(currentPlayer + 1);
          console.log("nextPlayerIndex", nextPlayer);
          // Update current player
          currentPlayer = nextPlayer;
          counter = currentPlayer;
          // Output message (if upcoming player is not dealer)
          if (players[currentPlayer].name != "Dealer") {
            // If split hand option is available for new current player
            if (checkSplitHand(currentPlayer)) {
              // Change game mode to GAME_SPLIT _HAND
              gameMode = GAME_SPLIT_HAND;
              // Output message
              return `${msgStand()} ${msgSplitOption(currentPlayer)}`;
            }
            // If split hand option is not available for new current player
            else {
              // Output message
              return `${msgStand()} ${
                players[currentPlayer].name
              } ${msgHitStand()}`;
            }
          }
          // Output message (if it is dealer's turn next)
          else {
            gameMode = GAME_REVEAL;
            return `${msgStand()} ${msgReveal()}`;
          }
          // Show error message for invalid input
        } else {
          return `${msgHitStandError()}`;
        }
      }
    }
  }

  // Everytime mode is changed to GAME_SPLIT_HAND
  if (gameMode == GAME_SPLIT_HAND) {
    currentPlayer = findNextPlayer(counter);
    // If player chose not to split hand
    if (input.toUpperCase() == "N") {
      // Store response in global variable
      splitChoice = DONE;
      // Go back to hit stand mode
      gameMode = GAME_HIT_STAND;
      // Output message
      return `You have chosen not to split hand. <br><br> ${printCards()} <br><br><br> ${msgStats()} ${
        players[currentPlayer].name
      } ${msgHitStand()}`;
    }
    // If player chose to split hand
    if (input.toUpperCase() == "Y") {
      // Complete split hand
      splitHand();
      // Update affected index in removedPlayers array
      updateRemovedPlayers();
      // Update numberOfPlayers variable
      numberOfPlayers = players.length - 1;
      // Store response in global variable
      splitChoice = DONE;
      console.log("splitChoice done?", splitChoice);
      // Go back to hit stand mode
      gameMode = GAME_HIT_STAND;
      // If sum of new cards (hand 1) is 21,
      if (checkEqual21(findTotal(currentPlayer))) {
        // Tabulate bet result of that hand (add 1.5 times points)
        calcBetPoints(currentPlayer, 1.5);
        // Store player index in removed player array
        removedPlayers.push(currentPlayer);
        console.log("removedPlayers", removedPlayers);
        // Find out who is the next player
        nextPlayer = findNextPlayer(currentPlayer + 1);
        console.log("nextPlayerIndex", nextPlayer);
        // Update new current player
        currentPlayer = nextPlayer;
        counter = currentPlayer;
        // Output message
        return `${msgBlackjack()} ${
          players[currentPlayer].name
        } ${msgHitStand()}`;
      }
      // Output message
      else {
        return `You have chosen to split hand and your new cards are as follow: <br><br> ${printCards()} <br><br> ================ <br><br> TO CONTINUE: <br><br> ${
          players[currentPlayer].name
        } ${msgHitStand()}`;
      }
    }
    // For invalid input, return error message
    else {
      currentPlayer = findNextPlayer(counter);
      return `I didn't get that, please try again ${
        players[currentPlayer].name
      }. <br><br> Your current cards are a pair of the same rank: ${printIndivCards(
        currentPlayer,
        1
      )} <br><br> You can choose to split your cards using the same amount of bet points that you have placed for your current hand in this round (you have enough bet points to do so). <br><br> ${msgStats()} ${
        players[currentPlayer].name
      } ${msgSplitHand()}`;
    }
  }

  // If it is dealer's turn (reveal cards)
  if (gameMode == GAME_REVEAL) {
    // If no more players standing,
    if (removedPlayers.length == numberOfPlayers) {
      // Change game mode to BET
      gameMode = BET;
      // Craft message
      message = `${msgCurious()} ${msgStats()} There are no players left standing. ${msgBet()}`;
      // Reset variables for fresh round, then output message
      reset();
      return message;
    }
    // If there are standing player(s),
    else {
      counter = numberOfPlayers;
      // If sum of dealer's cards is below 17, add card till >= 17
      while (
        !checkAbove16(findTotal(numberOfPlayers)) &&
        !checkAbove21(findTotal(numberOfPlayers))
      ) {
        // Add one card each time
        nextCard = cardDeck.pop();
        players[numberOfPlayers].cards.push(nextCard);
        console.log("dealer's cards", players[numberOfPlayers].cards);
      }
      // If dealer bust
      if (checkAbove21(findTotal(numberOfPlayers))) {
        // Find next standing player (starting from player 0),
        counter = 0;
        nextPlayer = findNextPlayer(counter);
        // Then loop through all players
        while (nextPlayer < numberOfPlayers) {
          // Tabulate bet result of that player (add 2 times points)
          calcBetPoints(nextPlayer, 2);
          console.log("bets points", betsPlaced);
          // Store player name in Win array
          win.push(players[nextPlayer].name);
          console.log("win", win);
          // Increment for loop
          counter = nextPlayer + 1;
          nextPlayer = findNextPlayer(counter);
        }
        // Craft output message
        var finalResults = `${msgShowdown()} And if you did, you just won 2 times of your bet points!!! 🌈 <br> The dealer has busted, congratulations to ${win}! <br><br> ${msgCards()} ${msgStats()} Great game and thanks for playing with me! ${msgBet()} <br><br>`;
        // Reset variables for fresh game
        reset();
        // Change to BET mode to start new round with same players
        gameMode = BET;
        // Output results
        return finalResults;
      }

      // If sum of dealer's cards is >= 17 and <= 21
      if (
        checkAbove16(findTotal(numberOfPlayers)) &&
        !checkAbove21(findTotal(numberOfPlayers))
      ) {
        // Compare each player's total against dealer's
        counter = 0;
        nextPlayer = findNextPlayer(counter);
        while (nextPlayer < numberOfPlayers) {
          // If player's sum is higher than dealer's
          if (findResult(nextPlayer, numberOfPlayers) == WIN) {
            // Tabulate bet result of that player (add 2 times points)
            calcBetPoints(nextPlayer, 2);
            console.log("bets points", betsPlaced);
            // Store player name in Win array
            win.push(players[nextPlayer].name);
            console.log("win", win);
          }
          // If player's sum is same as dealer's
          if (findResult(nextPlayer, numberOfPlayers) == DRAW) {
            // Tabulate bet result of that player (no change in points)
            calcBetPoints(nextPlayer, 1);
            // Store player name in Draw array
            draw.push(players[nextPlayer].name);
            console.log("draw", draw);
          }
          // If player's sum is lower than dealer's
          if (findResult(nextPlayer, numberOfPlayers) == LOSE) {
            // Tabulate bet result of that player (0 points)
            calcBetPoints(nextPlayer, 0);
            // Store player name in Lose array
            lose.push(players[nextPlayer].name);
            console.log("lose", lose);
          }
          // Increment counter
          counter = nextPlayer + 1;
          nextPlayer = findNextPlayer(counter);
        }
        // When all comparisons are done, output results and scores
        var results = ``;
        if (win.length != 0) {
          results =
            results +
            `Congratulations to ${win} who won the dealer!!! <br> You won 2 times of your bet points! <br><br>`;
        }
        if (draw.length != 0) {
          results =
            results +
            `As for ${draw}, you did not lose your bet points this time, but you did not win any either. It's a draw! <br><br>`;
        }
        if (lose.length != 0) {
          results =
            results +
            `Sad to say, ${lose} lost the bet points this time round unfortunately... Better luck next time! <br><br>`;
        }
        // Craft output message
        var finalResults = `${msgShowdown()} ${results} ${msgCards()} ${msgStats()} Great game and thanks for playing with me! ${msgBet()}`;
        // Reset variables for fresh game
        reset();
        // Change to BET mode to start new round with same players
        gameMode = BET;
        // Output results
        return finalResults;
      }
    }
  }
};

// POTENTIAL ADD-ONS THAT CAN BE DONE:
// (1) Account for situation when cardDeck is depleted
// (2) Account for situation when player goes bankrupt
