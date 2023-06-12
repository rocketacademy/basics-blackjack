// ------------ Helper functions below-------------------

/** Create a standard 52-card deck */
const makeDeck = () => {
  const suits = ["♥️", "♦️", "♣️", "♠️"];
  const ranks = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];
  const deck = [];

  for (let suit of suits) {
    for (let rank of ranks) {
      const card = {
        name: rank,
        suit: suit,
        rank:
          rank === "Ace"
            ? 11
            : rank === "Jack" || rank === "Queen" || rank === "King"
            ? 10
            : parseInt(rank),
      };
      deck.push(card);
    }
  }

  return deck;
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
const shuffleCards = (cardDeck) => {
  const shuffledDeck = [...cardDeck];
  let currentIndex = shuffledDeck.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap current card with randomly selected card
    [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
      shuffledDeck[randomIndex],
      shuffledDeck[currentIndex],
    ];
  }

  return shuffledDeck;
};

/**
 * Show player's and computer's hands as a formatted string
 */
const showPlayerAndComputerHands = (playerHand, computerHand) => {
  let playerMessage = "🙋‍♂️ Player's hand is: <br>";
  let computerMessage = "🤖 Computer's hand is: <br>";

  for (let card of playerHand) {
    playerMessage += `${card.name} of ${card.suit}<br>`;
  }

  for (let card of computerHand) {
    computerMessage += `${card.name} of ${card.suit}<br>`;
  }

  return playerMessage + `<br>` + computerMessage;
};

/**
 * Check if a hand has a blackjack (Ace + 10-value card)
 */
const checkBlackJack = (hand) => {
  if (hand.length !== 2) {
    return false;
  }

  const [card1, card2] = hand;

  return (
    (card1.rank === 11 && card2.rank >= 10) ||
    (card1.rank >= 10 && card2.rank === 11)
  );
};

/**
 * Calculate the total rank of a hand, accounting for aces being 1 or 11
 */
const calculateHandRank = (hand) => {
  let totalRank = 0;
  let aceCount = 0;

  for (let card of hand) {
    if (card.rank === 11) {
      aceCount++;
    }
    totalRank += card.rank;
  }

  while (totalRank > 21 && aceCount > 0) {
    totalRank -= 10;
    aceCount--;
  }

  return totalRank;
};

// ----------Global variable definition ---------------
let deck = shuffleCards(makeDeck());
let playerHand = [];
let computerHand = [];
let gameMode = "Start game";

// -------------- Main function below ------------------
const main = (input) => {
  let output = "";

  if (gameMode === "Start game") {
    playerHand = [];
    computerHand = [];
    deck = shuffleCards(makeDeck());
    gameMode = "Deal cards";

    output = "🃏🃏 The game has started, please press submit to deal cards.";
  } else if (gameMode === "Deal cards") {
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());

    const playerRank = calculateHandRank(playerHand);
    const computerRank = calculateHandRank(computerHand);

    if (checkBlackJack(playerHand) && checkBlackJack(computerHand)) {
      gameMode = "Start game";
      output = "Both player and computer have blackjack🃏. It's a tie!";
    } else if (checkBlackJack(playerHand)) {
      gameMode = "Start game";
      output = "Player has blackjack🃏! Player wins! 🎉";
    } else if (checkBlackJack(computerHand)) {
      gameMode = "Start game";
      output = "Computer has blackjack🃏! Computer wins! 😢";
    } else if (playerRank === 21 && computerRank === 21) {
      gameMode = "Start game";
      output = "Both player and computer have 21. It's a tie!";
    } else if (playerRank === 21) {
      gameMode = "Start game";
      output = "Player has 21! Player wins! 🎉";
    } else if (computerRank === 21) {
      gameMode = "Start game";
      output = "Computer has 21! Computer wins! 😢";
    } else {
      gameMode = "Player's turn";
      output =
        showPlayerAndComputerHands(playerHand, computerHand) +
        `<br><br>🙋‍♂️Player's total points : ${playerRank}` +
        `<br>🤖Computer's points : ${computerRank}` +
        "<br><br>";
      output += "Type 'hit' to draw another card or 'stand' to end your turn.";
    }
  } else if (gameMode === "Player's turn") {
    if (input.toLowerCase() === "hit") {
      playerHand.push(deck.pop());

      const playerRank = calculateHandRank(playerHand);

      if (playerRank > 21) {
        gameMode = "Start game";
        output =
          showPlayerAndComputerHands(playerHand, computerHand) +
          `<br><br>🙋‍♂️Player's total points : ${playerRank}` +
          `<br>🤖Computer's points : ${calculateHandRank(computerHand)}` +
          "<br><br>";
        output += "Player busts! Computer wins! 😢";
      } else if (playerRank === 21) {
        gameMode = "Computer's turn";
        output =
          showPlayerAndComputerHands(playerHand, computerHand) +
          `<br><br>🙋‍♂️Player's total points : ${playerRank}` +
          `<br>🤖Computer's points : ${calculateHandRank(computerHand)}` +
          "<br><br>";
        output += "Player has 21. It's now the computer's turn.";
      } else {
        output =
          showPlayerAndComputerHands(playerHand, computerHand) +
          `<br><br>🙋‍♂️Player's total points : ${playerRank}` +
          `<br>🤖Computer's points : ${calculateHandRank(computerHand)}` +
          "<br><br>";
        output +=
          "Type 'hit' to draw another card or 'stand' to end your turn.";
      }
    } else if (input.toLowerCase() === "stand") {
      gameMode = "Computer's turn";
      output = "🙋‍♂️Player stands. It's now the computer's turn.";
      return output;
    } else {
      output =
        "Invalid input. Type 'hit' to draw another card or 'stand' to end your turn.";
    }
  } else if (gameMode === "Computer's turn") {
    let computerRank = calculateHandRank(computerHand);

    while (computerRank < 17) {
      computerHand.push(deck.pop());
      computerRank = calculateHandRank(computerHand);
    }

    const playerRank = calculateHandRank(playerHand);

    if (computerRank > 21) {
      gameMode = "Start game";
      output =
        showPlayerAndComputerHands(playerHand, computerHand) +
        `<br><br>🙋‍♂️Player's total points : ${playerRank}` +
        `<br>🤖Computer's points : ${computerRank}` +
        "<br><br>";
      output += "Computer busts! Player wins! 🎉";
    } else {
      gameMode = "Start game";
      output =
        showPlayerAndComputerHands(playerHand, computerHand) +
        `<br><br>🙋‍♂️Player's Total points : ${playerRank}` +
        `<br>🤖Computer's Total points : ${computerRank}` +
        "<br><br>";

      if (playerRank === computerRank) {
        output += "It's a tie! Play again!";
      } else if (playerRank > computerRank) {
        output += "Player wins! 🎉";
      } else {
        output += "Computer wins! 😢";
      }
    }
  }

  return output;
};
