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

// gameMode for player to hit or stand
var gameMode = 'deal cards to user';
var playerHand = [];
var computerHand = [];
var playerPoints = '';
var computerPoints = '';

// function to sum hand
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

  if (gameMode == 'deal cards to user') {
    // Selecting player's and computer's initial 2 cards
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
      myOutputValue = 'You scored a blackjack. You win.';
      playerPoints = '';
      computerPoints = '';
      playerHand = [];
      computerHand = [];
    } else {
      myOutputValue =
        'The computer had ' +
        computerCard1.name +
        ' of ' +
        computerCard1.suit +
        ' and ' +
        computerCard2.name +
        ' of ' +
        computerCard2.suit +
        ', giving a total of ' +
        computerPoints +
        ' points. The player had ' +
        playerCard1.name +
        ' of ' +
        playerCard1.suit +
        ' and ' +
        playerCard2.name +
        ' of ' +
        playerCard2.suit +
        ', giving a total of ' +
        playerPoints +
        ' points. Please decide if you want to hit or stand.';
    }
    gameMode = 'user hits or stands';
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
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard3.name +
          ' of ' +
          playerCard3.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. You busted. You lose.';
        playerPoints = '';
        computerPoints = '';
        playerHand = [];
        computerHand = [];
        gameMode = 'deal cards to user';
      } else {
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard3.name +
          ' of ' +
          playerCard3.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. Please choose to hit 4th card or stand.';
      }
    }
    if (input == 'hit 4th card') {
      var playerCard4 = shuffledDeck.pop();
      playerHand.push(playerCard4);
      console.log('Player 4th card ' + playerCard4);
      playerPoints = sumHand(playerHand);
      console.log('Player points of 4th card ' + playerPoints);
      if (playerPoints > 21) {
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard4.name +
          ' of ' +
          playerCard4.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. You busted. You lose.';
        playerPoints = '';
        computerPoints = '';
        playerHand = [];
        computerHand = [];
        gameMode = 'deal cards to user';
      } else {
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard4.name +
          ' of ' +
          playerCard4.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. Please choose to hit 5th card or stand.';
      }
    }
    if (input == 'hit 5th card') {
      var playerCard5 = shuffledDeck.pop();
      playerHand.push(playerCard5);
      console.log('Player 5th card ' + playerCard5);
      playerPoints = sumHand(playerHand);
      console.log('Player points of 5th card ' + playerPoints);
      if (playerPoints > 21) {
        myOutputValue =
          'The player chose to hit. The player drew ' +
          playerCard5.name +
          ' of ' +
          playerCard5.suit +
          ', giving a total of ' +
          playerPoints +
          ' points. You busted. You lose.';
        playerPoints = '';
        computerPoints = '';
        playerHand = [];
        computerHand = [];
        gameMode = 'deal cards to user';
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
    myOutputValue = "It is the computer's turn to hit or stand.";
    if (computerPoints < 17) {
      var computerCard3 = shuffledDeck.pop();
      computerHand.push(computerCard3);
      console.log('Computer points ' + computerPoints);
      console.log('Computer 3rd card ' + computerCard3);
      computerPoints = sumHand(computerHand);
      console.log('Computer points ' + computerPoints);
      if (computerPoints < 17) {
        var computerCard4 = shuffledDeck.pop();
        computerHand.push(computerCard4);
        console.log('Computer 4th card ' + computerCard4);
        computerPoints = sumHand(computerHand);
        console.log('Computer points ' + computerPoints);
        if (computerPoints < 17) {
          var computerCard5 = shuffledDeck.pop();
          computerHand.push(computerCard5);
          console.log('Computer 5th card ' + computerCard5);
          computerPoints = sumHand(computerHand);
          console.log('Computer points ' + computerPoints);
          gameMode = 'compare hand';
        }
      }
    }
    if (computerPoints >= 17) {
      gameMode = 'compare hand';
    }
  }

  // Compare player and computer's points
  else if (gameMode == 'compare hand') {
    var playerPointsTo21 = 21 - playerPoints;
    var comPointsTo21 = 21 - computerPoints;
    if (playerPoints <= 21 && computerPoints <= 21) {
      if (comPointsTo21 < playerPointsTo21) {
        myOutputValue =
          'The computer has ' +
          computerPoints +
          ' points and the player has ' +
          playerPoints +
          ' points. The computer wins.';
      } else if (comPointsTo21 > playerPointsTo21) {
        myOutputValue =
          myOutputValue +
          'The computer has ' +
          computerPoints +
          ' points and the player has ' +
          playerPoints +
          ' points. The player wins.';
      } else {
        myOutputValue =
          'The computer has ' +
          computerPoints +
          ' points and the player has ' +
          playerPoints +
          ' points. It is a tie.';
      }
    }
    if (playerPoints > 21 && computerPoints <= 21) {
      myOutputValue =
        'The computer has ' +
        computerPoints +
        ' points and the player has ' +
        playerPoints +
        ' points. The player busted. The computer wins.';
    }
    if (playerPoints <= 21 && computerPoints > 21) {
      myOutputValue =
        'The computer has ' +
        computerPoints +
        ' points and the player has ' +
        playerPoints +
        ' points. The computer busted. The player wins.';
    }
    if (playerPoints > 21 && computerPoints > 21) {
      myOutputValue =
        'The computer has ' +
        computerPoints +
        ' points and the player has ' +
        playerPoints +
        ' points. Both players busted. It is a tie.';
    }
    playerPoints = '';
    computerPoints = '';
    playerHand = [];
    computerHand = [];
    gameMode = 'deal cards to user';
  }
  return myOutputValue;
};
