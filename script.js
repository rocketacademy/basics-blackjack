// --- Base game with improved interface and features of hiding dealer's 1st card and betting ---

// Initialize global variables
const WINNING_SCORE = 21;
const PROGRAM_STATE_BET = "PROGRAM_STATE_BET";
const PROGRAM_STATE_INITIAL_ROUND = "PROGRAM_STATE_INITIAL_ROUND";
const PROGRAM_STATE_CHOOSE_HIT_OR_STAND = "PROGRAM_STATE_CHOOSE_HIT_OR_STAND";
let programState = PROGRAM_STATE_BET;
let deck = [];
let playerCards = [];
let pcCards = [];
let playerScore = 0;
let pcScore = 0;
let didPlayerStand = false;
let availableBettingPoints = 100;
let playerBet = 0;
let highestPointRecord = 0;

// --- Helper functions ---

// Function to make a blackjack deck
const createDeck = function () {
  // Create an empty deck
  const deck = [];
  // Create card suits emoji
  // Emoji for hearts and diamonds are represented by colored images
  const heartsEmoji =
    '<img src="assets/heart-love.gif" width="18px" style="display: inline-block; vertical-align: middle;"/>';
  const diamondsEmoji =
    '<img src="assets/diamond.png" width="15px" style="display: inline-block; vertical-align: middle;"/>';
  const suits = [heartsEmoji, diamondsEmoji, "♣️", "♠️"];
  // Outer loop for each of the 4 suits
  for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
    let currentSuit = suits[suitIndex];
    // Inner loop for each of the 13 ranks
    for (let rankIndex = 1; rankIndex <= 13; rankIndex++) {
      // Card names being the card ranks except for face cards
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
      // Create a single card object
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankIndex,
      };
      // If the card is jack, queen, king, or ace, update the card values in accordance to blackjack rules
      // Ace is 11 by default and another function will account for ace being counted as 1
      if (card.rank === 11 || card.rank === 12 || card.rank === 13) {
        card.rank = 10;
      } else if (card.rank === 1) {
        card.rank = 11;
      }
      // Push card object to deck array
      deck.push(card);
    }
  }
  return deck;
};

// Functions to shuffle the deck
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

// --- The term 'user' is explicitly used to refer to either player or pc ---

// Function to draw multiple random cards
const drawCards = function (cardCount, userCards, deck) {
  for (let i = 0; i < cardCount; i++) {
    userCards.push(deck.pop());
  }
  return userCards;
};

// Function to calculate each user's scores, i.e. sum of all their card values
const calculateScores = function (userCards) {
  // Initialize sum to 0
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
    userCardsInfo += `<em>${userCards[i].name}</em> of ${userCards[i].suit},   `;
  }
  return userCardsInfo;
};

// Function to compare scores
const compareScores = function (
  playerCards,
  pcCards,
  playerScore,
  pcScore,
  WINNING_SCORE
) {
  // Initialize a string to store result info which will be combined with the standard output message later
  let result = `<hr> Please drag the slider to bet and press Play to replay.`;

  // Gif for win cases
  const winGif = '<img src="assets/cat.gif"/>';

  // --- Blackjack win ---
  // If both players have blackjack
  if (
    playerScore === WINNING_SCORE &&
    playerCards.length === 2 &&
    pcScore === WINNING_SCORE &&
    pcCards.length === 2
  ) {
    result = `Both you and computer have a blackjack. It's a draw!!! ${result}`;
  } else if (
    // If only pc has blackjack
    pcScore === WINNING_SCORE &&
    pcCards.length === 2
  ) {
    result = `Computer has a blackjack. You lost!!! ${result}`;
  } else if (
    // If only player has blackjack
    playerScore === WINNING_SCORE &&
    playerCards.length === 2
  ) {
    result = `You have a blackjack. You win!!! ${winGif} ${result}`;
  }

  // --- No blackjack ---
  // If both player and pc have busted
  else if (playerScore > WINNING_SCORE && pcScore > WINNING_SCORE) {
    result = `Both you and computer have busted. It's a draw!!! ${result}`;
  }
  // If only player has busted
  else if (playerScore > WINNING_SCORE) {
    result = `You have busted and lost!!! ${result}`;
  }
  // If only pc has busted
  else if (pcScore > WINNING_SCORE) {
    result = `Computer has busted and lost. You win!!! ${winGif} ${result}`;
  }
  // Remaining conditions if there is no blackjack and no one has busted
  else if (playerScore > pcScore) {
    result = `Your sum of card values is closer or equal to 21. You win!!! ${winGif} ${result}`;
  } else if (playerScore < pcScore) {
    result = `Computer's sum of card values is closer or equal to 21. You lost!!! ${result}`;
  } else if (playerScore === pcScore) {
    result = `Both you and computer have the same sum of card values. It's a draw!!! ${result}`;
  }

  return result;
};

