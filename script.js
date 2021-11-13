var playersImage =
  '<img src="https://c.tenor.com/EojqhZjGXDMAAAAj/tkthao219-quby.gif"/>';
var wagerImage =
  '<img src="https://c.tenor.com/ev84gGo0g8sAAAAi/tkthao219-quby.gif"/>';
var postWagerImage =
  '<img src="https://c.tenor.com/WnVtIyrGFqsAAAAi/tkthao219-quby.gif"/>';
var wagerErrorImage =
  '<img src="https://c.tenor.com/O5exqlsLA0AAAAAi/gabby-cute.gif"/>';
var rollImage =
  '<img src="https://c.tenor.com/39SseKZP8jYAAAAi/quby-dance.gif"/>';
var bombImage = '<img src="https://c.tenor.com/8C3lFqyUiroAAAAi/quby.gif"/>';
var standImage =
  '<img src="https://c.tenor.com/ivBgGj-cy80AAAAj/tkthao219-quby.gif"/>';
var finishImage =
  '<img src="https://c.tenor.com/5YF790yqQ1UAAAAi/fbcuteboy.gif"/>';
var gameOverImage =
  '<img src="https://c.tenor.com/wAx24E9mC0MAAAAi/t%E1%BB%A9c-smile.gif"/>';
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

var displayCards = function (player) {
  var message = "";
  if (player == numOfPlayers) {
    player = "dealer";
  }
  for (var i = 0; i < master[player].decks.length; i += 1) {
    message += `<br>${master[player].decks[i].name} of ${master[player].decks[i].emoji}`;
  }
  return message;
};

var displayOneDealerCard = function () {
  var message = `<br><br>❗️One of the Dealer's Cards is ${master["dealer"].decks[0].name} of ${master["dealer"].decks[0].emoji}❗️`;
  return message;
};

var displaySplitCards = function (player) {
  var message = "";
  master[player].blackjackValues = [];
  for (var i = 0; i < master[player].decks.length; i += 1) {
    var aceCounter = 0;
    var total = 0;
    var handNum = i + 1;
    message += `<br><b>Hand ${handNum}</b>:`;
    for (var j = 0; j < master[player].decks[i].length; j += 1) {
      message += `<br>${master[player].decks[i][j].name} of ${master[player].decks[i][j].emoji}`;
      if (master[player].decks[i][j].name == "ace" && aceCounter == 0) {
        total += 11;
        aceCounter += 1;
      } else {
        total += master[player].decks[i][j].blackjackValue;
      }
    }
    if (aceCounter != 0 && total > 21) {
      total -= 10;
    }
    if (total > 21) {
      master[player].blackjackValues.push(0);
    } else {
      master[player].blackjackValues.push(total);
    }

    message += `<br>Hand's card value is <b>${total}</b><br>`;
  }
  return message;
};

var currentValue = function (player) {
  var total = 0;
  var aceCounter = 0;
  if (player == numOfPlayers) {
    player = "dealer";
  }
  for (var i = 0; i < master[player].decks.length; i += 1) {
    if (master[player].decks[i].name == "ace" && aceCounter == 0) {
      total += 11;
      aceCounter += 1;
    } else {
      total += master[player].decks[i].blackjackValue;
    }
  }
  if (aceCounter != 0 && total > 21) {
    total -= 10;
  }
  return total;
};

var sumOfAllPoints = function (obj) {
  var total = 0;
  for (var i = 1; i < numOfPlayers; i += 1) {
    total += obj[i].playerPoints;
  }
  return total;
};

var createPlayers = function (obj, numOfPlayers) {
  for (var i = 0; i < numOfPlayers; i += 1) {
    if (i + 1 == numOfPlayers) {
      obj["dealer"] = { decks: [], blackjackValues: [] };
    } else {
      obj[i + 1] = {
        decks: [],
        blackjackValues: [],
        playerPoints: 100,
        playerBets: 0,
        split: false,
      };
    }
  }
  return obj;
};

