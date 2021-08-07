//TASK LIST:
//1. To include zero scoring bets situations (what if player 1 has 0 points left?), how to leave him out.
//2. To allow player to decide Ace to be 1 or 11

var gameMode = "initial"; //Initialize global variable gameMode
var totalPlayers = 0;
var playerPool = []; //Initialize an array of players
var cardDeck = []; //Initialize an array of card decks
var dealerCards = [];
var dealTRank = 0;
var playerIndex = 0;
var state = 0;
var cardDeck2 = [];
var currentIndex = 0;
var ongoingGame = 0; //State for logging ongoing game
var contValue = 0; //Global variable for continue value

var main = function (input) {
  if (gameMode == "initial") {
    if (Number.isInteger(Number(input)) && Number(input) != 0) {
      //Error handling
      totalPlayers = Number(input);
      playerPool = makePlayers(totalPlayers);
      console.log(playerPool);
      gameMode = "betTime"; //Change state
      return `You have selected ${input} number of Players. 
      <br>
      <br>
      Click "Submit" to continue.`;
    } else {
      return `Error! Please insert an integer value more than zero for the number of Players`;
    }
  }

  if (gameMode == "betTime") {
    //Players to show their bets
    console.log([currentIndex, state]);
    while (currentIndex < totalPlayers && state == 0) {
      //question
      state = 1;
      return `${playerPool[currentIndex].name},it's your turn to place your bets! Click 'Submit' to proceed.`;
    }
    while (currentIndex < totalPlayers && state == 1) {
      //answer
      var maxPoints = playerPool[currentIndex].score;
      if (playerPool[currentIndex].score == 0) {
        currentIndex += 1; //increment to next player
        return `Sorry ${
          playerPool[currentIndex - 1].name
        }, you have 0 points left, please sit out.`;
      } else if (
        Number.isInteger(Number(input)) &&
        Number(input) != 0 &&
        Number(input) <= maxPoints
      ) {
        var playerBet = Number(input); //player's bet
        playerPool[currentIndex].score =
          playerPool[currentIndex].score - playerBet; //reduce total points
        state = 0; //reset to question
        playerPool[currentIndex].bet = playerBet; //record round bet
        currentIndex += 1; //increment to next player
        return `${
          playerPool[currentIndex - 1].name
        },you have bet ${playerBet} points in this round!`;
      } else {
        return `Error! Please place bets in terms of integers! Your maximum bet is ${maxPoints}`;
      }
    }
    //*Note: At betTime remember to splitce from non players.Check there is at least 1 player, playable; drop the rest out (search for zero)
    gameMode = "init_round";
    return "Game Start!";
  }

  if (gameMode == "init_round") {
    //Every start of the round, need to shuffle the cards
    cardDeck = makeDeck();
    cardDeck = blackJackCards(cardDeck);
    cardDeck = shuffleCards(cardDeck);
    console.log(cardDeck);
    //Distribute 2 Cards to Dealer
    dealerObj = createDealer();
    var [dealerCard, cardDeck] = allocateCard(cardDeck);
    dealerObj.cards.push(dealerCard); //1st Card
    [dealerCard, cardDeck] = allocateCard(cardDeck);
    dealerObj.cards.push(dealerCard); //2nd Card
    console.log(dealerObj.cards);
    var dealTRank = calTotalRank(dealerObj.cards);
    console.log(`Dealer:${dealTRank}`);
    dealerObj.cardValue = dealTRank;
    //Distribute 2 Cards to Players
    currentIndex = 0;
    while (currentIndex < totalPlayers) {
      //Go round the table give 2 cards
      var playerCard = 0;
      [playerCard, cardDeck] = allocateCard(cardDeck); //1st Card
      playerPool[currentIndex].cards.push(playerCard);
      [playerCard, cardDeck] = allocateCard(cardDeck); //2nd Card
      playerPool[currentIndex].cards.push(playerCard);
      var playerTRank = calTotalRank(playerPool[currentIndex].cards); //calculate total rank for this round
      playerPool[currentIndex].cardValue = playerTRank;
      playerPool[currentIndex].outcome = rankComparison(playerTRank, dealTRank);
      console.log(`Player: ${playerTRank}`);
      console.log(`Dealer: ${dealTRank}`);
      console.log(`Outcome: ${playerPool[currentIndex].outcome}`);
      currentIndex += 1;
    }
    gameMode = "hitStand";
    console.log(cardDeck.length);
    console.log(cardDeck);
    cardDeck2 = cardDeck;
    return `${handSummary(
      dealerObj.cards,
      playerPool
    )}. <br> Press 'Submit' to move on to hit/stand. Let's start with Player 1`;
  }

  if (gameMode == "hitStand") {
    console.log(state);
    console.log(cardDeck2.length);
    console.log(`Player Index: ${playerIndex}`);
    if (playerIndex < totalPlayers) {
      if (state == 0) {
        state = 1; //Question
        return `${handSummary(dealerObj.cards, playerPool)}<br>${
          playerPool[playerIndex].name
        }, do you hit/stand?`;
      }
      if (["hit", "stand"].includes(input) && state == 1) {
        //Response
        //Go round the table ask hit/stand
        if (input == "hit") {
          //get another card
          [playerCard, cardDeck2] = allocateCard(cardDeck2);
          playerPool[playerIndex].cards.push(playerCard);
          var playerTRank = calTotalRank(playerPool[playerIndex].cards); //calculate total rank for this round
          playerPool[playerIndex].cardValue = playerTRank;
          console.log([playerTRank, dealerObj.cardValue]);
          playerPool[playerIndex].outcome = rankComparison(
            playerTRank,
            dealerObj.cardValue
          );
          console.log(playerPool[playerIndex].outcome);
          return ` ${handSummary(dealerObj.cards, playerPool)} <br> ${
            playerPool[playerIndex].name
          }, do you hit/stand?`;
        }
        if (input == "stand") {
          playerPool[playerIndex].state = "stand";
          playerIndex += 1; //Move to next player
          state = 0; //Ask next player a question
          return `${handSummary(dealerObj.cards, playerPool)} <br> ${
            playerPool[playerIndex - 1].name
          }: ${input}! Moving on...`;
        }
        return `${handSummary(dealerObj.cards, playerPool)}<br>${
          playerPool[playerIndex].name
        }: ${input}!`;
      } else {
        return `${handSummary(
          dealerObj.cards,
          playerPool
        )}<br> Please key in 'hit' or 'stand' only.`;
      }
    }
    if (playerIndex == totalPlayers) {
      gameMode = "Finish"; //switch to ending game mode
      if (dealerObj.cardValue < 16) {
        //draw another card
        [dealerCard, cardDeck2] = allocateCard(cardDeck2);
        dealerObj.cards.push(dealerCard); //1st Card
        dealTRank = calTotalRank(dealerObj.cards);
        dealerObj.cardValue = dealTRank; //updates dealer's total rank
        return `${handSummary(
          dealerObj.cards,
          playerPool
        )} <br> Dealer score is <16. Dealer draws another card. Time to reveal the results...Press submit to reveal final score!`;
      } else {
        return "Time to reveal the results!`";
      }
    }
  }

  if (gameMode == "Finish") {
    cardDeck2 = []; //reset global variables
    cardDeck = []; //reset global variables
    currentIndex = 0; //reset global variables
    playerIndex = 0; //reset global variables
    while (currentIndex < totalPlayers) {
      //update results
      playerPool[currentIndex].outcome = rankComparison(
        playerPool[currentIndex].cardValue,
        dealerObj.cardValue
      );
      console.log(playerPool[currentIndex].outcome);
      currentIndex += 1;
    }
    currentIndex = 0;
    while (currentIndex < totalPlayers) {
      //update final points
      if (playerPool[currentIndex].outcome == "win") {
        //update final points. earn 2 times bet.
        playerPool[currentIndex].score =
          playerPool[currentIndex].score + 2 * playerPool[currentIndex].bet;
      } else if (playerPool[currentIndex].outcome == "win") {
        //update final points. no points lost.
        playerPool[currentIndex].score =
          playerPool[currentIndex].score + playerPool[currentIndex].bet;
      }
      //else do nothing, points already deducted
      currentIndex += 1;
    }
    currentIndex = 0; //reset global variables
    gameMode = "RESTART";
    var scores = scoreBoard(playerPool);
    var finalResults = handSummary(dealerObj.cards, playerPool);
    return `${finalResults} <br> Happy with the outcome? Key in the number of players to play again! <br> Press 'r' to restart or click 'Submit' to continue. <br> ${scores}`;
  }

  if (gameMode == "RESTART") {
    if (input.toLowerCase() == "r") {
      playerPool = []; //start global variables
      gameMode = "initial"; //restart game to betting
      return "Restart game!";
    } else {
      currentIndex = 0;
      while (currentIndex < totalPlayers) {
        //remove all the cards on hand
        playerPool[currentIndex].cards = [];
        playerPool[currentIndex].cardValue = 0;
        currentIndex += 1;
      }
      currentIndex = 0;
      gameMode = "betTime"; //continue game
      return "Next round!";
    }
  } else {
    return "ERROR!";
  }
};

