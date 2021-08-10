// Generate new Deck (Copy 10.2 code)
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
      var cardPoints = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        cardPoints = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardPoints = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardPoints = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: cardPoints,
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

//Make Deck
var newDeck = shuffleCards(makeDeck());

//Game Rules
var gameOver = false;
var scoreLimit = 21;
var gameMode = `startHand`;

//Bust at over 21 points
if (scoreLimit > 21) {
  gameOver = true;
}
// var gameCheck = function(){
//   (if hand>scoreLimit){
//     return gameOver = true;
//   }
// }
//BlackJack

//Convert to output (Copied from reference)
var convertHandToString = function (hand) {
  return `[${hand.map((card) => card.name)}]`;
};

//String value (Copied from reference)
var getDefaultOutput = function () {
  return `Player has hand ${convertHandToString(
    playerHand
  )} with sum ${getHandSum(playerHand)}. <br>
    Computer has hand ${convertHandToString(
      computerHand
    )} with sum ${getHandSum(computerHand)}.`;
};

//Combine hand score (Copied from reference)
var getHandSum = function (hand) {
  var numAcesInHand = 0;
  var score = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currCard = hand[i];
    // If card rank is 2-10, value is same as rank
    if (currCard.rank === 1) {
      numAcesInHand += 1;
      score += 11;
    } else currCard.rank >= 2 && currCard.rank >= 13;
    score += hand[i].points;
  }
  // If sum is greater than sum limit and hand contains Aces, convert Aces from value of 11
  // to value of 1, until sum is less than or equal to sum limit or there are no more Aces.
  if (score > scoreLimit && numAcesInHand > 0) {
    for (let i = 0; i < numAcesInHand; i += 1) {
      sum -= 10;
      // If the sum is less than sumLimit before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (score <= scoreLimit) {
        break; //Ends the loop immediately
      }
    }
  }
  return score;
};

var main = function (input) {
  //Start game
  if (gameMode == `startHand`) {
    var compHand = [newDeck.pop(), newDeck.pop()];
    var playerHand = [newDeck.pop(), newDeck.pop()];
    //Combine Player hands
    var playerScore = getHandSum(playerHand);
    console.log(`Player Score: ${playerScore}`);
    //Combine Computer hands
    var compScore = getHandSum(compHand);
    console.log(`Comp Score: ${compScore}`);
  }
  //Hit until 21
  //Compare hands and announce winner
  if (compScore > playerScore) {
    myOutputValue = `Computer had ${compScore} points. Player had ${playerScore} points.<br> Player loses.`;
    return myOutputValue;
  } else if (compScore < playerScore) {
    myOutputValue = `Computer had ${compScore} points. Player had ${playerScore} points.<br> Player wins.`;
    return myOutputValue;
  } else {
    myOutputValue = `Computer had ${compScore} points. Player had ${playerScore} points.<br> It's a tie.`;
    return myOutputValue;
  }
  // Construct an output string to communicate which cards were drawn
  var myOutputValue = `Game Error. Restart game`;
  return myOutputValue;
};
