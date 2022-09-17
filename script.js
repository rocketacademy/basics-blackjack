// Default settings
var gameMode = "new round";
var gameDeck = shuffleDeck(makeSixDecks());
var numberOfPlayers = 1;
var playersArray = [];
var dealerCards = [];
var playerCards = [];
var allPlayersCards = [];
var result = "";
var winner = "";
var dealerHand = 0;
var playerHand = 0;
var allPlayersHand = [];
var playerCounter = 0;
var roundScoreBoard = {};

var main = function (hitOrStand, playersArray) {
  return playGame(hitOrStand, playersArray);
};

// Generate the list of Players
function generatePlayersArray(numberOfPlayers) {
  var playersArray = [];
  var counter = 0;
  while (counter < numberOfPlayers) {
    playersArray.push(`Player ${counter + 1}`);
    counter += 1;
  }
  roundScoreBoard = generateRoundScoreBoard(playersArray);
  printRoundScoreBoard(roundScoreBoard);
  return playersArray;
}

function playGame(hitOrStand, playersArray) {
  // Reset last round's cards and hand, if any
  if (gameMode == "new round") {
    dealerHand = 0;
    dealerCards = [];
    allPlayersHand = [];
    allPlayersCards = [];
    playerCounter = 0;
    gameMode = "deal cards";
    roundScoreBoard = generateRoundScoreBoard(playersArray);
    printOutput("Dealing cards... Click 'next' to check your hands.");
  } else if (gameMode == "deal cards") {
    // Dealer draws cards
    dealerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());
    dealerHand = sumCardsValue(dealerCards);
    console.log(
      `Dealer drew ${dealerCards[0].suit} ${dealerCards[0].name} ${dealerCards[1].suit} ${dealerCards[1].name}. Dealer's hand: ${dealerHand}.`
    );
    // Players take turn to draw cards
    for (
      let playerCounter = 0;
      playerCounter < playersArray.length;
      playerCounter += 1
    ) {
      // Reset before a player draws
      playerCards = [];
      playerHand = 0;
      // Each player's cards are stored as an array of objects
      playerCards.push(gameDeck.pop());
      playerCards.push(gameDeck.pop());
      // All players' cards are stored as an array of arrays
      // E.g. [[player1-card1, player1-card2],[player2-card1, player2-card2]]
      allPlayersCards.push(playerCards);
      playerHand = sumCardsValue(playerCards);
      allPlayersHand.push(playerHand);
      console.log(
        `${playersArray[playerCounter]} got ${playerCards[0].suit} ${playerCards[0].name} ${playerCards[1].suit} ${playerCards[1].name}`
      );
    }
    console.log(`All players' hand: ${allPlayersHand}`);
    gameMode = "hit or stand";
    hitButton.disabled = false;
    standButton.disabled = false;
    printOutput(
      `One of Dealer's cards is ${dealerCards[0].suit} ${dealerCards[0].name}. <br>Here's everyone's hand so far: ${allPlayersHand}. <br>Player 1 - select hit or stand.`
    );
  }

  // Players take turns to hit or stand
  else if (gameMode == "hit or stand") {
    if (hitOrStand != "hit" && hitOrStand != "stand") {
      printOutput("Please select either 'hit' or 'stand'.");
    } else if (hitOrStand == "hit") {
      var hitCard = gameDeck.pop();
      allPlayersCards[playerCounter].push(hitCard);
      allPlayersHand[playerCounter] = sumCardsValue(
        allPlayersCards[playerCounter]
      );
      console.log(
        `${playersArray[playerCounter]} drew ${hitCard.suit} ${hitCard.name}.`
      );
      printOutput(
        `${playersArray[playerCounter]} drew ${hitCard.suit} ${hitCard.name}. ${playersArray[playerCounter]}'s hand is ${allPlayersHand[playerCounter]}. <br>${playersArray[playerCounter]} - hit or stand?`
      );
    } else if (hitOrStand == "stand") {
      playerCounter += 1;
      if (playerCounter < playersArray.length) {
        printOutput(
          `${playersArray[playerCounter - 1]} chose to stand. ${
            playersArray[playerCounter]
          }'s turn - your current hand is ${allPlayersHand[playerCounter]}.`
        );
      } else {
        hitButton.disabled = true;
        standButton.disabled = true;
        gameMode = "Dealer plays";
        printOutput(
          `${
            playersArray[playerCounter - 1]
          } chose to stand. Click 'next' to let Dealer have their turn.`
        );
      }
    }
  }
  // Dealer hit or stand
  else if (gameMode == "Dealer plays") {
    dealerHand = sumCardsValue(dealerCards);
    while (dealerHand < 17) {
      var hitCard = gameDeck.pop();
      dealerCards.push(hitCard);
      dealerHand += hitCard.value;
      console.log(
        `Dealer hits and drew ${hitCard.suit} ${hitCard.name}. Dealer's hand is ${dealerHand}.`
      );
    }
    gameMode = "check results";
    printOutput(`Dealer's turn ended. Click 'next' to tally results.`);
  }

  // Tally results
  else if (gameMode == "check results") {
    // Check for Blackjack
    for (
      let playerCounter = 0;
      playerCounter < playersArray.length;
      playerCounter += 1
    ) {
      if (checkBlackjack(allPlayersCards[playerCounter])) {
        roundScoreBoard[playersArray[playerCounter]] = "Blackjack";
      }
    }
    if (checkBlackjack(dealerCards)) {
      roundScoreBoard["Dealer"] = "Blackjack";
    }

    // Check for bust
    for (
      let playerCounter = 0;
      playerCounter < playersArray.length;
      playerCounter += 1
    ) {
      if (allPlayersHand[playerCounter] > 21) {
        roundScoreBoard[playersArray[playerCounter]] = "Bust";
      }
    }
    if (dealerHand > 21) {
      roundScoreBoard["Dealer"] = "Bust";
    }

    // Tally rest of the scores
    for (
      let playerCounter = 0;
      playerCounter < playersArray.length;
      playerCounter += 1
    ) {
      if (roundScoreBoard[playersArray[playerCounter]] == "") {
        roundScoreBoard[playersArray[playerCounter]] =
          allPlayersHand[playerCounter];
      }
    }
    if (roundScoreBoard["Dealer"] == "") {
      roundScoreBoard["Dealer"] = dealerHand;
    }
    printRoundScoreBoard(roundScoreBoard);
    printOutput(
      "This round's results are out! Click 'next' to start another round."
    );
    // Reset for new round
    gameMode = "new round";
  }
}

