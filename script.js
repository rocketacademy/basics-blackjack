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
  var suits = ["❤️hearts❤️", "💎diamonds💎", "♣️clubs♣️", "♠️spades♠️"];

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
        cardName: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // amend the card rank for jack queen king to be 10 so that score of these cards will all be 10
      if (card.rank == 11) {
        card.rank = 10;
      } else if (card.rank == 12) {
        card.rank = 10;
      } else if (card.rank == 13) {
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
// define gamemodes in blackjack
var INSERT_USERNAME = "insert username";
var PLACE_WAGER = "bet";
var CFM_WAGER = "cfm wager";
var DEAL_CARDS = "deal";
var HIT = "hit";
var STAND = "stand";
var DEALER_TURN = "dealer's turn";
var WELCOME = "welcome";

// gameMode at initial stage
var gameMode = WELCOME;

// shuffle deck of cards
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);

var playerCurrScore;
var dealerCurrScore;
var playerHand = [];
var displayPlayerCards = [];
var dealerHand = [];
var displayDealerCards = [];
var maxScore = 21;
var dealerMinimalScore = 17;
var userName = ``;
var pointBalance = 100;
var wagerPlaced = 0;

// standard messages
var hitOrStandMessage =
  "Enter hit to take another card or stand to end your turn.";
var refreshGameMessage = " Enter your wager to start new round of Blackjack";
var pointsBalanceMessage = ` you currently have ${pointBalance} points. Place your points and Submit to start new round of Blackjack.`;

// display cards in hand to show player the cards drawn so far
// reference https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
var displayCardsInHand = function (handArray, displayCardsArray) {
  displayCardsArray = [];
  for (var j = 0; j < handArray.length; j += 1) {
    displayCardsArray.push(handArray[j].cardName);
  }
  return displayCardsArray;
};

// https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers

// +++cal total score first then filter out ace value+++
var calTotalScore = function (cards) {
  var totalScore = 0;
  var numOfAceInHand = 0;
  for (var i = 0; i < cards.length; i += 1) {
    var currCard = cards[i];
    // set default ace value to 11
    if (currCard.rank == 1) {
      currCard.rank = 11;
      numOfAceInHand += 1;
    }
    totalScore += cards[i].rank;

    if (totalScore > 21 && numOfAceInHand > 0) {
      for (var j = 0; j < numOfAceInHand; j += 1) {
        totalScore = totalScore - numOfAceInHand * 10;
      }
    }
  }
  return totalScore;
};

// rules of blackjack
// player and dealer will be dealt cards
var dealHands = function (userName) {
  // draw 2 cards for player and 1 cardsfor dealer
  playerCard1 = shuffledDeck.pop();
  playerCard2 = shuffledDeck.pop();
  playerHand.push(playerCard1, playerCard2);
  dealerCard1 = shuffledDeck.pop();
  dealerHand.push(dealerCard1);

  // calculate player score for first 2 cards
  playerCurrScore = calTotalScore(playerHand);

  // calculate Dealer score for first card
  dealerCurrScore = calTotalScore(dealerHand);

  // default message to display first 2 cards on hand and current score
  var message = `Current Wager: ${wagerPlaced}<br><br>${userName}, your hand is <br>${playerCard1.cardName} of ${playerCard1.suit} <br> ${playerCard2.cardName} of ${playerCard2.suit}<br>Your score is ${playerCurrScore}<br> <br><br> Dealer hand is <br>${dealerCard1.cardName} of ${dealerCard1.suit} <br><br>`;
  var myOutputValue = `${message} ${hitOrStandMessage} <br> `;

  // check for blackjack win conditions

  if (playerHand.length == 2 && playerCurrScore == 21) {
    pointBalance = pointBalance + wagerPlaced;
    myOutputValue = `${message} You got Blackjack, you won! <br><br>${refreshGameMessage}<br><br> You have ${pointBalance}points left!`;
  }

  return myOutputValue;
};

// function for player to draw card when player hit
var playerDrawCard = function (userName) {
  var drawnCard = shuffledDeck.pop();
  playerHand.push(drawnCard);
  playerCurrScore = calTotalScore(playerHand);
  var playerHandMessage = `${userName}, you draw ${drawnCard.cardName} of ${
    drawnCard.suit
  }. <br> <br>Your hand is ${displayCardsInHand(
    playerHand,
    displayPlayerCards
  )}<br> <br>Your score is ${playerCurrScore}. `;
  return `${playerHandMessage}<br><br>
   Dealer score is ${dealerCurrScore}<br><br> `;

  // if (playerCurrScore > maxScore) {
  //   return `${playerHandMessage} You BUSTED!! <br><br>
  //   Dealer score is ${dealerCurrScore}<br><br>
  //   ${hitOrStandMessage}`;
  // }
  // if (playerCurrScore <= maxScore) {
  //   return `${playerHandMessage}<br><br>
  //   Dealer score is ${dealerCurrScore}<br><br>
  //   ${hitOrStandMessage}`;
  // }
};

