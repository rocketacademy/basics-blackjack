/* a 2-player blackjack game */

/* ============================================= */
/* =============== CARD DECK =================== */
/* ============================================= */

// make a deck of 52 playing cards
var makeDeck = function () {
  var cardDeck = []; // initialise empty cardDeck array
  var suits = ["clubs", "diamonds", "hearts", "spades"];
  var emojis = ["♣", "♦", "♥", "♠"];
  // loop thru the four suits
  for (var i = 0; i < suits.length; i += 1) {
    var currentSuit = suits[i];
    // loop thru the 13 ranks
    console.log(`suit: ${currentSuit}`);
    for (var j = 1; j <= 13; j += 1) {
      // assign card rank
      var cardRank = j;
      // assign card name, including exceptions
      var cardName = j;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      // create the current card
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
        emoji: emojis[i],
      };
      // add current card to cardDeck array
      cardDeck.push(card);
      console.log(card);
    }
  }
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to X (exclusive).
var getRandomIndex = function (X) {
  return Math.floor(Math.random() * X);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// global variable for the shuffled 52-card deck array
var deck = shuffleCards(makeDeck());

// function to draw a single card from the deck
var drawCard = function () {
  return deck.pop();
};

/* ============================================= */
/* =============== GAME FUNCTIONS ============== */
/* ============================================= */

// initiate global variables
var gameMode = "setup";
var isNewGame;
var players = [];
var totalPlayers = 0;
var activePlayerIndex = 1; // used to cycle through all players

// initialise players incl dealer, and draw the first 2 cards
var initPlayers = function (nPlayers) {
  // if this is a new game, initialise the full array of players; dealer is players[0]
  if (isNewGame) {
    for (var i = 0; i < nPlayers; i += 1) {
      players[i] = { cards: [], score: 0, hasBlackjack: false, wins: 0 };
    }
  } // if this is a new round, flush players' hand
  else if (!isNewGame) {
    for (var i = 0; i < players.length; i += 1) {
      players[i].cards = [];
      players[i].score = 0;
      players[i].hasBlackjack = false;
    }
  }
  // then, have non-dealer player(s) each draw 2 cards first
  for (var i = 1; i < players.length; i += 1) {
    players[i].cards.push(drawCard());
    players[i].cards.push(drawCard());
  }
  // finally, have dealer draw 2 cards
  players[0].cards.push(drawCard());
  players[0].cards.push(drawCard());

  return players;
};

// sets up the game for (n = 1 to 4) human players + dealer
var setupGame = function (nHuman) {
  if (nHuman >= 1 && nHuman <= 4) {
    players = initPlayers(nHuman + 1);
    gameMode = "check for blackjack";
    return `Game setup for ${
      players.length - 1
    } human player(s) plus dealer. 2 cards dealt for each. <br>Press submit to continue.`;
  } else {
    return `Please specify 1 to 4 players only.`;
  }
};

// checks for blackjack, returns boolean
var hasBlackjack = function (playerObj) {
  return playerObj.cards.length == 2 && computeScore(playerObj) == 21;
};

// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

/* ============================================= */
/* =============== ACTIONS ===================== */
/* ============================================= */

var activePlayerHitOrStand = function (input, index) {
  // input validation
  if (!(input == "hit" || input == "stand")) {
    return `Player ${activePlayerIndex}'s turn: Please specify hit or stand.`;
  }
  // following code only runs if input is valid
  var myOutputValue = "";
  if (input == "hit") {
    var newCard = drawCard();
    players[index].cards.push(newCard);
    myOutputValue = `Player ${index} draws a ${newCard.name} of ${newCard.suit}`;
    gameMode = "hit or stand";
    return `${myOutputValue}. <br>Hand comprises ${printPlayerCards(
      players[index]
    )}, for score of ${computeScore(
      players[index]
    )}.<br><br> Please input whether to hit (again) or stand.`;
  } else if (input == "stand") {
    players[index].lastMove = "stand";
    gameMode = "hit or stand";
    myOutputValue = `Player ${index} stands`;
    activePlayerIndex += 1; // only proceed to next player if the active player stands
    return `${myOutputValue}. <br>Hand comprises ${printPlayerCards(
      players[index]
    )}, for score of ${computeScore(
      players[index]
    )}. <br> Press submit to continue.`;
  }
};

var dealerHitOrStand = function (dealerObj) {
  var dealerCurrScore = computeScore(dealerObj);
  // if dealer's hand is below 17, dealer draws
  var myOutputValue = `Dealer's move.<br>`;
  while (dealerCurrScore < 17) {
    var newCard = drawCard();
    dealerObj.cards.push(newCard);
    dealerCurrScore = computeScore(dealerObj);
    myOutputValue += `Dealer draws a ${newCard.name} of ${newCard.suit}. `;
  }
  if (dealerCurrScore >= 17) {
    myOutputValue += `Dealer stands. `;
  }
  return myOutputValue + `Press submit to continue.`;
};

/* ============================================= */
/* =========== REPORTING & SCORING ============= */
/* ============================================= */

// returns the cards in a player's hand as a string
// includes optional parameter to hide first card (used only for dealer)
var printPlayerCards = function (playerObj, hideFirstCard = false) {
  var cards = playerObj.cards;
  var returnString = "";
  if (!hideFirstCard) {
    // Iterate until cards.length - 1 to avoid the extra comma at the end of return string
    for (var i = 0; i < cards.length - 1; i += 1) {
      var currCard = cards[i];
      returnString += `${currCard.name} of ${currCard.emoji}, `;
    }
    var lastCard = cards[cards.length - 1];
    returnString += `${lastCard.name} of ${lastCard.emoji}`;
  } else if (hideFirstCard) {
    returnString = "[first card hidden], ";
    // Start from second card then iterate until cards.length - 1 to avoid the extra comma at the end of return string
    for (var i = 1; i < cards.length - 1; i += 1) {
      var currCard = cards[i];
      returnString += `${currCard.name} of ${currCard.emoji}, `;
    }
    var lastCard = cards[cards.length - 1];
    returnString += `${lastCard.name} of ${lastCard.emoji}`;
  }
  return returnString;
};

// takes in a player object and returns score
// including "bust" status
var computeScore = function (playerObj) {
  var cards = playerObj.cards;
  var score = 0;
  // cycle thru all cards in the player's hand
  for (var i = 0; i < cards.length; i += 1) {
    // first add score of 10 for any Jack/Queen/King
    if (
      cards[i].name == "jack" ||
      cards[i].name == "queen" ||
      cards[i].name == "king"
    ) {
      score += 10;
    } // then add score for any non-ace cards
    else if (!(cards[i].name == "ace")) {
      score += cards[i].rank;
    } // finally add score of 1 or 11 for any ace cards, depending on the cumulative score so far
    else if (cards[i].name == "ace" && score <= 10) {
      score += 11;
    } else if (cards[i].name == "ace" && !score <= 10) {
      score += 1;
    }
  }
  // check for bust condition
  if (score > 21) {
    score += " (bust)";
  }
  return score;
};

// returns scores in string format
// finalTally parameter, if true, reveals the dealer's hidden card and score
var reportScores = function (finalTally = false) {
  var returnString = "SCOREBOARD:<br>";
  // report current scoreboard for players
  for (var i = 1; i < players.length; i += 1) {
    var playerHand = printPlayerCards(players[i]);
    var playerScore = computeScore(players[i]);
    returnString += `Player ${i}: Your cards are ${playerHand}. Your score is ${playerScore}.<br> `;
  }
  if (!finalTally) {
    // hide dealer's first card and score
    var dealerHand = printPlayerCards(players[0], (hideFirstCard = true));
    returnString += `Dealer's cards are ${dealerHand}.`;
  } else if (finalTally) {
    // show dealer's first card and score
    var dealerHand = printPlayerCards(players[0], (hideFirstCard = false));
    var dealerScore = computeScore(players[0]);
    returnString += `Dealer's cards are ${dealerHand}. Dealer score is ${dealerScore}.<br> `;
  }
  return returnString + "<br><br>";
};

// returns results in string format
var reportRoundResults = function () {
  var returnString = "";
  var anyBlackjacks = false;
  var winnerCount = 0;
  // cycle through the players array to determine if there are any blackjacks
  for (var i = 0; i < players.length; i += 1) {
    if (players[i].hasBlackjack) {
      anyBlackjacks = true;
      winnerCount += 1;
    }
  }
  // if there are blackjacks, declare the player(s) the winner
  if (anyBlackjacks) {
    // single winner
    if (winnerCount == 1) {
      // dealer has blackjack
      if (players[0].hasBlackjack) {
        players[0].wins += 1;
        returnString += `Dealer has blackjack.<br>`;
      }
      // player(s) have blackjack
      for (var i = 1; i < players.length; i += 1) {
        if (players[i].hasBlackjack) {
          players[i].wins += 1;
          returnString += `Player ${i} has blackjack.<br>`;
        }
      }
      returnString += `They win!`;
      // multiple winners, i.e. tie
    } else if (winnerCount > 1) {
      returnString += `More than 1 player has blackjack, so it's a tie!`;
    }
  }
  // if there are no blackjacks, find the highest score and declare player(s) the winner
  else {
    var highestScore = 0;
    // cycle thru the full array to determine the highest score
    for (var i = 0; i < players.length; i += 1) {
      players[i].score = computeScore(players[i]);
      if (players[i].score > highestScore) {
        highestScore = players[i].score;
      }
    }
    returnString += `Highest score is ${highestScore}. <br>`;
    // declare if human players win
    for (var i = 1; i < players.length; i += 1) {
      if (players[i].score == highestScore) {
        winnerCount += 1;
        players[i].wins += 1;
        returnString += `Player ${i} achieved highest score.<br>`;
      }
    }
    // declare if dealer wins
    if (players[0].score == highestScore) {
      winnerCount += 1;
      players[0].wins += 1;
      returnString += `Dealer achieved highest score.<br>`;
    }
    if (winnerCount == 1) {
      returnString += `They win!`;
    } else if (winnerCount > 1) {
      returnString += `They all win!`;
    }
  }
  return returnString + "<br>";
};

var reportWins = function () {
  var returnString = "";
  // loops thru all players
  for (var i = 1; i < players.length; i += 1) {
    returnString += `Player ${i} has won ${players[i].wins} times.<br>`;
  }
  returnString += `Dealer has won ${players[0].wins} times.<br>`;
  return returnString;
};

/* ============================================= */
/* =============== MAIN FUNCTION =============== */
/* ============================================= */

// main function
var main = function (input) {
  // error message if game has been completed
  if (gameMode == "game over") {
    if (input == "a") {
      // re-initialise global variables
      deck = shuffleCards(makeDeck());
      activePlayerIndex = 1; // used to cycle through all players
      return setupGame(players.length - 1);
    }
    return `Game over. Type 'a' for another round.`;
  }

  var mainOutputMsg = "";
  // setup game: based on number of players, deal 2 cards
  if (gameMode == "setup") {
    console.log(gameMode);
    isNewGame = true;
    mainOutputMsg = setupGame(parseInt(input));
    isNewGame = false;
    return mainOutputMsg;
  }

  // check for win conditions and present the scores for all players
  if (gameMode == "check for blackjack") {
    console.log(gameMode);
    // start of testing code
    //players[0].cards[0] = { name: "ace", suit: "spades", rank: 1 };
    //players[0].cards[1] = { name: "queen", suit: "spades", rank: 12 };
    //players[1].cards[0] = { name: "ace", suit: "spades", rank: 1 };
    //players[1].cards[1] = { name: "queen", suit: "spades", rank: 12 };
    // end of testing code

    var anyPlayersWithBlackjack = false;

    // check thru all players for blackjack
    for (var i = 0; i < players.length; i += 1) {
      // check if anyone has gotten blackjack with the first 2 cards
      players[i].hasBlackjack = hasBlackjack(players[i]);
      if (players[i].hasBlackjack) {
        anyPlayersWithBlackjack = true;
      }
    }
    // if someone has blackjack, skip hit/stand and proceed to show results
    if (anyPlayersWithBlackjack) {
      mainOutputMsg = "Someone has a blackjack! Click submit to view results.";
      gameMode = "show results";
      return mainOutputMsg;
    } else {
      // no one has blackjack, so report scores and ask for active player to decide on move
      mainOutputMsg = `${reportScores()}`;
      mainOutputMsg += `Now, player(s) will choose whether to hit/stand. Press submit to continue.`;
      gameMode = "hit or stand";
      return mainOutputMsg;
    }
  }

  // for players and dealer to decide on hit or stand
  if (gameMode == "hit or stand") {
    console.log(gameMode);
    mainOutputMsg = `${reportScores()}`;
    // only if all human players have moved, it is dealer's move
    if (activePlayerIndex == players.length) {
      mainOutputMsg += dealerHitOrStand(players[0]);
      gameMode = "show results";
    }
    // start with player 1 then loop thru human players
    if (activePlayerIndex < players.length) {
      mainOutputMsg += activePlayerHitOrStand(input, activePlayerIndex);
    }
    return mainOutputMsg;
  }

  if (gameMode == "show results") {
    mainOutputMsg += reportScores(true);
    mainOutputMsg += reportRoundResults();
    var img1 =
      '<img src = "https://c.tenor.com/eDrlV9otYw0AAAAC/neil-patrick-harris-thumbs-up.gif">';
    mainOutputMsg += "<br>" + img1 + "<br>";
    mainOutputMsg += `Overall wins: <br>${reportWins()}`;
    gameMode = "game over";
    return mainOutputMsg;
  }
};
