// Creating a standard deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
      var cardPoints = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
        cardPoints = 10;
      } else if (cardName == 12) {
        cardName = 'queen';
        cardPoints = 10;
      } else if (cardName == 13) {
        cardName = 'king';
        cardPoints = 10;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        points: cardPoints,
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

// Shuffle deck
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (cardDeck) {
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    var randomIndex = getRandomIndex(cardDeck.length);
    var currentItem = cardDeck[currentIndex];
    var randomItem = cardDeck[randomIndex];
    cardDeck[currentIndex] = randomItem;
    cardDeck[randomIndex] = currentItem;
    currentIndex = currentIndex + 1;
  }
  return cardDeck;
};

// Global variables
var gameMode = 'name';
var playerHand = [];
var computerHand = [];
var playerPoints = '';
var computerPoints = '';
var userName = '';
var playerCoins = 100;
var playerWage = 0;

// Function to sum hand
var sumHand = function (hand) {
  var sum = 0;
  var noOfAces = 0;
  var counter = 0;
  while (counter < hand.length) {
    var card = hand[counter];
    if (card.rank == 1) {
      noOfAces = noOfAces + 1;
      console.log(noOfAces);
      sum = sum + 11;
    } else {
      sum = sum + card.points;
    }
    counter = counter + 1;
  }
  if (sum > 21 && noOfAces > 0) {
    var counter = 0;
    while (counter < noOfAces) {
      sum = sum - 10;
      counter = counter + 1;
    }
  }
  console.log(sum);
  return sum;
};

