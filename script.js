// Initialize global variables. We need (1) a shuffled deck of cards (2) player and computer hands (3) player and computer hand totals (4) game mode

// Program to generate standard deck of 52 cards. Cards have a blackjack value with Ace being either 1 or 11
const makeDeck = () => {
  let cardDeck = [];
  let suits = ["♥️", "♦️", "♣️", "♠️"];

  let suitIndex = 0
  while (suitIndex < suits.length) {
    let currentSuit = suits[suitIndex]

    let rankCounter = 1
    while (rankCounter <= 13) {
      let cardName = rankCounter
      let blackjackValue = rankCounter
      if (rankCounter === 1) {
        cardName = 'Ace'
        blackjackValue = [1, 11]
      } else if (rankCounter === 11) {
        cardName = 'Jack'
        blackjackValue = 10
      } else if (rankCounter === 12) {
        cardName = 'Queen'
        blackjackValue = 10
      } else if (rankCounter === 13) {
        cardName = 'King'
        blackjackValue = 10
      }

      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        value: blackjackValue
      }

      cardDeck.push(card)

      rankCounter += 1
    }
    suitIndex += 1
  }
  return cardDeck
}

// Program to shuffle cards given a particular deck
const shuffleCards = (deck) => {
  let i = 0;
  while (i < deck.length) {
    let randomIndex = getRandomIndex(deck.length);
    let randomCard = deck[randomIndex];
    let currentCard = deck[i];
    deck[i] = randomCard;
    deck[randomIndex] = currentCard;
    i += 1;
  }
  return deck;
};

// Generate random index for shuffling
const getRandomIndex = max => Math.floor(Math.random() * max);

// Generate shuffled deck of 52 cards
const deck = shuffleCards(makeDeck())

// Global variables
const playerHand = [];
const dealerHand = [];

let gameMode = 'start'
let playerScore = 0;
let dealerScore = 0;

const drawHand = deck => {
  playerHand.push(deck.pop())
  dealerHand.push(deck.pop())
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
}

const updatePlayerScore = () => {
  for (const card of playerHand) {
    if (card.name === 'Ace') {
      playerScore += card.value[1]
    } else {
      playerScore += card.value
    }
  }
}

const updateDealerScore = () => {
  for (const card of dealerHand) {
    if (card.name === 'Ace') {
      dealerScore += card.value[1]
    } else {
      dealerScore += card.value
    }
  }
}

const updateScores = () => {
  updatePlayerScore()
  updateDealerScore()
}

const getWinner = () => {
  let result = ''
  if (playerScore === dealerScore && playerScore === 21) {
    result = 'blackjackTie' 
  } else if (playerScore === dealerScore) {
    result = 'tie'
  } else if (playerScore > dealerScore && playerScore === 21) {
    result = 'blackjackPlayer'
  } else if (playerScore < dealerScore && dealerScore === 21) {
    result = 'blackjackDealer'
  } else if (playerScore > dealerScore) {
    result = 'player'
  } else {
    result = 'dealer'
  }
  return result
}

const displayMessage = result => {
  let message = `You drew ${playerHand[0].name} of ${playerHand[0].suit} and ${playerHand[1].name} of ${playerHand[1].suit}<br>Dealer drew ${dealerHand[0].name} of ${dealerHand[0].suit} and ${dealerHand[1].name} of ${dealerHand[1].suit}<br>`;
  if (result === 'blackjackTie') {
    message += `Both you and the dealer drew a Blackjack! What are the chances... it's a tie.`
  } else if (result === 'tie') {
    message += `Both you and the dealer drew a score of ${playerScore}! It's a tie.`
  } else if (result === 'blackjackPlayer') {
    message += `You drew a Blackjack. You won!`
  } else if (result === 'blackjackDealer') {
    message += `Dealer drew a Blackjack. Tough luck...`
  } else if (result === 'player') {
    message += `You won!`
  } else {
    message += `You lost...`
  }
  return message
}

const main = function (input) {
  // 2 cards are drawn from shuffled deck for player and dealer, and stored in respective arrays
  drawHand(deck)
  // Update respective scores
  updateScores()
  // Compare both hands and determine a winner. Scenarios are: (1) tie (2) Blackjack win (3) Normal win
  let result = getWinner()
  // Display appropriate messages
  let finalMessage = displayMessage(result)
  
  return finalMessage;
};



// To fix: (1) Ace is constant at value 11, how to switch to value 1? (2) Display message only caters for two cards. Need to find a way to cater to > 2 cards