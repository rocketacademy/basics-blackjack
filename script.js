// --- Base game with improved interface, DOM, and features of hiding dealer's 2nd card and betting ---

// --- Initialize global variables ---
const WINNING_SCORE = 21;
const PROGRAM_STATE_INITIAL_ROUND = "PROGRAM_STATE_INITIAL_ROUND";
const PROGRAM_STATE_CHOOSE_HIT_OR_STAND = "PROGRAM_STATE_CHOOSE_HIT_OR_STAND";
let programState = PROGRAM_STATE_INITIAL_ROUND;
let deck = [];
let playerCards = [];
let pcCards = [];
let playerScore = 0;
let pcScore = 0;
let didPlayerStand = false;
let availableBettingPoints = 100;
let playerBet = 0;
let highestPointsRecord = 0;

// --- Define buttons click and slider functionality ---

// All 3 buttons will return output in the same output-div element
const output = document.getElementById("output-div");

// Play button
const playButton = document.getElementById("play-button");
playButton.addEventListener("click", function () {
  // Call the main function with slider value and store the main function output in result
  const slider = document.getElementById("slider-range");
  const result = main(slider.value);

  // Display result in output-div element
  output.innerHTML = result;

  // It is more user friendly to NOT reset the slider value so that player can continue with the same bet amount without sliding
  // // Reset slider value
  // slider.value = this.value;
});

// Hit button - off when the program 1st loads
// All 3 buttons are calling the main function when clicked. Turn Hit button off at the start so it does not overlap with functionality of Play button
const hitButton = document.getElementById("hit-button");
hitButton.disabled = true;
hitButton.addEventListener("click", function () {
  output.innerHTML = main();
});

// Stand button - off when the program 1st loads
// One of the main conditions to end each round is when Stand button is clicked. Turn Stand button off at the start so the program will not trigger the main function and return the final result message without dealing cards to dealer if needed
const standButton = document.getElementById("stand-button");
standButton.disabled = true;
standButton.addEventListener("click", function () {
  didPlayerStand = true;
  output.innerHTML = main();
});

// Set up slider and its output value
const slider = document.getElementById("slider-range");
const betAmountOutput = document.getElementById("bet");
betAmountOutput.innerHTML = slider.value; // Display the current slider value

// Update the current slider value (each time the slider handle is dragged)
slider.oninput = function () {
  betAmountOutput.innerHTML = this.value;
};

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

