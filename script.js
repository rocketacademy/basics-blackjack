// Shuffle Deck > submit to deal cards
// Cards analysed for winning condition > cards displayed to user
// User hits/stands
// User cards analysed for winning/losing conditions
// computer decides to hit/stand
// game ends or continues

// Buttons: Shuffle/Deal Hit Stand
// Game Modes: player turn, computer turn, results
// define global variables
let numCards = 2;
let computerCard = [];
let playerCard = [];
let gameMode = "first round";
let currentPlayer = "player";
let noofRounds = 0;
let player = {
  name: "",
  sum: 0,
  blackjack: false,
  winner: false,
  busted: false,
  totalChips: 100,
  totalBlackjack: 0,
};
let computer = {
  name: "",
  sum: 0,
  blackjack: false,
  winner: false,
  busted: false,
  totalChips: 100,
  totalBlackjack: 0,
};
let arrayStore = [computer, player];
const PLAYER = 1;
const COMPUTER = 0;
const DEALBUTTON = document.querySelector("#deal-button");
const HITBUTTON = document.querySelector("#hit-button");
const STANDBUTTON = document.querySelector("#stand-button");

HITBUTTON.disabled = true;
STANDBUTTON.disabled = true;

// define function to get random index
let getRandomIndex = function (maxSize) {
  return Math.floor(Math.random() * maxSize);
};

// initializing obj for deck of cards
let makeDeck = function () {
  let cardDeck = [];
  let suits = ["hearts", "diamonds", "clubs", "spades"];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    let currentSuit = suits[suitIndex];
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = rankCounter;
      let specialRank = rankCounter;
      if (cardName == 1) {
        cardName = "ace";
        specialRank = 11;
      } else if (cardName == 11) {
        cardName = "jack";
        specialRank = 10;
      } else if (cardName == 12) {
        cardName = "queen";
        specialRank = 10;
      } else if (cardName == 13) {
        cardName = "king";
        specialRank = 10;
      }

      // Create a new card object with the current name, suit, and rank
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: specialRank,
        imgSrc: `./cards/${cardName}${currentSuit}.svg`,
      };
      // Add the new card to the deck
      cardDeck.push(card);
    }
  }
  // Return the completed card deck, an array of objects
  console.log(cardDeck);
  return cardDeck;
};