// Function to calculate betting points balance left each round
/* 
Player wins by blackjack - gets back original bet + 1.5x of original bet
Player wins normally - gets back original bet + original bet
Player loses - forfeits original bet
Draw - gets back original bet
*/

const calculateBettingPoints = function (
  availableBettingPoints,
  playerBet,
  playerCards,
  pcCards,
  playerScore,
  pcScore,
  WINNING_SCORE
) {
  // --- Blackjack win ---
  // If both players have blackjack
  if (
    playerScore === WINNING_SCORE &&
    playerCards.length === 2 &&
    pcScore === WINNING_SCORE &&
    pcCards.length === 2
  ) {
    availableBettingPoints = availableBettingPoints;
  } else if (
    // If only pc has blackjack
    pcScore === WINNING_SCORE &&
    pcCards.length === 2
  ) {
    availableBettingPoints -= playerBet;
  } else if (
    // If only player has blackjack
    playerScore === WINNING_SCORE &&
    playerCards.length === 2
  ) {
    availableBettingPoints += playerBet * 1.5;
  }

  // --- No blackjack ---
  // If both player and pc have busted
  else if (playerScore > WINNING_SCORE && pcScore > WINNING_SCORE) {
    availableBettingPoints = availableBettingPoints;
  }
  // If only player has busted
  else if (playerScore > WINNING_SCORE) {
    availableBettingPoints -= playerBet;
  }
  // If only pc has busted
  else if (pcScore > WINNING_SCORE) {
    availableBettingPoints += playerBet;
  }
  // Remaining conditions if there is no blackjack and no one has busted
  else if (playerScore > pcScore) {
    availableBettingPoints += playerBet;
  } else if (playerScore < pcScore) {
    availableBettingPoints -= playerBet;
  } else if (playerScore === pcScore) {
    availableBettingPoints = availableBettingPoints;
  }
  return availableBettingPoints;
};

// Function to update highest record of betting points
const updateHighestRecord = function (availableBettingPoints) {
  if (highestPointRecord < availableBettingPoints) {
    highestPointRecord = availableBettingPoints;
  }

  return highestPointRecord;
};

// Function to reset game
const reset = function () {
  deck = [];
  playerCards = [];
  pcCards = [];
  playerScore = 0;
  pcScore = 0;
  programState = PROGRAM_STATE_BET;
  didPlayerStand = false;
};

