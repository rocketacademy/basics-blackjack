/*==========================================================================
============================HELPER FUNCTIONS================================
============================================================================*/

//Keep track of player and computer generated cards.
playerHand = [];
computerHand = [];

//gamemodes
const playerName = "name";
const deal = "deal";
const hitOrStand = "hit or stand";

var gameMode = playerName;

var playerPoints = 100;
var computerPoints = 100;

var makeDeck = function () {
  //  empty deck array
  var cardDeck = [];
  //  array of the 4 suits in our deck. We will loop over this array.
  var suits = ["♣", "♦", "♥", "♠"];

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

      // to set jack/queen/king as card value 10
      if (cardName == "Jack" || cardName == "Queen" || cardName == "King") {
        var cardValue = 10;
      } // initialise ace as value 11
      else if (cardName == "ace") {
        cardValue = 11;
      } else if (cardName < 11) {
        // card value for number cards are same as rank
        cardValue = rankCounter;
      }

      // Create a new card with the current name, suit, and rank
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

// loop to return a string of ranks and suits of cards
var printCards = function (cards) {
  var returnString = "";
  var counter = 0;
  while (counter < cards.length) {
    returnString += `${cards[counter].name} of ${cards[counter].suit} | `;
    counter += 1;
  }

  return returnString;
};

// loop to sum cards value from playerhand/computerhand array
var sumOfCardsValue = function (cards) {
  var cardsValue = 0;
  var counter1 = 0;
  var aceCounter = 0;

  while (counter1 < cards.length) {
    cardsValue += cards[counter1].value;
    if (cards[counter1].name == "ace") {
      aceCounter += 1;
    }
    counter1 += 1;
  }

  for (i = 0; i < aceCounter; i += 1) {
    if (cardsValue > 21) {
      cardsValue = cardsValue - 10;
    }
  }
  console.log(`Player Cards value: ${cardsValue}`);
  return cardsValue;
};

// function to display 1 card for dealer during initial phase of the game so the cards drawn by dealer are not shown
var partialMessage = function (playerHand, computerHand) {
  var playerHandValue = sumOfCardsValue(playerHand);
  var message = `Player cards: ${printCards(
    playerHand
  )} <br> Total value: ${playerHandValue} <br><br> Dealer cards: ${
    computerHand[0].name
  } of ${computerHand[0].suit} | Covered`;
  return message;
};

// function to display default message for player and computer cards at the end of the game
var cardMessage = function (playerHand, computerHand) {
  var playerHandValue = sumOfCardsValue(playerHand);
  var computerHandValue = sumOfCardsValue(computerHand);
  var message = `Player cards: ${printCards(
    playerHand
  )} <br> Total value: ${playerHandValue} <br><br> Dealer cards: ${printCards(
    computerHand
  )} <br> Total value: ${computerHandValue}`;
  return message;
};

// check if cards are blackjack
var isBlackjack = function (hand) {
  return sumOfCardsValue(hand) == 21 && hand.length == 2;
};

// compare player and dealer cards to check win/tie/lose
var compareCards = function (playerHand, computerHand) {
  playerHandValue = sumOfCardsValue(playerHand);
  computerHandValue = sumOfCardsValue(computerHand);

  // if playerHand sum > computerHand sum And within 21, OR computer busts, player wins
  if (
    (playerHandValue <= 21 && playerHandValue > computerHandValue) ||
    (playerHandValue <= 21 && computerHandValue > 21)
  ) {
    playerPoints += 20;
    computerPoints -= 20;
    return `<br><br> ${userName} won!<br>${myImages.win}<br>Player points: ${playerPoints}<br>Dealer Points: ${computerPoints}`;
  }

  // if player and computer hands have same sum/blackjack/bust, it's a tie
  if (
    playerHandValue == computerHandValue ||
    (isBlackjack(playerHand) && isBlackjack(computerHand)) ||
    (playerHandValue > 21 && computerHandValue > 21)
  ) {
    return `<br><br> Its a tie!<br>${myImages.tie}<br>Player points: ${playerPoints}<br>Dealer Points: ${computerPoints}`;
  }
  playerPoints -= 20;
  computerPoints += 20;
  return `<br><br> Computer lost!<br>${myImages.lose}<br>Player points: ${playerPoints}<br>Dealer Points: ${computerPoints}`;
};

//function to create deck
var createDeck = function () {
  var cardDeck = makeDeck();
  var shuffledDeck = shuffleCards(cardDeck);
  return shuffledDeck;
};

//function to deal cards out from deck
var gameDeck = createDeck();
var dealCardToHand = function (hand) {
  hand.push(gameDeck.pop());
};

//GIF images
var myImages = {
  win: '<img src = "https://c.tenor.com/R0QirnNSE1IAAAAM/hungry-lunch.gif"/>',
  lose: '<img src = "https://c.tenor.com/Iqe3ZCbG3sQAAAAM/top-gearv-jeremy-clarkson-loser.gif">',
  tie: '<img src = "https://c.tenor.com/wyfhYqF1tJIAAAAC/mark-wahlberg-wahlberg.gif">',
  coins:
    '<img src = "https://media3.giphy.com/media/2ZYKKfCr0rkvvTkdum/giphy.gif?cid=790b7611544be4162882869dea57f05e2654a1f2e273f8f7&rid=giphy.gif&ct=s">',
  amazing:
    '<img src = "https://c.tenor.com/7K6-QsniJsYAAAAM/cards-card-trick.gif">',
  shy: '<img src = "https://i.pinimg.com/originals/a2/75/9c/a2759cac591dd68117fba869bb92b5f0.gif">',
};

/*==========================================================================
============================GAME FUNCTIONS==================================
============================================================================*/

//function to ask user for name
var userNameInput = function (input) {
  if (input != "") {
    userName = input;
    gameMode = deal;
    return `Fantastic name you got there ${userName}<br><br>Please name you got that please input "deal" to get this game rolling!<br><br>${myImages.amazing}`;
  } else {
    return `Sorry partner didn't see your name there!
      <br></br>
      Don't be shy, please type in your name :)<br><br>${myImages.shy}`;
  }
};

//function to deal cards out to player and dealer and also checking for any blackjack wins in the initial phase
var dealCards = function (playerChoice) {
  if (playerChoice == "deal") {
    playerHand = [gameDeck.pop(), gameDeck.pop()];
    computerHand = [gameDeck.pop(), gameDeck.pop()];
    console.log(playerHand);
    console.log(computerHand);
    gameMode = hitOrStand;
    return `${partialMessage(
      playerHand,
      computerHand
    )}<br><br> please press hit or stand to continue.`;
  }
  if (isBlackjack(playerHand) && !isBlackjack(computerHand)) {
    gameMode = deal;
    playerPoints += 20;
    computerPoints -= 20;
    return `${cardMessage(
      playerHand,
      ComputerHand
    )} <br><br> ${userName} won by Blackjack! Please click on "Submit" to play a new game!<br>${
      myImages.win
    }<br><br>Player points: ${playerPoints}<br>Dealer Points: ${computerPoints}`;
  }
  if (!isBlackjack(playerHand) && isBlackjack(computerHand)) {
    gameMode = deal;
    computerHand += 20;
    playerPoints -= 20;
    return `${cardMessage(
      playerHand,
      ComputerHand
    )} <br><br> ${userName} Lost!<br><br>Dealer won by Blackjack! Please click on "Submit" to play a new game!<br>${
      myImages.lose
    }Player points: ${playerPoints}<br>Dealer Points: ${computerPoints}`;
  }
  if (isBlackjack(playerHand) && isBlackjack(computerHand)) {
    gameMode = deal;
    return `${cardMessage(
      playerHand,
      ComputerHand
    )} <br><br> It's a Blackjack tie! Please click on "Submit" to play a new game!<br>${
      myImages.tie
    }`;
  }
  if (playerChoice == "" || playerChoice != "deal") {
    return `Input not recognised. please input "deal" to issue the cards!<br>Player points: ${playerPoints}<br>Dealer Points: ${computerPoints}`;
  }
};

//function to hit(draw cards) ot stand to show cards and determine winner
var hitOrStandCards = function (playerChoice) {
  if (playerChoice == "hit") {
    dealCardToHand(playerHand);
    console.log(playerHand);
    return `${partialMessage(
      playerHand,
      computerHand
    )}<br><br>Please input "hit" to draw more cards or "stand" to proceed to a showdown with the dealer!`;
  } else if (
    (playerChoice == "" && playerChoice != "hit") ||
    playerChoice != "stand"
  ) {
    return `${partialMessage(
      playerHand,
      computerHand
    )}<br><br>Input not recognised. Please input "hit" to draw more cards or "stand" to proceed to showdown with the dealer.`;
  }

  if (playerChoice == "stand") {
    playerHandValue = sumOfCardsValue(playerHand);
    computerHandValue = sumOfCardsValue(computerHand);
    gameMode = deal;
    while (computerHandValue < 17) {
      dealCardToHand(computerHand);
      computerHandValue = sumOfCardsValue(computerHand);
    }
    console.log(`Player final value: ${playerHandValue}`);
    console.log(`Dealer final value: ${computerHandValue}`);
    return `${cardMessage(playerHand, computerHand)} 
      ${compareCards(
        playerHand,
        computerHand
      )}<br><br>Please input "deal" to play another round with the dealer!`;
  }
};

/*==========================================================================
============================MAIN FUNCTION================================
============================================================================*/

var main = function (input) {
  if (gameMode == playerName) {
    var myOutputValue = userNameInput(input);
  } else if (gameMode == deal) {
    myOutputValue = dealCards(input);
  } else if (gameMode == hitOrStand) {
    myOutputValue = hitOrStandCards(input);
  }

  if (playerPoints <= 0) {
    myOutputValue = `${cardMessage(playerHand, computerHand)} 
      ${compareCards(
        playerHand,
        computerHand
      )}<br><br>Dealer is victorious!<br><br>You have lose all your points to the dealer!<br><br>Please refresh the page to play a new round`;
  }

  if (computerPoints <= 0) {
    myOutputValue = `${cardMessage(playerHand, computerHand)} 
      ${compareCards(
        playerHand,
        computerHand
      )}<br><br>${userName} is victorious!<br><br>Dealer has lost all their points to the player!<br><br>Please refresh the page to play a new round`;
  }

  return myOutputValue;
};
