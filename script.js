// Global Variables
var currentGameMode = "game start";
var playerHand = [];
var dealerHand = [];
var gameDeck = "";

// Function to create a deck of cards
function createDeck() {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
}

// Function to get a random index for shuffling
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Function to shuffle the cards in the deck
function shufflecards(cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];

    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
}

// Function to create a new shuffled deck
function createNewDeck() {
  var newDeck = createDeck();
  var shuffledDeck = shufflecards(newDeck);
  return shuffledDeck;
}

// Function to check for BlackJack
function checkForBlackJack(hand) {
  var playerCard1 = hand[0];
  var playerCard2 = hand[1];
  var isBlackJack = false;

  if (
    (playerCard1.name == "Ace" && playerCard2.rank >= 10) ||
    (playerCard1.rank >= 10 && playerCard2.name == "Ace")
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
}

// Function to calculate the total hand value, adjusted for Aces
function calculateTotalHandValue(hand) {
  var totalHandValue = 0;
  var AceCount = 0;
  for (var index = 0; index < hand.length; index++) {
    var currentCard = hand[index];
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      totalHandValue += 10;
    } else if (currentCard.name == "Ace") {
      totalHandValue += 11;
      AceCount += 1;
    } else {
      totalHandValue += currentCard.rank;
    }
  }

  // Adjust for Aces if total hand value exceeds 21
  while (totalHandValue > 21 && AceCount > 0) {
    totalHandValue -= 10; // Subtract 10 if an Ace is initially counted as 11
    AceCount -= 1; // Reduce the count of Aces considered as 11
  }

  return totalHandValue;
}

// Function to display player and dealer hands
function displayHands(playerHandArray, dealerHandArray) {
  var playerMessage = "Player's Hand: <br>";
  for (var index = 0; index < playerHandArray.length; index++) {
    playerMessage +=
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
  }

  var dealerMessage = "<br>Dealer's Hand: <br>";
  for (index = 0; index < dealerHandArray.length; index++) {
    dealerMessage +=
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
  }

  return playerMessage + dealerMessage;
}

// Main function to run the game logic
function main(input) {
  var outputMsg = "";
  if (currentGameMode == "game start") {
    gameDeck = createNewDeck();
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    currentGameMode = "game cards drawn";
    outputMsg = "Cards dealt. Press submit to continue!";
    return outputMsg;
  }
  if (currentGameMode == "game cards drawn") {
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    if (playerHasBlackJack && dealerHasBlackJack) {
      outputMsg = "It's a BlackJack Tie!";
    } else if (playerHasBlackJack) {
      outputMsg = "Player wins by BlackJack";
    } else if (dealerHasBlackJack) {
      outputMsg = "Dealer wins by BlackJack";
    } else {
      outputMsg = "No BlackJack!";
    }

    outputMsg = `${displayHands(
      playerHand,
      dealerHand
    )}${outputMsg}<br>Enter 'hit' or 'stand'.`;
    currentGameMode = "game hit or stand";
    return outputMsg;
  }
  if (currentGameMode == "game hit or stand") {
    if (input != "hit" && input != "stand") {
      outputMsg = `${displayHands(
        playerHand,
        dealerHand
      )}<br><br>Invalid input. Enter 'hit' or 'stand'.`;
    } else if (input == "hit") {
      playerHand.push(gameDeck.pop());
      var playerTotal = calculateTotalHandValue(playerHand);
      if (playerTotal > 21) {
        outputMsg =
          displayHands(playerHand, dealerHand) +
          "<br>Player busts! Dealer wins.";
        currentGameMode = "game start"; // Reset the game
      } else {
        outputMsg =
          displayHands(playerHand, dealerHand) +
          '<br>You drew another card. <br>Please input "hit" or "stand".';
      }
    } else if (input == "stand") {
      var playerTotalHandValue = calculateTotalHandValue(playerHand);
      var dealerTotalHandValue = calculateTotalHandValue(dealerHand);

      while (dealerTotalHandValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerTotalHandValue = calculateTotalHandValue(dealerHand);
      }

      if (dealerTotalHandValue > 21) {
        outputMsg =
          displayHands(playerHand, dealerHand) +
          "<br>Dealer busts! Player wins.";
      } else if (playerTotalHandValue == dealerTotalHandValue) {
        outputMsg = displayHands(playerHand, dealerHand) + "It's a tie!";
      } else if (playerTotalHandValue > dealerTotalHandValue) {
        outputMsg = displayHands(playerHand, dealerHand) + "Player wins!";
      } else {
        outputMsg = displayHands(playerHand, dealerHand) + "Dealer Wins!";
      }
      currentGameMode = "game start"; // Reset the game
    }
    return outputMsg;
  }
}
