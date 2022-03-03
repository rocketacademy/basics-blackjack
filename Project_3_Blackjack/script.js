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
        cardName = "Ace";
        cardScore = [1, 11];
      } else if (cardName == 11) {
        cardName = "🧙‍♂️ Jack ";
        cardScore = 10;
      } else if (cardName == 12) {
        cardName = "👸 Queen ";
        cardScore = 10;
      } else if (cardName == 13) {
        cardName = "🤴 King ";
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
    return "Its a draw!🤞";
  } else if (sumCards(playerHand) == 21) {
    return "Its a blackjack for player!😘";
  } else if (sumCards(comHand) == 21) {
    return "Its a blackjack for computer!😢";
  } else if (sumCards(playerHand) > sumCards(comHand)) {
    return "Player wins!😆";
  } else if (sumCards(playerHand) < sumCards(comHand)) {
    return "Computer wins!😒";
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
  // 1. If over min score, hand exploded
  // 2. If maxscore <= 21, return highest
  // 3. Otherwise, return lowest score
  if (minScore > 21) {
    return "over 21... You have exploded...";
  } else if (maxScore <= 21) {
    return maxScore;
  } else {
    return minScore;
  }
};

// returns string of all cards on hand //
var returnCardsOnHand = function (hand) {
  var counter = 0;
  var string = " ";
  while (counter < hand.length) {
    string += hand[counter].name;
    string += hand[counter].suit;
    string += ", ";
    counter += 1;
  }
  return string.slice(0, -2);
};

// ----- MAIN FUNCTION ------- //
var main = function (input) {
  if (gameMode == "game start") {
    gameMode = "draw cards";
    return "Please press continue to start game";
  }

  // draws 2 card for player and computer, counts player cards and output highest possible score
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
    gameMode = "player decides";
    return (
      "Player hand: " +
      returnCardsOnHand(playerHand) +
      "<br><br>Your score is " +
      playerHighestScore +
      "<br><br>Decide to hit (draw a card) or stand (end your turn)!"
    );
  }

  // player decides to hit or stand more than once//
  // 1. If player hits, player can hit multiple times
  // 2. If player stands, move on to "com decides" game mode
  if (gameMode == "player decides" && input == "hit") {
    playerHand.push(drawCardFromDeck(mainDeck));
    return (
      "Player hand: " +
      returnCardsOnHand(playerHand) +
      "<br><br>Your score is " +
      sumCards(playerHand) +
      "<br><br>Decide to hit (draw a card) or stand (end your turn)!"
    );
  } else if (gameMode == "player decides" && input == "stand") {
    gameMode = "com decides";
    console.log(comHand);
    return "Com is deciding whether to hit or stand... <br><br> Click submit to make it decide.";
  } else if (gameMode == "player decides") {
    return "Please key in either hit or stand!";
  }

  // computer decides to hit or stand only once//
  if (gameMode == "com decides" && sumCards(comHand) < 17) {
    console.log(comHand);
    gameMode = "compare cards";
    return "Com has decided to hit. <br><br> Click next to reveal results";
  } else if (gameMode == "com decides" && sumCards(comHand) >= 17) {
    console.log(comHand);
    gameMode = "compare cards";
    return "Com has decided to stand.<br><br> Click next to reveal results";
  }

  // compare the hands of players to determine winner
  if (gameMode == "compare cards") {
    gameMode = "restart game?";
    return (
      "Comparing cards... Math is tough...<br><br>" +
      "Player hand: " +
      returnCardsOnHand(playerHand) +
      "<br><br>" +
      "Dealer hand: " +
      returnCardsOnHand(comHand) +
      "<br><br>" +
      compareHands(playerHand, comHand) +
      "<br><br> If you wish to restart game, enter yes. Otherwise, ignore this message..."
    );
  }

  // restarts the gamemode if player keys in "yes", hands emptied and main deck refreshed/shuffled
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
