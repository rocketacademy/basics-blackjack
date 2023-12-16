// 1. Draw 2 random cards each for player and computer (4 cards to be drawn in total from the same deck)
// 2. Check for any blackjack (both players blackjack, player blackjack, computer blackjack)
// 3. If no blackjack, check for the total (if total > 21 -> disqualified) (winner will be the closest to 21)

// Declare global variables and game mode
var gameMode = "Draw Cards";
var gameModeCheckBlackjack = "Check Blackjack";
var gameModeCheckCardSum = "Check Card Sum";
var gameModePlayerHitStand = "Player Hit Stand";
var gameModeComputerHitStand = "Computer Hit Stand";
var gameModeWinningCalculation = "Winning Calculation";
var playerCardOne;
var playerCardTwo;
var playerCardAdditional;
var computerCardOne;
var computerCardTwo;
var ComputerCardAdditional;
var playerCardArray = [];
var computerCardArray = [];
var playerCardSum;
var computerCardSum;
var compareScoreArray = [];

// HELPER FUNCTION 1 - Make Deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = [
    "♥", // hearts
    "♦", // diamonds
    "♣", // clubs
    "♠", // spades
  ];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // console.log("Current Suit: " + currentSuit);
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

      // console log
      // console.log("rank: " + rankCounter);

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

// HELPER FUNCTION 2 - Shuffle Deck
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

// HELPER FUNCTION 3 - Return Shuffled Deck
var giveShuffledDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

// HELPER FUNCTION 4 - Count the sum of the cards based on rank in an array
// For loop (for each element in the cardArray) containing if/else-if structure (if card's rank = 1, sum += 1; 1<rank<10: sum+= rank; else: sum+=10)
// var sumOfCards = function (cardArray) {
//   var cardSum = 0;
//   var arrayLength = cardArray.length;
//   for (var i = 0; i < arrayLength; i += 1) {
//     if (cardArray[i] == 1) {
//       cardSum += 1;
//     } else if (cardArray[i] < 10) {
//       cardSum += cardArray[i];
//     } else {
//       cardSum += 10;
//     }
//   }
//   return cardSum;
// };

// HELPER FUNCTION 4.1 - Cater for Aces - allow Ace to be 11 or 1
var sumOfCardsTest = function (cardArray) {
  var cardSum = 0;
  var aceCount = 0;
  var arrayLength = cardArray.length;

  // Loop to count the number of aces
  for (var i = 0; i < arrayLength; i += 1) {
    if (cardArray[i] == 1) {
      aceCount += 1;
    }
  }
  //console.log(aceCount);

  // If no aces in array
  if (aceCount == 0) {
    for (var i = 0; i < arrayLength; i += 1) {
      if (cardArray[i] < 10) {
        cardSum += cardArray[i];
      } else {
        cardSum += 10;
      }
    }
  }
  // If one or more aces present in the array
  else {
    // default, will treat ace as 11 first
    for (var i = 0; i < arrayLength; i += 1) {
      if (cardArray[i] == 1) {
        cardSum += 11;
      } else if (cardArray[i] < 10) {
        cardSum += cardArray[i];
      } else {
        cardSum += 10;
      }
    }

    // While loop (if total cardSum > 21 and aceCount > 0, ace card will become 1 by taking cardSum - 10)
    // loop only runs when sum above 21 and there's Ace card to change
    while (cardSum > 21 && aceCount > 0) {
      // Ace will turn from 11 to 1 (so total sum -10 for each Ace change)
      cardSum -= 10;
      // Loop will exit if aceCount is 1
      aceCount -= 1;
    }
  }

  return cardSum;
};

// HELPER FUNCTION 5 - Compare player and computer sum in an array
var computeWinnerFromScore = function (scoreArray) {
  // Scenario 1 - Both Bust
  if (scoreArray[0] > 21 && scoreArray[1] > 21) {
    return `<b>🃏THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Computer's score: ${computerCardSum} </br>
            </br>
            <b>PLAYER AND COMPUTER BUSTED.</br>
            </br>
            IT'S A TIE!</br></b>
            </br>
            Click submit to play another round.`;
  }
  // Scenario 2 - Player Bust
  else if (scoreArray[0] > 21) {
    return `<b>🃏THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Computer's score: ${computerCardSum} </br>
            </br>
            <b>PLAYER BUSTED.</br>
            </br>
            COMPUTER WINS! 🥳</br></b>
            </br>
            Click submit to play another round.`;
  }
  // Scenario 3 - Computer Bust
  else if (scoreArray[1] > 21) {
    return `<b>🃏THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Computer's score: ${computerCardSum} </br>
            </br>
            <b>COMPUTER BUSTED.</br>
            </br>
            PLAYER WINS! 🥳</br></b>
            </br>
            Click submit to play another round.`;
  }
  // Scenario 4 - Player (index = 0) wins
  else if (scoreArray[0] > scoreArray[1]) {
    return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Computer's score: ${computerCardSum} </br>
            </br>
            <b>PLAYER WINS! 🥳</b></br>
            </br>
            Click submit to play another round.`;
  }
  // Scenario 5 - Computer (index = 1) wins
  else if (scoreArray[0] < scoreArray[1]) {
    return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Computer's score: ${computerCardSum} </br>
            </br>
            <b> COMPUTER WINS! 🥳</b></br>
            </br>
            Click submit to play another round.`;
  }
  // Scenario 6 - Draw
  else {
    return `<b>🃏THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Computer's score: ${computerCardSum} </br>
            </br>
            <b>IT'S A TIE!</b></br>
            </br>
            Click submit to play another round.`;
  }
};

