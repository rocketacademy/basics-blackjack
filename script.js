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
const PLAYER = 1;
const COMPUTER = 0;

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
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card object with the current name, suit, and rank
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        imgSrc: `./cards/${cardName}${currentSuit}.svg`,
      };
      // Add the new card to the deck
      cardDeck.push(card);
    }
  }
  // Return the completed card deck, an array of objects
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

let checkBlackjack = function (arrayStore) {
  //checks for black jack
  if (computerCard[0].name == "ace" || computerCard[1].name == "ace") {
    if (computerCard[0].rank >= 10 || computerCard[1].rank >= 10) {
      arrayStore[COMPUTER].winner = true;
      arrayStore[COMPUTER].blackjack = true;
    } else {
      arrayStore[COMPUTER].sum = computerCard[0].rank + computerCard[1].rank;
    }
  } else {
    arrayStore[COMPUTER].sum = computerCard[0].rank + computerCard[1].rank;
  }

  if (playerCard[0].name == "ace" || playerCard[1].name == "ace") {
    if (playerCard[0].rank >= 10 || playerCard[1].rank >= 10) {
      arrayStore[PLAYER].winner = true;
      arrayStore[PLAYER].blackjack = true;
    } else {
      arrayStore[PLAYER].sum = playerCard[0].rank + playerCard[1].rank;
    }
  } else {
    arrayStore[PLAYER].sum = playerCard[0].rank + playerCard[1].rank;
  }

  return arrayStore;
};

let drawCard = function (shuffledDeck) {
  // draws computer's cards
  for (let ctr = 0; ctr < numCards; ctr += 1) {
    computerCard.push(shuffledDeck.pop());
    playerCard.push(shuffledDeck.pop());
  }
  return;
};

let displayResults = function (arrayStore) {
  let outputValue = "";
  if (
    arrayStore[COMPUTER].blackjack == true &&
    arrayStore[PLAYER].blackjack == true
  ) {
    outputValue += `Both computer and player has black jack! It's a tie! <br>`;
  } else if (arrayStore[COMPUTER].blackjack == true) {
    outputValue += `Computer wins by black jack! <br>`;
  } else if (arrayStore[PLAYER].blackjack == true) {
    outputValue += `Player wins by black jack! <br>`;
  } else if (arrayStore[PLAYER].sum == arrayStore[COMPUTER].sum) {
    outputValue += `It's a tie! <br>`;
  } else if (arrayStore[PLAYER].sum > arrayStore[COMPUTER].sum) {
    outputValue += `Player wins!`;
  } else {
    outputValue += `Computer wins! <br>`;
  }

  outputValue += `<br>Player hand: <img class='card' src="${playerCard[0].imgSrc}"><img class='card' src="${playerCard[1].imgSrc}">`;
  outputValue += `Computer hand: <img class='card' src="${computerCard[0].imgSrc}"><img class='card' src="${computerCard[1].imgSrc}">`;

  return outputValue;
};

let main = function (input) {
  let player = {
    name: "",
    sum: 0,
    blackjack: false,
    winner: false,
    totalChips: 100,
  };
  let computer = {
    name: "",
    sum: 0,
    blackjack: false,
    winner: false,
    totalChips: 100,
  };
  let myOutputValue = "";
  let arrayStore = [computer, player];
  let shuffledDeck = shuffleCards(makeDeck());
  drawCard(shuffledDeck);
  arrayStore = checkBlackjack(arrayStore);
  myOutputValue = displayResults(arrayStore);
  computerCard = [];
  playerCard = [];
  return myOutputValue;
};
