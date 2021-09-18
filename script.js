var gameStatus = "CARD DISTRIBUTION";
var bestScore = 21;
var gameResult = "";
var cardDeck = [];
var dealerMustHit = false;
var isDealerTurn = false;
var dealerShown2ndCard = false;

var player = {
  cards: [],
  roundScore: 0,
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
    name: "4",
    suit: "hearts",
    rank: 4,
  },
  {
    name: "5",
    suit: "hearts",
    rank: 1,
  },
  {
    name: "6",
    suit: "hearts",
    rank: 1,
  },
  {
    // Computer
    name: "7",
    suit: "hearts",
    rank: 10,
  },
  {
    // Player
    name: "8",
    suit: "hearts",
    rank: 10,
  },
  {
    // Computer
    name: "9",
    suit: "hearts",
    rank: 6,
  },
  {
    //player
    name: "10",
    suit: "hearts",
    rank: 2,
  },
];

// Function to generate card deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

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
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Update rank of card if the card is a face card

      if (cardName == "jack" || cardName == "queen" || cardName == "king") {
        card.rank = 10;
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

// var cardDeck = updateFaceCardRank(makeDeck());

var main = function (input) {
  var myOutputValue = "";

  return playBlackJack(input);
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
  return true;
};

var distributeCards = function () {
  // Generate and shuffle the card deck before each distribution
  cardDeck = shuffleCards(makeDeck());

  console.log(`Numbers of cards in CardDeck is ` + cardDeck.length);

  var output = "";

  // Reset game result to neutral and attributes in player and computer's object
  gameResult = "";
  dealerMustHit = false;
  player.cards = [];
  player.roundScore = 0;
  computer.cards = [];
  computer.roundScore = 0;
  isDealerTurn = false;
  dealerShown2ndCard = false;

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

  // Check if dealer needs to hit after player stand
  if (calCardRank(computer) < 17) {
    dealerMustHit = true;
  }

  // Display cards to player but only show 1 card from dealer
  var cardsDrawnStatement = displayHand(player);

  // If player or dealer has blackjack, the game ends
  if (haveBlackjack(computer) && haveBlackjack(player)) {
    isDealerTurn = true;
    cardsDrawnStatement = displayHand(player);
    output =
      cardsDrawnStatement +
      "<br>Both you and dealer drew a blackjack! It's a draw.<br><br>Click Submit to start a new round.";
    gameStatus = "CARD DISTRIBUTION";
    return output;
  }

  if (haveBlackjack(computer)) {
    isDealerTurn = true;
    cardsDrawnStatement = displayHand(player);
    output =
      cardsDrawnStatement +
      "<br>Dealer drew a blackjack! Dealer Wins!<br><br>Click Submit to start a new round.";
    gameStatus = "CARD DISTRIBUTION";
    return output;
  }

  if (haveBlackjack(player)) {
    output =
      cardsDrawnStatement +
      "<br>You drew a blackjack and dealer does not have a blackjack! You Won! <br><br>Click Submit to start a new round.";
    gameStatus = "CARD DISTRIBUTION";
    return output;
  }

  // If there is no blackjack, player will decide to hit or stand
  output =
    cardsDrawnStatement +
    `<br>Do you want to hit or stand? Submit "h" to hit, "s" to stand.`;

  console.log(player);
  console.log(computer);

  console.log(
    `Numbers of cards in CardDeck after card distribution is ` + cardDeck.length
  );

  return output;
};

// Function to add a card to player's hand
var hitCard = function (playerObject) {
  playerObject.cards.push(cardDeck.pop());

  var playerCardsDrawn =
    "You have requested for a card. " + displayHand(playerObject);

  if (cardBusted(playerObject)) {
    gameStatus = "CARD DISTRIBUTION";
    playerCardsDrawn =
      playerCardsDrawn +
      "<br>You bust!<br><br>Click Submit to start a new round.";
    return playerCardsDrawn;
  }

  playerCardsDrawn =
    playerCardsDrawn +
    `<br>Do you want to hit or stand? Submit "h" to hit, "s" to stand.`;

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
    "One face down card<br>";

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

  gameResult = "PLAYER-WON";

  if (playerTotalCardRank == computerTotalCardRank) {
    gameResult = "DRAW";
    return gameResult;
  }

  if (playerTotalCardRank < computerTotalCardRank) {
    gameResult = "COMPUTER-WON";
    return gameResult;
  }

  console.log(`Game result is ${gameResult}`);

  console.log(`Player's score is ${playerTotalCardRank}`);
  console.log(`Computer's score is ${computerTotalCardRank}`);

  return gameResult;
};

// Function to generate win or lose statement based on game results
var winLoseStatement = function (result) {
  var resultsStatement = "";

  var nextRoundInstruction = "Click Submit to start a new round.";

  if (result == "COMPUTER-WON") {
    resultsStatement = "<b>Dealer won!</b><br><br>" + nextRoundInstruction;
  } else if (result == "DRAW") {
    resultsStatement = "<b>It's a draw!</b><br><br>" + nextRoundInstruction;
  } else if (result == "PLAYER-WON") {
    resultsStatement = "<b>You won!</b><br><br>" + nextRoundInstruction;
  }

  return resultsStatement;
};

// Find the sum of all cards that player have on hand
var calCardRank = function (partyObject) {
  partyObject.roundScore = 0;

  for (counter = 0; counter < partyObject.cards.length; counter += 1) {
    partyObject.roundScore =
      partyObject.roundScore + partyObject.cards[counter].rank;
  }

  return partyObject.roundScore;
};

// Function to decide if computer wants to draw a card
var dealerHitOrStand = function () {
  var returnStatement = "";

  // Calculate total card rank on hand
  var computerCardRank = calCardRank(computer);

  // If dealer's hand is lesser than 17, dealer will draw a card and check his total card again
  if (computerCardRank < 17 && dealerShown2ndCard) {
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
    dealerShown2ndCard = true;
    gameStatus = "DEALER-HIT-OR-STAND";
    returnStatement =
      returnStatement +
      "<br>Dealer will need to draw another card. Click submit to see dealer's next card";
    return returnStatement;
  }

  // Set game status to card distribution so after showing the result, user can click submit to start a new round
  gameStatus = "CARD DISTRIBUTION";

  // If dealer's hand is more than 17, check if dealer bust
  if (cardBusted(computer)) {
    console.log(`Dealer bust. ${computerCardRank}`);
    returnStatement =
      returnStatement +
      "<br>" +
      "The dealer bust! " +
      "Click Submit to start a new round.";
  } else {
    // Compare the cards to determine who wins
    var roundResults = winLoseStatement(calWinOrLose(player, computer));
    returnStatement = returnStatement + "<br>" + roundResults;
  }

  return returnStatement;
};

// Function to play game
var playBlackJack = function (input) {
  console.log(`Current game status is ${gameStatus}`);

  console.log(`Game Result is ${gameResult}`);

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

// Reduce repetitive in dealer hit or stand function
// Implement the option or logic to select 1 or 11 if an ace card is received
// Merge winLoseStatement into calWinOrLose
