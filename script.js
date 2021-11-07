var cardDeck;
var playerHand = [];
var playerScore = 0;
var dealerHand = [];
var gameMode = "firstdeal"; // 'playerhitorstand' // 'dealerturn'

var main = function (input) {
  if (gameMode == "firstdeal") {
    playerHand = [];
    playerScore = 0;
    dealerHand = [];
    cardDeck = shuffleCards(makeDeck());
    //cardDeck = makeDeck();

    var myOutputValue = firstDealCards();
    return myOutputValue;
  }

  if (gameMode == "playerhitorstand") {
    if (!(input == "h" || input == "s")) {
      return `Your current hand is<br>${displayHand(
        playerHand
      )}Please type h to hit or s to stand`;
    }
    if (input == "h") {
      var newPlayerCard = cardDeck.pop();
      playerHand.push(newPlayerCard);
      var displayPlayerHands = "You currently have these cards:<br>";
      displayPlayerHands += displayHand(playerHand);
      playerScore = findScoreOfHand(playerHand);

      if (playerScore > 21) {
        gameMode = "firstdeal";
        return (
          displayPlayerHands +
          `<br>Your current score is ${playerScore}<br>I am sorry, you bust, click refresh to play another round`
        );
      }
      displayPlayerHands += `<br>Your current score is ${playerScore}<br>Do you want to hit (Type h) or stand (Type s)?`;
      return displayPlayerHands;
    }
    if (input == "s") {
      gameMode = "dealerturn";
      return `You decided to stand. Your current score is ${playerScore}, click Submit to pass the turn to the dealer`;
    }
  }

  if (gameMode == "dealerturn") {
    var dealerScore = findScoreOfHand(dealerHand);
    while (dealerScore < 17) {
      var newDealerCard = cardDeck.pop();
      dealerHand.push(newDealerCard);
      dealerScore = findScoreOfHand(dealerHand);
    }
    var displayDealerHands = "The dealer has these cards:<br>";
    displayDealerHands += displayHand(dealerHand);

    if (dealerScore > 21) {
      gameMode = "firstdeal";
      return (
        displayDealerHands +
        `<br>The dealer bust with score of ${dealerScore}, click refresh to play another round`
      );
    }
    displayDealerHands += `<br>You scored ${playerScore}. The dealer scored ${dealerScore}<br>`;

    if (dealerScore > playerScore) {
      displayDealerHands += "The dealer won!";
    }
    if (dealerScore == playerScore) {
      displayDealerHands += "You tied with the dealer";
    }
    if (dealerScore < playerScore) {
      displayDealerHands += "You won!!";
    }

    gameMode = "firstdeal";
    return displayDealerHands + "<br>Click refresh to play another round";
  }
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
      var points = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        points = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        points = 10;
      } else if (cardName == 13) {
        cardName = "king";
        points = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: points,
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

var suitImage = function (suitName) {
  if (suitName == "hearts") {
    image = "♥️";
  }
  if (suitName == "diamonds") {
    image = "♦️";
  }
  if (suitName == "clubs") {
    image = "♣️";
  }
  if (suitName == "spades") {
    image = "♠️";
  }
  return image;
};

var firstDealCards = function () {
  //cardDeck = makeDeck();
  playerHand[0] = cardDeck.pop();
  playerHand[1] = cardDeck.pop();
  // playerHand[0] = cardDeck[0];
  // playerHand[1] = cardDeck[10];

  dealerHand[0] = cardDeck.pop();
  dealerHand[1] = cardDeck.pop();
  // dealerHand[0] = cardDeck[0];
  // dealerHand[1] = cardDeck[10];
  var displayHands =
    "Dealer has " +
    dealerHand[0].name +
    " of " +
    suitImage(dealerHand[0].suit) +
    " and " +
    dealerHand[1].name +
    " of " +
    suitImage(dealerHand[1].suit) +
    "<br>You have " +
    playerHand[0].name +
    " of " +
    suitImage(playerHand[0].suit) +
    " and " +
    playerHand[1].name +
    " of " +
    suitImage(playerHand[1].suit);

  if (isBlackjack(playerHand) && isBlackjack(dealerHand)) {
    gameMode = "firstdeal";
    return (displayHands +=
      "<br>Holy Moly, both of you got blackjack!<br>Click refresh to play another round");
  }
  if (isBlackjack(dealerHand)) {
    gameMode = "firstdeal";
    return (displayHands +=
      "<br>The dealer won by black jack!<br>Click refresh to play another round");
  }
  playerScore = playerHand[0].rank + playerHand[1].rank;
  if (playerHand[0].rank == 1 || playerHand[1].rank == 1) {
    playerScore += 10;
  }
  displayHands =
    "Dealer has " +
    dealerHand[0].name +
    " of " +
    suitImage(dealerHand[0].suit) +
    " and one face down card.<br>You have " +
    playerHand[0].name +
    " of " +
    suitImage(playerHand[0].suit) +
    " and " +
    playerHand[1].name +
    " of " +
    suitImage(playerHand[1].suit);

  if (isBlackjack(playerHand)) {
    gameMode = "firstdeal";
    return (displayHands +=
      "<br>You won by black jack!<br>Click refresh to play another round");
  }

  gameMode = "playerhitorstand";
  displayHands +=
    "<br>Your current score is " +
    playerScore +
    "<br>Do you want to hit (Type h) or stand (Type s)?";

  return displayHands;
};

var isBlackjack = function (hand) {
  if (
    (hand[0].rank == 1 && hand[1].rank == 10) ||
    (hand[1].rank == 1 && handd[0].rank == 10)
  ) {
    return true;
  } else {
    return false;
  }
};

var displayHand = function (hand) {
  var printHands = "";
  for (var cardCount = 0; cardCount < hand.length; cardCount++) {
    printHands += `${hand[cardCount].name} of ${suitImage(
      hand[cardCount].suit
    )}<br>`;
  }
  return printHands;
};

var findScoreOfHand = function (hand) {
  var score = 0;
  var numLargeAce = 0;

  for (var cardCount = 0; cardCount < hand.length; cardCount++) {
    score += hand[cardCount].rank;
    //Increment the Ace value by 10 if it does not bust player's hand
    if (hand[cardCount].rank == 1 && score + 10 <= 21) {
      score += 10;
      numLargeAce = 1;
    }
    //Decrease any large Ace value by 10 to prevent bust
    if (numLargeAce == 1 && playerScore > 21) {
      score -= 10;
      numLargeAce = 0;
    }
  }
  return score;
};
