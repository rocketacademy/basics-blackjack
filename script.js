/*
- Create a shuffled deck
- Player click "submit":
  -- Player draw 2 cards face up
  -- Dealer(computer) draw 2 cards: 1st card face up, 2nd card face down
  -- wait for player's next move: "hit" or "stand"
  
- If player choose "hit":
  -- Player draw 3rd card face up

- If player choose "stand":
  -- Dealer: if Dealer's hand total value < 17, dealer must draw one more card, until the total value is >= 17
  -- Compare the total value of player hand and dealer hand, the highest value wins

*/

let gameState = "start";
let playerHand = [];
let computerHand = [];
//let playerHandValue = 0;
//let computerHandValue = 0;

// Create all the cards
var makeDeck = function () {
  var cardDeck = [];
  var suits = ["♥︎", "♦︎", "♣︎", "♠︎"];
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
// function checkWinner(playerHand, computerHand) {
//   let myOutputValue = "";

//   if (playerHandValue > 21) {
//     myOutputValue += "You are busted!!!";
//   } else if (computerHandValue > 21) {
//     return "Dealer is busted!!!";
//   }

//   if (playerHandValue == computerHandValue) {
//     myOutputValue = `It's a tie!
//     <hr>Player has: ${playerHand[0].name} of ${playerHand[0].suit}, ${playerHand[1].name} of ${playerHand[1].suit}
//     <br>Dealer has: ${computerHand[0].name} of ${computerHand[0].suit}, ${computerHand[1].name} of ${computerHand[1].suit}`;
//   } else if (playerHandValue == 21 || playerHandValue > computerHandValue) {
//     myOutputValue = `You win!
//     <hr>Player has: ${playerHand[0].name} of ${playerHand[0].suit}, ${playerHand[1].name} of ${playerHand[1].suit}
//     <br>Dealer has: ${computerHand[0].name} of ${computerHand[0].suit}, ${computerHand[1].name} of ${computerHand[1].suit}`;
//   } else if (computerHandValue == 21 || computerHandValue > playerHandValue) {
//     myOutputValue = `You loose!
//     <hr>Player has: ${playerHand[0].name} of ${playerHand[0].suit}, ${playerHand[1].name} of ${playerHand[1].suit}
//     <br>Dealer has: ${computerHand[0].name} of ${computerHand[0].suit}, ${computerHand[1].name} of ${computerHand[1].suit}`;
//   }
//   return myOutputValue;
// }

// Second Version: Add Player Hit or Stand - main2
var main = function (input) {
  let displayPlayerHandStr = "";
  let displayComputerHandStr = "";
  if (deck.length == 0) {
    return "No more card in the deck.";
  }

  if (gameState == "start") {
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
    computerHand.push(deck.pop());

    // for (let i = 0; i < playerHand.length; i++) {
    //   playerHandValue += playerHand[i].rank;
    // }
    // for (let j = 0; j < computerHand.length; j++) {
    //   computerHandValue += computerHand[j].rank;
    // }
    gameState = "waiting";
  }

  if (gameState == "hit") {
    playerHand.push(deck.pop());
    gameState = "waiting";
  }

  if (gameState == "stand") {
    computerHand.push(deck.pop());
  }

  console.log(playerHand);
  console.log(playerHand.length);

  for (let i = 0; i < playerHand.length; i++) {
    displayPlayerHandStr += `|| ${playerHand[i].name} of ${playerHand[i].suit}`;
  }
  displayPlayerHandStr += ` || points: ${computePoints(playerHand)}`;
  for (let i = 0; i < computerHand.length - 1; i++) {
    displayComputerHandStr += `${computerHand[i].name} of ${computerHand[i].suit}  `;
  }
  displayComputerHandStr += ` || face down`;
  displayComputerHandStr += ` || points: ${computePoints(computerHand)}`;

  return (
    "<hr>Player has: " +
    displayPlayerHandStr +
    `<br>` +
    "Dealer has: " +
    displayComputerHandStr
  );
};

function computePoints(hand) {
  // Ace is 11
  let points = 0;
  for (let i = 0; i < hand.length; i++) {
    let crtCardValue = hand[i].rank;
    if (crtCardValue === 1) crtCardValue = 11;
    points += crtCardValue;
  }
  if (points <= 21) {
    return points;
  }
  points = 0;
  for (let i = 0; i < hand.length; i++) {
    points += hand[i].rank;
  }

  return points;
}

const playerHitBtn = document.querySelector("#hit-button");
const playerStandBtn = document.querySelector("#hold-button");
playerHitBtn.addEventListener("click", function () {
  gameState = "hit";

  var result = main();

  // Display result in output element
  var output = document.querySelector("#output-div");
  output.innerHTML = result;

  // Reset input value
  //input.value = "";
});

playerStandBtn.addEventListener("click", function () {
  console.log("clicked stand btn");
  gameState = "stand";
});
