// Global variables
var startStage = 'Deal cards';
var playerStage = 'Player check cards';
var computerStage = 'Computer check cards';
var finalStage = 'Compare Computer and Player cards';
var currentStage = startStage;
var playerCardsScore = 0;
var computerCardsScore = 0;
var gameOver = false;
var playerDrawCardCount = 0;
var computerDrawCardCount = 0;
var playerCards = [];
var computerCards = [];


// Main function to go through card cycles from player to computer
var main = function (input) {
  var DrawCardDeck = totalCardDeck ();
  var shuffleCardDeck = shuffleCards (DrawCardDeck);   

  if (gameOver == true) {
    return 'The game is over. Please refresh to play again.';
  }

  // Starting stage where cards are distributed
  if (currentStage == startStage) {
    var playerCard1 = shuffleCardDeck.pop();
    console.log (playerCard1);
    var computerCard1 = shuffleCardDeck.pop();
    console.log (computerCard1);
    var playerCard2 = shuffleCardDeck.pop();
    console.log (playerCard2);
    var computerCard2 = shuffleCardDeck.pop();    
    console.log (computerCard2);
    playerCards.push (playerCard1);
    playerCards.push (playerCard2);
    computerCards.push (computerCard1);
    computerCards.push (computerCard2);    

    // Verification on Ace being counted as 11 when only 2 cards
    if (playerCards.length == 2) {
      if (playerCard1.rank == 1) {
        playerCardsScore = (playerCard1.score * 11) + playerCard2.score;
        //return playerCardsScore;        
      }
      else if (playerCard2.rank == 1) {
        playerCardsScore = playerCard1.score + (playerCard2.score * 11);        
        //return playerCardsScore;
      }
      else {
        playerCardsScore = playerCard1.score + playerCard2.score;
        //return playerCardsScore;
      }
    }

    if (computerCards.length == 2) {
      if (computerCard1.rank == 1) {        
        computerCardsScore = (computerCard1.score * 11) + computerCard2.score;
        //return computerCardsScore;
      }
      else if (computerCard2.rank == 1) {        
        computerCardsScore = computerCard1.score + (computerCard2.score * 11);
        //return computerCardsScore;
      }      
      else {
        computerCardsScore = computerCard1.score + computerCard2.score;
        //return computerCardsScore;      
      }
    }    
    
    // Check Blackjack condition for player
    if (playerCard1.rank == 1 && playerCard2.rank >= 10 || 
      playerCard1.rank >= 10 && playerCard2.rank == 1) {
        gameOver = true;
        return `Player got a Blackjack, player wins!<br>
        <br>Click refresh button to play again.`
      }
    
      // Check Blackjack condition for computer
    else if (computerCard1.rank == 1 && computerCard2.rank >= 10 || 
      computerCard1.rank >= 10 && computerCard2.rank == 1) {
        gameOver = true;
        return `Computer got a Blackjack, computer wins!<br>
        <br>Click refresh button to play again.`
      }    
   
    // Displays a summary of card stats before moving to next stage
    currentStage = playerStage;
    return `Hi player, your cards are ${playerCard1.name} of ${playerCard1.suit} 
    and ${playerCard2.name} of ${playerCard2.suit}.
    <br><br>Computer cards are ${computerCard1.name} of ${computerCard1.suit} 
    and ${computerCard2.name} of ${playerCard2.suit}.
    <br><br>Please type "hit" or "stand" for your hand.`
  }   

  // Stage where player starts to "hit" or "stand"
  if (currentStage == playerStage) {        
    if (input == 'hit') {      
      playerDrawCard = shuffleCardDeck.pop();
      playerCards.push (playerDrawCard);
      playerDrawCardCount += 1;            
      if (playerCards.length == 3) {
        playerCardsScore - 10;
        playerCardsScore += playerDrawCard.score;
        //return playerCardsScore;
      }
      
      if (playerCardsScore > 21) {
        gameOver = true;
        return `Player draw ${playerDrawCard.name} of ${playerDrawCard.suit}.
        <br><br>Player burst, game over, please click refresh button to play again.`;
      }
      if (playerCardsScore <= 21) {                
        if (playerDrawCardCount == 3) {
          gameOver = true;
          return `Player have 5 cards without bursting, player won!
          <br><br>Please click refresh button to play again.`;
        }   
        currentStage = playerStage;
        return `Player card score is ${playerCardsScore}. Do you want to "hit" or "stand"?`;
      }                       
      return `Player draw card ${playerDrawCard.name} of ${playerDrawCard.suit}.`;      
    }
    else if (input == 'stand') {
      currentStage = computerStage;
      return `Player card score is ${playerCardsScore}.
      <br><br>Computer card score is ${computerCardsScore}.
      <br><br>Computer's turn. Click "Submit" to continue.`;
    }
    else {      
      currentStage = playerStage;
      return `Player card score is ${playerCardsScore}. Do you want to "hit" or "stand"?`;
    }   
    //return currentStage;        
  }    

  // Stage where computer starts to "hit" or "stand"
  if (currentStage == computerStage) {
    if (computerCardsScore <= 17) {
      var computerDrawCard = shuffleCardDeck.pop();
      computerCards.push (computerDrawCard);
      computerDrawCardCount += 1;            
      if (computerCards.length == 3) {
        computerCardsScore - 10;
        computerCardsScore += computerDrawCard.score;
        //return computerCardsScore;
      }
      
      if (computerCardsScore > 17 && computerCardsScore <= 21) {
        if (computerDrawCardCount == 3) {
          gameOver = true;
          return `Computer have 5 cards without bursting, computer won!
          <br><br>Please click refresh button to play again.`;
        } 
        currentStage == finalStage;
        return `Computer card score is ${computerCardsScore}. 
        <br><br>Click "Submit" to continue.`
      }  
      else if (computerCardsScore > 21) {
        gameOver = true;
        return `Computer draw ${computerDrawCard.name} of ${computerDrawCard.suit}.
        <br><br>Computer burst, player win! please click refresh button to play again.`;
      }          
    }
    // else {
    //   currentStage = finalStage;      
    //   return `Computer card score is ${computerCardsScore}.
    //   <br><br>Click "Submit" to continue.`
    // }
    console.log (currentStage);
    currentStage = finalStage;
    return currentStage;
  }

  // Stage to compare cards between computer and player to determine winner
  if (currentStage == finalStage) {
    console.log (computerCardsScore);
    console.log (playerCardsScore);
    if (computerCardsScore > playerCardsScore) {      
      return `Computer card score is ${computerCardsScore}.
      <br><br>Player card score is ${playerCardsScore}.
      <br><br>Computer wins!`
    }
    else if (computerCardsScore < playerCardsScore) {      
      return `Computer card score is ${computerCardsScore}.
      <br><br>Player card score is ${playerCardsScore}.
      <br><br>Player wins!`
    }
    else {      
      return `Computer card score is ${computerCardsScore}.
      <br><br>Player card score is ${playerCardsScore}.
      <br><br>It is a draw!`
    }      
  }  
};


