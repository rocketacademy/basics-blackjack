// blackjack - base + player name + bet
// 2 players: user and computer/dealer

// Ask the player their name
// Give full instructions to the player

// Betting, player starts with 100 points.
// Each round the player wagers a number of points before their hand is dealt. Keep track of the player's points throughout the game.

// game mode: 'waiting for player name'
// game mode: 'putting bet'
// game mode: 'deal two cards'
// game mode: 'player hit or stand' --- The computer decides to hit or stand automatically
// game mode: 'compare cards' -- tell who is the winner and calculate the bet, show to total points for player
// game mode: 'restart the game'

var currentGameMode = "waiting for player name";
var numberOfPlayerCards = 0;
var numberOfComputerCards = 0;
var playerTotalHand = 0;
var computerTotalHand = 0;
var numberAcesInHand = 0;
var userInput;
var playerName;
var totalPoints = 100;
var numberOfBet = 0;
var winner;

// array to track player's and computer's hand
var playerHand = [];
var computerHand = [];

// making a deck of cards: 52 cards with 4 suits (13 cards each suit)
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  // var suits = ["♥️", "♦️", "♣️", "♠️"];
  var suits = ["Hearts ♥️", "Diamonds ♦️", "Clubs ♣️", "Spades ♠️"];

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

  myOutputValue += `Player ${playerName} drawn: <br>`;
  for (let i = 0; i < playerHand.length; i += 1) {
    myOutputValue += `${playerHand[i].name} of ${playerHand[i].suit}. <br>`;
  }

  myOutputValue += `<br> Computer drawn: <br> ${computerHand[0].name} of ${computerHand[0].suit}. <br> -Folded Down Card- <br>`;

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

  //player hits/stand
  if (userInput == "hit") {
    if (playerTotalHand < 21) {
      myOutputValue += `Player ${playerName}, you choose to take another card. <br> Player's cards are: <br>`;
      // player take one card
      dealOneCardToHand(playerHand);

      console.log("player's hand array: ");
      console.log(playerHand);

      numberOfPlayerCards += 1;
      console.log("number of player's cards in hand: " + numberOfPlayerCards);
    } // if player hand >21, cannot add more card
    else if (playerTotalHand > 21) {
      myOutputValue += `Player ${playerName}, you have exceeded the total of 21. <br> You can not add anymore card. <br> <br> Player's cards are: <br>`;
    } // to display the cards array
    for (let i = 0; i < playerHand.length; i += 1) {
      myOutputValue += `${playerHand[i].name} of ${playerHand[i].suit}. <br>`;
    }

    // computer decides to hit or stand automatically
    computerTotalHand = totalValueInHand(computerHand);
    console.log("computer total hand: " + computerTotalHand);
    // computer has to hit if their hand is below 17
    if (computerTotalHand <= 16) {
      // computer take 1 card
      dealOneCardToHand(computerHand);

      console.log("computer's hand array: ");
      console.log(computerHand);

      numberOfComputerCards += 1;
      console.log(
        "number of computer's cards in hand: " + numberOfComputerCards
      );

      myOutputValue += `<br> Computer drawn: <br> ${computerHand[0].name} of ${computerHand[0].suit}. <br> -Facing Down Card- <br>`;
    } else {
      myOutputValue += `<br> Computer drawn: <br> ${computerHand[0].name} of ${computerHand[0].suit}. <br> -Facing Down Card- <br>`;
    }
  } else if (userInput == "stand") {
    //player output
    currentGameMode = "compare cards";
    myOutputValue += `Player ${playerName}, you choose to end your turn. <br><br> Player's cards are: <br>`;
    for (let i = 0; i < playerHand.length; i += 1) {
      myOutputValue += `${playerHand[i].name} of ${playerHand[i].suit}. <br>`;
    }

    // computer output
    myOutputValue += `<br> Computer's cards are: <br>`;
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
  if (userInput == "hit") {
    return `<br> Player ${playerName}'s total hand is  ${playerTotalHand}. <br><br>`;
  } else if (userInput == "stand") {
    return `<br> Player ${playerName}'s total hand is  ${playerTotalHand}. <br> Computer's total hand is ${computerTotalHand}.<br><br>`;
  }
};

var currentWinner = function () {
  var myOutputValue = "";
  playerTotalHand = totalValueInHand(playerHand);
  console.log("player total hand: " + playerTotalHand);
  computerTotalHand = totalValueInHand(computerHand);
  console.log("computer total hand: " + computerTotalHand);

  if (
    (numberOfPlayerCards == 2 && playerTotalHand == 21) ||
    playerTotalHand == 21
  ) {
    winner = "player";
    myOutputValue += `BLACK JACK! <br> Player ${playerName} wins by default! Computer loses.`;
    return myOutputValue;
  }
  if (
    (numberOfComputerCards == 2 && computerTotalHand == 21) ||
    computerTotalHand == 21
  ) {
    winner = "computer";
    myOutputValue += `BLACK JACK! <br> Computer wins by default! Player ${playerName} loses.`;
    return myOutputValue;
  }

  if (playerTotalHand > 21) {
    winner = "computer";
    myOutputValue += `Player ${playerName} BUSTS! Computer wins by default.`;
  } else if (computerTotalHand > 21) {
    winner = "player";
    myOutputValue += `Computer BUSTS! Player ${playerName} wins by default.`;
  } else if (
    (playerTotalHand >= 17 &&
      playerTotalHand <= 21 &&
      playerTotalHand > computerTotalHand &&
      computerTotalHand >= 17) ||
    (playerTotalHand >= 17 &&
      playerTotalHand <= 21 &&
      playerTotalHand > computerTotalHand)
  ) {
    winner = "player";
    myOutputValue += `Player ${playerName} wins! Computer loses.`;
  } else if (
    computerTotalHand >= 17 &&
    computerTotalHand <= 21 &&
    computerTotalHand > playerTotalHand &&
    playerTotalHand >= 17
  ) {
    winner = "computer";
    myOutputValue += `Computer wins! Player ${playerName} loses.`;
  } else if (playerTotalHand == computerTotalHand) {
    myOutputValue += "It is a tie!";
  }

  return myOutputValue;
};