var evaluation = function (player, dealer, i) {
  var message = "";
  if (player == dealer) {
    message += `It's a tie with the Dealer!`;
  } else if (player < dealer || dealer == "Blackjack") {
    message += `You have lost against the Dealer! (<b>${master[i].playerBets} points</b> lost)`;
    master[i].playerPoints -= master[i].playerBets;
  } else if (player > dealer || player == "Blackjack") {
    message += `You have won against the Dealer! (<b>${master[i].playerBets} points</b> awarded)`;
    master[i].playerPoints += master[i].playerBets;
  }
  message += `<br>`;
  return message;
};

var scoreboard = function () {
  var message = "";
  for (var i = 1; i < numOfPlayers; i += 1) {
    message += `<br>Player ${i}: ${master[i].playerPoints}`;
  }
  return message;
};

var numOfPlayers = 0; // Inclusive of dealer
var dealer = 0; // Dealer is always the last to play
var playerTurn = 1; // Default start with player 1
var gameMode = "pick number of players"; // 6 phases - 1"pick number of players", 2"bets", 3"draw cards", 4"game", 4.5"split", 5"choice", 6"results"
var playerBetsTurn = 1; // Default start with player 1
var splitQnAsked = false; // Tracks if split question has been answered
var splitTurn = 1; // Default to start split turn on 1
var splitMode = false; // To initiate split or not
var newDeck = shuffleCards(makeDeck());
var master = {};

var reset = function () {
  newDeck = shuffleCards(makeDeck());
  for (var i = 0; i < numOfPlayers; i += 1) {
    var currentRef = i + 1;
    if (currentRef == numOfPlayers) {
      master["dealer"] = { decks: [], blackjackValues: [] };
    } else {
      master[currentRef].decks = [];
      master[currentRef].blackjackValues = [];
      master[currentRef].playerBets = 0;
      master[currentRef].split = false;
    }
  }
  playerTurn = 1;
  gameMode = "bets";
  playerBetsTurn = 1;
};

// ===== MAIN FUNCTION ===== //

