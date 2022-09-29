//*blackjack!
// Flow of the game
// 1) Deck is shuffled.
// 2) User clicks Submit to deal cards.
// 3) The cards are analysed for game winning conditions, e.g. Blackjack.
// 4) The cards are displayed to the user.
// 5) The user decides whether to hit or stand, using the submit button to submit their choice.
// 6) The user's cards are analysed for winning or losing conditions.
// 7) The computer decides to hit or stand automatically based on game rules.
// 8) The game either ends or continues.

// ******* Step 1 : make card game (deck / shuffle / draw cards / get winners) *******//
//      1) define player and dealer
//      2) create and shuffle a game deck
//      3) draw 2 cards for player and dealer each
//      4) win (black jack / higher hand value)
//      5) display and for both plaer and get who is the winner

// ******** Step 2 : Player hit or stand ******* //
//      1) extra game mode to hit or stand
//      2) function to add card card after being input of "hit" or "stand"

// ******** Step 3 : Dear hit or stand ***** //
//      1) dealer choose to hit or stand after player finish their turn
//      2) if dealer hand value is less than 17, hit
//      3) if dealer hand value is more than 17, stand

// ********* step 4 : Ace to be come either 1 or 11 ********* //
//      1) if the total value goes below 21, Ace will be counted as 11
//      2) if the total value goes above 21, Ace need to change value to 1 instead of 11

//image global variable//
var image1 =
  '<img src="https://c.tenor.com/FaMwfY6UU9kAAAAM/shuffle-cards.gif"/>';
var imageThumbsUp =
  '<img src="https://c.tenor.com/D5d3KKgydBUAAAAM/gavin-meme.gif"/>';
var imageWhat =
  '<img src="https://c.tenor.com/8W03lgoMEv0AAAAM/umm-what.gif"/>';
var imageEvilLaugh =
  '<img src="https://c.tenor.com/Jw3KI0JGQFAAAAAM/gavin-gavin-thomas.gif"/>';
var imageLost =
  '<img src="https://c.tenor.com/9-0P-Fh_VSMAAAAM/gavin-meme.gif"/>';
var imageThinking =
  '<img src="https://c.tenor.com/BMQTJ4nWvCIAAAAM/thinking-think.gif"/>';
var imageWrongAnswer =
  '<img src="https://c.tenor.com/S9A24f_TI_EAAAAM/did-you-read-it-you-get-it.gif"/>';

// *** GLOBAL VARIABLE ***//
var gameMode_Start = "Game Start";
var gameMode_DrawnCards = "Drawn Cards";
var gameMode_ResultShown = "Show Result";
var gameMode_HitOrStand = "Hit or Stand";
var currentGameMode = gameMode_Start;

// variable for the group of multiple cards holding
var playerHand = [];
var dealerHand = [];

// *** FUNCTIONS *** //
var checkForBlackJack = function (handArray) {
  // this will return true or false!
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  //way to become blackjack (21)
  //1) ACE + 10 or more  (must have ACE in either one)
  //2) 10 or more + ACE
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackJack = true;
  }
  // except that scenario, it would be all NOT black jack and can return directly "false"
  return isBlackJack;
};

var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;

  for (var i = 0; i < handArray.length; i += 1) {
    var currentCard = handArray[i];
    // console.log(currentCard);
    // Jack / Queen / King equals to 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter += 1;
    }
    // if not, just face value
    else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    for (var j = 0; j < aceCounter; j += 1) {
      if (totalHandValue > 21) {
        totalHandValue = totalHandValue - 10;
      }
    }
  }
  return totalHandValue;
};

var displayPlayerAndDealerHandsFirst = function (
  playerHandArray,
  dealerHandArray
) {
  //playerHand
  var playerMessage = "Player Hand : <br>";
  for (var index = 0; index < playerHandArray.length; index += 1) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
  }
  //dealerHand
  var dealerMessage =
    "Dealer Hand : <br>" +
    "- " +
    dealerHandArray[0].name +
    " of " +
    dealerHandArray[0].suit +
    "<br>- Unknown Card";
  return playerMessage + "<br>" + dealerMessage + "<br><br>";
};

var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  //playerHand
  var playerMessage = "Player Hand : <br>";
  for (var index = 0; index < playerHandArray.length; index += 1) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
  }
  //dealerHand
  var dealerMessage = "Dealer Hand : <br>";
  for (var index = 0; index < dealerHandArray.length; index += 1) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
  }
  return playerMessage + "<br>" + dealerMessage + "<br><br>";
};

var displayTotalValueFirst = function (playerHandValue, dealerHandArray) {
  var totalHandValueMessage =
    "<br><br><br>Player Total Hand Value : " +
    playerHandValue +
    "<br>Dealer Total Hand Value : " +
    dealerHandArray[0].rank +
    " + 'unknown card' ";
  return totalHandValueMessage;
};

var displayTotalValue = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br><br><br>Player Total Hand Value : " +
    playerHandValue +
    "<br>Dealer Total Hand Value : " +
    dealerHandValue;
  return totalHandValueMessage;
};

