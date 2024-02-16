/*
Introduction
============
1. Implement a simplified version of Blackjack. If you're not familiar with Blackjack, refer to this video for game rules. Our simplified rules are the following. Please read all the requirements before starting it!
2. There will be only two players. One human and one computer (for the Base solution).
3. The computer will always be the dealer.
4. Each player gets dealt two cards to start.
5. The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
6. The dealer has to hit if their hand is below 17.
7. Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
8. The player who is closer to, but not above 21 wins the hand.


Gameplay Description
=====================
1. The main function runs on each player's turn. The sequence of actions in the game might be the following.
2. Deck is shuffled.
3. User clicks Submit to deal cards.
4. The cards are analysed for game winning conditions, e.g. Blackjack.
5. The cards are displayed to the user.
6.The user decides whether to hit or stand, using the submit button to submit their choice.
7. The user's cards are analysed for winning or losing conditions.
8. The computer decides to hit or stand automatically based on game rules.
9. The game either ends or continues.
*/

var playerDeck = {
  playerName: "Player 1",
  cards: [],
  blackjack: false,
  totalscore: 0,
  win: 0,
  loss: 0,
  turn: false,
};

var computerDeck = {
  playerName: "CPU",
  cards: [],
  blackjack: false,
  totalscore: 0,
  win: 0,
  loss: 0,
  turn: false,
};

var ace_check = "ACE_CHECKER";
var player_draw_card = "PLAYER_DRAW_CARD";
var player_card_decision = "PLAYER_CARD_DECISION";
var scoring_mode = "SCORING_MODE";

var currentGameMode = "PLAYER_DRAW_CARD";
var currentPlayer = playerDeck;
var currentAce = [];

