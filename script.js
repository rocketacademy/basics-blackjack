// // -------------------------------------------------------------------
// // ------------------- HELPER FUNCTIONS ------------------------------
// // -------------------------------------------------------------------

// ~ MAKE DECK FUNCTION ~
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♡", "♢", "♣", "♠"];
  // Loop over the suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "⚜J";
      } else if (cardName == 12) {
        cardName = "♕Q";
      } else if (cardName == 13) {
        cardName = "♔K";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      cardDeck.push(card);
    }
  }
  // Return the completed card deck
  return cardDeck;
};

// ~ SHUFFLE CARDS FUNCTION ~
// Function to get a random index as big as the size of the deck
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};
// Function to shuffle elements in the cardDeck array and return the shuffled deck.
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// ~ DEAL CARDS FUNCTION ~
var dealCard = function (abstractHand) {
  abstractHand.push(deck.pop());
};

// ~ FUNCTION TO SUM UP HANDS INCL. ACE 1 or 11 LOGIC ~
var getHandSum = function (abstractHand) {
  var numAcesInHand = 0;
  var sum = 0;
  var i = 0;
  while (i < abstractHand.length) {
    var currentCard = abstractHand[i];
    if (currentCard.rank >= 2 && currentCard.rank <= 10) {
      sum = sum + currentCard.rank;
    } else if (currentCard.rank >= 11 && currentCard.rank <= 13) {
      sum = sum + 10;
    } else if (currentCard.rank == 1) {
      numAcesInHand = numAcesInHand + 1;
      sum = sum + 11;
    }
    i += 1;
  }
  if (sum > blackjackLimit && numAcesInHand > 0) {
    i = 0;
    while (i < numAcesInHand) {
      sum = sum - 10;
      i += 1;
      if (sum <= blackjackLimit) {
        break;
      }
    }
  }

  return sum;
};

// ~ PRINT CARDS IN HAND FUNCTION ~
var printCardsInHand = function (abstractHand) {
  var cardsInHandString = "";
  for (var i = 0; i < abstractHand.length; i += 1) {
    cardsInHandString += `${abstractHand[i].name}${abstractHand[i].suit}, `;
  }
  return cardsInHandString;
};

// ~ PRINT CARDS IN HAND WITH SUM FUNCTION ~
var printCardsInHandWithSum = function (abstractHand) {
  return `cards are ${printCardsInHand(
    abstractHand
  )} with a total of ${getHandSum(abstractHand)}.`;
};

// ~ ADD PLAYERS ~
var addPlayers = function (playerNames) {
  var playersArray = [];
  for (var i = 0; i < playerNames.length; i += 1) {
    var playerDetail = {
      name: playerNames[i],
      cash: 100,
      inRound: true,
    };
    playersArray.push(playerDetail);
  }
  return playersArray;
};

// ~ PRINT PLAYER STATS ~
var printPlayerStats = function (players) {
  var message = "";
  for (var i = 0; i < players.length; i += 1) {
    var num = i + 1;
    message += `${num}. ${players[i].name} (Balance Remaining:${players[i].cash})<br>`;
  }
  return message;
};

// ~ PRINT WAGERS ~
var printPlayerWagers = function (players) {
  var message = "";
  for (var i = 0; i < players.length; i += 1) {
    var num = i + 1;
    message += `${num}. ${players[i].name} wagered $${playerWagers[i]}.<br>`;
  }
  return message;
};

// ~ CHECK IF WAGERS INPUT IS VALID ~
var playerWagersCheck = function (playerWagers) {
  var PassOrFailArray = [];
  var checkPass = function (passOrFail) {
    return passOrFail == "pass";
  };
  for (var i = 0; i < playerWagers.length; i += 1) {
    if (playerWagers[i] >= 1 && playerWagers[i] <= players[i].cash) {
      PassOrFailArray.push("pass");
    } else {
      PassOrFailArray.push("fail");
    }
  }
  return PassOrFailArray.every(checkPass);
};

