var playerHand = [];
var dealerHand = [];

// turntracker
// = 0 game start
// = 1 player turn
// = 2 dealer turn
// = 3 compare results
var turnTracker = 0;
var myOutputValue = "";

if (user == null) {
  var user = prompt("HELLO. Please enter your name");
}

if (user != null) {
  alert("Hi " + user + "!" + " Please click on Submit to start playing!");
}

// page loads
// deck is created
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
      var cardValue = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
        cardValue = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardValue = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardValue = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardValue = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

var newDeck = makeDeck();
console.log(newDeck);

// deck is shuffled
// Shuffle the elements in the cardDeck array/////////////////////////////////////////
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
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

var shuffledDeck = shuffleCards(newDeck);
console.log(shuffledDeck);

// function to deal each player with 2 cards + sum up initial value of hands
var dealCards = function () {
  playerdrawCount = 0;
  dealerdrawCount = 0;

  while (playerdrawCount < 2) {
    playerCard = shuffledDeck.pop();
    playerHand.push(playerCard);
    playerdrawCount += 1;
  }

  while (dealerdrawCount < 2) {
    dealerCard = shuffledDeck.pop();
    dealerHand.push(dealerCard);
    dealerdrawCount += 1;
  }

  console.log("playerHand");
  console.log(playerHand);
  console.log("dealerHand");
  console.log(dealerHand);

  sumHandFunction();
  console.log("playerHandValue");
  console.log(playerHandValue);
  console.log("dealerHandValue");
  console.log(dealerHandValue);
};
var checkInstantWin = function () {
  //PLAYER WINS. player opens with A-Face, dealer opens smaller
  if (turnTracker == 0 && playerHandValue == 21 && dealerHandValue < 21) {
    myOutputValue =
      "Player hits Blackjack!<br> Player drew a " +
      playerHand[0].name +
      " of " +
      playerHand[0].suit +
      " and a " +
      playerHand[1].name +
      " of " +
      playerHand[1].suit +
      "<br> Click Submit to play a new hand";
    resetGame();
  }
  //PLAYER WINS. player opens with A-A, dealer opens smaller
  else if (turnTracker == 0 && playerHandValue == 22 && dealerHandValue < 21) {
    myOutputValue =
      "Player hits Double Aces!<br> Player drew a " +
      playerHand[0].name +
      " of " +
      playerHand[0].suit +
      " and a " +
      playerHand[1].name +
      " of " +
      playerHand[1].suit +
      "<br> Click Submit to play a new hand";
    resetGame();
  }
  //DEALER WINS. dealer opens with A-Face, player opens smaller
  else if (turnTracker == 0 && dealerHandValue == 21 && playerHandValue < 21) {
    myOutputValue =
      "Dealer hits Blackjack!<br> Dealer drew a " +
      dealerHand[0].name +
      " of " +
      dealerHand[0].suit +
      " and a " +
      dealerHand[1].name +
      " of " +
      dealerHand[1].suit +
      "<br> Click Submit to play a new hand";
    resetGame();
  }
  //DEALER WINS. dealer opens with A-Face, player opens smaller
  else if (turnTracker == 0 && dealerHandValue == 22 && playerHandValue < 21) {
    myOutputValue =
      "Dealer hits Double Aces!<br> Dealer drew a " +
      dealerHand[0].name +
      " of " +
      dealerHand[0].suit +
      " and a " +
      dealerHand[1].name +
      " of " +
      dealerHand[1].suit +
      "<br> Click Submit to play a new hand";
    resetGame();
  }
  // Draw at the open, player and dealer opens A-Face or A-A together
  else if (
    (turnTracker == 0 && dealerHandValue == 21) ||
    (dealerHandValue == 22 && dealerHandValue == playerHandValue)
  ) {
    myOutputValue =
      "Its a draw! Dealer wins!<br> Dealer drew a " +
      dealerHand[0].name +
      " of " +
      dealerHand[0].suit +
      " and a " +
      dealerHand[1].name +
      " of " +
      dealerHand[1].suit +
      "<br> Player drew a " +
      playerHand[0].name +
      " of " +
      playerHand[0].suit +
      " and a " +
      playerHand[1].name +
      " of " +
      playerHand[1].suit +
      "<br> Click Submit to play a new hand";
    resetGame();
  }
};
//sum up both player and dealer hand from scratch
var sumHandFunction = function () {
  playerSumCounter = 0;
  playerHandValue = 0;
  while (playerSumCounter < playerHand.length) {
    playerHandValue = playerHandValue + playerHand[playerSumCounter].value;
    playerSumCounter += 1;
  }
  dealerSumCounter = 0;
  dealerHandValue = 0;
  while (dealerSumCounter < dealerHand.length) {
    dealerHandValue = dealerHandValue + dealerHand[dealerSumCounter].value;
    dealerSumCounter += 1;
  }
};

// FUNCTION - RESET GAME
var resetGame = function () {
  turnTracker = 0;
  playerHand = [];
  dealerHand = [];
  newDeck = makeDeck();
  shuffledDeck = shuffleCards(newDeck);
};

// FUNCTION - player draws 1 card
var playerDraw = function () {
  playerCard = shuffledDeck.pop();
  console.log("Player drew a " + playerCard.name);

  playerHand.push(playerCard);
  //when person has 3 cards or above = ace is value 1
  if (playerCard.name == "ace") {
    playerCard.value = 1;
  }

  playerSumCounter = 0;
  playerHandValue = 0;
  while (playerSumCounter < playerHand.length) {
    playerHandValue = playerHandValue + playerHand[playerSumCounter].value;
    playerSumCounter += 1;
  }
  myOutputValue =
    "Player drew a " +
    playerCard.name +
    " . Players hand value is now " +
    playerHandValue;
  console.log("Player Draws. Hand value is now:");
  console.log(playerHandValue);
};