//MAIN FUNCTION
var main = function (input) {
  //PLAYER DRAW CARD
  if (currentGameMode == player_draw_card) {
    if (playerDeck["totalscore"] == 0) {
      newDeck = genDeck();
      newDeckShuffled = shuffleDeck(newDeck);
    }
    if (currentPlayer["totalscore"] == 0) {
      console.log("NEW GAME STARTED: PLAYERS TURN TO DRAW THE CARD");
      randCardDrawn1 = drawCardFunc(currentPlayer);
      randCardDrawn2 = drawCardFunc(currentPlayer);

      blackJackStatus = checkBlackJack(currentPlayer);

      //FIRST CARD DRAWN IS ACE
      if (
        blackJackStatus == "none" &&
        randCardDrawn1["rank"] == 1 &&
        randCardDrawn2["rank"] != 1
      ) {
        addPointstoPlayer(randCardDrawn2);
        currentGameMode = ace_check;
        var myOutputValue = outputAceMessage(
          currentPlayer,
          "playerFirstCardDrawn"
        );
        //SECOND CARD DRAWN IS ACE
      } else if (
        blackJackStatus == "none" &&
        randCardDrawn1["rank"] != 1 &&
        randCardDrawn2["rank"] == 1
      ) {
        addPointstoPlayer(randCardDrawn1);
        currentGameMode = ace_check;
        var myOutputValue = outputAceMessage(
          currentPlayer,
          "playerSecondCardDrawn"
        );
      } else if (blackJackStatus == "BLACKJACK") {
        addPointstoPlayer("BLACKJACK");
        var myOutputValue = outputCardDrawnMessage(
          currentPlayer,
          randCardDrawn1,
          randCardDrawn2
        );
        currentGameMode = player_card_decision;
      } else if (blackJackStatus == "DOUBLE ACES") {
        addPointstoPlayer("DOUBLE ACES");
        var myOutputValue = outputCardDrawnMessage(
          currentPlayer,
          randCardDrawn1,
          randCardDrawn2
        );
        currentGameMode = player_card_decision;
      } else {
        addPointstoPlayer(randCardDrawn1);
        addPointstoPlayer(randCardDrawn2);
        var myOutputValue = outputCardDrawnMessage(
          currentPlayer,
          randCardDrawn1,
          randCardDrawn2
        );
        currentGameMode = player_card_decision;
      }

      return myOutputValue;
    } else {
      console.log("PLAYER DECIDED TO DRAW ANOTHER CARD");
      randCardDrawn1 = drawCardFunc(currentPlayer);
      if (randCardDrawn1["rank"] == 1) {
        currentGameMode = ace_check;
        var myOutputValue = outputAceMessage(currentPlayer, "oneMoreCard");
      } else {
        addPointstoPlayer(randCardDrawn1);
        var myOutputValue = outputCardDrawnMessage(
          currentPlayer,
          randCardDrawn1,
          "none"
        );
        currentGameMode = player_card_decision;
      }
      return myOutputValue;
    }
    //CHECK ACE HERE
  } else if (currentGameMode == ace_check && input.length == 0) {
    console.log("ENTERED ACE CHECK MODE");
    if (currentPlayer == computerDeck) {
      var genCpuRandChoice = genRandomValue(2);
      console.log(`COMPUTER RANDOM DECISION: ${genCpuRandChoice}`);
      if (genCpuRandChoice == 1) {
        addPointstoPlayer("bigAce");
        currentGameMode = player_card_decision;
        var myOutputValue = outputAceMessage(currentPlayer, "chose11");
      } else {
        addPointstoPlayer("smallAce");
        currentGameMode = player_card_decision;
        var myOutputValue = outputAceMessage(currentPlayer, "chose1");
      }
    } else {
      var myOutputValue = `${checkCurrentPlayerCards(
        currentPlayer
      )} ${outputAceMessage(currentPlayer, "aceQuery")}`;
      currentGameMode = ace_check;
    }
    return myOutputValue;
  } else if (currentGameMode == ace_check && input.length != 0) {
    if (input == 1) {
      addPointstoPlayer("smallAce");
      currentGameMode = player_card_decision;
      var myOutputValue = outputAceMessage(currentPlayer, "chose1");
    } else if (input == 11) {
      addPointstoPlayer("bigAce");
      currentGameMode = player_card_decision;
      var myOutputValue = outputAceMessage(currentPlayer, "chose11");
    } else {
      var myOutputValue = `${checkCurrentPlayerCards(
        currentPlayer
      )} <br><br>You have drawn an Ace. Please input 1 or 11 in the Input field?`;
      currentGameMode = ace_check;
    }
    return myOutputValue;
    //ENTERING PLAYER'S DECISION
  } else if (currentGameMode == player_card_decision && input.length == 0) {
    console.log(`CHECKING ${currentPlayer["playerName"]}'S TOTAL SCORE.`);

    var currentcardmessage = checkCurrentPlayerCards(currentPlayer);
    var totalscore = currentPlayer["totalscore"];
    var blackjackstatus = currentPlayer["blackjack"];

    if (blackjackstatus == "BLACKJACK") {
      var myOutputValue = `${currentcardmessage} <br><br>${outputPlayerMessage(
        "blackjack",
        currentPlayer,
        totalscore
      )}`;
      if (currentPlayer == computerDeck && playerDeck["turn"] == true) {
        currentGameMode = scoring_mode;
        computerDeck["turn"] = true;
      } else {
        playerDeck["turn"] = true;
        currentPlayer = computerDeck;
        currentGameMode = player_draw_card;
      }
    } else if (totalscore < 18) {
      var myOutputValue = `${currentcardmessage} <br>${outputPlayerMessage(
        "under18",
        currentPlayer,
        totalscore
      )}`;
      currentGameMode = player_draw_card;
    } else if (totalscore >= 18 && totalscore <= 21) {
      currentGameMode = player_card_decision;
      if (currentPlayer == computerDeck) {
        var genCpuRandChoice = genRandomValue(2);
        console.log(`COMPUTER RANDOM DECISION: ${genCpuRandChoice}`);
        if (genCpuRandChoice == 1) {
          var myOutputValue = `${currentcardmessage} <br>${outputPlayerMessage(
            "computerDrawCard",
            currentPlayer,
            totalscore
          )}`;
          currentGameMode = player_draw_card;
        } else {
          var myOutputValue = `${currentcardmessage} <br>${outputPlayerMessage(
            "computerNotDrawCard",
            currentPlayer,
            totalscore
          )}`;
          currentGameMode = scoring_mode;
          computerDeck["turn"] = true;
        }
      } else {
        var myOutputValue = `${currentcardmessage} <br>${outputPlayerMessage(
          "playerDrawCardQuery",
          currentPlayer,
          totalscore
        )}`;
      }
    } else {
      if (currentPlayer == computerDeck && playerDeck["turn"] == true) {
        var myOutputValue = `${currentcardmessage} <br>${outputPlayerMessage(
          "moreThan21",
          currentPlayer,
          totalscore
        )}`;
        currentGameMode = scoring_mode;
        computerDeck["turn"] = true;
      } else {
        var myOutputValue = `${currentcardmessage} <br>${outputPlayerMessage(
          "moreThan21",
          currentPlayer,
          totalscore
        )}`;
        playerDeck["turn"] = true;
        currentPlayer = computerDeck;
        currentGameMode = player_draw_card;
      }
    }
    return myOutputValue;
  } else if (currentGameMode == player_card_decision && input.length != 0) {
    console.log(
      `${currentPlayer["playerName"]} DECIDES TO HIT OR STAND MODE: ${currentGameMode}`
    );
    var totalscore = currentPlayer["totalscore"];
    if (currentPlayer == computerDeck) {
      input.value = "";
    }
    if (input.toLowerCase() == "hit" || input.toLowerCase() == "h") {
      var myOutputValue = `${currentPlayer["playerName"]} has decided to draw a card. <br><br>Hit 'Submit' to continue`;
      currentGameMode = player_draw_card;
    } else if (input.toLowerCase() == "stand" || input.toLowerCase() == "s") {
      var myOutputValue = `${currentPlayer["playerName"]} has decided not to draw a card. <br><br>Hit 'Submit' to continue`;
      if (currentPlayer == computerDeck && playerDeck["turn"] == true) {
        currentGameMode = scoring_mode;
        computerDeck["turn"] = true;
      } else {
        playerDeck["turn"] = true;
        currentPlayer = computerDeck;
        currentGameMode = player_draw_card;
      }
    } else {
      var myOutputValue = `${currentcardmessage} <br>${outputPlayerMessage(
        "playerDrawCardQuery",
        currentPlayer,
        totalscore
      )}`;
    }
    return myOutputValue;

    //ENTERING SCORING MODE
  } else if (currentGameMode == scoring_mode) {
    console.log("IT'S SCORING TIME");
    var playerMessage = checkCurrentPlayerCards(playerDeck);
    var computerMessage = checkCurrentPlayerCards(computerDeck);

    var playertotalscore = playerDeck["totalscore"];
    var computertotalscore = computerDeck["totalscore"];

    var myOutputValue = `${playerMessage}<br><br>${computerMessage}<br><br>Player | Computer: ${playertotalscore} : ${computertotalscore}<br><br>`;

    if (playerDeck["blackjack"] == true && computerDeck["blackjack"] == true) {
      var winningMessage =
        "BOTH BLACKJACKS?!?!?! THAT'S INCREDIBLE!!! IT'S A TIEEE";
      playerDeck["win"] += 1;
      computerDeck["win"] += 1;
    } else if (
      playerDeck["blackjack"] == true &&
      computerDeck["blackjack"] != true
    ) {
      var winningMessage = "PLAYER 1 WINS BY BLACKJACK!";
      playerDeck["win"] += 1;
      computerDeck["loss"] += 1;
    } else if (
      playerDeck["blackjack"] != true &&
      computerDeck["blackjack"] == true
    ) {
      var winningMessage = "COMPUTER WINS BY BLACKJACK!";
      computerDeck["win"] += 1;
      playerDeck["loss"] += 1;
    } else if (
      playertotalscore > computertotalscore &&
      playertotalscore <= 21
    ) {
      var winningMessage = "PLAYER 1 WINS!";
      playerDeck["win"] += 1;
      computerDeck["loss"] += 1;
    } else if (
      computertotalscore > playertotalscore &&
      computertotalscore <= 21
    ) {
      var winningMessage = "COMPUTER WINS!";
      computerDeck["win"] += 1;
      playerDeck["loss"] += 1;
    } else if (playertotalscore <= 21 && computertotalscore > 21) {
      var winningMessage = "PLAYER 1 WINS!";
      playerDeck["win"] += 1;
      computerDeck["loss"] += 1;
    } else if (computertotalscore <= 21 && playertotalscore > 21) {
      var winningMessage = "COMPUTER WINS!";
      computerDeck["win"] += 1;
      playerDeck["loss"] += 1;
    } else if (playertotalscore > 21 && computertotalscore > 21) {
      var winningMessage = "BOTH PLAYERS ARE ABOVE 21. BOTH LOST";
      playerDeck["loss"] += 1;
      computerDeck["loss"] += 1;
    } else if (
      playertotalscore <= 21 &&
      computertotalscore <= 21 &&
      playertotalscore == computertotalscore
    ) {
      var winningMessage = "IT'S A TIEEE!!!";
    }
    myOutputValue += winningMessage;
  }
  newGameMessage = "<br><br>Hit 'Submit' to start a new game!";
  myOutputValue += newGameMessage;
  resetGame();
  return myOutputValue;
};

