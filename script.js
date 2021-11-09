/**
 * Create a standard 52-card deck
 */
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
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
      // Override the face ranks for Blackjack rules
      if (card.rank >= 11 && card.rank <= 13) {
        card.rank = 10;
      }
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
/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

/**
 * Deal Cards to the two players (think about how it can be modified for x players - store players in an array then loop for array length of players. Also think about how one deal card function can serve all purposes - deal 2 cards when its first turn meaning card array length is = 0)
 */
var dealCards = function (hand1, hand2) {
  // Check if first deal - can i run a function that takes 2 parameters on only 1 parameter - i want to have a universal deal function
  if (hand1.length < 1 && hand2.length < 1) {
    var cardsDrawn = 0;
    while (cardsDrawn < 2) {
      var firstUserCardDraw = deck.pop();
      hand1.push(firstUserCardDraw);
      var firstCompCardDraw = deck.pop();
      hand2.push(firstCompCardDraw);
      cardsDrawn = cardsDrawn + 1;
    }
  }
  // do I need to return anything here? how do i return both hand1 and hand2 - confused about what return does
};

/**
 * Calculate Hand Scores
 */
var calculateHandScore = function (hand) {
  var handIndex = 0;
  var handScore = 0;
  while (handIndex < hand.length) {
    var handScore = handScore + Number(hand[handIndex].rank);
    handIndex = handIndex + 1;
  }
  //using some to trigger conditional ace value change - unsure if totally correct
  if (hand.some((card) => card.name === "Ace")) {
    while (handScore <= blackjack - 10) {
      handScore = handScore + 10;
    }
  }
  return handScore;
};

/**
 * Wordify a hand - ideally remove the comma from the last card
 */
var expressHandInWords = function (hand) {
  var handIndex = 0;
  var wordifiedHand = "";
  // can I use the same handIndex var here?
  while (handIndex < hand.length) {
    var wordifiedHand = wordifiedHand + `${hand[handIndex].name} of ${hand[handIndex].suit} ,`;
    handIndex = handIndex + 1;
  }
  return wordifiedHand;
};

/**
 * Output the results - do i need to put all the parameters in the function definition if the name of the vars are all the same as in main?
 */
var showTheResults = function (userScore, computerScore, userHand, computerHand) {
  var result = "";
  if (userScore == computerScore || (userScore == blackjack && computerScore == blackjack) || (userScore > blackjack && computerScore > blackjack)) {
    console.log("It's a tie:");
    result = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br>It is a tie!`;
  } else if (userScore == blackjack || computerScore == blackjack) {
    console.log("Somone got BJ");
    if (userScore == blackjack) {
      console.log("User got BJ");
      result = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br>Player wins!`;
    } else {
      console.log("Computer got BJ");
      result = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br>Dealer wins!`;
    }
  } else {
    if ((userScore < blackjack && computerScore > blackjack) || (userScore < blackjack && computerScore < blackjack && userScore > computerScore)) {
      console.log("User won on high card");
      result = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br>Player wins!`;
    } else {
      console.log("Computer won on high card");
      result = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br>Dealer wins!`;
    }
  }
  return result;
};

// Grab userName from embedded js in index (nicer ux this way)
var userName = yourName;

//Record game mode
var gameMode = "InitialDeal";

//String constant variable names
var hit = "hit";
var stand = "stand";
var blackjack = Number(21);
var dealerThreshold = Number(17);

//Initialise the number of wins, losses and draws (haven't done this yet)
var numberUserWins = 0;
var numberCompWins = 0;
var numberTies = 0;

//Initialise the arrays to store hands and scores
var userHand = [];
var computerHand = [];
var userScore = 0;
var computerScore = 0;

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

var main = function (input) {
  var myOutputValue = "";

  if (gameMode == "InitialDeal") {
    dealCards(userHand, computerHand);
    console.log("User Initial Deal:", userHand);
    console.log("Computer Initial Deal:", computerHand);
    var userScore = calculateHandScore(userHand);
    var computerScore = calculateHandScore(computerHand);
    console.log("User Score:" + userScore);
    console.log("Computer Score:" + computerScore);
    if (userScore < blackjack) {
      gameMode = "PlayerChoose";
      console.log(`User Score < Blackjack, game mode is ${gameMode}`);
      myOutputValue = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br> Do you want to hit or stand? Type hit or stand.`;
    } else if (userScore == blackjack) {
      gameMode = "DealerChoose";
      console.log(`User Score = Blackjack, game mode is ${gameMode}`);
      myOutputValue = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br> Black Jack! Click submit for dealer's turn.`;
    }
  } else if (gameMode == "PlayerChoose") {
    if (input == "hit") {
      userHand.push(deck.pop());
      userScore = calculateHandScore(userHand);
      computerScore = calculateHandScore(computerHand);
      console.log("User Chose Hit:", userHand);
      if (userScore < blackjack) {
        //cannot use userScore/computerScore varaible to dynamically keep track of score without reassigning it everytime?
        myOutputValue = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br> Do you want to hit or stand?`;
      } else if (userScore > blackjack) {
        myOutputValue = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br> You bust! Click submit for dealer's turn.`;
        gameMode = "DealerChoose";
        console.log(`User Chose Hit, game mode is ${gameMode}`);
      } else {
        myOutputValue = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br> Black Jack! Click submit for dealer's turn.`;
        gameMode = "DealerChoose";
        console.log(`User Chose Hit, game mode is ${gameMode}`);
      }
    } else if (input == "stand") {
      userScore = calculateHandScore(userHand);
      computerScore = calculateHandScore(computerHand);
      gameMode = "DealerChoose";
      console.log("User Chose Stand:", userHand);
      console.log(`User chose stand, game mode is ${gameMode}`);
      myOutputValue = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br> You chose to stand. Click submit for dealer's turn.`;
    }
  } else if (gameMode == "DealerChoose") {
    userScore = calculateHandScore(userHand);
    computerScore = calculateHandScore(computerHand);
    if (computerScore < dealerThreshold && computerScore < userScore) {
      console.log("Dealer Score is Less than threshold and less than user");
      // the dealer strategy is to hit as many times until reach 17 then stop only if score less than user
      while (computerScore < dealerThreshold) {
        computerHand.push(deck.pop());
        console.log("Dealer Hit", computerHand);
        computerScore = calculateHandScore(computerHand);
      }
      myOutputValue = `Player hand (${userScore}): ${expressHandInWords(userHand)} <br> Dealer hand (${computerScore}): ${expressHandInWords(computerHand)} <br> Dealer hit! Click submit for the final result.`;
    } else if (computerScore >= dealerThreshold || computerScore > userScore) {
      console.log("Dealer score is more than or equal to threshold or more than user");
      userScore = calculateHandScore(userHand);
      computerScore = calculateHandScore(computerHand);
      myOutputValue = showTheResults(userScore, computerScore, userHand, computerHand);
      //restart game
      gameMode = "InitialDeal";
      userHand = [];
      computerHand = [];
      userScore = 0;
      computerScore = 0;
      deck = shuffleCards(makeDeck());
    }
  }

  return myOutputValue;
};