// FUNCTION - dealer draws 1 card
var dealerDraw = function () {
  dealerCard = shuffledDeck.pop();
  console.log("Dealer drew a " + dealerCard.name);
  dealerHand.push(dealerCard);
  //when person has 3 cards or above = ace is value 1
  if (dealerCard.name == "ace") {
    dealerCard.value = 1;
  }

  dealerSumCounter = 0;
  dealerHandValue = 0;
  while (dealerSumCounter < dealerHand.length) {
    dealerHandValue = dealerHandValue + dealerHand[dealerSumCounter].value;
    dealerSumCounter += 1;
  }
  myOutputValue =
    "Dealer drew a " +
    dealerCard.name +
    " . Dealers hand value is now " +
    dealerHandValue;
  console.log("Dealer Draws. Hand value is now:");
  console.log(dealerHandValue);
};

var main = function (input) {
  //declare output value

  //if no cards are in player or dealer Hands
  if (playerHand == "" || dealerHand == "") {
    dealCards();
    if (playerHand[0].value + playerHand[1].value < 16) {
      myOutputValue =
        "Your hand value is " +
        playerHandValue +
        ".<br>You have to Hit. <br>Please input Hit and click on Submit to draw another card";
    } else if (playerHand[0].value + playerHand[1].value >= 16) {
      myOutputValue =
        "Your hand value is " +
        playerHandValue +
        ".<br>You can choose to Hit or Stay.<br>Please input Hit to draw another card or Stay to go to the Dealer turn ";
    } else myOutputValue = "Invalid";
    checkInstantWin();
    turnTracker = 1;
  }

  //if player has above 16 they can choose to stay or hit (by inputting Hit or Stay)
  //if player can choose to hit as many times as they want (by Inputting Hit)
  if (input == "hit" && turnTracker == 1) {
    playerDraw();
    myOutputValue =
      myOutputValue +
      "<br>Please input Hit to draw another card or Stay to go to the Dealer turn.";
    console.log("output after drawing");
    console.log(myOutputValue);
    //if player hand value is 21 or above = they have to stay
    if (playerHandValue >= 21) {
      turnTracker = 2;
      myOutputValue =
        myOutputValue +
        "<br>Your hand value is now >= 21. <br>You will have to stay. <br><br>It is dealers turn now. Please click on Submit for dealer to act";
    }
    // when player inputs stay, it will change to dealer's turn
  } else if (input == "stay" && turnTracker == 1) {
    turnTracker = 2;
  }
  //dealer turn
  //dealer will hit once if their hand is below 17
  if (turnTracker == 2 && dealerHand[0].value + dealerHand[1].value < 17) {
    dealerDraw();
    turnTracker = 3;
    //dealer will stay if their hand is 17 and above
  } else if (
    turnTracker == 2 &&
    dealerHand[0].value + dealerHand[1].value >= 17
  ) {
    turnTracker = 3;
    myOutputValue =
      "Dealers hand value is " +
      dealerHandValue +
      "<br> Dealer stays. Click on Submit to compare Hands.";
  }
  // mode to compare hands
  // PLAYER LOSES. player goes bust, dealer does not go bust
  if (turnTracker == 3 && playerHandValue > 21 && dealerHandValue <= 21) {
    myOutputValue =
      "Player loses for exceeding 21 with a hand value of " +
      playerHandValue +
      "<br>Dealer has a hand value of " +
      dealerHandValue +
      ". <br> Click Submit to play a new hand";
    resetGame();
  } // PLAYER LOSES. no one goes bust. Player hand is smaller than dealer hand
  else if (
    turnTracker == 3 &&
    playerHandValue <= 21 &&
    dealerHandValue <= 21 &&
    playerHandValue < dealerHandValue
  ) {
    myOutputValue =
      "Player loses for having a smaller hand value with a hand value of " +
      playerHandValue +
      "<br>Dealer has a hand value of " +
      dealerHandValue +
      ". <br> Click Submit to play a new hand";
    resetGame();
    // PLAYER WINS. no one goes bust. Player hand is larger than dealer hand
  } else if (
    turnTracker == 3 &&
    playerHandValue <= 21 &&
    dealerHandValue <= 21 &&
    playerHandValue > dealerHandValue
  ) {
    myOutputValue =
      "Player wins for having a larger hand value with a hand value of " +
      playerHandValue +
      "<br>Dealer has a hand value of " +
      dealerHandValue +
      ". <br> Click Submit to play a new hand";
    resetGame();
    // PLAYER WINS. player does not go bust, dealer goes bust
  } else if (
    turnTracker == 3 &&
    playerHandValue <= 21 &&
    dealerHandValue > 21
  ) {
    myOutputValue =
      "Dealer busts! Dealer has a hand value of " +
      dealerHandValue +
      "<br>Player does no exceed 21 with a hand value of " +
      playerHandValue +
      ". <br> Click Submit to play a new hand";
    resetGame();
  }
  // player and dealer draw
  else if (
    turnTracker == 3 &&
    playerHandValue <= 21 &&
    dealerHandValue <= 21 &&
    playerHandValue == dealerHandValue
  ) {
    myOutputValue =
      "Its a Draw! Player has a hand value of " +
      playerHandValue +
      "<br>Dealer has a hand value of " +
      dealerHandValue +
      ". <br> Click Submit to play a new hand";
    resetGame();
  }

  checkInstantWin();
  return myOutputValue;
};