/*
===================================================================================================================
HELPER FUNCTIONS
===================================================================================================================
*/

//RESET GAME
var resetGame = function () {
  currentGameMode = player_draw_card;
  currentPlayer = playerDeck;
  playerDeck["cards"] = [];
  playerDeck["blackjack"] = false;
  playerDeck["totalscore"] = 0;
  playerDeck["turn"] = false;

  computerDeck["cards"] = [];
  computerDeck["blackjack"] = false;
  computerDeck["totalscore"] = 0;
  computerDeck["turn"] = false;
};

//Capitalize first word of string given
var captializeString = function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

//Draw random card of give deck
var drawCardFunc = function (currentPlayerDeck) {
  var randCardDrawn = newDeckShuffled[genRandomValue(newDeckShuffled.length)];
  currentPlayerDeck["cards"].push(randCardDrawn);

  return randCardDrawn;
};

//CHECKS FOR BLACKJACK
var checkBlackJack = function (currentPlayer) {
  var currentStatus = "none";
  if (
    //IF INDEX 1 IS A PICTURE CARD AND INDEX 0 IS AN ACE
    (currentPlayer["cards"][1]["rank"] == 11 ||
      currentPlayer["cards"][1]["rank"] == 12 ||
      currentPlayer["cards"][1]["rank"] == 13) &&
    currentPlayer["cards"][0]["rank"] == 1
  ) {
    currentPlayer["cards"][0]["rank"] = 11;
    currentPlayer["blackjack"] = true;
    currentStatus = "BLACKJACK";
  } else if (
    //IF INDEX 1 IS AN ACE AND INDEX 0 IS A PICTURE CARD
    (currentPlayer["cards"][0]["rank"] == 11 ||
      currentPlayer["cards"][0]["rank"] == 12 ||
      currentPlayer["cards"][0]["rank"] == 13) &&
    currentPlayer["cards"][1]["rank"] == 1
  ) {
    currentPlayer["cards"][1]["rank"] = 11;
    currentPlayer["blackjack"] = true;
    currentStatus = "BLACKJACK";
  } else if (
    //IF BOTH ARE ACES
    currentPlayer["cards"][0]["rank"] == 1 &&
    currentPlayer["cards"][1]["rank"] == 1
  ) {
    currentPlayer["cards"][0]["rank"] = 11;
    currentStatus = "DOUBLE ACES";
  }
  return currentStatus;
};

