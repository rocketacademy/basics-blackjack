// Black jack!

// Key setting
// 1. Multiplayers are allowed (All players except player 1 are computers)
// 2. Betting is allowed
// 3. Only 'hit' and 'stand' are actions allowed in this game
// 4. Each player has $100 at the beginning of the game

// In round 0
// Each player put their bet.
// Computer players will randomly bet at any amount within the funds they have in the pocket.

// In round 1
// 2 cards are dealth for players and a dealer.
// The players' two cards are faced up but for dealer only the first card is faced up

// In round N
// Each player can only do one action, either 'hit' or 'stand'
// Dealer will always 'hit' when the current card scores are no greater than 17

// Players will be out of the game when ...
// 1. The player's current card scores are 21 -- out of the game with 1.5X of bet
// 2. The player's current card scores are greater than 21 ("bust") -- out of game with losing bet

// The game will end when ...
// Dealer have card scores over 17
// 1. If it's between 17-21 -- the player who have scores card closest to 21 get 1X of bet while the rest lose money.
// 2. If it's over 21 -- the dealer bust and everyone still in the game get 1X of bet

// Global variables
var gameRound = 0;
var player = 0;
var eachFund = [];
var eachBet = [];
var eachStatus = [];
var dealerFundBalance = 0;
var deck = [];
var eachPlayerCard = [];
var eachPlayerScore = [];
var dealerCard = [];
var dealerScore = 0;