// --- Main function ---
const main = function (input) {
  // Prompt player to bet
  if (programState === PROGRAM_STATE_BET) {
    // if (!input) {
    //   return `Please enter number of points to bet from 1 to ${availableBettingPoints} and press Submit.`;
    // } else if (Number.isNaN(Number(input))) {
    //   return `Invalid input! Please enter number of points to bet from 1 to ${availableBettingPoints} and press Submit.`;
    // } else if (Number(input) > availableBettingPoints) {
    //   return `Number is out of range! Please enter number of points to bet from 1 to ${availableBettingPoints} and press Submit.`;
    // } else {
    //   playerBet = Number(input);

    // Add an event listener for when the slider value changes
    slider.addEventListener("input", function () {
      // Get the current value of the slider
      const value = Number(slider.value);

      // Reset the slider max value when the game restarts with 100 points
      if (availableBettingPoints === 100) {
        slider.max = 100;
      } // Set the maximum value of the slider based on the betting points left in each round
      else {
        slider.max = availableBettingPoints;
      }
    });
    playerBet = Number(slider.value);
    // Input validation
    if (playerBet > availableBettingPoints) {
      return `Your amount is out of range! Please drag the slider to bet from 1 to ${availableBettingPoints} and press Play.`;
    }

    programState = PROGRAM_STATE_INITIAL_ROUND;
    // }
  }

  console.log("INITIAL availableBettingPoints: " + availableBettingPoints);
  console.log("playerBet: " + playerBet);

  // Initial round of dealing cards and calculating scores
  if (programState === PROGRAM_STATE_INITIAL_ROUND) {
    // Create a blackjack deck only at the start
    deck = shuffleDeck(createDeck());

    // Each user gets 2 cards only at the start
    playerCards = drawCards(2, playerCards, deck);
    pcCards = drawCards(2, pcCards, deck);

    // Calculate each user's scores
    playerScore = calculateScores(playerCards);
    pcScore = calculateScores(pcCards);

    // --- The codes inside main function above this line will only run once until the game is reset in the end ---

    // Switch mode for user to draw more cards and update scores
    playButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;

    programState = PROGRAM_STATE_CHOOSE_HIT_OR_STAND;
  } else if (programState === PROGRAM_STATE_CHOOSE_HIT_OR_STAND) {
    // If player has chosen to hit and has not busted, add 1 or more cards to player and update player's score until player has chosen to stand and/ or has busted
    if (!didPlayerStand && playerScore < WINNING_SCORE) {
      playerCards.push(deck.pop());

      // Update the score with value(s) of extra card(s) hit
      // Reassign with '=' instead of += below as calculateScores function calculates the sum of ALL the card values
      playerScore = calculateScores(playerCards);
    }
    // If player has chosen to stand, add 1 or more cards to pc and update pc's score until pc's score is >= 17
    else if (didPlayerStand) {
      while (pcScore < 17) {
        pcCards.push(deck.pop());
        pcScore = calculateScores(pcCards);
      }
    }
  }

  // After drawing cards and calculating all the scores, initialize a standard message displaying player's cards drawn, one of the pc's card drawn and player's score.
  const allPlayerCardsInfo = getAllCardsInfo(playerCards);
  let myOutputValue = `You bet ${playerBet} points. <br> <br> You have:<br> ${allPlayerCardsInfo} with sum of <em>${playerScore}</em>.<br> <br> Computer has:<br> <em> ${pcCards[0].name} </em> of ${pcCards[0].suit} and a <em> hidden card</em>. <br><br>`;

  // Update the standard output message for different cases
  const resultMessage = compareScores(
    playerCards,
    pcCards,
    playerScore,
    pcScore,
    WINNING_SCORE
  );

  // Get all pc's cards
  const allPcCardsInfo = getAllCardsInfo(pcCards);

  // If someone has blackjack or player has chosen to stand, show the final result and reset the game.
  if (
    (playerScore === WINNING_SCORE && playerCards.length === 2) ||
    (pcScore === WINNING_SCORE && pcCards.length === 2) ||
    didPlayerStand
  ) {
    // Update betting points balance left
    availableBettingPoints = calculateBettingPoints(
      availableBettingPoints,
      playerBet,
      playerCards,
      pcCards,
      playerScore,
      pcScore,
      WINNING_SCORE
    );

    // Update high score
    highestPointRecord = updateHighestRecord(availableBettingPoints);

    playButton.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;

    console.log("FINAL availableBettingPoints: " + availableBettingPoints);
    // Main output message when the game ends
    myOutputValue = `You bet ${playerBet} points. <br> <br> You have:<br> ${allPlayerCardsInfo} with sum of <em>${playerScore}</em>.<br> <br> Computer has:<br> ${allPcCardsInfo} with sum of <em>${pcScore}</em>. <br> <br> ${resultMessage} <br> You have ${availableBettingPoints} points now. <br> <br> 🎆 HIGHEST RECORD: ${highestPointRecord} points 🎆`;

    // When betting points are running out, reset the betting points
    if (availableBettingPoints <= 0) {
      myOutputValue = `You bet ${playerBet} points. <br> <br> You have:<br> ${allPlayerCardsInfo} with sum of <em>${playerScore}</em>.<br> <br> Computer has:<br> ${allPcCardsInfo} with sum of <em>${pcScore}</em>. <br> <br> ${resultMessage} <br> You have ${availableBettingPoints} points now. <br> Game will restart from 100 points. <br> <br> 🎆 HIGHEST RECORD: ${highestPointRecord} points 🎆`;
      availableBettingPoints = 100;
    }

    // Reset the game in the end while having the value of available betting points persisted
    reset();
  }

  // If player has busted, prompt player to stand
  else if (playerScore > WINNING_SCORE) {
    myOutputValue += `You have busted! Please press Stand to see the result.`;
  }
  // If player has reached 21 points, prompt player to stand
  else if (playerScore === WINNING_SCORE) {
    myOutputValue += `You cards sum up to ${WINNING_SCORE}! Please press Stand to see the result.`;
  }
  // Else, in all other cases, prompt player to hit or stand
  else {
    myOutputValue += `Please press Hit to draw more card or press Stand to end your turn.`;
  }
  return myOutputValue;
};

