// +++ Deck Code Begins +++

var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ["Diamonds ♦️", "Clubs ♣️", "Hearts ♥️", "Spades ♠️"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currSuit = suits[indexSuits];
    // 13 ranks... ace to king - rank to define "card positions"
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      // define card value - differentiate from rank: 'ace' = 1 / 11, 'jack' & 'queen' & 'king' = 10
      if (cardName == 1) {
        cardName = "Ace";
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = "Jack";
      }
      if (cardName == 12) {
        cardName = "Queen";
      }
      if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};

// Function that generates a random number, used by shuffle deck function
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that shuffles a deck, used by createNewDeck function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};
// --- Deck Code Ends ---

// +++ Game Functions Begins +++

// Function For total
var calculateTotalHandValue = function (cardHand) {
  var totalHandValue = 0;
  var handIndex = 0;
  while (handIndex < cardHand.length) {
    var currentCard = cardHand[handIndex];
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "King" ||
      currentCard.name == "Queen"
    ) {
      totalHandValue = totalHandValue + 10;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    if (cardHand.length == 2 && currentCard.name == "Ace") {
      totalHandValue = totalHandValue + 10;
    }
    handIndex = handIndex + 1;
  }
  return totalHandValue;
};
// *** Global Game Variables ***
var playerHand = [];
var computerHand = [];
var currentGameMode = "waiting to start";

// +++ Minimum Game Function +++

// waiting to start

