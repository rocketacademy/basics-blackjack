// --- Base + Comfortable ---
// Initialize global variables
const WINNING_SCORE = 21;
const PROGRAM_STATE_INITIAL_ROUND = "PROGRAM_STATE_INITIAL_ROUND";
const PROGRAM_STATE_CHOOSE_HIT_OR_STAND = "PROGRAM_STATE_CHOOSE_HIT_OR_STAND";
let programState = PROGRAM_STATE_INITIAL_ROUND;
let shuffledBlackjackDeck = [];
let playerCards = [];
let pcCards = [];
let playerScore = 0;
let pcScore = 0;
let didPlayerStand = false;

// --- Helper functions ---
// --- The term 'user' is explicitly used to refer to either player or pc ---

// Function to make an ordinary deck
const createDeck = function () {
  const deck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
    let currentSuit = suits[suitIndex];
    for (let rankIndex = 1; rankIndex <= 13; rankIndex++) {
      let cardName = rankIndex;
      if (rankIndex === 1) {
        cardName = "Ace";
      } else if (rankIndex === 11) {
        cardName = "Jack";
      } else if (rankIndex === 12) {
        cardName = "Queen";
      } else if (rankIndex === 13) {
        cardName = "King";
      }
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankIndex,
      };
      deck.push(card);
    }
  }
  return deck;
};

