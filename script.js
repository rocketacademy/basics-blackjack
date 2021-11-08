// Initialise an empty deck array
var cardDeck = [];
var shuffledDeck = [];
var playerHand = [];
var dealerHand = [];
var winner = ``;
var player = `Player`;
var dealer = `Dealer`;
var hit = `hit`;
var stand = `stand`;
var playerTotalPoint = 0;
var dealerTotalPoint = 0;

var gameMode = `Starting`;
var starting = `Starting`;
var dealCard = `deal card`;
var playerTurn = `player turn`;
var dealerTurn = `dealer turn`;
var checkWinner = `check winner`;

var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♥", "♦", "♣", "♠"];

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
      var cardPoint = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
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

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        point: cardPoint,
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
  shuffledDeck = cardDeck;
  return shuffledDeck;
};

// function to deal 2 cards each to player and dealer from the shuffled deck
var drawCard = function (cardDeck) {
  var numOfCard = 2;
  var cardCounter = 0;

  while (cardCounter < numOfCard) {
    playerHand.push(shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop());
    cardCounter += 1;
  }

  var dealedCards = `Player Hand: ${playerHand[0].name} of ${playerHand[0].suit},${playerHand[1].name} of ${playerHand[1].suit}<br>Computer Hand: ${dealerHand[0].name} of ${dealerHand[0].suit},${dealerHand[1].name} of ${dealerHand[1].suit}`;

  return dealedCards;
};

// compare player and dealer hand and return result.
var checkResult = function () {
  var winner = ``;
  // draw condition busted
  if (playerTotalPoint > 21 && dealerTotalPoint > 21) {
    winner = `It's a draw`;
  }
  // draw condition normal
  else if (playerTotalPoint == dealerTotalPoint) {
    winner = `It's a draw`;
  }
  // player win by black Jack (2 cards)
  else if (
    (playerHand[0].rank == 1 || playerHand[1].rank == 1) &&
    (playerHand[0].rank >= 10 || playerHand[1].rank >= 10)
  ) {
    winner = `Black Jack! ${player} Wins`;
  }
  // dealer win by black Jack (2 cards)
  else if (
    (dealerHand[0].rank == 1 || dealerHand[1].rank == 1) &&
    (dealerHand[0].rank >= 10 || dealerHand[1].rank >= 10)
  ) {
    winner = `Black Jack! ${dealer} Wins`;
  }
  // Player busted
  else if (playerTotalPoint > 21 && dealerTotalPoint <= 21) {
    winner = `${dealer} Wins`;
  }
  // dealer busted
  else if (playerTotalPoint <= 21 && dealerTotalPoint > 21) {
    winner = `${player} Wins`;
  }
  // player win condition normal
  else if (playerTotalPoint > dealerTotalPoint) {
    winner = `${player} Wins`;
  }
  // dealer win condition normal
  else if (playerTotalPoint < dealerTotalPoint) {
    winner = `${dealer} Wins`;
  }
  return winner;
};

// function to print player hand in grey box.
var printPlayerHand = function () {
  var myOutputValue = ``;
  var playerCardCounter = 0;
  // initiate while loop to print the variable number of cards each hand
  while (playerCardCounter < playerHand.length) {
    myOutputValue =
      myOutputValue +
      `${playerHand[playerCardCounter].name} of ${playerHand[playerCardCounter].suit}, `;
    playerCardCounter += 1;
  }

  return myOutputValue;
};

// function to print dealer hand in grey box.
var printDealerHand = function () {
  var myOutputValue = ``;
  var dealerCardCounter = 0;
  // initiate while loop to print the variable number of cards each hand
  while (dealerCardCounter < dealerHand.length) {
    myOutputValue =
      myOutputValue +
      `${dealerHand[dealerCardCounter].name} of ${dealerHand[dealerCardCounter].suit}, `;
    dealerCardCounter += 1;
  }
  return myOutputValue;
};

