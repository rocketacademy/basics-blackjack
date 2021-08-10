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
var compGameOver = false;
var playerGameOver = false;
var scoreLimit = 21;
var START_HAND = `startHand`;
var HIT_OR_STAND = "hitOrStand";
var COMPTURN = "compTurn"; //Hit until 17
var ENDGAME = "endGame";
var gameMode = START_HAND;

//Store hands
var compHand = [];
var playerHand = [];

//Determine score from hand
var getScore = function (hand) {
  var score = 0;
  for (i = 0; i < hand.length; i++) {
    var cards = hand[i];
    if (cards.rank == 1 && hand.length == 2) {
      score += 11;
    } else if (i < hand.length) {
      score += cards.points;
    }
  }
  return score;
};

//Print hand
var printHand = function (hand) {
  return `${hand.map((card) => ` ${card.name} of ${card.suit}`)}`;
};

var main = function (input) {
  //Start game
  if (gameMode == START_HAND) {
    compHand = [newDeck.pop(), newDeck.pop()];
    playerHand = [newDeck.pop(), newDeck.pop()];
    gameMode = HIT_OR_STAND;
    playerScore = getScore(playerHand);
    compScore = getScore(compHand);
    playerGameScore = playerScore;
    compGameScore = compScore;
    console.log(`Comp score:${compGameScore}`);
    var myOutputValue = `Player has ${playerScore}. <br> Player has ${printHand(
      playerHand
    )} <br> Choose to hit or stand.`;
    return myOutputValue;
  }

  if (gameMode == HIT_OR_STAND && input.toLowerCase() == `hit`) {
    playerHand.push(newDeck.pop());
    playerScore = getScore(playerHand);
    if (playerScore > scoreLimit) {
      gameMode = COMPTURN;
      playerGameScore = 0;
      console.log(`PlayerG: ${playerGameScore}`);
      var myOutputValue = `Player bust. <br> Player has ${printHand(
        playerHand
      )} <br> Dealer turn now. <br> Player has ${playerScore}.`;
      return myOutputValue;
    } else {
      gameMode = HIT_OR_STAND;
      playerGameScore = playerScore;
      var myOutputValue = `Player has ${printHand(
        playerHand
      )} <br> Player has ${playerScore}. <br>Choose to hit or stand.`;
      return myOutputValue;
    }
  }

  if (gameMode == HIT_OR_STAND && input.toLowerCase() == `stand`) {
    gameMode = COMPTURN;
    playerGameScore = playerScore;
    console.log(`PlayerG: ${playerGameScore}`);
    var myOutputValue = `Player has ${playerScore}. It is the dealer turn to play. Dealer has ${compScore}`;
    return myOutputValue;
  }

  if (gameMode == HIT_OR_STAND && input.toLowerCase() != `stand || hit`) {
    var myOutputValue = `Invalid input. Player has ${playerScore}. Choose to hit or stand`;
    return myOutputValue;
  }

  //Dealer hit until 17. Then check score
  if (gameMode == COMPTURN) {
    for (
      compScore = getScore(compHand);
      compScore < 17;
      compScore = getScore(compHand)
    ) {
      compHand.push(newDeck.pop());
    }
    gameMode = ENDGAME;
    var myOutputValue = `Dealer has ${compScore}.`;
    compGameScore = compScore;
    if (compScore > scoreLimit) {
      compGameScore = 0;
    }
    console.log(`CompG:${compGameScore}`);
    return myOutputValue;
  }

  //Compare hands and announce winner
  if (gameMode == ENDGAME) {
    if (compGameScore > playerGameScore) {
      myOutputValue = `Dealer had ${compScore} points. Player had ${playerScore} points.<br> Player loses.`;
      console.log(`win`);
      return myOutputValue;
    }
    if (compGameScore < playerGameScore) {
      myOutputValue = `Dealer had ${compScore} points. Player had ${playerScore} points.<br> Player wins.`;
      console.log(`lose`);
      return myOutputValue;
    }
    if (compGameScore == playerGameScore) {
      myOutputValue = `Dealer had ${compScore} points. Player had ${playerScore} points.<br> It's a tie.`;
      console.log(`tie`);
      return myOutputValue;
    }
  }
  var myOutputValue = `Invalid Move. Restart game.`;
  return myOutputValue;
};
