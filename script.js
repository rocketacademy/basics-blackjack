// Global Vars
// Dictates which stage prog is at ("inputNoOfPlayers, inputPlayerNames, startRound, inputBets, playersPhase, dealersPhase")
var currentStage = "appStart";
var infoDisplay = document.querySelector("#instructionsPrint");
var output = ``;

var noOfPlayers = 0;
var arrOfPlayers = [];
var roundCounter = 1;

var playerCounter = 0;
var currentPlayer;
var handCounter = 0;
var currentHand;
var currentDeck;
var highestPlayerValue = 0;

var testAce = {
  name: "Ace",
  suit: "Test",
  rank: 1,
  value: 11,
  cardFullName: "Ace of Test",
};

var testKing = {
  name: "King",
  suit: "Test",
  rank: 13,
  value: 10,
  cardFullName: "King of Test",
};

var testNine = {
  name: "Nine",
  suit: "Test",
  rank: 9,
  value: 9,
  cardFullName: "Nine of Test",
};

var testHand = {
  cards: [testNine, testNine],
  value: 0,
  splitAsked: false,
  eligibleToSplit: false,
  splitDecided: false,
  status: "pending", // Can be "win", "bust", "pending"
  name: "Testing Hand",
};

var testPlayer = {
  name: `testPlayer`,
  chips: 100,
  hands: [testHand],
  wager: 20,
  status: "pending", // "pending, "stand", "broke", "win"
};

var dealer = {
  hand: [],
  status: "pending", // "pending, blackjack, bust, stand"
  revealed: "no",
};

// Func to make a new player, with starting money of 100, and an empty hand
var makePlayer = function (nameInput) {
  var playerObj = {
    name: nameInput,
    chips: 100,
    hands: [],
    wager: 0,
    status: "pending", // "pending, "stand", "broke", "win"
  };
  return playerObj;
};

var makeHand = function (card1, card2, handName) {
  var handObj = {
    cards: [card1, card2],
    value: 0,
    splitAsked: false,
    eligibleToSplit: false,
    splitDecided: false,
    status: "pending", // Can be "win", "bust", "pending"
    name: handName,
  };
  return handObj;
};

// Makes Deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

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
      var cardValue = 0;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
        cardValue = 11;
      } else if (cardName == 2) {
        cardName = "Two";
        cardValue = 2;
      } else if (cardName == 3) {
        cardName = "Three";
        cardValue = 3;
      } else if (cardName == 4) {
        cardName = "Four";
        cardValue = 4;
      } else if (cardName == 5) {
        cardName = "Five";
        cardValue = 5;
      } else if (cardName == 6) {
        cardName = "Six";
        cardValue = 6;
      } else if (cardName == 7) {
        cardName = "Seven";
        cardValue = 7;
      } else if (cardName == 8) {
        cardName = "Eight";
        cardValue = 8;
      } else if (cardName == 9) {
        cardName = "Nine";
        cardValue = 9;
      } else if (cardName == 10) {
        cardName = "Ten";
        cardValue = 10;
      } else if (cardName == 11) {
        cardName = "Jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "Queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "King";
        cardValue = 10;
      }

      var cardFullName = `${cardName} Of ${currentSuit}`;
      var cardSRC = `./images/${cardName}Of${currentSuit}.png`;

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
        cardFullName: cardFullName,
        cardSRC: cardSRC,
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

var greatReset = function () {
  currentStage = "appStart";
  infoDisplay = document.querySelector("#instructionsPrint");
  output = ``;
  noOfPlayers = 0;
  arrOfPlayers = [];
  roundCounter = 1;
  playerCounter = 0;
  currentPlayer;
  handCounter = 0;
  currentHand;
  currentDeck;
  highestPlayerValue = 0;
  dealer = {
    hand: [],
    status: "pending", // "pending, blackjack, bust, stand"
    revealed: "no",
  };
};

var softReset = function () {
  playerCounter = 0;
  handCounter = 0;
  highestPlayerValue = 0;
  for (player of arrOfPlayers) {
    player.hands = [];
    player.wager = 0;
    player.status = "pending";
  }
  dealer = {
    hand: [],
    status: "pending", // "pending, blackjack, bust, stand"
    revealed: "no",
  };
  currentStage = "startRound";
};