// HELPER FUNCTION 6 - Reset game to allow player to play another round
var resetGame = function () {
  // Clear all the arrays
  playerCardArray = [];
  computerCardArray = [];
  compareScoreArray = [];
  //Change mode back to "Draw Cards"
  gameMode = "Draw Cards";
};

// MAIN FUNCTION
var main = function (input) {
  // 1. GAME MODE 1 - Draw random cards for computer and player using the Make Deck and Shuffle Deck Helper Function
  if (gameMode == "Draw Cards") {
    // give shuffled deck
    var gameDeck = giveShuffledDeck();
    // assign random cards for player and computer
    playerCardOne = gameDeck.pop();
    playerCardTwo = gameDeck.pop();
    playerCardAdditional = gameDeck.pop();
    computerCardOne = gameDeck.pop();
    computerCardTwo = gameDeck.pop();
    computerCardAdditional = gameDeck.pop();
    console.log(playerCardOne, playerCardTwo);
    console.log(computerCardOne, computerCardTwo);
    // Control flow - change game mode to check for blackjack
    gameMode = gameModeCheckBlackjack;
    // return output message
    return `The card deck has been shuffled! </br> 
            </br>
            Player's draw: ${playerCardOne.name} ${playerCardOne.suit} and ${playerCardTwo.name} ${playerCardTwo.suit} </br>
            Computer's draw: ${computerCardOne.name} ${computerCardOne.suit} and ${computerCardTwo.name} ${computerCardTwo.suit}</br>
            </br>
            Click submit button to continue!`;
  }

  // 2. GAME MODE 2 - Check for blackjack
  else if (gameMode == gameModeCheckBlackjack) {
    // Scenarios for blackjack (Ace + 10/Jack/Queen/King)
    // Nested-if Scenario 1 - Player and Computer draw blackjack (Draw)
    if (
      (playerCardOne.rank == 1 &&
        playerCardTwo.rank >= 10 &&
        computerCardOne.rank == 1 &&
        computerCardTwo.rank >= 10) ||
      (playerCardOne.rank >= 10 &&
        playerCardTwo.rank == 1 &&
        computerCardOne.rank == 1 &&
        computerCardTwo.rank >= 10) ||
      (playerCardOne.rank == 1 &&
        playerCardTwo.rank >= 10 &&
        computerCardOne.rank >= 10 &&
        computerCardTwo.rank == 1) ||
      (playerCardOne.rank >= 10 &&
        playerCardTwo.rank == 1 &&
        computerCardOne.rank >= 10 &&
        computerCardTwo.rank == 1)
    ) {
      // Reset game using helper function 6
      resetGame();
      return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
                </br>
                Both Player and Computer drew blackjack! </br>
                </br>
                <b>IT'S A TIE!</b></br>
                </br>
                Click submit to play another round.`;
    }
    // Nested-if Scenario 2 - Player draws blackjack (Player wins)
    else if (
      (playerCardOne.rank == 1 && playerCardTwo.rank >= 10) ||
      (playerCardOne.rank >= 10 && playerCardTwo.rank == 1)
    ) {
      // Reset game using helper function 6
      resetGame();
      return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
              </br>
              Player drew blackjack! </br>
              </br>
              <b>PLAYER WON! 🥳</b></br>
              </br>
              Click submit to play another round.`;
    }
    // Nested-if Scenario 3 - Computer draws blackjack (Computer wins)
    else if (
      (computerCardOne.rank == 1 && computerCardTwo.rank >= 10) ||
      (computerCardOne.rank >= 10 && computerCardTwo.rank == 1)
    ) {
      // Reset game using helper function 6
      resetGame();
      return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
              </br>
              Computer drew blackjack! </br>
              </br>
              <b>COMPUTER WON! 🥳</b></br>
              </br>
              Click submit to play another round.`;
    }
    // Nested-if Scenario 4 (else) - No blackjack at first instance
    else {
      // Control flow - change game mode to calculate the sum
      gameMode = gameModeCheckCardSum;
      // Push the player and computer card rank into array for sum later
      playerCardArray.push(playerCardOne.rank);
      playerCardArray.push(playerCardTwo.rank);
      computerCardArray.push(computerCardOne.rank);
      computerCardArray.push(computerCardTwo.rank);
      return `Neither the Player nor the Computer drew blackjack! </br>
              </br>
              Click submit button to continue!`;
    }
  }

  // 3. GAME MODE 3 - Check for the total sum of the cards drawn
  else if (gameMode == gameModeCheckCardSum) {
    // Compute the sum for player and computer using helper function 4
    playerCardSum = sumOfCardsTest(playerCardArray);
    computerCardSum = sumOfCardsTest(computerCardArray);
    // console.log(playerCardSum, computerCardSum);
    // Control flow - change game mode to ask player for hit/stand
    gameMode = gameModePlayerHitStand;
    return `Player's hand: ${playerCardOne.name} ${playerCardOne.suit} and ${playerCardTwo.name} ${playerCardTwo.suit} </br>
            Computer's hand: ${computerCardOne.name} ${computerCardOne.suit} and ${computerCardTwo.name} ${computerCardTwo.suit}</br>
            </br>
            Current Score: </br>
            Player: ${playerCardSum} </br>
            Computer: ${computerCardSum} </br>
            </br>
            Enter 'hit' or 'stand' to continue.
    `;
  }

  // 4. GAME MODE 4 - Ask if player wishes to draw an additional card
  else if (gameMode == gameModePlayerHitStand) {
    // change the input to lower case
    input = input.toLowerCase();
    // if hit, draw new cards
    if (input == "hit") {
      // Push new card into player array
      playerCardArray.push(playerCardAdditional.rank);
      // Add the rank of the new card into the playerCardSum
      playerCardSum = sumOfCardsTest(playerCardArray);
      // Control flow - change game mode for computer to hit/stand
      gameMode = gameModeComputerHitStand;
      return `Player chose to hit.</br>
      </br>
      Player drew an additional card of ${playerCardAdditional.name} ${playerCardAdditional.suit}.</br>
      </br>
      Current Score: </br>
      Player: ${playerCardSum} </br>
      Computer: ${computerCardSum} </br>
      </br>
      Click submit to continue.`;
    }
    // If input is stand
    else if (input == "stand") {
      // Control flow - change game mode for computer to hit/stand
      gameMode = gameModeComputerHitStand;
      return `Player chose to stand.</br>
      </br>
      Current Score: </br>
      Player: ${playerCardSum} </br>
      Computer: ${computerCardSum} </br>
      </br>
      Click submit to continue.`;
    }
    // data validation - if not hit or not stand
    else {
      return `Invalid input. Please only enter 'hit' or 'stand'.`;
    }
  }

  // 5. GAME MODE 5 - Computer to decide hit / stand
  else if (gameMode == gameModeComputerHitStand) {
    // if computerCardSum <17, draw new card
    if (computerCardSum < 17) {
      // Push new card into computer array
      computerCardArray.push(computerCardAdditional.rank);
      // Add the rank of the new card into the playerCardSum
      computerCardSum = sumOfCardsTest(computerCardArray);
      // Control flow - change game mode for winning calculation
      gameMode = gameModeWinningCalculation;
      return `Computer chose to hit.</br>
      </br>
      Computer drew an additional card of ${computerCardAdditional.name} ${computerCardAdditional.suit}.</br>
      </br>
      Current Score: </br>
      Player: ${playerCardSum} </br>
      Computer: ${computerCardSum} </br>
      </br>
      Click submit to continue.`;
    }
    // if computerCardSum is 17 or above, computer will stand
    else {
      // Control flow - change game mode for winning calculation
      gameMode = gameModeWinningCalculation;
      return `Computer chose to stand.</br>
      </br>
      Current Score: </br>
      Player: ${playerCardSum} </br>
      Computer: ${computerCardSum} </br>
      </br>
      Click submit to continue.`;
    }
  }

  // 6. GAME MODE 6 - Computer to decide hit / stand
  else if (gameMode == gameModeWinningCalculation) {
    // Push the player and computer card sum to compareScoreArray for comparison
    compareScoreArray.push(playerCardSum);
    compareScoreArray.push(computerCardSum);
    // Return winner using helper function 5
    var resultOutput = computeWinnerFromScore(compareScoreArray);
    // Reset game using helper function 6
    resetGame();
    return resultOutput;
  }
};
