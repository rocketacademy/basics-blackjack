// BLACKJACK VERSION CONTROL
// V1 - 22/6 (6hrs)
// - basic working version, able to run the whole game
// - ace is equal 11 when total cards <= 2. and equal to 1 when total cards > 2
// - to update: ace should count as 11 by default. if there are more than 1 ace in the hand, can be 1 or 11 depending on whether it is beneficial to have it

// V2 - 22/6 (1hr)
// - Added helper functions to consider ace cases

// Make a deck function
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

var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
console.log("shuffled deck : ", shuffledDeck);

// gameState 0 : Draw first 2 cards for player and computer. Check for Blackjack
// gameState 1 : Player to input hit or stand
// gameState 2 : Player hit, draw another card. Then go back to gameState 1
// gameState 3 : Player stand. Computer to hit or stand. Then compute results
// gameState 10 : endGame. Reset values to 0

var gameState = 0;

var playerCards = [];
var playerScore = 0;
var computerCards = [];
var computerScore = 0;

var main = function (input) {
  var myOutputValue = fullGame(input);
  return myOutputValue;
};

// There will be only two players. One human and one computer (for the Base solution).
// The computer will always be the dealer.
// Each player gets dealt two cards to start.
// The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
// The dealer has to hit if their hand is below 17.
// Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
// The player who is closer to, but not above 21 wins the hand.

// Helper function to convert score of cards according to the rank
var scoreConverter = function (cardRank) {
  // Return Ace = 11 first and take care of the Ace = 1 case later using Ace case converter
  if (cardRank != 11 && cardRank != 12 && cardRank != 13 && cardRank != 1) {
    return cardRank;
  } else if (cardRank == 11 || cardRank == 12 || cardRank == 13) {
    return 10;
  } else if (cardRank == 1) {
    return 11;
  }
};

// Helper function to generate card results with dynamic length
var cardResultGenerator = function (cardArray, noOfCards) {
  var result = "";
  for (let i = 0; i < noOfCards; i++) {
    result += `${cardArray[i].name} of ${cardArray[i].suit}<br>`;
  }
  return result;
};

// Helper function to count the number of Aces in hand, related to resultAfterAce function
var totalAceCount = function (cardArray, noOfCards) {
  var result = 0;
  for (let i = 0; i < noOfCards; i++) {
    if (cardArray[i].rank == 1) {
      result += 1;
    }
  }
  return result;
};

var playerAceCount = 0;
var computerAceCount = 0;

// Helper function to convert score to consider Ace case accordingly
var resultAfterAce = function (noOfAce, totalScore) {
  // if 0 ace in hand, nothing to do here, just return what the hand is
  if (noOfAce == 0) {
    return totalScore;
  } else {
    // if 1 or more aces in hand, only need to deduct if the hand is currently bust. if less, this is the best combi already, just return what the hand is
    if (totalScore <= 21) {
      return totalScore;
    } else {
      // if 1 or more aces in hand, and hand is bust. deduct 10 for each ace (originally 11, now 1) until score is not bust OR until noOfAces is fully utilized
      while (totalScore > 21 && noOfAce != 0) {
        totalScore -= 10;
        noOfAce -= 1;
      }
      return totalScore;
    }
  }
};

