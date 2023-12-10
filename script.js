// ====================================================
// ================= HELPER FUNCTIONS =================
// ====================================================

// function to create a basic poker deck
var makeDeck = function () {
  // create the empty deck at the beginning
  var deck = [];
  var suits = [
    `<span style="font-size: larger; color: crimson">♥️</span>`,
    `<span style="font-size: larger; color: crimson">♦️</span>`,
    `<span style="font-size: larger;">♠️</span>`, 
    `<span style="font-size: larger;">♣️</span>`,
  ];
  // var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var rankCounter = 1;
    while (rankCounter <= 13) {
      var cardName = rankCounter;

      // 1, 11, 12 ,13
      if (cardName == 1) {
        cardName = 'ace';
      } else if (cardName == 11) {
        cardName = 'jack';
      } else if (cardName == 12) {
        cardName = 'queen';
      } else if (cardName == 13) {
        cardName = 'king';
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      deck.push(card);

      rankCounter = rankCounter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return deck;
};

// function to generate a random integer according to parameter
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
}

// function for shuffling deck
var shuffleDeck = function (deck) {
  // repeat for the numbers of cards in a deck
  for (let i = 0; i < deck.length; i++) {
    var randomIndex = getRandomIndex(deck.length);

    // current index card
    var currentItem = deck[i];

    // random index card
    var randomItem = deck[randomIndex];

    // swapping the current index card and the random index card (shuffling)
    deck[i] = randomItem;
    deck[randomIndex] = currentItem;
  }

  return deck;
}

// function for dealing a card to the chosen player
var dealCards = function (player, deck) {
  if (player == 'player') {
    playerHands.push(deck.pop())
  } else if (player == 'dealer') {
    dealerHands.push(deck.pop())
  }
}

// function to reveal player's hand
var revealPlayerHands = function () {
  let playersHands = `Player's hand: `;
  for (let i = 0; i < playerHands.length; i++) {
    playersHands += `${playerHands[i].name}${playerHands[i].suit}; `
  }
  return playersHands;
}

// function to reveal dealer's hand
var revealDealerHands = function () {
  let dealersHands = `Dealer's hand: `;
  for (let i = 0; i < dealerHands.length; i++) {
    dealersHands += `${dealerHands[i].name}${dealerHands[i].suit}; `
  }
  return dealersHands;
}

// function to calculate the score
var calScore = function (userHands) {
  let scoreAmt = 0;
  for (let i = 0; i < userHands.length; i++) {
    if (userHands[i].name == 'ace' && userHands.length == 2) {
      scoreAmt += 11;
    } else if (userHands[i].name == 'ace') {
      scoreAmt += 1;
    } else if (userHands[i].name == 'jack' || userHands[i].name == 'queen' || userHands[i].name == 'king') {
      scoreAmt += 10;
    } else {
      scoreAmt += parseInt(userHands[i].name)
    }
  }

  if (scoreAmt == 21 && userHands.length == 2) {
    return 'Blackjack!';
  } else {
    return scoreAmt;
  }
}

// function for dealing cards at the start of a round
var dealingPhase = function (playingDeck) {
  dealCards('player', playingDeck);
  dealCards('dealer', playingDeck);
  dealCards('player', playingDeck);
  dealCards('dealer', playingDeck);

  console.log('player hands')
  console.log(playerHands);
  console.log('dealer hands')
  console.log(dealerHands);
  console.log('next dealing card')
  console.log(playingDeck[playingDeck.length - 1])
  // playerHands = [{name: 'ace', rank: 1, suit: '♦'}, {name: 10, rank: 10, suit: '♦'}];
  // dealerHands = [{name: 'ace', rank: 1, suit: '♠'}, {name: 'queen', rank: 11, suit: '♠'}];

  var playerScore = calScore(playerHands);
  var dealerScore = calScore(dealerHands);

  if (dealerScore == 'Blackjack!' && playerScore == 'Blackjack!') {
    isGameEnded = true;
    return `
      ${revealPlayerHands()}
      <br>${revealDealerHands()}
      <br><br>Player and Dealer got Blackjack! It's a Draw!
    `
  } else if (dealerScore == 'Blackjack!') {
    isGameEnded = true;
    return `
      ${revealPlayerHands()}
      <br>${revealDealerHands()}
      <br><br>Dealer got Blackjack! You lost!
    `
  } else if (playerScore == 'Blackjack!') {
    isGameEnded = true;
    return `
      ${revealPlayerHands()}
      <br>${revealDealerHands()}
      <br><br>Player got Blackjack! You won!
    `
  }

  return `
    ${revealPlayerHands()}
    <br><br>Player's Move: type "hit" to draw another card or "stand" to stop!
  `
}

// function for player hit phase
var playerHitPhase = function () {
  // player draw card
  var playerScore = calScore(playerHands);
  dealCards('player', playingDeck);

  console.log('player drew')
  console.log(playerHands[playerHands.length - 1])
  console.log('next dealing card')
  console.log(playingDeck[playingDeck.length - 1])

  // calculate scores
  playerScore = calScore(playerHands);

  // logic for returning the results of the player's hands
  var resultsText = ``;
  if (playerScore > 21) {
    isPlayerBusted = true;
    resultsText = `Player has busted!<br>Click "Reveal" to show the dealer's hand!`;
  } else if (playerHands.length == 5) {
    isGameEnded = true;
    resultsText = `Player has won with a hand of 5 cards!`;
  } else if (playerScore == 21) {
      resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!<br>Warning: You already hit a hand of 21! Drawing more cards will result in a busted hand!`;
  }else if (playerHands.length == 4) {
    var remainingScore = 21 - playerScore;
    if (remainingScore == 1) {
      resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!<br>Warning: You already have 4 cards on hand, the next card you draw will be your final card! If you draw an Ace you win!`;
    } else if (remainingScore >= 10) {
      resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!<br>Warning: You already have 4 cards on hand, the next card you draw will be your final card! You will win regardless of any card you draw!`;
    } else {
      resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!<br>Warning: You already have 4 cards on hand, the next card you draw will be your final card! If you draw a ${remainingScore} or below!`;
    }
  } else {
    resultsText = `Player's Move: type "hit" to draw another card or "stand" to stop!`
  }
  
  return `
    Player draw: ${playerHands[playerHands.length - 1].name}${playerHands[playerHands.length - 1].suit}
    <br><br>${revealPlayerHands()}
    <br><br>${resultsText}
  `
}

