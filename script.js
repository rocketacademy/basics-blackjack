// blackjack - base third version
// 2 players: user and computer/dealer

// second version: Add Player Hit or Stand
// third version: Add Dealer Hit or Stand
// fourth version: Add Variable Ace Values --- Aces can be 1 or 11

// game mode: 'deal two cards'
// game mode: 'player hit or stand'
// game mode: 'dealer Hit or Stand' --- The computer decides to hit or stand automatically
// game mode: 'pick aces value'

var currentGameMode = "deal two cards";
var shuffledDeck;
var numberOfPlayerCards = 0;
var numberOfComputerCards = 0;
var playerInitialTotalHand = 0;
var computerInitialTotalHand = 0;
var playerTotalHand = 0;
var computerTotalHand = 0;
var playerCardIndex = 0;
var userInput;

// array to track player's and computer's hand
var playerHand = [];
var computerHand = [];
var playerHandValue = [];
var computerHandValue = [];

// making a deck of cards: 52 cards with 4 suits (13 cards each suit)
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

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
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
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
  //console.log(cardDeck);
  return cardDeck;
};

var shuffledDeck = shuffleCards(makeDeck());

// getting 2 random cards for each player
var dealTwoCards = function () {
  // Draw 4 cards from the top of the deck
  var playerCard1 = shuffledDeck.pop();
  numberOfPlayerCards += 1;
  var computerCard1 = shuffledDeck.pop();
  numberOfComputerCards += 1;
  var playerCard2 = shuffledDeck.pop();
  numberOfPlayerCards += 1;
  var computerCard2 = shuffledDeck.pop();
  numberOfComputerCards += 1;

  //push drawn cards info to array
  playerHand.push(playerCard1);
  playerHand.push(playerCard2);
  computerHand.push(computerCard1);
  computerHand.push(computerCard2);
  console.log("player's hand array: ");
  console.log(playerHand);
  console.log("computer's hand array: ");
  console.log(computerHand);

  // push drawn cards value/rank to array
  playerHandValue.push(playerCard1.rank);
  playerHandValue.push(playerCard2.rank);
  computerHandValue.push(computerCard1.rank);
  computerHandValue.push(computerCard2.rank);

  console.log("player's hand value: " + playerHandValue);
  console.log("computer's hand value: " + computerHandValue);

  //to get the total initial hand of the player
  playerTotalHand = 0;
  var counter = 0;
  while (counter < playerHandValue.length) {
    playerTotalHand += playerHandValue[counter];
    counter += 1;
    console.log("player total hand: " + playerTotalHand);
  }

  //to get the total initial hand of the computer
  computerTotalHand = 0;
  var counter = 0;
  while (counter < computerHandValue.length) {
    computerTotalHand += computerHandValue[counter];
    counter += 1;
    console.log("computer total hand: " + computerTotalHand);
  }

  var myOutputValue = `Player drawn ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit}.<br> Computer drawn ${computerCard1.name} of ${computerCard1.suit} and ${computerCard2.name} of ${computerCard2.suit}. <br> <br> Player's total hand is ${playerTotalHand}. <br> Computer's total hand is ${computerTotalHand}. <br><br> Player do you want to 'hit' or 'stand'? <br> Please type out your choice, and click the 'Submit' button.`;

  //moving to the next game
  currentGameMode = "player hit or stand";
  return myOutputValue;
};

var hitOrStand = function (input) {
  var myOutputValue = "";

  if (currentGameMode == "player hit or stand") {
    if (userInput == "hit") {
      // player take 1 card
      playerCard = shuffledDeck.pop();
      //push drawn cards info to array
      playerHand.push(playerCard);
      console.log("player's hand array: ");
      console.log(playerHand);

      numberOfPlayerCards += 1;
      console.log("number of player's cards in hand: " + numberOfPlayerCards);

      playerTotalHand += playerCard.rank;
      console.log("player total hand: " + playerTotalHand);
      myOutputValue += `Player chose to take another card, which is ${playerCard.name} of ${playerCard.suit}. <br>`;
    } else if (userInput == "stand") {
      myOutputValue += `You chose to end your turn. <br>`;
    }
  }
  // computer decides to hit or stand automatically
  // computer has to hit if their hand is below 17
  if (computerTotalHand <= 16) {
    // computer take 1 card
    computerCard = shuffledDeck.pop();
    //push drawn cards info to array
    computerHand.push(computerCard);
    console.log("computer's hand array: ");
    console.log(computerHand);

    numberOfComputerCards += 1;
    console.log("number of computer's cards in hand: " + numberOfComputerCards);

    computerTotalHand += computerCard.rank;
    console.log("computer total hand: " + computerTotalHand);
  } else {
    // computer has to stand if their hand is 17 or higher
  }

  return myOutputValue;
};

var totalHand = function (input) {
  var myOutputValue = "";

  // to see the player's hand
  myOutputValue += `<br> Player's cards are: <br>`;
  var counter = 0;
  while (counter < numberOfPlayerCards) {
    myOutputValue += `${playerHand[counter].name} of ${playerHand[counter].suit} <br>`;
    counter += 1;
  }

  // to see the computer's hand
  myOutputValue += `<br>Computer's cards are: <br>`;
  var counter = 0;
  while (counter < numberOfComputerCards) {
    myOutputValue += `${computerHand[counter].name} of ${computerHand[counter].suit} <br>`;
    counter += 1;
  }

  myOutputValue += `<br> Player's total hand is  ${playerTotalHand}. <br> Computer's total hand is ${computerTotalHand}.<br><br>`;

  return myOutputValue;
};

var currentWinner = function () {
  var myOutputValue = "";

  // player hand = 21, or player hand < 21 and > comp hand >16
  if (
    playerTotalHand == 21 ||
    (playerTotalHand <= 21 &&
      playerTotalHand > computerTotalHand &&
      computerTotalHand > 16)
  ) {
    myOutputValue +=
      "Player wins! Computer loses. <br> Please refresh the page to play another round.";
  } else if (playerTotalHand > 21) {
    myOutputValue +=
      "Player BUSTS! Computer wins by default. <br> Please refresh the page to play another round.";
  } // player hand < 21 and player hand < comp hand , and comp =21,
  else if (
    playerTotalHand < 21 &&
    playerTotalHand < computerTotalHand &&
    computerTotalHand <= 21 &&
    computerTotalHand > 16
  ) {
    myOutputValue +=
      "Computer wins! Player loses. <br> Please refresh the page to play another round.";
  } else if (computerTotalHand > 21) {
    myOutputValue +=
      "Computer BUSTS! Player wins by default. <br> Please refresh the page to play another round.";
  } else if (playerTotalHand == computerTotalHand) {
    myOutputValue +=
      "It is a tie! <br> Please refresh the page to play another round.";
  } else if (playerTotalHand < 21 && computerTotalHand < 21) {
    myOutputValue += `Player do you want to 'hit' or 'stand'? <br> Please type out your choice, and click the 'Submit' button.`;
  }

  return myOutputValue;
};

var main = function (input) {
  var myOutputValue = "";
  userInput = input;
  if (currentGameMode == "deal two cards") {
    myOutputValue = dealTwoCards();
  } else if (currentGameMode == "player hit or stand") {
    myOutputValue = hitOrStand() + totalHand() + currentWinner();
  }

  return myOutputValue;
};