/*
For blackjack testing:
playerCards = [
  { name: "queen", rank: 10, suit: "hearts" },
  { name: "ace", rank: 11, suit: "hearts" },
];
pcCards = [
  { name: "queen", rank: 10, suit: "hearts" },
  { name: "ace", rank: 11, suit: "hearts" },
];
*/

/* 
Examples of calculating scores involving variable ace values
Example 1: dealt with ace and 3 initially, followed by hitting an ace, 10, 5, then queen
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

Example 2: dealt with 2 aces initially, followed by hitting an ace, then ace, then ace, etc..
(A) Dealt with 2 aces initially
1st loop above: sum = 11 + 11 = 22
2nd loop below: 1st iteration - since card 0 is ace and sum of 22 is > 21, sum reduces by 10 to 12; 2nd iteration - card 1 is ace but sum of 12 is not > 21, so sum remains 12
(B) Hit another ace (cards now are ace, ace, ace)
1st loop above: sum = 11 + 11 + 11 = 33;
2nd loop below: 1st iteration - since card 0 is ace and sum of 33 is > 21, sum reduces by 10 to 23; 2nd iteration - since card 1 is ace and sum of 23 is > 21, sum reduces by 10 to 13; 3rd iteration - card 2 is ace but sum of 13 is not > 21, so sum remains 13
(C) Hit another ace (cards now are ace, ace, ace, ace)
Given the same logics, sum will increment by only 1 for each subsequent ace drawn
*/

// // --- Base + Comfortable ---
// // Initialize global variables
// const WINNING_SCORE = 21;
// const PROGRAM_STATE_INITIAL_ROUND = "PROGRAM_STATE_INITIAL_ROUND";
// const PROGRAM_STATE_CHOOSE_HIT_OR_STAND = "PROGRAM_STATE_CHOOSE_HIT_OR_STAND";
// let programState = PROGRAM_STATE_INITIAL_ROUND;
// let deck = [];
// let playerCards = [];
// let pcCards = [];
// let playerScore = 0;
// let pcScore = 0;
// let didPlayerStand = false;

// // --- Helper functions ---

// // Function to make a blackjack deck
// const createDeck = function () {
//   // Create an empty deck
//   const deck = [];
//   // Create card suits emoji
//   // Emoji for hearts and diamonds are represented by colored images
//   const heartsEmoji =
//     '<img src="assets/heart-love.gif" width="18px" style="display: inline-block; vertical-align: middle;;"/>';
//   const diamondsEmoji =
//     '<img src="assets/diamond.png" width="15px" style="display: inline-block; vertical-align: middle;;"/>';
//   const suits = [heartsEmoji, diamondsEmoji, "♣️", "♠️"];
//   // Outer loop for each of the 4 suits
//   for (let suitIndex = 0; suitIndex < 4; suitIndex++) {
//     let currentSuit = suits[suitIndex];
//     // Inner loop for each of the 13 ranks
//     for (let rankIndex = 1; rankIndex <= 13; rankIndex++) {
//       // Card names being the card ranks except for face cards
//       let cardName = rankIndex;
//       if (rankIndex === 1) {
//         cardName = "Ace";
//       } else if (rankIndex === 11) {
//         cardName = "Jack";
//       } else if (rankIndex === 12) {
//         cardName = "Queen";
//       } else if (rankIndex === 13) {
//         cardName = "King";
//       }
//       // Create a single card object
//       const card = {
//         name: cardName,
//         suit: currentSuit,
//         rank: rankIndex,
//       };
//       // If the card is jack, queen, king, or ace, update the card values in accordance to blackjack rules
//       // Ace is 11 by default and another function will account for ace being counted as 1
//       if (card.rank === 11 || card.rank === 12 || card.rank === 13) {
//         card.rank = 10;
//       } else if (card.rank === 1) {
//         card.rank = 11;
//       }
//       // Push card object to deck array
//       deck.push(card);
//     }
//   }
//   return deck;
// };