var deck = [
  {
    name: "ace",
    suit: "hearts",
    rank: 1,
  },
  {
    name: "2",
    suit: "hearts",
    rank: 2,
  },
  {
    name: "3",
    suit: "hearts",
    rank: 3,
  },
  {
    name: "4",
    suit: "hearts",
    rank: 4,
  },
  {
    name: "5",
    suit: "hearts",
    rank: 5,
  },
  {
    name: "6",
    suit: "hearts",
    rank: 6,
  },
  {
    name: "7",
    suit: "hearts",
    rank: 7,
  },
  {
    name: "8",
    suit: "hearts",
    rank: 8,
  },
  {
    name: "9",
    suit: "hearts",
    rank: 9,
  },
  {
    name: "10",
    suit: "hearts",
    rank: 10,
  },
  {
    name: "jack",
    suit: "hearts",
    rank: 11,
  },
  {
    name: "queen",
    suit: "hearts",
    rank: 12,
  },
  {
    name: "king",
    suit: "hearts",
    rank: 13,
  },
  {
    name: "ace",
    suit: "diamonds",
    rank: 1,
  },
  {
    name: "2",
    suit: "diamonds",
    rank: 2,
  },
  {
    name: "3",
    suit: "diamonds",
    rank: 3,
  },
  {
    name: "4",
    suit: "diamonds",
    rank: 4,
  },
  {
    name: "5",
    suit: "diamonds",
    rank: 5,
  },
  {
    name: "6",
    suit: "diamonds",
    rank: 6,
  },
  {
    name: "7",
    suit: "diamonds",
    rank: 7,
  },
  {
    name: "8",
    suit: "diamonds",
    rank: 8,
  },
  {
    name: "9",
    suit: "diamonds",
    rank: 9,
  },
  {
    name: "10",
    suit: "diamonds",
    rank: 10,
  },
  {
    name: "jack",
    suit: "diamonds",
    rank: 11,
  },
  {
    name: "queen",
    suit: "diamonds",
    rank: 12,
  },
  {
    name: "king",
    suit: "diamonds",
    rank: 13,
  },
  {
    name: "ace",
    suit: "clubs",
    rank: 1,
  },
  {
    name: "2",
    suit: "clubs",
    rank: 2,
  },
  {
    name: "3",
    suit: "clubs",
    rank: 3,
  },
  {
    name: "4",
    suit: "clubs",
    rank: 4,
  },
  {
    name: "5",
    suit: "clubs",
    rank: 5,
  },
  {
    name: "6",
    suit: "clubs",
    rank: 6,
  },
  {
    name: "7",
    suit: "clubs",
    rank: 7,
  },
  {
    name: "8",
    suit: "clubs",
    rank: 8,
  },
  {
    name: "9",
    suit: "clubs",
    rank: 9,
  },
  {
    name: "10",
    suit: "clubs",
    rank: 10,
  },
  {
    name: "jack",
    suit: "clubs",
    rank: 11,
  },
  {
    name: "queen",
    suit: "clubs",
    rank: 12,
  },
  {
    name: "king",
    suit: "clubs",
    rank: 13,
  },
  {
    name: "ace",
    suit: "spades",
    rank: 1,
  },
  {
    name: "2",
    suit: "spades",
    rank: 2,
  },
  {
    name: "3",
    suit: "spades",
    rank: 3,
  },
  {
    name: "4",
    suit: "spades",
    rank: 4,
  },
  {
    name: "5",
    suit: "spades",
    rank: 5,
  },
  {
    name: "6",
    suit: "spades",
    rank: 6,
  },
  {
    name: "7",
    suit: "spades",
    rank: 7,
  },
  {
    name: "8",
    suit: "spades",
    rank: 8,
  },
  {
    name: "9",
    suit: "spades",
    rank: 9,
  },
  {
    name: "10",
    suit: "spades",
    rank: 10,
  },
  {
    name: "jack",
    suit: "spades",
    rank: 11,
  },
  {
    name: "queen",
    suit: "spades",
    rank: 12,
  },
  {
    name: "king",
    suit: "spades",
    rank: 13,
  },
];

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

var shuffledDeck = shuffleCards(deck);

