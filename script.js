// Rules: 
// 1. Each player can only draw up to 5 cards. 
// 2. 'Ace' can be either 1 or 11. 

// Global variables. 
// Game modes. 
var pickCardsMode = 'Pick cards for player and computer.';
var checkForBlackJackMode = 'Check if there is Black Jack.'
var hitOrStandMode = 'Player to choose "hit" or "stand".';
var gameMode = pickCardsMode;
// Empty strings for the first two cards drawn by player and computer. 
var playerCard = '';
var secondPlayerCard = '';
var computerCard = '';
var secondComputerCard = '';
// Empty arrays to store the cards drawn by player and computer. 
var playerCardArray = [];
var computerCardArray = [];

// Card deck generation function.
// Generate a deck of cards. 
var makeDeck = function () {
  var cardDeck = [];
  var suits = ['♥️', '♦️', '♣️', '♠️'];
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Start generating cards with 'hearts', followed by other suits. 
    var currentSuit = suits[suitIndex];
    // Generate the 'hearts' card by rank, from 'ace' to 'king'. Repeat the same with 'diamonds', 'clubs' and 'spades'. 
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;
      var value = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the 'ace' or face card's name. 
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }
      // The value of 'jack', 'queen' and 'king' is 10 by default. 
      if(cardName == 'jack'||cardName == 'queen'||cardName == 'king'){
        value = 10;
      }
      // The value of 'ace' is fixed as 11 by default. 
      if(cardName == 'ace'){
        value = 11; 
      }
      // Create a new card with the current name, suit, and rank.
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: value,
      };
      // Add the new card to the deck.
      cardDeck.push(card);
      // Increment rankCounter to iterate over the next rank.
      rankCounter = rankCounter + 1;
    }
    // Increment the suitIndex to iterate over the next suit.
    suitIndex = suitIndex + 1;
  }
  // Return the completed card deck.
  return cardDeck;
};

// Card shuffle function.  
// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
// Shuffle the elements in the cardDeck array.
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once.
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck.
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex.
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex.
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck.
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment the currentIndex.
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck.
  return cardDeck;
};

// Display picked cards function. 
var displayPickedCards = function (playerArray, computerArray){
  // To display player's picked cards. 
  var cardCounter = 0;
  var playerPickedCards = 'Player has drawn:<br>';
  while (cardCounter < playerArray.length){
    playerPickedCards = playerPickedCards + ' 🎲 ' + playerArray[cardCounter].name + ' of ' + playerArray[cardCounter].suit + '<br>'; 
    cardCounter = cardCounter + 1; 
  }
  // To display computer's picked cards. 
  // Reset the counter. 
  cardCounter = 0; 
  var computerPickedCards = 'Computer has drawn:<br>'; 
  while (cardCounter < computerArray.length){
    computerPickedCards = computerPickedCards + ' 🎲 ' + computerArray[cardCounter].name + ' of ' + computerArray[cardCounter].suit + '<br>';
    cardCounter = cardCounter + 1;  
  }
  return playerPickedCards + '<br>' + computerPickedCards; 
};

// Determine BlackJack function. 
var checkForBlackJack = function (handArray){
  var cardOne = handArray[0];
  var cardTwo = handArray[1];
  var thereIsBlackJack = false; 
  // First card is 'ace' and second card is 10 or suits.
  // Second card is 'ace' and first card is 10 or suits.
  if ((cardOne.name == 'ace' && cardTwo.rank >= 10)||(cardTwo.name == 'ace' && cardOne.rank >= 10)){
    thereIsBlackJack = true; 
  }
  return thereIsBlackJack; 
};

// Calculate the value of player hand and computer hand. 
var calculateTotalHandValue = function (finalArray){ 
  var sumOfCards = 0;
  var cardCounter = 0; 
  var aceCounter = 0; 
  // Get the initial total hand value. 
  while (cardCounter < finalArray.length){
    sumOfCards = sumOfCards + finalArray[cardCounter].rank; 
    cardCounter = cardCounter + 1; 
  } 
  // Situation where the value of three cards is more than 21, check for 'ace'. 
  if (sumOfCards > 21){
    while (aceCounter < finalArray.length){
      // If there is 'ace', minus 10 from the total hand value. 
      if (finalArray[aceCounter].rank == 11){
        sumOfCards = sumOfCards - 10; 
      }
      aceCounter = aceCounter + 1; 
    }
  }
  return sumOfCards; 
};