// Generate cardDeck function
var totalCardDeck = function () {
  
  var totalCards = [];  // Empty card deck array

  // There are 4 suits: Spades, Hearts, Clubs, Diamonds
  var cardSuits = ['spades', 'hearts', 'clubs', 'diamonds']; // Set 4 different card suits info
  var cardEmoji = ['♠️', '♥️', '♣️', '♦']; // Set 4 different card emoji info
  var suitsIndex = 0; // Start suit index from array item 0 which is spades

  while (suitsIndex < cardSuits.length) {
    var currentSuit = cardSuits[suitsIndex]; // Cycle through currentSuit with cardSuits starting with array item 0
    var currentEmoji = cardEmoji[suitsIndex]; // Cycle through currentEmoji with cardEmoji starting with array item 0;   
    var cardRank = 1; // Each suit has 13 cards hence, start from 1 instead of 0
    var cardScore = 0; // Set each card score value starting from 0;    

    while (cardRank <= 13) {
      var cardName = cardRank; // Set card name same attributes as card rank
      cardScore = cardRank;

      // Ranks 1, 11, 12, 13 are defined as ace, jack, queen, king
      if (cardName == 1) {
        cardName = 'ace'; // If card name is 1, card name will display as ace
      }
      else if (cardName == 11) {
        cardName = 'jack'; // If card name is 11, card name will display as jack
        cardScore = 10;
      }
      else if (cardName == 12) {
        cardName = 'queen'; // If card name is 12, card name will display as queen
        cardScore = 10;
      }
      else if (cardName == 13) {
        cardName = 'king'; // If card name is 13, card name will display as king
        cardScore = 10;
      }
      
      var cardContent = {name: cardName, suit: currentSuit, rank: cardRank, emoji: currentEmoji, score: cardScore}; // Define the attributes of each card
      totalCards.push(cardContent); // Insert each card with generated attributes into totalCards array
      cardRank += 1; // Increase counter to cycle through next card attributes 13 times
    }

    suitsIndex += 1; // Increase counter to cycle through suit index 4 times
  }
  
  return totalCards; // Return the totalCards array value as a whole after function completes
}


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


// Get random index
var getRandomIndex = function () {
  return Math.floor(Math.random() * 51);
};