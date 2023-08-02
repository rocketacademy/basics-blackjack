// Game Modes
var GAME_BEGINS = "game begins";
var GAME_2_CARDS = "2 cards drawn";
var GAME_RESULTS = "show results";
var GAME_HIT_STAND = "Choose to hit or stand";
var currentGame = GAME_BEGINS;
// Player and Dealer arrays
var playerCard = [];
// var playerCardSum;
var dealerCard = [];
// var dealerCardSum;
// Card deck
var cardDeck = "empty at the start";

var main = function (input) {
  var outputMessage = "";
  //Game begins with each player drawing 2 cards each
  if (currentGame === GAME_BEGINS) {
    outputMessage = GAMEMODESTART();
    return outputMessage;
  }

  //Cards are analysed for blackjack
  if (currentGame === GAME_2_CARDS) {
    // dealerCard = [
    //   { name: "ace", suit: "spades", rank: 11 },
    //   { name: 10, suit: "spades", rank: 10 },
    // ];
    outputMessage = checkForBlackjackMessage();
    //change game mode
    currentGame = GAME_HIT_STAND;
    return outputMessage;
  }

  if (currentGame === GAME_HIT_STAND) {
    //if input is hit, add another card from the deck and then calculate
    if (input === "hit") {
      playerCard.push(startDeck.pop());
      var dealerCardSum = calcArray(dealerCard);

      outputMessage = checkForBlackjackMessage();
      console.log("Dealer cards:", dealerCard);
    }
    //if input is stand, validate the values -- copy the comparison values earlier into here
    else if (input === "stand") {
      //once player stands, if dealer's cards are 16 and below, draw another card. If it isn't, dealer stand
      var playerCardSum = calcArray(playerCard);
      var dealerCardSum = calcArray(dealerCard);
      // console.log("while loop dealer cards", dealerCardSum);
      while (dealerCardSum < 17) {
        dealerCard.push(startDeck.pop());
        console.log("while loop dealer cards", dealerCard);
        dealerCardSum = calcArray(dealerCard);
      }
      //calculate the total of both cards from each player and dealer
      console.log("Player card sum:", playerCardSum);
      console.log("Dealer card sum:", dealerCardSum);
      // compare the totals

      //if value is above 21, bust!
      if (playerCardSum > 21 && dealerCardSum > 21) {
        outputMessage =
          displayAllCardsPlayerDealer(playerCard, dealerCard) +
          "Both player and dealers cards exceed 21<br> BUST!";
      } else if (playerCardSum > 21) {
        outputMessage =
          displayAllCardsPlayerDealer(playerCard, dealerCard) +
          "Player cards exceeds 21<br> Dealer wins!";
      } else if (dealerCardSum > 21) {
        outputMessage =
          displayAllCardsPlayerDealer(playerCard, dealerCard) +
          "Dealer cards exceeds 21<br> Player wins!";
      } //same value = tie
      else if (playerCardSum == dealerCardSum) {
        outputMessage =
          displayAllCardsPlayerDealer(playerCard, dealerCard) +
          "Both player and dealer scored the same. <br> It is a tie!";
      }
      //player higher value = player wins
      else if (playerCardSum > dealerCardSum) {
        outputMessage =
          displayAllCardsPlayerDealer(playerCard, dealerCard) + "Player wins!";
      }
      //dealer higher value = dealer wins
      else {
        outputMessage =
          displayAllCardsPlayerDealer(playerCard, dealerCard) + "Dealer wins!";
      }
    }
    //add input validation
    if (input != "hit" && input != "stand") {
      outputMessage =
        "Please type only 'hit' or 'stand'.<br><br>" +
        displayAllCardsPlayer1Dealer(playerCard, dealerCard);
    }
    return outputMessage;
  }
};