var inputNoOfPlayers = function (input) {
  if (input > 0 && !isNaN(input)) {
    noOfPlayers = Number(input);
    currentStage = "inputPlayerNames";
    infoDisplay.innerHTML = `<b>Setting up game for ${noOfPlayers} players...</b>`;
    return `Press Submit to Continue.`;
  } else {
    return `Please enter valid number of players!`;
  }
};

var inputPlayerNames = function (input) {
  while (playerCounter < noOfPlayers) {
    if (input == "") {
      infoDisplay.innerHTML = `<b>Please enter Player ${
        playerCounter + 1
      }'s name</b>`;
      return `Player ${playerCounter + 1} name cannot be Blank.`;
    } else if (playerCounter < noOfPlayers - 1) {
      arrOfPlayers.push(makePlayer(input.toUpperCase()));
      playerCounter++;
      infoDisplay.innerHTML = `Welcome <b>${input.toUpperCase()} (Player ${playerCounter})</b>`;
      updatePlayerStats();
      return `Please key in name for Player ${playerCounter + 1}`;
    } else {
      arrOfPlayers.push(makePlayer(input.toUpperCase()));
      currentStage = "startRound";
      infoDisplay.innerHTML = `Welcome <b>${input.toUpperCase()} (Player ${
        playerCounter + 1
      })<br><br>All Players setup, Starting Game! </b>`;
      playerCounter = 0;
      updatePlayerStats();
      return `Press Submit to Continue.`;
    }
  }
};

var startRound = function () {
  var areThereBrokePlayers = false;
  var brokePlayers = ``;
  for (player of arrOfPlayers) {
    if (player.chips <= 0) {
      var playerToRemove = arrOfPlayers.indexOf(player);
      arrOfPlayers.splice(playerToRemove, 1);
      brokePlayers += ` ${player.name}, `;
      areThereBrokePlayers = true;
    }

    if (areThereBrokePlayers == true) {
      brokePlayers += `ran out of Chips and will be removed from game. Better luck next time!`;
      infoDisplay.innerHTML = brokePlayers;
      return `Press Submit to Continue.`;
    }
  }

  if (arrOfPlayers.length == 0) {
    infoDisplay.innerHTML = `All players went broke. Game is over.`;
    greatReset();
    return `Press Submit to Reset App`;
  }

  infoDisplay.innerHTML = `<b> Starting Round ${roundCounter}... </b>`;
  currentDeck = shuffleCards(makeDeck());
  for (player of arrOfPlayers) {
    var card1 = currentDeck.pop();
    var card2 = currentDeck.pop();
    player.hands.push(makeHand(card1, card2, "Main Hand"));
  }
  card1 = currentDeck.pop();
  card2 = currentDeck.pop();
  dealer.hand.push(makeHand(card1, card2, "Dealer Main Hand"));
  currentStage = "inputBets";
  return `Press Submit to Deal Cards`;
};

var inputBets = function (input) {
  while (playerCounter < noOfPlayers) {
    output = "";
    var bettingPlayer = arrOfPlayers[playerCounter];
    if (playerCounter == 0 && input == "") {
      infoDisplay.innerHTML = `<b>@ ${bettingPlayer.name} :</b> You have <b>${bettingPlayer.chips}</b> Chips. <br><br>How much would you like to wager?`;
      return `@ ${bettingPlayer.name}. Enter your bet here`;
    }
    if (playerCounter < noOfPlayers) {
      if (input < 1 || isNaN(input)) {
        return `<b>@ ${bettingPlayer.name}:</b> Invalid. Please type in a valid bet.`;
      }
      if (input > bettingPlayer.chips) {
        return `<b>@ ${bettingPlayer.name}:</b> You can't bet ${input} chips; You only have <b>${bettingPlayer.chips}</b> chips!<br> Please type in a valid bet.`;
      } else {
        var nextPlayer = arrOfPlayers[playerCounter + 1];
        bettingPlayer.wager = input;
        bettingPlayer.chips -= input;
        if (playerCounter < noOfPlayers - 1) {
          infoDisplay.innerHTML = `<b>@ ${bettingPlayer.name}:</b> Ok! You've bet ${input} chips. <br><br>@ ${nextPlayer.name} :</b> You have <b>${nextPlayer.chips}</b> Chips. <br>How much would you like to wager?`;
          output = `@ ${nextPlayer.name}. Enter your bet here`;
          playerCounter++;
        } else if (playerCounter == noOfPlayers - 1) {
          currentStage = "playersPhase";
          infoDisplay.innerHTML = `<b>@ ${bettingPlayer.name}:</b> Ok! You've bet ${input} chips.<br><br>All players have wagered.`;
          output = `Press Submit to Continue!`;
          playerCounter = 0;
        }
        updatePlayerStats();
        return output;
      }
    }
  }
};