// // Functions to shuffle the deck
// const getRandomNumber = function (max) {
//   return Math.floor(Math.random() * max);
// };
// const shuffleDeck = function (deck) {
//   for (let currentIndex = 0; currentIndex < deck.length; currentIndex++) {
//     let currentCard = deck[currentIndex];
//     let randomIndex = getRandomNumber(deck.length);
//     let randomCard = deck[randomIndex];
//     deck[currentIndex] = randomCard;
//     deck[randomIndex] = currentCard;
//   }
//   return deck;
// };

// // --- The term 'user' is explicitly used to refer to either player or pc ---

// // Function to draw multiple random cards
// const drawCards = function (cardCount, userCards, deck) {
//   for (let i = 0; i < cardCount; i++) {
//     userCards.push(deck.pop());
//   }
//   return userCards;
// };

// // Function to calculate each user's scores, i.e. sum of all their card values
// const calculateScores = function (userCards) {
//   // Initialize sum to 0
//   let sum = 0;
//   // Loop through the user card values and increment the sum by each of the card values
//   for (let i = 0; i < userCards.length; i++) {
//     sum += userCards[i].rank;
//   }

//   // Loop through the user cards to check if there is any ace card and if the sum from the previous loop is > 21, if so, reduce sum by 10 for each ace until the sum is <= 21. Examples are available the bottom of this file.
//   // Put it simply, reduce the sum by 10 only if the ace card causes the user to be busted
//   for (let j = 0; j < userCards.length; j++) {
//     if (userCards[j].rank === 11 && sum > 21) {
//       sum -= 10;
//     }
//   }
//   return sum;
// };

// // Function to show all the cards each user draws
// const getAllCardsInfo = function (userCards) {
//   let userCardsInfo = "";
//   for (i = 0; i < userCards.length; i++) {
//     userCardsInfo += `${userCards[i].name} of ${userCards[i].suit} <br>`;
//   }
//   return userCardsInfo;
// };

// // Function to compare scores
// const compareScores = function (playerCards, pcCards, playerScore, pcScore) {
//   // Initialize a string to store result info which will be combined with the standard output message later
//   let result = `<br> Press Submit to replay.`;

//   // --- Blackjack win ---
//   // If both players have blackjack
//   if (
//     playerScore === WINNING_SCORE &&
//     playerCards.length === 2 &&
//     pcScore === WINNING_SCORE &&
//     pcCards.length === 2
//   ) {
//     result = `Both player and computer have a blackjack. It's a draw!!! ${result}`;
//   } else if (
//     // If only pc has blackjack
//     pcScore === WINNING_SCORE &&
//     pcCards.length === 2
//   ) {
//     result = `Computer has a blackjack. Computer wins!!! ${result}`;
//   } else if (
//     // If only player has blackjack
//     playerScore === WINNING_SCORE &&
//     playerCards.length === 2
//   ) {
//     result = `Player has a blackjack. Player wins!!! ${result}`;
//   }

//   // --- No blackjack ---
//   // If both player and pc have busted
//   else if (playerScore > WINNING_SCORE && pcScore > WINNING_SCORE) {
//     result = `Both player and computer have busted. It's a draw!!! ${result}`;
//   }
//   // If only player has busted
//   else if (playerScore > WINNING_SCORE) {
//     result = `Player has busted and lost. Computer wins!!! ${result}`;
//   }
//   // If only pc has busted
//   else if (pcScore > WINNING_SCORE) {
//     result = `Computer has busted and lost. Player wins!!! ${result}`;
//   }
//   // Remaining conditions if there is no blackjack and no one has busted
//   else if (playerScore > pcScore) {
//     result = `Player's sum of card values is closer or equal to 21. Player wins!!! ${result}`;
//   } else if (playerScore < pcScore) {
//     result = `Computer's sum of card values is closer or equal to 21. Computer wins!!! ${result}`;
//   } else if (playerScore === pcScore) {
//     result = `Both player and computer have the same sum of card values. It's a draw!!! ${result}`;
//   }

