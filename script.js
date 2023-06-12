/** Black Jack game with 2 players
 * Computer will always be the dealer
 * Needs a stack of playing cards
 * Jacks/Queen/Kings are 10. Aces can be 1 or 11.
 * Needs 2 hands (Player and Dealer), dealt 2 cards each to start
 * The player goes first, and decides if they want to draw a card or end their turn
 * Dealer will only draw a card when player is done. Dealer has to draw a card if their hand is below 17.
 * If both player and dealer gets 21 = blackjack
 * If player hand closer to 21 than dealer, player wins. If dealer hand closer to 21 than player, dealer wins. Value of cards cannot be above 21
 **/

//Define game modes

const GAME_STATE_START = "Start the game.";
const GAME_STATE_DRAW_CARD = "Draw a card.";
const GAME_STATE_HIT_OR_STAND = "Hit or stand.";
let currentGameState = GAME_STATE_START;

let playerHand = [];
let dealerHand = [];
let handArray = [];
let hasBlackJack = false;

// Function that creates a deck of cards, used by createNewDeck function
let createDeck = function () {
  var deck = [];
  //make 52 cards, rank 1-13
  // 1-4 suits hearts, diamonds, clubs, spades
  // 1-10, jack, queen, king and ace

  // loop 1 for suits
  let suitIndex = 0;
  let suits = ["Diamonds ♦", "Hearts ♥", "Clubs ♣", "Spades ♠"];
  while (suitIndex < suits.length) {
    let currentSuit = suits[suitIndex];
    console.log("current suit: " + currentSuit);

    // loop 2 for rank 1-13
    let rankCounter = 1;
    while (rankCounter <= 13) {
      let cardName = rankCounter;
      // to assign ace, jack, queen, king
      if (cardName == 1) {
        cardName = `Ace`;
      } else if (cardName == 11) {
        cardName = `Jack`;
      } else if (cardName == 12) {
        cardName = `Queen`;
      } else if (cardName == 13) {
        cardName = `King`;
      }
      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      console.log("rank: " + rankCounter);
      deck.push(card);
      rankCounter = rankCounter + 1;
    }

    suitIndex = suitIndex + 1;
  }
  return deck;
};

// Function that generates a random number, used by shuffle deck function
// Get a random index ranging from 0 (inclusive) to max (exclusive).
let getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
let shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  let currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Function that creates and shuffles a deck
let createNewDeck = function () {
  let deck = createDeck();
  let shuffledDeck = shuffleCards(deck);
  return shuffledDeck;
};

//Determine results

//Check for blackjack
let checkForBlackJack = function (handArray) {
  let playerCardOne = handArray[0];
  let playerCardTwo = handArray[1];
  if (
    (playerCardOne.name == `Ace` && playerCardTwo.rank >= 10) ||
    (playerCardOne >= 10 && playerCardTwo.rank == `Ace`)
  ) {
    hasBlackJack = true;
  }
  return hasBlackJack;
};

let calculateHandSum = function (handArray) {
  let sum = 0;
  let aceCounter = 0;
  let index = 0;
  while (index < handArray.length) {
    let currentCard = handArray[index];
    if (
      currentCard.name == `Jack` ||
      currentCard.name == `Queen` ||
      currentCard.name == `King`
    ) {
      sum = sum + 10;
    } else if (currentCard.name == `Ace`) {
      sum = sum + 11;
      aceCounter = aceCounter + 1;
    } else {
      sum = sum + currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (sum > 21) {
      sum = sum - 10;
    }
    index = index + 1;
  }

  return sum;
};

let showPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  let playerMessage = `<b>Player Hand:</b> <br>`;
  let index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      `-` +
      playerHandArray[index].name +
      ` of ` +
      playerHandArray[index].suit +
      `<br>`;
    index = index + 1;
  }
  let dealerMessage = `<b>Dealer Hand:</b><br>`;
  index = 0;
  while (index < dealerHand.length) {
    dealerMessage =
      dealerMessage +
      `-` +
      dealerHandArray[index].name +
      ` of ` +
      dealerHandArray[index].suit +
      `<br>`;
    index = index + 1;
  }
  return playerMessage + `<br>` + dealerMessage;
};