var checkIfAnyHandPending = function (currentPlayer) {
  for (hand of currentPlayer.hands) {
    if (hand.status == "pending") {
      return true;
    }
  }
  return false;
};

var checkIfBlackjack = function (currentHand) {
  if (
    currentHand.cards[0].name == "Ace" ||
    currentHand.cards[1].name == "Ace"
  ) {
    if (currentHand.cards[0].rank >= 10 || currentHand.cards[1].rank >= 10) {
      hand.status = "blackjack";
      infoDisplay.innerHTML = `${currentPlayer.name}'s ${hand.name} is BlackJack! Press "Submit" for next hand`;
      return true;
    }
  }
  return false;
};

var checkIfHandSplitable = function (currentHand) {
  if (currentHand.cards[0].name == currentHand.cards[1].name) {
    if (currentPlayer.wager <= currentPlayer.chips) {
      infoDisplay.innerHTML = `@${currentPlayer.name}, you are eligible to split this hand for ${currentPlayer.wager} chips. <br> "Yes" or "No" to split?`;
      currentHand.splitAsked = true;
      currentHand.eligibleToSplit = true;
      return true;
    }
  }
  currentHand.splitAsked = true;
  return false;
};

var splitHandIfYes = function (input, currentHand, currentPlayer) {
  if (input == "yes") {
    var poppedCard = currentHand.cards.pop();
    currentHand.cards.push(currentDeck.pop());

    currentPlayer.hands.push(
      makeHand(poppedCard, currentDeck.pop(), "Split Hand")
    );

    currentPlayer.chips -= currentPlayer.wager;
    currentHand.splitDecided = true;
    infoDisplay.innerHTML = `@${currentPlayer.name}, you have split your hand for ${currentPlayer.wager} and now have ${currentPlayer.chips} chips left`;
    return `Press Submit to process your new hands!`;
  } else if (input == "no") {
    currentHand.splitDecided = true;
    infoDisplay.innerHTML = `@${currentPlayer.name}, Noted. You have passed on splitting your hand!`;
    return `Press Submit to continue`;
  } else {
    return `Invalid Option. Please type in "Yes" or "No" to Split your hand`;
  }
};

var calcHandValue = function (currentHand) {
  var aceCounter = 0;
  var calculatedValue = 0;
  for (card of currentHand.cards) {
    if (card.name == "Ace") {
      aceCounter++;
    }
    calculatedValue += card.value;
  }

  while (calculatedValue > 21 && aceCounter > 0) {
    calculatedValue -= 10;
    aceCounter -= 1;
  }
  currentHand.value = calculatedValue;
  return calculatedValue;
};