var main = function (input) {
  var myOutputValue = '';
  var shuffledDeck = shuffleCards(makeDeck());
  // Player inputs his name
  if (gameMode == 'name') {
    // error message
    myOutputValue = "Hey! I'm the computer. What's your name?";

    // Message once player has inputted his name
    if (input != '') {
      userName = input;
      myOutputValue =
        'Welcome ' +
        userName +
        ' to the game. Please decide how much you would like to wager.';
      gameMode = 'bet';
    }
  }

  // Players input their bets
  if (gameMode == 'bet') {
    if (playerCoins <= 0) {
      myOutputValue =
        'Hi ' + userName + '. You are bankrupt. Please come back another time.';
      gameMode = 'name';
    } else if (input <= playerCoins && input != '') {
      // wager message
      playerWage = Number(input);
      wagerMessage =
        'Hi ' +
        userName +
        '. You have chosen to wager ' +
        playerWage +
        ' coins. ';
      gameMode = 'deal cards to user';
    } else {
      // error message
      myOutputValue =
        'Hi ' +
        userName +
        '. Please decide how much you would like to wager. You can only bet a maximum of ' +
        playerCoins +
        ' coins. ';
    }
  }
  // Dealing first 2 cards to players and computer
  if (gameMode == 'deal cards to user') {
    var computerCard1 = shuffledDeck.pop();
    var computerCard2 = shuffledDeck.pop();
    computerHand.push(computerCard1, computerCard2);
    console.log('Computer first 2 cards ' + computerHand);
    computerPoints = sumHand(computerHand);
    console.log('Computer points from first 2 cards ' + computerPoints);
    var playerCard1 = shuffledDeck.pop();
    var playerCard2 = shuffledDeck.pop();
    playerHand.push(playerCard1, playerCard2);
    playerPoints = sumHand(playerHand);
    console.log('Player first 2 cards ' + playerHand);
    console.log('Player points from first 2 cards ' + playerPoints);

    // Output cards to user
    if (playerPoints == 21) {
      playerPoints = '';
      computerPoints = '';
      playerHand = [];
      computerHand = [];
      playerCoins = playerCoins + playerWage;
      myOutputValue =
        wagerMessage +
        '<br>You scored a blackjack. You win. You have ' +
        playerCoins +
        ' coins.';
    } else {
      myOutputValue =
        wagerMessage +
        '<br>The computer had ' +
        computerCard1.name +
        ' of ' +
        computerCard1.suit +
        ' and ' +
        computerCard2.name +
        ' of ' +
        computerCard2.suit +
        ', giving a total of ' +
        computerPoints +
        ' points. <br>The player had ' +
        playerCard1.name +
        ' of ' +
        playerCard1.suit +
        ' and ' +
        playerCard2.name +
        ' of ' +
        playerCard2.suit +
        ', giving a total of ' +
        playerPoints +
        ' points. <br>Please decide if you want to hit or stand.';
      gameMode = 'user hits or stands';
    }
    return myOutputValue;
  }

  // User chooses to hit or stand
  else if (gameMode == 'user hits or stands') {
    myOutputValue = 'Please choose hit or stand.';
    if (input == 'hit') {
      var playerCard3 = shuffledDeck.pop();
      playerHand.push(playerCard3);
      console.log('Player 3rd card ' + playerCard3);
      playerPoints = sumHand(playerHand);
      console.log('Player points of 3rd card ' + playerPoints);
      if (playerPoints > 21) {
        playerCoins = playerCoins - playerWage;
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard3.name +
          ' of ' +
          playerCard3.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. <br>You busted. You lose. You have ' +
          playerCoins +
          ' coins.';
        playerPoints = '';
        computerPoints = '';
        playerHand = [];
        computerHand = [];
        gameMode = 'bet';
      } else {
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard3.name +
          ' of ' +
          playerCard3.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. <br>Please choose to hit 4th card or stand.';
      }
    }
    if (input == 'hit 4th card') {
      var playerCard4 = shuffledDeck.pop();
      playerHand.push(playerCard4);
      console.log('Player 4th card ' + playerCard4);
      playerPoints = sumHand(playerHand);
      console.log('Player points of 4th card ' + playerPoints);
      if (playerPoints > 21) {
        playerCoins = playerCoins - playerWage;
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard4.name +
          ' of ' +
          playerCard4.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. <br>You busted. You lose. You have ' +
          playerCoins +
          ' coins.';
        playerPoints = '';
        computerPoints = '';
        playerHand = [];
        computerHand = [];
        gameMode = 'bet';
      } else {
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard4.name +
          ' of ' +
          playerCard4.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. <br>Please choose to hit 5th card or stand.';
      }
    }
    if (input == 'hit 5th card') {
      var playerCard5 = shuffledDeck.pop();
      playerHand.push(playerCard5);
      console.log('Player 5th card ' + playerCard5);
      playerPoints = sumHand(playerHand);
      console.log('Player points of 5th card ' + playerPoints);
      if (playerPoints > 21) {
        playerCoins = playerCoins - playerWage;
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard5.name +
          ' of ' +
          playerCard5.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. <br>You busted. You lose. You have ' +
          playerCoins +
          ' coins.';
        playerPoints = '';
        computerPoints = '';
        playerHand = [];
        computerHand = [];
        gameMode = 'bet';
        console.log(gameMode);
      } else {
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard5.name +
          ' of ' +
          playerCard5.suit +
          ', giving a total of ' +
          playerPoints +
          ' points.';
      }
      gameMode = 'computer hits or stands';
    }

    if (input == 'stand') {
      myOutputValue =
        'The player chose to stand. The player has a total of ' +
        playerPoints +
        ' points.';
      gameMode = 'computer hits or stands';
    }
  }

  // Computer hits or stands automatically
  else if (gameMode == 'computer hits or stands') {
    var message = '';
    if (computerPoints < 17) {
      var computerCard3 = shuffledDeck.pop();
      computerHand.push(computerCard3);
      console.log('Computer points ' + computerPoints);
      console.log('Computer 3rd card ' + computerCard3);
      computerPoints = sumHand(computerHand);
      console.log('Computer points ' + computerPoints);
      message =
        'The computer drew ' + computerCard3.name + ' of ' + computerCard3.suit;
      console.log(message);
      if (computerPoints < 17) {
        var computerCard4 = shuffledDeck.pop();
        computerHand.push(computerCard4);
        console.log('Computer 4th card ' + computerCard4);
        computerPoints = sumHand(computerHand);
        console.log('Computer points ' + computerPoints);
        message =
          message + ' and ' + computerCard4.name + ' of ' + computerCard4.suit;
        if (computerPoints < 17) {
          var computerCard5 = shuffledDeck.pop();
          computerHand.push(computerCard5);
          console.log('Computer 5th card ' + computerCard5);
          computerPoints = sumHand(computerHand);
          console.log('Computer points ' + computerPoints);
          message =
            message +
            ' and ' +
            computerCard5.name +
            ' of ' +
            computerCard5.suit;

          gameMode = 'compare hand';
        }
      }
    }
    if (computerPoints >= 17) {
      gameMode = 'compare hand';
    }
    console.log(message);
    myOutputValue =
      "It is the computer's turn to hit or stand. " + message + '. ';
  }

  // Compare player and computer's points
  else if (gameMode == 'compare hand') {
    var playerPointsTo21 = 21 - playerPoints;
    var comPointsTo21 = 21 - computerPoints;
    if (playerPoints <= 21 && computerPoints <= 21) {
      if (comPointsTo21 < playerPointsTo21) {
        playerCoins = playerCoins - playerWage;
        myOutputValue =
          'The computer has ' +
          computerPoints +
          ' points and the player has ' +
          playerPoints +
          ' points. <br>The computer wins. You have ' +
          playerCoins +
          ' coins.';
      } else if (comPointsTo21 > playerPointsTo21) {
        playerCoins = playerCoins + playerWage;
        myOutputValue =
          myOutputValue +
          'The computer has ' +
          computerPoints +
          ' points and the player has ' +
          playerPoints +
          ' points. <br>The player wins. You have ' +
          playerCoins +
          ' coins.';
      } else {
        myOutputValue =
          'The computer has ' +
          computerPoints +
          ' points and the player has ' +
          playerPoints +
          ' points. <br>It is a tie. You have ' +
          playerCoins +
          ' coins.';
      }
    }
    if (playerPoints > 21 && computerPoints <= 21) {
      playerCoins = playerCoins - playerWage;
      myOutputValue =
        'The computer has ' +
        computerPoints +
        ' points and the player has ' +
        playerPoints +
        ' points. <br>The player busted. The computer wins. You have ' +
        playerCoins +
        ' coins.';
    }
    if (playerPoints <= 21 && computerPoints > 21) {
      playerCoins = playerCoins + playerWage;
      myOutputValue =
        'The computer has ' +
        computerPoints +
        ' points and the player has ' +
        playerPoints +
        ' points. <br>The computer busted. The player wins. You have ' +
        playerCoins +
        ' coins.';
    }
    if (playerPoints > 21 && computerPoints > 21) {
      myOutputValue =
        'The computer has ' +
        computerPoints +
        ' points and the player has ' +
        playerPoints +
        ' points. <br>Both players busted. It is a tie. You have ' +
        playerCoins +
        ' coins.';
    }
    playerPoints = '';
    computerPoints = '';
    playerHand = [];
    computerHand = [];
    gameMode = 'bet';
  }
  return myOutputValue;
};
