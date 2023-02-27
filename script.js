// ==================== Programs ====================
// Program to generate standard deck of 52 cards. Cards have a blackjack value with Ace being either 1 or 11
const makeDeck = () => {
  let cardDeck = [];
  let suits = ["♥️", "♦️", "♣️", "♠️"];

  let suitIndex = 0;
  while (suitIndex < suits.length) {
    let currentSuit = suits[suitIndex];

    let rankCounter = 1;
    while (rankCounter <= 13) {
      let cardName = rankCounter;
      let blackjackValue = rankCounter;
      if (rankCounter === 1) {
        cardName = "Ace";
        blackjackValue = [1, 11];
      } else if (rankCounter === 11) {
        cardName = "Jack";
        blackjackValue = 10;
      } else if (rankCounter === 12) {
        cardName = "Queen";
        blackjackValue = 10;
      } else if (rankCounter === 13) {
        cardName = "King";
        blackjackValue = 10;
      }

      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: blackjackValue,
      };

      cardDeck.push(card);

      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

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
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Generate standard deck of 52 cards
let deck = makeDeck();



// ==================== Global variables ====================
let playerHand = [];
let dealerHand = [];

let gameMode = "start";
let playerScore = 0;
let dealerScore = 0;

let playerState = "safe";
let dealerState = "safe";



// ==================== Draw card functions ====================
// Draw 2 cards each for player and dealer
const drawHand = (deck) => {
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
};

// Update player score by looping through the hand and capturing total value
const updateScore = (person) => {
  let score = 0;
  if (person === "player") {
    for (const card of playerHand) {
      if (card.name === "Ace") {
        score += card.value[1];
      } else {
        score += card.value;
      }
    }
    playerScore = score;
  } else if (person === "dealer")
    for (const card of dealerHand) {
      if (card.name === "Ace") {
        score += card.value[1];
      } else {
        score += card.value;
      }
    }
    dealerScore = score;
};

// Assess no. of aces => if more than 1 ace, reduce the points by the number of extra aces * 10
const hasAce = (hand, person) => {
  let aceCounter = 0;
  for (const card of hand) {
    if (card.name === "Ace") {
      aceCounter += 1;
    }
  }
  if (person === 'player') {
    if (aceCounter > 1) {
      playerScore -= 10 * (aceCounter - 1);
    } else if (aceCounter === 1 && playerScore > 21) {
      playerScore -= 10;
    } else if (aceCounter > 1 && playerScore > 21) {
      playerScore -= 10 * (aceCounter)
    }
  } else if (person === 'dealer') {
    if (aceCounter > 1) {
      dealerScore -= 10 * (aceCounter - 1);
    } else if (aceCounter === 1 && dealerScore > 21) {
      dealerScore -= 10;
    } else if (aceCounter > 1 && dealerScore > 21) {
      dealerScore -= 10 * aceCounter;
    }
  }
};

// Consolidation function
const updateScores = () => {
  updateScore('player');
  updateScore('dealer')
  hasAce(playerHand, 'player');
  hasAce(dealerHand, 'dealer');
};

// Check for Blackjack in the first draw
const checkBlackjack = () => {
  if (playerScore === 21 && dealerScore === 21) {
    return "blackjacktie";
  } else if (playerScore === 21 && dealerScore !== 21) {
    return "blackjackplayer";
  } else if (playerScore !== 21 && dealerScore === 21) {
    return "blackjackdealer";
  } else {
    return "continue";
  }
};

const displayBlackjackWinMessage = (result) => {
  let message = `You drew ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}.   <br>Your score: ${playerScore}<br><br>Dealer drew ${dealerHand[0].name} of ${dealerHand[0].suit} and ${dealerHand[1].name} of ${dealerHand[1].suit}.<br>Dealer's score: ${dealerScore}<br><br><br> `;
  if (result === "blackjacktie") {
    message += "Both you and the dealer drew a Blackjack! What are the chances... it's a tie.";
  } else if (result === "blackjackplayer") {
    message += "You drew a Blackjack. You won! 🥳";
  } else if (result === "blackjackdealer") {
    message += "Dealer drew a Blackjack. Tough luck...☹️";
  } else {
    message += `<strong>Hit</strong> to draw a 🃏 or <strong>Stand</strong> to end your turn.`;
  }
  return message;
};

// Switch button states to indicate active or disabled
const switchButtonStates = (state) => {
  let submitButton = document.getElementById("submit-button");
  let hitButton = document.getElementById("hit-button");
  let standButton = document.getElementById("stand-button");
  let restartButton = document.getElementById("restart-button");

  if (state === "player") {
    submitButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;
    restartButton.disabled = true;
  } else if (state === "end") {
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
};

// Restart round when restart button is clicked
const restartRound = () => {
  playerHand = [];
  dealerHand = [];

  deck = makeDeck();

  gameMode = "start";
  playerScore = 0;
  dealerScore = 0;

  switchButtonStates(gameMode);

  playerState = "safe";
  dealerState = "safe";
};

// ==================== Hit Button helper functions ====================

// Hit function
const drawCard = () => {
  if (gameMode === "player") {
    playerHand.push(deck.pop());
  } else if (gameMode === "dealer") {
    dealerHand.push(deck.pop());
  }
};

// Check if gone bust
const isBust = (player) => {
  if (player === "player") {
    if (playerScore > 21) {
      playerState = "bust";
      hitButton.disabled = true;
      return "bust";
    } else if (playerScore === 21) {
      hitButton.disabled = true;
      return "playerblackjack";
    } else {
      return "safe";
    }
  } else if (player === "dealer") {
    if (dealerScore > 21) {
      dealerState = "bust";
      standButton.disabled = true;
      restartButton.disabled = false;
      gameMode = 'checkwinner'
      return "bust";
    } else if (dealerScore === 21) {
      standButton.disabled = true;
      restartButton.disabled = false;
      gameMode = "checkwinner";
      return "dealerblackjack";
    } else {
      return "safe";
    }
  }
};

const displayHitMessage = (state, turn) => {
  let newCardPlayer = playerHand[playerHand.length - 1];
  let newCardDealer = dealerHand[dealerHand.length - 1];
  if (turn === "player") {
    let message = `You drew ${newCardPlayer.name} of ${newCardPlayer.suit}<br>Your score: ${playerScore}.<br><br>`;
    if (state === "bust") {
      message += `You went bust! Click <strong>Stand</strong> to continue.`;
    } else if (state === "playerblackjack") {
      message += `Blackjack! Click <strong>Stand</strong> to continue.`;
    } else if (state === "safe") {
      message += `<strong>Hit</strong> to draw a 🃏 or <strong>Stand</strong> to end your turn.`;
    }
    return message
  } else if (turn === "dealer") {
    let message = `Dealer drew ${newCardDealer.name} of ${newCardDealer.suit}<br>Dealer's score: ${dealerScore}.<br><br>`;
    if (state === "bust") {
      message += `Dealer went bust. Click <strong>Results</strong> to see who won.`;
    } else if (state === "dealerblackjack") {
      message += `Dealer drew a Blackjack! Click <strong>Results</strong> to see who won.`;
    } else if (state === "safe") {
      message += `Click <strong>Stand</strong> to see if the dealer draws another card.`;
    }
    return message;
  }
};

// check winner
const getWinner = () => {
  if (playerState === "bust" && dealerState === "bust") {
    return "tiebust";
  } else if (playerState === "safe" && dealerState === "bust") {
    return "player";
  } else if (playerState === "bust" && dealerState === "safe") {
    return "dealer";
  } else if (playerState === "safe" && dealerState === "safe") {
    if (playerScore === dealerScore) {
      return "tie";
    } else if (playerScore > dealerScore) {
      return "safeplayer";
    } else if (dealerScore > playerScore) {
      return "safedealer";
    }
  }
};

const displayEndGameMessage = (result) => {
  let message = `Your final score is: <strong>${playerScore}</strong>.<br><br> Dealer's final score is: <strong>${dealerScore}</strong>.<br><br>`;
  if (result === 'tiebust') {
    message += `Both players went bust. It's a tie!`;
  } else if (result === 'player' || result === 'safeplayer') {
    message += `You win! 🥳`;
  } else if (result === 'dealer' || result === 'safedealer') {
    message += `You lost... ☹️`; 
  } else if (result === 'tie') {
    message += `It's a tie!`; 
  }
  return message
}

// ==================== Consolidation functions ====================
const runDrawLogic = () => {
  shuffleCards(deck);
  drawHand(deck);
  updateScores();
  let result = checkBlackjack();
  if (result === "continue") {
    gameMode = "player";
    switchButtonStates(gameMode);
  } else if (result !== "continue") {
    gameMode = "end";
    switchButtonStates(gameMode);
    restartButton.innerText = 'Play again'
  }
  return result;
};

const runHitLogic = () => {
  drawCard();
  updateScore('player');
  hasAce(playerHand, 'player');
  return isBust("player");
}

const runStandLogic = () => {
  drawCard();
  updateScore("dealer");
  hasAce(dealerHand, 'dealer');
  return isBust("dealer");
}
// ==================== Main functions ====================

const main = function () {
  if (gameMode === "start") {
    let result = runDrawLogic();
    return displayBlackjackWinMessage(result);
  }
};

const hit = () => {
  let playerState = runHitLogic()
  return displayHitMessage(playerState, 'player');
};

const stand = () => {
  if (gameMode === "player") {
    gameMode = "dealer"
    hitButton.disabled = true;
  }
  if (dealerScore < 17) {
    let dealerState = runStandLogic()
    return displayHitMessage(dealerState, 'dealer')
  } else if (dealerScore >= 17) {
    let randomIndex = Math.floor(Math.random () * 4)
    if (randomIndex === 0) {
      let state = runStandLogic() 
      return displayHitMessage(state, "dealer");
    } else if (randomIndex !== 0) {
      standButton.disabled = true;
      restartButton.disabled = false;
      gameMode = 'checkwinner'
      return `Dealer decided not to draw another card, Click <strong>Results</strong> to see who won.`;
    }
  }
};

const results = () => {
  if (gameMode === 'checkwinner') {
    gameMode = 'end'
    restartButton.innerText = "Play again"
    let winner = getWinner()
    return displayEndGameMessage(winner)
  } else if (gameMode === 'end') {
    restartRound()
    restartButton.innerText = 'Results'
    return "Welcome! Draw 2 cards to start a game of Blackjack!";
  }

}

// ==================== Misc. Logic ====================

// If dealer's hand >= 17, assign 80% probability not to draw, and 20% probability to draw, by using random number generator
// 

// else if (result === 'tie') {
//     message += `Both you and the dealer drew a score of ${playerScore}! It's a tie.`
//     else if (result === 'player') {
//     message += `You won!`
//   } else {
//     message += `You lost...`
//   }

// L