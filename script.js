// [HF] Generate Deck
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥️", "♦️", "♣️", "♠️"];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};
// [HF] Shuffle Deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
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

// Generate Deck when site loads
deck = shuffleCards(makeDeck());
console.log("Deck made");
console.log(deck);

// [HF}Draw card function
var drawCard = function (card) {
  card.push(deck.pop());
};

// [Global Variables]
var playerName = [];
var gameMode = "PlayerName";
var playerHand = [];
var computerHand = [];
var twentyOne = 21;
var dealerLimit = 16;
var pLayerStand = false;
var gameOver = false;

// [HF] General Display of Hands
var showHands = function () {
  return `${playerName}'s Hand : <br> ${showHand2(
    playerHand
  )} <br> Your Current Hand Value = ${valueCal(
    playerHand
  )} <br> <br> Dealer's Hand : <br> ${showHand2(
    computerHand
  )} <br> Dealer's Current Hand Value = ${valueCal(computerHand)}`;
};

// Sub Function of Display of hands - Using loop to cycle through respective hands to display all cards in hand
var showHand2 = function (hand) {
  var allHand = "";
  var handIndex = 0;

  while (handIndex < hand.length) {
    allHand =
      allHand + `| ${hand[handIndex].name} of ${hand[handIndex].suit} | <br>`;
    handIndex = handIndex + 1;
  }

  console.log("all Hand");
  console.log(allHand);
  return allHand;
};

// [HF] Calculate Value of Hand
var valueCal = function (hand) {
  var numAcesInHand = 0;
  var sum = 0;
  var counter = 0;
  while (counter < hand.length) {
    var currCard = hand[counter];
    // If card is Ace, value is 11 by default
    if (currCard.rank == 1) {
      numAcesInHand += 1;
      sum += 11;
    }
    // If card is picture, rank = 10
    else if (
      currCard.rank == 11 ||
      currCard.rank == 12 ||
      currCard.rank == 13
    ) {
      sum += 10;
    }
    // rest of the cards as per rank
    else {
      sum += currCard.rank;
    }
    counter = counter + 1;
  }
  // If total value of hand is > 21, convert all aces value to 1
  if (sum > twentyOne && numAcesInHand > 0) {
    var aceCounter = 0;
    while (aceCounter < numAcesInHand) {
      sum -= 10;
      if (sum <= twentyOne) {
        break;
      }
      aceCounter += 1;
    }
  }
  return sum;
};

// Any Blackjack?
var gotBlackjack = function (hand) {
  return hand.length == 2 && valueCal(hand) == twentyOne;
};

// Main Function
var main = function (input) {
  playerHand = [];
  computerHand = [];
  // Input Validate Player Name
  if (gameMode == "PlayerName" && input == "") {
    return "Please enter your name.";
  }
  // When player enters name. Mode changes to : Deal
  if (input == input && gameMode == "PlayerName") {
    gameMode = "Deal";
    console.log("Should be Deal");
    console.log(gameMode);
    playerName = input;
    return `Welcome ${playerName} ! Click to start Blackjack & deal your hand!`;
  }
  // Game Start
  // Deal Cards
  if (playerHand.length == 0) {
    // deal first card each
    drawCard(playerHand);
    drawCard(computerHand);
    // deal second card each
    drawCard(playerHand);
    drawCard(computerHand);
    gameMode = "HitOrStand";
    console.log("should be hit or stand");
    console.log(gameMode);
    console.log(playerHand);
    console.log(computerHand);
    console.log(gotBlackjack(computerHand));
    console.log(gotBlackjack(playerHand));

    if (
      gotBlackjack(computerHand) == true &&
      gotBlackjack(playerHand) == true
    ) {
      gameOver = true;
      return `What are the chances! It's a lucky day! 🍀 <br><br> ${showHands()} <br><br> Go and buy TOTO or 4D! or Click the "Submit" reshuffle the deck and continue or "Reset" to reset the game for a new player.`;
    }
    if (gotBlackjack(computerHand)) {
      gameOver = true;
      return `Dealer has Blackjack! Oops. <br><br> ${showHands()} <br><br> Click the "Submit" reshuffle the deck and continue or "Reset" to reset the game for a new player.`;
    }
    if (gotBlackjack(playerHand)) {
      gameOver = true;
      return `You got Blackjack! Luck is on your side today! 🍀 <br><br> ${showHands()} <br><br> Click the "Submit" reshuffle the deck and continue or "Reset" to reset the game for a new player.`;
    }
    return `${showHands()} <br><br> Would you like to Hit! or Stand? <br>`;
  }
  // if (gameMode - "HitOrStand") {
  //   if (hitButton.addEventListener("click", drawCard(playerHand)))
  //     console.log(playerHand);
  //   return showHands;
  // }

  return `Click the "Submit" reshuffle the deck and continue or "Reset" to reset the game for a new player.`;
};

// Player goes first, decide to HIT or STAND
// Total Score of each player will be compared
// Closest < or = 21 wins.
