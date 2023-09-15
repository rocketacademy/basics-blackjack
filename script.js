let main = function(input){
  return playBlackjack(input);
};

let submitButton = document.getElementById("submit-button");
let inputField = document.getElementById("input-field");
let standResultButton = document.getElementById("results-button");
let continueButton = document.getElementById("continue-button")
let exitButton = document.getElementById("exit-button")

// global variables
let gameMode = 'waiting for user name';
let userName = " ";
let currentBets = 100;
let betAmount = 0;
let playerScore = 0;
let dealerScore = 0;
let playerHand = [];
let dealerHand = [];
let remainingBets = 0;


// set a function to generate random number
let getRandomIndex = function (deck){
  return Math.floor(Math.random() * deck);
};

// set a function to make deck of cards
let deckOfCards = function (){
  let deckArray = [];
  let suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1){
    let currentSuit = suits[suitIndex];
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1){
      let cardName = rankCounter;

      if (cardName == 1){
        cardName = 'Ace';
      } else if (cardName == 11){
        cardName = 'Jack';
      } else if (cardName == 12){
        cardName = 'Queen';
      } else if (cardName == 13){
        cardName = 'King';
      }

      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter
      }

      deckArray.push(card);
    }
  }
  return deckArray;
};

// set a function to shuffle cards
let shuffledDeck = function (){
  let deck = deckOfCards();
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex += 1){
    let randomIndex = getRandomIndex(deck.length);
    let randomCard = deck[randomIndex];
    let currentCard = deck[currentIndex];

    deck[randomIndex] = currentCard;
    deck[currentIndex] = randomCard;
  }
  return deck;
};

// set a function to convert suits to emoji 
let convertSuitToEmoji = function (suit){
  if (suit == 'spades'){
    return `♠️`;
  }
  if (suit == 'hearts'){
    return `♥️`;
  }
  if (suit == 'clubs'){
    return `♣️`;
  }
  if (suit == 'diamonds'){
    return '♦️';
  }
  return `Invalid suit`;
};

// set a function to record player's name and ask for bet amount
let userInputName = function (user){
  userName = user;
  if (userName == ''){
    return `🔐<br><br>Oops, you did not enter your name.`;
  }
  gameMode = 'place bets';
  submitButton.innerHTML = "Place bets";
  inputField.setAttribute("placeholder", "Enter bet amount");
  return `♠️♣️♥️♦️<br><br>Hey ${userName}! How much would you like to bet?`;
};


// set a function to record player's bet amount 
let placeBets = function (betAmount){
  if (betAmount == '' || isNaN(Number(betAmount))){   // if bet amount input is empty or not numerical
    return `Please place your bets. You currently have $${currentBets}.`;
  }
  if (betAmount > currentBets){   // if player bets more than its current bets
    return `Insufficient bets. You currently have $${currentBets}, ${userName}.`;
  }
  submitButton.innerHTML = "Deal";
  inputField.style.display = "none"; 
  gameMode = 'deal';
  remainingBets = currentBets - betAmount;
  return `You bet $${betAmount}. You left $${remainingBets}.<br><br>Let's deal!`;
};

// set a function to calculate individual score
let calculateHandValue = function (hand){
  let totalHandValue = 0;
  for (let handIndex = 0; handIndex < hand.length; handIndex += 1){
    let currentCard = hand[handIndex]; // define current card 
    if (currentCard.name == 'Jack' || currentCard.name == 'Queen' || currentCard.name == 'King'){
      totalHandValue += 10;
    } else if (currentCard.name == 'Ace'){
      if (totalHandValue < 11){
        totalHandValue += 11;
      } else {
        totalHandValue += 1; 
      }
    } else {
      totalHandValue += currentCard.name;
    }
  }
  return totalHandValue;
};

