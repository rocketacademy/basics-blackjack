// 1. Draw 2 random cards each for player and dealer (4 cards to be drawn in total from the same deck)
// 2. Check for any blackjack (both players blackjack, player blackjack, dealer blackjack)
// 3. If no blackjack, check for the total (if total > 21 -> disqualified) (winner will be the closest to 21)

// Declare global variables and game mode
var gameMode = "Intro";
var gameModePlaceBet = "Place Bet";
var gameModeDrawCards = "Draw Cards";
var gameModeCheckBlackjack = "Check Blackjack";
var gameModeCheckCardSum = "Check Card Sum";
var gameModePlayerHitStand = "Player Hit Stand";
var gameModeDealerHitStand = "Dealer Hit Stand";
var gameModeWinningCalculation = "Winning Calculation";
var playerCardOne;
var playerCardTwo;
var playerCardAdditional;
var dealerCardOne;
var dealerCardTwo;
var dealerCardAdditional;
var playerCardArray = [];
var dealerCardArray = [];
var playerCardSum;
var dealerCardSum;
var compareScoreArray = [];
var playerChips = 100;
var chipsBettedInRound;

////////////////////////////////////// HELPER FUNCTION //////////////////////////////////////

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
      // Loop will exit if aceCount is 0
      aceCount -= 1;
    }
  }

  return cardSum;
};

// HELPER FUNCTION 5 - Compare player and dealer sum in an array
var computeWinnerFromScore = function (scoreArray) {
  // Scenario 1 - Both Bust
  if (scoreArray[0] > 21 && scoreArray[1] > 21) {
    return `<b>🃏THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Dealer's score: ${dealerCardSum} </br>
            </br>
            <b>PLAYER AND DEALER BUSTED.</br>
            </br>
            IT'S A TIE!</br></b>
            </br>
            You have ${playerChips} remaining chips. </br>
            </br>
            Click submit to play another round.`;
  }
  // Scenario 2 - Player Bust
  else if (scoreArray[0] > 21) {
    return `<b>🃏THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Dealer's score: ${dealerCardSum} </br>
            </br>
            <b>PLAYER BUSTED.</br>
            </br>
            DEALER WINS! 🥳</br></b>
            </br>
            You have ${playerChips} remaining chips. </br>
            </br>
            Click submit to play another round.`;
  }
  // Scenario 3 - Dealer Bust
  else if (scoreArray[1] > 21) {
    // Add chips won
    playerChips = playerChips + normalWin(chipsBettedInRound);
    return `<b>🃏THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Dealer's score: ${dealerCardSum} </br>
            </br>
            <b>DEALER BUSTED.</br>
            </br>
            PLAYER WINS! 🥳</br></b>
            </br>
            You have ${playerChips} remaining chips. </br>
            </br>
            Click submit to play another round.`;
  }
  // Scenario 4 - Player (index = 0) wins
  else if (scoreArray[0] > scoreArray[1]) {
    // Add chips won
    playerChips = playerChips + normalWin(chipsBettedInRound);
    return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Dealer's score: ${dealerCardSum} </br>
            </br>
            <b>PLAYER WINS! 🥳</b></br>
            </br>
            You have ${playerChips} remaining chips. </br>
            </br>
            Click submit to play another round.`;
  }
  // Scenario 5 - Dealer (index = 1) wins
  else if (scoreArray[0] < scoreArray[1]) {
    return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Dealer's score: ${dealerCardSum} </br>
            </br>
            <b> DEALER WINS! 🥳</b></br>
            </br>
            You have ${playerChips} remaining chips. </br>
              </br>
            Click submit to play another round.`;
  }
  // Scenario 6 - Draw
  else {
    return `<b>🃏THE WINNER IS ... ... 🃏</b></br>
            </br>
            Player's score: ${playerCardSum} </br>
            Dealer's score: ${dealerCardSum} </br>
            </br>
            <b>IT'S A TIE!</b></br>
            </br>
            You have ${playerChips} remaining chips. </br>
              </br>
            Click submit to play another round.`;
  }
};