// keep track of player point
var checkPlayerPoint = function () {
  var playerCardCounter = 0;
  var playerCurrentPoint = 0;
  playerTotalPoint = 0;
  //initiate while loop to calculate the total number of points for each hand
  while (playerCardCounter < playerHand.length) {
    playerCurrentPoint = playerHand[playerCardCounter].point;
    playerTotalPoint = playerTotalPoint + playerCurrentPoint;
    playerCurrentPoint = 0;
    playerCardCounter += 1;
  }
  // condition to allocate 11 points for 'ace' card
  if (
    playerHand.some((item) => item.name === "ace") &&
    playerTotalPoint <= 11
  ) {
    playerTotalPoint = playerTotalPoint + 10;
  }
  // Black Jack if total point = 21.
  if (playerTotalPoint == 21) {
    return `${playerTotalPoint}, Black Jack!`;
  }
  // busted if total point > 21.
  else if (playerTotalPoint > 21) {
    return `${playerTotalPoint}, Busted!`;
  } else {
    return playerTotalPoint;
  }
};

// keep track of dealer point
var checkDealerPoint = function () {
  var dealerCardCounter = 0;
  var dealerCurrentPoint = 0;
  dealerTotalPoint = 0;
  //initiate while loop to calculate the total number of points for each hand
  while (dealerCardCounter < dealerHand.length) {
    dealerCurrentPoint = dealerHand[dealerCardCounter].point;
    dealerTotalPoint = dealerTotalPoint + dealerCurrentPoint;
    dealerCurrentPoint = 0;
    dealerCardCounter += 1;
  }
  // condition to allocate 11 points for 'ace' card
  if (
    dealerHand.some((item) => item.name === "ace") &&
    dealerTotalPoint <= 11
  ) {
    dealerTotalPoint = dealerTotalPoint + 10;
  }
  // Black Jack if total point = 21.
  if (dealerTotalPoint == 21) {
    return `${dealerTotalPoint}, Black Jack!`;
  }
  // busted if total point > 21.
  else if (dealerTotalPoint > 21) {
    return `${dealerTotalPoint}, Busted!`;
  } else {
    return dealerTotalPoint;
  }
};

// function if player choose hit or stand
var playerHitOrStand = function (playerChoice) {
  // if player choose stand, swith to dealer's turn.
  if (playerChoice == stand) {
    gameMode = dealerTurn;

    return `Dealer's Turn, Dealer has ${dealerHand.length} cards.<br><br>click submit to continue.`;
  }
  // check initial hand of 2 cards for Black Jack condition
  if (
    ((playerHand[0].rank == 1 || playerHand[1].rank == 1) &&
      (playerHand[0].rank >= 10 || playerHand[1].rank >= 10)) ||
    playerTotalPoint == 21
  ) {
    return `Black Jack! for Player.<br><br>Player Hand: ${printPlayerHand()}<br><br>Player points: ${checkPlayerPoint()}<br><br>Enter 'stand' to continue.`;
  }
  // busted if points > 21
  else if (playerTotalPoint > 21) {
    return `Player Busted!<br><br>Player Hand: ${printPlayerHand()}<br><br>Player points: ${checkPlayerPoint()}<br><br>Enter 'stand' to continue.`;
  }
  // input validation for hit and stand
  else if (playerChoice != hit && playerChoice != stand) {
    return `Enter 'hit' or 'stand' only<br><br>Player Hand: ${printPlayerHand()}<br><br>Player points: ${checkPlayerPoint()}`;
  }
  // if player choose hit
  else if (playerChoice == hit && playerTotalPoint <= 21) {
    // deal one card to player hand
    playerHand.push(shuffledDeck.pop());
    return `Player Hand: ${printPlayerHand()}<br><br>Player points: ${checkPlayerPoint()}<br><br>Please choose to 'hit' or 'stand'.`;
  }
};