var addPointstoPlayer = function (inputCard) {
  if (inputCard == "bigAce") {
    currentPlayer["totalscore"] += 11;
  } else if (inputCard == "smallAce") {
    currentPlayer["totalscore"] += 1;
  } else if (inputCard == "BLACKJACK") {
    currentPlayer["totalscore"] += 21;
  } else if (inputCard == "DOUBLE ACES") {
    currentPlayer["totalscore"] += 12;
  } else {
    currentAmount = inputCard["rank"];
    if (currentAmount == 11 || currentAmount == 12 || currentAmount == 13) {
      currentPlayer["totalscore"] += 10;
    } else {
      currentPlayer["totalscore"] += currentAmount;
    }
  }
};

//CONSOLIDATES AND SHOWS ALL PLAYERS CARD INTO A STRING
var checkCurrentPlayerCards = function (playerCards) {
  console.log("Enter check current player cards function.");
  //Initial Message
  var allCardsMessage = `${playerCards["playerName"]} hand: `;

  //Going through the cards of player provided
  for (card in playerCards["cards"]) {
    //console.log(card);
    //Concentanate card details into the initial message
    var currentCardName = `${captializeString(
      String(playerCards["cards"][card]["name"])
    )} of ${captializeString(String(playerCards["cards"][card]["suit"]))}`;
    allCardsMessage = allCardsMessage + currentCardName + ", ";
  }
  return allCardsMessage;
};