// Main Game
var fullGame = function (userInput) {
  var gameOutput = "";

  // gameState 0 : Draw first 2 cards for player and computer
  if (gameState == 0) {
    // First draw of 2 cards to each player
    for (let i = 0; i < 2; i++) {
      playerCards.push(shuffledDeck.pop());
      computerCards.push(shuffledDeck.pop());
      // Total up the score of each hand
      playerScore += scoreConverter(playerCards[i].rank);
      computerScore += scoreConverter(computerCards[i].rank);
    }

    gameOutput += `You have drawn: <br><br> ${cardResultGenerator(
      playerCards,
      playerCards.length
    )} `;

    // Check for endGame condition: if player or computer has Blackjack. Only happens if total score is 21 at this stage
    if (playerScore == 21 && computerScore == 21) {
      gameOutput += `<br> You got Blackjack! <br><br> Computer also drew a Blackjack! <br><br> What are the odds?? It's a draw! <br><br> Click 'Submit' to play another round.`;
      gameState = 10;
    } else if (playerScore == 21) {
      gameOutput += `<br> You got Blackjack! <br><br> Congrats you have won! <br><br> Click 'Submit' to play another round.`;
      gameState = 10;
    } else if (computerScore == 21) {
      gameOutput += `<br> Computer drew a Blackjack! <br><br> You have lost, unlucky! <br><br> Click 'Submit' to play another round.`;
      gameState = 10;
    } else {
      gameOutput += `<br> Type <b>h</b> to draw another card, or <b>k</b> to keep your current hand.`;
      gameState = 1;
    }
    return gameOutput;
  }
  console.log("player: ", playerCards);
  console.log("computer: ", computerCards);

  // gameState 1 : Player to input hit or stand
  if (gameState == 1) {
    var userChoice = userInput.toLowerCase();
    console.log("userchoice:", userChoice);

    if (userChoice == "h") {
      gameState = 2;
      gameOutput = "You drew a card. Click to see your current hand!";
    } else if (userChoice == "k") {
      gameState = 3;
      gameOutput =
        "You chose not to draw another card. <br><br> Click to see how you did against the computer!";
    } else {
      gameOutput =
        "Gibberish! Make your choice!<br><br> Type <b>h</b> to draw another card, or <b>k</b> to keep your current hand.";
    }
    return gameOutput;
  }

  // gameState 2 : Player hit, draw another card. Then go back to gameState 1
  if (gameState == 2) {
    // Player hit, draw another card
    playerCards.push(shuffledDeck.pop());
    playerScore += scoreConverter(playerCards[playerCards.length - 1].rank);

    gameOutput += `You have drawn: <br><br> ${cardResultGenerator(
      playerCards,
      playerCards.length
    )} `;

    // Return to gameState 1 to let player to decide whether to draw or hold their current hand
    gameState = 1;
    return (
      gameOutput +
      `<br> Type <b>h</b> to draw another card, or <b>k</b> to keep your current hand.`
    );
  }

  // gameState 3 : Player stand. Computer to hit or stand. Then compute results
  if (gameState == 3) {
    // Player stand. Player array freeze
    // Computer to decide whether hit or stand
    // Computer will hit as long as points less than 17

    // if computerScore > 17, it will compare with playerScore and determine the winner
    // if computerScore <= 17, it will draw another card until condition is fulfilled

    while (computerScore < 17) {
      computerCards.push(shuffledDeck.pop());
      computerScore += scoreConverter(
        computerCards[computerCards.length - 1].rank
      );
    }

    playerAceCount = totalAceCount(playerCards, playerCards.length);
    computerAceCount = totalAceCount(computerCards, computerCards.length);

    var finalPlayerScore = resultAfterAce(playerAceCount, playerScore);
    var finalComputerScore = resultAfterAce(computerAceCount, computerScore);

    gameOutput = `Your score is ${finalPlayerScore} and the computer scored ${finalComputerScore}. <br><br>`;

    // End of computer's turn. Compare result to determine winner
    // If both bust 21, it's a tie
    // If one bust 21, the other is the winner
    // If no one bust 21, compare who got the highest
    if (finalComputerScore > 21 && finalPlayerScore > 21) {
      gameOutput += `Both the computer and you bust! It's a draw!`;
    } else if (finalComputerScore > 21 && finalPlayerScore <= 21) {
      gameOutput += `The computer bust! Congrats, you have won!`;
    } else if (finalPlayerScore > 21 && finalComputerScore <= 21) {
      gameOutput += `You bust! You have lost, better luck next time!`;
    } else {
      if (finalComputerScore == finalPlayerScore) {
        gameOutput += `It's a draw!`;
      } else if (finalComputerScore > finalPlayerScore) {
        gameOutput += `Tough luck! You have lost, better luck next time!`;
      } else {
        gameOutput += `You won! Well done!`;
      }
    }
    gameState = 10;
    return gameOutput + `<br><br> Click 'Submit' to play another round.`;
  }

  // gameState 10 : endGame condition. Reset the values to play another round.
  if (gameState == 10) {
    gameState = 0;
    playerCards = [];
    playerScore = 0;
    computerCards = [];
    computerScore = 0;
    playerAceCount = 0;
    computerAceCount = 0;

    gameOutput = `Can't get enough of Blackjack? Smash the 'Submit' button to reveal your hand!`;
  }
  return gameOutput;
};