var main = function (input) {
  var myOutputValue = "";
  var newShuffledDeck = createNewDeck();
  var playerHandTotalValue = calculateTotalHandValue(playerHand);
  var computerHandTotalValue = calculateTotalHandValue(computerHand);

  var displayIndex = 0;
  var displayTotalHandValue = function (playerHand, computerHand) {
    var playerMessage = "Player's Hand is: <br>";
    while (displayIndex < playerHand.length) {
      playerMessage =
        playerMessage +
        playerHand[displayIndex].name +
        " of " +
        playerHand[displayIndex].suit +
        "<br>";
      displayIndex++;
    }
    playerHandTotalValue = calculateTotalHandValue(playerHand);
    var totalPlayerValueMessage = "";
    if (playerHandTotalValue < 17) {
      totalPlayerValueMessage = `Your total cards value is: ${playerHandTotalValue}<br><br>
      <b>Your total card value is less than 17, please input hit to continue.</b>`;
    } else if (playerHandTotalValue > 21) {
      totalPlayerValueMessage = `
      Your total cards value is: ${playerHandTotalValue}<br><br><b>You are bust! Your total card value is more than 21. Please input stand to wait for Computer.</b>`;
    } else {
      totalPlayerValueMessage = `Your total cards value is:  ${playerHandTotalValue}`;
    }

    displayIndex = 0;
    var computerMessage = "Computer's Hand is: <br>";
    while (displayIndex < computerHand.length) {
      computerMessage =
        computerMessage +
        computerHand[displayIndex].name +
        " of " +
        computerHand[displayIndex].suit +
        "<br>";
      displayIndex++;
    }
    computerHandTotalValue = calculateTotalHandValue(computerHand);
    var totalComputerValueMessage =
      "Computer total cards value is: " + computerHandTotalValue;

    return (
      playerMessage +
      "<br>" +
      totalPlayerValueMessage +
      "<br><br>" +
      computerMessage +
      "<br>" +
      totalComputerValueMessage
    );
  };

  if (currentGameMode == "waiting to start") {
    playerHand = [];
    computerHand = [];
    playerHand.push(newShuffledDeck.pop());
    playerHand.push(newShuffledDeck.pop());
    computerHand.push(newShuffledDeck.pop());
    computerHand.push(newShuffledDeck.pop());

    currentGameMode = "gameCardsDrawn";

    myOutputValue = "<b>Click on the submit button to start Blackjack!</b>";
    return myOutputValue;
  }
  if (
    currentGameMode == "gameCardsDrawn" &&
    playerHandTotalValue == 21 &&
    computerHandTotalValue == 21
  ) {
    myOutputValue = `<b>What are the odds! Blackjack! Both you & the computer got Blackjack!</b><br><br>${displayTotalHandValue(
      playerHand,
      computerHand
    )}<br><br> <b>Click on Submit to play a new game!</b>`;
    currentGameMode = "waiting to start";
    newShuffledDeck = createNewDeck();
    return myOutputValue;
  }
  if (currentGameMode == "gameCardsDrawn" && computerHandTotalValue == 21) {
    myOutputValue = `<b>Computer got Blackjack!</b><br><br>${displayTotalHandValue(
      playerHand,
      computerHand
    )}<br><br> <b>Click on Submit to play a new game!</b>`;
    currentGameMode = "waiting to start";
    newShuffledDeck = createNewDeck();
    return myOutputValue;
  }
  if (currentGameMode == "gameCardsDrawn" && playerHandTotalValue == 21) {
    myOutputValue = `<b>Blackjack! Did you cheat?</b><br><br>${displayTotalHandValue(
      playerHand,
      computerHand
    )}<br><br> <b>Click on Submit to play a new game!</b>`;
    currentGameMode = "waiting to start";
    newShuffledDeck = createNewDeck();
    return myOutputValue;
  }

  if (currentGameMode == "gameCardsDrawn") {
    currentGameMode = "player hit or stand";

    return `${displayTotalHandValue(
      playerHand,
      computerHand
    )} <br><br> <b>This is your starting hand. If you have less than 17, input hit to continue. If you have 17 or more, input stand if you wish to stop drawing.</b>`;
  }
  if (currentGameMode == "player hit or stand" && input == "hit") {
    playerHand.push(newShuffledDeck.pop());
    playerHandTotalValue = calculateTotalHandValue(playerHand);
    computerHandTotalValue = calculateTotalHandValue(computerHand);

    myOutputValue = `${displayTotalHandValue(
      playerHand,
      computerHand
    )} <br><br><b> Please input hit or stand to continue</b>`;
    return myOutputValue;
  }
  if (
    currentGameMode == "player hit or stand" &&
    input == "stand" &&
    playerHandTotalValue >= 17
  ) {
    while (computerHandTotalValue < 17) {
      computerHand.push(newShuffledDeck.pop());
      computerHandTotalValue = calculateTotalHandValue(computerHand);
    }

    myOutputValue = `${displayTotalHandValue(
      playerHand,
      computerHand
    )}<br><br><b> Click on Submit to see the results!</b>`;
    currentGameMode = "result of game";
    return myOutputValue;
  }
  if (currentGameMode == "player hit or stand" && playerHandTotalValue > 21) {
    myOutputValue = `<b>Stand</b><br><br>${displayTotalHandValue(
      playerHand,
      computerHand
    )}`;
    return myOutputValue;
  }

  if (currentGameMode == "player hit or stand") {
    myOutputValue = `<b>Game only accepts Hit or Stand function</b><br><br>${displayTotalHandValue(
      playerHand,
      computerHand
    )}`;
    return myOutputValue;
  }

  if (currentGameMode == "result of game") {
    //both bust
    if (computerHandTotalValue > 21 && playerHandTotalValue > 21) {
      myOutputValue = `<b>Both you and the computer are bust! Click on submit to play again!</b><br><br>${displayTotalHandValue(
        playerHand,
        computerHand
      )}`;
      currentGameMode = "waiting to start";
      newShuffledDeck = createNewDeck();
      return myOutputValue;
    }
    // player bust
    if (playerHandTotalValue > 21) {
      myOutputValue = `<b>You are bust! Click on submit to play again!</b><br><br>${displayTotalHandValue(
        playerHand,
        computerHand
      )}`;
      currentGameMode = "waiting to start";
      newShuffledDeck = createNewDeck();
      return myOutputValue;
    }
    // computer bust!
    if (computerHandTotalValue > 21) {
      myOutputValue = `<b>Computer got bust! Click on submit to play again!</b><br><br>${displayTotalHandValue(
        playerHand,
        computerHand
      )}`;
      currentGameMode = "waiting to start";
      newShuffledDeck = createNewDeck();
      return myOutputValue;
    }
    // computer tie
    if (computerHandTotalValue == playerHandTotalValue) {
      myOutputValue = `<b>Both you and computer tied! Click on submit to play again!</b><br><br>${displayTotalHandValue(
        playerHand,
        computerHand
      )}`;
      currentGameMode = "waiting to start";
      newShuffledDeck = createNewDeck();
      return myOutputValue;
    }
    // player wins
    if (computerHandTotalValue < playerHandTotalValue) {
      myOutputValue = `<b>You Won Computer! Click on submit to play again!</b><br><br>${displayTotalHandValue(
        playerHand,
        computerHand
      )}`;
      currentGameMode = "waiting to start";
      newShuffledDeck = createNewDeck();
      return myOutputValue;
    }
    // computer wins
    if (computerHandTotalValue > playerHandTotalValue) {
      myOutputValue = `<b>You lost to Computer! Click on submit to play again!</b><br><br>${displayTotalHandValue(
        playerHand,
        computerHand
      )}`;
      currentGameMode = "waiting to start";
      newShuffledDeck = createNewDeck();
      return myOutputValue;
    }
  }
};
