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
var gameMode = 'no of players';
var computerHand = [];
var computerPoints = '';
var userName = '';
var playerProfile = [];
var noOfPlayers = 0;
var currPlayer = 0;

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

// Function to deal cards
var dealCard = function (hand) {
  var shuffledDeck = shuffleCards(makeDeck());
  hand.push(shuffledDeck.pop());
};

var main = function (input) {
  var myOutputValue = '';
  var shuffledDeck = shuffleCards(makeDeck());
  // Decide no of players
  if (gameMode == 'no of players') {
    if (isNaN(Number(input)) == true || Number(input) <= 0) {
      console.log(isNaN(Number(input)));
      myOutputValue = 'Please input the no of players playing the game.';
    } else {
      noOfPlayers = Number(input);
      myOutputValue =
        'There are ' +
        noOfPlayers +
        ' players playing the game. Player 1, please input your name.';
      gameMode = 'name';
    }
    return myOutputValue;
  }
  // Players input their names
  if (gameMode == 'name') {
    // error message
    myOutputValue = "Hey! I'm the computer. What's your name?";
    if (input != '') {
      userName = input;
      playerProfile.push({
        playerNo: currPlayer + 1,
        name: userName,
        playerHand: [],
        playerWage: 0,
        playerCoins: 100,
        playerPoints: 0,
        blackJack: 'false',
      });
      console.log(playerProfile);
      // Message once last player has inputted their name
      if (playerProfile[currPlayer].playerNo == noOfPlayers) {
        myOutputValue =
          userName +
          ', welcome to the game. <br><br>' +
          playerProfile[0].name +
          ', you have ' +
          playerProfile[0].playerCoins +
          ' coins. Please decide how many coins you would like to wager.';
        currPlayer = 0;
        gameMode = 'bet';
      } else {
        // Message for next player to input his/her name
        myOutputValue =
          userName +
          ', welcome to the game.<br><br>Player ' +
          (playerProfile[currPlayer].playerNo + 1) +
          ', please input your name.';
        currPlayer = currPlayer + 1;
      }
    }
    return myOutputValue;
  }
  // Players input their bets
  if (gameMode == 'bet') {
    // bankrupt message
    if (playerProfile[currPlayer].playerCoins <= 0) {
      myOutputValue =
        'Hi ' +
        playerProfile[currPlayer].name +
        '. You are bankrupt. Please come back another time.';
      playerProfile.splice(currPlayer, 1);
    } else if (input <= playerProfile[currPlayer].playerCoins && input != '') {
      // wager message
      playerProfile[currPlayer].playerWage = Number(input);
      // message once last player has inputted his bet
      if (playerProfile[currPlayer].playerNo == noOfPlayers) {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', you have chosen to wager ' +
          playerProfile[currPlayer].playerWage +
          ' coins.<br><br>' +
          playerProfile[0].name +
          ', please click submit to deal the cards.';
        currPlayer = 0;
        gameMode = 'deal cards to user';
      } else {
        myOutputValue =
          'Hi ' +
          playerProfile[currPlayer].name +
          '. You have chosen to wager ' +
          playerProfile[currPlayer].playerWage +
          ' coins.<br><br>' +
          playerProfile[currPlayer + 1].name +
          ', please choose how many coins you would like to wager.';
        currPlayer = currPlayer + 1;
      }
    } else {
      // error message
      myOutputValue =
        'Hi ' +
        playerProfile[currPlayer].name +
        '. Please decide how much you would like to wager. You can only bet a maximum of ' +
        playerProfile[currPlayer].playerCoins +
        ' coins. ';
    }
    return myOutputValue;
  }
  // Dealing first 2 cards to players and computer
  if (gameMode == 'deal cards to user') {
    // Deal cards to all players and computer
    var counter = 0;
    while (counter < 2) {
      computerHand.push(shuffledDeck.pop());
      var subCounter = 0;
      while (subCounter < noOfPlayers) {
        playerProfile[subCounter].playerHand.push(shuffledDeck.pop());
        subCounter = subCounter + 1;
      }
      counter = counter + 1;
    }
    console.log(playerProfile);
    // Sum hand of computer
    computerPoints = sumHand(computerHand);
    console.log(
      'Computer first 2 cards ' +
        computerHand +
        '. Computer points from first 2 cards ' +
        computerPoints
    );
    gameMode = 'player turn';
    console.log(currPlayer);
  }
  // Sum hand of player
  if (gameMode == 'player turn') {
    playerProfile[currPlayer].playerPoints = sumHand(
      playerProfile[currPlayer].playerHand
    );
    console.log(
      'First 2 cards of ' +
        playerProfile[currPlayer].playerNo +
        ' are ' +
        playerProfile[currPlayer].playerHand +
        '. Points are ' +
        playerProfile[currPlayer].playerPoints
    );
    if (playerProfile[currPlayer].playerPoints == 21) {
      playerProfile[currPlayer].blackJack = 'true';
      myOutputValue =
        playerProfile[currPlayer].name +
        ', you scored a blackjack.<br><br>It is now ' +
        playerProfile[currPlayer + 1].name +
        "'s turn.";
      currPlayer = currPlayer + 1;
    } else {
      myOutputValue =
        playerProfile[currPlayer].name +
        ', you had ' +
        playerProfile[currPlayer].playerHand[0].name +
        ' of ' +
        playerProfile[currPlayer].playerHand[0].suit +
        ' and ' +
        playerProfile[currPlayer].playerHand[1].name +
        ' of ' +
        playerProfile[currPlayer].playerHand[1].suit +
        ', giving a total of ' +
        playerProfile[currPlayer].playerPoints +
        ' points.<br>The computer had ' +
        computerHand[0].name +
        ' of ' +
        computerHand[0].suit +
        ' and ' +
        computerHand[1].name +
        ' of ' +
        computerHand[1].suit +
        ', giving a total of ' +
        computerPoints +
        ' points.<br>Please decide if you want to hit or stand.';
      gameMode = 'user hits or stands';
    }
    return myOutputValue;
  }

  // User chooses to hit or stand
  if (gameMode == 'user hits or stands') {
    myOutputValue = 'Please choose hit or stand.';
    if (input == 'hit') {
      playerProfile[currPlayer].playerHand.push(shuffledDeck.pop());
      playerProfile[currPlayer].playerPoints = sumHand(
        playerProfile[currPlayer].playerHand
      );
      console.log(
        'First 3 cards of ' +
          playerProfile[currPlayer].playerNo +
          ' are ' +
          playerProfile[currPlayer].playerHand +
          '. Points are ' +
          playerProfile[currPlayer].playerPoints
      );
      if (playerProfile[currPlayer].playerPoints > 21) {
        if (playerProfile[currPlayer].playerNo == noOfPlayers) {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', you chose to hit. You drew ' +
            playerProfile[currPlayer].playerHand[2].name +
            ' of ' +
            playerProfile[currPlayer].playerHand[2].suit +
            ', giving a total of ' +
            playerProfile[currPlayer].playerPoints +
            " points. <br>You busted.<br><br>All players have taken their turn. It is now the computer's turn.";
          currPlayer = 0;
          gameMode = 'computer hits or stands';
        } else {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', you chose to hit. You drew ' +
            playerProfile[currPlayer].playerHand[2].name +
            ' of ' +
            playerProfile[currPlayer].playerHand[2].suit +
            ', giving a total of ' +
            playerProfile[currPlayer].playerPoints +
            ' points. <br>You busted.<br><br>It is now ' +
            playerProfile[currPlayer + 1].name +
            "'s turn.";
          currPlayer = currPlayer + 1;
          gameMode = 'player turn';
        }
      } else {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', you chose to hit. You drew ' +
          playerProfile[currPlayer].playerHand[2].name +
          ' of ' +
          playerProfile[currPlayer].playerHand[2].suit +
          ', giving a total of ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>Please choose to hit 4th card or stand.';
      }
    }
    if (input == 'hit 4th card') {
      playerProfile[currPlayer].playerHand.push(shuffledDeck.pop());
      playerProfile[currPlayer].playerPoints = sumHand(
        playerProfile[currPlayer].playerHand
      );
      console.log(
        'First 4 cards of ' +
          playerProfile[currPlayer].playerNo +
          ' are ' +
          playerProfile[currPlayer].playerHand +
          '. Points are ' +
          playerProfile[currPlayer].playerPoints
      );
      if (playerProfile[currPlayer].playerPoints > 21) {
        if (playerProfile[currPlayer].playerNo == noOfPlayers) {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', you chose to hit. You drew ' +
            playerProfile[currPlayer].playerHand[3].name +
            ' of ' +
            playerProfile[currPlayer].playerHand[3].suit +
            ', giving a total of ' +
            playerProfile[currPlayer].playerPoints +
            " points. <br>You busted.<br><br>All players have taken their turn. It is now the computer's turn.";
          currPlayer = 0;
          gameMode = 'computer hits or stands';
        } else {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', you chose to hit. You drew ' +
            playerProfile[currPlayer].playerHand[3].name +
            ' of ' +
            playerProfile[currPlayer].playerHand[3].suit +
            ', giving a total of ' +
            playerProfile[currPlayer].playerPoints +
            ' points. <br>You busted.<br><br>It is now ' +
            playerProfile[currPlayer + 1].name +
            "'s turn.";
          currPlayer = currPlayer + 1;
          gameMode = 'player turn';
        }
      } else {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', you chose to hit. You drew ' +
          playerProfile[currPlayer].playerHand[3].name +
          ' of ' +
          playerProfile[currPlayer].playerHand[3].suit +
          ', giving a total of ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>Please choose to hit 5th card or stand.';
      }
    }
    if (input == 'hit 5th card') {
      playerProfile[currPlayer].playerHand.push(shuffledDeck.pop());
      playerProfile[currPlayer].playerPoints = sumHand(
        playerProfile[currPlayer].playerHand
      );
      console.log(
        'The 5 cards of ' +
          playerProfile[currPlayer].playerNo +
          ' are ' +
          playerProfile[currPlayer].playerHand +
          '. Points are ' +
          playerProfile[currPlayer].playerPoints
      );
      if (playerProfile[currPlayer].playerPoints > 21) {
        if (playerProfile[currPlayer].playerNo == noOfPlayers) {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', you chose to hit. You drew ' +
            playerProfile[currPlayer].playerHand[4].name +
            ' of ' +
            playerProfile[currPlayer].playerHand[4].suit +
            ', giving a total of ' +
            playerProfile[currPlayer].playerPoints +
            " points.<br>You busted.<br><br>All players have taken their turn. It is now the computer's turn.";
          currPlayer = 0;
          gameMode = 'computer hits or stands';
        } else {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', you chose to hit. You drew ' +
            playerProfile[currPlayer].playerHand[4].name +
            ' of ' +
            playerProfile[currPlayer].playerHand[4].suit +
            ', giving a total of ' +
            playerProfile[currPlayer].playerPoints +
            ' points. <br>You busted.<br><br>It is now ' +
            playerProfile[currPlayer + 1].name +
            "'s turn.";
          currPlayer = currPlayer + 1;
          gameMode = 'player turn';
        }
      } else {
        if (playerProfile[currPlayer].playerNo == noOfPlayers) {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', you chose to hit. You drew ' +
            playerProfile[currPlayer].playerHand[4].name +
            ' of ' +
            playerProfile[currPlayer].playerHand[4].suit +
            ', giving a total of ' +
            playerProfile[currPlayer].playerPoints +
            " points.<br><br>All players have taken their turn. It is now the computer's turn.";
          currPlayer = 0;
          gameMode = 'computer hits or stands';
        } else {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', you chose to hit. You drew ' +
            playerProfile[currPlayer].playerHand[4].name +
            ' of ' +
            playerProfile[currPlayer].playerHand[4].suit +
            ', giving a total of ' +
            playerProfile[currPlayer].playerPoints +
            ' points.<br><br>It is now ' +
            playerProfile[currPlayer + 1].name +
            "'s turn.";
          currPlayer = currPlayer + 1;
          gameMode = 'player turn';
        }
      }
    }

    if (input == 'stand') {
      if (playerProfile[currPlayer].playerNo == noOfPlayers) {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', you chose to stand. You have a total of ' +
          playerProfile[currPlayer].playerPoints +
          " points.<br><br>All players have taken their turn. It is now the computer's turn.";
        currPlayer = 0;
        gameMode = 'computer hits or stands';
      } else {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', you chose to stand. You have a total of ' +
          playerProfile[currPlayer].playerPoints +
          ' points.<br><br>It is now ' +
          playerProfile[currPlayer + 1].name +
          "'s turn.";
        currPlayer = currPlayer + 1;
        gameMode = 'player turn';
      }
    }
    return myOutputValue;
  }

  // Computer hits or stands automatically
  if (gameMode == 'computer hits or stands') {
    var message = '';
    if (computerPoints < 17) {
      computerHand.push(shuffledDeck.pop());
      computerPoints = sumHand(computerHand);
      console.log(
        'Computer first 3 cards ' +
          computerHand +
          '. Computer points from first 3 cards ' +
          computerPoints
      );
      message =
        'The computer drew ' +
        computerHand[2].name +
        ' of ' +
        computerHand[2].suit;
      console.log(message);
      if (computerPoints < 17) {
        computerHand.push(shuffledDeck.pop());
        computerPoints = sumHand(computerHand);
        console.log(
          'Computer first 4 cards ' +
            computerHand +
            '. Computer points from first 4 cards ' +
            computerPoints
        );
        message =
          message +
          ' and ' +
          computerHand[3].name +
          ' of ' +
          computerHand[3].suit;
        if (computerPoints < 17) {
          computerHand.push(shuffledDeck.pop());
          computerPoints = sumHand(computerHand);
          console.log(
            'Computer first 5 cards ' +
              computerHand +
              '. Computer points from first 5 cards ' +
              computerPoints
          );
          message =
            message +
            ' and ' +
            computerHand[4].name +
            ' of ' +
            computerHand[4].suit;
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
    return myOutputValue;
  }

  // Compare player and computer's points
  if (gameMode == 'compare hand') {
    if (playerProfile[currPlayer].blackJack == 'true') {
      playerProfile[currPlayer].playerCoins =
        playerProfile[currPlayer].playerCoins +
        playerProfile[currPlayer].playerWage;
      if (playerProfile[currPlayer].playerNo == noOfPlayers) {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', the computer has ' +
          computerPoints +
          ' points and you have ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>The player wins. You have ' +
          playerProfile[currPlayer].playerCoins +
          ' coins.<br><br>The game round has ended. Please enter your bets for the next round.';
        computerHand = [];
        var counter = 0;
        while (counter < playerProfile.length) {
          playerProfile[counter].playerHand = [];
          playerProfile[counter].playerWage = 0;
          playerProfile[counter].playerPoints = 0;
          playerProfile[counter].blackJack = 'false';
          counter = counter + 1;
        }
        computerPoints = 0;
        currPlayer = 0;
        gameMode = 'bet';
      } else {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', the computer has ' +
          computerPoints +
          ' points and you have ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>The player wins. You have ' +
          playerProfile[currPlayer].playerCoins +
          ' coins.';
        currPlayer = currPlayer + 1;
      }
    } else if (
      playerProfile[currPlayer].playerPoints <= 21 &&
      computerPoints <= 21
    ) {
      if (21 - computerPoints < 21 - playerProfile[currPlayer].playerPoints) {
        playerProfile[currPlayer].playerCoins =
          playerProfile[currPlayer].playerCoins -
          playerProfile[currPlayer].playerWage;
        if (playerProfile[currPlayer].playerNo == noOfPlayers) {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', the computer has ' +
            computerPoints +
            ' points and you have ' +
            playerProfile[currPlayer].playerPoints +
            ' points. <br>The computer wins. You have ' +
            playerProfile[currPlayer].playerCoins +
            ' coins.<br><br>The game round has ended. Please enter your bets for the next round.';
          computerHand = [];
          var counter = 0;
          while (counter < playerProfile.length) {
            playerProfile[counter].playerHand = [];
            playerProfile[counter].playerWage = 0;
            playerProfile[counter].playerPoints = 0;
            playerProfile[counter].blackJack = 'false';
            counter = counter + 1;
          }
          computerPoints = 0;
          currPlayer = 0;
          gameMode = 'bet';
        } else {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', the computer has ' +
            computerPoints +
            ' points and you have ' +
            playerProfile[currPlayer].playerPoints +
            ' points. <br>The computer wins. You have ' +
            playerProfile[currPlayer].playerCoins +
            ' coins.';
          currPlayer = currPlayer + 1;
        }
      } else if (
        21 - computerPoints >
        21 - playerProfile[currPlayer].playerPoints
      ) {
        playerProfile[currPlayer].playerCoins =
          playerProfile[currPlayer].playerCoins +
          playerProfile[currPlayer].playerWage;
        if (playerProfile[currPlayer].playerNo == noOfPlayers) {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', the computer has ' +
            computerPoints +
            ' points and you have ' +
            playerProfile[currPlayer].playerPoints +
            ' points. <br>The player wins. You have ' +
            playerProfile[currPlayer].playerCoins +
            ' coins.<br><br>The game round has ended. Please enter your bets for the next round.';
          computerHand = [];
          var counter = 0;
          while (counter < playerProfile.length) {
            playerProfile[counter].playerHand = [];
            playerProfile[counter].playerWage = 0;
            playerProfile[counter].playerPoints = 0;
            playerProfile[counter].blackJack = 'false';
            counter = counter + 1;
          }
          computerPoints = 0;
          currPlayer = 0;
          gameMode = 'bet';
        } else {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', the computer has ' +
            computerPoints +
            ' points and you have ' +
            playerProfile[currPlayer].playerPoints +
            ' points. <br>The player wins. You have ' +
            playerProfile[currPlayer].playerCoins +
            ' coins.';
          currPlayer = currPlayer + 1;
        }
      } else {
        if (playerProfile[currPlayer].playerNo == noOfPlayers) {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', the computer has ' +
            computerPoints +
            ' points and you have ' +
            playerProfile[currPlayer].playerPoints +
            ' points. <br>It is a tie. You have ' +
            playerProfile[currPlayer].playerCoins +
            ' coins.<br><br>The game round has ended. Please enter your bets for the next round.';
          computerHand = [];
          var counter = 0;
          while (counter < playerProfile.length) {
            playerProfile[counter].playerHand = [];
            playerProfile[counter].playerWage = 0;
            playerProfile[counter].playerPoints = 0;
            playerProfile[counter].blackJack = 'false';
            counter = counter + 1;
          }
          computerPoints = 0;
          currPlayer = 0;
          gameMode = 'bet';
        } else {
          myOutputValue =
            playerProfile[currPlayer].name +
            ', the computer has ' +
            computerPoints +
            ' points and you have ' +
            playerProfile[currPlayer].playerPoints +
            +' points. <br>It is a tie. You have ' +
            playerProfile[currPlayer].playerCoins +
            +' coins.';
          currPlayer = currPlayer + 1;
        }
      }
    } else if (
      playerProfile[currPlayer].playerPoints > 21 &&
      computerPoints <= 21
    ) {
      playerProfile[currPlayer].playerCoins =
        playerProfile[currPlayer].playerCoins -
        playerProfile[currPlayer].playerWage;
      if (playerProfile[currPlayer].playerNo == noOfPlayers) {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', the computer has ' +
          computerPoints +
          ' points and you have ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>The player busted. The computer wins. You have ' +
          playerProfile[currPlayer].playerCoins +
          ' coins.<br><br>The game round has ended. Please enter your bets for the next round.';
        computerHand = [];
        var counter = 0;
        while (counter < playerProfile.length) {
          playerProfile[counter].playerHand = [];
          playerProfile[counter].playerWage = 0;
          playerProfile[counter].playerPoints = 0;
          playerProfile[counter].blackJack = 'false';
          counter = counter + 1;
        }
        computerPoints = 0;
        currPlayer = 0;
        gameMode = 'bet';
      } else {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', the computer has ' +
          computerPoints +
          ' points and the player has ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>The player busted. The computer wins. You have ' +
          playerProfile[currPlayer].playerCoins +
          ' coins.';
        currPlayer = currPlayer + 1;
      }
    } else if (
      playerProfile[currPlayer].playerPoints <= 21 &&
      computerPoints > 21
    ) {
      playerProfile[currPlayer].playerCoins =
        playerProfile[currPlayer].playerCoins +
        playerProfile[currPlayer].playerWage;
      if (playerProfile[currPlayer].playerNo == noOfPlayers) {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', the computer has ' +
          computerPoints +
          ' points and you have ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>The computer busted. The player wins. You have ' +
          playerProfile[currPlayer].playerCoins +
          ' coins.<br><br>The game round has ended. Please enter your bets for the next round.';
        computerHand = [];
        var counter = 0;
        while (counter < playerProfile.length) {
          playerProfile[counter].playerHand = [];
          playerProfile[counter].playerWage = 0;
          playerProfile[counter].playerPoints = 0;
          playerProfile[counter].blackJack = 'false';
          counter = counter + 1;
        }
        computerPoints = 0;
        currPlayer = 0;
        gameMode = 'bet';
      } else {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', the computer has ' +
          computerPoints +
          ' points and the player has ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>The computer busted. The player wins. You have ' +
          playerProfile[currPlayer].playerCoins +
          ' coins.';
        currPlayer = currPlayer + 1;
      }
    } else if (
      playerProfile[currPlayer].playerPoints > 21 &&
      computerPoints > 21
    ) {
      if (playerProfile[currPlayer].playerNo == noOfPlayers) {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', the computer has ' +
          computerPoints +
          ' points and you have ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>Both players busted. It is a tie. You have ' +
          playerProfile[currPlayer].playerCoins +
          ' coins.<br><br>The game round has ended. Please enter your bets for the next round.';
        computerHand = [];
        var counter = 0;
        while (counter < playerProfile.length) {
          playerProfile[counter].playerHand = [];
          playerProfile[counter].playerWage = 0;
          playerProfile[counter].playerPoints = 0;
          playerProfile[counter].blackJack = 'false';
          counter = counter + 1;
        }
        computerPoints = 0;
        currPlayer = 0;
        gameMode = 'bet';
      } else {
        myOutputValue =
          playerProfile[currPlayer].name +
          ', the computer has ' +
          computerPoints +
          ' points and the player has ' +
          playerProfile[currPlayer].playerPoints +
          ' points. <br>Both players busted. It is a tie. You have ' +
          playerProfile[currPlayer].playerCoins +
          ' coins.';
        currPlayer = currPlayer + 1;
      }
    }
    return myOutputValue;
  }
};
