// Deck is shuffled.
// User clicks Submit to deal cards.
// The cards are analysed for game winning conditions, e.g. Blackjack.
// The cards are displayed to the user.
// The user decides whether to hit or stand, using the submit button to submit their choice.
// The user's cards are analysed for winning or losing conditions.
// The computer decides to hit or stand automatically based on game rules.
// The game either ends or continues.

// first create a global variables
var cardDeck = [];
var shuffledDeck = [];
var playerHand = [];
var dealerHand = [];
var winner = ``;

var player = "player";
var dealer = "dealer";
var hit = "hit";
var stand = "stand";
var playersTotalPoints = 0;
var dealersTotalPoints = 0;

var gameMode = "starting";
var starting = "starting";
var dealCard = "dealCard";
var playerTurn = "playerTurn";
var dealerTurn = "dealerTurn";
var checkWinner = "checkWinner";

var generateDeck = function () {
  // create an array of 4 suits in the deck
  var suits = ["Diamonds", "Clubs", "Hearts", "Spades"];

  // while function to loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    // loop from 1 to 13 to create all the cards for the suits

    var rankCounter = 1;
    while (rankCounter <= 13) {
      // by default card name is the same as rankcounter
      var cardName = rankCounter;
      var cardPoint = rankCounter;

      // set the card value for ace, king, wueens
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
        cardPoint = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        cardPoint = 10;
      } else if (cardName == 13) {
        cardName = "king";
        cardPoint = 10;
      }
      // create a new card with the current name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        point: cardPoint,
      };
      // add new card to the deck
      cardDeck.push(card);
      // increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }
    // increment suit index to iterate over the next suit
    suitIndex += 1;
  }
  // return the completed card deck
  return cardDeck;
};

// generate a random index from 0 (inclusive) to max (exclusive)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
//   shuffle cards
var shuffleCards = function (cardDeck) {
  // loop over the card deck array
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    // swap position of random card and current card in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // retutn the shuffled deck
  shuffledDeck = cardDeck;
  return shuffledDeck;
};

// deal 2 cards each to player and dealer from the shuffled deck
var drawCard = function (cardDeck) {
  var numOfCard = 2;
  var cardCounter = 0;
  while (cardCounter < numOfCard) {
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    cardCounter += 1;
  }

  var dealedCards = `player Hand ${playerHand[0].name} of ${playerHand[0].suit} ${playerHand[1].name} of ${playerHand[1].suit} <br> dealer Hand  ${dealerHand[0].name} of ${dealerHand[0].suit}, ${dealerHand[1].name} of ${dealerHand[1].suit} `;
  return dealedCards;
};

// compare player and dealer hand and return result.

var checkResult = function () {
  var winner = ``;
  // draw condition
  if (playersTotalPoints > 21 && dealersTotalPoints > 21) {
    winner = `its a draw or busted: `;
  }
  // draw condition normal
  else if (playersTotalPoints == dealersTotalPoints) {
    winner = `its a draw `;
  }
  // player win by black jack
  else if (
    (playerHand[0].rank == 1 || playerHand[1].rank == 1) &&
    (playerHand[0].rank >= 10 || playerHand[1].rank >= 10)
  ) {
    winner = `Black Jack ${player} wins`;
  }
  // dealer win by black jack
  else if (
    (dealerHand[0].rank == 1 || dealerHand[1].rank == 1) &&
    (dealerHand[1].rank >= 10 || dealerHand[1].rank >= 10)
  ) {
    winner = `Black Jack ${dealer} wins`;
  }
  // player busted
  else if (playersTotalPoints > 21 && dealersTotalPoints <= 21) {
    winner = `congrats ${dealer} wins`;
  }
  // dealer busted
  else if (playersTotalPoints <= 21 && dealersTotalPoints > 21) {
    winner`congrats ${player} wins`;
  }
  // winning normal conditions
  else if (playersTotalPoints > dealersTotalPoints) {
    winner = ` congrats ${player} wins`;
  } else if (playersTotalPoints < dealersTotalPoints) {
    winner = `congrats ${dealer} wins`;
  }
  return winner;
};

// function to print player hand

var printPlayerHand = function () {
  var myOutputValue = ``;
  var playerCardCounter = 0;
  while (playerCardCounter < playerHand.length) {
    myOutputValue =
      myOutputValue +
      ` ${playerHand[playerCardCounter].name} of ${playerHand[playerCardCounter].suit},`;
    playerCardCounter += 1;
  }
  return myOutputValue;
};

// function to print dealer hand

var printDealerHand = function () {
  var myOutputValue = ``;
  var dealerCardCounter = 0;
  while (dealerCardCounter < dealerHand.length) {
    myOutputValue =
      myOutputValue +
      `${dealerHand[dealerCardCounter].name} of ${dealerHand[dealerCardCounter].suit}`;
    dealerCardCounter += 1;
  }
  return myOutputValue;
};

// keep track of player point

var checkPlayerPoint = function () {
  var playerCardCounter = 0;
  var playersCurrentPoints = 0;
  playersTotalPoints = 0;
  while (playerCardCounter < playerHand.length) {
    playersCurrentPoints = playerHand[playerCardCounter].point;
    playersTotalPoints = playersTotalPoints + playersCurrentPoints;
    playersCurrentPoints = 0;
    playerCardCounter += 1;
  }
  // condition to allocate 11 points for ace
  if (
    playerHand.some((item) => item.name === "ace") &&
    playersTotalPoints <= 11
  ) {
    playersTotalPoints = playersTotalPoints + 10;
  }
  // blackjack if total points is 21
  if (playersTotalPoints == 21) {
    return `${playersTotalPoints}, congrats Black Jack`;
  } else if (playersTotalPoints > 21) {
    return `${playersTotalPoints} Busted, `;
  } else {
    return playersTotalPoints;
  }
};

