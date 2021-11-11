var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitsEmoji = ["♥︎", "♦︎", "♣︎", "♠︎"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var currentEmoji = suitsEmoji[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      var currentValue = rankCounter;
      if (currentValue == 11 || currentValue == 12 || currentValue == 13) {
        currentValue = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
        blackjackValue: currentValue,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

var numOfPlayers = 4; // Inclusive of dealer
var dealer = numOfPlayers; // Dealer is always the last to play
var allCardsDealt = []; // Holds array of card object arrays
var playersBlackjackValue = []; // Holds array of final numbers
var playerTurn = 1; // Default start with player 1
var gameMode = "draw cards"; // 4 phases - "draw cards", "game", "choice", "results"
var newDeck = shuffleCards(makeDeck());

var reset = function () {
  newDeck = shuffleCards(makeDeck());
  allCardsDealt = [];
  playersBlackjackValue = [];
  playerTurn = 1;
  gameMode = "draw cards";
};

// ===== MAIN FUNCTION ===== //

var main = function (input) {
  var myOutputValue = "";
  //PHASE 1: DRAW CARDS
  if (gameMode == "draw cards") {
    // Create object for each player and deal 2 cards each
    for (var i = 0; i < numOfPlayers; i += 1) {
      var card1 = newDeck.pop();
      var card2 = newDeck.pop();
      var first2Cards = [card1, card2];
      allCardsDealt.push(first2Cards);
    }
    gameMode = "game";
    myOutputValue += `Drawing <b>first 2 cards</b> 🎲🎲 for each player...`;
  }
  //PHASE 2: GAME
  else if (gameMode == "game") {
    // Dealer Turn
    if (playerTurn == dealer) {
      myOutputValue += `<b><u>Dealer</b></u><br>`;
      myOutputValue += `Dealer cards are:`;
      playersBlackjackValue.push("");
      var dealerCards = "";
      var currentTotal = 0;
      var aceCounter = 0;
      for (var i = 0; i < allCardsDealt[playerTurn - 1].length; i += 1) {
        dealerCards += `<br>${allCardsDealt[playerTurn - 1][i].name} of ${
          allCardsDealt[playerTurn - 1][i].emoji
        }`;
        if (allCardsDealt[playerTurn - 1][i].name == "ace" && aceCounter == 0) {
          currentTotal += 11;
          aceCounter += 1;
        } else {
          currentTotal += allCardsDealt[playerTurn - 1][i].blackjackValue;
        }
      }
      if (currentTotal == 21) {
        myOutputValue += dealerCards;
        myOutputValue += `<br><br>Dealer has scored a <b>Blackjack</b> ✨! Press '<b>Submit</b>' to see results...`;
        playersBlackjackValue[playerTurn - 1] = "Blackjack";
      } else {
        while (currentTotal <= 16) {
          dealerCards = "";
          allCardsDealt[playerTurn - 1].push(newDeck.pop());
          var currentTotal = 0;
          var aceCounter = 0;
          for (var i = 0; i < allCardsDealt[playerTurn - 1].length; i += 1) {
            dealerCards += `<br>${allCardsDealt[playerTurn - 1][i].name} of ${
              allCardsDealt[playerTurn - 1][i].emoji
            }`;
            if (
              allCardsDealt[playerTurn - 1][i].name == "ace" &&
              aceCounter == 0
            ) {
              aceCounter += 1;
              currentTotal += 11;
            } else {
              currentTotal += allCardsDealt[playerTurn - 1][i].blackjackValue;
            }
          }
          if (aceCounter != 0 && currentTotal > 21) {
            currentTotal -= 10;
          }
        }
        myOutputValue += dealerCards;
        myOutputValue += `<br><br>Total dealer card value is <b>${currentTotal}</b>`;
        if (currentTotal > 21) {
          myOutputValue += ` (That looks like a <b>bust</b>! 💣)`;
        }
        myOutputValue += `<br>Press '<b>Submit</b>' to see results...`;
        if (currentTotal > 21) {
          playersBlackjackValue[playerTurn - 1] = 0;
        } else {
          playersBlackjackValue[playerTurn - 1] = currentTotal;
        }
      }
      gameMode = "results";
    } else {
      // Regular Player's turn (NOT DEALER)
      myOutputValue += `<b><u>Player ${playerTurn}</b></u><br>`;
      myOutputValue += `Your cards are:`;
      var currentTotal = 0;
      var aceCounter = 0;
      for (var i = 0; i < allCardsDealt[playerTurn - 1].length; i += 1) {
        myOutputValue += `<br>${allCardsDealt[playerTurn - 1][i].name} of ${
          allCardsDealt[playerTurn - 1][i].emoji
        }`;
        if (allCardsDealt[playerTurn - 1][i].name == "ace" && aceCounter == 0) {
          currentTotal += 11;
          aceCounter += 1;
        } else {
          currentTotal += allCardsDealt[playerTurn - 1][i].blackjackValue;
        }
      }
      if (currentTotal == 21) {
        myOutputValue += `<br><br>WOW! You got a <b>Blackjack</b> ✨! Press '<b>Submit</b>' to continue to next player...`;
        playerTurn += 1;
        playersBlackjackValue.push("Blackjack");
      } else {
        myOutputValue += `<br><br>Your total card value is <b>${currentTotal}</b>`;
        myOutputValue += `<br>Do you want to '<b>hit</b>' 💥 or '<b>stand</b>' ✋🏼?<br><i>(p.s. You must have at least 17 to stand)</i>`;
        gameMode = "choice";
        playersBlackjackValue.push(currentTotal);
      }
    }
  }
  //PHASE 3: CHOICE
  else if (gameMode == "choice") {
    if (input == "hit") {
      // Hit message
      allCardsDealt[playerTurn - 1].push(newDeck.pop());
      myOutputValue += `<b><u>Player ${playerTurn}</b></u><br>`;
      myOutputValue += `Your cards are:`;
      var currentTotal = 0;
      var aceCounter = 0;
      for (var i = 0; i < allCardsDealt[playerTurn - 1].length; i += 1) {
        myOutputValue += `<br>${allCardsDealt[playerTurn - 1][i].name} of ${
          allCardsDealt[playerTurn - 1][i].emoji
        }`;
        if (allCardsDealt[playerTurn - 1][i].name == "ace" && aceCounter == 0) {
          aceCounter += 1;
          currentTotal += 11;
        } else {
          currentTotal += allCardsDealt[playerTurn - 1][i].blackjackValue;
        }
      }

      if (aceCounter != 0 && currentTotal > 21) {
        currentTotal -= 10;
      }

      myOutputValue += `<br><br>Your total card value is <b>${currentTotal}</b>`;
      playersBlackjackValue[playerTurn - 1] = currentTotal;
      if (currentTotal > 21) {
        myOutputValue += `<br>Looks like it's a <b>bust</b> 💣 Press '<b>Submit</b>' to continue to next player...`;
        playersBlackjackValue[playerTurn - 1] = 0;
        gameMode = "game";
        playerTurn += 1;
      } else {
        myOutputValue += `<br>Do you want to '<b>hit</b>' 💥 or '<b>stand</b>' ✋🏼?<br><i>(p.s. You must have at least 17 to stand)</i>`;
      }
    } else if (input == "stand") {
      // Stand message
      if (playersBlackjackValue[playerTurn - 1] <= 16) {
        return `The minimum value to '<b>stand</b>' ✋🏼 is 17 and you have ${
          playersBlackjackValue[playerTurn - 1]
        }. Please enter '<b>hit</b>' 💥.`;
      }
      myOutputValue += `<b><u>Player ${playerTurn}</b></u><br>`;
      myOutputValue += `You have chosen to stand. Your Blackjack value is <b>${
        playersBlackjackValue[playerTurn - 1]
      }</b>`;
      gameMode = "game";
      playerTurn += 1;
    } else {
      // Error message for not entering 'hit' or 'stand'
      myOutputValue += `<b>Error</b>! Please enter if you would like to '<b>hit</b>' 💥 or '<b>stand</b>' ✋🏼<br><br>`;
      myOutputValue += `<b><u>Player ${playerTurn}</b></u><br>`;
      myOutputValue += `Your cards are:`;
      for (var i = 0; i < allCardsDealt[playerTurn - 1].length; i += 1) {
        myOutputValue += `<br>${allCardsDealt[playerTurn - 1][i].name} of ${
          allCardsDealt[playerTurn - 1][i].emoji
        }`;
      }
      myOutputValue += `<br><br>Your total card value is <b>${
        playersBlackjackValue[playerTurn - 1]
      }</b><br><i>(p.s. You must have at least 17 to stand)</i>`;
    }
  }
  //PHASE 4: RESULTS
  else if (gameMode == "results") {
    // List down all the cards dealt across all players
    for (var i = 0; i < numOfPlayers; i += 1) {
      if (i + 1 == numOfPlayers) {
        myOutputValue += `<b><u>Dealer</b></u>`;
      } else {
        myOutputValue += `<b><u>Player ${i + 1}</b></u>`;
      }
      myOutputValue += ` (${playersBlackjackValue[i]})`;
      for (var j = 0; j < allCardsDealt[i].length; j += 1) {
        myOutputValue += `<br>${allCardsDealt[i][j].name} of ${allCardsDealt[i][j].emoji}`;
      }
      myOutputValue += `<br><br>`;
    }

    // Displays final result of all players, except dealer
    for (var i = 0; i < numOfPlayers - 1; i += 1) {
      myOutputValue += `Player ${i + 1}: `;
      var dealerValue = playersBlackjackValue[dealer - 1];
      var currentPlayerValue = playersBlackjackValue[i];
      if (currentPlayerValue == dealerValue) {
        myOutputValue += `It's a tie with the Dealer!`;
      } else if (dealerValue == "Blackjack") {
        myOutputValue += `You have lost against the Dealer!`;
      } else if (currentPlayerValue == "Blackjack") {
        myOutputValue += `You have won against the Dealer!`;
      } else if (currentPlayerValue > dealerValue) {
        myOutputValue += `You have won against the Dealer!`;
      } else if (currentPlayerValue < dealerValue) {
        myOutputValue += `You have lost against the Dealer!`;
      }
      myOutputValue += `<br>`;
    }

    myOutputValue += `<br>Please press '<b>Submit</b>' to play again!`;
    reset();
  }

  return myOutputValue;
};