//   return result;
// };

// // Function to reset game
// const reset = function () {
//   deck = [];
//   playerCards = [];
//   pcCards = [];
//   playerScore = 0;
//   pcScore = 0;
//   programState = PROGRAM_STATE_INITIAL_ROUND;
//   didPlayerStand = false;
// };

// // --- Main function ---
// const main = function (input) {
//   // Initial round of dealing cards and calculating scores
//   if (programState === PROGRAM_STATE_INITIAL_ROUND) {
//     // Create a blackjack deck only at the start
//     deck = shuffleDeck(createDeck());

//     // Each user gets 2 cards only at the start
//     playerCards = drawCards(2, playerCards, deck);
//     pcCards = drawCards(2, pcCards, deck);

//     // Calculate each user's scores
//     playerScore = calculateScores(playerCards);
//     pcScore = calculateScores(pcCards);

//     // --- The codes inside main function above this line will only run once until the game is reset in the end ---

//     // Switch mode for user to draw more cards and update scores
//     programState = PROGRAM_STATE_CHOOSE_HIT_OR_STAND;
//   } else if (programState === PROGRAM_STATE_CHOOSE_HIT_OR_STAND) {
//     // If player has chosen to hit and has not busted, add 1 or more cards to player and update player's score until player has chosen to stand and/ or has busted
//     if (input === "h" && playerScore < WINNING_SCORE) {
//       playerCards.push(deck.pop());

//       // Update the score with value(s) of extra card(s) hit
//       // Reassign with '=' instead of += below as calculateScores function calculates the sum of ALL the card values
//       playerScore = calculateScores(playerCards);
//     }
//     // If player has chosen to stand, add 1 or more cards to pc and update pc's score until pc's score is >= 17
//     // Global boolean variable below keeps track of when player has chosen to stand so that game will reset after displaying the result
//     else if (input === "s") {
//       didPlayerStand = true;
//       while (pcScore < 17) {
//         pcCards.push(deck.pop());
//         pcScore = calculateScores(pcCards);
//       }
//     }
//   }

//   // After drawing cards and calculating all the scores, initialize a standard message displaying all cards drawn and current scores.
//   const allPlayerCardsInfo = getAllCardsInfo(playerCards);
//   const allPcCardsInfo = getAllCardsInfo(pcCards);
//   let myOutputValue = `Player has:<br> ${allPlayerCardsInfo} with sum ${playerScore}.<br> <br> Computer has:<br>${allPcCardsInfo} with sum ${pcScore}. <br> <br>`;

//   // Update the standard output message for different cases
//   const resultMessage = compareScores(
//     playerCards,
//     pcCards,
//     playerScore,
//     pcScore
//   );

//   console.log("player: " + playerScore);
//   console.log("pc: " + pcScore);

//   // If someone has blackjack or player has chosen to stand, show the final result and reset the game.
//   if (
//     (playerScore === WINNING_SCORE && playerCards.length === 2) ||
//     (pcScore === WINNING_SCORE && pcCards.length === 2) ||
//     didPlayerStand
//   ) {
//     myOutputValue += `${resultMessage}`;
//     // Reset the game in the end after the result is stored
//     reset();
//   }
//   // If player has busted, prompt player to stand
//   else if (playerScore > WINNING_SCORE) {
//     myOutputValue += `Player has busted! Please enter "s" to stand, then press Submit to see the result.`;
//   }
//   // If player has reached 21 points, prompt player to stand
//   else if (playerScore === WINNING_SCORE) {
//     myOutputValue += `Player has ${WINNING_SCORE} points! Please enter "s" to stand, then press Submit to see the result.`;
//   }
//   // Else, in all other cases including invalid input, prompt player to enter 'h' or 's' to hit or stand
//   else {
//     myOutputValue += `Please enter "h" to hit or "s" to stand, then press Submit.`;
//   }
//   return myOutputValue;
// };

