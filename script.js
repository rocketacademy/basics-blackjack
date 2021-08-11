var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
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
      //change Jack/Queen/King rank to 10
      var cardRank = rankCounter;
      if (cardName == "jack" || cardName == "queen" || cardName == "king") {
        cardRank = 10;
      }
      if (cardName == "ace") {
        cardRank = 11;
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
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

var changeAce = function () {};

var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

//shuffle cards
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

var shuffledDeck = shuffleCards(makeDeck());

// Store player and computer cards
var playerHand = [];
console.log(playerHand);
var computerHand = [];
console.log(computerHand);

//Computer and Player's total score
var sumPlayerTotal = 0;
var sumComputerTotal = 0;

//displaying cards
var displayCardMessage = "";

//GameMode
var currGameMode = "drawTwoCards";

//sum of all cards
var sum = function (cardArray, totalPoints) {
  var index = 0;
  totalPoints = 0;
  displayCardMessage = "";
  while (index < cardArray.length) {
    console.log(cardArray);
    totalPoints = Number(totalPoints) + Number(cardArray[index].rank);
    console.log(totalPoints);
    displayCardMessage =
      displayCardMessage +
      cardArray[index].name +
      cardArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return totalPoints;
};
var shuffledDeck = [];
var checkforAceCondition = function (cardArray, totalPoints) {
  var index = 0;
  while (index < cardArray.length) {
    if (totalPoints > 21 && cardArray[index].name == "ace") {
      totalPoints -= 10;
    }
    index = index + 1;
  }
  return totalPoints;
};

//main function
var main = function (input) {
  var myOutputValue = "";
  if (currGameMode == "drawTwoCards") {
    currGameMode = "hitOrStand";
    var newDeck = makeDeck();
    shuffledDeck = shuffleCards(newDeck);

    //Player and Computer get 1st card
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());

    // playerand computer get 2nd card
    playerHand.push(shuffledDeck.pop());
    computerHand.push(shuffledDeck.pop());

    // Construct an output string to communicate which cards were drawn
    myOutputValue =
      "Computer had " +
      computerHand[0].name +
      " of " +
      computerHand[0].suit +
      " and " +
      computerHand[1].name +
      " of " +
      computerHand[1].suit +
      "." +
      "<br>" +
      "Player had " +
      playerHand[0].name +
      " of " +
      playerHand[0].suit +
      " and " +
      playerHand[1].name +
      " of " +
      playerHand[1].suit +
      "." +
      "<br>" +
      "<br>" +
      "Player, please enter either 'hit' to draw another card or 'stand' to hold your position. Thereafter, please click submit to proceed.";

    // Sum player cards
    sumPlayerTotal = sum(playerHand, sumPlayerTotal);

    //to determine if there is blackjack - player
    if (sumPlayerTotal == 21) {
      return `Player has Blackjack. Player wins! Please refresh to start a new game.`;
    }
    //sum computer cards
    sumComputerTotal = sum(computerHand, sumComputerTotal);

    //to determine if there is blackjack - computer
    if (sumComputerTotal == 21) {
      return `Computer has Blackjack. Computer wins! Please refresh to start a new game.`;
    }
    return myOutputValue;
  }
  // Hit or Stand Game Mode - 2nd block
  if (currGameMode == "hitOrStand") {
    // to determine if player hit or draw and show the player 3rd card
    if (input) {
      if (input == "stand") {
        myOutputValue =
          "Player, you have chose to stand. Your cards are: " +
          "<br>" +
          displayCardMessage +
          "Your total score is " +
          sumPlayerTotal +
          "." +
          "<br>" +
          "<br>" +
          "Please click submit to see Computer's cards. ";
        currGameMode = "computerDecides";
      }

      if (input == "hit") {
        console.log(shuffledDeck);
        playerHand.push(shuffledDeck.pop());
        sumPlayerTotal = sum(playerHand, sumPlayerTotal);
        sumPlayerTotal = checkforAceCondition(playerHand, sumPlayerTotal);
        if (sumPlayerTotal <= 21) {
          myOutputValue =
            "Player, your cards are: " +
            "<br>" +
            displayCardMessage +
            "<br>" +
            "Your total score is " +
            sumPlayerTotal +
            "<br>" +
            "<br>" +
            "Player, please enter either 'hit' to draw another card or 'stand' to hold your position. Thereafter, please click submit to proceed." +
            "<br>";
        }
        if (sumPlayerTotal > 21) {
          myOutputValue =
            "Player, your cards are: " +
            "<br>" +
            displayCardMessage +
            "<br>" +
            "Your total score is " +
            sumPlayerTotal +
            "." +
            "<br>" +
            "<br>" +
            "Gameover, you're busted! Refresh the page to start a new game.";
        }
        return myOutputValue;
      }
    }
    // 3rd block: if computer has more than 16 then stay. if not, hit.
    // if after the 3rd card and computer go bust, player wins
    if (currGameMode == "computerDecides") {
      console.log("Expecting sum of computer total below 17", sumComputerTotal);
      if (sumComputerTotal < 17) {
        computerHand.push(shuffledDeck.pop());
        console.log("Computer Hand", computerHand);
        sumComputerTotal = sum(computerHand, sumComputerTotal);
        sumComputerTotal = checkforAceCondition(computerHand, sumComputerTotal);
        if (sumComputerTotal < 21) {
          myOutputValue =
            "Computer has the following cards: " +
            "<br>" +
            displayCardMessage +
            "<br>" +
            "Computer total score is " +
            sumComputerTotal +
            "." +
            "<br>" +
            "<br>" +
            "Please click submit to reveal winner." +
            "<br>";
        }
      }
      if (sumComputerTotal > 17) {
        myOutputValue =
          "Computer has the following cards: " +
          "<br>" +
          displayCardMessage +
          "<br>" +
          "Computer total score is " +
          sumComputerTotal +
          "." +
          "<br>" +
          "<br>" +
          "Please click submit to reveal winner.";
      }
      currGameMode = "pickWinner";
    }
    return myOutputValue;
  }
  //Compare and announce winner
  if (currGameMode == "pickWinner");
  {
    if (sumComputerTotal > sumPlayerTotal && sumComputerTotal < 22) {
      myOutputValue =
        "Computer has a total score of  " +
        sumComputerTotal +
        "<br>" +
        "vs" +
        "<br>" +
        "Player has a total score of  " +
        sumPlayerTotal +
        "." +
        "<br>" +
        "<br>" +
        "Computer wins. Please refresh the page to start a new game!";
    } else if (sumPlayerTotal < sumComputerTotal && sumComputerTotal < 22) {
      myOutputValue =
        "Computer has a total score of  " +
        sumComputerTotal +
        "<br>" +
        "vs" +
        "<br>" +
        "Player has a total score of  " +
        sumPlayerTotal +
        "." +
        "<br>" +
        "<br>" +
        "Computer wins. Please refresh the page to start a new game!";
    } else if (sumComputerTotal > 21) {
      myOutputValue =
        "Player Wins. Computer is busted! Please refresh the page to start a new game!";
    } else if (sumPlayerTotal > sumComputerTotal) {
      myOutputValue =
        "Computer has a total score of  " +
        sumComputerTotal +
        "<br>" +
        "vs" +
        "<br>" +
        "Player has a total score of  " +
        sumPlayerTotal +
        "." +
        "<br>" +
        "<br>" +
        "Player wins. Player has a higher score. Please refresh the page to start a new game!";
    } else {
      myOutputValue = "Its a tie! Please refresh the page to start a new game!";
    }
  }
  return myOutputValue;
};