// function for dealer to draw card
// dealer will continue to draw card if the total score is below 17
var dealerDrawCard = function (userName) {
  var myOutputValue = "";

  if (dealerCurrScore >= dealerMinimalScore) {
    return ` ${userName}, your hand is ${displayCardsInHand(
      playerHand,
      displayPlayerCards
    )} <br>Your score is ${playerCurrScore} <br><br> Dealer hand is ${displayCardsInHand(
      dealerHand,
      displayDealerCards
    )} <br>Dealer score is ${dealerCurrScore}. <br> `;
  } else {
    while (dealerCurrScore < dealerMinimalScore) {
      var drawnCard = shuffledDeck.pop();
      console.log(`drawn card: ` + drawnCard.cardName);
      dealerHand.push(drawnCard);
      dealerCurrScore = calTotalScore(dealerHand);
      if (dealerHand.length == 2 && dealerCurrScore == 21) {
        myOutputValue = `${userName}, your hand is ${displayCardsInHand(
          playerHand,
          displayPlayerCards
        )}<br>Your score is ${playerCurrScore} <br> <br> Dealer hand is ${displayCardsInHand(
          dealerHand,
          displayDealerCards
        )}<br>Dealer has Blackjack!<br>`;
      } else {
        myOutputValue = `${userName}, your hand is ${displayCardsInHand(
          playerHand,
          displayPlayerCards
        )}<br>Your score is ${playerCurrScore} <br> <br> Dealer hand is ${displayCardsInHand(
          dealerHand,
          displayDealerCards
        )} <br>Dealer score is ${dealerCurrScore}. <br>`;
      }
    }
  }

  return myOutputValue;
};

// function to compare score and determine winner
var determineWinner = function (userName) {
  if (
    (playerCurrScore > dealerCurrScore && playerCurrScore <= maxScore) ||
    dealerCurrScore > maxScore
  ) {
    pointBalance = Number(pointBalance) + Number(wagerPlaced);
    myOutputValue = `<br>${userName} Wins <br><br>${refreshGameMessage}<br><br> You have ${pointBalance}points left!`;
  }
  if (
    (playerCurrScore < dealerCurrScore && dealerCurrScore <= maxScore) ||
    (dealerHand.length == 2 && dealerCurrScore == 21)
  ) {
    pointBalance = Number(pointBalance) - Number(wagerPlaced);
    myOutputValue = `<br> Dealer Wins <br><br>${refreshGameMessage}<br><br> You have ${pointBalance}points left!`;
  }

  if (
    playerCurrScore == dealerCurrScore ||
    (playerCurrScore > maxScore && dealerCurrScore > maxScore)
  ) {
    pointBalance = pointBalance;
    myOutputValue = `<br> Its a tie<br><br>${refreshGameMessage}<br><br> You have ${pointBalance}points left!`;
  }
  return myOutputValue;
};

var main = function (input) {
  if (gameMode == WELCOME) {
    if (input == "") {
      return "Hi. Pls enter your username!";
    }

    gameMode = INSERT_USERNAME;
  }

  if (gameMode == INSERT_USERNAME) {
    userName = input;
    gameMode = PLACE_WAGER;
    return `${userName}, ${pointsBalanceMessage} `;
  }
  if (gameMode == PLACE_WAGER) {
    wagerPlaced = input;
    gameMode = DEAL_CARDS;
    return `${userName}, You placed ${wagerPlaced} points. Submit to start blackjack `;
  }

  if (gameMode == DEAL_CARDS) {
    // reshuffled deck for new round
    playerHand = [];
    dealerHand = [];
    deck = makeDeck();
    shuffledDeck = shuffleCards(deck);
    myOutputValue = dealHands(userName);
    gameMode = HIT;
  }

  if (input == HIT) {
    gameMode = HIT;
    myOutputValue = playerDrawCard(userName);
  }

  if (input == STAND) {
    gameMode = DEALER_TURN;
  }

  if (gameMode == DEALER_TURN) {
    gameMode = PLACE_WAGER;
    myOutputValue = dealerDrawCard(userName) + determineWinner(userName);
  }

  return myOutputValue;
};
