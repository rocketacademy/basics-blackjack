// Global variables needed
var cardDeck = [];
var shuffledCardDeck = [];
var playerCards = [];
var compCards = [];
var gameMode = "Deal Cards";
var blackJackWin = "False";
var playerCardValue = 0;
var compCardValue = 0;
var playerHandMessage = "";

var main = function (input) {
  // Shuffle card deck automatically at the start
  shuffledCardDeck = shuffleTheDeck(deckGenerator());
  console.log("This deck of cards has been shuffled.");

  if (gameMode == "Deal Cards") {
    dealCards();
    console.log(playerCards);
    console.log(compCards);
    var myOutputValue = blackjackCheck(playerCards, compCards);
    if (blackJackWin == "True") {
      resetBlackJack();
      return myOutputValue;
    }

    // calculate score for player & computer
    playerCardValue = scoreCalculation(playerCards);
    console.log("The Player Card Value is " + playerCardValue);
    // output cards and score to player for decision making
    gameMode = "Hit or Stand";
    for (var m = 0; m < playerCards.length; m++) {
      playerHandMessage =
        playerHandMessage +
        playerCards[m].name +
        " of " +
        playerCards[m].suit +
        "<br>";
    }
    return `Your Hand: <br> ${playerHandMessage} <br> Your cards total: ${playerCardValue}. <br> Submit "hit" to draw another card or "stand" to pass.`;
  }
  // Let player choose to hit or stand
  if (gameMode == "Hit or Stand") {
    if (input.toLowerCase() != "stand" && input.toLowerCase() != "hit") {
      return `Submit "hit" to draw another card or "stand" to pass. <br> <br> Your Hand: <br> ${playerHandMessage} <br> Your cards total: ${playerCardValue}. <br> `;
    }
    if (input.toLowerCase() == "stand") {
      compAutoPlay(compCards);
      myOutputValue = winnerCheck(playerCardValue, compCardValue);
      resetBlackJack();
      // return win / loss results
      return myOutputValue;
    }

    //player decides to draw a card
    if (input.toLowerCase() == "hit") {
      console.log("The START FUNCTION Player Card Value is " + playerCardValue);
      // push a card into the player's array
      playerCards.push(drawCard());
      console.log(playerCards);
      playerCardValue = scoreCalculation(playerCards);
      console.log(
        "After hitting a card, the player's card score is" + playerCardValue
      );
      if (playerCardValue > 21) {
        compAutoPlay(compCards);
        console.log("Computer's card value is " + compCardValue);
        myOutputValue = winnerCheck(playerCardValue, compCardValue);
        resetBlackJack();
        // return win / loss results
        return "You bust!" + myOutputValue;
      }
      console.log("The Player Card Value is " + playerCardValue);
      playerHandMessage = "";
      for (var m = 0; m < playerCards.length; m++) {
        playerHandMessage =
          playerHandMessage +
          playerCards[m].name +
          " of " +
          playerCards[m].suit +
          "<br>";
      }
      return `Your Hand: <br> ${playerHandMessage} <br> Your cards total: ${playerCardValue}. <br> Submit "hit" to draw another card or "stand" to pass.`;
    }
  }
};

var compAutoPlay = function (compCards) {
  // calculate score for computer --> draw automatically if below 17
  compCardValue = scoreCalculation(compCards);
  console.log("The Comp Card Value is " + compCardValue);
  while (compCardValue < 17) {
    compCards.push(drawCard());
    compCardValue = scoreCalculation(compCards);
    console.log(
      "After drawn card, the Comp Card Value now is " + compCardValue
    );
  }
};

// score comparison function
var winnerCheck = function (playerCardValue, compCardValue) {
  // check if there is a draw in scores --> if yes return tie message
  if (
    playerCardValue == compCardValue ||
    (playerCardValue > 21 && compCardValue > 21)
  ) {
    var message = "It's a tie";
    return message;
  }

  if (playerCardValue > 21 && compCardValue <= 21) {
    message = "Computer wins!";
    return message;
  } else if (playerCardValue <= 21 && compCardValue > 21) {
    message = "Player wins!";
    return message;
  }

  if (playerCardValue <= 21 && compCardValue <= 21) {
    if (playerCardValue > compCardValue) {
      message = " player wins";
    } else {
      message = "comp wins";
    }
    return message;
  }
};

// card score calculation function with check for number of ace cards
var scoreCalculation = function (cardArray) {
  var aceCardPosition = [];
  console.log("Card Array taken in at score calculation");
  console.log(cardArray);

  // check for ace cards and keep a record of which position it is in
  for (var a = 0; a < cardArray.length; a++) {
    if (cardArray[a].rank == 1) {
      aceCardPosition.push(a);
    }
  }
  console.log("aceCardPosition Array is");
  console.log(aceCardPosition);

  // if number of cards > 2, value of ace is equal to 1
  if (cardArray.length > 2 && aceCardPosition != []) {
    for (var i = 0; i < aceCardPosition.length; i++) {
      cardArray[aceCardPosition[i]].value = 1;
    }
  }

  var finalCardValue = 0;
  // add all values of the cards in a loop
  for (var j = 0; j < cardArray.length; j++) {
    finalCardValue = finalCardValue + cardArray[j].value;
    console.log(finalCardValue);
  }

  return finalCardValue;
};

// reset function to revert all arrays and variables
var resetBlackJack = function () {
  playerCards = [];
  compCards = [];
  gameMode = "Deal Cards";
  blackJackWin = "False";
  playerHandMessage = "";
};

//

