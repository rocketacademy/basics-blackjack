/*===========================================================================*/
/*============================ GLOBAL VARIABLES =============================*/
/*===========================================================================*/
var PLAYER_TURN = "PLAYER_TURN";
var DEALER_TURN = "DEALER_TURN";

var turns = PLAYER_TURN;
var shuffledDeck = [];
var dealerObject = {
  name: "Dealer",
  hands: [],
  value: 0,
};
var playerObject = {
  name: "Player",
  hands: [],
  value: 0,
};
var gotBusted = false;
var gameStatus = true;

/*===========================================================================*/
/*========================== ADDITIONAL FUNCTIONS ===========================*/
/*===========================================================================*/

/*===== DECK CREATION =====*/
var makeDeck = function () {
  // Initialise empty deck array
  var cardDeck = [];

  // Initialise suits
  var suits = ["♣", "♦", "♥", "♠"];

  // Loop over the suits array
  for (var suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store current suits in variable
    var currentSuit = suits[suitIndex];

    // Loop from 1-13 to create all cards for a given suit
    for (var rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      var cardName = rankCounter;
      var cardValue = rankCounter;

      // If rank is 1, 11, 12 or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
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

      // Create a new card with the current name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardValue,
      };

      // Add the new card to deck
      cardDeck.push(card);
    }
  }
  return cardDeck;
};

/*===== SHUFFLE CARDS =====*/
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

/*===== GET TOTAL VALUE ON HAND =====*/
var getValue = function (cardOnHand) {
  var handValue = 0;
  var aceCounter = 0;
  for (var cardCounter = 0; cardCounter < cardOnHand.length; cardCounter += 1) {
    if (cardOnHand[cardCounter].name === "Ace") {
      handValue = handValue + 11;
      aceCounter += 1;
    } else {
      handValue += cardOnHand[cardCounter].rank;
    }
  }
  for (var counter = 0; counter < aceCounter; counter += 1) {
    if (handValue > 21) {
      handValue -= 10;
    }
  }
  return handValue;
};

/*===== GET WINNER BETWEEN PLAYERS AND DEALER =====*/
var getWinner = function (dealerValue, playerValue) {
  if (playerValue > dealerValue) {
    return `Player Win, Dealer Lose  <br>
            Press 'Start Game' to play again!`;
  } else if (playerValue < dealerValue) {
    return `Player Lose, Dealer Win <br>
            Press 'Start Game' to play again!`;
  } else {
    return `Draw! <br>
            Press 'Start Game' to play again!`;
  }
};

/*===== RESET VALUES =====*/
var reset = function () {
  var deck = makeDeck();
  shuffledDeck = [];
  turns = PLAYER_TURN;
  gotBusted = false;
  gameStatus = true;
  shuffledDeck = [];
  dealerObject = {
    name: "Dealer",
    hands: [],
    value: 0,
  };
  playerObject = {
    name: "Player",
    hands: [],
    value: 0,
  };
  shuffledDeck = shuffleCards(deck);
};

/*===== CHECK IF PLAYER BUST =====*/
var checkIfBusted = function (playerValue) {
  if (playerValue <= 21) {
    return `Player Value: ${playerValue}`;
  } else {
    gotBusted = true;
    return `Player Value: ${playerValue} <br> 
            Player Busted! <br> 
            Press 'Start Game' to play again!`;
  }
};

/*===== PRINT HAND =====*/
var getCardsOnHand = function (currentHand) {
  var myOutputValue = "";
  for (
    var cardCounter = 0;
    cardCounter < currentHand.length;
    cardCounter += 1
  ) {
    myOutputValue += `${currentHand[cardCounter].name} ${currentHand[cardCounter].suit} <br>`;
  }
  return myOutputValue;
};

