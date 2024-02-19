//game modes
const INIT_GAME = `initialize game`;
const EVAL_OPTIONS = `evaluate options after drawing cards`;
const HIT_OR_STAND = `players decide to hit or stand`;
const RESET_GAME = `reset game`;
let mode = INIT_GAME;

//global variables
const playerHand = [];
const dealerHand = [];
const gameDeck = [];
let endGameState = false;

//deck functions

function createDeck() {
  const cardDeck = [];
  const suits = [`Hearts`, `Diamonds`, `Clubs`, `Spades`];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    for (let rankCount = 1; rankCount <= 13; rankCount += 1) {
      let cardName = rankCount;
      if (rankCount == 1) {
        cardName = `Ace`;
      } else if (rankCount == 11) {
        cardName = `Jack`;
      } else if (rankCount == 12) {
        cardName = `Queen`;
      } else if (rankCount == 13) {
        cardName = `King`;
      }
      const card = {
        name: cardName,
        rank: rankCount,
        suit: suits[suitIndex],
      };
      cardDeck.push(card);
    }
  }
  return cardDeck;
}

function getRandomIndex(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

function shuffleDeck(cardDeck) {
  for (let i = 0; i < cardDeck.length; i += 1) {
    const randomIndex = getRandomIndex(cardDeck.length);
    const randomCard = cardDeck[i];
    cardDeck[i] = cardDeck[randomIndex];
    cardDeck[randomIndex] = randomCard;
  }
  return cardDeck;
}

function generateNewDeck() {
  const newDeck = createDeck();
  const shuffledDeck = shuffleDeck(newDeck);
  for (let i = 0; i < shuffledDeck.length; i += 1) {
    gameDeck.push(shuffledDeck[i]);
  }
}

function printSuitsIcon(suit) {
  if (suit == `Hearts`) {
    return `♥️`;
  }
  if (suit == `Diamonds`) {
    return `♦️`;
  }
  if (suit == `Clubs`) {
    return `♣️`;
  }
  if (suit == `Spades`) {
    return `♠️`;
  }
}

//game functions

function checkForBlackJack(hand) {
  let isBlackJack = false;
  const playerCardOne = hand[0];
  const playerCardTwo = hand[1];
  if (
    (playerCardOne.name == `Ace` && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == `Ace` && playerCardOne.rank >= 10)
  ) {
    endGameState = true;
    isBlackJack = true;
  }
  return isBlackJack;
}

function displayHands(playerHand, dealerHand) {
  let playerHandMsg = `Player Hand: <br>`;
  for (let i = 0; i < playerHand.length; i += 1) {
    playerHandMsg += `- ${playerHand[i].name} of ${printSuitsIcon(
      playerHand[i].suit
    )} <br>`;
  }
  let dealerHandMsg = `Dealer Hand: <br>`;
  for (let i = 0; i < dealerHand.length; i += 1) {
    dealerHandMsg += `- ${dealerHand[i].name} of ${printSuitsIcon(
      dealerHand[i].suit
    )} <br>`;
  }

  if (endGameState == false) {
    dealerHandMsg = `Player Hand: <br> (hidden card) <br> ${
      dealerHand[1].name
    } of ${printSuitsIcon(dealerHand[1].suit)} <br>`;
  }

  return `${playerHandMsg} <br> ${dealerHandMsg}`;
}

function calcHandTotal(hand) {
  let handTotal = 0;
  let aceCount = 0;
  for (let i = 0; i < hand.length; i += 1) {
    const pulledCard = hand[i];
    if (
      pulledCard.name == `Jack` ||
      pulledCard.name == `Queen` ||
      pulledCard.name == `King`
    ) {
      handTotal += 10;
    } else if (pulledCard.name == `Ace`) {
      handTotal += 11;
      aceCount += 1;
    } else handTotal += pulledCard.rank;
  }

  for (let i = 0; i < aceCount; i += 1) {
    if (handTotal > 21) {
      handTotal -= 10;
    }
  }
  return handTotal;
}

var main = function (input) {
  if (mode == INIT_GAME) {
    generateNewDeck();
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    mode = EVAL_OPTIONS;
    return `Both the player and dealer has been dealt two cards. Click the submit button to evaluate the hands.`;
  }

  if (mode == EVAL_OPTIONS) {
    const playerBlackJack = checkForBlackJack(playerHand);
    const dealerBlackJack = checkForBlackJack(dealerHand);
    const cardsDrawn = displayHands(playerHand, dealerHand);
    if (playerBlackJack || dealerBlackJack) {
      if (playerBlackJack && dealerBlackJack) {
        return `${cardsDrawn} <br> Both players got a black jack ✌. It's a tie!`;
      }
      if (playerBlackJack && !dealerBlackJack) {
        return `${cardsDrawn} <br> Player wins by black jack! 🏆`;
      }
      if (!playerBlackJack && dealerBlackJack) {
        return `${cardsDrawn} <br> Dealer wins by black jack! 🏆`;
      }
    }
    mode = HIT_OR_STAND;
    return `${cardsDrawn} <br> No one scored a black jack. Please input h for Hit and s for Stand`;
  }

  if (mode == HIT_OR_STAND) {
    if (input == `h`) {
      playerHand.push(gameDeck.pop());
      const cardsDrawn = displayHands(playerHand, dealerHand);
      return `Player has drawn another card. Press h to Hit or s to Stand. <br> <br> ${cardsDrawn}`;
    } else if (input == `s`) {
      const playerHandTotal = calcHandTotal(playerHand);
      let dealerHandTotal = calcHandTotal(dealerHand);
      while (dealerHandTotal < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotal = calcHandTotal(dealerHand);
      }
      const cardValuesMsg = `<br> Player's hand value: ${playerHandTotal} <br> Dealer's hand value: ${dealerHandTotal}`;
      endGameState = true;
      const cardsDrawn = displayHands(playerHand, dealerHand);

      //draw scenario
      if (
        playerHandTotal == dealerHandTotal ||
        (playerHandTotal > 21 && dealerHandTotal > 21)
      ) {
        mode = RESET_GAME;
        return `${cardsDrawn} <br> It's a tie! <br> ${cardValuesMsg}`;
      }
      //loss scenario
      if (
        (playerHandTotal < dealerHandTotal && dealerHandTotal <= 21) ||
        (playerHandTotal > 21 && dealerHandTotal <= 21)
      ) {
        mode = RESET_GAME;
        return `${cardsDrawn} <br> Dealer wins! 💸💸💸 <br> ${cardValuesMsg}`;
      }
      //win scenario
      mode = RESET_GAME;
      return `${cardsDrawn} <br> Player wins! 🤑🤑🤑 <br> ${cardValuesMsg}`;
    } else {
      const cardsDrawn = displayHands(playerHand, dealerHand);
      return `This is an invalid input. Please input h for Hit or s for Stand. <br> <br> ${cardsDrawn}`;
    }
  }

  if (mode == RESET_GAME) {
    playerHand.length = 0;
    dealerHand.length = 0;
    gameDeck.length = 0;
    endGameState = false;
    mode = INIT_GAME;
    return `Please press submit to start a new round of black jack.`;
  }
};
