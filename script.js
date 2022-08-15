//Game Rules:
//1. players = user || computer-dealer
//2. computer dealt 2 cards; user dealt 2 cards
//3. user decides wtr to hit/draw card or stand/end turn. gameMode = hit || stand
//4. computer-dealer to hit/draw if hand < 17
//5. player's score = total of card ranks
//6. player closer but not above 21 wins

//Score of card ranks:
//jacks/queens/kings = 10
//aces = 1 || 11

//====================================================

//GLOBAL VARIABLES
//Game Modes
var GAME_START = "game start";
var GAME_CARDS_DEALT = "cards dealt to players";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;
var restartGame = "Please refresh the browser to play again.";

//Cards played in the game
var gameDeck = [];
var userCards = [];
var computerCards = [];
var blackJack = 21;
var userSumOfCards = "";
var computerSumOfCards = "";
var displayPlayersScores = "";

//===========GAME_START================================

//Make the deck of cards to be used in createShuffledDeck function
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  //Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    //Loop from 1 to 13 for all cards in a suit
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      //If rank is 1, 11, 12 or 13
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      //Create new card with current name, suit and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card); //Add new card to the deck
      rankCounter += 1;
    }

    suitIndex += 1;
  }
  return cardDeck;
};

//Generate a random number to use in the shuffleDeck function
var getRandomNumber = function (size) {
  return Math.floor(Math.random() * size);
};

//Shuffle the deck to use in createShuffledDeck function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomNumber = getRandomNumber(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomNumber];
    cards[index] = randomItem;
    cards[randomNumber] = currentItem;
    index += 1;
  }
  return cards;
};

var createShuffledDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

//Helper function to deal first 2 cards to User and Computer
var dealCardsToPlayers = function () {
  userCards.push(gameDeck.pop());
  userCards.push(gameDeck.pop());
  //console.log("User Cards: ", userCards);

  computerCards.push(gameDeck.pop());
  computerCards.push(gameDeck.pop());
  //console.log("Computer Cards: ", computerCards);
};

//============GAME_CARDS_DEALT===============================

//Helper Function to find all values for ace, to use in function to calculate value of player's cards
var calcAce = function (numberOfAces) {
  var maxValue = numberOfAces + 10;
  var minValue = numberOfAces;
  return [maxValue, minValue];
};

//Helper Function to calculate value of the player's cards
var calcPlayerCards = function (playerCardsArray) {
  var counter = 0;
  var sumOfCards = 0;
  var noOfAces = 0;

  while (counter < playerCardsArray.length) {
    if (playerCardsArray[counter].rank == 1) {
      noOfAces += 1;
    } else if (playerCardsArray[counter].rank > 10) {
      sumOfCards += 10;
    } else {
      sumOfCards += playerCardsArray[counter].rank;
    }
    counter += 1;
  }

  //Taking into account alternative values of ace
  if (noOfAces > 0) {
    var acesArray = calcAce(noOfAces);
    if (sumOfCards + acesArray[0] <= 21) {
      sumOfCards += acesArray[0];
    } else {
      sumOfCards += acesArray[1];
    }
  }

  return sumOfCards;
};

//Helper Function to calculate then display respective sum of cards of User & Computer
var calcTotalSumOfCards = function (userSumOfCards, computerSumOfCards) {
  userSumOfCards = calcPlayerCards(userCards);
  //console.log("User card total sum: ", userSumOfCards);

  computerSumOfCards = calcPlayerCards(computerCards);
  //console.log("Computer card total sum: ", computerSumOfCards);

  displayPlayersScores = `Your score: ${userSumOfCards}<br>Computer's score: ${computerSumOfCards}<br>`;
};

//Helper Function to Check for Black Jack
var checkForBlackJack = function (userSumOfCards, computerSumOfCards) {
  if (userSumOfCards == blackJack && computerSumOfCards == blackJack) {
    return `Both you and the computer have gotten Black Jack. It is a tie! ${displayUserCards(
      userCards
    )}<br>${displayComputerCards(computerCards)}<br><br>${restartGame}`;
  }

  if (userSumOfCards == blackJack && computerSumOfCards !== blackJack) {
    return `You got Black Jack. You win! ${displayUserCards(
      userCards
    )}<br>${displayComputerCards(computerCards)}<br><br>${restartGame}`;
  }

  if (computerSumOfCards == blackJack && userSumOfCards !== blackJack) {
    return `The Computer got Black Jack. Sorry, you lose. The Computer wins. ${displayUserCards(
      userCards
    )}<br>${displayComputerCards(computerCards)}<br><br>${restartGame}`;
  } else {
    //No black jack. Change game mode. Player to hit or stand.
    currentGameMode = GAME_HIT_OR_STAND;
    //console.log("game mode: ", currentGameMode);
    myOutputValue = `${displayUserCards(userCards)}<br>${displayComputerCards(
      computerCards
    )}<br>There is no black jack. Key in 'hit' to draw another card; OR <br>Key in 'stand' to end your turn.`;
  }
};