/*===== CHECK FOR BLACKJACK AT START GAME =====*/
var checkBlackjack = function (currentValue) {
  if (currentValue == 21) {
    gameStatus = false;
    return `Dealer Hand: <br> 
            ▮ <br>
            ${dealerObject.hands[1].name} ${dealerObject.hands[1].suit} <br><br>
            Player Hand: <br>
            ${playerObject.hands[0].name} ${playerObject.hands[0].suit} <br>
            ${playerObject.hands[1].name} ${playerObject.hands[1].suit} <br><br>
            Player got Blackjack! <br>
            Player Win!! <br>
            Press 'Start Game' to play again!`;
  } else {
    return `Dealer Hand: <br> 
            ▮ <br>
            ${dealerObject.hands[1].name} ${dealerObject.hands[1].suit} <br><br>
            Player Hand: <br>
            ${playerObject.hands[0].name} ${playerObject.hands[0].suit} <br>
            ${playerObject.hands[1].name} ${playerObject.hands[1].suit} <br>
            Player Value: ${playerObject.value} <br><br>
            Players Turn, click Hit or Stand!`;
  }
};

/*===========================================================================*/
/*============================= MAIN FUNCTIONS ==============================*/
/*===========================================================================*/

var startGame = function () {
  // Reset all variables for a new game
  reset();

  // Dealer and Player draw 2 cards each
  for (var counter = 0; counter < 2; counter += 1) {
    var playerDrawnCard = shuffledDeck.pop();
    playerObject.hands.push(playerDrawnCard);
    var dealerDrawnCard = shuffledDeck.pop();
    dealerObject.hands.push(dealerDrawnCard);
  }

  dealerObject.value = getValue(dealerObject.hands);
  console.log(dealerObject);
  playerObject.value = getValue(playerObject.hands);
  console.log(playerObject);

  var blackjackOutput = checkBlackjack(playerObject.value);

  return blackjackOutput;
};

var hitHand = function () {
  if (gameStatus == true) {
    var bustOutput = "";
    var cardsOnHand = "";
    if (gotBusted == false) {
      // Draw card
      var playerDrawnCard = shuffledDeck.pop();
      playerObject.hands.push(playerDrawnCard);
      // Print hand
      cardsOnHand = getCardsOnHand(playerObject.hands);
      playerObject.value = getValue(playerObject.hands);
      bustOutput = checkIfBusted(playerObject.value);
      return `Dealer Hand: <br> 
              ▮ <br>
              ${dealerObject.hands[1].name} ${dealerObject.hands[1].suit} <br><br>
              Player Hand: <br>
              ${cardsOnHand} <br>
              ${bustOutput} <br><br>
              Players Turn, click Hit or Stand!`;
    } else {
      // Print hand
      cardsOnHand = getCardsOnHand(playerObject.hands);
      return `Dealer Hand: <br> 
              ▮ <br>
              ${dealerObject.hands[1].name} ${dealerObject.hands[1].suit} <br><br>
              Player Hand: <br>
              ${cardsOnHand} <br> 
              Player Value: ${playerObject.value} <br>
              Player Busted! <br>
              Press 'Start Game' to play again!`;
    }
  } else {
    return `Game ended. Click 'Start Game' to play again! `;
  }
};

var standHand = function () {
  var playerCardsOnHand = "";
  var dealerCardsOnHand = "";
  var outcome = "";

  while (dealerObject.value < 17) {
    var dealerDrawnCard = shuffledDeck.pop();
    dealerObject.hands.push(dealerDrawnCard);
    dealerObject.value = getValue(dealerObject.hands);
  }

  // Print Dealer Hands
  dealerCardsOnHand = getCardsOnHand(dealerObject.hands);
  // Print Player Hands
  playerCardsOnHand = getCardsOnHand(playerObject.hands);

  if (dealerObject.value > 21) {
    outcome = `Dealer busted! Player Wins <br>
              Press 'Start Game' to play again!`;
  } else {
    outcome = getWinner(dealerObject.value, playerObject.value);
  }
  gameStatus = false;

  return `Dealer Hand: <br>
          ${dealerCardsOnHand} Dealer value: ${dealerObject.value} <br><br>
          Player Hand: <br>
          ${playerCardsOnHand} Player value: ${playerObject.value} <br><br>
          ${outcome}`;
};