// Functions to shuffle the ordinary deck
const getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};
const shuffleDeck = function (deck) {
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex++) {
    let currentCard = deck[currentIndex];
    let randomIndex = getRandomNumber(deck.length);
    let randomCard = deck[randomIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
};

// Function to modify the ordinary deck to blackjack deck
const createBlackjackDeck = function (deckShuffled) {
  for (let i = 0; i < deckShuffled.length; i++)
    // Update card ranks of jack, queen, and king
    if (
      deckShuffled[i].rank === 11 ||
      deckShuffled[i].rank === 12 ||
      deckShuffled[i].rank === 13
    ) {
      deckShuffled[i].rank = 10;
    }
    // Update card rank of ace
    else if (deckShuffled[i].rank === 1) {
      deckShuffled[i].rank = 11;
    }
  return deckShuffled;
};

// Function to update the emoji from the shuffledBlackjackDeck as both players are drawing cards from that deck
const updateEmoji = function (blackjackDeckShuffled) {
  const heartsImage =
    '<img src="assets/heart-love.gif" width="18px" style="display: inline-block; vertical-align: middle;;"/>';
  const diamondsImage =
    '<img src="assets/diamond.png" width="15px" style="display: inline-block; vertical-align: middle;;"/>';
  for (let i = 0; i < blackjackDeckShuffled.length; i++) {
    if (blackjackDeckShuffled[i].suit === "hearts") {
      blackjackDeckShuffled[i].suit = heartsImage;
    } else if (blackjackDeckShuffled[i].suit === "diamonds") {
      blackjackDeckShuffled[i].suit = diamondsImage;
    } else if (blackjackDeckShuffled[i].suit === "clubs") {
      blackjackDeckShuffled[i].suit = "♣️";
    } else if (blackjackDeckShuffled[i].suit === "spades") {
      blackjackDeckShuffled[i].suit = "♠️";
    }
  }
};

// Function to draw multiple random cards
const drawCards = function (cardCount, userCards, blackjackDeckShuffled) {
  for (let i = 0; i < cardCount; i++) {
    userCards.push(blackjackDeckShuffled.pop());
  }
  return userCards;
};

// Function to calculate each user's scores, i.e. sum of all their card values
const calculateScores = function (userCards) {
  // Initialize sum to be 0
  let sum = 0;
  // Loop through the user card values and increment the sum by each of the card values
  for (let i = 0; i < userCards.length; i++) {
    sum += userCards[i].rank;
  }

  // Loop through the user cards to check if there is any ace card and if the sum from the previous loop is > 21, if so, reduce sum by 10 for each ace until the sum is <= 21. Examples are available the bottom of this file.
  // Put it simply, reduce the sum by 10 only if the ace card causes the user to be busted
  for (let j = 0; j < userCards.length; j++) {
    if (userCards[j].rank === 11 && sum > 21) {
      sum -= 10;
    }
  }

  return sum;
};

// Function to show all the cards each user draws
const getAllCardsInfo = function (userCards) {
  let userCardsInfo = "";
  for (i = 0; i < userCards.length; i++) {
    userCardsInfo += `${userCards[i].name} of ${userCards[i].suit} <br>`;
  }
  return userCardsInfo;
};

// Function to compare scores
const compareScores = function (playerCards, pcCards, playerScore, pcScore) {
  // Initialize a string to store result info which will be combined with the standard output message later
  let result = `<br> Press Submit to replay.`;

  // --- Blackjack win ---
  // If both players have blackjack
  if (
    playerScore === WINNING_SCORE &&
    playerCards.length === 2 &&
    pcScore === WINNING_SCORE &&
    pcCards.length === 2
  ) {
    result = `Both player and computer have a blackjack. It's a draw!!! ${result}`;
  } else if (
    // If only pc has blackjack
    pcScore === WINNING_SCORE &&
    pcCards.length === 2
  ) {
    result = `Computer has a blackjack. Computer wins!!! ${result}`;
  } else if (
    // If only player has blackjack
    playerScore === WINNING_SCORE &&
    playerCards.length === 2
  ) {
    result = `Player has a blackjack. Player wins!!! ${result}`;
  }

  // --- No blackjack ---
  // If both player and pc have busted
  else if (playerScore > WINNING_SCORE && pcScore > WINNING_SCORE) {
    result = `Both player and computer have busted. It's a draw!!! ${result}`;
  }
  // If only player has busted
  else if (playerScore > WINNING_SCORE) {
    result = `Player has busted and lost. Computer wins!!! ${result}`;
  }
  // If only pc has busted
  else if (pcScore > WINNING_SCORE) {
    result = `Computer has busted and lost. Player wins!!! ${result}`;
  }
  // Remaining conditions if there is no blackjack and no one has busted
  else if (playerScore > pcScore) {
    result = `Player's sum of card values is closer or equal to 21. Player wins!!! ${result}`;
  } else if (playerScore < pcScore) {
    result = `Computer's sum of card values is closer or equal to 21. Computer wins!!! ${result}`;
  } else if (playerScore === pcScore) {
    result = `Both player and computer have the same sum of card values. It's a draw!!! ${result}`;
  }

  return result;
};

// Reset function
const reset = function () {
  shuffledBlackjackDeck = [];
  playerCards = [];
  pcCards = [];
  playerScore = 0;
  pcScore = 0;
  programState = PROGRAM_STATE_INITIAL_ROUND;
  didPlayerStand = false;
};

// --- Main function ---
const main = function (input) {
  // Draw cards and calculate scores
  if (programState === PROGRAM_STATE_INITIAL_ROUND) {
    // Create a blackjackdeck from an ordinary deck only at the start
    const shuffledDeck = shuffleDeck(createDeck());
    shuffledBlackjackDeck = createBlackjackDeck(shuffledDeck);

    // Update the emoji immediately after creating the shuffledBlackjackDeck so that all card suits are updated before drawn
    updateEmoji(shuffledBlackjackDeck);

    // Each user gets 2 cards only at the start
    playerCards = drawCards(2, playerCards, shuffledBlackjackDeck);
    pcCards = drawCards(2, pcCards, shuffledBlackjackDeck);

    // Calculate each user's scores
    playerScore = calculateScores(playerCards);
    pcScore = calculateScores(pcCards);

    // --- The codes inside main function above this line will only run once until the game is reset in the end ---

    // Switch mode for user to draw more cards and update scores
    programState = PROGRAM_STATE_CHOOSE_HIT_OR_STAND;
  } else if (programState === PROGRAM_STATE_CHOOSE_HIT_OR_STAND) {
    // If player has chosen to hit and has not busted, add 1 or more cards to player and update player's score until player has chosen to stand and/ or has busted
    if (input === "h" && playerScore < WINNING_SCORE) {
      playerCards.push(shuffledBlackjackDeck.pop());

      // Update the score with value(s) of extra card(s) hit
      // Reassign with '=' instead of += below as calculateScores function calculates the sum of ALL the card values
      playerScore = calculateScores(playerCards);
    }
    // If player has chosen to stand, add 1 or more cards to pc and update pc's score until pc's score is >= 17
    // Global boolean variable below keeps track of when player has chosen to stand so that game will reset after displaying the result
    else if (input === "s") {
      didPlayerStand = true;
      while (pcScore < 17) {
        pcCards.push(shuffledBlackjackDeck.pop());
        pcScore = calculateScores(pcCards);
      }
    }
  }

  // After drawing cards and calculating all the scores, initialize a standard message displaying all cards drawn and current scores.
  const allPlayerCardsInfo = getAllCardsInfo(playerCards);
  const allPcCardsInfo = getAllCardsInfo(pcCards);
  let myOutputValue = `Player has:<br> ${allPlayerCardsInfo} with sum ${playerScore}.<br> <br> Computer has:<br>${allPcCardsInfo} with sum ${pcScore}. <br> <br>`;

  // Update the standard output message for different cases
  const resultMessage = compareScores(
    playerCards,
    pcCards,
    playerScore,
    pcScore
  );

  console.log("player: " + playerScore);
  console.log("pc: " + pcScore);

  // If someone has blackjack or player has chosen to stand, show the final result and reset the game.
  if (
    (playerScore === WINNING_SCORE && playerCards.length === 2) ||
    (pcScore === WINNING_SCORE && pcCards.length === 2) ||
    didPlayerStand
  ) {
    myOutputValue += `${resultMessage}`;
    // Reset the game in the end after the result is stored
    reset();
  }
  // If player has busted, prompt player to stand
  else if (playerScore > WINNING_SCORE) {
    myOutputValue += `Player has busted! Please enter "s" to stand, then press Submit to see the result.`;
  }
  // If player has reached 21 points, prompt player to stand
  else if (playerScore === WINNING_SCORE) {
    myOutputValue += `Player has ${WINNING_SCORE} points! Please enter "s" to stand, then press Submit to see the result.`;
  }
  // Else, in all other cases including invalid input, prompt player to enter 'h' or 's' to hit or stand
  else {
    myOutputValue += `Please enter "h" to hit or "s" to stand, then press Submit.`;
  }
  return myOutputValue;
};

// For blackjack testing:
// playerCards = [
//   { name: "queen", rank: 10, suit: "hearts" },
//   { name: "ace", rank: 11, suit: "hearts" },
// ];
// pcCards = [
//   { name: "queen", rank: 10, suit: "hearts" },
//   { name: "ace", rank: 11, suit: "hearts" },
// ];

// Examples of calculating scores involving variable ace values
/* Example 1: dealt with ace and 3 initially, followed by hitting an ace, 10, 5, then queen
  (A) Dealt with ace and 3 initially
  1st loop above: sum = 11 + 3 = 14
  2nd loop below: since sum of 14 is < 21, sum remains 14
  (B) Hit another ace (cards now are ace, 3, ace)
  1st loop above: sum = 11 + 3 + 11 = 25;
  2nd loop below: 1st iteration - since card 0 is ace and sum of 25 is > 21, sum reduces by 10 to 15; 2nd iteration - since card 1 is 3 but not ace, sum remains 15; 3rd iteration - card 2 is ace but sum of 15 is not > 21, so sum remains 15
  (C) Hit another 10 (cards now are ace, 3, ace, 10)
  1st loop above: sum = 11 + 3 + 11 + 10 = 35 
  2nd loop below: 1st iteration - since card 0 is ace and sum of 35 is > 21, sum reduces by 10 to 25; 2nd iteration - since card 1 is 3 but not ace, sum remains 25; 3rd iteration - card 2 is ace and sum of 25 is > 21, sum reduces by 10 to 15; 4th iteration - card 3 is 10 but not ace, sum remains 15
  (D) Hit another 5 (cards now are ace, 3, ace, 10, 5)
  1st loop above: sum = 11 + 3 + 11 + 10 + 5 = 40 
  2nd loop below: 1st iteration - since card 0 is ace and sum of 40 is > 21, sum reduces by 10 to 30; 2nd iteration - since card 1 is 3 but not ace, sum remains 30; 3rd iteration - card 2 is ace and sum of 30 is > 21, sum reduces by 10 to 20; 4th iteration - card 3 is 10 but not ace, sum remains 20; 5th iteration - since card 4 is 5 but not ace, sum remains 20
  (E) Hit another queen (cards now are ace, 3, ace, 10, 5, queen)
  1st loop above: sum = 11 + 3 + 11 + 10 + 5 + 10 = 50 
  2nd loop below: 1st iteration - since card 0 is ace and sum of 50 is > 21, sum reduces by 10 to 40; 2nd iteration - since card 1 is 3 but not ace, sum remains 40; 3rd iteration - card 2 is ace and sum of 40 is > 21, sum reduces by 10 to 30; 4th iteration - card 3 is 10 but not ace, sum remains 30; 5th iteration - since card 4 is 5 but not ace, sum remains 30; 6 iteration - since card 5 is queen but not ace, final sum remains 30 and busted
  */

/* Example 2: dealt with 2 aces initially, followed by hitting an ace, then ace, then ace, etc..
  (A) Dealt with 2 aces initially
  1st loop above: sum = 11 + 11 = 22
  2nd loop below: 1st iteration - since card 0 is ace and sum of 22 is > 21, sum reduces by 10 to 12; 2nd iteration - card 1 is ace but sum of 12 is not > 21, so sum remains 12
  (B) Hit another ace (cards now are ace, ace, ace)
  1st loop above: sum = 11 + 11 + 11 = 33;
  2nd loop below: 1st iteration - since card 0 is ace and sum of 33 is > 21, sum reduces by 10 to 23; 2nd iteration - since card 1 is ace and sum of 23 is > 21, sum reduces by 10 to 13; 3rd iteration - card 2 is ace but sum of 13 is not > 21, so sum remains 13
  (C) Hit another ace (cards now are ace, ace, ace, ace)
  Given the same logics, sum will increment by only 1 for each subsequent ace drawn
  */
