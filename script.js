// Shuffle Deck > submit to deal cards
// Cards analysed for winning condition > cards displayed to user
// User hits/stands
// User cards analysed for winning/losing conditions
// computer decides to hit/stand
// game ends or continues

// Buttons: Shuffle/Deal Hit Stand
// Game Modes: player turn, computer turn, results
// define global variables

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

let main = function (input) {
  let shuffledDeck = shuffleCards(makeDeck());
  let myOutputValue = "";
  let computerCard = [];
  let playerCard = [];
  let numCards = 2;
  let playerSum = 0;
  let computerSum = 0;
  let blackjack = "";
  let winner = "";
  // draws computer's cards
  for (let ctr = 0; ctr < numCards; ctr += 1) {
    computerCard.push(shuffledDeck.pop());
    console.log(`Computer card ${computerCard[ctr]}`);
  }
  // draws player's cards
  for (let ctr = 0; ctr < numCards; ctr += 1) {
    playerCard.push(shuffledDeck.pop());
    console.log(`Player card ${playerCard[ctr]}`);
  }

  //checks for black jack
  if (computerCard[0].name == "ace" || computerCard[1].name == "ace") {
    if (computerCard[0].rank > 10 || computerCard[1].rank > 10) {
      winner = "computer";
      blackjack = "computer blackjack";
    } else {
      computerSum = computerCard[0].rank + computerCard[1].rank;
    }
  } else {
    computerSum = computerCard[0].rank + computerCard[1].rank;
  }

  if (playerCard[0].name == "ace" || playerCard[1].name == "ace") {
    if (
      (playerCard[0].rank > 10 || playerCard[1].rank > 10) &&
      winner == "computer"
    ) {
      winner = "tie";
      blackjack = "both blackjack";
    } else if (playerCard[0].rank > 10 || playerCard[1].rank > 10) {
      winner = "player";
      blackjack = "player blackjack";
    } else {
      playerSum = playerCard[0].rank + playerCard[1].rank;
    }
  } else {
    playerSum = playerCard[0].rank + playerCard[1].rank;
  }

  if (blackjack == "") {
    if (playerSum > computerSum) {
      winner = "player";
    } else {
      winner = "computer";
    }
  }

  myOutputValue = `Player hand: ${playerCard[0].name} of ${playerCard[0].suit}, ${playerCard[1].name} of ${playerCard[1].suit}<br>Computer hand: ${computerCard[0].name} of ${computerCard[0].suit}, ${computerCard[1].name} of ${computerCard[1].suit}<br>`;

  if (blackjack != "") {
    if (blackjack == "both blackjack") {
      myOutputValue += `Both computer and player has black jack! It's a tie!`;
    } else if (blackjack == "computer blackjack") {
      myOutputValue += `Computer wins by black jack!`;
    } else {
      myOutputValue += `Player wins  by black jack!`;
    }
  } else if (winner == "player") {
    myOutputValue += `Player wins!`;
  } else {
    myOutputValue += `Computer wins!`;
  }

  return myOutputValue;
};