// NEED TO CLEAN UP: Check for winning condition of blackjack
var blackjackCheck = function (playerCards, compCards) {
  var playerWonMessage = "";
  var compWonMessage = "";
  var cardsTally = `<br> Player drew: ${playerCards[0].name} of ${playerCards[0].suit} and ${playerCards[1].name} of ${playerCards[1].suit}. 
  <br> The computer drew: ${compCards[0].name} of ${compCards[0].suit} and ${compCards[1].name} of ${compCards[1].suit}`;
  if (
    (playerCards[0].rank == 1 || playerCards[1].rank == 1) &&
    (playerCards[0].value == 10 || playerCards[1].value == 10)
  ) {
    playerWonMessage = `You drew black jack! `;
    blackJackWin = "True";
  }
  if (
    (compCards[0].rank == 1 || compCards[1].rank == 1) &&
    (compCards[0].value == 10 || compCards[1].value == 10)
  ) {
    compWonMessage = `Computer drew black jack! `;
    blackJackWin = "True";
  }
  return (
    playerWonMessage +
    compWonMessage +
    "<br>" +
    cardsTally +
    "<br><br> Please press submit to shuffle the cards and deal again."
  );
};

var drawCard = function () {
  var card = shuffledCardDeck.pop();
  return card;
};

// first deal of cards
var dealCards = function () {
  var numOfDealtCards = 0;
  playerCards = [
    { name: `Ace`, rank: 1, value: 11, suit: `Diamonds♦️` },
    { name: `9`, rank: 9, value: 9, suit: `Hearts♥️` },
    //{ name: `3`, rank: 3, value: 3, suit: `Hearts` },
  ];
  compCards = [
    { name: `ace`, rank: 1, value: 11, suit: `clubs` },
    { name: `two`, rank: 12, value: 2, suit: `spades` },
  ];
  console.log("PLAYER cards are " + playerCards);
  console.log("COMPUTER cards are " + compCards);
  return playerCards, compCards;

  while (numOfDealtCards < 2) {
    playerCards = playerCards.push(drawCard());
    compCards = compCards.push(drawCard());
    numOfDealtCards = numOfDealtCards + 1;
  }
  return playerCards, compCards;
};

// Generate a random number for use in functions
var getRandomNum = function (maxNum) {
  var randomNum = Math.floor(Math.random() * maxNum);
  var finalNum = randomNum + 1;
  return finalNum;
};

// Shuffle function for generated card deck
var shuffleTheDeck = function () {
  var currentCardPosition = 0;
  // loop the shuffling from card 1 to card 52
  while (currentCardPosition < cardDeck.length) {
    // generate a number or position to draw from
    var randomPosition = getRandomNum(cardDeck.length);
    // store both cards in temporary variables
    var randomCard = cardDeck[randomPosition];
    var currentCard = cardDeck[currentCardPosition];
    // slide random card into the current card deck position
    cardDeck[currentCardPosition] = randomCard;
    // slide current card into random deck position
    cardDeck[randomPosition] = currentCard;
    currentCardPosition = currentCardPosition + 1;
  }
  return cardDeck;
};

// Generate card deck
var deckGenerator = function () {
  // a card deck consists of 4 suits and 13 cards in each suit
  var suitCounter = 0;
  var suitArray = ["Diamonds", "Clubs", "Hearts", "Spades"];
  // for every suit, generate 13 cards
  while (suitCounter < suitArray.length) {
    var cardCounter = 1;
    while (cardCounter <= 13) {
      var card = {
        name: `${cardCounter}`,
        rank: cardCounter,
        value: cardCounter,
        suit: `${suitArray[suitCounter]}`,
      };
      // change the name for special cards: ace, jack, queen and king
      if (cardCounter == 1) {
        card.name = "Ace";
        card.value = 11;
      } else if (cardCounter == 11) {
        card.name = "Jack";
        card.value = 10;
      } else if (cardCounter == 12) {
        card.name = "Queen";
        card.value = 10;
      } else if (cardCounter == 13) {
        card.name = "King";
        card.value = 10;
      }
      // add the card into the card deck
      cardDeck.push(card);
      cardCounter = cardCounter + 1;
    }
    suitCounter = suitCounter + 1;
  }
  return cardDeck;
};

// IGNORE FIRST: check how many users there are

// More comfortable features

// Betting: The player starts with 100 points. Each round the player wagers a number of points before their hand is dealt. Keep track of the player's points throughout the game.

// Multiplayer: Enable multiple players to play against the dealer, where players can take turns. The game hides and shows relevant hand according to the turn.

// Splitting: Add hand-splitting functionality to the game. If the player has two of the same kind of card, they can choose to split and get dealt 2 new cards. Dealer is not allowed to split.

// Deal cards: Randomly pick & pop two cards for the player and computer
// var dealCards = function (cardNum) {
// playerCards = [
//   { name: `ace`, rank: 1, value: 11, suit: `diamonds` },
//   { name: `queen`, rank: 12, value: 10, suit: `hearts` },
// ];
// compCards = [
//   { name: `ace`, rank: 1, value: 11, suit: `clubs` },
//   { name: `two`, rank: 12, value: 2, suit: `spades` },
// ];
// console.log("player cards are " + playerCards);
// console.log("player cards are " + compCards);
// return playerCards, compCards;

//   var numOfDealtCards = 0;

//   while (numOfDealtCards < cardNum) {
//     playerCards.push(shuffledCardDeck.pop());
//     compCards.push(shuffledCardDeck.pop());
//     numOfDealtCards = numOfDealtCards + 1;
//   }
//   return playerCards, compCards;
// };
