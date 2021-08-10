// blackjack - base fourth version
// 2 players: user and computer/dealer

// second version: Add Player Hit or Stand
// third version: Add Dealer Hit or Stand
// fourth version: Add Variable Ace Values --- Aces can be 1 or 11

// game mode: 'deal two cards'
// game mode: 'player hit or stand'
// game mode: 'dealer Hit or Stand' --- The computer decides to hit or stand automatically

var currentGameMode = "deal two cards";
var numberOfPlayerCards = 0;
var numberOfComputerCards = 0;
var playerTotalHand = 0;
var computerTotalHand = 0;
var numberAcesInHand = 0;
var userInput;

// array to track player's and computer's hand
var playerHand = [];
var computerHand = [];

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
      // By default, the card name is the same as rankCounter,and the value of the card is the same as rankCounter
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

//shuffled the new deck
var shuffledDeck = shuffleCards(makeDeck());

var dealOneCardToHand = function (hand) {
  //push drawn cards info to array
  hand.push(shuffledDeck.pop());
};

var dealTwoCards = function () {
  var myOutputValue = "";
  //deal first two cards to player and computer
  dealOneCardToHand(playerHand);
  numberOfPlayerCards += 1;
  dealOneCardToHand(computerHand);
  numberOfComputerCards += 1;

  // deal two more cards to player and computer
  dealOneCardToHand(playerHand);
  numberOfPlayerCards += 1;
  dealOneCardToHand(computerHand);
  numberOfComputerCards += 1;

  console.log("player's hand array: ");
  console.log(playerHand);
  console.log("computer's hand array: ");
  console.log(computerHand);

  myOutputValue += `Player drawn: <br>`;

  for (let i = 0; i < playerHand.length; i += 1) {
    myOutputValue += `${playerHand[i].name} of ${playerHand[i].suit}. <br>`;
  }

  myOutputValue += `<br> Computer drawn: <br>`;

  for (let i = 0; i < computerHand.length; i += 1) {
    myOutputValue += `${computerHand[i].name} of ${computerHand[i].suit}. <br>`;
  }

  //moving to the next game
  currentGameMode = "player hit or stand";
  return myOutputValue;
};

// to get the total value cards in hand
var totalValueInHand = function (hand) {
  var numberAcesInHand = 0;
  var totalHand = 0;
  for (let i = 0; i < hand.length; i += 1) {
    var currentCard = hand[i];
    // If card rank is 2-10, value is same as rank
    if (currentCard.rank >= 2 && currentCard.rank <= 10) {
      totalHand += currentCard.rank;
      // If card rank is 11-13, i.e. Jack, Queen, or King, value is 10
    } else if (currentCard.rank >= 11 && currentCard.rank <= 13) {
      totalHand += 10;
      // If card is Ace, value is 11 by default
    } else if (currentCard.rank === 1) {
      numberAcesInHand += 1;
      totalHand += 11;
    }
  }
  // if total hand > 21 and has ace, ace value change to 1, until total hand is less than or equal to 21 or there are no more Aces.
  if (totalHand > 21 && numberAcesInHand > 0) {
    for (let i = 0; i < numberAcesInHand; i += 1) {
      totalHand -= 10;
      // If the sum is less than 21 before converting all Ace values from
      // 11 to 1, break out of the loop and return the current sum.
      if (totalHand <= 21) {
        break;
      }
    }
  }
  return totalHand;
};