//////////
// 01. CREATE A NEW DECK
///////////
var createShuffledDeck = function () {
  var newDeck = makeDeck();
  // Shuffle Deck and put into array
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

///////////////////
// 02. DEAL 2 CARDS FOR GAME -- GAMEMODESTART
////////////////////
var GAMEMODESTART = function () {
  // Make Deck
  startDeck = createShuffledDeck();
  console.log("deck before dealing " + startDeck.length);
  //Each player deals 2 cards one by one starting from the last card
  playerCard.push(startDeck.pop());
  dealerCard.push(startDeck.pop());
  playerCard.push(startDeck.pop());
  dealerCard.push(startDeck.pop());

  console.log("player hand :");
  console.log(playerCard);
  console.log("dealer hand :");
  console.log(dealerCard);

  console.log("deck after dealing 2 each " + startDeck.length);
  currentGame = GAME_2_CARDS;
  outputMessage =
    "Both cards are drawn. Checking for blackjack.... Click 'Submit'";
  return outputMessage;
};
///////////////////
// 03. CHECK FOR BLACKJACK
//////////////////
var checkForBlackjack = function (playerArray) {
  //Check player's hand
  var playerCardOne = playerArray[0];
  var playerCardTwo = playerArray[1];
  var isBlackJack = false;

  //if blackjack, return true
  if (
    (playerCardOne.name === "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name === "ace")
  ) {
    isBlackJack = true;
  }

  //else return false
  return isBlackJack;
};

////////////////////
//03b. CHECK FOR BLACKJACK AND RETURN OUTPUT MESSAGE
var checkForBlackjackMessage = function () {
  var playerHasBlackjack = checkForBlackjack(playerCard);
  var dealerHasBlackjack = checkForBlackjack(dealerCard);

  // dealerHasBlackjack = true;
  // playerHasBlackjack = true;
  if (playerHasBlackjack === true || dealerHasBlackjack === true) {
    // check for tie condition
    if (playerHasBlackjack === true && dealerHasBlackjack === true) {
      outputMessage =
        displayAllCardsPlayerDealer(playerCard, dealerCard) +
        "It's a blackjack tie! Game ends.";
    }
    // player 1 has blackjack
    else if (playerHasBlackjack === true && dealerHasBlackjack === false) {
      outputMessage =
        displayAllCardsPlayerDealer(playerCard, dealerCard) +
        "Player wins blackjack!";
    }
    // dealer has blackjack
    else {
      outputMessage =
        displayAllCardsPlayerDealer(playerCard, dealerCard) +
        "Dealer wins blackjack";
    }
    console.log(outputMessage);
  } else {
    outputMessage =
      displayAllCardsPlayer1Dealer(playerCard, dealerCard) +
      "There is no blackjack! <br><br> Hey Player 1, type hit' or 'stand'";
    console.log(outputMessage);

    //since no blackjack, game continues
  }
  //return output message
  return outputMessage;
};

///////////////////
// 04. IF NOT BLACKJACK, CALCULATE PLAYER/DEALER CARD ARRAYS
//////////////////
var calcArray = function (playerArray) {
  var totalCardSum = 0;
  var index = 0;
  while (index < playerArray.length) {
    var currentCard = playerArray[index];
    //treat character cards as value 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalCardSum = totalCardSum + 10;
    } else {
      totalCardSum = totalCardSum + currentCard.rank;
    }
    index += 1;
  }
  return totalCardSum;
};

///////////////////
// xx. DISPLAY CARDS OF BOTH PLAYER AND DEALER IN A NEAT MANNER
//////////////////
var displayAllCardsPlayerDealer = function (playerCard, dealerCard) {
  //Player's cards
  var playerMessage = "Player's Cards: <br>";
  for (index = 0; index < playerCard.length; index += 1) {
    playerMessage =
      playerMessage +
      "-" +
      playerCard[index].name +
      " of " +
      playerCard[index].suit +
      "<br>";
  }
  //Dealer's cards
  var dealerMessage = "Dealer's Cards: <br>";
  for (index = 0; index < dealerCard.length; index += 1) {
    dealerMessage =
      dealerMessage +
      "-" +
      dealerCard[index].name +
      " of " +
      dealerCard[index].suit +
      "<br>";
  }

  return playerMessage + "<br>" + dealerMessage;
};

///////////////////
// xx. DISPLAY CARDS OF BOTH PLAYER CARDS AND 1 DEALER CARD IN A NEAT MANNER
//////////////////
var displayAllCardsPlayer1Dealer = function (playerCard, dealerCard) {
  //Player's cards
  var playerMessage2 = "Player's Cards: <br>";
  for (index = 0; index < playerCard.length; index += 1) {
    playerMessage2 =
      playerMessage2 +
      "-" +
      playerCard[index].name +
      " of " +
      playerCard[index].suit +
      "<br>";
  }
  //Dealer's cards
  var dealerMessage2 = "Dealer's Revealed Card: <br>";
  dealerMessage2 =
    dealerMessage2 +
    "-" +
    dealerCard[1].name +
    " of " +
    dealerCard[1].suit +
    "<br>";

  return playerMessage2 + "<br>" + dealerMessage2;
};

///////////
//// xx. MAKE THE DECK
///////////
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

///////////
//// xx. RANDOM INDEX TO HELP IN SHUFFLING DECK HELPER FUNCTION
///////////
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

////////////
//// xx. SHUFFLE THE DECK
/////////////
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
