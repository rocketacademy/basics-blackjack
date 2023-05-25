// Default settings
var gameMode = "new round";
var gameDeck = shuffleDeck(makeSixDecks());
var playersArray = [];
var playerCounter = 0;
var dealerCards = [];
var playerCards = [];
var allPlayersCards = [];
var dealerHand = 0;
var playerHand = 0;
var allPlayersHand = [];
var playersBets = [];
var roundScoreBoard = {};
var betBoard = {};

var main = function (hitOrStand, playersArray) {
  return playGame(hitOrStand, playersArray);
};

// Generate the list of Players & corresponding boards
function generatePlayersArray(numberOfPlayers) {
  var playersArray = [];
  var counter = 0;
  while (counter < numberOfPlayers) {
    playersArray.push(`Player ${counter + 1}`);
    counter += 1;
  }
  roundScoreBoard = generateRoundScoreBoard(playersArray);
  printRoundScoreBoard(roundScoreBoard);
  betBoard = generateBetBoard(playersArray);
  printBetBoard(betBoard);
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
    roundScoreBoard = generateRoundScoreBoard(playersArray);
    playersBets = [];
    var betButton = document.querySelector("#bet-button");
    betButton.disabled = false;
    var playerBetField = document.querySelector("#player-bet");
    playerBetField.disabled = false;
    printOutput(`Player 1 - please enter your bet!`);
    gameMode = "take bets";
  }
  // Let every player enter their bets
  else if (gameMode == "take bets") {
    var playerBetField = document.querySelector("#player-bet");
    var playerBet = parseInt(playerBetField.value);
    printOutput(
      `Player ${
        playerCounter + 1
      } bets ${playerBet}. Next Player - please enter your bet.`
    );
    playersBets.push(playerBet);
    playerCounter += 1;
    if (playerCounter >= playersArray.length) {
      var nextButton = document.querySelector("#next-button");
      nextButton.disabled = false;
      var betButton = document.querySelector("#bet-button");
      betButton.disabled = true;
      playerBetField.disabled = true;
      playerCounter = 0; //reset
      printOutput(
        `All bets are in! ${playersBets}. Click 'next' for Dealer to start dealing cards.`
      );
      gameMode = "deal cards";
    }
  } else if (gameMode == "deal cards") {
    // Dealer draws cards
    dealerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());
    dealerHand = sumCardsValue(dealerCards);
    console.log(
      `Dealer drew ${dealerCards[0].suit} ${dealerCards[0].name} ${dealerCards[1].suit} ${dealerCards[1].name}. Dealer's hand: ${dealerHand}.`
    );
    // Players take turn to draw cards
    var output = "";
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
      output += `${playersArray[playerCounter]}: ${playerCards[0].suit} ${playerCards[0].name} | ${playerCards[1].suit} ${playerCards[1].name} (${playerHand})<br>`;
      console.log(
        `${playersArray[playerCounter]} got ${playerCards[0].suit} ${playerCards[0].name} ${playerCards[1].suit} ${playerCards[1].name}`
      );
    }
    console.log(`All players' hand: ${allPlayersHand}`);
    hitButton.disabled = false;
    standButton.disabled = false;
    printOutput(
      `Dealer drew ${dealerCards[0].suit} ${dealerCards[0].name} and a concealed card. <br>${output}Player 1 - select hit or stand.`
    );
    gameMode = "hit or stand";
  }

  // Players take turns to hit or stand
  else if (gameMode == "hit or stand") {
    if (allPlayersHand[playerCounter] >= 21 && hitOrStand != "stand") {
      printOutput(
        `${playersArray[playerCounter]}'s hand is already ${allPlayersHand[playerCounter]}. Passing...`
      );
      setTimeout(function () {
        playGame("stand", playersArray);
      }, 2000);
    }
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
      if (allPlayersHand[playerCounter] >= 21) {
        setTimeout(function () {
          playGame("stand", playersArray);
        }, 3500);
        printOutput(
          `${playersArray[playerCounter]} drew ${hitCard.suit} ${hitCard.name}. ${playersArray[playerCounter]}'s hand is already ${allPlayersHand[playerCounter]}. Sit tight and your turn will be passed.`
        );
      } else {
        printOutput(
          `${playersArray[playerCounter]} drew ${hitCard.suit} ${hitCard.name}. ${playersArray[playerCounter]}'s hand is now ${allPlayersHand[playerCounter]}. ${playersArray[playerCounter]} - hit or stand?`
        );
      }
    } else if (hitOrStand == "stand") {
      playerCounter += 1;
      if (
        playerCounter < playersArray.length &&
        allPlayersHand[playerCounter] < 21
      ) {
        var suitsAndNames = "";
        for (i = 0; i < allPlayersCards[playerCounter].length; i += 1) {
          suitsAndNames += `${allPlayersCards[playerCounter][i].suit}${allPlayersCards[playerCounter][i].name}  `;
        }
        printOutput(
          `${playersArray[playerCounter]}'s turn. Reminder - your cards are ${suitsAndNames} and your current hand is ${allPlayersHand[playerCounter]}.`
        );
      } else if (
        playerCounter < playersArray.length &&
        allPlayersHand[playerCounter] >= 21
      ) {
        var suitsAndNames = "";
        for (i = 0; i < allPlayersCards[playerCounter].length; i += 1) {
          suitsAndNames += `${allPlayersCards[playerCounter][i].suit}${allPlayersCards[playerCounter][i].name}  `;
        }
        printOutput(
          `${playersArray[playerCounter]} has ${suitsAndNames}. Your hand is already ${allPlayersHand[playerCounter]}. Passing...`
        );
        setTimeout(function () {
          playGame("stand", playersArray);
        }, 2000);
      } else if (playerCounter >= playersArray.length) {
        hitButton.disabled = true;
        standButton.disabled = true;
        printOutput(`Click 'next' to let Dealer have their turn.`);
        gameMode = "Dealer plays";
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
    var suitsAndNames = "";
    for (i = 0; i < dealerCards.length; i += 1) {
      suitsAndNames += `${dealerCards[i].suit}${dealerCards[i].name}  `;
    }
    gameMode = "check results";
    printOutput(
      `Dealer has ${suitsAndNames}, which adds up to a hand of ${dealerHand}. Click 'next' to tally results.`
    );
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

    // Update wins and losses
    if (roundScoreBoard["Dealer"] == "Bust") {
      for (
        let playerCounter = 0;
        playerCounter < playersArray.length;
        playerCounter += 1
      ) {
        if (roundScoreBoard[playersArray[playerCounter]] != "Bust") {
          betBoard[playersArray[playerCounter]] += playersBets[playerCounter];
          betBoard["Dealer"] -= playersBets[playerCounter];
        } else {
          betBoard["Dealer"] += playersBets[playerCounter];
          betBoard[playersArray[playerCounter]] -= playersBets[playerCounter];
        }
      }
    } else if (roundScoreBoard["Dealer"] == "Blackjack") {
      for (
        let playerCounter = 0;
        playerCounter < playersArray.length;
        playerCounter += 1
      ) {
        if (roundScoreBoard[playersArray[playerCounter]] != "Blackjack") {
          betBoard["Dealer"] += playersBets[playerCounter];
          betBoard[playersArray[playerCounter]] -= playersBets[playerCounter];
        }
      }
    } else {
      for (
        let playerCounter = 0;
        playerCounter < playersArray.length;
        playerCounter += 1
      ) {
        if (roundScoreBoard[playersArray[playerCounter]] == "Blackjack") {
          betBoard[playersArray[playerCounter]] +=
            playersBets[playerCounter] * 1.5;
          betBoard["Dealer"] -= playersBets[playerCounter] * 1.5;
        } else if (roundScoreBoard[playersArray[playerCounter]] == "Bust") {
          betBoard["Dealer"] += playersBets[playerCounter];
          betBoard[playersArray[playerCounter]] -= playersBets[playerCounter];
        } else if (
          roundScoreBoard[playersArray[playerCounter]] <
          roundScoreBoard["Dealer"]
        ) {
          betBoard["Dealer"] += playersBets[playerCounter];
          betBoard[playersArray[playerCounter]] -= playersBets[playerCounter];
        } else {
          if (
            roundScoreBoard[playersArray[playerCounter]] >
            roundScoreBoard["Dealer"]
          ) {
            betBoard[playersArray[playerCounter]] += playersBets[playerCounter];
            betBoard["Dealer"] -= playersBets[playerCounter];
          }
        }
      }
    }
    printBetBoard(betBoard);

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

function generateBetBoard(playersArray) {
  var counter = 0;
  var betBoard = {};
  while (counter < playersArray.length) {
    betBoard[playersArray[counter]] = 100;
    counter += 1;
  }
  betBoard["Dealer"] = 100;
  return betBoard;
}

function printBetBoard(betBoard) {
  var betBoardBox = document.querySelector("#bet-board");
  var output = "";
  for (var entry in betBoard) {
    output += `${entry}: ${betBoard[entry]}<br>`;
  }
  betBoardBox.innerHTML = output;
}

function printOutput(output) {
  var outputBox = document.querySelector("#output-div");
  outputBox.innerHTML = output;
}
