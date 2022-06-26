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
    shuffledCardDeck = shuffleTheDeck(cardDeck);
    // deal cards to player & computer
    dealCards();
    // check cards for any black jacks
    myOutputValue = blackjackCheck(playerCards, compCards);
    if (blackJackCheck == true) {
      resetBlackJack();
      return myOutputValue;
    }
    // enable hit & stand buttons, change game mode and output cards and score to player for decision making
    hit.disabled = false;
    stand.disabled = false;
    // function to print out cards and store it under variable allCardsOutput
    printCardHands();
    displayGIF =
      '<img src="https://c.tenor.com/ONyBlCzonAEAAAAd/friends-ross-geller.gif"/>';
    gameMode = "Hit or Stand";
    return allCardsOutput + displayGIF;
  }
  // Let player choose to hit or stand
  if (gameMode == "Hit or Stand") {
    if (input == "stand") {
      //draw cards for computer if < 17 & calculate score to store it under compCardValue
      compAutoPlay(compCards);
      // change mode to fulfil condition in printCardHands function to print BOTH player & comp cards
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
      console.log("Score calculation after hit ", playerCardValue);
      // if player busts, then move on to calculate comp's card value
      if (playerCardValue > 21) {
        compAutoPlay(compCards);
        myOutputValue = winnerCheck(playerCardValue, compCardValue);
        resetBlackJack();
        return myOutputValue;
      }
      //otherwise, print cards out and store it under variable allCardsOutput for player to hit or stand again
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

// Print drawn card names and suits in words
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
  var message = "";
  // if it's a tie
  if (playerCardValue == compCardValue) {
    message = "It's a tie!";
    displayGIF =
      '<img src="https://c.tenor.com/ED2g4lkO9qgAAAAC/friends-joey-tribbiani.gif"/>';
  }

  // if only player went bust
  if (playerCardValue > 21 && compCardValue <= 21) {
    message = `You bust! Computer wins. Better luck next time ${playerName}!`;
    displayGIF =
      '<img src="https://c.tenor.com/5Si0PouONMgAAAAC/tv-shows-friends.gif"/>';
  }
  // if only computer went bust
  if (playerCardValue <= 21 && compCardValue > 21) {
    message = `${playerName}, you win! The computer bust.`;
    displayGIF =
      '<img src="https://c.tenor.com/hdvxjTbUuzsAAAAC/thumbs-up-friends.gif"/>';
  }

  // if both the player and computer did not go bust
  if (playerCardValue <= 21 && compCardValue <= 21) {
    if (playerCardValue > compCardValue) {
      message = `${playerName}, you win!`;
      displayGIF = '<img src="https://c.tenor.com/jCWKfaqDAjAAAAAC/xo.gif"/>';
    } else if (playerCardValue < compCardValue) {
      message = `Oh no, Computer wins. Better luck next time ${playerName}!`;
      displayGIF =
        '<img src="https://c.tenor.com/r-6R6x0fQpUAAAAd/friends-leatylrs.gif"/>';
    }
  }
  // if both went bust
  if (playerCardValue > 21 && compCardValue > 21) {
    message = `${playerName}, you bust. Phew, the computer did too. It's a tie!<br>`;
    displayGIF =
      '<img src="https://c.tenor.com/AKfJwJjsB1sAAAAd/won-what-it-do-baby.gif"/>';
  }

  // return specific messages & card hands
  return (
    displayGIF +
    "<br><br>" +
    message +
    "<br><br>" +
    allCardsOutput +
    "<br><br> Press the DEAL button to shuffle the cards and start the next round."
  );
};

// card score calculation function with check for number of ace cards
var scoreCalculation = function (cardArray) {
  var aceCardPosition = [];
  var otherCards = [];

  // check for ace cards (if any) and keep a record of which position it is in
  for (var a = 0; a < cardArray.length; a++) {
    if (cardArray[a].rank == 1) {
      aceCardPosition.push(a);
    } else {
      //push the other non-aces cards into another array
      otherCards.push(cardArray[a]);
    }
  }
  // calculate value of other non-aces cards to determine the desired value(s) of ace(s)
  var otherCardsValue = 0;
  for (var i = 0; i < otherCards.length; i++) {
    otherCardsValue = otherCardsValue + otherCards[i].value;
    console.log("other cards value is ", otherCardsValue);
  }

  console.log("other cards length is ", otherCards.length);
  console.log("acecardposition array is ", aceCardPosition);
  console.log("acecardposition length is ", aceCardPosition.length);

  // if there are aces --> check if it is a drawn card OR a case of all aces -->  if yes, check if the value of the other cards is too high
  if (
    aceCardPosition.length !== 0 &&
    (cardArray.length > 2 || cardArray.length == aceCardPosition.length)
  ) {
    // if other card value > 9 (10 and above), change all aces to value of 1 to avoid busting
    if (otherCardsValue > 9) {
      for (var i = 0; i < aceCardPosition.length; i++) {
        cardArray[aceCardPosition[i]].value = 1;
      }
    }
    // if other card value = 9 and less, retain ONE ace == 11 & change the rest to keep the score elevated
    if (otherCardsValue <= 9) {
      for (var i = 0; i < aceCardPosition.length - 1; i++) {
        cardArray[aceCardPosition[i]].value = 1;
      }
    }
  }

  var finalCardValue = 0;
  //recalculate final score after ace adjustment
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
  // if player hit blackjack
  if (playerCardValue == 21) {
    displayGIF = `<img src= "https://c.tenor.com/1IkwhlSSubUAAAAC/friends-excited.gif"/>`;
    message = `You drew black jack! <br>`;
    blackJackCheck = true;
  }
  // if comp hit blackjack
  if (compCardValue == 21) {
    displayGIF = `<img src= "https://c.tenor.com/f16uJcDbB60AAAAC/chandler-bing.gif"/>`;
    message = `Computer drew black jack! <br> `;
    blackJackCheck = true;
  }
  //if both hit black jack
  if (compCardValue == 21 && playerCardValue == 21) {
    displayGIF = `<img src= "https://c.tenor.com/0QU35MTbwP4AAAAM/leatylrs-friends.gif"/>`;
    message = `WOW. Both of you got Black Jack! It's a tie! <br> `;
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
