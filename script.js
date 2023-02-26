// Program to generate standard deck of 52 cards. Cards have a blackjack value with Ace being either 1 or 11
const makeDeck = () => {
  let cardDeck = [];
  let suits = ["♥️", "♦️", "♣️", "♠️"];

  let suitIndex = 0
  while (suitIndex < suits.length) {
    let currentSuit = suits[suitIndex]

    let rankCounter = 1
    while (rankCounter <= 13) {
      let cardName = rankCounter
      let blackjackValue = rankCounter
      if (rankCounter === 1) {
        cardName = 'Ace'
        blackjackValue = [1, 11]
      } else if (rankCounter === 11) {
        cardName = 'Jack'
        blackjackValue = 10
      } else if (rankCounter === 12) {
        cardName = 'Queen'
        blackjackValue = 10
      } else if (rankCounter === 13) {
        cardName = 'King'
        blackjackValue = 10
      }

      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: blackjackValue
      }

      cardDeck.push(card)

      rankCounter += 1
    }
    suitIndex += 1
  }
  return cardDeck
}

// Program to shuffle cards given a particular deck
const shuffleCards = (deck) => {
  let i = 0;
  while (i < deck.length) {
    let randomIndex = getRandomIndex(deck.length);
    let randomCard = deck[randomIndex];
    let currentCard = deck[i];
    deck[i] = randomCard;
    deck[randomIndex] = currentCard;
    i += 1;
  }
  return deck;
};

// Generate random index for shuffling
const getRandomIndex = max => Math.floor(Math.random() * max);

// Generate standard deck of 52 cards
let deck = makeDeck()

// Global variables
let playerHand = [];
let dealerHand = [];

let gameMode = 'start'
let playerScore = 0;
let dealerScore = 0;









// Draw 2 cards each for player and dealer
const drawHand = deck => {
  playerHand.push(deck.pop())
  dealerHand.push(deck.pop())
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
}

// Update player score by looping through the player's hand and capturing total value
// Assess no. of aces => if more than 1 ace, reduce the points by the number of extra aces * 10
const updatePlayerScore = () => {
  for (const card of playerHand) {
    if (card.name === 'Ace') {
      playerScore += card.value[1]
    } else {
      playerScore += card.value
    }
  }
  let aceCounter = 0
  for (const card of playerHand) {
    if (card.name === 'Ace') {
      aceCounter += 1
    }
  }
  if (aceCounter > 1) {
    playerScore -= (10 * (aceCounter - 1))
  }
}

// Update dealer score by looping through the dealer's hand and capturing total value
// Assess no. of aces => if more than 1 ace, reduce the points by the number of extra aces * 10
const updateDealerScore = () => {
  for (const card of dealerHand) {
    if (card.name === 'Ace') {
      dealerScore += card.value[1]
    } else {
      dealerScore += card.value
    }
  }
  let aceCounter = 0;
  for (const card of dealerHand) {
    if (card.name === "Ace") {
      aceCounter += 1;
    }
  }
  if (aceCounter > 1) {
    dealerScore -= 10 * (aceCounter - 1);
  }
}

// Consolidation function
const updateScores = () => {
  updatePlayerScore()
  updateDealerScore()
}

// Check for Blackjack in the first draw
const checkBlackjack = () => {
  if (playerScore === 21 && dealerScore === 21) {
    return "blackjacktie";
  } else if (playerScore === 21 && dealerScore !== 21) {
    return "blackjackplayer";
  } else if (playerScore !== 21 && dealerScore === 21) {
    return "blackjackdealer";
  } else {
    return 'continue'
  }
}

const getWinner = () => {
  if (playerScore === dealerScore) {
    return 'tie'
  } else if (playerScore > dealerScore) {
    return 'player'
  } else {
    return 'dealer'
  }
}

const displayBlackjackWinMessage = result => {
  let message = `You drew ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}.   <br>Your score: ${playerScore}<br><br>Dealer drew ${dealerHand[0].name} of ${dealerHand[0].suit} and ${dealerHand[1].name} of ${dealerHand[1].suit}.<br>Dealer's score: ${dealerScore}<br><br><br> `;
  if (result === 'blackjacktie') {
    message +=
      "Both you and the dealer drew a Blackjack! What are the chances... it's a tie.";
  } else if (result === 'blackjackplayer') {
    message += "You drew a Blackjack. You won! 🥳"; 
  } else if (result === 'blackjackdealer') {
    message +=
      "Dealer drew a Blackjack. Tough luck...☹️";
  } else {
    message += `<strong>Hit</strong> to draw a 🃏 or <strong>Stand</strong> to pass.`;
  }
  return message
}

// Consolidation function
const runDrawLogic = () => {
  shuffleCards(deck);
  drawHand(deck)
  updateScores();
  let result = checkBlackjack()
  if (result === "continue") {
    gameMode = "choose";
    switchButtonStates(gameMode);
  } else if (result !== "continue") {
    gameMode = "end";
    switchButtonStates(gameMode);
  }
    return result;
  }

// Switch button states to indicate active or disabled
const switchButtonStates = (state) => {
  let submitButton = document.getElementById("submit-button")
  let hitButton = document.getElementById("hit-button")
  let standButton = document.getElementById("stand-button")
  let restartButton = document.getElementById("restart-button");
  
  if (state === 'choose') {
    submitButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
    restartButton.disabled = true;
  } else if (state === 'end') {
    submitButton.disabled = true;
    hitButton.disabled = true;
    standButton.disabled = true;
    restartButton.disabled = false;
  } else {
    submitButton.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;
    restartButton.disabled = true;
  }  
}

// Restart round when restart button is clicked
const restartRound = () => {
  playerHand = [];
  dealerHand = [];

  deck = makeDeck()

  gameMode = "start";
  playerScore = 0;
  dealerScore = 0;

  switchButtonStates(gameMode)
}





const main = function () {
  
  // First round => draw 2 cards for player and dealer, store in arrays, update score
  if (gameMode === 'start') {
    let result = runDrawLogic()
    return displayBlackjackWinMessage(result);
    
    // check blackjack wins for player and dealer. if yes, declare winner and end game

    // if no blackjack, show player score and ask whether hit or stand

    // if hit, check for > 21. If yes, automatic dealer
  }

  

  
  
  // Compare both hands and determine a winner. Scenarios are: (1) tie (2) Blackjack win (3) Normal win
  // let result = getWinner()
  // // Display appropriate messages
  // let finalMessage = displayBMessage(result)
  
  // return finalMessage;
};




// else if (result === 'tie') {
//     message += `Both you and the dealer drew a score of ${playerScore}! It's a tie.` 
//     else if (result === 'player') {
//     message += `You won!`
//   } else {
//     message += `You lost...`
//   }