// Declare global variables to keep track of...
var gameStage = 'SET UP';  // whether SET UP, DRAW CARDS, PLAYER or DEALER, or RESULT
var shuffledDeck = [];
var playerCards = [], dealerCards = [];  // cards dealt by player and dealer respectively
var playerScore = 0, dealerScore = 0;   // score of player and dealer respectively
var disableAllButtons = false;      // this is a flag to terminate the game when card deck runs low

var main = function (input) {
  if (gameStage == 'SET UP') {   // SET UP mode
    shuffledDeck = shuffleCards(makeDeck());      // Make and Shuffle a deck of cards
    gameStage = 'DRAW CARDS';     // toggle to DRAW CARDS mode
    //return 'Game is setup, click Submit to play'; 
  }

  if (gameStage == 'DRAW CARDS') {    // this game mode to draw the cards, for player and dealer to have two cards each
    // if the stack of cards is below 10 cards left, then game must restart
    if (shuffledDeck.length < 10) {
      disableAllButtons = true;
      return `Dealer needs to shuffle the cards now.  <br> 
        Please refresh browser to restart the game.`;
    }

    for (var i=0; i<2; i+=1) {      
      // Draw 2 cards from the top of the deck - one for dealer and the other for player - and store in respective arrays
      var playerCard = shuffledDeck.pop();    
      var dealerCard = shuffledDeck.pop();
      playerCards.push(playerCard);
      dealerCards.push(dealerCard);
      console.log('Player card is:', playerCard);   console.log('Dealer card is:', dealerCard);      
    }

    playerScore = calculateScore(playerCards);
    dealerScore = calculateScore(dealerCards);

    if (playerScore == 21) { // if player already 21 points, jump straight to DEALER
      gameStage = 'DEALER';
    } else {                // else toggle to PLAYER mode - let player decide hit or stand
      gameStage = 'PLAYER';    
      var instruction = 'Click "hit" or "stand" buttons';
      var myOutputValue = formatAllHands(playerCards, dealerCards, playerScore, dealerScore) + instruction;
      return myOutputValue; 
    }
     
  }


  if (gameStage == 'PLAYER') { // for user to decide whether to hit or stand
    if (input!= 'hit' && input != 'stand') {  // input validation
      return 'Please input only "hit" or "stand"';
    }

    if (input == 'hit') { // user wish to draw another card
      var playerCard = shuffledDeck.pop();  console.log('Player card is:', playerCard);
      playerCards.push(playerCard); 
      playerScore = calculateScore(playerCards);    // recalculate player score
      
      if (playerScore > 21) {   // if player  becomes busted, then player loses straight away
        gameStage = 'RESULT';  
      } else if (playerScore == 21) {    // if player scores 21, then it becomes DEALER's turn
        gameStage = 'DEALER';
      } else {   // player can still choose to draw more cards
        var instruction = 'Click "hit" or "stand" buttons';
        var myOutputValue = formatAllHands(playerCards, dealerCards, playerScore, dealerScore) + instruction;
        return myOutputValue;
  
      }

    } else {   // user wish to stop drawing more cards
      gameStage = 'DEALER';     // toggle to DEALER mode - let dealer decide hit or stand
    }

  }


  if (gameStage == 'DEALER') {  // let's say dealer deals at 16; stand at 17
    while (dealerScore <= 16) {
      var dealerCard = shuffledDeck.pop();  console.log('Dealer card is:', dealerCard);
      dealerCards.push(dealerCard); 
      dealerScore = calculateScore(dealerCards);    // recalculate dealer score
 
    }
    gameStage = 'RESULT';     // toggle to RESULT mode
  }


  if (gameStage == 'RESULT') {  // this stage is to decide who is the winner
    result = checkResult(playerScore, dealerScore, playerCards, dealerCards);
    var instruction =  `<b>${result}</b> <br>  Continue playing? <br>`;
    var myOutputValue = formatAllHands(playerCards, dealerCards, playerScore, dealerScore) + instruction;
    var myImage = showGIF(result);
    myOutputValue += myImage;

    playerCards = [], dealerCards = [];   // to reset for next round;
    gameStage = 'DRAW CARDS';     // toggle to DRAW CARDS mode
    return myOutputValue;
  }

};


