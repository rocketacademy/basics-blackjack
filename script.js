//update1: tried attempting project on my own
//update2: attempt it with walkthrough first version
//update3: attempting to add hit or stand function for player and dealer
//update4: ace values, added hit/stand button
//update5: multiplayer in progress
//update5.1: fixing the hit input
//final ver: removed multiplayer attempt and fixed looks and audio

const hitSound = new Audio(
  "https://raw.githubusercontent.com/calvinttg/basics-blackjack/master/givecard.mp3"
);

//establishing player and dealer's card to clean slate
var gameStart = " Game Start";
var gameDrawn = " Cards drawn";
var gameResults = " Show results ";
var gameHitStand = " Hit or Stand ";
var currentGameState = gameStart;

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
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

var checkPlayerForBlackJack = function () {
  var playerTotalValue = 0;
  for (var i = 0; i < playerCards.length; i++) {
    var cardValue = playerCards[i].rank;
    if (cardValue == 13 || cardValue == 12 || cardValue == 11) {
      cardValue = 10;
    } else if (cardValue === 1) {
      if (playerTotalValue + 11 <= 21) {
        cardValue = 11;
      } else {
        cardValue = 1;
      }
    }
    playerTotalValue += Number(cardValue);
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
    var cardValue = playerCards[i].rank;
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

//edit this for display blackjack
var displayHands = function (playerCards, dealerCards) {
  console.log("Player's hand:");
  var playerMessage = "Player's hand: <br>";
  var dealerMessage = "Dealer's hand: <br>";
  for (let i = 0; i < playerCards.length; i++) {
    playerMessage =
      playerMessage +
      " - " +
      playerCards[i].name +
      " of " +
      playerCards[i].suit +
      "<br>";
    console.log(`${playerCards[i].rank} of ${playerCards[i].suit}`);
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
var main = function (input) {
  var outputMessage = "";
  if (currentGameState == gameStart) {
    gameDeck = createNewDeck();
    console.log(gameDeck);
    playerCards.push(gameDeck.pop());
    playerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());
    dealerCards.push(gameDeck.pop());

    console.log("Player cards is:");
    console.log(playerCards);
    console.log("Dealer cards is:");
    console.log(dealerCards);

    currentGameState = gameDrawn;

    outputMessage =
      "Cards has been dealt. Please click submit to evaluate cards. ";

    return outputMessage;
  }
  if (currentGameState === gameDrawn) {
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
      const hitButton = document.querySelector("#hit-button");
      hitButton.addEventListener("click", () => {
        hitSound.play();
      });
      playerCards.push(gameDeck.pop());
      outputMessage =
        displayHands(playerCards, dealerCards) +
        "You drew another card.<br> Please input 'hit' or 'stand'<br>";
    } else if (input == "stand" || calculatePlayerHandValue(playerCards) < 21) {
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
