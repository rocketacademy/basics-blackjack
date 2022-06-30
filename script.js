var gameStart = "Game Start";
var cardDrawn = "Card Drawn";
var gameHitOrStand = "Game Hit Or Stand";
var cardResult = "Card Result";
var currentGameMode = gameStart;
var playerHand = [];
var dealerHand = [];

var gameDeck = "Hold Card Deck";

// var totoroGif = document.getElementById(
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6BCjrAsNLh0gpYYrSvehOSX-AHXF_8ITuOeYurfzFdBXUcYJFHbwXjt9m2J4dgHLRm98&usqp=CAU"
// );
// // if (totoroGif && totoroGif.style) {
// totoroGif.style.height = "30px";
// totoroGif.style.width = "30px";

// var kaonashiGif = document.getElementById(
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ1-lsmQ0LlbeY6uUVRZYPxz0ja4xblxzQEw&usqp=CAU"
// );
// // if (kaonashiGif && kaonashiGif.style) {
// kaonashiGif.style.height = "30px";
// kaonashiGif.style.width = "30px";

var totoroGif = '<img src="https://i.ibb.co/QpwFJnc/Totoro.jpg"/>';
var kaonashiGif = '<img src="https://i.ibb.co/f1qzLst/Kaonashi.png"/>';
var kaonashiWon =
  '<img src="https://data.whicdn.com/images/302241609/original.gif"/>';
var totoroWon =
  '<img src="https://i.pinimg.com/originals/88/1a/25/881a25d0af9ddc931511d7cd03f6863f.gif"/>';
//DECK
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["❤️", "💎", "♣️", "♠️"];

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
  console.log("Check flow: Card Deck");
  return cardDeck;
};

//SHUFFLING
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

//check for blackjack
var checkBlackJack = function (handArray) {
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

//calculate total hand value
var calculateTotalHandValue = function (handArray) {
  var handValue = 0;
  var index = 0;
  var hasAce = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      handValue = handValue + 10;
    } else {
      handValue = handValue + currentCard.rank;
    }

    if (currentCard.name == "ace") {
      hasAce = 1;
    }
    index = index + 1;
  }

  if (hasAce == 1 && handValue + 10 <= 21) {
    handValue = handValue + 10;
  }
  return handValue;
};

//result show
var displayAllResult = function (playerHandArray, dealerHandArray) {
  //player hand
  var playerMessage = totoroGif;
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";

    index = index + 1;
  }

  //dealer hand
  var dealerMessage = kaonashiGif;
  var index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage;
};

var resetGame = function () {
  playerHand = [];
  dealerHand = [];
};

