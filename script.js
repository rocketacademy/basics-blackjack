var gStateOptions = {
  setup: "setup",
  deal: "deal",
  takeBets: "take bets",
  restart: "restart",
  dealer: "dealer",
  player: "player",
  playerFeedback: "player feedback",
  evaluate: "evaluate",
};

var gameState = {
  state: gStateOptions.setup,
  allPlayers: 0,
  currentPlayer: 0,
  deck: [],
};

var players = [];

var createPlayer = function (name, cash, bet) {
  return {
    name: name,
    cash: cash,
    cards: [],
    score: 0,
    state: "playing",
    bet: bet,
    endMessage: "",
  };
};

// Element where we show instructions
var instructionsEl = document.getElementById("instructions");

var inputEl = document.getElementById("input-field");

var showGameButtons = function () {
  var submitButton = document.getElementById("submit-button");
  var hitButton = document.getElementById("hit-button");
  var standButton = document.getElementById("stand-button");
  var doubleButton = document.getElementById("double-button");

  submitButton.setAttribute("hidden", "hidden");
  hitButton.removeAttribute("hidden");
  standButton.removeAttribute("hidden");
  doubleButton.removeAttribute("hidden");
};

var hideGameButtons = function () {
  var submitButton = document.getElementById("submit-button");
  var hitButton = document.getElementById("hit-button");
  var standButton = document.getElementById("stand-button");
  var doubleButton = document.getElementById("double-button");

  submitButton.removeAttribute("hidden");
  hitButton.setAttribute("hidden", "hidden");
  standButton.setAttribute("hidden", "hidden");
  doubleButton.setAttribute("hidden", "hidden");
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
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

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var currentRank = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        currentRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        currentRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        currentRank = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: currentRank,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

var getRandomCards = function (howMany) {
  var randomCards = [];
  for (var i = 0; i < howMany; i += 1) {
    randomCards.push(gameState.deck.pop());
  }
  return randomCards;
};

var calculatePlayerScore = function (playerIndex) {
  var score = 0;
  var haveAce = false;
  for (var i = 0; i < players[playerIndex].cards.length; i += 1) {
    score += players[playerIndex].cards[i].rank;
    if (players[playerIndex].cards[i].name == "ace") {
      haveAce = true;
    }
  }
  // If we have an ace, check if +10 score is still up to 21
  if (haveAce) {
    var score2 = score + 10;
    if (score2 <= 21) {
      score = score2;
    }
  }
  players[playerIndex].score = score;
  checkPlayerState(playerIndex);
};

// Check state of player
var checkPlayerState = function (playerIndex) {
  if (players[playerIndex].score > 21) {
    players[playerIndex].state = "busted";
    players[playerIndex].endMessage = "Busted";
    if (playerIndex != 0) {
      players[playerIndex].cash -= players[playerIndex].bet;
      players[playerIndex].bet = 0;
    }
  } else if (players[playerIndex].score == 21) {
    players[playerIndex].state = "black jack";
    players[playerIndex].endMessage = "Black Jack";
    if (playerIndex != 0) {
      players[playerIndex].cash += players[playerIndex].bet * 1.5;
      players[playerIndex].bet = 0;
    }
  }
};

var composeCardPicture = function (card) {
  return `<img class="card" src="./svg-cards/${card.name}_of_${card.suit}.svg" />`;
};

var showPlayerCards = function (playerIndex) {
  var message = "";
  var numCards = players[playerIndex].cards.length;
  if (numCards > 0) {
    message += `<div class="player">${players[playerIndex].name}'s hand</div><div>`;
    var i = 0;
    if (playerIndex == 0 && !revealDealer()) {
      i = 1;
      message += `<img class="card" src="./svg-cards/back.svg" />`;
    }
    while (i < numCards) {
      message += composeCardPicture(players[playerIndex].cards[i]);
      i += 1;
    }
    // message += `${players[playerIndex].endMessage}`;
    if (playerIndex != 0) {
      message += `</div><div>Score: ${players[playerIndex].score} | Cash: ${players[playerIndex].cash} | Bet: ${players[playerIndex].bet} </div><br>`;
    } else if (playerIndex == 0 && revealDealer()) {
      message += `</div><div>Score: ${players[playerIndex].score}</div><br>`;
    }
  }
  return message;
};

var showAllPlayersCards = function () {
  var message = "";
  for (var i = 1; i <= gameState.allPlayers; i += 1) {
    message += showPlayerCards(i);
  }
  // message += showPlayerCards(0);
  return message;
};

var revealDealer = function () {
  if (gameState.currentPlayer == 0) {
    return true;
  }
  return false;
};

var prepareNewGame = function () {
  for (var i = 0; i <= gameState.allPlayers; i += 1) {
    players[i].cards = [];
    players[i].score = 0;
    players[i].bet = 0;
    players[i].endMessage = "";
    if (players[i].cash <= 0) {
      players[i].state = "lost";
    } else {
      players[i].state = "playing";
    }
  }
  var newPlayerList = [];
  for (var i = 0; i <= gameState.allPlayers; i += 1) {
    var currentPlayer = players.shift();
    if (currentPlayer.state != "lost") {
      newPlayerList.push(currentPlayer);
    }
  }
  players.length = 0;
  players = players.concat(newPlayerList);
  gameState.allPlayers = players.length - 1;
  gameState.deck = shuffleCards(makeDeck());
  gameState.currentPlayer = 1;
};

var main = function (input) {
  if (gameState.state === gStateOptions.setup) {
    input = parseInt(input);
    if (!(input > 0 && input < 5)) {
      instructionsEl.innerHTML = `Please choose number of players 1-4`;
      return "";
    } else {
      instructionsEl.innerHTML = "";
      gameState.deck = shuffleCards(makeDeck());
      players.push(createPlayer("Dealer", 100, 0));
      for (var i = 1; i <= input; i += 1) {
        players.push(createPlayer("Player " + i, 100, 0));
      }
      gameState.allPlayers = players.length - 1;
      gameState.currentPlayer = 1;
      gameState.state = gStateOptions.takeBets;
      return "Let's start!";
    }
  }

  if (gameState.state === gStateOptions.takeBets) {
    input = parseInt(input);
    if (input > 0 && input <= players[gameState.currentPlayer].cash) {
      players[gameState.currentPlayer].bet = input;
      gameState.currentPlayer += 1;
      if (gameState.currentPlayer > gameState.allPlayers) {
        gameState.currentPlayer = 1;
        gameState.state = gStateOptions.deal;
        inputEl.setAttribute("hidden", "hidden");
        return "Let's deal!";
      }
    }
    return `${
      players[gameState.currentPlayer].name
    } please decide what is your bet! (0 to ${
      players[gameState.currentPlayer].cash
    })`;
  }

  if (gameState.state === gStateOptions.deal) {
    for (var i = 0; i <= gameState.allPlayers; i += 1) {
      players[i].cards = players[i].cards.concat(getRandomCards(2));
      calculatePlayerScore(i);
    }
    var message = showAllPlayersCards();
    message += showPlayerCards(0);
    gameState.state = gStateOptions.player;
    return message;
  }

  if (gameState.state === gStateOptions.player) {
    if (players[gameState.currentPlayer].state == "playing") {
      showGameButtons();
      instructionsEl.innerHTML = `${
        players[gameState.currentPlayer].name
      }, would you like to "Hit", "Stand" or "Double"`;
      if (
        players[gameState.currentPlayer].bet * 2 <=
        players[gameState.currentPlayer].cash
      ) {
        doubleButton.removeAttribute("hidden");
      } else {
        doubleButton.setAttribute("hidden", "hidden");
      }
    }
    var message = showAllPlayersCards();
    gameState.state = gStateOptions.playerFeedback;
    return message;
  }

  if (gameState.state === gStateOptions.playerFeedback) {
    var message = "";
    if (input == "double") {
      players[gameState.currentPlayer].bet *= 2;
    }

    if (input == "hit" || input == "double") {
      players[gameState.currentPlayer].cards = players[
        gameState.currentPlayer
      ].cards.concat(getRandomCards(1));
      calculatePlayerScore(gameState.currentPlayer);
    }

    if (
      input == "stand" ||
      input == "double" ||
      players[gameState.currentPlayer].state == "busted" ||
      players[gameState.currentPlayer].state == "black jack"
    ) {
      gameState.currentPlayer += 1;
      if (gameState.currentPlayer > gameState.allPlayers) {
        gameState.currentPlayer = 0;
        hideGameButtons();
        instructionsEl.innerHTML = "Let's see Dealers hand";
        gameState.state = gStateOptions.dealer;
        while (players[0].score < 17) {
          players[0].cards = players[0].cards.concat(getRandomCards(1));
          calculatePlayerScore(0);
        }
        message += showPlayerCards(0);
        message += showAllPlayersCards();
        return message;
      } else {
        instructionsEl.innerHTML = `${
          players[gameState.currentPlayer].name
        }, would you like to "Hit", "Stand" or "Double"`;
      }
    }
    message += showAllPlayersCards();
    message += showPlayerCards(0);
    if (
      players[gameState.currentPlayer].cards.length == 2 &&
      players[gameState.currentPlayer].bet * 2 <=
        players[gameState.currentPlayer].cash
    ) {
      doubleButton.removeAttribute("hidden");
    } else {
      doubleButton.setAttribute("hidden", "hidden");
    }
    return message;
  }

  if (gameState.state === gStateOptions.dealer) {
    instructionsEl.innerHTML = "Let's see results";
    var message = "";
    if (players[0].state == "busted") {
      for (var i = 0; i <= gameState.allPlayers; i += 1) {
        players[i].cash += players[i].bet;
        players[i].bet = 0;
      }
    } else {
      for (var i = 0; i <= gameState.allPlayers; i += 1) {
        var scoreDiff = players[i].score - players[0].score;
        if (scoreDiff > 0) {
          players[i].cash += players[i].bet;
        } else if (scoreDiff < 0) {
          players[i].cash -= players[i].bet;
        }
        players[i].bet = 0;
      }
    }
    message += showPlayerCards(0);
    message += showAllPlayersCards();
    gameState.state = gStateOptions.takeBets;
    prepareNewGame();
    instructionsEl.innerHTML = `Let's play again.`;
    inputEl.removeAttribute("hidden");

    if (gameState.allPlayers == 0) {
      gameState.state = gStateOptions.setup;
      instructionsEl.innerHTML = `No more players! For new game please choose number of players 1-4`;
      return "";
    }
    return message;
  }
};
