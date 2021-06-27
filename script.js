var GAME_MODE_DEAL_CARDS = "DEAL_CARDS";
var GAME_MODE_CHOOSE_ACE_VALUE = "CHOOSE_ACE_VALUE";
var GAME_MODE_ANALYSE_CARDS = "ANALYSE_CARDS";
var GAME_MODE_HIT_OR_STAND = "HIT_OR_STAND";

var gameMode = GAME_MODE_DEAL_CARDS;

var userInput = "";
var playerCards = [];
var computerCards = [];
var playerCard1;
var playerCard2;
var playerCard;
var playerCardIndex = 0;
var computerCard1;
var computerCard2;
var computerCard3;
var computerCardIndex = 0;
var playerCardsTotal = 0;
var computerCardsTotal = 0;
var numOfPlayerCards = 0;
var numOfComputerCards = 0;

var main = function (input) {
  var myOutputValue = "";
  userInput = input;
  if (gameMode == GAME_MODE_DEAL_CARDS) {
    myOutputValue = dealCards();
  } else if (gameMode == GAME_MODE_CHOOSE_ACE_VALUE) {
    myOutputValue = chooseAceValue();
  } else if (gameMode == GAME_MODE_ANALYSE_CARDS) {
    myOutputValue = analyseCards();
  } else if (gameMode == GAME_MODE_HIT_OR_STAND) {
    myOutputValue = hitOrStand();
    return myOutputValue;
  }
  return myOutputValue;
};

var dealCards = function () {
  // user clicks submit to deal cards (face up)
  playerCard1 = deck.pop(); // face up
  numOfPlayerCards += 1;
  computerCard1 = deck.pop(); // face up
  numOfComputerCards += 1;
  playerCard2 = deck.pop(); // face up
  numOfPlayerCards += 1;
  computerCard2 = deck.pop(); // face down
  numOfComputerCards += 1;

  // the cards are displayed to the user
  var outputText = `Your cards are ${playerCard1.name} of ${playerCard1.suit} and ${playerCard2.name} of ${playerCard2.suit}. <br> The dealer's face-up card is ${computerCard1.name} of ${computerCard1.suit}. <br><br> `;

  // aces can be 1 or 11 (player choose value throughout the round if there is one)
  if (playerCard1.name == "ace") {
    outputText += `Please enter "1" to play your first card ace with face value of 1, <br> OR enter "11" to play ace with face value of 11.`;
    gameMode = GAME_MODE_CHOOSE_ACE_VALUE;
    return outputText;
  }

  if (playerCard2.name == "ace") {
    outputText += `Please enter "1" to play second card ace with face value of 1, <br> OR enter "11" to play ace with face value of 11.`;
    gameMode = GAME_MODE_CHOOSE_ACE_VALUE;
    return outputText;
  }

  outputText += `Press submit to continue the game and see your face-up cards total.`;

  // Move the game forward
  gameMode = GAME_MODE_ANALYSE_CARDS;
  return outputText;
};

var chooseAceValue = function () {
  var outputText = "";

  // if player's first card is ace
  if (playerCard1.name == "ace" && userInput == "1") {
    playerCard1.rank = 1;
    outputText += `You chose your first card's ace's face value to be 1.`;
    gameMode = GAME_MODE_ANALYSE_CARDS;
  } else if (playerCard1.name == "ace" && userInput == "11") {
    playerCard1.rank = 11;
    outputText += `You chose your first card's ace's face value to be 11.`;
    gameMode = GAME_MODE_ANALYSE_CARDS;
  } // if player's second card is ace
  else if (playerCard2.name == "ace" && userInput == "1") {
    playerCard2.rank = 1;
    outputText += `You chose your second card's ace's face value to be 1.`;
    gameMode = GAME_MODE_ANALYSE_CARDS;
  } else if (playerCard2.name == "ace" && userInput == "11") {
    playerCard2.rank = 11;
    outputText += `You chose your second card's ace's face value to be 11.`;
    gameMode = GAME_MODE_ANALYSE_CARDS;
  } // if player's third card is ace
  else if (playerCard.name == "ace" && userInput == "1") {
    playerCard.rank = 1;
    playerCardsTotal += playerCard.rank;
    outputText += `You chose your ace's face value to be 1.`;
    gameMode = GAME_MODE_HIT_OR_STAND;
  } else if (playerCard.name == "ace" && userInput == "11") {
    playerCard.rank = 11;
    playerCardsTotal += playerCard.rank;
    outputText += `You chose your ace's face value to be 11.`;
    gameMode = GAME_MODE_HIT_OR_STAND;
  }

  outputText += `<br> Press submit to continue the game.`;

  return outputText;
};

// anaylse cards for first two cards
var analyseCards = function () {
  // Total up the player's cards and computer's cards
  if (numOfPlayerCards == 2) {
    playerCardsTotal = playerCard1.rank + playerCard2.rank;
    computerCardsTotal = computerCard1.rank + computerCard2.rank;

    playerCards.push(playerCard1);
    playerCards.push(playerCard2);
    computerCards.push(computerCard1);
    computerCards.push(computerCard2);
    console.log(playerCards);
    console.log(computerCards);
  }

  var outputText = `Your face-up cards total ${playerCardsTotal}. <br><br>`;

  // The cards are analysed for game winning conditions, i.e. Blackjack
  if (playerCardsTotal == 21) {
    outputText += `You win! <br><br> Refresh the page to restart the game.`;
    gameMode = GAME_MODE_DEAL_CARDS;
    return outputText;
  } else if (playerCardsTotal > 21) {
    outputText += `You bust! <br><br> Refresh the page to restart the game.`;
    gameMode = GAME_MODE_DEAL_CARDS;
    return outputText;
  } else {
    // the user decides whether to hit or stand using the submit button to submit their choice
    outputText += `Do you want another card from the deck? <br> If yes, please enter "hit". <br> If no, please enter "stand".`;
  }

  gameMode = GAME_MODE_HIT_OR_STAND;
  return outputText;
};

