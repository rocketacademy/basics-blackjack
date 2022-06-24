//store player name after input
var playerName = "";

// To store drawn cards into respective arrays
var cardDeck = [];
var shuffledCardDeck = [];
var playerCards = [];
var compCards = [];

//count num of cards drawn for computer
var numOfCompCardsDrawn = 0;

// for calculation of card values of player and computer
var playerCardValue = 0;
var compCardValue = 0;

// gamemode changes
var gameMode = "Get Name";
var playerClickStand = false;
var blackJackCheck = false;

// To output and display GIFs, drawn card names & suits to player
var allCardsOutput;
var myOutputValue;
var displayGIF;

var main = function (input) {
  if (gameMode == "Get Name") {
    if (input == " " || input == "") {
      displayGIF = `<img src= "https://c.tenor.com/ClQUyrcq3xsAAAAC/rachel-friends.gif"/>`;
      return (
        "Come on, we've gotta know your name. What's your name?<br><br>" +
        displayGIF
      );
    }
    playerName = input;
    button.disabled = true;
    deal.disabled = false;
    gameMode = "Deal Cards";
    displayGIF = `<img src= "https://c.tenor.com/eXVooWYLXh4AAAAC/group-hug-friends.gif"/>`;
    return (
      `Hi ${playerName}, welcome to Black Jack with friends! <br> <br> Please press the DEAL button to start the game. <br><br> ` +
      displayGIF
    );
  }

  if (gameMode == "Deal Cards") {
    deal.disabled = true;
    cardDeck = deckGenerator();
    // Shuffle card deck automatically at the start
    shuffledCardDeck = shuffleTheDeck(cardDeck);
    dealCards();

    myOutputValue = blackjackCheck(playerCards, compCards);
    if (blackJackCheck == true) {
      resetBlackJack();
      return myOutputValue;
    }
    // enable hit & stand buttons, change game mode and output cards and score to player for decision making
    hit.disabled = false;
    stand.disabled = false;
    printCardHands();
    displayGIF =
      '<img src="https://c.tenor.com/ONyBlCzonAEAAAAd/friends-ross-geller.gif"/>';
    gameMode = "Hit or Stand";
    return allCardsOutput + displayGIF;
  }
  // Let player choose to hit or stand
  if (gameMode == "Hit or Stand") {
    if (input == "stand") {
      //draw cards for computer & calculate score
      compAutoPlay(compCards);
      // change mode to fulfil condition in printCardHands function to print both player & comp cards
      playerClickStand = true;
      // return win / loss results
      myOutputValue = winnerCheck(playerCardValue, compCardValue);
      resetBlackJack();
      return myOutputValue;
    }

    //player decides to draw a card
    if (input == "hit") {
      playerCards.push(drawCard());
      // recalculate score of player's cards
      playerCardValue = scoreCalculation(playerCards);

      // if player busts, then move on to calculate comp's card value
      if (playerCardValue > 21) {
        compAutoPlay(compCards);
        myOutputValue = winnerCheck(playerCardValue, compCardValue);
        resetBlackJack();
        return myOutputValue;
      }
      //otherwise, print cards out for player to hit or stand again
      printCardHands();
      displayGIF =
        '<img src="https://c.tenor.com/PtcVKDVeSJkAAAAd/chandler-joey.gif"/>';
      myOutputValue = `You're on a roll. <br> <br> ${allCardsOutput}`;
      return myOutputValue + displayGIF;
    }
  }
};

// Function to Print both player and computer's card hands
var printCardHands = function () {
  // if player hit black jack, or decides to stand or went bust --> print both player & comp cards
  if (
    playerClickStand == true ||
    playerCardValue > 21 ||
    blackJackCheck == true
  ) {
    allCardsOutput =
      "Your Hand: <br>  " +
      printCardsDrawn(playerCards) +
      "Card Total: " +
      playerCardValue +
      "<br> <br> Computer drew " +
      numOfCompCardsDrawn +
      " card(s)!" +
      "<br><br>Computer's Hand: <br>" +
      printCardsDrawn(compCards) +
      "Card Total: " +
      compCardValue;
    return allCardsOutput;
  }
  //otherwise print player's cards only
  allCardsOutput =
    "Your Hand: <br>  " +
    printCardsDrawn(playerCards) +
    "Card Total: " +
    playerCardValue +
    `<br> <br> Press "hit" to draw another card or "stand" to pass. <br><br>`;
};

// Print drawn card names and suits
var printCardsDrawn = function (cardsArray) {
  console.log("Card Array running in print cards is ", cardsArray);
  var cardsDrawn = "";
  for (var m = 0; m < cardsArray.length; m++) {
    cardsDrawn =
      cardsDrawn + cardsArray[m].name + " of " + cardsArray[m].suit + " | ";
  }
  return cardsDrawn;
};