let shuffleCards = function (cardDeck) {
  // loop over array once
  for (
    let currentIndex = 0;
    currentIndex < cardDeck.length;
    currentIndex += 1
  ) {
    let randomIndex = getRandomIndex(cardDeck.length); //select random Index in the deck
    let randomCard = cardDeck[randomIndex];
    let currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

let shuffledDeck = shuffleCards(makeDeck());

// first drawing of 2 cards
let firstDrawCard = function () {
  // draws computer's cards
  for (let ctr = 0; ctr < numCards; ctr += 1) {
    computerCard.push(shuffledDeck.pop());
    playerCard.push(shuffledDeck.pop());
  }
  return;
};

let checkBlackjack = function () {
  //checks for black jack
  if (computerCard[0].name == "ace" || computerCard[1].name == "ace") {
    if (computerCard[0].rank == 10 || computerCard[1].rank == 10) {
      arrayStore[COMPUTER].winner = true;
      arrayStore[COMPUTER].blackjack = true;
      arrayStore[COMPUTER].sum = 21;
      console.log("Computer blackjack!");
      gameMode = "first round";
    } else {
      arrayStore[COMPUTER].sum = computerCard[0].rank + computerCard[1].rank;
      console.log(`Computer total sum is: ${arrayStore[COMPUTER].sum}`);
      if (arrayStore[COMPUTER].sum > 21) {
        arrayStore[COMPUTER].busted = true;
        HITBUTTON.disabled = true;
        STANDBUTTON.disabled = false;
      }
    }
  } else {
    arrayStore[COMPUTER].sum = computerCard[0].rank + computerCard[1].rank;
    console.log(`Computer total sum is: ${arrayStore[COMPUTER].sum}`);
    if (arrayStore[COMPUTER].sum > 21) {
      arrayStore[COMPUTER].busted = true;
      HITBUTTON.disabled = true;
      STANDBUTTON.disabled = false;
    }
  }

  if (playerCard[0].name == "ace" || playerCard[1].name == "ace") {
    if (playerCard[0].rank == 10 || playerCard[1].rank == 10) {
      arrayStore[PLAYER].winner = true;
      arrayStore[PLAYER].blackjack = true;
      arrayStore[PLAYER].sum = 21;
      console.log(`Player blackjack!`);
    } else {
      arrayStore[PLAYER].sum = playerCard[0].rank + playerCard[1].rank;
      console.log(`Player total sum is: ${arrayStore[PLAYER].sum}`);
      if (arrayStore[PLAYER].sum < 12) {
        HITBUTTON.disabled = false;
        STANDBUTTON.disabled = true;
      } else if (arrayStore[PLAYER].sum > 21) {
        arrayStore[PLAYER].busted = true;
        HITBUTTON.disabled = true;
        STANDBUTTON.disabled = false;
      } else {
        HITBUTTON.disabled = false;
        STANDBUTTON.disabled = false;
      }
    }
  } else {
    arrayStore[PLAYER].sum = playerCard[0].rank + playerCard[1].rank;
    console.log(`Player total sum is: ${arrayStore[PLAYER].sum}`);
    if (arrayStore[PLAYER].sum < 12) {
      HITBUTTON.disabled = false;
      STANDBUTTON.disabled = false;
    } else if (arrayStore[PLAYER].sum > 21) {
      arrayStore[PLAYER].busted = true;
      HITBUTTON.disabled = true;
      STANDBUTTON.disabled = false;
    } else {
      HITBUTTON.disabled = false;
      STANDBUTTON.disabled = false;
    }
  }

  return;
};

let displayCards = function () {
  let outputValue = "";
  if (
    arrayStore[PLAYER].blackjack == true ||
    arrayStore[COMPUTER].blackjack == true
  ) {
    outputValue = `Player's total points is ${arrayStore[PLAYER].sum}. Computer's total points is ${arrayStore[COMPUTER].sum}. <br>Player hand: <br><div class="hand hhand-compact">`;
    // prints player cards first
    for (let ctr = 0; ctr < playerCard.length; ctr += 1) {
      outputValue += `<img class='card' src="${playerCard[ctr].imgSrc}" >`;
    }
    outputValue += `</div><br>Computer hand:<br><div class="hand hhand-compact"> `;
    // prints computer cards
    for (let ctr = 0; ctr < computerCard.length; ctr += 1) {
      outputValue += `<img class='card' src="${computerCard[ctr].imgSrc}">`;
    }
  } else if (currentPlayer == "player") {
    outputValue = `<b><u>Round ${noofRounds}</u></b><br>Current User is ${currentPlayer}. Total points: ${arrayStore[PLAYER].sum}. Select "Hit" or "Stand".<br>Player's hand:<br><div class="hand hhand-compact"> `;
    for (let ctr = 0; ctr < playerCard.length; ctr += 1) {
      outputValue += `<img class='card' src="${playerCard[ctr].imgSrc}" width="100px">`;
    }
    outputValue += `</div><br>Computer's hand: <br><div class="hand hhand-compact"><img class='card' src="${computerCard[0].imgSrc}"><img class='card' src="./cards/RED_BACK.svg" ></div>`;
  } else if (currentPlayer == "computer") {
    outputValue = `Player's total points is ${arrayStore[PLAYER].sum}. Computer's total points is ${arrayStore[COMPUTER].sum}. <br>Player hand: <br><div class="hand hhand-compact">`;
    // prints player cards first
    for (let ctr = 0; ctr < playerCard.length; ctr += 1) {
      outputValue += `<img class='card' src="${playerCard[ctr].imgSrc}">`;
    }
    outputValue += `</div><br>Computer hand:<br><div class="hand hhand-compact"> `;
    // prints computer cards
    for (let ctr = 0; ctr < computerCard.length; ctr += 1) {
      outputValue += `<img class='card' src="${computerCard[ctr].imgSrc}">`;
    }
    outputValue += `</div>`;
  }
  return outputValue;
};

let changeAceValue = function () {
  if (currentPlayer == "player" && arrayStore[PLAYER].sum > 21) {
    for (let ctr = 0; ctr < playerCard.length; ctr += 1) {
      if (playerCard[ctr].name == "ace") {
        playerCard[ctr].rank = 1;
        arrayStore[PLAYER].sum -= 10;
        ctr = playerCard.length;
      }
    }
  } else if (currentPlayer == "computer" && arrayStore[COMPUTER].sum > 21) {
    for (let ctr = 0; ctr < computerCard.length; ctr += 1) {
      if (computerCard[ctr].name == "ace") {
        computerCard[ctr].rank = 1;
        arrayStore[COMPUTER].sum -= 10;
        ctr = computerCard.length;
      }
    }
  }
};

// after user clicks hit
let selectHit = function () {
  if (currentPlayer == "player") {
    playerCard.push(shuffledDeck.pop());
    let arrayLength = playerCard.length - 1;
    console.log(playerCard);
    arrayStore[PLAYER].sum += playerCard[arrayLength].rank;
    changeAceValue();
    if (arrayStore[PLAYER].sum > 21) {
      arrayStore[PLAYER].busted = true;
      HITBUTTON.disabled = true;
      STANDBUTTON.disabled = false;
    }
    console.log(`Player sum: ${arrayStore[PLAYER].sum}`);
  } else if (currentPlayer == "computer") {
    computerCard.push(shuffledDeck.pop());
    let arrayLength = computerCard.length - 1;
    arrayStore[COMPUTER].sum += computerCard[arrayLength].rank;
    changeAceValue();
    if (arrayStore[COMPUTER].sum > 21) {
      arrayStore[COMPUTER].busted = true;
      HITBUTTON.disabled = true;
      STANDBUTTON.disabled = false;
    }
    console.log(`Computer sum: ${arrayStore[COMPUTER].sum}`);
  }
  return;
};

let displayFinalResults = function () {
  DEALBUTTON.disabled = false;
  HITBUTTON.disabled = true;
  STANDBUTTON.disabled = true;
  let outputValue = "Results!<br>";
  if (
    arrayStore[COMPUTER].blackjack == true &&
    arrayStore[PLAYER].blackjack == true
  ) {
    outputValue += `What are the odds!! 😲 Both computer and player has black jack! It's a tie! <br>`;
  } else if (arrayStore[COMPUTER].blackjack == true) {
    outputValue += `Computer wins by black jack! 🤨 <br>`;
  } else if (arrayStore[PLAYER].blackjack == true) {
    outputValue += `Hooray! 🤩🎉🎊 Player wins by black jack! <br>`;
  } else if (arrayStore[PLAYER].sum > 21 && arrayStore[COMPUTER].sum > 21) {
    outputValue += `Oh no! You both busted! It's sad but it's still a tie! 😹<br>`;
  } else if (arrayStore[PLAYER].sum > 21) {
    outputValue += `Oh no! You busted so computer wins! How did this happen? 😖 Please try again!  <br>`;
  } else if (arrayStore[COMPUTER].sum > 21) {
    outputValue += `Guess what? You are so lucky! The computer busted. Good on you! 🤗 <br>`;
  } else if (arrayStore[PLAYER].sum == arrayStore[COMPUTER].sum) {
    outputValue += `Are you twins? It's a tie! You both have the same points. 💕 <br>`;
  } else if (arrayStore[PLAYER].sum > arrayStore[COMPUTER].sum) {
    outputValue += `Way to go! 💪 Player wins! <br>`;
  } else {
    outputValue += `Computer wins! Let's try again!<br> Click "Deal" to restart the game. <br>`;
  }
  return outputValue;
};

let resetGame = function () {
  numCards = 2;
  computerCard = [];
  playerCard = [];
  gameMode = "first round";
  currentPlayer = "player";
  player = {
    name: "",
    sum: 0,
    blackjack: false,
    winner: false,
    busted: false,
    totalChips: 100,
    totalBlackjack: 0,
  };
  let computer = {
    name: "",
    sum: 0,
    blackjack: false,
    winner: false,
    busted: false,
    totalChips: 100,
    totalBlackjack: 0,
  };
  arrayStore = [computer, player];
  shuffledDeck = shuffleCards(makeDeck());
};

let main = function (input) {
  let myOutputValue = "";
  if (shuffledDeck.length <= 10) {
    shuffledDeck = shuffleCards(makeDeck());
  }
  if (input == "deal" && gameMode == "first round") {
    resetGame();
    noofRounds += 1;
    gameMode = input;
    console.log(input);
    firstDrawCard();
    checkBlackjack();
    gameMode = "player";
    currentPlayer = "player";
    DEALBUTTON.disabled = true;
    if (
      arrayStore[PLAYER].blackjack == true ||
      arrayStore[COMPUTER].blackjack == true
    ) {
      myOutputValue += displayFinalResults();
      myOutputValue += displayCards();
      gameMode = "first round";
      currentPlayer = "computer";
    } else {
      myOutputValue = displayCards();
    }
  }

  if (
    input == "hit" &&
    arrayStore[PLAYER].busted != true &&
    arrayStore[PLAYER].sum != 21
  ) {
    HITBUTTON.disabled = false;
    STANDBUTTON.disabled = false;
    gameMode = input;
    console.log(input);
    selectHit();
    myOutputValue = displayCards();
    currentPlayer = "player";
    return myOutputValue;
  }

  if (input == "stand" && arrayStore[PLAYER].sum < 12) {
    myOutputValue = `Sorry, you have not met the minimum of 12 points. Please select "Hit".`;
  } else if (input == "stand") {
    gameMode = input;
    console.log(`Game mode ${gameMode}`);
    currentPlayer = "computer";
    myOutputValue = "Player has chosen to stand. <br><br> ";
    console.log(`Computer Sum is ${arrayStore[COMPUTER].sum}`);
    for (let ctr = 0; arrayStore[COMPUTER].sum < 17; ctr += 1) {
      selectHit();
      console.log(arrayStore[COMPUTER].sum);
    }
    console.log(`Game mode ${gameMode}`);
    myOutputValue += displayFinalResults();
    myOutputValue += displayCards();
    gameMode = "first round";
  }

  return myOutputValue;
};
