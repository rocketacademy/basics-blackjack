// GLOBAL VARIABLES //
var gameMode = "game start";
var playerHand = [];
var comHand = [];

// HELPER FUNCTIONS //

// Makes a deck with card properties - name, suit, score, rank
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["❤", "♦", "♣", "♠"];

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
      // By default, the card name is the same as rankCounter.
      // The card score is same as rank counter.
      var cardName = rankCounter;
      var cardScore = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      // If rank is 1, 11, 12, or 13, set the card score accordingly
      if (cardName == 1) {
        cardName = "ace";
        cardScore = [1, 11];
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
        score: cardScore,
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

// Deck of cards //
var mainDeck = shuffleCards(makeDeck());

// Take Card //
var drawCardFromDeck = function (deck) {
  return deck.pop();
};

// Compare hands //
var compareHands = function (playerHand, comHand) {
  // check for draw --> blackjack --> sum of cards //
  if (sumCards(playerHand) == sumCards(comHand)) {
    return "Its a draw!";
  } else if (sumCards(playerHand) == 21) {
    return "Its a blackjack for player!";
  } else if (sumCards(comHand) == 21) {
    return "Its a blackjack for computer!";
  } else if (sumCards(playerHand) > sumCards(comHand)) {
    return "Player wins!";
  } else if (sumCards(playerHand) < sumCards(comHand)) {
    return "Computer wins!";
  }
};

// Sum cards in hand //
var sumCards = function (hand) {
  var maxScore = 0;
  var minScore = 0;
  var counter = 0;
  while (counter < hand.length) {
    if (hand[counter].rank == 1) {
      maxScore += hand[counter].score[1];
      minScore += hand[counter].score[0];
      counter += 1;
    } else {
      maxScore += hand[counter].score;
      minScore += hand[counter].score;
      counter += 1;
    }
  }
  // checks for exploded hand, return lowest hand //
  if (maxScore <= 21) {
    return maxScore;
  } else {
    return minScore;
  }
};

var main = function (input) {
  if (gameMode == "game start") {
    gameMode = "draw cards";
    return "Please press continue to start game";
  }
  if (gameMode == "draw cards") {
    var playerHighestScore = 0;
    var comHighestScore = 0;

    // draw cards for player then computer
    playerHand.push(drawCardFromDeck(mainDeck));
    playerHand.push(drawCardFromDeck(mainDeck));
    comHand.push(drawCardFromDeck(mainDeck));
    comHand.push(drawCardFromDeck(mainDeck));

    // gets the highest score for each hand
    playerHighestScore = sumCards(playerHand);
    comHighestScore = sumCards(comHand);
    gameMode = "compare cards";
    console.log(playerHighestScore);
    console.log(playerHand);
    console.log(comHand);
    return (
      "Player hand: " +
      playerHand[0].name +
      playerHand[0].suit +
      " , " +
      playerHand[1].name +
      playerHand[1].suit +
      "<br><br>Your highest possible score is " +
      playerHighestScore
    );
  }
  if (gameMode == "compare cards") {
    gameMode = "restart game?";
    console.log(playerHand);
    console.log(comHand);
    return (
      "Comparing cards... Math is tough...<br><br>" +
      "Player hand: " +
      playerHand[0].name +
      playerHand[0].suit +
      " and " +
      playerHand[1].name +
      playerHand[1].suit +
      "<br><br>" +
      "Dealer hand: " +
      comHand[0].name +
      comHand[0].suit +
      " and " +
      comHand[1].name +
      comHand[1].suit +
      "<br><br>" +
      compareHands(playerHand, comHand) +
      "<br><br> If you wish to restart game, enter yes. Otherwise, ignore this message..."
    );
  }
  if (gameMode == "restart game?") {
    if (input == "yes") {
      gameMode = "game start";
      playerHand = [];
      comHand = [];
      mainDeck = shuffleCards(makeDeck());
      return "Let's go for another! Hit submit to reshuffle deck!";
    } else {
      return "Thanks for playing!";
    }
  }
};