// Computer auto-draw function with score calculation
var compAutoPlay = function (compCards) {
  // calculate score for computer --> draw automatically if below 17
  compCardValue = scoreCalculation(compCards);
  while (compCardValue < 17) {
    compCards.push(drawCard());
    compCardValue = scoreCalculation(compCards);
    numOfCompCardsDrawn = numOfCompCardsDrawn + 1;
  }
};

// score comparison function
var winnerCheck = function (playerCardValue, compCardValue) {
  printCardHands();

  // if both went bust
  if (playerCardValue > 21 && compCardValue > 21) {
    displayGIF =
      '<img src="https://c.tenor.com/AKfJwJjsB1sAAAAd/won-what-it-do-baby.gif"/>';
    message =
      playerName + ", you bust. Phew, the computer did too. It's a tie!<br>";
  }
  // if only player went bust
  if (playerCardValue > 21 && compCardValue <= 21) {
    message = playerName + ", you bust! Computer wins!";
    displayGIF =
      '<img src="https://c.tenor.com/5Si0PouONMgAAAAC/tv-shows-friends.gif"/>';
  }
  // if only computer went bust
  if (playerCardValue <= 21 && compCardValue > 21) {
    message = playerName + ", you win!";
    displayGIF =
      '<img src="https://c.tenor.com/hdvxjTbUuzsAAAAC/thumbs-up-friends.gif"/>';
  }

  // if both the player and computer did not go bust
  if (playerCardValue <= 21 && compCardValue <= 21) {
    if (playerCardValue > compCardValue) {
      message = playerName + ", you win!";

      displayGIF = '<img src="https://c.tenor.com/jCWKfaqDAjAAAAAC/xo.gif"/>';
    } else {
      message = "Computer wins!";
      displayGIF =
        '<img src="https://c.tenor.com/r-6R6x0fQpUAAAAd/friends-leatylrs.gif"/>';
    }
  }
  // if it's a tie
  if (playerCardValue == compCardValue) {
    displayGIF =
      '<img src="https://c.tenor.com/ED2g4lkO9qgAAAAC/friends-joey-tribbiani.gif"/>';
    message = "It's a tie!";
  }
  // return specific messages & card hands
  return (
    displayGIF +
    "<br><br>" +
    message +
    "<br><br>" +
    allCardsOutput +
    "<br><br> Please press the DEAL button to shuffle the cards and start the next round."
  );
};

// card score calculation function with check for number of ace cards
var scoreCalculation = function (cardArray) {
  var aceCardPosition = [];
  // check for ace cards and keep a record of which position it is in
  for (var a = 0; a < cardArray.length; a++) {
    if (cardArray[a].rank == 1) {
      aceCardPosition.push(a);
    }
  }
  // check for cases of double aces and change ace value to 1 for 1 card
  if (cardArray.length == aceCardPosition.length) {
    cardArray[1].value = 1;
  }

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
  }

  return finalCardValue;
};

// reset function to revert all arrays and variables
var resetBlackJack = function () {
  cardDeck = [];
  playerCards = [];
  compCards = [];

  gameMode = "Deal Cards";
  playerClickStand = false;
  blackJackCheck = false;
  numOfCompCardsDrawn = 0;
  displayGIF = ``;
  allCardsOutput = ``;

  // reset buttons
  hit.disabled = true;
  stand.disabled = true;
  deal.disabled = false;
};

//

// Check for winning condition of blackjack
var blackjackCheck = function (playerCards, compCards) {
  playerCardValue = scoreCalculation(playerCards);
  compCardValue = scoreCalculation(compCards);
  var message = "";

  if (playerCardValue == 21) {
    displayGIF = `<img src= "https://c.tenor.com/1IkwhlSSubUAAAAC/friends-excited.gif"/>`;
    message = `You drew black jack! <br>`;
    blackJackCheck = true;
  }
  if (compCardValue == 21) {
    displayGIF = `<img src= "https://c.tenor.com/f16uJcDbB60AAAAC/chandler-bing.gif"/>`;
    message = `Computer drew black jack! <br> `;
    blackJackCheck = true;
  }

  printCardHands();
  return (
    displayGIF +
    "<br><br>" +
    message +
    "<br>" +
    allCardsOutput +
    "<br><br> Please press the DEAL button to shuffle the cards and start the next round."
  );
};

var drawCard = function () {
  var card = shuffledCardDeck.pop();
  return card;
};

// first deal of cards
var dealCards = function () {
  var numOfDealtCards = 0;
  while (numOfDealtCards < 2) {
    playerCards.push(drawCard());
    compCards.push(drawCard());
    numOfDealtCards = numOfDealtCards + 1;
  }
  return playerCards, compCards;
};

// Generate a random number for use in functions
var getRandomNum = function (maxNum) {
  var randomNum = Math.floor(Math.random() * maxNum);
  return randomNum;
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
  var suitArray = ["Diamonds ♦️", "Clubs ♣️", "Hearts ♥️", "Spades ♠️"];
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
