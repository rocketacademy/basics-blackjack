document.querySelector("#hit-button").disabled = true;
document.querySelector("#stand-button").disabled = true;
document.querySelector("#split-button").disabled = true;

// Global variables for blackjack game
var gameMode = "numOfPlayers";
var players = [];
var numOfPlayers = 1;
var dealerHand = [];
var dealerHandOutput = "";
var dealerHandValue = 0;
var BLACKJACK = "got blackjack";
var WIN = "won";
var LOSE = "lost";
var TIE = "tied";
var PLAYING = "playing";
var currPlayer = 0;
var betsPlaced = [];
var standings = "";

// Emojis for suits
var SPADE = "♠️";
var HEART = "♥️";
var CLUB = "♣️";
var DIAMOND = "♦️";

// Make card deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    var currentEmoji = "";
    if (currentSuit == "spades") {
      currentEmoji = SPADE;
    } else if (currentSuit == "hearts") {
      currentEmoji = HEART;
    } else if (currentSuit == "clubs") {
      currentEmoji = CLUB;
    } else if (currentSuit == "diamonds") {
      currentEmoji = DIAMOND;
    }
    // Loop from 1 to 13 to create all cards for a given suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var valueName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "A";
      } else if (cardName == 11) {
        cardName = "J";
      } else if (cardName == 12) {
        cardName = "Q";
      } else if (cardName == 13) {
        cardName = "K";
      }

      //If rank is 11, 12 or 13, set valueName to 10. If ace is drawn, set valueName to 11.
      if (rankCounter > 10) {
        valueName = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emoji: currentEmoji,
        value: valueName,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
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

// Shuffle the deck and save it in a new variable shuffledDeck
var shuffledDeck = shuffleCards(makeDeck());

// Reset global variables function
var resetHand = function () {
  currPlayer = 0;
  for (i = 0; i < numOfPlayers; i += 1) {
    players[i].hand = [];
    players[i].outcome = PLAYING;
    players[i].value = 0;
    players[i].output = "";
    players[i].awaitnewhand = false;
  }
  dealerHand = [];
  dealerHandOutput = "";
  dealerHandValue = 0;
  shuffledDeck = shuffleCards(makeDeck());

  return;
};

// Initiate players array based on number of players
var initiatePlayersArray = function (input) {
  if (input == NaN || input > 5 || input < 1) {
    return "Invalid option. Please enter the number of players from 1-5.";
  } else {
    numOfPlayers = input;
    for (p = 0; p < numOfPlayers; p += 1) {
      players.push({
        hand: [],
        bet: 1,
        purse: 100,
        output: "",
        value: 0,
        outcome: PLAYING,
        awaitnewhand: false,
        split: false,
      });
    }
    // Game mode switches to placeBet after players array is generated
    gameMode = "placeBet";

    var gameOutput = `${numOfPlayers} players selected. Player 1, please place your wager. <br><br>All players start with 100 chips.`;
  }
  return gameOutput;
};

// Players take turns to place bets
var placeBet = function (input) {
  tabulateChips();

  if (input == NaN || input > players[currPlayer].purse || input == "") {
    return `Invalid option. Player ${
      currPlayer + 1
    }, please enter a chip amount between 1 and ${players[currPlayer].purse}.`;
  }

  while (currPlayer < numOfPlayers) {
    players[currPlayer].bet = input;
    gameOutput = `Player ${currPlayer + 1} has wagered ${
      players[currPlayer].bet
    } chips.<br>`;

    currPlayer += 1;

    if (currPlayer < numOfPlayers) {
      var addReply = `Player ${currPlayer + 1}'s turn to place a bet.`;
      return gameOutput + addReply;
    } else {
      gameOutput =
        gameOutput + `<br>All bets placed.<br>Click Submit to deal the cards.`;
      gameMode = "deal";
      currPlayer = 0;
      return gameOutput;
    }
  }
};

// Players are dealt their first 2 cards, and blackjack conditions are analysed and revealed
var dealCards = function (input) {
  // Reset global variables
  resetHand();
  // 2 cards are dealt to each player and dealer
  for (i = 0; i < 2; i += 1) {
    for (j = 0; j < numOfPlayers; j += 1) {
      players[j].hand.push(shuffledDeck.pop());
    }
    dealerHand.push(shuffledDeck.pop());
  }

  // Players' and dealer's cards are added together to have value and output
  while (currPlayer < numOfPlayers) {
    for (i = 0; i < players[currPlayer].hand.length; i += 1) {
      players[currPlayer].output =
        players[currPlayer].output +
        " " +
        players[currPlayer].hand[i].name +
        players[currPlayer].hand[i].emoji;

      players[currPlayer].value += Number(players[currPlayer].hand[i].value);
    }

    for (j = 0; j < players[currPlayer].hand.length; j += 1) {
      if (
        players[currPlayer].value < 12 &&
        players[currPlayer].hand[j].name == "A" &&
        players[currPlayer].hand[j].value == 1
      ) {
        players[currPlayer].hand[j].value = 11;
        players[currPlayer].value += 10;
      }
    }
    currPlayer += 1;
  }

  dealerHandValue = Number(dealerHand[0].value) + Number(dealerHand[1].value);

  for (i = 0; i < dealerHand.length; i += 1) {
    if (
      dealerHandValue < 12 &&
      dealerHand[i].name == "A" &&
      dealerHand[i].value == 1
    ) {
      dealerHand[i].value = 11;
      dealerHandValue += 10;
    }
  }

  dealerHandOutput = dealerHand[0].name + dealerHand[0].emoji + " 🂠";

  var playersGotBlackjack = [];
  var dealerHasBlackjack = false;
  // Analysis of Blackjack conditions for both player and dealer
  if (dealerHandValue == 21) {
    dealerHandOutput =
      dealerHand[0].name +
      dealerHand[0].emoji +
      " " +
      dealerHand[1].name +
      dealerHand[1].emoji;

    dealerHasBlackjack = true;

    for (i = 0; i < numOfPlayers; i += 1) {
      if (players[i].value == 21) {
        players[i].outcome = TIE;
        playersGotBlackjack.push(i + 1);
      } else {
        players[i].outcome = LOSE;
      }
    }
  } else {
    for (j = 0; j < numOfPlayers; j += 1) {
      if (players[j].value == 21) {
        players[j].outcome = BLACKJACK;
        playersGotBlackjack.push(j + 1);
      }
    }
  }

  // Player is made known his hand and one of computer's cards
  var gameOutput = `The dealer has: ${dealerHandOutput}<br>`;

  for (i = 0; i < numOfPlayers; i += 1) {
    gameOutput += `Player ${i + 1} has: ${players[i].output}<br>`;
  }

  var blackJackReply = "";
  // Informing player of winning condition "Blackjack" if present
  if (dealerHasBlackjack) {
    blackJackReply = "The dealer has blackjack!<br>";

    if (playersGotBlackjack.length > 0) {
      var addReply3 = "";

      if (playersGotBlackjack.length == 1) {
        addReply3 += `Player ${playersGotBlackjack[0]} also has blackjack!<br>`;
      } else if (playersGotBlackjack.length == 2) {
        addReply3 += `Players ${playersGotBlackjack[0]} and ${playersGotBlackjack[1]} also have blackjack!<br>`;
      } else if (playersGotBlackjack.length > 2) {
        addReply3 += `Players ${playersGotBlackjack[0]}`;
        for (i = 1; i < playersGotBlackjack.length - 1; i += 1) {
          addReply3 += `, ${playersGotBlackjack[i]}`;
        }
        addReply3 += `and ${
          playersGotBlackjack[playersGotBlackjack.length - 1]
        } also have blackjack!<br>`;
      }

      blackJackReply +=
        addReply3 +
        "<br>They tie and get their money back. The rest lose their bets unfortunately.<br><br>Press Submit to deal again.";
    } else {
      blackJackReply += `All players lose their bets.<br><br>Press Submit to deal again.`;
    }
  } else {
    blackJackReply =
      "<br>The dealer took a peak at his cards - he does not have blackjack.<br>";

    if (playersGotBlackjack.length > 0) {
      var addReply3 = "";

      if (playersGotBlackjack.length == 1) {
        addReply3 += `Player ${playersGotBlackjack[0]} has blackjack!<br>`;
      } else if (playersGotBlackjack.length == 2) {
        addReply3 += `Players ${playersGotBlackjack[0]} and ${playersGotBlackjack[1]} have blackjack!<br>`;
      } else if (playersGotBlackjack.length > 2) {
        addReply3 += `Players ${playersGotBlackjack[0]}`;
        for (j = 1; j < playersGotBlackjack.length - 1; j += 1) {
          addReply3 += `, ${playersGotBlackjack[j]}`;
        }
        addReply3 += ` and ${
          playersGotBlackjack[playersGotBlackjack.length - 1]
        } have blackjack!<br>`;
      }

      blackJackReply += addReply3 + "They win 1.5 times their wagers!";
    }

    currPlayer = 0;
    for (i = 0; i < numOfPlayers; i += 1) {
      if (players[currPlayer].outcome != PLAYING) {
        currPlayer += 1;
      }
    }

    gameMode = "playerDraws";
    blackJackReply += `<br>Player ${
      currPlayer + 1
    }, it's your turn. Choose 'hit' or 'stand'.`;
    document.querySelector("#submit-button").disabled = true;
    document.querySelector("#hit-button").disabled = false;
    if (players[currPlayer].value < 16) {
      document.querySelector("#stand-button").disabled = true;
    } else {
      document.querySelector("#stand-button").disabled = false;
    }
    if (players[currPlayer].hand[0].name == players[currPlayer].hand[1].name) {
      document.querySelector("#split-button").disabled = false;
    }
  }

  tabulateChips();
  return gameOutput + blackJackReply;
};

var playerHits = function () {
  players[currPlayer].hand.push(shuffledDeck.pop());

  players[currPlayer].output = "";
  players[currPlayer].value = 0;

  for (i = 0; i < players[currPlayer].hand.length; i += 1) {
    players[
      currPlayer
    ].output += ` ${players[currPlayer].hand[i].name}${players[currPlayer].hand[i].emoji}`;

    players[currPlayer].value += Number(players[currPlayer].hand[i].value);
  }

  for (j = 0; j < players[currPlayer].hand.length; j += 1) {
    if (
      players[currPlayer].value < 12 &&
      players[currPlayer].hand[j].name == "A" &&
      players[currPlayer].hand[j].value == 1
    ) {
      players[currPlayer].hand[j].value = 11;
      players[currPlayer].value += 10;
    }
    if (
      players[currPlayer].value > 21 &&
      players[currPlayer].hand[j].value == 11
    ) {
      players[currPlayer].hand[j].value = 1;
      players[currPlayer].value -= 10;
    }
  }

  document.querySelector("#submit-button").disabled = true;
  document.querySelector("#hit-button").disabled = false;
  if (players[currPlayer].value < 16) {
    document.querySelector("#stand-button").disabled = true;
  } else {
    document.querySelector("#stand-button").disabled = false;
  }
  if (players[currPlayer].hand[0].name == players[currPlayer].hand[1].name) {
    document.querySelector("#split-button").disabled = false;
  }

  gameOutput = `The dealer has: ${dealerHandOutput}<br>`;
  for (i = 0; i < numOfPlayers; i += 1) {
    gameOutput += `Player ${i + 1} has: ${players[i].output}<br>`;
  }

  if (players[currPlayer].value <= 21) {
    var addReply2 = `<br>Player ${
      currPlayer + 1
    }, type 'hit' or 'stand' and click Submit.`;
  }
  if (players[currPlayer].value > 21) {
    players[currPlayer].outcome = LOSE;
    addReply2 = `<br>Player ${currPlayer + 1}, you went bust with ${
      players[currPlayer].value
    } points, sorry. You ${players[currPlayer].outcome}.<br><br>`;

    // Loop to select next player whose hand is still alive to 'hit' or 'stand'
    for (k = currPlayer; k < numOfPlayers; k += 1) {
      if (players[currPlayer].outcome == PLAYING) {
        addReply2 += `Player ${
          currPlayer + 1
        }, it's your turn. Choose 'hit' or 'stand'.`;
        if (players[currPlayer].value < 16) {
          document.querySelector("#stand-button").disabled = true;
        } else {
          document.querySelector("#stand-button").disabled = false;
        }
        tabulateChips();
        return gameOutput + addReply2;
      } else {
        currPlayer += 1;
        tabulateChips();
      }
    }

    if (currPlayer == numOfPlayers) {
      document.querySelector("#submit-button").disabled = false;
      document.querySelector("#hit-button").disabled = true;
      document.querySelector("#stand-button").disabled = true;
      var skipDealerDraws = true;
      for (j = 0; j < numOfPlayers; j += 1) {
        if (players[j].outcome == PLAYING) {
          skipDealerDraws = false;
        }
      }

      if (skipDealerDraws) {
        gameMode = "deal";
        addReply2 += "End of round. Click Submit to play a new hand.";
      } else {
        gameMode = "dealerDraws";
        addReply2 +=
          "All players had their turns. It's the dealer's turn to draw.<br>Click Submit to continue.";
      }
    }
  }
  return gameOutput + addReply2;
};

var playerStands = function () {
  if (players[currPlayer].value < 16) {
    gameOutput = `The dealer has: ${dealerHandOutput}<br>`;
    for (i = 0; i < numOfPlayers; i += 1) {
      gameOutput += `Player ${i + 1} has: ${players[i].output}<br>`;
    }

    addReply2 = `<br>Sorry Player ${
      currPlayer + 1
    }. Your hand has less than 16 points. You have to hit.`;
  } else {
    gameOutput = `The dealer has: ${dealerHandOutput}<br>`;
    for (i = 0; i < numOfPlayers; i += 1) {
      gameOutput += `Player ${i + 1} has: ${players[i].output}<br>`;
    }
    addReply2 = `<br>Player ${currPlayer + 1}, you chose to stand.<br><br>`;

    // Loop to select next player whose hand is still alive to 'hit' or 'stand'
    for (i = currPlayer; i < numOfPlayers; i += 1) {
      currPlayer += 1;

      if (currPlayer == numOfPlayers) {
        gameMode = "dealerDraws";
        addReply2 +=
          "All players had their turns. It's the dealer's turn to draw.<br>Click Submit to continue.";
        document.querySelector("#submit-button").disabled = false;
        document.querySelector("#hit-button").disabled = true;
        document.querySelector("#stand-button").disabled = true;
      } else if (players[currPlayer].outcome == PLAYING) {
        addReply2 += `Player ${
          currPlayer + 1
        }, it's your turn. Type 'hit' or 'stand' and then click submit.`;
        if (players[currPlayer].value < 16) {
          document.querySelector("#stand-button").disabled = true;
        } else {
          document.querySelector("#stand-button").disabled = false;
        }
        if (
          players[currPlayer].hand[0].name == players[currPlayer].hand[1].name
        ) {
          document.querySelector("#split-button").disabled = false;
        }
        tabulateChips();
        return gameOutput + addReply2;
      }
    }
  }
  tabulateChips();
  return gameOutput + addReply2;
};

var playerSplits = function () {
  document.querySelector("#split-button").disabled = true;
  players[currPlayer].hand2 = [];
  players[currPlayer].value2 = 0;
  players[currPlayer].outcome2 = PLAYING;
  players[currPlayer].split = true;

  players[currPlayer].hand2.push(players[currPlayer].hand.pop());

  players[currPlayer].hand.push(shuffledDeck.pop());
  players[currPlayer].hand2.push(shuffledDeck.pop());

  //Calculate output and value of each of player's hand
  players[currPlayer].output = "";
  players[currPlayer].output2 = "";
  players[currPlayer].value = 0;

  for (i = 0; i < players[currPlayer].hand.length; i += 1) {
    players[
      currPlayer
    ].output += ` ${players[currPlayer].hand[i].name}${players[currPlayer].hand[i].emoji}`;
    players[
      currPlayer
    ].output2 += ` ${players[currPlayer].hand2[i].name}${players[currPlayer].hand2[i].emoji}`;

    players[currPlayer].value += Number(players[currPlayer].hand[i].value);
    players[currPlayer].value2 += Number(players[currPlayer].hand2[i].value);
  }

  for (j = 0; j < players[currPlayer].hand.length; j += 1) {
    if (
      players[currPlayer].value < 12 &&
      players[currPlayer].hand[j].name == "A" &&
      players[currPlayer].hand[j].value == 1
    ) {
      players[currPlayer].hand[j].value = 11;
      players[currPlayer].value += 10;
    }
    if (
      players[currPlayer].value > 21 &&
      players[currPlayer].hand[j].value == 11
    ) {
      players[currPlayer].hand[j].value = 1;
      players[currPlayer].value -= 10;
    }
  }
  for (j = 0; j < players[currPlayer].hand2.length; j += 1) {
    if (
      players[currPlayer].value2 < 12 &&
      players[currPlayer].hand2[j].name == "A" &&
      players[currPlayer].hand2[j].value == 1
    ) {
      players[currPlayer].hand2[j].value = 11;
      players[currPlayer].value2 += 10;
    }
    if (
      players[currPlayer].value2 > 21 &&
      players[currPlayer].hand2[j].value == 11
    ) {
      players[currPlayer].hand2[j].value = 1;
      players[currPlayer].value2 -= 10;
    }
  }

  gameOutput = `The dealer has: ${dealerHandOutput}<br>`;
  for (i = 0; i < numOfPlayers; i += 1) {
    gameOutput += `Player ${i + 1} has: ${players[i].output}<br>`;
    if (players[i].split == true) {
      gameOutput += `Player ${i + 1}'s second hand has: ${
        players[i].output2
      }<br>`;
    }
  }
  addReply2 = `<br>Player ${currPlayer + 1}, you chose to split.<br>`;

  if (players[currPlayer].hand[0].name == "A") {
    addReply2 += `No further cards can be drawn by Player ${
      currPlayer + 1
    }.<br><br>`;
  }

  for (i = currPlayer; i < numOfPlayers; i += 1) {
    currPlayer += 1;

    if (currPlayer == numOfPlayers) {
      gameMode = "dealerDraws";
      addReply2 +=
        "All players had their turns. It's the dealer's turn to draw.<br>Click Submit to continue.";
      document.querySelector("#submit-button").disabled = false;
      document.querySelector("#hit-button").disabled = true;
      document.querySelector("#stand-button").disabled = true;
    } else if (players[currPlayer].outcome == PLAYING) {
      addReply2 += `Player ${
        currPlayer + 1
      }, it's your turn. Click 'hit' or 'stand'.`;
      if (players[currPlayer].value < 16) {
        document.querySelector("#stand-button").disabled = true;
      } else {
        document.querySelector("#stand-button").disabled = false;
      }
      tabulateChips();
      return gameOutput + addReply2;
    }
  }
  tabulateChips();
  return gameOutput + addReply2;
};

// Players decide whether to Hit or Stand (function is now unnecessary and can be deleted)
var hitOrStand = function (userInput) {
  if (currPlayer == numOfPlayers) {
    gameMode = "dealerDraws";
  }

  // If player enters invalid input
  if (players[currPlayer].outcome == PLAYING) {
    if (userInput != "stand" && userInput != "hit") {
      gameOutput = `The dealer has: ${dealerHandOutput}<br>`;

      for (i = 0; i < numOfPlayers; i += 1) {
        gameOutput += `Player ${i + 1} has: ${players[i].output}<br>`;
      }
      return gameOutput + `<br><br>Invalid choice.`;
    }

    // If player hits
    if (userInput == "hit") {
      // Each 'hit' adds a card to player's hand
      players[currPlayer].hand.push(shuffledDeck.pop());

      players[currPlayer].output = "";
      players[currPlayer].value = 0;

      for (i = 0; i < players[currPlayer].hand.length; i += 1) {
        players[
          currPlayer
        ].output += ` ${players[currPlayer].hand[i].name}${players[currPlayer].hand[i].emoji}`;

        players[currPlayer].value += Number(players[currPlayer].hand[i].value);
      }

      for (j = 0; j < players[currPlayer].hand.length; j += 1) {
        if (
          players[currPlayer].value < 12 &&
          players[currPlayer].hand[j].name == "A" &&
          players[currPlayer].hand[j].value == 1
        ) {
          players[currPlayer].hand[j].value = 11;
          players[currPlayer].value += 10;
        }
        if (
          players[currPlayer].value > 21 &&
          players[currPlayer].hand[j].value == 11
        ) {
          players[currPlayer].hand[j].value = 1;
          players[currPlayer].value -= 10;
        }
      }

      gameOutput = `The dealer has: ${dealerHandOutput}<br>`;
      for (i = 0; i < numOfPlayers; i += 1) {
        gameOutput += `Player ${i + 1} has: ${players[i].output}<br>`;
      }

      if (players[currPlayer].value <= 21) {
        var addReply2 = `<br>Player ${
          currPlayer + 1
        }, type 'hit' or 'stand' and click Submit.`;
      }
      if (players[currPlayer].value > 21) {
        players[currPlayer].outcome = LOSE;
        addReply2 = `<br>Player ${currPlayer + 1}, you went bust with ${
          players[currPlayer].value
        } points, sorry. You ${players[currPlayer].outcome}.<br><br>`;

        // Loop to select next player whose hand is still alive to 'hit' or 'stand'
        for (k = currPlayer; k < numOfPlayers; k += 1) {
          if (players[currPlayer].outcome == PLAYING) {
            addReply2 += `Player ${
              currPlayer + 1
            }, it's your turn. Type 'hit' or 'stand' and then click submit.`;
            tabulateChips();
            return gameOutput + addReply2;
          } else {
            currPlayer += 1;
            tabulateChips();
          }
        }

        if (currPlayer == numOfPlayers) {
          var skipDealerDraws = true;
          for (j = 0; j < numOfPlayers; j += 1) {
            if (players[j].outcome == PLAYING) {
              skipDealerDraws = false;
            }
          }

          if (skipDealerDraws) {
            gameMode = "deal";
            addReply2 += "End of round. Click Submit to play a new hand.";
          } else {
            gameMode = "dealerDraws";
            addReply2 +=
              "All players had their turns. It's the dealer's turn to draw.<br>Click Submit to continue.";
          }
        }
      }
      return gameOutput + addReply2;
    }

    if (userInput == "stand") {
      if (players[currPlayer].value < 16) {
        gameOutput = `The dealer has: ${dealerHandOutput}<br>`;
        for (i = 0; i < numOfPlayers; i += 1) {
          gameOutput += `Player ${i + 1} has: ${players[i].output}<br>`;
        }

        addReply2 = `<br>Sorry Player ${
          currPlayer + 1
        }. Your hand has less than 16 points. You have to hit.`;
      } else {
        gameOutput = `The dealer has: ${dealerHandOutput}<br>`;
        for (i = 0; i < numOfPlayers; i += 1) {
          gameOutput += `Player ${i + 1} has: ${players[i].output}<br>`;
        }
        addReply2 = `<br>Player ${currPlayer + 1}, you chose to stand.<br><br>`;

        // Loop to select next player whose hand is still alive to 'hit' or 'stand'
        for (i = currPlayer; i < numOfPlayers; i += 1) {
          currPlayer += 1;

          if (currPlayer == numOfPlayers) {
            gameMode = "dealerDraws";
            addReply2 +=
              "All players had their turns. It's the dealer's turn to draw.<br>Click Submit to continue.";
          } else if (players[currPlayer].outcome == PLAYING) {
            addReply2 += `Player ${
              currPlayer + 1
            }, it's your turn. Type 'hit' or 'stand' and then click submit.`;
            tabulateChips();
            return gameOutput + addReply2;
          }
        }
      }
      tabulateChips();
      return gameOutput + addReply2;
    }
  }
};

// Dealer's turn to play (if not blackjack)
var dealerDraws = function (input) {
  // The computer decides to hit or stand automatically based on game rules
  dealerHandValue = 0;
  dealerHandOutput = "";
  for (i = 0; i < dealerHand.length; i += 1) {
    dealerHandOutput =
      dealerHandOutput + " " + dealerHand[i].name + dealerHand[i].emoji;

    dealerHandValue = Number(dealerHandValue) + Number(dealerHand[i].value);

    for (j = 0; j < dealerHand.length; j += 1) {
      if (
        dealerHandValue < 12 &&
        dealerHand[j].name == "A" &&
        dealerHand[j].value == 1
      ) {
        dealerHand[j].value = 11;
        dealerHandValue += 10;
      }
      if (dealerHandValue > 21 && dealerHand[j].value == 11) {
        dealerHand[j].value = 1;
        dealerHandValue -= 10;
      }
    }

    if (i == dealerHand.length - 1 && dealerHandValue < 17) {
      dealerHand.push(shuffledDeck.pop());
    }
  }

  // Dealer has decided to stand, now is to compare player's value vs dealer's value
  gameOutput = `The dealer had: ${dealerHandOutput}<br>`;

  for (i = 0; i < numOfPlayers; i += 1) {
    gameOutput += `Player ${i + 1} had: ${players[i].output}<br>`;
  }

  currPlayer = 0;
  while (currPlayer < numOfPlayers) {
    if (players[currPlayer].outcome == LOSE) {
      gameOutput += `<br>Player ${currPlayer + 1} went bust and lost ${
        players[currPlayer].bet
      } chips.`;
    } else if (players[currPlayer].outcome == BLACKJACK) {
      gameOutput += `<br>Player ${currPlayer + 1} scored a blackjack and won ${
        players[currPlayer].bet * 1.5
      } chips!`;
    } else if (players[currPlayer].outcome == PLAYING) {
      if (dealerHandValue > 21) {
        players[currPlayer].outcome = WIN;
        gameOutput += `<br>The dealer went bust with ${dealerHandValue} points. Player ${
          currPlayer + 1
        } won ${players[currPlayer].bet} chips!`;
      } else if (players[currPlayer].value > dealerHandValue) {
        players[currPlayer].outcome = WIN;
        gameOutput =
          gameOutput +
          `<br>Player ${currPlayer + 1}'s hand beat the dealer ${
            players[currPlayer].value
          } to ${dealerHandValue}. Player ${currPlayer + 1} ${
            players[currPlayer].outcome
          } ${players[currPlayer].bet} chips.`;
      } else if (players[currPlayer].value < dealerHandValue) {
        players[currPlayer].outcome = LOSE;
        gameOutput =
          gameOutput +
          `<br>The dealer beat Player ${
            currPlayer + 1
          }'s hand ${dealerHandValue} to ${players[currPlayer].value}. Player ${
            currPlayer + 1
          } ${players[currPlayer].outcome} ${players[currPlayer].bet} chips.`;
      } else {
        players[currPlayer].outcome = TIE;
        gameOutput =
          gameOutput +
          `<br>The dealer tied with Player ${
            currPlayer + 1
          }'s hand at ${dealerHandValue} points each. Player ${
            currPlayer + 1
          } kept his ${players[currPlayer].bet} chips.`;
      }
    }
    currPlayer += 1;
  }
  gameOutput =
    gameOutput +
    `<br><br>Click Submit to play again.<br><img src="https://media.giphy.com/media/3NtY188QaxDdC/giphy.gif" class="center">`;
  gameMode = "deal";
  tabulateChips();

  return gameOutput;
};

// Function to tabulate players' purses depending on whether they have won, lost or drawn
var tabulateChips = function () {
  standings = "<br><br>Current chip balance:";
  for (i = 0; i < numOfPlayers; i += 1) {
    if (players[i].awaitnewhand == false) {
      if (players[i].outcome == BLACKJACK) {
        players[i].purse += players[i].bet * 1.5;
      }
      if (players[i].outcome == WIN) {
        players[i].purse += players[i].bet * 1;
      }
      if (players[i].outcome == LOSE) {
        players[i].purse -= players[i].bet * 1;
      }
    }
    if (players[i].outcome != PLAYING) {
      players[i].awaitnewhand = true;
    }
    standings += `<br>Player ${i + 1}: ${players[i].purse}`;
  }
  return standings;
};

// Main function, calls in each subfunction depending on gameMode
var main = function (input) {
  if (gameMode == "numOfPlayers") {
    var myOutputValue = initiatePlayersArray(input);
    return myOutputValue;
  } else {
    if (gameMode == "placeBet") {
      myOutputValue = placeBet(input);
      return myOutputValue + standings;
    }
    if (gameMode == "deal") {
      myOutputValue = dealCards(input);
      return myOutputValue + standings;
    }
    // if (gameMode == "playerDraws") {
    //   myOutputValue = hitOrStand(input);
    //   return myOutputValue + standings;
    // }
    if (gameMode == "dealerDraws") {
      myOutputValue = dealerDraws(input);
      return myOutputValue + standings;
    }
    return;
  }
};
