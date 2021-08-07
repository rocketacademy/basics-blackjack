// Create scream case variables for strings
var NO_OF_PLAYERS = "number of players";
var NAMES = "names";
var BET = "bet";
var GAME_DEAL = "game deal";
var GAME_HIT_STAND = "game hit stand";
var GAME_REVEAL = "reveal";
var H = "H";
var S = "S";

// Create global variables
var gameMode = NO_OF_PLAYERS;
var players = [];
var betsPlaced = [];
var numberOfPlayers = ``;
var removedPlayers = [];
var blackjackNames = [];
var cardDeck = [];
var nextPlayer = ``;
var currentPlayer = ``;
var win = [];
var draw = [];
var lose = [];
var counter = 0;

// Create functions for the following:
// To create an array of players
var createPlayers = function (numberOfPlayers) {
  var playerIndex = 0;
  while (playerIndex < Number(numberOfPlayers)) {
    var indivPlayer = {
      index: playerIndex,
      name: `player ${playerIndex}`,
    };
    players.push(indivPlayer);
    playerIndex += 1;
  }
  // Then add dealer as the final player
  var dealer = {
    index: playerIndex,
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
  console.log("allTotals", allTotals);
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

// Check if total card points is > 16 (as long as ANY ONE item in the array is > 16)
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
  console.log("highest total", highest);
  return highest;
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
  var message = ``;
  while (cardIndex <= maxCardIndex) {
    message =
      message +
      `${players[playerIndex].cards[cardIndex].name} ${players[playerIndex].cards[cardIndex].suit}.  `;
    cardIndex += 1;
  }
  return message;
};

// Calculate updated bet points
var calcBetPoints = function (counter, value) {
  // Subtract bet placed from overall bet points
  players[counter].points =
    Number(players[counter].points) - Number(betsPlaced[counter]);
  // Compute outcome of bet placed
  betsPlaced[counter] = betsPlaced[counter] * value;
  console.log("bet points", betsPlaced[counter]);
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
  while (counter < removedPlayers.length) {
    playerIndex = removedPlayers[counter];
    blackjackNames.push(players[playerIndex].name);
    counter += 1;
  }
  console.log(`Blackjack players`, blackjackNames);
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
    console.log("standingPlayer", standingPlayer);
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

// Reset variables for fresh game
var reset = function () {
  betsPlaced = [];
  removedPlayers = [];
  blackjackNames = [];
  nextPlayer = ``;
  currentPlayer = ``;
  win = [];
  draw = [];
  lose = [];
  counter = 0;
  clearCards();
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
    console.log("numberOfPlayers", numberOfPlayers);
    // Henceforth 'numberOfPlayers' will be used interchangeably as dealer's index too
    while (counter < numberOfPlayers) {
      if (counter < numberOfPlayers - 1) {
        // If name is not yet taken
        if (checkName(input)) {
          players[counter].name = input;
          players[counter].points = 100;
          console.log("Player entered", players[counter]);
          // Increment counter
          counter += 1;
          console.log("counter", counter);
          // Give instruction for next player to enter name
          return `Welcome, ${input}. <br><br> Please get the next player to enter his/her name and click submit.`;
          // If name has been taken
        } else {
          return `I'm sorry, this name has been taken. Please enter a different name.`;
        }
      }
      // After final name entry, give instruction for next step
      else if (counter == numberOfPlayers - 1) {
        players[counter].name = input;
        players[counter].points = 100;
        console.log("Player entered", players[counter]);
        // Change to BET mode, reset counter
        gameMode = BET;
        console.log("gameMode", gameMode);
        var message = `Welcome, ${input}. <br><br><br> Please gather everyone round to read the next instruction: <br><br> 1. Each of you have been allocated 100 bet points! 🎉 <br> 2. Please take turns to key in the amount of bet points you wish to place for the upcoming round, starting from ${players[0].name}. You may enter any amount from 1 to 100.`;
        counter = 0;
        console.log("counter", counter);
        return message;
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
            players[counter].points
          }.`;
          // Increment index after message output
          counter += 1;
          console.log("counter", counter);
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
    // If none won blackjack
    if (removedPlayers.length == 0) {
      // Change to GAME_HIT_STAND mode
      gameMode = GAME_HIT_STAND;
      // Output message
      return `You have been dealt the following cards, <br> <br> ${printCards()} <br><br> The dealer's first card is ${printIndivCards(
        numberOfPlayers,
        0
      )} <br><br> There are no blackjacks so far... 🃑🂽 <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> ${
        players[0].name
      }, please type the letter 'H' if you decide to HIT (i.e. get additional card), or the letter 'S' if you decide to STAND (i.e. end your turn without further action).`;
    }
    // If one or more have won blackjack AND there are still players standing
    else if (removedPlayers.length < numberOfPlayers) {
      var blackjackPlayers = listBlackjack();
      nextPlayer = findNextPlayer(counter);
      // Change to GAME_HIT_STAND mode
      gameMode = GAME_HIT_STAND;
      // Output message
      return `You have been dealt the following cards, <br> <br> ${printCards()} <br><br> The dealer's first card is ${printIndivCards(
        numberOfPlayers,
        0
      )} <br><br> Congratulations to the following who won BLACKJACK 🃑🂽 : ${blackjackPlayers}!! 🎉 <br> You won 1.5 times of your bet placed! <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> ${
        players[nextPlayer].name
      }, please type the letter 'H' if you decide to HIT (i.e. get additional card), or the letter 'S' if you decide to STAND (i.e. end your turn without further action).`;
    }
    // If one or more have won blackjack AND no more players are standing
    else {
      var blackjackPlayers = listBlackjack();
      // Change to BET mode
      gameMode = BET;
      // Output message
      return `You have been dealt the following cards, <br> <br> ${printCards()} Congratulations ${blackjackPlayers}! You won BLACKJACK 🃑🂽 !! 🎉🎉🎉 <br> This means that each of you won 1.5 times of your bet placed! <br> <br> ${printCards()} <br><br> Just to satisfy your curiosity, the dealer has these cards on hand: ${printIndivCards(
        numberOfPlayers,
        1
      )}. <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> As there are no players left standing, you may begin a new round by placing your bet. <br><br> ${
        players[0].name
      }, please enter an amount less than or equal to ${
        players[0].points
      } and click submit.`;
    }
  }

  // In GAME_HIT_STAND mode,
  if (gameMode == GAME_HIT_STAND) {
    // Update current player
    currentPlayer = findNextPlayer(counter);
    // Loop for all players who are still remaining in the game
    while (currentPlayer < numberOfPlayers) {
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
          // Tabulate bet result of that player (add 1.5 times points)
          calcBetPoints(currentPlayer, 1.5);
          // Store player index in removed player array (to omit from hit/stand round later)
          removedPlayers.push(currentPlayer);
          console.log("removedPlayers", removedPlayers);
          // Find out who is the next player
          nextPlayer = findNextPlayer(currentPlayer + 1);
          console.log("nextPlayerIndex", nextPlayer);
          // Update new current player
          currentPlayer = nextPlayer;
          // Output message
          if (players[nextPlayer].name != "Dealer") {
            return `BLACKJACK! 🃑🂽 🎉 <br> You won 1.5 times of your bet placed!  <br><br> ${printCards()} <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> ${
              players[nextPlayer].name
            }, please type the letter 'H' if you decide to HIT (i.e. get additional card), or the letter 'S' if you decide to STAND (i.e. end your turn without further action).`;
          } else {
            gameMode = GAME_REVEAL;
            return `BLACKJACK! 🃑🂽 🎉 <br> You won 1.5 times of your bet placed!  <br><br> ${printCards()} <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> It's my turn now! Please click the submit button to reveal my second card. 🙂.`;
          }
        }
        // If the new sum is > 21,
        if (checkAbove21(findTotal(currentPlayer))) {
          // Tabulate bet result of that player (0 points)
          calcBetPoints(currentPlayer, 0);
          console.log("bet points", betsPlaced[currentPlayer]);
          // Store player index in removed player array (to omit from hit/stand round later)
          removedPlayers.push(currentPlayer);
          console.log("removedPlayers", removedPlayers);
          // Find next player
          nextPlayer = findNextPlayer(currentPlayer + 1);
          console.log("nextPlayerIndex", nextPlayer);
          console.log("nextPlayer", players[nextPlayer]);
          console.log("nextPlayerName", players[nextPlayer].name);

          // Output message (if dealer is not next player)
          if (players[nextPlayer].name != "Dealer") {
            // Update current player
            currentPlayer = nextPlayer;
            return `Too bad, it's a bust!  <br><br> ${printCards()} <br> You lost your bet points for this round... <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> ${
              players[nextPlayer].name
            }, please type the letter 'H' if you decide to HIT (i.e. get additional card), or the letter 'S' if you decide to STAND (i.e. end your turn without further action).`;
          }
          // Output message (if it is dealer's turn next)
          else {
            // Update current player
            currentPlayer = nextPlayer;
            // Change game mode
            gameMode = GAME_REVEAL;
            return `Too bad, it's a bust!  <br><br> ${printCards()} <br> You lost your bet points for this round... <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> It's my turn now! Please get everyone to gather round and click the submit button to reveal my second card. 🙂.`;
          }
        } else {
          // Output message
          message = `You have chosen HIT and have received an additional card: <br><br> ${printCards()} <br> The dealer's first card is ${printIndivCards(
            numberOfPlayers,
            0
          )} <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> ${
            players[currentPlayer].name
          }, please type the letter 'H' if you decide to HIT (i.e. get additional card), or the letter 'S' if you decide to STAND (i.e. end your turn without further action).`;
          // Update current player
          currentPlayer = nextPlayer;
          // Return message
          return message;
        }
      }
      // If player select to stand,
      if (input.toUpperCase() == S) {
        // Move on to the next player
        counter = currentPlayer + 1;
        console.log("counter", counter);
        // Find next player
        nextPlayer = findNextPlayer(currentPlayer + 1);
        console.log("nextPlayer", nextPlayer);
        console.log("nextPlayerName", players[nextPlayer].name);
        // Output message (if dealer is not next player)
        if (players[nextPlayer].name != "Dealer") {
          return `You have chosen STAND, sometimes not doing anything may be the best choice ya?  <br><br> ${printCards()} <br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> ${
            players[nextPlayer].name
          }, please type the letter 'H' if you decide to HIT (i.e. get additional card), or the letter 'S' if you decide to STAND (i.e. end your turn without further action).`;
        }
        // Output message (if it is dealer's turn next)
        else {
          gameMode = GAME_REVEAL;
          return `You have chosen STAND, sometimes not doing anything may be the best choice ya? <br><br> ${printCards()} <br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> It's my turn now! Please get everyone to gather round and click the submit button to reveal my second card. 🙂`;
        }
        // Show error message for invalid input
      } else {
        return `${
          players[currentPlayer].name
        }, your current cards are: ${printIndivCards(
          currentPlayer,
          1
        )} <br><br> Please type the letter 'H' to HIT (i.e. get additional card), or the letter 'S' if you decide to STAND (i.e. end your turn without further action).`;
      }
    }
    // Reset counter
    counter = 0;
  }

  // If it is dealer's turn (reveal cards)
  if (gameMode == GAME_REVEAL) {
    // If no more players standing, change game mode to BET
    if (removedPlayers.length == numberOfPlayers) {
      gameMode = BET;
      return `The dealer's cards are: ${printIndivCards(
        numberOfPlayers,
        1
      )}. <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> As there are no players left standing, you may begin a new round by placing your bet. <br><br> ${
        players[0].name
      }, please enter an amount less than or equal to ${
        players[0].points
      } and click submit.`;
    }
    // If there are standing player(s),
    else {
      counter = numberOfPlayers;
      // If sum of dealer's cards is below 17, add card till >= 17
      console.log(
        "Dealer total not above 16",
        !checkAbove16(findTotal(numberOfPlayers))
      );
      while (!checkAbove16(findTotal(numberOfPlayers))) {
        nextCard = cardDeck.pop();
        console.log("nextCard", nextCard);
        players[counter].cards.push(nextCard);
        console.log(`player ${counter}'s cards`, players[counter].cards);
      }
      // If sum of dealer's cards is > 21
      if (checkAbove21(findTotal(numberOfPlayers))) {
        // Find next standing player (starting from player 0)
        counter = 0;
        nextPlayer = findNextPlayer(counter);
        // Loop through all players
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
        var finalResults = `🃁🂭 FINAL SHOWDOWN! 🃁🂭 <br><br> Some of you had dared to enter into the final duel with the dealer... <br><br> And if you did, you just won 2 times of your bet points!!! 🌈 <br> The dealer has busted. <br> Congratulations to ${win}! <br><br> ${printCards()} <br><br> The dealer's cards are: ${printIndivCards(
          numberOfPlayers,
          Number(players[numberOfPlayers].cards.length - 1)
        )} <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> Great game and thanks for playing with me! You may begin a new round by placing your bet. <br><br> ${
          players[0].name
        }, please enter an amount less than or equal to ${
          players[0].points
        } and click submit.`;
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
          console.log(
            "highest total of player",
            findHighest(findTotal(nextPlayer))
          );
          console.log(
            "highest total of dealer",
            findHighest(findTotal(numberOfPlayers))
          );
          // If player's sum is higher than dealer's
          if (
            findHighest(findTotal(nextPlayer)) >
            findHighest(findTotal(numberOfPlayers))
          ) {
            // Tabulate bet result of that player (add 2 times points)
            calcBetPoints(nextPlayer, 2);
            console.log("bets points", betsPlaced);
            // Store player name in Win array
            win.push(players[nextPlayer].name);
            console.log("win", win);
          }
          // If player's sum is same as dealer's
          if (
            findHighest(findTotal(nextPlayer)) ==
            findHighest(findTotal(numberOfPlayers))
          ) {
            // Tabulate bet result of that player (no change in points)
            calcBetPoints(nextPlayer, 1);
            // Store player name in Draw array
            draw.push(players[nextPlayer].name);
            console.log("draw", draw);
          }
          // If player's sum is lower than dealer's
          if (
            findHighest(findTotal(nextPlayer)) <
            findHighest(findTotal(numberOfPlayers))
          ) {
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
        var finalResults = `🃁🂭 FINAL SHOWDOWN! 🃁🂭 <br><br> Some of you had dared to enter into the final duel with the dealer... <br><br> ${results} <br> ${printCards()} <br><br> The dealer's cards are: ${printIndivCards(
          numberOfPlayers,
          Number(players[numberOfPlayers].cards.length - 1)
        )} <br><br><br> ================ <br><br> CURRENT BET POINTS: <br><br> ${printBetPoints()} <br><br> ================ <br><br> TO CONTINUE: <br><br> Great game and thanks for playing with me! You may begin a new round by placing your bet. <br><br> ${
          players[0].name
        }, please enter an amount less than or equal to ${
          players[0].points
        } and click submit.`;
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