var hitOrStand = function (input, currentHand) {
  calcHandValue(currentHand);
  if (currentHand.value > 21) {
    currentHand.status = "bust";
    return `You have bust with ${currentHand.value}pts on this hand! Press Submit to Continue.`;
  }
  if (input == "") {
    return `Your current hand value is ${currentHand.value}pts.<br> Do you want to "Hit" or "Stand"`;
  }

  if (input == "hit") {
    var drawnCard = currentDeck.pop();
    currentHand.cards.push(drawnCard);
    infoDisplay.innerHTML = printCurrentHand(currentPlayer, currentHand);
    calcHandValue(currentHand);
    return `You drew a ${drawnCard.cardFullName}. Press Submit to Continue.`;
  }

  if (input == "stand") {
    infoDisplay.innerHTML = printCurrentHand(currentPlayer, currentHand);
    calcHandValue(currentHand);
    currentHand.status = "stand";
    if (currentHand.value > highestPlayerValue) {
      highestPlayerValue = currentHand.value;
    }
    return `Noted. Your final hand value for this hand is ${currentHand.value}pts. Press Submit to Continue.`;
  }

  return `Invalid. Please choose to "Hit" or "Stand".`;
};

var dealerAI = function () {
  infoDisplay.innerHTML = printDealerHand();
  calcHandValue(dealer.hand[0]);
  if (dealer.hand[0].value > 21) {
    dealer.status = "bust";
    for (player of arrOfPlayers) {
      for (hand of player.hands) {
        if (hand.status == `blackjack` || hand.status == "stand") {
          player.chips += 2 * player.wager;
        }
      }
    }
    roundCounter += 1;
    infoDisplay.innerHTML =
      printDealerHand() +
      `<br> Dealer has bust at ${dealer.hand[0].value}! All eligible hands recieve payout`;
    softReset();
    return `Press Submit to Start New Round`;
  }

  if (
    dealer.hand[0].value >= highestPlayerValue ||
    dealer.hand[0].value >= 18
  ) {
    dealer.status = "stand";
    infoDisplay.innerHTML =
      printDealerHand() +
      `<br> Dealer stands at ${dealer.hand[0].value}! <br>All eligible hands recieve payout`;
    for (player of arrOfPlayers) {
      for (hand of player.hands) {
        if (
          hand.status == `blackjack` ||
          (hand.status == "stand" && hand.value > dealer.hand[0].value)
        ) {
          player.chips += 2 * player.wager;
        }
      }
    }
    softReset();
    roundCounter += 1;
    return `Press Submit to Start New Round`;
  }
  var drawnCard = currentDeck.pop();
  dealer.hand[0].cards.push(drawnCard);
  infoDisplay.innerHTML = printDealerHand();
  return `Dealer hits and draws ${drawnCard.cardFullName} and has handvalue of ${dealer.hand[0].value}.<br>Press Submit to Continue.`;
};

var printCurrentHand = function (player, hand) {
  var printOutput = `In ${player.name}'s ${hand.name} hand:<br>`;
  for (card of hand.cards) {
    printOutput += `<img src=${card.cardSRC} style="width:70px;">`;
  }
  return printOutput;
};

var printDealerHand = function () {
  var printOutput = `In Dealer's hand:<br>`;
  for (card of dealer.hand[0].cards) {
    printOutput += `<img src=${card.cardSRC} style="width:70px;">`;
  }
  return printOutput;
};

var updatePlayerStats = function () {
  var currentTable = document.getElementById("playerStats");
  var newBody = document.createElement("tbody");

  for (player of arrOfPlayers) {
    var playerRow = document.createElement("tr");

    var playerNameCell = document.createElement("td");
    playerNameCell.innerHTML = `${player.name}`;
    playerRow.appendChild(playerNameCell);

    var playerHandCell = document.createElement("td");
    for (hand of player.hands) {
      for (card of hand.cards) {
        if (player.wager > 0) {
          playerHandCell.innerHTML += `<img src=${card.cardSRC} style="width:50px;">`;
        } else {
          playerHandCell.innerHTML += `<img src="./images/cardback.png" style="width:50px;">`;
        }
      }
      playerHandCell.innerHTML += `<br>`;
    }
    playerRow.appendChild(playerHandCell);

    var playerHandStatusCell = document.createElement("td");
    for (hand of player.hands) {
      playerHandStatusCell.innerHTML += `${hand.status}<br>`;
    }
    playerRow.appendChild(playerHandStatusCell);

    var playerWagerCell = document.createElement("td");
    playerWagerCell.innerHTML = `${player.wager}`;
    playerRow.appendChild(playerWagerCell);

    var playerChipCell = document.createElement("td");
    playerChipCell.innerHTML = `${player.chips}`;
    playerRow.appendChild(playerChipCell);

    newBody.appendChild(playerRow);
  }
  currentTable.tBodies[1].replaceWith(newBody);
};
/*
=========================================
            Main Function
=========================================
*/

