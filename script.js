// ################ MAKE DECK ################
function makeDeck() {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["spades", "hearts", "clubs", "diamonds"];

  // Loop over the suits array
  for (suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    for (rankCounter = 1; rankCounter <= 13; rankCounter++) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name and set cardValue accordingly
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
}

// ================ randomiser ================
function randomiser(max) {
  return Math.floor(Math.random() * max);
}

// ################ SHUFFLE DECK ################
function shuffleCards(cardDeck) {
  // Loop over the card deck array once
  for (i = 0; i < cardDeck.length; i++) {
    // Select a random index in the deck
    var randomIndex = randomiser(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[i];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[i] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cardDeck;
}

// ################ HAND POINTS ################
function handPoints(hand) {
  var totalPoints = 0;

  // ---------- TOTAL POINTS ----------
  for (const card of hand) {
    totalPoints += card.value;
  }

  //  --------- ACE CHECKER ----------
  for (const aceChecker of hand) {
    if (aceChecker.name == "ace") {
      if (totalPoints <= 11) {
        totalPoints += 10;
      }
    }
  }

  return totalPoints;
}

// ################ MULTIPLAYER ################
function multiplayer(qty) {
  // reset playersArr
  playersArr = [];

  // Add player to array
  for (x = 0; x <= qty; x++) {
    // player obj template
    var playerObj = {
      name: "",
      number: x,
      hand: [],
      score: 0,
      turn: 0,
      // bettingPoints: 100,
    };
    if (x == 0) {
      playerObj.name = "dealer";
    }
    //  else {
    //   playerObj.number = x;
    // }
    playersArr.push(playerObj);
  }
  return playersArr; // obj array of players
}

// ################ INITIAL DEAL ################
function initialDeal(deck, playersArr) {
  var initialCards = [];

  // deal 2 cards to each player
  for (i = 0; i < 2; i++) {
    var newDraw = deck.pop();
    initialCards.push(newDraw);
  }

  // BANLUCK (only for 1 player)
  if (playersArr.length == 2) {
    // for (p = 1; p < playersArr; p++) {
    if (playersArr[1].hand.length > 0) {
      if (
        (playersArr[1].score == 21 && playersArr[0].score != 21) ||
        (playersArr[1].hand[0].name == "ace" &&
          playersArr[1].hand[1].name == "ace")
      ) {
        // player instant win
        myOutputValue = `You have drawn<br><br>${playersArr[p].hand[0].name} of ${playersArr[p].hand[0].suit}<br>${playersArr[p].hand[1].name} of ${playersArr[p].hand[1].suit}<br><br>Your current points is ${playersArr[p].score}<br>You won! Press 'Submit' to play again.`;
        return myOutputValue;
      }
    }
    // }
  }

  return initialCards; // returns array of cards (objs)
}

// ################ WINNER CHECK ##################
function winnerCheck(playersArr) {
  var scoreDiff = 0;
  var playersDiff = [];
  var winner = []; // push winner into an array in case of tie
  var scoreboard = "<u>~ P O I N T S ~</u><br>";
  var winnerOutput;

  for (s = 0; s < playersArr.length; s++) {
    if (playersArr[s] == dealer) {
      scoreboard += `${playersArr[s].name}: ${playersArr[s].score}<br>`;
    } else {
      scoreboard += `Player ${playersArr[s].number}: ${playersArr[s].score}<br>`;
    }
  }

  // compare scores
  for (const player of playersArr) {
    // check score diff of players with score 21 or less
    if (player.score <= 21) {
      scoreDiff = Math.abs(player.score - 21);
      player.diff = scoreDiff;
      // add score diff to array for comparison later
      playersDiff.push(scoreDiff);
    }
  }

  // sort score diff in ascending order
  playersDiff.sort(function (a, b) {
    return a - b;
  });

  // find winner(s)
  for (const winning of playersArr) {
    if (winning.diff == playersDiff[0]) {
      winner.push(winning);
    }
  }

  // announce winner
  if (winner.length == 1) {
    if (winner[0].name != "dealer")
      winnerOutput = `Player ${winner[0].number} wins! <br>Press 'Submit' to play again.<br><br>${scoreboard}`;
  } else {
    winnerOutput = `${winner[0].name} wins! <br>Press 'Submit' to play again.<br><br>${scoreboard}`;
  }
  return winnerOutput;
}

// ################ CURRENT PLAYER CHECK ##################
function isPlayer(playersArr) {
  // check current player
  for (playing = 0; playing < playersArr.length; playing++) {
    if (playersArr[playing].turn == 1) {
      return playersArr[playing]; // player object
    }
  }
}

// ################ GLOBAL VAR ################
var deck = makeDeck();
var mode = "initialise";
var stand;
var playersArr = [];
var dealer;

// ################ MAIN FUNCTION ################
var main = function (input) {
  var myOutputValue = "";
  var shuffledDeck = shuffleCards(deck);

  // ++++++++++ MODE: INITIALISE ++++++++++
  if (mode == "initialise") {
    // reset players array
    playersArr = [];

    myOutputValue = "Please enter the number of players";
    if (isNaN(Number(input)) == false && input != "") {
      multiplayer(Number(input)); // players is an array of objects
      dealer = playersArr[0];
      dealer.hand = initialDeal(shuffledDeck, playersArr);
      dealer.turn = 0;
      playersArr[1].turn = 1;
      mode = "start";
      return `${input} players playing. Player 1, press submit to draw.`;
    }
    return myOutputValue;
  }

  // ++++++++++ MODE: START ++++++++++
  if (mode == "start") {
    // // check current player
    currentPlayer = isPlayer(playersArr); // player object

    currentPlayer.hand = initialDeal(shuffledDeck, playersArr);
    currentPlayer.score = handPoints(currentPlayer.hand);
    myOutputValue = `Player ${currentPlayer.number}, you have drawn <br><br>${currentPlayer.hand[0].name} of ${currentPlayer.hand[0].suit}<br>${currentPlayer.hand[1].name} of ${currentPlayer.hand[1].suit}<br><br>Your current points is ${currentPlayer.score}.<br>Hit or stand?`;

    mode = "draw";
    return myOutputValue;
  }

  // ++++++++++ MODE: DRAW ++++++++++
  if (mode == "draw") {
    myOutputValue = `Player ${currentPlayer.number}, your current points is ${currentPlayer.score}<br>Hit or stand?`;

    // ---------- STAND ----------
    if (input.toLowerCase() == "stand" || stand == "forced") {
      stand = "";
      // change current player
      // if current player is last on array, next player is dealer. else current player is next player in array
      if (playersArr[playersArr.length - 1].turn == 1) {
        dealer.turn = 1;
        currentPlayer = dealer; // player object
        console.log("changed to dealer");
      } else {
        currentPlayer.turn = 0;
        playersArr[Number(currentPlayer.number) + 1].turn = 1;
        currentPlayer = isPlayer(playersArr); // player object
        console.log("changed player");
      }

      // if current player is dealer
      if (currentPlayer == dealer) {
        dealer.score = handPoints(currentPlayer.hand);
        // dealer draws AFTER all player stands if points less than 17
        for (j = 0; j < 3; j++) {
          if (dealer.score < 17) {
            dealer.hand.push(shuffledDeck.pop());
            dealer.score = handPoints(currentPlayer.hand);
          }
        }
        var winner = winnerCheck(playersArr);
        mode = "start";

        // change to first player
        currentPlayer.turn = 0;
        playersArr[Number(currentPlayer.number) + 1].turn = 1;
        currentPlayer = isPlayer(playersArr); // player object

        return winner;
      } else {
        myOutputValue = `Player ${currentPlayer.number} is next. Press 'Submit' to draw.`;
        mode = "start";
      }
    }

    // ---------- HIT ----------
    if (input.toLowerCase() == "hit") {
      var playerCards = "You have drawn<br><br>";

      // cannot draw more than 5 cards
      if (currentPlayer.hand.length <= 5) {
        currentPlayer.hand.push(shuffledDeck.pop());
      } else {
        stand = "forced";
        myOutputValue =
          "You cannot draw more than 5 cards.<br>Press 'Submit' to continue.";
        return myOutputValue;
      }

      // recalculate player points
      currentPlayer.score = handPoints(currentPlayer.hand);

      for (k = 0; k < currentPlayer.hand.length; k++) {
        playerCards += `${currentPlayer.hand[k].name} of ${currentPlayer.hand[k].suit}<br>`;
      }
      myOutputValue = `${playerCards}<br>Your current points is ${currentPlayer.score}<br>Hit or stand?`;
    }
    return myOutputValue;
  }
};