// after choosing hit or stand, the analysis of cards will be done here
var hitOrStand = function () {
  // user input validation
  // if (!(userInput == "hit") || !(userInput == "stand")) {
  //   return `Please enter "hit" to deal another card from the deck, or enter "stand" to end your turn and stop without taking a card.`;
  // }

  var outputText = "";

  // the computer decides to hit or stand automatically based on the game rules
  // dealer always plays ace with face value of 1.
  // the computer has to hit if their hand is below 17
  if (computerCardsTotal <= 16) {
    computerCard = deck.pop();
    numOfComputerCards += 1;
    computerCards.push(computerCard);
    computerCardsTotal += computerCard.rank;
  } else {
    // the computer has to stand if their hand is 17 or higher
  }

  if (userInput == "hit") {
    playerCard = deck.pop();
    numOfPlayerCards += 1;
    playerCards.push(playerCard);
    playerCardIndex = numOfPlayerCards - 1;
    console.log("num of player's cards: " + numOfPlayerCards);
    console.log("player card index: " + playerCardIndex);
    console.log("playerCards array: " + playerCards);
    if (playerCards[playerCardIndex].name == "ace") {
      gameMode = GAME_MODE_CHOOSE_ACE_VALUE;
      console.log(
        "playerCards[playerCardIndex]: " + playerCards[playerCardIndex].name
      );
      outputText += `Your card is ${playerCards[playerCardIndex].name} of ${playerCards[playerCardIndex].suit}. Please enter "1" to play ace with face value of 1, <br> OR enter "11" to play ace with face value of 11.`;
      return outputText;
    }
    playerCardsTotal += playerCard.rank;
    outputText += `You chose to take another card, which is ${playerCards[playerCardIndex].name} of ${playerCards[playerCardIndex].suit}.`;
  } else if (userInput == "stand") {
    playerCardIndex = numOfPlayerCards - 1;
    outputText = `You chose to end your turn. <br>`;
  }

  outputText += `<br>Your cards are: <br>`;

  var counter = 0;
  while (counter < numOfPlayerCards) {
    outputText += `${playerCards[counter].name} of ${playerCards[counter].suit} <br>`;
    counter += 1;
  }

  outputText += `<br>The dealer's cards are: <br>`;

  var counter = 0;
  while (counter < numOfComputerCards) {
    outputText += `${computerCards[counter].name} of ${computerCards[counter].suit} <br>`;
    counter += 1;
  }

  outputText += `<br><br> Your cards total ${playerCardsTotal}. <br> The dealer's cards total ${computerCardsTotal}.<br><br>`;

  // the user's cards are analysed for winning or losing conditions
  if (playerCardsTotal < 21 && userInput != "stand") {
    outputText += `Please enter "hit" to deal another card from the deck, or enter "stand" to end your turn and stop without taking a card.`;
  } else if (playerCardsTotal == 21) {
    outputText += `You win! <br><br> Refresh the page to restart the game.`;
    gameMode == GAME_MODE_DEAL_CARDS;
  } else if (playerCardsTotal > 21) {
    outputText += `You bust! <br><br> Refresh the page to restart the game.`;
    gameMode == GAME_MODE_DEAL_CARDS;
  } else if (
    playerCardsTotal < 21 &&
    playerCardsTotal < computerCardsTotal &&
    computerCardsTotal <= 21
  ) {
    outputText += `You lose! <br><br> Refresh the page to restart the game.`;
    gameMode == GAME_MODE_DEAL_CARDS;
  } else if (
    playerCardsTotal <= 21 &&
    playerCardsTotal > computerCardsTotal &&
    computerCardsTotal > 16
  ) {
    outputText += `You win! <br><br> Refresh to restart the game.`;
    gameMode == GAME_MODE_DEAL_CARDS;
  } else if (computerCardsTotal > 21) {
    outputText += `The dealer bust! You win! <br><br> Refresh the page to restart the game.`;
    gameMode == GAME_MODE_DEAL_CARDS;
  } else if (computerCardsTotal == playerCardsTotal) {
    outputText += `It's a tie! Refresh the page to restart the game.`;
    gameMode == GAME_MODE_DEAL_CARDS;
  } else {
    outputText += `ERROR!`;
  }

  return outputText;
};

/**
 * Create a standard 52-card deck
 */
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

  // If card is jack, queen or king, set rank to be 10 for game of Blackjack
  cardDeck[10].rank = 10;
  cardDeck[11].rank = 10;
  cardDeck[12].rank = 10;
  cardDeck[23].rank = 10;
  cardDeck[24].rank = 10;
  cardDeck[25].rank = 10;
  cardDeck[36].rank = 10;
  cardDeck[37].rank = 10;
  cardDeck[38].rank = 10;
  cardDeck[49].rank = 10;
  cardDeck[50].rank = 10;
  cardDeck[51].rank = 10;

  // Return the completed card deck
  return cardDeck;
};

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
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
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

// Rules of the game:
// 1. there will be only two players, one human one computer
// 2. the computer will always be the dealer.

// the player who is closer to 21 wins the hand

// the game either ends or continues