let showHandTotalSum = function (playerHandSum, dealerHandSum) {
  let handTotalSumMessage =
    `<br>Player total hand value: ` +
    playerHandSum +
    `<br>Dealer total hand value: ` +
    dealerHandSum;
  return handTotalSumMessage;
};
let changeGameState = function (gameState) {
  currentGameState = gameState;
  let submitButton = document.getElementById("submitButton");
  if (currentGameState == GAME_STATE_START) {
    document.getElementById("hitButton").style.display = "none";
    submitButton.innerHTML = `Start New Game`;
  } else if (currentGameState == GAME_STATE_DRAW_CARD) {
    submitButton.innerHTML = `Check Cards`;
  } else if (currentGameState == GAME_STATE_HIT_OR_STAND) {
    document.getElementById("hitButton").style.display = "block";
    submitButton.innerHTML = `Stand`;
  }
};

let main = function (input) {
  let gameDeck = createNewDeck();
  if (currentGameState == GAME_STATE_START) {
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    changeGameState(GAME_STATE_DRAW_CARD);
    return `Cards dealt! Click to check cards.`;
  }

  if (currentGameState == GAME_STATE_DRAW_CARD) {
    let playerHasBlackJack = checkForBlackJack(playerHand);
    let dealerHasBlackJack = checkForBlackJack(dealerHand);
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        changeGameState(GAME_STATE_START);

        outputMessage =
          showPlayerAndDealerHands(playerHand, dealerHand) +
          `<br> It's a tie! Both of you have <b>BLACKJACK</b>!`;
      } else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        changeGameState(GAME_STATE_START);
        outputMessage =
          showPlayerAndDealerHands(playerHand, dealerHand) +
          `<br> <b>BLACKJACK! You win!</b>`;
      } else {
        changeGameState(GAME_STATE_START);

        outputMessage =
          showPlayerAndDealerHands(playerHand, dealerHand) +
          `<br> <b>Dealer has BLACKJACK! You lose.</b>`;
      }
    } else {
      outputMessage =
        `Your cards are ` +
        playerHand[0].name +
        ` of ` +
        playerHand[0].suit +
        ` and ` +
        playerHand[1].name +
        ` of ` +
        playerHand[0].suit +
        `.<br>Choose to <b>hit</b> or <b>stand</b>.`;

      console.log(outputMessage);

      changeGameState(GAME_STATE_HIT_OR_STAND);
    }
    return outputMessage;
  }
  //Hit or Stand
  if (currentGameState == GAME_STATE_HIT_OR_STAND) {
    if (input == `hit`) {
      playerHand.push(gameDeck.pop());
      outputMessage =
        showPlayerAndDealerHands(playerHand, dealerHand) +
        `<br>You drew another card. Choose <b>hit</b> or <b>stand</b>.`;
    } else if (input == `submit`) {
      let playerHandSum = calculateHandSum(playerHand);
      let dealerHandSum = calculateHandSum(dealerHand);
      while (dealerHandSum < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandSum = calculateHandSum(dealerHand);
      }
      if (playerHandSum == dealerHandSum) {
        outputMessage =
          showPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>` +
          `It's a tie!<br>` +
          showHandTotalSum(playerHandSum, dealerHandSum);
      } else if (playerHandSum > 21 && dealerHandSum > 21) {
        outputMessage =
          showPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>` +
          `<b>BOOM!</b> Both dealer and player busted!` +
          showHandTotalSum(playerHandSum, dealerHandSum);
      } else if (playerHandSum > 21) {
        outputMessage =
          showPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>` +
          `<b>Dealer wins!</b><br>` +
          showHandTotalSum(playerHandSum, dealerHandSum);
      } else if (dealerHandSum > 21) {
        outputMessage =
          showPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>` +
          `<b>Player wins!</b><br>` +
          showHandTotalSum(playerHandSum, dealerHandSum);
      } else if (playerHandSum > dealerHandSum) {
        outputMessage =
          showPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>` +
          `<b>Player wins!</b><br>` +
          showHandTotalSum(playerHandSum, dealerHandSum);
      } else if (dealerHandSum > playerHandSum) {
        outputMessage =
          showPlayerAndDealerHands(playerHand, dealerHand) +
          `<br>` +
          `<b>Dealer wins!</b><br>` +
          showHandTotalSum(playerHandSum, dealerHandSum);
      }
      changeGameState(GAME_STATE_START);
      playerHand = [];
      dealerHand = [];
      handArray = [];
    }

    return outputMessage;
  }
};