// keep track of dealer point

var checkDealerPoint = function () {
  var dealerCardCounter = 0;
  var dealerCurrentPoint = 0;
  dealersTotalPoints = 0;

  while (dealerCardCounter < dealerHand.length) {
    dealerCurrentPoint = dealerHand[dealerCardCounter].point;
    dealersTotalPoints = dealersTotalPoints + dealerCurrentPoint;
    dealerCurrentPoint = 0;
    dealerCardCounter += 1;
  }
  if (
    dealerHand.some((item) => item.name === "ace") &&
    dealersTotalPoints <= 11
  ) {
    dealersTotalPoints = dealersTotalPoints + 10;
  }
  // blackjack if total points is 21
  if (dealersTotalPoints == 21) {
    return `${dealersTotalPoints}, congrats Black Jack`;
  } else if (dealersTotalPoints > 21) {
    return `${dealersTotalPoints} Busted, `;
  } else {
    return dealersTotalPoints;
  }
};

// function if player choose Hit or Stand

var playerHitOrStand = function (playerChoice) {
  if (playerChoice == stand) {
    gameMode = dealerTurn;
    return `dealer's turn, dealer has ${dealerHand.length} cards <br><br> please click submit to continue the game `;
  }
  // check initial hand of 2 cards for black jack condition

  if (
    ((playerHand[0].rank == 1 || playerHand[1].rank == 1) &&
      (playerHand[0].rank >= 10 || playerHand[1].rank >= 10)) ||
    playersTotalPoints == 21
  ) {
    return `BlackJack for player <br><br> player hand ${printPlayerHand()} <br><br> player points ${checkPlayerPoint()} <br><br> enter 'stand' to continue `;
  }
  // busted if point is above 21
  else if (playersTotalPoints > 21) {
    return `busted <br><br> player hand  ${printPlayerHand()} <br><br> player points ${checkPlayerPoint()} <br><br> please enter 'stand' to continue the game`;
  }
  // input validation for hit and stand
  else if (playerChoice !== hit && playerChoice !== stand) {
    return `enter 'hit or 'stand' only <br><br> player Hand ${printPlayerHand()} <br><br>player points ${checkPlayerPoint()}`;
  }
  // if player choose hit
  else if (playerChoice == hit && playersTotalPoints <= 21) {
    playerHand.push(shuffledDeck.pop());
    return `player hand ${printPlayerHand()}<br><br> player points ${checkPlayerPoint()}<br><br> please choose hit or stand`;
  }
};

// function if dealer choose to hit or stand

var dealerHitOrStand = function () {
  checkDealerPoint();
  // if dealer has black jack switch game mode
  if (
    ((dealerHand[0].rank == 1 || dealerHand[1].rank == 1) &&
      (dealerHand[0].rank >= 10 || dealerHand[1].rank >= 10)) ||
    dealersTotalPoints == 21
  ) {
    gameMode = checkWinner;
    return `black jack for dealer <br><br> dealer hand  ${printDealerHand()}<br><br> dealer points ${checkDealerPoint()}`;
  }

  // busted if points > 21
  if (dealersTotalPoints > 21) {
    gameMode = checkWinner;
    return `dealer busted<br><br> dealer hand  ${printDealerHand()}<br><br> dealer points ${checkDealerPoint()}`;
  }
  // dealer draws a card if points are less than 17
  if (dealersTotalPoints <= 15) {
    dealerHand.push(shuffledDeck.pop());
    return `dealer draws a card dealer has${dealerHand.length} cards <br><br> click submit to continue the game`;
  }
  // dealer stand if points are greater than 17 and less or equal to 21
  else if (dealersTotalPoints <= 21) {
    gameMode = checkWinner;
    return `dealer stand <br><br> dealer hand  ${printDealerHand()} <br><br> dealer points ${checkDealerPoint()} <br><br> click submit to continue the game`;
  }
};

// main function

var main = function (input) {
  var myOutputValu = ``;
  if (gameMode == starting) {
    // switch gmae mode
    gameMode = dealCard;
    generateDeck();
    return `welcome ${player} please click "submit" to start the game`;
  }
  if (gameMode == dealCard) {
    // deal 2 cards for each of the players
    drawCard(shuffleCards(cardDeck));
    gameMode = playerTurn;
    return ` player's turn! please click submit to reveal the cards`;
  }
  if (gameMode == playerTurn) {
    return playerHitOrStand(input);
  }
  if (gameMode == dealerTurn) {
    return dealerHitOrStand();
  }
  if (gameMode == checkWinner) {
    gameMode = starting;
    myOutputValue = `${checkResult()}<br><br> player hand ${printPlayerHand()} player points ${checkPlayerPoint()} <br><br> dealer hand ${printDealerHand()} dealer points ${checkDealerPoint()} <br><br> click submit to play again`;
  }
  // reset card deck and hand
  cardDeck = [];
  shuffledDeck = [];
  playerHand = [];
  dealerHand = [];
  return myOutputValue;
};
