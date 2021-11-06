// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

var cardDeck = [];
var gameMode = "";
var playerHand = [];
var computerHand = [];
var playerScore1 = 0;
var playerScore2 = 0;
var computerScore1 = 0;
var computerScore2 = 0;
var result = "";
var myOutputValue = "";

var makeDeck = function () {
  // Initialise an empty deck array

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

      var cardPower = rankCounter;
      if (rankCounter == 11 || rankCounter == 12 || rankCounter == 13) {
        cardPower = 10;
      }
      var altPower = cardPower;
      if (cardPower == 1) {
        altPower = 11;
      }
      // Create a new card with the current name, suit, rank, and power
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        power1: cardPower,
        power2: altPower,
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

// Compare player and computer scores
var compareScores = function () {
  // Reset scores before scores are computed
  playerScore1 = 0;
  playerScore2 = 0;
  playerAce = 0;
  computerScore1 = 0;
  computerScore2 = 0;
  computerAce = 0;

  // Sum up scores of all cards in the player's hand, first score with ace = 1, and second score with ace = 11
  var index = 0;
  while (index < playerHand.length) {
    playerScore1 = playerScore1 + playerHand[index].power1;
    playerScore2 = playerScore2 + playerHand[index].power2;
    // Count number of aces drawn
    if (playerHand[index].name == "ace") {
      playerAce = playerAce + 1;
    }
    index = index + 1;
  }

  // Sum up scores of all cards in the computer's hand, first score with ace = 1, and second score with ace = 11
  index = 0;
  while (index < computerHand.length) {
    computerScore1 = computerScore1 + computerHand[index].power1;
    computerScore2 = computerScore2 + computerHand[index].power2;
    // Count number of aces drawn
    if (computerHand[index].name == "ace") {
      computerAce = computerAce + 1;
    }
    index = index + 1;
  }

  // Ensure that only 1 ace in each hand counts as 11. Extra aces count as 1
  if (playerAce > 1) {
    playerScore2 = playerScore2 - (playerAce - 1) * 10;
  }

  if (computerAce > 1) {
    computerScore2 = computerScore2 - (computerAce - 1) * 10;
  }

  // Compare scores
  // Check for player bust
  if (playerScore1 > 21) {
    result = "You exceeded 21. You lose!";
    return result;
  }
  // check for computer bust
  else if (computerScore1 > 21) {
    result = "Computer exceeded 21. You win!";
    return result;
  }
  // check for player blackjack
  else if (playerScore1 == 21 || playerScore2 == 21) {
    result = "Blackjack! You win!";
    return result;
  }
  // check for computer blackjack
  else if (computerScore1 == 21 || computerScore2 == 21) {
    result = "Blackjack! Computer wins!";
    return result;
  }
  // comparison of scores if player chose to stand
  else if (gameMode == "stand") {
    // Get rid of bust condition in all computed scores as check was already done
    if (playerScore1 > 21) {
      playerScore1 = 0;
    }
    if (playerScore2 > 21) {
      playerScore2 = 0;
    }

    if (computerScore1 > 21) {
      computerScore1 = 0;
    }
    if (computerScore2 > 21) {
      computerScore2 = 0;
    }
    // Compare the higher of player scores against higher of computer scores
    if (
      Math.max(playerScore1, playerScore2) >
      Math.max(computerScore1, computerScore2)
    ) {
      result = "You have the higher score. You win!";
      return result;
    } else if (
      Math.max(playerScore1, playerScore2) <
      Math.max(computerScore1, computerScore2)
    ) {
      result = "Computer has the higher score. Computer wins!";
      return result;
    } else {
      result = "It's a tie.";
      return result;
    }
    // if no bust, blackjack, or stand decision, ask player to hit or stand
  } else {
    result = "Please decide whether to hit or stand.";
  }
  return result;
};

// Print out player and computer hands
var showHands = function () {
  var showPlayerHand = "You have drawn ";
  var index = 0;
  // Loop to add each card in the hand to the text output
  while (index < playerHand.length) {
    showPlayerHand =
      showPlayerHand +
      playerHand[index].name +
      " of " +
      playerHand[index].suit +
      " | ";

    index = index + 1;
  }

  var showComputerHand = "Computer has drawn ";
  var index = 0;
  // Loop to add each card in the hand to the text output
  while (index < computerHand.length) {
    showComputerHand =
      showComputerHand +
      computerHand[index].name +
      " of " +
      computerHand[index].suit +
      " | ";

    index = index + 1;
  }
  // Combine player and computer hands in a string
  myOutputValue = showPlayerHand + "<br><br>" + showComputerHand;
  return myOutputValue;
};

var main = function (input) {
  // set game mode
  gameMode = input;

  // Start of game
  if (gameMode == "") {
    myOutputValue = "";
    // Deck creation & shuffling
    cardDeck = shuffleCards(makeDeck());

    // The player draws 2 cards from the deck, followed by the computer.
    playerHand = [cardDeck.pop(), cardDeck.pop()];
    computerHand = [cardDeck.pop(), cardDeck.pop()];

    // Prints player and computer hands
    showHands();
    // Compare player and computer scores
    compareScores();
    // Add results of score comparison to the output
    myOutputValue = myOutputValue + "<br><br>" + result;
  }

  // If player chooses to hit, draw 1 more card
  if (gameMode == "hit") {
    myOutputValue = "";
    playerHand.push(cardDeck.pop());

    // Prints player and computer hands
    showHands();
    // Compare player and computer scores
    compareScores();
    // Add results of score comparison to the output
    myOutputValue = myOutputValue + "<br><br>" + result;
  }

  // If player chooses to stand, the computer has to decide whether to draw more cards
  if (gameMode == "stand") {
    myOutputValue = "";
    // Loop to keep drawing cards until score is 17 or greater
    while (computerScore1 < 17 && computerScore2 < 17) {
      computerScore1 = 0;
      computerScore2 = 0;
      computerAce = 0;
      computerHand.push(cardDeck.pop());
      index = 0;
      while (index < computerHand.length) {
        computerScore1 = computerScore1 + computerHand[index].power1;
        computerScore2 = computerScore2 + computerHand[index].power2;
        // Count number of aces drawn
        if (computerHand[index].name == "ace") {
          computerAce = computerAce + 1;
        }
        index = index + 1;
      }
      // If there's more than 1 ace in computer's hand, only 1 ace counts for 11. The rest counts as 1 each.
      if (computerAce > 1) {
        computerScore2 = computerScore2 - (computerAce - 1) * 10;
      }
    }

    showHands();
    compareScores();
    myOutputValue = myOutputValue + "<br><br>" + result;
  }

  return myOutputValue;
};
