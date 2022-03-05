/*
- Create a shuffled deck
- User input 1 - 6 players, click "start" to start the game
  -- Players take turns to draw 2 cards face up(clockwise)
  -- Dealer(computer) draw 2 cards: 1st card face up, 2nd card face down
  -- wait for each player's next move: "hit" or "stand"
- If player choose "hit":
  -- Player draw 3rd card face up
- If player choose "stand":
  -- Dealer: if Dealer's hand total value < 17, dealer must draw one more card, until the total value is >= 17
  -- Compare the total value of player hand and dealer hand, the highest value wins
- Reset game
*/
const output = document.querySelector("#output-div");
const playerHitBtn = document.querySelector("#hit-button");
const playerStandBtn = document.querySelector("#hold-button");
const restartBtn = document.querySelector("#restart-button");
const playerDiv = document.querySelector("#player");
const dealerDiv = document.querySelector("#dealer");
const gameRulesDiv = document.querySelector("#gameRules");
restartBtn.style.display = "none";
playerHitBtn.style.display = "none";
playerStandBtn.style.display = "none";

let gameState = "start";
let playerHand = [];
let computerHand = [];
let deck = shuffleCards(makeDeck());

playerHitBtn.addEventListener("click", function () {
  gameState = "hit";
  output.innerHTML = main();
});

playerStandBtn.addEventListener("click", function () {
  gameState = "stand";
  output.innerHTML = main();
});

restartBtn.addEventListener("click", function () {
  location.reload();
});

// Create all the cards
function makeDeck() {
  // var makeDeck = function () {
  var cardDeck = [];
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  var suitIdx = 0;
  while (suitIdx < suits.length) {
    var rankCounter = 1;
    var currentSuit = suits[suitIdx];
    while (rankCounter < 14) {
      var cardName = rankCounter;
      var cardRank = rankCounter;
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
        rank: cardRank,
        img: "imgs/" + `${cardName}` + "_of_" + `${currentSuit}` + ".png",
      };

      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIdx += 1;
  }
  return cardDeck;
}

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

// Set value for Ace
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

// Display cards for all players
function displayHand(hand, toDo) {
  let displayHandStr = "";
  if (toDo == "showAll" || gameState == "stand") {
    displayHandStr += `Points : ${computePoints(hand)} <br>`;
  }
  if (toDo == "showAll") {
    for (let i = 0; i < hand.length; i++) {
      displayHandStr += `<img src="${hand[i].img}" />`;
    }
  }
  if (toDo == "hideOne") {
    for (let i = 0; i < hand.length - 1; i++) {
      displayHandStr += `<img src="${hand[i].img}" />`;
    }
    displayHandStr += `<img src="imgs/cardback.svg" />`;
  }
  return displayHandStr;
}

// Main function
var main = function (input) {
  let myOutputValue = "";
  if (gameState == "start") {
    gameRulesDiv.style.display = "none";
    playerHand.push(deck.pop());
    playerHand.push(deck.pop());
    computerHand.push(deck.pop());
    computerHand.push(deck.pop());
    if (computePoints(playerHand) == 21) {
      myOutputValue = `💰💰💰Player got BLACKJACK!💰💰💰 <br>`;
    }
    gameState = "waiting";
    myOutputValue +=
      "Dealer hand: " +
      `<br>` +
      displayHand(computerHand, "hideOne") +
      `<br>` +
      `<br>` +
      "Player hand: " +
      `<br>` +
      displayHand(playerHand, "showAll");
  }

  if (gameState == "waiting") {
    const startBtn = document.querySelector("#start-button");
    startBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    playerHitBtn.style.display = "inline-block";
    playerStandBtn.style.display = "inline-block";
    if (computePoints(playerHand) == 21) {
      playerHitBtn.style.display = "none";
    }
  }

  if (gameState == "hit") {
    playerHand.push(deck.pop());
    if (computePoints(playerHand) > 21) {
      playerHitBtn.style.display = "none";
      myOutputValue = "Player is busted!" + `<br>`;
    }
    myOutputValue +=
      "Dealer hand: " +
      `<br>` +
      displayHand(computerHand, "hideOne") +
      `<br>` +
      `<br>` +
      "Player hand: " +
      `<br>` +
      displayHand(playerHand, "showAll");
    gameState = "waiting";
  }

  if (gameState == "stand") {
    let playerHandPoint = computePoints(playerHand);
    let computerHandPoint = computePoints(computerHand);
    while (computerHandPoint < 17) {
      let newCard = deck.pop();
      computerHand.push(newCard);
      // computerHandPoint += newCard.rank;
      computerHandPoint = computePoints(computerHand);
    }
    playerHitBtn.style.display = "none";
    playerStandBtn.style.display = "none";

    myOutputValue =
      "Dealer hand: " +
      `<br>` +
      displayHand(computerHand, "showAll") +
      `<br>` +
      `<br>` +
      "Player hand: " +
      `<br>` +
      displayHand(playerHand, "showAll");

    if (playerHandPoint > 21 && computerHandPoint <= 21)
      myOutputValue += `<hr>` + "You are busted!" + " Dealer win!";
    if (computerHandPoint > 21 && playerHandPoint <= 21)
      myOutputValue +=
        `<hr>` + "Dealer is busted!" + `<br>` + "🎊🎊🎊 Player win! 🎊🎊🎊";
    if (playerHandPoint > 21 && computerHandPoint > 21)
      myOutputValue += `<hr>` + "Both Player and Dealer are busted!";
    if (playerHandPoint > computerHandPoint && playerHandPoint <= 21) {
      myOutputValue += `<hr>` + "🎊🎊🎊 Player Win! 🎊🎊🎊";
    } else if (playerHandPoint < computerHandPoint && computerHandPoint <= 21) {
      myOutputValue += `<hr>` + "Dealer Win!";
    } else if (playerHandPoint == computerHandPoint) {
      myOutputValue += `<hr>` + "It's a tie!";
    }
  }

  return myOutputValue;
};
