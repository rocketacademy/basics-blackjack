///Helper Functions
//Make a deck of cards
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
    var rankCounter = 2;
    while (rankCounter <= 14) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      var cardScore = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 14) {
        cardName = "ace";
        cardScore = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        cardScore = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardScore = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardScore = 10;
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: cardScore,
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
//Shuffle a deck of cards
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
//Generate a random number ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
//Deal first two cards to player and dealer
var dealFirstTwoCards = function () {
  playerCards.push(shuffledDeck.pop());
  dealerCards.push(shuffledDeck.pop());
  playerCards.push(shuffledDeck.pop());
  dealerCards.push(shuffledDeck.pop());
};
//Function to check for blackjack with an input array of two cards
var checkForBlackJack = function (cardArray) {
  if (
    (cardArray[0].cardName === "ace" &&
      (cardArray[1].cardName === 10 ||
        cardArray[1].cardName === "jack" ||
        cardArray[1].cardName === "queen" ||
        cardArray[1].cardName === "king")) ||
    (cardArray[1].cardName === "ace" &&
      (cardArray[0].cardName === 10 ||
        cardArray[0].cardName === "jack" ||
        cardArray[0].cardName === "queen" ||
        cardArray[0].cardName === "king"))
  ) {
    return "yes";
  }
  return "no";
};
//Function to calculate score
var calculateScore = function (cardArray) {
  var index = 0;
  while (index <= cardArray[cardArray.length]) {
    playerScore = playerScore + cardArray[index].cardScore;
  }
  index += 1;
};
//Function to check if bust
var checkBust = function (score) {
  if (score > 21) {
    return "yes";
  }
  return "no";
};
//Function to display cards
var displayCards = function (cardArray) {
  var outputValue = "";
  var index = 0;
  while (index < cardArray.length) {
    outputValue =
      outputValue +
      `${cardArray[index].cardName} ${cardArray[index].currentSuit}<br>`;
    index += 1;
  }
  return outputValue;
};

///Global Variables
var INTRO_MESSAGE = "INTRO_MESSAGE";
var DEAL_CARDS = "DEAL_CARDS";
var CHECK_FOR_BLACKJACK = "CHECK_FOR_BLACKJACK";
var PLAYER_DECIDE_HIT_OR_STAND = "PLAYER_DECIDE_HIT_OR_STAND";
var CALCULATE_SCORES = "CALCULATE_SCORES";
var gamemode = INTRO_MESSAGE;
var playerCards = [];
var dealerCards = [];
var shuffledDeck = shuffleCards(makeDeck());
var playerScore = 0;
var dealerScore = 0;

var main = function (input) {
  // Display intro message to ask Player to click Submit button to deal cards
  if (gamemode === INTRO_MESSAGE) {
    console.log(`Current Game Mode: ${gamemode}`);
    outputMessage = `Welcome! Click the Submit button below to deal the cards! Good Luck!`;
    gamemode = DEAL_CARDS;
    return outputMessage;
  }
  //Deal cards for Player and Dealer
  if (gamemode === DEAL_CARDS) {
    console.log(`Current Game Mode: ${gamemode}`);
    dealFirstTwoCards();
    console.log(`Player Cards:`);
    console.log(playerCards);
    console.log(`Dealer Cards:`);
    console.log(dealerCards);
    gamemode = CHECK_FOR_BLACKJACK;
  }

  // Check for blackjack
  if (gamemode === CHECK_FOR_BLACKJACK) {
    if (
      checkForBlackJack(dealerCards) === "yes" &&
      checkForBlackJack(playerCards) === "yes"
    ) {
      return "The game is a tie! Both Dealer and Player have Black Jack!!!";
    }
    if (
      checkForBlackJack(dealerCards) === "yes" &&
      checkForBlackJack(playerCards) === "no"
    ) {
      return "Dealer wins with Black Jack!";
    }
    if (
      checkForBlackJack(dealerCards) === "no" &&
      checkForBlackJack(playerCards) === "yes"
    ) {
      return "Player wins with Black Jack!";
    }
    gamemode = CALCULATE_SCORES;
  }
  // Display cards to player
  // The user decides whether to hit or stand, using the submit button to submit their choice.
  if (gamemode === CALCULATE_SCORES) {
    console.log(`Current Game Mode: ${gamemode}`);
    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);
    console.log(`Player Score:${playerScore}`);
    console.log(`Dealer Score:${dealerScore}`);
    if (checkBust(playerScore) === "yes" && checkBust(dealerScore) === "yes") {
      return `Player Cards:<br>${displayCards(
        playerCards
      )}<br>Player Score:${playerScore}<br><br>Dealer Cards:<br>${displayCards(
        dealerCards
      )}<br>Dealer Score:${dealerScoreScore}<br><br>Both Player and Dealer bust!`;
    }
    if (checkBust(playerScore) === "yes" && checkBust(dealerScore) === "no") {
      return `Player Cards:<br>${displayCards(
        playerCards
      )}<br>Player Score:${playerScore}<br><br>Dealer Cards:<br>${displayCards(
        dealerCards
      )}<br>Dealer Score:${dealerScoreScore}<br><br>Player Bust! Dealer Wins!!!`;
    }
    if (checkBust(playerScore) === "no" && checkBust(dealerScore) === "yes") {
      return `Player Cards:<br>${displayCards(
        playerCards
      )}<br>Player Score:${playerScore}<br><br>Dealer Cards:<br>${displayCards(
        dealerCards
      )}<br>Dealer Score:${dealerScoreScore}<br><br>Dealer Bust! Player Wins!!!`;
    }
    if (checkBust(playerScore) === "no" && checkBust(dealerScore) === "no") {
      if (playerScore > dealerScore) {
        return `Player Cards:<br>${displayCards(
          playerCards
        )}<br>Player Score:${playerScore}<br><br>Dealer Cards:<br>${displayCards(
          dealerCards
        )}<br>Dealer Score:${dealerScoreScore}<br><br>Player Wins!!!`;
      }
      if (playerScore < dealerScore) {
        return `Player Cards:<br>${displayCards(
          playerCards
        )}<br>Player Score:${playerScore}<br><br>Dealer Cards:<br>${displayCards(
          dealerCards
        )}<br>Dealer Score:${dealerScoreScore}<br><br>Dealer Wins!!!`;
      }
    }
  }
  // The user's cards are analysed for winning or losing conditions.
  // The computer decides to hit or stand automatically based on game rules.
  // The game either ends or continues.
};