var main = function (input) {
  console.log("Starting Current Stage:", currentStage);
  console.log("List of Players:", arrOfPlayers);
  console.log("Dealer Stats:", dealer);
  console.log(`PlayerCount`, playerCounter);
  updatePlayerStats();
  //Converts userinput into lowercase.
  input = input.toLowerCase();
  // Reset Function (Reset Everything)
  if (input == "reset") {
    greatReset();
    return `Game has been reset.`;
  }
  if (currentStage == "appStart") {
    currentStage = "inputNoOfPlayers";
    infoDisplay.innerHTML = "<b>Please Enter Number of Players.</b>";
    return "Please Enter No. of Players.";
  }
  if (currentStage == "inputNoOfPlayers") {
    return inputNoOfPlayers(input);
  }
  if (currentStage == "inputPlayerNames") {
    return inputPlayerNames(input);
  }
  if (currentStage == "startRound") {
    return startRound();
  }
  if (currentStage == "inputBets") {
    return inputBets(input);
  }
  if (currentStage == "playersPhase") {
    while (playerCounter < noOfPlayers) {
      currentPlayer = arrOfPlayers[playerCounter];
      // Enable testing mode;
      // currentPlayer = testPlayer;
      currentHand = currentPlayer.hands[handCounter];

      nextRoundInstructions = `${currentPlayer.name}'s Turn`;
      document.querySelector("#instructionsPrint").innerHTML =
        nextRoundInstructions;

      if (!checkIfAnyHandPending(currentPlayer)) {
        output = `${currentPlayer.name}'s turn is done!`;
        playerCounter++;
        handCounter = 0;
        return output;
      }

      if (checkIfBlackjack(currentHand)) {
        output = `This hand is a BlackJack! Press "Submit" for next hand`;
        handCounter++;
        return output;
      }

      if (currentHand.splitAsked == false) {
        if (checkIfHandSplitable(currentHand)) {
          output = `Type "Yes" or "No" to split.`;
          return output;
        }
      }

      if (
        currentHand.eligibleToSplit == true &&
        currentHand.splitDecided == false
      ) {
        output = splitHandIfYes(input, currentHand, currentPlayer);
        return output;
      }

      if (currentHand.status == "pending") {
        infoDisplay.innerHTML = printCurrentHand(currentPlayer, currentHand);
        output = hitOrStand(input, currentHand);
        return output;
      } else {
        handCounter++;
        infoDisplay.innerHTML = "In transition...";
        return `This hand is processed. Moving to next hand/player...`;
      }
    }
    currentStage = "dealersPhase";
    playerCounter = 0;
    infoDisplay.innerHTML = "All Players Done... Moving on to Dealer's Turn...";
    return `All Players Done... Moving on to Dealer's Turn...`;
  }
  if (currentStage == "dealersPhase") {
    if (dealer.revealed == "no") {
      calcHandValue(dealer.hand[0]);
      infoDisplay.innerHTML = printDealerHand();
      dealer.revealed = "yes";
      return `Dealer reveals his hand with ${dealer.hand[0].value}! Press Submit to Continue.`;
    }

    if (checkIfBlackjack(dealer.hand[0])) {
      infoDisplay.innerHTML += `<br> Dealer has Black Jack! All Pending Hands Lose! <br> Winning hands have been credited`;
      dealer.status = "blackjack";
      for (player of arrOfPlayers) {
        for (hand of player.hands) {
          if (hand.status == `blackjack`) {
            player.chips += 2 * player.wager;
          }
        }
      }
      roundCounter++;
      softReset();
      return `Round over! Payouts resolved. Press Submit to start new round`;
    }
    outcome = dealerAI();
    return outcome;
  }
};