// set a function to generate output string with emoji for suits
let outputStringMessageWithEmoji = function (playerHand, dealerHand){
  let playerString = `<b>Player Cards: </b><br><br>`;
  let playerIndex = 0;
  while (playerIndex < playerHand.length){
    let currentPlayerCard = playerHand[playerIndex];
    let suitWithEmoji = convertSuitToEmoji(currentPlayerCard.suit);
    playerString += `${currentPlayerCard.name} of ${suitWithEmoji}<br>`;
    playerIndex += 1;
  }

  let dealerString = `<b>Dealer Cards: </b><br><br>`;
  let dealerIndex = 0;
  while (dealerIndex < dealerHand.length){
    let currentDealerCard = dealerHand[dealerIndex];
    let suitWithEmoji = convertSuitToEmoji(currentDealerCard.suit);
    dealerString +=  `${currentDealerCard.name} of ${suitWithEmoji}<br>`;
    dealerIndex += 1;
  }
  return `Player Score: ${playerScore}<br>${playerString}<hr>${dealerString}`;
};


// set a function to enable and disable buttons during bust and blackjack
let disableEnableButtons = function (){
  submitButton.disabled = true;
  standResultButton.disabled = true;
  continueButton.disabled = false;
  exitButton.disabled = false;
};


// set a function to evaluate blackjack
let evaluateBlackjack = function (playerValue, dealerValue){
  if (playerValue == 21 && !(dealerValue ==  21)){
    remainingBets += Number(betAmount);
    disableEnableButtons();
    return `Player wins blackjack! 🎊`;
  }
  if (dealerValue == 21 && !(playerValue == 21)){
    disableEnableButtons();
    return `Dealer wins blackjack!`;
  }
  if (dealerValue == 21 && playerValue == 21){
    remainingBets += Number(betAmount)
    disableEnableButtons();
    return `Blackjack tie!`;
  }
  return false;
};


// set a function to evaluate bust
let evaluateBust = function (playerValue, dealerValue){
  if (playerValue > 21 && dealerValue < 21){
    disableEnableButtons();
    return `Player busts!`;
  }
  if (dealerValue > 21 && playerValue < 21){
    remainingBets += Number(betAmount)
    disableEnableButtons();
    return `Dealer busts`;
  }
  if (dealerValue > 21 && playerValue > 21){
    disableEnableButtons();
    return `Both bust!`;
  }
  return false;
};


// set a function for dealing two cards at the beginning of the game
let startGame = function(){
  let maxCardsToDraw = 2; // maxmimum number of cards to draw for player and dealer respectively
  let deckShuffled = shuffledDeck();
  for (let drawIndex = 0; drawIndex < maxCardsToDraw; drawIndex += 1){
    let playerCardDrawn = deckShuffled.pop();
    playerHand.push(playerCardDrawn) // update global variable 
    let dealerCardDrawn = deckShuffled.pop();
    dealerHand.push(dealerCardDrawn) // update global variable
  }
  playerScore = calculateHandValue(playerHand); // calculate player's score
  dealerScore = calculateHandValue(dealerHand); // calculate dealer's score
  let blackjackWin = evaluateBlackjack(playerScore, dealerScore);
  return blackjackWin;
};


// set a function to edit button characteristics, i.e. id and innerhtml
let amendButtonCharacteristics = function (){
  submitButton.innerHTML = "Hit";
  standResultButton.innerHTML = "Stand";
  standResultButton.disabled = false;
};


// set a function to deal
let startDeal = function (){
  let outputResult = " ";
  amendButtonCharacteristics();
  outputResult = startGame(); 
  let outputCards = outputStringMessageWithEmoji(playerHand, dealerHand); // to evaluate only blackjack at the start 

  if (!outputResult){   // if scores do not result in any blackjack wins/losses/ties, proceed to hit or stand gamemode
    gameMode = 'hit or stand';
    return `♠️♣️♥️♦️<br><br>Bet amount: $${betAmount}<hr>${outputCards}`;
  } else {
    return `♠️♣️♥️♦️<br><br>Bet amount: $${betAmount}<br>${outputResult}<hr>${outputCards}`;
  }
};


