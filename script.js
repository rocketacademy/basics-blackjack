var playerHand = [];
var dealerHand = [];
var turnTracker = 1;
var myOutputValue = "";

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

// FUNCTION - player draws 1 card
var playerDraw = function () {
  playerCard = shuffledDeck.pop();
  console.log("Player drew a " + playerCard.name);

  playerHand.push(playerCard);

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

//when player has 3 cards or above = ace is value 1

//if player has 21 in the opening hand, they win 2x
//if player has 22 in the opening hand, they win 3x

//if dealer hand value is above 21 = dealer loses
//if player hand value is above dealer hand value = player wins

// show hand
//if player hand value is below dealer hand value = dealer wins
//(jack/queen/ king is 10) (ace is 1 or 11)

var main = function (input) {
  //declare output value

  //if no cards are in player of dealer Hands
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
      ".";
    // PLAYER LOSES. no one goes bust. Player hand is smaller than dealer hand
  } else if (
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
      ".";
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
      ".";
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
      ".";
  }

  return myOutputValue;
};