/////////////////////////////////////////////////////
///// FUNCTIONS
/////////////////////////////////////////////////////
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

      if (currentSuit === "hearts") {
        var emojiSuit = "♥️";
      } else if (currentSuit === "diamonds") {
        var emojiSuit = "♦️";
      } else if (currentSuit === "spades") {
        var emojiSuit = "♠️";
      } else if (currentSuit === "clubs") {
        var emojiSuit = "♣️";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        emojiSuit: emojiSuit,
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

var blackJackCards = function (deckCards) {
  var currentIndex = 0;
  while (currentIndex < deckCards.length) {
    if (["jack", "queen", "king"].includes(deckCards[currentIndex].name)) {
      deckCards[currentIndex].rank = 10; //reset all to rank 10
    }
    currentIndex += 1;
  }
  return deckCards;
};

var allocateCard = function (cardDeck) {
  cardObj = cardDeck[cardDeck.length - 1]; //picking the last card
  cardDeck.pop(); //Removes the last card
  return [cardObj, cardDeck]; //returns the card drawn and remaining cardDeck
};

//This function createst the number of players as objects to track their existing game scores/cash-in hand
var makePlayers = function (numPlayers) {
  // Create a new card with the current name, suit, and rank
  var playerPool = []; //Initialize players array
  var rankCounter = 1;
  while (rankCounter <= numPlayers) {
    playerName = `Player ${rankCounter}`; //No name initialize
    totalPoints = 100; //Initial total number of points
    cardsOnHand = []; //Unknown array of cards on hand in this round
    currentValue = 0; //Unknown points in this round
    currentOutcome = "";
    onOrOff = "hit";
    betValue = 0; //Initialize bet value
    var player = {
      name: playerName, //Player Stats: player's name
      score: totalPoints, //Player Stats: points on hand
      cards: cardsOnHand, //Current Round:array of cards on hand
      cardValue: currentValue, //Current Round: total card value
      outcome: currentOutcome, //Current Round: Lose or Win
      state: onOrOff, //Current Round: Hit or stand
      bet: betValue, //Current Round: Bet value
    };
    playerPool.push(player); //Creating the list of player objects
    rankCounter += 1;
  }
  return playerPool;
};

var createDealer = function () {
  playerName = `Dealer`; //No name initialize
  totalPoints = 100000; //Dealer has a tone of points
  cardsOnHand = []; //Unknown array of cards on hand in
  var dealer = {
    name: playerName, //Player Stats: player's name
    score: totalPoints, //Player Stats: points on hand
    cards: cardsOnHand, //Current Round:array of cards on hand
    cardValue: currentValue, //Current Round: Total card value
    outcome: currentOutcome, //Current Round: Lose or Win
  };
  return dealer; //returns a dealer object
};

var rankComparison = function (userRank, dealRank) {
  if (userRank > dealRank) {
    return "win"; //user wins!
  } else if (userRank == dealRank) {
    return "draw"; //draw!
  } else {
    return "lose"; //user loses!
  }
};

var cardString = function (cardObj) {
  return `${cardObj["name"]} of ${cardObj.suit}`;
};

var calTotalRank = function (cardArray) {
  var currentIndex = 0;
  var totalRank = 0;
  while (currentIndex < cardArray.length) {
    totalRank = totalRank + cardArray[currentIndex].rank;
    currentIndex += 1;
  }
  if (totalRank > 21) {
    totalRank = -1; //Lose!
  }
  return totalRank;
};

var handSummary = function (dealerCards, playerPool) {
  var currentIndex = 0;
  var playerHand = "";
  var dealerHand = "";
  var cardIndex = 0;
  dealerHand = dealerHand + "Dealer: ";

  while (cardIndex < dealerCards.length) {
    cardObj = dealerCards[cardIndex];
    dealerHand = dealerHand + `${cardObj.name} ${cardObj.emojiSuit}, `;
    cardIndex += 1;
  }
  dealerHand = dealerHand.slice(0, -2);

  while (currentIndex < playerPool.length) {
    var cardIndex = 0;
    var cardString = "";
    playerHand = playerHand + playerPool[currentIndex].name + ": ";
    while (cardIndex < playerPool[currentIndex].cards.length) {
      cardObj = playerPool[currentIndex].cards[cardIndex];
      cardString = cardString + `${cardObj.name} ${cardObj.emojiSuit}, `;
      cardIndex += 1;
    }
    cardString =
      cardString.slice(0, -2) + ". Result:" + playerPool[currentIndex].outcome;
    playerHand = playerHand.slice(0, -1) + cardString + "<br>";
    currentIndex += 1;
  }
  return dealerHand + "<br><br>" + playerHand;
};

var scoreBoard = function (playerArray) {
  var scores = "<br> ============== <br> Leaderboard <br>==============<br>";
  var indexNumber = 0;
  while (indexNumber < playerArray.length) {
    scores =
      scores +
      `${playerArray[indexNumber].name}: ${playerArray[indexNumber].score} Points <br>`;
    indexNumber += 1;
  }

  return scores;
};
