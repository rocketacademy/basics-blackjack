//1. deal the cards to player n computer
//2. for player n computer: add cards (compulsory if <17) or send in final results
//3. evaluate who wins -- need to check if there is "blackjack" (auto-win)
//NOTE : ace can be either 1 or 11

//ONE
//need gamemodes to represent the different clicks (start, draw cards)
//need to create and shuffle game deck (can copy n paste previous codes)
//give 2 cards to player and computer (use push and pop, need arrays in GLOBAL VARIABLE
//check if there is blackjack obtained : if there is -- instant win

//TWO
//need to hit if < 17,
//can choose to hit or stand if >17

//GLOBAL VARIABLES
//need gamemodes to represent the different clicks (start, draw cards)
var gameModeStart = "game has started";
var gameModeDrawCards = "cards are drawn";
var gameModeDecideWinner = "winner is announced";

//need a new game mode for hit or stand
var gameModeHitOrStand = "choose to hit or stand";
var gameMode = gameModeStart;
var myOutputValue = "";

//give 2 cards to player and computer (use push and pop, need arrays in GLOBAL VARIABLE)
var playerCards = [];
var computerCards = [];
var gameDeck = [];

//CREATING DECK
var makeDeck = function () {
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
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

//need to create a function that shuffles the deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var randomCard = cardDeck[randomIndex];
    var currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

//need to create a function that makes a shuffled deck
var shuffleCardDeck = function () {
  var deckOfCards = makeDeck();
  var shuffledDeck = shuffleCards(deckOfCards);
  return shuffledDeck;
};

//GAME FUNCTIONS
//check for blackjack
var checkBlackjackCondition = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "ace" && playerCardOne.rank >= 10)
  ) {
    isBlackJack = true;
  } else {
    isBlackJack = false;
  }
  return isBlackJack;
};

//calculate the values
var caclulateValue = function (handArray) {
  //for J,Q,K , value is 10
  var totalValue = 0;
  var aces = 0;
  var index = 0;
  while (index < handArray.length) {
    var currCard = handArray[index];
    if (
      currCard.name == "jack" ||
      currCard.name == "queen" ||
      currCard.name == "king"
    ) {
      totalValue = totalValue + 10;
    } else {
      totalValue = totalValue + currCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aces) {
    if (totalValue > 21) {
      totalValue = totalValue - 10;
    }
    index = index + 1;
  }
  return totalValue;
};

var main = function (input) {
  //GAME MODE : START GAME
  if (gameMode == gameModeStart) {
    gameDeck = shuffleCardDeck();
    console.log(gameDeck);

    //give 2 cards to player and computer (use push and pop, need arrays in GLOBAL VARIABLE
    playerCards.push(gameDeck.pop());
    playerCards.push(gameDeck.pop());
    computerCards.push(gameDeck.pop());
    computerCards.push(gameDeck.pop());

    console.log(playerCards);
    console.log(computerCards);

    //change the game mode
    gameMode = gameModeDrawCards;
    myOutputValue = "Cards have been dealt. Press button again to see cards.";

    return myOutputValue;
  }
  var playerValue = caclulateValue(playerCards);
  var computerValue = caclulateValue(computerCards);
  console.log("player total value" + playerValue);
  console.log("computer total value" + computerValue);

  //GAME MODE : GAME MODE DRAW CARDS
  if (gameMode == gameModeDrawCards) {
    //call the check blackjack function to check if player or comoputer has obtained blackjack
    var playerHasBlackJack = checkBlackjackCondition(playerCards);
    var computerHasBlackJack = checkBlackjackCondition(computerCards);

    console.log("Does player have Blackjack?" + playerHasBlackJack);
    console.log("Does computer have Blackjack?" + computerHasBlackJack);

    //blackjack condition is fulfilled (either one has blackjack)
    //player has 21
    if (playerHasBlackJack == true && computerHasBlackJack == false) {
      myOutputValue = "Player has blackjack, player wins!";
    }
    //computer has 21
    else if (playerHasBlackJack == false && computerHasBlackJack == true) {
      myOutputValue = "Computer has blackjack, computer wins!";
    }
    //both have blackjack
    else if (playerHasBlackJack == true && computerHasBlackJack == true) {
      myOutputValue = "Player and dealer are tied!";
    } else {
      //hit or stand phase : no blackjack obtained'
      myOutputValue = `No blackjack obtained, move on to hit or stand! Player currently has ${playerValue}, Computer currently has ${computerValue}. You must hit if you have less than 17!`;
    }
    gameMode = gameModeHitOrStand;
    return myOutputValue;
  }

  //TWO : ENTER HIT OR STAND PHASE
  //player enters "hit" or "stand" respectively to hit or to stand
  if (gameMode == gameModeHitOrStand) {
    console.log(gameMode);
    //must hit if < 17
    if (input == "hit") {
      playerCards.push(gameDeck.pop());
      playerValue = caclulateValue(playerCards);
      myOutputValue = `You have drawn another card. Your total hand is now ${playerValue}`;
      return myOutputValue;
    }
    //can proceed to stand and calculate total value if > 17 already
    else if (input == "stand") {
      playerValue = caclulateValue(playerCards);
      computerValue = caclulateValue(computerCards);
    }
    //computer hit or stand phase
    while (computerValue < 17) {
      computerCards.push(gameDeck.pop());
      computerValue = caclulateValue(computerCards);
    }

    //evaluate win conditions in hit or stand phase (note > 21 is instant lose)
    console.log("player hand" + playerValue);
    console.log("computer hand" + computerValue);
    //1. player > computer and player is not more than 21
    if (
      (playerValue > computerValue && playerValue <= 21) ||
      (playerValue <= 21 && computerValue > 21)
    ) {
      console.log("player wins!");
      myOutputValue = `Player wins! Player's total hand is ${playerValue}, computer's total hand is ${computerValue}`;
    }
    //2. player < computer and computer is not more than 21
    else if (
      (computerValue > playerValue && computerValue <= 21) ||
      (computerValue <= 21 && playerValue > 21)
    ) {
      console.log("computer wins!");
      myOutputValue = `Computer wins! Player's total hand is ${playerValue}, computer's total hand is ${computerValue}.`;
    }
    //3. player = computer and both is not more than 21
    else if (
      playerValue == computerValue ||
      (playerValue > 21 && computerValue > 21)
    ) {
      console.log("Tie!");
      myOutputValue = `It is a tie! Player and computer's total hand is ${playerValue}`;
    }
    return myOutputValue;
  }
};