// Game function.  
var main = function (input) {
  // For all output messages. 
  var myOutputValue = '';
  // To create and shuffle cards to be used for the entire game. 
  var readyCards = makeDeck();
  var shuffledDeck = shuffleCards(readyCards); 
  // Player and computer to pick cards. 
  if (gameMode == pickCardsMode){
    // Player to pick 2 cards. 
    playerCard = shuffledDeck.pop();
    secondPlayerCard = shuffledDeck.pop();
    playerCardArray.push(playerCard);
    playerCardArray.push(secondPlayerCard);
    // Computer to pick 2 cards. 
    computerCard = shuffledDeck.pop();
    secondComputerCard = shuffledDeck.pop();
    computerCardArray.push(computerCard);
    computerCardArray.push(secondComputerCard);
    // Display the cards picked by player and computer. 
    myOutputValue = `Everyone has drawn their cards. Do you have Black Jack luck? 🤔<br><br>Press "submit" to find out!`
    // Switch mode to check if there is Black Jack. 
    gameMode = checkForBlackJackMode; 
    return myOutputValue; 
  };
  // To check if there is any Black Jack based on the picked cards. 
  if (gameMode == checkForBlackJackMode){
    var playerHasBlackJack = checkForBlackJack (playerCardArray);
    var computerHasBlackJack = checkForBlackJack (computerCardArray);
    myOutputValue = displayPickedCards (playerCardArray, computerCardArray); 
    // If both player and computer have Black Jack.
    if (playerHasBlackJack == true && computerHasBlackJack == true){
      myOutputValue = myOutputValue + `<br><br> Both have BlackJack. It's a tie!`
    }
    // If only player has Black Jack. 
    else if (playerHasBlackJack == true && computerHasBlackJack == false){
      myOutputValue = myOutputValue + `<br><br> Player has Black Jack. Player wins! 🥳<br><br>Press "submit" to play again.`
      // Reset to play again. 
      gameMode = pickCardsMode;
      playerCardArray = [];
      computerCardArray = []; 
    }
    // If only computer has Black Jack. 
    else if (playerHasBlackJack == false && computerHasBlackJack == true){
      myOutputValue = myOutputValue + `<br><br> Computer has Black Jack. Computer wins! 🥳<br><br>Press "submit" to try again.`
      // Reset to play again. 
      gameMode = pickCardsMode;
      playerCardArray = [];
      computerCardArray = []; 
    }
    // If there is no Black Jack. 
    else if (playerHasBlackJack == false && computerHasBlackJack == false){
      myOutputValue = myOutputValue + `<br><br> There is no Black Jack! 😪<br><br>Please input "hit" or "stand".`
      // Switch mode to continue the game. 
      gameMode = hitOrStandMode; 
    };
    return myOutputValue; 
  };
  // Prompt player to choose 'hit' or 'stand'. 
  if (gameMode == hitOrStandMode){
    // Input validation. 
    if ((input != 'hit') && (input != 'stand')){
      myOutputValue = '❌ Invalid input! ❌<br><br>Please input "hit" or "stand" only.'
      return myOutputValue;
    }
    // To allow player to draw cards. 
    if (input == 'hit'){
      playerCardArray.push (shuffledDeck.pop());
      var playerHandTotalValue = calculateTotalHandValue (playerCardArray);
      // If the new card caused the total value of player's hand to exceed 21, player loses the game. 
      if (playerHandTotalValue > 21){
        myOutputValue = `🍀 A new card is drawn. 🍀<br><br> ${displayPickedCards (playerCardArray, computerCardArray)}<br><br>The total value of player's hand is ${playerHandTotalValue}. Player is bust! 😪<br><br>Press "submit" to try again.`;
        // Reset to play again. 
        gameMode = pickCardsMode;
        playerCardArray = [];
        computerCardArray = []; 
      }
      // Only allow player to draw up to 5 cards. 
      else if(playerCardArray.length > 5){
        myOutputValue = 'Player has already drawn a maximum number of 5 cards. 😪<br><br>Please input "stand".'
      }
      // Prompt player to continue the game if the total value of player's hand is still less than 21. 
      else{
        myOutputValue = `🍀 A new card is drawn. 🍀<br><br> ${displayPickedCards (playerCardArray, computerCardArray)}<br><br>Please input "hit" or "stand".`;
      }
    }
    // If player chooses 'stand', calculate the results and decide who is the winner. 
    if (input == 'stand'){
      var playerHandTotalValue = calculateTotalHandValue (playerCardArray);
      var computerHandTotalValue = calculateTotalHandValue (computerCardArray);
      // Let computer draw extra cards. 
      while (computerHandTotalValue < 17){
        computerCardArray.push (shuffledDeck.pop());
        computerHandTotalValue = calculateTotalHandValue (computerCardArray);
      }
      // Conditions for tied game. 
      if ((playerHandTotalValue == computerHandTotalValue) || (playerHandTotalValue > 21 && computerHandTotalValue > 21)){
        myOutputValue = `${displayPickedCards (playerCardArray, computerCardArray)}<br><br>The total value of player's hand is ${playerHandTotalValue} and the total value of computer's hand is ${computerHandTotalValue}.<br><br>It's a tie! 🙂`
      }
      // Conditions for player to win. 
      else if ((playerHandTotalValue > computerHandTotalValue && playerHandTotalValue <= 21) ||
      (playerHandTotalValue <= 21 && computerHandTotalValue > 21)){
        myOutputValue = `${displayPickedCards (playerCardArray, computerCardArray)}<br><br>The total value of player's hand is ${playerHandTotalValue} and the total value of computer's hand is ${computerHandTotalValue}.<br><br>Player wins! 🥳`
      }
      // Conditions for dealer to win. 
      else {
        myOutputValue = `${displayPickedCards (playerCardArray, computerCardArray)}<br><br>The total value of player's hand is ${playerHandTotalValue} and the total value of computer's hand is ${computerHandTotalValue}.<br><br>Computer wins! 🥳`
      }
      // Reset to play again. 
      gameMode = pickCardsMode;
      playerCardArray = [];
      computerCardArray = [];
      myOutputValue = myOutputValue + '<br><br>Press "submit" to play again.';
    }
    return myOutputValue;
  }; 
};