// function if dealer choose to hit or stand
var dealerHitOrStand = function () {
  checkDealerPoint();
  // if dealer has black jack, switch game mode
  if (
    ((dealerHand[0].rank == 1 || dealerHand[1].rank == 1) &&
      (dealerHand[0].rank >= 10 || dealerHand[1].rank >= 10)) ||
    dealerTotalPoint == 21
  ) {
    gameMode = checkWinner;
    return `Black Jack! for Dealer.<br><br>Dealer Hand: ${printDealerHand()}<br><br>Dealer points: ${checkDealerPoint()}`;
  }
  // Busted if points > 21
  if (dealerTotalPoint > 21) {
    gameMode = checkWinner;
    return `Dealer Busted!<br><br>Dealer Hand: ${printDealerHand()}<br><br>Dealer points: ${checkDealerPoint()}`;
  }
  // Dealer draws a card if points are 15 or less.
  if (dealerTotalPoint <= 15) {
    dealerHand.push(shuffledDeck.pop());

    return `Dealer draws a card. Dealer has ${dealerHand.length} cards<br><br>click submit to continue.`;
  }
  // Dealer stand if points are greater thand 15 and less than or equal to 21.
  else if (dealerTotalPoint <= 21) {
    gameMode = checkWinner;
    return `Dealer stand.<br><br>Dealer Hand: ${printDealerHand()}<br><br>Dealer points: ${checkDealerPoint()}<br><br>click submit to continue.`;
  }
};

// main function
var main = function (input) {
  var myOutputValue = ``;
  if (gameMode == starting) {
    // switch game mode
    gameMode = dealCard;
    // call function to create deck of calls
    makeDeck();

    return `Welcome ${player}! click submit to deal cards`;
  }
  if (gameMode == dealCard) {
    // call function to deal 2 cards each to player and dealer from shuffled deck.
    drawCard(shuffleCards(cardDeck));
    // switch game mode
    gameMode = playerTurn;
    return `Player's Turn, Player has 2 cards.<br><br>click submit to reveal cards.`;
  }
  if (gameMode == playerTurn) {
    // call function for player choose hit or stand
    return playerHitOrStand(input);
  }
  if (gameMode == dealerTurn) {
    // call function for dealer automated hit or stand
    return dealerHitOrStand();
  }
  if (gameMode == checkWinner) {
    // switch game mode
    gameMode = starting;
    myOutputValue = `${checkResult()}<br><br>Player Hand: ${printPlayerHand()} Player points: ${checkPlayerPoint()}.<br><br>Dealer Hand: ${printDealerHand()} Dealer points: ${checkDealerPoint()}.<br><br>click submit to play again.`;
  }
  // reset card deck and hand
  cardDeck = [];
  shuffledDeck = [];
  playerHand = [];
  dealerHand = [];
  return myOutputValue;
};

// backup syntax to simulate results
// playerHand = [
//   { name: `ace`, suit: "❤", rank: 1, point: 1 },
//   { name: `ace`, suit: "🔶", rank: 1, point: 1 },
//   { name: `ace`, suit: "♣", rank: 1, point: 1 },
//   { name: `ace`, suit: "♠", rank: 1, point: 1 },
// ];
// dealerHand = [
//   { name: `ace`, suit: "❤", rank: 1, point: 1 },
//   { name: `ace`, suit: "🔶", rank: 1, point: 1 },
//   { name: `ace`, suit: "♣", rank: 1, point: 1 },
//   { name: `ace`, suit: "♠", rank: 1, point: 1 },
// ];
//  playerHand = [
//    { name: `ace`, suit: "♥", rank: 1, point: 1 },
//    { name: `jack`, suit: "♦", rank: 11, point: 10 },
//  ];
//  dealerHand = [
//    { name: `ace`, suit: "♠", rank: 1, point: 1 },
//    { name: `jack`, suit: "♣", rank: 11, point: 10 },
//  ];
