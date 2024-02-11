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
};

var computerDeck = {
  playerName: "CPU",
  cards: [],
  blackjack: false,
  totalscore: 0,
  win: 0,
  loss: 0,
};

var player_draw_card = "PLAYER_DRAW_CARD";
var player_card_decision = "PLAYER_CARD_DECISION";
var computer_draw_card = "COMPUTER_DRAW_CARD";
var computer_card_decision = "COMPUTER_CARD_DECISION";
var scoring_mode = "SCORING_MODE";

var currentGameMode = "PLAYER_DRAW_CARD";
var currentPlayer = playerDeck;

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
      console.log(currentPlayer["cards"]);

      var myOutputValue = `Player has drawn ${captializeString(
        String(randCardDrawn1["name"])
      )} of ${captializeString(
        String(randCardDrawn1["suit"])
      )} & ${captializeString(
        String(randCardDrawn2["name"])
      )} of ${captializeString(String(randCardDrawn2["suit"]))}`;
      currentGameMode = player_card_decision;
      return myOutputValue;
    } else {
      console.log("PLAYER DECIDED TO DRAW ANOTHER CARD");
      randCardDrawn1 = drawCardFunc(currentPlayer);
      var myOutputValue = `Player has drawn ${captializeString(
        String(randCardDrawn1["name"])
      )} of ${captializeString(String(randCardDrawn1["suit"]))}`;
      currentGameMode = player_card_decision;
      return myOutputValue;
    }

    //ENTERING PLAYER'S DECISION
  } else if (currentGameMode == player_card_decision && input.length == 0) {
    console.log("CHECKING PLAYER'S TOTAL SCORE.");

    var currentcardmessage = checkCurrentPlayerCards(currentPlayer)[0];
    var totalscore = currentPlayer["totalscore"];
    var blackjackstatus = currentPlayer["blackjack"];

    if (blackjackstatus == true) {
      var myOutputValue = `${currentcardmessage} <br>You have a total score of ${totalscore}. You have attain BLACKJACK. Moving on to the next player.`;
      currentGameMode = computer_draw_card;
    } else if (totalscore < 18) {
      var myOutputValue = `${currentcardmessage} <br><br>You have a total score of ${totalscore} which is less than 18. <br><br>You have to draw another card. <br><br>Hit 'Submit' to draw another card.`;
      currentGameMode = player_draw_card;
    } else if (totalscore >= 18 && totalscore <= 21) {
      currentGameMode = player_card_decision;
      var myOutputValue = `${currentcardmessage} <br>You have a total score of ${totalscore}. <br><br>Would you like to draw another card?. <br><br>Type 'hit' to draw another card.<br>or<br>Type 'stand' to move on to the next player.<br><br>Hit 'Submit' to continue`;
    } else {
      currentGameMode = computer_draw_card;
      var myOutputValue = `${currentcardmessage} <br>You have a total score of ${totalscore}. <br><br>You have more than 21. Moving on to the next player.<br><br>Hit 'Submit' to continue`;
    }
    return myOutputValue;
  } else if (currentGameMode == player_card_decision && input.length != 0) {
    console.log(`PLAYER DECIDES TO HIT OR STAND MODE: ${currentGameMode}`);
    var totalscore = currentPlayer["totalscore"];
    if (input.toLowerCase() == "hit" || input.toLowerCase() == "h") {
      var myOutputValue = `Player has decided to draw a card. <br><br>Hit 'Submit' to continue`;
      currentGameMode = player_draw_card;
    } else if (input.toLowerCase() == "stand" || input.toLowerCase() == "s") {
      var myOutputValue = `Player has decided not to draw a card. <br><br>Hit 'Submit' to continue`;
      currentGameMode = computer_draw_card;
    } else {
      var myOutputValue = `You have a ${totalscore}. <br>Would you like to draw another card?. <br>Type 'hit' to draw another card.<br>or<br>Type 'stand' to move on to the next player.<br>Hit 'Submit' to continue`;
    }
    return myOutputValue;
  } else if (currentGameMode == computer_draw_card) {
    currentPlayer = computerDeck;
    console.log(`IT'S ${currentPlayer["playerName"]} TURN TO DRAW THE CARD`);

    if (currentPlayer["totalscore"] == 0) {
      console.log("COMPUTER TURN TO DRAW THE CARD");
      randCardDrawn1 = drawCardFunc(currentPlayer);
      randCardDrawn2 = drawCardFunc(currentPlayer);
      console.log(currentPlayer["cards"]);

      var myOutputValue = `Computer has drawn ${captializeString(
        String(randCardDrawn1["name"])
      )} of ${captializeString(
        String(randCardDrawn1["suit"])
      )} & ${captializeString(
        String(randCardDrawn2["name"])
      )} of ${captializeString(String(randCardDrawn2["suit"]))}`;
      currentGameMode = computer_card_decision;
      return myOutputValue;
    } else {
      console.log("COMPUTER DECIDED TO DRAW ANOTHER CARD");
      randCardDrawn1 = drawCardFunc(currentPlayer);
      var myOutputValue = `Computer has drawn ${randCardDrawn1["name"]} of ${randCardDrawn1["suit"]}`;
      currentGameMode = computer_card_decision;
      return myOutputValue;
    }

    //ENTERING COMPUTER'S DECISION
  } else if (currentGameMode == computer_card_decision) {
    console.log("COMPUTER'S TIME TO DECIDE WHETHER TO HIT OR STAND");

    var currentcardmessage = checkCurrentPlayerCards(currentPlayer)[0];
    var totalscore = currentPlayer["totalscore"];
    var blackjackstatus = currentPlayer["blackjack"];

    if (blackjackstatus == true) {
      var myOutputValue = `${currentcardmessage} <br>Computer have a total score of ${totalscore}. Computer have attain BLACKJACK. Moving on to the next player.`;
      currentGameMode = computer_draw_card;
    } else if (totalscore < 18) {
      var myOutputValue = `${currentcardmessage} <br><br>Computer have a total score of ${totalscore} which is less than 18. <br><br>Computer have to draw another card. <br><br>Hit 'Submit' to draw another card.`;
      currentGameMode = computer_draw_card;
    } else if (totalscore >= 18 && totalscore <= 21) {
      var genRandChoice = genRandomValue(2);
      console.log(`COMPUTER RANDOM DECISION: ${genRandChoice}`);
      if (genRandChoice == 1) {
        var myOutputValue = `${currentcardmessage} <br>Computer have a total score of ${totalscore}. <br><br>Computer has decided to draw another card.<br><br>Hit 'Submit' to continue`;
        currentGameMode = computer_draw_card;
      } else {
        var myOutputValue = `${currentcardmessage} <br>Computer have a total score of ${totalscore}. <br><br>Computer has decided not to draw another card.<br><br>Hit 'Submit' to continue`;
        currentGameMode = scoring_mode;
      }
    } else {
      currentGameMode = scoring_mode;
      var myOutputValue = `${currentcardmessage} <br>Computer have a total score of ${totalscore}. <br><br>Computer have more than 21. Moving on to scoring.<br><br>Hit 'Submit' to continue`;
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

var resetGame = function () {
  currentGameMode = player_draw_card;
  currentPlayer = playerDeck;
  playerDeck["cards"] = [];
  playerDeck["blackjack"] = false;
  playerDeck["totalscore"] = 0;

  computerDeck["cards"] = [];
  computerDeck["blackjack"] = false;
  computerDeck["totalscore"] = 0;
};

//Capitalize first word of string given
var captializeString = function capitalizeFirstLetter(inputString) {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};

//Draw random card of give deck
var drawCardFunc = function (currentDeck) {
  var randCardDrawn = newDeckShuffled[genRandomValue(newDeckShuffled.length)];
  currentDeck["cards"].push(randCardDrawn);

  return randCardDrawn;
};

//CHECK CURRENT PLAYERS CARDS
//Function to return message of what cards are in player's hand and total sum. Changes Blackjack status if conditions are met.
var checkCurrentPlayerCards = function (playerCards) {
  console.log("Enter check current player cards function.");
  //Initial Message
  var allCardsMessage = `${playerCards["playerName"]} hand: `;

  totalamount = 0;

  //Check for blackjack
  if (
    (playerCards["cards"][1]["rank"] == 11 ||
      (playerCards["cards"][1]["rank"] == 12) |
        (playerCards["cards"][1]["rank"] == 13)) &&
    playerCards["cards"][0]["rank"] == 0
  ) {
    playerCards["cards"][0]["rank"] = 11;
    playerCards["blackjack"] = true;
  } else if (
    (playerCards["cards"][0]["rank"] == 11 ||
      (playerCards["cards"][0]["rank"] == 12) |
        (playerCards["cards"][0]["rank"] == 13)) &&
    playerCards["cards"][1]["rank"] == 0
  ) {
    playerCards["cards"][1]["rank"] = 11;
    playerCards["blackjack"] = true;
  }

  //Going through the cards of player provided
  for (card in playerCards["cards"]) {
    console.log(card);
    //Concentanate card details into the initial message
    var currentCardName = `${captializeString(
      String(playerCards["cards"][card]["name"])
    )} of ${captializeString(playerCards["cards"][card]["suit"])}`;
    allCardsMessage = allCardsMessage + currentCardName + ", ";

    currentAmount = playerCards["cards"][card]["rank"];

    //Calculating current score in player's hand
    if (currentAmount == 11 || currentAmount == 12 || currentAmount == 13) {
      totalamount += 10;
    } else {
      totalamount += currentAmount;
    }
  }
  playerCards["totalscore"] = totalamount;
  console.log(allCardsMessage, playerCards["totalscore"]);
  return [allCardsMessage];
};

//GENERATE NEW DECK
var genDeck = function () {
  var cards = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];

  var suitIndex = 0;

  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    console.log(`Current suit: ${currentSuit}`);
    while (rankCounter <= 13) {
      console.log(`Current rank: ${rankCounter}`);
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
      console.log(`Current card name: ${cardName}`);

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
      console.log(
        `Current card: ${currentCard["name"]} of ${currentCard["suit"]}`
      );
      console.log(
        `Shuffled with: ${randomCard["name"]} of ${randomCard["suit"]}`
      );
    } else {
      while (randomIndex == currentIndex) {
        console.log(
          `NOTE: Current Index ${currentIndex} and Random Index detected ${randomIndex}.`
        );
        randomIndex = genRandomValue(cardDeck.length);
        console.log(
          `Current Index ${currentIndex} and Random Index detected. Reshuffled random index to: ${randomIndex}`
        );
      }
      var currentCard = cardDeck[currentIndex];
      var randomCard = cardDeck[randomIndex];
      console.log(
        `Current card: ${currentCard["name"]} of ${currentCard["suit"]}`
      );
      console.log(
        `Shuffled with: ${randomCard["name"]} of ${randomCard["suit"]}`
      );
    }
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};