var formatAllHands = function(playerCards, dealerCards, playerScore, dealerScore) {
  outputMsg = 
  `<u>PLAYER </u> <br> ${displayHand(playerCards, false)}  
  <b> Player's hand totals to ${playerScore}</b> <br><br>
  <u>DEALER </u> <br> ${displayHand(dealerCards, true)}`;

  if (gameStage == 'RESULT') {  // only display the dealer's hand totals if RESULT mode
    outputMsg += `<b> Dealer's hand totals to ${dealerScore}</b> <br><br>`;
  }
  
  outputMsg += `<hr> <br>`;
  return outputMsg;
}

var displayHand = function(inputHand, dealer) {
  var outputMsg = '';
  if (gameStage != 'RESULT' && dealer == true) { // only display dealer's first card if Not RESULT mode
    outputMsg += `${inputHand[0].name} of ${displaySuit(inputHand[0].suit)} <br> 
      [Hidden card] <br>`;
  } else {  // display all cards
    for (var i=0; i<inputHand.length; i+=1) {
      outputMsg += `${inputHand[i].name} of ${displaySuit(inputHand[i].suit)} <br> `;
    }
  }

  return outputMsg;
}

var displaySuit = function(inputSuit) {
  switch(inputSuit) {
    case 'hearts': {return '<font color="red"> ♥️ </font>';}
    case 'diamonds': {return '<font color="red">  ♦️ </font>';}
    case 'spades':  {return '♠️';}
    case 'clubs': {return '♣️';}
  }
}


var checkResult = function(playerScore, dealerScore, playerCards, dealerCards) {
  if (isBlackjack(playerCards) && isBlackjack(dealerCards)) { return "It's a tie."}
  if (isBlackjack(playerCards) && !isBlackjack(dealerCards)) { return "Player wins by black jack!"}
  if (!isBlackjack(playerCards) && isBlackjack(dealerCards)) { return "Dealer wins by black jack!"}

  // if (playerScore > 21 && dealerScore > 21) { return "It's a tie."}
  if (playerScore <= 21 && dealerScore > 21) { return "Player wins!";}
  if (playerScore > 21) { return "Dealer wins. Player is busted.";}

  if (playerScore > dealerScore) {
    return "Player wins!";
  } else if (playerScore < dealerScore)  {
    return "Dealer wins.";
  } else {
    return "It's a tie."
  }

}

var showGIF = function(inputResultText) {
  var winningImage = '<img class="center" src="https://tenor.com/view/im-proud-of-you-dan-levy-david-david-rose-schitts-creek-gif-20773745.gif"/>';
  var losingImage = '<img class="center" src="https://tenor.com/view/wolf-of-wall-street-oh-my-god-leonardo-di-caprio-fist-bite-gif-4681785.gif"/>';
  if (inputResultText.includes('Player wins')) {return winningImage;}   // return winning Image if player wins
  if (inputResultText.includes('Dealer wins')) {return losingImage;}    // return losing Image if dealer wins

  return '';    // return no image if it's a tie
}


var isBlackjack = function(inputHand) {
  var tenCards = [10, 'jack', 'queen', 'king']
  if (tenCards.includes(inputHand[0].name) && inputHand[1].name == 'ace') {return true;}
  if (tenCards.includes(inputHand[1].name) && inputHand[0].name == 'ace') {return true;}
  return false;
}

var calculateScore = function(inputHand) {
  var score = 0;
  var aceCards = 0;    
  var pictureCards = ['jack', 'queen', 'king'];

  for (var i=0; i<inputHand.length; i+=1) {  // count total for non-ace cards first
    if (pictureCards.includes(inputHand[i].name)) {
      score += 10;
    } else if (inputHand[i].name != 'ace') {  
      score += inputHand[i].rank;
    }
  }

  for (var i=0; i<inputHand.length; i+=1) { // count the number of ace cards
    if (inputHand[i].name == 'ace') {
      aceCards += 1;
    }
  }

  while (aceCards > 0) { // check what is the optimal way to account for each ace card
    if (score + 11 <= 21) {
      score += 11;
    } else {
      score += 1;
    }
    aceCards -= 1;
  }
  return score;
}

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    
    var randomIndex = getRandomIndex(cardDeck.length);    // Select a random index in the deck
    var randomCard = cardDeck[randomIndex];             // Select the card that corresponds to randomIndex
    var currentCard = cardDeck[currentIndex];           // Select the card that corresponds to currentIndex
    
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};


// Initialise the card deck representation as an array of objects
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card);    // Add the new card to the deck
      rankCounter += 1;       // Increment rankCounter to iterate over the next rank
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};