var currentTotalPoints = function () {
  // player wins, add number of bet
  if (winner == "player") {
    totalPoints = totalPoints + Number(numberOfBet);
  } //player lose, minus number of bet
  else if (winner == "computer") {
    totalPoints = totalPoints - Number(numberOfBet);
  } else if (winner == "") {
    totalPoints = totalPoints;
  }
  console.log("player total point: " + totalPoints);
  return totalPoints;
};

var restartGame = function () {
  currentGameMode = "waiting for player name";
  // reset the global value
  numberOfPlayerCards = 0;
  numberOfComputerCards = 0;
  playerTotalHand = 0;
  computerTotalHand = 0;
  numberAcesInHand = 0;
  numberOfBet = 0;
  winner;
  //also empty the array
  playerHand = [];
  computerHand = [];
};

var main = function (input) {
  var myOutputValue = "";

  if (currentGameMode == "waiting for player name") {
    if (input == "") {
      return `Player, please input your name.`;
    } else {
      playerName = input;
      currentGameMode = "putting bet";
      playerCurrentPoints = currentTotalPoints();
      myOutputValue += `Player ${playerName}, your current point is: ${playerCurrentPoints}. <br><br> Please enter your number of bet, and click the 'Submit' button.`;
    }
    return myOutputValue;
  }

  if (currentGameMode == "putting bet") {
    numberOfBet = input;
    //if input is not a number
    if (isNaN(Number(numberOfBet)) == true) {
      myOutputValue += `Please input a number.`;
    } // bet need to be a certain value
    else if (
      numberOfBet == "" ||
      numberOfBet < 0 ||
      numberOfBet > playerCurrentPoints
    ) {
      myOutputValue += `Please input a number greater than 0, and within your current point. <br> Player ${playerName}, your current point is: ${playerCurrentPoints}. <br><br> Please enter your number of bet, and click the 'Submit' button.`;
    } else {
      currentGameMode = "deal two cards";
      myOutputValue += `Player ${playerName}, you have chosen to bet ${numberOfBet}.<br><br> Click the 'Submit' button to continue.`;
    }
    return myOutputValue;
  }

  if (currentGameMode == "deal two cards") {
    var dealCards = dealTwoCards();
    var playerTotalHand = totalValueInHand(playerHand);
    currentGameMode = "player hit or stand";
    myOutputValue += `${dealCards} <br><br> Player ${playerName}'s total hand is  ${playerTotalHand}. <br><br> Player ${playerName} do you want to 'hit' or 'stand'? <br> Please type out your choice, and click the 'Submit' button.`;
    return myOutputValue;
  }

  if (currentGameMode == "player hit or stand") {
    userInput = input;
    if (userInput == "hit") {
      myOutputValue +=
        hitOrStand() +
        totalValueOutPutMessage() +
        `Player ${playerName} do you want to 'hit' or 'stand'? <br> Please type out your choice, and click the 'Submit' button.`;
    } else if (userInput == "stand") {
      myOutputValue +=
        hitOrStand() +
        totalValueOutPutMessage() +
        `Player ${playerName}, please click the 'Submit' button to see the winner.`;
    } else if (userInput != "hit" || userInput != "stand") {
      myOutputValue += `Please input 'hit' or 'stand' with lowercase. <br> We apologize for the incovenient.`;
    }
    return myOutputValue;
  }

  if (currentGameMode == "compare cards") {
    var winnerMessage = currentWinner();
    playerCurrentPoints = currentTotalPoints();
    currentGameMode = "restart the game";
    myOutputValue += `${winnerMessage} <br><br> Player ${playerName}, you bet: ${numberOfBet}. <br> Your current point is: ${playerCurrentPoints}. <br> <br> Click the 'Submit' button to play another round.`;
    return myOutputValue;
  }

  if (totalPoints <= 0) {
    return `Player ${playerName} GAME OVER. Please refresh the page to play.`;
  }

  if (currentGameMode == "restart the game") {
    restartGame();
    playerCurrentPoints = currentTotalPoints();
    currentGameMode = "putting bet";
    myOutputValue += `Player ${playerName}, your current point is: ${playerCurrentPoints}. <br><br> Please enter your number of bet, and click the 'Submit' button.`;
    return myOutputValue;
  }
  return myOutputValue;
};
