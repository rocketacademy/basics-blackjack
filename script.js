var gameStatus = "AFTER-PLACING-BET";
var bestScore = 21;
var cardDeck = [];
var isDealerTurn = false;
var blackjackPayout = 1.5;
var winPayout = 1;

var player = {
  cards: [],
  roundScore: 0,
  points: 100,
  currentBet: 0,
};
var computer = {
  cards: [],
  roundScore: 0,
};

// Deck of cards for debugging
var deck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 1,
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
  },
  {
    name: "3",
    suit: "hearts",
    rank: 3,
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
  },
  {
    name: "ace",
    suit: "hearts",
    rank: 11,
  },
  {
    name: "6",
    suit: "hearts",
    rank: 6,
  },
  {
    // Computer
    name: "10",
    suit: "hearts",
    rank: 10,
  },
  {
    // Player
    name: "ace",
    suit: "hearts",
    rank: 11,
  },
  {
    // Computer
    name: "ace",
    suit: "hearts",
    rank: 11,
  },
  {
    //player
    name: "ace",
    suit: "hearts",
    rank: 11,
  },
];

// Function to generate card deck
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

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      } else if (cardName == 1) {
        cardName = "1️⃣";
      } else if (cardName == 2) {
        cardName = "2️⃣";
      } else if (cardName == 3) {
        cardName = "3️⃣";
      } else if (cardName == 4) {
        cardName = "4️⃣";
      } else if (cardName == 5) {
        cardName = "5️⃣";
      } else if (cardName == 6) {
        cardName = "6️⃣";
      } else if (cardName == 7) {
        cardName = "7️⃣";
      } else if (cardName == 8) {
        cardName = "8️⃣";
      } else if (cardName == 9) {
        cardName = "9️⃣";
      } else if (cardName == 10) {
        cardName = "🔟";
      }

      // If card suit is hearts, diamonds, clubs or spades, set cardSuit to emoji
      if (currentSuit == "Hearts") {
        currentSuit = "♥";
      } else if (currentSuit == "Diamonds") {
        currentSuit = "♦";
      } else if (currentSuit == "Clubs") {
        currentSuit = "♣";
      } else if (currentSuit == "Spades") {
        currentSuit = "♠";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Update rank of card if the card is a face card

      if (cardName == "Jack" || cardName == "Queen" || cardName == "King") {
        card.rank = 10;
      }

      // Update rank of card if it is an ace card
      if (cardName == "Ace") {
        card.rank = 11;
      }
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

var main = function (input) {
  var myOutputValue = "Error, please refresh page.";

  var inputValidationResults = inputValidity(input);

  if (inputValidationResults == true) {
    if (gameStatus == "GAME-OVER") {
      myOutputValue = `You have 0 points left. Please refresh the page to start a new game.`;
      return myOutputValue;
    }

    if (gameStatus == "AFTER-PLACING-BET") {
      player.currentBet = Number(input);
      player.points = Number(player.points) - Number(player.currentBet);
      gameStatus = "CARD DISTRIBUTION";
      return playBlackJack(input);
    }

    return playBlackJack(input);
  }
  return inputValidationResults;
};

// Function to check input validity
var inputValidity = function (input) {
  var returnStatement = "";

  if (gameStatus == "HIT-OR-STAND") {
    if (!(input.toUpperCase() == "H" || input.toUpperCase() == "S")) {
      returnStatement = `Wrong input. Please enter "h" for hit or "s" for stand`;
      return returnStatement;
    }
  }

  if (gameStatus == "AFTER-PLACING-BET") {
    if (Number(input) > player.points) {
      returnStatement = `You only have ${player.points} points. Please place a bet within your means`;
      return returnStatement;
    }
    if (isNaN(Number(input)) == true || input == "" || input.includes(" ")) {
      returnStatement = "Plese enter only enter a number";
      return returnStatement;
    }
    if (Number(input) == 0) {
      returnStatement = `No 0 bets allowed. Please place a bet more than 0.`;
      return returnStatement;
    }
  }
  return true;
};

var distributeCards = function () {
  // Generate and shuffle the card deck before each distribution
  cardDeck = shuffleCards(makeDeck());

  //  ******** Code for debugging - DO NOT DELETE **********
  // cardDeck = deck;

  console.log(`Numbers of cards in CardDeck is ` + cardDeck.length);

  var dealerBlackjackImg = `<img src="https://c.tenor.com/l99hses0uC8AAAAC/hehe-mr-bean.gif" width="30%";>`;
  var playerBlackjackImg = `<img src="https://c.tenor.com/Y9bt10ptCPQAAAAC/mr-bean-dance.gif" width="30%";>`;
  var drawImg = `<img src="https://c.tenor.com/lowhvrplIS8AAAAC/mr-bean.gif" width="30%";>`;

  var output = "";

  // Reset game result to neutral and attributes in player and computer's object
  player.cards = [];
  player.roundScore = 0;
  computer.cards = [];
  computer.roundScore = 0;
  isDealerTurn = false;

  // Take 1 card from the deck and distribute to the player then the computer

  //  ******** Code for debugging - DO NOT DELETE **********
  // for (var counter = 0; counter < 2; counter += 1) {
  //   player.cards.push(deck.pop());
  //   computer.cards.push(deck.pop());
  // }

  // ******* Actual Code - DO NOT DELETE ***********
  for (var counter = 0; counter < 2; counter += 1) {
    player.cards.push(cardDeck.pop());
    computer.cards.push(cardDeck.pop());
  }

  console.log(player);
  console.log(computer);

  // Display cards to player but only show 1 card from dealer
  var cardsDrawnStatement = displayHand(player);

  var nextRoundInstruction = "";

  // If player or dealer has blackjack, this round ends
  if (haveBlackjack(computer) && haveBlackjack(player)) {
    isDealerTurn = true;
    cardsDrawnStatement = displayHand(player);
    player.points = player.points + player.currentBet;
    nextRoundInstruction = calNextRound();
    output =
      cardsDrawnStatement +
      "<br><b>Both you and dealer drew a blackjack! It's a draw.</b><br>" +
      drawImg +
      "<br>" +
      nextRoundInstruction;
    return output;
  }

  if (haveBlackjack(computer)) {
    isDealerTurn = true;
    cardsDrawnStatement = displayHand(player);
    player.currentBet = 0;
    nextRoundInstruction = calNextRound();
    output =
      cardsDrawnStatement +
      "<br><b>Dealer drew a blackjack! Dealer Wins!</b><br>" +
      dealerBlackjackImg +
      "<br>" +
      nextRoundInstruction;

    return output;
  }

  if (haveBlackjack(player)) {
    player.points =
      player.points + player.currentBet + player.currentBet * blackjackPayout;
    player.currentBet = 0;
    nextRoundInstruction = calNextRound();
    output =
      cardsDrawnStatement +
      "<br><b>You drew a blackjack and dealer does not have a blackjack! You Won! </b><br>" +
      playerBlackjackImg +
      "<br>" +
      nextRoundInstruction;

    return output;
  }

  // Generate hint statement
  var hintStatement = generateHint();

  // If there is no blackjack, player will decide to hit or stand
  output =
    cardsDrawnStatement +
    `<br>Do you want to hit or stand? Submit "h" to hit, "s" to stand.` +
    hintStatement;

  return output;
};

// Function to add a card to player's hand
var hitCard = function (playerObject) {
  // ***** Code for debugging - DO NOT DELETE ***********
  // playerObject.cards.push(deck.pop());

  // ***** Actual Code - DO NOT DELETE ***********
  playerObject.cards.push(cardDeck.pop());

  var playerBustImg = `<img src="https://c.tenor.com/FA_EB9CjiXEAAAAd/mr-bean-faints.gif" width="30%";>`;

  var playerCardsDrawn =
    "You have requested for a card. " + displayHand(playerObject);

  if (cardBusted(playerObject)) {
    gameStatus = "AFTER-PLACING-BET";
    player.currentBet = 0;
    var nextRoundInstruction = calNextRound();
    playerCardsDrawn =
      playerCardsDrawn +
      "<br><b>You bust!</b><br>" +
      playerBustImg +
      `<br>${nextRoundInstruction}`;
    return playerCardsDrawn;
  }

  var hintStatement = generateHint();

  playerCardsDrawn =
    playerCardsDrawn +
    `<br>Do you want to hit or stand? Submit "h" to hit, "s" to stand.` +
    hintStatement;

  return playerCardsDrawn;
};

// Function to display cards on hand
var displayHand = function (currentPlayer) {
  var displayHandCards = "";
  var playerScore = calCardRank(currentPlayer);
  var playerCard = showCards(currentPlayer, "all");

  if (isDealerTurn) {
    displayHandCards =
      "Your cards on hand total to " +
      playerScore +
      ":<br>" +
      playerCard +
      "<br>Dealer's hand total to " +
      calCardRank(computer) +
      ":<br>" +
      showCards(computer, "all");
    return displayHandCards;
  }

  displayHandCards =
    "Your cards on hand total to " +
    playerScore +
    ":<br>" +
    playerCard +
    "<br>Dealer's hand has:<br>" +
    showCards(computer, 1) +
    "➻One face down card<br>";

  return displayHandCards;
};

// Function to list out cards on hand
var showCards = function (party, numOfCards) {
  var listOfCards = "";

  if (numOfCards == "all") {
    numOfCards = party.cards.length;
  }

  for (var counter = 0; counter < numOfCards; counter += 1) {
    listOfCards =
      listOfCards +
      "➻" +
      party.cards[counter].name +
      " of " +
      party.cards[counter].suit +
      "<br>";
  }

  return listOfCards;
};

// Function to check for blackjack at the start of the game
var haveBlackjack = function (cardArray) {
  var totalCardRank = calCardRank(cardArray);
  if (totalCardRank == bestScore) {
    return true;
  }
  return false;
};

// Function to check if card on hand is a bust
var cardBusted = function (object) {
  var totalCardRank = calCardRank(object);

  if (totalCardRank > bestScore) {
    return true;
  }

  return false;
};

// Function to calculate if player win or lose
var calWinOrLose = function (playerCards, computerCards) {
  var playerTotalCardRank = calCardRank(playerCards);
  var computerTotalCardRank = calCardRank(computerCards);

  var winImg = `<img src="https://c.tenor.com/MMwDCNWyptsAAAAd/mr-bean-mr-beans-holiday.gif" width="30%";>`;
  var loseImg = `<img src="https://c.tenor.com/UWKxURNg6TMAAAAC/mr-bean-what.gif" width="30%";>`;
  var drawImg = `<img src="https://c.tenor.com/lowhvrplIS8AAAAC/mr-bean.gif" width="30%";>`;

  var resultsStatement = "<b>Dealer won!</b><br>" + loseImg + "<br>";

  if (playerTotalCardRank == computerTotalCardRank) {
    resultsStatement = "<b>It's a draw!</b><br>" + drawImg + "<br>";
    player.points = player.points + player.currentBet;
  }

  if (playerTotalCardRank > computerTotalCardRank) {
    resultsStatement = "<b>You won!</b><br>" + winImg + "<br>";
    player.points =
      player.points + player.currentBet + player.currentBet * winPayout;
  }

  var nextRoundInstruction = calNextRound();

  resultsStatement = resultsStatement + nextRoundInstruction;
  player.currentBet = 0;

  return resultsStatement;
};

// Function to calculate of player have sufficient points to play next round
var calNextRound = function () {
  var myOutputValue = "";

  if (player.points < 1) {
    myOutputValue = `You have 0 points left. Please refresh the page to start a new game.`;
    gameStatus = "GAME-OVER";
    return myOutputValue;
  }

  myOutputValue = `You now have ${player.points} points. Submit the number of points you would like to bet for next round.`;
  gameStatus = "AFTER-PLACING-BET";
  return myOutputValue;
};

// Find the sum of all cards that player have on hand
var calCardRank = function (partyObject) {
  var totalScore = 0;
  partyObject.roundScore = 0;
  var numOfAceCards = 0;

  // Check how many ace cards are there in the array and adds up all card rank
  for (var i = 0; i < partyObject.cards.length; i += 1) {
    if (partyObject.cards[i].name == "Ace") {
      numOfAceCards += 1;
    }
    totalScore = totalScore + partyObject.cards[i].rank;
  }

  // If there are ace cards on hand, change the rank of ace card from 11 to 1
  // Keep only 1 ace card with rank 11
  if (numOfAceCards >= 1 && totalScore > bestScore) {
    totalScore = totalScore - (numOfAceCards - 1) * 10;
    // If the total score still exceed best score,
    // change the rank of the last ace card from 11 to 1
    if (totalScore > bestScore) {
      totalScore = totalScore - 10;
    }
  }

  partyObject.roundScore = totalScore;

  return totalScore;
};

// Function to generate hint statement to hit or stand
var generateHint = function () {
  var playerCurrentScore = calCardRank(player);
  var genieImg =
    '<img src="https://c.tenor.com/szvEC0QjFzYAAAAi/gwiz-genie-and-the-power-belt.gif" width="20%";>';

  var outputStatement = genieImg + "If I were you, I would stand~~";

  if (playerCurrentScore <= 15) {
    outputStatement = genieImg + "If I were you, I would hit~~";
    if (player.cards.length >= 3) {
      outputStatement = genieImg + "I would hit again~~";
    }
  } else if (playerCurrentScore > 15 && playerCurrentScore <= 17) {
    outputStatement = genieImg + "Hit if you are feeling lucky today!!";
  }

  return outputStatement;
};

// Function to decide if computer wants to draw a card
var dealerHitOrStand = function () {
  var returnStatement = "";

  // Calculate total card rank on hand
  var computerCardRank = calCardRank(computer);

  // If dealer's hand is lesser than 17, dealer will draw a card and check his total card again
  if (computerCardRank < 17 && isDealerTurn) {
    // *********Code for Debugging - DO NOT DELETE **********
    // computer.cards.push(deck.pop());

    // *********Actual Code - DO NOT DELETE **********
    computer.cards.push(cardDeck.pop());

    computerCardRank = calCardRank(computer);
    if (computerCardRank < 17) {
      gameStatus = "DEALER-HIT-OR-STAND";
      returnStatement =
        displayHand(player) +
        "<br>Dealer will need to draw another card. Click submit to see dealer's next card";

      return returnStatement;
    }
  }

  // Set dealer turn to true to display all cards on player's hand
  isDealerTurn = true;
  returnStatement = displayHand(player);

  // Show dealer's card before hitting if dealer have not shown his face down card
  if (computerCardRank < 17) {
    gameStatus = "DEALER-HIT-OR-STAND";
    returnStatement =
      returnStatement +
      "<br>Dealer will need to draw another card. Click submit to see dealer's next card";
    return returnStatement;
  }

  // Set game status to card distribution so after showing the result, user can click submit to start a new round
  gameStatus = "AFTER-PLACING-BET";

  // If dealer's hand is more than 17, check if dealer bust
  if (cardBusted(computer)) {
    player.points =
      player.points + player.currentBet + player.currentBet * winPayout;
    player.currentBet = 0;
    var dealerBustImg =
      '<img src="https://c.tenor.com/udUeGlxama8AAAAC/mr-bean-bean.gif" width="30%";>';
    var nextRoundInstruction = calNextRound();
    returnStatement =
      returnStatement +
      "<br>" +
      "<b>The dealer bust!</b><br>" +
      dealerBustImg +
      "<br>" +
      nextRoundInstruction;
  } else {
    // Compare the cards to determine who wins
    var roundResults = calWinOrLose(player, computer);
    returnStatement = returnStatement + "<br>" + roundResults;
  }

  return returnStatement;
};

// Function to play game
var playBlackJack = function (input) {
  var inputValidationResults = inputValidity(input);

  if (inputValidationResults == true) {
    if (gameStatus == "CARD DISTRIBUTION") {
      gameStatus = "HIT-OR-STAND";
      return distributeCards();
    }

    if (gameStatus == "HIT-OR-STAND") {
      if (input.toUpperCase() == "H") {
        // If player chose to hit, run the player hit function
        return hitCard(player);
      }
      if (input.toUpperCase() == "S") {
        // If player chose to stand, it is dealer's turn
        gameStatus = "DEALER-HIT-OR-STAND";
        return dealerHitOrStand();
      }
    }

    // If dealer still needs to add a card, run the dealer hit function
    if (gameStatus == "DEALER-HIT-OR-STAND") {
      return dealerHitOrStand();
    }
  }

  return inputValidationResults;
};
