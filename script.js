// Game Modes
var GAME_BEGINS = "game begins";
var GAME_2_CARDS = "2 cards drawn";
var GAME_RESULTS = "show results";
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
    var playerHasBlackjack = checkForBlackjack(playerCard);
    var dealerHasBlackjack = checkForBlackjack(dealerCard);

    // dealerHasBlackjack = true;
    // playerHasBlackjack = true;
    if (playerHasBlackjack === true || dealerHasBlackjack === true) {
      // check for tie condition
      if (playerHasBlackjack === true && dealerHasBlackjack === true) {
        outputMessage = "It's a blackjack tie! Game ends.";
      }
      // player 1 has blackjack
      else if (playerHasBlackjack === true && dealerHasBlackjack === false) {
        outputMessage = "Player wins blackjack!";
      }
      // dealer has blackjack
      else {
        outputMessage = "Dealer wins blackjack";
      }
      console.log(outputMessage);
    } else {
      outputMessage = " There is no blackjack";
      console.log(outputMessage);

      //since no blackjack, game continues

      //calculate the total of both cards from each player and dealer
      var playerCardSum = calcArray(playerCard);
      var dealerCardSum = calcArray(dealerCard);

      console.log("Player card sum:", playerCardSum);
      console.log("Dealer card sum:", dealerCardSum);
      // compare the totals

      //if value is above 21, bust!
      if (playerCardSum > 21 && dealerCardSum > 21) {
        outputMessage = `Player's cards are ${playerCardSum}, dealer's cards are ${dealerCardSum}.<br>Both player and dealers cards exceed 21<br> BUST!`;
      } else if (playerCardSum > 21) {
        outputMessage = `Player's cards are ${playerCardSum}, dealer's cards are ${dealerCardSum}.<br>Player's cards exceeds 21<br> Dealer wins!`;
      } else if (dealerCardSum > 21) {
        outputMessage = `Player's cards are ${playerCardSum}, dealer's cards are ${dealerCardSum}.<br>Dealer's cards exceeds 21<br> Player wins!`;
      } //same value = tie
      else if (playerCardSum == dealerCardSum) {
        outputMessage = `Player's cards are ${playerCardSum}, dealer's cards are ${dealerCardSum}.<br>Both player and dealer scored the same. <br> It's a tie!`;
      }
      //player higher value = player wins
      else if (playerCardSum > dealerCardSum) {
        outputMessage = `Player's cards are ${playerCardSum}, dealer's cards are ${dealerCardSum}.<br> Player wins!`;
      }
      //dealer higher value = dealer wins
      else {
        outputMessage = `Player's cards are ${playerCardSum}, dealer's cards are ${dealerCardSum}.<br> Dealer wins!`;
      }

      //change game mode
      currentGame = GAME_RESULTS;
      //return output message
      return outputMessage;
    }
  }
};

// // Cards are analysed for winning/losing conditions -- If player1 or player 2 scores 21, then Blackjack! If either scores above 21, then game ends
// if (gameMode === gameModeDealtCards) {
//   outputMessage = CHECKWINNINGCONDITIONS();
//   return outputMessage;
// }
// // console.log("gamemode after gameModeDealtCards here:" + gameMode);
// // User decides to hit
// if (input === "hit") {
//   startDeck = cardDeck;
//   console.log("Deck values:" + startDeck);
//   player1Card.push(startDeck.pop());
//   console.log("Remain Deck values:" + startDeck);
//   console.log("after hit" + player1Card[2].rank);
//   outputMessage = `Player 1's cards are now:<br> ${player1Card[0].rank} <br> ${player1Card[1].rank} <br> ${player1Card[2].rank}`;
//   return outputMessage;
// }
// User decides to stand

// Computer decides to hit or stand automatically based on game rules

// The game either ends or continues

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

///////////////////
// 04. IF NOT BLACKJACK, CALCULATE PLAYER/DEALER CARD ARRAYS
//////////////////
var calcArray = function (playerArray) {
  var totalCardSum = 0;

  for (index = 0; index < playerArray.length; index += 1) {
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
    return totalCardSum;
  }
};

///////////////////
// 02. DEAL 2 CARDS FOR GAME -- CHECKWINNINGCONDITIONS
////////////////////
var CHECKWINNINGCONDITIONS = function () {
  //add sum for both dealt cards
  player1CardSum = Number(player1Card[0].rank) + Number(player1Card[1].rank);
  dealerCardSum = Number(dealerCard[0].rank) + Number(dealerCard[1].rank);
  gameMode = "";

  //both player and dealer has 21 -- blackjack
  if (player1CardSum === 21 && dealerCardSum === 21) {
    outputMessage = `Player 1 cards are ${player1CardSum} <br> Dealer cards are ${dealerCardSum}. <br> It's a tie!`;
    return outputMessage;
  }
  //player 1 has blackjack
  if (player1CardSum === 21) {
    outputMessage = `Player 1 cards are ${player1CardSum} <br> Dealer cards are ${dealerCardSum}. <br> Player 1 wins!`;
    return outputMessage;
  }

  //dealer has blackjack
  if (dealerCardSum === 21) {
    outputMessage = `Player 1 cards are ${player1CardSum} <br> Dealer cards are ${dealerCardSum}. <br> Dealer wins!`;
    return outputMessage;
  }

  //if both hits above 21, both lost
  if (dealerCardSum > 21 && player1CardSum > 21) {
    outputMessage = `Player 1 cards are ${player1CardSum} <br> Dealer cards are ${dealerCardSum}. <br> Both Lost!`;
    return outputMessage;
  }

  //if either hits above 21, it's bust
  if (player1CardSum > 21) {
    outputMessage = `Player 1 cards are ${player1CardSum} <br> Dealer cards are ${dealerCardSum}. <br> Player 1 Lost!`;
    return outputMessage;
  }
  if (dealerCardSum > 21) {
    outputMessage = `Player 1 cards are ${player1CardSum} <br> Dealer cards are ${dealerCardSum}. <br> Dealer Lost!`;
    return outputMessage;
  }

  console.log(
    "Player 1 cards and sum:" +
      player1Card[0].rank +
      " " +
      player1Card[1].rank +
      " " +
      player1CardSum +
      "Dealer cards and sum:" +
      dealerCard[0].rank +
      " " +
      dealerCard[1].rank +
      " " +
      dealerCardSum
  );
  // Cards are displayed to user if no black jack and player1 decides to hit or stand
  return `No black jack yet.<br> <br> Player 1 cards are ${player1Card[0].rank} and ${player1Card[1].rank}. <br>Dealer's revealed card is ${dealerCard[1].rank}<br><br>Player 1 - type "hit" or "stand"`;
};

///////////
//// MAKE THE DECK
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

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

////////////
/////SHUFFLE THE DECK
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
