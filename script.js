// ==================== Programs ====================
// Program to generate standard deck of 52 cards. Cards have a blackjack value with Ace being either 1 or 11
const makeDeck = () => {
  let cardDeck = [];
  let suits = ["♥️", "♦️", "♣️", "♠️"];
  let rankIcons = [
    "🅰️",
    "2️⃣",
    "3️⃣",
    "4️⃣",
    "5️⃣",
    "6️⃣",
    "7️⃣",
    "8️⃣",
    "9️⃣",
    "🔟",
    "🎃",
    "👸🏻",
    "🤴🏻",
  ];

  let suitIndex = 0;
  while (suitIndex < suits.length) {
    let currentSuit = suits[suitIndex];

    let rankCounter = 0;
    while (rankCounter <= 12) {
      let cardName = rankIcons[rankCounter];
      let blackjackValue = rankCounter + 1;
      if (rankCounter === 0) {
        blackjackValue = [1, 11];
      } else if (
        rankCounter === 10 ||
        rankCounter === 11 ||
        rankCounter === 12
      ) {
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

// Program to show cards
const addCard = (card) => {
  const div = document.getElementById("cards");
  let p = document.createElement("p");
  p.innerText = `${card.name} of ${card.suit}`;
  div.appendChild(p);
};

// Program to create score
const showScore = () => {
  const score = document.getElementById("player-score");
  score.innerText = `${playerScore}`;
};

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
  let card1 = deck.pop();
  playerHand.push(card1);
  addCard(card1);

  dealerHand.push(deck.pop());

  let card2 = deck.pop();
  playerHand.push(card2);
  addCard(card2);

  dealerHand.push(deck.pop());
};

// Update player score by looping through the hand and capturing total value
const updateScore = (hand, person) => {
  let score = 0;
  for (const card of hand) {
    if (card.name === "🅰️") {
      score += card.value[1];
    } else {
      score += card.value;
    }
  }
  if (person === "player") {
    playerScore = score;
  } else {
    dealerScore = score;
  }
};

// Assess no. of aces and adjust scores accordingly
const hasAce = (hand, person) => {
  let aceCounter = 0;
  for (const card of hand) {
    if (card.name === "🅰️") {
      aceCounter += 1;
    }
  }
  if (person === "player") {
    while (aceCounter > 0 && playerScore > 21) {
      aceCounter -= 1
      playerScore -= 10;
    }
  showScore("player");
  } else if (person === "dealer") {
    while (aceCounter > 0 && dealerScore > 21) {
      aceCounter -= 1
      dealerScore -= 10;
      }
    }
}


// const hasAce = (hand, person) => {
//   let aceCounter = 0;
//   for (const card of hand) {
//     if (card.name === "🅰️") {
//       aceCounter += 1;
//     } //45 //ace counter = 2
//   }
//   let secondCounter = aceCounter;
//   if (person === "player") {
//     if (aceCounter > 1 && playerScore > 21) {
//       while (playerScore > 21) {
//         playerScore -= 10;
//         if (playerScore <= 21) {
//           secondCounter -= 1;
//           if (playerScore <= 21 || secondCounter === 0) {
//             break;
//           }
//         }
//       }
//     } else if (aceCounter === 1 && playerScore > 21) {
//       playerScore -= 10;
//     }
//     showScore("player");
//   } else if (person === "dealer") {
//     if (aceCounter > 1 && dealerScore > 21) {
//       while (dealerScore > 21) {
//         dealerScore -= 10;
//         if (dealerScore <= 21) {
//           secondCounter -= 1;
//           if (dealerScore <= 21 || secondCounter === 0) {
//             break;
//           }
//         }
//       }
//     }
//   }
// };


// Consolidation function
const updateScores = () => {
  updateScore(playerHand, "player");
  updateScore(dealerHand, "dealer");
  hasAce(playerHand, "player");
  hasAce(dealerHand, "dealer");
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
  let message = `You drew <span style="font-size: 20px">${playerHand[0].name} of ${playerHand[0].suit}</span> and <span style="font-size: 20px">${playerHand[1].name} of ${playerHand[1].suit}</span>.<br><br>Dealer drew <span style="font-size: 20px">${dealerHand[0].name} of ${dealerHand[0].suit}</span> and another card...<br><br>`;
  if (result === "blackjacktie") {
    message += `The dealer flipped open his card to show <span style="font-size: 20px">${dealerHand[1].name} of ${dealerHand[1].suit}</span>.<br><br> Both you and the dealer drew a Blackjack! What are the chances... it's a tie.`;
  } else if (result === "blackjackplayer") {
    message += "You drew a Blackjack. You won! 🥳";
  } else if (result === "blackjackdealer") {
    message += `The dealer flipped open his card to show <span style="font-size: 20px">${dealerHand[1].name} of ${dealerHand[1].suit}</span>.<br><br> Dealer drew a Blackjack. Tough luck...☹️`;
  } else {
    message += `<strong>Hit</strong> to draw a <span style="font-size: 20px">🃏</span> or <strong>Stand</strong> to end your turn.`;
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

  document.getElementById("image").src =
    "https://1.bp.blogspot.com/-XnESTN5FkyM/XUx1uHowBfI/AAAAAAAAAKU/9zeKVJuCzZwDsUTgQ2QJe-3SdHlBO1HQQCLcBGAs/s320/tenor.gif";

  restartButton.innerText = "Results";
  const div = document.getElementById("cards");
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
  showScore("player");
};

// ==================== Hit Button helper functions ====================

// Hit function
const drawCard = () => {
  if (gameMode === "player") {
    let card = deck.pop();
    playerHand.push(card);
    addCard(card);
  } else if (gameMode === "dealer") {
    dealerHand.push(deck.pop());
  }
};

// Check if gone bust
const isBust = (person) => {
  if (person === "player") {
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
  } else if (person === "dealer") {
    if (dealerScore > 21) {
      dealerState = "bust";
      standButton.disabled = true;
      restartButton.disabled = false;
      gameMode = "checkwinner";
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
  if (turn === "player") {
    let message = `You drew <span style="font-size: 20px">${newCardPlayer.name} of ${newCardPlayer.suit}</span>.<br><br>`;
    if (state === "bust") {
      message += `You went bust! Click <strong>Stand</strong> to continue.`;
    } else if (state === "playerblackjack") {
      message += `Blackjack! Click <strong>Stand</strong> to continue.`;
    } else if (state === "safe") {
      message += `<strong>Hit</strong> to draw a <span style="font-size: 20px">🃏</span> or <strong>Stand</strong> to end your turn.`;
    }
    return message;
  } else if (turn === "dealer") {
    let message = `Dealer drew a new card. Dealer now has ${dealerHand.length} cards.</span><br><br>`;
    if (state === "bust") {
      message += `Dealer went bust.<br><br>Click <strong>Results</strong> to see who won.`;
    } else if (state === "dealerblackjack") {
      message += `Dealer drew a Blackjack!<br><br> Click <strong>Results</strong> to see who won.`;
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
    } else if (playerScore === dealerScore && playerScore === 21) {
      return "blackjacktie";
    }
  }
};

const displayEndGameMessage = (result) => {
  let message = `Your final score is: <span style="font-size: 20px; font-weight: bold;">${playerScore}</span>.<br><br> Dealer's final score is: <span style="font-size: 20px; font-weight: bold;">${dealerScore}</span>.<br><br>`;
  if (result === "tiebust") {
    message += `Both players went bust. It's a tie!`;
  } else if (result === "player" || result === "safeplayer") {
    message += `You won! 🥳`;
  } else if (result === "dealer" || result === "safedealer") {
    message += `You lost... ☹️`;
  } else if (result === "tie") {
    message += `It's a tie!`;
  } else if (result === "blackjacktie") {
    message += `Both players drew Blackjacks. It's a tie!`;
  }
  return message;
};

const updateImage = (result) => {
  let image = document.getElementById("image");
  if (
    result === "player" ||
    result === "safeplayer" ||
    result === "blackjackplayer"
  ) {
    image.src =
      "https://media.tenor.com/y_qDvEaALjMAAAAC/spongebob-patrick-star.gif";
  } else if (
    result === "dealer" ||
    result === "safedealer" ||
    result === "blackjackdealer"
  ) {
    image.src =
      "https://media.tenor.com/Z6LSdNe-rmUAAAAd/wheel-of-fortune-wheel.gif";
  } else if (
    result === "tiebust" ||
    result === "tie" ||
    result === "blackjacktie"
  ) {
    image.src = "https://media.tenor.com/b0PPWTjR4KcAAAAC/draw.gif";
  }
};

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
    updateImage(result);
    switchButtonStates(gameMode);
    restartButton.innerText = "Play again";
  }
  return result;
};

const runHitLogic = () => {
  drawCard();
  updateScore(playerHand, "player");
  hasAce(playerHand, "player");
  showScore("player");
  return isBust("player");
};

const runStandLogic = () => {
  drawCard();
  updateScore(dealerHand, "dealer");
  hasAce(dealerHand, "dealer");
  return isBust("dealer");
};
// ==================== Main functions ====================

const main = () => {
  if (gameMode === "start") {
    let result = runDrawLogic();
    return displayBlackjackWinMessage(result);
  }
};

const hit = () => {
  let playerState = runHitLogic();
  return displayHitMessage(playerState, "player");
};

const stand = () => {
  if (gameMode === "player") {
    gameMode = "dealer";
    hitButton.disabled = true;
  }
  if (dealerScore < 17) {
    let state = runStandLogic();
    return displayHitMessage(state, "dealer");
  } else if (dealerScore >= 17) {
    let randomIndex = Math.floor(Math.random() * 4);
    if (randomIndex === 0) {
      let state = runStandLogic();
      return displayHitMessage(state, "dealer");
    } else if (randomIndex !== 0) {
      standButton.disabled = true;
      restartButton.disabled = false;
      gameMode = "checkwinner";
      return `Dealer decided not to draw another card.<br><br> Click <strong>Results</strong> to see who won.`;
    }
  }
};

const results = () => {
  if (gameMode === "checkwinner") {
    gameMode = "end";
    restartButton.innerText = "Play again";
    let winner = getWinner();
    updateImage(winner);
    return displayEndGameMessage(winner);
  } else if (gameMode === "end") {
    restartRound();
    return "Welcome! Draw 2 cards to start a game of Blackjack!";
  }
};

// ==================== Misc. Logic ====================

// If dealer's hand >= 17, assign 80% probability not to draw, and 20% probability to draw, by using random number generator