// function for dealer's phase
var dealerPhase = function () {
  var dealerScore = calScore(dealerHands);
  var playerScore = calScore(playerHands);
  var didDealerDrew = false;
  var dealerDrewText = `Dealer drew the following cards: `;

  if (playerScore < 16) {
    return `You do not have enough points to stand! Type 'hit' to draw a card!`
  }
  
  // logic for dealer drawing cards, max 5 cards
  for (let i = 2; i < 5; i++) {
    if (dealerScore < 16
      || (dealerScore < 21 && dealerScore <= playerScore && playerScore < 21)
    ) {
      dealCards('dealer', playingDeck);
      didDealerDrew = true;
      dealerDrewText += `${dealerHands[dealerHands.length - 1].name}${dealerHands[dealerHands.length - 1].suit}; `;
      dealerScore = calScore(dealerHands)

      console.log('dealer drew')
      console.log(dealerHands[dealerHands.length - 1])
      console.log('next dealing card')
      console.log(playingDeck[playingDeck.length - 1])
    } else {
      break;
    }
  }

  // determine if dealer has drew cards
  if (!didDealerDrew) {
    dealerDrewText = `Dealer did not draw any cards.`;
  }

  // determine if dealer has busted
  if (dealerScore > 21) {
    isDealerBusted = true;
  }

  // reveal results
  var resultsText = ''
  if (isDealerBusted && isPlayerBusted) {
    resultsText = `Both Dealer and Player has busted! No one wins!`;
  } else if (isDealerBusted) {
    resultsText = `Dealer has busted! Player wins!`;
  } else if (isPlayerBusted) {
    resultsText = `Player has busted! Dealer wins!`;
  } else if (playerScore > dealerScore) {
    resultsText = `Player wins!`;
  } else if (dealerScore > playerScore) {
    resultsText = `Dealer wins!`;
  }

  isGameEnded = true;

  // reveal dealer's hands
  return `
    ${dealerDrewText}
    <br><br>${revealDealerHands()}
    <br>${revealPlayerHands()}
    <br><br>${resultsText}
  `
}

// function to reset the game
var resetGame = function () {
  isGameEnded = false;
  gamePhase = DEALING_PHASE;
  playerHands = [];
  dealerHands = [];
  isPlayerBusted = false;
  isDealerBusted = false;
  playingDeck = makeDeck();
  playingDeck = shuffleDeck(playingDeck);
}

// ====================================================
// ================= GLOBAL VARIABLE ==================
// ====================================================
var DEALING_PHASE = 'dealing phase';
var PLAYER_PHASE = 'player phase';

var playingDeck = shuffleDeck(makeDeck());
var isGameEnded = false;
var gamePhase = DEALING_PHASE;
var playerHands = [];
var dealerHands = [];
var isPlayerBusted = false;
var isDealerBusted = false;

// ====================================================
// ================== MAIN FUNCTIONS ==================
// ====================================================

var main = function (input) {
  var myOutputValue = '';

  // if game has ended
  if (isGameEnded) {
    resetGame();
    return `Game has been reset!<br>Press play to start the game!`
  }

  // if current phase is dealing phase
  if (gamePhase == DEALING_PHASE) {
    console.log({ playingDeck })
    gamePhase = PLAYER_PHASE;
    return myOutputValue = dealingPhase(playingDeck);
  }

  // if current phase is player action phase
  if (gamePhase == PLAYER_PHASE) {
    if (isPlayerBusted) {
      // if player has busted
      return myOutputValue = dealerPhase();
    } else if (input == 'hit') {
      // if player is not busted and wants to hit
      return myOutputValue = playerHitPhase();
    } else if (input == 'stand') {
      // if player is not busted and wants to stand
      return myOutputValue = dealerPhase();
    } else {
      return myOutputValue = 'invalid input'
    }
  }
};