//GENERATE NEW DECK
var genDeck = function () {
  var cards = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    //console.log(`Current suit: ${currentSuit}`);
    while (rankCounter <= 13) {
      //console.log(`Current rank: ${rankCounter}`);
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
      //console.log(`Current card name: ${cardName}`);

      var newCard = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cards.push(newCard);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cards;
};

//GENERATE RANDOM NUMBER
var genRandomValue = function (inputSize) {
  randomValue = Math.floor(Math.random() * inputSize);

  return randomValue;
};

//SHUFFLE DECK
var shuffleDeck = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = genRandomValue(cardDeck.length);

    if (randomIndex != currentIndex) {
      var currentCard = cardDeck[currentIndex];
      var randomCard = cardDeck[randomIndex];
      //console.log(`Current card: ${currentCard["name"]} of ${currentCard["suit"]}`);
      //console.log(`Shuffled with: ${randomCard["name"]} of ${randomCard["suit"]}`);
    } else {
      while (randomIndex == currentIndex) {
        //console.log(`NOTE: Current Index ${currentIndex} and Random Index detected ${randomIndex}.`);
        randomIndex = genRandomValue(cardDeck.length);
        //console.log(`Current Index ${currentIndex} and Random Index detected. Reshuffled random index to: ${randomIndex}`);
      }
      var currentCard = cardDeck[currentIndex];
      var randomCard = cardDeck[randomIndex];
      //console.log(`Current card: ${currentCard["name"]} of ${currentCard["suit"]}`);
      //console.log(`Shuffled with: ${randomCard["name"]} of ${randomCard["suit"]}`);
    }
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

/*
===================================================================================================================
MESSAGE FUNCTIONS
===================================================================================================================
*/

//MESSAGES FOR PLAYER SCORING & DECISION
var outputPlayerMessage = function (mode, player, totalscore) {
  if (mode == "blackjack") {
    var outputMessage = `${player["playerName"]} have a total score of ${totalscore}. ${player["playerName"]} have attain BLACKJACK. Moving on to the next player.`;
  } else if (mode == "under18") {
    var outputMessage = `${player["playerName"]} have a total score of ${totalscore} which is less than 18. <br><br>${player["playerName"]} have to draw another card. <br><br>Hit 'Submit' to draw another card.`;
  } else if (mode == "computerDrawCard") {
    var outputMessage = `${player["playerName"]} have a total score of ${totalscore}. <br><br>${player["playerName"]} has decided to draw another card.<br><br>Hit 'Submit' to continue`;
  } else if (mode == "computerNotDrawCard") {
    var outputMessage = `${player["playerName"]} have a total score of ${totalscore}. <br><br>${player["playerName"]} has decided not to draw another card.<br><br>Hit 'Submit' to continue`;
  } else if (mode == "playerDrawCardQuery") {
    var outputMessage = `${player["playerName"]} have a total score of ${totalscore}. <br><br>Would ${player["playerName"]} like to draw another card?. <br><br>Type 'hit' to draw another card.<br>or<br>Type 'stand' to move on to the next player.<br><br>Hit 'Submit' to continue`;
  } else if (mode == "moreThan21") {
    var outputMessage = `${player["playerName"]} have a total score of ${totalscore}. <br><br>${player["playerName"]} have more than 21. Moving on to scoring.<br><br>Hit 'Submit' to continue`;
  }
  return outputMessage;
};

//MESSAGES FOR CARD DRAWING
var outputCardDrawnMessage = function (player, cardDrawn1, cardDrawn2) {
  if (cardDrawn2 != "none") {
    var outputMessage = `${player["playerName"]} has drawn ${captializeString(
      String(cardDrawn1["name"])
    )} of ${captializeString(String(cardDrawn1["suit"]))} & ${captializeString(
      String(cardDrawn2["name"])
    )} of ${captializeString(String(cardDrawn2["suit"]))}`;
  } else {
    var outputMessage = `${player["playerName"]} has drawn ${captializeString(
      String(cardDrawn1["name"])
    )} of ${captializeString(String(randCardDrawn1["suit"]))}`;
  }
  return outputMessage;
};

//MESSAGES FOR ACE CARDS
var outputAceMessage = function (player, mode) {
  if (mode == "playerFirstCardDrawn") {
    var outputMessage = `${player["playerName"]} first card is an Ace! Hit 'Submit' to continue`;
  } else if (mode == "playerSecondCardDrawn") {
    var outputMessage = `${player["playerName"]} seconds card is an Ace! Hit 'Submit' to continue`;
  } else if (mode == "oneMoreCard") {
    var outputMessage = `${player["playerName"]} got an Ace! Hit 'Submit' to continue`;
  } else if (mode == "chose11") {
    var outputMessage = `${player["playerName"]} has decided Ace to be 11.`;
  } else if (mode == "chose1") {
    var outputMessage = `${player["playerName"]} has decided Ace to be 1.`;
  } else if (mode == "aceQuery") {
    var outputMessage = `<br><br>${player["playerName"]} have drawn an Ace. Would you like it to be 1 or 11?`;
  }
  return outputMessage;
};