// // For blackjack testing:
// // playerCards = [
// //   { name: "queen", rank: 10, suit: "hearts" },
// //   { name: "ace", rank: 11, suit: "hearts" },
// // ];
// // pcCards = [
// //   { name: "queen", rank: 10, suit: "hearts" },
// //   { name: "ace", rank: 11, suit: "hearts" },
// // ];

// // Examples of calculating scores involving variable ace values
// /* Example 1: dealt with ace and 3 initially, followed by hitting an ace, 10, 5, then queen
//   (A) Dealt with ace and 3 initially
//   1st loop above: sum = 11 + 3 = 14
//   2nd loop below: since sum of 14 is < 21, sum remains 14
//   (B) Hit another ace (cards now are ace, 3, ace)
//   1st loop above: sum = 11 + 3 + 11 = 25;
//   2nd loop below: 1st iteration - since card 0 is ace and sum of 25 is > 21, sum reduces by 10 to 15; 2nd iteration - since card 1 is 3 but not ace, sum remains 15; 3rd iteration - card 2 is ace but sum of 15 is not > 21, so sum remains 15
//   (C) Hit another 10 (cards now are ace, 3, ace, 10)
//   1st loop above: sum = 11 + 3 + 11 + 10 = 35
//   2nd loop below: 1st iteration - since card 0 is ace and sum of 35 is > 21, sum reduces by 10 to 25; 2nd iteration - since card 1 is 3 but not ace, sum remains 25; 3rd iteration - card 2 is ace and sum of 25 is > 21, sum reduces by 10 to 15; 4th iteration - card 3 is 10 but not ace, sum remains 15
//   (D) Hit another 5 (cards now are ace, 3, ace, 10, 5)
//   1st loop above: sum = 11 + 3 + 11 + 10 + 5 = 40
//   2nd loop below: 1st iteration - since card 0 is ace and sum of 40 is > 21, sum reduces by 10 to 30; 2nd iteration - since card 1 is 3 but not ace, sum remains 30; 3rd iteration - card 2 is ace and sum of 30 is > 21, sum reduces by 10 to 20; 4th iteration - card 3 is 10 but not ace, sum remains 20; 5th iteration - since card 4 is 5 but not ace, sum remains 20
//   (E) Hit another queen (cards now are ace, 3, ace, 10, 5, queen)
//   1st loop above: sum = 11 + 3 + 11 + 10 + 5 + 10 = 50
//   2nd loop below: 1st iteration - since card 0 is ace and sum of 50 is > 21, sum reduces by 10 to 40; 2nd iteration - since card 1 is 3 but not ace, sum remains 40; 3rd iteration - card 2 is ace and sum of 40 is > 21, sum reduces by 10 to 30; 4th iteration - card 3 is 10 but not ace, sum remains 30; 5th iteration - since card 4 is 5 but not ace, sum remains 30; 6 iteration - since card 5 is queen but not ace, final sum remains 30 and busted
//   */

// /* Example 2: dealt with 2 aces initially, followed by hitting an ace, then ace, then ace, etc..
//   (A) Dealt with 2 aces initially
//   1st loop above: sum = 11 + 11 = 22
//   2nd loop below: 1st iteration - since card 0 is ace and sum of 22 is > 21, sum reduces by 10 to 12; 2nd iteration - card 1 is ace but sum of 12 is not > 21, so sum remains 12
//   (B) Hit another ace (cards now are ace, ace, ace)
//   1st loop above: sum = 11 + 11 + 11 = 33;
//   2nd loop below: 1st iteration - since card 0 is ace and sum of 33 is > 21, sum reduces by 10 to 23; 2nd iteration - since card 1 is ace and sum of 23 is > 21, sum reduces by 10 to 13; 3rd iteration - card 2 is ace but sum of 13 is not > 21, so sum remains 13
//   (C) Hit another ace (cards now are ace, ace, ace, ace)
//   Given the same logics, sum will increment by only 1 for each subsequent ace drawn
//   */
