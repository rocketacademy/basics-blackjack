var shuffledDeck = [];
var gameMode = "inital draw";
var myOutputValue = "";

var playerCardDrawn = [];
var playerCardDrawnDisplay = [];
var playerPoints = 0;

var computerCardDrawn = [];
var computerCardDrawnDisplay = [];
var computerPoints = 0;

var clearInput = function () {
  myOutputValue = "";

  playerCardDrawn = [];
  playerCardDrawnRank = [];
  playerCardDrawnDisplay = [];
  playerPoints = 0;

  computerCardDrawn = [];
  computerCardDrawnRank = [];
  computerCardDrawnDisplay = [];
  computerPoints = 0;
};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
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

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
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
// to communicate that we have shuffled the deck.
shuffledDeck = shuffleCards(makeDeck());

var draw2Cards = function () {
  //Draw 2 cards from the top of deck
  for (i = 0; i < 2; i++) {
    var drawnCard = shuffledDeck.pop();
    playerCardDrawn.push(drawnCard);
    playerCardDrawnDisplay.push(drawnCard.name + " of " + drawnCard.suit);
    drawnCard = shuffledDeck.pop();
    computerCardDrawn.push(drawnCard);
    computerCardDrawnDisplay.push(drawnCard.name + " of " + drawnCard.suit);
  }
};

var draw1Card = function (cardArray) {
  // draw 1 card from top of deck
  var drawnCard = shuffledDeck.pop();
  cardArray.push(drawnCard);

  return drawnCard;
};

var displayCardsDrawn = function () {
  myOutputValue = "";
  myOutputValue += "Player draw: " + playerCardDrawnDisplay + "<br><br>";
  myOutputValue += "Computer draw: " + computerCardDrawnDisplay + "<br><br>";

  return myOutputValue;
};

// change J, Q, k to 10 for points calculation
var changeJQKto10 = function (cardsOnHand) {
  for (i = 0; i < cardsOnHand.length; i++) {
    if (
      cardsOnHand[i].name == "jack" ||
      cardsOnHand[i].name == "queen" ||
      cardsOnHand[i].name == "king"
    ) {
      cardsOnHand[i].rank = 10;
    }
  }
};

var checkCurrentPoints = function (cardArray) {
  // change rank of J,Q,K to 10
  changeJQKto10(cardArray);

  var currentPoints = 0;
  // add up points
  // add in all the rank into an array to check for bj
  for (i = 0; i < cardArray.length; i++) {
    currentPoints += cardArray[i].rank;
  }
  return currentPoints;
};

var checkAce = function (cardArray) {
  var points = 0;
  if (cardArray.length == 2) {
    for (j = 0; j < cardArray.length; j++) {
      if (cardArray[j].name == "ace") {
        cardArray[j].rank = 11;
        points = checkCurrentPoints(cardArray);
      }
      if (points > 21) {
        cardArray[j].rank = 1;
      }
    }
  } else if (cardArray.length == 3) {
    for (j = 0; j < cardArray.length; j++) {
      if (cardArray[j].name == "ace") {
        // default 10
        cardArray[j].rank = 10;
      }
      points = checkCurrentPoints(cardArray);
      console.log("j:" + j);
      console.log("points with 10:" + points);
      if (points > 21) {
        cardArray[j].rank = 1;
      }
    }
  } else if (cardArray.length == 4) {
    for (j = 0; j < cardArray.length; j++) {
      if (cardArray[j].name == "ace") {
        cardArray[j].rank = 1;
      }
    }
  }
  points = checkCurrentPoints(cardArray);
  return points;
};

var runComputerLogic = function () {
  computerPoints = checkAce(computerCardDrawn);
  while (computerPoints < 17) {
    card = draw1Card(computerCardDrawn);
    computerCardDrawnDisplay.push(card.name + " of " + card.suit);
    changeJQKto10(computerCardDrawn);
    computerPoints = checkCurrentPoints(computerCardDrawn);
  }
};

// check if hand is BJ
var checkBJ = function (cardDrawnArray) {
  var rankArray = [];

  for (k = 0; k < cardDrawnArray.length; k++) {
    rankArray.push(cardDrawnArray[k].rank);
  }
  console.log("rankArray" + rankArray);
  if (rankArray.includes(11) && rankArray.includes(10)) {
    return true;
  } else {
    return false;
  }
};

var checkBurst = function (points) {
  if (points > 21) {
    return true;
  } else {
    return false;
  }
};

var checkWinner = function () {
  var isPlayerBJ = checkBJ(playerCardDrawn);
  var isComputerBJ = checkBJ(computerCardDrawn);
  var isPlayerBurst = checkBurst(playerPoints);
  var isComputerBurst = checkBurst(computerPoints);

  if (isPlayerBJ && isComputerBJ) {
    myOutputValue += `Both have blackjack! it's a tie!`;
  } else if (isPlayerBJ) {
    myOutputValue += `Player has blackjack. Player Wins`;
  } else if (isComputerBJ) {
    myOutputValue += `Computer has blackjack. Computer Wins`;
  } else if (isPlayerBurst && isComputerBurst) {
    myOutputValue += `it's a tie!`;
  } else if (isPlayerBurst) {
    myOutputValue += "Computer Wins!";
  } else if (isComputerBurst) {
    myOutputValue += `Player Win!`;
  } else {
    if (playerPoints == computerPoints) {
      myOutputValue += `it's a tie`;
    } else if (playerPoints > computerPoints) {
      myOutputValue += `Player Win!`;
    } else {
      myOutputValue += "Computer Wins!";
    }
  }

  return myOutputValue;
};

var main = function (input) {
  if (input == "hit") {
    gameMode = "player draw card";
  } else if (input == "stand") {
    gameMode = "computer turn";
  }

  if (gameMode == "inital draw") {
    clearInput();
    draw2Cards();
    displayCardsDrawn();
    playerPoints = checkAce(playerCardDrawn);
    myOutputValue += `Player, your current points is ${playerPoints} <br> 
    Would you like to "hit" or "stand" ?`;
  } else if (gameMode == "player draw card") {
    drawnCard = draw1Card(playerCardDrawn);
    playerCardDrawnDisplay.push(drawnCard.name + " of " + drawnCard.suit);
    displayCardsDrawn();
    playerPoints = checkAce(playerCardDrawn);
    myOutputValue += `Player, your current points is ${playerPoints} <br> 
    Would you like to "hit" or "stand" ?`;
  } else if (gameMode == "computer turn") {
    runComputerLogic();
    currentCardsDrawn = displayCardsDrawn();
    gameMode = "check winner";
    myOutputValue += `Computer has finished its turn. Please press submit to generate the results.`;
  } else if (gameMode == "check winner") {
    displayCardsDrawn();
    myOutputValue += `Player points is ${playerPoints}. <br>
    Computer points is ${computerPoints} <br>`;
    checkWinner();
    gameMode = "inital draw";
  }
  return myOutputValue;
};