function makeNewDeck() {
  var deck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];
  var numbers = ["2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
  for (var suitCounter = 0; suitCounter < 4; suitCounter += 1) {
    for (var nameCounter = 0; nameCounter < 13; nameCounter += 1) {
      var cardIndex = nameCounter + 1;
      if (cardIndex == 1) {
        cardName = "ace";
      } else if (cardIndex > 1 && cardIndex < 11) {
        cardName = numbers[cardIndex - 2];
      } else if (cardIndex == 11) {
        cardName = "jack";
      } else if (cardIndex == 12) {
        cardName = "queen";
      } else if (cardIndex == 13) {
        cardName = "king";
      }
      deck.push({
        suit: suits[suitCounter],
        rank: nameCounter + 1,
        value: nameCounter + 1,
        name: cardName,
      });
    }
  }
  // Set value of jack, queen and king to 10 and ace to 11
  for (var card in deck) {
    if (deck[card].rank >= 11 && deck[card].rank <= 13) {
      deck[card].value = 10;
    } else if (deck[card].rank == 1) {
      deck[card].value = 11;
    }
  }
  return deck;
}

function makeSixDecks() {
  var sixDecks = [];
  for (let deckCounter = 0; deckCounter < 6; deckCounter += 1) {
    sixDecks = sixDecks.concat(makeNewDeck());
  }
  return sixDecks;
}

function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}

// Check if someone has a blackjack
var checkBlackjack = function (cards) {
  var isBlackjack = false;
  if (cards.length == 2) {
    if (
      (cards[0].name == "ace" && cards[1].value == 10) ||
      (cards[0].value == 10 && cards[1].name == "ace")
    ) {
      isBlackjack = true;
    }
  }
  return isBlackjack;
};

// Sum up each player's card into the value of thier current hand, takes in an array of card objects
function sumCardsValue(cards) {
  var sum = 0;
  for (var item of cards) {
    if (item.name != "ace") {
      sum += item.value;
    }
    // Ace will be 11 if it does not make the total score exceed 21
    else {
      if (sum < 11) {
        sum += item.value;
      } else {
        sum += 1;
      }
    }
  }
  return sum;
}

function generateRoundScoreBoard(playersArray) {
  var counter = 0;
  var roundScoreBoard = {};
  while (counter < playersArray.length) {
    roundScoreBoard[playersArray[counter]] = "";
    counter += 1;
  }
  roundScoreBoard["Dealer"] = "";
  return roundScoreBoard;
}

function printRoundScoreBoard(scoreBoard) {
  var scoreBoardBox = document.querySelector("#round-results");
  var output = "";
  for (var entry in scoreBoard) {
    output += `${entry}: ${scoreBoard[entry]}<br>`;
  }
  scoreBoardBox.innerHTML = output;
}

function generateLeaderboard(numberOfPlayers) {
  var counter = 0;
  var leaderBoard = {};
  while (counter < numberOfPlayers) {
    leaderBoard[`Player ${counter + 1}`] = 0;
    counter += 1;
  }
  leaderBoard["Dealer"] = 0;
  return leaderBoard;
}

// Update the leaderboard player by player
function updateLeaderboard(winningPlayer) {
  leaderBoard[winningPlayer] += 1;
  var scoreSpace = document.querySelector("#scores");
  var output = "";
  for (var entry in leaderBoard) {
    output += `${entry}: ${leaderBoard[entry]}<br>`;
  }
  scoreSpace.innerHTML = output;
}

function printOutput(output) {
  var outputBox = document.querySelector("#output-div");
  outputBox.innerHTML = output;
}