var main = function (input) {
  var outputMessage = "";
  //FIRST CLICK
  if (currentGameMode == gameStart) {
    //Deck
    resetGame();
    var deck = makeDeck();
    gameDeck = shuffleCards(deck);
    console.log(gameDeck);

    //Card drawn
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    console.log("player hand ==> ");
    console.log(playerHand);
    console.log("dealer hand ==> ");
    console.log(dealerHand);

    //change game mode
    currentGameMode = cardDrawn;

    //output message for gameStart mode
    outputMessage =
      "Everyone has been dealt the cards. Click 'Go' to proceed the results!<br>";
    return outputMessage;
  }

  //SECOND CLICK
  if (currentGameMode == cardDrawn) {
    //check for blackjack
    var playerHasBlackJack = checkBlackJack(playerHand);
    var dealerHasBlackJack = checkBlackJack(dealerHand);

    //if blackjack -> true
    //playerHasBlackJack = true;
    //dealerHasBlackJack = true;
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      //both blackjack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        var result =
          displayAllResult(playerHand, dealerHand) +
          "<br>It's a Black Jack tie! <br><br> Please click 'Go!' to restart!";
        currentGameMode = gameStart;
        return result;
        // displayAllResult(playerHand, dealerHand) +
        // "<br>It's a Black Jack tie!";
      }
      //player blackjack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        var result =
          displayAllResult(playerHand, dealerHand) +
          "<br>" +
          totoroGif +
          "has won by Black Jack! <br><br>Please click 'Go!' to restart!" +
          "<br>" +
          totoroWon;
        currentGameMode = gameStart;
        return result;

        // outputMessage =
        //   displayAllResult(playerHand, dealerHand) +
        //   "<br>Player has won by Black Jack!";
      }
      //dealer blackjack
      else {
        var result =
          displayAllResult(playerHand, dealerHand) +
          "<br>" +
          kaonashiGif +
          "has won by Black Jack! <br><br> Please click 'Go!' to restart!" +
          "<br>" +
          kaonashiWon;
        currentGameMode = gameStart;
        return result;
      }
      console.log(outputMessage);
    } else {
      outputMessage =
        displayAllResult(playerHand, dealerHand) +
        "<br>Please choose 'Hit' or 'Stand'!";
      console.log(outputMessage);
    }
    var playerTotalHandValue = calculateTotalHandValue(playerHand);
    var dealerTotalHandValue = calculateTotalHandValue(dealerHand);

    console.log("Player total hand value -->", playerTotalHandValue);
    console.log("Dealer total hand value -->", dealerTotalHandValue);

    // if (playerTotalHandValue == dealerTotalHandValue) {
    //   console.log("It's a tie!");
    //   outputMessage =
    //     displayAllResult(playerHand, dealerHand) + "<br>It's a tie!";
    // }

    // if (playerTotalHandValue > dealerTotalHandValue) {
    //   console.log("Player won!");
    //   outputMessage =
    //     displayAllResult(playerHand, dealerHand) + "<br>Player won!";
    // }

    // if (playerTotalHandValue < dealerTotalHandValue) {
    //   console.log("Dealer won!");
    //   outputMessage =
    //     displayAllResult(playerHand, dealerHand) + "<br>Dealer won!";
    //}
    currentGameMode = gameHitOrStand;
  }

  //THIRD CLICK
  //invalid input
  if (currentGameMode == gameHitOrStand) {
    //player hit
    if (
      input != "Hit" ||
      input != "hit" ||
      input != "Stand" ||
      input != "stand"
    ) {
      playerTotalHandValue = calculateTotalHandValue(playerHand);
      dealerTotalHandValue = calculateTotalHandValue(dealerHand);
      outputMessage =
        "Please put 'Hit' or 'Stand'!<br><br>" +
        displayAllResult(playerHand, dealerHand) +
        "<br> Result" +
        totoroGif +
        "(" +
        playerTotalHandValue +
        ")" +
        kaonashiGif +
        "(" +
        dealerTotalHandValue +
        ")";
    }

    if (input == "Hit" || input == "hit") {
      playerHand.push(gameDeck.pop());
      playerTotalHandValue = calculateTotalHandValue(playerHand);
      outputMessage =
        displayAllResult(playerHand, dealerHand) +
        "<br> Result" +
        totoroGif +
        "(" +
        playerTotalHandValue +
        ") VS" +
        kaonashiGif +
        "(" +
        dealerTotalHandValue +
        ")<br><br>Please choose 'Hit' or 'Stand'!";

      if (playerTotalHandValue > 21) {
        currentGameMode = cardResult;
      }
    }

    if (input == "Stand" || input == "stand") {
      currentGameMode = cardResult;
    }

    if (currentGameMode == cardResult) {
      var playerTotalHandValue = calculateTotalHandValue(playerHand);
      var dealerTotalHandValue = calculateTotalHandValue(dealerHand);

      console.log("Player total hand value -->", playerTotalHandValue);
      console.log("Dealer total hand value -->", dealerTotalHandValue);

      if (
        dealerTotalHandValue < playerTotalHandValue &&
        playerTotalHandValue <= 21
      ) {
        while (dealerTotalHandValue <= playerTotalHandValue) {
          dealerHand.push(gameDeck.pop());
          dealerTotalHandValue = calculateTotalHandValue(dealerHand);
        }
      }

      if (playerTotalHandValue <= 21 && dealerTotalHandValue <= 21) {
        if (playerTotalHandValue == dealerTotalHandValue) {
          console.log("It's a tie!");
          currentGameMode = gameStart;
          outputMessage =
            displayAllResult(playerHand, dealerHand) +
            "<br> Result" +
            totoroGif +
            "(" +
            playerTotalHandValue +
            ")" +
            kaonashiGif +
            "(" +
            dealerTotalHandValue +
            ") <br>It's a tie! <br><br> Please click 'Go!' to restart!";
        } else if (playerTotalHandValue > dealerTotalHandValue) {
          console.log("Player won!");
          currentGameMode = gameStart;
          outputMessage =
            displayAllResult(playerHand, dealerHand) +
            "<br> Result" +
            totoroGif +
            "(" +
            playerTotalHandValue +
            ")" +
            kaonashiGif +
            "(" +
            dealerTotalHandValue +
            ")<br><br>Totoro won! <br><br> Please click 'Go!' to restart!" +
            "<br>" +
            totoroWon;
        } else if (playerTotalHandValue < dealerTotalHandValue) {
          console.log("Dealer won!");
          currentGameMode = gameStart;
          outputMessage =
            displayAllResult(playerHand, dealerHand) +
            "<br> Result" +
            totoroGif +
            "(" +
            playerTotalHandValue +
            ")" +
            kaonashiGif +
            "(" +
            dealerTotalHandValue +
            ")<br><br>Kaonashi won! <br><br> Please click 'Go!' to restart!" +
            "<br>" +
            kaonashiWon;
        }
      } else if (playerTotalHandValue > 21) {
        console.log("Dealer won!");
        currentGameMode = gameStart;
        outputMessage =
          displayAllResult(playerHand, dealerHand) +
          "<br> Result" +
          totoroGif +
          "(" +
          playerTotalHandValue +
          ")" +
          kaonashiGif +
          "(" +
          dealerTotalHandValue +
          ")<br><br>Kaonashi won! <br><br> Please click 'Go!' to restart!" +
          "<br>" +
          kaonashiWon;
      } else if (dealerTotalHandValue > 21) {
        console.log("Player won!");
        currentGameMode = gameStart;
        outputMessage =
          displayAllResult(playerHand, dealerHand) +
          "<br> Result" +
          totoroGif +
          "(" +
          playerTotalHandValue +
          ")" +
          kaonashiGif +
          "(" +
          dealerTotalHandValue +
          ")<br><br>Totoro won! <br><br> Please click 'Go!' to restart!" +
          "<br>" +
          totoroWon;
      }
    }
  }

  return outputMessage;
};