// set a function when player clicks Hit button
let hitPlayer = function (){
  let deckShuffled = shuffledDeck();
  let playerCardDrawn = deckShuffled.pop();
  playerHand.push(playerCardDrawn);
  playerScore = calculateHandValue(playerHand); // update global variable in subsequent rounds
  let outputCards = outputStringMessageWithEmoji(playerHand, dealerHand);
  return `♠️♣️♥️♦️<br><br>Bet amount: $${betAmount}<hr>${outputCards}`;
};

// set a function when dealer deals
let hitDealer = function (){
  let deckShuffled = shuffledDeck();
  let dealerCardDrawn = deckShuffled.pop();
  dealerHand.push(dealerCardDrawn);
  return dealerHand;
};


// set a function to evaluate final result after player hit or stand
let outputResultString = function (){
 
  if (dealerScore < 16){  // dealer will deal only if his score is less than 16
    hitDealer();
    dealerScore = calculateHandValue(dealerHand); // update global variable in subsequent rounds 
  } else {
    dealerScore = calculateHandValue(dealerHand); // update global variable in subsequent rounds 
  }
  let outputCards = outputStringMessageWithEmoji(playerHand, dealerHand);
  return outputCards;
};

// set a function to evaluate normal wins/losses, i.e., no blackjack/bust
let compareNormalResults = function(playerScore, dealerScore){
  if (playerScore > dealerScore){
    remainingBets += Number(betAmount)
    return `Player wins!`;
  }
  if (dealerScore > playerScore){
    return `Dealer wins!`;
  }
  remainingBets += Number(betAmount)
  return `Both tie!`;
};


// set a function to evaluate normal wins/losses, blackjack, or bust
let determineResults = function (){
  let output = " ";
  let outputMessage = outputResultString(dealerHand, playerHand)
  if (playerScore == 21 || dealerScore == 21){
    output = evaluateBlackjack(playerScore, dealerScore);
  } else if (playerScore > 21 || dealerScore > 21){
    output = evaluateBust(playerScore, dealerScore);
  } else {
    output = compareNormalResults (playerScore, dealerScore);
  }
  return `♠️♣️♥️♦️<br><br>Bet amount: $${betAmount}<br>${output}<hr>${outputMessage}`;
};


// set a function to exit/reset game
let exiting = function (){
  submitButton.innerHTML = "Submit";
  gameMode = 'waiting for user name';
  playerHand = []
  dealerHand = []
  dealerScore = 0;
  playerScore = 0;
  currentBets = 100;
  betAmount = 0;
  remainingBets = 0;
  inputField.setAttribute("placeholder", "Enter player name");
}


// set a function to continue betting/game
let continueBetting = function (){
  if (remainingBets > 0){
  submitButton.innerHTML = "Place bets";
  gameMode = 'place bets';
  dealerHand = [];
  playerHand = [];
  playerScore = 0;
  dealerScore = 0;
  currentBets = remainingBets;
  inputField.style.display = "inline-block";
  inputField.setAttribute("placeholder", "Enter bet amount");
  return `🔑<br><br>Keep going ${userName}? You have $${currentBets}. Please place your bets.`;
}
  exiting();
  return `Urgh ${userName}, you have $0.<br><br>You have exited the game. Please enter your name to replay!`;
}


// set a function to play blackjack
let playBlackjack = function (input){
  if (gameMode == 'waiting for user name'){
    userName = input;
    return userInputName(userName);
  }

  if (gameMode == 'place bets'){
    betAmount = Number(input);
    return placeBets(betAmount);
  }

  if (gameMode == 'deal'){
    return startDeal();
  }

  if (gameMode == "hit or stand"){
    if (input == ''){
      return hitPlayer();
    }
  }
};