// Functions to make a shuffled blackjack deck
const getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};
const shuffleDeck = function (deck) {
  // Loop through the entire deck
  for (let currentIndex = 0; currentIndex < deck.length; currentIndex++) {
    // Get the current card
    let currentCard = deck[currentIndex];
    // Get a random index number
    let randomIndex = getRandomNumber(deck.length);
    // Get a random card
    let randomCard = deck[randomIndex];
    // Swap the random card with the current card
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  return deck;
};

// --- The term 'user' is explicitly used to refer to either player or pc ---

// Function to draw multiple random cards
const drawCards = function (cardCount, userCards, deck) {
  for (let i = 0; i < cardCount; i++) {
    // Remove card object from the deck and push it to another array of player or pc's cards
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
  // Put it simply, reduce the sum by 10 only if the ace card causes the user to be busted. Ace is counted as 1 instead of 11 in that case
  for (let j = 0; j < userCards.length; j++) {
    if (userCards[j].rank === 11 && sum > 21) {
      sum -= 10;
    }
  }
  return sum;
};

// Function to show all the cards each user draws in a one line sentence
const getAllCardsInfo = function (userCards) {
  // Initialize a string to hold each user's cards info
  let userCardsInfo = "";
  for (i = 0; i < userCards.length; i++) {
    // Update the string by each card name and suit
    userCardsInfo += `<em>${userCards[i].name}</em> of ${userCards[i].suit},   `;
  }
  return userCardsInfo;
};

// Function to analyze winning conditions and generate result output message
// First check the strictest condition, i.e. if there is any immediate win by blackjack , then check if anyone has busted, then check the remaining normal conditions
const getResult = function (
  playerCards,
  pcCards,
  playerScore,
  pcScore,
  WINNING_SCORE
) {
  // Initialize a string to store result info which will be combined with the standard output message later
  let result = `<hr> Please drag the slider to bet and press Play to continue playing.`;

  // Video for winning conditions
  const winningVideo =
    '<video autoplay loop style="display: block; margin: 0 auto; max-width: 50%; height: 300px;"> <source src="assets/cat.mp4" type="video/mp4" /> </video>';

  // --- Blackjack win ---
  // If both player and pc have blackjack, i.e. 2 cards on hand with sum of 21
  if (
    playerScore === WINNING_SCORE &&
    playerCards.length === 2 &&
    pcScore === WINNING_SCORE &&
    pcCards.length === 2
  ) {
    result = `Both you and computer have a blackjack. It's a push!!! ${result}`;
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
    result = `You have a blackjack. You win!!! ${winningVideo} ${result}`;
  }

  // --- No blackjack ---
  // If both player and pc have busted
  else if (playerScore > WINNING_SCORE && pcScore > WINNING_SCORE) {
    result = `Both you and computer have busted. It's a tie!!! ${result}`;
  }
  // If only player has busted
  else if (playerScore > WINNING_SCORE) {
    result = `You have busted and lost!!! ${result}`;
  }
  // If only pc has busted
  else if (pcScore > WINNING_SCORE) {
    result = `Computer has busted and lost. You win!!! ${winningVideo} ${result}`;
  }
  // Remaining conditions if there is no blackjack and no one has busted
  else if (playerScore > pcScore) {
    result = `Your sum of card values is closer or equal to 21. You win!!!${winningVideo} ${result}`;
  } else if (playerScore < pcScore) {
    result = `Computer's sum of card values is closer or equal to 21. You lost!!! ${result}`;
  } else if (playerScore === pcScore) {
    result = `Both you and computer have the same sum of card values. It's a push!!! ${result}`;
  }

  return result;
};

// Function to calculate the remaining betting points balance each round, on the basis that player bet is NOT deducted from the initial available betting points for easier calculations
// The following calculations apply only if player bet is NOT deducted from the initial available betting points
// Different calculations apply if player bet IS deducted from the initial balance
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
  // Draw - player gets back amount bet or the balance remains the same
  if (
    playerScore === WINNING_SCORE &&
    playerCards.length === 2 &&
    pcScore === WINNING_SCORE &&
    pcCards.length === 2
  ) {
    availableBettingPoints = availableBettingPoints;
  } else if (
    // If only pc has blackjack
    // Player loses - forfeits amount bet
    pcScore === WINNING_SCORE &&
    pcCards.length === 2
  ) {
    availableBettingPoints -= playerBet;
  } else if (
    // If only player has blackjack
    // Player wins by blackjack - gets back amount bet + 1.5x of amount bet
    playerScore === WINNING_SCORE &&
    playerCards.length === 2
  ) {
    availableBettingPoints += playerBet * 1.5;
  }

  // --- No blackjack ---
  // If both player and pc have busted
  // Draw - player gets back amount bet or the balance remains the same
  else if (playerScore > WINNING_SCORE && pcScore > WINNING_SCORE) {
    availableBettingPoints = availableBettingPoints;
  }
  // If only player has busted
  // Player loses - forfeits amount bet
  else if (playerScore > WINNING_SCORE) {
    availableBettingPoints -= playerBet;
  }
  // If only pc has busted
  // Player wins normally - gets back amount bet + amount bet
  else if (pcScore > WINNING_SCORE) {
    availableBettingPoints += playerBet;
  }
  // Remaining conditions if there is no blackjack and no one has busted
  // Player wins normally - gets back amount bet + amount bet
  else if (playerScore > pcScore) {
    availableBettingPoints += playerBet;
  }
  // Player loses - forfeits amount bet
  else if (playerScore < pcScore) {
    availableBettingPoints -= playerBet;
  }
  // Draw - player gets back amount bet or the balance remains the same
  else if (playerScore === pcScore) {
    availableBettingPoints = availableBettingPoints;
  }
  return availableBettingPoints;
};

// Function to update highest record of betting points
const updateHighestPointsRecord = function (availableBettingPoints) {
  if (highestPointsRecord < availableBettingPoints) {
    highestPointsRecord = availableBettingPoints;
  }
  return highestPointsRecord;
};

// Function to allow multiple rounds without refreshing browser
const reset = function () {
  deck = [];
  playerCards = [];
  pcCards = [];
  playerScore = 0;
  pcScore = 0;
  programState = PROGRAM_STATE_INITIAL_ROUND;
  didPlayerStand = false;
};

// --- Main game logic ---
const main = function (input) {
  if (programState === PROGRAM_STATE_INITIAL_ROUND) {
    // --- Prompt player to bet ---

    // Wait for the player to drag the slider and set the max slider value
    slider.addEventListener("input", function () {
      // Reset the slider max value to 100 when the game restarts with 100 points
      if (availableBettingPoints === 100) {
        slider.max = 100;
      }
      // If the game is still running, set the maximum value of the slider based on the betting points left in each round
      else {
        slider.max = availableBettingPoints;
      }
    });

    // After getting the player's input, store the slider value, which is initally a string, to playerBet
    // Player bet is NOT deducted from the initial available betting points for easier calculations of the final balance
    playerBet = Number(slider.value);

    // If player's input is more than the max slider value set earlier
    if (playerBet > availableBettingPoints) {
      return `Your amount is out of range! Please drag the slider to bet from 1 to ${availableBettingPoints} and press Play.`;
    }

    // --- After player has bet, deal 2 cards to each player and calculate their initial scores ---

    // Create a blackjack deck only at the start of each round
    deck = shuffleDeck(createDeck());

    // Each user gets 2 cards only at the start of each round
    playerCards = drawCards(2, playerCards, deck);
    pcCards = drawCards(2, pcCards, deck);

    // Calculate each user's initial scores
    playerScore = calculateScores(playerCards);
    pcScore = calculateScores(pcCards);

    // Turn Play button off while the other buttons on for the next mode - also to avoid both Play and Hit buttons having overlapped functionality as clicking them will both run the main function and return the same final output when clicked
    playButton.disabled = true;
    hitButton.disabled = false;
    standButton.disabled = false;

    // Switch mode for user to draw more cards and update scores if there is no blackjack win
    programState = PROGRAM_STATE_CHOOSE_HIT_OR_STAND;

    // --- The codes inside main function above this line will only run once until the game is reset in the end ---
  } else if (programState === PROGRAM_STATE_CHOOSE_HIT_OR_STAND) {
    // If player has chosen to hit and has not busted, add 1 or more cards to player and update player's score until player has chosen to stand and/ or has busted
    if (!didPlayerStand && playerScore < WINNING_SCORE) {
      playerCards.push(deck.pop());

      // Update player's score including the value(s) of extra card(s) hit
      // Reassign with '=' instead of increment by '+=' below as calculateScores function calculates the sum of ALL the card values
      playerScore = calculateScores(playerCards);
    }
    // If player has chosen to stand, add 1 or more cards to pc and update pc's score until pc's score is >= 17
    else if (didPlayerStand) {
      const pcMinScoreToStand = 17;
      while (pcScore < pcMinScoreToStand) {
        pcCards.push(deck.pop());
        pcScore = calculateScores(pcCards);
      }
    }
  }

  // --- The codes below this line will always run regardless of program state, allowing for immediate win by blackjack to happen ---

  // After drawing cards and calculating all the scores, initialize a standard output message displaying all player's cards, pc's 1st card and player's score.
  const allPlayerCardsInfo = getAllCardsInfo(playerCards);
  let myOutputValue = `You bet ${playerBet} points. <br> <br> You have:<br> ${allPlayerCardsInfo} with sum of <em>${playerScore}</em>.<br> <br> Computer has:<br> <em> ${pcCards[0].name} </em> of ${pcCards[0].suit} and a <em> hidden card</em>. <br><br>`;

  // Get the result info for different cases (blackjack, busted or normal) to be displayed later
  const resultMessage = getResult(
    playerCards,
    pcCards,
    playerScore,
    pcScore,
    WINNING_SCORE
  );

  // Get all pc's cards info to be displayed later
  const allPcCardsInfo = getAllCardsInfo(pcCards);

  // --- If someone has blackjack or player has chosen to stand, end and reset the game for the next round. ---
  if (
    (playerScore === WINNING_SCORE && playerCards.length === 2) ||
    (pcScore === WINNING_SCORE && pcCards.length === 2) ||
    didPlayerStand
  ) {
    // Update betting points balance left at the end of each round
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
    highestPointsRecord = updateHighestPointsRecord(availableBettingPoints);

    // Turn Play button on while the other buttons off
    playButton.disabled = false;
    hitButton.disabled = true;
    standButton.disabled = true;

    // Reassign the main standard output message with all pc's cards info etc. when the round ends
    myOutputValue = `You bet ${playerBet} points. <br> <br> You have:<br> ${allPlayerCardsInfo} with sum of <em>${playerScore}</em>.<br> <br> Computer has:<br> ${allPcCardsInfo} with sum of <em>${pcScore}</em>. <br> <br> ${resultMessage} <br> You have ${availableBettingPoints} points now. <br> <br> 🎆 HIGHEST RECORD: ${highestPointsRecord} points 🎆`;

    // When betting points are running out, reset the betting points to 100
    /* Reset as long as the final betting points/ slider max value <= 1 as:
    (1) there may be cases of betting points balance being a decimal number < 1, where the game will then stuck due to the minimum slider value being set to 1 initially and can no longer be dragged
    (2) the slider may be stucked too when the slider min value is 1 while its max value is also set to 1 but player can no longer slide it to change the value
    */
    if (availableBettingPoints <= 1) {
      myOutputValue = `You bet ${playerBet} points. <br> <br> You have:<br> ${allPlayerCardsInfo} with sum of <em>${playerScore}</em>.<br> <br> Computer has:<br> ${allPcCardsInfo} with sum of <em>${pcScore}</em>. <br> <br> ${resultMessage} <br> You have ${availableBettingPoints} points now. <br> Game will restart from 100 points. <br> <br> 🎆 HIGHEST RECORD: ${highestPointsRecord} points 🎆`;
      availableBettingPoints = 100;
    }

    // Reset the game in the end while having the values of available betting points and highest record persisted across multiple rounds
    reset();
  }

  // --- If no one has blackjack and player has not chosen to stand, update the initial standard output message which shows only pc's 1st card ---

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
