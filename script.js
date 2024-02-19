// Global Variables
var currentGameMode = "game start";
var playerHand = [];
var dealerHand = [];
var gameDeck = "";
var playerMoney = 1000; // Player starts with $1000
var playerBet = 0;
var button = document.getElementById("submit-button");

// Function to create a deck of cards
function createDeck() {
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];
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
  while (totalHandValue > 21 && AceCount > 0) {
    totalHandValue -= 10; // Subtract 10 if an Ace is initially counted as 11
    AceCount -= 1; // Reduce the count of Aces considered as 11
  }
  return totalHandValue;
}

// Function to display player and dealer hands including total value of the cards
function displayHands(playerHandArray, dealerHandArray) {
  var playerTotalHandValue = calculateTotalHandValue(playerHandArray);
  var dealerTotalHandValue = calculateTotalHandValue(dealerHandArray);

  var playerMessage = `Player's Hand (Total Value: ${playerTotalHandValue}): <br>`;
  for (var index = 0; index < playerHandArray.length; index++) {
    playerMessage +=
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
  }

  var dealerMessage = `<br>Dealer's Hand (Total Value: ${dealerTotalHandValue}): <br>`;
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

// Function for the betting system
function placeBet(betAmount) {
  if (betAmount > playerMoney) {
    return "You don't have enough money to make this bet.";
  } else {
    playerBet = betAmount;
    playerMoney -= betAmount;
    return `Bet of $${betAmount} placed. You have $${playerMoney} left.`;
  }
}

// Function to handle the outcome of the game and adjust player's money
function handleGameOutcome(playerWon, playerGotBlackJack) {
  if (playerWon) {
    if (playerGotBlackJack) {
      // Blackjack pays 3:2
      var winnings = playerBet * 1.5;
      playerMoney += winnings + playerBet; // Return the bet and add winnings
      return `You won with Blackjack! You won $${winnings}! Your balance is now $${playerMoney}.`;
    } else {
      // Regular win pays 1:1
      playerMoney += playerBet * 2; // Return the bet and add winnings
      return `You won! You won $${playerBet}! Your balance is now $${playerMoney}.`;
    }
  } else {
    // Loss, bet is already subtracted
    return `You lost! Your balance is now $${playerMoney}.`;
  }
}

// Main function to run the game logic
function main(input) {
  var outputMsg = "";
  if (input.toLowerCase() === "end") {
    button.innerText = "Start New Game"; // Set button text to indicate game has ended
    button.addEventListener("click", function () {
      // Refresh the page
      window.location.reload();
    });
    return `Game has ended. You cash out $${playerMoney} in total. Refresh the page or press Start New Game to start a new game.`;
  }

  if (currentGameMode == "game start") {
    button.innerText = "Place Bet"; // Ensure button has the correct text for this phase
    if (isNaN(input) || input <= 0) {
      return "Please enter a valid bet amount to start or type 'End' to finish the game.";
    } else {
      var betMessage = placeBet(Number(input));
      if (betMessage.startsWith("You don't have enough money")) {
        return betMessage; // Not enough money to place the bet
      } else {
        gameDeck = createNewDeck();
        playerHand = [];
        dealerHand = [];
        playerHand.push(gameDeck.pop());
        playerHand.push(gameDeck.pop());
        dealerHand.push(gameDeck.pop());
        dealerHand.push(gameDeck.pop());

        currentGameMode = "game cards drawn";
        button.innerText = "View Hand"; // Change button text for next phase
        outputMsg = `${betMessage}<br>Cards dealt. Press 'View Hand' to continue!`;
        return outputMsg;
      }
    }
  }

  if (currentGameMode == "game cards drawn") {
    button.innerText = "Hit or Stand"; // Set button text for this game phase

    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    if (playerHasBlackJack && dealerHasBlackJack) {
      playerMoney += playerBet; // Return the bet to the player
      outputMsg = "It's a BlackJack Tie!";
      button.innerText = "Place Bet"; // Reset button text for next round
    } else if (playerHasBlackJack) {
      outputMsg = handleGameOutcome(true, true);
      button.innerText = "Place Bet"; // Reset button text for next round
    } else if (dealerHasBlackJack) {
      outputMsg = handleGameOutcome(false, false);
      button.innerText = "Place Bet"; // Reset button text for next round
    } else {
      outputMsg = "No BlackJack!";
      // Keep the button text as "Hit or Stand" for player action
    }

    outputMsg += `<br>${displayHands(
      playerHand,
      dealerHand
    )}<br>Enter 'hit' or 'stand'. Your bet is $${playerBet}. Your balance is $${playerMoney}.<br>Or type 'End' to finish the game.`;
    if (!playerHasBlackJack && !dealerHasBlackJack) {
      currentGameMode = "game hit or stand"; // Only proceed if no initial blackjack
    } else {
      currentGameMode = "game start"; // Reset for next round
      outputMsg += `<br>Enter a new bet to continue or type 'End' to finish the game.`;
    }

    return outputMsg;
  }

  if (currentGameMode == "game hit or stand") {
    if (input != "hit" && input != "stand") {
      outputMsg = `${displayHands(
        playerHand,
        dealerHand
      )}<br><br>Invalid input. Enter 'hit' or 'stand'. Your bet is $${playerBet}. Your balance is $${playerMoney}.<br>Or type 'End' to finish the game.`;
    } else if (input == "hit") {
      playerHand.push(gameDeck.pop());
      var playerTotal = calculateTotalHandValue(playerHand);
      if (playerTotal > 21) {
        outputMsg =
          `${displayHands(playerHand, dealerHand)}<br>` +
          handleGameOutcome(false, false);
        button.innerText = "Place Bet"; // Reset button text for new game
        currentGameMode = "game start"; // Reset the game
        outputMsg += `<br>Enter a new bet to continue or type 'End' to finish the game.`;
      } else {
        outputMsg = `${displayHands(
          playerHand,
          dealerHand
        )}<br>You drew another card. <br>Please input 'hit' or 'stand'. Your bet is $${playerBet}. Your balance is $${playerMoney}.<br>Or type 'End' to finish the game.`;
        // Keep the button text as "Hit or Stand" for player decision
      }
    } else if (input == "stand") {
      var playerTotalHandValue = calculateTotalHandValue(playerHand);
      var dealerTotalHandValue = calculateTotalHandValue(dealerHand);

      while (dealerTotalHandValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerTotalHandValue = calculateTotalHandValue(dealerHand);
      }

      if (
        dealerTotalHandValue > 21 ||
        playerTotalHandValue > dealerTotalHandValue
      ) {
        outputMsg =
          `${displayHands(playerHand, dealerHand)}<br>` +
          handleGameOutcome(true, false);
      } else if (playerTotalHandValue == dealerTotalHandValue) {
        playerMoney += playerBet; // Return the bet to the player
        outputMsg = `${displayHands(
          playerHand,
          dealerHand
        )}<br>It's a tie! Your bet is returned. Your balance is $${playerMoney}.`;
      } else {
        outputMsg =
          `${displayHands(playerHand, dealerHand)}<br>` +
          handleGameOutcome(false, false);
      }
      button.innerText = "Place Bet"; // Set button text for next round
      currentGameMode = "game start"; // Reset the game
      outputMsg += `<br>Enter a new bet to continue or type 'End' to finish the game.`;
    }
    return outputMsg;
  }
}