// // -------------------------------------------------------------------
// // -------------------- GLOBAL VARIABLES -----------------------------
// // -------------------------------------------------------------------

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());
var player1Hand = [];
var player2Hand = [];
var player3Hand = [];
var player4Hand = [];
var player5Hand = [];
var player6Hand = [];
var player7Hand = [];
var allPlayerHands = [];
var computerHand = [];
var blackjackLimit = 21;
var playerNames = [];
var players = [];
var MODE_WELCOME = "welcome message";
var MODE_ENTER_PLAYER_NAMES = "enter player names";
var MODE_INPUT_NAME = "input player name";
var MODE_INPUT_WAGER = "input wager";
var MODE_DEAL_CARDS = "deal and display player cards and 1 computer card";
var MODE_HIT_OR_STAND_1 = "player 1 get another card or stay";
var MODE_HIT_OR_STAND_2 = "player 2 get another card or stay";
var MODE_HIT_OR_STAND_3 = "player 3 get another card or stay";
var MODE_HIT_OR_STAND_4 = "player 4 get another card or stay";
var MODE_HIT_OR_STAND_5 = "player 5 get another card or stay";
var MODE_HIT_OR_STAND_6 = "player 6 get another card or stay";
var MODE_HIT_OR_STAND_7 = "player 7 get another card or stay";
var MODE_PLAYER_2_TURN = "player 2 turn";
var MODE_PLAYER_3_TURN = "player 3 turn";
var MODE_PLAYER_4_TURN = "player 4 turn";
var MODE_PLAYER_5_TURN = "player 5 turn";
var MODE_PLAYER_6_TURN = "player 6 turn";
var MODE_PLAYER_7_TURN = "player 7 turn";
var MODE_BANKER_HIT_OR_STAND = "banker acts out his turn";
var MODE_COMPARE_CARD_SUM = "compare sum";
var mode = MODE_WELCOME;
var playersHandSums = [];
var computerHandSum = 0;
var playerWagers = [];
var currentPlayer = 1;

