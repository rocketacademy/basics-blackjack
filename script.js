// Function to make a deck of 52 cards
// rank 1-13; 1-4 suits: hearts, diamonds, clubs, spades; 2-10 and jack, queen, king and ace
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];

  // Create an array of 4 suits
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  var suitIndex = 0;

  // Create an outer loop through the 4 suits
  while (suitIndex < suits.length) {
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var card = {
        name: rankCounter,
        suit: suits[suitIndex],
        rank: rankCounter
      }
      if (rankCounter == 1) {
        card.name = 'ace';
      } else if (rankCounter == 11) {
        card.name = 'jack';
      } else if (rankCounter == 12) {
        card.name = 'queen';
      } else if (rankCounter == 13) {
        card.name = 'king';
      }
      cardDeck.push(card);
      rankCounter += 1;
    } 
    suitIndex += 1;
  }
return cardDeck;
}

// make deck
var deck = makeDeck();
// global array to track the player's cards at every hit
var playerCardsArray = [];
// global array to track the dealer's cards at every hit (for version 3)
var dealerCardsArray = [];
// global variables to store the number of hits for player and dealer
var numberOfHits_player = 0;
var numberOfHits_dealer = 0;
// game modes
var GAME_MODE_WELCOME = 'GAME_MODE_WELCOME';
var GAME_MODE_PLAYER_HIT = 'GAME_MODE_PLAYER_HIT';
var GAME_MODE_PLAYER_STAND = 'GAME_MODE_PLAYER_STAND'
var GAME_MODE_EVALUATE_WIN = 'GAME_MODE_EVALUATE_WIN';
// initialise game mode
var gameMode = GAME_MODE_WELCOME;
// winner message after the game ends
var winnerMessage = '';

// Function to get a random index ranging from 0 (inclusive) to max (exclusive)
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
}

// Function to shuffle the elements in the cardDeck array
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
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
}

// Function to sum up player card ranks
var getPlayerRank = function(playerCardsArray) {
  var index = 0;
  var sumOfRanks = 0;
  while (index < playerCardsArray.length) {
    var card = playerCardsArray.[index];
    var cardRank = card.rank;
    sumOfRanks += cardRank;
  }
  return sumOfRanks;
}

// Function to determine is player is bust 
var didPlayerBust = function () {
  var sumOfPlayerCards = getPlayerRank();
  if (sumOfPlayerCards > 21) {
    return true;
  }
  return false;
}

// Function to determine winner
var determineWinner = function (dealerCard, playerCard) {
  // variable to store message 
  var message = '';
  // variable to store player's total card rank
  var playerRank = getPlayerRank(playerCardsArray);
  // variable to store dealer's card rank
  var dealerRank = dealerCard.rank
  // variable to store messages announcing each player's outcome
  var playerOutcomes = `Your cards add up to ${playerRank}. <br> Dealer drew a ${dealerCard.name} of ${dealerCard.suit}.`;
  // variable to store win and lose message
  var playerWinMsg = 'You win, dealer loses!';
  var dealerWinMsg = 'Dealer wins, you lose!';

  // If either player got 21 and the other did not, then announce blackjack winner
  if (playerRank == 21 && dealerRank !== 21) {
    message = 'Black Jack! <br>' + playerOutcomes + playerWinMsg; 
  } 
  else if (playerRank !== 21 && dealerRank == 21) {
    message = 'Black Jack! <br>' + playerOutcomes + dealerWinMsg;
  } 
  // If neither got 21 but either one goes bust, then announce winner
  else if (didPlayerBust == true && dealerRank < 21) {
    message = "You're bust! <br>" + playerOutcomes + dealerWinMsg;
  } 
  else if (didplayerBust == false && dealerRank > 21) {
    message = 'Dealer is bust! <br>' + playerOutcomes + playerWinMsg;
  }
  // If both did not go bust, the one closer to 21 wins
  else if (dealerRank > playerRank) {
    message = playerOutcomes + dealerWinMsg
  }
  else if (dealerRank < playerRank) {
    message = playerOutcomes + playerWinMsg;
  }
  // Otherwise, it is a tie
  else {
    message = 'It is a tie <br>' + playerOutcomes;
  }
  return message;
}

var main = function (input) {
  // Default output value
  var myOutputValue = 'Welcome to BlackJack! There are 2 players in this round - you vs the computer. Press submit to draw a random card from the deck for both you and the computer.';
  console.log('Game mode:');
  console.log(gameMode);

  // If gameMode is GAME_MODE_WELCOME, change gameMode to GAME_MODE_PLAYER_HIT and output default welcome message
  if (gameMode == GAME_MODE_WELCOME) {
    gameMode = GAME_MODE_PLAYER_HIT;
    console.log('Game mode:');
    console.log(gameMode);
    console.log('myOutputValue');
    console.log(myOutputValue);
    return myOutputValue;
  }

  // If gameMode is GAME_MODE_PLAYER_HIT, draw a card for the player first
  if (gameMode == GAME_MODE_PLAYER_HIT) {
    // Shuffle the deck and store it in a new variable shuffledDeck
    var shuffledDeck = shuffleCards(deck);
    console.log('shuffling deck..');

    // Draw a card from the top of the deck
    var playerCard = shuffledDeck.pop();
    console.log('player draws a card..')
    console.log(playerCard);

    // Store the new card in the playerCardsArray and increase the no. of hits
    playerCardsArray.push(playerCard);
    numberOfHits_player += 1; 

    // Create message stating which cards were drawn for the player
    var playerCardMessage = 
    'Player draws ' +
    playerCard.name +
    ' of ' +
    playerCard.suit +
    '. ';

    // Create message requesting player to choose either hit or stand
    var hitOrStandMessage = "To hit again, press submit. To stand, enter 'stand' and submit."
    myOutputValue = playerCardMessage + '<br>' + hitOrStandMessage;
    return myOutputValue
  }

  // Input validation: If player enters anything other than '' or 'stand', request to renenter
  if (input !== 'stand' || input !== '') {
    myOutputValue = "Invalid input. Please either press submit to hit again, or enter 'stand' to stand";
    return myOutputValue;
  }
  
  // If player enters 'stand', change gamemode to GAME_MODE_PLAYER_STAND
  if (input == 'stand') {
    gameMode == GAME_MODE_PLAYER_STAND;
    console.log('game mode:')
    console.log(gameMode);
  }

  // If gameMode is GAME_MODE_PLAYER_STAND, draw a card for the computer and change gameMode to GAME_MODE_EVALUATE_WIN
  if (gameMode == GAME_MODE_PLAYER_STAND) {
    // Shuffle the deck and store it in a new variable shuffledDeck
    var shuffledDeck = shuffleCards(deck);
    console.log('shuffling deck..');

    // Draw a card from the top of the deck
    var dealerCard = shuffledDeck.pop();
    console.log('dealer draws a card..')
    console.log(dealerCard);

    // Store the new card in the dealerCardsArray and increase the no. of hits
    dealerCardsArray.push(dealerCard);

    // Once dealer draws one card, change gameMode to GAME_MODE_EVALUATE_WIN
    gameMode = GAME_MODE_EVALUATE_WIN;
  }

  if (gameMode == GAME_MODE_EVALUATE_WIN) {
    // Determine winner
    winnerMessage = determineWinner(computerCard, playerCard);
  }

  return myOutputValue + winnerMessage;
};


