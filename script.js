//update1: tried attempting project on my own
//update2: attempt it with walkthrough first version
//update3: attempting to add hit or stand function for player and dealer
//update4: ace values, added hit/stand button
//update5: multiplayer in progress
//update5.1: fixing the hit input

//establishing player and dealer's card to clean slate
var gameStart = " Game Start";
var gameNumberOfPlayers = "Input Number of Players";
var gameDrawn = " Cards drawn";
var gameResults = " Show results ";
var gameHitStand = " Hit or Stand ";
var currentGameState = gameStart;

var numberOfPlayers = 1;

var playerCards = [];
var dealerCards = [];
var gameDeck = "Empty";

//generate deck function
var createDeck = function () {
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
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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
/*//to initialise cardDeck to be used
cardDeck = createDeck();*/

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
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

var checkPlayerForBlackJack = function () {
  var playerTotalValue = 0;
  for (var i = 0; i < playerCards.length; i++) {
    var cardValue = playerCards[i][0].rank;
    var cardValue2 = playerCards[i][1].rank;
    if (cardValue == 13 || cardValue == 12 || cardValue == 11) {
      cardValue = 10;
    } else if (cardValue === 1) {
      if (playerTotalValue + 11 <= 21) {
        cardValue = 11;
      } else {
        cardValue = 1;
      }
    }
    if (cardValue2 == 13 || cardValue2 == 12 || cardValue2 == 11) {
      cardValue2 = 10;
    } else if (cardValue2 === 1) {
      if (playerTotalValue + 11 <= 21) {
        cardValue2 = 11;
      } else {
        cardValue2 = 1;
      }
    }
    playerTotalValue += Number(cardValue);
    playerTotalValue += Number(cardValue2);
  }
  if (playerTotalValue == 21) {
    return true;
  } else {
    return false;
  }
};
var checkDealerForBlackJack = function () {
  var dealerTotalValue = 0;
  for (var i = 0; i < dealerCards.length; i++) {
    var cardValue = dealerCards[i].rank;
    if (cardValue == 13 || cardValue == 12 || cardValue == 11) {
      cardValue = 10;
    } else if (cardValue === 1) {
      if (dealerTotalValue + 11 <= 21) {
        cardValue = 11;
      } else {
        cardValue = 1;
      }
    }
    dealerTotalValue += Number(cardValue);
  }
  if (dealerTotalValue == 21) {
    return true;
  } else {
    return false;
  }
};
function calculatePlayerHandValue(playerCards) {
  var totalValue = 0;
  var aceCount = 0;
  for (var i = 0; i < playerCards.length; i++) {
    var cardValue = playerCards[i][0].rank;
    var cardValue2 = playerCards[i][1].rank;
    if (cardValue == 13 || cardValue == 12 || cardValue == 11) {
      cardValue = 10;
    } else if (cardValue2 == 13 || cardValue2 == 12 || cardValue2 == 11) {
      cardValue2 = 10;
    } else if (cardValue === 1) {
      cardValue = 11;

      aceCount++;
    } else if (cardValue2 === 1) {
      cardValue2 = 11;
      aceCount++;
    }
    totalValue += Number(cardValue);
    totalValue += Number(cardValue2);
  }
  while (totalValue > 21 && aceCount > 0) {
    totalValue -= 10;
    aceCount--;
  }
  return totalValue;
}

function calculateDealerHandValue(dealerCards) {
  var totalValue = 0;
  var aceCount = 0;
  for (var i = 0; i < dealerCards.length; i++) {
    var cardValue = dealerCards[i].rank;
    if (cardValue == 13 || cardValue == 12 || cardValue == 11) {
      cardValue = 10;
    } else if (cardValue === 1) {
      cardValue = 11;
      aceCount++;
    }
    totalValue += Number(cardValue);
  }
  while (totalValue > 21 && aceCount > 0) {
    totalValue -= 10;
    aceCount--;
  }
  return totalValue;
}

var displayHands = function (playerCards, dealerCards, i) {
  console.log("Player's hand:");
  var dealerMessage = "Dealer's hand: <br>";
  for (let i = 0; i < numberOfPlayers; i++) {
    var playerMessage = "Player " + (i + 1) + " hand: <br>";
  }
  for (let i = 0; i < numberOfPlayers; i++) {
    playerMessage =
      playerMessage +
      " - " +
      playerCards[i][0].name +
      " of " +
      playerCards[i][0].suit +
      "<br>" +
      " - " +
      playerCards[i][1].name +
      " of " +
      playerCards[i][1].suit +
      "<br>";
    console.log(`${playerCards[i][0].rank} of ${playerCards[i][0].suit}`);
    console.log(`${playerCards[i][1].rank} of ${playerCards[i][1].suit}`);
  }

  console.log("Dealers's hand:");
  for (let i = 0; i < dealerCards.length; i++) {
    dealerMessage =
      dealerMessage +
      " - " +
      dealerCards[i].name +
      " of " +
      dealerCards[i].suit +
      "<br>";
    console.log(`${dealerCards[i].rank} of ${dealerCards[i].suit}`);
  }

  //future use
  /*console.log("\nDealer's hand:");
  console.log(`${dealerCards[0].rank} of ${dealerCards[0].suit}`);
  console.log("Hidden card");*/
  return playerMessage + "<br>" + dealerMessage;
};
var displayHandsValue = function (playerHandTotalValue, dealerHandTotalValue) {
  var totalHandValueMessage =
    "<br> Player total hand value: " +
    playerHandTotalValue +
    "<br> Dealer total hand value: " +
    dealerHandTotalValue;
  return totalHandValueMessage;
};
//function to check input during gamestateNumberOfPlayers for numerals
var checkInput = function (x) {
  if (isNaN(x)) {
    alert("Please input number of players");
    return false;
  }
  return true;
};

var main = function (input, inputNumberOfPlayers) {
  var outputMessage = "";
  //gameStart
  if (currentGameState == gameStart && input == "submit") {
    currentGameState = gameNumberOfPlayers;
    outputMessage = "Please enter the number of players";
    return outputMessage;
  }
  //edit this
  //input validation before gameNumberOfPlayers
  if (!checkInput(inputNumberOfPlayers)) {
    return "Please input numerals only";
  }

  //gameNumberOfPlayers
  if (currentGameState == gameNumberOfPlayers && input == "submit") {
    numberOfPlayers = inputNumberOfPlayers;
    gameDeck = createNewDeck();
    console.log(
      "game deck after input number assigned to numberOfPlayers" + gameDeck
    );

    //run interations based on the number of players entered
    for (let i = 0; i < Number(numberOfPlayers); i++) {
      playerCards.push([]);
      playerCards[i].push(gameDeck.pop());
      playerCards[i].push(gameDeck.pop());
    }
    dealerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());

    //check for loop above runs correctly ^
    for (let i = 0; i < playerCards.length; i++) {
      console.log("Player card " + (i + 1) + " is:");
      console.log(playerCards[i][0]);
      console.log(playerCards[i][1]);
    }

    console.log("Dealer cards is:");
    console.log(dealerCards);

    currentGameState = gameDrawn;
    console.log("gamestate cards delt:" + currentGameState);
    outputMessage =
      "Cards has been dealt. Please click submit to evaluate cards. ";

    return outputMessage;
  }
  if (currentGameState === gameDrawn && input == "submit") {
    var playerhasBlackjack = checkPlayerForBlackJack(playerCards);
    var dealerhasBlackjack = checkDealerForBlackJack(dealerCards);
    var playerHandTotalValue = calculatePlayerHandValue(playerCards);
    var dealerHandTotalValue = calculateDealerHandValue(dealerCards);
    console.log("player hand value " + playerHandTotalValue);
    console.log("dealer hand value " + dealerHandTotalValue);
    if (playerhasBlackjack == true || dealerhasBlackjack == true) {
      if (playerhasBlackjack == true && dealerhasBlackjack == true) {
        outputMessage =
          displayHands(playerCards, dealerCards) +
          "It is a Blackjack tie." +
          displayHandsValue(playerHandTotalValue, dealerHandTotalValue);
      } else if (playerhasBlackjack == true || dealerhasBlackjack == false) {
        outputMessage =
          displayHands(playerCards, dealerCards) +
          "Player has Blackjack! Player Wins" +
          displayHandsValue(playerHandTotalValue, dealerHandTotalValue);
      } else {
        outputMessage =
          displayHands(playerCards, dealerCards) +
          "Dealer has Blackjack! Dealer Wins" +
          displayHandsValue(playerHandTotalValue, dealerHandTotalValue);
      }
      console.log(outputMessage);
      return outputMessage;
    } else {
      currentGameState = gameHitStand;
      outputMessage =
        displayHands(playerCards, dealerCards) +
        "There is no blackjack<br> Player, please enter 'hit' or 'stand' to draw a card";
      console.log(outputMessage);
      console.log("gamestate when no blackjack " + currentGameState);
      return outputMessage;
    }
  }

  if (currentGameState == gameHitStand) {
    if (input == "hit") {
      playerCards.push(gameDeck.pop());
      outputMessage =
        displayHands(playerCards, dealerCards) +
        "You drew another card.<br> Please input 'hit' or 'stand'<br>";
    } else if (input == "stand") {
      var playerHandTotalValue = calculatePlayerHandValue(playerCards);
      var dealerHandTotalValue = calculateDealerHandValue(dealerCards);
      console.log("player hand value " + playerHandTotalValue);
      console.log("dealer hand value " + dealerHandTotalValue);
      while (dealerHandTotalValue < 17) {
        dealerCards.push(gameDeck.pop());
        dealerHandTotalValue =
          calculateDealerHandValue(dealerCards) +
          "<br>Dealer drew another card.";
      }
      if (playerHandTotalValue == dealerHandTotalValue) {
        outputMessage =
          displayHands(playerCards, dealerCards) +
          "It is a tie." +
          displayHandsValue(playerHandTotalValue, dealerHandTotalValue);
      } else if (playerHandTotalValue > 21) {
        outputMessage =
          displayHands(playerCards, dealerCards) +
          "Player bust!" +
          displayHandsValue(playerHandTotalValue, dealerHandTotalValue);
      } else if (dealerHandTotalValue > 21) {
        outputMessage =
          displayHands(playerCards, dealerCards) +
          "Dealer bust!" +
          displayHandsValue(playerHandTotalValue, dealerHandTotalValue);
      } else if (playerHandTotalValue > dealerHandTotalValue) {
        outputMessage =
          displayHands(playerCards, dealerCards) +
          "Player wins!" +
          displayHandsValue(playerHandTotalValue, dealerHandTotalValue);
      } else {
        outputMessage =
          displayHands(playerCards, dealerCards) +
          "Dealer wins!" +
          displayHandsValue(playerHandTotalValue, dealerHandTotalValue);
      }
    } else {
      outputMessage =
        "Please enter only 'hit' or 'stand' only.<br>" +
        displayHands(playerCards, dealerCards);
    }
    return outputMessage;
  }
};