var main = function (input) {
  // Deal cards
  if (mode == MODE_WELCOME) {
    var myOutputValue = `Welcome to the Blackjack table! <br><br>Please start by entering the names of all players, separated by spaces. <br><br> Note that there is a maximum of 7 players.`;
    mode = MODE_ENTER_PLAYER_NAMES;
  } else if (mode == MODE_ENTER_PLAYER_NAMES) {
    playerNames = input.split(" ");
    players = addPlayers(playerNames);
    myOutputValue = `Welcome! Players begin with $100 each. <br><br>Please place your bet amount (minimum bet 1), separated by spaces.<br><br>${printPlayerStats(
      players
    )}`;
    mode = MODE_INPUT_WAGER;
    if (input == "" || playerNames.length > 7) {
      myOutputValue = `Please enter a minimum of 1 name or a maximum of 7 names in order to start.`;
      mode = MODE_ENTER_PLAYER_NAMES;
    }
  } else if (mode == MODE_INPUT_WAGER) {
    playerWagers = input.split(" ");
    // Only valid if players wager an amount they have (min 1), player number of bets equals number of players
    if (
      playerWagers.length == players.length &&
      playerWagersCheck(playerWagers) == true
    ) {
      myOutputValue = `${printPlayerWagers(
        players
      )}<br> Please hit submit to deal the cards.`;
      mode = MODE_DEAL_CARDS;
    } else {
      playerWagers = [];
      myOutputValue = `Please place your bet amount (minimum bet 1), separated by spaces.`;
    }
  } else if (mode == MODE_DEAL_CARDS) {
    deck = shuffleCards(makeDeck());
    player1Hand = [];
    player2Hand = [];
    player3Hand = [];
    player4Hand = [];
    player5Hand = [];
    player6Hand = [];
    player7Hand = [];
    computerHand = [];
    dealCard(computerHand);
    dealCard(computerHand);
    dealCard(player1Hand);
    dealCard(player1Hand);
    playersHandSums.push(getHandSum(player1Hand));
    myOutputValue = `${playerNames[0]}'s ${printCardsInHandWithSum(
      player1Hand
    )} <br><br>Banker's revealed card is ${computerHand[0].name}${
      computerHand[0].suit
    }<br><br>
    Do you want to Hit or Stand?`;
    mode = MODE_HIT_OR_STAND_1;
  } else if (mode == MODE_HIT_OR_STAND_1) {
    if (input == "hit") {
      // If playet hits, pop from deck and add to player hand
      player1Hand.push(deck.pop());
      // Sum his new hand
      player1HandSum = getHandSum(player1Hand);
      // If player doesn't busto, display his hand and sum, and ask if hit or stand
      if (player1HandSum <= blackjackLimit) {
        myOutputValue = `${playerNames[0]}'s ${printCardsInHandWithSum(
          player1Hand
        )} <br><br>Banker's revealed card is ${computerHand[0].name}${
          computerHand[0].suit
        }<br><br>
        Do you want to Hit or Stand?`;
        mode = MODE_HIT_OR_STAND_1;
        // If player busto, display his hand and sum, and busto message
      } else if (player1HandSum > blackjackLimit) {
        myOutputValue = `${playerNames[0]}'s ${printCardsInHandWithSum(
          player1Hand
        )} <br><br>${playerNames[0]} BUSTO!`;
        currentPlayer = 2;
        if (players.length == 1) {
          myOutputValue = `${myOutputValue} <br><br>Press submit to start a new round.`;
          mode = MODE_DEAL_CARDS;
        } else if (currentPlayer <= players.length) {
          myOutputValue = `${myOutputValue} <br><br>It is now ${playerNames[1]}'s turn.`;
          mode = MODE_PLAYER_2_TURN;
        }
      }
    } else if (input == "stand") {
      currentPlayer = 2;
      if (players.length == 1) {
        myOutputValue = `The Banker will now take his turn. <br><br>Press Submit to reveal Banker's cards. <br><br> (${
          playerNames[0]
        }'s ${printCardsInHandWithSum(player1Hand)})`;
        mode = MODE_BANKER_HIT_OR_STAND;
      } else if (currentPlayer <= players.length) {
        myOutputValue = `${playerNames[0]}'s ${printCardsInHandWithSum(
          player1Hand
        )} <br><br>Press submit for ${playerNames[1]}'s turn.`;
        mode = MODE_PLAYER_2_TURN;
      }
    } else if (input != "hit" && input != "stand") {
      myOutputValue = `Invalid Input! <br><br> Your ${printCardsInHandWithSum(
        player1Hand
      )} <br><br> Do you want to Hit or Stand?`;
    }
  } else if (mode == MODE_PLAYER_2_TURN) {
    dealCard(player2Hand);
    dealCard(player2Hand);
    playersHandSums.push(getHandSum(player2Hand));
    myOutputValue = `${playerNames[1]}'s ${printCardsInHandWithSum(
      player2Hand
    )} <br><br>Banker's revealed card is ${computerHand[0].name}${
      computerHand[0].suit
    }<br><br>
    Do you want to Hit or Stand?`;
    mode = MODE_HIT_OR_STAND_2;
  } else if (mode == MODE_HIT_OR_STAND_2) {
    if (input == "hit") {
      // If playet hits, pop from deck and add to player hand
      player2Hand.push(deck.pop());
      // Sum his new hand
      player2HandSum = getHandSum(player2Hand);
      // If player doesn't busto, display his hand and sum, and ask if hit or stand
      if (player2HandSum <= blackjackLimit) {
        myOutputValue = `${playerNames[1]}'s ${printCardsInHandWithSum(
          player2Hand
        )} <br><br>Banker's revealed card is ${computerHand[0].name}${
          computerHand[0].suit
        }<br><br>
        Do you want to Hit or Stand?`;
        mode = MODE_HIT_OR_STAND_2;
        // If player busto, display his hand and sum, and busto message
      } else if (player2HandSum > blackjackLimit) {
        myOutputValue = `${playerNames[1]}'s ${printCardsInHandWithSum(
          player2Hand
        )} <br><br>${playerNames[1]} BUSTO!`;
        currentPlayer = 3;
        if (currentPlayer > players.length) {
          myOutputValue = `${myOutputValue} <br><br>Press submit to determine winners.`;
          mode = MODE_DEAL_CARDS;
        } else if (currentPlayer <= players.length) {
          myOutputValue = `${myOutputValue} <br><br>Press submit for ${playerNames[2]}'s turn.`;
          mode = MODE_PLAYER_3_TURN;
        }
      }
    } else if (input == "stand") {
      currentPlayer = 3;
      if (currentPlayer > players.length) {
        myOutputValue = `The Banker will now take his turn. <br><br>Press Submit to reveal Banker's cards. <br><br> (${
          playerNames[1]
        }'s ${printCardsInHandWithSum(player2Hand)})`;
        mode = MODE_BANKER_HIT_OR_STAND;
      } else if (currentPlayer <= players.length) {
        myOutputValue = `${playerNames[1]}'s ${printCardsInHandWithSum(
          player2Hand
        )} <br><br>Press submit for ${playerNames[2]}'s turn.`;
        mode = MODE_PLAYER_3_TURN;
      }
    } else if (input != "hit" && input != "stand") {
      myOutputValue = `Invalid Input! <br><br> Your ${printCardsInHandWithSum(
        player1Hand
      )} <br><br> Do you want to Hit or Stand?`;
    }
  } else if (mode == MODE_PLAYER_3_TURN) {
    dealCard(player3Hand);
    dealCard(player3Hand);
    playersHandSums.push(getHandSum(player3Hand));
    myOutputValue = `${playerNames[2]}'s ${printCardsInHandWithSum(
      player3Hand
    )} <br><br>Banker's revealed card is ${computerHand[0].name}${
      computerHand[0].suit
    }<br><br>
    Do you want to Hit or Stand?`;
    mode = MODE_HIT_OR_STAND_3;
  } else if (mode == MODE_HIT_OR_STAND_3) {
    if (input == "hit") {
      // If playet hits, pop from deck and add to player hand
      player3Hand.push(deck.pop());
      // Sum his new hand
      player3HandSum = getHandSum(player3Hand);
      // If player doesn't busto, display his hand and sum, and ask if hit or stand
      if (player3HandSum <= blackjackLimit) {
        myOutputValue = `${playerNames[2]}'s ${printCardsInHandWithSum(
          player3Hand
        )} <br><br>Banker's revealed card is ${computerHand[0].name}${
          computerHand[0].suit
        }<br><br>
        Do you want to Hit or Stand?`;
        mode = MODE_HIT_OR_STAND_3;
        // If player busto, display his hand and sum, and busto message
      } else if (player3HandSum > blackjackLimit) {
        myOutputValue = `${playerNames[2]}'s ${printCardsInHandWithSum(
          player3Hand
        )} <br><br>${playerNames[2]} BUSTO!`;
        currentPlayer = 4;
        if (currentPlayer > players.length) {
          myOutputValue = `${myOutputValue} <br><br>Press submit to determine winners.`;
          mode = MODE_DEAL_CARDS;
        } else if (currentPlayer <= players.length) {
          myOutputValue = `${myOutputValue} <br><br>Press submit for ${playerNames[3]}'s turn.`;
          mode = MODE_PLAYER_4_TURN;
        }
      }
    } else if (input == "stand") {
      currentPlayer = 4;
      if (currentPlayer > players.length) {
        myOutputValue = `The Banker will now take his turn. <br><br>Press Submit to reveal Banker's cards. <br><br> (${
          playerNames[2]
        }'s ${printCardsInHandWithSum(player3Hand)})`;
        mode = MODE_BANKER_HIT_OR_STAND;
      } else if (currentPlayer <= players.length) {
        myOutputValue = `${playerNames[2]}'s ${printCardsInHandWithSum(
          player3Hand
        )} <br><br>Press submit for ${playerNames[3]}'s turn.`;
        mode = MODE_PLAYER_4_TURN;
      }
    } else if (input != "hit" && input != "stand") {
      myOutputValue = `Invalid Input! <br><br> Your ${printCardsInHandWithSum(
        player1Hand
      )} <br><br> Do you want to Hit or Stand?`;
    }
  } else if (mode == MODE_BANKER_HIT_OR_STAND) {
    computerHandSum = getHandSum(computerHand);
    console.log(computerHandSum);
    // Banker draws cards until minimum 17
    while (computerHandSum < 17) {
      computerHand.push(deck.pop());
      computerHandSum = getHandSum(computerHand);
    }
    myOutputValue = `The Banker's ${printCardsInHandWithSum(
      computerHand
    )}<br><br> Press Submit to determine the winner(s).`;
    mode = MODE_COMPARE_CARD_SUM;
  } else if (mode == MODE_COMPARE_CARD_SUM) {
    if (computerHandSum > blackjackLimit) {
      myOutputValue = `The Banker has BUSTO! You Win if you didn't BUST too!`;
    } else if (computerHandSum <= blackjackLimit) {
      myOutputValue = `The Banker has ${computerHandSum}. <br><br>Banker wins all below ${computerHandSum}, draws all with ${computerHandSum} and loses all above ${computerHandSum}`;
    }
    mode = MODE_DEAL_CARDS;
  }
  console.log(`mode: ${mode}`);
  return myOutputValue;
};