var main = function (input) {
  // Initialize value
  var outputMessage = "";
  // The user input the number of players in the game
  if (player == 0) {
    // Default message
    outputMessage = "Please enter number of players in the game";
    // Check whether the input is number
    if (Number.isInteger(parseInt(input)) == true) {
      // Set the input as the number of players
      player = input;

      for (counter = 0; counter < player; counter += 1) {
        // Players' starting funds
        eachFund.push(100);
        // Player's starting status
        eachStatus.push("current");
      }
      // Output message
      outputMessage = `${player} players in the game! <br>
      Now, let's put your bet`;
    }
    return outputMessage;
  }

  // Round 0: Get the bet by each player
  if (eachBet.length == 0) {
    // Starting output message
    outputMessage = "Now, everyone has put their bet ...";
    // Check whether the input (betting amount) is no greater than fund amount
    if (parseInt(input) <= eachFund[0]) {
      eachBet.push(parseInt(input));
      outputMessage =
        outputMessage +
        "<br><br>" +
        `You bet $${eachBet[0]} out of $${eachFund[0]}`;
    } else {
      outputMessage = `Please bet within what you have; you only have $${eachFund[0]} now.`;
      return outputMessage;
    }
    // The rest of the players get random bet amount within the fund each has
    for (counter = 1; counter < player; counter += 1) {
      var eachPlayerBet = randomNumber(eachFund[counter]);
      eachBet.push(eachPlayerBet);
      outputMessage =
        outputMessage +
        "<br>" +
        `Player (${counter + 1}) bet $${eachBet[counter]} out of $${
          eachFund[counter]
        }`;
    }
    // Ending output message
    outputMessage = outputMessage + "<hr>" + "Press submit to deal the cards";
    // Create a deck
    deck = makeDeck();
    deck = shuffleCards(deck);
    // Show the betting amount by each player
    return outputMessage;
  }

  // Round 1: first two dealth
  if (eachBet.length != 0 && eachPlayerCard.length == 0) {
    // Initialize card dealth for each
    var cardDealth = [];
    outputMessage = `Everyone has two cards on hands of which scores are... <br>`;

    for (counter = 0; counter < player; counter += 1) {
      // Deal two cards each
      cardDealth.push(deck.pop());
      cardDealth.push(deck.pop());
      eachPlayerCard.push(cardDealth);
      // Calculate scores for each player
      eachPlayerScore.push(handScores(cardDealth, false));
      // Output message
      if (counter == 0) {
        outputMessage =
          outputMessage +
          "<br>" +
          `You have ${eachPlayerScore[counter]} scores`;
      } else {
        outputMessage =
          outputMessage +
          "<br>" +
          `Player ${counter + 1} has ${eachPlayerScore[counter]} scores`;
      }

      if (eachPlayerScore[counter] == 21) {
        // Update status to win
        eachStatus[counter] = "win";
        // Get twice of the betting amount
        eachFund[counter] = eachFund[counter] + eachBet[counter] * 2;
        dealerFundBalance = dealerFundBalance - eachBet[counter] * 2;
        // Update output message
        outputMessage =
          outputMessage + ` -- WIN! WITH $${eachBet[counter] * 2} GAINS`;
      }
      // Reinitialize variables to be reused
      cardDealth = [];
    }
    // Dealer dealth two cards
    dealerCard.push(deck.pop());
    dealerCard.push(deck.pop());
    // Calculate dealer scores
    dealerScore = handScores(dealerCard, false);
    // Output message
    outputMessage =
      outputMessage + "<br><br>" + `Dealer has ${dealerScore} scores`;

    // Check whether the game is ended
    if (dealerScore < 17) {
      if (eachStatus[0] == "win") {
        outputMessage =
          outputMessage + "<hr>" + "Press submit to let the game continue.";
      } else {
        outputMessage =
          outputMessage + "<hr>" + "Choose 'hit' or 'stay' for this turn.";
      }
    } else {
      outputMessage = outputMessage + "<hr>" + "Press submit to see the result";
    }
    //Return output message
    return outputMessage;
  }

  // The game continues when dealer score is not over 17
  if (dealerScore < 17) {
    outputMessage = `You ${input} this round`;
    // If you has not busted or won
    if (eachStatus[0] == "current") {
      if (input == "hit") {
        eachPlayerCard[0].push(deck.pop());
        eachPlayerScore[0] = handScores(eachPlayerCard[0], false);
      } else if (input == "stay") {
      } else {
        outputMessage = `Please input only 'hit' or 'stay'`;
        return outputMessage;
      }
      outputMessage =
        outputMessage + "<hr>" + `You have ${eachPlayerScore[0]} scores`;
      // Check 'win' and 'bust'
      if (eachPlayerScore[counter] == 21) {
        // Update status to win
        eachStatus[counter] = "win";
        // Get twice of the betting amount
        eachFund[counter] = eachFund[counter] + eachBet[counter] * 2;
        dealerFundBalance = dealerFundBalance - eachBet[counter] * 2;
        // Update output message
        outputMessage =
          outputMessage + ` -- WIN! WITH $${eachBet[counter] * 2} GAINS`;
      } else if (eachPlayerScore[counter] > 21) {
        eachStatus[counter] = "bust";
        // Get twice of the betting amount
        eachFund[counter] = eachFund[counter] - eachBet[counter];
        dealerFundBalance = dealerFundBalance + eachBet[counter];
        // Update output message
        outputMessage =
          outputMessage + ` -- BUST! WITH $${eachBet[counter]} LOSS`;
      }
    }

    // Randomly hit or stay for current players
    for (counter = 1; counter < player; counter += 1) {
      if (eachStatus[counter] == "current") {
        var action = randomNumber(2) - 1; // 0 = "hit", 1 = "stay"
        if (action == 0) {
          eachPlayerCard[counter].push(deck.pop());
          eachPlayerScore[counter] = handScores(eachPlayerCard[counter], false);
        }
        outputMessage =
          outputMessage +
          "<br>" +
          `Player ${counter + 1} has ${eachPlayerScore[counter]} scores`;
        // Check 'win' and 'bust'
        if (eachPlayerScore[counter] == 21) {
          // Update status to win
          eachStatus[counter] = "win";
          // Get twice of the betting amount
          eachFund[counter] = eachFund[counter] + eachBet[counter] * 2;
          dealerFundBalance = dealerFundBalance - eachBet[counter] * 2;
          // Update output message
          outputMessage =
            outputMessage + ` -- WIN! WITH $${eachBet[counter] * 2} GAINS`;
        } else if (eachPlayerScore[counter] > 21) {
          eachStatus[counter] = "bust";
          // Get twice of the betting amount
          eachFund[counter] = eachFund[counter] - eachBet[counter];
          dealerFundBalance = dealerFundBalance + eachBet[counter];
          // Update output message
          outputMessage =
            outputMessage + ` -- BUST! WITH $${eachBet[counter]} LOSS`;
        }
      }
    }

    // Hit for dealer
    dealerCard.push(deck.pop());
    dealerScore = handScores(dealerCard, false);
    outputMessage =
      outputMessage + "<br><br>" + `Dealer has ${dealerScore} scores`;

    // Check whether the game is ended
    if (dealerScore < 17) {
      if (eachStatus[0] == "win") {
        outputMessage =
          outputMessage + "<hr>" + "Press submit to let the game continue.";
      } else {
        outputMessage =
          outputMessage + "<hr>" + "Choose 'hit' or 'stay' for this turn.";
      }
    } else {
      outputMessage = outputMessage + "<hr>" + "Press submit to see the result";
    }
    //Return output message
    return outputMessage;
  }
  // The game is ended
  // The dealer bust
  if (dealerScore > 21) {
    outputMessage =
      "The dealer bust! The game is over with 1X gains for everyone.";
    for (counter = 0; counter < player; counter += 1) {
      if (eachStatus[counter] == "current") {
        // Gain / Loss
        eachFund[counter] = eachFund[counter] + eachBet[counter];
        dealerFundBalance = dealerFundBalance - eachBet[counter];
        // Output message
        if (counter == 0) {
          outputMessage =
            outputMessage + "<br>" + `You gained $${eachBet[counter]}`;
        } else {
          outputMessage =
            outputMessage +
            "<br>" +
            `Player ${counter + 1} gained $${eachBet[counter]}`;
        }
      }
    }
  } else {
    outputMessage = "The game is over ..." + "<br>";
    // Recalculate scores
    for (counter = 0; counter < player; counter += 1) {
      eachPlayerScore[counter] = handScores(eachPlayerCard[counter], true);
    }
    // Calculate the highest value
    var highestScore = [];
    highestScore = maxArray(eachPlayerScore);
    console.log(highestScore);
    // the player who have the closest score to 21 get 1X of bet
    for (counter = 0; counter < player; counter += 1) {
      if (highestScore[counter] == 0 && eachStatus[counter] == "current") {
        // Gain / Loss
        eachFund[counter] = eachFund[counter] + eachBet[counter];
        dealerFundBalance = dealerFundBalance - eachBet[counter];
        // Output message
        if (counter == 0) {
          outputMessage =
            outputMessage + "<br>" + `You gained $${eachBet[counter]}`;
        } else {
          outputMessage =
            outputMessage +
            "<br>" +
            `Player ${counter + 1} gained $${eachBet[counter]}`;
        }
      } else if (
        highestScore[counter] != 0 &&
        eachStatus[counter] == "current"
      ) {
        // Gain / Loss
        eachFund[counter] = eachFund[counter] - eachBet[counter];
        dealerFundBalance = dealerFundBalance + eachBet[counter];
        // Output message
        if (counter == 0) {
          outputMessage =
            outputMessage + "<br>" + `You lost $${eachBet[counter]}`;
        } else {
          outputMessage =
            outputMessage +
            "<br>" +
            `Player ${counter + 1} lost $${eachBet[counter]}`;
        }
      }
    }
    outputMessage = outputMessage + "<hr>" + "Put your bet for the next round";
    // Initialize values
    eachBet = [];
    eachStatus = [];
    deck = [];
    eachPlayerCard = [];
    eachPlayerScore = [];
    dealerCard = [];
    dealerScore = 0;

    return outputMessage;
  }
};