var main = function (input) {
  var myOutputValue = "";
  var dealer = numOfPlayers; // Dealer is always the last to play

  //PHASE 1: PICK NUMBER OF PLAYERS
  if (gameMode == "pick number of players") {
    if (input >= 2) {
      numOfPlayers = Number(input);
      myOutputValue += `You have selected <b>${numOfPlayers} players</b> to play. Press '<b>Submit</b>' to continue...`;
      gameMode = "bets";
      createPlayers(master, numOfPlayers);
    } else {
      myOutputValue +=
        `Please <b>input the number of players</b> in the game (at least 2, inclusive of dealer).<br>` +
        playersImage;
    }
  }
  //PHASE 2: BETS
  else if (gameMode == "bets") {
    myOutputValue += `Player ${playerBetsTurn}, you currently have <b>${master[playerBetsTurn].playerPoints} points</b>.<br><br>How many points (at least 1) would you like to wager?${wagerImage}`;
    // Check if any players still have points
    if (sumOfAllPoints(master) == 0) {
      myOutputValue = `All players do not have any points left... <b>GAME OVER</b>!${gameOverImage}<br><br>Please <b>refresh</b> the page to restart the game.`;
    }
    // To skip current player's bet if they have no more points left
    else if (master[playerBetsTurn].playerPoints == 0) {
      myOutputValue = `Player ${playerBetsTurn}, you do not have any points left... Press '<b>Submit</b> to continue...`;
      master[playerBetsTurn].playerBets = 0;
      if (playerBetsTurn == numOfPlayers - 1) {
        gameMode = "draw cards";
      } else {
        playerBetsTurn += 1;
      }
    } else if (input > 0 && input <= master[playerBetsTurn].playerPoints) {
      master[playerBetsTurn].playerBets = Number(input);
      myOutputValue = `Player ${playerBetsTurn}, you have chosen to wager <b>${master[playerBetsTurn].playerBets} points</b>.<br><br> Press '<b>Submit</b>' to continue...${postWagerImage}`;
      if (playerBetsTurn == numOfPlayers - 1) {
        gameMode = "draw cards";
      } else {
        playerBetsTurn += 1;
      }
    } else if (input > master[playerBetsTurn].playerPoints) {
      myOutputValue = `Player ${playerBetsTurn}, you <b>can't</b> wager what you don't have! 😤 ${wagerErrorImage}`;
    }
  }
  //PHASE 3: DRAW CARDS
  else if (gameMode == "draw cards") {
    // Create object for each player and deal 2 cards each
    for (var i = 0; i < numOfPlayers; i += 1) {
      var currentPlayer = i + 1;
      if (currentPlayer == numOfPlayers) {
        master["dealer"].decks = [newDeck.pop(), newDeck.pop()];
      } else if (master[currentPlayer].playerPoints != 0) {
        master[currentPlayer].decks = [newDeck.pop(), newDeck.pop()];
      }
    }
    // // TEST: To activate for forcing decks possibilities
    // master = {
    //   1: {
    //     decks: [
    //       { name: "ace", blackjackValue: 1, emoji: "♥︎" },
    //       { name: "king", blackjackValue: 10, emoji: "♣︎" },
    //     ],
    //     blackjackValues: [],
    //     playerPoints: 100,
    //     playerBets: 20,
    //   },
    //   dealer: {
    //     decks: [
    //       { name: "ace", blackjackValue: 1, emoji: "♥︎" },
    //       { name: 2, blackjackValue: 2, emoji: "♣︎" },
    //     ],
    //     blackjackValues: [],
    //   },
    // };
    gameMode = "game";
    myOutputValue += `Drawing <b>first 2 cards</b> 🎲🎲 for each player...${rollImage}`;
  }
  //PHASE 4: GAME
  else if (gameMode == "game") {
    // Dealer Turn
    if (playerTurn == dealer) {
      myOutputValue += `<b><u>Dealer</b></u><br>Dealer cards are:`;
      var dealerCards = displayCards(playerTurn);
      var currentTotal = currentValue(playerTurn);
      if (currentTotal == 21) {
        myOutputValue += dealerCards;
        myOutputValue += `<br><br>Dealer has scored a <b>Blackjack</b> ✨! Press '<b>Submit</b>' to see results...`;
        master["dealer"].blackjackValues.push("Blackjack");
      } else {
        while (currentTotal <= 16) {
          master["dealer"].decks.push(newDeck.pop());
          dealerCards = displayCards(playerTurn);
          currentTotal = currentValue(playerTurn);
        }
        myOutputValue += dealerCards;
        myOutputValue += `<br><br>Total dealer card value is <b>${currentTotal}</b>`;
        if (currentTotal > 21) {
          myOutputValue += ` (That looks like a <b>bust</b>! 💣)`;
          master["dealer"].blackjackValues.push(0);
        } else {
          master["dealer"].blackjackValues.push(currentTotal);
        }
        myOutputValue += `<br>Press '<b>Submit</b>' to see results...`;
      }
      gameMode = "results";
    } else {
      // Check if player has already hit game over
      if (master[playerTurn].playerPoints == 0) {
        master[playerTurn].blackjackValues.push(0);
        myOutputValue += `Player ${playerTurn}, you do not have any points left... <b>Skipping turn</b>...`;
        playerTurn += 1;
      }
      // Regular Player's turn (NOT DEALER)
      else {
        myOutputValue += `<b><u>Player ${playerTurn}</b></u><br>Your cards are:`;
        myOutputValue += displayCards(playerTurn);
        var currentTotal = currentValue(playerTurn);
        if (currentTotal == 21) {
          myOutputValue += `<br><br>WOW! You got a <b>Blackjack</b> ✨! Press '<b>Submit</b>' to continue to next player...`;
          master[playerTurn].blackjackValues.push("Blackjack");
          playerTurn += 1;
        } else if (
          master[playerTurn].decks[0].name ==
            master[playerTurn].decks[1].name &&
          !splitQnAsked
        ) {
          myOutputValue += `<br><br><b>You got a pair of identical cards!</b> Would you like to split your cards into 2 hands? <b>(yes/no)</b>`;
          gameMode = "split";
        } else if (splitMode) {
          myOutputValue = `<b><u>Player ${playerTurn}</b></u>`;
          myOutputValue += displaySplitCards(playerTurn);
          myOutputValue += `<br>For <b>Hand ${splitTurn}</b>, would you like to '<b>hit</b>' 💥 or '<b>stand</b>' ✋🏼?<br><i>(p.s. You must have at least 17 to stand)</i>`;
          gameMode = "choice";
        } else {
          myOutputValue += `<br><br>Your total card value is <b>${currentTotal}</b><br>Do you want to '<b>hit</b>' 💥 or '<b>stand</b>' ✋🏼?<br><i>(p.s. You must have at least 17 to stand)</i>`;
          gameMode = "choice";
          master[playerTurn].blackjackValues.push(currentTotal);
        }

        myOutputValue += displayOneDealerCard();
      }
    }
  }
  //PHASE 4.5: SPLIT
  else if (gameMode == "split") {
    if (input == "yes") {
      myOutputValue += `<b>You have chosen to split your cards</b>.<br><br>Your new hands are:`;
      master[playerTurn].decks = [
        [master[playerTurn].decks[0], newDeck.pop()],
        [master[playerTurn].decks[1], newDeck.pop()],
      ];
      myOutputValue += displaySplitCards(playerTurn);
      myOutputValue += `<br>Please press '<b>Submit</b>' to continue...`;
      master[playerTurn].split = true;
      splitQnAsked = true;
      splitMode = true;
      gameMode = "game";
    } else if (input == "no") {
      myOutputValue += `You have chosen not to split your cards. <b>Returning to your game...</b>`;
      splitQnAsked = true;
      gameMode = "game";
    } else {
      myOutputValue += `Error! Please enter '<b>yes</b>' or '<b>no</b>' to splitting your cards...`;
      myOutputValue += `<br><br><b><u>Player ${playerTurn}</b></u><br>Your cards are:`;
      myOutputValue += displayCards(playerTurn);
      myOutputValue += displayOneDealerCard();
    }
  }
  //PHASE 5: CHOICE
  else if (gameMode == "choice") {
    if (splitMode) {
      if (input == "hit") {
        master[playerTurn].decks[splitTurn - 1].push(newDeck.pop());
        myOutputValue += `<b><u>Player ${playerTurn}</b></u>`;
        myOutputValue += displaySplitCards(playerTurn);
        if (master[playerTurn].blackjackValues[splitTurn - 1] == 0) {
          myOutputValue += `<br>Looks like it's a <b>bust</b> 💣 Press '<b>Submit</b>' to continue...${bombImage}`;
          gameMode = "game";
          if (splitTurn == 2) {
            playerTurn += 1;
            splitTurn = 1;
            splitMode = false;
            splitQnAsked = false;
          } else {
            splitTurn += 1;
          }
        } else {
          myOutputValue += `<br>For <b>Hand ${splitTurn}</b>, do you want to '<b>hit</b>' 💥 or '<b>stand</b>' ✋🏼?<br><i>(p.s. You must have at least 17 to stand)</i>`;
        }
        myOutputValue += displayOneDealerCard();
      } else if (input == "stand") {
        if (master[playerTurn].blackjackValues[splitTurn - 1] <= 16) {
          return `The minimum value to '<b>stand</b>' ✋🏼 is 17 and you have <b>${
            master[playerTurn].blackjackValues[splitTurn - 1]
          }</b>. Please enter '<b>hit</b>' 💥.`;
        }
        myOutputValue += `<b><u>Player ${playerTurn}</b></u><br>`;
        myOutputValue += `You have chosen to stand for <b>Hand ${splitTurn}</b>. Your Blackjack value for this hand is <b>${
          master[playerTurn].blackjackValues[splitTurn - 1]
        }</b>.${standImage}`;
        gameMode = "game";
        if (splitTurn == 2) {
          playerTurn += 1;
          splitMode = false;
          splitQnAsked = false;
        } else {
          splitTurn += 1;
        }
      } else {
        // Error message for not entering 'hit' or 'stand'
        myOutputValue += `<b>Error</b>! Please enter if you would like to '<b>hit</b>' 💥 or '<b>stand</b>' ✋🏼 for <b>Hand ${splitTurn}</b><br><br><b><u>Player ${playerTurn}</b></u>:`;
        myOutputValue += displaySplitCards(playerTurn);
        myOutputValue += `<br><i>(p.s. You must have at least 17 to stand)</i>`;
      }
    } else if (input == "hit") {
      // Hit message
      master[playerTurn].decks.push(newDeck.pop());
      myOutputValue += `<b><u>Player ${playerTurn}</b></u><br>Your cards are:`;
      myOutputValue += displayCards(playerTurn);
      currentTotal = currentValue(playerTurn);

      myOutputValue += `<br><br>Your total card value is <b>${currentTotal}</b>`;
      master[playerTurn].blackjackValues[0] = currentTotal;
      if (currentTotal > 21) {
        myOutputValue += `<br>Looks like it's a <b>bust</b> 💣 Press '<b>Submit</b>' to continue to next player...${bombImage}`;
        master[playerTurn].blackjackValues[0] = 0;
        gameMode = "game";
        playerTurn += 1;
      } else {
        myOutputValue += `<br>Do you want to '<b>hit</b>' 💥 or '<b>stand</b>' ✋🏼?<br><i>(p.s. You must have at least 17 to stand)</i>`;
      }
      myOutputValue += displayOneDealerCard();
    } else if (input == "stand") {
      // Stand message
      if (master[playerTurn].blackjackValues[0] <= 16) {
        return `The minimum value to '<b>stand</b>' ✋🏼 is 17 and you have <b>${master[playerTurn].blackjackValues[0]}</b>. Please enter '<b>hit</b>' 💥.`;
      }
      myOutputValue += `<b><u>Player ${playerTurn}</b></u><br>`;
      myOutputValue += `You have chosen to stand. Your Blackjack value is <b>${master[playerTurn].blackjackValues[0]}</b>${standImage}`;
      gameMode = "game";
      playerTurn += 1;
    } else {
      // Error message for not entering 'hit' or 'stand'
      myOutputValue += `<b>Error</b>! Please enter if you would like to '<b>hit</b>' 💥 or '<b>stand</b>' ✋🏼<br><br><b><u>Player ${playerTurn}</b></u><br>Your cards are:`;
      myOutputValue += displayCards(playerTurn);
      myOutputValue += `<br><br>Your total card value is <b>${master[playerTurn].blackjackValues[0]}</b><br><i>(p.s. You must have at least 17 to stand)</i>`;
    }
  }
  //PHASE 6: RESULTS
  else if (gameMode == "results") {
    // List down all the cards dealt across all players
    for (var i = 1; i < numOfPlayers; i += 1) {
      if (master[i].playerPoints != 0) {
        myOutputValue += `<b><u>Player ${i}</b></u>`;
        if (master[i].split) {
          myOutputValue += displaySplitCards(i);
          myOutputValue += `<br>`;
        } else {
          myOutputValue += ` (${master[i].blackjackValues[0]})`;
          myOutputValue += displayCards(i);
          myOutputValue += `<br><br>`;
        }
      }
    }
    // Displays dealer cards
    myOutputValue += `<b><u>Dealer</b></u>`;
    myOutputValue += ` (${master["dealer"].blackjackValues[0]})`;
    myOutputValue += displayCards(dealer);
    myOutputValue += `<br><br>`;

    // Displays final result of all players, except dealer
    var dealerValue = 0;
    var currentPlayerValue = 0;
    for (var i = 1; i < numOfPlayers; i += 1) {
      if (master[i].split) {
        for (var j = 0; j < 2; j += 1) {
          myOutputValue += `Player ${i} (Hand ${j + 1}): `;
          dealerValue = master["dealer"].blackjackValues[0];
          currentPlayerValue = master[i].blackjackValues[j];
          myOutputValue += evaluation(currentPlayerValue, dealerValue, i);
        }
      } else {
        myOutputValue += `Player ${i}: `;
        if (master[i].playerPoints != 0) {
          dealerValue = master["dealer"].blackjackValues[0];
          currentPlayerValue = master[i].blackjackValues[0];
          myOutputValue += evaluation(currentPlayerValue, dealerValue, i);
        } else {
          myOutputValue += `<b>GAME OVER</b><br>`;
        }
      }
    }
    myOutputValue += `<br><b><u>Scoreboard</b></u>`;
    myOutputValue += scoreboard();

    myOutputValue += `<br><br>Please press '<b>Submit</b>' to play again!${finishImage}`;
    reset();
  }

  return myOutputValue;
};