// HELPER FUNCTION 6 - Reset game to allow player to play another round
var resetGame = function () {
  // Clear all the arrays
  playerCardArray = [];
  dealerCardArray = [];
  compareScoreArray = [];
  chipsBettedInRound = 0;
  //Change mode back to "Intro"
  gameMode = "Intro";
};

// HELPER FUNCTION 7 - Payoff calculation for chips
// Blackjack win (payoff 3:2, i.e. if bet 100, win 150)
// Normal win (payoff (1:1, i.e. if bet 100, win 100))
// to add capital (i.e. chips betted) to winning chip amount
var blackjackWin = function (chipBetted) {
  chipToAdd = chipBetted * 1.5 + chipBetted;
  return chipToAdd;
};

var normalWin = function (chipBetted) {
  chipToAdd = chipBetted * 2;
  return chipToAdd;
};

////////////////////////////////////// MAIN FUNCTION //////////////////////////////////////

// MAIN FUNCTION
var main = function (input) {
  // give shuffled deck --- make it a local varibale within main function --- Weiyu
  // to reset deck for every round
  var gameDeck = giveShuffledDeck();
  // 0. GAME MODE 0 - Intro
  if (gameMode == "Intro" && playerChips > 0) {
    // Control flow - change game mode to betting
    gameMode = gameModePlaceBet;
    return `Welcome! </br> 
            </br>
            You have ${playerChips} chips available to bet. </br>
            </br>
            Please input the number of chips to bet.`;
  }

  // 1. GAME MODE 1 - Allow the player to bet chips
  else if (gameMode == gameModePlaceBet) {
    // assign input to chipsBettedInRound
    chipsBettedInRound = Number(input);
    // Chips betted cannot be more than playerChips and it must be at least 1
    if (chipsBettedInRound > playerChips || chipsBettedInRound < 1) {
      return `Invalid number of chips betted. </br>
              </br>
              Please input a valid number of chips to bet that is within your means. `;
    } else {
      // deduct betted chips to get the remaining chips
      playerChips = playerChips - chipsBettedInRound;
      // Control flow - change game mode to draw random cards
      gameMode = gameModeDrawCards;
      return `${chipsBettedInRound} chips betted for this round. </br>
              </br>
              ${playerChips} chips remaining. </br>
              </br>
              Click submit to continue.`;
    }
  }

  // 2. GAME MODE 2 - Draw random cards for dealer and player using the Make Deck and Shuffle Deck Helper Function
  else if (gameMode == gameModeDrawCards) {
    // assign random cards for player and dealer
    playerCardOne = gameDeck.pop();
    playerCardTwo = gameDeck.pop();
    dealerCardOne = gameDeck.pop();
    dealerCardTwo = gameDeck.pop();

    console.log(playerCardOne, playerCardTwo);
    console.log(dealerCardOne, dealerCardTwo);
    // Control flow - change game mode to check for blackjack
    gameMode = gameModeCheckBlackjack;
    // return output message
    // remove dealerCardOne details
    return `The card deck has been shuffled! </br> 
            </br>
            Player's draw: ${playerCardOne.name} ${playerCardOne.suit} and ${playerCardTwo.name} ${playerCardTwo.suit} </br>
            Dealer's draw: Hidden card and ${dealerCardTwo.name} ${dealerCardTwo.suit}</br>
            </br>
            Click submit button to continue!`;
  }

  // 3. GAME MODE 3 - Check for blackjack
  else if (gameMode == gameModeCheckBlackjack) {
    // Scenarios for blackjack (Ace + 10/Jack/Queen/King)
    // Nested-if Scenario 1 - Player and Dealer draw blackjack (Draw)
    if (
      (playerCardOne.rank == 1 &&
        playerCardTwo.rank >= 10 &&
        dealerCardOne.rank == 1 &&
        dealerCardTwo.rank >= 10) ||
      (playerCardOne.rank >= 10 &&
        playerCardTwo.rank == 1 &&
        dealerCardOne.rank == 1 &&
        dealerCardTwo.rank >= 10) ||
      (playerCardOne.rank == 1 &&
        playerCardTwo.rank >= 10 &&
        dealerCardOne.rank >= 10 &&
        dealerCardTwo.rank == 1) ||
      (playerCardOne.rank >= 10 &&
        playerCardTwo.rank == 1 &&
        dealerCardOne.rank >= 10 &&
        dealerCardTwo.rank == 1)
    ) {
      // Reset game using helper function 6
      resetGame();
      return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
                </br>
                Both Player and Dealer drew blackjack! </br>
                </br>
                <b>IT'S A TIE!</b></br>
                </br>
                You have ${playerChips} remaining chips. </br>
                </br>
                Click submit to play another round.`;
    }
    // Nested-if Scenario 2 - Player draws blackjack (Player wins)
    else if (
      (playerCardOne.rank == 1 && playerCardTwo.rank >= 10) ||
      (playerCardOne.rank >= 10 && playerCardTwo.rank == 1)
    ) {
      // Add chips won
      playerChips = playerChips + blackjackWin(chipsBettedInRound);
      // Reset game using helper function 6
      resetGame();
      return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
              </br>
              Player drew blackjack! </br>
              </br>
              <b>PLAYER WON! 🥳</b></br>
              </br>
              You have ${playerChips} remaining chips. </br>
              </br>
              Click submit to play another round.`;
    }
    // Nested-if Scenario 3 - Dealer draws blackjack (Dealer wins)
    else if (
      (dealerCardOne.rank == 1 && dealerCardTwo.rank >= 10) ||
      (dealerCardOne.rank >= 10 && dealerCardTwo.rank == 1)
    ) {
      // Reset game using helper function 6
      resetGame();
      return `<b>🃏 THE WINNER IS ... ... 🃏</b></br>
              </br>
              Dealer drew blackjack! </br>
              </br>
              <b>DEALER WON! 🥳</b></br>
              </br>
              You have ${playerChips} remaining chips. </br>
              </br>
              Click submit to play another round.`;
    }
    // Nested-if Scenario 4 (else) - No blackjack at first instance
    else {
      // Control flow - change game mode to calculate the sum
      gameMode = gameModeCheckCardSum;
      // Push the player and dealer card rank into array for sum later
      playerCardArray.push(playerCardOne.rank);
      playerCardArray.push(playerCardTwo.rank);
      dealerCardArray.push(dealerCardOne.rank);
      dealerCardArray.push(dealerCardTwo.rank);
      return `Neither the Player nor the Dealer drew blackjack! </br>
              </br>
              Click submit button to continue!`;
    }
  }

  // 4. GAME MODE 4 - Check for the total sum of the cards drawn
  else if (gameMode == gameModeCheckCardSum) {
    // Compute the sum for player and dealer using helper function 4
    playerCardSum = sumOfCardsTest(playerCardArray);
    dealerCardSum = sumOfCardsTest(dealerCardArray);
    // console.log(playerCardSum, dealerCardSum);
    // Control flow - change game mode to ask player for hit/stand
    gameMode = gameModePlayerHitStand;
    return `Player's hand: ${playerCardOne.name} ${playerCardOne.suit} and ${playerCardTwo.name} ${playerCardTwo.suit} </br>
            Dealer's hand: Hidden card and ${dealerCardTwo.name} ${dealerCardTwo.suit}</br>
            </br>
            Current Score: </br>
            Player: ${playerCardSum} </br>
            </br>
            Enter 'hit' or 'stand' to continue.
    `;
  }

  // 5. GAME MODE 5 - Ask if player wishes to draw an additional card
  else if (gameMode == gameModePlayerHitStand) {
    // change the input to lower case
    input = input.toLowerCase();
    // if hit, draw new cards
    if (input == "hit") {
      // Pop card every turn player enter 'hit' --- shifted from game mode 2 --- Weiyu
      playerCardAdditional = gameDeck.pop();
      // Push new card into player array
      playerCardArray.push(playerCardAdditional.rank);
      // Add the rank of the new card into the playerCardSum
      playerCardSum = sumOfCardsTest(playerCardArray);
      // Check if player bust, if yes change game mode -- Weiyu
      if (playerCardSum > 21) {
        // Control flow - change game mode to winning calculation
        gameMode = gameModeWinningCalculation;
        return `Player chose to hit.</br>
                </br>
                Player drew an additional card of ${playerCardAdditional.name} ${playerCardAdditional.suit}.</br>
                </br>
                Player has exceeded 21.</br>
                </br>
                Current Score: </br>
                Player: ${playerCardSum} </br>
                </br>
                Click submit to continue.`;
      }
      return `Player chose to hit.</br>
      </br>
      Player drew an additional card of ${playerCardAdditional.name} ${playerCardAdditional.suit}.</br>
      </br>
      Current Score: </br>
      Player: ${playerCardSum} </br>
      </br>
      Enter 'hit' or 'stand' to continue.`;
    }
    // If input is stand
    else if (input == "stand") {
      // Control flow - change game mode for dealer to hit/stand
      gameMode = gameModeDealerHitStand;
      return `Player chose to stand.</br>
      </br>
      Current Score: </br>
      Player: ${playerCardSum} </br>
      </br>
      Click submit to continue.`;
    }
    // data validation - if not hit or not stand
    else {
      return `Invalid input. Please only enter 'hit' or 'stand'.`;
    }
  }

  // 6. GAME MODE 6 - Dealer to decide hit / stand
  else if (gameMode == gameModeDealerHitStand) {
    // if dealerCardSum <17, draw new card
    if (dealerCardSum < 17) {
      // Pop card every turn dealer 'hit' --- shifted from game mode 2 --- Weiyu
      dealerCardAdditional = gameDeck.pop();
      // Push new card into dealer array
      dealerCardArray.push(dealerCardAdditional.rank);
      // Add the rank of the new card into the playerCardSum
      dealerCardSum = sumOfCardsTest(dealerCardArray);
      // Check if dealer bust, if yes change game mode
      if (dealerCardSum > 21) {
        // Control flow - change game mode to winning calculation
        gameMode = gameModeWinningCalculation;
        return `Dealer chose to hit.</br>
                </br>
                Dealer drew an additional card of ${dealerCardAdditional.name} ${dealerCardAdditional.suit}.</br>
                </br>
                Dealer has exceeded 21.</br>
                </br>
                Total Score: </br>
                Player: ${playerCardSum} </br>
                Dealer: ${dealerCardSum} </br>
                </br>
                Click submit to continue.`;
      }
      return `Dealer chose to hit.</br>
      </br>
      Dealer drew an additional card of ${dealerCardAdditional.name} ${dealerCardAdditional.suit}.</br>
      </br>
      Total Score: </br>
      Player: ${playerCardSum} </br>
      Dealer: ${dealerCardSum} </br>
      </br>
      Click submit to continue.`;
    }
    // if dealerCardSum is 17 or above, dealer will stand
    else {
      // Control flow - change game mode for winning calculation
      gameMode = gameModeWinningCalculation;
      return `Dealer chose to stand.</br>
      </br>
      Total Score: </br>
      Player: ${playerCardSum} </br>
      Dealer: ${dealerCardSum} </br>
      </br>
      Click submit to continue.`;
    }
  }

  // 7. GAME MODE 7 - Dealer to decide hit / stand
  else if (gameMode == gameModeWinningCalculation) {
    // Push the player and dealer card sum to compareScoreArray for comparison
    compareScoreArray.push(playerCardSum);
    compareScoreArray.push(dealerCardSum);
    // Return winner using helper function 5
    var resultOutput = computeWinnerFromScore(compareScoreArray);
    // Reset game using helper function 6
    resetGame();
    return resultOutput;
  }

  // 8. RAN OUT OF CHIPS
  else if (gameMode == "Intro" && playerChips < 1) {
    // Replenish the betting chips
    playerChips = 100;
    return `You have 0 chips available to bet. </br>
            </br>
            You have gone bankrupt! 😢 </br>
            </br>
            Click submit to replenish betting chips.`;
  }
};