// ******* MAIN Function *******//
var main = function (input) {
  var myOutputValue = "";

  //First Click//
  if (currentGameMode == gameMode_Start) {
    //create the game deck
    var gameDeck = deck;
    console.log(gameDeck);
    // deal 2 cards to player and dealer each
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand");
    console.log(playerHand);
    console.log("dealer hand");
    console.log(dealerHand);

    // update the game mode
    currentGameMode = gameMode_DrawnCards;

    // show updated output message
    myOutputValue =
      image1 +
      "<br>Everyone already draw their cards. Click 'submit' to see the result of cards";
    return myOutputValue;
  }

  //Second Click//
  if (currentGameMode == gameMode_DrawnCards) {
    // playerHand = [
    //   { name: "queen", suit: "clubs", rank: 12 },
    //   { name: "ace", suit: "diamonds", rank: 1 },
    // ];
    // dealerHand = [
    //   { name: "ace", suit: "spades", rank: 1 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];
    // console.log(currentGameMode);
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    // console.log("player has blackjack? ");
    // console.log(playerHasBlackJack);
    // console.log("dealer has blackjack?");
    // console.log(dealerHasBlackJack);

    // check whether blackjack situation or not
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      // both player have blackjacks -> tie
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "You both has blackjack! It is a tie" +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue);
      }
      // player has blackjack -> player wins
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Player, You win! You have a blackjack" +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          imageThumbsUp;
      }
      // dealer has blackjack -> dealer wins
      else if (playerHasBlackJack == false && dealerHasBlackJack == true) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Opppsy, you lose! Dealer got a black jack!" +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          imageLost;
      }
      console.log(myOutputValue);
    } else {
      // playerHand = [
      //   { name: "queen", suit: "clubs", rank: 12 },
      //   { name: 5, suit: "diamonds", rank: 5 },
      // ];
      // dealerHand = [
      //   { name: "queen", suit: "spades", rank: 12 },
      //   { name: 10, suit: "spades", rank: 10 },
      // ];
      myOutputValue = "There is no blackjack! Let's calculate";
      // no blackjack -> check the total value
      // calculate the total hand value for both dealer and player
      // console.log("pre function");
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      // console.log("post function");

      // console.log("player total hand value");
      // console.log(playerHandTotalValue);
      // console.log("dealer total hand value");
      // console.log(dealerHandTotalValue);

      // compare total hand value
      // BUST 1 : player total value goes above 21
      if (playerHandTotalValue > 21) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "BUST! player lose" +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          imageWhat;
      }
      // BUST 2 : dealer total value goes above 21
      else if (dealerHandTotalValue > 21) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dear got a 'BUST'! Plaer, you won!" +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          imageEvilLaugh;
      }
      // same value for both -> tie
      else if (playerHandTotalValue == dealerHandTotalValue) {
        myOutputValue =
          displayPlayerAndDealerHandsFirst(playerHand, dealerHand) +
          "Player, It is a tie so far! Type 'hit' or 'stand' to continue" +
          displayTotalValueFirst(playerHandTotalValue, dealerHand);
      }
      // player has higher value -> player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        myOutputValue =
          displayPlayerAndDealerHandsFirst(playerHand, dealerHand) +
          "Player, Type 'hit' or 'stand' to continue<br>" +
          imageThinking +
          displayTotalValueFirst(playerHandTotalValue, dealerHand);
      }
      // dealer has higher value -> dealer wins
      else if (playerHandTotalValue < dealerHandTotalValue) {
        myOutputValue =
          displayPlayerAndDealerHandsFirst(playerHand, dealerHand) +
          "Player, Type 'hit' or 'stand' to continue<br>" +
          imageThinking +
          displayTotalValueFirst(playerHandTotalValue, dealerHand);
      }
    }
    // change game mode
    currentGameMode = gameMode_HitOrStand;
    // update the output message
    return myOutputValue;
  }

  // Hit or Stand Mode
  if (currentGameMode == gameMode_HitOrStand) {
    // input validation
    if (input !== "hit" && input !== "stand") {
      myOutputValue =
        "Wrong input! Please type either 'hit' or 'stand' <br><br>" +
        imageWrongAnswer +
        displayPlayerAndDealerHandsFirst(playerHand, dealerHand);
    }
    // user input "hit"
    else if (input == "hit") {
      playerHand.push(deck.pop());
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      if (playerHandTotalValue > 21) {
        myOutputValue = "BUST! player lose<br>" + imageLost;
      } else {
        myOutputValue =
          displayPlayerAndDealerHandsFirst(playerHand, dealerHand) +
          "<br> You just draw another card. Your total value is " +
          playerHandTotalValue +
          " now. <br> Please input 'hit' or 'stand' to continue. ";
      }
    }
    // user input "stand"
    else if (input == "stand") {
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      // dealer draw one more card or not
      while (dealerHandTotalValue < 17) {
        dealerHand.push(deck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // compare total hand value
      // BUST 1 : player total value goes above 21
      if (playerHandTotalValue > 21) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "BUST! player lose" +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          imageWhat;
      }
      // BUST 2 : dealer total value goes above 21
      else if (dealerHandTotalValue > 21) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dear got a 'BUST'! Player! you just WON! " +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          imageThumbsUp;
      }
      // same value for both -> tie
      else if (playerHandTotalValue == dealerHandTotalValue) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "It is a tie! Both add up to same amount!" +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue);
      }
      // player has higher value -> player wins
      else if (playerHandTotalValue > dealerHandTotalValue) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Player wins!" +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          imageThumbsUp;
      }
      // dealer has higher value -> dealer wins
      else if (playerHandTotalValue < dealerHandTotalValue) {
        myOutputValue =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dealer wins! You lost" +
          displayTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          imageLost;
      }
    }

    return myOutputValue;
  }
};
