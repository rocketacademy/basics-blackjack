let gameState = "start";
let playerHand = [];
let computerHand = [];
let playerHandValue = 0;
let computerHandValue = 0;
let displayPlayerHand = "";
let displayComputerHand = "";

// Create all the cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts ♥︎", "diamonds ♦︎", "clubs ♣︎", "spades ♠︎"];
  var suitIdx = 0;
  while (suitIdx < suits.length) {
    var rankCounter = 1;
    var currentSuit = suits[suitIdx];
    while (rankCounter < 14) {
      var cardName = rankCounter;
      if (rankCounter == 1) cardName = "ace";
      if (rankCounter == 11) {
        cardName = "jack";
        cardRank = 10;
      }
      if (rankCounter == 12) {
        cardName = "queen";
        cardRank = 10;
      }
      if (rankCounter == 13) {
        cardName = "king";
        cardRank = 10;
      }

      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      if (cardName == "jack" || cardName == "queen" || cardName == "king") {
        card = {
          name: cardName,
          suit: currentSuit,
          rank: cardRank,
        };
      }
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIdx += 1;
  }
  return cardDeck;
};

// Generate random index
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Shuffle card deck
function shuffleCards(cardDeck) {
  let currentIdx = 0;
  while (currentIdx < cardDeck.length) {
    let currentCard = cardDeck[currentIdx];
    let randomIdx = getRandomIndex(cardDeck.length);
    let randomCard = cardDeck[randomIdx];
    // Swap cards
    cardDeck[currentIdx] = randomCard;
    cardDeck[randomIdx] = currentCard;
    currentIdx += 1;
  }
  return cardDeck;
}

let deck = shuffleCards(makeDeck());

// First Version: Compare Initial Hands to Determine Winner - main1
function checkWinner(playerHand, computerHand) {
  let myOutputValue = "";

  if (playerHandValue > 21) {
    myOutputValue += "You are busted!!!";
  } else if (computerHandValue > 21) {
    return "Dealer is busted!!!";
  }

  if (playerHandValue == computerHandValue) {
    myOutputValue = `It's a tie! 
    <hr>Player has: ${playerHand[0].name} of ${playerHand[0].suit}, ${playerHand[1].name} of ${playerHand[1].suit}
    <br>Dealer has: ${computerHand[0].name} of ${computerHand[0].suit}, ${computerHand[1].name} of ${computerHand[1].suit}`;
  } else if (playerHandValue == 21 || playerHandValue > computerHandValue) {
    myOutputValue = `You win! 
    <hr>Player has: ${playerHand[0].name} of ${playerHand[0].suit}, ${playerHand[1].name} of ${playerHand[1].suit}
    <br>Dealer has: ${computerHand[0].name} of ${computerHand[0].suit}, ${computerHand[1].name} of ${computerHand[1].suit}`;
  } else if (computerHandValue == 21 || computerHandValue > playerHandValue) {
    myOutputValue = `You loose! 
    <hr>Player has: ${playerHand[0].name} of ${playerHand[0].suit}, ${playerHand[1].name} of ${playerHand[1].suit}
    <br>Dealer has: ${computerHand[0].name} of ${computerHand[0].suit}, ${computerHand[1].name} of ${computerHand[1].suit}`;
  }
  return myOutputValue;
}

// Second Version: Add Player Hit or Stand - main2
var main = function (input) {
  if (deck.length == 0) {
    return "No more card in the deck.";
  }

  if (gameState == "start") {
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
    computerHand.push(deck.pop());

    for (let i = 0; i < playerHand.length; i++) {
      playerHandValue += playerHand[i].rank;
    }
    for (let j = 0; j < computerHand.length; j++) {
      computerHandValue += computerHand[j].rank;
    }
    gameState = "waiting";
  }

  if (gameState == "hit") {
    playerHand.push(deck.pop());
    gameState = "waiting";
  }

  if (gameState == "stand") {
    computerHand.push(deck.pop());
  }
  console.log(playerHand.length);
  for (let i = 0; i < playerHand.length; i++) {
    displayPlayerHand += `|| ${playerHand[i].name} of ${playerHand[i].suit}`;
  }
  for (let i = 0; i < computerHand.length - 1; i++) {
    displayComputerHand += `${computerHand[i].name} of ${computerHand[i].suit}  `;
  }
  console.log(displayPlayerHand);

  return (
    "<hr>Player has: " +
    displayPlayerHand +
    `<br>` +
    "Dealer has: " +
    displayComputerHand
  );
};

const playerHitBtn = document.querySelector("#hit-button");
const playerStandBtn = document.querySelector("#hold-button");
playerHitBtn.addEventListener("click", function () {
  gameState = "hit";
  main();
});
playerStandBtn.addEventListener("click", function () {
  console.log("clicked stand btn");
  gameState = "stand";
});
