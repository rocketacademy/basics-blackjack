var suitsholder = ["Diamonds", "Hearts", "Clubs", "Spades"];

// creating a deck of cards
function makeDeck() {
  var newDeck = [];
  for (var i = 1; i <= 13; i++) {
    var suits = ["♦", "♥", "♣", "♠"];
    for (var j = 0; j < suits.length; j++) {
      var name = `${i}`;
      var value = Number(`${i}`);
      if (name === "1") {
        name = "Ace";
      } else if (name === "11") {
        name = "Jack";
        value = 10;
      } else if (name === "12") {
        name = "Queen";
        value = 10;
      } else if (name === "13") {
        name = "King";
        value = 10;
      }
      var card = {
        value,
        suit: suits[j],
        name,
      };
      newDeck.push(card);
    }
  }
  return newDeck;
}
// Get a random index ranging from 0 (inclusive) to max (exclusive).
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}
// Shuffle an array of cards
function shuffleCards(deck) {
  // Loop over the card deck array once
  for (var currentIndex = 0; currentIndex < deck.length; currentIndex++) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(deck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = deck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = deck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return deck;
}

var shuffledDeck = shuffleCards(makeDeck());

var TWENTY_ONE = 21;
var dealerHitThreshold = 16;
var playerChoseStand = false;
var gameOver = false;

var computerCards = [];
var playerCards = [];

function dealCardToHand(hand) {
  hand.push(shuffledDeck.pop());
}

function getHandSum(hand) {
  var numAcesInHand = 0;
  var sum = 0;

  for (var i = 0; i < hand.length; i++) {
    var currentCard = hand[i];
    if (currentCard.name == "Ace") {
      console.log("yes A");
      numAcesInHand += 1;
      sum += 11;
    } else {
      sum += currentCard.value;
    }
  }

  if (sum > TWENTY_ONE && numAcesInHand > 0) {
    for (var aceCounter = 0; aceCounter < numAcesInHand; aceCounter++) {
      sum -= 10;
      if (sum <= TWENTY_ONE) {
        break;
      }
    }
  }
  return sum;
}

function isBlackJack(hand) {
  return hand.length == 2 && getHandSum(hand) == TWENTY_ONE;
}

function convertHandToString(hand) {
  var cards = "";
  for (var handIndex = 0; handIndex < hand.length; handIndex++) {
    cards =
      cards + hand[handIndex].name + " of " + hand[handIndex].suit + ", <br>";
  }
  return cards;
}

function getDefaultOutput() {
  return `
    Player has:<br>${convertHandToString(playerCards)} with sum ${getHandSum(
    playerCards
  )}.<br><br>
    Dealer has:<br>${convertHandToString(computerCards)} with sum ${getHandSum(
    computerCards
  )}.
  `;
}

function main(input) {
  if (gameOver) {
    return `GAME OVER! Please refresh to play again~`;
  }

  if (playerCards.length == 0) {
    dealCardToHand(playerCards);
    dealCardToHand(computerCards);

    dealCardToHand(playerCards);
    dealCardToHand(computerCards);
    console.log(playerCards);
    console.log(computerCards);

    if (isBlackJack(computerCards)) {
      gameOver = true;
      return `
        ${getDefaultOutput()}<br><br>
        Computer has BlackJack and wins. Please refresh to play again~
      `;
    } else if (isBlackJack(playerCards)) {
      gameOver = true;
      return `
        ${getDefaultOutput()}<br><br>
        Player has BlackJack and wins. Please refresh to play again~
      `;
    } else {
      return `
        ${getDefaultOutput()}<br><br>
        Please enter "hit" or "stand", then submit
      `;
    }
  }

  if (!playerChoseStand) {
    if (input !== "hit" && input !== "stand") {
      return 'Please only input either "hit" or "stand"';
    } else if (input == "hit") {
      dealCardToHand(playerCards);

      if (getHandSum(playerCards) > TWENTY_ONE) {
        gameOver = true;
        return `
          ${getDefaultOutput()}<br><br>
          Player has busted and lost the game. Please refresh to play again~
        `;
      }
    } else if (input == "stand") {
      playerChoseStand = true;
    }
  }

  var computerHandSum = getHandSum(computerCards);
  if (computerHandSum <= dealerHitThreshold) {
    dealCardToHand(computerCards);
    computerHandSum = getHandSum(computerCards);
    if (computerHandSum > TWENTY_ONE) {
      gameOver = true;
      return `
        ${getDefaultOutput()}<br><br>
        Computer has busted and lost the game. Please refresh to play again~
      `;
    }
  }

  if (playerChoseStand && computerHandSum > dealerHitThreshold) {
    gameOver = true;
    if (getHandSum(playerCards) > computerHandSum) {
      return `
        ${getDefaultOutput()}<br><br>
        Player wins. Please refresh to play again~
      `;
    } else {
      return `
        ${getDefaultOutput()}<br><br>
        Computer wins. Please refresh to play again~
      `;
    }
  }
  return `
    ${getDefaultOutput()}<br><br>
    playerChoseStand is ${playerChoseStand}.<br>
    If player has not yet chose to stand, please enter "hit" or "stand".<br>
    Else, press Submit to see Computer's next move.
  `;
}
