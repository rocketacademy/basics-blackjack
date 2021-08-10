// Implement a game of blackjack.
// 1) A deck of 52 cards are shuffled and dealt to players and the dealer. Hand Size = 2 cards
// 2) Cards dealt are assigned their face value. JQK are = 10 A = 10/11 depending on player's prerogative
// 3) Once hands are dealt, the player may choose to hit or stand. Dealer has to hit if hand is below 17
// The hand closes to 21 wins. Any hand larger than 21 goes bust.

// Make Deck Card generation code from 10.2 - var cardValue implemented (JQK = 10)
// + Initialise an empty deck array as global Var so shuffle cards can refer
var cardDeck = [];
var makeDeck = function () {
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

      var cardValue = rankCounter;

      if (cardName == "jack") {
        cardValue = 10;
      } else if (cardName == "queen") {
        cardValue = 10;
      } else if (cardName == "king") {
        cardValue = 10;
      }

      // Create a new card with the current name, suit, rank and value
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: cardValue,
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

// Shuffle the elements in the cardDeck array (why is cardDeck in the parantheses?)
var shuffleCards = function () {
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

//  At this point we have a shuffled deck with an assigned face value. Except A is still 1. Work on this later. Now we will let each player draw a card until each player has two cards.
playerHand = [];
dealerHand = [];

dealCards = function () {
  var startingDeal = 0;
  playerSHand = [];
  dealerSHand = [];
  while (startingDeal < 2) {
    deal = cardDeck.pop();
    deal2 = cardDeck.pop();
    playerSHand.push(deal);
    console.log("PlayerSHand" + JSON.stringify(playerSHand));
    dealerSHand.push(deal2);
    console.log("DealerSHand" + JSON.stringify(dealerSHand));
    console.log(cardDeck);
    console.log(playerSHand);
    console.log(dealerSHand);
    startingDeal = startingDeal + 1;
  }
  if ((startingDeal = 2)) {
    startingDeal - 2;
  }

  // Sum value of initial hands
  sumStartPV = playerSHand[0].value + playerSHand[1].value;
  sumStartDV = dealerSHand[0].value + dealerSHand[1].value;

  sumOfSPV = sumStartPV;
  sumOfSDV = sumStartDV;

  playerHand = playerSHand;
  dealerHand = dealerSHand;
};

// // Global Var for sumvalue of initial hands?
// var Globaltest = function () {
//   if (sumOfSDV < sumOfSPV) return "Dealer loses";
//   else if (sumOfSDV > sumOfSPV) return "Dealer Wins";
//   else return "Draw";
// };

// At this point, player and dealer are dealt two cards and their values are retrieved. Note that the make deck function makes 1 more deck every time it is called. Now Attempt to let a player hit or stand
var hitMe = function () {
  deal = cardDeck.pop();
  // used unshift instead of push here so index 0 can be read as the new card.
  playerHand.unshift(deal);
  sumPlayerHand =
    playerHand[0].value + playerHand[1].value + playerHand[2].value;
  myOutputValue =
    "You drew" +
    playerHand[0].name +
    playerHand[0].suit +
    " your hand value is " +
    sumPlayerHand;
  return myOutputValue;
};

// In event user needs to hit again?
var hitMe2 = function () {
  deal = cardDeck.pop();
  // used unshift instead of push here so index 0 can be read as the new card.
  playerHand.unshift(deal);
  sumPlayerHand =
    playerHand[0].value +
    playerHand[1].value +
    playerHand[2].value +
    playerHand[3].value;
  myOutputValue =
    "You drew " +
    playerHand[0].name +
    playerHand[0].suit +
    "your hand value is " +
    sumPlayerHand;
  return myOutputValue;
};

// Dealer Hits or stands. Hit if <17
var dealerCheck = function () {
  sumDealerHand = dealerHand[0].value + dealerHand[1].value;
  while (sumOfSDV < 17) {
    deal = cardDeck.pop();
    dealerHand.unshift(deal);
    sumDealerHand =
      dealerHand[0].value + dealerHand[1].value + dealerHand[2].value;
    return sumDealerHand;
  }
};
pHandCheck = sumPlayerHand;
dHandCheck = sumDealerHand;
var main = function (input) {
  if (input == "") {
    makeDeck();
    shuffleCards();
    dealCards();
    var myOutputValue =
      " Dealer starting hand is " +
      sumOfSDV +
      " Player Starting Hand is " +
      sumOfSPV;
    return (
      myOutputValue +
      " Type 'Hit me' for player to get another card or 'Stand' to play against the dealer's hand"
    );
  }
  if (sumOfSDV == 21) {
    return "Blackjack! Dealer wins";
  }
  if (sumOfSPV == 21) {
    return "Blackjack! Player wins";
  }
  if (sumOfSDV && sumOfSPV == 21)
    return "Both dealer and player got a Blackjack! Draw.";
  else if (input == "Hit me") {
    var hitPlayer = hitMe();
    hitPlayer;
    console.log(hitPlayer);
    sumPlayerHand =
      playerHand[0].value + playerHand[1].value + playerHand[2].value;
    return (
      hitPlayer +
      " Type 'Hit me again!' for player to get another card 'Stand' to play against the dealer's hand"
    );
  } else if (input == "Hit me again!") {
    var hitPlayer2 = hitMe2();
    hitPlayer2;
    console.log(hitPlayer2);
    sumPlayerHand =
      playerHand[0].value +
      playerHand[1].value +
      playerHand[2].value +
      playerHand[3].value;
    return hitPlayer2;
  } else if (input == "Stand") {
    checkDealer = dealerCheck();
    checkDealer;
    console.log(checkDealer);
    if (sumPlayerHand < sumDealerHand);
    return (
      "Dealer Wins! Dealer's hand is " +
      sumDealerHand +
      "while player's hand is " +
      sumPlayerHand
    );
  } else if (sumDealerHand < sumPlayerHand)
    return (
      "Player Wins! Dealer's hand is " +
      sumDealerHand +
      "while player's hand is " +
      sumPlayerHand
    );
  else if (sumDealerHand === sumPlayerHand)
    return (
      "Draw! Player has " + sumPlayerHand + "and dealer has " + sumDealerHand
    );
};