// Helper function
// Random number
var randomNumber = function (max) {
  var randomWithinMax = 0;
  // Get random number between 1 and max
  return Math.floor(Math.random() * max) + 1;
};
// Create a new deck
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

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = randomNumber(cardDeck.length) - 1;
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return deck;
};

var handScores = function (handCard, gameEnd) {
  var aceCard = [];
  var nonAceCard = [];
  var totalScore = 0;
  // Split cards on hand into "ace" and "non-ace"
  for (counterCard = 0; counterCard < handCard.length; counterCard += 1) {
    console.log(handCard[counterCard].rank);
    if (handCard[counterCard].rank == 1) {
      aceCard.push(handCard[counterCard]);
    } else {
      nonAceCard.push(handCard[counterCard]);
    }
  }
  // Calculate a summation of non-ace
  for (counterCard = 0; counterCard < nonAceCard.length; counterCard += 1) {
    if (nonAceCard[counterCard].rank < 10) {
      totalScore = totalScore + nonAceCard[counterCard].rank;
    } else {
      totalScore = totalScore + 10;
    }
  }
  // Calculate a summation of ace
  // For normal players ace will count as 1 unless it makes the score 21
  for (counterCard = 0; counterCard < aceCard.length; counterCard += 1) {
    // If there is more than 1 ace, then only one ace is possible to count as 11
    if (counterCard == aceCard.length - 1) {
      // The player or dealer should count ace as 11 only when it makes
      if (totalScore == 10) {
        totalScore = totalScore + 11;
      } else if (gameEnd == true && totalScore < 10) {
        totalScore = totalScore + 11;
      } else {
        totalScore = totalScore + 1;
      }
    } else {
      totalScore = totalScore + 1;
    }
  }
  return totalScore;
};

// Rank array
var maxArray = function (array) {
  var ranks = [];
  var rank = 0;
  for (i = 0; i < array.length; i += 1) {
    // Find the rank of each element
    for (j = 0; j < array.length; j += 1) {
      if (array[i] < array[j]) {
        rank += 1;
      }
    }
    // Push the rank of each element into an array
    ranks.push(rank);
    // Initialize 'rank' for next elelment
    rank = 0;
  }
  return ranks;
};