//Helper Function to display User cards in message
var displayUserCards = function (userCards) {
  var userMessage = "Your cards:<br>";
  var index = 0;
  while (index < userCards.length) {
    userMessage =
      userMessage +
      userCards[index].name +
      " of " +
      userCards[index].suit +
      "<br>";
    index += 1;
  }
  return userMessage;
};

//Helper Function to display Computer cards in message
var displayComputerCards = function (computerCards) {
  var computerMessage = "Computer cards:<br>";
  var index = 0;
  while (index < computerCards.length) {
    computerMessage =
      computerMessage +
      computerCards[index].name +
      " of " +
      computerCards[index].suit +
      "<br>";
    index += 1;
  }
  return computerMessage;
};

//Helper Function for Computer to play hit or stand
var computerPlaysHitOrStand = function () {
  while (computerSumOfCards < 17) {
    computerCards.push(gameDeck.pop());
    //console.log("Computer's cards: ", computerCards);
    computerSumOfCards = calcPlayerCards(computerCards);
    //console.log("Computer's sum of cards: ", computerSumOfCards);
    computerSumOfCards += 1;
  }
  return computerSumOfCards;
};

//Helper Function to compare sums of User and Computer to determine game outcome
var determineFinalGameOutcome = function (userSumOfCards, computerSumOfCards) {
  if (
    //Where it is a tie, i.e. both have same sum OR both bust
    userSumOfCards == computerSumOfCards ||
    (userSumOfCards > 21 && computerSumOfCards > 21)
  ) {
    myOutputValue = `It is a tie! <br>${displayUserCards(
      userCards
    )}<br>${displayComputerCards(
      computerCards
    )}<br>${displayPlayersScores}<br>${restartGame}`;
  }

  //Where User wins, i.e. User closer to 21 than the Computer OR User under 21 and the Computer busts
  if (
    (userSumOfCards > computerSumOfCards && userSumOfCards <= 21) ||
    (userSumOfCards <= 21 && computerSumOfCards > 21)
  ) {
    myOutputValue = `You win! <br>${displayUserCards(
      userCards
    )}<br>${displayComputerCards(
      computerCards
    )}<br>${displayPlayersScores}<br>${restartGame}`;
  }

  //Where Computer wins
  if (
    (computerSumOfCards > userSumOfCards && computerSumOfCards <= 21) ||
    (computerSumOfCards <= 21 && userSumOfCards > 21)
  ) {
    myOutputValue = `The Computer wins! <br>${displayUserCards(
      userCards
    )}<br>${displayComputerCards(
      computerCards
    )}<br>${displayPlayersScores}<br>${restartGame}`;
  }
};

//===========================================

var main = function (input) {
  var myOutputValue = "";
  if (currentGameMode == GAME_START) {
    gameDeck = createShuffledDeck();
    //console.log(gameDeck);

    //Deal 2 cards to User and Computer
    dealCardsToPlayers(input);

    //Change game mode
    currentGameMode = GAME_CARDS_DEALT;
    myOutputValue = `Everyone has been dealt 2 cards each. Click 'Submit' to evaluate the cards.`;
  } else if (currentGameMode == GAME_CARDS_DEALT) {
    //console.log("game mode: ", currentGameMode);

    //Calculate respective player's sum of cards (this helper function did not work - calcTotalSumOfCards(userCards, computerCards));
    userSumOfCards = calcPlayerCards(userCards);
    //console.log("User card total sum: ", userSumOfCards);
    computerSumOfCards = calcPlayerCards(computerCards);
    //console.log("Computer card total sum: ", computerSumOfCards);

    //Check for black jack
    checkForBlackJack(userSumOfCards, computerSumOfCards);

    //No black jack - continue to let User hit or stand
  } else if (currentGameMode == GAME_HIT_OR_STAND) {
    if (input == "hit") {
      userCards.push(gameDeck.pop());
      //console.log("User Cards: ", userCards);
      userSumOfCards = calcPlayerCards(userCards);
      //console.log("User total value after hit: ", userSumOfCards);
      myOutputValue = `${displayUserCards(userCards)}<br>${displayComputerCards(
        computerCards
      )} <br>Enter 'hit' to draw another card OR 'stand' to end your turn.`;
    } else if (input == "stand") {
      computerPlaysHitOrStand(input);
      calcTotalSumOfCards(userSumOfCards, computerSumOfCards);

      //Compare sums of User and Computer to determine game outcome
      determineFinalGameOutcome(userSumOfCards, computerSumOfCards);
    }

    //Input validation - not "hit" or "stand"
    else {
      myOutputValue = `Please try again. Only "hit" or "stand" are accepted.`;
    }
  }

  return myOutputValue;
};