var hitOrStand = function () {
  var myOutputValue = "";

  if (currentGameMode == "player hit or stand") {
    //player hits/stand
    if (userInput == "hit") {
      myOutputValue += `Player chose to take another card. <br> Player's cards are: <br>`;
      // player take one card
      dealOneCardToHand(playerHand);

      console.log("player's hand array: ");
      console.log(playerHand);

      numberOfPlayerCards += 1;
      console.log("number of player's cards in hand: " + numberOfPlayerCards);
    } else if (userInput == "stand") {
      myOutputValue += `You chose to end your turn. <br> Player's cards are: <br>`;
    }

    for (let i = 0; i < playerHand.length; i += 1) {
      myOutputValue += `${playerHand[i].name} of ${playerHand[i].suit}. <br>`;
    }

    // computer decides to hit or stand automatically
    // computer has to hit if their hand is below 17
    computerTotalHand = totalValueInHand(computerHand);
    console.log("computer total hand: " + computerTotalHand);
    myOutputValue += `<br> Computer's cards are: <br>`;

    if (computerTotalHand <= 16) {
      // computer take 1 card
      dealOneCardToHand(computerHand);

      console.log("computer's hand array: ");
      console.log(computerHand);

      numberOfComputerCards += 1;
      console.log(
        "number of computer's cards in hand: " + numberOfComputerCards
      );
    } else {
      // computer has to stand if their hand is 17 or higher
    }
    for (let i = 0; i < computerHand.length; i += 1) {
      myOutputValue += `${computerHand[i].name} of ${computerHand[i].suit}. <br>`;
    }
  }

  return myOutputValue;
};

// to display output message for total value of player n comp
var totalValueOutPutMessage = function () {
  playerTotalHand = totalValueInHand(playerHand);
  console.log("player total hand: " + playerTotalHand);
  computerTotalHand = totalValueInHand(computerHand);
  console.log("computer total hand: " + computerTotalHand);
  return `<br> Player's total hand is  ${playerTotalHand}. <br> Computer's total hand is ${computerTotalHand}.<br><br>`;
};

var currentWinner = function (userInput) {
  var myOutputValue = "";
  playerTotalHand = totalValueInHand(playerHand);
  console.log("player total hand: " + playerTotalHand);
  computerTotalHand = totalValueInHand(computerHand);
  console.log("computer total hand: " + computerTotalHand);

  if (playerTotalHand > 21) {
    myOutputValue +=
      "Player BUSTS! Computer wins by default. <br> Please refresh the page to play another round.";
  } else if (computerTotalHand > 21) {
    myOutputValue +=
      "Computer BUSTS! Player wins by default. <br> Please refresh the page to play another round.";
  } else if (
    playerTotalHand <= 21 &&
    playerTotalHand > computerTotalHand &&
    computerTotalHand > 16
  ) {
    myOutputValue +=
      "Player wins! Computer loses. <br> Please refresh the page to play another round.";
  } else if (
    playerTotalHand < 16 &&
    playerTotalHand < computerTotalHand &&
    computerTotalHand > 16 &&
    computerTotalHand <= 21
  ) {
    myOutputValue +=
      "Computer wins! Player loses. <br> Please refresh the page to play another round.";
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
    var dealCards = dealTwoCards();
    var playerTotalHand = totalValueInHand(playerHand);
    var computerTotalHand = totalValueInHand(computerHand);

    myOutputValue += `${dealCards} <br> Player's total hand is  ${playerTotalHand}. <br> Computer's total hand is ${computerTotalHand}.<br><br>`;

    if (playerTotalHand == 21) {
      myOutputValue +=
        "BLACK JACK! <br> Player wins by default! Computer loses. <br> Please refresh the page to play another round.";
      return myOutputValue;
    }
    if (computerTotalHand == 21) {
      myOutputValue +=
        "BLACK JACK! <br> Computer wins by default! Player loses. <br> Please refresh the page to play another round.";
      return myOutputValue;
    }
    if (playerTotalHand < 21 && computerTotalHand < 21) {
      myOutputValue += `Player do you want to 'hit' or 'stand'? <br> Please type out your choice, and click the 'Submit' button.`;
      return myOutputValue;
    }
  } else if (currentGameMode == "player hit or stand") {
    myOutputValue += hitOrStand() + totalValueOutPutMessage() + currentWinner();
  }
  return myOutputValue;
};
