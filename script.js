var gameMode = ``;
var randomCard = [];

var playerCards = [];
var dealerCards = [];

var playerPoints = 0;
var dealerPoints = 0;

var main = function (input) {
  if (gameMode == ``) {
    playerCards = [];
    dealerCards = [];
    randomCard = shuffleCards(makeDeck());
    playerCards.push(randomCard.pop(0));
    dealerCards.push(randomCard.pop(0));
    playerCards.push(randomCard.pop(0));
    //deal player 2 cards and 1 for the computer
    //blackjack wins straight

    gameMode = `PLAYER_DRAW`;
    return playerDrawCard();
  } else if (gameMode == `PLAYER_DRAW`) {
    //over here player can draw another card from the deck
    //if the player draws over 21, he will lose
    return playerDraw(input);
  } else if (gameMode == `PLAYER_STAND`) {
    //over here player has decided that he has enough points, computer turn to draw
    return dealerDraw();
  } else if (gameMode == `DEALER_DRAW`) {
    //over here dealer will draw his second card
    //needs at least 17points
    //if draw over 21, dealer lose
    //blackjack wins straight
  } else if (gameMode == `SHOWDOWN`) {
    //if dealer draws equal or greater than 17, compare players and dealer point
    //restarts the game
  }
};

var playerDrawCard = function (input) {
  var playerBlackjack = blackJackChecker(playerCards);
  if (playerBlackjack == `true`) {
    gameMode = ``;

    return `Dealer card: <BR>${dealerCards[0].name} of ${emoji(
      dealerCards[0].suit
    )}<BR><BR>Player card:<BR>${playerCards[0].name} of ${emoji(
      playerCards[0].suit
    )} and ${playerCards[1].name} of ${emoji(
      playerCards[1].suit
    )}<BR><BR>BLACKJACK!! you won, seems like it's your lucky day, click submit to play again`;
  } else {
    gameMode = `PLAYER_DRAW`;
    return `Dealer card: <BR>${dealerCards[0].name} of ${emoji(
      dealerCards[0].suit
    )}<BR>dealer current point: ${scoreCounter(
      dealerCards
    )}<BR><BR>Player card:<BR>${playerCards[0].name} of ${emoji(
      playerCards[0].suit
    )} <BR>${playerCards[1].name} of ${emoji(
      playerCards[1].suit
    )}<BR>player current point: ${scoreCounter(
      playerCards
    )} <BR><BR><BR>would you like to hit or stand?`;
  }
};

var playerDraw = function (input) {
  if (input == `hit` && scoreCounter(playerCards) < 21) {
    playerCards.push(randomCard.pop(0));
    console.log(playerCards);
    return `${outputMessage()} <BR><BR><BR>would you like to hit or stand?`;
  } else if (scoreCounter(playerCards) > 21) {
    gameMode = ``;
    return `${outputMessage()} <BR><BR>BUST! you have went over 21. click submit to play again`;
  } else if (input == `stand`) {
    gameMode = `PLAYER_STAND`;

    return `${outputMessage()} <BR><BR>your final point is ${scoreCounter(
      playerCards
    )}, dealer will draw now`;
  }
  return `Please enter either hit or stand`;
};

var dealerDraw = function () {
  dealerCards.push(randomCard.pop(0));
  var dealerBlackjack = blackJackChecker(dealerCards);
  if (dealerBlackjack == `true`) {
    gameMode = ``;
    return `${outputMessage()} <BR><BR>Dealer gotten BlackJack! push submit to play again`;
  }
  if (scoreCounter(dealerCards) < 17) {
    for (a = scoreCounter(dealerCards); a < 17; a = scoreCounter(dealerCards)) {
      dealerCards.push(randomCard.pop(0));
    }
  }
  if (scoreCounter(dealerCards) > 16 && scoreCounter(dealerCards) < 22) {
    if (scoreCounter(dealerCards) > scoreCounter(playerCards)) {
      gameMode = ``;
      return `${outputMessage()} <BR><BR> dealer won, click submit to play again`;
    } else if (scoreCounter(dealerCards) < scoreCounter(playerCards)) {
      gameMode = ``;
      return `${outputMessage()} <BR><BR> player won, click submit to play again`;
    } else if (scoreCounter(dealerCards) == scoreCounter(playerCards)) {
      gameMode = ``;
      return `${outputMessage()} <BR><BR> it's a tie, click submit to play again`;
    }
  } else {
    gameMode = ``;
    return `${outputMessage()} <BR><BR>dealer bust, you won`;
  }
};
var outputMessage = function () {
  return `Dealer card:<BR>${displayPlayerDealerHand(
    dealerCards
  )}dealer current point: ${scoreCounter(
    dealerCards
  )}<BR><BR>Player card:<BR> ${displayPlayerDealerHand(
    playerCards
  )}player current point: ${scoreCounter(playerCards)}`;
};

var scoreCounter = function (cardsToScore) {
  var totalScore = 0;
  for (a = 0; a < cardsToScore.length; a++) {
    var currentCard = cardsToScore[a];
    if (currentCard.rank >= 10) {
      totalScore = totalScore + 10;
    } else {
      totalScore = totalScore + currentCard.rank;
    }
  }
  return totalScore;
};

var displayPlayerDealerHand = function (input) {
  var theirCards = ``;
  for (a = 0; a < input.length; a++) {
    theirCards = `${theirCards}${input[a].name} of ${emoji(input[a].suit)}<BR>`;
    console.log(a);
  }
  console.log(`theirCards`);
  return theirCards;
};

var emoji = function (input) {
  if (input == `hearts`) {
    return (input = `♥`);
  } else if (input == `diamonds`) {
    return (input = `♦`);
  } else if (input == `spades`) {
    return (input = `♠`);
  } else {
    return (input = `♣`);
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
  console.log(cardDeck);
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

var blackJackChecker = function (cards) {
  var cardOne = cards[0];
  var cardTwo = cards[1];
  if (cardOne.rank == 1) {
    if (cardTwo.rank >= 10) {
      return `true`;
    }
  }
  if (cardOne.rank >= 10) {
    if (cardTwo.rank == 1) {
      return `true`;
    }
  }
};
