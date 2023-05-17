//helper functions provided by rocket in 9.1 & 9.2
//make a deck
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts♥️", "Diamonds♦️", "Clubs♣️", "Spades♠️"];

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
      // These are custom lines added for blackjack scoring. add cardscore, then setting ace, j q and k to score 10 points worth each. we will deal with ace being a variable score later during the main function
      let cardScore = rankCounter;

      if (cardScore === 11 || cardScore === 12 || cardScore === 13) {
        cardScore = 10;
      }
      if (cardScore === 1) {
        cardScore = 11;
      }

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        score: cardScore,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

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

/* things to do
1) edit the card editor to add in points for blackjack score counting (D)
3) plan for states
  a) "initialize" should make it such that when you click submit. draws 2 cards, shows player the results and total score.
  b) "playerMidgame" should asks you to hit or stand based off the results. plays a card if hit, shows the results and total score.
   ace will be lowered to score 10 if a 3rd card is hit. check for bust, if bust and in the presence of ace, reduce ace to 1.
   if stand, move game phase to "computerMidgame"
  c) "computerMidgame" should basically make the cpu hit until the cpu is either bigger than player, or busts. then moves to "result" phase  
  d) "result" phase shows who has won. it also resets the deck, the hand and all required stuff on submit, moves it back to "initialize".
*/
let deck = shuffleCards(makeDeck());
let gameState = "initialize";
let playerHand = [];
let computerHand = [];
let playerScore = 0;
let computerScore = 0;
//main game
function main(input) {
  if ((gameState = "initialize")) {
    if (input !== "") {
      return `Hello Player! Please do not type in anything and just press submit to start a game of Blackjack!`;
    }
  }
  //when i click submit. player & computer draws 2 cards, clear off any winning conditions, then i will return the 2 cards of the player, asking for a hit or stand.
  dealInitialHands();
  if (checkInitialHands(playerHand, computerHand) === "double blackjack") {
    gameState = "result";
    return "It is a double blackjack! It is a draw!";
  } else if (
    checkInitialHands(playerHand, computerHand) === "player blackjack"
  ) {
    gameState = "result";
    return "You Win! You have a blackjack!";
  } else if (
    checkInitialHands(playerHand, computerHand) === "computer blackjack"
  ) {
    gameState = "result";
    return "You Lose! Computer has a blackjack! ";
  } else if (checkInitialHands(playerHand, computerHand === "game continue")) {
    // gameState = "playerHitOrStand";
    playerScore = calculatePlayerScore(playerHand);
    computerScore = calculateComputerScore(computerHand);
    console.log(playerHand, computerHand);
    console.log(playerScore);
    console.log(computerScore);
    return `The Cards that you have drew are as follows..${callCards()}<br>The total sum is currently ${playerScore}.<br> Please decide if you would like to Hit or Stand!`;
  }
}

// dealing initial hands small function.
function dealInitialHands() {
  for (let i = 0; i < 2; i++) {
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
  }
}

//checking initial hand for blackjacks
function checkInitialHands(playerHand, computerHand) {
  let playerStartScore = 0;
  let computerStartScore = 0;
  let initialPhaseResult = "";
  for (let i = 0; i < playerHand.length; i += 1) {
    playerStartScore += playerHand[i].score;
  }
  for (let j = 0; j < computerHand.length; j += 1) {
    computerStartScore += computerHand[j].score;
  }
  if (playerStartScore === computerStartScore && playerStartScore === 21) {
    initialPhaseResult = "double blackjack";
  } else if (playerStartScore === 21 && computerStartScore !== 21) {
    initialPhaseResult = "player blackjack";
  } else if (playerStartScore !== 21 && computerStartScore === 21) {
    initialPhaseResult = "computer blackjack";
  } else {
    initialPhaseResult = "game continue";
  }
  return initialPhaseResult;
}
// function to reset the whole game
function refreshEverything() {
  deck = [];
  deck = shuffleCards(makeDeck());
  playerHand = [];
  computerHand = [];
}

//function to display all cards depending on current size of hand
function callCards() {
  let message = "";
  for (i = 0; i < playerHand.length; i += 1) {
    message += `<br>${playerHand[i].name} of ${playerHand[i].suit} [${playerHand[i].score}]`;
  }
  return message;
}

//function to calculate player scores
function calculatePlayerScore(playerHand) {
  let score = 0;
  for (let i = 0; i < playerHand.length; i += 1) {
    score += playerHand[i].score;
  }
  return score;
}

//function to calculate computer scores
function calculateComputerScore(computerHand) {
  let score = 0;
  for (let i = 0; i < computerHand.length; i += 1) {
    score += computerHand[i].score;
  }
  return score;
}
