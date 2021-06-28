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

      // Create a new card with the current name, suit, and rank
      var card = {
        cardName: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // amend the card rank for jack queen king to be 10
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
var DEAL_CARDS = `deal cards`;
var HIT = `hit`;
var STAND = `stand`;
var DEALER_TURN = `dealer's turn`;
var RESET = `reset`;

var gameMode = DEAL_CARDS;
var deck = makeDeck();
var shuffledDeck = shuffleCards(deck);
var calPlayerCurrScore;
var calDealerCurrScore;
var playerHand = [];
var displayPlayerCardArray = [];
var dealerHand = [];
var displayDealerCardArray = [];
var maxScore = 21;
var dealerMinimalScore = 17;
var cardName;

// standard messages
var hitOrStandMessage =
  "Enter hit to take another card or stand to end your turn.";
var refreshGameMessage = " Refresh to start new game";

// display cards in hand to show player the cards drawn so far
// reference https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
var displayCardsInHand = function (handArray, displayCardsArray, cardName) {
  displayCardsArray = [];
  for (var counter = 0; counter < handArray.length; ++counter)
    displayCardsArray.push(handArray[counter].cardName);
  return displayCardsArray;
};

// var firstDealtHandMessage = function () {
//   var message = `Your hand is <br>${playerCard1.cardName} of ${playerCard1.suit} <br> ${playerCard2.cardName} of ${playerCard2.suit}<br>Your score is ${calPlayerCurrScore}<br> <br><br> Dealer hand is <br>${dealerCard1.cardName} of ${dealerCard1.suit} <br> ${dealerCard2.cardName} of ${dealerCard2.suit}<br>Dealer score is ${calDealerCurrScore}<br><br>`;
//   return message;
// };

// rules of blackjack
// players will be dealt 2 cards
var dealHands = function (input) {
  // draw 2 cards for player and 1 card for dealer
  playerCard1 = shuffledDeck.pop();
  playerCard2 = shuffledDeck.pop();
  playerHand.push(playerCard1, playerCard2);
  dealerCard1 = shuffledDeck.pop();
  dealerCard2 = shuffledDeck.pop();
  dealerHand.push(dealerCard1, dealerCard2);

  // calculate players score for the 2 cards
  calPlayerCurrScore = calTotalScore(playerCard1, playerCard2);

  // calculate Dealer score for the 2 cards
  calDealerCurrScore = calTotalScore(dealerCard1, dealerCard2);

  // default message to display first 2 cards on hand and current score
  var message = `Your hand is <br>${playerCard1.cardName} of ${playerCard1.suit} <br> ${playerCard2.cardName} of ${playerCard2.suit}<br>Your score is ${calPlayerCurrScore}<br> <br><br> Dealer hand is <br>${dealerCard1.cardName} of ${dealerCard1.suit} <br> ${dealerCard2.cardName} of ${dealerCard2.suit}<br>Dealer score is ${calDealerCurrScore}<br><br>`;
  var myOutputValue = `${message} ${hitOrStandMessage} <br> `;

  // check for blackjack win conditions
  if (
    playerHand.length == 2 &&
    calPlayerCurrScore == 11 &&
    (playerCard1.rank == 1 || playerCard2.rank == 1)
  ) {
    myOutputValue = `${message}Player has Blackjack, Player won! <br><br>${refreshGameMessage}`;
  } else if (
    dealerHand.length == 2 &&
    calDealerCurrScore == 11 &&
    (dealerCard1.rank == 1 || dealerCard2.rank == 1)
  ) {
    myOutputValue = `${message}Dealer has Blackjack, dealer won!<br><br> ${refreshGameMessage}`;
  } else if (
    dealerHand.length == 2 &&
    calDealerCurrScore == 11 &&
    (dealerCard1.rank == 1 || dealerCard2.rank == 1) &&
    playerHand.length == 2 &&
    calPlayerCurrScore == 11 &&
    (playerCard1.rank == 1 || playerCard2.rank == 1)
  ) {
    myOutputValue = `Both players have Blackjack! Its a tie!!<br><br>${refreshGameMessage}`;
  }

  return myOutputValue;
};

var calTotalScore = function (card1, card2) {
  // calculate total score in hand
  totalScore = Number(card1.rank + card2.rank);
  return totalScore;
};

var playerDrawCard = function () {
  var drawnCard = shuffledDeck.pop();
  playerHand.push(drawnCard);
  calPlayerCurrScore = calPlayerCurrScore + Number(drawnCard.rank);
  var playerHandMessage = `You draw ${drawnCard.cardName} of ${
    drawnCard.suit
  }. <br> <br>Your hand is ${displayCardsInHand(
    playerHand,
    displayPlayerCardArray,
    cardName
  )}<br> <br>Your score is ${calPlayerCurrScore}. `;

  if (calPlayerCurrScore > maxScore) {
    return `${playerHandMessage}
       You busted! YOU LOST!<br><br><br>${refreshGameMessage}`;
  }
  if (calPlayerCurrScore <= maxScore) {
    return `${playerHandMessage}<br><br>
    Dealer score is ${calDealerCurrScore}<br><br>
    ${hitOrStandMessage}`;
  }
};

// function for dealer to draw card
// dealer will continue to draw card if the total score is below 17
var dealerDrawCard = function () {
  // calDealerCurrScore = calDealerCurrScore + Number(drawnCard.rank);
  var myOutputValue = "";
  if (calDealerCurrScore == dealerMinimalScore) {
    return ` Your hand is ${displayCardsInHand(
      playerHand,
      displayPlayerCardArray,
      cardName
    )} <br> <br> Dealer hand is ${displayCardsInHand(
      dealerHand,
      displayDealerCardArray,
      cardName
    )} <br>Both dealer and player have same score of ${calDealerCurrScore}!`;
  } else {
    var counter = 0;
    while (calDealerCurrScore < dealerMinimalScore) {
      var drawnCard = shuffledDeck.pop();
      console.log(`drawn card: ` + drawnCard.cardName);
      dealerHand.push(drawnCard);
      calDealerCurrScore = calDealerCurrScore + Number(drawnCard.rank);
      myOutputValue = `Your hand is ${displayCardsInHand(
        playerHand,
        displayPlayerCardArray,
        cardName
      )}<br>Your score is ${calPlayerCurrScore} <br> <br> Dealer hand is ${displayCardsInHand(
        dealerHand,
        displayDealerCardArray,
        cardName
      )} <br>Dealer score is ${calDealerCurrScore}. <br>`;
      counter += 1;
    }
  }

  return myOutputValue;
};

// var determineBlackjack = function () {
//   // if (
//   //   (dealerHand.length == 2 &&
//   //     calDealerCurrScore == 11 &&
//   //     (dealerCard1.rank == 1 || dealerCard2.rank == 1)) ===
//   //   (playerHand.length == 2 &&
//   //     calPlayerCurrScore == 11 &&
//   //     (playerCard1.rank == 1 || playerCard2.rank == 1))
//   // )
//   //   return "Both player and dealer have Blackjack!! Its a tie!!";
// };

var determineWinner = function () {
  if (
    calPlayerCurrScore > calDealerCurrScore ||
    calDealerCurrScore > maxScore
  ) {
    myOutputValue = `<br>Player Wins <br><br>${refreshGameMessage}`;
  }
  if (
    calPlayerCurrScore < calDealerCurrScore &&
    calDealerCurrScore <= maxScore
  ) {
    myOutputValue = `<br> Dealer Wins <br><br>${refreshGameMessage}`;
  }

  if (calPlayerCurrScore == calDealerCurrScore) {
    myOutputValue = `<br> Its a tie<br><br>${refreshGameMessage}`;
  }
  return myOutputValue;
};

var main = function (input) {
  if (input == HIT) {
    gameMode = HIT;
    myOutputValue = playerDrawCard();
  }

  if (input == RESET) {
    gameMode = DEAL_CARDS;
  }

  if (input == STAND) {
    gameMode = DEALER_TURN;
    myOutputValue = dealerDrawCard() + determineWinner();
  }
  if (gameMode == DEAL_CARDS) {
    myOutputValue = dealHands();
  }
  if (input != HIT || input != STAND) {
    return `Pls enter hit or stand to continue the game`;
  }
  return myOutputValue;
};
