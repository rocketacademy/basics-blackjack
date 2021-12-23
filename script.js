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

var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

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
    //console.log(currentSuit);
    // to test that suitIndex run 4 times 0 - 3
    // console.log(suitIndex);
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      //console.log(rankCounter);

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace: " + cardName;
      } else if (cardName == 11) {
        cardName = "jack: " + cardName;
      } else if (cardName == 12) {
        cardName = "queen: " + cardName;
      } else if (cardName == 13) {
        cardName = "king: " + cardName;
      }

      //console.log(cardName);

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

///////////////////////////////////////////
//game function

// function that display total hand value for player and dealer

var displayHandTotalValue = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    " <br> player total hand value is: " +
    playerHandValue +
    " <br> dealer hand value is: " +
    dealerHandValue;

  return totalHandValueMessage;
};

// function that displays the hand value for player and dealer
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = " <br> Player hand: ";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      " - " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  index = 0;
  var dealerMessage = " <br> Dealer hand: ";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      " - " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;
  //loop through player and dealer hand value and total up the value
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    //for jack, Queen, King value with 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }

  return totalHandValue;
};

var checkForBlackJack = function (handArray) {
  //bring the value of the card to the array into this function then assign to variable one and two to check the value.
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  //status of is black jack set to false
  var isBlackJack = false;

  //check if there is a black jack return status as true
  //card one is ace and card two is 10/11/12/13 - true
  //card one is 10/11/12/13 and card two is ace - true
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "ace")
  ) {
    isBlackJack = true;
  }

  return isBlackJack;
};

//There will be only two players.
//One human and one computer (for the Base solution).
//The computer will always be the dealer.
//Each player gets dealt two cards to start.
//The player goes first, and decides if they want to hit (draw a card) or stand (end their turn).
//The dealer has to hit if their hand is below 17.
//Each players' score is the total of their card ranks. Jacks/Queen/Kings are 10. Aces can be 1 or 11.
//The player who is closer to, but not above 21 wins the hand.

////////////////////////////////////
//global variables
//global variable for game start
var GAME_START = "GAME_START";
//global variable for card drawn
var GAME_CARD_DRAWN = "GAME_CARD_DRAWN";
//global variable for result shown
var GAME_RESULT_SHOWN = "GAME_RESULT_SHOWN";
// global variable for hit or stand
var GAME_HIT_OR_STAND = "GAME_HIT_OR_STAND";

//current game mode is
var currentGameMode = GAME_START;

//declare array to hold the variables for player
var playerHand = [];

//declare array to hold the variables for computer
var dealerHand = [];

//global variable for game deck at the start
var gameDeck = "EMPTY";

var main = function (input) {
  var outputMessage = "";
  //when the player click 1st submit, the game mode starts
  if (currentGameMode == GAME_START) {
    //the game mode starts and game deck randomly created
    gameDeck = createNewDeck();
    //this display can let me check random generated 52 cards
    //console.log(gameDeck);

    //add the card into the player array
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    //add the card into the dealer array
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    //console.log(playerHand);
    //console.log(dealerHand);

    //next step to draw the card
    currentGameMode = GAME_CARD_DRAWN;

    return (outputMessage =
      " Everyone has got their cards, click submit to check the winner. ");
  }

  if (currentGameMode == GAME_CARD_DRAWN) {
    //test checkforblackjackfunction
    // playerHand = [
    //   { name: "queen", suit: "clubs", rank: 12 },
    //   { name: "ace", suit: "diamonds", rank: 1 },
    // ];
    // dealerHand = [
    //   { name: "ace", suit: "clubs", rank: 1 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];

    //check for blackjack
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    // console.log("Does player has blackjack? === ", playerHasBlackJack);
    // console.log("Does dealer has blackjack? === ", dealerHasBlackJack);

    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          " <br> It is a blackjack tie! ";
      } else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          " <br> player wins by blackjack! ";
      } else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          " <br> dealer wins by blackjack! ";
      }
      console.log(OutputMessage);
    } else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        " <br> There is no blackjack! ";
      console.log(outputMessage);
      // no blackjack means game continues

      // change game mode to
      currentGameMode = GAME_HIT_OR_STAND;

      console.log(currentGameMode);
      return outputMessage;
    }
  }
  // hit or stand
  if (currentGameMode == GAME_HIT_OR_STAND) {
    //hit
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        " <br> you drew another card, please choose hit or stand. ";
    }
    //stand
    else if (input == "stand") {
      //calculate the total hand value of both players
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // console.log(" player total hand value is: === ", playerHandTotalValue);
      // console.log(" dealer total hand value is: === ", dealerHandTotalValue);

      // playerHandTotalValue = 11;
      // dealerHandTotalValue = 10;
      if (
        playerHandTotalValue == dealerHandTotalValue &&
        playerHandTotalValue < 21 &&
        dealerHandTotalValue < 21
      ) {
        // console.log(" it is a tie! ");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          " <br> it is a tie! " +
          displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          '<img src=" https://c.tenor.com/Gqy4WGxrMv0AAAAM/try-again.gif"/>';
      } else if (
        playerHandTotalValue > dealerHandTotalValue &&
        playerHandTotalValue < 21 &&
        dealerHandTotalValue < 21
      ) {
        //console.log(" player wins! ");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          " <br> player wins! " +
          displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          '<img src="https://c.tenor.com/xJfQQ-t9u3oAAAAM/success-kid-hells-yes.gif"/>';
      } else if (
        playerHandTotalValue < dealerHandTotalValue &&
        playerHandTotalValue < 21 &&
        dealerHandTotalValue < 21
      ) {
        //console.log(" dealer wins! ");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          " <br> dealer wins! " +
          displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          '<img src="https://c.tenor.com/O6icjMrTC04AAAAM/loser-spongebob-squarepants.gif"/>';
      } else {
        //to check if dealer busted and player wins
        if (playerHandTotalValue < 21 && dealerHandTotalValue > 21) {
          outputMessage =
            displayPlayerAndDealerHands(playerHand, dealerHand) +
            " <br> player wins as dealer busted! " +
            displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue) +
            "<br>" +
            '<img src="https://c.tenor.com/O6icjMrTC04AAAAM/loser-spongebob-squarepants.gif"/>';
        }
        //to check if players busted and dealer wins
        if (playerHandTotalValue > 21 && dealerHandTotalValue < 21) {
          outputMessage =
            displayPlayerAndDealerHands(playerHand, dealerHand) +
            " <br> dealer wins as player busted! " +
            displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue) +
            "<br>" +
            '<img src="https://c.tenor.com/O6icjMrTC04AAAAM/loser-spongebob-squarepants.gif"/>';
        }
        // for both players busted
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          " <br> both players busted! " +
          displayHandTotalValue(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          '<img src="https://c.tenor.com/O6icjMrTC04AAAAM/loser-spongebob-squarepants.gif"/>';
      }
    } else {
      outputMessage =
        " wrong input, please choose hit or stand ONLY. <br> " +
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<img src="https://c.tenor.com/zd5SufE0sFUAAAAC/wrong-chicken.gif"/>';
    }
    return outputMessage;
  }
};
